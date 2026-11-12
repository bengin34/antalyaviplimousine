import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {
  formatPrice,
  getIyzicoConfig,
  iyzicoRequest,
  verifyIyzicoResponseSignature,
} from '../_shared/iyzico.ts'
import { notifyOperator } from '../_shared/operator-email.ts'
import { paymentMatchesBooking } from './verify.ts'

const redirectToSite = (
  siteUrl: string,
  payment: 'success' | 'failed',
  bookingRef?: string,
  // Analytics only: the amount is already charged, the site just reports it.
  valueEur?: string
) => {
  const url = new URL(siteUrl)
  url.searchParams.set('payment', payment)
  if (bookingRef) url.searchParams.set('booking_ref', bookingRef)
  if (valueEur) url.searchParams.set('value', valueEur)
  return Response.redirect(url, 303)
}

const getCallbackToken = async (req: Request) => {
  const url = new URL(req.url)
  if (req.method === 'GET') return url.searchParams.get('token')

  const contentType = req.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const payload = await req.json()
    return payload.token ? String(payload.token) : null
  }

  const form = await req.formData()
  const token = form.get('token')
  return token ? String(token) : null
}

Deno.serve(async (req) => {
  const siteUrl = Deno.env.get('PUBLIC_SITE_URL')
  if (!siteUrl) {
    return new Response('PUBLIC_SITE_URL is not configured', { status: 500 })
  }

  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 })
  }

  const callbackUrl = new URL(req.url)
  const bookingId = callbackUrl.searchParams.get('booking_id')
  const token = await getCallbackToken(req)
  if (!bookingId || !token) {
    return redirectToSite(siteUrl, 'failed')
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) {
    return new Response('Supabase environment is not configured', { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single()

  if (bookingError || !booking) {
    return redirectToSite(siteUrl, 'failed')
  }
  // The stored token is only the latest checkout; an earlier one may still have paid.
  const isStoredToken = booking.iyzico_token === token
  // A page refresh or replayed callback must not re-verify or email twice.
  if (booking.status !== 'pending') {
    if (!isStoredToken) return redirectToSite(siteUrl, 'failed')
    return redirectToSite(siteUrl, booking.status === 'cancelled' ? 'failed' : 'success', booking.booking_ref)
  }

  try {
    const config = getIyzicoConfig()
    const payment = await iyzicoRequest(
      config,
      '/payment/iyzipos/checkoutform/auth/ecom/detail',
      {
        locale: String(booking.language || 'en').toLowerCase() === 'tr' ? 'tr' : 'en',
        conversationId: booking.id,
        token,
      }
    )

    const signatureIsValid = await verifyIyzicoResponseSignature(
      config.secretKey,
      [
        payment.paymentStatus,
        payment.paymentId,
        payment.currency,
        payment.basketId,
        payment.conversationId,
        payment.paidPrice,
        payment.price,
        payment.token,
      ],
      payment.signature
    )

    const expectedPrice = formatPrice(Number(booking.price_eur))
    const paymentIsValid = paymentMatchesBooking(payment, booking, token, signatureIsValid)

    if (!paymentIsValid) {
      // A stranger's junk token must not overwrite the guest's error field.
      if (isStoredToken) {
        const errorMessage = String(payment.errorMessage || 'Payment verification failed')
        await supabase
          .from('bookings')
          .update({ payment_error: errorMessage })
          .eq('id', booking.id)
      }
      return redirectToSite(siteUrl, 'failed', booking.booking_ref)
    }

    const { data: updated, error: updateError } = await supabase
      .from('bookings')
      .update({
        status: 'paid',
        iyzico_token: token,
        iyzico_payment_id: String(payment.paymentId),
        payment_currency: 'EUR',
        paid_at: new Date().toISOString(),
        payment_error: null,
      })
      .eq('id', booking.id)
      .eq('status', 'pending')
      .select('id')

    if (updateError) throw updateError
    // Lost a concurrent-callback race: the winner already emailed.
    if (!updated?.length) return redirectToSite(siteUrl, 'success', booking.booking_ref, expectedPrice)
    await notifyOperator(`[PAID] Booking ${booking.booking_ref}: EUR ${expectedPrice}`, {
      Reference: booking.booking_ref,
      Customer: booking.customer_name,
      Phone: booking.customer_phone,
      Date: booking.pickup_date,
      Paid: `EUR ${expectedPrice} by card (iyzico ${payment.paymentId})`,
    })
    return redirectToSite(siteUrl, 'success', booking.booking_ref, expectedPrice)
  } catch (error) {
    console.error('iyzico callback error:', error)
    if (isStoredToken) {
      await supabase
        .from('bookings')
        .update({
          payment_error: error instanceof Error ? error.message : 'Payment verification failed',
        })
        .eq('id', booking.id)
    }
    return redirectToSite(siteUrl, 'failed', booking.booking_ref)
  }
})
