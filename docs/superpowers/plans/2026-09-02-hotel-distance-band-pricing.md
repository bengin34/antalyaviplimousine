# Hotel Distance-Band Pricing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Guarantee every hotel airport-transfer quote covers our cost with margin, by pricing on the hotel's own airport distance (bands) with the current region price as a floor that is never undercut.

**Architecture:** A new pure module `src/hotel-transfer-pricing.js` maps a hotel's one-way km to a banded unit price and floors it by the price the guest sees today. `quoteFor()` in `public-app/app/lib/booking.ts` runs the effective region unit price through it for any airport↔hotel transfer, in both directions. No change to the legacy static homepage (region-only, no hotel search) or the admin cost model.

**Tech Stack:** Node ESM, Vitest, TypeScript (public-app). Spec: `docs/superpowers/specs/2026-09-02-hotel-distance-band-pricing-design.md`.

---

## File Structure

- **Create** `src/hotel-transfer-pricing.js` — band table + `bandUnitPrice(km, vehicle)` (pure) + `hotelUnitPrice(hotelName, vehicle, currentUnitPrice, distances?)` (floor + lookup). One responsibility: turn a hotel + current price into a floored banded price.
- **Create** `src/hotel-transfer-pricing.test.js` — unit tests for both functions + whole-index loss-maker/floor guard.
- **Modify** `public-app/app/lib/booking.ts` — widen `quoteFor`'s `Pick` to include `hotelName`; route the unit price through `hotelUnitPrice`.
- **Modify** `public-app/app/lib/booking.test.ts` — both-direction band tests + unmatched-hotel regression.

The band-price math lives in `src/` (not `public-app/`) because `hotelDistances`, `hotelDistanceKm`, and `hotelIndex` already live there and the admin cost model reads from the same place. `booking.ts` imports it the same way it already imports `routeCatalog` from `../../../src/routes.js`.

---

## Task 1: Band price core (`bandUnitPrice`)

**Files:**
- Create: `src/hotel-transfer-pricing.js`
- Test: `src/hotel-transfer-pricing.test.js`

Band table (each price = `roundUp5(0.60 × maxKm + 10)`; see spec):

| km ≤ | 20 | 30 | 40 | 50 | 60 | 70 | 85 | 100 | 115 | 130 | 150 | 175 | 210 | 260 |
|------|----|----|----|----|----|----|----|-----|-----|-----|-----|-----|-----|-----|
| Vito € | 25 | 30 | 35 | 40 | 50 | 55 | 65 | 70 | 80 | 90 | 100 | 115 | 140 | 170 |

- [ ] **Step 1: Write the failing test**

```js
// src/hotel-transfer-pricing.test.js
import { describe, test, expect } from "vitest";
import { bandUnitPrice, VITO_BANDS } from "./hotel-transfer-pricing.js";

describe("bandUnitPrice", () => {
  test("maps each band edge to its documented Vito price", () => {
    const expected = [[20, 25], [30, 30], [40, 35], [50, 40], [60, 50], [70, 55],
      [85, 65], [100, 70], [115, 80], [130, 90], [150, 100], [175, 115], [210, 140], [260, 170]];
    for (const [km, price] of expected) {
      expect(bandUnitPrice(km, "vito")).toBe(price);
    }
  });

  test("steps up to the next band just past an edge", () => {
    expect(bandUnitPrice(21, "vito")).toBe(30); // was 25 at ≤20
    expect(bandUnitPrice(61, "vito")).toBe(55); // was 50 at ≤60
  });

  test("prices beyond the last edge from the direct formula", () => {
    // 300 km: roundUp5(0.6*300 + 10) = roundUp5(190) = 190
    expect(bandUnitPrice(300, "vito")).toBe(190);
  });

  test("derives Sprinter as roundUp5(vito * 1.7)", () => {
    expect(bandUnitPrice(74, "sprinter")).toBe(115); // vito 65 -> 110.5 -> 115
    expect(bandUnitPrice(20, "sprinter")).toBe(45);  // vito 25 -> 42.5 -> 45
    expect(bandUnitPrice(146, "sprinter")).toBe(170); // vito 100 -> 170
  });

  test("every band price keeps at least the €5 worst-case margin over true cost", () => {
    for (const [maxKm, vitoPrice] of VITO_BANDS) {
      expect(vitoPrice).toBeGreaterThanOrEqual(0.6 * maxKm + 5);
    }
  });

  test("returns null for a non-finite or negative km", () => {
    expect(bandUnitPrice(NaN, "vito")).toBeNull();
    expect(bandUnitPrice(-5, "vito")).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/hotel-transfer-pricing.test.js`
