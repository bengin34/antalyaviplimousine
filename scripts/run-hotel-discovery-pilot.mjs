import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { hotelIndex } from "../src/hotel-index.js";
import {
  buildNearbyRequest,
  buildRootCells,
  classifyMinistryHotels,
  extractMinistryRows,
  filterMinistryHotels,
  hotelNameKey,
  runAdaptiveScan,
  selectBatchOneRecoveryRoots,
  selectRootCells,
} from "./lib/hotel-discovery-pilot.mjs";

const MINISTRY_URL = "https://www.ktb.gov.tr/genel/searchhotelgenel.aspx?lang=tr";
const HARD_MAX_CALLS = 1000;
const key = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
if (!key) throw new Error("GOOGLE_MAPS_API_KEY or GOOGLE_PLACES_API_KEY is required");

const requestedCallsAt = process.argv.indexOf("--max-calls");
const requestedCalls = requestedCallsAt >= 0 ? Number(process.argv[requestedCallsAt + 1]) : HARD_MAX_CALLS;
if (!Number.isInteger(requestedCalls) || requestedCalls < 1 || requestedCalls > HARD_MAX_CALLS) {
  throw new Error(`--max-calls must be an integer from 1 to ${HARD_MAX_CALLS}`);
}
const rootOffsetAt = process.argv.indexOf("--root-offset");
const rootOffset = rootOffsetAt >= 0 ? Number(process.argv[rootOffsetAt + 1]) : 0;
const batchIdAt = process.argv.indexOf("--batch-id");
const batchId = batchIdAt >= 0 ? Number(process.argv[batchIdAt + 1]) : 1;
const resume = process.argv.includes("--resume");
const recoverBatchOne = process.argv.includes("--recover-batch-one");
if (!Number.isInteger(batchId) || batchId < 1) throw new Error("--batch-id must be a positive integer");

const ministryResponse = await fetch(MINISTRY_URL, {
  headers: { "User-Agent": "AntalyaVipHotelDiscoveryPilot/1.0" },
});
if (!ministryResponse.ok) throw new Error(`Ministry source failed: ${ministryResponse.status}`);
const retrievedAt = new Date().toISOString();
const ministryRows = filterMinistryHotels(extractMinistryRows(await ministryResponse.text()));
if (ministryRows.length === 0) throw new Error("Ministry source produced zero in-scope hotels");

const rootCells = buildRootCells(2000);
const selectedRootCells = recoverBatchOne
  ? selectBatchOneRecoveryRoots(rootCells)
  : selectRootCells(rootCells, rootOffset);
const outputRoot = fileURLToPath(new URL(`./hotel-discovery-pilot/batches/batch-${batchId}/`, import.meta.url));
const checkpointPath = join(outputRoot, "checkpoint.json");
await mkdir(outputRoot, { recursive: true });
const initialState = resume ? JSON.parse(await readFile(checkpointPath, "utf8")) : null;
console.error(`Pilot batch ${batchId}: ${ministryRows.length} Ministry hotels, ${selectedRootCells.length} ${recoverBatchOne ? "batch-1 recovery" : `roots from offset ${rootOffset}`}, hard limit ${requestedCalls} Google calls.`);

