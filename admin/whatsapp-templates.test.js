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
  vehicle_type: 'vclass',
  guests: 3,
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
