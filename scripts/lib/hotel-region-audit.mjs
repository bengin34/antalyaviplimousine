/**
 * Pure classifier for the hotel region audit. No network, no fs.
 *
 * Persistence rule: nothing returned here may contain Places text. The row
 * carries only derived values (region, matched term, booleans, bucket).
 */
import {
  ADDRESS_REGION_TERMS, matchAddressRegionTerm, placeIdentityKey,
  looseNameMatch, resolvePricingRegion, LODGING_PLACE_TYPES,
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
 * Observed km span per region, over rows whose address term was conclusive and
 * whose coordinate did not contradict it. Derived from the whole checkpoint, so
 * `--slug` and `--max-calls` runs cannot bucket a hotel differently from a full
 * run on the same evidence.
 */
export function kmRangesFromCompleted(completed, hotelDistances) {
  const ranges = {};
  for (const row of Object.values(completed ?? {})) {
    if (!row?.addressRegion) continue;
    if (row.locationRegion && row.locationRegion !== row.addressRegion) continue;
    const km = Number(hotelDistances?.[row.slug]?.km);
    if (!Number.isFinite(km) || km <= 0) continue;
    const seen = ranges[row.addressRegion];
    ranges[row.addressRegion] = seen
      ? { min: Math.min(seen.min, km), max: Math.max(seen.max, km) }
      : { min: km, max: km };
  }
  return ranges;
}

/** The regions an ilçe holds — the candidates an ilçe-level address leaves open. */
export const regionsInIlce = (ilce) => (ilce
  ? ADDRESS_REGION_TERMS.filter(([, , gate]) => gate === ilce).map(([region]) => region)
  : []);

/**
 * Which of the candidate regions this distance fits. Never asked to choose among
 * all regions: km from AYT is a one-dimensional projection of a two-dimensional
 * coast, so Kemer (43-71, southwest) and Side (54-72, east) overlap almost
 * entirely and a global comparison is silent for most of the rows this exists to
 * rescue. Within one ilçe — Kemer against Tekirova — the same number decides.
 *
 * Fewer than two candidates and it stays silent: a lone candidate would agree
 * with itself and hand out a free second source.
 */
export function kmRegionFor(km, ranges, candidates) {
  if (!Number.isFinite(km) || km <= 0) return null;
  const known = [...new Set(candidates ?? [])].filter((region) => ranges?.[region]);
  if (known.length < 2) return null;

  const inside = known.filter((region) => km >= ranges[region].min && km <= ranges[region].max);
  if (inside.length === 1) return inside[0];
  if (inside.length > 1) return null;

  // Outside every candidate's span: the nearest boundary wins, but only when it
  // is clearly nearer, so a hotel midway between two regions stays unspoken for.
  const byGap = known
    .map((region) => [region, km < ranges[region].min ? ranges[region].min - km : km - ranges[region].max])
    .sort((a, b) => a[1] - b[1]);
  return byGap[1][1] - byGap[0][1] >= 2 ? byGap[0][0] : null;
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

const priceOf = (region, routeCatalog) => {
  const prices = routeCatalog[region]?.prices;
  return prices ? [prices.vito, prices.sprinter] : [-1, -1];
};

/** Dearest by Vito, then by Sprinter — kizilagac (70/115) over alanya_bati (70/90). */
const dearest = (regions, routeCatalog) => [...regions].sort((a, b) => {
  const [aVito, aSprinter] = priceOf(a, routeCatalog);
  const [bVito, bSprinter] = priceOf(b, routeCatalog);
  return bVito - aVito || bSprinter - aSprinter || String(a).localeCompare(String(b));
})[0] ?? null;

/**
 * The region at least two sources name, preferring the index region so a row
 * that agrees with the index is never reported as a move. Price-equivalent
 * regions count as one answer: side and manavgat are both 50/85.
 */
function agreedRegion(sources, indexRegion, routeCatalog) {
  const ordered = [...sources].sort((a, b) =>
    Number(b === indexRegion) - Number(a === indexRegion));
  for (const candidate of ordered) {
    const agreeing = sources.filter((region) =>
      region === candidate || samePrices(region, candidate, routeCatalog));
    if (agreeing.length >= 2) return { region: candidate, count: agreeing.length };
  }
  return null;
}

/**
 * Derives everything one Places response can say about a hotel. Rows that end
 * here — gone, or an identity naming another business — carry `terminal: true`.
 * Everything else waits for classifyFromEvidence, because a region's km range is
 * not known until every row has been extracted.
 *
 * The coordinate is read here and never returned: the checkpoint may not carry
 * Places content, and resolvePricingRegion is built for that.
 *
 * @param {{slug:string,name:string,region:string,regionSource:string,aliases?:readonly string[]}} hotel
 * @param {{place?:object, notFound?:boolean}} details - one Places Details response, in memory only
 */
export function extractEvidence(hotel, details, routeCatalog) {
  const base = {
    slug: hotel.slug,
    name: hotel.name,
    regionSource: hotel.regionSource,
    indexRegion: hotel.region,
    derivedRegion: null,
    matchedTerm: null,
    matchedIlce: null,
    addressRegion: null,
    locationRegion: null,
    locationReview: null,
    kmRegion: null,
    identityVerified: false,
    identityStrength: null,
    identityNotes: [],
    agreeingSources: 0,
    candidateRegions: [],
    unresolvedReason: null,
    bucket: null,
    terminal: false,
    euroDelta: 0,
    priceEquivalent: false,
  };
  const place = details?.place;
  if (details?.notFound || !place || place.businessStatus === "CLOSED_PERMANENTLY") {
    return { ...base, bucket: "gone", terminal: true, identityReason: place ? "status" : "missing" };
  }
  const identity = identityCheck([hotel.name, ...(hotel.aliases ?? [])], place);
  if (identity.reason) {
    return { ...base, bucket: "identity", terminal: true, identityReason: identity.reason };
  }

  const match = matchAddressRegionTerm(place.addressComponents);
  const located = resolvePricingRegion(place.location);
  return {
    ...base,
    matchedTerm: match?.term ?? null,
    // Persisted so classifyFromEvidence can rebuild the candidate set without
    // the Places response, which is never stored.
    matchedIlce: match ? (ADDRESS_REGION_TERMS.find(([region]) => region === match.region)?.[2] ?? null) : null,
    addressRegion: match && isConclusiveTerm(match, routeCatalog) ? match.region : null,
    locationRegion: located.review ? null : located.region,
    locationReview: located.review ? (located.reason ?? null) : null,
    identityVerified: true,
    identityStrength: identity.strength,
    identityNotes: identity.notes,
  };
}

/**
 * Turns stored evidence into a verdict. Pure and network-free, so the script
 * re-runs it over the whole checkpoint after every fetch loop, once the km
 * ranges those rows imply are finally computable.
 */
export function classifyFromEvidence(row, routeCatalog, options = {}) {
  // `terminal` and not `row.bucket`: after the first pass every row carries a
  // bucket, and gating on that would freeze every verdict and make this pass a
  // no-op from the second run onward — the opposite of why it exists.
  if (row.terminal) return row;

  // km chooses among what the other evidence left open: the regions of the ilçe
  // the address named, plus whatever the coordinate said.
  const candidatesForKm = [...regionsInIlce(row.matchedIlce), row.locationRegion].filter(Boolean);
  const kmRegion = kmRegionFor(Number(options.km), options.kmRanges ?? {}, candidatesForKm);

  const sources = [row.addressRegion, row.locationRegion, kmRegion].filter(Boolean);
  const candidates = [...new Set(sources)];
  const agreed = agreedRegion(sources, row.indexRegion, routeCatalog);
  const proposed = agreed?.region ?? (candidates.length ? dearest(candidates, routeCatalog) : null);

  const priceEquivalent = Boolean(proposed) && proposed !== row.indexRegion
    && samePrices(proposed, row.indexRegion, routeCatalog);
  const agrees = proposed === row.indexRegion || priceEquivalent;

  // Checked before the unresolved branch: a loose name match in another region
  // may be a sibling property (Orange County Alanya vs Kemer), and that is
  // residue however few sources spoke. Moving it would be the wrong call.
  if (proposed && !agrees && row.identityStrength === "loose") {
    return {
      ...row, kmRegion, derivedRegion: proposed, agreeingSources: agreed?.count ?? 1,
      bucket: "identity", identityReason: "loose-name-region-conflict",
      euroDelta: euroDelta(row.indexRegion, proposed, routeCatalog),
    };
  }

  if (!agreed) {
    return {
      ...row, kmRegion, derivedRegion: proposed, candidateRegions: candidates,
      agreeingSources: candidates.length ? 1 : 0, bucket: "unresolved",
      unresolvedReason: sources.length === 0 ? "no-evidence"
        : candidates.length === 1 ? "single-source" : "conflict",
      euroDelta: proposed ? euroDelta(row.indexRegion, proposed, routeCatalog) : 0,
    };
  }

  return {
    ...row, kmRegion, derivedRegion: agreed.region, agreeingSources: agreed.count,
    bucket: agrees ? "ok" : "fix",
    euroDelta: agrees ? 0 : euroDelta(row.indexRegion, agreed.region, routeCatalog),
    priceEquivalent,
  };
}

/** Convenience for tests and one-shot use: extract, then judge. */
export const classifyAuditRow = (hotel, details, routeCatalog, options = {}) =>
  classifyFromEvidence(extractEvidence(hotel, details, routeCatalog), routeCatalog, options);

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
