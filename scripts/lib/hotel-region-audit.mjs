/**
 * Pure classifier for the hotel region audit. No network, no fs.
 *
 * Persistence rule: nothing returned here may contain Places text. The row
 * carries only derived values (region, matched term, booleans, bucket).
 */
import {
  ADDRESS_REGION_TERMS, matchAddressRegionTerm, placeIdentityKey,
  looseNameMatch, LODGING_PLACE_TYPES,
} from "./hotel-region-matching.mjs";

export const AUDIT_BUCKETS = Object.freeze(["ok", "fix", "unresolved", "identity", "gone"]);

/** Absolute per-vehicle Vito price gap between two regions; 0 when either is unknown. */
export function euroDelta(regionA, regionB, routeCatalog) {
  const a = routeCatalog[regionA]?.prices?.vito;
  const b = routeCatalog[regionB]?.prices?.vito;
  return Number.isFinite(a) && Number.isFinite(b) ? Math.abs(a - b) : 0;
}

const samePrices = (regionA, regionB, routeCatalog) => {
  const a = routeCatalog[regionA]?.prices;
  const b = routeCatalog[regionB]?.prices;
  return Boolean(a && b) && a.vito === b.vito && a.sprinter === b.sprinter;
};

/**
 * An address term decides a price only when it cannot stand for two regions
 * that cost different amounts. A belde term never can. An ilçe name can only
 * when every region inside that ilçe costs the same — true of Kaş and Kumluca,
 * false of Manavgat (Side €50, Kızılağaç €70) and Kemer (Kemer €55, Tekirova
 * €75), which is how 72 hotels came to be confirmed on the cheap side.
 *
 * The ilçe is looked up here rather than reported by matchAddressRegionTerm, so
 * that function's return shape — and its existing assertions — stay as they are.
 */
export function isConclusiveTerm(match, routeCatalog) {
  const ilce = ADDRESS_REGION_TERMS.find(([region]) => region === match?.region)?.[2];
  if (!ilce || match.term !== ilce) return true;
  const regions = ADDRESS_REGION_TERMS
    .filter(([, , gate]) => gate === ilce)
    .map(([region]) => region);
  return regions.every((region) => samePrices(region, regions[0], routeCatalog));
}

/**
 * Whether this Place names the hotel, ignoring what Google files it as.
 * `isOperationalHotelPlace` cannot answer that: it re-tests type and status
 * itself, so a pansiyon listed as a restaurant would never match strictly.
 * Those two facts say nothing about where a place is, so they travel as notes.
 */
const nameMatchesPlace = (names, place) =>
  new Set([].concat(names).map(placeIdentityKey)).has(placeIdentityKey(place?.displayName?.text));

/** Returns { reason } when identity fails, else { strength, notes }. */
function identityCheck(names, place) {
  if (!place?.id) return { reason: "missing" };
  const notes = [];
  if (place.businessStatus !== "OPERATIONAL") notes.push("status");
  if (!LODGING_PLACE_TYPES.has(place.primaryType)) notes.push("type");
  if (nameMatchesPlace(names, place)) return { strength: "strict", notes };
  if (looseNameMatch(names, place.displayName?.text)) return { strength: "loose", notes };
  return { reason: "name" };
}

/**
 * @param {{slug:string,name:string,region:string,regionSource:string,aliases?:readonly string[]}} hotel
 * @param {{place?:object, notFound?:boolean}} details - one Places Details response, in memory only
 * @param {object} routeCatalog
 */
export function classifyAuditRow(hotel, details, routeCatalog) {
  const base = {
    slug: hotel.slug,
    name: hotel.name,
    regionSource: hotel.regionSource,
    indexRegion: hotel.region,
    derivedRegion: null,
    matchedTerm: null,
    identityVerified: false,
    bucket: "gone",
    euroDelta: 0,
    priceEquivalent: false,
    identityNotes: [],
  };
  const place = details?.place;
  if (details?.notFound || !place || place.businessStatus === "CLOSED_PERMANENTLY") {
    return { ...base, bucket: "gone", identityReason: place ? "status" : "missing" };
  }
  const identity = identityCheck([hotel.name, ...(hotel.aliases ?? [])], place);
  if (identity.reason) return { ...base, bucket: "identity", identityReason: identity.reason };

  const match = matchAddressRegionTerm(place.addressComponents);
  if (!match) return { ...base, identityVerified: true, identityStrength: identity.strength, identityNotes: identity.notes, bucket: "unresolved" };

  const priceEquivalent = match.region !== hotel.region && samePrices(match.region, hotel.region, routeCatalog);
  const agrees = match.region === hotel.region || priceEquivalent;
  // A loose name match is only trusted when the address corroborates the
  // index: a similar name in a different region may be a sibling property
  // (Orange County Alanya vs Kemer), so that disagreement is residue, not a fix.
  if (!agrees && identity.strength === "loose") {
    return {
      ...base, derivedRegion: match.region, matchedTerm: match.term, identityStrength: "loose",
      identityNotes: identity.notes,
      bucket: "identity", identityReason: "loose-name-region-conflict",
      euroDelta: euroDelta(hotel.region, match.region, routeCatalog),
    };
  }
  return {
    ...base,
    derivedRegion: match.region,
    matchedTerm: match.term,
    identityVerified: true,
    identityStrength: identity.strength,
    identityNotes: identity.notes,
    bucket: agrees ? "ok" : "fix",
    euroDelta: agrees ? 0 : euroDelta(hotel.region, match.region, routeCatalog),
    priceEquivalent,
  };
}

// Report order: things to act on first, confirmed rows last.
const BUCKET_RANK = { fix: 0, identity: 1, unresolved: 2, gone: 3, ok: 4 };

/** Orders rows by money at risk (fix rows by euro delta, then residue, then ok) and counts buckets. */
export function buildAuditReport(rows, { generatedAt, indexed }) {
  const counts = Object.fromEntries(AUDIT_BUCKETS.map((bucket) => [bucket, 0]));
  for (const row of rows) counts[row.bucket] = (counts[row.bucket] ?? 0) + 1;
  const ordered = [...rows].sort((a, b) =>
    (b.euroDelta ?? 0) - (a.euroDelta ?? 0)
    || BUCKET_RANK[a.bucket] - BUCKET_RANK[b.bucket]
    || String(a.slug).localeCompare(String(b.slug)));
  return { schemaVersion: 1, generatedAt, indexed, audited: rows.length, counts, rows: ordered };
}

const COLUMNS = ["slug", "bucket", "euroDelta", "indexRegion", "derivedRegion", "matchedTerm", "regionSource", "identityStrength", "identityReason"];

export function renderAuditTable(report) {
  const head = `| ${COLUMNS.join(" | ")} |\n| ${COLUMNS.map(() => "---").join(" | ")} |`;
  const lines = report.rows
    .filter((row) => row.bucket !== "ok")
    .map((row) => `| ${COLUMNS.map((column) => row[column] ?? "").join(" | ")} |`);
  const summary = AUDIT_BUCKETS.map((bucket) => `${bucket}: ${report.counts[bucket]}`).join(", ");
  const failed = Object.keys(report.failures ?? {}).length;
  const pending = `${report.remaining ?? 0} not yet audited, ${failed} failed fetches.`;
  return `# Hotel region audit\n\nGenerated ${report.generatedAt}. Audited ${report.audited} of ${report.indexed}. ${summary}. ${pending}\n\n${head}\n${lines.join("\n")}\n`;
}
