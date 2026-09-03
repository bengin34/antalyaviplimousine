/**
 * Reconciles confirmed discovery candidates with the current hotel index and
 * assigns new Google identities to commercial pricing regions.
 *
 * Raw Places names, addresses, statuses, and coordinates are never persisted.
 * Only the stable Place ID and the derived internal pricing classification are
 * written to the review artifacts.
 *
 *   export GOOGLE_MAPS_API_KEY="..."
 *   node scripts/match-hotel-regions.mjs
 *   node scripts/match-hotel-regions.mjs --resume
 */
import { readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { hotelDistances } from "../src/hotel-distances.js";
import { hotelIndex, hotelSlug } from "../src/hotel-index.js";
import { routeCatalog } from "../src/routes.js";
import {
  buildRegionMatch,
  groupCandidatesByPlace,
  resolvePricingRegion,
  summarizeRegionMatches,
} from "./lib/hotel-region-matching.mjs";

const key = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
if (!key) throw new Error("GOOGLE_MAPS_API_KEY or GOOGLE_PLACES_API_KEY is required");

const args = process.argv.slice(2);
const resume = args.includes("--resume");
const maxCallsAt = args.indexOf("--max-calls");
const maxCalls = maxCallsAt >= 0 ? Number(args[maxCallsAt + 1]) : 500;
if (!Number.isInteger(maxCalls) || maxCalls < 1 || maxCalls > 500) {
  throw new Error("--max-calls must be an integer from 1 to 500");
}

const outputRoot = fileURLToPath(new URL("./hotel-discovery-pilot/", import.meta.url));
const checkpointPath = join(outputRoot, "region-price-checkpoint.json");
const candidates = JSON.parse(await readFile(join(outputRoot, "missing-hotels.json"), "utf8"));
const grouped = groupCandidatesByPlace(candidates, hotelDistances);
const currentBySlug = new Map(hotelIndex.map((hotel) => [hotel.slug, hotel]));
const currentSlugs = new Set(currentBySlug.keys());

async function atomicJsonPath(path, value) {
  const temporary = `${path}.tmp`;
  const json = `${JSON.stringify(value, null, 2)}\n`;
  if (/"(?:displayName|formattedAddress|location|addressComponents|businessStatus)"\s*:/.test(json)) {
    throw new Error(`Refusing to persist raw Google content in ${path}`);
  }
  await writeFile(temporary, json);
  await rename(temporary, path);
}

const existingMatches = grouped.existing.map((group) => {
  const hotels = group.currentSlugs.map((slug) => currentBySlug.get(slug)).filter(Boolean);
  const regions = [...new Set(hotels.map((hotel) => hotel.region))];
  const region = regions.length === 1 ? regions[0] : null;
  const route = region ? routeCatalog[region] : null;
  return {
    placeId: group.placeId,
    candidateNames: [...new Set(group.candidates.map((row) => row.name))],
    certificateNos: [...new Set(group.candidates.map((row) => String(row.certificateNo)))],
    currentSlugs: group.currentSlugs,
    currentNames: hotels.map((hotel) => hotel.name),
    pricingRegion: region,
    pricingName: route?.names?.tr ?? null,
    prices: route?.prices ?? null,
    status: regions.length === 1 ? "existing" : "review",
    reviewReasons: regions.length === 1 ? [] : ["current-place-id-has-multiple-regions"],
  };
});

let checkpoint = { schemaVersion: 1, completed: {}, failures: {}, calls: 0 };
if (resume) {
  checkpoint = JSON.parse(await readFile(checkpointPath, "utf8"));
}

// Re-apply deterministic review rules on resume without another API call.
// This lets stricter duplicate/conflict checks update existing checkpoints.
const newGroupByPlace = new Map(grouped.newPlaces.map((group) => [group.placeId, group]));
for (const [placeId, previous] of Object.entries(checkpoint.completed)) {
  const group = newGroupByPlace.get(placeId);
  if (!group) continue;
  const spatialReason = previous.reviewReasons?.find((reason) =>
    reason === "near-pricing-boundary" || reason === "outside-pricing-corridor");
  checkpoint.completed[placeId] = buildRegionMatch(group, {
    region: previous.pricingRegion,
    review: Boolean(spatialReason),
    ...(spatialReason ? { reason: spatialReason } : {}),
  }, { routeCatalog, hotelSlug, currentSlugs });
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
async function fetchLocation(placeId) {
  const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "id,location",
    },
  });
  const body = await response.text();
  if (!response.ok) {
    const error = new Error(`Places API ${response.status}: ${body.slice(0, 240)}`);
    error.fatal = [400, 401, 403].includes(response.status);
    throw error;
  }
  const parsed = JSON.parse(body);
  if (!parsed.location) throw new Error("Places response has no location");
  return parsed.location;
}

