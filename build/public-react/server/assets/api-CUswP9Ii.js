import { createClient } from "@supabase/supabase-js";
const url = "https://gjrjcluyljgcmzyeszhy.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcmpjbHV5bGpnY216eWVzemh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNTgyMDYsImV4cCI6MjA5NjkzNDIwNn0.yPZLAvwkHK4JWHoxh8E5EFBO7-EKET9vNn92S-bvKyU";
const supabase = createClient(url, key);
async function createBooking(data) {
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }
  const { data: response, error } = await supabase.functions.invoke("create-booking", {
    body: data
  });
  if (error) throw error;
  if (response?.error) throw new Error(response.error);
  if (!response?.booking) throw new Error("Booking could not be created");
  return response.booking;
}
export {
  createBooking
};
