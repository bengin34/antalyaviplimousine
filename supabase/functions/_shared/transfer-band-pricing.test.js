import { describe, expect, test } from "vitest";
import { bandUnitPrice, costFloorUnitPrice, VITO_BANDS } from "./transfer-band-pricing.js";
import { bandUnitPrice as bandUnitPriceFromSrc } from "../../../src/hotel-transfer-pricing.js";

describe("the distance band floor, shared with the server", () => {
  test("prices a distance from the band table", () => {
    expect(bandUnitPrice(65, "vito")).toBe(55);
    expect(bandUnitPrice(65, "sprinter")).toBe(95);
  });

  test("has no price for a distance that is not a distance", () => {
    expect(bandUnitPrice(0, "vito")).toBeNull();
    expect(bandUnitPrice(Number.NaN, "vito")).toBeNull();
  });

  test("floors an exact distance without rounding it up to a band first", () => {
    // 0.60 × km + 10, up to the next €5. A journey whose distance is derived
    // from the route catalogue is already exact, so it does not need the
    // band table's coarseness: at 153 km the floor is €105, not the €115 the
    // 175 km band would charge.
    expect(costFloorUnitPrice(153)).toBe(105);
    expect(bandUnitPrice(153, "vito")).toBe(115);
  });

  test("floors both vans alike — the kilometre costs the same either way", () => {
    // The band table holds the Vito:Sprinter ratio, which lifts a matched
    // hotel's Sprinter quote well past the published tariff. A journey's floor
    // only has to clear what the journey costs, and that is one number.
    expect(costFloorUnitPrice(130)).toBe(90);
    expect(bandUnitPrice(130, "vito")).toBe(90);
    expect(bandUnitPrice(130, "sprinter")).toBe(155);
  });

  test("floors every band edge at the band table's own price", () => {
    for (const [maxKm] of VITO_BANDS) {
      expect(costFloorUnitPrice(maxKm)).toBe(bandUnitPrice(maxKm, "vito"));
    }
  });

  test("has no floor for a distance that is not a distance either", () => {
    expect(costFloorUnitPrice(0)).toBeNull();
    expect(costFloorUnitPrice(Number.NaN)).toBeNull();
  });

  test("is the same floor the site has always applied", () => {
    for (const [maxKm] of VITO_BANDS) {
      expect(bandUnitPriceFromSrc(maxKm, "vito")).toBe(bandUnitPrice(maxKm, "vito"));
      expect(bandUnitPriceFromSrc(maxKm, "sprinter")).toBe(bandUnitPrice(maxKm, "sprinter"));
    }
  });
});
