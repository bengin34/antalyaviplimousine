import { describe, test, expect } from "vitest";
import { bandUnitPrice, VITO_BANDS } from "./hotel-transfer-pricing.js";

describe("bandUnitPrice", () => {
  test("maps each band edge to its documented Vito price", () => {
    const expected = [[20, 35], [30, 40], [40, 45], [50, 50], [60, 60], [70, 65],
      [85, 75], [100, 80], [115, 90], [130, 100], [150, 110], [175, 125], [210, 150], [260, 180]];
    for (const [km, price] of expected) {
      expect(bandUnitPrice(km, "vito")).toBe(price);
    }
  });

  test("steps up to the next band just past an edge", () => {
    expect(bandUnitPrice(21, "vito")).toBe(40);
    expect(bandUnitPrice(61, "vito")).toBe(65);
  });

  test("prices beyond the last edge from the direct formula", () => {
    expect(bandUnitPrice(300, "vito")).toBe(200);
  });

  test("derives Sprinter as roundUp5((vito - 10) * 1.7) + 10", () => {
    expect(bandUnitPrice(74, "sprinter")).toBe(125);
    expect(bandUnitPrice(20, "sprinter")).toBe(55);
    expect(bandUnitPrice(146, "sprinter")).toBe(180);
  });

  test("every band price keeps at least the €5 worst-case margin over true cost", () => {
    for (const [maxKm, vitoPrice] of VITO_BANDS) {
      expect(vitoPrice).toBeGreaterThanOrEqual(0.6 * maxKm + 5);
    }
  });

  test("returns null for a non-finite or negative km", () => {
    expect(bandUnitPrice(NaN, "vito")).toBeNull();
    expect(bandUnitPrice(-5, "vito")).toBeNull();
  });
});

import { hotelUnitPrice } from "./hotel-transfer-pricing.js";
import { hotelIndex } from "./hotel-index.js";
import { hotelDistances } from "./hotel-distances.js";
import { routeCatalog } from "./routes.js";

// Fixture keeps floor/fallback tests independent of the generated data file.
const fixtureDistances = {
  "caner-mountain-hotel": { km: 74 },
  "voyage-sorgun": { km: 70 },
};

describe("hotelUnitPrice", () => {
  test("raises to the band price when the band beats today's price", () => {
    // Caner Mountain 74 km -> Vito band 75, region price 45 -> 75
    expect(hotelUnitPrice("Caner Mountain Hotel", "vito", 45, fixtureDistances)).toBe(75);
  });

  test("keeps today's price when it already beats the band", () => {
    // Voyage Sorgun 70 km -> Vito band 65; a €70 admin override beats it -> 70
    expect(hotelUnitPrice("Voyage Sorgun", "vito", 70, fixtureDistances)).toBe(70);
  });

  test("returns today's price for a hotel that matches nothing", () => {
    expect(hotelUnitPrice("no such place at all", "vito", 50, fixtureDistances)).toBe(50);
  });

  test("returns today's price for a matched hotel with no seeded distance", () => {
    // Caner Mountain resolves to slug caner-mountain-hotel, but injected with a
    // null distance -> exercises the matched-but-no-km branch (distinct from the
    // unmatched-name branch). Every real hotel currently HAS a distance, so this
    // branch can only be forced via the fixture.
    expect(hotelUnitPrice("Caner Mountain Hotel", "vito", 50, { "caner-mountain-hotel": { km: null } })).toBe(50);
  });

  test("never quotes below true cost or region price for any indexed hotel", () => {
    for (const hotel of hotelIndex) {
      const km = Number(hotelDistances[hotel.slug]?.km);
      if (!Number.isFinite(km) || km <= 0) continue;
      const region = routeCatalog[hotel.region];
      if (!region) continue;
      const trueCost = 0.6 * km + 5;
      const vito = Math.max(bandUnitPrice(km, "vito"), region.prices.vito);
      const sprinter = Math.max(bandUnitPrice(km, "sprinter"), region.prices.sprinter);
      expect(vito).toBeGreaterThanOrEqual(trueCost);
      expect(sprinter).toBeGreaterThanOrEqual(trueCost);
      expect(vito).toBeGreaterThanOrEqual(region.prices.vito);
      expect(sprinter).toBeGreaterThanOrEqual(region.prices.sprinter);
    }
  });
});
