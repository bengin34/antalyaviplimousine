import { describe, expect, test } from "vitest";
import { buildPublicBookingPayload, createPublicBookingSchema, quoteFor, type PublicBookingValues } from "./booking";

const t = (_key: string, fallback = "Invalid") => fallback;
const futureDate = `${new Date().getFullYear() + 1}-08-10`;
const base: PublicBookingValues = {
  tripType: "one_way", pickup: "airport", destination: "side", vehicle: "vito",
  guests: "2", luggage: "1", childSeats: "0", travelDate: futureDate,
  arrivalTime: "12:30", flightNumber: "TK123", returnDate: "", returnPickupTime: "",
  returnFlightNumber: "", serviceEndDate: "", pickupTime: "", departureFlightDate: "",
  departureFlightTime: "", departureFlightNumber: "", pickupAddress: "", dropoffAddress: "", hotelName: "Test Hotel",
  customerName: "Test Guest", customerPhone: "+49 151 23456789", customerEmail: "GUEST@example.com",
};

describe("public booking contract", () => {
  test("calculates one-way and round-trip prices from the canonical route", () => {
    expect(quoteFor(base)).toEqual({ price: 50, originalPrice: 60 });
    expect(quoteFor({ ...base, tripType: "round_trip" })).toEqual({ price: 100, originalPrice: 120 });
  });

  test("builds the existing Edge Function payload", () => {
    expect(buildPublicBookingPayload(base, "de")).toMatchObject({
      customer_email: "guest@example.com", pickup_location: "airport", dropoff_location: "side",
      vehicle_type: "vito", trip_type: "one_way", return_date: null, language: "de",
    });
  });

  test("requires return details for a round trip", () => {
    const result = createPublicBookingSchema(t).safeParse({ ...base, tripType: "round_trip" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues.map((issue) => issue.path[0])).toEqual(expect.arrayContaining(["returnDate", "returnPickupTime"]));
  });

  test("calculates an inclusive daily chauffeur price", () => {
    expect(quoteFor({ ...base, tripType: "daily_chauffeur", destination: "", serviceEndDate: futureDate.replace(/10$/, "13") }))
      .toEqual({ price: 600, originalPrice: 600 });
  });

  test("requires service dates, a start time, and explicit fuel acceptance", () => {
    const daily = { ...base, tripType: "daily_chauffeur" as const, destination: "", serviceEndDate: futureDate, pickupTime: "09:00" };
    expect(createPublicBookingSchema(t).safeParse(daily).success).toBe(true);
    expect(() => buildPublicBookingPayload(daily, "tr")).toThrow("Fuel terms");
    expect(buildPublicBookingPayload(daily, "tr", true)).toMatchObject({
      trip_type: "daily_chauffeur", dropoff_location: null, service_end_date: futureDate,
      pickup_time: "09:00", fuel_terms_accepted: true,
    });
  });
});

describe("airport-bound journeys", () => {
  test("prices the return on the hotel's region, at the same fixed price", () => {
    const returning = { ...base, pickup: "hotel" as const, destination: "airport", hotelRegion: "side" };
    expect(quoteFor(returning)).toEqual(quoteFor(base));
    expect(quoteFor({ ...returning, hotelRegion: "belek" })).toEqual({ price: 40, originalPrice: 50 });
  });

  test("falls back to a manual quote when the hotel's region is unknown", () => {
    expect(quoteFor({ ...base, destination: "airport" })).toEqual({ price: 0, originalPrice: 0 });
    expect(quoteFor({ ...base, destination: "airport", hotelRegion: "not-a-region" }))
      .toEqual({ price: 0, originalPrice: 0 });
  });

  test("ignores the hotel's region when the guest is heading to a region", () => {
    expect(quoteFor({ ...base, destination: "belek", hotelRegion: "alanya" })).toEqual({ price: 40, originalPrice: 50 });
  });
});
