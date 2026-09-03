# Antalya–Alanya Hotel Discovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a reviewable, provenance-bearing list of currently operating classic hotels/resorts missing from the static index, without changing regions, prices, distances, or the production index.

**Architecture:** Parse canonical hotel names from the Ministry’s public embedded dataset, then run a resumable adaptive Google Nearby Search scan as a coverage and operating-status verifier. Keep all deterministic geometry, filtering, matching, and accounting in pure modules covered by Vitest; keep network/filesystem orchestration in thin CLIs, store only Ministry-sourced names and allowed Google Place IDs persistently, and cap the full scan at 4,500 attempts.

**Tech Stack:** Node 22 ESM, built-in `fetch`, `node:fs/promises`, Vitest, Google Places API (New) Nearby Search, public Ministry HTML dataset.

**Spec:** `docs/superpowers/specs/2026-09-02-antalya-alanya-hotel-discovery-design.md`

---

## File map

- **Create** `scripts/lib/ministry-hotels.mjs` — extract/filter the Ministry’s embedded `jsondata` and construct a provenance snapshot.
- **Create** `scripts/lib/ministry-hotels.test.js` — fixture-based parser/filter tests; never calls the network.
- **Create** `scripts/fixtures/ministry-hotels-page.html` — minimal saved HTML fixture containing representative included/excluded rows.
- **Create** `scripts/fetch-ministry-hotels.mjs` — fetch the official page and atomically write the filtered source snapshot.
- **Create** `docs/hotel-sources/antalya-alanya-ministry-hotels.json` — generated canonical source artifact.
- **Modify** `docs/hotel-sources/README.md` — document source URL, retrieval date, filters, and generation command.
- **Create** `scripts/hotel-discovery-zones.mjs` — reviewed WGS84 corridor rectangles and representative fixture points.
- **Create** `scripts/lib/hotel-discovery.mjs` — pure geometry, in-memory result reduction, deduplication, matching, classification, call accounting, and report-summary functions.
- **Create** `scripts/lib/hotel-discovery.test.js` — unit tests for the pure discovery core.
- **Create** `scripts/lib/google-nearby-search.mjs` — request construction and bounded retry behavior with injected `fetch`/sleep.
- **Create** `scripts/lib/google-nearby-search.test.js` — request/retry/fatal-error tests with fake responses.
- **Create** `scripts/lib/hotel-discovery-io.mjs` — atomic JSON/CSV writes, checkpoint load/save, report writes, and cache cleanup.
- **Create** `scripts/lib/hotel-discovery-io.test.js` — temporary-directory tests for atomic artifacts and resume state.
- **Replace** `scripts/discover-hotels.mjs` — CLI/orchestrator for dry-run, scan, resume, smoke, and cleanup.
- **Create** `scripts/discover-hotels.test.js` — CLI argument and exit-status tests with injected dependencies; no live calls.
- **Modify** `.gitignore` — ignore only `scripts/hotel-discovery/.cache/`.
- **Modify** `package.json` — add `fetch:hotels:ministry` and `discover:hotels` scripts.
- **Create after the run** `scripts/hotel-discovery/{missing-hotels.json,missing-hotels.csv,possible-duplicates.json,known-hotels.json,unverified-ministry.json,status-conflicts.json,google-unmatched-place-ids.json,coverage-report.json}`. Neither these files nor the checkpoint may contain raw Google names, coordinates, types, or statuses.

## Fixed decisions

- Ministry page: `https://www.ktb.gov.tr/genel/searchhotelgenel.aspx?lang=tr`.
- The page currently embeds its full public dataset as `var jsondata = [...]`; the parser consumes that block rather than automating the page UI.
- Eligible Ministry city/districts: `ANTALYA` plus `KEMER`, `KONYAALTI`, `MURATPAŞA`, `AKSU`, `SERİK`, `MANAVGAT`, and `ALANYA`.
- Eligible Ministry document types: `Turizm İşletmesi Belgesi` and `Basit Konaklama`. Exclude `Turizm Yatırımı Belgesi`.
- Eligible Ministry facility types after Turkish folding: `otel`, `hotel`, `butik otel`, and `tatil koyu`. Google still decides whether the facility is currently `OPERATIONAL`.
- Google request primary types: `hotel`, `resort_hotel`; maximum 20 results; future-opening businesses disabled; rank by distance.
- Root logical cell: 2,000 m. Child levels: 1,000 m, 500 m, 250 m. Exactly 20 raw API results means saturated.
- Hard attempt ceiling: 4,500, including retries and failed responses.
- `--scan` and `--smoke` require `--confirm-places-terms`; resume requires that acknowledgement in the checkpoint.
- Stable exits: `0` complete, `2` valid but incomplete, `1` fatal.
- Do not run the full scan until unit tests, the Ministry fetch, dry-run, and one-call smoke test pass.

### Task 1: Ministry dataset parser and filter

**Files:**
- Create: `scripts/fixtures/ministry-hotels-page.html`
- Create: `scripts/lib/ministry-hotels.test.js`
- Create: `scripts/lib/ministry-hotels.mjs`

- [ ] **Step 1: Add the minimal HTML fixture**

