import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";
import { routeCatalog } from "../../../src/routes.js";

type Translate = (key: string, fallback?: string) => string;
export const DAILY_CHAUFFEUR_RATE_EUR = 150;
export const MAX_DAILY_CHAUFFEUR_DAYS = 30;

const normalize = (value: string) => value.trim().replace(/\s+/g, " ");
const validName = (value: string) => {
  const normalized = normalize(value);
  return normalized.length >= 2 && normalized.length <= 80 && (normalized.match(/\p{L}/gu)?.length ?? 0) >= 2 && !/\d/u.test(normalized);
};

export function inclusiveDayCount(start: string, end: string) {
  const startAt = Date.parse(`${start}T00:00:00Z`);
  const endAt = Date.parse(`${end}T00:00:00Z`);
  if (!Number.isFinite(startAt) || !Number.isFinite(endAt)) return 0;
  return Math.floor((endAt - startAt) / 86_400_000) + 1;
}

export function createPublicBookingSchema(t: Translate) {
  return z.object({
    tripType: z.enum(["one_way", "round_trip", "daily_chauffeur"]),
    pickup: z.enum(["airport", "hotel", "private_address"]),
    destination: z.string(),
    vehicle: z.enum(["vito", "sprinter"]),
    guests: z.string(), luggage: z.string(), childSeats: z.string(),
    childAges: z.array(z.string()).default([]),
    travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, t("dateInvalid", "Please select a valid date.")),
    arrivalTime: z.string(), flightNumber: z.string(),
    returnDate: z.string(), returnPickupTime: z.string(), returnFlightNumber: z.string(),
    serviceEndDate: z.string(), pickupTime: z.string(),
    departureFlightDate: z.string(), departureFlightTime: z.string(), departureFlightNumber: z.string(),
    pickupAddress: z.string(), dropoffAddress: z.string(), hotelName: z.string(),
    hotelRegion: z.string().default(""),
    customerName: z.string(), customerPhone: z.string(), customerEmail: z.string(),
  }).superRefine((values, context) => {
    const today = new Date();
    const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const guests = Number(values.guests);
    const luggage = Number(values.luggage);
    const childSeats = Number(values.childSeats);
    const capacity = values.vehicle === "sprinter" ? 12 : 6;

    if (values.travelDate < localToday) context.addIssue({ code: "custom", path: ["travelDate"], message: t("dateInvalid", "Please select a future date.") });
    if (!Number.isInteger(guests) || guests < 1 || guests > capacity) context.addIssue({ code: "custom", path: ["guests"], message: t("capacityNoVehicle", "Please select a suitable vehicle.") });
    if (values.luggage === "" || !Number.isInteger(luggage) || luggage < 0 || luggage > 12) context.addIssue({ code: "custom", path: ["luggage"], message: t("luggageRequired", "Please select the number of large bags.") });
    if (!Number.isInteger(childSeats) || childSeats < 0 || childSeats > 4) context.addIssue({ code: "custom", path: ["childSeats"], message: t("requiredField", "Please check this field.") });
    for (let i = 0; i < childSeats; i++) {
      const age = Number(values.childAges?.[i]);
      if (!Number.isInteger(age) || age < 0 || age > 11 || values.childAges?.[i] === "" || values.childAges?.[i] === undefined) {
        context.addIssue({ code: "custom", path: ["childAges", i], message: t("childAgeRequired", "Please select the child's age.") });
      }
    }

    if (values.tripType === "round_trip") {
      if (!values.returnDate) context.addIssue({ code: "custom", path: ["returnDate"], message: t("returnDateRequired", "Please select the return date.") });
      else if (values.returnDate < values.travelDate) context.addIssue({ code: "custom", path: ["returnDate"], message: t("returnDateInvalid", "The return date cannot be earlier.") });
      if (!values.returnPickupTime) context.addIssue({ code: "custom", path: ["returnPickupTime"], message: t("returnTimeRequired", "Please select the return pick-up time.") });
    }

    if (values.tripType === "daily_chauffeur") {
      const days = inclusiveDayCount(values.travelDate, values.serviceEndDate);
      if (!values.pickupTime) context.addIssue({ code: "custom", path: ["pickupTime"], message: t("dailyPickupTimeRequired", "Please select the daily service start time.") });
      if (!values.serviceEndDate) context.addIssue({ code: "custom", path: ["serviceEndDate"], message: t("serviceEndDateRequired", "Please select the last service day.") });
      else if (days < 1 || days > MAX_DAILY_CHAUFFEUR_DAYS) context.addIssue({ code: "custom", path: ["serviceEndDate"], message: t("servicePeriodInvalid", "Please select a period between 1 and 30 days.") });
      const hasDepartureDetails = Boolean(values.departureFlightTime || normalize(values.departureFlightNumber));
      if (hasDepartureDetails && !values.departureFlightDate) context.addIssue({ code: "custom", path: ["departureFlightDate"], message: t("departureFlightDateRequired", "Please select the departure flight date.") });
      if (values.departureFlightDate && values.departureFlightDate < values.travelDate) context.addIssue({ code: "custom", path: ["departureFlightDate"], message: t("departureFlightDateInvalid", "Departure flight date cannot be before the service starts.") });
    } else if (!values.destination) {
      context.addIssue({ code: "custom", path: ["destination"], message: t("destinationRequired", "Please select a destination.") });
    }

    if (values.pickup === "private_address" && (normalize(values.pickupAddress).length < 6 || normalize(values.pickupAddress).length > 160)) {
      context.addIssue({ code: "custom", path: ["pickupAddress"], message: t("pickupAddressRequired", "Please enter the full pick-up address.") });
    }
    if (values.tripType !== "daily_chauffeur" && values.destination === "private_address" && (normalize(values.dropoffAddress).length < 6 || normalize(values.dropoffAddress).length > 160)) {
      context.addIssue({ code: "custom", path: ["dropoffAddress"], message: t("dropoffAddressRequired", "Please enter the full drop-off address.") });
    }
    if (values.tripType !== "daily_chauffeur" && values.pickup === "private_address" && values.destination === "private_address" && normalize(values.pickupAddress).toLowerCase() === normalize(values.dropoffAddress).toLowerCase()) {
      context.addIssue({ code: "custom", path: ["dropoffAddress"], message: t("addressesMustDiffer", "Pick-up and drop-off addresses must be different.") });
    }

    const needsHotel = values.tripType === "daily_chauffeur" || values.pickup === "hotel" || values.destination !== "private_address";
    if (needsHotel && (normalize(values.hotelName).length < 2 || normalize(values.hotelName).length > 120)) {
      context.addIssue({ code: "custom", path: ["hotelName"], message: t("hotelNameRequired", "Please enter the hotel name.") });
    }
    if (!validName(values.customerName)) context.addIssue({ code: "custom", path: ["customerName"], message: t("nameInvalid", "Please enter a valid full name.") });

    const phone = normalize(values.customerPhone).replace(/^00/, "+");
    if (!phone.startsWith("+") || !parsePhoneNumberFromString(phone)?.isValid()) {
      context.addIssue({ code: "custom", path: ["customerPhone"], message: t("phoneInvalid", "Please enter a valid international phone number.") });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.customerEmail.trim()) || values.customerEmail.trim().length > 120) {
      context.addIssue({ code: "custom", path: ["customerEmail"], message: t("emailInvalid", "Please enter a valid email address.") });
    }
    if (values.tripType !== "daily_chauffeur" && !normalize(values.flightNumber)) {
      context.addIssue({ code: "custom", path: ["flightNumber"], message: t("arrivalFlightNumberRequired", "Please enter the arrival flight number.") });
    }
    for (const field of ["flightNumber", "returnFlightNumber", "departureFlightNumber"] as const) {
      const flight = normalize(values[field]);
      if (flight && !/^[a-z0-9][a-z0-9 -]{1,11}$/i.test(flight)) {
        context.addIssue({ code: "custom", path: [field], message: t("flightInvalid", "Please enter a valid flight number.") });
      }
    }
  });
}

