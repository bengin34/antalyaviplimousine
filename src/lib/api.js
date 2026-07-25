import { supabase } from './supabase.js'

export async function createBooking(data) {
  if (!supabase) {
    throw new Error('Supabase is not configured')
  }

  const { data: response, error } = await supabase.functions.invoke('create-booking', {
    body: data,
  })

  if (error) throw error
  if (response?.error) throw new Error(response.error)
  if (!response?.booking) throw new Error('Booking could not be created')
  return response.booking
}
