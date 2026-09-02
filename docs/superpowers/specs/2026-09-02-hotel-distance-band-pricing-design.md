# Hotel Distance-Band Pricing — Design

**Date:** 2026-09-02
**Status:** Approved (design), pending implementation plan

## Problem

Airport-transfer prices are quoted per *region*: when a guest picks a hotel, the
booking form resolves the hotel's region and charges that region's flat fare
(`routeCatalog[region].prices[vehicle]`). But hotels inside one region are spread
over tens of kilometres. The per-hotel airport distances seeded for all 871
indexed hotels (`src/hotel-distances.js`) show that the flat regional fare
undercuts our own cost for **395 hotels**, and produces an outright loss on ~30
of them (e.g. Caner Mountain Hotel, 74 km, priced €35 against a €49 cost).

We want a quote a guest sees at hotel selection that is guaranteed never to be
sold below a healthy margin, without hand-maintaining 871 individual prices and
without dropping any price below what the region charges today.

## Cost model recap (existing)

`admin/profit-loss-metrics.js` already costs each transfer leg from the hotel's
own airport distance:

- Vehicle km per leg = `oneWayKm × 2` (car drives there and back).
- Vehicle cost = `vehicleKm × km_cost_try ÷ eur_try_rate`. Defaults:
  `km_cost_try = 15`, `eur_try_rate = 50` → **€0.30 / passenger-km each way**,
  i.e. **€0.60 / km round-trip**.
- Airport meet fee = **€5** on legs that start at the airport.

So the **true cost of one sold transfer leg** ≈ `0.60 × km + 5` (EUR).

## Pricing rule

**Target unit price = 2 × one-way cost = `0.60 × km + 10`**, rounded up to the
nearest €5, then floored by the price the guest would pay today.

This is the "2× one-way" margin target the owner chose: it assumes the vehicle
is not driven empty on the return (a return-day passenger shares the leg), so
`0.30 × km + 5` is treated as the effective one-way cost and doubled. Against the
conservative round-trip cost it yields a positive margin on every hotel —
guaranteed ≥ €5 per leg at the band edges (~12 % worst case), higher mid-band;
against the empty-return assumption it approaches 100 %. **This trade was chosen
deliberately for competitiveness — a strict 2× of the full round-trip cost pushed
Kemer to €115 and Alanya to €190.**

### Non-negotiable floor

The final unit price MUST never fall below the price the guest would be quoted
today. "Today's price" is the *effective* current unit price — the admin live
override from Supabase if one exists, otherwise `routeCatalog[region].prices`.
The floor uses that effective value, so an admin override is respected too.

```
finalUnit = max( bandPrice(km, vehicle), currentEffectiveUnitPrice )
```

### Vito band table

Bands are global (region-independent). Each band's price is
`roundUp5(0.60 × maxKm + 10)`:

| km ≤ | 20 | 30 | 40 | 50 | 60 | 70 | 85 | 100 | 115 | 130 | 150 | 175 | 210 | 260 |
|------|----|----|----|----|----|----|----|-----|-----|-----|-----|-----|-----|-----|
| Vito € | 25 | 30 | 35 | 40 | 50 | 55 | 65 | 70 | 80 | 90 | 100 | 115 | 140 | 170 |

A hotel beyond 260 km falls through to `roundUp5(0.60 × km + 10)` computed
directly (no upper cap needed for the current index; Kaş at 208 km is the
farthest).

### Sprinter

`sprinterUnit = roundUp5(vitoBandPrice × 1.7)`, then floored the same way against
today's Sprinter price. 1.7 preserves the existing Vito:Sprinter ratio
(€35:€60 ≈ 1.71).

## Impact (simulated against the current index)

- **792 hotels unchanged** (band ≤ current region price → floor wins).
- **79 hotels repriced up** — every current loss-maker and low-margin hotel.
- **0 hotels remain below true cost.**
- Largest jumps: Caner Mountain €35→€65, Utopia World €70→€100,
  Sunprime C-Lounge €75→€100.

## Architecture

The public React app (`public-app/`) is the only customer surface that resolves
a hotel to a price. The legacy static homepage (`src/main.js`) has **no** hotel
search — it selects a region directly — so it needs no change. The admin panel
already costs per-hotel and is unaffected.

### New module — `src/hotel-transfer-pricing.js`

Pure, dependency-light, no DOM/network. Testable in isolation.

- `VITO_BANDS` — the band edge table above (exported for tests).
- `bandUnitPrice(km, vehicle)` — km → band price for `'vito' | 'sprinter'`,
  Sprinter derived as `roundUp5(vitoBand × 1.7)`. Returns `null` for a
  non-finite/negative km.
