import { describe, test, expect } from 'vitest'
import { attachAdvertisingPerLeg } from './profit-loss-metrics.js'

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
