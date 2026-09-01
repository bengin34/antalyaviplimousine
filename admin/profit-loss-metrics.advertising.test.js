import { describe, test, expect } from 'vitest'
import { attachAdvertisingPerLeg, calculateProfitLossMetrics } from './profit-loss-metrics.js'

describe('attachAdvertisingPerLeg', () => {
  test('reklamı bacaklara eşit böler, toplam korunur', () => {
    const legs = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    const out = attachAdvertisingPerLeg(legs, { advertisingExpenseEur: 90, advertisingExpenseTry: 4500 })
    expect(out.map(l => l.advertisingPerLegEur)).toEqual([30, 30, 30])
    const sumEur = out.reduce((t, l) => t + l.advertisingPerLegEur, 0)
    expect(sumEur).toBeCloseTo(90, 2)
    const sumTry = out.reduce((t, l) => t + l.advertisingPerLegTry, 0)
    expect(sumTry).toBeCloseTo(4500, 2)
  })

  test('kuruş artığı ilk bacaklara dağıtılır, toplam bozulmaz', () => {
    const legs = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    const out = attachAdvertisingPerLeg(legs, { advertisingExpenseEur: 100, advertisingExpenseTry: 1000 })
    const sumEur = out.reduce((t, l) => t + l.advertisingPerLegEur, 0)
    expect(sumEur).toBeCloseTo(100, 2)
    out.forEach(l => expect(l.advertisingPerLegEur).toBeGreaterThan(0))
  })

  test('0 bacak → hata yok, boş dizi döner', () => {
    expect(attachAdvertisingPerLeg([], { advertisingExpenseEur: 90, advertisingExpenseTry: 4500 })).toEqual([])
  })

  test('0 reklam → per-leg 0', () => {
    const out = attachAdvertisingPerLeg([{ id: 'a' }], { advertisingExpenseEur: 0, advertisingExpenseTry: 0 })
    expect(out[0].advertisingPerLegEur).toBe(0)
    expect(out[0].advertisingPerLegTry).toBe(0)
  })
})

describe('calculateProfitLossMetrics per-leg reklam', () => {
  const settings = new Map([['2026-08', { period_month: '2026-08-01', km_cost_try: 15, eur_try_rate: 50, advertising_expense_try: 4500 }]])
  const bookings = [
    { id: '1', booking_ref: 'A1', trip_type: 'one_way', pickup_date: '2026-08-10', pickup_location: 'AYT', dropoff_location: 'Belek', price_eur: 100, service_cost_mode: 'no_cost', status: 'completed' },
    { id: '2', booking_ref: 'A2', trip_type: 'one_way', pickup_date: '2026-08-11', pickup_location: 'AYT', dropoff_location: 'Side', price_eur: 100, service_cost_mode: 'no_cost', status: 'completed' },
  ]

  test('her bacakta advertisingPerLegTry var ve toplamı dönem reklamına eşit', () => {
    const m = calculateProfitLossMetrics(bookings, '2026-08', '2026-09-01', settings, new Map())
    const legs = [...m.resolvedLegs, ...m.unresolvedLegs]
    const sum = legs.reduce((t, l) => t + (l.advertisingPerLegTry ?? 0), 0)
    expect(sum).toBeCloseTo(m.advertisingExpenseTry, 2)
    legs.forEach(l => expect(l.advertisingPerLegTry).toBeGreaterThan(0))
  })

  test('bacak net kârı reklam payını düşer', () => {
    const m = calculateProfitLossMetrics(bookings, '2026-08', '2026-09-01', settings, new Map())
    const leg = m.resolvedLegs[0]
    const expected = leg.revenueTry - (leg.advertisingPerLegTry ?? 0)
    expect(leg.netProfitTry).toBeCloseTo(expected, 2)
  })

  test('dönem net kârı bacak netlerinin toplamına eşit', () => {
    const m = calculateProfitLossMetrics(bookings, '2026-08', '2026-09-01', settings, new Map())
    const legSum = m.resolvedLegs.reduce((t, l) => t + l.netProfitTry, 0)
    expect(legSum).toBeCloseTo(m.netProfitTry, 2)
  })
})
