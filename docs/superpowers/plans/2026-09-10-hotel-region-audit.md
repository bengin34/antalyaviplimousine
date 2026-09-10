# Hotel Region Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verify all indexed hotels' pricing regions against Google Places address data, correct every proven mismatch, research the residue, and add a CI guard so new hotels cannot enter the index unaudited.

**Architecture:** A pure classifier (`scripts/lib/hotel-region-audit.mjs`) sorts one hotel + one Places Details response into five buckets. A resumable script (`scripts/audit-hotel-regions.mjs`) drives it over the index, writes `checked: true` for `ok` rows into `src/hotel-distances.js`, and emits a report. A project skill documents the correction loop, and a vitest guard keeps the unchecked count at zero.

**Tech Stack:** Node 20+ ESM scripts, vitest, Google Places API (New) Details endpoint, existing helpers in `scripts/lib/hotel-region-matching.mjs` and `scripts/lib/hotel-distances-merge.mjs`.

**Spec:** `docs/superpowers/specs/2026-09-10-hotel-region-audit-design.md`

---

## Decisions locked in this plan

1. **The 22 resolved review rows are adopted** (spec "Prerequisite", option 1). The operator hand-resolved them into `region-review-resolved.json` and deliberately merged them in `mergeReviewedHotelMatches`; only the generated file and its header comment are stale. Adoption costs 22 Routes calls and puts the rows through the same audit as everything else.
2. **Price-equivalent regions classify as `ok`.** `ADDRESS_REGION_TERMS` maps the `manavgat` term to region `side`, while the index has a separate `manavgat` region with identical prices (`{vito: 50, sprinter: 85}`). Reporting that as `fix` would send layer 2 to move a Manavgat hotel into a Side belde block for a €0 change. The classifier therefore treats a derived region whose `prices` equal the index region's `prices` as confirming it, and records `priceEquivalent: true`. A test pins the two catalog entries equal so the rule cannot silently mask a real gap later.
3. **Identity accepts any lodging `primaryType`.** The spec names `hotel`/`resort_hotel` from `selectOperationalHotelPlace`. 645 of the 1223 rows are Antalya city apart-hotels and pensions that Google types as `lodging`, `extended_stay_hotel`, `guest_house`, `inn`, `motel`, `hostel`, or `bed_and_breakfast`. The audit's identity evidence is the name match plus `OPERATIONAL`; the type check only rejects non-lodging businesses. The audit uses a `LODGING_PLACE_TYPES` set; `selectOperationalHotelPlace` (discovery) keeps its stricter set untouched.
4. **`gone` rows are allowlisted, never deleted.** Removing a hotel withdraws it from guests; that stays an operator decision. The report lists them.
5. **Aliases count for identity.** A row's `aliases` are compared alongside `name`.

## API key

Scripts read `GOOGLE_MAPS_API_KEY` / `GOOGLE_PLACES_API_KEY` from the environment, not from `.env`. Every real-API step below is run as:

```bash
set -a; . ./.env; set +a; node scripts/<script>.mjs …
```

Never print the key. Never commit `.env`.

## File map

| File | Action | Responsibility |
| --- | --- | --- |
| `scripts/generate-hotel-index-discovered.mjs` | modify | header comment now says review-resolved rows are merged |
| `src/hotel-index-discovered.js` | regenerate | 373 rows |
| `src/hotel-distances.js` | regenerate / rewrite | +22 rows; `district` key removed; `checked` flipped by audit |
| `scripts/lib/hotel-distances-merge.mjs` | modify | `applyResult` stops writing `district`; new `renderHotelDistancesFile` |
| `scripts/lib/hotel-distances-merge.test.js` | modify | drop `district` expectations; test renderer |
| `scripts/build-hotel-distances.mjs` | modify | use `renderHotelDistancesFile` |
| `scripts/lib/hotel-region-matching.mjs` | modify | export `matchAddressRegionTerm`, `isOperationalHotelPlace`, `LODGING_PLACE_TYPES`; add `kumluca`, `kas`, `kepez` terms |
| `scripts/lib/hotel-region-matching.test.js` | modify | tests for the above |
| `scripts/lib/hotel-region-audit.mjs` | create | pure classifier, euro delta, report builder, markdown table |
| `scripts/lib/hotel-region-audit.test.js` | create | five-bucket fixtures + Belazur regression + ordering |
| `scripts/audit-hotel-regions.mjs` | create | network, checkpoint, file writes |
| `scripts/hotel-region-audit/checkpoint.json` | generated | resumable state (persistence-safe) |
| `scripts/hotel-region-audit/report.json` | generated | per-row buckets |
| `scripts/hotel-region-audit/report.md` | generated | human table ordered by money at risk |
| `package.json` | modify | `audit:hotel-regions` script |
| `src/hotel-region-audit.test.js` | create | layer-3 guard with `UNAUDITED_HOTEL_SLUGS` |
| `.claude/skills/hotel-region-audit/SKILL.md` | create | layer-2 correction loop |
| `src/hotel-index.js`, `src/hotel-index-antalya-city.js`, `scripts/hotel-discovery-pilot/*.json` | modify (layer 2) | corrections |

---

### Task 1: Adopt the 22 resolved discovery rows

**Files:**
- Modify: `scripts/generate-hotel-index-discovered.mjs:35-36`
- Regenerate: `src/hotel-index-discovered.js`, `src/hotel-distances.js`, `scripts/hotel-distances.report.json`

- [ ] **Step 1: Confirm the current state is stale**

Run:
```bash
node scripts/generate-hotel-index-discovered.mjs && git diff --stat src/hotel-index-discovered.js
```
Expected: `Wrote 373 discovered hotels …` and a diff with ~22 added rows.

