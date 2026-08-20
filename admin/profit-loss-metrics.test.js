import { describe, expect, test } from 'vitest'
import {
  AIRPORT_MEET_COST_EUR,
  calculateProfitLossMetrics,
  DEFAULT_EUR_TRY_RATE,
  DEFAULT_KM_COST_TRY,
  fixedRouteDistanceKm,
} from './profit-loss-metrics.js'

const baseBooking = {
  id: 'booking-1',
  booking_ref: 'AVL-1',
  customer_name: 'Test Yolcu',
  pickup_location: 'airport',
  dropoff_location: 'side',
  pickup_date: '2026-08-01',
  return_date: null,
  trip_type: 'one_way',
  price_eur: 100,
  status: 'completed',
}

describe('fixedRouteDistanceKm', () => {
  test('uses the same fixed distance in either direction', () => {
    expect(fixedRouteDistanceKm('airport', 'side')).toBe(65)
    expect(fixedRouteDistanceKm('side', 'airport')).toBe(65)
  })

  test('finds a fixed path between non-airport admin locations', () => {
    expect(fixedRouteDistanceKm('side', 'manavgat')).toBe(10)
    expect(fixedRouteDistanceKm('kemer', 'side')).toBe(115)
  })

  test('does not invent a distance for a generic address', () => {
    expect(fixedRouteDistanceKm('private_address', 'airport')).toBeNull()
  })

  test('covers every named route offered by the manual booking form', () => {
    const namedLocations = [
      'airport', 'antalya', 'belek', 'side', 'kemer', 'alanya', 'bogazkent',
      'manavgat', 'kizilagac', 'tekirova', 'bodrum', 'dalaman', 'fethiye',
      'pamukkale', 'kapadokya',
    ]

    for (const from of namedLocations) {
      for (const to of namedLocations) {
        expect(fixedRouteDistanceKm(from, to)).not.toBeNull()
      }
    }
  })
})