Expected: FAIL — "Failed to resolve import ./hotel-transfer-pricing.js" / bandUnitPrice not defined.

- [ ] **Step 3: Write minimal implementation**

```js
// src/hotel-transfer-pricing.js

/**
 * Airport-transfer pricing from a hotel's own one-way airport distance.
 *
 * A transfer's cost tracks the driving distance, but transfers are quoted per
 * region, so a distant hotel in a cheap region can be sold below cost. This maps
 * the hotel's own km to a banded unit price, then floors it by the price the
 * guest would pay today so no quote is ever lowered.
 *
 * Target unit price = 2× one-way cost = 0.60 × km + 10, rounded up to €5.
 * See docs/superpowers/specs/2026-09-02-hotel-distance-band-pricing-design.md.
 */
import { hotelDistanceKm } from "./hotel-distance-lookup.js";
import { hotelDistances } from "./hotel-distances.js";

const roundUp5 = (value) => Math.ceil(value / 5) * 5;
const targetUnitPrice = (km) => roundUp5(0.6 * km + 10);

// [maxKm, vitoPrice]. Prices are roundUp5(0.60 × maxKm + 10). A hotel beyond the
// last edge is priced from the same formula directly (no upper cap needed).
export const VITO_BANDS = Object.freeze(
  [20, 30, 40, 50, 60, 70, 85, 100, 115, 130, 150, 175, 210, 260]
    .map((maxKm) => Object.freeze([maxKm, targetUnitPrice(maxKm)])),
);

// The Vito:Sprinter ratio (€35:€60 ≈ 1.71) preserved across the table. Cost is
// per-km and vehicle-agnostic, so a Sprinter band always exceeds its Vito band
// and therefore clears true cost too.
const SPRINTER_MULTIPLIER = 1.7;

export function bandUnitPrice(km, vehicle) {
  if (!Number.isFinite(km) || km <= 0) return null;
  const band = VITO_BANDS.find(([maxKm]) => km <= maxKm);
  const vito = band ? band[1] : targetUnitPrice(km);
  return vehicle === "sprinter" ? roundUp5(vito * SPRINTER_MULTIPLIER) : vito;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/hotel-transfer-pricing.test.js`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/hotel-transfer-pricing.js src/hotel-transfer-pricing.test.js
git commit -m "feat: distance-band unit price for hotel transfers"
```

---

## Task 2: Floored per-hotel price (`hotelUnitPrice`) + whole-index guard

**Files:**
- Modify: `src/hotel-transfer-pricing.js`
- Test: `src/hotel-transfer-pricing.test.js`

- [ ] **Step 1: Write the failing tests**

Append to `src/hotel-transfer-pricing.test.js`:

```js
import { hotelUnitPrice } from "./hotel-transfer-pricing.js";
import { hotelIndex } from "./hotel-index.js";
import { hotelDistances } from "./hotel-distances.js";
import { hotelDistanceKm } from "./hotel-distance-lookup.js";
import { routeCatalog } from "./routes.js";

// Fixture keeps floor/fallback tests independent of the generated data file.
const fixtureDistances = {
  "caner-mountain-hotel": { km: 74 },
  "voyage-sorgun": { km: 70 },
  "no-km-hotel": { km: null },
};

