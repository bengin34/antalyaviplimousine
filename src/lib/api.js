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
