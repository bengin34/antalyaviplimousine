# Hotel Address Verification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop confirming a hotel's pricing region on a single piece of evidence, so a hotel whose address text cannot decide its price is caught instead of silently quoted on the cheap side.

**Architecture:** The audit gains two evidence sources beside the address term it already uses — a coordinate, resolved by the `resolvePricingRegion` function that already exists, and the AYT driving km already stored per hotel. A row is confirmed only when two sources agree on the hotel's index region.

The classifier splits in two, and that split is what makes the km source possible at all. `extractEvidence` turns one Places response into persistable derived values. `classifyFromEvidence` turns those stored values plus the km ranges into a bucket. Only the first needs the network, so the second re-runs over the whole checkpoint for free after every run — which is required, because a region's km range is not known until every row's evidence exists.

The script still writes exactly one field (`checked`) and never edits the index.

**Tech Stack:** Node ESM (`.mjs` for scripts, `.js` for app source), Vitest, Google Places Details v1.

---

## Read before starting

- Spec: `docs/superpowers/specs/2026-09-11-hotel-address-verification-design.md`
- Prior spec, still in force for everything except the evidence model:
  `docs/superpowers/specs/2026-09-10-hotel-region-audit-design.md`
- Operator workflow: `.claude/skills/hotel-region-audit/SKILL.md`

## Three things that will bite you

**1. New logic must live in one of two existing files.** `auditRulesHash`
(`scripts/lib/hotel-audit-state.mjs:4`) hashes the full bytes of exactly
`scripts/lib/hotel-region-audit.mjs` and `scripts/lib/hotel-region-matching.mjs`.
That hash is what invalidates stale `checked` flags. **Logic placed in a new file
would not be hashed**, so changing it later would leave every `checked: true`
silently valid. Put pure classification in `hotel-region-audit.mjs`, address and
coordinate matching in `hotel-region-matching.mjs`. Do not add a new
`scripts/lib/*.mjs` for this work.

**2. `npm test` goes red the moment you touch either lib file, and stays red
until Task 9.** Changing them changes `auditRulesHash`, which changes every
`auditInputHash`, which fails the committed-state guard at
`src/hotel-region-audit.test.js:106` for ~1165 rows. This is the guard working as
designed — it is telling you the stored evidence no longer matches the rules that
produced it — and only a fresh audit run can clear it. **Do not weaken that test
to get green.** While working through Tasks 1–8, verify with the unit files only:

```bash
npx vitest run scripts/lib/hotel-region-audit.test.js scripts/lib/hotel-region-matching.test.js
```

Run the full `npm test` at Task 9, after the audit has rewritten the checkpoint.
Do not merge to `main` mid-plan.

**3. Nothing from Places may reach disk except derived values.**
`scripts/audit-hotel-regions.mjs:58` throws if the checkpoint JSON contains a
`"location"`, `"displayName"`, `"formattedAddress"`, `"addressComponents"` or
`"businessStatus"` key. The coordinate is read in memory and discarded;
`resolvePricingRegion` is built to return a region and never the coordinate.
Never put a coordinate on a returned row.

## File structure

| File | Responsibility | Change |
|---|---|---|
| `scripts/lib/hotel-region-matching.mjs` | Address terms, coordinate bands, name matching | Export `ADDRESS_REGION_TERMS` and `placeIdentityKey`. Nothing else. |
| `scripts/lib/hotel-region-audit.mjs` | Term conclusiveness, evidence extraction, classification, report | Most of the work |
| `scripts/audit-hotel-regions.mjs` | Network, checkpoint, file writes | Field mask, plus a reclassification pass after the fetch loop |
| `scripts/lib/hotel-region-matching.test.js` | Matching unit tests | One new case |
| `scripts/lib/hotel-region-audit.test.js` | Classifier unit tests | New cases, plus rewrites of seven existing ones |
| `src/hotel-region-audit.test.js` | Guard over committed state | One new assertion |
| `.claude/skills/hotel-region-audit/SKILL.md` | Operator instructions | Residue and identity sections |

`matchAddressRegionTerm` is deliberately **not** changed. An earlier draft had it
return the ilçe it matched on; that breaks twelve existing whole-object
assertions for no gain, since `isConclusiveTerm` can look the ilçe up itself.

---

### Task 1: Expose the term table

**Files:**
- Modify: `scripts/lib/hotel-region-matching.mjs:126`
- Test: `scripts/lib/hotel-region-matching.test.js`

- [ ] **Step 1: Write the failing test**

Add a case to the existing file. **Do not add a new `import` line** —
`matchAddressRegionTerm` is already imported at `:7`; add `ADDRESS_REGION_TERMS`
to that existing import list, or a duplicate binding is a hard `SyntaxError`.

```js
test("the term table is exported so conclusiveness can be derived from it", () => {
  const kizilagac = ADDRESS_REGION_TERMS.find(([region]) => region === "kizilagac");
  expect(kizilagac).toEqual(["kizilagac", ["kizilagac", "kizilot", "cenger"], "manavgat"]);
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run scripts/lib/hotel-region-matching.test.js`
Expected: FAIL — `ADDRESS_REGION_TERMS` is not exported.

- [ ] **Step 3: Make it pass**

One word, at `scripts/lib/hotel-region-matching.mjs:126`:

