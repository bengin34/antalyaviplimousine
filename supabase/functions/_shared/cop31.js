// COP31 (UN Climate Change Conference, Antalya, 9–20 November 2026) summit
// chauffeur package: a daily vehicle + chauffeur hire at a fixed day rate with
// fuel included and no hour or kilometre limit. The site's quote and
// create-booking both read these, so the guest is charged what they were shown.

/** Day rate per vehicle, keyed by the bookings table's `vehicle_type`. */
export const COP31_DAILY_RATE_EUR = Object.freeze({ vito: 200, vclass: 250 })

/** The summit Sprinter seats 16, more than the 12 the regular transfer form allows. */
export const COP31_SPRINTER_MAX_GUESTS = 16

// The summit runs 9–20 November; delegates land and leave a couple of days
// either side, so those days take the package too.
export const COP31_FIRST_DAY = '2026-11-07'
export const COP31_LAST_DAY = '2026-11-22'

/** True when the whole hire, `YYYY-MM-DD` to `YYYY-MM-DD`, falls in the package window. */
export function isCop31Period(start, end) {
  const date = /^\d{4}-\d{2}-\d{2}$/
  return date.test(start) && date.test(end) && start <= end && start >= COP31_FIRST_DAY && end <= COP31_LAST_DAY
}