```html
<!doctype html><html><script>
var jsondata = [
  {"belgeNo":"1","tesisAdi":"SIDE SUN HOTEL","belgeTuru":"Turizm İşletmesi Belgesi","belgeDurumu":"Belgeli Tesisler","tesisTuru":"Otel","tesisSinifi":"4 Yıldızlı","sehir":"ANTALYA","ilce":"MANAVGAT"},
  {"belgeNo":"2","tesisAdi":"CLUB KASTALIA","belgeTuru":"Turizm İşletmesi Belgesi","belgeDurumu":"Belgeli Tesisler","tesisTuru":"Tatil Köyü","tesisSinifi":"5 Yıldızlı","sehir":"ANTALYA","ilce":"ALANYA"},
  {"belgeNo":"3","tesisAdi":"SMALL HOTEL","belgeTuru":"Basit Konaklama","belgeDurumu":"","tesisTuru":"OTEL","tesisSinifi":"","sehir":"ANTALYA","ilce":"MURATPAŞA"},
  {"belgeNo":"4","tesisAdi":"APART ONE","belgeTuru":"Basit Konaklama","belgeDurumu":"","tesisTuru":"APART OTEL","tesisSinifi":"","sehir":"ANTALYA","ilce":"ALANYA"},
  {"belgeNo":"5","tesisAdi":"FUTURE HOTEL","belgeTuru":"Turizm Yatırımı Belgesi","belgeDurumu":"Belgeli Tesisler","tesisTuru":"Otel","tesisSinifi":"5 Yıldızlı","sehir":"ANTALYA","ilce":"SERİK"},
  {"belgeNo":"6","tesisAdi":"KAŞ HOTEL","belgeTuru":"Turizm İşletmesi Belgesi","belgeDurumu":"Belgeli Tesisler","tesisTuru":"Otel","tesisSinifi":"3 Yıldızlı","sehir":"ANTALYA","ilce":"KAŞ"}
];Sys.Application.add_init(function() {});
</script></html>
```

- [ ] **Step 2: Write failing parser/filter tests**

```js
import { readFile } from "node:fs/promises";
import { describe, expect, test } from "vitest";
import { extractMinistryRows, filterCorridorHotels, buildMinistrySnapshot } from "./ministry-hotels.mjs";

const html = await readFile(new URL("../fixtures/ministry-hotels-page.html", import.meta.url), "utf8");

describe("Ministry hotel source", () => {
  test("extracts the embedded jsondata array", () => {
    expect(extractMinistryRows(html)).toHaveLength(6);
  });

  test("keeps operating hotel and holiday-village records in corridor districts", () => {
    expect(filterCorridorHotels(extractMinistryRows(html)).map((row) => row.name)).toEqual([
      "CLUB KASTALIA", "SIDE SUN HOTEL", "SMALL HOTEL",
    ]);
  });

  test("snapshot records provenance without changing canonical names", () => {
    const snapshot = buildMinistrySnapshot(extractMinistryRows(html), "2026-09-02T20:00:00.000Z");
    expect(snapshot.sourceUrl).toContain("ktb.gov.tr");
    expect(snapshot.retrievedAt).toBe("2026-09-02T20:00:00.000Z");
    expect(snapshot.rows.find((row) => row.name === "SIDE SUN HOTEL")).toMatchObject({ certificateNo: "1", district: "MANAVGAT" });
  });

  test("fails loudly when the embedded dataset marker changes", () => {
    expect(() => extractMinistryRows("<html></html>")).toThrow(/jsondata/);
  });
});
```

- [ ] **Step 3: Run the test and verify RED**

Run: `npx vitest run scripts/lib/ministry-hotels.test.js`

Expected: FAIL because `scripts/lib/ministry-hotels.mjs` does not exist.

- [ ] **Step 4: Implement the pure parser/filter**

```js
const SOURCE_URL = "https://www.ktb.gov.tr/genel/searchhotelgenel.aspx?lang=tr";

const DISTRICTS = new Set(["kemer", "konyaalti", "muratpasa", "aksu", "serik", "manavgat", "alanya"]);
const DOCUMENTS = new Set(["turizm isletmesi belgesi", "basit konaklama"]);
const TYPES = new Set(["otel", "hotel", "butik otel", "tatil koyu"]);

export function foldTurkish(value) {
  return String(value ?? "")
    .replace(/İ/g, "I").replace(/ı/g, "i")
    .normalize("NFD").replace(/\p{M}+/gu, "")
    .toLowerCase().replace(/ğ/g, "g").replace(/ş/g, "s")
    .replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u")
    .replace(/\s+/g, " ").trim();
}

export function extractMinistryRows(html) {
  const marker = "var jsondata =";
  const markerAt = html.indexOf(marker);
  if (markerAt < 0) throw new Error("Ministry jsondata marker not found");
  const start = html.indexOf("[", markerAt + marker.length);
  const endMarker = "];Sys.Application.add_init";
  const end = html.indexOf(endMarker, start);
  if (start < 0 || end < 0) throw new Error("Ministry jsondata boundary not found");
  return JSON.parse(html.slice(start, end + 1));
}

export function filterCorridorHotels(rows) {
  return rows
    .filter((row) => foldTurkish(row.sehir) === "antalya")
    .filter((row) => DISTRICTS.has(foldTurkish(row.ilce)))
    .filter((row) => DOCUMENTS.has(foldTurkish(row.belgeTuru)))
    .filter((row) => TYPES.has(foldTurkish(row.tesisTuru)))
    .map((row) => ({
      certificateNo: String(row.belgeNo), name: String(row.tesisAdi).trim(),
      documentType: String(row.belgeTuru), facilityType: String(row.tesisTuru),
      facilityClass: row.tesisSinifi || null, city: String(row.sehir), district: String(row.ilce),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

export function buildMinistrySnapshot(rows, retrievedAt = new Date().toISOString()) {
  return { schemaVersion: 1, sourceUrl: SOURCE_URL, retrievedAt, rows: filterCorridorHotels(rows) };
}
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run: `npx vitest run scripts/lib/ministry-hotels.test.js`

Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add scripts/fixtures/ministry-hotels-page.html scripts/lib/ministry-hotels.mjs scripts/lib/ministry-hotels.test.js
git commit -m "feat: parse official Ministry hotel records"
```

