/**
 * Re-checks ambiguous discovery rows with a district-restricted Places Text
 * Search. Raw Google names, addresses, statuses and coordinates remain in
 * memory; output contains only Ministry data, stable Place IDs and the derived
 * internal pricing region.
 *
 *   node --env-file=.env scripts/review-hotel-regions.mjs
 */
import { readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { hotelDistances } from "../src/hotel-distances.js";
import { hotelIndex, hotelSlug } from "../src/hotel-index.js";
import { routeCatalog } from "../src/routes.js";
import {
  applyReviewedPlaceOverride,
  buildRegionMatch,
  pricingRegionFromAddressComponents,
  resolvePricingRegion,
  selectOperationalHotelPlace,
} from "./lib/hotel-region-matching.mjs";

const key = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
if (!key) throw new Error("GOOGLE_MAPS_API_KEY or GOOGLE_PLACES_API_KEY is required");

const outputRoot = fileURLToPath(new URL("./hotel-discovery-pilot/", import.meta.url));
const reviewRows = JSON.parse(await readFile(join(outputRoot, "region-review-needed.json"), "utf8"));
const candidates = JSON.parse(await readFile(join(outputRoot, "missing-hotels.json"), "utf8"));

async function readOptionalJson(path, fallback) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return fallback;
    throw error;
  }
}

const previousResolved = await readOptionalJson(
  join(outputRoot, "region-review-resolved.json"),
  [],
);

const DISTRICT_RECTANGLES = Object.freeze({
  KEMER: { low: { latitude: 36.43, longitude: 30.38 }, high: { latitude: 36.80, longitude: 30.70 } },
  KONYAALTI: { low: { latitude: 36.78, longitude: 30.48 }, high: { latitude: 36.99, longitude: 31.00 } },
  MURATPAŞA: { low: { latitude: 36.78, longitude: 30.48 }, high: { latitude: 36.99, longitude: 31.00 } },
  SERİK: { low: { latitude: 36.75, longitude: 30.92 }, high: { latitude: 36.95, longitude: 31.30 } },
  MANAVGAT: { low: { latitude: 36.52, longitude: 31.14 }, high: { latitude: 36.92, longitude: 31.75 } },
  ALANYA: { low: { latitude: 36.32, longitude: 31.55 }, high: { latitude: 36.75, longitude: 32.50 } },
});

// Explicit decisions from the targeted result review. These contain only the
// chosen stable identity and internal region; no raw Google response fields.
const REVIEWED_OVERRIDES = Object.freeze({
  "11517": { placeId: "ChIJVVo-ze2R3BQRBq7_8DmzR1A", pricingRegion: "alanya_dogu" },
  "20717": { placeId: "ChIJAzIapY-i3BQRviE9z2QJvj8", pricingRegion: "alanya_merkez" },
  "17885": {
    placeId: "ChIJYzq97FNXwxQRQkAYgZvYZg8",
    pricingRegion: "side",
    name: "LAKE & RIVER SIDE HOTEL & SPA",
    aliases: ["LRS LAKE & RIVER SIDE HOTEL & SPA"],
  },
  "2022-7-0541": { placeId: "ChIJ5dqj2XGRwxQRQ-F11J7VoI4", pricingRegion: "antalya" },
  "11352": { placeId: "ChIJASy63c-CwxQRlHBoXAKcF5k", pricingRegion: "antalya" },
  "26773": { placeId: "ChIJ1b7kqguO3BQRXLF0tdUUMp4", pricingRegion: "demirtas" },
  "2022-7-1544": { placeId: "ChIJYb1wIQm_wxQR5n3eNbopV2Y", pricingRegion: "kemer" },
  "2022-7-0962": {
    placeId: "ChIJgVp4U3u3wxQRtlzQZ5Ff3Q0",
    pricingRegion: "kemer",
    name: "RIVADOR HOTEL KEMER",
    aliases: ["KORIENT MIRA OTEL"],
  },
});

const candidatesByCertificate = new Map(
  candidates.map((candidate) => [String(candidate.certificateNo), candidate]),
);
const previousResolvedByCertificate = new Map();
for (const row of previousResolved) {
  for (const certificateNo of row.certificateNos ?? []) {
    previousResolvedByCertificate.set(String(certificateNo), row);
  }
}
const currentSlugs = new Set(hotelIndex.map((hotel) => hotel.slug));
const currentBySlug = new Map(hotelIndex.map((hotel) => [hotel.slug, hotel]));
const currentSlugsByPlace = new Map();
for (const [slug, distance] of Object.entries(hotelDistances)) {
  if (!distance?.place) continue;
  currentSlugsByPlace.set(distance.place, [
    ...(currentSlugsByPlace.get(distance.place) ?? []),
    slug,
  ]);
}

async function atomicJsonPath(path, value) {
  const temporary = `${path}.tmp`;
  const json = `${JSON.stringify(value, null, 2)}\n`;
  if (/"(?:displayName|formattedAddress|location|addressComponents|businessStatus|primaryType)"\s*:/.test(json)) {
    throw new Error(`Refusing to persist raw Google content in ${path}`);
  }
  await writeFile(temporary, json);
  await rename(temporary, path);
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function searchDistrictHotel(name, district) {
  const rectangle = DISTRICT_RECTANGLES[district];
  if (!rectangle) return { place: null, reason: "unsupported-ministry-district" };
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.id,places.displayName,places.location,places.addressComponents,places.primaryType,places.businessStatus",
    },
    body: JSON.stringify({
      textQuery: `${name}, ${district}, Antalya, Türkiye`,
      locationRestriction: { rectangle },
      languageCode: "tr",
      regionCode: "TR",
    }),
  });
  const body = await response.text();
  if (!response.ok) {
    const error = new Error(`Places Text Search ${response.status}: ${body.slice(0, 240)}`);
    error.fatal = [400, 401, 403].includes(response.status);
    throw error;
  }
  const places = JSON.parse(body).places ?? [];
  return {
    place: selectOperationalHotelPlace(name, places),
    reason: places.length ? "targeted-no-unique-operational-match" : "targeted-no-results",
  };
}