describe("hotelUnitPrice", () => {
  test("raises to the band price when the band beats today's price", () => {
    // Caner Mountain 74 km -> Vito band 65, region price 35 -> 65
    expect(hotelUnitPrice("Caner Mountain Hotel", "vito", 35, fixtureDistances)).toBe(65);
  });

  test("keeps today's price when it already beats the band", () => {
    // Voyage Sorgun 70 km -> Vito band 55, region price 50 -> 55 (band wins here);
    // but if today's price were 60 (e.g. admin override), the floor wins.
    expect(hotelUnitPrice("Voyage Sorgun", "vito", 60, fixtureDistances)).toBe(60);
  });

  test("returns today's price for a hotel that matches nothing", () => {
    expect(hotelUnitPrice("no such place at all", "vito", 50, fixtureDistances)).toBe(50);
  });

  test("returns today's price for a matched hotel with no seeded distance", () => {
    expect(hotelUnitPrice("no km hotel", "vito", 50, { "no-km-hotel": { km: null } })).toBe(50);
  });

  test("never quotes below true cost for any indexed hotel (Vito and Sprinter)", () => {
    for (const hotel of hotelIndex) {
      const km = hotelDistanceKm(hotel.name, hotelDistances);
      if (km == null) continue;
      const region = routeCatalog[hotel.region];
      if (!region) continue;
      const trueCost = 0.6 * km + 5;
      const vito = hotelUnitPrice(hotel.name, "vito", region.prices.vito, hotelDistances);
      const sprinter = hotelUnitPrice(hotel.name, "sprinter", region.prices.sprinter, hotelDistances);
      expect(vito).toBeGreaterThanOrEqual(trueCost);
      expect(sprinter).toBeGreaterThanOrEqual(trueCost);
      // and never below today's region price
      expect(vito).toBeGreaterThanOrEqual(region.prices.vito);
      expect(sprinter).toBeGreaterThanOrEqual(region.prices.sprinter);
    }
  });
});
```

Note: `"no km hotel"` must resolve via the form matcher to slug `no-km-hotel`. If the matcher does not resolve that free-text string, use a real indexed hotel whose seeded distance is null instead (find one with: `hotelIndex.find(h => hotelDistanceKm(h.name, hotelDistances) == null)`), and assert it returns the passed price.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/hotel-transfer-pricing.test.js`
Expected: FAIL — `hotelUnitPrice is not a function` / not exported.

- [ ] **Step 3: Write minimal implementation**

Append to `src/hotel-transfer-pricing.js`:

```js
/**
 * Banded unit price for a hotel, floored by the price the guest sees today.
 *
 * `currentUnitPrice` is the effective price the caller would otherwise quote —
 * the admin live override if any, else the static region price. The result is
 * never below it, so no quote is lowered. A hotel that matches nothing, or a
 * matched hotel with no seeded distance, yields `currentUnitPrice` unchanged.
 */
export function hotelUnitPrice(hotelName, vehicle, currentUnitPrice, distances = hotelDistances) {
  const km = hotelDistanceKm(hotelName, distances);
  const band = bandUnitPrice(km, vehicle);
  return band == null ? currentUnitPrice : Math.max(band, currentUnitPrice);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/hotel-transfer-pricing.test.js`
Expected: PASS (all tests, including the 871-hotel guard).

- [ ] **Step 5: Commit**

```bash
git add src/hotel-transfer-pricing.js src/hotel-transfer-pricing.test.js
git commit -m "feat: floor hotel band price by today's region price"
```

---

## Task 3: Wire into `quoteFor`

**Files:**
- Modify: `public-app/app/lib/booking.ts` (import; widen `Pick`; apply in `quoteFor`)
- Test: `public-app/app/lib/booking.test.ts`

- [ ] **Step 1: Write the failing tests**

Append to `public-app/app/lib/booking.test.ts` (inside or after the `airport-bound journeys` describe). Use `Caner Mountain Hotel` (antalya, 74 km, Vito band €65 vs region €35):

```js
describe("per-hotel band pricing", () => {
  test("airport→hotel arrival is priced on the hotel's band, not the flat region", () => {
    // destination = "antalya" (arrival), hotel resolves to 74 km -> Vito €65
    const arriving = { ...base, destination: "antalya", hotelName: "Caner Mountain Hotel", vehicle: "vito" as const };
    expect(quoteFor(arriving).price).toBe(65);
  });

  test("hotel→airport is priced on the same band (both directions)", () => {
    // destination = "airport", hotelRegion supplies the region; same hotel -> €65
    const leaving = { ...base, destination: "airport", hotelRegion: "antalya", hotelName: "Caner Mountain Hotel", vehicle: "vito" as const };
    expect(quoteFor(leaving).price).toBe(65);
  });

  test("round trip doubles the floored unit price, not the region price", () => {
    const roundTrip = { ...base, destination: "antalya", hotelName: "Caner Mountain Hotel", vehicle: "vito" as const, tripType: "round_trip" as const };
    expect(quoteFor(roundTrip).price).toBe(130); // 65 × 2
  });

  test("an unmatched hotel keeps the flat region price", () => {
    // "Test Hotel" (base.hotelName) matches no index entry -> region price stands
    expect(quoteFor({ ...base, destination: "side" }).price).toBe(50);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run public-app/app/lib/booking.test.ts`