async function atomicJsonPath(output, value) {
  const temporary = `${output}.tmp`;
  const json = `${JSON.stringify(value, null, 2)}\n`;
  if (/"(?:displayName|formattedAddress|location|primaryType|businessStatus)"\s*:/.test(json)) {
    throw new Error(`Refusing to persist raw Google content in ${output}`);
  }
  await writeFile(temporary, json);
  await rename(temporary, output);
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const search = async (cell) => {
  const request = buildNearbyRequest(cell, key);
  const response = await fetch(request.url, {
    method: "POST",
    headers: request.headers,
    body: JSON.stringify(request.body),
  });
  const body = await response.text();
  await wait(120);
  if (!response.ok) {
    const error = new Error(`Places API ${response.status}: ${body.slice(0, 300)}`);
    error.fatal = [400, 401, 403].includes(response.status);
    throw error;
  }
  const parsed = JSON.parse(body);
  if (!Array.isArray(parsed.places) && parsed.places !== undefined) throw new Error("Places response has invalid shape");
  return parsed.places ?? [];
};

const state = await runAdaptiveScan({
  maxCalls: requestedCalls,
  rootCells: selectedRootCells,
  initialState,
  search,
  context: { ministryRows, currentHotels: hotelIndex },
  onCheckpoint: (snapshot) => atomicJsonPath(checkpointPath, snapshot),
  onProgress: ({ attempts, maxCalls, queue, uniquePlaces, failed }) => {
    console.error(`${attempts}/${maxCalls} calls | ${uniquePlaces} unique IDs | ${queue} queued | ${failed} failed | raw list price $${(attempts * 0.032).toFixed(2)}`);
  },
});

const classified = classifyMinistryHotels({
  ministryRows,
  currentHotels: hotelIndex,
  evidence: state.evidence,
});

const coverage = {
  schemaVersion: 1,
  runType: "1000-call-pilot",
  batchId,
  rootOffset,
  selectionMode: recoverBatchOne ? "batch-1-saturation-recovery" : "root-offset",
  retrievedAt,
  completedAt: new Date().toISOString(),
  ministrySource: MINISTRY_URL,
  ministryHotelCount: ministryRows.length,
  globalRootCellCount: rootCells.length,
  rootCellCount: selectedRootCells.length,
  attempts: state.attempts,
  hardLimit: HARD_MAX_CALLS,
  requestedLimit: requestedCalls,
  completedCellCount: state.completedCells,
  queuedCellCount: state.queue.length,
  failedCellCount: state.failedCells.length,
  failedCells: state.failedCells,
  residualSaturationCount: state.residualSaturation.length,
  residualSaturationCellIds: state.residualSaturation,
  uniquePlaceIdCount: state.evidence.length,
  knownCount: classified.known.length,
  missingCount: classified.missing.length,
  unverifiedMinistryCount: classified.unverifiedMinistry.length,
  statusConflictCount: classified.statusConflicts.length,
  googleUnmatchedPlaceIdCount: classified.googleUnmatchedPlaceIds.length,
  complete: state.complete,
  rawListPriceExposureUsd: Number((state.attempts * 0.032).toFixed(2)),
  note: "Pilot output is incomplete when queuedCellCount, failedCellCount, or residualSaturationCount is non-zero.",
};

async function atomicJson(name, value) {
  const output = join(outputRoot, name);
  await atomicJsonPath(output, value);
}

const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const csvHeader = ["certificateNo", "name", "documentType", "facilityType", "facilityClass", "city", "district", "placeId", "reason"];
const csv = [
  csvHeader.join(","),
  ...classified.missing.map((row) => csvHeader.map((field) => csvCell(row[field])).join(",")),
].join("\n") + "\n";

await Promise.all([
  atomicJson("missing-hotels.json", classified.missing),
  atomicJson("known-hotels.json", classified.known),
  atomicJson("unverified-ministry.json", classified.unverifiedMinistry),
  atomicJson("status-conflicts.json", classified.statusConflicts),
  atomicJson("google-unmatched-place-ids.json", classified.googleUnmatchedPlaceIds),
  atomicJson("evidence.json", state.evidence),
  atomicJson("coverage-report.json", coverage),
  writeFile(join(outputRoot, "missing-hotels.csv"), csv),
]);

const sideSun = [
  ...classified.missing,
  ...classified.known,
  ...classified.unverifiedMinistry,
  ...classified.statusConflicts,
].find((row) => hotelNameKey(row.name) === "side sun");

console.error(`Done: ${classified.missing.length} confirmed missing, ${classified.known.length} known, ${classified.unverifiedMinistry.length} unverified, ${classified.statusConflicts.length} status conflicts.`);
console.error(`Side Sun: ${sideSun ? `${sideSun.reason}${sideSun.placeId ? ` (${sideSun.placeId})` : ""}` : "not in Ministry scope"}`);
console.error(`Reports: ${outputRoot}`);
