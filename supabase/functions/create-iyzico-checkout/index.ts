import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {
  formatPrice,
  getIyzicoConfig,
  iyzicoRequest,
  verifyIyzicoResponseSignature,
} from '../_shared/iyzico.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) return { name: parts[0], surname: '-' }
  return {
    name: parts.slice(0, -1).join(' '),
    surname: parts.at(-1) || '-',
  }
}

const getClientIp = (req: Request) =>
  req.headers.get('cf-connecting-ip') ||
  req.headers.get('x-real-ip') ||
  req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  '127.0.0.1'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  try {
    const { booking_id: bookingId } = await req.json()
    if (!bookingId) {
      return jsonResponse({ error: 'booking_id is required' }, 400)
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const identityNumber = Deno.env.get('IYZICO_FOREIGN_BUYER_IDENTITY_NUMBER')
    if (!supabaseUrl || !serviceRoleKey || !identityNumber) {
      throw new Error('Payment service environment is not configured')
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', String(bookingId))
      .single()

    if (bookingError || !booking) {
      return jsonResponse({ error: 'Booking not found' }, 404)
    }
    if (booking.status !== 'pending') {
      return jsonResponse({ error: 'Booking is not awaiting payment' }, 409)
    }
    if (booking.payment_method !== 'card') {
      return jsonResponse({ error: 'Online payment was not selected for this booking' }, 409)
    }

    const config = getIyzicoConfig()
    const callbackUrl =
      `${supabaseUrl}/functions/v1/iyzico-callback?booking_id=${encodeURIComponent(booking.id)}`
    const price = formatPrice(Number(booking.price_eur))
    const buyerName = splitName(String(booking.customer_name))
    const serviceAddress = booking.pickup_address
      ? String(booking.pickup_address)
      : 'Antalya Airport (AYT), Antalya'

    const iyzicoResponse = await iyzicoRequest(
      config,
      '/payment/iyzipos/checkoutform/initialize/auth/ecom',
      {
        locale: String(booking.language || 'en').toLowerCase() === 'tr' ? 'tr' : 'en',
        conversationId: booking.id,
        price,
        paidPrice: price,
        currency: 'EUR',
        basketId: booking.booking_ref,
        paymentGroup: 'PRODUCT',
        callbackUrl,
        enabledInstallments: [1],
        buyer: {
          id: booking.id,
          name: buyerName.name,
          surname: buyerName.surname,
          gsmNumber: booking.customer_phone,
          email: booking.customer_email,
          identityNumber,
          registrationAddress: serviceAddress,
          ip: getClientIp(req),
          city: 'Antalya',
          country: 'Turkey',
          zipCode: '07230',
        },
        shippingAddress: {
          contactName: booking.customer_name,
          city: 'Antalya',
          country: 'Turkey',
          address: serviceAddress,
          zipCode: '07230',
        },
        billingAddress: {
          contactName: booking.customer_name,
          city: 'Antalya',
          country: 'Turkey',
          address: serviceAddress,
          zipCode: '07230',
        },
        basketItems: [
          {
            id: booking.booking_ref,
            name: `${booking.pickup_location} to ${booking.dropoff_location} private transfer`,
            category1: 'Private Transfer',
            itemType: 'VIRTUAL',
            price,
          },
        ],
      }
    )

    if (iyzicoResponse.status !== 'success') {
      const errorMessage = String(iyzicoResponse.errorMessage || 'Payment page could not be created')
      await supabase
        .from('bookings')
        .update({ payment_error: errorMessage })
        .eq('id', booking.id)
      return jsonResponse({ error: errorMessage }, 502)
    }

    const signatureIsValid = await verifyIyzicoResponseSignature(
      config.secretKey,
      [iyzicoResponse.conversationId, iyzicoResponse.token],
      iyzicoResponse.signature
    )
    if (!signatureIsValid) {
      throw new Error('iyzico initialize response signature is invalid')
    }

    const token = String(iyzicoResponse.token || '')
    const checkoutUrl = String(iyzicoResponse.paymentPageUrl || '')
    if (!token || !checkoutUrl) {
      throw new Error('iyzico did not return a checkout URL')
    }

    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        iyzico_token: token,
        iyzico_conversation_id: booking.id,
        payment_error: null,
      })
      .eq('id', booking.id)

    if (updateError) throw updateError

    return jsonResponse({ checkout_url: checkoutUrl })
  } catch (error) {
    console.error('Create iyzico checkout error:', error)
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Payment page could not be created' },
      500
    )
  }
})
