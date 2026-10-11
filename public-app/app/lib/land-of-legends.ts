import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";
import {
  isValidLandOfLegendsVisit,
  landOfLegendsNotice,
  landOfLegendsPrice,
  turkeyToday,
} from "../../../src/land-of-legends.js";
import { currentAttribution, type Attribution } from "./attribution";
import { sprinterFits, vitoFits, VITO_MAX_GUESTS, SPRINTER_MAX_GUESTS } from "./booking";

export type LandOfLegendsVehicle = "vito" | "sprinter";

/** Live overrides read from `land_of_legends_rates`, keyed `region:vehicle`. */
export type LandOfLegendsLiveRates = Partial<Record<string, number>>;

const normalize = (value: string) => value.trim().replace(/\s+/g, " ");

export const LAND_OF_LEGENDS_DEFAULT_DEPARTURE = "09:30";
export const LAND_OF_LEGENDS_DEFAULT_RETURN = "22:30";

/** Copy the schema needs; resolved per language by the page. */
export type LandOfLegendsErrors = {
  hotel: string;
  date: string;
  time: string;
  visit: string;
  tooSoon: string;
  guests: string;
  childAge: string;
  name: string;
  phone: string;
  email: string;
};

export function createLandOfLegendsSchema(errors: LandOfLegendsErrors) {
  return z.object({
    hotelName: z.string(),
    hotelRegion: z.string().default(""),
    travelDate: z.string(),
    departureTime: z.string(),
    returnTime: z.string(),
    vehicle: z.enum(["vito", "sprinter"]),
    guests: z.string(),
    childSeats: z.string().default("0"),
    childAges: z.array(z.string()).default([]),
    strollers: z.string().default("0"),
    customerName: z.string(),
    customerPhone: z.string(),
    customerEmail: z.string(),
    notes: z.string().default(""),
  }).superRefine((values, context) => {
    // Turkey's date and clock decide, not the visitor's: the trip happens there.
    const localToday = turkeyToday();
    const hotel = normalize(values.hotelName);
    if (hotel.length < 2 || hotel.length > 120) context.addIssue({ code: "custom", path: ["hotelName"], message: errors.hotel });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.travelDate) || values.travelDate < localToday) {
      context.addIssue({ code: "custom", path: ["travelDate"], message: errors.date });
    }
    if (!values.departureTime) context.addIssue({ code: "custom", path: ["departureTime"], message: errors.time });
    if (!values.returnTime) context.addIssue({ code: "custom", path: ["returnTime"], message: errors.time });
    else if (values.departureTime && !isValidLandOfLegendsVisit(values.departureTime, values.returnTime)) {
      context.addIssue({ code: "custom", path: ["returnTime"], message: errors.visit });
    }
    if (values.travelDate >= localToday && values.departureTime && landOfLegendsNotice(values.travelDate, values.departureTime) === "too_soon") {
      context.addIssue({ code: "custom", path: ["departureTime"], message: errors.tooSoon });
    }

    const guests = Number(values.guests);
    const strollers = Number(values.strollers) || 0;
    const fits = values.vehicle === "sprinter"
      ? guests <= SPRINTER_MAX_GUESTS && sprinterFits(guests, 0, 0, strollers)
      : guests <= VITO_MAX_GUESTS && vitoFits(guests, 0, 0, strollers);
    if (!Number.isInteger(guests) || guests < 1 || !fits) context.addIssue({ code: "custom", path: ["guests"], message: errors.guests });

    const childSeats = Number(values.childSeats);
    if (childSeats > guests) context.addIssue({ code: "custom", path: ["childSeats"], message: errors.guests });
    for (let i = 0; i < childSeats; i++) {
      const raw = values.childAges?.[i];
      const age = Number(raw);
      if (raw === undefined || raw === "" || !Number.isInteger(age) || age < 0 || age > 11) {
        context.addIssue({ code: "custom", path: ["childAges", i], message: errors.childAge });
      }
    }

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

export type LandOfLegendsValues = z.input<ReturnType<typeof createLandOfLegendsSchema>>;

/**
 * Fixed price for the guest's hotel region, or null when the region has no
 * fixed rate (or the guest typed a hotel we could not place) and the operator
 * quotes it. A live admin price wins over the built-in tariff — including for
 * a region the built-in tariff does not price, since the server charges it.
 */
export function landOfLegendsQuote(
  region: string,
  vehicle: LandOfLegendsVehicle,
  live: LandOfLegendsLiveRates = {},
): number | null {
  if (!region) return null;
  return live[`${region}:${vehicle}`] ?? landOfLegendsPrice(region, vehicle) ?? null;
}

/** The smallest vehicle that carries the party; null when neither does. */
export function vehicleFor(guests: number, strollers = 0): LandOfLegendsVehicle | null {
  if (vitoFits(guests, 0, 0, strollers)) return "vito";
  if (sprinterFits(guests, 0, 0, strollers)) return "sprinter";
  return null;
}

/** Reads admin-edited rates; an empty set on any failure keeps the built-in tariff. */
export async function fetchLandOfLegendsLiveRates(): Promise<LandOfLegendsLiveRates> {
  try {
    const { supabase } = await import("../../../src/lib/supabase.js");
    if (!supabase) return {};
    const { data } = await supabase.from("land_of_legends_rates").select("region_slug, vehicle_type, price_eur");
    const rates: LandOfLegendsLiveRates = {};
    for (const row of data ?? []) {
      rates[`${row.region_slug}:${row.vehicle_type === "vclass" ? "sprinter" : "vito"}`] = Number(row.price_eur);
    }
    return rates;
  } catch {
    return {};
  }
}

export function buildLandOfLegendsPayload(
  values: LandOfLegendsValues,
  language: string,
  attribution: Attribution = currentAttribution(),
) {
  const childSeats = Number(values.childSeats) || 0;
  return {
    ...attribution,
    trip_type: "land_of_legends",
    customer_name: normalize(values.customerName),
    customer_email: values.customerEmail.trim().toLowerCase(),
    customer_phone: normalize(values.customerPhone).replace(/^00/, "+"),
    hotel_name: normalize(values.hotelName),
    excursion_region: values.hotelRegion || null,
    pickup_location: "hotel",
    pickup_address: null,
    dropoff_location: "land_of_legends",
    pickup_date: values.travelDate,
    pickup_time: values.departureTime,
    return_date: values.travelDate,
    return_pickup_time: values.returnTime,
    child_seat_count: childSeats,
    child_ages: Array.from({ length: childSeats }, (_, i) => Number(values.childAges?.[i] ?? 0)),
    luggage_count: 0,
    golf_bag_count: 0,
    stroller_count: Number(values.strollers) || 0,
    guests: Number(values.guests),
    vehicle_type: values.vehicle === "sprinter" ? "vclass" : "vito",
    notes: normalize(values.notes ?? "") || null,
    payment_method: "cash",
    language,
  };
}

/** `YYYY-MM-DD` shifted by whole days; calendar arithmetic, no time zone involved. */
export function addDays(date: string, days: number) {
  const at = Date.parse(`${date}T12:00:00Z`);
  return Number.isFinite(at) ? new Date(at + days * 86_400_000).toISOString().slice(0, 10) : date;
}

/**
 * Hotel pick-up that reaches the park about 15 minutes before it opens at
 * 10:00, given the drive from the guest's area; rounded down to 15 minutes and
 * never earlier than 07:00. Null when the drive is unknown.
 */
export function suggestedDeparture(driveMinutes: number | null) {
  if (driveMinutes == null) return null;
  const minutes = Math.max(7 * 60, Math.floor((10 * 60 - 15 - driveMinutes) / 15) * 15);
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

/** The message for a failed submit: the server's notice refusal gets its own explanation. */
export function submitErrorMessage(error: unknown, messages: { tooSoon: string; generic: string }) {
  return error instanceof Error && error.message.includes("pickup_too_soon") ? messages.tooSoon : messages.generic;
}
