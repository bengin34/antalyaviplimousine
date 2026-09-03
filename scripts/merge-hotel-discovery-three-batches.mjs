import { readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { hotelIndex } from "../src/hotel-index.js";
import { findPossibleCurrentMatch, mergeHotelClassifications } from "./lib/hotel-discovery-pilot.mjs";

const root = fileURLToPath(new URL("./hotel-discovery-pilot/", import.meta.url));
const readJson = async (base, name) => JSON.parse(await readFile(join(base, name), "utf8"));
const optionalJson = async (base, name) => readJson(base, name).catch(() => []);

async function loadBatch(id) {
  const base = join(root, "batches", `batch-${id}`);
  const missingRows = await readJson(base, "missing-hotels.json");
  const missing = [];
  const possibleDuplicates = await optionalJson(base, "possible-duplicates.json");
  for (const row of missingRows) {
    const possible = findPossibleCurrentMatch(row, hotelIndex);
    if (possible) {
      possibleDuplicates.push({
        ...row,
        possibleCurrentSlug: possible.slug,
        similarity: Number(possible.score.toFixed(3)),
        reason: "possible-current-name-duplicate",
      });
    } else missing.push(row);
  }
  return {
    id,
    base,
    classification: {
      missing,
      known: await readJson(base, "known-hotels.json"),
      possibleDuplicates,
      unverifiedMinistry: await readJson(base, "unverified-ministry.json"),
      statusConflicts: await readJson(base, "status-conflicts.json"),
    },
    unmatched: await readJson(base, "google-unmatched-place-ids.json"),
    evidence: await optionalJson(base, "evidence.json"),
    coverage: await readJson(base, "coverage-report.json"),
  };
}

const batches = await Promise.all([1, 2, 3].map(loadBatch));
const merged = mergeHotelClassifications(batches.map((batch) => batch.classification));

const associatedIds = new Set(batches.flatMap((batch) => batch.evidence)
  .filter((row) => row.ministryCertificateNos.length || row.currentSlugs.length)
  .map((row) => row.placeId));
const googleUnmatchedPlaceIds = [...new Map(
  batches.flatMap((batch) => batch.unmatched)
    .filter((row) => !associatedIds.has(row.placeId))
    .map((row) => [row.placeId, row]),
).values()].sort((a, b) => a.placeId.localeCompare(b.placeId));

const persistentPlaceIds = new Set([
  ...batches.flatMap((batch) => batch.unmatched.map((row) => row.placeId)),
  ...batches.flatMap((batch) => batch.evidence.map((row) => row.placeId)),
  ...merged.missing.map((row) => row.placeId).filter(Boolean),
  ...merged.statusConflicts.map((row) => row.placeId).filter(Boolean),
]);
const residualSaturationCellIds = [...new Set(
  batches.flatMap((batch) => batch.coverage.residualSaturationCellIds ?? []),
)];
const latestCheckpointQueue = batches[2].coverage.queuedCellCount;
const attempts = batches.reduce((sum, batch) => sum + batch.coverage.attempts, 0);
const rawListPriceExposureUsd = Number(
  batches.reduce((sum, batch) => sum + batch.coverage.rawListPriceExposureUsd, 0).toFixed(2),
);
const coverage = {
  schemaVersion: 3,
  runType: "cumulative-hotel-discovery-pilot",
  completedAt: new Date().toISOString(),
  ministrySource: batches[2].coverage.ministrySource,
  ministryHotelCount: batches[2].coverage.ministryHotelCount,
  attempts,
  hardLimitPerBatch: 1000,
  rawListPriceExposureUsd,
  globalRootCellCount: batches[2].coverage.globalRootCellCount,
  rootCellsScanned: batches[2].coverage.globalRootCellCount,
  queuedAdaptiveCellCount: latestCheckpointQueue,
  failedCellCount: batches.reduce((sum, batch) => sum + batch.coverage.failedCellCount, 0),
  residualSaturationCount: residualSaturationCellIds.length,
  residualSaturationCellIds,
  uniquePlaceIdCountAtLeast: persistentPlaceIds.size,
  knownCount: merged.known.length,
  missingCount: merged.missing.length,
  possibleDuplicateCount: merged.possibleDuplicates.length,
  unverifiedMinistryCount: merged.unverifiedMinistry.length,
  statusConflictCount: merged.statusConflicts.length,
  googleUnmatchedPlaceIdCount: googleUnmatchedPlaceIds.length,
  complete: latestCheckpointQueue === 0 && residualSaturationCellIds.length === 0,
  incompleteReasons: [
    ...(latestCheckpointQueue ? [`${latestCheckpointQueue} adaptive cells remain in the resumable batch-3 checkpoint`] : []),
    ...(residualSaturationCellIds.length ? [`${residualSaturationCellIds.length} minimum-size cells still returned 20 results`] : []),
  ],
  batches: batches.map((batch) => batch.coverage),
};

async function atomicJson(name, value) {
  const output = join(root, name);
  const temporary = `${output}.tmp`;
  const json = `${JSON.stringify(value, null, 2)}\n`;
  if (/"(?:displayName|formattedAddress|location|primaryType|businessStatus)"\s*:/.test(json)) {
    throw new Error(`Refusing to persist raw Google content in ${name}`);
  }
  await writeFile(temporary, json);
  await rename(temporary, output);
}

const csvFields = ["certificateNo", "name", "documentType", "facilityType", "facilityClass", "city", "district", "placeId", "reason", "firstPartySource"];
const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const csv = [csvFields.join(","), ...merged.missing.map((row) => csvFields.map((field) => csvCell(row[field])).join(","))].join("\n") + "\n";

await Promise.all([
  atomicJson("missing-hotels.json", merged.missing),
  atomicJson("known-hotels.json", merged.known),
  atomicJson("possible-duplicates.json", merged.possibleDuplicates),
  atomicJson("unverified-ministry.json", merged.unverifiedMinistry),
  atomicJson("status-conflicts.json", merged.statusConflicts),
  atomicJson("google-unmatched-place-ids.json", googleUnmatchedPlaceIds),
  atomicJson("coverage-report.json", coverage),
  writeFile(join(root, "missing-hotels.csv"), csv),
]);

console.log(JSON.stringify({
  attempts,
  missing: merged.missing.length,
  known: merged.known.length,
  possibleDuplicates: merged.possibleDuplicates.length,
  unverified: merged.unverifiedMinistry.length,
  queuedAdaptiveCells: coverage.queuedAdaptiveCellCount,
  residualSaturation: coverage.residualSaturationCount,
}, null, 2));
