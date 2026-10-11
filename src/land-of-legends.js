/**
 * The Land of Legends excursion transfer: hotel → The Land of Legends (Kadriye,
 * Belek) → hotel, with the driver waiting on site for the whole visit.
 *
 * It is one vehicle tied up for the day rather than two airport legs, so it is
 * priced on its own model instead of 2× the airport fare:
 *
 *   Vito price = €50 fixed (driver + waiting) + €0.70 × round-trip km,
 *                rounded to the nearest €5.
 *
 * The km is the one-way road distance from the pricing region to the park.
 * Antalya city (≈40 km) lands on €105, the anchor the operator set; every
 * other region follows from the same formula. Waiting does not scale with the
 * vehicle, so the Sprinter is a flat uplift on the Vito price rather than the
 * airport tariff's ×1.7.
 *
 * Regions the guest's hotel resolves to come from `hotel-index.js`. A region
 * missing here (Kaş, Fethiye and beyond) is not offered at a fixed price — the
 * booking still goes through and the operator quotes it by hand.
 *
 * Changing a figure here also needs a migration that rewrites
 * `land_of_legends_rates`; `npm run check:prices` fails until they agree.
 */

export const LAND_OF_LEGENDS_FIXED_EUR = 50;
export const LAND_OF_LEGENDS_EUR_PER_KM = 0.7;
export const LAND_OF_LEGENDS_SPRINTER_UPLIFT = 1.4;

// Time and notice rules live with the edge function so both sides share them.
export {
  LAND_OF_LEGENDS_CONFIRM_NOTICE_HOURS,
  LAND_OF_LEGENDS_LATEST_RETURN,
  LAND_OF_LEGENDS_MIN_NOTICE_HOURS,
  LAND_OF_LEGENDS_MIN_VISIT_HOURS,
  isValidLandOfLegendsVisit,
  landOfLegendsNotice,
  turkeyToday,
} from "../supabase/functions/_shared/land-of-legends-rules.js";

/**
 * One-way km from each pricing region to The Land of Legends. Where a region
 * spans a wide area (Antalya covers Lara to Konyaaltı) the far end is used —
 * the price is a fixed commitment, so an under-quote is the costlier mistake.
 */
export const landOfLegendsZoneKm = Object.freeze({
  belek: 10,
  bogazkent: 10,
  antalya: 40,
  side: 45,
  manavgat: 45,
  kizilagac: 60,
  kemer: 75,
  alanya_bati: 85,
  tekirova: 95,
  alanya_merkez: 115,
  kumluca: 125,
  alanya: 130,
  alanya_dogu: 130,
  kargicak: 135,
  demirtas: 155,
});

const roundTo5 = (value) => Math.round(value / 5) * 5;

/** Vito price for a one-way distance to the park. */
export function landOfLegendsVitoPrice(km) {
  return roundTo5(LAND_OF_LEGENDS_FIXED_EUR + LAND_OF_LEGENDS_EUR_PER_KM * 2 * km);
}

/**
 * Fixed price for the whole excursion, per vehicle, or null when the region
 * is quoted on request.
 * @param {string} region
 * @param {"vito" | "sprinter"} vehicle
 */
export function landOfLegendsPrice(region, vehicle) {
  const km = landOfLegendsZoneKm[/** @type {keyof typeof landOfLegendsZoneKm} */ (region)];
  if (!km) return null;
  const vito = landOfLegendsVitoPrice(km);
  return vehicle === "sprinter" ? roundTo5(vito * LAND_OF_LEGENDS_SPRINTER_UPLIFT) : vito;
}

/** Every fixed rate, `{ region: { vito, sprinter } }` — the seed for the DB table. */
export const landOfLegendsRates = Object.freeze(
  Object.fromEntries(
    Object.keys(landOfLegendsZoneKm).map((region) => [
      region,
      Object.freeze({
        vito: /** @type {number} */ (landOfLegendsPrice(region, "vito")),
        sprinter: /** @type {number} */ (landOfLegendsPrice(region, "sprinter")),
      }),
    ]),
  ),
);

/** Cheapest Vito fare, for "from €…" copy. */
export const landOfLegendsFromPrice = Math.min(
  ...Object.values(landOfLegendsRates).map((rate) => rate.vito),
);

/** Rough driving minutes from a region to the park (≈ 1 min/km plus town traffic). */
export function landOfLegendsDriveMinutes(region) {
  const km = landOfLegendsZoneKm[/** @type {keyof typeof landOfLegendsZoneKm} */ (region)];
  return km ? Math.round(km * 1.1 + 10) : null;
}

/** Where drivers navigate to; never prefixed with the guest's hotel. */
export const LAND_OF_LEGENDS_PARK_ADDRESS = "The Land of Legends, Kadriye, Serik, Antalya, Türkiye";

/**
 * Where the driver waits for the ride back. One place to change it: the
 * booking page, confirmation, guest WhatsApp and driver messages all read it.
 */
export const landOfLegendsMeetingPoint = Object.freeze({
  tr: "Ana giriş otoparkı",
  en: "Main entrance car park",
  de: "Parkplatz am Haupteingang",
  ru: "Парковка у главного входа",
});
