import { describe, expect, test } from "vitest";
import {
  localizedRoute,
  publicRouteSlugs,
  routeCatalog,
  routeData,
  routeEdges,
  turkishLocationNames,
} from "./routes.js";

describe("canonical route catalogue", () => {
  test("contains the complete public route set", () => {
    expect(publicRouteSlugs).toHaveLength(14);
    expect(Object.keys(routeCatalog)).toEqual(publicRouteSlugs);
    expect(Object.keys(routeData)).toEqual(publicRouteSlugs);
  });

  test("derives legacy pricing data from the catalogue", () => {
    for (const slug of publicRouteSlugs) {
      expect(routeData[slug]).toEqual({
        name: routeCatalog[slug].names.en,
        originalPrices: routeCatalog[slug].originalPrices,
        prices: routeCatalog[slug].prices,
      });
    }
  });

  test("derives every airport edge from the same distance", () => {
    for (const slug of publicRouteSlugs) {
      expect(routeEdges).toContainEqual(["airport", slug, routeCatalog[slug].distanceKm]);
    }
  });

  test("provides localized public and admin labels", () => {
    expect(localizedRoute("kapadokya", "de")).toMatchObject({
      name: "Kappadokien",
      distance: "540 km",
      durationLabel: "7–8 Stunden",
    });
    expect(turkishLocationNames.airport).toBe("Antalya Havalimanı");
    expect(turkishLocationNames.kizilagac).toBe("Kızılağaç");
  });
});