### Task 2: Ministry fetcher and canonical snapshot

**Files:**
- Create: `scripts/fetch-ministry-hotels.mjs`
- Create: `docs/hotel-sources/antalya-alanya-ministry-hotels.json`
- Modify: `docs/hotel-sources/README.md`
- Modify: `package.json`

- [ ] **Step 1: Add the fetch script**

```js
import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildMinistrySnapshot, extractMinistryRows } from "./lib/ministry-hotels.mjs";

const SOURCE = "https://www.ktb.gov.tr/genel/searchhotelgenel.aspx?lang=tr";
const OUT = new URL("../docs/hotel-sources/antalya-alanya-ministry-hotels.json", import.meta.url);

const response = await fetch(SOURCE, { headers: { "User-Agent": "AntalyaVipHotelDiscovery/1.0" } });
if (!response.ok) throw new Error(`Ministry source ${response.status}`);
const snapshot = buildMinistrySnapshot(extractMinistryRows(await response.text()));
if (snapshot.rows.length === 0) throw new Error("Ministry filter produced zero hotels");

const outputPath = fileURLToPath(OUT);
await mkdir(dirname(outputPath), { recursive: true });
const temporary = `${outputPath}.tmp`;
await writeFile(temporary, `${JSON.stringify(snapshot, null, 2)}\n`);
await rename(temporary, outputPath);
console.log(`Wrote ${snapshot.rows.length} canonical hotel rows to ${outputPath}`);
```

- [ ] **Step 2: Add the package command**

Add to `package.json` scripts:

```json
"fetch:hotels:ministry": "node scripts/fetch-ministry-hotels.mjs",
"discover:hotels": "node scripts/discover-hotels.mjs"
```

- [ ] **Step 3: Run the official fetch**

Run: `npm run fetch:hotels:ministry`

Expected: exits 0, writes a non-empty snapshot, and prints its row count. This is read-only against the Ministry site and makes no Google call.

- [ ] **Step 4: Inspect representative scope records**

Run:

```bash
node -e "const x=require('./docs/hotel-sources/antalya-alanya-ministry-hotels.json'); console.log(x.rows.length, x.rows.find(r=>r.name.includes('SIDE SUN')), [...new Set(x.rows.map(r=>r.district))])"
```

Expected: non-zero count, a Side Sun row if currently published by the Ministry, and only the seven allowed districts. If Side Sun is absent, record that source fact; do not fabricate the row.

- [ ] **Step 5: Document the source**

Append to `docs/hotel-sources/README.md`:

```markdown
| `antalya-alanya-ministry-hotels.json` | T.C. Kültür ve Turizm Bakanlığı belgeli tesis sorgusu | generated timestamp in file | Active operating/basic-accommodation records filtered to hotel/boutique hotel/holiday village in the Antalya–Alanya corridor districts |

Regenerate with `npm run fetch:hotels:ministry`. The source page embeds its public dataset as `var jsondata`; parser tests fail if that contract changes.
```

- [ ] **Step 6: Run tests and commit**

Run: `npx vitest run scripts/lib/ministry-hotels.test.js`

Expected: PASS.

```bash
git add package.json docs/hotel-sources/README.md docs/hotel-sources/antalya-alanya-ministry-hotels.json scripts/fetch-ministry-hotels.mjs
git commit -m "feat: snapshot Antalya corridor Ministry hotels"
```

### Task 3: Corridor geometry and adaptive cells

**Files:**
- Create: `scripts/hotel-discovery-zones.mjs`
- Create: `scripts/lib/hotel-discovery.mjs`
- Create: `scripts/lib/hotel-discovery.test.js`

- [ ] **Step 1: Write failing geometry tests**

```js
import { describe, expect, test } from "vitest";
import { CORRIDOR_POINTS, CORRIDOR_RECTS } from "../hotel-discovery-zones.mjs";
import { buildRootCells, circleForCell, pointInCorridor, splitCell } from "./hotel-discovery.mjs";

describe("discovery geometry", () => {
  test("contains every representative district point", () => {
    for (const point of CORRIDOR_POINTS) expect(pointInCorridor(point, CORRIDOR_RECTS), point.name).toBe(true);
  });

  test("builds finite 2km root cells with a covering query circle", () => {
    const cells = buildRootCells(CORRIDOR_RECTS, 2000);
    expect(cells.length).toBeGreaterThan(100);
    expect(cells.length).toBeLessThan(2000);
    expect(cells.every((cell) => circleForCell(cell).radiusM > 0)).toBe(true);
  });

  test("four children exactly share the parent bounds", () => {
    const parent = { id: "x", south: 36, west: 30, north: 36.02, east: 30.02, sizeM: 2000, depth: 0 };
    const children = splitCell(parent);
    expect(children).toHaveLength(4);
    expect(Math.min(...children.map((c) => c.south))).toBe(parent.south);
    expect(Math.max(...children.map((c) => c.north))).toBe(parent.north);
    expect(Math.min(...children.map((c) => c.west))).toBe(parent.west);
    expect(Math.max(...children.map((c) => c.east))).toBe(parent.east);
    expect(children.every((c) => c.sizeM === 1000)).toBe(true);
  });
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npx vitest run scripts/lib/hotel-discovery.test.js`

