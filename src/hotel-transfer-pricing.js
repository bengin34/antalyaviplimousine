/**
 * Airport-transfer pricing from a hotel's own one-way airport distance.
 *
 * A transfer's cost tracks the driving distance, but transfers are quoted per
 * region, so a distant hotel in a cheap region can be sold below cost. This maps
 * the hotel's own km to a banded unit price, then floors it by the price the
 * guest would pay today so no quote is ever lowered.
 *
 * The band table itself lives with the edge function, because a hotel-to-hotel
 * fare is floored by the same table on the server. Resolving a hotel name to a
 * distance stays here: it needs the hotel index, which the browser has.
 */
import { hotelDistanceKm } from "./hotel-distance-lookup.js";
import { hotelDistances } from "./hotel-distances.js";
import { bandUnitPrice } from "../supabase/functions/_shared/transfer-band-pricing.js";

export { VITO_BANDS, bandUnitPrice } from "../supabase/functions/_shared/transfer-band-pricing.js";

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
