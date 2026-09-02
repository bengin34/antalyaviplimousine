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