Expected: FAIL because the zone/core modules do not exist.

- [ ] **Step 3: Add reviewed corridor configuration**

Create `scripts/hotel-discovery-zones.mjs` with the exact discovery bounds and scope anchors below. The anchors are locality points used only to prove each included administrative district intersects the corridor; they are not hotel records or pricing regions.

```js
export const CORRIDOR_RECTS = Object.freeze([
  { id: "kemer", south: 36.45, west: 30.40, north: 36.78, east: 30.68 },
  { id: "antalya", south: 36.80, west: 30.50, north: 36.97, east: 30.99 },
  { id: "belek", south: 36.78, west: 30.97, north: 36.92, east: 31.25 },
  { id: "side", south: 36.68, west: 31.20, north: 36.86, east: 31.65 },
  { id: "alanya-west", south: 36.55, west: 31.55, north: 36.72, east: 31.98 },
  { id: "alanya-east", south: 36.35, west: 31.90, north: 36.62, east: 32.30 },
]);

export const CORRIDOR_POINTS = Object.freeze([
  { name: "KEMER", lat: 36.60, lng: 30.56 },
  { name: "KONYAALTI", lat: 36.87, lng: 30.63 },
  { name: "MURATPAŞA", lat: 36.88, lng: 30.72 },
  { name: "AKSU", lat: 36.87, lng: 30.86 },
  { name: "SERİK", lat: 36.86, lng: 31.06 },
  { name: "MANAVGAT", lat: 36.78, lng: 31.42 },
  { name: "ALANYA", lat: 36.55, lng: 31.99 },
]);
```

- [ ] **Step 4: Implement the geometry core**

In `scripts/lib/hotel-discovery.mjs` implement:

```js
const METRES_PER_LAT_DEGREE = 111_320;
const lngDegrees = (metres, lat) => metres / (METRES_PER_LAT_DEGREE * Math.cos(lat * Math.PI / 180));
const latDegrees = (metres) => metres / METRES_PER_LAT_DEGREE;

export function pointInCorridor({ lat, lng }, rectangles) {
  return rectangles.some((r) => lat >= r.south && lat <= r.north && lng >= r.west && lng <= r.east);
}

export function buildRootCells(rectangles, sizeM = 2000) {
  const cells = [];
  for (const rect of rectangles) {
    const latStep = latDegrees(sizeM);
    for (let south = rect.south, row = 0; south < rect.north; south += latStep, row += 1) {
      const north = Math.min(rect.north, south + latStep);
      const lngStep = lngDegrees(sizeM, (south + north) / 2);
      for (let west = rect.west, col = 0; west < rect.east; west += lngStep, col += 1) {
        cells.push({ id: `${rect.id}:${row}:${col}`, zoneId: rect.id, south, west,
          north, east: Math.min(rect.east, west + lngStep), sizeM, depth: 0 });
      }
    }
  }
  return cells;
}

export function splitCell(cell) {
  const midLat = (cell.south + cell.north) / 2;
  const midLng = (cell.west + cell.east) / 2;
  return [[cell.south, cell.west, midLat, midLng], [cell.south, midLng, midLat, cell.east],
    [midLat, cell.west, cell.north, midLng], [midLat, midLng, cell.north, cell.east]]
    .map(([south, west, north, east], index) => ({ ...cell, id: `${cell.id}.${index}`,
      south, west, north, east, sizeM: cell.sizeM / 2, depth: cell.depth + 1 }));
}

function haversineM(a, b) {
  const rad = (v) => v * Math.PI / 180, earth = 6_371_000;
  const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return earth * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function circleForCell(cell) {
  const center = { lat: (cell.south + cell.north) / 2, lng: (cell.west + cell.east) / 2 };
  const radiusM = Math.ceil(haversineM(center, { lat: cell.north, lng: cell.east })) + 2;
  return { center, radiusM };
}
```

- [ ] **Step 5: Run and verify GREEN**

Run: `npx vitest run scripts/lib/hotel-discovery.test.js`

Expected: PASS for geometry tests.

- [ ] **Step 6: Commit**

```bash
git add scripts/hotel-discovery-zones.mjs scripts/lib/hotel-discovery.mjs scripts/lib/hotel-discovery.test.js
git commit -m "feat: model adaptive hotel discovery corridor"
```

### Task 4: Filtering, deduplication, and classification

**Files:**
- Modify: `scripts/lib/hotel-discovery.mjs`
- Modify: `scripts/lib/hotel-discovery.test.js`

- [ ] **Step 1: Add failing behavior tests**

Add tests covering these concrete fixtures:

