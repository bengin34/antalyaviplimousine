/**
 * One-way driving km from Antalya Airport (AYT) to the hotel a booking names.
 *
 * `hotel_name` is free text the customer typed, so it is resolved with the same
 * matcher the booking form uses (`resolveHotelRegion`) — alias- and
 * Turkish-fold-aware, and deliberately null unless the whole name is reproduced.
 * A name that matches nothing, or a matched hotel whose distance is not known
 * yet, returns null so the caller falls back to the region graph.
 *
 * @param {string} hotelName - booking.hotel_name
 * @param {Record<string, { km: number | null }>} distances - hotelDistances map
 * @returns {number | null} one-way km, or null if unresolved
 */
import { resolveHotelRegion } from "./hotel-search.js";

export function hotelDistanceKm(hotelName, distances) {
  const hotel = resolveHotelRegion(hotelName);
  if (!hotel) return null;
  const entry = distances[hotel.slug];
  const km = entry ? Number(entry.km) : NaN;
  return Number.isFinite(km) && km > 0 ? km : null;
}
