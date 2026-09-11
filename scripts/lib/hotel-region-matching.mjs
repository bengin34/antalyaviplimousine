const LONGITUDE_REVIEW_MARGIN = 0.012;
const LATITUDE_REVIEW_MARGIN = 0.008;

const MINISTRY_REGION_COMPATIBILITY = Object.freeze({
  muratpasa: new Set(["antalya"]),
  konyaalti: new Set(["antalya", "kemer", "tekirova"]),
  aksu: new Set(["antalya", "belek"]),
  serik: new Set(["belek", "bogazkent"]),
  manavgat: new Set(["side", "kizilagac"]),
  alanya: new Set(["alanya_bati", "alanya_merkez", "alanya_dogu", "kargicak", "demirtas"]),
  kemer: new Set(["kemer", "tekirova"]),
});

const EASTERN_BANDS = Object.freeze([
  { east: 30.97, region: "antalya" },
  // Rounded midpoints between multiple existing, region-reviewed anchor
  // hotels. These are commercial price boundaries, not municipality borders.
  { east: 31.134, region: "belek" },
  { east: 31.222, region: "bogazkent" },
  { east: 31.491, region: "side" },
  { east: 31.623, region: "kizilagac" },
  { east: 31.941, region: "alanya_bati" },
  { east: 32.061, region: "alanya_merkez" },
  { east: 32.117, region: "alanya_dogu" },
  { east: 32.20, region: "kargicak" },
  { east: 32.55, region: "demirtas" },
]);

/**
 * Groups Ministry candidates by their stable Google Place ID and separates
 * places already represented in the current distance/index data.
 */
export function groupCandidatesByPlace(candidates, currentDistances) {
  const currentByPlace = new Map();
  for (const [slug, row] of Object.entries(currentDistances)) {
    if (!row?.place) continue;
    currentByPlace.set(row.place, [...(currentByPlace.get(row.place) ?? []), slug]);
  }

  const candidatesByPlace = new Map();
  for (const candidate of candidates) {
    if (!candidate.placeId) continue;
    candidatesByPlace.set(candidate.placeId, [
      ...(candidatesByPlace.get(candidate.placeId) ?? []),
      candidate,
    ]);
  }

  const existing = [];
  const newPlaces = [];
  for (const [placeId, groupedCandidates] of candidatesByPlace) {
    const currentSlugs = currentByPlace.get(placeId);
    if (currentSlugs) {
      existing.push({ placeId, currentSlugs, candidates: groupedCandidates });
    } else {
      newPlaces.push({ placeId, candidates: groupedCandidates });
    }
  }
  return { existing, newPlaces };
}

const near = (value, boundary, margin) => Math.abs(value - boundary) <= margin;

/**
 * Converts an ephemeral Places coordinate into a commercial pricing region.
 * Coordinates are never returned, so callers can persist the classification
 * without persisting raw Places location content. Boundary cases are retained
 * for manual review instead of being silently promoted.
 */
export function resolvePricingRegion(location) {
  const latitude = Number(location?.latitude);
  const longitude = Number(location?.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)
    || latitude < 36.32 || latitude > 37.0
    || longitude < 30.38 || longitude > 32.55) {
    return { region: null, review: true, reason: "outside-pricing-corridor" };
  }

  // The Kemer coast lies southwest of Antalya and cannot be classified by the
  // eastbound longitude bands. Tekirova is the only separate price step there.
  if (longitude < 30.68 && latitude < 36.80) {
    const boundary = 36.525;
    return {
      region: latitude <= boundary ? "tekirova" : "kemer",
      review: near(latitude, boundary, LATITUDE_REVIEW_MARGIN),
      ...(near(latitude, boundary, LATITUDE_REVIEW_MARGIN)
        ? { reason: "near-pricing-boundary" }
        : {}),
    };
  }

  for (const band of EASTERN_BANDS) {
    if (longitude <= band.east) {
      const isBoundary = near(longitude, band.east, LONGITUDE_REVIEW_MARGIN);
      return {
        region: band.region,
        review: isBoundary,
        ...(isBoundary ? { reason: "near-pricing-boundary" } : {}),
      };
    }
  }

  return { region: null, review: true, reason: "outside-pricing-corridor" };
}

const ministryNameKey = (value) => String(value ?? "")
  .replace(/İ/g, "I").replace(/ı/g, "i")
  .normalize("NFD").replace(/\p{M}+/gu, "")
  .toLowerCase().replace(/ğ/g, "g").replace(/ş/g, "s")
  .replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u")
  .replace(/\botel\b/g, "hotel")
  .replace(/&/g, " ").replace(/[^a-z0-9]+/g, " ")
  .replace(/\s+/g, " ").trim();

