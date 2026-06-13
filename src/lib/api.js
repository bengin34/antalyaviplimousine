import { supabase } from './supabase.js'

function generateRef() {
  const year = new Date().getFullYear()
  const rand = String(Math.floor(Math.random() * 90000) + 10000)
  return `AVL-${year}-${rand}`
}

export async function createBooking(data) {
  const bookingRef = generateRef()
  const payload = { ...data, booking_ref: bookingRef }

  if (!supabase) {
    console.warn('Supabase not configured — booking not persisted to DB')
    return {
      ...payload,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    }
  }

  const { data: booking, error } = await supabase
    .from('bookings')
    .insert([payload])
    .select()
    .single()

  if (error) throw error
  return booking
}

export async function createPaymentIntent(bookingId, amountEur) {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ booking_id: bookingId, amount_eur: amountEur }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Payment setup failed')
  }
  return res.json()
}
