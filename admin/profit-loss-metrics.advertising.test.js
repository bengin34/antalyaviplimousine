import { describe, test, expect } from 'vitest'
import {
  advertisingPerLegRate,
  attachAdvertisingPerLeg,
  calculateLedgerForRange,
  calculateProfitDistribution,
  calculateProfitLossMetrics,
} from './profit-loss-metrics.js'

const settings = new Map([
  ['2026-07', { period_month: '2026-07-01', km_cost_try: 15, eur_try_rate: 50, advertising_expense_try: 3000 }],
  ['2026-08', { period_month: '2026-08-01', km_cost_try: 15, eur_try_rate: 50, advertising_expense_try: 4500 }],
])

function transfer(id, date, priceEur = 100) {
  return {
    id,
    booking_ref: `A${id}`,
    trip_type: 'one_way',
    pickup_date: date,
    pickup_location: 'AYT',
    dropoff_location: 'Belek',
    price_eur: priceEur,
    service_cost_mode: 'no_cost',
    status: 'completed',
  }
}

describe('advertisingPerLegRate', () => {
  test('bugüne kadarki tüm reklamı bugüne kadarki tüm seyahate böler', () => {
    const rate = advertisingPerLegRate(settings, 30, '2026-09-01')
    // (3000 + 4500) / 30 = 250 ₺, (60 + 90) / 30 = 5 €
    expect(rate.perLegTry).toBe(250)
    expect(rate.perLegEur).toBe(5)
    expect(rate.poolTry).toBe(7500)
    expect(rate.legCount).toBe(30)
  })

  test('gelecek aylara girilmiş reklam bütçesi havuza girmez', () => {
    const withFuture = new Map(settings).set('2026-12', {
      period_month: '2026-12-01', km_cost_try: 15, eur_try_rate: 50, advertising_expense_try: 99000,
    })
    expect(advertisingPerLegRate(withFuture, 30, '2026-09-01').poolTry).toBe(7500)
  })

  test('içinde bulunulan ay havuza dahildir', () => {
    expect(advertisingPerLegRate(settings, 30, '2026-08-05').poolTry).toBe(7500)
  })

  test('bölünmeyen havuzda her seyahat aynı kuruşu taşır', () => {
    // Eşit maliyet, artık kuruşun bacaklara serpiştirilmesinden önemlidir:
    // 100 / 3 → her seyahat 33,33 ₺; dönem toplamı 99,99 ₺ olur.
    const rate = advertisingPerLegRate({ '2026-08': { advertising_expense_try: 100, eur_try_rate: 50 } }, 3, '2026-09-01')
    expect(rate.perLegTry).toBe(33.33)
  })

  test('hiç seyahat yoksa seyahat başına reklam sıfırdır', () => {
    const rate = advertisingPerLegRate(settings, 0, '2026-09-01')
    expect(rate.perLegTry).toBe(0)
    expect(rate.perLegEur).toBe(0)
  })
})

describe('attachAdvertisingPerLeg', () => {
  test('her bacağa aynı seyahat başı reklam payını yazar', () => {
    const out = attachAdvertisingPerLeg([{ id: 'a' }, { id: 'b' }, { id: 'c' }], { perLegEur: 5, perLegTry: 250 })
    expect(out.map(l => l.advertisingPerLegTry)).toEqual([250, 250, 250])
    expect(out.map(l => l.advertisingPerLegEur)).toEqual([5, 5, 5])
  })

  test('0 bacak → hata yok, boş dizi döner', () => {
    expect(attachAdvertisingPerLeg([], { perLegEur: 5, perLegTry: 250 })).toEqual([])
  })

  test('0 reklam → per-leg 0', () => {
    const out = attachAdvertisingPerLeg([{ id: 'a' }], { perLegEur: 0, perLegTry: 0 })
    expect(out[0].advertisingPerLegEur).toBe(0)
    expect(out[0].advertisingPerLegTry).toBe(0)
  })
})

