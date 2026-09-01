import { describe, test, expect } from "vitest";
import { hotelDistanceKm } from "./hotel-distance-lookup.js";

// A fixture map keeps the resolver test independent of the generated data file.
const distances = {
  "voyage-sorgun": { km: 55, place: "x", district: "Sorgun", checked: true },
  "hampton-by-hilton-antalya-airport-otel": { km: null, place: null, district: "Antalya", checked: false, note: "no-match" },
};

describe("hotelDistanceKm", () => {
  test("resolves a hotel name to its one-way km", () => {
    expect(hotelDistanceKm("Voyage Sorgun", distances)).toBe(55);
  });

  test("tolerates a partially typed / misspelled name via the form matcher", () => {
    expect(hotelDistanceKm("voyage sorg", distances)).toBe(55);
  });

  test("returns null when the name matches no hotel", () => {
    expect(hotelDistanceKm("no such place at all", distances)).toBeNull();
  });

  test("returns null when the matched hotel has no km yet", () => {
    // Hampton By Hilton Antalya Airport Otel resolves to slug hampton-by-hilton-antalya-airport-otel
    expect(hotelDistanceKm("Hampton By Hilton Antalya Airport Otel", distances)).toBeNull();
  });

  test("returns null for empty input", () => {
    expect(hotelDistanceKm("", distances)).toBeNull();
  });
});