function candidateGroup(reviewRow, placeId = reviewRow.placeId) {
  return {
    placeId,
    candidates: reviewRow.certificateNos
      .map((certificateNo) => candidatesByCertificate.get(String(certificateNo)))
      .filter(Boolean),
  };
}

function safeExistingRow(reviewRow, resolvedPlaceId, slugs) {
  const hotels = slugs.map((slug) => currentBySlug.get(slug)).filter(Boolean);
  return {
    name: reviewRow.name,
    certificateNos: reviewRow.certificateNos,
    ministryDistricts: reviewRow.ministryDistricts,
    placeId: resolvedPlaceId,
    currentSlugs: slugs,
    currentNames: hotels.map((hotel) => hotel.name),
    pricingRegions: [...new Set(hotels.map((hotel) => hotel.region))],
    status: "existing",
  };
}

const resolved = [];
const existing = [];
const unresolved = [];
let calls = 0;

for (const [index, reviewRow] of reviewRows.entries()) {
  const group = candidateGroup(reviewRow);
  if (!group.candidates.length) {
    unresolved.push({ ...reviewRow, resolutionReason: "ministry-candidate-not-found" });
    continue;
  }

  const reviewedOverride = reviewRow.certificateNos
    .map((certificateNo) => REVIEWED_OVERRIDES[String(certificateNo)])
    .find(Boolean);
  if (reviewedOverride) {
    const existingSlugs = currentSlugsByPlace.get(reviewedOverride.placeId);
    if (existingSlugs) {
      existing.push(safeExistingRow(reviewRow, reviewedOverride.placeId, existingSlugs));
      continue;
    }
    const match = applyReviewedPlaceOverride(group, reviewedOverride, {
      routeCatalog,
      hotelSlug,
      currentSlugs,
    });
    if (match?.status === "ready") resolved.push(match);
    else unresolved.push({ ...reviewRow, resolutionReason: "reviewed-override-conflict" });
    continue;
  }

  const previous = reviewRow.certificateNos
    .map((certificateNo) => previousResolvedByCertificate.get(String(certificateNo)))
    .find(Boolean);
  if (previous?.status === "ready") {
    resolved.push(previous);
    continue;
  }

  // Some rows become deterministic when the matching rules improve. Resolve
  // those without spending another Places request.
  const spatialReason = reviewRow.reviewReasons.find((reason) => reason === "near-pricing-boundary");
  const rebuilt = buildRegionMatch(group, {
    region: reviewRow.pricingRegion,
    review: Boolean(spatialReason),
    ...(spatialReason ? { reason: spatialReason } : {}),
  }, { routeCatalog, hotelSlug, currentSlugs });
  if (rebuilt.status === "ready") {
    resolved.push(rebuilt);
    continue;
  }

  const district = reviewRow.ministryDistricts[0];
  try {
    calls += 1;
    const search = await searchDistrictHotel(reviewRow.name, district);
    if (!search.place) {
      unresolved.push({ ...reviewRow, resolutionReason: search.reason });
      continue;
    }

    const resolvedPlaceId = search.place.id;
    const existingSlugs = currentSlugsByPlace.get(resolvedPlaceId);
    if (existingSlugs) {
      existing.push(safeExistingRow(reviewRow, resolvedPlaceId, existingSlugs));
      continue;
    }

    const addressRegion = pricingRegionFromAddressComponents(search.place.addressComponents);
    const classification = addressRegion
      ? { region: addressRegion, review: false }
      : resolvePricingRegion(search.place.location);
    const match = buildRegionMatch(candidateGroup(reviewRow, resolvedPlaceId), classification, {
      routeCatalog,
      hotelSlug,
      currentSlugs,
    });
    if (match.status === "ready") {
      resolved.push(match);
    } else {
      unresolved.push({ ...match, resolutionReason: "targeted-match-still-ambiguous" });
    }
  } catch (error) {
    unresolved.push({
      ...reviewRow,
      resolutionReason: "targeted-search-error",
      error: String(error?.message ?? error).slice(0, 300),
    });
    if (error?.fatal) throw error;
  } finally {
    console.error(`${index + 1}/${reviewRows.length} review rows; ${calls} Places Text Search calls`);
    await wait(100);
  }
}

const byRegionAndName = (left, right) =>
  String(left.pricingRegion).localeCompare(String(right.pricingRegion))
  || left.name.localeCompare(right.name, "tr");
resolved.sort(byRegionAndName);
existing.sort((left, right) => left.name.localeCompare(right.name, "tr"));
unresolved.sort(byRegionAndName);

await Promise.all([
  atomicJsonPath(join(outputRoot, "region-review-resolved.json"), resolved),
  atomicJsonPath(join(outputRoot, "region-review-existing.json"), existing),
  atomicJsonPath(join(outputRoot, "region-review-unresolved.json"), unresolved),
]);

console.log(JSON.stringify({
  sourceReviewRows: reviewRows.length,
  placesTextSearchCalls: calls,
  resolvedNew: resolved.length,
  resolvedExisting: existing.length,
  unresolved: unresolved.length,
}, null, 2));
