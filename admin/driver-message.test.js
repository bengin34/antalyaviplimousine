import { test, expect } from 'vitest'
import { buildDriverDailyProgram, buildDriverTransferMessage } from './driver-message.js'
import { expandRoundTrips } from './react/pages/timeline-logic'

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

test('the daily program keeps a timeline return card pointing hotel → airport', () => {
  const returnCard = expandRoundTrips([roundTrip]).find(card => card._isReturn)
  const message = buildDriverDailyProgram([returnCard], roundTrip.return_date)

  expect(message).toContain('🛣️ Güzergah: Belek → Antalya Havalimanı')
  expect(message).toContain('✈️ Uçuş: XQ101 · Kalkış: 14:00')
  expect(message).toContain('⏰ Tavsiye edilen otelden alınma: 10:40')
  expect(message).toContain('📅 22 Ağustos 2026')
  expect(message).not.toContain('İniş')
})

test('the daily program keeps a timeline outbound card pointing airport → hotel', () => {
  const outboundCard = expandRoundTrips([roundTrip]).find(card => !card._isReturn)
  const message = buildDriverDailyProgram([outboundCard], roundTrip.pickup_date)

  expect(message).toContain('🛣️ Güzergah: Antalya Havalimanı → Belek')
  expect(message).toContain('✈️ Uçuş: XQ100 · İniş: 10:30')
  expect(message).toContain('📅 15 Ağustos 2026')
})

test('the daily program sorts each card by its own leg time', () => {
  const sameDayOutbound = {
    ...roundTrip,
    booking_ref: 'VIP-2026-0043',
    pickup_date: roundTrip.return_date,
    trip_type: 'one_way',
    return_date: null,
    flight_arrival_time: '13:00:00',
  }
  const cards = expandRoundTrips([roundTrip, sameDayOutbound])
    .filter(card => card._displayDate === roundTrip.return_date)
  const message = buildDriverDailyProgram(cards, roundTrip.return_date)

  // Dönüş 10:40'ta, aynı günkü geliş 13:00'te: dönüş önce gelmeli.
  expect(message).toContain('1️⃣  10:40 · Belek → Antalya Havalimanı')
  expect(message).toContain('2️⃣  13:00 · Antalya Havalimanı → Belek')
})

test('a driver notification built from a return card still describes both legs correctly', () => {
  const returnCard = expandRoundTrips([roundTrip]).find(card => card._isReturn)
  const [outbound, ret] = buildDriverTransferMessage(returnCard).split('━━━━━━━━━━━━━━')

  expect(outbound).toContain('🛣️ Güzergah: Antalya Havalimanı → Belek')
  expect(outbound).toContain('✈️ Uçuş: XQ100 · İniş: 10:30')
  expect(ret).toContain('🛣️ Güzergah: Belek → Antalya Havalimanı')
  expect(ret).toContain('✈️ Uçuş: XQ101 · Kalkış: 14:00')
})

test('the daily program marks return journeys and leaves arrivals unmarked', () => {
  const [outboundCard, returnCard] = expandRoundTrips([roundTrip])
  const returnProgram = buildDriverDailyProgram([returnCard], roundTrip.return_date)
  const outboundProgram = buildDriverDailyProgram([outboundCard], roundTrip.pickup_date)

  expect(returnProgram).toContain('🔁 *DÖNÜŞ SEYAHATİ*')
  expect(outboundProgram).not.toContain('DÖNÜŞ SEYAHATİ')
})

test('a separately booked return is marked as a return journey too', () => {
  const manualReturn = {
    ...roundTrip,
    trip_type: 'one_way',
    return_date: null,
    pickup_location: 'belek',
    dropoff_location: 'airport',
    manual_return_of_ref: 'VIP-2026-0042',
  }
  const [card] = expandRoundTrips([manualReturn])

  expect(buildDriverDailyProgram([card], manualReturn.pickup_date)).toContain('🔁 *DÖNÜŞ SEYAHATİ*')
  expect(buildDriverTransferMessage(manualReturn)).toContain('🔁 *DÖNÜŞ SEYAHATİ*')
})
