import { describe, expect, test } from "vitest";
import { hotelBySlug, hotelCatalog, hotelPaths } from "./hotels.js";
import { prerenderPaths, sitemapPaths } from "./public-paths.js";

describe("German hotel landing catalogue", () => {
  test("contains the initial ten hotels with a valid regional route", () => {
    expect(Object.keys(hotelCatalog)).toHaveLength(10);
    expect(hotelBySlug("rixos-premium-belek")).toMatchObject({ name: "Rixos Premium Belek", regionSlug: "belek" });
    expect(hotelPaths).toContain("/de/hotels/rixos-premium-belek/");
    expect(hotelPaths).toContain("/de/hotels/voyage-sorgun/");
    expect(prerenderPaths).toEqual(expect.arrayContaining(hotelPaths));
    expect(sitemapPaths).toEqual(expect.arrayContaining(hotelPaths));
  });
});
