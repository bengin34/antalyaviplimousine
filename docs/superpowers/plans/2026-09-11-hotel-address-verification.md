# Hotel Address Verification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop confirming a hotel's pricing region on a single piece of evidence, so a hotel whose address text cannot decide its price is caught instead of silently quoted on the cheap side.

**Architecture:** The audit gains two evidence sources beside the address term it already uses — a coordinate, resolved by the `resolvePricingRegion` function that already exists, and the AYT driving km already stored per hotel. A row is confirmed only when two sources agree on the hotel's index region. The classifier stays pure; the script keeps writing exactly one field (`checked`) and never edits the index.

**Tech Stack:** Node ESM (`.mjs` for scripts, `.js` for app source), Vitest, Google Places Details v1.

---

## Read before starting

- Spec: `docs/superpowers/specs/2026-09-11-hotel-address-verification-design.md`
- Prior spec, still in force for everything except the evidence model:
  `docs/superpowers/specs/2026-09-10-hotel-region-audit-design.md`
- Operator workflow: `.claude/skills/hotel-region-audit/SKILL.md`

## Two traps specific to this codebase

**1. New logic must live in one of two existing files.** `auditRulesHash`
(`scripts/lib/hotel-audit-state.mjs:4`) hashes the full bytes of exactly
`scripts/lib/hotel-region-audit.mjs` and `scripts/lib/hotel-region-matching.mjs`.
That hash is what invalidates stale `checked` flags. **Logic placed in a new file
would not be hashed**, so changing it later would leave every `checked: true`
silently valid. Put pure classification in `hotel-region-audit.mjs` and
address/coordinate matching in `hotel-region-matching.mjs`. Do not create a new
`scripts/lib/*.mjs` for this work.

**2. Nothing from Places may reach disk except derived values.**
`scripts/audit-hotel-regions.mjs:58` throws if the checkpoint JSON contains a
`"location"`, `"displayName"`, `"formattedAddress"`, `"addressComponents"` or
`"businessStatus"` key. Coordinates are read in memory and discarded;
`resolvePricingRegion` is already written to return a region and never the
coordinate. Never put a coordinate on a returned row.

## File structure

| File | Responsibility | Change |
|---|---|---|
| `scripts/lib/hotel-region-matching.mjs` | Address terms, coordinate bands, name matching | Export `ADDRESS_REGION_TERMS` and `placeIdentityKey`; return `ilce` from `matchAddressRegionTerm` |
| `scripts/lib/hotel-region-audit.mjs` | Pure classifier, term conclusiveness, km ranges, report | Most of the work |
| `scripts/audit-hotel-regions.mjs` | Network, checkpoint, file writes | Field mask, km ranges, pass km per hotel |
| `scripts/lib/hotel-region-matching.test.js` | Matching unit tests | New cases |
| `scripts/lib/hotel-region-audit.test.js` | Classifier unit tests | New cases |
| `src/hotel-region-audit.test.js` | Guard test over committed state | One new assertion |
| `.claude/skills/hotel-region-audit/SKILL.md` | Operator instructions | Residue and identity sections |

Run one file with `npx vitest run <path>`, everything with `npm test`.

---

### Task 1: Report the ilçe a term was gated on

`matchAddressRegionTerm` knows which ilçe gated the term it matched but throws
that away. Conclusiveness cannot be decided without it.

**Files:**
- Modify: `scripts/lib/hotel-region-matching.mjs:126` (add `export`), `:144-162`
- Test: `scripts/lib/hotel-region-matching.test.js`

- [ ] **Step 1: Write the failing test**