- [ ] **Step 2: Fix the header comment in the generator**

Replace in `scripts/generate-hotel-index-discovered.mjs`:
```js
const file = `// Generated by scripts/generate-hotel-index-discovered.mjs from the safe\n`
  + `// region-price match set. Review rows are intentionally excluded.\n`
```
with:
```js
const file = `// Generated by scripts/generate-hotel-index-discovered.mjs from the safe\n`
  + `// region-price match set merged with the hand-resolved review rows\n`
  + `// (scripts/hotel-discovery-pilot/region-review-resolved.json). Edit those\n`
  + `// JSON files and re-run \`npm run generate:hotel-index-discovered\`; never\n`
  + `// edit this file by hand.\n`
```

- [ ] **Step 3: Regenerate and verify the guard test goes red for the right reason**

Run:
```bash
node scripts/generate-hotel-index-discovered.mjs && npx vitest run src/hotel-distances.test.js
```
Expected: FAIL — at least "every indexed hotel has a numeric km" lists 22 slugs. If `src/hotel-index.test.js` also fails because a resolved row's `pricingRegion` is not in `routeCatalog`, fix that row in `region-review-resolved.json` and regenerate before Step 4.

- [ ] **Step 4: Gap-fill distances for the 22 new rows**

Run:
```bash
set -a; . ./.env; set +a; node scripts/build-hotel-distances.mjs
```
Expected: `Processing 22 of 1245 hotels` … `Wrote 1245 rows`. Rows carry `placeId`, so no Text Search runs (see `routeDestination`).

- [ ] **Step 5: Prove regeneration is now a no-op and tests pass**

Run:
```bash
node scripts/generate-hotel-index-discovered.mjs && git diff --quiet src/hotel-index-discovered.js && echo NOOP && npx vitest run
```
Expected: `NOOP`, all tests pass.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-hotel-index-discovered.mjs src/hotel-index-discovered.js src/hotel-distances.js scripts/hotel-distances.report.json
git commit -m "Adopt the 22 hand-resolved discovery hotels and measure their distances"
```

---

### Task 2: Stop writing `district` into hotel-distances and share the file renderer

**Files:**
- Modify: `scripts/lib/hotel-distances-merge.mjs`
- Modify: `scripts/lib/hotel-distances-merge.test.js`
- Modify: `scripts/build-hotel-distances.mjs:129-136`
- Rewrite: `src/hotel-distances.js` (strip pass)

- [ ] **Step 1: Update the merge tests**

In `scripts/lib/hotel-distances-merge.test.js` replace the `applyResult` describe block with:
```js
describe("applyResult", () => {
  test("writes km + place for a matched hotel, and no district", () => {
    const next = applyResult({}, { slug: "a", district: "Side" }, { km: 50, place: "p" });
    expect(next.a).toEqual({ km: 50, place: "p", checked: false });
  });

  test("writes km:null + note for a no-match", () => {
    const next = applyResult({}, { slug: "a", district: "Side" }, null);
    expect(next.a).toEqual({ km: null, place: null, checked: false, note: "no-match" });
  });

  test("never overwrites a checked:true row", () => {
    const data = { a: { km: 50, place: "p", checked: true } };
    const next = applyResult(data, { slug: "a", district: "Side" }, { km: 999, place: "q" });
    expect(next.a).toEqual(data.a);
  });
});

describe("renderHotelDistancesFile", () => {
  test("sorts slugs and emits a frozen export with the generator banner", () => {
    const file = renderHotelDistancesFile({ b: { km: 1, place: "y", checked: false }, a: { km: 2, place: "x", checked: true } });
    expect(file.startsWith("// Generated by scripts/build-hotel-distances.mjs")).toBe(true);
    expect(file.indexOf('"a"')).toBeLessThan(file.indexOf('"b"'));
    expect(file).toContain("export const hotelDistances = Object.freeze({");
    expect(file.endsWith("});\n")).toBe(true);
  });
});
```
Add `renderHotelDistancesFile` to the import line.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run scripts/lib/hotel-distances-merge.test.js`
Expected: FAIL — `renderHotelDistancesFile` not exported; `district` present.

- [ ] **Step 3: Implement**

In `scripts/lib/hotel-distances-merge.mjs` replace `applyResult` and its JSDoc with:
```js
/**
 * Merge one fetch result into the data map, preserving checked:true rows.
 * The entry carries no district: the pricing region lives on the index row,
 * and a copy here would only make one unverified source look like two.
 * @param {object} data - current map (not mutated)
 * @param {{slug:string}} hotel
 * @param {{km:number, place:string} | null} result - null means no confident match
 * @returns {object} next map
 */
export function applyResult(data, hotel, result) {
  if (data[hotel.slug]?.checked === true) return data;
  const entry = result
    ? { km: result.km, place: result.place, checked: false }
    : { km: null, place: null, checked: false, note: "no-match" };
  return { ...data, [hotel.slug]: entry };
}

