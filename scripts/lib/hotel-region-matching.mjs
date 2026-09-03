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

const ADDRESS_REGION_TERMS = Object.freeze([
  ["demirtas", ["demirtas"]],
  ["kargicak", ["kargicak"]],
  ["alanya_dogu", ["kestel", "mahmutlar"]],
  ["alanya_bati", ["okurcalar", "incekum", "avsallar", "turkler", "payallar", "konakli"]],
  ["alanya_merkez", ["oba", "tosmur", "saray", "guller pinari", "cumhuriyet"]],
  ["kizilagac", ["kizilagac", "kizilot", "cenger"]],
  ["side", ["side", "kumkoy", "gundogdu", "evrenseki", "sorgun", "titreyengol", "colakli", "ilica", "manavgat"]],
  ["bogazkent", ["bogazkent"]],
  ["belek", ["belek", "kadriye"]],
  ["tekirova", ["tekirova"]],
  ["kemer", ["kemer", "beldibi", "goynuk", "kiris", "camyuva"]],
  ["antalya", ["konyaalti", "lara", "kundu", "aksu", "muratpasa"]],
]);

/** Resolves a specific known locality from ephemeral Places address parts. */
export function pricingRegionFromAddressComponents(components) {
  const parts = (components ?? []).flatMap((component) =>
    [component?.longText, component?.shortText].filter(Boolean).map(ministryNameKey));
  for (const [region, terms] of ADDRESS_REGION_TERMS) {
    if (terms.some((term) => parts.some((part) =>
      part === term || part.startsWith(`${term} `) || part.endsWith(` ${term}`)))) {
      return region;
    }
  }
  return null;
}

const GENERIC_IDENTITY_WORDS = new Set(["hotel", "hotels", "resort", "spa", "the"]);
const placeIdentityKey = (value) => ministryNameKey(value)
  .split(" ").filter((word) => word && !GENERIC_IDENTITY_WORDS.has(word)).join(" ");

/** Selects one unambiguous, currently operating classic hotel identity. */
export function selectOperationalHotelPlace(candidateName, places) {
  const wanted = placeIdentityKey(candidateName);
  const matches = (places ?? []).filter((place) =>
    place?.id
    && (place.primaryType === "hotel" || place.primaryType === "resort_hotel")
    && place.businessStatus === "OPERATIONAL"
    && placeIdentityKey(place.displayName?.text) === wanted);
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
