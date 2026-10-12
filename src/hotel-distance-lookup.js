/**
 * One-way driving km from Antalya Airport (AYT) to the hotel a booking names.
 *
 * `hotel_name` is free text the customer typed, so it is resolved with the same
 * matcher the booking form uses (`resolveHotelRegion`) — alias- and
 * Turkish-fold-aware, and deliberately null unless the whole name is reproduced.
 * A name that matches nothing, or a matched hotel whose distance is not known
 * yet, returns null so the caller falls back to the region graph.
 */
import { resolveHotelRegion } from "./hotel-search.js";
import { routeCatalog } from "./routes.js";

/**
 * How far an unverified per-hotel distance may sit from its region's own
 * distance before it is treated as a bad geocode rather than a remote hotel.
 *
 * A percentage alone is the wrong shape. On the 185 km Kaş route it allows
 * 74 km of slack, which is most of a different region; on the 15 km Antalya
 * route it allows 6 km, which rejects the whole of Konyaaltı and Kundu for
 * being ordinary. So the tolerance is the wider of a proportion and a flat
 * band, and the flat band is what governs the short city routes.
 */
export const DISTANCE_OUTLIER_PCT = 40;
export const DISTANCE_OUTLIER_FLOOR_KM = 25;

export const distanceToleranceKm = (regionKm) =>
  Math.max((regionKm * DISTANCE_OUTLIER_PCT) / 100, DISTANCE_OUTLIER_FLOOR_KM);

/**
 * Whether a generated distance is close enough to its region to be costed on.
 *
 * Almost every row in `hotel-distances.js` is machine-geocoded and carries
 * `checked: false`: a hotel name was handed to Places Text Search and whatever
 * came back first was routed to. That is right far more often than not, but it
 * is wrong loudly when it is wrong — one Avsallar hotel geocoded to 15 km while
 * its neighbours sit at ~100 km, one Kemer hotel to 77 km. Either would
 * silently mis-cost every leg to that hotel by tens of euros, in whichever
 * direction, and nothing downstream would notice.
 *
 * An unverified distance is therefore only believed while it agrees with the
 * region the hotel is sold under. Outside that the row is treated as unknown
 * and the caller falls back to the region distance — the behaviour before
 * per-hotel distances existed, so the guard can only move the estimate back to
 * where it already was, never somewhere new. A row confirmed by hand
 * (`checked: true`) is always believed: that is the point of checking one, and
 * a genuinely remote hotel is recorded by verifying its row rather than by
 * loosening this.
 */
export function isPlausibleHotelDistance(km, regionKm) {
  if (!Number.isFinite(regionKm) || regionKm <= 0) return true;
  return Math.abs(km - regionKm) <= distanceToleranceKm(regionKm);
}

/**
 * The distance the profit model will cost an already-identified hotel on.
 *
 * Split out from `hotelDistanceKm` so a caller that already holds the indexed
 * hotel — the review tests, anything auditing the whole index — asks the trust
 * question directly instead of paying for a fuzzy name search per row.
 *
 * @param {{ slug: string, region: string }} hotel - a row from `hotelIndex`
 * @param {Record<string, { km: number | null, checked?: boolean }>} distances
 * @returns {number | null} one-way km, or null if unknown or not trusted
 */
export function trustedDistanceKm(hotel, distances) {
  const entry = distances[hotel.slug];
  const km = entry ? Number(entry.km) : NaN;
  if (!Number.isFinite(km) || km <= 0) return null;
  if (entry.checked) return km;
  return isPlausibleHotelDistance(km, routeCatalog[hotel.region]?.distanceKm) ? km : null;
}

/**
 * @param {string} hotelName - booking.hotel_name
 * @param {Record<string, { km: number | null, checked?: boolean }>} distances - hotelDistances map
 * @returns {number | null} one-way km, or null if unresolved or not trusted
 */
export function hotelDistanceKm(hotelName, distances) {
  const hotel = resolveHotelRegion(hotelName);
  if (!hotel) return null;
  return trustedDistanceKm(hotel, distances);
}
