import { describe, expect, test } from "vitest";
import { routeCatalog } from "../../../src/routes.js";
import { quoteFor } from "../../../public-app/app/lib/booking";
import { airportTariffRegion, hasTariffRow, hotelToHotelPriceEur, type RoutePriceRow } from "./transfer-price";

// The `routes` table as the edge function reads it: one published airport fare
// per region for the chosen vehicle.
const rowsFor = (vehicle: "vito" | "sprinter"): RoutePriceRow[] =>
  Object.entries(routeCatalog).map(([slug, route]) => ({
    to_location: slug,
    price_eur: route.prices[vehicle],
  }));

describe("whether a destination is one we sell at all", () => {
  test("recognizes a region with a published tariff", () => {
    expect(hasTariffRow(rowsFor("vito"), "side")).toBe(true);
  });

  test("rejects a destination that is not in the table", () => {
    // The old pricing path answered a destination like this with a 400, and a
    // hotel-to-hotel booking has to keep doing so: an unknown region is a
    // malformed request, not a journey for the operator to quote.
    expect(hasTariffRow(rowsFor("vito"), "narnia")).toBe(false);
    expect(hasTariffRow(rowsFor("vito"), "")).toBe(false);
  });

  test("rejects a region whose row carries no usable price", () => {
    expect(hasTariffRow([{ to_location: "side", price_eur: 0 }], "side")).toBe(false);
  });
});

describe("what the server charges for a hotel-to-hotel transfer", () => {
  test("anchors the fare on the farther end, as the quote did", () => {
    expect(hotelToHotelPriceEur(rowsFor("vito"), {
      pickupRegion: "alanya_merkez",
      dropoffRegion: "side",
      vehicleType: "vito",
      isRoundTrip: false,
    })).toBe(95);
  });

  test("doubles for a round trip", () => {
    expect(hotelToHotelPriceEur(rowsFor("vito"), {
      pickupRegion: "alanya_merkez",
      dropoffRegion: "side",
      vehicleType: "vito",
      isRoundTrip: true,
    })).toBe(190);
  });

  test("prices a Sprinter on the Sprinter's own tariff rows", () => {
    expect(hotelToHotelPriceEur(rowsFor("sprinter"), {
      pickupRegion: "alanya_merkez",
      dropoffRegion: "side",
      vehicleType: "vclass",
      isRoundTrip: false,
    })).toBe(100);
  });

  test("has no price when the pick-up hotel could not be placed", () => {
    expect(hotelToHotelPriceEur(rowsFor("vito"), {
      pickupRegion: "",
      dropoffRegion: "side",
      vehicleType: "vito",
      isRoundTrip: false,
    })).toBeNull();
  });

  test("has no price when the anchoring region carries no tariff row", () => {
    const withoutAlanya = rowsFor("vito").filter((row) => row.to_location !== "alanya_merkez");
    expect(hotelToHotelPriceEur(withoutAlanya, {
      pickupRegion: "alanya_merkez",
      dropoffRegion: "side",
      vehicleType: "vito",
      isRoundTrip: false,
    })).toBeNull();
  });

  test("ignores a row whose price cannot be read", () => {
    const broken: RoutePriceRow[] = rowsFor("vito")
      .map((row) => (row.to_location === "alanya_merkez" ? { ...row, price_eur: "" } : row));
    expect(hotelToHotelPriceEur(broken, {
      pickupRegion: "alanya_merkez",
      dropoffRegion: "side",
      vehicleType: "vito",
      isRoundTrip: false,
    })).toBeNull();
  });

  test("charges what the browser quoted, to the euro", () => {
    // The guest accepts a number in the funnel and the operator bills the one
    // stored here; they come from the same module, so they cannot drift.
    for (const [pickupRegion, dropoffRegion] of [
      ["alanya_merkez", "side"],
      ["side", "alanya_merkez"],
      ["antalya", "alanya_dogu"],
      ["belek", "side"],
      ["alanya_merkez", "kemer"],
      ["antalya", "bodrum"],
    ]) {
      expect(
        hotelToHotelPriceEur(rowsFor("vito"), { pickupRegion, dropoffRegion, vehicleType: "vito", isRoundTrip: false }),
        `${pickupRegion} → ${dropoffRegion}`,
      ).toBe(quotedInBrowser(pickupRegion, dropoffRegion));
    }
  });
});

describe("which region's airport tariff prices a radial journey", () => {
  const journey = (pickupLocation: string, dropoffLocation: string, pickupHotelRegion = "") =>
    airportTariffRegion({ pickupLocation, dropoffLocation, pickupHotelRegion });

  test("an arrival is priced on the region the guest is going to", () => {
    expect(journey("airport", "belek")).toBe("belek");
  });

  test("a run to the airport is priced on the region it leaves, not left unpriced", () => {
    // The whole point: AYT → Belek and Belek → AYT read the same tariff row,
    // which is the fare the site quotes in both directions.
    expect(journey("hotel", "airport", "belek")).toBe("belek");
    expect(journey("hotel", "airport", "belek")).toBe(journey("airport", "belek"));
  });

  test("a hotel we cannot place has nothing to price, so the operator quotes it", () => {
    expect(journey("hotel", "airport", "")).toBe("");
  });

  test("a private pick-up address bound for the airport is still quoted by hand", () => {
    // No hotel to place, so there is no region and no fare to promise.
    expect(journey("private_address", "airport", "belek")).toBe("");
  });

  test("a private destination is quoted by hand whatever it leaves from", () => {
    expect(journey("airport", "private_address")).toBe("");
    expect(journey("hotel", "private_address", "belek")).toBe("");
  });

  test("the fare it picks is the one the browser quoted for that direction", () => {
    for (const region of ["belek", "side", "kemer", "alanya"]) {
      const row = rowsFor("vito").find((candidate) => candidate.to_location === journey("hotel", "airport", region));
      expect(Number(row?.price_eur), `${region} → AYT`).toBe(quoteFor({
        tripType: "one_way", pickup: "hotel", destination: "airport", hotelRegion: region,
        vehicle: "vito", hotelName: "Not an indexed hotel", travelDate: "", serviceEndDate: "",
      }).price);
    }
  });
});

/** The same fare the public form shows, computed the way the form computes it. */
function quotedInBrowser(pickupRegion: string, dropoffRegion: string) {
  return quoteFor({
    tripType: "one_way", pickup: "hotel", destination: dropoffRegion, hotelRegion: pickupRegion,
    vehicle: "vito", hotelName: "Not an indexed hotel", travelDate: "", serviceEndDate: "",
  }).price;
}
