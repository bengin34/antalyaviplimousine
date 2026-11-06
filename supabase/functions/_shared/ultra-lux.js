// Ultra Lux Edition: three chauffeured vehicles hired by the day, fuel
// excluded. Keyed by the bookings table's `vehicle_type`. The site's quote and
// create-booking both read this, so the guest is charged what they were shown.
// shortcut: rates live in code, not in chauffeur_service_rates; move them there
// when the admin needs to edit them without a deploy.
export const ULTRA_LUX = Object.freeze({
  lux_lounge: Object.freeze({ name: 'Ultra Lux Lounge Sprinter', dailyRateEur: 600, maxGuests: 16 }),
  lux_sprinter: Object.freeze({ name: 'Ultra Lux Sprinter', dailyRateEur: 600, maxGuests: 16 }),
  maybach: Object.freeze({ name: 'Mercedes-Maybach S-Class', dailyRateEur: 1750, maxGuests: 3 }),
})

/** Display name per Ultra Lux `vehicle_type`, for admin labels and operator messages. */
export const ULTRA_LUX_NAMES = Object.freeze(Object.fromEntries(Object.entries(ULTRA_LUX).map(([type, vehicle]) => [type, vehicle.name])))

/** The Ultra Lux entry for a `vehicle_type`, or undefined for the VIP fleet. */
export const ultraLux = (vehicleType) => (Object.hasOwn(ULTRA_LUX, vehicleType) ? ULTRA_LUX[vehicleType] : undefined)
