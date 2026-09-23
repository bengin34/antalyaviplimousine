import { describe, expect, test } from "vitest";
import { buildPublicBookingPayload, createPublicBookingSchema, quoteFor, sprinterFits, vitoFits, type PublicBookingValues } from "./booking";

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
  test("Vito takes at most 6 guests and 11 guests + large bags combined", () => {
    expect(vitoFits(6, 5)).toBe(true);
    expect(vitoFits(5, 6)).toBe(true);
    expect(vitoFits(6, 6)).toBe(false);
    expect(vitoFits(7, 0)).toBe(false);
    const schema = createPublicBookingSchema(t);
    expect(schema.safeParse({ ...base, guests: "6", luggage: "5" }).success).toBe(true);
    const rejected = schema.safeParse({ ...base, guests: "6", luggage: "6" });
    expect(rejected.success).toBe(false);
    expect(rejected.error?.issues.some((issue) => issue.path[0] === "vehicle")).toBe(true);
    expect(schema.safeParse({ ...base, vehicle: "sprinter", guests: "6", luggage: "6" }).success).toBe(true);
  });

  test("golf bags count as two bag spaces and strollers as one", () => {
    expect(vitoFits(4, 0, 3)).toBe(true);
    expect(vitoFits(4, 1, 3)).toBe(true);
    expect(vitoFits(4, 2, 3)).toBe(false);
    expect(vitoFits(6, 4, 0, 1)).toBe(true);
    expect(vitoFits(6, 5, 0, 1)).toBe(false);
    expect(sprinterFits(12, 12, 0, 1)).toBe(true);
    expect(sprinterFits(12, 12, 1)).toBe(false);
    const schema = createPublicBookingSchema(t);
    const golfOnVito = schema.safeParse({ ...base, guests: "4", luggage: "4", golfBags: "2" });
    expect(golfOnVito.error?.issues.some((issue) => issue.path[0] === "vehicle")).toBe(true);
    expect(schema.safeParse({ ...base, vehicle: "sprinter", guests: "4", luggage: "4", golfBags: "2" }).success).toBe(true);
    const overflow = schema.safeParse({ ...base, vehicle: "sprinter", guests: "12", luggage: "12", golfBags: "4" });
    expect(overflow.error?.issues.some((issue) => issue.path[0] === "golfBags")).toBe(true);
    expect(schema.safeParse({ ...base, golfBags: "9" }).success).toBe(false);
    const strollerOverflow = schema.safeParse({ ...base, vehicle: "sprinter", guests: "12", luggage: "12", strollers: "2" });
    expect(strollerOverflow.error?.issues.some((issue) => issue.path[0] === "strollers")).toBe(true);
  });

  test("sends golf bags and strollers with the booking, defaulting to none", () => {
    expect(buildPublicBookingPayload(base, "en")).toMatchObject({ golf_bag_count: 0, stroller_count: 0 });
    expect(buildPublicBookingPayload({ ...base, golfBags: "2", strollers: "1" }, "en")).toMatchObject({ golf_bag_count: 2, stroller_count: 1 });
  });

  test("calculates one-way and round-trip prices from the canonical route", () => {
    expect(quoteFor(base)).toEqual({ price: 53, originalPrice: 63 });
    expect(quoteFor({ ...base, tripType: "round_trip" })).toEqual({ price: 106, originalPrice: 126 });
  });

  test("builds the existing Edge Function payload", () => {
    expect(buildPublicBookingPayload(base, "de")).toMatchObject({
      customer_email: "guest@example.com", pickup_location: "airport", dropoff_location: "side",
      vehicle_type: "vito", trip_type: "one_way", return_date: null, language: "de",
    });
  });

  test("carries the campaign that brought the visitor onto the booking", () => {
    expect(
      buildPublicBookingPayload(base, "de", false, {
        utm_source: "google", utm_medium: "cpc", utm_campaign: "antalya-transfer",
        utm_term: null, utm_content: null, gclid: "abc123",
        landing_page: "/de/transfers/side/", referrer: "https://www.google.com/",
      }),
    ).toMatchObject({ utm_source: "google", utm_campaign: "antalya-transfer", gclid: "abc123", landing_page: "/de/transfers/side/" });
  });

  test("a direct visit still produces a valid payload", () => {
    expect(buildPublicBookingPayload(base, "de")).toMatchObject({ utm_source: null, gclid: null });
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
    expect(quoteFor({ ...returning, hotelRegion: "belek" })).toEqual({ price: 43, originalPrice: 53 });
  });

  test("falls back to a manual quote when the hotel's region is unknown", () => {
    expect(quoteFor({ ...base, destination: "airport" })).toEqual({ price: 0, originalPrice: 0 });
    expect(quoteFor({ ...base, destination: "airport", hotelRegion: "not-a-region" }))
      .toEqual({ price: 0, originalPrice: 0 });
  });

  test("ignores the hotel's region when the guest is heading to a region", () => {
    expect(quoteFor({ ...base, destination: "belek", hotelRegion: "alanya" })).toEqual({ price: 43, originalPrice: 53 });
  });
});

describe("per-hotel band pricing", () => {
  test("airport→hotel arrival is priced on the hotel's band, not the flat region", () => {
    const arriving = { ...base, destination: "antalya", hotelName: "Caner Mountain Hotel", vehicle: "vito" as const };
    expect(quoteFor(arriving).price).toBe(65);
  });

  test("hotel→airport is priced on the same band (both directions)", () => {
    const leaving = { ...base, destination: "airport", hotelRegion: "antalya", hotelName: "Caner Mountain Hotel", vehicle: "vito" as const };
    expect(quoteFor(leaving).price).toBe(65);
  });

  test("round trip doubles the floored unit price, not the region price", () => {
    const roundTrip = { ...base, destination: "antalya", hotelName: "Caner Mountain Hotel", vehicle: "vito" as const, tripType: "round_trip" as const };
    expect(quoteFor(roundTrip).price).toBe(130);
  });

  test("an unmatched hotel keeps the flat region price", () => {
    expect(quoteFor({ ...base, destination: "side" }).price).toBe(53);
  });
});

describe("original price never inverts below the floored live price", () => {
  test("a band-raised hotel keeps originalPrice at or above price", () => {
    // Sunprime C-Lounge: band raises Vito to €100; region original (alanya_merkez) is €88.
    // originalPrice must be floored up to at least the live price, never below it.
    const q = quoteFor({ ...base, destination: "alanya_merkez", hotelName: "Sunprime C-Lounge", vehicle: "vito" as const });
    expect(q.originalPrice).toBeGreaterThanOrEqual(q.price);
  });

  test("an unchanged hotel keeps its original discount framing", () => {
    // base: side region, unmatched hotel -> price 53, originalPrice 63 (unchanged)
    const q = quoteFor({ ...base, destination: "side" });
    expect(q.price).toBe(53);
    expect(q.originalPrice).toBe(63);
  });
});

describe("flight verification on the payload", () => {
  test("carries the verification through under the column names", () => {
    const payload = buildPublicBookingPayload(
      { ...base, flightVerificationStatus: "verified", flightScheduledArrival: "14:35" } as PublicBookingValues,
      "tr",
    );
    expect(payload.flight_verification_status).toBe("verified");
    expect(payload.flight_scheduled_arrival).toBe("14:35");
  });

  test("an unchecked flight sends null rather than a made-up status", () => {
    const payload = buildPublicBookingPayload(base, "tr");
    expect(payload.flight_verification_status).toBeNull();
    expect(payload.flight_scheduled_arrival).toBeNull();
  });
});