Expected: FAIL — arrival/leaving return the flat region price (35 / 0), not 65.

- [ ] **Step 3: Implement the integration**

In `public-app/app/lib/booking.ts`:

3a. Add the import near the existing `routeCatalog` import:

```ts
import { hotelUnitPrice } from "../../../src/hotel-transfer-pricing.js";
```

3b. Widen the `Pick` in `quoteFor`'s signature to include `"hotelName"`:

```ts
export function quoteFor(
  values: Pick<PublicBookingValues, "destination" | "hotelRegion" | "hotelName" | "vehicle" | "tripType" | "travelDate" | "serviceEndDate">,
  overrides?: LivePriceOverrides,
) {
```

3c. Route the unit price through `hotelUnitPrice`. Replace:

```ts
  const liveUnitPrice = overrides?.routePrices?.[`${slug}:${values.vehicle}`];
  const unitPrice = liveUnitPrice ?? route.prices[values.vehicle];
  return {
    price: unitPrice * journeys,
    originalPrice: route.originalPrices[values.vehicle] * journeys,
  };
```

with:

```ts
  const liveUnitPrice = overrides?.routePrices?.[`${slug}:${values.vehicle}`];
  const effectiveUnitPrice = liveUnitPrice ?? route.prices[values.vehicle];
  // Floor the region price by the hotel's own distance band. Applies to both
  // directions: `slug` is resolved whether the guest arrives at (destination =
  // region) or leaves (destination = "airport", hotelRegion set) the hotel.
  const unitPrice = hotelUnitPrice(values.hotelName, values.vehicle, effectiveUnitPrice);
  return {
    price: unitPrice * journeys,
    originalPrice: route.originalPrices[values.vehicle] * journeys,
  };
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run public-app/app/lib/booking.test.ts`
Expected: PASS — new tests green, and all pre-existing `quoteFor` tests still pass (the `base` hotel "Test Hotel" is unmatched, so region prices are unchanged).

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck`
Expected: no errors (the widened `Pick` accepts `hotelName`, which `BookingForm` already supplies).

- [ ] **Step 6: Commit**

```bash
git add public-app/app/lib/booking.ts public-app/app/lib/booking.test.ts
git commit -m "feat: price airport transfers on the hotel's distance band"
```

---

## Task 4: Full verification

- [ ] **Step 1: Run the whole test suite**

Run: `npm test`
Expected: all pass, including `scripts/verify-prices.mjs`-driven checks and the new files.

- [ ] **Step 2: Sanity-check impact against the spec's numbers**

Run:

```bash
node -e "
Promise.all([import('./src/hotel-index.js'), import('./src/hotel-distances.js'), import('./src/hotel-distance-lookup.js'), import('./src/routes.js'), import('./src/hotel-transfer-pricing.js')]).then(([hi, hd, hdl, r, p]) => {
  let same=0, up=0, loss=0;
  for (const h of hi.hotelIndex) {
    const km = hdl.hotelDistanceKm(h.name, hd.hotelDistances);
    const region = r.routeCatalog[h.region];
    if (km == null || !region) continue;
    const vito = p.hotelUnitPrice(h.name, 'vito', region.prices.vito, hd.hotelDistances);
    if (vito > region.prices.vito) up++; else same++;
    if (vito < 0.6*km + 5) loss++;
  }
  console.log('unchanged:', same, '| raised:', up, '| loss-makers:', loss);
});
"
```

Expected: `unchanged: 792 | raised: 79 | loss-makers: 0` (small drift acceptable if the distance data changed since the spec; **loss-makers must be 0**).

- [ ] **Step 3: Commit any incidental fixes** (only if Step 1/2 surfaced something).

---

## Notes for the implementer

- **Do not** touch `src/main.js` — the static homepage has no hotel search; it selects a region directly and is out of scope.
- **Do not** change `originalPrice` — the struck-through "was" price stays region-based on purpose.
- The `distances` default param on `hotelUnitPrice` exists so `quoteFor` calls it without threading the data map through; tests inject a fixture instead.
- If the whole-index guard test finds a loss-maker, that means the band table no longer covers a real distance — do not weaken the assertion; fix the band table and its spec.
