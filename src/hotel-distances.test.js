// src/hotel-distances.test.js
import { describe, test, expect } from "vitest";
import { hotelIndex } from "./hotel-index.js";
import { hotelDistances } from "./hotel-distances.js";

// Hotels Google genuinely cannot map. Each needs a one-line reason. A slug here
// is deliberately exempt from the numeric-km requirement so one unmappable hotel
// can't hold every future merge red. Keep this list short and audited.
const UNMAPPED_HOTEL_SLUGS = new Set([
  // e.g. "old-closed-resort", // permanently closed, no pin — 2026-09
]);

describe("hotel distances", () => {
  test("every indexed hotel has a numeric km or is explicitly unmapped", () => {
    const missing = [];
    for (const hotel of hotelIndex) {
      if (UNMAPPED_HOTEL_SLUGS.has(hotel.slug)) continue;
      const km = Number(hotelDistances[hotel.slug]?.km);
      if (!Number.isFinite(km) || km <= 0) missing.push(hotel.slug);
    }
    expect(missing).toEqual([]);
  });

  test("no allowlisted slug secretly has a km (stale allowlist entry)", () => {
    const stale = [...UNMAPPED_HOTEL_SLUGS].filter(
      (slug) => Number.isFinite(Number(hotelDistances[slug]?.km)),
    );
    expect(stale).toEqual([]);
  });
});