export type PublicBookingValues = z.input<ReturnType<typeof createPublicBookingSchema>>;

/**
 * Live prices fetched from the admin-controlled Supabase `routes` and
 * `chauffeur_service_rates` tables. When present, these take priority over
 * the static routeCatalog figures baked in at build time, so an admin price
 * update is reflected in the on-site quote without a redeploy.
 */
export type LivePriceOverrides = {
  routePrices?: Partial<Record<string, number>>;
  dailyRates?: Partial<Record<"vito" | "sprinter", number>>;
};

/**
 * The route whose fixed price applies to this journey.
 *
 * Transfers are priced per region and cost the same in both directions, so a
 * run from a hotel back to the airport is priced on that hotel's region just
 * like the outbound leg was. `hotelRegion` is filled in when the guest picks
 * their hotel from the index; without it an airport-bound journey has no
 * region to price on and still falls back to a manual quote.
 */
export function pricedRouteSlug(values: Pick<PublicBookingValues, "destination" | "hotelRegion">) {
  const slug = values.destination === "airport" ? values.hotelRegion ?? "" : values.destination;
  return slug in routeCatalog ? slug : "";
}

export function quoteFor(
  values: Pick<PublicBookingValues, "destination" | "hotelRegion" | "vehicle" | "tripType" | "travelDate" | "serviceEndDate">,
  overrides?: LivePriceOverrides,
) {
  if (values.tripType === "daily_chauffeur") {
    const days = inclusiveDayCount(values.travelDate, values.serviceEndDate);
    const dailyRate = overrides?.dailyRates?.[values.vehicle] ?? DAILY_CHAUFFEUR_RATE_EUR;
    const price = days > 0 && days <= MAX_DAILY_CHAUFFEUR_DAYS ? days * dailyRate : 0;
    return { price, originalPrice: price };
  }
  const slug = pricedRouteSlug(values);
  const route = routeCatalog[slug as keyof typeof routeCatalog];
  if (!route) return { price: 0, originalPrice: 0 };
  const journeys = values.tripType === "round_trip" ? 2 : 1;
  const liveUnitPrice = overrides?.routePrices?.[`${slug}:${values.vehicle}`];
  const unitPrice = liveUnitPrice ?? route.prices[values.vehicle];
  return {
    price: unitPrice * journeys,
    originalPrice: route.originalPrices[values.vehicle] * journeys,
  };
}

