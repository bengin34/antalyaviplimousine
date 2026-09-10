/**
 * Layer 1 of the hotel region audit: verifies every indexed hotel's pricing
 * region against Google Places address data and flips `checked: true` in
 * src/hotel-distances.js for rows the evidence confirms.
 *
 * Raw Places names, addresses, statuses, and coordinates are never persisted.
 * The checkpoint and report record only derived classifications.
 *
 *   set -a; . ./.env; set +a
 *   node scripts/audit-hotel-regions.mjs                 # resume if a checkpoint exists
 *   node scripts/audit-hotel-regions.mjs --fresh         # discard the checkpoint
 *   node scripts/audit-hotel-regions.mjs --max-calls 300
 *   node scripts/audit-hotel-regions.mjs --slug kirman-belazur-resort-spa
 *   node scripts/audit-hotel-regions.mjs --only-unchecked
 *
 * Writes scripts/hotel-region-audit/{checkpoint,report}.json, report.md and
 * src/hotel-distances.js (checked flags only). A --slug run prints its result
 * but leaves report.json/report.md alone.
 */
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { hotelIndex } from "../src/hotel-index.js";
import { hotelDistances } from "../src/hotel-distances.js";
import { routeCatalog } from "../src/routes.js";
import { renderHotelDistancesFile } from "./lib/hotel-distances-merge.mjs";
import { classifyAuditRow, buildAuditReport, renderAuditTable } from "./lib/hotel-region-audit.mjs";

const key = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
if (!key) throw new Error("GOOGLE_MAPS_API_KEY or GOOGLE_PLACES_API_KEY is required");

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const maxCalls = Number(value("--max-calls", 2000));
if (!Number.isInteger(maxCalls) || maxCalls < 1 || maxCalls > 2000) throw new Error("--max-calls must be 1..2000");
const onlySlug = value("--slug", null);
if (args.includes("--slug") && (!onlySlug || onlySlug.startsWith("--"))) {
  throw new Error("--slug needs a hotel slug; a bare --slug would silently become a full paid pass");
}
const onlyUnchecked = flag("--only-unchecked");
const fresh = flag("--fresh");

const outputRoot = fileURLToPath(new URL("./hotel-region-audit/", import.meta.url));
await mkdir(outputRoot, { recursive: true });
const checkpointPath = join(outputRoot, "checkpoint.json");
const distancesPath = fileURLToPath(new URL("../src/hotel-distances.js", import.meta.url));

async function atomicJson(path, valueToWrite) {
  const json = `${JSON.stringify(valueToWrite, null, 2)}\n`;
  if (/"(?:displayName|formattedAddress|location|addressComponents|businessStatus)"\s*:/.test(json)) {
    throw new Error(`Refusing to persist raw Google content in ${path}`);
  }
  await writeFile(`${path}.tmp`, json);
  await rename(`${path}.tmp`, path);
}

let checkpoint = { schemaVersion: 1, completed: {}, failures: {}, calls: 0 };
if (!fresh && existsSync(checkpointPath)) checkpoint = JSON.parse(await readFile(checkpointPath, "utf8"));
if (onlySlug) delete checkpoint.completed[onlySlug]; // a --slug run always re-verifies

const targets = hotelIndex.filter((hotel) => {
  if (onlySlug) return hotel.slug === onlySlug;
  if (onlyUnchecked) return hotelDistances[hotel.slug]?.checked !== true;
  return true;
});
if (onlySlug && targets.length === 0) throw new Error(`No indexed hotel with slug ${onlySlug}`);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function fetchDetails(placeId) {
  const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "id,displayName,formattedAddress,addressComponents,businessStatus,primaryType",
    },
  });
  const body = await response.text();
  // 404 = Place ID unknown; 400 = malformed Place ID. Both are evidence about
  // this row, not about the run, so they classify as gone instead of aborting.
  if (response.status === 404 || response.status === 400) return { notFound: true };
  if (!response.ok) {
    // Only the status is recorded: the body is raw Google text and the
    // checkpoint must never carry any.
    const error = new Error(`Places API ${response.status}`);
    error.fatal = [401, 403].includes(response.status);
    if (error.fatal) console.error(body.slice(0, 240));
    throw error;
  }
  return { place: JSON.parse(body) };
}

const pending = targets.filter((hotel) => !checkpoint.completed[hotel.slug]);
console.error(`${targets.length} targets, ${pending.length} pending, cap ${maxCalls}`);
let calls = 0;
for (const hotel of pending) {
  if (calls >= maxCalls) break;
  calls += 1;
  const placeId = hotelDistances[hotel.slug]?.place;
  try {
    const details = placeId ? await fetchDetails(placeId) : { notFound: true };
    checkpoint.completed[hotel.slug] = classifyAuditRow(hotel, details, routeCatalog);
    delete checkpoint.failures[hotel.slug];
  } catch (error) {
    checkpoint.failures[hotel.slug] = String(error?.message ?? error).slice(0, 300);
    if (error?.fatal) { await atomicJson(checkpointPath, checkpoint); throw error; }
  }
  checkpoint.calls += 1;
  await atomicJson(checkpointPath, checkpoint);
  if (calls === 1 || calls % 50 === 0) console.error(`${calls}/${Math.min(pending.length, maxCalls)} Places Details calls`);
  await wait(100);
}

// Write checked:true for ok rows. Only the checked field is touched.
let next = { ...hotelDistances };
let flipped = 0;
for (const row of Object.values(checkpoint.completed)) {
  const entry = next[row.slug];
  if (row.bucket === "ok" && entry && entry.checked !== true) {
    next = { ...next, [row.slug]: { ...entry, checked: true } };
    flipped += 1;
  }
}
if (flipped) await writeFile(distancesPath, renderHotelDistancesFile(next));

// A --slug run reports to stdout only, so it never replaces the full report
// with a one-row file. Full and --only-unchecked runs rebuild both reports
// from the whole checkpoint.
const reportTargets = onlySlug ? targets : hotelIndex;
const rows = reportTargets.map((hotel) => checkpoint.completed[hotel.slug]).filter(Boolean);
const report = buildAuditReport(rows, { generatedAt: new Date().toISOString(), indexed: hotelIndex.length });
report.failures = checkpoint.failures;
report.remaining = targets.filter((hotel) => !checkpoint.completed[hotel.slug]).length;
if (!onlySlug) {
  await atomicJson(join(outputRoot, "report.json"), report);
  await writeFile(join(outputRoot, "report.md"), renderAuditTable(report));
}
console.error(`checked:true written for ${flipped} rows`);
console.log(JSON.stringify({ counts: report.counts, audited: report.audited, remaining: report.remaining, failures: Object.keys(checkpoint.failures).length, rows: onlySlug ? report.rows : undefined }, null, 2));