const pending = grouped.newPlaces.filter((group) => !checkpoint.completed[group.placeId]);
let callsThisRun = 0;
for (const group of pending) {
  if (callsThisRun >= maxCalls) break;
  callsThisRun += 1;
  try {
    const location = await fetchLocation(group.placeId);
    const classification = resolvePricingRegion(location);
    checkpoint.completed[group.placeId] = buildRegionMatch(group, classification, {
      routeCatalog,
      hotelSlug,
      currentSlugs,
    });
    delete checkpoint.failures[group.placeId];
  } catch (error) {
    checkpoint.failures[group.placeId] = String(error?.message ?? error).slice(0, 300);
    if (error?.fatal) {
      await atomicJsonPath(checkpointPath, checkpoint);
      throw error;
    }
  }
  checkpoint.calls += 1;
  await atomicJsonPath(checkpointPath, checkpoint);
  if (callsThisRun === 1 || callsThisRun % 25 === 0) {
    console.error(`${callsThisRun}/${Math.min(pending.length, maxCalls)} Places Details calls`);
  }
  await wait(100);
}

const completedMatches = Object.values(checkpoint.completed);
const ready = completedMatches
  .filter((row) => row.status === "ready")
  .sort((a, b) => a.pricingRegion.localeCompare(b.pricingRegion) || a.name.localeCompare(b.name, "tr"));
const review = completedMatches
  .filter((row) => row.status === "review")
  .sort((a, b) => String(a.pricingRegion).localeCompare(String(b.pricingRegion)) || a.name.localeCompare(b.name, "tr"));

const report = summarizeRegionMatches({
  generatedAt: new Date().toISOString(),
  sourceCandidateRows: candidates.length,
  existingPlaceCount: existingMatches.length,
  newPlaceCount: grouped.newPlaces.length,
  fetchAttempts: checkpoint.calls,
  completedMatches,
  failures: checkpoint.failures,
});

const csvFields = [
  "proposedSlug", "name", "certificateNos", "ministryDistricts", "placeId",
  "pricingRegion", "pricingName", "vitoPrice", "sprinterPrice", "status", "reviewReasons",
];
const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const csvRows = [...ready, ...review].map((row) => ({
  ...row,
  certificateNos: row.certificateNos.join("|"),
  ministryDistricts: row.ministryDistricts.join("|"),
  vitoPrice: row.prices?.vito ?? "",
  sprinterPrice: row.prices?.sprinter ?? "",
  reviewReasons: row.reviewReasons.join("|"),
}));
const csv = [
  csvFields.join(","),
  ...csvRows.map((row) => csvFields.map((field) => csvCell(row[field])).join(",")),
].join("\n") + "\n";

await Promise.all([
  atomicJsonPath(join(outputRoot, "existing-place-id-matches.json"), existingMatches),
  atomicJsonPath(join(outputRoot, "region-price-matches.json"), ready),
  atomicJsonPath(join(outputRoot, "region-review-needed.json"), review),
  atomicJsonPath(join(outputRoot, "region-price-report.json"), report),
  writeFile(join(outputRoot, "region-price-matches.csv"), csv),
]);

console.log(JSON.stringify(report, null, 2));
