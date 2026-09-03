import { describe, expect, test } from "vitest";
import {
  applyReviewedPlaceOverride,
  buildRegionMatch,
  groupCandidatesByPlace,
  pricingRegionFromAddressComponents,
  resolvePricingRegion,
  selectOperationalHotelPlace,
  summarizeRegionMatches,
} from "./hotel-region-matching.mjs";

describe("hotel region matching", () => {
  test("separates candidates already present under the same Place ID", () => {
    const candidates = [
      { certificateNo: "1", name: "Renamed Hotel", placeId: "known-place" },
      { certificateNo: "2", name: "New Hotel", placeId: "new-place" },
    ];
    const currentDistances = {
      "old-hotel": { place: "known-place" },
    };

    const result = groupCandidatesByPlace(candidates, currentDistances);

    expect(result.existing).toEqual([{
      placeId: "known-place",
      currentSlugs: ["old-hotel"],
      candidates: [candidates[0]],
    }]);
    expect(result.newPlaces).toEqual([{
      placeId: "new-place",
      candidates: [candidates[1]],
    }]);
  });

  test("groups multiple Ministry certificates that point to one new place", () => {
    const candidates = [
      { certificateNo: "1", name: "Same Hotel", placeId: "new-place" },
      { certificateNo: "2", name: "Same Hotel Resort", placeId: "new-place" },
    ];

    expect(groupCandidatesByPlace(candidates, {}).newPlaces).toEqual([{
      placeId: "new-place",
      candidates,
    }]);
  });

  test.each([
    [{ latitude: 36.58, longitude: 30.56 }, "kemer"],
    [{ latitude: 36.50, longitude: 30.52 }, "tekirova"],
    [{ latitude: 36.87, longitude: 30.72 }, "antalya"],
    [{ latitude: 36.85, longitude: 31.05 }, "belek"],
    [{ latitude: 36.84, longitude: 31.16 }, "bogazkent"],
    [{ latitude: 36.78, longitude: 31.38 }, "side"],
    [{ latitude: 36.72, longitude: 31.56 }, "kizilagac"],
    [{ latitude: 36.62, longitude: 31.82 }, "alanya_bati"],
    [{ latitude: 36.55, longitude: 32.00 }, "alanya_merkez"],
    [{ latitude: 36.50, longitude: 32.08 }, "alanya_dogu"],
    [{ latitude: 36.47, longitude: 32.15 }, "kargicak"],
    [{ latitude: 36.42, longitude: 32.25 }, "demirtas"],
  ])("maps corridor point %j to pricing region %s", (location, region) => {
    expect(resolvePricingRegion(location)).toMatchObject({ region, review: false });
  });

  test("flags a hotel close to a pricing boundary for review", () => {
    expect(resolvePricingRegion({ latitude: 36.84, longitude: 31.129 })).toMatchObject({
      region: "belek",
      review: true,
      reason: "near-pricing-boundary",
    });
  });

  test("rejects coordinates outside the Antalya-Alanya corridor", () => {
    expect(resolvePricingRegion({ latitude: 38.0, longitude: 35.0 })).toEqual({
      region: null,
      review: true,
      reason: "outside-pricing-corridor",
    });
  });

  test("builds a ready-to-review region and price record without coordinates", () => {
    const match = buildRegionMatch({
      placeId: "new-place",
      candidates: [{
        certificateNo: "123",
        name: "SIDE SUN HOTEL",
        documentType: "Turizm İşletmesi Belgesi",
        district: "MANAVGAT",
      }],
    }, { region: "side", review: false }, {
      routeCatalog: {
        side: {
          names: { tr: "Side" },
          prices: { vito: 50, sprinter: 85 },
          originalPrices: { vito: 60, sprinter: 100 },
        },
      },
      hotelSlug: () => "side-sun-hotel",
      currentSlugs: new Set(),
    });

    expect(match).toEqual({
      proposedSlug: "side-sun-hotel",
      name: "SIDE SUN HOTEL",
      certificateNos: ["123"],
      ministryDistricts: ["MANAVGAT"],
      placeId: "new-place",
      pricingRegion: "side",
      pricingName: "Side",
      prices: { vito: 50, sprinter: 85 },
      originalPrices: { vito: 60, sprinter: 100 },
      status: "ready",
      reviewReasons: [],
    });
    expect(match).not.toHaveProperty("location");
  });

  test("keeps conflicting Ministry identities and slug collisions in review", () => {
    const match = buildRegionMatch({
      placeId: "new-place",
      candidates: [
        { certificateNo: "1", name: "Royal Atlantis", district: "MANAVGAT" },
        { certificateNo: "2", name: "Royal Garden", district: "MANAVGAT" },
      ],
    }, { region: "side", review: true, reason: "near-pricing-boundary" }, {
      routeCatalog: {
        side: { names: { tr: "Side" }, prices: {}, originalPrices: {} },
      },
      hotelSlug: () => "royal-atlantis-spa-resort",
      currentSlugs: new Set(["royal-atlantis-spa-resort"]),
    });

    expect(match.status).toBe("review");
    expect(match.reviewReasons).toEqual([
      "near-pricing-boundary",
      "multiple-ministry-names",
      "slug-collision",
    ]);
    expect(match.certificateNos).toEqual(["1", "2"]);
  });

  test("accepts Ministry names that differ only by generic hotel suffixes", () => {
    const match = buildRegionMatch({
      placeId: "new-place",
      candidates: [
        { certificateNo: "1", name: "Royal Atlantis", district: "MANAVGAT" },
        { certificateNo: "2", name: "Royal Atlantis Spa & Resort", district: "MANAVGAT" },
      ],
    }, { region: "side", review: false }, {
      routeCatalog: {
        side: { names: { tr: "Side" }, prices: {}, originalPrices: {} },
      },
      hotelSlug: () => "royal-atlantis-spa-resort",
      currentSlugs: new Set(),
    });

    expect(match.status).toBe("ready");
    expect(match.reviewReasons).toEqual([]);
    expect(match.certificateNos).toEqual(["1", "2"]);
  });

  test("flags a Google region that conflicts with the Ministry district", () => {
    const match = buildRegionMatch({
      placeId: "new-place",
      candidates: [{ certificateNo: "1", name: "Kemer Hotel", district: "KEMER" }],
    }, { region: "side", review: false }, {
      routeCatalog: {
        side: { names: { tr: "Side" }, prices: {}, originalPrices: {} },
      },
      hotelSlug: () => "kemer-hotel",
      currentSlugs: new Set(),
    });

    expect(match.status).toBe("review");
    expect(match.reviewReasons).toContain("ministry-location-conflict");
  });

  test("reports successful responses separately from local fetch attempts", () => {
    const ready = [
      { status: "ready", pricingRegion: "side" },
      { status: "ready", pricingRegion: "side" },
    ];
    const review = [{ status: "review", pricingRegion: "belek" }];
    const report = summarizeRegionMatches({
      generatedAt: "2026-09-03T00:00:00.000Z",
      sourceCandidateRows: 4,
      existingPlaceCount: 1,
      newPlaceCount: 3,
      fetchAttempts: 5,
      completedMatches: [...ready, ...review],
      failures: {},
    });

    expect(report).toMatchObject({
      placesDetailsFetchAttempts: 5,
      placesDetailsSuccessfulResponses: 3,
      readyCount: 2,
      reviewCount: 1,
      unresolvedCount: 0,
      readyByPricingRegion: { side: 2 },
      complete: true,
    });
  });

  test.each([
    [[{ longText: "Mahmutlar" }, { longText: "Alanya" }], "alanya_dogu"],
    [[{ longText: "Çenger" }, { longText: "Manavgat" }], "kizilagac"],
    [[{ longText: "Boğazkent" }, { longText: "Serik" }], "bogazkent"],
    [[{ longText: "Tekirova" }, { longText: "Kemer" }], "tekirova"],
  ])("prefers the specific locality in address components", (components, region) => {
    expect(pricingRegionFromAddressComponents(components)).toBe(region);
  });

  test("does not treat the Antalya province component as Antalya city", () => {
    expect(pricingRegionFromAddressComponents([{ longText: "Antalya" }])).toBeNull();
  });

  test("selects one exact operational hotel identity from a targeted search", () => {
    const place = selectOperationalHotelPlace("KEMER HOTEL", [
      { id: "apartment", displayName: { text: "Kemer Hotel" }, primaryType: "apartment", businessStatus: "OPERATIONAL" },
      { id: "closed", displayName: { text: "Kemer Hotel" }, primaryType: "hotel", businessStatus: "CLOSED_PERMANENTLY" },
      { id: "correct", displayName: { text: "Kemer Hotel" }, primaryType: "hotel", businessStatus: "OPERATIONAL" },
    ]);

    expect(place?.id).toBe("correct");
  });

  test("refuses multiple exact operational identities", () => {
    expect(selectOperationalHotelPlace("Same Hotel", [
      { id: "one", displayName: { text: "Same Hotel" }, primaryType: "hotel", businessStatus: "OPERATIONAL" },
      { id: "two", displayName: { text: "Same Hotel Resort" }, primaryType: "resort_hotel", businessStatus: "OPERATIONAL" },
    ])).toBeNull();
  });

  test("turns an explicitly reviewed Place ID and pricing region into a ready match", () => {
    const match = applyReviewedPlaceOverride({
      placeId: "wrong-place",
      candidates: [{ certificateNo: "1", name: "Reviewed Hotel", district: "ALANYA" }],
    }, {
      placeId: "reviewed-place",
      pricingRegion: "alanya_merkez",
      name: "Current Reviewed Hotel",
      aliases: ["Reviewed Hotel"],
    }, {
      routeCatalog: {
        alanya_merkez: { names: { tr: "Alanya merkez" }, prices: {}, originalPrices: {} },
      },
      hotelSlug: (name) => name.toLowerCase().replaceAll(" ", "-"),
      currentSlugs: new Set(),
    });

    expect(match).toMatchObject({
      placeId: "reviewed-place",
      proposedSlug: "current-reviewed-hotel",
      name: "Current Reviewed Hotel",
      aliases: ["Reviewed Hotel"],
      pricingRegion: "alanya_merkez",
      status: "ready",
      reviewReasons: [],
    });
  });
});
