import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { parsePhoneNumberFromString } from 'npm:libphonenumber-js@1.13.9/max'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const requiredFields = [
  'customer_name',
  'customer_email',
  'customer_phone',
  'pickup_location',
  'pickup_date',
  'guests',
  'vehicle_type',
  'payment_method',
]

const generateBookingRef = () => {
  const year = new Date().getUTCFullYear()
  const random = crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()
  return `AVL-${year}-${random}`
}

const normalizeWhitespace = (value: unknown) => String(value ?? '').trim().replace(/\s+/g, ' ')

const isValidName = (value: string) => {
  const letterCount = value.match(/\p{L}/gu)?.length || 0
  return value.length >= 2 && value.length <= 80 && letterCount >= 2 && !/\d/u.test(value)
}

const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, '')
  const hasValidGeneralFormat =
    digits.length >= 7 &&
    digits.length <= 15 &&
    /^[+]?[\d\s().-]+$/.test(value) &&
    !/(?!^)\+/.test(value)

  if (!hasValidGeneralFormat) return false

  const internationalNumber = value.replace(/^00/, '+')
  if (!internationalNumber.startsWith('+')) return false

  return Boolean(parsePhoneNumberFromString(internationalNumber)?.isValid())
}

const isValidFlightNumber = (value: unknown) => {
  const normalized = normalizeWhitespace(value)
  if (!normalized) return true
  const alphanumericCount = normalized.replace(/[^a-z0-9]/gi, '').length
  return (
    normalized.length >= 2 &&
    normalized.length <= 12 &&
    alphanumericCount >= 2 &&
    /^[a-z0-9][a-z0-9 -]{1,11}$/i.test(normalized)
  )
}

const isValidTime = (value: unknown) => /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value ?? ''))
const isValidDate = (value: unknown) => /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''))

const inclusiveDayCount = (start: string, end: string) => {
  const startAt = Date.parse(`${start}T00:00:00Z`)
  const endAt = Date.parse(`${end}T00:00:00Z`)
  if (!Number.isFinite(startAt) || !Number.isFinite(endAt)) return 0
  return Math.floor((endAt - startAt) / 86_400_000) + 1
}

