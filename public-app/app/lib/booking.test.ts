import { describe, expect, test } from "vitest";
import { buildPublicBookingPayload, confirmedPriceCopy, createPublicBookingSchema, quoteFor, sprinterFits, vitoFits, type PublicBookingValues } from "./booking";

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

describe("what the confirmation screen promises about the price", () => {
  test("a fixed fare is a fixed fare", () => {
    expect(confirmedPriceCopy({ tripType: "one_way", destination: "side" }, 53)).toBe("fixedTotal");
  });

  test("a daily hire says its own thing whatever the total", () => {
    expect(confirmedPriceCopy({ tripType: "daily_chauffeur", destination: "" }, 600)).toBe("dailyHire");
  });

  test("an airport-bound leg waits on the pick-up address only when it came back unpriced", () => {
    expect(confirmedPriceCopy({ tripType: "one_way", destination: "airport" }, 0)).toBe("pendingPickup");
    // A hotel we could place is priced on its own region, the same fare the
    // arrival costs, so there is a fixed total to promise.
    expect(confirmedPriceCopy({ tripType: "one_way", destination: "airport" }, 43)).toBe("fixedTotal");
  });

  test("a private destination waits on the drop-off address", () => {
    expect(confirmedPriceCopy({ tripType: "one_way", destination: "private_address" }, 0)).toBe("pendingDropoff");
  });

  test("a journey we could not price does not promise a fixed total", () => {
    // A hotel-to-hotel booking whose pick-up hotel is not in the index comes
    // back with no price. Telling the guest to pay "the fixed total" when no
    // total was ever shown is the one thing the screen must not do.
    expect(confirmedPriceCopy({ tripType: "one_way", destination: "alanya_merkez" }, 0)).toBe("pendingQuote");
  });
});