/** Serialises the distance map into src/hotel-distances.js source text. */
export function renderHotelDistancesFile(data) {
  const sorted = Object.fromEntries(Object.entries(data).sort(([a], [b]) => a.localeCompare(b)));
  return `// Generated by scripts/build-hotel-distances.mjs — do not edit by hand except
// to flip \`checked: true\` on a human-verified row (the generator preserves those).
// \`checked: true\` is written by scripts/audit-hotel-regions.mjs once the Place ID
// is identity-verified and its address agrees with the index region.
// One-way driving km from Antalya Airport (AYT) to each indexed hotel.
export const hotelDistances = Object.freeze(${JSON.stringify(sorted, null, 2)});
`;
}
```

In `scripts/build-hotel-distances.mjs` import `renderHotelDistancesFile` and replace the `sorted`/`file` block (lines 129-136) with:
```js
const file = renderHotelDistancesFile(data);
await writeFile(new URL("../src/hotel-distances.js", import.meta.url), file);
await writeFile(new URL("./hotel-distances.report.json", import.meta.url), JSON.stringify(report, null, 2));
console.error(`Wrote ${Object.keys(data).length} rows. Outliers/no-match: ${report.filter((r) => r.flag).length}`);
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run scripts/lib/hotel-distances-merge.test.js`
Expected: PASS.

- [ ] **Step 5: Strip pass over the data file (after the generator change, per spec)**

Run:
```bash
node -e '
import("./src/hotel-distances.js").then(async ({ hotelDistances }) => {
  const { renderHotelDistancesFile } = await import("./scripts/lib/hotel-distances-merge.mjs");
  const next = Object.fromEntries(Object.entries(hotelDistances).map(([slug, { district, ...row }]) => [slug, row]));
  const { writeFile } = await import("node:fs/promises");
  await writeFile("src/hotel-distances.js", renderHotelDistancesFile(next));
  console.log(Object.keys(next).length, "rows written");
});'
grep -c '"district"' src/hotel-distances.js
```
Expected: `1245 rows written`, then `0`.

- [ ] **Step 6: Full tests, commit**

Run: `npx vitest run`
Expected: PASS.

```bash
git add scripts/lib/hotel-distances-merge.mjs scripts/lib/hotel-distances-merge.test.js scripts/build-hotel-distances.mjs src/hotel-distances.js
git commit -m "Drop the self-confirming district copy from hotel-distances"
```

---

### Task 3: Matching helpers the audit needs

**Files:**
- Modify: `scripts/lib/hotel-region-matching.mjs`
- Modify: `scripts/lib/hotel-region-matching.test.js`

- [ ] **Step 1: Write failing tests**

Append to `scripts/lib/hotel-region-matching.test.js` (add the three names to the import):
```js
describe("matchAddressRegionTerm", () => {
  const components = (...texts) => texts.map((longText) => ({ longText, shortText: longText }));

  test("returns the region and the term that matched", () => {
    expect(matchAddressRegionTerm(components("Boğazkent", "Serik", "Antalya")))
      .toEqual({ region: "bogazkent", term: "bogazkent" });
  });

  test("resolves Kumluca, Kaş and Kepez addresses", () => {
    expect(matchAddressRegionTerm(components("Adrasan", "Kumluca"))).toEqual({ region: "kumluca", term: "adrasan" });
    expect(matchAddressRegionTerm(components("Kalkan", "Kaş"))).toEqual({ region: "kas", term: "kalkan" });
    expect(matchAddressRegionTerm(components("Kepez", "Antalya"))).toEqual({ region: "antalya", term: "kepez" });
  });

  test("returns null for an unknown locality", () => {
    expect(matchAddressRegionTerm(components("Nowhere", "Antalya"))).toBeNull();
    expect(pricingRegionFromAddressComponents(components("Nowhere"))).toBeNull();
  });
});