/**
 * Reads the admin-controlled live prices from Supabase (public, read-only).
 * Resolves to an empty override set on any failure so callers can always
 * fall back to the static routeCatalog figures.
 */
export async function fetchLivePriceOverrides(): Promise<LivePriceOverrides> {
  try {
    const { supabase } = await import("../../../src/lib/supabase.js");
    if (!supabase) return {};
    const [{ data: routeRows }, { data: rateRows }] = await Promise.all([
      supabase.from("routes").select("to_location, vehicle_type, price_eur").eq("from_location", "airport"),
      supabase.from("chauffeur_service_rates").select("vehicle_type, daily_rate_eur"),
    ]);
    const routePrices: Record<string, number> = {};
    for (const row of routeRows ?? []) {
      const vehicle = row.vehicle_type === "vclass" ? "sprinter" : "vito";
      routePrices[`${row.to_location}:${vehicle}`] = Number(row.price_eur);
    }
    const dailyRates: Partial<Record<"vito" | "sprinter", number>> = {};
    for (const row of rateRows ?? []) {
      const vehicle = row.vehicle_type === "vclass" ? "sprinter" : "vito";
      dailyRates[vehicle] = Number(row.daily_rate_eur);
    }
    return { routePrices, dailyRates };
  } catch {
    return {};
  }
}

export function buildPublicBookingPayload(values: PublicBookingValues, language: string, fuelTermsAccepted = false) {
  const isDailyChauffeur = values.tripType === "daily_chauffeur";
  if (isDailyChauffeur && !fuelTermsAccepted) throw new Error("Fuel terms must be accepted before booking");
  return {
    customer_name: normalize(values.customerName),
    customer_email: values.customerEmail.trim().toLowerCase(),
    customer_phone: normalize(values.customerPhone).replace(/^00/, "+"),
    hotel_name: normalize(values.hotelName) || "Not specified",
    child_seat_count: Number(values.childSeats),
    child_ages: Array.from({ length: Number(values.childSeats) }, (_, i) => Number(values.childAges?.[i] ?? 0)),
    luggage_count: Number(values.luggage),
    flight_number: normalize(values.flightNumber).toUpperCase() || null,
    flight_arrival_time: values.arrivalTime || null,
    pickup_location: values.pickup,
    pickup_address: values.pickup === "private_address" ? normalize(values.pickupAddress) : null,
    pickup_time: isDailyChauffeur ? values.pickupTime : null,
    dropoff_location: isDailyChauffeur ? null : values.destination,
    dropoff_address: !isDailyChauffeur && values.destination === "private_address" ? normalize(values.dropoffAddress) : null,
    pickup_date: values.travelDate,
    trip_type: values.tripType,
    return_date: values.tripType === "round_trip" ? values.returnDate : null,
    return_pickup_time: values.tripType === "round_trip" ? values.returnPickupTime : null,
    return_flight_number: values.tripType === "round_trip" ? normalize(values.returnFlightNumber).toUpperCase() || null : null,
    service_end_date: isDailyChauffeur ? values.serviceEndDate : null,
    departure_flight_date: isDailyChauffeur ? values.departureFlightDate || null : null,
    departure_flight_time: isDailyChauffeur ? values.departureFlightTime || null : null,
    departure_flight_number: isDailyChauffeur ? normalize(values.departureFlightNumber).toUpperCase() || null : null,
    fuel_terms_accepted: isDailyChauffeur ? fuelTermsAccepted : null,
    guests: Number(values.guests),
    vehicle_type: values.vehicle === "sprinter" ? "vclass" : "vito",
    payment_method: "cash",
    language,
  };
}
