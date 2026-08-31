import { test, expect } from 'vitest'
import { buildDriverTransferMessage } from './driver-message.js'

const roundTrip = {
  booking_ref: 'VIP-2026-0042',
  customer_name: 'Ahmet Yılmaz',
  customer_phone: '+905551112233',
  trip_type: 'round_trip',
  pickup_date: '2026-08-15',
  pickup_location: 'airport',
  dropoff_location: 'belek',
  flight_number: 'XQ100',
  flight_arrival_time: '10:30:00',
  return_date: '2026-08-22',
  return_pickup_time: '10:40:00',
  return_flight_number: 'XQ101',
  return_flight_departure_time: '14:00:00',
  hotel_name: 'Regnum Carya',
  vehicle_type: 'vclass',
  guests: 3,
  price_eur: 110,
  payment_method: 'cash',
}

test('outbound leg shows the landing time and the return leg shows the departure time', () => {
  const [outbound, ret] = buildDriverTransferMessage(roundTrip).split('━━━━━━━━━━━━━━')

  expect(outbound).toContain('✈️ Uçuş: XQ100 · İniş: 10:30')
  expect(ret).toContain('✈️ Uçuş: XQ101 · Kalkış: 14:00')
  expect(ret).not.toContain('İniş')
})

test('return leg carries the region-based recommended hotel pickup time', () => {
  // Belek: 14:00 kalkış − (150 dk havalimanı + 35 dk yol + 15 dk trafik) = 10:40
  const message = buildDriverTransferMessage(roundTrip)

  expect(message).toContain('⏰ Tavsiye edilen otelden alınma: 10:40')
})

test('an early return flight moves the recommended pickup to the previous day', () => {
  const message = buildDriverTransferMessage({
    ...roundTrip,
    dropoff_location: 'alanya',
    return_flight_departure_time: '02:00:00',
  })

  expect(message).toContain('⏰ Tavsiye edilen otelden alınma: 21:00 (bir önceki gün)')
})

test('no recommendation is shown while the return departure time is missing', () => {
  const { return_flight_departure_time: _omitted, ...withoutDeparture } = roundTrip

  expect(buildDriverTransferMessage(withoutDeparture)).not.toContain('Tavsiye edilen otelden alınma')
})
