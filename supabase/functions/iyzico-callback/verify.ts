// Pure payment-vs-booking check (no Deno imports so vitest can run it).
// Same 2-decimal formatting as `formatPrice` in ../_shared/iyzico.ts.
const price = (value: unknown) => Number(value).toFixed(2)

export interface IyzicoPayment {
  status?: unknown
  paymentStatus?: unknown
  conversationId?: unknown
  basketId?: unknown
  token?: unknown
  currency?: unknown
  price?: unknown
  paidPrice?: unknown
}

export interface BookingForPayment {
  id: string
  booking_ref: string
  price_eur: number | string
}

export const paymentMatchesBooking = (
  payment: IyzicoPayment,
  booking: BookingForPayment,
  token: string,
  signatureIsValid: boolean
): boolean => {
  const expectedPrice = price(booking.price_eur)
  return (
    payment.status === 'success' &&
    payment.paymentStatus === 'SUCCESS' &&
    signatureIsValid &&
    String(payment.conversationId) === booking.id &&
    String(payment.basketId) === booking.booking_ref &&
    String(payment.token) === token &&
    String(payment.currency) === 'EUR' &&
    price(payment.price) === expectedPrice &&
    price(payment.paidPrice) === expectedPrice
  )
}
