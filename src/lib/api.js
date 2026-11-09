import { invokeFunction, supabaseConfig } from './supabase-rest'

export async function getFunctionErrorMessage(error) {
  const fallback = error?.message || 'Booking could not be created'
  if (!error?.context) return fallback

  try {
    const response = typeof error.context.clone === 'function'
      ? error.context.clone()
      : error.context
    const payload = await response.json()
    return payload?.error || payload?.message || fallback
  } catch {
    return fallback
  }
}

export async function createBooking(data) {
  if (!supabaseConfig()) {
    throw new Error('Supabase is not configured')
  }

  const { data: response, error } = await invokeFunction('create-booking', {
    body: data,
  })

  if (error) {
    const bookingError = new Error(await getFunctionErrorMessage(error))
    bookingError.cause = error
    throw bookingError
  }
  if (response?.error) throw new Error(response.error)
  if (!response?.booking) throw new Error('Booking could not be created')
  return response.booking
}

/** Asks iyzico for the hosted payment page of a pending card booking. */
export async function createCheckoutUrl(bookingId) {
  const { data: response, error } = await invokeFunction('create-iyzico-checkout', {
    body: { booking_id: bookingId },
  })

  if (error) throw new Error(await getFunctionErrorMessage(error))
  if (response?.error) throw new Error(response.error)
  if (!response?.checkout_url) throw new Error('Payment page could not be created')
  return response.checkout_url
}
