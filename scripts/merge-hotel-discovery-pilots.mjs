import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { hotelIndex } from "../src/hotel-index.js";
import { findPossibleCurrentMatch, mergeHotelClassifications } from "./lib/hotel-discovery-pilot.mjs";

const root = fileURLToPath(new URL("./hotel-discovery-pilot/", import.meta.url));
const batch1Root = join(root, "batches", "batch-1");
const batch2Root = join(root, "batches", "batch-2");
const readJson = async (base, name) => JSON.parse(await readFile(join(base, name), "utf8"));

const batch1 = {
  missing: await readJson(root, "missing-hotels.json"),
  known: await readJson(root, "known-hotels.json"),
  possibleDuplicates: await readJson(root, "possible-duplicates.json"),
  unverifiedMinistry: await readJson(root, "unverified-ministry.json"),
  statusConflicts: await readJson(root, "status-conflicts.json"),
};
const batch1Coverage = await readJson(root, "coverage-report.json");
const batch1Unmatched = await readJson(root, "google-unmatched-place-ids.json");

const batch2Missing = await readJson(batch2Root, "missing-hotels.json");
const batch2Possible = [];
const batch2ConfirmedMissing = [];
for (const row of batch2Missing) {
  const possible = findPossibleCurrentMatch(row, hotelIndex);
  if (possible) {
    batch2Possible.push({
      ...row,
      possibleCurrentSlug: possible.slug,
      similarity: Number(possible.score.toFixed(3)),
      reason: "possible-current-name-duplicate",
    });
  } else batch2ConfirmedMissing.push(row);
}

const batch2 = {
  missing: batch2ConfirmedMissing,
  known: await readJson(batch2Root, "known-hotels.json"),
  possibleDuplicates: batch2Possible,
  unverifiedMinistry: await readJson(batch2Root, "unverified-ministry.json"),
  statusConflicts: await readJson(batch2Root, "status-conflicts.json"),
};
const batch2Coverage = await readJson(batch2Root, "coverage-report.json");
const batch2Unmatched = await readJson(batch2Root, "google-unmatched-place-ids.json");
const batch2Evidence = await readJson(batch2Root, "evidence.json");

const merged = mergeHotelClassifications([batch1, batch2]);
const batch2AssociatedIds = new Set(batch2Evidence
  .filter((row) => row.ministryCertificateNos.length || row.currentSlugs.length)
  .map((row) => row.placeId));
const unmatchedById = new Map(
  [...batch1Unmatched, ...batch2Unmatched]
    .filter((row) => !batch2AssociatedIds.has(row.placeId))
    .map((row) => [row.placeId, row]),
);
const googleUnmatchedPlaceIds = [...unmatchedById.values()].sort((a, b) => a.placeId.localeCompare(b.placeId));

const remainingBatch1Children = Math.max(0, batch1Coverage.queuedCellCount - batch2Coverage.rootCellCount);
const persistentPlaceIds = new Set([
  ...batch1Unmatched.map((row) => row.placeId),
  ...batch1.missing.map((row) => row.placeId).filter(Boolean),
  ...batch1.statusConflicts.map((row) => row.placeId).filter(Boolean),
  ...batch2Evidence.map((row) => row.placeId),
]);
const coverage = {
  schemaVersion: 2,
  runType: "cumulative-hotel-discovery-pilot",
  completedAt: new Date().toISOString(),
  ministrySource: batch2Coverage.ministrySource,
  ministryHotelCount: batch2Coverage.ministryHotelCount,
  attempts: batch1Coverage.attempts + batch2Coverage.attempts,
  hardLimitPerBatch: 1000,
  rawListPriceExposureUsd: Number((batch1Coverage.rawListPriceExposureUsd + batch2Coverage.rawListPriceExposureUsd).toFixed(2)),
  globalRootCellCount: batch2Coverage.globalRootCellCount,
  rootCellsScanned: batch2Coverage.globalRootCellCount,
  queuedAdaptiveCellCount: remainingBatch1Children,
  failedCellCount: batch1Coverage.failedCellCount + batch2Coverage.failedCellCount,
  residualSaturationCount: batch1Coverage.residualSaturationCount + batch2Coverage.residualSaturationCount,
  residualSaturationCellIds: batch2Coverage.residualSaturationCellIds,
  uniquePlaceIdCountAtLeast: persistentPlaceIds.size,
  knownCount: merged.known.length,
  missingCount: merged.missing.length,
  possibleDuplicateCount: merged.possibleDuplicates.length,
  unverifiedMinistryCount: merged.unverifiedMinistry.length,
  statusConflictCount: merged.statusConflicts.length,
  googleUnmatchedPlaceIdCount: googleUnmatchedPlaceIds.length,
  complete: false,
  incompleteReasons: [
    `${remainingBatch1Children} saturated child cells from batch 1 remain unscanned`,
    `${batch2Coverage.residualSaturationCount} minimum-size cells still returned 20 results`,
  ],
  batches: [batch1Coverage, batch2Coverage],
};

async function atomicJson(base, name, value) {
  await mkdir(base, { recursive: true });
  const output = join(base, name);
  const temporary = `${output}.tmp`;
  const json = `${JSON.stringify(value, null, 2)}\n`;
  if (/"(?:displayName|formattedAddress|location|primaryType|businessStatus)"\s*:/.test(json)) {
    throw new Error(`Refusing to persist raw Google content in ${name}`);
  }
  await writeFile(temporary, json);
  await rename(temporary, output);
}

await mkdir(batch1Root, { recursive: true });
await Promise.all([
  atomicJson(batch1Root, "missing-hotels.json", batch1.missing),
  atomicJson(batch1Root, "known-hotels.json", batch1.known),
  atomicJson(batch1Root, "possible-duplicates.json", batch1.possibleDuplicates),
  atomicJson(batch1Root, "unverified-ministry.json", batch1.unverifiedMinistry),
  atomicJson(batch1Root, "status-conflicts.json", batch1.statusConflicts),
  atomicJson(batch1Root, "google-unmatched-place-ids.json", batch1Unmatched),
  atomicJson(batch1Root, "coverage-report.json", batch1Coverage),
]);

const csvFields = ["certificateNo", "name", "documentType", "facilityType", "facilityClass", "city", "district", "placeId", "reason", "firstPartySource"];
const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const csv = [csvFields.join(","), ...merged.missing.map((row) => csvFields.map((field) => csvCell(row[field])).join(","))].join("\n") + "\n";

await Promise.all([
  atomicJson(root, "missing-hotels.json", merged.missing),
  atomicJson(root, "known-hotels.json", merged.known),
  atomicJson(root, "possible-duplicates.json", merged.possibleDuplicates),
  atomicJson(root, "unverified-ministry.json", merged.unverifiedMinistry),
  atomicJson(root, "status-conflicts.json", merged.statusConflicts),
  atomicJson(root, "google-unmatched-place-ids.json", googleUnmatchedPlaceIds),
  atomicJson(root, "coverage-report.json", coverage),
  writeFile(join(root, "missing-hotels.csv"), csv),
]);

console.log(JSON.stringify({
  attempts: coverage.attempts,
  missing: merged.missing.length,
  known: merged.known.length,
  possibleDuplicates: merged.possibleDuplicates.length,
  unverified: merged.unverifiedMinistry.length,
  queuedAdaptiveCells: coverage.queuedAdaptiveCellCount,
  residualSaturation: coverage.residualSaturationCount,
}, null, 2));
