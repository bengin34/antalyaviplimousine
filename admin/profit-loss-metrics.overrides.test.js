import { describe, test, expect } from 'vitest'
import { calculateProfitLossMetrics } from './profit-loss-metrics.js'

const settings = { '2026-08': { eur_try_rate: 50, advertising_expense_try: 0 } }
const today = '2026-08-20'

function booking(extra = {}) {
  return {
    id: 'booking-1',
    booking_ref: 'A1',
    trip_type: 'one_way',
    pickup_date: '2026-08-10',
    pickup_location: 'belek',
    dropoff_location: 'side',
    price_eur: 100,
    service_cost_mode: 'own_vehicle',
    own_vehicle_profit_eur: 20,
    return_own_vehicle_profit_eur: 20,
    status: 'completed',
    ...extra,
  }
}

function metricsFor(extra) {
  return calculateProfitLossMetrics([booking(extra)], '2026-08', today, settings)
}

describe('ayak geliri elle düzeltilebilir', () => {
  test('gelir alanı boşken rezervasyon fiyatı kullanılır', () => {
    expect(metricsFor().incomeEur).toBe(100)
  })

  test('tek yön ayağında girilen gelir fiyatın yerine geçer', () => {
    // Müşteri 100 € yerine 80 € ödedi: fiyat değil defterdeki gelir düzelir.
    expect(metricsFor({ revenue_eur: 80 }).incomeEur).toBe(80)
  })

  test('sıfır gelir de geçerlidir', () => {
    expect(metricsFor({ revenue_eur: 0 }).incomeEur).toBe(0)
  })

  test('gidiş-dönüşte her ayak kendi gelirini taşır', () => {
    const result = calculateProfitLossMetrics([booking({
      trip_type: 'round_trip',
      price_eur: 200,
      return_date: '2026-08-12',
      revenue_eur: 120,
      return_revenue_eur: 60,
    })], '2026-08', today, settings)

    expect(result.completedLegs).toBe(2)
    expect(result.resolvedLegs.map(leg => leg.revenueEur)).toEqual([120, 60])
    expect(result.incomeEur).toBe(180)
  })

  test('gidiş-dönüşte yalnız bir ayak düzeltilirse diğeri bölüşümü korur', () => {
    const result = calculateProfitLossMetrics([booking({
      trip_type: 'round_trip',
      price_eur: 200,
      return_date: '2026-08-12',
      return_revenue_eur: 60,
    })], '2026-08', today, settings)

    expect(result.resolvedLegs.map(leg => leg.revenueEur)).toEqual([100, 60])
  })

  test('geçersiz gelir girdisi bölüşüme geri döner', () => {
    expect(metricsFor({ revenue_eur: '' }).incomeEur).toBe(100)
    expect(metricsFor({ revenue_eur: null }).incomeEur).toBe(100)
    expect(metricsFor({ revenue_eur: -5 }).incomeEur).toBe(100)
  })
})

describe('karşılama kararı elle geçersiz kılınabilir', () => {
  const airport = { pickup_location: 'airport', dropoff_location: 'belek' }

  test('override yokken konum kuralı işler', () => {
    expect(metricsFor(airport).airportMeetCostTry).toBe(250)
    expect(metricsFor({ ...airport, airport_meet_fee_applies: false }).parkingCostTry).toBeGreaterThan(0)
    // Havalimanı dışı ayak, varsayılan TRUE bayrağına rağmen gider doğurmaz.
    expect(metricsFor().airportMeetCostTry).toBe(0)
    expect(metricsFor().parkingCostTry).toBe(0)
  })

  test('havalimanı dışı ayakta karşılama elle açılabilir', () => {
    const result = metricsFor({ meet_fee_override: true })
    expect(result.airportMeetCostTry).toBe(250)
    expect(result.parkingCostTry).toBe(0)
  })

  test('havalimanı dışı ayakta otopark elle açılabilir', () => {
    const result = metricsFor({ meet_fee_override: false, airport_meet_fee_parking_hours: 3 })
    expect(result.airportMeetCostTry).toBe(0)
    expect(result.parkingCostTry).toBeGreaterThan(0)
  })

  test('havalimanı ayağında karşılama elle kapatılabilir', () => {
    const result = metricsFor({ ...airport, meet_fee_override: false })
    expect(result.airportMeetCostTry).toBe(0)
    expect(result.parkingCostTry).toBeGreaterThan(0)
  })

  test('dönüş ayağının kararı gidişi etkilemez', () => {
    const result = calculateProfitLossMetrics([booking({
      trip_type: 'round_trip',
      price_eur: 200,
      return_date: '2026-08-12',
      return_meet_fee_override: true,
    })], '2026-08', today, settings)

    expect(result.resolvedLegs.map(leg => leg.airportMeetCostTry)).toEqual([0, 250])
  })
})
