import { describe, expect, it } from 'vitest'
import { cardPaymentAllowed, isPaymentMethod } from './payment'

describe('isPaymentMethod', () => {
  it('accepts only cash and card', () => {
    expect(isPaymentMethod('cash')).toBe(true)
    expect(isPaymentMethod('card')).toBe(true)
    expect(isPaymentMethod('crypto')).toBe(false)
    expect(isPaymentMethod(undefined)).toBe(false)
  })
})

describe('cardPaymentAllowed', () => {
  const fixed = { priceEur: 50, needsOperator: false, specialProduct: false }

  it('allows a transfer with a final price', () => {
    expect(cardPaymentAllowed(fixed)).toBe(true)
  })

  it('refuses a booking the operator still has to quote', () => {
    expect(cardPaymentAllowed({ ...fixed, needsOperator: true })).toBe(false)
  })

  it('refuses daily hire, COP31 and Land of Legends', () => {
    expect(cardPaymentAllowed({ ...fixed, specialProduct: true })).toBe(false)
  })

  it('refuses a zero or non-finite price', () => {
    expect(cardPaymentAllowed({ ...fixed, priceEur: 0 })).toBe(false)
    expect(cardPaymentAllowed({ ...fixed, priceEur: Number.NaN })).toBe(false)
  })
})