```js
const places = [
  { id: "p-side", displayName: { text: "Side Sun Hotel" }, location: { latitude: 36.79, longitude: 31.37 }, primaryType: "hotel", businessStatus: "OPERATIONAL" },
  { id: "p-closed", displayName: { text: "Closed Resort" }, location: { latitude: 36.79, longitude: 31.38 }, primaryType: "resort_hotel", businessStatus: "CLOSED_TEMPORARILY" },
  { id: "p-apart", displayName: { text: "Some Apart" }, location: { latitude: 36.79, longitude: 31.39 }, primaryType: "extended_stay_hotel", businessStatus: "OPERATIONAL" },
];

test("filters scope but retains closed status transiently for conflicts", () => {
  const kept = filterPlacesForCell(places, { south: 36.7, west: 31.3, north: 36.9, east: 31.5 }, CORRIDOR_RECTS);
  expect(kept.map((p) => p.id)).toEqual(["p-side", "p-closed"]);
});

test("deduplicates overlap by Place ID", () => {
  expect([...dedupePlaces([...places, places[0]]).keys()]).toEqual(["p-side", "p-closed", "p-apart"]);
});

test("current-index identity wins over a closed Google status", () => {
  const ministryRows = [{ certificateNo: "1", name: "Known Hotel" }];
  const currentHotels = [{ name: "Known Hotel", aliases: [], slug: "known-hotel" }];
  const distances = { "known-hotel": { place: "p-closed" } };
  const evidenceByPlaceId = buildPlaceEvidence({ places, ministryRows, currentHotels });
  const result = classifyHotels({ ministryRows,
    currentHotels: [{ name: "Known Hotel", aliases: [], slug: "known-hotel" }],
    distances, evidenceByPlaceId });
  expect(result.known).toHaveLength(1);
  expect(result.statusConflicts).toHaveLength(0);
});

test("only an unmatched Ministry row with one operational exact Google identity is missing", () => {
  const ministryRows = [{ certificateNo: "2", name: "SIDE SUN HOTEL" }];
  const evidenceByPlaceId = buildPlaceEvidence({ places, ministryRows, currentHotels: [] });
  const result = classifyHotels({ ministryRows, currentHotels: [], distances: {}, evidenceByPlaceId });
  expect(result.missing).toEqual([expect.objectContaining({ name: "SIDE SUN HOTEL", placeId: "p-side" })]);
});

test("unmatched, closed, fuzzy, and Google-only identities stay out of missing", () => {
  const ministryRows = [
    { certificateNo: "3", name: "NO GOOGLE HOTEL" },
    { certificateNo: "4", name: "CLOSED RESORT" },
    { certificateNo: "5", name: "GRAND ALMOST SAME BEACH HOTEL RESORT" },
  ];
  const currentHotels = [{
    name: "Grand Almost Same Beach Hotels Resort", aliases: [],
    slug: "grand-almost-same-beach-hotels-resort",
  }];
  const allPlaces = [...places, {
    id: "p-google-only", displayName: { text: "Google Only Resort" },
    location: { latitude: 36.79, longitude: 31.40 },
    primaryType: "resort_hotel", businessStatus: "OPERATIONAL",
  }];
  const evidenceByPlaceId = buildPlaceEvidence({ places: allPlaces, ministryRows, currentHotels });
  const result = classifyHotels({
    ministryRows,
    currentHotels,
    distances: {},
    evidenceByPlaceId,
  });

  expect(result.missing).toEqual([]);
  expect(result.unverifiedMinistry.map((row) => row.certificateNo)).toEqual(["3"]);
  expect(result.statusConflicts.map((row) => row.certificateNo)).toEqual(["4"]);
  expect(result.possibleDuplicates.map((row) => row.certificateNo)).toEqual(["5"]);
  expect(result.googleUnmatchedPlaceIds.map((row) => row.placeId)).toContain("p-google-only");
  expect([
    ...result.known, ...result.missing, ...result.possibleDuplicates,
    ...result.unverifiedMinistry, ...result.statusConflicts,
  ].map((row) => row.certificateNo).sort()).toEqual(["3", "4", "5"]);
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npx vitest run scripts/lib/hotel-discovery.test.js`

Expected: FAIL because classification exports do not exist.

- [ ] **Step 3: Implement minimal deterministic classification**

Add to `scripts/lib/hotel-discovery.mjs`:

- `hotelKey(value)` using the same Turkish/punctuation folding as `hotelSlug`;
- `filterPlacesForCell(places, cell, rectangles)` accepting only the two primary types and points inside both the logical cell and corridor, while preserving all returned business statuses transiently;
- `dedupePlaces(places)` returning `Map<placeId, place>`;
- `buildPlaceEvidence({ places, ministryRows, currentHotels })`, which consumes filtered/deduplicated response objects and returns only `{ placeId, ministryCertificateNos, currentSlugs, operationalConfirmed }` records;
- a token Dice score used only to propose possible duplicates, with a fixed `0.82` threshold exported as `POSSIBLE_DUPLICATE_THRESHOLD`;
- `classifyHotels({ ministryRows, currentHotels, distances, places })` implementing the exact precedence from the spec.

Apply precedence in this order for each Ministry certificate number: exact current-index name/alias; current-index Place ID; exactly one exact Google identity in `evidenceByPlaceId`; possible current-index name duplicate; no Google confirmation. An exact Google identity is missing only when it is unique and `operationalConfirmed`; a unique non-operational identity is a status conflict, and zero or multiple exact identities are unverified. After Ministry classification, emit operational Place IDs not consumed by a current or Ministry identity into `googleUnmatchedPlaceIds`. Classification output rows must contain Ministry fields, `placeId` where allowed, and internal reason codes. Neither evidence nor output may copy Google display names, coordinates, primary types, or raw business-status strings. Use these reason codes: `current-name`, `current-place-id`, `operational-confirmed`, `google-not-operational`, `google-unverified`, `possible-name-duplicate`, and `google-only-place-id`.

