// src/hotel-region-audit.test.js
import { describe, test, expect } from "vitest";
import { hotelIndex } from "./hotel-index.js";
import { hotelDistances } from "./hotel-distances.js";
import { routeCatalog } from "./routes.js";
import checkpoint from "../scripts/hotel-region-audit/checkpoint.json";
import { auditInputHash } from "../scripts/lib/hotel-audit-state.mjs";

// Layer 3 of the hotel region audit (docs/superpowers/specs/2026-09-10-hotel-region-audit-design.md).
// Every indexed hotel must carry `checked: true` in hotel-distances — written only by
// scripts/audit-hotel-regions.mjs once the Place ID is identity-verified and its address
// agrees with the index region — or be listed here with a one-line reason and a date.
// Adding a hotel without auditing it fails the first test; run
// `npm run audit:hotel-regions -- --only-unchecked` (see .claude/skills/hotel-region-audit)
// instead of adding it here. Keep this list short and audited.
export const UNAUDITED_HOTEL_SLUGS = new Map([
  ["caner-mountain-hotel", "unresolved: coordinate says kemer (its index region), road distance says tekirova — a mountain access road, and the distance band already prices the 74 km at €65 — 2026-09"],
  ["la-benata-hotel", "unresolved: moved side→alanya_bati on the coordinate (€20); 90 km sits between kizilagac and alanya_bati so km cannot corroborate — 2026-09"],
  ["alanya-divan-otel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["alarcha-hotels-resort", "identity: similar-name Place in side; likely a sibling property, index keeps alanya_bati — 2026-09"],
  ["altes-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["angelo-coffee-suites", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["antique-house-otel", "identity: stored Place is not a lodging business; re-discovery found no unique match — 2026-09"],
  ["araucaria-pension", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["arinna-park-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["artemis-luxury-palace-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["avullar-palace-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["bisuites", "identity: stored Place is not a lodging business; re-discovery found no unique match — 2026-09"],
  ["blue-heaven-beach-apart", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["bodensee-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["boutique-house-mim-a-otel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["brandhill-apart-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["club-tropical-beach-hotel", "identity: similar-name Place in side; likely a sibling property, index keeps alanya_bati — 2026-09"],
  ["comfy-otel-antalya-lara", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["crystal-palace-luxury-resort", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["der-inn-hotel-konyaalti", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["dimo-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["dogus-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["dumlupinar-royal-rooms", "identity: stored Place is not a lodging business; re-discovery found no unique match — 2026-09"],
  ["estera-hotel-silent", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["golda-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["golden-spark-apart-otel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["han-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["holiday-box-club-otel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["hostel-vague", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["ic-hotels-residence", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["jura-hotels-lara", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["kemer-barut-collection", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["koesk-boutique-hotel-old-town-city-center", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["kylo-garden-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["la-vita-hotels", "identity: similar-name Place in antalya; likely a sibling property, index keeps side — 2026-09"],
  ["lara-vista-hotel-suits-spa", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["life-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["linda-sunny-beach-spa", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["medworld-cosmos-health-rehabilitation-center-otel", "identity: stored Place is not a lodging business; re-discovery found no unique match — 2026-09"],
  ["mia-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["miss-cleopatra-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["my-home-sky-otel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["nazar-beach-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["otel-wood-house", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["otium-hotel-seven-seas", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["otium-park-club-akman-otel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["otto-lara-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["paloma-pasha-resort", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["q-spa-resort", "identity: stored Place is not a lodging business; re-discovery found no unique match — 2026-09"],
  ["river-elite-hotel-spa", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["sueno-hotels-golf-belek", "identity: stored Place is not a lodging business; re-discovery found no unique match — 2026-09"],
  ["the-divan-resort-hotel-ant", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["uemit-hotel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["woo-town-otel", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["yeniceri-ahmet-aga-konagi", "identity: stored Place names a different business; re-discovery found no unique match — 2026-09"],
  ["aydinbey-famous-resort", "unresolved: address locality not in ADDRESS_REGION_TERMS (generic mahalle); region unchanged — 2026-09"],
  ["bariscan-otel", "unresolved: address locality not in ADDRESS_REGION_TERMS (generic mahalle); region unchanged — 2026-09"],
  ["mera-park-hotel", "unresolved: address locality not in ADDRESS_REGION_TERMS (generic mahalle); region unchanged — 2026-09"],
  ["monte-carlo", "unresolved: address locality not in ADDRESS_REGION_TERMS (generic mahalle); region unchanged — 2026-09"],
  ["q-premium-resort-hotel-alanya", "unresolved: address locality not in ADDRESS_REGION_TERMS (generic mahalle); region unchanged — 2026-09"],
  ["sherwood-dreams-resort", "unresolved: address locality not in ADDRESS_REGION_TERMS (generic mahalle); region unchanged — 2026-09"],
  ["white-gold", "unresolved: address locality not in ADDRESS_REGION_TERMS (generic mahalle); region unchanged — 2026-09"],
]);

describe("hotel region audit guard", () => {
  test("checked hotels have current successful evidence for their identity, region and rules", () => {
    for (const hotel of hotelIndex) {
      if (hotelDistances[hotel.slug]?.checked !== true) continue;
      const evidence = checkpoint.completed[hotel.slug];
      expect(evidence?.bucket, hotel.slug).toBe("ok");
      expect(evidence?.inputHash, hotel.slug).toBe(auditInputHash(hotel, hotelDistances[hotel.slug]?.place, routeCatalog));
    }
  });

  // Two agreeing sources, or Google's own address naming the index region — the
  // one evidence strong enough to stand alone, because a conclusive term is by
  // definition one that can decide a price.
  test("every ok row rests on two agreeing sources, or on a conclusive address", () => {
    const violations = [];
    for (const [slug, row] of Object.entries(checkpoint.completed)) {
      if (row?.bucket !== "ok") continue;
      const agrees = row.derivedRegion === row.indexRegion || row.priceEquivalent === true;
      const addressConfirms = row.addressRegion === row.derivedRegion;
      if (!agrees || !(row.agreeingSources >= 2 || addressConfirms)) {
        violations.push(`${slug}: sources=${row.agreeingSources} address=${row.addressRegion} derived=${row.derivedRegion} index=${row.indexRegion}`);
      }
    }
    expect(violations).toEqual([]);
  });

  test("every indexed hotel is address-audited or explicitly allowlisted", () => {
    const unchecked = hotelIndex
      .filter((hotel) => !UNAUDITED_HOTEL_SLUGS.has(hotel.slug))
      .filter((hotel) => hotelDistances[hotel.slug]?.checked !== true)
      .map((hotel) => hotel.slug);
    expect(unchecked).toEqual([]);
  });

  test("no allowlisted slug is secretly audited (stale allowlist entry)", () => {
    const stale = [...UNAUDITED_HOTEL_SLUGS.keys()]
      .filter((slug) => hotelDistances[slug]?.checked === true);
    expect(stale).toEqual([]);
  });

  test("no allowlisted slug has left the index (stale allowlist entry)", () => {
    const indexed = new Set(hotelIndex.map((hotel) => hotel.slug));
    const gone = [...UNAUDITED_HOTEL_SLUGS.keys()].filter((slug) => !indexed.has(slug));
    expect(gone).toEqual([]);
  });

  test("every allowlist entry carries a reason and a date", () => {
    for (const [slug, reason] of UNAUDITED_HOTEL_SLUGS) {
      expect(reason, slug).toMatch(/\S.*20\d\d-\d\d/);
    }
  });
});