const ministryDistrictKey = (value) => String(value ?? "")
  .replace(/İ/g, "I").replace(/ı/g, "i")
  .normalize("NFD").replace(/\p{M}+/gu, "")
  .toLowerCase().replace(/ğ/g, "g").replace(/ş/g, "s")
  .replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u")
  .replace(/[^a-z0-9]+/g, "");

// [region, terms, ilçe]: the terms only count when the ilçe key (normalised
// with ministryNameKey) also appears as its own address component. Generic
// mahalle names (Cumhuriyet, Saray, Ilıca) exist in several ilçes, and
// without the guard the first region in scan order would claim them.
export const ADDRESS_REGION_TERMS = Object.freeze([
  ["demirtas", ["demirtas", "yesiloz"], "alanya"],
  ["kargicak", ["kargicak"], "alanya"],
  ["alanya_dogu", ["kestel", "mahmutlar"], "alanya"],
  ["alanya_bati", ["okurcalar", "incekum", "avsallar", "turkler", "payallar", "konakli", "karaburun", "golcuk"], "alanya"],
  ["alanya_merkez", ["oba", "obagol", "tosmur", "saray", "guller pinari", "cumhuriyet", "kizlar pinari", "hacet", "carsi", "kadipasa", "kucukhasbahce", "dinek", "sekerhane", "turktas"], "alanya"],
  ["kizilagac", ["kizilagac", "kizilot", "cenger"], "manavgat"],
  ["side", ["side", "kumkoy", "gundogdu", "evrenseki", "sorgun", "titreyengol", "colakli", "ilica", "manavgat"], "manavgat"],
  ["bogazkent", ["bogazkent"], "serik"],
  ["belek", ["belek", "kadriye", "iskele"], "serik"],
  ["tekirova", ["tekirova"], "kemer"],
  ["kumluca", ["kumluca", "adrasan", "olympos"], "kumluca"],
  ["kas", ["kas", "kalkan"], "kas"],
  ["kemer", ["kemer", "beldibi", "goynuk", "kiris", "camyuva"], "kemer"],
  ["antalya", ["konyaalti", "lara", "kundu", "aksu", "muratpasa", "kepez"]],
]);

/** Resolves a known locality from ephemeral Places address parts to its pricing region and the term that matched. */
export function matchAddressRegionTerm(components) {
  const parts = (components ?? []).flatMap((component) =>
    [component?.longText, component?.shortText].filter(Boolean).map(ministryNameKey));
  const matches = (part, candidate) =>
    part === candidate || part.startsWith(`${candidate} `) || part.endsWith(` ${candidate}`);
  // Region order is the price-boundary priority (bogazkent before belek).
  // Within a region, walk the address parts first so the most specific
  // component (Adrasan) reports its own term rather than the ilçe's (Kumluca).
  for (const [region, terms, ilce] of ADDRESS_REGION_TERMS) {
    // Word-boundary, not exact: some listings stuff the ilçe into a free-text
    // component ("Karaburun Mevkii Okurcalar Beldesi Alanya").
    if (ilce && !parts.some((part) => matches(part, ilce))) continue;
    for (const part of parts) {
      const term = terms.find((candidate) => matches(part, candidate));
      if (term) return { region, term };
    }
  }
  return null;
}

/** Resolves a specific known locality from ephemeral Places address parts. */
export function pricingRegionFromAddressComponents(components) {
  return matchAddressRegionTerm(components)?.region ?? null;
}

const GENERIC_IDENTITY_WORDS = new Set(["hotel", "hotels", "resort", "spa", "the"]);
const placeIdentityKey = (value) => ministryNameKey(value)
  .split(" ").filter((word) => word && !GENERIC_IDENTITY_WORDS.has(word)).join(" ");

const STRICT_HOTEL_TYPES = new Set(["hotel", "resort_hotel"]);
/** Google Places lodging types an audited index row may legitimately carry. */
export const LODGING_PLACE_TYPES = new Set([
  "hotel", "resort_hotel", "lodging", "extended_stay_hotel", "guest_house",
  "inn", "motel", "hostel", "bed_and_breakfast", "private_guest_room",
]);