```js
export const ADDRESS_REGION_TERMS = Object.freeze([
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-matching.test.js`
Expected: PASS, all existing cases included. Nothing else changed.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/hotel-region-matching.mjs scripts/lib/hotel-region-matching.test.js
git commit -m "Expose the address term table"
```

---

### Task 2: Decide whether a matched term can decide a price

A belde term always names one price region. An ilçe name only does when every
region in that ilçe costs the same. Today `manavgat` and `kemer` are listed as
belde terms and cannot.

**Files:**
- Modify: `scripts/lib/hotel-region-audit.mjs:7` (imports), after `:22`
- Test: `scripts/lib/hotel-region-audit.test.js`

- [ ] **Step 1: Write the failing test**

```js
import { isConclusiveTerm } from "./hotel-region-audit.mjs";

describe("isConclusiveTerm", () => {
  test("a belde term decides a price", () => {
    expect(isConclusiveTerm({ region: "side", term: "kumkoy" }, routeCatalog)).toBe(true);
  });

  test("Manavgat cannot: it holds Side €50 and Kızılağaç €70", () => {
    expect(isConclusiveTerm({ region: "side", term: "manavgat" }, routeCatalog)).toBe(false);
  });

  test("Kemer cannot: it holds Kemer €55 and Tekirova €75", () => {
    expect(isConclusiveTerm({ region: "kemer", term: "kemer" }, routeCatalog)).toBe(false);
  });

  test("an ilçe holding one price region can, so Kaş and Kumluca keep their evidence", () => {
    expect(isConclusiveTerm({ region: "kas", term: "kas" }, routeCatalog)).toBe(true);
    expect(isConclusiveTerm({ region: "kumluca", term: "kumluca" }, routeCatalog)).toBe(true);
  });

  test("a region with no ilçe gate is conclusive", () => {
    expect(isConclusiveTerm({ region: "antalya", term: "lara" }, routeCatalog)).toBe(true);
  });

  test("adding a second price region to an ilçe demotes that ilçe's own term", () => {
    const pricier = { ...routeCatalog, kas: { ...routeCatalog.kas, prices: { vito: 999, sprinter: 999 } } };
    expect(isConclusiveTerm({ region: "kas", term: "kas" }, pricier)).toBe(true); // kas is still alone in its ilçe
    expect(isConclusiveTerm({ region: "side", term: "manavgat" }, pricier)).toBe(false);
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: FAIL — `isConclusiveTerm is not a function`.

- [ ] **Step 3: Make it pass**

Extend the import at `scripts/lib/hotel-region-audit.mjs:7` with
`ADDRESS_REGION_TERMS`, then add after `samePrices` (`:22`):

```js
/**
 * An address term decides a price only when it cannot stand for two regions
 * that cost different amounts. A belde term never can. An ilçe name can only
 * when every region inside that ilçe costs the same — true of Kaş and Kumluca,
 * false of Manavgat (Side €50, Kızılağaç €70) and Kemer (Kemer €55, Tekirova
 * €75), which is how 72 hotels came to be confirmed on the cheap side.
 *
 * The ilçe is looked up here rather than reported by matchAddressRegionTerm,
 * so that function's return shape — and its twelve existing assertions — stay
 * as they are.
 */
export function isConclusiveTerm(match, routeCatalog) {
  const ilce = ADDRESS_REGION_TERMS.find(([region]) => region === match?.region)?.[2];
  if (!ilce || match.term !== ilce) return true;
  const regions = ADDRESS_REGION_TERMS
    .filter(([, , gate]) => gate === ilce)
    .map(([region]) => region);
  return regions.every((region) => samePrices(region, regions[0], routeCatalog));
}
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/hotel-region-audit.mjs scripts/lib/hotel-region-audit.test.js
git commit -m "Decide whether an address term can decide a price"
```

---

### Task 3: Judge identity on the name, and record type and status as notes

`identityCheck` returns on status and type before it ever compares the name, so
23 rows have never had their identity assessed. Reordering alone is not enough:
`isOperationalHotelPlace` re-tests both conditions itself, so a type-mismatched
place would silently degrade to a loose match.

**Files:**
- Modify: `scripts/lib/hotel-region-matching.mjs:170` (add `export`), `scripts/lib/hotel-region-audit.mjs:24-32`
- Test: `scripts/lib/hotel-region-audit.test.js`

- [ ] **Step 1: Write the failing test**

```js
describe("identity judged on the name", () => {
  const bogazkent = { ...belazur, region: "bogazkent" };

  test("an unusual place type no longer blocks verification", () => {
    const row = classifyAuditRow(bogazkent, { place: place({ primaryType: "restaurant" }) }, routeCatalog);
    expect(row.identityStrength).toBe("strict");
    expect(row.identityNotes).toEqual(["type"]);
    expect(row.identityReason).toBeUndefined();
  });

  test("a temporarily closed listing no longer blocks verification", () => {
    const row = classifyAuditRow(bogazkent, { place: place({ businessStatus: "CLOSED_TEMPORARILY" }) }, routeCatalog);
    expect(row.identityStrength).toBe("strict");
    expect(row.identityNotes).toEqual(["status"]);
  });

  test("a different business still fails on the name", () => {
    const row = classifyAuditRow(bogazkent, { place: place({ displayName: { text: "Bim Market" } }) }, routeCatalog);
    expect(row.bucket).toBe("identity");
    expect(row.identityReason).toBe("name");
  });

  test("permanently closed still reaches gone without consulting identity", () => {
    const row = classifyAuditRow(bogazkent, { place: place({ businessStatus: "CLOSED_PERMANENTLY" }) }, routeCatalog);
    expect(row.bucket).toBe("gone");
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: FAIL — the first two land in `identity` with reason `type` / `status`.

- [ ] **Step 3: Make it pass**

Export the key helper. The real definition spans **two lines**
(`scripts/lib/hotel-region-matching.mjs:170-171`) — add the keyword, keep the
body exactly as it is, or you strip generic-word handling repo-wide:

```js
export const placeIdentityKey = (value) => ministryNameKey(value)
  .split(" ").filter((word) => word && !GENERIC_IDENTITY_WORDS.has(word)).join(" ");
```

Add `placeIdentityKey` to the import list in `hotel-region-audit.mjs`, then
replace `identityCheck` (`:24-32`):

```js
/**
 * Whether this Place names the hotel, ignoring what Google files it as.
 * `isOperationalHotelPlace` cannot answer that: it re-tests type and status
 * itself, so a pansiyon listed as a restaurant would never match strictly.
 * Those two facts say nothing about where a place is, so they travel as notes.
 */
const nameMatchesPlace = (names, place) =>
  new Set([].concat(names).map(placeIdentityKey)).has(placeIdentityKey(place?.displayName?.text));

/** Returns { reason } when identity fails, else { strength, notes }. */
function identityCheck(names, place) {
  if (!place?.id) return { reason: "missing" };
  const notes = [];
  if (place.businessStatus !== "OPERATIONAL") notes.push("status");
  if (!LODGING_PLACE_TYPES.has(place.primaryType)) notes.push("type");
  if (nameMatchesPlace(names, place)) return { strength: "strict", notes };
  if (looseNameMatch(names, place.displayName?.text)) return { strength: "loose", notes };
  return { reason: "name" };
}
```

Leave `isOperationalHotelPlace` untouched — `selectOperationalHotelPlace`
(`hotel-region-matching.mjs:259`) still needs its stricter question.

- [ ] **Step 4: Rewrite the one existing test this reverses**

`scripts/lib/hotel-region-audit.test.js:73` currently asserts
`identity: non-lodging type` → `{ bucket: "identity", identityReason: "type" }`.
That behaviour is deliberately gone. Replace the assertion with the new
contract — a non-lodging type is a note, not a rejection — rather than deleting
the case.

- [ ] **Step 5: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/hotel-region-matching.mjs scripts/lib/hotel-region-audit.mjs scripts/lib/hotel-region-audit.test.js
git commit -m "Judge hotel identity on the name, not on how Google files it"
```

---

### Task 4: Derive km ranges from the checkpoint

**Files:**
- Modify: `scripts/lib/hotel-region-audit.mjs`
- Test: `scripts/lib/hotel-region-audit.test.js`

- [ ] **Step 1: Write the failing test**

```js
import { kmRangesFromCompleted, kmRegionFor } from "./hotel-region-audit.mjs";

describe("km ranges", () => {
  const completed = {
    a: { slug: "a", addressRegion: "kemer", locationRegion: "kemer" },
    b: { slug: "b", addressRegion: "kemer", locationRegion: null },
    c: { slug: "c", addressRegion: "tekirova", locationRegion: "tekirova" },
    d: { slug: "d", addressRegion: "tekirova", locationRegion: "tekirova" },
    weak: { slug: "weak", addressRegion: null, locationRegion: "kemer" },
    conflicted: { slug: "conflicted", addressRegion: "kemer", locationRegion: "tekirova" },
  };
  const distances = {
    a: { km: 44 }, b: { km: 68 }, c: { km: 75 }, d: { km: 78 },
    weak: { km: 5 }, conflicted: { km: 200 },
  };

  test("only conclusive, uncontradicted rows set a range", () => {
    expect(kmRangesFromCompleted(completed, distances)).toEqual({
      kemer: { min: 44, max: 68 },
      tekirova: { min: 75, max: 78 },
    });
  });

  test("a km inside exactly one range names that region", () => {
    const ranges = kmRangesFromCompleted(completed, distances);
    expect(kmRegionFor(76, ranges)).toBe("tekirova");
    expect(kmRegionFor(50, ranges)).toBe("kemer");
  });

  test("a km inside no range names nothing", () => {
    const ranges = kmRangesFromCompleted(completed, distances);
    expect(kmRegionFor(72, ranges)).toBe(null);
    expect(kmRegionFor(300, ranges)).toBe(null);
  });

  test("a km inside two overlapping ranges names nothing", () => {
    const ranges = { belek: { min: 26, max: 42 }, bogazkent: { min: 41, max: 44 } };
    expect(kmRegionFor(41, ranges)).toBe(null);
    expect(kmRegionFor(43, ranges)).toBe("bogazkent");
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: FAIL — neither function exists.

- [ ] **Step 3: Make it pass**

```js
/**
 * Observed km span per region, over rows whose address term was conclusive and
 * whose coordinate did not contradict it. Derived from the whole checkpoint, so
 * `--slug` and `--max-calls` runs cannot bucket a hotel differently from a full
 * run on the same evidence.
 */
export function kmRangesFromCompleted(completed, hotelDistances) {
  const ranges = {};
  for (const row of Object.values(completed ?? {})) {
    if (!row?.addressRegion) continue;
    if (row.locationRegion && row.locationRegion !== row.addressRegion) continue;
    const km = Number(hotelDistances?.[row.slug]?.km);
    if (!Number.isFinite(km) || km <= 0) continue;
    const seen = ranges[row.addressRegion];
    ranges[row.addressRegion] = seen
      ? { min: Math.min(seen.min, km), max: Math.max(seen.max, km) }
      : { min: km, max: km };
  }
  return ranges;
}

/** The one region whose km span contains this distance, or null if none or several do. */
export function kmRegionFor(km, ranges) {
  if (!Number.isFinite(km) || km <= 0) return null;
  const hits = Object.entries(ranges ?? {})
    .filter(([, range]) => km >= range.min && km <= range.max)
    .map(([region]) => region);
  return hits.length === 1 ? hits[0] : null;
}
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/hotel-region-audit.mjs scripts/lib/hotel-region-audit.test.js
git commit -m "Derive per-region km ranges from the audit checkpoint"
```

---

### Task 5: Split the classifier so stored rows can be re-judged

This is the centre of the change, and the split is not cosmetic: a region's km
range is unknown until every row's evidence exists, so classification has to be
able to run a second time over stored rows with no network.

**Files:**
- Modify: `scripts/lib/hotel-region-audit.mjs:39-84`
- Test: `scripts/lib/hotel-region-audit.test.js`

- [ ] **Step 1: Write the failing test**

Add these fixtures beside the existing ones:

```js
const withLocation = (overrides = {}) =>
  place({ location: { latitude: 36.85, longitude: 31.18 }, ...overrides });
const ranges = { bogazkent: { min: 41, max: 44 }, belek: { min: 26, max: 40 } };
const opts = (km) => ({ kmRanges: ranges, km });
```

```js
describe("two agreeing sources", () => {
  test("address and coordinate agree on the index region: ok", () => {
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: withLocation() }, routeCatalog, opts(43));
    expect(row.bucket).toBe("ok");
    expect(row.agreeingSources).toBeGreaterThanOrEqual(2);
    expect(row.derivedRegion).toBe("bogazkent");
  });

  test("two sources agree on a region the index does not use: fix, not ok", () => {
    const row = classifyAuditRow(belazur, { place: withLocation() }, routeCatalog, opts(43));
    expect(row.bucket).toBe("fix");
    expect(row.derivedRegion).toBe("bogazkent");
    expect(row.euroDelta).toBe(5);
  });

  test("one source alone never confirms", () => {
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: place() }, routeCatalog, { kmRanges: {}, km: null });
    expect(row.bucket).toBe("unresolved");
    expect(row.unresolvedReason).toBe("single-source");
    expect(row.agreeingSources).toBe(1);
  });

  test("a coordinate on a band edge abstains and is not counted", () => {
    const onEdge = place({ location: { latitude: 36.85, longitude: 31.134 } });
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: onEdge }, routeCatalog, { kmRanges: {}, km: null });
    expect(row.locationRegion).toBe(null);
    expect(row.locationReview).toBe("near-pricing-boundary");
    expect(row.agreeingSources).toBe(1);
  });

  test("an inconclusive term abstains, so it cannot confirm alone", () => {
    const manavgatOnly = place({ addressComponents: components("Manavgat", "Antalya") });
    const row = classifyAuditRow({ ...belazur, region: "side" }, { place: manavgatOnly }, routeCatalog, { kmRanges: {}, km: null });
    expect(row.addressRegion).toBe(null);
    expect(row.matchedTerm).toBe("manavgat");
    expect(row.bucket).not.toBe("ok");
  });

  test("conflicting sources report the dearest candidate", () => {
    const kizilagac = place({ addressComponents: components("Kızılağaç", "Manavgat", "Antalya") });
    const row = classifyAuditRow({ ...belazur, region: "side" }, { place: kizilagac }, routeCatalog,
      { kmRanges: { alanya_bati: { min: 91, max: 118 } }, km: 100 });
    expect(row.bucket).toBe("unresolved");
    expect(row.unresolvedReason).toBe("conflict");
    expect(row.candidateRegions).toEqual(expect.arrayContaining(["kizilagac", "alanya_bati"]));
    expect(row.derivedRegion).toBe("kizilagac"); // 70/115 beats alanya_bati 70/90 on Sprinter
  });

  test("no evidence at all names no candidate", () => {
    const bare = place({ addressComponents: components("Türkiye") });
    const row = classifyAuditRow({ ...belazur, region: "side" }, { place: bare }, routeCatalog, { kmRanges: {}, km: null });
    expect(row.unresolvedReason).toBe("no-evidence");
    expect(row.derivedRegion).toBe(null);
  });

  test("a loose name pointing at another region stays residue, even on one source", () => {
    const sibling = place({ displayName: { text: "Kirman Belazur Resort" }, addressComponents: components("Çamyuva", "Kemer", "Antalya") });
    const row = classifyAuditRow({ ...belazur, region: "alanya_bati" }, { place: sibling }, routeCatalog, { kmRanges: {}, km: null });
    expect(row.bucket).toBe("identity");
    expect(row.identityReason).toBe("loose-name-region-conflict");
  });
});

