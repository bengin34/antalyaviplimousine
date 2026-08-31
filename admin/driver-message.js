import { locationLabel } from './turkish-formatters.js'
import { recommendedAirportPickup } from '../src/airport-pickup.js'

const DRIVER_PHONE = '905056565790'

export function driverWhatsappURL(message) {
  return `https://wa.me/${DRIVER_PHONE}?text=${encodeURIComponent(message)}`
}

function fmtTime(t) {
  return t ? String(t).slice(0, 5) : '—'
}

function fmtPrice(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '0'
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
}

function fmtDate(isoDate) {
  if (!isoDate) return '—'
  const date = new Date(`${isoDate}T12:00:00Z`)
  const label = new Intl.DateTimeFormat('tr-TR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(date)
  return label.charAt(0).toLocaleUpperCase('tr-TR') + label.slice(1)
}

function vehicleLabel(type) {
  if (type === 'vclass') return 'Mercedes V-Class'
  if (type === 'vito') return 'Mercedes Vito'
  return type ?? '—'
}

function paymentLabel(method) {
  return method === 'card' ? 'Kart' : 'Nakit'
}

function locationDisplay(loc, addr, hotelName) {
  if (addr && String(addr).trim()) return String(addr).trim()
  const normalizedLoc = String(loc ?? '').trim().toLocaleLowerCase('tr-TR')
  if (normalizedLoc !== 'airport' && hotelName && String(hotelName).trim().toLocaleLowerCase('tr-TR') !== 'belirtilmedi') {
    return `${String(hotelName).trim()} (${locationLabel(loc)})`
  }
  return locationLabel(loc)
}

function pickupDisplay(booking, isReturn = false) {
  const loc = isReturn ? booking.dropoff_location : booking.pickup_location
  const addr = isReturn ? booking.dropoff_address : booking.pickup_address
  return locationDisplay(loc, addr, booking.hotel_name)
}

function dropoffDisplay(booking, isReturn = false) {
  const loc = isReturn ? booking.pickup_location : booking.dropoff_location
  const addr = isReturn ? booking.pickup_address : booking.dropoff_address
  return locationDisplay(loc, addr, booking.hotel_name)
}

function transferBlock(booking, leg = 'outbound') {
  const isReturn = leg === 'return'
  const date = isReturn ? booking.return_date : booking.pickup_date
  const rawTime = isReturn ? booking.return_pickup_time : (
    booking.pickup_location === 'airport'
      ? (booking.flight_arrival_time || booking.pickup_time)
      : booking.pickup_time
  )
  const flightNo = isReturn ? booking.return_flight_number : booking.flight_number
  const pickup = isReturn
    ? locationLabel(booking.dropoff_location)
    : locationLabel(booking.pickup_location)
  const dropoff = isReturn
    ? locationLabel(booking.pickup_location)
    : locationLabel(booking.dropoff_location)

  const price = booking.trip_type === 'round_trip'
    ? (Number(booking.price_eur) || 0) / 2
    : Number(booking.price_eur) || 0

  const lines = []
  lines.push(`📅 ${fmtDate(date)}`)
  lines.push(`🕐 Saat: ${fmtTime(rawTime)}`)
  lines.push(`🛣️ Güzergah: ${pickup} → ${dropoff}`)
  lines.push(`👤 Misafir: ${booking.customer_name || '—'}`)
  lines.push(`📞 Telefon: ${booking.customer_phone || '—'}`)

  if (flightNo) {
    // Gidişte uçağın inişi, dönüşte kalkışı şoför için belirleyicidir.
    const flightTime = isReturn
      ? (booking.return_flight_departure_time ? ` · Kalkış: ${fmtTime(booking.return_flight_departure_time)}` : '')
      : (booking.flight_arrival_time ? ` · İniş: ${fmtTime(booking.flight_arrival_time)}` : '')
    lines.push(`✈️ Uçuş: ${flightNo}${flightTime}`)
  }

  if (isReturn) {
    const advice = recommendedAirportPickup(booking.return_flight_departure_time, booking.dropoff_location)
    if (advice) {
      const dayNote = advice.dayOffset < 0 ? ' (bir önceki gün)' : advice.dayOffset > 0 ? ' (ertesi gün)' : ''
      lines.push(`⏰ Tavsiye edilen otelden alınma: ${advice.time}${dayNote}`)
    }
  }

  lines.push(`🚌 Araç: ${vehicleLabel(booking.vehicle_type)} · ${booking.guests ?? '—'} kişi`)

  const luggage = Number(booking.luggage_count) || 0
  const childSeats = Number(booking.child_seat_count) || 0
  if (luggage > 0) lines.push(`🧳 Bagaj: ${luggage} adet`)
  if (childSeats > 0) lines.push(`🪑 Çocuk koltuğu: ${childSeats} adet`)

  lines.push(`💳 ${paymentLabel(booking.payment_method)} · €${fmtPrice(price)}`)
  lines.push(`📍 Alış: ${pickupDisplay(booking, isReturn)}`)
  lines.push(`📍 Varış: ${dropoffDisplay(booking, isReturn)}`)

  if (booking.notes && String(booking.notes).trim()) {
    lines.push(`📝 Not: ${String(booking.notes).trim()}`)
  }

  return lines.join('\n')
}

/**
 * Single transfer notification to driver.
 * For round trips includes both legs.
 */
export function buildDriverTransferMessage(booking) {
  const b = booking ?? {}
  const isRoundTrip = b.trip_type === 'round_trip'

  const header = `🚗 YENİ TRANSFER BİLDİRİMİ\n📋 Ref: ${b.booking_ref || '—'}`

  if (isRoundTrip) {
    return [
      header,
      '',
      '*GİDİŞ*',
      transferBlock(b, 'outbound'),
      '',
      '━━━━━━━━━━━━━━',
      '',
      '*DÖNÜŞ*',
      transferBlock(b, 'return'),
    ].join('\n')
  }

  return [header, '', transferBlock(b, 'outbound')].join('\n')
}

/**
 * Full daily program for driver.
 * bookings: array of Booking objects active on the given date (already filtered).
 * date: ISO string YYYY-MM-DD
 */
export function buildDriverDailyProgram(bookings, date) {
  const sorted = [...(bookings ?? [])].sort((a, b) => {
    const ta = a.pickup_location === 'airport'
      ? (a.flight_arrival_time || a.pickup_time || '')
      : (a.pickup_time || '')
    const tb = b.pickup_location === 'airport'
      ? (b.flight_arrival_time || b.pickup_time || '')
      : (b.pickup_time || '')
    return ta.localeCompare(tb)
  })

  const NUMBERS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

  const lines = [
    `🚗 ŞOFÖR GÜNLÜK PROGRAMI`,
    `📅 ${fmtDate(date)}`,
    `Toplam: ${sorted.length} transfer`,
  ]

  sorted.forEach((booking, index) => {
    const num = NUMBERS[index] ?? `${index + 1}.`
    const isReturn = booking._isReturn === true
    const leg = isReturn ? 'return' : 'outbound'
    const rawTime = isReturn
      ? booking.return_pickup_time
      : (booking.pickup_location === 'airport'
        ? (booking.flight_arrival_time || booking.pickup_time)
        : booking.pickup_time)

    lines.push('')
    lines.push('━━━━━━━━━━━━━━')
    lines.push(`${num}  ${fmtTime(rawTime)} · ${locationLabel(isReturn ? booking.dropoff_location : booking.pickup_location)} → ${locationLabel(isReturn ? booking.pickup_location : booking.dropoff_location)}`)
    lines.push('━━━━━━━━━━━━━━')
    lines.push(transferBlock(booking, leg))
  })

  return lines.join('\n')
}