- [ ] **Step 4: Add a separate exhaustive-partition assertion**

Extend the fixture with one `known` and one `missing` Ministry row, then assert that every input Ministry certificate number appears exactly once across `known`, `missing`, `possibleDuplicates`, `unverifiedMinistry`, and `statusConflicts`.

- [ ] **Step 5: Run and verify GREEN**

Run: `npx vitest run scripts/lib/hotel-discovery.test.js`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/hotel-discovery.mjs scripts/lib/hotel-discovery.test.js
git commit -m "feat: classify missing hotel candidates safely"
```

### Task 5: Google Nearby Search client and bounded retries

**Files:**
- Create: `scripts/lib/google-nearby-search.mjs`
- Create: `scripts/lib/google-nearby-search.test.js`

- [ ] **Step 1: Write failing request/retry tests**

Tests must inject `fetchImpl`, `sleep`, and `onAttempt`. Assert:

- request URL is `https://places.googleapis.com/v1/places:searchNearby`;
- body contains `includedPrimaryTypes: ["hotel", "resort_hotel"]`, `maxResultCount: 20`, `includeFutureOpeningBusinesses: false`, `rankPreference: "DISTANCE"`, and the cell circle;
- field mask is exactly `places.id,places.displayName,places.location,places.primaryType,places.businessStatus`;
- a 429 followed by 200 makes two attempts and succeeds;
- a 500 exhausts three attempts and returns a typed transient failure;
- 400/401/403 fails after one attempt as fatal; and
- `onAttempt` runs before every HTTP attempt so retries count toward 4,500.

- [ ] **Step 2: Run and verify RED**

Run: `npx vitest run scripts/lib/google-nearby-search.test.js`

Expected: FAIL because the client module does not exist.

- [ ] **Step 3: Implement the client**

Export `NearbySearchError`, `buildNearbyRequest(cell)`, and:

```js
export async function searchNearby(cell, { key, fetchImpl = fetch, sleep = defaultSleep, onAttempt = () => {}, maxAttempts = 3 }) {
  const { url, headers, body } = buildNearbyRequest(cell, key);
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    onAttempt();
    const response = await fetchImpl(url, { method: "POST", headers, body: JSON.stringify(body) });
    if (response.ok) return (await response.json()).places ?? [];
    const detail = (await response.text()).slice(0, 500);
    const transient = response.status === 429 || response.status >= 500;
    if (!transient) throw new NearbySearchError(response.status, detail, false);
    if (attempt === maxAttempts) throw new NearbySearchError(response.status, detail, true);
    await sleep(Math.min(4000, 250 * 2 ** (attempt - 1)) + Math.floor(Math.random() * 100));
  }
}
```

`buildNearbyRequest` uses `circleForCell(cell)`, `languageCode: "tr"`, and `regionCode: "TR"`. Never log the key or full headers.

- [ ] **Step 4: Run and verify GREEN**

Run: `npx vitest run scripts/lib/google-nearby-search.test.js`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/google-nearby-search.mjs scripts/lib/google-nearby-search.test.js
git commit -m "feat: add bounded Google Nearby Search client"
```

### Task 6: Resumable adaptive scan state

**Files:**
- Modify: `scripts/lib/hotel-discovery.mjs`
- Modify: `scripts/lib/hotel-discovery.test.js`

- [ ] **Step 1: Add failing scan-state tests**

Cover:

- new state queues every root cell and starts at zero attempts;
- a 19-result response completes the cell without children;
- a 20-result response at 2,000/1,000/500 m completes the parent and queues four children;
- a 20-result response at 250 m records residual saturation;
- results from overlapping cells remain unique by Place ID;
- a failed cell is visible and makes the run incomplete;
- attempt 4,500 prevents another request and leaves queued work;
- a loaded state continues without re-adding completed cells; and
- `summarizeCoverage(state)` reconciles completed, failed, queued, and saturated counts.

- [ ] **Step 2: Run and verify RED**

Run: `npx vitest run scripts/lib/hotel-discovery.test.js`

Expected: FAIL because scan-state exports are absent.

- [ ] **Step 3: Implement pure state transitions**

Add `createRunState`, `recordAttempt`, `applyCellSuccess`, `applyCellFailure`, `canAttempt`, `isComplete`, and `summarizeCoverage`. State schema:

```js
{
  schemaVersion: 1, runId, startedAt, remainingFreeCalls, termsConfirmed: true,
  attempts: 0, successfulCalls: 0, failedCalls: 0,
  queue: rootCells, completedCellIds: [], failedCells: [], residualSaturation: [],
  evidenceByPlaceId: {}, maxCalls: 4500
}
```

`applyCellSuccess` bases saturation on the raw response length before corridor/type filtering, calls `filterPlacesForCell`, immediately reduces the retained response with `buildPlaceEvidence`, merges the reduced records by Place ID, and discards the raw objects before returning state. It removes the current cell from the queue and atomically appends either completion, children, or residual saturation in the returned immutable state. Tests must assert that JSON-stringified state contains no `displayName`, `location`, `primaryType`, or `businessStatus` keys.

- [ ] **Step 4: Run and verify GREEN**

Run: `npx vitest run scripts/lib/hotel-discovery.test.js`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/hotel-discovery.mjs scripts/lib/hotel-discovery.test.js
git commit -m "feat: add resumable adaptive hotel scan state"
```

