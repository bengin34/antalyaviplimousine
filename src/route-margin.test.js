// src/route-margin.test.js
//
// A fixed transfer price is a commitment for the whole vehicle, so a tariff
// that does not cover the journey's own cost loses money on every booking to
// that region for as long as the number stays wrong — quietly, because
// nothing in the booking flow compares the two. These tests make the profit
// model's cost the floor under the price list.
//
// The cost is the model's own, not an estimate invented here: the vehicle
// drives the guest out and comes back empty, so it is charged for twice the
// one-way distance at `DEFAULT_KM_COST_TRY`, plus the airport meet. Driver
// pay, tolls and advertising sit outside it, so a route that only just clears
// this floor is still not earning anything.
import { describe, test, expect } from "vitest";
import { routeCatalog } from "./routes.js";
import { transferCostEur } from "../admin/profit-loss-metrics.js";

const VEHICLES = /** @type {const} */ (["vito", "sprinter"]);

// Routes that clear cost by less than THIN_MARGIN_PCT and are knowingly sold
// that way. Each needs a reason. A route here is still not allowed to drop
// below cost — this list only exempts it from the margin floor, so adding to
// it is a decision to earn nothing on that route, not a way to silence a test.
const THIN_MARGIN_PCT = 10;
const THIN_MARGIN_ROUTES = new Map([
  // Break-even to the cent at 75 km. Held at EUR 50 to sit level with Side
  // rather than because the number works; raise it when Side moves.
  ["manavgat:vito", "priced level with Side, not from its own cost"],
  // A 540 km each-way day. EUR 330 clears the km cost by about EUR 1 and
  // ignores the driver's day entirely — quote Cappadocia by hand.
  ["kapadokya:vito", "quoted by hand; the listed price is an anchor, not a tariff"],
]);

describe("route tariffs against the profit model's own cost", () => {
  test("no route is sold below the cost of driving it", () => {
    const belowCost = [];
    for (const [slug, route] of Object.entries(routeCatalog)) {
      const cost = transferCostEur(route.distanceKm);
      for (const vehicle of VEHICLES) {
        const price = route.prices[vehicle];
        if (price < cost) {
          belowCost.push(`${slug}:${vehicle} €${price} < €${cost.toFixed(2)} cost at ${route.distanceKm}km`);
        }
      }
    }
    expect(belowCost).toEqual([]);
  });

  test(`every route clears cost by ${THIN_MARGIN_PCT}% unless it is a documented exception`, () => {
    const thin = [];
    for (const [slug, route] of Object.entries(routeCatalog)) {
      const cost = transferCostEur(route.distanceKm);
      for (const vehicle of VEHICLES) {
        const key = `${slug}:${vehicle}`;
        if (THIN_MARGIN_ROUTES.has(key)) continue;
        const price = route.prices[vehicle];
        const marginPct = ((price - cost) / price) * 100;
        if (marginPct < THIN_MARGIN_PCT) {
          thin.push(`${key} €${price} at ${route.distanceKm}km earns ${marginPct.toFixed(1)}%`);
        }
      }
    }
    expect(thin).toEqual([]);
  });

  test("no documented exception is stale — each one is still thin", () => {
    const stale = [];
    for (const key of THIN_MARGIN_ROUTES.keys()) {
      const [slug, vehicle] = key.split(":");
      const route = routeCatalog[slug];
      expect(route, `${key} names a route that no longer exists`).toBeTruthy();
      const cost = transferCostEur(route.distanceKm);
      const price = route.prices[vehicle];
      if (((price - cost) / price) * 100 >= THIN_MARGIN_PCT) stale.push(key);
    }
    expect(stale).toEqual([]);
  });

  test("the crossed-out original price is always above the price charged", () => {
    for (const [slug, route] of Object.entries(routeCatalog)) {
      for (const vehicle of VEHICLES) {
        expect(route.originalPrices[vehicle], `${slug}:${vehicle}`).toBeGreaterThan(route.prices[vehicle]);
      }
    }
  });

  test("the Sprinter is never cheaper than the Vito", () => {
    for (const [slug, route] of Object.entries(routeCatalog)) {
      expect(route.prices.sprinter, slug).toBeGreaterThan(route.prices.vito);
    }
  });
});