// Words that say what a place is or where it is, never which one it is.
const NAME_NOISE_WORDS = new Set([
  ...GENERIC_IDENTITY_WORDS, "resorts", "apart", "aparthotel", "apartments", "apartment",
  "suites", "suite", "suit", "boutique", "butik", "pansiyon", "pension", "pansion", "hostel",
  "antalya", "alanya", "side", "belek", "kemer", "lara", "kundu", "konyaalti", "kaleici",
  "manavgat", "serik", "beach", "club", "family", "deluxe", "luxury", "luxe", "premium",
  "collection", "wellness", "golf", "and", "by", "de", "la", "le", "el", "residence", "villas",
  "villa", "adults", "adult", "only", "all", "inclusive", "kids", "concept", "airport", "city",
  "old", "town", "special", "class", "ex", "plus", "exclusive", "palace", "park", "garden",
  "royal", "grand", "star", "house", "homes", "home", "inn", "tower", "towers", "new", "holiday",
  "village", "selected", "access", "erisimi", "cafe", "breakfast", "restaurant", "ve", "aparts",
  "1", "2", "3", "4", "5", "12", "16", "18",
]);
const distinctiveTokens = (value) => new Set(
  ministryNameKey(value).split(" ").filter((word) => word && !NAME_NOISE_WORDS.has(word)));
// Words that only say what kind of lodging it is; a name made purely of
// location words ("Lara Garden Hotel") keeps those for the fallback compare.
const TYPE_WORDS = new Set([
  ...GENERIC_IDENTITY_WORDS, "resorts", "apart", "aparthotel", "apartments", "apartment", "suites",
  "suite", "suit", "boutique", "butik", "pansiyon", "pension", "pansion", "hostel", "and", "de", "la",
  "adults", "adult", "only", "all", "inclusive", "plus", "ex", "class", "special", "concept", "kids",
  "12", "16", "18",
]);
// German booking sites transliterate umlauts as oe/ue/ae ("Oezhan" for Özhan);
// ministryNameKey already folds ö/ü/ä to o/u/a, so fold the digraphs the same way.
const foldDigraphs = (value) => value.replace(/oe/g, "o").replace(/ue/g, "u").replace(/ae/g, "a");
const typeStrippedKey = (value) => foldDigraphs(
  ministryNameKey(value).split(" ").filter((word) => word && !TYPE_WORDS.has(word)).join(" "));
// Spacing and hyphenation drift ("M-ODA" / "Moda", "Sun Anatolia" / "Sunanatolia").
const compactKey = (value) => typeStrippedKey(value).replace(/ /g, "");
const compactMatch = (a, b) => {
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  return short.length >= 5 && long.includes(short);
};
const sameSet = (a, b) => a.size === b.size && [...a].every((token) => b.has(token));

/**
 * Loose identity for the audit's second pass: every distinctive token of the
 * shorter name appears in the longer one (whole token, or a shared ≥5-char
 * prefix for spelling drift), or the two share at least two distinctive
 * tokens making up half of their union. Falls back to exact equality of the
 * generic-stripped keys when a name has no distinctive token at all
 * ("AG Hotels" / "AG Hotels Antalya"). Location words are noise here, so a
 * loose match is only trusted when the address also agrees with the index —
 * see classifyAuditRow.
 */
export function looseNameMatch(candidateNames, placeName) {
  const wanted = typeStrippedKey(placeName);
  return [].concat(candidateNames).some((candidate) => {
    const a = distinctiveTokens(candidate);
    const b = distinctiveTokens(placeName);
    if (!a.size || !b.size) {
      return wanted !== "" && (typeStrippedKey(candidate) === wanted || compactMatch(compactKey(candidate), compactKey(placeName)));
    }
    if (sameSet(a, b)) return true;
    if (compactMatch(compactKey(candidate), compactKey(placeName))) return true;
    const [small, large] = a.size <= b.size ? [a, b] : [b, a];
    const has = (token) => large.has(token) || [...large].some((other) =>
      token.length >= 5 && other.length >= 5 && (other.startsWith(token) || token.startsWith(other)));
    if ([...small].every(has) && [...small].some((token) => token.length >= 4)) return true;
    const shared = [...a].filter((token) => b.has(token)).length;
    const union = new Set([...a, ...b]).size;
    return shared >= 2 && shared / union >= 0.5;
  });
}

/**
 * True when one Places result is an operating lodging business whose name
 * matches any of the candidate names (generic words stripped).
 */
export function isOperationalHotelPlace(candidateNames, place, types = LODGING_PLACE_TYPES) {
  const wanted = new Set([].concat(candidateNames).map(placeIdentityKey));
  return Boolean(place?.id)
    && types.has(place.primaryType)
    && place.businessStatus === "OPERATIONAL"
    && wanted.has(placeIdentityKey(place.displayName?.text));
}