### Task 7: Atomic checkpoint and report I/O

**Files:**
- Create: `scripts/lib/hotel-discovery-io.mjs`
- Create: `scripts/lib/hotel-discovery-io.test.js`
- Modify: `.gitignore`

- [ ] **Step 1: Write failing temporary-directory tests**

Use `mkdtemp` below `os.tmpdir()` and clean only that exact generated directory. Test:

- save/load round-trips checkpoint JSON;
- atomic write leaves no `.tmp` after success;
- `writeReports` emits all eight JSON artifacts plus CSV;
- CSV escapes commas, quotes, and Turkish text;
- report counts equal bucket lengths;
- cleanup removes only the passed cache directory; and
- checkpoints and persistent reports contain no Google `displayName`, `formattedAddress`, `location`, `primaryType`, or raw `businessStatus` keys.

- [ ] **Step 2: Run and verify RED**

Run: `npx vitest run scripts/lib/hotel-discovery-io.test.js`

Expected: FAIL because the I/O module does not exist.

- [ ] **Step 3: Implement focused I/O functions**

Export `atomicWriteJson`, `loadCheckpoint`, `saveCheckpoint`, `writeReports`, and `cleanupCache`. Resolve all production paths from `import.meta.url`; require callers/tests to pass an explicit root path. `cleanupCache` must reject `/`, home directories, empty paths, and paths whose basename is not `.cache`.

`writeReports` writes:

- missing, known, possible duplicate, unverified Ministry, status conflict;
- Google-unmatched Place IDs;
- coverage report; and
- `missing-hotels.csv` with `certificateNo,name,documentType,facilityType,facilityClass,city,district,placeId,reason`.

- [ ] **Step 4: Ignore only transient Google content**

Append to `.gitignore`:

```gitignore
scripts/hotel-discovery/.cache/
```

- [ ] **Step 5: Run and verify GREEN**

