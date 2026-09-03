import { supabase } from "./supabase-vpckcPMN.js";
import "@supabase/supabase-js";
async function getFunctionErrorMessage(error) {
  const fallback = error?.message || "Booking could not be created";
  if (!error?.context) return fallback;
  try {
    const response = typeof error.context.clone === "function" ? error.context.clone() : error.context;
    const payload = await response.json();
    return payload?.error || payload?.message || fallback;
  } catch {
    return fallback;
  }
}
async function createBooking(data) {
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }
  const { data: response, error } = await supabase.functions.invoke("create-booking", {
    body: data
  });
  if (error) {
    const bookingError = new Error(await getFunctionErrorMessage(error));
    bookingError.cause = error;
    throw bookingError;
  }
  if (response?.error) throw new Error(response.error);
  if (!response?.booking) throw new Error("Booking could not be created");
  return response.booking;
}
export {
  createBooking,
  getFunctionErrorMessage
};
