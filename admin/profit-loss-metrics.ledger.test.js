import { describe, test, expect } from 'vitest'
import { calculateLedgerForRange } from './profit-loss-metrics.js'

const settings = new Map([['2026-08', { period_month: '2026-08-01', km_cost_try: 15, eur_try_rate: 50, advertising_expense_try: 4500 }]])
const bookings = [
  { id: '1', booking_ref: 'A1', trip_type: 'one_way', pickup_date: '2026-08-18', pickup_location: 'AYT', dropoff_location: 'Belek', price_eur: 100, service_cost_mode: 'no_cost', status: 'completed' },
  { id: '2', booking_ref: 'A2', trip_type: 'one_way', pickup_date: '2026-08-19', pickup_location: 'AYT', dropoff_location: 'Side', price_eur: 100, service_cost_mode: 'no_cost', status: 'completed' },
  // out of range (before start) — must be excluded
  { id: '3', booking_ref: 'A3', trip_type: 'one_way', pickup_date: '2026-08-01', pickup_location: 'AYT', dropoff_location: 'Kemer', price_eur: 100, service_cost_mode: 'no_cost', status: 'completed' },
]

describe('calculateLedgerForRange', () => {
  const opts = { startDate: '2026-08-18', endDate: '2026-08-31', today: '2026-09-01', settingsByMonth: settings, ratesByDate: new Map() }

  test('sadece aralıktaki ayakları döner', () => {
    const l = calculateLedgerForRange(bookings, opts)
    const refs = [...l.resolvedLegs, ...l.unresolvedLegs].map(x => x.bookingRef).sort()
    expect(refs).toEqual(['A1', 'A2'])
  })

  test('her ayakta per-leg reklam var, toplamı aralık reklamına eşit', () => {
    const l = calculateLedgerForRange(bookings, opts)
    const legs = [...l.resolvedLegs, ...l.unresolvedLegs]
    const sum = legs.reduce((t, x) => t + (x.advertisingPerLegTry ?? 0), 0)
    expect(sum).toBeCloseTo(l.advertisingExpenseTry, 2)
    legs.forEach(x => expect(x.advertisingPerLegTry).toBeGreaterThan(0))
  })

  test('bacak neti reklam dahil; dönem neti bacak netleri toplamı', () => {
    const l = calculateLedgerForRange(bookings, opts)
    const leg = l.resolvedLegs[0]
    expect(leg.netProfitTry).toBeCloseTo(leg.revenueTry - (leg.advertisingPerLegTry ?? 0), 2)
    const legSum = l.resolvedLegs.reduce((t, x) => t + x.netProfitTry, 0)
    expect(legSum).toBeCloseTo(l.netProfitTry, 2)
  })

  test('KPI totalleri döner', () => {
    const l = calculateLedgerForRange(bookings, opts)
    expect(l.incomeEur).toBeGreaterThan(0)
    expect(l).toHaveProperty('totalExpenseTry')
    expect(l).toHaveProperty('netProfitEur')
    expect(l).toHaveProperty('profitMargin')
    expect(l.completedLegs).toBe(2)
  })
})
