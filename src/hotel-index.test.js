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
      expect(districtRegions[hotel.district], `${hotel.name} sits in unmapped district "${hotel.district}"`).toBeDefined();
      expect(hotel.region).toBe(districtRegions[hotel.district]);
    }
  });

  test("hotels in the same district are never priced differently", () => {
    const regionsByDistrict = new Map();
    for (const hotel of hotelIndex) {
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

  test("every German landing-page hotel is indexed under the same region", () => {
    for (const hotel of Object.values(hotelCatalog)) {
      const indexed = indexedHotelBySlug(hotel.slug);
      expect(indexed, `${hotel.name} is missing from the search index`).not.toBeNull();
      expect(indexed.region).toBe(hotel.regionSlug);
      expect(indexed.name).toBe(hotel.name);
    }
  });

  test("only hand-checked landing-page hotels count as verified", () => {
    const verified = hotelIndex.filter((hotel) => hotel.status === "verified").map((hotel) => hotel.slug);
    expect(verified.sort()).toEqual(Object.keys(hotelCatalog).sort());
    expect(hotelIndex.some((hotel) => hotel.status === "draft")).toBe(true);
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
