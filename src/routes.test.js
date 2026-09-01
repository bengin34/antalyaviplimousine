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
    expect(unlisted).toEqual(["alanya_bati", "alanya_merkez", "alanya_dogu", "kargicak", "demirtas", "kumluca", "kas"]);
    expect(Object.keys(routeCatalog)).toEqual(bookableRouteSlugs);
    for (const slug of unlisted) {
      expect(bookableRouteSlugs).toContain(slug);
      expect(publicRouteSlugs).not.toContain(slug);
      expect(routeData[slug]).toBeUndefined();
    }
  });

  test("keeps the Alanya fallback covering every sub-region within its own distance", () => {
    // A guest who cannot place their own hotel picks plain "Alanya", so that
    // price has to cover the sub-regions the index can land them in. It cannot
    // cover all five and stay a €95 tariff: at 15 TRY/km the eastern end of
    // Alanya costs more to reach than the fallback charges. What it can do —
    // and what this pins — is cover everything out to its own 125 km.
    const covered = Object.entries(routeCatalog)
      .filter(([, route]) => route.landingRoute === "alanya" && route.distanceKm <= routeCatalog.alanya.distanceKm);
    expect(covered.map(([slug]) => slug)).toEqual(["alanya_bati", "alanya_merkez"]);
    for (const [slug, route] of covered) {
      expect(route.prices.vito, `${slug} above the Alanya fallback`).toBeLessThanOrEqual(routeCatalog.alanya.prices.vito);
      expect(route.prices.sprinter, `${slug} above the Alanya fallback`).toBeLessThanOrEqual(routeCatalog.alanya.prices.sprinter);
    }
  });

  test("names the Alanya sub-regions the fallback under-quotes", () => {
    // Doğu Alanya, Kargıcak and Demirtaş cost more to reach than the €95
    // fallback charges, so a guest there who cannot name their hotel is
    // under-quoted and the transfer wants confirming by hand. This is a
    // deliberate, bounded exposure — the list is here so it stays visible and
    // so adding a sixth sub-region forces the question again.
    const beyond = Object.entries(routeCatalog)
      .filter(([, route]) => route.landingRoute === "alanya" && route.prices.vito > routeCatalog.alanya.prices.vito)
      .map(([slug]) => slug);
    expect(beyond).toEqual(["alanya_dogu", "kargicak", "demirtas"]);
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
