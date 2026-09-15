import { describe, expect, test } from 'vitest'
import { buildFunnel, formatRate, sourceRevenue, type FunnelSummary } from './funnel'

const summary = (overrides: Partial<FunnelSummary> = {}): FunnelSummary => ({
  days: 30,
  funnel: [
    { event: 'landing_view', sessions: 1000, events: 2400 },
    { event: 'price_shown', sessions: 300, events: 420 },
    { event: 'booking_started', sessions: 90, events: 110 },
    { event: 'booking_submitted', sessions: 30, events: 31 },
  ],
  abandoned: [],
  unavailable: [],
  contact: [],
  flight_failures: 0,
  sources: [],
  ...overrides,
})

describe('huni', () => {
  test('adımları sabit sırada verir, alfabetik değil', () => {
    expect(buildFunnel(summary()).map(step => step.event)).toEqual([
      'landing_view', 'price_shown', 'booking_started', 'booking_submitted',
    ])
  })

  test('her adımı hem bir öncekine hem girişe oranlar', () => {
    const [landing, price, started, submitted] = buildFunnel(summary())

    expect(landing.stepRate).toBeNull() // ilk adımın öncesi yok
    expect(landing.shareOfTop).toBe(1)
    expect(price.stepRate).toBeCloseTo(0.3)
    expect(started.stepRate).toBeCloseTo(0.3)
    expect(submitted.stepRate).toBeCloseTo(1 / 3)
    expect(submitted.shareOfTop).toBeCloseTo(0.03)
  })

  test('hiç veri yokken sıfır gösterir, NaN değil', () => {
    const steps = buildFunnel(summary({ funnel: [] }))

    expect(steps.every(step => step.sessions === 0)).toBe(true)
    expect(steps.every(step => step.shareOfTop === null)).toBe(true)
    expect(steps.every(step => Number.isNaN(step.stepRate ?? 0))).toBe(false)
  })

  test('bir adım hiç olmamışsa sonrası bölme hatası vermez', () => {
    const steps = buildFunnel(summary({
      funnel: [
        { event: 'landing_view', sessions: 50, events: 50 },
        { event: 'booking_submitted', sessions: 2, events: 2 },
      ],
    }))

    expect(steps[1].sessions).toBe(0)
    expect(steps[2].sessions).toBe(0)
    // Payda sıfır: oran hesaplanamaz, uydurulmaz.
    expect(steps[3].stepRate).toBeNull()
    expect(steps[3].shareOfTop).toBeCloseTo(0.04)
  })

  test('oranı Türkçe yüzde olarak yazar, bilinmeyeni tire ile', () => {
    expect(formatRate(0.305)).toBe('%30,5')
    expect(formatRate(1)).toBe('%100')
    expect(formatRate(null)).toBe('—')
  })
})

describe('kaynak bazlı ciro', () => {
  test('cirosu en yüksek kaynağı başa alır ve toplamı verir', () => {
    const { rows, totalRevenue, totalBookings } = sourceRevenue(summary({
      sources: [
        { source: 'direct', bookings: 4, revenue_eur: 300 },
        { source: 'google-ads', bookings: 6, revenue_eur: 900 },
      ],
    }))

    expect(rows[0].source).toBe('google-ads')
    expect(rows[0].share).toBeCloseTo(0.75)
    expect(totalRevenue).toBe(1200)
    expect(totalBookings).toBe(10)
  })

  test('ciro yokken pay hesaplamaz', () => {
    const { rows, totalRevenue } = sourceRevenue(summary({
      sources: [{ source: 'direct', bookings: 1, revenue_eur: 0 }],
    }))

    expect(totalRevenue).toBe(0)
    expect(rows[0].share).toBeNull()
  })

  test('sayı olarak gelmeyen ciroyu sıfır sayar', () => {
    const { totalRevenue } = sourceRevenue(summary({
      sources: [{ source: 'direct', bookings: 1, revenue_eur: null as unknown as number }],
    }))

    expect(totalRevenue).toBe(0)
  })
})
