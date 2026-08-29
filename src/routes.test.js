import { describe, expect, test } from "vitest";
import {
  bookableRouteSlugs,
  localizedRoute,
  publicRouteSlugs,
  routeCatalog,
  routeData,
  routeEdges,
  turkishLocationNames,
} from "./routes.js";

describe("canonical route catalogue", () => {
  test("markets fourteen routes and prices those alone on the static pages", () => {
    expect(publicRouteSlugs).toHaveLength(14);
    expect(Object.keys(routeData)).toEqual(publicRouteSlugs);
    expect(publicRouteSlugs.every((slug) => !routeCatalog[slug].landingRoute)).toBe(true);
  });

  test("presents every sub-region under a marketed landing page", () => {
    for (const [slug, route] of Object.entries(routeCatalog)) {
      if (!route.landingRoute) continue;
      expect(publicRouteSlugs, `${slug} points at an unmarketed landing page`).toContain(route.landingRoute);
    }
  });

  test("offers the unlisted Alanya sub-regions for booking but not as landing pages", () => {
    const unlisted = Object.keys(routeCatalog).filter((slug) => routeCatalog[slug].landingRoute);
    expect(unlisted).toEqual(["alanya_bati", "alanya_merkez", "alanya_dogu", "kargicak", "demirtas"]);
    expect(Object.keys(routeCatalog)).toEqual(bookableRouteSlugs);
    for (const slug of unlisted) {
      expect(bookableRouteSlugs).toContain(slug);
      expect(publicRouteSlugs).not.toContain(slug);
      expect(routeData[slug]).toBeUndefined();
    }
  });

  test("keeps the Alanya fallback at or above every sub-region a hotel resolves to", () => {
    // A guest who cannot place their own hotel picks plain "Alanya", so that
    // price has to cover the sub-regions the index can land them in.
    const placed = ["alanya_bati", "alanya_merkez", "alanya_dogu", "kargicak"];
    expect(Math.max(...placed.map((slug) => routeCatalog[slug].prices.vito)))
      .toBeLessThanOrEqual(routeCatalog.alanya.prices.vito);
    // Demirtaş sits €5 above that fallback and no hotel is indexed there, so it
    // is only ever reached by naming it outright. Adding a Demirtaş hotel means
    // revisiting the fallback price.
    expect(routeCatalog.demirtas.prices.vito).toBeGreaterThan(routeCatalog.alanya.prices.vito);
    expect(routeCatalog.demirtas.prices.sprinter).toBeLessThanOrEqual(routeCatalog.alanya.prices.sprinter);
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
    for (const slug of bookableRouteSlugs) {
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
    // Sub-regions need an admin label too: bookings land on them.
    expect(turkishLocationNames.alanya_bati).toBe("Batı Alanya");
    expect(turkishLocationNames.demirtas).toBe("Demirtaş");
  });
});
