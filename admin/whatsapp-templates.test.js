import { test, expect } from 'vitest'
import { buildConfirmMessage, buildReminderMessage } from './whatsapp-templates.js'

// Locations are SLUGS (as stored in the DB), not display names.
const base = {
  booking_ref: 'VIP-2026-0042',
  customer_name: 'Ahmet Yılmaz',
  pickup_date: '2026-08-15',
  pickup_time: '10:30',
  pickup_location: 'airport',
  dropoff_location: 'belek',
  hotel_name: 'Regnum Carya Golf & Spa Resort',
  vehicle_type: 'vclass',
  guests: 3,
  luggage_count: 2,
  child_seat_count: 1,
  price_eur: 55,
  language: 'en',
}

test('confirm message maps location slugs to display names in the route', () => {
  const msg = buildConfirmMessage(base)
  expect(msg).toContain('VIP-2026-0042')
  expect(msg).toContain('Antalya Havalimanı')   // 'airport' → display name
  expect(msg).toContain('Belek')                // 'belek' → display name
  expect(msg).not.toContain('airport')          // no raw slug leaks
  expect(msg).toContain('2026-08-15')
  expect(msg).toContain('55')
})

test('private_address route uses the address string', () => {
  const msg = buildConfirmMessage({
    ...base,
    pickup_location: 'private_address',
    pickup_address: 'Lara Cd. No:5',
  })
  expect(msg).toContain('Lara Cd. No:5')
})

test('confirm message localizes labels by language', () => {
  const en = buildConfirmMessage({ ...base, language: 'en' })
  const de = buildConfirmMessage({ ...base, language: 'de' })
  const ru = buildConfirmMessage({ ...base, language: 'ru' })
  const tr = buildConfirmMessage({ ...base, language: 'tr' })
  expect(new Set([en, de, ru, tr]).size).toBe(4)
})

test('unknown language falls back to english', () => {
  const unknown = buildConfirmMessage({ ...base, language: 'zz' })
  const missing = buildConfirmMessage({ ...base, language: undefined })
  const en = buildConfirmMessage({ ...base, language: 'en' })
  expect(unknown).toBe(en)
  expect(missing).toBe(en)
})

test('airport pickup time uses flight arrival when present', () => {
  const msg = buildConfirmMessage({ ...base, pickup_location: 'airport', flight_arrival_time: '11:45', pickup_time: '10:30' })
  expect(msg).toContain('11:45')
})

test('pickup time trimmed from HH:MM:SS to HH:MM', () => {
  const msg = buildConfirmMessage({ ...base, pickup_location: 'belek', pickup_time: '10:30:00' })
  expect(msg).toContain('10:30')
  expect(msg).not.toContain('10:30:00')
})

test('reminder omits driver line when driver fields empty', () => {
  const msg = buildReminderMessage(base)
  expect(msg).not.toMatch(/07 ABC|Mehmet/)
})

test('reminder includes driver name and plate when present', () => {
  const msg = buildReminderMessage({ ...base, driver_name: 'Mehmet', vehicle_plate: '07 ABC 123' })
  expect(msg).toContain('Mehmet')
  expect(msg).toContain('07 ABC 123')
})

test('reminder uses outbound pickup for round trips', () => {
  const roundTrip = { ...base, trip_type: 'round_trip', return_date: '2026-08-22', return_pickup_time: '14:00' }
  const msg = buildReminderMessage(roundTrip)
  expect(msg).toContain('2026-08-15')      // outbound date
  expect(msg).not.toContain('2026-08-22')  // not the return date
})

test('current exact addresses override generic location and hotel labels', () => {
  const msg = buildConfirmMessage({
    ...base,
    pickup_location: 'belek',
    pickup_address: 'Kadriye Mah. Güncel Alış No: 12',
    dropoff_location: 'airport',
    dropoff_address: 'Antalya Havalimanı Terminal 2 Dış Hatlar',
    hotel_name: 'Eski Otel Adı',
  })

  expect(msg).toContain('Pickup location: Kadriye Mah. Güncel Alış No: 12')
  expect(msg).toContain('Drop-off location: Antalya Havalimanı Terminal 2 Dış Hatlar')
  expect(msg).not.toContain('Eski Otel Adı')
})

test('hotel name is used as the precise non-airport endpoint when no address exists', () => {
  const msg = buildConfirmMessage(base)
  expect(msg).toContain('Regnum Carya Golf & Spa Resort, Belek, Antalya, Türkiye')
})

test('Google Maps route contains the exact current origin and destination', () => {
  const msg = buildConfirmMessage({
    ...base,
    pickup_address: 'Antalya Havalimanı Terminal 1',
    dropoff_address: 'İskele Mevkii, Belek Mah. No: 7',
  })
  const mapLine = msg.split('\n').find((line) => line.startsWith('Google Maps route: '))
  const mapURL = new URL(mapLine.replace('Google Maps route: ', ''))

  expect(mapURL.searchParams.get('origin')).toBe('Antalya Havalimanı Terminal 1')
  expect(mapURL.searchParams.get('destination')).toBe('İskele Mevkii, Belek Mah. No: 7')
  expect(mapURL.searchParams.get('travelmode')).toBe('driving')
})

test('return confirmation uses current return fields and reverses exact endpoints', () => {
  const roundTrip = {
    ...base,
    trip_type: 'round_trip',
    pickup_address: 'Antalya Havalimanı Terminal 1',
    dropoff_address: 'Regnum Carya Ana Giriş, Kadriye',
    pickup_time: '09:15',
    flight_arrival_time: '10:30',
    flight_number: 'XQ100',
    return_date: '2026-08-22',
    return_pickup_time: '14:40:00',
    return_flight_number: 'XQ101',
    price_eur: 110,
  }
  const msg = buildConfirmMessage(roundTrip, { leg: 'return' })

  expect(msg).toContain('*Return transfer*')
  expect(msg).toContain('Date: 2026-08-22')
  expect(msg).toContain('Pickup time: 14:40')
  expect(msg).toContain('Flight: XQ101')
  expect(msg).toContain('Pickup location: Regnum Carya Ana Giriş, Kadriye')
  expect(msg).toContain('Drop-off location: Antalya Havalimanı Terminal 1')
  expect(msg).toContain('Price: €55')
  expect(msg).not.toContain('2026-08-15')
  expect(msg).not.toContain('XQ100')
})

test('return reminder uses return route together with current driver data', () => {
  const roundTrip = {
    ...base,
    trip_type: 'round_trip',
    pickup_address: 'Terminal 1',
    dropoff_address: 'Güncel Otel Girişi',
    return_date: '2026-08-22',
    return_pickup_time: '14:40',
    return_flight_number: 'TK2420',
    driver_name: 'Mehmet Kaya',
    vehicle_plate: '07 VIP 707',
  }
  const msg = buildReminderMessage(roundTrip, { leg: 'return' })

  expect(msg).toContain('Pickup location: Güncel Otel Girişi')
  expect(msg).toContain('Drop-off location: Terminal 1')
  expect(msg).toContain('Mehmet Kaya')
  expect(msg).toContain('07 VIP 707')
})

test('Arabic booking messages use Arabic labels and the selected leg', () => {
  const msg = buildConfirmMessage({
    ...base,
    language: 'ar',
    trip_type: 'round_trip',
    return_date: '2026-08-22',
    return_pickup_time: '14:40',
  }, { leg: 'return' })

  expect(msg).toContain('*رحلة العودة*')
  expect(msg).toContain('موقع الاستقبال:')
  expect(msg).toContain('مسار Google Maps:')
})
