/**
 * Booking rules for The Land of Legends excursion that the browser and the
 * create-booking edge function must apply identically. Plain JS with no
 * imports so Deno (edge function) and Node/Vite (site, tests) load the same
 * file — one copy of each rule instead of two that drift apart.
 *
 * All times are Turkey local time. Turkey has stayed on UTC+3 all year since
 * 2016, so a fixed offset is exact and needs no time-zone database.
 */

export const TURKEY_UTC_OFFSET = "+03:00";

/** Latest pick-up at the park for the ride back; covers the evening show. */
export const LAND_OF_LEGENDS_LATEST_RETURN = "23:30";
/** A visit shorter than this is not worth the trip and is almost always a typo. */
export const LAND_OF_LEGENDS_MIN_VISIT_HOURS = 2;
/** Below this we cannot reliably send a driver, so the booking is refused. */
export const LAND_OF_LEGENDS_MIN_NOTICE_HOURS = 3;
/** Below this the booking is taken but the operator confirms it by hand. */
export const LAND_OF_LEGENDS_CONFIRM_NOTICE_HOURS = 12;

const toMinutes = (time) => {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(String(time ?? "").slice(0, 5));
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
};

/**
 * Whether a hotel departure and park pick-up form a valid same-day visit:
 * the return at least {@link LAND_OF_LEGENDS_MIN_VISIT_HOURS} after leaving,
 * and no later than {@link LAND_OF_LEGENDS_LATEST_RETURN}.
 */
export function isValidLandOfLegendsVisit(departureTime, returnTime) {
  const departure = toMinutes(departureTime);
  const back = toMinutes(returnTime);
  const latest = /** @type {number} */ (toMinutes(LAND_OF_LEGENDS_LATEST_RETURN));
  if (departure == null || back == null) return false;
  return back - departure >= LAND_OF_LEGENDS_MIN_VISIT_HOURS * 60 && back <= latest;
}

/** Today's date in Turkey, `YYYY-MM-DD`. */
export function turkeyToday(now = new Date()) {
  return new Date(now.getTime() + 3 * 3_600_000).toISOString().slice(0, 10);
}

/** Hours from `now` until a Turkey-local date + time; NaN when either is malformed. */
export function hoursUntilTurkeyTime(date, time, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date ?? "")) || toMinutes(time) == null) return Number.NaN;
  const at = Date.parse(`${date}T${String(time).slice(0, 5)}:00${TURKEY_UTC_OFFSET}`);
  return (at - now.getTime()) / 3_600_000;
}

/**
 * How much notice a hotel pick-up gives:
 * - `too_soon` — under {@link LAND_OF_LEGENDS_MIN_NOTICE_HOURS} (or in the past / malformed): refuse
 * - `short`    — under {@link LAND_OF_LEGENDS_CONFIRM_NOTICE_HOURS}: accept, operator confirms
 * - `ok`       — confirm automatically
 * @returns {"too_soon" | "short" | "ok"}
 */
export function landOfLegendsNotice(date, time, now = new Date()) {
  const hours = hoursUntilTurkeyTime(date, time, now);
  if (!Number.isFinite(hours) || hours < LAND_OF_LEGENDS_MIN_NOTICE_HOURS) return "too_soon";
  if (hours < LAND_OF_LEGENDS_CONFIRM_NOTICE_HOURS) return "short";
  return "ok";
}

/**
 * Turkish-aware slug for a hotel name. Must stay identical to `hotelSlug` in
 * src/hotel-index.js — the generated hotel-region table is keyed by it, and
 * src/land-of-legends-server.test.js checks the two agree on every hotel.
 */
export const hotelNameSlug = (name) =>
  String(name)
    .replace(/ı/g, "i").replace(/İ/g, "i").replace(/ğ/g, "g").replace(/Ğ/g, "g")
    .replace(/ş/g, "s").replace(/Ş/g, "s").replace(/ç/g, "c").replace(/Ç/g, "c")
    .replace(/ö/g, "o").replace(/Ö/g, "o").replace(/ü/g, "u").replace(/Ü/g, "u")
    .normalize("NFD").replace(/\p{M}+/gu, "")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * The pricing region for a hotel name, from a slug → region table, or null
 * when the name is not an indexed hotel (the booking is then quoted by hand).
 * @param {string} hotelName
 * @param {Readonly<Record<string, string>>} table
 */
export function resolveHotelRegion(hotelName, table) {
  const slug = hotelNameSlug(hotelName);
  return slug && Object.prototype.hasOwnProperty.call(table, slug) ? table[slug] : null;
}