describe("isOperationalHotelPlace", () => {
  const place = (overrides = {}) => ({
    id: "p1", displayName: { text: "Barut Hemera Resort & Spa" },
    businessStatus: "OPERATIONAL", primaryType: "resort_hotel", ...overrides,
  });

  test("accepts a matching, operating lodging place", () => {
    expect(isOperationalHotelPlace("Barut Hemera", place())).toBe(true);
    expect(isOperationalHotelPlace("Barut Hemera", place({ primaryType: "lodging" }))).toBe(true);
  });

  test("accepts any of several candidate names", () => {
    expect(isOperationalHotelPlace(["Old Name", "Barut Hemera"], place())).toBe(true);
  });

  test("rejects on name, status, or type", () => {
    expect(isOperationalHotelPlace("Rixos Premium", place())).toBe(false);
    expect(isOperationalHotelPlace("Barut Hemera", place({ businessStatus: "CLOSED_PERMANENTLY" }))).toBe(false);
    expect(isOperationalHotelPlace("Barut Hemera", place({ primaryType: "restaurant" }))).toBe(false);
  });

  test("selectOperationalHotelPlace still uses the strict hotel types", () => {
    expect(selectOperationalHotelPlace("Barut Hemera", [place({ primaryType: "lodging" })])).toBeNull();
    expect(selectOperationalHotelPlace("Barut Hemera", [place()])).toEqual(place());
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run scripts/lib/hotel-region-matching.test.js`
Expected: FAIL — exports missing.

- [ ] **Step 3: Implement**

In `scripts/lib/hotel-region-matching.mjs`:

Extend `ADDRESS_REGION_TERMS` — insert before the `antalya` entry:
```js
  ["kumluca", ["kumluca", "adrasan", "olympos"]],
  ["kas", ["kas", "kalkan"]],
```
and add `"kepez"` to the `antalya` list. `ministryNameKey("Kaş")` → `kas`, so `kas` is the right term. The new entries overlap no other list, so their position only needs to be somewhere in the table; put them just above `antalya`.

Replace `pricingRegionFromAddressComponents` with:
```js
/** Resolves a known locality from ephemeral Places address parts to its pricing region and the term that matched. */
export function matchAddressRegionTerm(components) {
  const parts = (components ?? []).flatMap((component) =>
    [component?.longText, component?.shortText].filter(Boolean).map(ministryNameKey));
  const matches = (part, candidate) =>
    part === candidate || part.startsWith(`${candidate} `) || part.endsWith(` ${candidate}`);
  // Region order is the price-boundary priority (bogazkent before belek).
  // Within a region, walk the address parts first so the most specific
  // component (Adrasan) reports its own term rather than the ilçe's (Kumluca).
  for (const [region, terms] of ADDRESS_REGION_TERMS) {
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
```

Replace the identity block with:
```js
const GENERIC_IDENTITY_WORDS = new Set(["hotel", "hotels", "resort", "spa", "the"]);
const placeIdentityKey = (value) => ministryNameKey(value)
  .split(" ").filter((word) => word && !GENERIC_IDENTITY_WORDS.has(word)).join(" ");

const STRICT_HOTEL_TYPES = new Set(["hotel", "resort_hotel"]);
/** Google Places lodging types an audited index row may legitimately carry. */
export const LODGING_PLACE_TYPES = new Set([
  "hotel", "resort_hotel", "lodging", "extended_stay_hotel", "guest_house",
  "inn", "motel", "hostel", "bed_and_breakfast", "private_guest_room",
]);

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
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-matching.test.js scripts/lib/hotel-discovery-pilot.test.js`
Expected: PASS (discovery tests unchanged).

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/hotel-region-matching.mjs scripts/lib/hotel-region-matching.test.js
git commit -m "Expose single-place identity check and matched address term for the region audit"
```

---

### Task 4: Pure audit classifier and report builder

**Files:**
- Create: `scripts/lib/hotel-region-audit.mjs`
- Create: `scripts/lib/hotel-region-audit.test.js`

- [ ] **Step 1: Write failing tests**

`scripts/lib/hotel-region-audit.test.js`:
```js
import { describe, expect, test } from "vitest";
import { routeCatalog } from "../../src/routes.js";
import {
  classifyAuditRow,
  euroDelta,
  buildAuditReport,
  renderAuditTable,
} from "./hotel-region-audit.mjs";

const components = (...texts) => texts.map((longText) => ({ longText, shortText: longText }));
const place = (overrides = {}) => ({
  id: "ChIJ5Y7F-AxkwxQRR9PP9OvOW8c",
  displayName: { text: "Kirman Belazur Resort & Spa" },
  businessStatus: "OPERATIONAL",
  primaryType: "resort_hotel",
  addressComponents: components("Boğazkent", "Serik", "Antalya"),
  ...overrides,
});
// Pre-fix state of the motivating row: indexed under Belek, address says Boğazkent.
const belazur = {
  slug: "kirman-belazur-resort-spa", name: "Kirman Belazur Resort & Spa",
  region: "belek", regionSource: "district", aliases: [],
};

describe("classifyAuditRow", () => {
  test("fix: identity verified and address region differs (Belazur regression)", () => {
    expect(classifyAuditRow(belazur, { place: place() }, routeCatalog)).toEqual({
      slug: "kirman-belazur-resort-spa", name: "Kirman Belazur Resort & Spa",
      regionSource: "district", indexRegion: "belek", derivedRegion: "bogazkent",
      matchedTerm: "bogazkent", identityVerified: true, bucket: "fix",
      euroDelta: 5, priceEquivalent: false,
    });
  });

  test("ok: identity verified and regions agree", () => {
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: place() }, routeCatalog);
    expect(row.bucket).toBe("ok");
    expect(row.euroDelta).toBe(0);
  });

  test("ok: price-equivalent regions (manavgat address resolves to side)", () => {
    const hotel = { slug: "x", name: "X", region: "manavgat", regionSource: "district", aliases: [] };
    const row = classifyAuditRow(hotel, { place: place({ displayName: { text: "X Hotel" }, addressComponents: components("Manavgat") }) }, routeCatalog);
    expect(row).toMatchObject({ bucket: "ok", derivedRegion: "side", priceEquivalent: true, euroDelta: 0 });
  });

  test("unresolved: identity verified but no known locality", () => {
    const row = classifyAuditRow(belazur, { place: place({ addressComponents: components("Nowhere", "Antalya") }) }, routeCatalog);
    expect(row).toMatchObject({ bucket: "unresolved", derivedRegion: null, matchedTerm: null, identityVerified: true });
  });

  test("identity: display name does not match", () => {
    const row = classifyAuditRow(belazur, { place: place({ displayName: { text: "Some Other Resort" } }) }, routeCatalog);
    expect(row).toMatchObject({ bucket: "identity", identityVerified: false, identityReason: "name" });
  });

  test("identity: aliases are accepted", () => {
    const row = classifyAuditRow({ ...belazur, aliases: ["Some Other"] }, { place: place({ displayName: { text: "Some Other Resort" } }) }, routeCatalog);
    expect(row.bucket).toBe("fix");
  });

  test("identity: non-lodging type", () => {
    const row = classifyAuditRow(belazur, { place: place({ primaryType: "restaurant" }) }, routeCatalog);
    expect(row).toMatchObject({ bucket: "identity", identityReason: "type" });
  });

  test("gone: closed permanently or not found", () => {
    expect(classifyAuditRow(belazur, { place: place({ businessStatus: "CLOSED_PERMANENTLY" }) }, routeCatalog).bucket).toBe("gone");
    expect(classifyAuditRow(belazur, { notFound: true }, routeCatalog)).toMatchObject({ bucket: "gone", identityVerified: false });
  });

  test("never leaks Places text into the row", () => {
    const row = classifyAuditRow(belazur, { place: place() }, routeCatalog);
    const json = JSON.stringify(row);
    expect(json).not.toMatch(/Serik|displayName|formattedAddress|addressComponents|businessStatus/);
  });
});

describe("euroDelta", () => {
  test("is the absolute per-vehicle Vito difference between two regions", () => {
    expect(euroDelta("belek", "bogazkent", routeCatalog)).toBe(5);
    expect(euroDelta("kemer", "tekirova", routeCatalog)).toBe(20);
    expect(euroDelta("side", null, routeCatalog)).toBe(0);
  });

  test("side and manavgat are price-equivalent in the catalog (the ok rule depends on it)", () => {
    expect(routeCatalog.side.prices).toEqual(routeCatalog.manavgat.prices);
  });
});

describe("buildAuditReport", () => {
  const rows = [
    { slug: "a", bucket: "fix", euroDelta: 5 },
    { slug: "b", bucket: "fix", euroDelta: 20 },
    { slug: "c", bucket: "ok", euroDelta: 0 },
    { slug: "d", bucket: "identity", euroDelta: 0 },
  ];

  test("counts buckets and orders rows by money at risk, fixes first", () => {
    const report = buildAuditReport(rows, { generatedAt: "2026-09-10T00:00:00.000Z", indexed: 4 });
    expect(report.counts).toEqual({ ok: 1, fix: 2, unresolved: 0, identity: 1, gone: 0 });
    expect(report.rows.map((row) => row.slug)).toEqual(["b", "a", "d", "c"]);
    expect(report.audited).toBe(4);
    expect(report.indexed).toBe(4);
  });

  test("renders a markdown table with the same order", () => {
    const table = renderAuditTable(buildAuditReport(rows, { generatedAt: "x", indexed: 4 }));
    expect(table.indexOf("| b |")).toBeLessThan(table.indexOf("| a |"));
    expect(table).toContain("| slug |");
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `scripts/lib/hotel-region-audit.mjs`**

```js
/**
 * Pure classifier for the hotel region audit. No network, no fs.
 *
 * Persistence rule: nothing returned here may contain Places text. The row
 * carries only derived values (region, matched term, booleans, bucket).
 */
import { matchAddressRegionTerm, isOperationalHotelPlace, LODGING_PLACE_TYPES } from "./hotel-region-matching.mjs";

export const AUDIT_BUCKETS = Object.freeze(["ok", "fix", "unresolved", "identity", "gone"]);

/** Absolute per-vehicle Vito price gap between two regions; 0 when either is unknown. */
export function euroDelta(regionA, regionB, routeCatalog) {
  const a = routeCatalog[regionA]?.prices?.vito;
  const b = routeCatalog[regionB]?.prices?.vito;
  return Number.isFinite(a) && Number.isFinite(b) ? Math.abs(a - b) : 0;
}

const samePrices = (regionA, regionB, routeCatalog) => {
  const a = routeCatalog[regionA]?.prices;
  const b = routeCatalog[regionB]?.prices;
  return Boolean(a && b) && a.vito === b.vito && a.sprinter === b.sprinter;
};

function identityReason(names, place) {
  if (!place?.id) return "missing";
  if (place.businessStatus !== "OPERATIONAL") return "status";
  if (!LODGING_PLACE_TYPES.has(place.primaryType)) return "type";
  if (!isOperationalHotelPlace(names, place)) return "name";
  return null;
}

/**
 * @param {{slug:string,name:string,region:string,regionSource:string,aliases?:readonly string[]}} hotel
 * @param {{place?:object, notFound?:boolean}} details - one Places Details response, in memory only
 * @param {object} routeCatalog
 */
export function classifyAuditRow(hotel, details, routeCatalog) {
  const base = {
    slug: hotel.slug,
    name: hotel.name,
    regionSource: hotel.regionSource,
    indexRegion: hotel.region,
    derivedRegion: null,
    matchedTerm: null,
    identityVerified: false,
    bucket: "gone",
    euroDelta: 0,
    priceEquivalent: false,
  };
  const place = details?.place;
  if (details?.notFound || !place || place.businessStatus === "CLOSED_PERMANENTLY") {
    return { ...base, bucket: "gone", identityReason: place ? "status" : "missing" };
  }
  const reason = identityReason([hotel.name, ...(hotel.aliases ?? [])], place);
  if (reason) return { ...base, bucket: "identity", identityReason: reason };

  const match = matchAddressRegionTerm(place.addressComponents);
  if (!match) return { ...base, identityVerified: true, bucket: "unresolved" };

  const priceEquivalent = match.region !== hotel.region && samePrices(match.region, hotel.region, routeCatalog);
  const agrees = match.region === hotel.region || priceEquivalent;
  return {
    ...base,
    derivedRegion: match.region,
    matchedTerm: match.term,
    identityVerified: true,
    bucket: agrees ? "ok" : "fix",
    euroDelta: agrees ? 0 : euroDelta(hotel.region, match.region, routeCatalog),
    priceEquivalent,
  };
}

// Report order: things to act on first, confirmed rows last.
const BUCKET_RANK = { fix: 0, identity: 1, unresolved: 2, gone: 3, ok: 4 };

/** Orders rows by money at risk (fix rows by euro delta, then residue, then ok) and counts buckets. */
export function buildAuditReport(rows, { generatedAt, indexed }) {
  const counts = Object.fromEntries(AUDIT_BUCKETS.map((bucket) => [bucket, 0]));
  for (const row of rows) counts[row.bucket] = (counts[row.bucket] ?? 0) + 1;
  const ordered = [...rows].sort((a, b) =>
    (b.euroDelta ?? 0) - (a.euroDelta ?? 0)
    || BUCKET_RANK[a.bucket] - BUCKET_RANK[b.bucket]
    || String(a.slug).localeCompare(String(b.slug)));
  return { schemaVersion: 1, generatedAt, indexed, audited: rows.length, counts, rows: ordered };
}

const COLUMNS = ["slug", "bucket", "euroDelta", "indexRegion", "derivedRegion", "matchedTerm", "regionSource", "identityReason"];

export function renderAuditTable(report) {
  const head = `| ${COLUMNS.join(" | ")} |\n| ${COLUMNS.map(() => "---").join(" | ")} |`;
  const lines = report.rows
    .filter((row) => row.bucket !== "ok")
    .map((row) => `| ${COLUMNS.map((column) => row[column] ?? "").join(" | ")} |`);
  const summary = AUDIT_BUCKETS.map((bucket) => `${bucket}: ${report.counts[bucket]}`).join(", ");
  return `# Hotel region audit\n\nGenerated ${report.generatedAt}. Audited ${report.audited} of ${report.indexed}. ${summary}.\n\n${head}\n${lines.join("\n")}\n`;
}
```

Note: the ordering test expects `d` (identity, delta 0) before `c` (ok, delta 0); `BUCKET_RANK` puts actionable buckets before `ok`.

- [ ] **Step 4: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/hotel-region-audit.mjs scripts/lib/hotel-region-audit.test.js
git commit -m "Add pure five-bucket classifier for the hotel region audit"
```

---

### Task 5: The audit script

**Files:**
- Create: `scripts/audit-hotel-regions.mjs`
- Modify: `package.json` scripts
- Create (gitkeep): `scripts/hotel-region-audit/`

- [ ] **Step 1: Write the script**

`scripts/audit-hotel-regions.mjs`:
```js
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
 * src/hotel-distances.js (checked flags only).
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
    const error = new Error(`Places API ${response.status}: ${body.slice(0, 240)}`);
    error.fatal = [401, 403].includes(response.status);
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
console.log(JSON.stringify({ counts: report.counts, audited: report.audited, remaining: report.remaining, failures: Object.keys(checkpoint.failures).length }, null, 2));
```

Add to `package.json` scripts, after `"review:hotel-regions"`:
```json
    "audit:hotel-regions": "node scripts/audit-hotel-regions.mjs",
```

- [ ] **Step 2: Smoke-test on one slug (1 real call)**

Run:
```bash
set -a; . ./.env; set +a; node scripts/audit-hotel-regions.mjs --slug kirman-belazur-resort-spa
cat scripts/hotel-region-audit/report.md
grep -A4 '"kirman-belazur-resort-spa"' src/hotel-distances.js
```
Expected: counts `ok: 1`, `checked: true` on the Belazur row (index now says Boğazkent; address agrees). If the bucket is `identity`, inspect `identityReason` and stop — the smoke test must be `ok` before the bulk run.

- [ ] **Step 3: Verify persistence safety**

Run: `grep -cE '"(displayName|formattedAddress|addressComponents|businessStatus)"' scripts/hotel-region-audit/*.json || echo CLEAN`
Expected: `CLEAN` (or 0 for each file).

- [ ] **Step 4: Tests, commit**

Run: `npx vitest run`
Expected: PASS.

```bash
git add scripts/audit-hotel-regions.mjs package.json scripts/hotel-region-audit/ src/hotel-distances.js
git commit -m "Add resumable hotel region audit script"
```

---

### Task 6: Bulk audit run

- [ ] **Step 1: Run the full pass (≈1245 Details calls, resumable)**

Run:
```bash
set -a; . ./.env; set +a; node scripts/audit-hotel-regions.mjs
```
Expected: `remaining: 0`, `failures: 0`. If failures > 0, re-run the same command (it resumes and retries only failures). If a fatal 4xx aborts it, stop and report.

- [ ] **Step 2: Read the summary**

Run: `head -5 scripts/hotel-region-audit/report.md; node -e 'const r=require("./scripts/hotel-region-audit/report.json");console.log(r.counts)'`

Record the five counts in the final summary.

- [ ] **Step 3: Tests, commit**

Run: `npx vitest run`
Expected: PASS.

```bash
git add src/hotel-distances.js scripts/hotel-region-audit/
git commit -m "Run the hotel region audit: mark address-confirmed rows checked"
```

---

### Task 7: Apply `fix` rows (layer 2 corrections)

**Files:**
- Modify: `src/hotel-index.js` and/or `src/hotel-index-antalya-city.js` (seed rows)
- Modify: `scripts/hotel-discovery-pilot/region-price-matches.json` and/or `region-review-resolved.json` (discovery rows), then regenerate

- [ ] **Step 1: List the fix rows**

Run: `node -e 'const r=require("./scripts/hotel-region-audit/report.json");for(const x of r.rows.filter(r=>r.bucket==="fix"))console.log(x.euroDelta,x.regionSource,x.slug,x.indexRegion,"->",x.derivedRegion,x.matchedTerm)'`

- [ ] **Step 2: For each seed row (`regionSource: "district"`)**

Pick the district string for `matchedTerm` from `districtRegions` in `src/hotel-index.js` (e.g. term `colakli` → `"Çolaklı"`, `bogazkent` → `"Boğazkent"`, `kadriye` → `"Kadriye"`, `kumkoy` → `"Kumköy"`). Terms with no district string of their own (`manavgat`→ n/a, `sorgun`→`"Sorgun"`, `ilica`→`"Side"`, `cenger`→`"Kızılağaç"`, `saray`/`cumhuriyet`/`guller pinari`→`"Alanya merkez"`, `beldibi`→`"Beldibi"`, `lara`→`"Lara"`, `kundu`→`"Kundu"`, `aksu`→`"Aksu"`, `konyaalti`→`"Konyaaltı"`, `muratpasa`/`kepez`→`"Antalya merkez"`, `adrasan`→`"Adrasan"`, `kumluca`/`olympos`→`"Kumluca"`, `kalkan`/`kas`→`"Kaş"`). Move the tuple into the matching belde block of `src/hotel-index.js` (rows in `hotel-index-antalya-city.js` move into `hotel-index.js` when they leave the antalya region) and add a one-line comment in the `Sherwood Dreams` style:
```js
  // Seed said <old>; its own address is <belde>, across the €<delta> price line (audit 2026-09).
  ["<Hotel Name>", "<Belde>"],
```

- [ ] **Step 3: For each discovery row (`regionSource: "discovery"`)**

Find the `placeId` in `scripts/hotel-discovery-pilot/region-price-matches.json`, else in `region-review-resolved.json`. Set `pricingRegion` to `derivedRegion`, and update `pricingName`, `prices`, `originalPrices` from `routeCatalog[derivedRegion]` so the file stays self-consistent. Then:
```bash
node scripts/generate-hotel-index-discovered.mjs
```

- [ ] **Step 4: Re-verify each corrected row**

Run for each slug:
```bash
set -a; . ./.env; set +a; node scripts/audit-hotel-regions.mjs --slug <slug>
```
Expected: the row is now `ok` and `checked: true` appears. Re-run `node scripts/audit-hotel-regions.mjs` with no args at the end (0 calls, all completed) to rebuild the report.

- [ ] **Step 5: Tests, commit**

Run: `npx vitest run`
Expected: PASS (the district test in `src/hotel-index.test.js` must still hold for every moved row).

```bash
git add src/hotel-index.js src/hotel-index-antalya-city.js src/hotel-index-discovered.js scripts/hotel-discovery-pilot/*.json src/hotel-distances.js scripts/hotel-region-audit/
git commit -m "Correct hotel pricing regions the address audit proved wrong"
```

---

### Task 8: Work the residue

- [ ] **Step 1: `unresolved` — extend `ADDRESS_REGION_TERMS`**

Run: `node -e 'const r=require("./scripts/hotel-region-audit/report.json");console.log(r.rows.filter(r=>r.bucket==="unresolved").map(r=>r.indexRegion+" "+r.slug).join("\n"))'`

The report cannot show the address (persistence rule). For each distinct `indexRegion` group, look up 2–3 of the hotels on the web to learn which mahalle/belde Google files them under, add that term to the correct region's list in `hotel-region-matching.mjs` with a unit test, then re-run `--slug` for every hotel in the group. Likely additions: Alanya merkez mahalles (`kizlar pinari`, `hacet`, `carsi`, `sekerhane`, `kadipasa`, `kale`), Antalya (`dosemealti`, `sarisu`, `liman`, `hurma`, `guzeloba`, `sirinyali`, `fener`), Kemer (`arslanbucak`, `merkez`), Serik town → `belek` only if the hotel is genuinely priced as Belek. Never add a term that spans two price regions.

- [ ] **Step 2: `identity` — by reason**

Run: `node -e 'const r=require("./scripts/hotel-region-audit/report.json");const g={};for(const x of r.rows.filter(r=>r.bucket==="identity"))(g[x.identityReason]??=[]).push(x.slug);for(const k in g)console.log(k,g[k].length,g[k].slice(0,5))'`

- `name`: the Place ID resolves to a business with a different name. Search the web for the hotel; if it is a rebrand, add the new name to the row's `aliases` (seed tuple third element / discovery JSON `aliases`) and re-run `--slug`. If the Place ID is simply wrong, re-discover with a throwaway scratchpad helper (not added to the repo): Text Search `"<name>, Antalya, Turkey"` with field mask `places.id,places.displayName,places.businessStatus,places.primaryType`, filter through `selectOperationalHotelPlace`, then call Routes `computeRoutes` from AYT with `destination: { placeId }` (copy `drive()` from `build-hotel-distances.mjs`) and write `km` + `place` for that slug into `src/hotel-distances.js` via `renderHotelDistancesFile`. Do **not** route through `build-hotel-distances.mjs --only` for a seed row: it ignores the stored `place` and re-geocodes by name + district, the biased path the audit exists to replace. For a discovery row, additionally set the new `placeId` in the pilot JSON and regenerate, so the row and the distance file agree. Then `--slug` audit.
- `type`: Google types it outside `LODGING_PLACE_TYPES` (e.g. `apartment_complex`, `spa`, `campground`). If the web confirms it is the lodging we sell to, add the type to `LODGING_PLACE_TYPES` with a test and re-run `--slug`; otherwise treat as `name`.
- `status`: `CLOSED_TEMPORARILY`. Leave for the allowlist with the date.

- [ ] **Step 3: `gone` — allowlist, do not delete**

Confirm on the web. A rebrand goes through the `identity` path above. A closure stays in the index; it is listed in `UNAUDITED_HOTEL_SLUGS` (Task 9) with reason `closed per Google, operator to confirm removal — 2026-09`. Also add it to `UNMAPPED_HOTEL_SLUGS` in `src/hotel-distances.test.js` **only** if its `km` was also invalidated.

- [ ] **Step 4: Rebuild the report and run tests**

```bash
set -a; . ./.env; set +a; node scripts/audit-hotel-regions.mjs
npx vitest run
```

- [ ] **Step 5: Commit**

```bash
git add -A scripts/lib/hotel-region-matching.mjs scripts/lib/hotel-region-matching.test.js src/hotel-index.js src/hotel-index-antalya-city.js src/hotel-index-discovered.js scripts/hotel-discovery-pilot/*.json src/hotel-distances.js scripts/hotel-region-audit/
git commit -m "Resolve the hotel region audit residue"
```

---

### Task 9: Layer-3 guard

**Files:**
- Create: `src/hotel-region-audit.test.js`

- [ ] **Step 1: Write the guard**

```js
// src/hotel-region-audit.test.js
import { describe, test, expect } from "vitest";
import { hotelIndex } from "./hotel-index.js";
import { hotelDistances } from "./hotel-distances.js";

// Hotels the region audit could not prove. Each entry needs a one-line reason
// and a date. Adding a hotel to the index without auditing it fails the first
// test below; run `npm run audit:hotel-regions -- --only-unchecked` instead of
// adding it here. Keep this list short and audited.
export const UNAUDITED_HOTEL_SLUGS = new Map([
  // ["some-hotel", "closed per Google, operator to confirm removal — 2026-09"],
]);

describe("hotel region audit guard", () => {
  test("every indexed hotel is address-audited or explicitly allowlisted", () => {
    const unchecked = hotelIndex
      .filter((hotel) => !UNAUDITED_HOTEL_SLUGS.has(hotel.slug))
      .filter((hotel) => hotelDistances[hotel.slug]?.checked !== true)
      .map((hotel) => hotel.slug);
    expect(unchecked).toEqual([]);
  });

  test("no allowlisted slug is secretly audited (stale allowlist entry)", () => {
    const stale = [...UNAUDITED_HOTEL_SLUGS.keys()]
      .filter((slug) => hotelDistances[slug]?.checked === true);
    expect(stale).toEqual([]);
  });

  test("every allowlist entry carries a reason", () => {
    for (const [slug, reason] of UNAUDITED_HOTEL_SLUGS) {
      expect(reason, slug).toMatch(/\S.*20\d\d-\d\d/);
    }
  });
});
```

- [ ] **Step 2: Run it**

Run: `npx vitest run src/hotel-region-audit.test.js`
Expected: FAIL listing exactly the residue slugs from Task 8. Fill `UNAUDITED_HOTEL_SLUGS` with those slugs and their reasons. Re-run: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/hotel-region-audit.test.js
git commit -m "Guard: every indexed hotel must be region-audited or allowlisted"
```

---

### Task 10: The `hotel-region-audit` skill

**Files:**
- Create: `.claude/skills/hotel-region-audit/SKILL.md`

- [ ] **Step 1: Write the skill**

```markdown
---
name: hotel-region-audit
description: Use when adding hotels to the index, when the region-audit guard test fails, or to re-verify hotel pricing regions against Google Places. Drives scripts/audit-hotel-regions.mjs and the correction loop.
---

# Hotel region audit

Spec: `docs/superpowers/specs/2026-09-10-hotel-region-audit-design.md`.

## Run

```bash
set -a; . ./.env; set +a
node scripts/audit-hotel-regions.mjs --only-unchecked   # after adding hotels
node scripts/audit-hotel-regions.mjs                     # full pass, resumes from checkpoint
node scripts/audit-hotel-regions.mjs --slug <slug>       # re-verify one row
```
Read `scripts/hotel-region-audit/report.md` (non-ok rows, ordered by € at risk).

## Correct `fix` rows by population

- `regionSource: district` — move the tuple into the right belde block of `src/hotel-index.js` (or out of `src/hotel-index-antalya-city.js`), pick the belde from `matchedTerm` via `districtRegions`, add a one-line comment saying why the seed was wrong (see `Sherwood Dreams Resort`).
- `regionSource: discovery` — never edit `src/hotel-index-discovered.js`. Find the Place ID in `scripts/hotel-discovery-pilot/region-price-matches.json` or `region-review-resolved.json`, set `pricingRegion` (+ `pricingName`, `prices`, `originalPrices` from `routeCatalog`), then `npm run generate:hotel-index-discovered`.

Then `--slug <slug>` so the row earns `checked: true` from the same verification path. Never hand-flip `checked`. A `--slug` run writes a one-row report; when all corrections are done, run the script once more with no arguments (0 calls, everything is in the checkpoint) to rebuild the full `report.json`/`report.md`.

## Residue

- `unresolved` — the address is a belde outside `ADDRESS_REGION_TERMS` (`scripts/lib/hotel-region-matching.mjs`). Research it; add the term to the region's list with a test; re-run `--slug` for every hotel in that group. Never add a term that spans two price regions.
- `identity` — `identityReason` says `name`, `type`, or `status`. Rebrand → add an alias. Wrong Place ID → re-discover via Text Search + `selectOperationalHotelPlace`, route from AYT with `{ placeId }`, write `km` + `place` for the slug (scratchpad helper; `build-hotel-distances.mjs --only` re-geocodes by name and must not be used here), update the pilot JSON `placeId` for discovery rows, then `--slug`. Unusual lodging type → extend `LODGING_PLACE_TYPES` with a test.
- `gone` — confirm on the web. Rebrand → identity path. Closure → allowlist in `src/hotel-region-audit.test.js` with reason + date; removal from the index is the operator's decision, report it.

Ambiguous across a price boundary → file under the dearer region (rule in `src/hotel-index.js` header).

## Finish

`npm test`, then report what changed and the € impact per hotel (`euroDelta` in `report.json`).
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/hotel-region-audit/SKILL.md
git commit -m "Add hotel-region-audit skill for the correction loop"
```

---

### Task 11: Close out

- [ ] **Step 1: Full verification**

Run: `npm run typecheck && npx vitest run`
Expected: both pass.

- [ ] **Step 2: Mark the spec implemented**

In `docs/superpowers/specs/2026-09-10-hotel-region-audit-design.md` change the status line to `**Status:** Implemented 2026-09-10 — see docs/superpowers/plans/2026-09-10-hotel-region-audit.md`, and add a short "Decisions taken during implementation" section listing the five decisions from the top of this plan.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-09-10-hotel-region-audit-design.md docs/superpowers/plans/2026-09-10-hotel-region-audit.md
git commit -m "Mark the hotel region audit spec implemented"
```

- [ ] **Step 4: Report** — bucket counts before and after, every corrected hotel with its € delta, the allowlist, and any `gone` hotels awaiting an operator decision.