describe("hotel-to-hotel journeys", () => {
  // Alanya centre (125 km out) to Side (65 km out), 65 km apart on the coast
  // road: 255 vehicle km against the 250 an airport transfer to Alanya takes.
  // The journey is Alanya's, so Alanya centre's €93 anchors it, not Side's €53.
  const leavingAlanya = {
    ...base,
    pickup: "hotel" as const,
    destination: "side",
    hotelRegion: "alanya_merkez",
    hotelName: "Test Hotel",
    dropoffHotelName: "Another Hotel",
  };

  test("prices the journey on the farther end, not on where it happens to finish", () => {
    expect(quoteFor(leavingAlanya).price).toBe(95);
  });

  test("costs the same in both directions", () => {
    const towardsAlanya = { ...leavingAlanya, destination: "alanya_merkez", hotelRegion: "side" };
    expect(quoteFor(towardsAlanya).price).toBe(quoteFor(leavingAlanya).price);
  });

  test("charges the detour when the journey crosses the city", () => {
    // Alanya centre to Kemer is driven in past the airport and back out: 175
    // equivalent km, 50 of them beyond Alanya's own journey.
    expect(quoteFor({ ...leavingAlanya, destination: "kemer" }).price).toBe(123);
  });

  test("keeps the crossed-out price above the fare", () => {
    const quote = quoteFor(leavingAlanya);
    expect(quote.originalPrice).toBe(105);
    expect(quote.originalPrice).toBeGreaterThan(quote.price);
  });

  test("doubles for a round trip", () => {
    expect(quoteFor({ ...leavingAlanya, tripType: "round_trip" }).price).toBe(190);
  });

  test("follows the price the operator sets for the farther end", () => {
    expect(quoteFor(leavingAlanya, { routePrices: { "alanya_merkez:vito": 120 } }).price).toBe(122);
  });

  test("is quoted by hand when the pick-up hotel's region is unknown", () => {
    // Nothing places the pick-up hotel, so there is no journey to price —
    // the same answer an airport-bound leg from an unplaced hotel gives
    // rather than selling an Alanya journey at Side's price.
    expect(quoteFor({ ...leavingAlanya, hotelRegion: "" })).toEqual({ price: 0, originalPrice: 0 });
  });

  test("leaves a daily hire from a hotel priced by the day", () => {
    // Both ends of a daily hire are hotels too, but the vehicle is bought by
    // the day and never priced on a journey.
    const hire = {
      ...leavingAlanya,
      tripType: "daily_chauffeur" as const,
      destination: "",
      serviceEndDate: futureDate.replace(/10$/, "13"),
    };
    expect(quoteFor(hire)).toEqual({ price: 600, originalPrice: 600 });
  });

  test("leaves airport transfers exactly where they were", () => {
    expect(quoteFor({ ...base, destination: "belek" })).toEqual({ price: 43, originalPrice: 53 });
    expect(quoteFor({ ...base, pickup: "hotel", destination: "airport", hotelRegion: "belek" }))
      .toEqual({ price: 43, originalPrice: 53 });
    expect(quoteFor({ ...base, destination: "alanya_merkez" })).toEqual({ price: 93, originalPrice: 103 });
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

describe("hotel to hotel", () => {
  const hotelToHotel: PublicBookingValues = {
    ...base, pickup: "hotel", destination: "bodrum",
    hotelName: "Lara Barut Collection", dropoffHotelName: "Mandarin Oriental Bodrum",
    pickupTime: "09:00",
  };

  test("a hotel pick-up bound for a region needs the destination hotel named", () => {
    const schema = createPublicBookingSchema(t);
    expect(schema.safeParse(hotelToHotel).success).toBe(true);
    const missing = schema.safeParse({ ...hotelToHotel, dropoffHotelName: "" });
    expect(missing.success).toBe(false);
    expect(missing.error?.issues.some((issue) => issue.path[0] === "dropoffHotelName")).toBe(true);
  });

  test("the two hotels must differ", () => {
    const same = createPublicBookingSchema(t).safeParse({ ...hotelToHotel, dropoffHotelName: " lara barut collection " });
    expect(same.success).toBe(false);
    expect(same.error?.issues.some((issue) => issue.path[0] === "dropoffHotelName")).toBe(true);
  });

  test("no destination hotel is asked for when the destination is the airport or a private address", () => {
    const schema = createPublicBookingSchema(t);
    expect(schema.safeParse({ ...hotelToHotel, destination: "airport", dropoffHotelName: "" }).success).toBe(true);
    expect(schema.safeParse({ ...hotelToHotel, destination: "private_address", dropoffHotelName: "", dropoffAddress: "Konyaaltı, 123. sokak 4" }).success).toBe(true);
  });

  test("the payload carries the destination hotel only where one was asked for", () => {
    expect(buildPublicBookingPayload(hotelToHotel, "en")).toMatchObject({
      hotel_name: "Lara Barut Collection",
      dropoff_hotel_name: "Mandarin Oriental Bodrum",
    });
    expect(buildPublicBookingPayload(base, "en")).toMatchObject({ dropoff_hotel_name: null });
  });
});

describe("the arrival flight belongs to airport journeys", () => {
  const schema = () => createPublicBookingSchema(t);

  test("an airport leg still has to name the flight", () => {
    const missing = schema().safeParse({ ...base, flightNumber: "" });
    expect(missing.success).toBe(false);
    expect(missing.error?.issues.some((issue) => issue.path[0] === "flightNumber")).toBe(true);
    const leaving = schema().safeParse({ ...base, pickup: "hotel", destination: "airport", flightNumber: "" });
    expect(leaving.success).toBe(false);
  });

  test("a journey with no airport end is not asked for one", () => {
    expect(schema().safeParse({
      ...base, pickup: "hotel", destination: "bodrum", pickupTime: "09:00",
      hotelName: "Lara Barut Collection", dropoffHotelName: "Mandarin Oriental Bodrum", flightNumber: "",
    }).success).toBe(true);
    expect(schema().safeParse({
      ...base, pickup: "private_address", pickupAddress: "Konyaaltı, 123. sokak 4", destination: "side", flightNumber: "", pickupTime: "09:00",
    }).success).toBe(true);
  });

  test("a flight left over from an earlier airport choice is not submitted", () => {
    const payload = buildPublicBookingPayload({
      ...base, pickup: "hotel", destination: "bodrum",
      hotelName: "Lara Barut Collection", dropoffHotelName: "Mandarin Oriental Bodrum",
      flightNumber: "TK123", arrivalTime: "12:30", flightVerificationStatus: "verified", flightScheduledArrival: "12:35",
    }, "en");
    expect(payload).toMatchObject({
      flight_number: null, flight_arrival_time: null,
      flight_verification_status: null, flight_scheduled_arrival: null,
    });
    expect(buildPublicBookingPayload(base, "en")).toMatchObject({ flight_number: "TK123" });
  });

  test("the flight the guest leaves on carries no arrival verdict", () => {
    const payload = buildPublicBookingPayload({
      ...base, pickup: "hotel", destination: "airport", pickupTime: "09:00",
      hotelName: "Lara Barut Collection",
      flightNumber: "TK123", arrivalTime: "12:30",
      flightVerificationStatus: "verified", flightScheduledArrival: "12:35",
    }, "en");
    expect(payload).toMatchObject({
      flight_number: "TK123",
      flight_arrival_time: "12:30",
      flight_verification_status: null,
      flight_scheduled_arrival: null,
    });
  });
})

describe("the pick-up hour of a journey that starts away from the airport", () => {
  const schema = () => createPublicBookingSchema(t);
  const leavingHotel: PublicBookingValues = {
    ...base, pickup: "hotel", destination: "airport", hotelName: "Lara Barut Collection",
  };

  test("is asked for, because no landing sets it", () => {
    const missing = schema().safeParse({ ...leavingHotel, pickupTime: "" });
    expect(missing.success).toBe(false);
    expect(missing.error?.issues.some((issue) => issue.path[0] === "pickupTime")).toBe(true);
    expect(schema().safeParse({ ...leavingHotel, pickupTime: "09:00" }).success).toBe(true);
  });

  test("is not asked of an airport pick-up, which the flight times", () => {
    expect(schema().safeParse({ ...base, pickupTime: "" }).success).toBe(true);
  });

  test("reaches the operator instead of leaving the driver with no hour", () => {
    expect(buildPublicBookingPayload({ ...leavingHotel, pickupTime: "09:00" }, "en"))
      .toMatchObject({ pickup_time: "09:00" });
    expect(buildPublicBookingPayload(base, "en")).toMatchObject({ pickup_time: null });
  });
})
