import { describe, expect, test } from "vitest";
import { mergeReviewedHotelMatches } from "./hotel-index-discovered.mjs";

describe("discovered hotel index generation", () => {
  test("merges the safe base and resolved review rows", () => {
    expect(mergeReviewedHotelMatches([
      { name: "Base Hotel", placeId: "base", pricingRegion: "side" },
    ], [
      { name: "Resolved Hotel", placeId: "resolved", pricingRegion: "kemer", aliases: ["Old Name"] },
    ])).toEqual([
      { name: "Base Hotel", placeId: "base", pricingRegion: "side" },
      { name: "Resolved Hotel", placeId: "resolved", pricingRegion: "kemer", aliases: ["Old Name"] },
    ]);
  });

  test("refuses duplicate Place IDs across source sets", () => {
    expect(() => mergeReviewedHotelMatches([
      { name: "Base Hotel", placeId: "same", pricingRegion: "side" },
    ], [
      { name: "Duplicate Hotel", placeId: "same", pricingRegion: "side" },
    ])).toThrow("Duplicate discovered hotel Place ID: same");
  });
});