describe("classifyFromEvidence re-judges a stored row", () => {
  test("the same evidence gains a source once a km range exists", () => {
    const first = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: place() }, routeCatalog, { kmRanges: {}, km: 43 });
    expect(first.bucket).toBe("unresolved");

    const again = classifyFromEvidence(first, routeCatalog, { kmRanges: ranges, km: 43 });
    expect(again.bucket).toBe("ok");
    expect(again.agreeingSources).toBe(2);
  });

  test("a terminal row is returned untouched", () => {
    const gone = classifyAuditRow(belazur, { notFound: true }, routeCatalog, {});
    expect(classifyFromEvidence(gone, routeCatalog, { kmRanges: ranges, km: 43 })).toEqual(gone);
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: FAIL — `classifyFromEvidence` does not exist and `classifyAuditRow` ignores its fourth argument.

- [ ] **Step 3: Make it pass**

Import `resolvePricingRegion` in `hotel-region-audit.mjs`. Add above
`classifyAuditRow`:

```js
const priceOf = (region, routeCatalog) => {
  const prices = routeCatalog[region]?.prices;
  return prices ? [prices.vito, prices.sprinter] : [-1, -1];
};

/** Dearest by Vito, then by Sprinter — kizilagac (70/115) over alanya_bati (70/90). */
const dearest = (regions, routeCatalog) => [...regions].sort((a, b) => {
  const [aVito, aSprinter] = priceOf(a, routeCatalog);
  const [bVito, bSprinter] = priceOf(b, routeCatalog);
  return bVito - aVito || bSprinter - aSprinter || String(a).localeCompare(String(b));
})[0] ?? null;

/**
 * The region at least two sources name, preferring the index region so a row
 * that agrees with the index is never reported as a move. Price-equivalent
 * regions count as one answer: side and manavgat are both 50/85.
 */
function agreedRegion(sources, indexRegion, routeCatalog) {
  const ordered = [...sources].sort((a, b) =>
    Number(b === indexRegion) - Number(a === indexRegion));
  for (const candidate of ordered) {
    const agreeing = sources.filter((region) =>
      region === candidate || samePrices(region, candidate, routeCatalog));
    if (agreeing.length >= 2) return { region: candidate, count: agreeing.length };
  }
  return null;
}
```

Replace `classifyAuditRow` with the pair. `extractEvidence` keeps everything the
network can tell us; `bucket: null` marks a row still awaiting judgement:

```js
/**
 * Derives everything one Places response can say about a hotel. Rows that end
 * here — gone, or an identity that names another business — carry a bucket.
 * Everything else carries `bucket: null` and waits for classifyFromEvidence,
 * because a region's km range is not known until every row has been extracted.
 *
 * The coordinate is read here and never returned: the checkpoint may not carry
 * Places content, and resolvePricingRegion is built for that.
 */
export function extractEvidence(hotel, details, routeCatalog) {
  const base = {
    slug: hotel.slug, name: hotel.name, regionSource: hotel.regionSource,
    indexRegion: hotel.region, derivedRegion: null, matchedTerm: null,
    addressRegion: null, locationRegion: null, locationReview: null, kmRegion: null,
    identityVerified: false, identityStrength: null, identityNotes: [],
    agreeingSources: 0, candidateRegions: [], unresolvedReason: null,
    bucket: null, euroDelta: 0, priceEquivalent: false,
  };
  const place = details?.place;
  if (details?.notFound || !place || place.businessStatus === "CLOSED_PERMANENTLY") {
    return { ...base, bucket: "gone", identityReason: place ? "status" : "missing" };
  }
  const identity = identityCheck([hotel.name, ...(hotel.aliases ?? [])], place);
  if (identity.reason) return { ...base, bucket: "identity", identityReason: identity.reason };

  const match = matchAddressRegionTerm(place.addressComponents);
  const located = resolvePricingRegion(place.location);
  return {
    ...base,
    matchedTerm: match?.term ?? null,
    addressRegion: match && isConclusiveTerm(match, routeCatalog) ? match.region : null,
    locationRegion: located.review ? null : located.region,
    locationReview: located.review ? (located.reason ?? null) : null,
    identityVerified: true,
    identityStrength: identity.strength,
    identityNotes: identity.notes,
  };
}

/**
 * Turns stored evidence into a verdict. Pure and network-free, so the script
 * re-runs it over the whole checkpoint after every fetch loop, once the km
 * ranges those rows imply are finally computable.
 */
export function classifyFromEvidence(row, routeCatalog, options = {}) {
  if (row.bucket) return row;  // gone and identity failures are already final

  const kmRegion = kmRegionFor(Number(options.km), options.kmRanges ?? {});
  const sources = [row.addressRegion, row.locationRegion, kmRegion].filter(Boolean);
  const candidates = [...new Set(sources)];
  const agreed = agreedRegion(sources, row.indexRegion, routeCatalog);
  const proposed = agreed?.region ?? (candidates.length ? dearest(candidates, routeCatalog) : null);

  const priceEquivalent = Boolean(proposed) && proposed !== row.indexRegion
    && samePrices(proposed, row.indexRegion, routeCatalog);
  const agrees = proposed === row.indexRegion || priceEquivalent;

  // Checked before the unresolved branch: a loose name match in another region
  // may be a sibling property (Orange County Alanya vs Kemer), and that is
  // residue however few sources spoke. Moving it would be the wrong call.
  if (proposed && !agrees && row.identityStrength === "loose") {
    return {
      ...row, kmRegion, derivedRegion: proposed, agreeingSources: agreed?.count ?? 1,
      bucket: "identity", identityReason: "loose-name-region-conflict",
      euroDelta: euroDelta(row.indexRegion, proposed, routeCatalog),
    };
  }

  if (!agreed) {
    return {
      ...row, kmRegion, derivedRegion: proposed, candidateRegions: candidates,
      agreeingSources: candidates.length ? 1 : 0, bucket: "unresolved",
      unresolvedReason: sources.length === 0 ? "no-evidence"
        : candidates.length === 1 ? "single-source" : "conflict",
      euroDelta: proposed ? euroDelta(row.indexRegion, proposed, routeCatalog) : 0,
    };
  }

  return {
    ...row, kmRegion, derivedRegion: agreed.region, agreeingSources: agreed.count,
    bucket: agrees ? "ok" : "fix",
    euroDelta: agrees ? 0 : euroDelta(row.indexRegion, agreed.region, routeCatalog),
    priceEquivalent,
  };
}

/** Convenience for tests and one-shot use: extract, then judge. */
export const classifyAuditRow = (hotel, details, routeCatalog, options = {}) =>
  classifyFromEvidence(extractEvidence(hotel, details, routeCatalog), routeCatalog, options);
```

- [ ] **Step 4: Rewrite the six existing tests whose outcome this changes**

These call `classifyAuditRow` with three arguments, and the shared `place()`
fixture (`scripts/lib/hotel-region-audit.test.js:11-18`) has **no `location`** —
so `resolvePricingRegion(undefined)` abstains and each row now has one source.
Decide each deliberately; do not paper over them by adding fields:

| Line | Was | Do |
|---|---|---|
| `:26` Belazur regression | `fix` | Add `location` to the fixture so two sources agree; keep asserting `fix` — this is the motivating case |
| `:35` ok, regions agree | `ok` | Add `location`; keep asserting `ok` |
| `:41` price-equivalent manavgat→side | `ok` | **Invert.** `manavgat` is now inconclusive, so this asserts the opposite: `addressRegion` is null and the row cannot confirm on it |
| `:57` aliases accepted | `fix` | Add `location`; keep asserting `fix` |
| `:62` loose name ok | `ok` | Add `location`; keep asserting `ok` |
| `:67` loose-name-region-conflict | `identity` | Unchanged outcome — the loose branch now runs before `unresolved`. Verify it still passes |

- [ ] **Step 5: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/hotel-region-audit.mjs scripts/lib/hotel-region-audit.test.js
git commit -m "Confirm a hotel's region only when two sources agree"
```

---

### Task 6: Show the new evidence in the report

**Files:**
- Modify: `scripts/lib/hotel-region-audit.mjs:100`
- Test: `scripts/lib/hotel-region-audit.test.js`

- [ ] **Step 1: Write the failing test**

```js
test("the table shows why a row was not confirmed", () => {
  const report = buildAuditReport([{
    slug: "x", bucket: "unresolved", euroDelta: 20, indexRegion: "side",
    derivedRegion: "kizilagac", matchedTerm: "manavgat", regionSource: "district",
    addressRegion: null, locationRegion: null, kmRegion: "kizilagac",
    agreeingSources: 1, unresolvedReason: "single-source",
  }], { generatedAt: "2026-09-11T00:00:00.000Z", indexed: 1 });
  const row = renderAuditTable(report).split("\n").find((line) => line.startsWith("| x |"));
  expect(row).toContain("single-source");
  expect(row).toContain("kizilagac");
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: FAIL — those columns are not rendered.

- [ ] **Step 3: Make it pass**

```js
const COLUMNS = ["slug", "bucket", "euroDelta", "indexRegion", "derivedRegion", "matchedTerm",
  "addressRegion", "locationRegion", "kmRegion", "agreeingSources", "unresolvedReason",
  "regionSource", "identityStrength", "identityReason", "identityNotes"];
```

`identityNotes` is an array and renders through `Array.prototype.toString` as
`status,type`. That is fine inside a pipe table; do not add a join.

- [ ] **Step 4: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/hotel-region-audit.mjs scripts/lib/hotel-region-audit.test.js
git commit -m "Report which evidence sources spoke for each hotel"
```

---

### Task 7: Wire the script, and re-judge every row after the loop

The reclassification pass is not optional. On the first run after Tasks 1–6 the
rules hash has changed, so `scripts/audit-hotel-regions.mjs:69-71` empties
`checkpoint.completed` — meaning km ranges are empty while the loop runs, and
every row would be judged without source 3. Re-judging after the loop, when all
evidence exists, is what makes the km source work at all.

**Files:**
- Modify: `scripts/audit-hotel-regions.mjs:99`, `:126-128`, after the fetch loop

- [ ] **Step 1: Request the coordinate**

At `:99`:

```js
      "X-Goog-FieldMask": "id,displayName,formattedAddress,addressComponents,businessStatus,primaryType,location",
```

- [ ] **Step 2: Store evidence, not a verdict, inside the loop**

At `:126-128`, replace the `classifyAuditRow` call:

```js
    checkpoint.completed[hotel.slug] = {
      ...extractEvidence(hotel, details, routeCatalog), inputHash: inputHashes[hotel.slug],
    };
```

Update the import from `./lib/hotel-region-audit.mjs` to bring in
`extractEvidence`, `classifyFromEvidence` and `kmRangesFromCompleted`, and drop
`classifyAuditRow` if it is no longer used.

- [ ] **Step 3: Re-judge everything after the loop**

Immediately after the `for (const hotel of pending)` loop closes and **before**
`reconcileAuditFlags` is called at `:141`:

```js
// Every row is judged again here, not in the loop: a region's km range is not
// known until all evidence exists, and a rules change empties the checkpoint so
// the loop always starts with none. Costs no API calls and is idempotent.
const kmRanges = kmRangesFromCompleted(checkpoint.completed, hotelDistances);
for (const [slug, row] of Object.entries(checkpoint.completed)) {
  checkpoint.completed[slug] = classifyFromEvidence(row, routeCatalog, {
    kmRanges, km: Number(hotelDistances[slug]?.km),
  });
}
await atomicJson(checkpointPath, checkpoint);
```

- [ ] **Step 4: Verify the persistence guard still holds**

```bash
set -a; . ./.env; set +a
node scripts/audit-hotel-regions.mjs --slug kirman-belazur-resort-spa
```

Expected: one Places call, a printed row carrying `locationRegion`, and **no
throw** from the raw-data guard at `:58`. A throw means a coordinate reached the
row — fix that before continuing.

Note that a `--slug` run now re-judges the whole checkpoint, which is correct:
adding a row can widen a range, and every row should reflect the same ranges.

- [ ] **Step 5: Commit**

```bash
git add scripts/audit-hotel-regions.mjs
git commit -m "Judge every stored row again once the km ranges are known"
```

---

### Task 8: Pin the three known cases as fixtures

Required by the spec so the regression that started this work stays caught.

**Files:**
- Modify: `scripts/lib/hotel-region-audit.test.js`

- [ ] **Step 1: Write the failing test**

```js
describe("the three rows that motivated this work", () => {
  const sideRanges = { side: { min: 54, max: 72 }, kizilagac: { min: 80, max: 88 } };
  const kemerRanges = { kemer: { min: 43, max: 71 }, tekirova: { min: 75, max: 78 } };

  test("Orange County Belek: named Belek, addressed Boğazkent, confirmed there", () => {
    const hotel = { slug: "orange-county-resort-hotel-belek", name: "Orange County Resort Hotel Belek",
      region: "bogazkent", regionSource: "district", aliases: ["Orange County Belek"] };
    const details = { place: place({
      displayName: { text: "Orange County Resort Hotel Belek" },
      addressComponents: components("Boğazkent", "Serik", "Antalya"),
      location: { latitude: 36.85, longitude: 31.18 },
    }) };
    const row = classifyAuditRow(hotel, details, routeCatalog,
      { kmRanges: { bogazkent: { min: 41, max: 44 } }, km: 43 });
    expect(row.bucket).toBe("ok");
    expect(row.derivedRegion).toBe("bogazkent");
  });

  test("Caner Mountain: Kemer ilçe address cannot confirm it, km says Tekirova", () => {
    const hotel = { slug: "caner-mountain-hotel", name: "Caner Mountain Hotel",
      region: "kemer", regionSource: "district", aliases: [] };
    const details = { place: place({
      displayName: { text: "Caner Mountain Hotel" },
      addressComponents: components("Kemer", "Antalya"),
      location: { latitude: 36.50, longitude: 30.55 },
    }) };
    const row = classifyAuditRow(hotel, details, routeCatalog, { kmRanges: kemerRanges, km: 74 });
    expect(row.addressRegion).toBe(null);
    expect(row.bucket).not.toBe("ok");
    expect(row.derivedRegion).toBe("tekirova");
  });

  test("La Benata: Manavgat ilçe address cannot confirm Side, km says Kızılağaç", () => {
    const hotel = { slug: "la-benata-hotel", name: "LA BENATA HOTEL",
      region: "side", regionSource: "discovery", aliases: [] };
    const details = { place: place({
      displayName: { text: "LA BENATA HOTEL" },
      addressComponents: components("Manavgat", "Antalya"),
      location: { latitude: 36.78, longitude: 31.60 },
    }) };
    const row = classifyAuditRow(hotel, details, routeCatalog, { kmRanges: sideRanges, km: 90 });
    expect(row.addressRegion).toBe(null);
    expect(row.bucket).not.toBe("ok");
    expect(row.derivedRegion).toBe("kizilagac");
  });
});
```

- [ ] **Step 2: Run it and watch it fail, then adjust the fixtures**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`

The coordinates above are approximations. If a case fails on `locationRegion`,
check what `resolvePricingRegion` returns for that coordinate and move the
fixture — **do not loosen the assertion**. These fixtures are synthetic; they do
not have to be the hotels' real coordinates, only coordinates in the right band.

- [ ] **Step 3: Commit**

```bash
git add scripts/lib/hotel-region-audit.test.js
git commit -m "Pin the three hotels that motivated the evidence change"
```

---

### Task 9: Guard the rule, run the audit, act on what it finds

The guard test and the run belong together: the guard fails for every row until
the audit rewrites the checkpoint, so committing it alone would leave an
open-ended red that only a paid run and human research can clear.

The run is a **full re-fetch of all 1246 hotels** — `auditRulesHash` hashes whole
files, so every `inputHash` changed. Budget for it. The checkpoint resumes, so an
interrupted run costs nothing extra.

**Files:**
- Modify: `src/hotel-region-audit.test.js`, `src/hotel-index.js`, `scripts/hotel-discovery-pilot/region-price-matches.json`

- [ ] **Step 1: Add the guard test**

Beside the existing `checked`/hash test:

```js
test("every ok row rests on two agreeing sources naming its index region", () => {
  const violations = [];
  for (const [slug, row] of Object.entries(checkpoint.completed)) {
    if (row?.bucket !== "ok") continue;
    const agrees = row.derivedRegion === row.indexRegion || row.priceEquivalent === true;
    if (!(row.agreeingSources >= 2) || !agrees) {
      violations.push(`${slug}: sources=${row.agreeingSources} derived=${row.derivedRegion} index=${row.indexRegion}`);
    }
  }
  expect(violations).toEqual([]);
});
```

- [ ] **Step 2: Run the full audit**

```bash
set -a; . ./.env; set +a
node scripts/audit-hotel-regions.mjs
```

Expected: ~1246 calls, exit 0. On a nonzero exit, run it again with no arguments
to resume — do not pass `--redo`.

- [ ] **Step 3: Read the report**

`scripts/hotel-region-audit/report.md`, ordered by € at risk.

- [ ] **Step 4: Correct each `fix` row by its population**

Follow `.claude/skills/hotel-region-audit/SKILL.md`. Two are expected:

- `caner-mountain-hotel` — `regionSource: district`. Move the tuple at
  `src/hotel-index.js:403` from the Kemer block into the Tekirova block, with a
  one-line comment saying why the seed was wrong.
- `la-benata-hotel` — `regionSource: discovery`. **Do not edit
  `src/hotel-index-discovered.js`; hand edits there are regenerated away.** Set
  `pricingRegion`, `pricingName`, `prices` and `originalPrices` in
  `scripts/hotel-discovery-pilot/region-price-matches.json`, then
  `npm run generate:hotel-index-discovered`.

Re-verify each through the same path, never by hand-editing `checked`:

```bash
node scripts/audit-hotel-regions.mjs --slug caner-mountain-hotel
```

- [ ] **Step 5: Research `throne-nilbahir-resort-spa`**

93 km, priced `side`. Confirm its real location on the web and correct it as a
discovery row. If the evidence splits across a price boundary, file it under the
dearer region per `src/hotel-index.js:38`.

- [ ] **Step 6: Rebuild and run the full suite**

```bash
node scripts/audit-hotel-regions.mjs   # 0 calls; re-judges and rebuilds the reports
npm test
```

Expected: green, including both guards. Any remaining non-`ok` row needs either a
correction or an `UNAUDITED_HOTEL_SLUGS` entry with a one-line reason and
`— 2026-09`. Prefer correcting.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Re-verify every hotel region against three sources of evidence"
```

- [ ] **Step 8: Report the outcome**

State the real bucket counts, every hotel that moved with its € delta, and how
the allowlist changed. The spec's predictions were estimates; this run's numbers
replace them. If many rows landed `unresolved` on `single-source`, say so plainly
— that would mean the coordinate or km sources are contributing less than the
spec assumed, and it is a result worth surfacing, not smoothing over.

---

### Task 10: Update the operator instructions

**Files:**
- Modify: `.claude/skills/hotel-region-audit/SKILL.md`

- [ ] **Step 1: Rewrite the `unresolved` residue entry**

It currently describes one situation — an address naming a belde outside
`ADDRESS_REGION_TERMS`, fixed by adding a term. That is now only
`unresolvedReason: no-evidence`. Document all three:

- `no-evidence` — research the hotel; adding an address term may still be right
- `single-source` — one source spoke; `derivedRegion` holds the dearest candidate
  and is what to write
- `conflict` — sources disagree; check the Place ID before trusting either

- [ ] **Step 2: Drop `type` and `status` from the `identity` entry**

`identityReason` is now `name`, `missing`, or `loose-name-region-conflict`; type
and status travel in `identityNotes` and block nothing.

- [ ] **Step 3: Point the Spec line at both specs**

The evidence model now lives in
`docs/superpowers/specs/2026-09-11-hotel-address-verification-design.md`.

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/hotel-region-audit/SKILL.md
git commit -m "Document the three-source evidence model for operators"
```

---

## Done when

- `npm test` passes, including both guards, over a rebuilt checkpoint
- Every `ok` row records `agreeingSources >= 2`
- Every hotel that moved is reported with its € delta
- `UNAUDITED_HOTEL_SLUGS` holds only entries with a reason and a date
