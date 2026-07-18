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
  'hotel_name',
  'pickup_location',
  'dropoff_location',
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
    const missingField = requiredFields.find((field) => {
      const value = payload[field]
      return value === undefined || value === null || value === ''
    })

    if (missingField) {
      return jsonResponse({ error: `${missingField} is required` }, 400)
    }

    const pickupAddress = normalizeWhitespace(payload.pickup_address)
    if (payload.pickup_location === 'private_address' && (pickupAddress.length < 6 || pickupAddress.length > 160)) {
      return jsonResponse({ error: 'pickup_address is required for a private address' }, 400)
    }

    const customerEmail = String(payload.customer_email).trim().toLowerCase()
    const customerName = normalizeWhitespace(payload.customer_name)
    const customerPhone = normalizeWhitespace(payload.customer_phone)
    const hotelName = normalizeWhitespace(payload.hotel_name)
    const pickupLocation = String(payload.pickup_location)
    const pickupDate = String(payload.pickup_date)
    const vehicleType = String(payload.vehicle_type)
    const paymentMethod = String(payload.payment_method)
    const guestCount = Number(payload.guests)
    const childSeatCount =
      payload.child_seat_count === undefined ||
      payload.child_seat_count === null ||
      payload.child_seat_count === ''
        ? 0
        : Number(payload.child_seat_count)
    const vehicleCapacity = vehicleType === 'vclass' ? 13 : 8

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customerEmail) || customerEmail.length > 120) {
      return jsonResponse({ error: 'A valid customer_email is required' }, 400)
    }
    if (!isValidName(customerName)) {
      return jsonResponse({ error: 'customer_name is invalid' }, 400)
    }
    if (!isValidPhone(customerPhone)) {
      return jsonResponse({ error: 'customer_phone is invalid' }, 400)
    }
    if (!isValidHotelName(hotelName)) {
      return jsonResponse({ error: 'hotel_name is invalid' }, 400)
    }
    if (!isValidFlightNumber(payload.flight_number)) {
      return jsonResponse({ error: 'flight_number is invalid' }, 400)
    }
    if (!['airport', 'private_address'].includes(pickupLocation)) {
      return jsonResponse({ error: 'pickup_location is invalid' }, 400)
    }
    if (!['vito', 'vclass'].includes(vehicleType)) {
      return jsonResponse({ error: 'vehicle_type is invalid' }, 400)
    }
    if (!['cash', 'card'].includes(paymentMethod)) {
      return jsonResponse({ error: 'payment_method is invalid' }, 400)
    }
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > vehicleCapacity) {
      return jsonResponse({ error: 'guests exceeds the selected vehicle capacity' }, 400)
    }
    if (!Number.isInteger(childSeatCount) || childSeatCount < 0 || childSeatCount > 4) {
      return jsonResponse({ error: 'child_seat_count is invalid' }, 400)
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(pickupDate)) {
      return jsonResponse({ error: 'pickup_date is invalid' }, 400)
    }
    if (pickupDate < new Date().toISOString().split('T')[0]) {
      return jsonResponse({ error: 'pickup_date cannot be in the past' }, 400)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data: route, error: routeError } = await supabase
      .from('routes')
      .select('price_eur')
      .eq('from_location', 'airport')
      .eq('to_location', String(payload.dropoff_location))
      .eq('vehicle_type', vehicleType)
      .single()

    if (routeError || !route) {
      return jsonResponse({ error: 'No active price was found for this route' }, 400)
    }

    const bookingPayload = {
      booking_ref: generateBookingRef(),
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      hotel_name: hotelName,
      child_seat_count: childSeatCount,
      flight_number: normalizeWhitespace(payload.flight_number).toUpperCase() || null,
      flight_arrival_time: payload.flight_arrival_time || null,
      notes: payload.notes || null,
      pickup_location: pickupLocation,
      pickup_address: pickupAddress || null,
      dropoff_location: String(payload.dropoff_location),
      pickup_date: pickupDate,
      guests: guestCount,
      vehicle_type: vehicleType,
      price_eur: Number(route.price_eur),
      status: paymentMethod === 'cash' ? 'confirmed' : 'pending',
      payment_method: paymentMethod,
      language: String(payload.language || 'en'),
    }

    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert([bookingPayload])
      .select()
      .single()

    if (insertError) throw insertError

    const addressRow = booking.pickup_address
      ? `<tr><td style="padding:6px 12px;color:#777">Pick-up address</td><td style="padding:6px 12px"><strong>${escapeHtml(booking.pickup_address)}</strong></td></tr>`
      : ''

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
          subject: `New booking ${booking.booking_ref}: ${booking.pickup_location} to ${booking.dropoff_location}`,
          html: `
            <div style="font-family:Arial,sans-serif;color:#161616">
              <h2>New booking request</h2>
              <table style="border-collapse:collapse">
                <tr><td style="padding:6px 12px;color:#777">Reference</td><td style="padding:6px 12px"><strong>${escapeHtml(booking.booking_ref)}</strong></td></tr>
                <tr><td style="padding:6px 12px;color:#777">Customer</td><td style="padding:6px 12px">${escapeHtml(booking.customer_name)}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Email</td><td style="padding:6px 12px">${escapeHtml(booking.customer_email)}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Phone / WhatsApp</td><td style="padding:6px 12px">${escapeHtml(booking.customer_phone)}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Hotel</td><td style="padding:6px 12px"><strong>${escapeHtml(booking.hotel_name)}</strong></td></tr>
                <tr><td style="padding:6px 12px;color:#777">Child seats</td><td style="padding:6px 12px">${escapeHtml(booking.child_seat_count || 0)}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Pick-up</td><td style="padding:6px 12px">${escapeHtml(booking.pickup_location)}</td></tr>
                ${addressRow}
                <tr><td style="padding:6px 12px;color:#777">Destination</td><td style="padding:6px 12px">${escapeHtml(booking.dropoff_location)}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Date / arrival</td><td style="padding:6px 12px">${escapeHtml(booking.pickup_date)} ${escapeHtml(booking.flight_arrival_time || '')}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Flight</td><td style="padding:6px 12px">${escapeHtml(booking.flight_number || 'Not provided')}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Guests / vehicle</td><td style="padding:6px 12px">${escapeHtml(booking.guests)} / ${escapeHtml(booking.vehicle_type)}</td></tr>
                <tr><td style="padding:6px 12px;color:#777">Price</td><td style="padding:6px 12px"><strong>EUR ${escapeHtml(booking.price_eur)}</strong></td></tr>
                <tr><td style="padding:6px 12px;color:#777">Payment</td><td style="padding:6px 12px"><strong>${escapeHtml(booking.payment_method === 'cash' ? 'Cash in vehicle' : 'Online card')}</strong></td></tr>
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