```js
import { ADDRESS_REGION_TERMS, matchAddressRegionTerm } from "./hotel-region-matching.mjs";

const parts = (...texts) => texts.map((longText) => ({ longText, shortText: longText }));

describe("matchAddressRegionTerm ilçe reporting", () => {
  test("reports the ilçe that gated the matched term", () => {
    expect(matchAddressRegionTerm(parts("Boğazkent", "Serik", "Antalya")))
      .toEqual({ region: "bogazkent", term: "bogazkent", ilce: "serik" });
  });

  test("reports no ilçe for a region that has no ilçe gate", () => {
    expect(matchAddressRegionTerm(parts("Lara", "Muratpaşa", "Antalya")))
      .toEqual({ region: "antalya", term: "lara", ilce: undefined });
  });

  test("exposes the term table so conclusiveness can be derived from it", () => {
    expect(ADDRESS_REGION_TERMS.some(([region]) => region === "kizilagac")).toBe(true);
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run scripts/lib/hotel-region-matching.test.js`
Expected: FAIL — `ADDRESS_REGION_TERMS` is not exported, and the returned object has no `ilce`.

- [ ] **Step 3: Make it pass**

In `scripts/lib/hotel-region-matching.mjs`, export the table:

```js
export const ADDRESS_REGION_TERMS = Object.freeze([
```

and return the ilçe from the match (around `:158`):