const isValidHotelName = (value: string) => {
  const letterCount = value.match(/\p{L}/gu)?.length || 0
  return value.length >= 2 && value.length <= 120 && letterCount >= 2
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  try {
    const payload = await req.json()
    const tripType = String(payload.trip_type || 'one_way')
    const isRoundTrip = tripType === 'round_trip'
    const isDailyChauffeur = tripType === 'daily_chauffeur'
    const requiredForTrip = isDailyChauffeur
      ? [...requiredFields, 'pickup_time', 'service_end_date', 'fuel_terms_accepted']
      : [...requiredFields, 'dropoff_location']
    const missingField = requiredForTrip.find((field) => {
      const value = payload[field]
      return value === undefined || value === null || value === '' || (field === 'fuel_terms_accepted' && value !== true)
    })

    if (missingField) {
      return jsonResponse({ error: `${missingField} is required` }, 400)
    }

    const pickupAddress = normalizeWhitespace(payload.pickup_address)
    if (payload.pickup_location === 'private_address' && (pickupAddress.length < 6 || pickupAddress.length > 160)) {
      return jsonResponse({ error: 'pickup_address must be between 6 and 160 characters' }, 400)
    }
    const dropoffAddress = isDailyChauffeur ? '' : normalizeWhitespace(payload.dropoff_address)
    if (!isDailyChauffeur && payload.dropoff_location === 'private_address' && (dropoffAddress.length < 6 || dropoffAddress.length > 160)) {
      return jsonResponse({ error: 'dropoff_address must be between 6 and 160 characters' }, 400)
    }

    const pickupLocation = String(payload.pickup_location)
    const dropoffLocation = isDailyChauffeur ? null : String(payload.dropoff_location)
    if (
      pickupLocation === 'private_address' &&
      dropoffLocation === 'private_address' &&
      pickupAddress.toLocaleLowerCase() === dropoffAddress.toLocaleLowerCase()
    ) {
      return jsonResponse({ error: 'pickup and drop-off addresses must be different' }, 400)
    }

    const customerEmail = String(payload.customer_email).trim().toLowerCase()
    const customerName = normalizeWhitespace(payload.customer_name)
    const customerPhone = normalizeWhitespace(payload.customer_phone)
    const rawHotelName = normalizeWhitespace(payload.hotel_name)
    const requiresHotelName = isDailyChauffeur || pickupLocation === 'hotel' || dropoffLocation !== 'private_address'
    const hotelName = rawHotelName || 'Not specified'
    const notes = normalizeWhitespace(payload.notes)
    const isAirportReturn =
      dropoffLocation === 'airport' &&
      ['hotel', 'private_address'].includes(pickupLocation)
    const isPrivateDestination = dropoffLocation === 'private_address'
    const requiresManualPricing = !isDailyChauffeur && (isAirportReturn || isPrivateDestination)
    const pickupDate = String(payload.pickup_date)
    const pickupTime = String(payload.pickup_time || '')
    const returnDate = isRoundTrip ? String(payload.return_date || '') : ''
    const returnPickupTime = isRoundTrip ? String(payload.return_pickup_time || '') : ''
    const returnFlightNumber = isRoundTrip
      ? normalizeWhitespace(payload.return_flight_number).toUpperCase()
      : ''
    const serviceEndDate = isDailyChauffeur ? String(payload.service_end_date || '') : ''
    const departureFlightDate = isDailyChauffeur ? String(payload.departure_flight_date || '') : ''
    const departureFlightTime = isDailyChauffeur ? String(payload.departure_flight_time || '') : ''
    const departureFlightNumber = isDailyChauffeur
      ? normalizeWhitespace(payload.departure_flight_number).toUpperCase()
      : ''
    const vehicleType = String(payload.vehicle_type)
    const paymentMethod = String(payload.payment_method)
    const guestCount = Number(payload.guests)
    const childSeatCount =
      payload.child_seat_count === undefined ||
      payload.child_seat_count === null ||
      payload.child_seat_count === ''
        ? 0
        : Number(payload.child_seat_count)
    const childAges: number[] = Array.isArray(payload.child_ages)
      ? payload.child_ages.slice(0, childSeatCount).map(Number)
      : []
    const legacyLuggageCount = notes.match(/^Large luggage:\s*(\d+)$/i)?.[1]
    const rawLuggageCount =
      payload.luggage_count === undefined ||
      payload.luggage_count === null ||
      payload.luggage_count === ''
        ? legacyLuggageCount || 0
        : payload.luggage_count
    const luggageCount = Number(rawLuggageCount)
    const vehicleCapacity = vehicleType === 'vclass' ? 13 : 7

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customerEmail) || customerEmail.length > 120) {
      return jsonResponse({ error: 'A valid customer_email is required' }, 400)
    }
    if (!isValidName(customerName)) {
      return jsonResponse({ error: 'customer_name is invalid' }, 400)
    }
    if (!isValidPhone(customerPhone)) {
      return jsonResponse({ error: 'customer_phone is invalid' }, 400)
    }
    if ((requiresHotelName || rawHotelName) && !isValidHotelName(rawHotelName)) {
      return jsonResponse({ error: 'hotel_name is invalid' }, 400)
    }
    if (!isValidFlightNumber(payload.flight_number)) {
      return jsonResponse({ error: 'flight_number is invalid' }, 400)
    }
    if (!['one_way', 'round_trip', 'daily_chauffeur'].includes(tripType)) {
      return jsonResponse({ error: 'trip_type is invalid' }, 400)
    }
    if (isRoundTrip && !isValidFlightNumber(returnFlightNumber)) {
      return jsonResponse({ error: 'return_flight_number is invalid' }, 400)
    }
    if (isDailyChauffeur && !isValidFlightNumber(departureFlightNumber)) {
      return jsonResponse({ error: 'departure_flight_number is invalid' }, 400)
    }
    if (!['airport', 'hotel', 'private_address'].includes(pickupLocation)) {
      return jsonResponse({ error: 'pickup_location is invalid' }, 400)
    }
    if (!['vito', 'vclass'].includes(vehicleType)) {
      return jsonResponse({ error: 'vehicle_type is invalid' }, 400)
    }
    if (paymentMethod !== 'cash') {
      return jsonResponse({ error: 'payment_method is invalid' }, 400)
    }
    if (!isDailyChauffeur && dropoffLocation === 'airport' && pickupLocation === 'airport') {
      return jsonResponse({ error: 'pickup and destination cannot both be the airport' }, 400)
    }
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > vehicleCapacity) {
      return jsonResponse({ error: 'guests exceeds the selected vehicle capacity' }, 400)
    }
    if (!Number.isInteger(childSeatCount) || childSeatCount < 0 || childSeatCount > 4) {
      return jsonResponse({ error: 'child_seat_count is invalid' }, 400)
    }
    if (childSeatCount > 0 && childAges.some(age => !Number.isInteger(age) || age < 0 || age > 11)) {
      return jsonResponse({ error: 'child_ages contains invalid values' }, 400)
    }
    if (!Number.isInteger(luggageCount) || luggageCount < 0 || luggageCount > 12) {
      return jsonResponse({ error: 'luggage_count is invalid' }, 400)
    }
    if (!isValidDate(pickupDate)) {
      return jsonResponse({ error: 'pickup_date is invalid' }, 400)
    }
    if (pickupDate < new Date().toISOString().split('T')[0]) {
      return jsonResponse({ error: 'pickup_date cannot be in the past' }, 400)
    }
    if (isRoundTrip) {
      if (!isValidDate(returnDate) || returnDate < pickupDate) {
        return jsonResponse({ error: 'return_date must be on or after pickup_date' }, 400)
      }
      if (!isValidTime(returnPickupTime)) {
        return jsonResponse({ error: 'return_pickup_time is invalid' }, 400)
      }
    }
    const hireDayCount = isDailyChauffeur ? inclusiveDayCount(pickupDate, serviceEndDate) : 0
    if (isDailyChauffeur) {
      if (!isValidTime(pickupTime)) {
        return jsonResponse({ error: 'pickup_time is invalid' }, 400)
      }
      if (!isValidDate(serviceEndDate) || serviceEndDate < pickupDate || hireDayCount < 1 || hireDayCount > 30) {
        return jsonResponse({ error: 'service_end_date must define a 1 to 30 day hire' }, 400)
      }
      const hasDepartureFlightDetails = Boolean(departureFlightTime || departureFlightNumber)
      if (departureFlightDate && (!isValidDate(departureFlightDate) || departureFlightDate < pickupDate)) {
        return jsonResponse({ error: 'departure_flight_date is invalid' }, 400)
      }
      if (hasDepartureFlightDetails && !departureFlightDate) {
        return jsonResponse({ error: 'departure_flight_date is required' }, 400)
      }
      if (departureFlightTime && !isValidTime(departureFlightTime)) {
        return jsonResponse({ error: 'departure_flight_time is invalid' }, 400)
      }
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    let priceEur = 0
    let dailyRateEur: number | null = null
    if (isDailyChauffeur) {
      const { data: rate, error: rateError } = await supabase
        .from('chauffeur_service_rates')
        .select('daily_rate_eur')
        .eq('vehicle_type', vehicleType)
        .single()

      if (rateError || !rate) {
        return jsonResponse({ error: 'No active daily chauffeur rate was found for this vehicle' }, 400)
      }
      dailyRateEur = Number(rate.daily_rate_eur)
      priceEur = dailyRateEur * hireDayCount
    } else if (!requiresManualPricing) {
      const { data: route, error: routeError } = await supabase
        .from('routes')
        .select('price_eur')
        .eq('from_location', 'airport')
        .eq('to_location', dropoffLocation)
        .eq('vehicle_type', vehicleType)
        .single()

      if (routeError || !route) {
        return jsonResponse({ error: 'No active price was found for this route' }, 400)
      }
      priceEur = Number(route.price_eur) * (isRoundTrip ? 2 : 1)
    }

    const bookingPayload = {
      booking_ref: generateBookingRef(),
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      hotel_name: hotelName,
      child_seat_count: childSeatCount,
      child_ages: childAges,
      luggage_count: luggageCount,
      flight_number: normalizeWhitespace(payload.flight_number).toUpperCase() || null,
      flight_arrival_time: payload.flight_arrival_time || null,
      notes: notes || null,
      pickup_location: pickupLocation,
      pickup_address: pickupAddress || null,
      pickup_time: pickupTime || null,
      dropoff_address: isDailyChauffeur ? null : dropoffAddress || null,
      dropoff_location: dropoffLocation,
      pickup_date: pickupDate,
      trip_type: tripType,
      return_date: returnDate || null,
      return_pickup_time: returnPickupTime || null,
      return_flight_number: returnFlightNumber || null,
      service_end_date: serviceEndDate || null,
      daily_rate_eur: dailyRateEur,
      departure_flight_date: departureFlightDate || null,
      departure_flight_time: departureFlightTime || null,
      departure_flight_number: departureFlightNumber || null,
      fuel_terms_accepted_at: isDailyChauffeur ? new Date().toISOString() : null,
      guests: guestCount,
      vehicle_type: vehicleType,
      price_eur: priceEur,
      status: requiresManualPricing ? 'pending' : 'confirmed',
      payment_method: paymentMethod,
      language: String(payload.language || 'en'),
    }

    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert([bookingPayload])
      .select()
      .single()

    if (insertError) throw insertError

    const pickupLabels: Record<string, string> = {
      airport: 'Antalya Airport (AYT)',
      hotel: 'Hotel',
      private_address: 'Private address',
    }
    const pickupLabel = pickupLabels[booking.pickup_location] || booking.pickup_location
    const pickupAddressDisplay = booking.pickup_address || (
      booking.pickup_location === 'hotel'
        ? `Hotel: ${booking.hotel_name}`
        : 'Antalya Airport (AYT)'
    )
    const dropoffAddressDisplay = booking.dropoff_address || booking.dropoff_location
    const bookingPriceDisplay = isDailyChauffeur
      ? `EUR ${booking.price_eur} (${hireDayCount} days x EUR ${booking.daily_rate_eur}; fuel excluded)`
      : isPrivateDestination
      ? 'To be confirmed after checking the drop-off address'
      : isAirportReturn
        ? 'To be confirmed after checking the hotel or pick-up address'
        : `EUR ${booking.price_eur}`

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    const notificationEmail = Deno.env.get('BOOKING_NOTIFICATION_EMAIL')
    const fromEmail = Deno.env.get('BOOKING_FROM_EMAIL')

    if (!resendApiKey || !notificationEmail || !fromEmail) {
      console.warn('Booking email is not configured; booking was saved without notification', {
        booking_ref: booking.booking_ref,
      })
    } else {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [notificationEmail],
          subject: `New ${isDailyChauffeur ? 'daily chauffeur hire ' : isRoundTrip ? 'round-trip ' : ''}booking ${booking.booking_ref}: ${pickupLabel}${isDailyChauffeur ? '' : ` to ${booking.dropoff_location}`}`,
          html: `
            <div style="font-family:Arial,sans-serif;color:#161616">
              <h2>New booking request</h2>
              <table style="border-collapse:collapse">
                <tr><td style="padding:6px 12px;color:#777">Reference</td><td style="padding:6px 12px"><strong>${escapeHtml(booking.booking_ref)}</strong></td></tr>
                <tr><td style="padding:6px 12px;color:#777">Customer</td><td style="padding:6px 12px">${escapeHtml(booking.customer_name)}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Email</td><td style="padding:6px 12px">${escapeHtml(booking.customer_email)}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Phone / WhatsApp</td><td style="padding:6px 12px">${escapeHtml(booking.customer_phone)}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Hotel / accommodation</td><td style="padding:6px 12px"><strong>${escapeHtml(booking.hotel_name)}</strong></td></tr>
                <tr><td style="padding:6px 12px;color:#777">Large luggage</td><td style="padding:6px 12px"><strong>${escapeHtml(booking.luggage_count ?? luggageCount)}</strong></td></tr>
                <tr><td style="padding:6px 12px;color:#777">Child seats</td><td style="padding:6px 12px">${escapeHtml(booking.child_seat_count || 0)}</td></tr>
                ${childAges.length > 0 ? `<tr><td style="padding:6px 12px;color:#777">Child ages</td><td style="padding:6px 12px">${escapeHtml(childAges.map((age, i) => `Child ${i + 1}: ${age === 0 ? 'under 1' : age + ' yr'}`).join(', '))}</td></tr>` : ''}
                <tr><td style="padding:6px 12px;color:#777">Pick-up type</td><td style="padding:6px 12px">${escapeHtml(pickupLabel)}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Pick-up address</td><td style="padding:6px 12px"><strong>${escapeHtml(pickupAddressDisplay)}</strong></td></tr>
                ${!isDailyChauffeur ? `<tr><td style="padding:6px 12px;color:#777">Destination</td><td style="padding:6px 12px">${escapeHtml(booking.dropoff_location)}</td></tr>` : ''}
                ${!isDailyChauffeur && booking.dropoff_address ? `<tr><td style="padding:6px 12px;color:#777">Drop-off address</td><td style="padding:6px 12px"><strong>${escapeHtml(dropoffAddressDisplay)}</strong></td></tr>` : ''}
                <tr><td style="padding:6px 12px;color:#777">Journey type</td><td style="padding:6px 12px"><strong>${escapeHtml(isDailyChauffeur ? 'Daily vehicle + chauffeur' : isRoundTrip ? 'Round trip' : 'One way')}</strong></td></tr>
                <tr><td style="padding:6px 12px;color:#777">Date / arrival</td><td style="padding:6px 12px">${escapeHtml(booking.pickup_date)} ${escapeHtml(isDailyChauffeur ? booking.pickup_time : booking.flight_arrival_time || '')}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Flight</td><td style="padding:6px 12px">${escapeHtml(booking.flight_number || 'Not provided')}</td></tr>
                ${isRoundTrip ? `<tr><td style="padding:6px 12px;color:#777">Return date / pick-up</td><td style="padding:6px 12px"><strong>${escapeHtml(booking.return_date)} ${escapeHtml(booking.return_pickup_time)}</strong></td></tr>
                <tr><td style="padding:6px 12px;color:#777">Return flight</td><td style="padding:6px 12px">${escapeHtml(booking.return_flight_number || 'Not provided')}</td></tr>` : ''}
                ${isDailyChauffeur ? `<tr><td style="padding:6px 12px;color:#777">Hire period</td><td style="padding:6px 12px"><strong>${escapeHtml(booking.pickup_date)} – ${escapeHtml(booking.service_end_date)} (${escapeHtml(hireDayCount)} days)</strong></td></tr>
                <tr><td style="padding:6px 12px;color:#777">Departure flight</td><td style="padding:6px 12px">${escapeHtml(booking.departure_flight_date || 'Not provided')} ${escapeHtml(booking.departure_flight_time || '')} ${escapeHtml(booking.departure_flight_number || '')}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Fuel terms</td><td style="padding:6px 12px"><strong>Accepted — fuel is excluded and paid separately by the customer</strong></td></tr>` : ''}
                <tr><td style="padding:6px 12px;color:#777">Guests / vehicle</td><td style="padding:6px 12px">${escapeHtml(booking.guests)} / ${escapeHtml(booking.vehicle_type)}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Price</td><td style="padding:6px 12px"><strong>${escapeHtml(bookingPriceDisplay)}</strong></td></tr>
                <tr><td style="padding:6px 12px;color:#777">Payment</td><td style="padding:6px 12px"><strong>Cash in vehicle</strong></td></tr>
              </table>
            </div>
          `,
        }),
      })

      if (!emailResponse.ok) {
        console.error('Booking notification email failed', {
          booking_ref: booking.booking_ref,
          error: await emailResponse.text(),
        })
      }
    }

    return jsonResponse({ booking })
  } catch (error) {
    console.error('Create booking error:', error)
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Booking could not be created' },
      500
    )
  }
})