describe('calculateLedgerForRange reklam dağıtımı', () => {
  // Temmuz'da 1, Ağustos'ta 3 seyahat: toplam 4 bacak, havuz 7500 ₺ → 1875 ₺/seyahat
  const bookings = [
    transfer('1', '2026-07-20'),
    transfer('2', '2026-08-10'),
    transfer('3', '2026-08-11'),
    transfer('4', '2026-08-12'),
  ]
  const today = '2026-09-01'

  test('aralığın gün sayısı değil, içindeki seyahat sayısı reklamı belirler', () => {
    const oneDay = calculateLedgerForRange(bookings, {
      startDate: '2026-08-10', endDate: '2026-08-10', today, settingsByMonth: settings,
    })
    expect(oneDay.completedLegs).toBe(1)
    expect(oneDay.advertisingExpenseTry).toBe(1875)

    const threeDays = calculateLedgerForRange(bookings, {
      startDate: '2026-08-10', endDate: '2026-08-12', today, settingsByMonth: settings,
    })
    expect(threeDays.completedLegs).toBe(3)
    expect(threeDays.advertisingExpenseTry).toBe(1875 * 3)
  })

  test('seyahatsiz uzun aralık reklam yüklenmez', () => {
    const empty = calculateLedgerForRange(bookings, {
      startDate: '2026-08-20', endDate: '2026-08-31', today, settingsByMonth: settings,
    })
    expect(empty.completedLegs).toBe(0)
    expect(empty.advertisingExpenseTry).toBe(0)
  })

  test('tüm zamanlar toplamı reklam havuzunu verir', () => {
    const all = calculateLedgerForRange(bookings, {
      startDate: '2026-07-01', endDate: today, today, settingsByMonth: settings,
    })
    expect(all.advertisingExpenseTry).toBe(7500)
  })

  test('dönem reklam toplamı bacak paylarının toplamına eşittir', () => {
    const ledger = calculateLedgerForRange(bookings, {
      startDate: '2026-08-01', endDate: '2026-08-31', today, settingsByMonth: settings,
    })
    const sum = [...ledger.resolvedLegs, ...ledger.unresolvedLegs]
      .reduce((total, leg) => total + (leg.advertisingPerLegTry ?? 0), 0)
    expect(sum).toBeCloseTo(ledger.advertisingExpenseTry, 2)
  })

  test('includeAdvertising: false → reklam gideri ve bacak payları sıfır', () => {
    const withAds = calculateLedgerForRange(bookings, {
      startDate: '2026-08-01', endDate: '2026-08-31', today, settingsByMonth: settings,
    })
    const withoutAds = calculateLedgerForRange(bookings, {
      startDate: '2026-08-01', endDate: '2026-08-31', today, settingsByMonth: settings, includeAdvertising: false,
    })
    expect(withoutAds.advertisingExpenseTry).toBe(0)
    expect(withoutAds.advertisingExpenseEur).toBe(0)
    withoutAds.resolvedLegs.forEach(leg => expect(leg.advertisingPerLegTry).toBe(0))
    expect(withoutAds.totalExpenseTry).toBeCloseTo(withAds.totalExpenseTry - withAds.advertisingExpenseTry, 2)
    expect(withoutAds.netProfitTry).toBeCloseTo(withAds.netProfitTry + withAds.advertisingExpenseTry, 2)
  })
})

describe('calculateProfitDistribution reklam toggle', () => {
  const bookings = [transfer('1', '2026-08-10'), transfer('2', '2026-08-11')]
  const base = {
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    today: '2026-09-01',
    settingsByMonth: settings,
    operationsSharePct: 50,
  }

  test('reklam seyahat başına yüklenir, gün oranlanmaz', () => {
    const metrics = calculateProfitDistribution(bookings, base)
    expect(metrics.advertisingExpenseTry).toBe(7500)
  })

  test('includeAdvertising: false → dağıtılacak net kâr reklamsız', () => {
    const withAds = calculateProfitDistribution(bookings, base)
    const withoutAds = calculateProfitDistribution(bookings, { ...base, includeAdvertising: false })
    expect(withoutAds.advertisingExpenseTry).toBe(0)
    expect(withoutAds.netProfitTry).toBeCloseTo(withAds.netProfitTry + withAds.advertisingExpenseTry, 2)
    expect(withoutAds.shares.operationsAmountTry).toBeGreaterThan(withAds.shares.operationsAmountTry)
  })
})

describe('calculateProfitLossMetrics reklam dağıtımı', () => {
  const bookings = [transfer('1', '2026-07-20'), transfer('2', '2026-08-10'), transfer('3', '2026-08-11')]

  test('ay dönemi, o aydaki seyahat sayısı kadar pay taşır', () => {
    // 3 bacak, havuz 7500 → 2500 ₺/seyahat; Ağustos 2 bacak → 5000 ₺
    const m = calculateProfitLossMetrics(bookings, '2026-08', '2026-09-01', settings, new Map())
    expect(m.advertisingExpenseTry).toBe(5000)
    const legs = [...m.resolvedLegs, ...m.unresolvedLegs]
    legs.forEach(leg => expect(leg.advertisingPerLegTry).toBe(2500))
  })

  test('dönem net kârı bacak netlerinin toplamına eşit', () => {
    const m = calculateProfitLossMetrics(bookings, '2026-08', '2026-09-01', settings, new Map())
    const legSum = m.resolvedLegs.reduce((total, leg) => total + leg.netProfitTry, 0)
    expect(legSum).toBeCloseTo(m.netProfitTry, 2)
  })

  test('includeAdvertising: false → reklam sıfır', () => {
    const m = calculateProfitLossMetrics(bookings, '2026-08', '2026-09-01', settings, new Map(), { includeAdvertising: false })
    expect(m.advertisingExpenseTry).toBe(0)
    m.resolvedLegs.forEach(leg => expect(leg.advertisingPerLegTry).toBe(0))
  })
})