/** Selects one unambiguous, currently operating classic hotel identity. */
export function selectOperationalHotelPlace(candidateName, places) {
  const matches = (places ?? []).filter((place) =>
    isOperationalHotelPlace(candidateName, place, STRICT_HOTEL_TYPES));
  return matches.length === 1 ? matches[0] : null;
}

function preferredCandidate(candidates) {
  return [...candidates].sort((left, right) => {
    const leftOperating = left.documentType === "Turizm İşletmesi Belgesi" ? 1 : 0;
    const rightOperating = right.documentType === "Turizm İşletmesi Belgesi" ? 1 : 0;
    return rightOperating - leftOperating
      || String(right.name).length - String(left.name).length
      || String(left.certificateNo).localeCompare(String(right.certificateNo), "tr");
  })[0];
}

/** Builds a persistence-safe review row from a grouped place classification. */
export function buildRegionMatch(placeGroup, classification, {
  routeCatalog,
  hotelSlug,
  currentSlugs,
}) {
  const selected = preferredCandidate(placeGroup.candidates);
  const proposedSlug = hotelSlug(selected.name);
  const route = routeCatalog[classification.region];
  const reviewReasons = [];
  if (classification.review && classification.reason) reviewReasons.push(classification.reason);
  if (new Set(placeGroup.candidates.map((row) => placeIdentityKey(row.name))).size > 1) {
    reviewReasons.push("multiple-ministry-names");
  }
  const compatibleWithMinistry = placeGroup.candidates.every((row) => {
    const allowed = MINISTRY_REGION_COMPATIBILITY[ministryDistrictKey(row.district)];
    return !allowed || allowed.has(classification.region);
  });
  if (!compatibleWithMinistry) reviewReasons.push("ministry-location-conflict");
  if (currentSlugs.has(proposedSlug)) reviewReasons.push("slug-collision");
  if (!route && !reviewReasons.includes("unknown-pricing-region")) {
    reviewReasons.push("unknown-pricing-region");
  }

  return {
    proposedSlug,
    name: selected.name,
    certificateNos: [...new Set(placeGroup.candidates.map((row) => String(row.certificateNo)))],
    ministryDistricts: [...new Set(placeGroup.candidates.map((row) => row.district).filter(Boolean))],
    placeId: placeGroup.placeId,
    pricingRegion: classification.region,
    pricingName: route?.names?.tr ?? null,
    prices: route?.prices ?? null,
    originalPrices: route?.originalPrices ?? null,
    status: reviewReasons.length ? "review" : "ready",
    reviewReasons,
  };
}

/** Applies a human-reviewed identity/location decision through normal guards. */
export function applyReviewedPlaceOverride(placeGroup, override, dependencies) {
  if (!override?.placeId || !override?.pricingRegion) return null;
  const reviewedGroup = {
    ...placeGroup,
    placeId: override.placeId,
    candidates: override.name
      ? placeGroup.candidates.map((candidate) => ({ ...candidate, name: override.name }))
      : placeGroup.candidates,
  };
  const match = buildRegionMatch(reviewedGroup, {
    region: override.pricingRegion,
    review: false,
  }, dependencies);
  return {
    ...match,
    ...(override.aliases?.length ? { aliases: [...new Set(override.aliases)] } : {}),
  };
}

export function summarizeRegionMatches({
  generatedAt,
  sourceCandidateRows,
  existingPlaceCount,
  newPlaceCount,
  fetchAttempts,
  completedMatches,
  failures,
}) {
  const ready = completedMatches.filter((row) => row.status === "ready");
  const review = completedMatches.filter((row) => row.status === "review");
  const readyByPricingRegion = {};
  for (const row of ready) {
    readyByPricingRegion[row.pricingRegion] = (readyByPricingRegion[row.pricingRegion] ?? 0) + 1;
  }
  const failedCount = Object.keys(failures).length;
  const unresolvedCount = newPlaceCount - completedMatches.length;
  return {
    schemaVersion: 1,
    generatedAt,
    sourceCandidateRows,
    uniqueCandidatePlaceIds: existingPlaceCount + newPlaceCount,
    existingPlaceIdMatches: existingPlaceCount,
    newPlaceIds: newPlaceCount,
    placesDetailsFetchAttempts: fetchAttempts,
    placesDetailsSuccessfulResponses: completedMatches.length,
    readyCount: ready.length,
    reviewCount: review.length,
    failedCount,
    unresolvedCount,
    readyByPricingRegion,
    complete: unresolvedCount === 0 && failedCount === 0,
  };
}
