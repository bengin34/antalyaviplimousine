import { describe, expect, test } from 'vitest'
import {
  AIRPORT_MEET_COST_EUR,
  allocatedAdvertisingForRange,
  buildProfitDistributionSnapshot,
  calculateProfitDistribution,
  calculateProfitLossMetrics,
  DEFAULT_EUR_TRY_RATE,
  DEFAULT_KM_COST_TRY,
  fixedRouteDistanceKm,
  splitProfit,
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
  service_cost_mode: 'own_vehicle',
  sold_transfer_cost_try: null,
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

  test('exposes vehicle cost in euros with normalized resolved leg metadata', () => {
    const settings = {
      '2026-08': { km_cost_try: 20, eur_try_rate: 40, advertising_expense_try: 500 },
    }

    const result = calculateProfitLossMetrics([baseBooking], '2026-08', '2026-08-07', settings)

    expect(result.vehicleCostEur).toBe(65)
    expect(result.supplierCostEur).toBe(0)
    expect(result.resolvedLegs).toHaveLength(1)
    expect(result.resolvedLegs[0]).toMatchObject({
      bookingId: 'booking-1',
      leg: 'outbound',
      date: '2026-08-01',
      month: '2026-08',
      revenueEur: 100,
      revenueTry: 4000,
      vehicleCostTry: 2600,
    })
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
      manual_outbound_distance_km: 42.5,
    }
    const result = calculateProfitLossMetrics([custom], '2026-08', '2026-08-07')

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
      manual_outbound_distance_km: 40,
      manual_return_distance_km: 45,
    }
    const result = calculateProfitLossMetrics([custom], '2026-08', '2026-08-07')

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

  test('distinguishes missing daily chauffeur distance from an explicit zero', () => {
    const daily = {
      ...baseBooking,
      trip_type: 'daily_chauffeur',
      daily_rate_eur: 100,
      price_eur: 300,
      chauffeur_hire_days: [
        { day_number: 1, service_date: '2026-08-01', status: 'completed', distance_km: null },
        { day_number: 2, service_date: '2026-08-02', status: 'completed', distance_km: '' },
        { day_number: 3, service_date: '2026-08-03', status: 'completed', distance_km: 0 },
      ],
    }

    const result = calculateProfitLossMetrics([daily], '2026-08', '2026-08-07')

    expect(result.resolvedLegs.map(leg => leg.distanceSource)).toEqual([
      'daily-missing',
      'daily-missing',
      'daily-actual',
    ])
    expect(result.missingDailyDistanceCount).toBe(2)
  })

  test('uses entered total expense for sold transfers', () => {
    const soldTransfer = {
      ...baseBooking,
      service_cost_mode: 'sold_transfer',
      sold_transfer_cost_try: 3000,
    }
    const result = calculateProfitLossMetrics([soldTransfer], '2026-08', '2026-08-07')

    expect(result.vehicleKm).toBe(0)
    expect(result.vehicleCostTry).toBe(0)
    expect(result.supplierCostTry).toBe(3000)
    expect(result.airportMeetCostTry).toBe(0)
    expect(result.unresolvedLegs).toHaveLength(0)
  })

  test('splits sold transfer total expense across realized round-trip legs', () => {
    const booking = {
      ...baseBooking,
      trip_type: 'round_trip',
      price_eur: 200,
      return_date: '2026-08-05',
      service_cost_mode: 'sold_transfer',
      sold_transfer_cost_try: 4000,
    }
    const result = calculateProfitLossMetrics([booking], '2026-08', '2026-08-07')

    expect(result.completedLegs).toBe(2)
    expect(result.supplierCostTry).toBe(4000)
    expect(result.resolvedLegs.map(leg => leg.supplierCostTry)).toEqual([2000, 2000])
  })

  test('does not require route distance for sold transfers', () => {
    const custom = {
      ...baseBooking,
      pickup_location: 'private_address',
      dropoff_location: 'airport',
      service_cost_mode: 'sold_transfer',
      sold_transfer_cost_try: 1800,
    }
    const result = calculateProfitLossMetrics([custom], '2026-08', '2026-08-07')

    expect(result.unresolvedLegs).toHaveLength(0)
    expect(result.supplierCostTry).toBe(1800)
    expect(result.resolvedLegs[0].distanceSource).toBe('sold-transfer')
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

describe('allocatedAdvertisingForRange', () => {
  test('uses UTC calendar days for leap-year February', () => {
    const result = allocatedAdvertisingForRange('2028-02-10', '2028-02-20', {
      '2028-02': { advertising_expense_try: 290, eur_try_rate: 10 },
    })

    expect(result).toEqual({
      advertisingExpenseTry: 110,
      advertisingExpenseEur: 11,
      monthlyAllocations: {
        '2028-02': {
          startDate: '2028-02-10',
          endDate: '2028-02-20',
          advertisingExpenseTry: 110,
          advertisingExpenseEur: 11,
        },
      },
    })
  })

  test('allocates each intersected month independently', () => {
    const result = allocatedAdvertisingForRange('2026-01-30', '2026-02-02', {
      '2026-01': { advertising_expense_try: 310, eur_try_rate: 10 },
      '2026-02': { advertising_expense_try: 280, eur_try_rate: 20 },
    })

    expect(result.advertisingExpenseTry).toBe(40)
    expect(result.advertisingExpenseEur).toBe(3)
    expect(result.monthlyAllocations).toMatchObject({
      '2026-01': { advertisingExpenseTry: 20, advertisingExpenseEur: 2 },
      '2026-02': { advertisingExpenseTry: 20, advertisingExpenseEur: 1 },
    })
  })

  test('makes 31 one-day allocations reconcile exactly to August advertising', () => {
    const settings = {
      '2026-08': { advertising_expense_try: 100, eur_try_rate: 40 },
    }
    const total = Array.from({ length: 31 }, (_, index) => {
      const date = `2026-08-${String(index + 1).padStart(2, '0')}`
      return allocatedAdvertisingForRange(date, date, settings).advertisingExpenseTry
    }).reduce((sum, amount) => sum + amount, 0)

    expect(total).toBe(100)
  })

  test('excludes the cumulative allocation before a midmonth opening date', () => {
    const result = allocatedAdvertisingForRange('2026-08-16', '2026-08-31', {
      '2026-08': { advertising_expense_try: 310, eur_try_rate: 10 },
    })

    expect(result.advertisingExpenseTry).toBe(160)
  })
})

describe('splitProfit', () => {
  test('splits profit 50/50', () => {
    expect(splitProfit(100, 5000, 50)).toEqual({
      operationsSharePct: 50,
      vehicleOwnerSharePct: 50,
      operationsAmountEur: 50,
      vehicleOwnerAmountEur: 50,
      operationsAmountTry: 2500,
      vehicleOwnerAmountTry: 2500,
    })
  })

  test('supports a custom 60/40 split', () => {
    expect(splitProfit(100, 5000, 60)).toMatchObject({
      operationsSharePct: 60,
      vehicleOwnerSharePct: 40,
      operationsAmountEur: 60,
      vehicleOwnerAmountEur: 40,
    })
  })

  test('assigns the odd-cent remainder to the vehicle owner', () => {
    const result = splitProfit(0.01, 0.01, 50)

    expect(result.operationsAmountEur).toBe(0.01)
    expect(result.vehicleOwnerAmountEur).toBe(0)
    expect(result.operationsAmountEur + result.vehicleOwnerAmountEur).toBe(0.01)
  })

  test('reconciles a negative TRY reference while EUR remains positive', () => {
    const result = splitProfit(100, -33.33, 60)

    expect(result.operationsAmountTry).toBe(-20)
    expect(result.vehicleOwnerAmountTry).toBe(-13.33)
    expect(result.operationsAmountTry + result.vehicleOwnerAmountTry).toBe(-33.33)
  })

  test.each(['abc', -0.01, 100.01, 33.333])('rejects an invalid percentage: %s', percentage => {
    expect(() => splitProfit(100, 100, percentage)).toThrow(/percentage/i)
  })
})

describe('calculateProfitDistribution', () => {
  const settings = {
    '2026-08': { km_cost_try: 15, eur_try_rate: 50, advertising_expense_try: 0 },
  }
  const validOptions = {
    startDate: '2026-08-01',
    endDate: '2026-08-05',
    today: '2026-08-07',
    settingsByMonth: settings,
    operationsSharePct: 50,
  }

  test('calculates one-way income, all expense buckets, profit, and shares', () => {
    const result = calculateProfitDistribution([baseBooking], validOptions)

    expect(result).toMatchObject({
      startDate: '2026-08-01',
      endDate: '2026-08-05',
      incomeEur: 100,
      incomeTry: 5000,
      vehicleCostEur: 39,
      vehicleCostTry: 1950,
      supplierCostEur: 0,
      supplierCostTry: 0,
      airportMeetCostEur: 5,
      airportMeetCostTry: 250,
      advertisingExpenseEur: 0,
      advertisingExpenseTry: 0,
      totalExpenseEur: 44,
      totalExpenseTry: 2200,
      netProfitEur: 56,
      netProfitTry: 2800,
      realizedLegCount: 1,
      blockers: [],
      canDistribute: true,
    })
    expect(result.shares.operationsAmountEur + result.shares.vehicleOwnerAmountEur).toBe(56)
  })

  test('uses inclusive boundaries and includes only the in-range half of a round trip', () => {
    const roundTrip = {
      ...baseBooking,
      id: 'round-trip',
      trip_type: 'round_trip',
      price_eur: 200,
      pickup_date: '2026-08-01',
      return_date: '2026-08-05',
    }
    const result = calculateProfitDistribution([roundTrip], {
      ...validOptions,
      startDate: '2026-08-02',
    })

    expect(result.resolvedLegs.map(leg => `${leg.bookingId}:${leg.leg}`)).toEqual([
      'round-trip:return',
    ])
    expect(result.incomeEur).toBe(100)
    expect(result.vehicleCostTry).toBe(1950)
    expect(result.airportMeetCostEur).toBe(0)
  })

  test('calculates daily chauffeur legs from each service date', () => {
    const daily = {
      ...baseBooking,
      id: 'daily',
      trip_type: 'daily_chauffeur',
      price_eur: 300,
      daily_rate_eur: 150,
      chauffeur_hire_days: [
        { day_number: 1, service_date: '2026-08-01', status: 'completed', distance_km: 120 },
        { day_number: 2, service_date: '2026-08-06', status: 'completed', distance_km: 80 },
      ],
    }
    const result = calculateProfitDistribution([daily], validOptions)

    expect(result.resolvedLegs.map(leg => leg.leg)).toEqual(['day-1'])
    expect(result.incomeEur).toBe(150)
    expect(result.vehicleCostTry).toBe(1800)
  })

  test('excludes cancelled and future legs', () => {
    const cancelled = { ...baseBooking, id: 'cancelled', status: 'cancelled' }
    const future = { ...baseBooking, id: 'future', pickup_date: '2026-08-08' }
    const result = calculateProfitDistribution([cancelled, future], validOptions)

    expect(result.realizedLegCount).toBe(0)
    expect(result.incomeEur).toBe(0)
  })

  test('keeps revenue visible while an own-vehicle route is unresolved', () => {
    const unresolved = {
      ...baseBooking,
      pickup_location: 'private_address',
      dropoff_location: 'airport',
    }
    const result = calculateProfitDistribution([unresolved], validOptions)

    expect(result.incomeEur).toBe(100)
    expect(result.realizedLegCount).toBe(1)
    expect(result.blockers).toEqual([expect.objectContaining({ code: 'unresolved-route' })])
    expect(result.canDistribute).toBe(false)
  })

  test('blocks missing daily distance but accepts an explicit zero', () => {
    const daily = {
      ...baseBooking,
      trip_type: 'daily_chauffeur',
      price_eur: 200,
      daily_rate_eur: 100,
      chauffeur_hire_days: [
        { day_number: 1, service_date: '2026-08-01', status: 'completed', distance_km: null },
        { day_number: 2, service_date: '2026-08-02', status: 'completed', distance_km: 0 },
      ],
    }
    const result = calculateProfitDistribution([daily], validOptions)

    expect(result.incomeEur).toBe(200)
    expect(result.blockers).toEqual([expect.objectContaining({ code: 'daily-distance-missing', leg: 'day-1' })])
  })

  test.each([null, 'not-a-number', 0, -10])('blocks an invalid sold-transfer cost: %s', cost => {
    const soldTransfer = {
      ...baseBooking,
      service_cost_mode: 'sold_transfer',
      sold_transfer_cost_try: cost,
    }
    const result = calculateProfitDistribution([soldTransfer], validOptions)

    expect(result.incomeEur).toBe(100)
    expect(result.blockers).toEqual([expect.objectContaining({ code: 'supplier-cost-invalid' })])
    expect(result.canDistribute).toBe(false)
  })

  test.each([
    [{ endDate: '2026-08-07' }, 'end-date-not-closed'],
    [{ endDate: '2026-08-08' }, 'end-date-not-closed'],
    [{ startDate: '2026-08-06', endDate: '2026-08-05' }, 'invalid-date-range'],
    [{ startDate: '2026-02-30' }, 'invalid-date-range'],
  ])('returns a blocker instead of throwing for an invalid date range', (override, code) => {
    expect(() => calculateProfitDistribution([baseBooking], { ...validOptions, ...override })).not.toThrow()
    const result = calculateProfitDistribution([baseBooking], { ...validOptions, ...override })
    expect(result.blockers).toContainEqual(expect.objectContaining({ code }))
    expect(result.canDistribute).toBe(false)
  })

  test('converts invalid share input to a blocker instead of throwing', () => {
    const result = calculateProfitDistribution([baseBooking], {
      ...validOptions,
      operationsSharePct: 33.333,
    })

    expect(result.shares).toBeNull()
    expect(result.blockers).toContainEqual(expect.objectContaining({ code: 'invalid-share' }))
    expect(result.canDistribute).toBe(false)
  })

  test('keeps a loss open until a later profitable leg makes the same start distributable', () => {
    const loss = { ...baseBooking, id: 'loss', price_eur: 10, pickup_date: '2026-08-01' }
    const profit = { ...baseBooking, id: 'profit', price_eur: 100, pickup_date: '2026-08-02' }

    const firstDay = calculateProfitDistribution([loss, profit], {
      ...validOptions,
      endDate: '2026-08-01',
    })
    const throughSecondDay = calculateProfitDistribution([loss, profit], {
      ...validOptions,
      endDate: '2026-08-02',
    })

    expect(firstDay.netProfitEur).toBeLessThanOrEqual(0)
    expect(firstDay.canDistribute).toBe(false)
    expect(throughSecondDay.netProfitEur).toBeGreaterThan(0)
    expect(throughSecondDay.canDistribute).toBe(true)
  })

  test('uses positive EUR as the only profit gate even when TRY is negative', () => {
    const julyLoss = {
      ...baseBooking,
      id: 'july-loss',
      pickup_date: '2026-07-31',
      price_eur: 100,
      service_cost_mode: 'sold_transfer',
      sold_transfer_cost_try: 20000,
    }
    const augustProfit = {
      ...baseBooking,
      id: 'august-profit',
      pickup_date: '2026-08-01',
      price_eur: 300,
      service_cost_mode: 'sold_transfer',
      sold_transfer_cost_try: 1000,
    }
    const result = calculateProfitDistribution([julyLoss, augustProfit], {
      startDate: '2026-07-31',
      endDate: '2026-08-01',
      today: '2026-08-02',
      settingsByMonth: {
        '2026-07': { eur_try_rate: 100, advertising_expense_try: 0 },
        '2026-08': { eur_try_rate: 10, advertising_expense_try: 0 },
      },
      operationsSharePct: 50,
    })

    expect(result.netProfitEur).toBe(100)
    expect(result.netProfitTry).toBe(-8000)
    expect(result.canDistribute).toBe(true)
    expect(result.shares.operationsAmountTry + result.shares.vehicleOwnerAmountTry).toBe(-8000)
  })
})

describe('buildProfitDistributionSnapshot', () => {
  test('returns an immutable JSON-safe schema with stable leg keys and rounded DB values', () => {
    const booking = { ...baseBooking, price_eur: 100.005 }
    const settings = {
      '2026-08': { km_cost_try: 15, eur_try_rate: 50, advertising_expense_try: 100 },
    }
    const metrics = calculateProfitDistribution([booking], {
      startDate: '2026-08-01',
      endDate: '2026-08-01',
      today: '2026-08-02',
      settingsByMonth: settings,
      operationsSharePct: 50,
    })
    const snapshot = buildProfitDistributionSnapshot(metrics)
    const serialized = JSON.stringify(snapshot)

    expect(JSON.parse(serialized)).toEqual(snapshot)
    expect(snapshot).toMatchObject({
      schema_version: 1,
      period_start: '2026-08-01',
      period_end: '2026-08-01',
      operations_share_pct: 50,
      vehicle_owner_share_pct: 50,
      income_eur: 100.01,
      realized_leg_count: 1,
      monthly_settings: {
        '2026-08': { km_cost_try: 15, eur_try_rate: 50, advertising_expense_try: 100 },
      },
    })
    expect(snapshot.resolved_legs[0]).toMatchObject({
      key: 'booking-1:outbound',
      booking_id: 'booking-1',
      leg: 'outbound',
    })
    expect(snapshot.operations_amount_eur + snapshot.vehicle_owner_amount_eur).toBe(snapshot.net_profit_eur)

    booking.price_eur = 999
    settings['2026-08'].eur_try_rate = 999
    metrics.resolvedLegs[0].revenueEur = 999
    metrics.monthlySettingsSnapshot['2026-08'].eur_try_rate = 999
    metrics.shares.operationsAmountEur = 999

    expect(snapshot.income_eur).toBe(100.01)
    expect(snapshot.resolved_legs[0].revenue_eur).toBe(100.01)
    expect(snapshot.monthly_settings['2026-08'].eur_try_rate).toBe(50)
    expect(snapshot.operations_amount_eur).not.toBe(999)
  })
})
