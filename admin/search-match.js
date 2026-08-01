// Pure predicate for the admin timeline search box. Matches a booking against a
// free-text query by name, phone, booking reference, or route. Extracted from
// timeline.js so it can be unit-tested without a DOM.
export function matchesBookingQuery(booking, query) {
  const raw = String(query ?? '').trim()
  if (!raw) return true

  // Turkish-aware lowercase for name and location fields (handles İ/I/i/ı).
  const qTR = raw.toLocaleLowerCase('tr-TR')
  const lowerTR = (v) => String(v ?? '').toLocaleLowerCase('tr-TR')
  if (lowerTR(booking.customer_name).includes(qTR)) return true
  if (lowerTR(booking.pickup_location).includes(qTR)) return true
  if (lowerTR(booking.dropoff_location).includes(qTR)) return true

  // Booking ref is ASCII (VIP-YYYY-NNNN); use plain toLowerCase so 'vip' matches
  // 'VIP' regardless of Turkish dotted-i rules.
  const qLow = raw.toLowerCase()
  if (String(booking.booking_ref ?? '').toLowerCase().includes(qLow)) return true

  // Phone: compare digits only, so +90 / 0 / bare formats all match.
  const qDigits = raw.replace(/\D/g, '')
  if (qDigits) {
    const phoneDigits = String(booking.customer_phone ?? '').replace(/\D/g, '')
    if (phoneDigits.includes(qDigits)) return true
  }

  return false
}
