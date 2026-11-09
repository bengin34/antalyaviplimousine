import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";
import {
  COP31_DAILY_RATE_EUR,
  COP31_FIRST_DAY,
  COP31_LAST_DAY,
  COP31_SPRINTER_MAX_GUESTS,
  isCop31Period,
} from "../../../supabase/functions/_shared/cop31.js";
import { currentAttribution, type Attribution } from "./attribution";
import { inclusiveDayCount, ultraLuxOf, ultraLuxVehicles, VITO_MAX_GUESTS, type UltraLuxVehicle } from "./booking";
import type { Cop31Copy } from "./cop31-copy";

export { COP31_FIRST_DAY, COP31_LAST_DAY, COP31_SPRINTER_MAX_GUESTS };
export type Cop31Vehicle = "vito" | "sprinter";
/** The form also sells the Ultra Lux vehicles, as an ordinary daily hire. */
export type Cop31FormVehicle = Cop31Vehicle | UltraLuxVehicle;

/** The opening day, in Antalya's time; the countdown and the dialog's cut-off follow it. */
export const COP31_OPENING = "2026-11-09T09:00:00+03:00";
export const cop31DailyRate = (vehicle: Cop31FormVehicle) =>
  ultraLuxOf(vehicle)?.dailyRateEur ?? COP31_DAILY_RATE_EUR[vehicle === "sprinter" ? "vclass" : "vito"];

/** Days × the day rate, or 0 while the period is incomplete or outside the package window. */
export function cop31Quote(vehicle: Cop31FormVehicle, start: string, end: string) {
  if (!isCop31Period(start, end)) return { days: 0, price: 0 };
  const days = inclusiveDayCount(start, end);
  return { days, price: days * cop31DailyRate(vehicle) };
}

const normalize = (value: string) => value.trim().replace(/\s+/g, " ");

export function createCop31Schema(errors: Cop31Copy["errors"]) {
  return z.object({
    vehicle: z.enum(["vito", "sprinter", ...ultraLuxVehicles]),
    startDate: z.string(),
    endDate: z.string(),
    startTime: z.string(),
    hotelName: z.string(),
    guests: z.string(),
    customerName: z.string(),
    customerPhone: z.string(),
    customerEmail: z.string(),
    notes: z.string().default(""),
    fuelAccepted: z.boolean().default(false),
  }).superRefine((values, context) => {
    const startOk = values.startDate >= COP31_FIRST_DAY && values.startDate <= COP31_LAST_DAY;
    if (!startOk) context.addIssue({ code: "custom", path: ["startDate"], message: errors.start });
    else if (!isCop31Period(values.startDate, values.endDate)) context.addIssue({ code: "custom", path: ["endDate"], message: errors.end });
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(values.startTime)) context.addIssue({ code: "custom", path: ["startTime"], message: errors.time });

    const hotel = normalize(values.hotelName);
    if (hotel.length < 2 || hotel.length > 120) context.addIssue({ code: "custom", path: ["hotelName"], message: errors.hotel });

    const guests = Number(values.guests);
    const lux = ultraLuxOf(values.vehicle);
    const max = lux?.maxGuests ?? (values.vehicle === "sprinter" ? COP31_SPRINTER_MAX_GUESTS : VITO_MAX_GUESTS);
    if (lux && !values.fuelAccepted) context.addIssue({ code: "custom", path: ["fuelAccepted"], message: errors.fuel });
    if (!Number.isInteger(guests) || guests < 1 || guests > max) context.addIssue({ code: "custom", path: ["guests"], message: errors.guests });

    const name = normalize(values.customerName);
    if (name.length < 2 || name.length > 80 || (name.match(/\p{L}/gu)?.length ?? 0) < 2 || /\d/u.test(name)) {
      context.addIssue({ code: "custom", path: ["customerName"], message: errors.name });
    }
    const phone = normalize(values.customerPhone).replace(/^00/, "+");
    if (!phone.startsWith("+") || !parsePhoneNumberFromString(phone)?.isValid()) {
      context.addIssue({ code: "custom", path: ["customerPhone"], message: errors.phone });
    }
    const email = values.customerEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 120) {
      context.addIssue({ code: "custom", path: ["customerEmail"], message: errors.email });
    }
  });
}

export type Cop31Values = z.input<ReturnType<typeof createCop31Schema>>;

/**
 * A daily chauffeur hire flagged as the COP31 package: create-booking prices
 * it at the package rate with fuel included, so no fuel terms are sent.
 */
export function buildCop31Payload(values: Cop31Values, language: string, attribution: Attribution = currentAttribution()) {
  const lux = ultraLuxOf(values.vehicle);
  const notes = normalize(values.notes ?? "");
  return {
    ...attribution,
    trip_type: "daily_chauffeur",
    // Ultra Lux is not part of the package: a plain daily hire, fuel excluded and accepted.
    ...(lux ? { fuel_terms_accepted: true } : { service_package: "cop31" }),
    customer_name: normalize(values.customerName),
    customer_email: values.customerEmail.trim().toLowerCase(),
    customer_phone: normalize(values.customerPhone).replace(/^00/, "+"),
    hotel_name: normalize(values.hotelName),
    pickup_location: "hotel",
    pickup_address: null,
    pickup_date: values.startDate,
    pickup_time: values.startTime,
    service_end_date: values.endDate,
    child_seat_count: 0,
    child_ages: [],
    luggage_count: 0,
    golf_bag_count: 0,
    stroller_count: 0,
    guests: Number(values.guests),
    vehicle_type: lux ? values.vehicle : values.vehicle === "sprinter" ? "vclass" : "vito",
    notes: lux ? `[COP31]${notes ? ` ${notes}` : ""}` : notes || null,
    payment_method: "cash",
    language,
  };
}

/** Whole days until the opening; 0 once it has started. */
export function daysToCop31(now = Date.now()) {
  return Math.max(0, Math.ceil((Date.parse(COP31_OPENING) - now) / 86_400_000));
}
