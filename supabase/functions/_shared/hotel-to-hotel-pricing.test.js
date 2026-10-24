import { describe, expect, test } from "vitest";
import { regionDistanceKm, routeCatalog } from "../../../src/routes.js";
import {
  DETOUR_EUR_PER_KM,
  hotelToHotelUnitPrice,
  journeyEquivalentOneWayKm,
} from "./hotel-to-hotel-pricing.js";

const tariffFor = (region, vehicle) => routeCatalog[region]?.prices[vehicle] ?? null;
const priceFor = (pickupRegion, dropoffRegion, vehicle = "vito") =>
  hotelToHotelUnitPrice({ pickupRegion, dropoffRegion, vehicle, tariffFor });

describe("what a hotel-to-hotel journey costs the vehicle", () => {
  test("a run along the coast ties the vehicle up for the farther end's whole journey", () => {
    // Side → Alanya centre: out to Side (65), on to Alanya (65), home (125).
    // 255 vehicle km, where the airport transfer to Alanya is 250 — the same
    // vehicle, the same day, not the 65 km the guest is carried.
    expect(journeyEquivalentOneWayKm("side", "alanya_merkez")).toBe(127.5);
  });

  test("a run across the city adds both radial distances", () => {
    // Nothing joins the eastern and western strips but the road past the
    // airport, so Alanya → Kemer is driven out, in, out and in again.
    expect(journeyEquivalentOneWayKm("alanya_merkez", "kemer")).toBe(175);
  });

  test("a hop inside one region is still the region's own journey", () => {
    expect(journeyEquivalentOneWayKm("side", "side")).toBe(65);
  });

  test("is never less than the farther end's own journey, nor more than driving via the airport", () => {
    for (const from of Object.keys(regionDistanceKm)) {
      for (const to of Object.keys(regionDistanceKm)) {
        const equivalent = journeyEquivalentOneWayKm(from, to);
        const farther = Math.max(regionDistanceKm[from], regionDistanceKm[to]);
        expect(equivalent, `${from} → ${to}`).toBeGreaterThanOrEqual(farther);
        expect(equivalent, `${from} → ${to}`).toBeLessThanOrEqual(regionDistanceKm[from] + regionDistanceKm[to]);
      }
    }
  });

  test("has no answer for a region with no airport distance", () => {
    expect(journeyEquivalentOneWayKm("side", "")).toBeNull();
  });
});

describe("the fare for a hotel-to-hotel journey", () => {
  test("is anchored on the published tariff of the farther end", () => {
    // Alanya centre → Side today sells at Side's €53 while tying up the
    // vehicle for an Alanya journey. Anchored on Alanya centre's €93 instead,
    // plus €0.60 for each of the 2.5 km the detour adds.
    expect(priceFor("alanya_merkez", "side")).toBe(95);
  });

  test("costs the same in both directions", () => {
    expect(priceFor("side", "alanya_merkez")).toBe(priceFor("alanya_merkez", "side"));
  });

  test("charges the detour when the journey crosses the city", () => {
    // 175 km equivalent against Alanya centre's own 125: 50 km of detour on
    // top of the €93 anchor.
    expect(priceFor("alanya_merkez", "kemer")).toBe(123);
  });

  test("leaves a journey inside one region on that region's tariff", () => {
    expect(priceFor("side", "side")).toBe(routeCatalog.side.prices.vito);
    expect(priceFor("side", "side", "sprinter")).toBe(routeCatalog.side.prices.sprinter);
  });

  test("never falls below the distance band that clears cost", () => {
    // Antalya → East Alanya: the €98 anchor plus 15 km of detour is €107,
    // and 153 equivalent km need €105 to clear cost — here the anchor wins.
    expect(priceFor("antalya", "alanya_dogu")).toBe(107);
    for (const from of Object.keys(regionDistanceKm)) {
      for (const to of Object.keys(regionDistanceKm)) {
        for (const vehicle of ["vito", "sprinter"]) {
          const equivalent = journeyEquivalentOneWayKm(from, to);
          const costFloor = 0.6 * equivalent + 10;
          expect(priceFor(from, to, vehicle), `${from} → ${to} ${vehicle}`).toBeGreaterThanOrEqual(costFloor);
        }
      }
    }
  });

  test("is never below the published tariff of either end", () => {
    for (const from of Object.keys(regionDistanceKm)) {
      for (const to of Object.keys(regionDistanceKm)) {
        for (const vehicle of ["vito", "sprinter"]) {
          const farther = regionDistanceKm[from] >= regionDistanceKm[to] ? from : to;
          expect(priceFor(from, to, vehicle), `${from} → ${to} ${vehicle}`)
            .toBeGreaterThanOrEqual(tariffFor(farther, vehicle));
        }
      }
    }
  });

  test("never prices the Sprinter below the Vito", () => {
    for (const from of Object.keys(regionDistanceKm)) {
      for (const to of Object.keys(regionDistanceKm)) {
        expect(priceFor(from, to, "sprinter"), `${from} → ${to}`)
          .toBeGreaterThanOrEqual(priceFor(from, to, "vito"));
      }
    }
  });

  test("lands on a whole euro, like every published tariff", () => {
    for (const from of Object.keys(regionDistanceKm)) {
      for (const to of Object.keys(regionDistanceKm)) {
        expect(priceFor(from, to) % 1, `${from} → ${to}`).toBe(0);
      }
    }
  });

  test("recovers the detour's own km cost and nothing more", () => {
    // 15 TRY a km at 50 TRY to the euro, out and back: €0.60 for every km the
    // detour adds. What margin a cross-region detour should carry beyond that
    // is a commercial decision, so it is one named number.
    expect(DETOUR_EUR_PER_KM).toBe(0.6);
  });

  test("has no fare when either end's region is unknown", () => {
    expect(priceFor("side", "")).toBeNull();
    expect(priceFor("", "side")).toBeNull();
    expect(priceFor("side", "land_of_legends")).toBeNull();
  });

  test("has no fare when the farther end carries no published tariff", () => {
    expect(hotelToHotelUnitPrice({
      pickupRegion: "side",
      dropoffRegion: "alanya_merkez",
      vehicle: "vito",
      tariffFor: (region) => (region === "alanya_merkez" ? null : 53),
    })).toBeNull();
  });

  test("follows the tariff the operator sets, not a hardcoded one", () => {
    const raised = hotelToHotelUnitPrice({
      pickupRegion: "alanya_merkez",
      dropoffRegion: "side",
      vehicle: "vito",
      tariffFor: (region, vehicle) => (region === "alanya_merkez" ? 150 : tariffFor(region, vehicle)),
    });
    expect(raised).toBe(152);
  });
});
