import { describe, test, expect } from "vitest";
import { bandUnitPrice, VITO_BANDS } from "./hotel-transfer-pricing.js";

describe("bandUnitPrice", () => {
  test("maps each band edge to its documented Vito price", () => {
    const expected = [[20, 25], [30, 30], [40, 35], [50, 40], [60, 50], [70, 55],
      [85, 65], [100, 70], [115, 80], [130, 90], [150, 100], [175, 115], [210, 140], [260, 170]];
    for (const [km, price] of expected) {
      expect(bandUnitPrice(km, "vito")).toBe(price);
    }
  });

  test("steps up to the next band just past an edge", () => {
    expect(bandUnitPrice(21, "vito")).toBe(30);
    expect(bandUnitPrice(61, "vito")).toBe(55);
  });

  test("prices beyond the last edge from the direct formula", () => {
    expect(bandUnitPrice(300, "vito")).toBe(190);
  });

  test("derives Sprinter as roundUp5(vito * 1.7)", () => {
    expect(bandUnitPrice(74, "sprinter")).toBe(115);
    expect(bandUnitPrice(20, "sprinter")).toBe(45);
    expect(bandUnitPrice(146, "sprinter")).toBe(170);
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
