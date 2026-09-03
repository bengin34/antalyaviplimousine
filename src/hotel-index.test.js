import { describe, expect, test } from "vitest";
import { districtRegions, hotelIndex, hotelSlug, indexedHotelBySlug, indexedHotelsForRegion } from "./hotel-index.js";
import { hotelCatalog } from "./hotels.js";
import { routeCatalog } from "./routes.js";

describe("static hotel index", () => {
  test("every hotel points at a region that exists in the route catalogue", () => {
    for (const hotel of hotelIndex) {
      expect(routeCatalog, `${hotel.name} has an unknown region "${hotel.region}"`).toHaveProperty(hotel.region);
    }
  });

  test("every mapped district is sold as a region we have a price for", () => {
    for (const [district, region] of Object.entries(districtRegions)) {
      expect(routeCatalog, `district "${district}" maps to unknown region "${region}"`).toHaveProperty(region);
    }
  });

  test("a hotel's region comes from its district, so correcting one moves them all", () => {
    for (const hotel of hotelIndex) {
      expect(["district", "discovery"]).toContain(hotel.regionSource);
      if (hotel.regionSource === "discovery") continue;
      expect(districtRegions[hotel.district], `${hotel.name} sits in unmapped district "${hotel.district}"`).toBeDefined();
      expect(hotel.region).toBe(districtRegions[hotel.district]);
    }
  });

  test("hotels in the same district are never priced differently", () => {
    const regionsByDistrict = new Map();
    for (const hotel of hotelIndex) {
      if (hotel.regionSource === "discovery") continue;
      const seen = regionsByDistrict.get(hotel.district);
      if (seen) expect(hotel.region, `${hotel.district} is split across regions`).toBe(seen);
      else regionsByDistrict.set(hotel.district, hotel.region);
    }
  });

  test("slugs are unique so a hotel resolves to exactly one entry", () => {
    const slugs = hotelIndex.map((hotel) => hotel.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("names and districts are filled in", () => {
    for (const hotel of hotelIndex) {
      expect(hotel.name.trim().length).toBeGreaterThan(1);
      expect(hotel.district.trim().length).toBeGreaterThan(1);
    }
  });

  test("every German landing-page hotel is indexed under a region that page can price", () => {
    for (const hotel of Object.values(hotelCatalog)) {
      // The catalogue keeps its own hand-written slugs, so match on the name.
      const indexed = indexedHotelBySlug(hotelSlug(hotel.name));
      expect(indexed, `${hotel.name} is missing from the search index`).not.toBeNull();
      expect(indexed.name).toBe(hotel.name);
      // The index may price a hotel by a sub-region of the page it is presented
      // on — an Alanya hotel is quoted at its belde's price, not the umbrella.
      const landing = routeCatalog[indexed.region].landingRoute ?? indexed.region;
      expect(landing, `${hotel.name} is priced outside its landing region`).toBe(hotel.regionSlug);
    }
  });

  test("only hand-checked landing-page hotels count as verified", () => {
    const verified = hotelIndex.filter((hotel) => hotel.status === "verified").map((hotel) => hotel.name).sort();
    expect(verified).toEqual(Object.values(hotelCatalog).map((hotel) => hotel.name).sort());
    expect(hotelIndex.some((hotel) => hotel.status === "draft")).toBe(true);
  });

  test("merges safe discovered hotels with explicit pricing regions", () => {
    const discovered = hotelIndex.filter((hotel) => hotel.regionSource === "discovery");
    expect(discovered).toHaveLength(351);
    expect(new Set(discovered.map((hotel) => hotel.placeId)).size).toBe(discovered.length);
    expect(indexedHotelBySlug("side-sun-otel")).toMatchObject({
      name: "SİDE SUN OTEL",
      district: "Manavgat",
      region: "side",
      placeId: "ChIJyZpwOHxZwxQRFfUUBWXfZPs",
      regionSource: "discovery",
      status: "draft",
    });
  });

  test("slugs are derived from the name, including Turkish letters", () => {
    expect(hotelSlug("Rixos Premium Belek")).toBe("rixos-premium-belek");
    expect(hotelSlug("Sunis Kumköy Beach Resort")).toBe("sunis-kumkoy-beach-resort");
    expect(hotelSlug("Aydinbey King's Palace")).toBe("aydinbey-king-s-palace");
    expect(hotelSlug("Adam & Eve Hotels")).toBe("adam-eve-hotels");
  });

  test("region lookup returns only that region's hotels", () => {
    const belek = indexedHotelsForRegion("belek");
    expect(belek.length).toBeGreaterThan(0);
    expect(belek.every((hotel) => hotel.region === "belek")).toBe(true);
    expect(indexedHotelsForRegion("kapadokya")).toEqual([]);
  });

  test("unknown slug resolves to null", () => {
    expect(indexedHotelBySlug("no-such-hotel")).toBeNull();
  });
});