describe('calculateProfitLossMetrics', () => {
  test('counts the empty return in vehicle kilometres and applies default settings', () => {
    const result = calculateProfitLossMetrics([baseBooking], '2026-08', '2026-08-07')

    expect(result.incomeEur).toBe(100)
    expect(result.incomeTry).toBe(100 * DEFAULT_EUR_TRY_RATE)
    expect(result.airportMeetCostEur).toBe(AIRPORT_MEET_COST_EUR)
    expect(result.airportMeetCostTry).toBe(AIRPORT_MEET_COST_EUR * DEFAULT_EUR_TRY_RATE)
    expect(result.passengerKm).toBe(65)
    expect(result.vehicleKm).toBe(130)
    expect(result.vehicleCostTry).toBe(130 * DEFAULT_KM_COST_TRY)
    expect(result.netProfitTry).toBe(2800)
  })

  test('splits round-trip income and counts each realized leg separately', () => {
    const booking = {
      ...baseBooking,
      trip_type: 'round_trip',
      price_eur: 200,
      return_date: '2026-08-05',
    }
    const settings = {
      '2026-08': { km_cost_try: 20, eur_try_rate: 40, advertising_expense_try: 500 },
    }
    const result = calculateProfitLossMetrics([booking], '2026-08', '2026-08-07', settings)

    expect(result.completedLegs).toBe(2)
    expect(result.incomeEur).toBe(200)
    expect(result.airportMeetCostTry).toBe(5 * 40)
    expect(result.vehicleKm).toBe(260)
    expect(result.vehicleCostTry).toBe(5200)
    expect(result.advertisingExpenseTry).toBe(500)
    expect(result.netProfitTry).toBe(2100)
  })

  test('excludes cancelled, future, and out-of-period legs', () => {
    const cancelled = { ...baseBooking, id: 'cancelled', status: 'cancelled' }
    const future = { ...baseBooking, id: 'future', pickup_date: '2026-08-20' }
    const old = { ...baseBooking, id: 'old', pickup_date: '2026-07-20' }
    const result = calculateProfitLossMetrics([cancelled, future, old], '2026-08', '2026-08-07')

    expect(result.completedLegs).toBe(0)
    expect(result.incomeEur).toBe(0)
  })

  test('reports routes with no fixed distance instead of understating their cost silently', () => {
    const custom = {
      ...baseBooking,
      pickup_location: 'private_address',
      dropoff_location: 'airport',
    }
    const result = calculateProfitLossMetrics([custom], '2026-08', '2026-08-07')

    expect(result.completedLegs).toBe(1)
    expect(result.unresolvedLegs).toHaveLength(1)
    expect(result.unresolvedLegs[0].leg).toBe('outbound')
    expect(result.incomeEur).toBe(100)
  })

  test('uses a manual one-way distance for an otherwise unresolved leg', () => {
    const custom = {
      ...baseBooking,
      pickup_location: 'private_address',
      dropoff_location: 'airport',
    }
    const overrides = new Map([
      ['booking-1:outbound', { distance_km: 42.5 }],
    ])
    const result = calculateProfitLossMetrics([custom], '2026-08', '2026-08-07', {}, overrides)

    expect(result.unresolvedLegs).toHaveLength(0)
    expect(result.passengerKm).toBe(42.5)
    expect(result.vehicleKm).toBe(85)
    expect(result.vehicleCostTry).toBe(85 * DEFAULT_KM_COST_TRY)
    expect(result.resolvedLegs[0].distanceSource).toBe('manual')
  })

  test('does not add airport meet cost when the trip does not start at the airport', () => {
    const hotelPickup = {
      ...baseBooking,
      pickup_location: 'side',
      dropoff_location: 'airport',
    }

    const result = calculateProfitLossMetrics([hotelPickup], '2026-08', '2026-08-07')

    expect(result.airportMeetCostEur).toBe(0)
    expect(result.airportMeetCostTry).toBe(0)
  })

  test('keeps outbound and return manual distances separate', () => {
    const custom = {
      ...baseBooking,
      trip_type: 'round_trip',
      return_date: '2026-08-05',
      pickup_location: 'private_address',
      dropoff_location: 'airport',
    }
    const overrides = {
      'booking-1:outbound': { distance_km: 40 },
      'booking-1:return': { distance_km: 45 },
    }
    const result = calculateProfitLossMetrics([custom], '2026-08', '2026-08-07', {}, overrides)

    expect(result.unresolvedLegs).toHaveLength(0)
    expect(result.resolvedLegs.map(leg => [leg.leg, leg.oneWayKm])).toEqual([
      ['outbound', 40],
      ['return', 45],
    ])
    expect(result.vehicleKm).toBe(170)
  })

  test('allocates daily chauffeur income by day and uses actual kilometres without adding an empty return', () => {
    const daily = {
      ...baseBooking,
      trip_type: 'daily_chauffeur', dropoff_location: null, pickup_date: '2026-08-01',
      service_end_date: '2026-08-02', daily_rate_eur: 150, price_eur: 300,
      chauffeur_hire_days: [
        { day_number: 1, service_date: '2026-08-01', status: 'completed', distance_km: 120, fuel_amount_eur: 30 },
        { day_number: 2, service_date: '2026-08-02', status: 'completed', distance_km: 80, fuel_amount_eur: 20 },
      ],
    }
    const result = calculateProfitLossMetrics([daily], '2026-08', '2026-08-07')

    expect(result.incomeEur).toBe(300)
    expect(result.vehicleKm).toBe(200)
    expect(result.vehicleCostTry).toBe(200 * DEFAULT_KM_COST_TRY)
    expect(result.missingDailyDistanceCount).toBe(0)
  })

  test('uses each month settings when all periods are combined', () => {
    const july = { ...baseBooking, id: 'july', pickup_date: '2026-07-20' }
    const august = { ...baseBooking, id: 'august', pickup_date: '2026-08-01' }
    const settings = {
      '2026-07': { km_cost_try: 10, eur_try_rate: 40, advertising_expense_try: 100 },
      '2026-08': { km_cost_try: 20, eur_try_rate: 50, advertising_expense_try: 200 },
    }
    const result = calculateProfitLossMetrics([july, august], 'all', '2026-08-07', settings)

    expect(result.incomeTry).toBe(9000)
    expect(result.vehicleCostTry).toBe(3900)
    expect(result.advertisingExpenseTry).toBe(300)
    expect(result.airportMeetCostTry).toBe(450)
    expect(result.netProfitTry).toBe(4350)
  })
})