- `hotelUnitPrice(hotelName, vehicle, currentUnitPrice)` — looks up the hotel's
  km via `hotelDistanceKm` (existing `src/hotel-distance-lookup.js` +
  `src/hotel-distances.js`), computes the band price, returns
  `max(band, currentUnitPrice)`. `hotelDistanceKm` returns `null` in **two**
  cases — the name matched nothing, *or* it matched a hotel with no seeded
  distance. In either case, and for any non-finite band, the function returns
  `currentUnitPrice` unchanged — never a lower quote.

**Dependencies:** `hotelDistanceKm`, `hotelDistances`. No route/region data — the
caller passes the current unit price so the module stays agnostic about where the
floor comes from (static catalogue or admin override). Because the cost model is
per-km and vehicle-agnostic (same `oneWayKm × 2` for Vito and Sprinter), the
Sprinter band — `roundUp5(vito × 1.7)` — is always `> vito ≥ true cost`, so it
clears cost automatically.

### Integration — `public-app/app/lib/booking.ts` `quoteFor()`

`quoteFor` currently computes `unitPrice = liveUnitPrice ?? route.prices[vehicle]`.
Change: after resolving that effective unit price, run it through
`hotelUnitPrice(hotelName, vehicle, effectiveUnitPrice)`, then multiply:

```
finalUnit = hotelUnitPrice(hotelName, vehicle, effectiveUnitPrice)
price     = journeys × finalUnit          // journeys = 2 for round-trip
```

The floor is applied to the **per-leg unit price**, then multiplied by
`journeys` — never floor the round-trip total.

**Both transfer directions get the band.** `pricedRouteSlug` (booking.ts:132)
resolves a region in two cases, and both are airport↔hotel transfers priced on
the hotel:
- `destination === "airport"` → region from `hotelRegion` (hotel→airport).
- `destination === <region>` → airport→hotel arrival (the more common case).

The band applies whenever `pricedRouteSlug` resolved a region *and* `hotelName`
resolves to a known distance — mirroring `hotelDistanceForLeg` in
profit-loss-metrics.js:497, which accepts the hotel on either endpoint. Applying
it to only one direction would leave arrivals at the flat region price.

**Type change:** `quoteFor`'s parameter is a narrowed
`Pick<PublicBookingValues, ...>` (booking.ts:138) that does **not** currently
include `hotelName`. Widen the `Pick` to add `"hotelName"`. (`hotelName` already
exists on `PublicBookingValues` and `BookingForm` already tracks the matched
hotel.)

`originalPrice` (the struck-through "was" price) stays region-based so the
discount framing is unaffected; only the live price is raised.

## Error handling / edge cases

- **Unmatched hotel** (typed string matches no index entry): `hotelDistanceKm`
  returns `null`, no band applied, region price stands.
- **Matched hotel with no seeded distance**: `hotelDistanceKm` also returns
  `null` — same safe fallback to region price.
- **Admin live override below band**: band wins (raises), still ≥ override floor
  because floor = `max(band, override)`.
- **Admin live override above band**: override wins — never lowered.
- **Round-trip**: `journeys × finalUnit`, floor applied per-leg before multiply.
- **Daily chauffeur**: untouched (priced by day, not by route).
- **km beyond table**: direct formula, no cap.

## Testing

New `src/hotel-transfer-pricing.test.js`:

1. **Band boundaries** — km at each edge maps to the documented Vito price;
   km just over an edge steps to the next band.
2. **Sprinter derivation** — `= roundUp5(vito × 1.7)` at sample bands.
3. **Floor** — when band < current unit price, current wins; when band >
   current, band wins.
4. **Unmatched hotel** — returns current unit price unchanged.
5. **Matched hotel, no seeded distance** — `hotelDistanceKm` → `null`, returns
   current unit price unchanged.
6. **Whole-index guard** — for every indexed hotel, final Vito & Sprinter price
   ≥ true cost `0.60 × km + 5` (0 loss-makers) **and** ≥ current region price
   (never undercuts today).
7. **Margin invariant** — every band price ≥ `0.60 × maxKm + 5`, locking the
   ≥ €5 worst-case margin against future band-table edits.

Extend `public-app` booking tests (or `booking.ts` unit tests if present):

8. `quoteFor` airport→hotel (`destination = <region>`) with a matched far hotel
   returns the band price × journeys.
9. `quoteFor` hotel→airport (`destination = "airport"`, `hotelRegion` set) with
   the same hotel returns the same band price — proves both directions get it.
10. `quoteFor` with an unmatched hotel returns the region price (regression guard).

## Out of scope

- Re-seeding or correcting hotel distances (separate, already-owned workstream).
- Changing the admin cost model or profit-loss dashboard.
- Per-hotel manual price overrides (bands + region floor are sufficient).
- The strict full-round-trip 100 % margin variant (rejected for competitiveness).
