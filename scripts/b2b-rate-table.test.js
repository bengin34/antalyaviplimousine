import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { describe, expect, test } from "vitest";
import { routeCatalog } from "../src/routes.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// b2b/index.html is hand-written: no generator produces it and no price token
// resolves inside it, so a tariff change has to be typed into the table by
// hand. Every other price surface derives from src/routes.js — this table is
// the one that can silently keep the old fare. Hence the row-by-row pin.
const rowSlugs = [
  "antalya",
  "belek",
  "bogazkent",
  "side",
  "manavgat",
  "kizilagac",
  "kemer",
  "tekirova",
  "alanya",
  "fethiye",
  "dalaman",
  "pamukkale",
  "bodrum",
  "kapadokya",
];

const readRateTable = () => {
  const html = readFileSync(path.join(root, "b2b", "index.html"), "utf8");
  const { document } = new JSDOM(html).window;
  const table = document.querySelector("table.b2b-price-table");

  expect(table, "the B2B rate table is gone or was renamed").toBeTruthy();

  return [...table.querySelectorAll("tbody tr")].map((row) => ({
    label: row.querySelector("td").textContent.trim(),
    distance: row.querySelector("td.dist").textContent.trim(),
    price: row.querySelector("td.price").textContent.trim(),
  }));
};

describe("B2B rate table", () => {
  test("quotes the catalogue Vito fare on every row", () => {
    const rows = readRateTable();

    expect(rows).toHaveLength(rowSlugs.length);

    rows.forEach((row, index) => {
      const slug = rowSlugs[index];
      const route = routeCatalog[slug];

      expect(route, `${slug} left the catalogue`).toBeTruthy();
      expect(row.price, `${row.label} quotes a stale B2B fare`).toBe(
        `€${route.prices.vito}`,
      );
      expect(row.distance, `${row.label} quotes a stale distance`).toBe(
        `~${route.distanceKm} km`,
      );
    });
  });

  test("names each row after the region it prices", () => {
    const rows = readRateTable();

    // The labels are partner-facing copy, not catalogue names — "Cappadocia"
    // rather than "Kapadokya" — so they are matched loosely. This only has to
    // catch a row drifting onto the wrong region's fare.
    const normalize = (value) =>
      value
        .toLowerCase()
        .replace(/ı/g, "i")
        .replace(/ğ/g, "g")
        .replace(/ç/g, "c")
        .replace(/ş/g, "s")
        .replace(/[^a-z]/g, "");

    rows.forEach((row, index) => {
      const slug = rowSlugs[index];
      const label = normalize(row.label);
      const catalogueName = normalize(routeCatalog[slug].names.en);
      const stem = normalize(slug.split("_")[0]).slice(0, 5);

      expect(
        label.includes(catalogueName) || label.includes(stem),
        `"${row.label}" does not look like the ${slug} row`,
      ).toBe(true);
    });
  });

  test("prices every marketed region a partner can book", () => {
    // A region missing from the table sends partners to the contact form for a
    // quote that the public site already publishes.
    const marketed = Object.entries(routeCatalog)
      .filter(([, route]) => !route.landingRoute)
      .map(([slug]) => slug);

    expect([...rowSlugs].sort()).toEqual([...marketed].sort());
  });
});
