import { describe, expect, test } from "vitest";
import {
  isValidLandOfLegendsVisit,
  landOfLegendsFromPrice,
  landOfLegendsPrice,
  landOfLegendsRates,
  landOfLegendsVitoPrice,
  landOfLegendsZoneKm,
} from "./land-of-legends.js";
import { routeCatalog } from "./routes.js";

describe("landOfLegendsPrice", () => {
  test("matches the agreed Vito tariff", () => {
    const expected = {
      belek: 65, bogazkent: 65, antalya: 105, side: 115, manavgat: 115,
      kizilagac: 135, kemer: 155, alanya_bati: 170, tekirova: 185,
      alanya_merkez: 210, alanya_dogu: 230, alanya: 230,
    };
    for (const [region, price] of Object.entries(expected)) {
      expect(landOfLegendsPrice(region, "vito")).toBe(price);
    }
  });

  test("anchors Antalya city on €105 from the €50 + €0.70/km formula", () => {
    expect(landOfLegendsVitoPrice(40)).toBe(105);
  });

  test("prices the Sprinter at the Vito price × 1.4, rounded to €5", () => {
    expect(landOfLegendsPrice("antalya", "sprinter")).toBe(145);
    expect(landOfLegendsPrice("belek", "sprinter")).toBe(90);
  });

  test("returns null for a region quoted on request", () => {
    expect(landOfLegendsPrice("kas", "vito")).toBeNull();
    expect(landOfLegendsPrice("", "vito")).toBeNull();
  });

  test("a farther region never costs less than a nearer one", () => {
    const ordered = Object.entries(landOfLegendsZoneKm).sort(([, a], [, b]) => a - b);
    for (let i = 1; i < ordered.length; i += 1) {
      expect(landOfLegendsRates[ordered[i][0]].vito).toBeGreaterThanOrEqual(landOfLegendsRates[ordered[i - 1][0]].vito);
    }
  });

  test("every priced region is a real pricing region", () => {
    for (const region of Object.keys(landOfLegendsZoneKm)) {
      expect(routeCatalog).toHaveProperty(region);
    }
  });

  test("the from-price is the cheapest Vito fare", () => {
    expect(landOfLegendsFromPrice).toBe(65);
  });
});

describe("isValidLandOfLegendsVisit", () => {
  test("accepts a day visit that ends after the evening show", () => {
    expect(isValidLandOfLegendsVisit("09:00", "22:30")).toBe(true);
    expect(isValidLandOfLegendsVisit("10:00", "23:30")).toBe(true);
  });

  test("rejects a return before departure, under two hours, or past 23:30", () => {
    expect(isValidLandOfLegendsVisit("18:00", "10:00")).toBe(false);
    expect(isValidLandOfLegendsVisit("10:00", "11:30")).toBe(false);
    expect(isValidLandOfLegendsVisit("10:00", "23:45")).toBe(false);
    expect(isValidLandOfLegendsVisit("", "22:00")).toBe(false);
  });
});