Run: `npx vitest run scripts/lib/hotel-discovery-io.test.js`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add .gitignore scripts/lib/hotel-discovery-io.mjs scripts/lib/hotel-discovery-io.test.js
git commit -m "feat: persist hotel discovery checkpoints and reports"
```

### Task 8: CLI orchestration and stable exits

**Files:**
- Replace: `scripts/discover-hotels.mjs`
- Create: `scripts/discover-hotels.test.js`

- [ ] **Step 1: Write failing CLI tests**

Refactor the entry point to export `parseArgs(argv)` and `runDiscovery(options, deps)` and execute only when invoked directly. Test:

- `--dry-run` needs no API key and makes zero network calls;
- `--scan` refuses an existing checkpoint and points to `--resume`/cleanup;
- `--resume` refuses a missing checkpoint;
- `--scan`/`--resume` require `GOOGLE_MAPS_API_KEY` or `GOOGLE_PLACES_API_KEY`;
- `--scan`/`--smoke` refuse to start without `--confirm-places-terms`; `--resume` refuses a checkpoint that does not record it;
- `--remaining-free-calls` accepts integers 0–5000 only;
- no unbounded `--max-calls` option exists;
- `--smoke` has exactly one-attempt scope and never writes final reports;
- complete scan returns 0, incomplete scan returns 2, fatal setup returns 1;
- save checkpoint runs after each parsed response; and
- progress output includes attempts/4500 and estimated cost every 100 attempts.

- [ ] **Step 2: Run and verify RED**

Run: `npx vitest run scripts/discover-hotels.test.js`

Expected: FAIL against the old one-shot script.

- [ ] **Step 3: Implement argument parsing and orchestration**

Modes are mutually exclusive: `--dry-run`, `--scan`, `--resume`, `--smoke`, and `--cleanup-cache`. `--confirm-places-terms` is an acknowledgement modifier, not a mode; allow it only with `--scan` or `--smoke`, persist `termsConfirmed: true`, and require that value when resuming. Load the Ministry snapshot, `hotelIndex`, and `hotelDistances` only in modes that need them. The scan loop must:

1. check `canAttempt(state)` before dequeuing;
2. call `searchNearby` with `onAttempt` that increments state and can reject before exceeding 4,500;
3. reduce the response in memory, apply success/failure, and release the raw response before checkpointing;
4. save checkpoint after the transition;
5. print progress every 100 attempts;
6. classify and write reports at the end; and
7. set exit 2 if budget, failed cells, queued cells, or residual saturation remain.

On SIGINT, finish the current atomic checkpoint write, print the exact resume command, and exit 2. Auth/permission/invalid-request errors write the last safe checkpoint and exit 1. Never print the API key.

Cost helpers use `$32 / 1000` calls. `estimatedChargeAfterFreeCapUsd` is `null` when `--remaining-free-calls` is absent; otherwise it is `max(0, attempts - remainingFreeCalls) * 0.032`.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run:

```bash
npx vitest run scripts/discover-hotels.test.js scripts/lib/hotel-discovery.test.js scripts/lib/google-nearby-search.test.js scripts/lib/hotel-discovery-io.test.js
```

Expected: PASS with no live API request.

- [ ] **Step 5: Commit**

```bash
git add scripts/discover-hotels.mjs scripts/discover-hotels.test.js
git commit -m "feat: orchestrate bounded hotel discovery scans"
```

### Task 9: Policy/contract verification and dry-run

**Files:**
- Modify if needed: `docs/superpowers/specs/2026-09-02-antalya-alanya-hotel-discovery-design.md`
- Modify if needed: discovery code/tests from Tasks 1–8

- [ ] **Step 1: Resolve the live-call terms gate**

Open the project's Google Cloud Billing account and identify its billing address; do not infer it from the developer's location. Then read the current [EEA service-specific terms](https://cloud.google.com/terms/maps-platform/eea/maps-service-terms), [EEA Places permitted uses](https://cloud.google.com/terms/maps-platform/eea-places-api-permitted-uses), [Place ID storage guidance](https://developers.google.com/maps/documentation/places/web-service/place-id), and [official price list](https://developers.google.com/maps/billing-and-pricing/pricing).

Record only one of these decisions in the implementation handoff (never credentials or billing details):

- non-EEA terms reviewed and this workflow approved by the product owner;
- EEA terms reviewed and the product owner has confirmed the exact permitted-use basis or separate written approval; or
- not approved—stop before `--smoke` and `--scan`.

Also confirm that persistent reports contain Ministry content, allowed Place IDs, and internal classifications—not copied Google names, addresses, coordinates, or raw status fields. This is an engineering gate, not legal advice.

- [ ] **Step 2: Run all automated verification**

Run: `npm test`

Expected: all tests PASS; no network calls.

Run: `npm run typecheck`

Expected: exit 0.

- [ ] **Step 3: Run discovery dry-run**

Run: `npm run discover:hotels -- --dry-run`

Expected: prints root-cell count, 4,500 cap, and `$144.00` maximum raw list-price exposure; makes zero Google calls and does not require a key.

- [ ] **Step 4: Inspect git scope**

Run: `git status --short`

Expected: only planned source, tests, source snapshot, docs, and report artifacts are changed; production index/region/price/distance files are unchanged.

- [ ] **Step 5: Stop on a policy mismatch**

If Step 1 requires any design or persistence change, do not continue to Task 10. Amend and re-review the spec and implementation plan first. If no change is required, this step makes no commit.

### Task 10: One-call smoke test and full bounded discovery

**Files:**
- Generate: `scripts/hotel-discovery/*.json`
- Generate: `scripts/hotel-discovery/missing-hotels.csv`
- Generate transient: `scripts/hotel-discovery/.cache/checkpoint.json`

- [ ] **Step 1: Confirm credentials without printing them**

Proceed only when Task 9 recorded an approved live-call decision. If it did not, stop: do not use `--smoke`, `--scan`, or `--resume`.

Run:

```bash
node -e "console.log(process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY ? 'Google key configured' : 'Google key missing')"
```

Expected: `Google key configured`. If missing, stop and obtain the key through the project’s secret-delivery mechanism; never paste it into source, logs, or chat.

- [ ] **Step 2: Run exactly one paid smoke request**

Run: `npm run discover:hotels -- --smoke --confirm-places-terms`

Expected: one attempt, valid Google response schema, no final report write, and no key in output.

- [ ] **Step 3: Start the bounded scan**

If Billing Console supplies the actual unused Nearby Search Pro free allowance, run:

```bash
npm run discover:hotels -- --scan --confirm-places-terms --remaining-free-calls 5000
```

Replace `5000` with the observed remaining allowance. If it is unknown, omit the option so the tool reports post-cap cost as unknown rather than zero. Monitor terminal progress and Google Cloud `places.searchNearby` metrics.

- [ ] **Step 4: Resume only if interrupted**

Run: `npm run discover:hotels -- --resume`

Expected: completed cells are not requested again and the attempt count continues from checkpoint.

- [ ] **Step 5: Evaluate the exit and coverage report**

Run:

```bash
node -e "const r=require('./scripts/hotel-discovery/coverage-report.json'); console.log(r)"
```

Expected for exit 0: no failed, queued, or residually saturated cells and every artifact count reconciles. For exit 2, do not claim completeness; review the explicit incomplete reasons before any new scan or budget decision.

- [ ] **Step 6: Verify Side Sun and output safety**

Run:

```bash
rg -n -i "side sun" scripts/hotel-discovery/missing-hotels.* scripts/hotel-discovery/possible-duplicates.json scripts/hotel-discovery/unverified-ministry.json
rg -n 'displayName|formattedAddress|businessStatus|latitude|longitude' scripts/hotel-discovery --glob '!**/.cache/**'
```

Expected: Side Sun appears in exactly one review bucket if present in the Ministry snapshot; the second command returns no persistent copied Google fields.

- [ ] **Step 7: Run final regression verification**

Run:

```bash
npm test
npm run typecheck
git diff --check
git status --short
```

Expected: tests and typecheck pass; no whitespace errors; `src/hotel-index.js`, `src/hotels.js`, `src/hotel-distances.js`, `src/routes.js`, and price files are unchanged.

- [ ] **Step 8: Commit persistent discovery outputs**

Do not add `.cache/`.

```bash
git add scripts/hotel-discovery/missing-hotels.json scripts/hotel-discovery/missing-hotels.csv scripts/hotel-discovery/possible-duplicates.json scripts/hotel-discovery/known-hotels.json scripts/hotel-discovery/unverified-ministry.json scripts/hotel-discovery/status-conflicts.json scripts/hotel-discovery/google-unmatched-place-ids.json scripts/hotel-discovery/coverage-report.json
git commit -m "data: report missing Antalya-Alanya hotels"
```

The resulting commit is a review artifact only. Region/price mapping and merging into the production index remain separate follow-on work.
