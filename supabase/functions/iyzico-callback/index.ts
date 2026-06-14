import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {
  formatPrice,
  getIyzicoConfig,
  iyzicoRequest,
  verifyIyzicoResponseSignature,
} from '../_shared/iyzico.ts'

const redirectToSite = (
  siteUrl: string,
  payment: 'success' | 'failed',
  bookingRef?: string
) => {
  const url = new URL(siteUrl)
  url.searchParams.set('payment', payment)
  if (bookingRef) url.searchParams.set('booking_ref', bookingRef)
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
    .eq('iyzico_token', token)
    .single()

  if (bookingError || !booking) {
    return redirectToSite(siteUrl, 'failed')
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
    const paymentIsValid =
      payment.status === 'success' &&
      payment.paymentStatus === 'SUCCESS' &&
      signatureIsValid &&
      String(payment.conversationId) === booking.id &&
      String(payment.basketId) === booking.booking_ref &&
      String(payment.token) === token &&
      String(payment.currency) === 'EUR' &&
      formatPrice(Number(payment.price)) === expectedPrice &&
      formatPrice(Number(payment.paidPrice)) === expectedPrice

    if (!paymentIsValid) {
      const errorMessage = String(payment.errorMessage || 'Payment verification failed')
      await supabase
        .from('bookings')
        .update({ payment_error: errorMessage })
        .eq('id', booking.id)
      return redirectToSite(siteUrl, 'failed', booking.booking_ref)
    }

    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        status: 'paid',
        iyzico_payment_id: String(payment.paymentId),
        payment_currency: 'EUR',
        paid_at: new Date().toISOString(),
        payment_error: null,
      })
      .eq('id', booking.id)
      .eq('iyzico_token', token)

    if (updateError) throw updateError
    return redirectToSite(siteUrl, 'success', booking.booking_ref)
  } catch (error) {
    console.error('iyzico callback error:', error)
    await supabase
      .from('bookings')
      .update({
        payment_error: error instanceof Error ? error.message : 'Payment verification failed',
      })
      .eq('id', booking.id)
    return redirectToSite(siteUrl, 'failed', booking.booking_ref)
  }
})
