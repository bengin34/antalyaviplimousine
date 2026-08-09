import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";
import { routeCatalog } from "../../../src/routes.js";

type Translate = (key: string, fallback?: string) => string;

const normalize = (value: string) => value.trim().replace(/\s+/g, " ");
const validName = (value: string) => {
  const normalized = normalize(value);
  return normalized.length >= 2 && normalized.length <= 80 && (normalized.match(/\p{L}/gu)?.length ?? 0) >= 2 && !/\d/u.test(normalized);
};

export function createPublicBookingSchema(t: Translate) {
  return z.object({
    tripType: z.enum(["one_way", "round_trip"]),
    pickup: z.enum(["airport", "hotel", "private_address"]),
    destination: z.string().min(1, t("destinationRequired", "Please select a destination.")),
    vehicle: z.enum(["vito", "sprinter"]),
    guests: z.string(), luggage: z.string(), childSeats: z.string(),
    travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, t("dateInvalid", "Please select a valid date.")),
    arrivalTime: z.string(), flightNumber: z.string(),
    returnDate: z.string(), returnPickupTime: z.string(), returnFlightNumber: z.string(),
    pickupAddress: z.string(), dropoffAddress: z.string(), hotelName: z.string(),
    customerName: z.string(), customerPhone: z.string(), customerEmail: z.string(),
  }).superRefine((values, context) => {
    const today = new Date();
    const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const guests = Number(values.guests);
    const luggage = Number(values.luggage);
    const childSeats = Number(values.childSeats);
    const capacity = values.vehicle === "sprinter" ? 13 : 7;

    if (values.travelDate < localToday) context.addIssue({ code: "custom", path: ["travelDate"], message: t("dateInvalid", "Please select a future date.") });
    if (!Number.isInteger(guests) || guests < 1 || guests > capacity) context.addIssue({ code: "custom", path: ["guests"], message: t("capacityNoVehicle", "Please select a suitable vehicle.") });
    if (!Number.isInteger(luggage) || luggage < 0 || luggage > 12) context.addIssue({ code: "custom", path: ["luggage"], message: t("requiredField", "Please check this field.") });
    if (!Number.isInteger(childSeats) || childSeats < 0 || childSeats > 4) context.addIssue({ code: "custom", path: ["childSeats"], message: t("requiredField", "Please check this field.") });

    if (values.tripType === "round_trip") {
      if (!values.returnDate) context.addIssue({ code: "custom", path: ["returnDate"], message: t("returnDateRequired", "Please select the return date.") });
      else if (values.returnDate < values.travelDate) context.addIssue({ code: "custom", path: ["returnDate"], message: t("returnDateInvalid", "The return date cannot be earlier.") });
      if (!values.returnPickupTime) context.addIssue({ code: "custom", path: ["returnPickupTime"], message: t("returnTimeRequired", "Please select the return pick-up time.") });
    }

    if (values.pickup === "private_address" && (normalize(values.pickupAddress).length < 6 || normalize(values.pickupAddress).length > 160)) {
      context.addIssue({ code: "custom", path: ["pickupAddress"], message: t("pickupAddressRequired", "Please enter the full pick-up address.") });
    }
    if (values.destination === "private_address" && (normalize(values.dropoffAddress).length < 6 || normalize(values.dropoffAddress).length > 160)) {
      context.addIssue({ code: "custom", path: ["dropoffAddress"], message: t("dropoffAddressRequired", "Please enter the full drop-off address.") });
    }
    if (values.pickup === "private_address" && values.destination === "private_address" && normalize(values.pickupAddress).toLowerCase() === normalize(values.dropoffAddress).toLowerCase()) {
      context.addIssue({ code: "custom", path: ["dropoffAddress"], message: t("addressesMustDiffer", "Pick-up and drop-off addresses must be different.") });
    }

    const needsHotel = values.pickup === "hotel" || values.destination !== "private_address";
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
    for (const field of ["flightNumber", "returnFlightNumber"] as const) {
      const flight = normalize(values[field]);
      if (flight && !/^[a-z0-9][a-z0-9 -]{1,11}$/i.test(flight)) {
        context.addIssue({ code: "custom", path: [field], message: t("flightInvalid", "Please enter a valid flight number.") });
      }
    }
  });
}

export type PublicBookingValues = z.input<ReturnType<typeof createPublicBookingSchema>>;

export function quoteFor(values: Pick<PublicBookingValues, "destination" | "vehicle" | "tripType">) {
  const route = routeCatalog[values.destination as keyof typeof routeCatalog];
  if (!route) return { price: 0, originalPrice: 0 };
  const journeys = values.tripType === "round_trip" ? 2 : 1;
  return {
    price: route.prices[values.vehicle] * journeys,
    originalPrice: route.originalPrices[values.vehicle] * journeys,
  };
}

export function buildPublicBookingPayload(values: PublicBookingValues, language: string) {
  return {
    customer_name: normalize(values.customerName),
    customer_email: values.customerEmail.trim().toLowerCase(),
    customer_phone: normalize(values.customerPhone).replace(/^00/, "+"),
    hotel_name: normalize(values.hotelName) || "Not specified",
    child_seat_count: Number(values.childSeats),
    luggage_count: Number(values.luggage),
    flight_number: normalize(values.flightNumber).toUpperCase() || null,
    flight_arrival_time: values.arrivalTime || null,
    pickup_location: values.pickup,
    pickup_address: values.pickup === "private_address" ? normalize(values.pickupAddress) : null,
    dropoff_location: values.destination,
    dropoff_address: values.destination === "private_address" ? normalize(values.dropoffAddress) : null,
    pickup_date: values.travelDate,
    trip_type: values.tripType,
    return_date: values.tripType === "round_trip" ? values.returnDate : null,
    return_pickup_time: values.tripType === "round_trip" ? values.returnPickupTime : null,
    return_flight_number: values.tripType === "round_trip" ? normalize(values.returnFlightNumber).toUpperCase() || null : null,
    guests: Number(values.guests),
    vehicle_type: values.vehicle === "sprinter" ? "vclass" : "vito",
    payment_method: "cash",
    language,
  };
}