```js
      const term = terms.find((candidate) => matches(part, candidate));
      if (term) return { region, term, ilce };
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-matching.test.js scripts/lib/hotel-region-audit.test.js`
Expected: PASS. The audit tests still pass because they assert on `region` and `term` only.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/hotel-region-matching.mjs scripts/lib/hotel-region-matching.test.js
git commit -m "Report the ilçe that gated a matched address term"
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
    expect(isConclusiveTerm({ region: "side", term: "kumkoy", ilce: "manavgat" }, routeCatalog)).toBe(true);
  });

  test("an ilçe spanning two prices cannot: Manavgat holds Side and Kızılağaç", () => {
    expect(isConclusiveTerm({ region: "side", term: "manavgat", ilce: "manavgat" }, routeCatalog)).toBe(false);
  });

  test("an ilçe spanning two prices cannot: Kemer holds Kemer and Tekirova", () => {
    expect(isConclusiveTerm({ region: "kemer", term: "kemer", ilce: "kemer" }, routeCatalog)).toBe(false);
  });

  test("an ilçe holding one price region can, so Kaş and Kumluca keep their evidence", () => {
    expect(isConclusiveTerm({ region: "kas", term: "kas", ilce: "kas" }, routeCatalog)).toBe(true);
    expect(isConclusiveTerm({ region: "kumluca", term: "kumluca", ilce: "kumluca" }, routeCatalog)).toBe(true);
  });

  test("a region with no ilçe gate is conclusive", () => {
    expect(isConclusiveTerm({ region: "antalya", term: "lara", ilce: undefined }, routeCatalog)).toBe(true);
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: FAIL — `isConclusiveTerm is not a function`.

- [ ] **Step 3: Make it pass**

Extend the import at `scripts/lib/hotel-region-audit.mjs:7`:

```js
import {
  ADDRESS_REGION_TERMS, matchAddressRegionTerm, isOperationalHotelPlace,
  looseNameMatch, LODGING_PLACE_TYPES,
} from "./hotel-region-matching.mjs";
```

Add after `samePrices` (`:22`):

```js
/**
 * An address term decides a price only when it cannot stand for two regions
 * that cost different amounts. A belde term never can. An ilçe name can only
 * when every region inside that ilçe costs the same — true of Kaş and Kumluca,
 * false of Manavgat (Side €50, Kızılağaç €70) and Kemer (Kemer €55, Tekirova
 * €75), which is how 72 hotels came to be confirmed on the cheap side.
 */
export function isConclusiveTerm(match, routeCatalog) {
  if (!match?.ilce || match.term !== match.ilce) return true;
  const regions = ADDRESS_REGION_TERMS
    .filter(([, , ilce]) => ilce === match.ilce)
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
- Modify: `scripts/lib/hotel-region-matching.mjs` (export `placeIdentityKey`), `scripts/lib/hotel-region-audit.mjs:24-32`
- Test: `scripts/lib/hotel-region-audit.test.js`

- [ ] **Step 1: Write the failing test**

```js
describe("identity judged on the name", () => {
  const bogazkentBelazur = { ...belazur, region: "bogazkent" };

  test("an unusual place type no longer blocks verification", () => {
    const row = classifyAuditRow(bogazkentBelazur, { place: place({ primaryType: "restaurant" }) }, routeCatalog);
    expect(row.identityStrength).toBe("strict");
    expect(row.identityNotes).toEqual(["type"]);
    expect(row.bucket).not.toBe("identity");
  });

  test("a temporarily closed listing no longer blocks verification", () => {
    const row = classifyAuditRow(bogazkentBelazur, { place: place({ businessStatus: "CLOSED_TEMPORARILY" }) }, routeCatalog);
    expect(row.identityStrength).toBe("strict");
    expect(row.identityNotes).toEqual(["status"]);
  });

  test("a different business still fails on the name", () => {
    const row = classifyAuditRow(bogazkentBelazur, { place: place({ displayName: { text: "Bim Market" } }) }, routeCatalog);
    expect(row.bucket).toBe("identity");
    expect(row.identityReason).toBe("name");
  });

  test("permanently closed still reaches gone without consulting identity", () => {
    const row = classifyAuditRow(bogazkentBelazur, { place: place({ businessStatus: "CLOSED_PERMANENTLY" }) }, routeCatalog);
    expect(row.bucket).toBe("gone");
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: FAIL — the first two land in `identity` with reason `type` / `status`.

- [ ] **Step 3: Make it pass**

Export the key helper from `scripts/lib/hotel-region-matching.mjs` (a
module-local const around `:170`):

```js
export const placeIdentityKey = (value) => ministryNameKey(value)
```

Add it to the import list in `hotel-region-audit.mjs`, then replace
`identityCheck` (`:24-32`):

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

Carry `identityNotes` onto every row that has an identity: in each `return`
after the identity check (`:60`, `:68-72`, `:74-83`), add
`identityNotes: identity.notes,`.

Leave `isOperationalHotelPlace` untouched — `selectOperationalHotelPlace`
(`hotel-region-matching.mjs:257`) still needs its stricter question.

- [ ] **Step 4: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: PASS. Existing whole-row `toEqual` assertions need `identityNotes: []`
added — update them, do not weaken them to `toMatchObject`.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/hotel-region-matching.mjs scripts/lib/hotel-region-audit.mjs scripts/lib/hotel-region-audit.test.js
git commit -m "Judge hotel identity on the name, not on how Google files it"
```

---

### Task 4: Derive km ranges from the checkpoint

The range population is rows whose address term was conclusive and whose
coordinate, if it spoke, agreed. Computing it from the checkpoint rather than
from the current run is what keeps a `--slug` run from bucketing a hotel
differently than a full run on identical evidence.

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

Add to `scripts/lib/hotel-region-audit.mjs`:

```js
/**
 * Observed km span per region, over rows whose address term was conclusive and
 * whose coordinate did not contradict it. Derived from the checkpoint, not from
 * the rows one run happens to fetch, so `--slug` and `--max-calls` runs cannot
 * bucket a hotel differently from a full run on the same evidence.
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

### Task 5: Confirm a region only when two sources agree

The centre of the change. `classifyAuditRow` gains the coordinate and the km,
and stops confirming on the address alone.

**Files:**
- Modify: `scripts/lib/hotel-region-audit.mjs:39-84`
- Test: `scripts/lib/hotel-region-audit.test.js`

- [ ] **Step 1: Write the failing test**

Add the helper beside the existing fixtures:

```js
const withLocation = (overrides = {}) =>
  place({ location: { latitude: 36.85, longitude: 31.18 }, ...overrides });
const ranges = { bogazkent: { min: 41, max: 44 }, belek: { min: 26, max: 40 } };
const opts = (km) => ({ kmRanges: ranges, km });
const samePricesForTest = (a, b) => {
  const x = routeCatalog[a].prices, y = routeCatalog[b].prices;
  return x.vito === y.vito && x.sprinter === y.sprinter;
};
```

```js
describe("two agreeing sources", () => {
  test("address and coordinate agree on the index region: ok", () => {
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: withLocation() }, routeCatalog, opts(43));
    expect(row.bucket).toBe("ok");
    expect(row.agreeingSources).toBeGreaterThanOrEqual(2);
    expect(row.derivedRegion).toBe("bogazkent");
  });

  test("two sources agree on another region: fix, not ok", () => {
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

  test("an inconclusive term abstains, so it cannot confirm alone", () => {
    const manavgatOnly = place({ addressComponents: components("Manavgat", "Antalya") });
    const row = classifyAuditRow({ ...belazur, region: "side" }, { place: manavgatOnly }, routeCatalog, { kmRanges: {}, km: null });
    expect(row.addressRegion).toBe(null);
    expect(row.matchedTerm).toBe("manavgat");
    expect(row.bucket).not.toBe("ok");
  });

  test("a coordinate on a band edge abstains", () => {
    const onEdge = place({ location: { latitude: 36.85, longitude: 31.134 } });
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: onEdge }, routeCatalog, opts(43));
    expect(row.locationRegion).toBe(null);
    expect(row.locationReview).toBe("near-pricing-boundary");
  });

  test("side and manavgat are price-equivalent, so sources naming each agree", () => {
    expect(samePricesForTest("side", "manavgat")).toBe(true);
  });

  test("conflicting sources report the dearest candidate", () => {
    const kizilagac = place({ addressComponents: components("Kızılağaç", "Manavgat", "Antalya") });
    const row = classifyAuditRow({ ...belazur, region: "side" }, { place: kizilagac }, routeCatalog,
      { kmRanges: { alanya_bati: { min: 91, max: 118 } }, km: 100 });
    expect(row.bucket).toBe("unresolved");
    expect(row.unresolvedReason).toBe("conflict");
    expect(row.candidateRegions).toContain("kizilagac");
    expect(row.derivedRegion).toBe("kizilagac"); // dearer than alanya_bati on Sprinter
  });

  test("no evidence at all names no candidate", () => {
    const bare = place({ addressComponents: components("Türkiye") });
    const row = classifyAuditRow({ ...belazur, region: "side" }, { place: bare }, routeCatalog, { kmRanges: {}, km: null });
    expect(row.unresolvedReason).toBe("no-evidence");
    expect(row.derivedRegion).toBe(null);
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: FAIL — `classifyAuditRow` ignores a fourth argument and confirms on the address alone.

- [ ] **Step 3: Make it pass**

Import `resolvePricingRegion` in `hotel-region-audit.mjs`, then add above
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
 * regions count as the same answer: side and manavgat are both 50/85.
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

Change the signature to accept the new inputs:

```js
export function classifyAuditRow(hotel, details, routeCatalog, options = {}) {
```

Extend `base` so every row has one shape:

```js
    addressRegion: null, locationRegion: null, locationReview: null, kmRegion: null,
    agreeingSources: 0, candidateRegions: [], unresolvedReason: null, identityNotes: [],
```

Then replace the body from the address match onward (`:59-83`):

```js
  const match = matchAddressRegionTerm(place.addressComponents);
  const addressRegion = match && isConclusiveTerm(match, routeCatalog) ? match.region : null;

  // The coordinate is read here and never returned: the checkpoint may not
  // carry Places content, and resolvePricingRegion is built for that.
  const located = resolvePricingRegion(place.location);
  const locationRegion = located.review ? null : located.region;

  const kmRegion = kmRegionFor(Number(options.km), options.kmRanges ?? {});

  const evidence = {
    addressRegion,
    matchedTerm: match?.term ?? null,
    locationRegion,
    locationReview: located.review ? (located.reason ?? null) : null,
    kmRegion,
    identityVerified: true,
    identityStrength: identity.strength,
    identityNotes: identity.notes,
  };

  const sources = [addressRegion, locationRegion, kmRegion].filter(Boolean);
  const agreed = agreedRegion(sources, hotel.region, routeCatalog);

  if (!agreed) {
    const candidates = [...new Set(sources)];
    const proposed = candidates.length ? dearest(candidates, routeCatalog) : null;
    return {
      ...base, ...evidence,
      derivedRegion: proposed,
      candidateRegions: candidates,
      agreeingSources: candidates.length ? 1 : 0,
      bucket: "unresolved",
      unresolvedReason: sources.length === 0 ? "no-evidence"
        : candidates.length === 1 ? "single-source" : "conflict",
      euroDelta: proposed ? euroDelta(hotel.region, proposed, routeCatalog) : 0,
    };
  }

  const priceEquivalent = agreed.region !== hotel.region
    && samePrices(agreed.region, hotel.region, routeCatalog);
  const agrees = agreed.region === hotel.region || priceEquivalent;

  // A loose name match is only trusted when the address or the coordinate
  // corroborates the index: a similar name in a different region may be a
  // sibling property (Orange County Alanya vs Kemer).
  if (!agrees && identity.strength === "loose") {
    return {
      ...base, ...evidence,
      derivedRegion: agreed.region, agreeingSources: agreed.count,
      bucket: "identity", identityReason: "loose-name-region-conflict",
      euroDelta: euroDelta(hotel.region, agreed.region, routeCatalog),
    };
  }

  return {
    ...base, ...evidence,
    derivedRegion: agreed.region,
    agreeingSources: agreed.count,
    bucket: agrees ? "ok" : "fix",
    euroDelta: agrees ? 0 : euroDelta(hotel.region, agreed.region, routeCatalog),
    priceEquivalent,
  };
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: PASS. Older whole-row `toEqual` assertions need the new fields; update them.

- [ ] **Step 5: Commit**

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
test("the table shows which sources spoke", () => {
  const report = buildAuditReport([{
    slug: "x", bucket: "unresolved", euroDelta: 20, indexRegion: "side",
    derivedRegion: "kizilagac", matchedTerm: "manavgat", regionSource: "district",
    addressRegion: null, locationRegion: null, kmRegion: "kizilagac",
    agreeingSources: 1, unresolvedReason: "single-source",
  }], { generatedAt: "2026-09-11T00:00:00.000Z", indexed: 1 });
  const table = renderAuditTable(report);
  expect(table).toContain("agreeingSources");
  expect(table).toContain("single-source");
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: FAIL — the columns are not rendered.

- [ ] **Step 3: Make it pass**

```js
const COLUMNS = ["slug", "bucket", "euroDelta", "indexRegion", "derivedRegion", "matchedTerm",
  "addressRegion", "locationRegion", "kmRegion", "agreeingSources", "unresolvedReason",
  "regionSource", "identityStrength", "identityReason", "identityNotes"];
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run scripts/lib/hotel-region-audit.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/hotel-region-audit.mjs scripts/lib/hotel-region-audit.test.js
git commit -m "Report which evidence sources spoke for each hotel"
```

---

### Task 7: Wire the audit script

No unit test drives this task — it is network and file plumbing. Step 4 and the
full run in Task 9 verify it.

**Files:**
- Modify: `scripts/audit-hotel-regions.mjs:99`, before `:116`, `:124-126`

- [ ] **Step 1: Request the coordinate**

At `:99`:

```js
      "X-Goog-FieldMask": "id,displayName,formattedAddress,addressComponents,businessStatus,primaryType,location",
```

- [ ] **Step 2: Compute the ranges once, before the loop**

Immediately before `const pending = ...` (`:116`):

```js
// Ranges come from the whole checkpoint, not from this run's targets, so a
// --slug or --max-calls run buckets a hotel exactly as a full run would.
const kmRanges = kmRangesFromCompleted(checkpoint.completed, hotelDistances);
```

Add `kmRangesFromCompleted` to the import from `./lib/hotel-region-audit.mjs`.

- [ ] **Step 3: Pass the evidence into the classifier**

At `:124-126`:

```js
    checkpoint.completed[hotel.slug] = {
      ...classifyAuditRow(hotel, details, routeCatalog, {
        kmRanges, km: Number(hotelDistances[hotel.slug]?.km),
      }),
      inputHash: inputHashes[hotel.slug],
    };
```

- [ ] **Step 4: Verify the persistence guard still holds**

```bash
set -a; . ./.env; set +a
node scripts/audit-hotel-regions.mjs --slug kirman-belazur-resort-spa
```

Expected: one Places call, a printed row carrying `locationRegion`, and **no
throw** from the raw-data guard. A throw means a coordinate leaked onto the
returned row — fix that before continuing.

- [ ] **Step 5: Commit**

```bash
git add scripts/audit-hotel-regions.mjs
git commit -m "Feed the coordinate and driving km into the region classifier"
```

---

### Task 8: Guard the two-source rule in CI

**Files:**
- Modify: `src/hotel-region-audit.test.js`

- [ ] **Step 1: Write the failing test**

Add beside the existing `checked`/hash test:

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

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run src/hotel-region-audit.test.js`
Expected: FAIL for every row — the committed checkpoint predates this work and
has no `agreeingSources`. **This is the expected state until Task 9 rewrites the
checkpoint.** Do not weaken the test to make it pass.

- [ ] **Step 3: Commit the test, red**

```bash
git add src/hotel-region-audit.test.js
git commit -m "Guard that every confirmed hotel rests on two agreeing sources"
```

---

### Task 9: Run the audit and act on what it finds

The first run is a **full paid re-fetch of all 1246 hotels**: `auditRulesHash`
hashes whole files, so every row's `inputHash` changed in Tasks 1–5. Budget for
it. The checkpoint resumes, so an interrupted run costs nothing extra.

**Files:**
- Modify: `src/hotel-index.js` (seed moves), `scripts/hotel-discovery-pilot/region-price-matches.json` (discovery moves), `src/hotel-region-audit.test.js` (allowlist)

- [ ] **Step 1: Run the full audit**

```bash
set -a; . ./.env; set +a
node scripts/audit-hotel-regions.mjs
```

Expected: ~1246 calls, exit 0. On a nonzero exit, run it again with no arguments
to resume — do not pass `--redo`.

- [ ] **Step 2: Read the report**

`scripts/hotel-region-audit/report.md`, ordered by € at risk.

- [ ] **Step 3: Correct each `fix` row by its population**

Follow `.claude/skills/hotel-region-audit/SKILL.md`. Two are expected:

- `caner-mountain-hotel` — `regionSource: district`. Move the tuple at
  `src/hotel-index.js:403` from the Kemer block into the Tekirova block with a
  one-line reason saying why the seed was wrong.
- `la-benata-hotel` — `regionSource: discovery`. **Do not edit
  `src/hotel-index-discovered.js`; hand edits there are regenerated away.** Set
  `pricingRegion`, `pricingName`, `prices` and `originalPrices` in
  `scripts/hotel-discovery-pilot/region-price-matches.json`, then
  `npm run generate:hotel-index-discovered`.

Re-verify each through the same path, never by hand-editing `checked`:

```bash
node scripts/audit-hotel-regions.mjs --slug caner-mountain-hotel
```

- [ ] **Step 4: Research `throne-nilbahir-resort-spa`**

93 km, priced `side`. Confirm its real location on the web and correct it as a
discovery row. If the evidence splits across a price boundary, file it under the
dearer region per `src/hotel-index.js:38`.

- [ ] **Step 5: Rebuild the reports and run the suite**

```bash
node scripts/audit-hotel-regions.mjs   # 0 calls, rebuilds from the checkpoint
npm test
```

Expected: the Task 8 guard passes. Any remaining non-`ok` row needs either a
correction or an `UNAUDITED_HOTEL_SLUGS` entry with a one-line reason and
`— 2026-09`. Prefer correcting.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Re-verify every hotel region against three sources of evidence"
```

- [ ] **Step 7: Report the outcome**

State the real bucket counts, every hotel that moved with its € delta, and how
the allowlist changed. The spec's predictions were estimates; this run's numbers
replace them.

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

`identityReason` is now only `name` or `missing`; type and status travel in
`identityNotes` and block nothing.

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

- `npm test` passes, including the Task 8 guard over a rebuilt checkpoint
- Every `ok` row records `agreeingSources >= 2`
- Every hotel that moved is reported with its € delta
- `UNAUDITED_HOTEL_SLUGS` holds only entries with a reason and a date
