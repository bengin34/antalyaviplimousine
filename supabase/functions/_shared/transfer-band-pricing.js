/**
 * The distance band a transfer's unit price may not fall below.
 *
 * A transfer's cost tracks the driving distance while the fare is quoted per
 * region, so a journey that is long for the fare it carries can be sold below
 * cost. This maps km to a banded unit price that clears cost; callers floor
 * their own fare by it and never lower a quote.
 *
 * Target unit price = 2× one-way cost = 0.60 × km + 10, rounded up to €5.
 * See docs/superpowers/specs/2026-09-02-hotel-distance-band-pricing-design.md.
 *
 * Plain JS with no imports so Deno (the create-booking edge function) and
 * Node/Vite (the site, the tests) load the same file: the browser quotes the
 * fare and the server charges it, so one copy of the floor, not two.
 */

export const roundUp5 = (value) => Math.ceil(value / 5) * 5;
const targetUnitPrice = (km) => roundUp5(0.6 * km + 10);
const sprinterPrice = (vitoPrice) => roundUp5(vitoPrice * SPRINTER_MULTIPLIER);

/**
 * The least a journey of `km` may be sold for, to the kilometre rather than to
 * a band edge, and the same for either vehicle.
 *
 * A hotel's own distance is a geocoded estimate, so it is banded; a journey
 * assembled from catalogue distances is as exact as the catalogue and is
 * floored directly off the formula. The floor carries no Sprinter uplift
 * because the cost it protects — 15 TRY a kilometre, out and back — is the
 * same whichever van drives it. What the Sprinter is worth over the Vito is
 * the tariff's business, not the floor's.
 */
export function costFloorUnitPrice(km) {
  if (!Number.isFinite(km) || km <= 0) return null;
  return targetUnitPrice(km);
}

// [maxKm, vitoPrice]. Prices are roundUp5(0.60 × maxKm + 10). A hotel beyond the
// last edge is priced from the same formula directly (no upper cap needed).
export const VITO_BANDS = Object.freeze(
  [20, 30, 40, 50, 60, 70, 85, 100, 115, 130, 150, 175, 210, 260]
    .map((maxKm) => Object.freeze([maxKm, targetUnitPrice(maxKm)])),
);

// Roughly the Vito:Sprinter ratio, held across the whole table. The flat +€3
// uplift on both vehicles nudged the headline pair to €38:€63 ≈ 1.66, so 1.7
// now sits a little above it — which only lifts the floor, never lowers it.
// Cost is per-km and vehicle-agnostic, so a Sprinter band always exceeds its
// Vito band and therefore clears true cost too.
const SPRINTER_MULTIPLIER = 1.7;

export function bandUnitPrice(km, vehicle) {
  if (!Number.isFinite(km) || km <= 0) return null;
  const band = VITO_BANDS.find(([maxKm]) => km <= maxKm);
  const vito = band ? band[1] : targetUnitPrice(km);
  return vehicle === "sprinter" ? sprinterPrice(vito) : vito;
}
