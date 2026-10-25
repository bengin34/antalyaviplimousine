import type { hotelIndex } from "../../../src/hotel-index.js";

/** A row of the static hotel index, as the combobox hands it to a form. */
export type IndexedHotel = (typeof hotelIndex)[number];

type HotelSearchModule = typeof import("../../../src/hotel-search.js");
type HotelPricingModule = typeof import("../../../src/hotel-transfer-pricing.js");

/** What a page needs the hotel index for: finding a hotel, and pricing it. */
export type HotelData = {
  searchHotels: HotelSearchModule["searchHotels"];
  hotelUnitPrice: HotelPricingModule["hotelUnitPrice"];
};

/**
 * The hotel index and its distance table, loaded when a guest names a hotel.
 *
 * Together these modules are ~190 KB raw: 1246 indexed hotels across
 * `hotel-index` and its two seed files, plus the per-hotel airport distances
 * the band pricing floors a quote by. Both are static data a visitor only
 * needs once they type in the hotel field, yet they used to sit in the booking
 * chunk that every landing page preloads — the single largest item on the home
 * page's critical path.
 *
 * Both halves load together because they arrive together anyway: resolving a
 * typed name to a hotel is what the search does, and the price is floored by
 * the distance of the hotel it resolved. Until they land, and for a visitor who
 * never touches the field, the form shows the region price — exactly what it
 * showed before per-hotel flooring existed — and the suggestion list stays
 * empty rather than claiming the hotel is unknown.
 */
let pending: Promise<HotelData> | null = null;
let loaded: HotelData | null = null;

/** Starts the fetch; safe to call any number of times. */
export function preloadHotelData() {
  pending ??= Promise.all([
    import("../../../src/hotel-search.js"),
    import("../../../src/hotel-transfer-pricing.js"),
  ]).then(([search, pricing]) => {
    loaded = { searchHotels: search.searchHotels, hotelUnitPrice: pricing.hotelUnitPrice };
    return loaded;
  });
  return pending;
}

/** The index once it is here, or null while it is still on its way. */
export const loadedHotelData = () => loaded;
