import { describe, test, expect } from "vitest";
import { hotelDistanceKm, distanceToleranceKm, isPlausibleHotelDistance } from "./hotel-distance-lookup.js";

// A fixture map keeps the resolver test independent of the generated data file.
// Voyage Sorgun sits in the 65 km `side` region; Delphin Diva Premiere in the
// 105 km `alanya_bati` one, where the real generated row geocoded to 15 km.
const distances = {
  "voyage-sorgun": { km: 55, place: "x", district: "Sorgun", checked: true },
  "hampton-by-hilton-antalya-airport-otel": { km: null, place: null, district: "Antalya", checked: false, note: "no-match" },
  "delphin-diva-premiere": { km: 15, place: "y", district: "Avsallar", checked: false },
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

  test("refuses an unverified distance that contradicts the hotel's region", () => {
    // 15 km against a 105 km region is the wrong pin, not a remote hotel.
    // Falling back to null puts the leg back on the region graph.
    expect(hotelDistanceKm("Delphin Diva Premiere", distances)).toBeNull();
  });

  test("believes a checked row however far it sits from its region", () => {
    const checked = { ...distances, "delphin-diva-premiere": { ...distances["delphin-diva-premiere"], checked: true } };
    expect(hotelDistanceKm("Delphin Diva Premiere", checked)).toBe(15);
  });
});

describe("distance plausibility", () => {
  test("widens the tolerance with the region, never below the flat band", () => {
    expect(distanceToleranceKm(15)).toBe(25);   // 40% of 15 is 6 km — far too tight
    expect(distanceToleranceKm(50)).toBe(25);   // 40% of 50 is 20 km — still the floor
    expect(distanceToleranceKm(185)).toBe(74);  // proportion takes over on long routes
  });

  test("keeps ordinary city hotels that sit well past the 15 km region figure", () => {
    // Konyaaltı and Kundu really are 22–31 km out; a percentage alone rejected
    // the whole of Antalya city for being ordinary.
    expect(isPlausibleHotelDistance(31, 15)).toBe(true);
    expect(isPlausibleHotelDistance(40, 15)).toBe(true);
    expect(isPlausibleHotelDistance(43, 15)).toBe(false);
  });

  test("accepts a hotel genuinely beyond its region on a long route", () => {
    expect(isPlausibleHotelDistance(208, 185)).toBe(true); // Kaş
    expect(isPlausibleHotelDistance(110, 90)).toBe(true);  // Adrasan
  });

  test("treats an unknown region as no constraint", () => {
    expect(isPlausibleHotelDistance(999, undefined)).toBe(true);
  });
});
