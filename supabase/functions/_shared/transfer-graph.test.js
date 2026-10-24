import { describe, expect, test } from "vitest";
import { routeCatalog } from "../../../src/routes.js";
import { REGIONAL_CONNECTIONS, REGION_AIRPORT_KM, betweenRegionsKm } from "./transfer-graph.js";

const regionKm = Object.fromEntries(
  Object.entries(routeCatalog).map(([slug, route]) => [slug, route.distanceKm]),
);

describe("driving distance between two pricing regions", () => {
  test("follows the coast road between two eastern regions", () => {
    // side → manavgat 10 → kizilagac 15 → alanya_bati 20 → alanya_merkez 20
    expect(betweenRegionsKm("side", "alanya_merkez")).toBe(65);
  });

  test("passes the airport when the two regions sit on opposite sides of it", () => {
    // No coast road joins the eastern and western strips, so the journey runs
    // past the airport: 125 km in from Alanya centre, 50 km back out to Kemer.
    expect(betweenRegionsKm("alanya_merkez", "kemer")).toBe(175);
  });

  test("is nothing inside a single region", () => {
    expect(betweenRegionsKm("side", "side")).toBe(0);
  });

  test("costs the same in both directions", () => {
    expect(betweenRegionsKm("alanya_merkez", "side"))
      .toBe(betweenRegionsKm("side", "alanya_merkez"));
  });

  test("has no distance for a region whose own airport distance is unknown", () => {
    expect(betweenRegionsKm("side", "land_of_legends")).toBeNull();
    expect(betweenRegionsKm("", "side")).toBeNull();
  });

  test("never claims a shortcut the two radial distances do not allow", () => {
    for (const from of Object.keys(regionKm)) {
      for (const to of Object.keys(regionKm)) {
        const between = betweenRegionsKm(from, to);
        expect(between, `${from} → ${to}`).toBeLessThanOrEqual(regionKm[from] + regionKm[to]);
      }
    }
  });

  test("measures every region from the airport exactly as the catalogue does", () => {
    // The edge function cannot import the route catalogue, so the radial
    // distances are repeated here. A region added, removed or re-measured in
    // the catalogue and not here would price the server's fares off stale
    // geometry, which is what this catches.
    expect(REGION_AIRPORT_KM).toEqual(regionKm);
  });

  test("names only regions the catalogue knows", () => {
    for (const [from, to] of REGIONAL_CONNECTIONS) {
      expect(regionKm[from], from).toBeTypeOf("number");
      expect(regionKm[to], to).toBeTypeOf("number");
    }
  });
});
