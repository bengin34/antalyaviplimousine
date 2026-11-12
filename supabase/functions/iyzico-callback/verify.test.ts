import { describe, expect, it } from 'vitest'
import { paymentMatchesBooking } from './verify'

const booking = { id: 'b-1', booking_ref: 'AVL-1', price_eur: 50 }
const good = {
  status: 'success',
  paymentStatus: 'SUCCESS',
  conversationId: 'b-1',
  basketId: 'AVL-1',
  token: 't-1',
  currency: 'EUR',
  price: '50.00',
  paidPrice: '50.00',
}
const check = (over = {}, token = 't-1', sig = true) =>
  paymentMatchesBooking({ ...good, ...over }, booking, token, sig)

describe('paymentMatchesBooking', () => {
  it('accepts a matching payment', () => expect(check()).toBe(true))
  it('accepts price "50" vs 50.00', () => {
    expect(check({ price: '50', paidPrice: '50' })).toBe(true)
  })
  it.each([
    ['basketId', { basketId: 'AVL-2' }],
    ['price', { price: '49.00' }],
    ['paidPrice', { paidPrice: '49.00' }],
    ['currency', { currency: 'TRY' }],
    ['paymentStatus', { paymentStatus: 'FAILURE' }],
    ['status', { status: 'failure' }],
    ['conversationId', { conversationId: 'b-2' }],
  ])('rejects wrong %s', (_n, over) => expect(check(over)).toBe(false))
  it('rejects bad signature', () => expect(check({}, 't-1', false)).toBe(false))
  it('rejects token mismatch', () => expect(check({}, 't-2')).toBe(false))
})
