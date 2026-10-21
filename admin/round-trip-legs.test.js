import { describe, expect, test } from 'vitest'
import { resolveRealizedLegs } from './profit-loss-metrics.js'
import { removeRoundTripLegPayload } from './round-trip-legs.js'

const today = '2026-09-30'
const settings = { '2026-09': { eur_try_rate: 50, advertising_expense_try: 0 } }

function roundTrip(extra = {}) {
  return {
    id: 'booking-1',
    booking_ref: 'AVL-1',
    customer_name: 'Test',
    trip_type: 'round_trip',
    status: 'completed',
    pickup_location: 'airport',
    pickup_address: null,
    dropoff_location: 'belek',
    dropoff_address: 'Rixos Premium Belek',
    pickup_date: '2026-09-01',
    pickup_time: null,
    flight_number: 'TK2412',
    flight_arrival_time: '10:30',
    return_date: '2026-09-08',
    return_pickup_time: '11:00',
    return_flight_number: 'TK2417',
    return_flight_departure_time: '14:30',
    price_eur: 200,
    service_cost_mode: 'sold_transfer',
    sold_transfer_cost_try: 1500,
    return_service_cost_mode: 'own_vehicle',
    return_sold_transfer_cost_try: null,
    own_vehicle_profit_eur: null,
    return_own_vehicle_profit_eur: 35,
    revenue_eur: null,
    return_revenue_eur: 90,
    meet_fee_override: true,
    return_meet_fee_override: false,
    manual_outbound_distance_km: 40,
    manual_return_distance_km: 41,
    ...extra,
  }
}

const LEDGER_KEYS = ['revenueEur', 'costMode', 'legSupplierCostTry', 'from', 'to', 'date']

function ledgerLeg(booking, leg) {
  const { resolvedLegs } = resolveRealizedLegs([booking], today, settings)
  const found = resolvedLegs.find(item => item.leg === leg)
  if (!found) throw new Error(`leg ${leg} not resolved`)
  return found
}

function expectSameLedger(before, after) {
  for (const key of LEDGER_KEYS) expect([key, after[key]]).toEqual([key, before[key]])
  // Every derived money figure (costs, profit) must follow.
  for (const [key, value] of Object.entries(before)) {
    if (typeof value === 'number' && key in after) expect([key, after[key]]).toEqual([key, value])
  }
}

describe('removing one leg of a round trip', () => {
  test('dropping the return leaves the outbound exactly as the ledger saw it', () => {
    const booking = roundTrip()
    const converted = { ...booking, ...removeRoundTripLegPayload(booking, 'return') }
    expect(converted).toMatchObject({ trip_type: 'one_way', price_eur: 100, return_date: null, return_flight_departure_time: null })
    expectSameLedger(ledgerLeg(booking, 'outbound'), ledgerLeg(converted, 'outbound'))
  })

  test('dropping the outbound turns the return into the one-way trip, reversed', () => {
    const booking = roundTrip()
    const payload = removeRoundTripLegPayload(booking, 'outbound')
    const converted = { ...booking, ...payload }
    expect(payload).toMatchObject({
      trip_type: 'one_way',
      price_eur: 100,
      pickup_location: 'belek',
      pickup_address: 'Rixos Premium Belek',
      dropoff_location: 'airport',
      dropoff_address: null,
      pickup_date: '2026-09-08',
      pickup_time: '11:00',
      flight_number: 'TK2417',
      flight_arrival_time: null,
      status: 'confirmed',
    })
    // The remaining leg keeps its own cost, revenue and overrides.
    expect(payload).toMatchObject({
      service_cost_mode: 'own_vehicle',
      sold_transfer_cost_try: null,
      own_vehicle_profit_eur: 35,
      revenue_eur: 90,
      meet_fee_override: false,
      manual_outbound_distance_km: 41,
    })
    expectSameLedger(ledgerLeg(booking, 'return'), ledgerLeg({ ...converted, status: 'completed' }, 'outbound'))
  })

  test('a sold-transfer return keeps its own supplier cost', () => {
    const booking = roundTrip({ return_service_cost_mode: 'sold_transfer', return_sold_transfer_cost_try: 1700, return_own_vehicle_profit_eur: null })
    const converted = { ...booking, ...removeRoundTripLegPayload(booking, 'outbound'), status: 'completed' }
    expect(converted).toMatchObject({ service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 1700 })
    expectSameLedger(ledgerLeg(booking, 'return'), ledgerLeg(converted, 'outbound'))
  })

  describe('older bookings whose two legs share one supplier cost', () => {
    const legacy = () => roundTrip({ return_service_cost_mode: null, sold_transfer_cost_try: 3001, price_eur: 250 })

    test('the outbound keeps only its half of the shared cost', () => {
      const booking = legacy()
      const payload = removeRoundTripLegPayload(booking, 'return')
      expect(payload.sold_transfer_cost_try).toBe(1500.5)
      expectSameLedger(ledgerLeg(booking, 'outbound'), ledgerLeg({ ...booking, ...payload }, 'outbound'))
    })

    test('the return takes the other half', () => {
      const booking = legacy()
      const payload = removeRoundTripLegPayload(booking, 'outbound')
      expect(payload).toMatchObject({ service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 1500.5 })
      expectSameLedger(ledgerLeg(booking, 'return'), ledgerLeg({ ...booking, ...payload, status: 'completed' }, 'outbound'))
    })
  })

  test('the two halves of an odd-cent price add back up to the price', () => {
    const booking = roundTrip({ price_eur: 200.01 })
    const outbound = removeRoundTripLegPayload(booking, 'return').price_eur
    const inbound = removeRoundTripLegPayload(booking, 'outbound').price_eur
    expect(Math.round((outbound + inbound) * 100)).toBe(20001)
  })

  test('a booking that is not a round trip is refused', () => {
    expect(() => removeRoundTripLegPayload(roundTrip({ trip_type: 'one_way' }), 'return')).toThrow()
    expect(() => removeRoundTripLegPayload(roundTrip({ return_date: null }), 'outbound')).toThrow()
  })
})
