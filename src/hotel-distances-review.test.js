// src/hotel-distances-review.test.js
//
// `hotel-distances.test.js` asserts every indexed hotel has *a* number. These
// tests ask whether that number is believable, and whether the region the
// hotel is priced under still covers what the journey costs.
//
// Two failure modes, and they need different tools:
//
//   A bad geocode — Places matched the wrong pin. `hotelDistanceKm` already
//   refuses to cost on one that contradicts its region, so the damage is
//   contained at runtime. What it cannot catch is a row that agrees with its
//   region but disagrees with its own neighbours: hotels in one belde are all
//   about equally far from the airport, so a row 20 km off its district's
//   median is near-certainly the wrong pin even when the region tolerance
//   lets it through.
//
//   A wrong district — the hotel is real, the pin is right, and it is simply
//   filed under a region whose tariff does not cover the drive. That one is a
//   pricing error, not a data error, and it is a loss on every booking.
//
// Both lists below are debt, not decoration. A row in one is a row somebody
// should check against the operator's records; clearing it means correcting
// the district in `hotel-index.js`, or confirming the km and marking the row
// `checked: true` so the runtime trusts it.
import { describe, test, expect } from "vitest";
import { routeCatalog } from "./routes.js";
import { hotelIndex } from "./hotel-index.js";
import { hotelDistances } from "./hotel-distances.js";
import { trustedDistanceKm } from "./hotel-distance-lookup.js";
import { transferCostEur } from "../admin/profit-loss-metrics.js";

/** A row this far from its district's median is treated as the wrong pin. */
const DISTRICT_SPREAD_KM = 20;

// Rows that sit apart from their own district and have not been checked yet.
// Seeded 2026-09 from the first bulk geocode of the index.
const KNOWN_PIN_SUSPECTS = new Set([
  "utopia-world-hotel",       // 146 km against a Konaklı median of 107
  "club-tropical-beach-hotel", // 66 km against a Konaklı median of 107
  "sentido-flora-garden",     // 84 km against a Çolaklı median of 57
  "sunis-elita-beach-resort", // 81 km against a Kumköy median of 61
  "alva-donna-world-palace",  // 68 km against a Beldibi median of 47
  "larissa-sultan-s-beach",   // 67 km against a Beldibi median of 47
  "amara-prestige-hotel",     // 52 km against a Tekirova median of 77
  "eden-nest-exclusive-hotel", // 37 km against an Antalya merkez median of 17
]);

// Hotels the index prices below what the drive costs. Each is a district
// question: either the pin is wrong (see above) or the hotel belongs to a
// dearer region. Until one is settled the transfer runs at a small loss.
const KNOWN_UNDER_QUOTED = new Set([
  "utopia-world-hotel",                  // Konaklı/alanya_bati, 146 km against €80
  "otium-family-club-marine-beach-otel", // Manavgat, 88 km against a 75 km €50 tariff
  "sentido-flora-garden",                // Çolaklı/side, 84 km against €50
  "sunis-elita-beach-resort",            // Kumköy/side, 81 km against €50
]);

const withDistance = hotelIndex
  .map((hotel) => ({ ...hotel, km: Number(hotelDistances[hotel.slug]?.km) }))
  .filter((hotel) => Number.isFinite(hotel.km) && hotel.km > 0);

const medianByDistrict = new Map();
for (const hotel of withDistance) {
  const kms = medianByDistrict.get(hotel.district) ?? [];
  kms.push(hotel.km);
  medianByDistrict.set(hotel.district, kms);
}
for (const [district, kms] of medianByDistrict) {
  kms.sort((a, b) => a - b);
  medianByDistrict.set(district, kms[Math.floor(kms.length / 2)]);
}

// A district needs a few rows before its median means anything.
const districtSize = new Map();
for (const hotel of withDistance) districtSize.set(hotel.district, (districtSize.get(hotel.district) ?? 0) + 1);

describe("generated hotel distances", () => {
  test("no unreviewed row contradicts its own district", () => {
    const suspects = [];
    for (const hotel of withDistance) {
      if (KNOWN_PIN_SUSPECTS.has(hotel.slug)) continue;
      if (hotelDistances[hotel.slug].checked) continue;
      // Rows the runtime already refuses are contained: the leg falls back to
      // the region distance. This test is for the ones that slip through.
      if (trustedDistanceKm(hotel, hotelDistances) === null) continue;
      if ((districtSize.get(hotel.district) ?? 0) < 3) continue;
      const median = medianByDistrict.get(hotel.district);
      if (Math.abs(hotel.km - median) >= DISTRICT_SPREAD_KM) {
        suspects.push(`${hotel.slug} ${hotel.km}km vs ${hotel.district} median ${median}km`);
      }
    }
    expect(suspects).toEqual([]);
  });

  test("no listed pin suspect has quietly been fixed or dropped", () => {
    const bySlug = new Map(withDistance.map((hotel) => [hotel.slug, hotel]));
    const resolved = [];
    for (const slug of KNOWN_PIN_SUSPECTS) {
      const hotel = bySlug.get(slug);
      if (!hotel) { resolved.push(`${slug} (no longer indexed)`); continue; }
      if (hotelDistances[slug].checked) { resolved.push(`${slug} (now checked)`); continue; }
      const median = medianByDistrict.get(hotel.district);
      if (Math.abs(hotel.km - median) < DISTRICT_SPREAD_KM) resolved.push(`${slug} (now agrees with ${hotel.district})`);
    }
    expect(resolved).toEqual([]);
  });
});

describe("hotel regions against what the drive costs", () => {
  test("no hotel is priced under a region that cannot cover its distance", () => {
    const underQuoted = [];
    for (const hotel of hotelIndex) {
      if (KNOWN_UNDER_QUOTED.has(hotel.slug)) continue;
      // Only distances the profit model will actually use: a rejected outlier
      // costs on its region instead, and `route-margin.test.js` covers that.
      const km = trustedDistanceKm(hotel, hotelDistances);
      if (km === null) continue;
      const price = routeCatalog[hotel.region].prices.vito;
      const cost = transferCostEur(km);
      if (price < cost) {
        underQuoted.push(`${hotel.slug} (${hotel.district}/${hotel.region}) ${km}km costs €${cost.toFixed(2)} against €${price}`);
      }
    }
    expect(underQuoted).toEqual([]);
  });

  test("no listed under-quote has quietly been fixed", () => {
    const resolved = [];
    for (const slug of KNOWN_UNDER_QUOTED) {
      const hotel = hotelIndex.find((entry) => entry.slug === slug);
      if (!hotel) { resolved.push(`${slug} (no longer indexed)`); continue; }
      const km = trustedDistanceKm(hotel, hotelDistances);
      if (km === null) { resolved.push(`${slug} (distance no longer trusted)`); continue; }
      if (routeCatalog[hotel.region].prices.vito >= transferCostEur(km)) resolved.push(`${slug} (now covers its cost)`);
    }
    expect(resolved).toEqual([]);
  });
});
