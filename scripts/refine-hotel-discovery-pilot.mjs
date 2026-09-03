import { readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { hotelIndex } from "../src/hotel-index.js";
import {
  classifyMinistryHotels,
  findPossibleCurrentMatch,
  hotelNameKey,
} from "./lib/hotel-discovery-pilot.mjs";

const root = fileURLToPath(new URL("./hotel-discovery-pilot/", import.meta.url));
const readJson = async (name) => JSON.parse(await readFile(join(root, name), "utf8"));
const originalMissing = await readJson("missing-hotels.json");
const originalKnown = await readJson("known-hotels.json");
const originalUnverified = await readJson("unverified-ministry.json");
const coverage = await readJson("coverage-report.json");
const priorPossibleDuplicates = await readJson("possible-duplicates.json").catch(() => []);

const evidence = originalMissing.map((row) => ({
  placeId: row.placeId,
  ministryCertificateNos: [row.certificateNo],
  currentSlugs: [],
  operationalConfirmed: true,
}));
const reclassified = classifyMinistryHotels({
  ministryRows: originalMissing,
  currentHotels: hotelIndex,
  evidence,
});

const possibleDuplicates = [...priorPossibleDuplicates];
const missing = [];
for (const row of reclassified.missing) {
  const candidate = row.firstPartySource
    ? { ...row, reason: "first-party-operational-confirmed" }
    : row;
  const possible = findPossibleCurrentMatch(candidate, hotelIndex);
  if (possible) {
    possibleDuplicates.push({
      ...candidate,
      possibleCurrentSlug: possible.slug,
      similarity: Number(possible.score.toFixed(3)),
      reason: "possible-current-name-duplicate",
    });
  } else missing.push(candidate);
}

const sideSunIndex = originalUnverified.findIndex((row) => hotelNameKey(row.name) === "side sun");
if (sideSunIndex >= 0) {
  const [sideSun] = originalUnverified.splice(sideSunIndex, 1);
  missing.push({
    ...sideSun,
    reason: "first-party-operational-confirmed",
    firstPartySource: "https://www.sidesunhotel.com/tr",
    verifiedAt: "2026-09-02",
  });
}

const isApartmentName = (row) => /(^| )(apart|apartment|aparthotel)( |$)/.test(
  row.name.normalize("NFD").replace(/\p{M}+/gu, "").toLowerCase(),
);
const excludedScope = [
  ...missing.filter(isApartmentName),
  ...originalUnverified.filter(isApartmentName),
].map((row) => ({ ...row, reason: "apartment-out-of-scope" }));
const refinedMissing = missing.filter((row) => !isApartmentName(row));
const refinedUnverified = originalUnverified.filter((row) => !isApartmentName(row));

refinedMissing.sort((a, b) => a.name.localeCompare(b.name, "tr"));
possibleDuplicates.sort((a, b) => a.name.localeCompare(b.name, "tr"));
const uniquePossibleDuplicates = [...new Map(
  possibleDuplicates.map((row) => [row.certificateNo, row]),
).values()];
const knownByCertificate = new Map(
  [...originalKnown, ...reclassified.known].map((row) => [row.certificateNo, row]),
);
const known = [...knownByCertificate.values()].sort((a, b) => a.name.localeCompare(b.name, "tr"));

Object.assign(coverage, {
  refinedAt: new Date().toISOString(),
  ministryHotelCount: coverage.ministryHotelCount - excludedScope.length,
  knownCount: known.length,
  missingCount: refinedMissing.length,
  possibleDuplicateCount: uniquePossibleDuplicates.length,
  unverifiedMinistryCount: refinedUnverified.length,
  excludedApartmentCount: excludedScope.length,
  note: "The 1,000-call pilot is incomplete. Generic current-index name variants were removed; Side Sun was confirmed through its first-party site.",
});

async function atomicJson(name, value) {
  const output = join(root, name);
  const temporary = `${output}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`);
  await rename(temporary, output);
}

const csvFields = ["certificateNo", "name", "documentType", "facilityType", "facilityClass", "city", "district", "placeId", "reason", "firstPartySource"];
const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const csv = [csvFields.join(","), ...refinedMissing.map((row) => csvFields.map((field) => csvCell(row[field])).join(","))].join("\n") + "\n";

await Promise.all([
  atomicJson("missing-hotels.json", refinedMissing),
  atomicJson("known-hotels.json", known),
  atomicJson("unverified-ministry.json", refinedUnverified),
  atomicJson("possible-duplicates.json", uniquePossibleDuplicates),
  atomicJson("excluded-scope.json", excludedScope),
  atomicJson("coverage-report.json", coverage),
  writeFile(join(root, "missing-hotels.csv"), csv),
]);

console.log(JSON.stringify({
  missing: refinedMissing.length,
  known: known.length,
  possibleDuplicates: uniquePossibleDuplicates.length,
  unverified: refinedUnverified.length,
  excludedApartments: excludedScope.length,
  sideSun: refinedMissing.find((row) => hotelNameKey(row.name) === "side sun") ?? null,
}, null, 2));
