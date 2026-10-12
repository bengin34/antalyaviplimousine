import { describe, expect, test } from "vitest";
import { publicLanguages } from "../../../src/public-paths.js";
import { landOfLegendsZoneKm } from "../../../src/land-of-legends.js";
import { landOfLegendsCopy, landOfLegendsLanguages } from "./land-of-legends-copy";

describe("Land of Legends copy", () => {
  test("exists for every language the site publishes", () => {
    expect([...landOfLegendsLanguages].sort()).toEqual([...publicLanguages].sort());
  });

  test("every language is a real translation with the same structure as English", () => {
    const en = landOfLegendsCopy.en;
    for (const language of landOfLegendsLanguages) {
      const copy = landOfLegendsCopy[language];
      expect(Object.keys(copy).sort(), language).toEqual(Object.keys(en).sort());
      expect(Object.keys(copy.errors).sort(), language).toEqual(Object.keys(en.errors).sort());
      expect(Object.keys(copy.regionNames).sort(), language).toEqual(Object.keys(landOfLegendsZoneKm).sort());
      expect(copy.faq.length, language).toBe(en.faq.length);
      expect(copy.highlights.length, language).toBe(en.highlights.length);
      expect(copy.fromLabel(105), language).toContain("105");
      expect(copy.driveTime(60, "X"), language).toContain("60");
      expect(copy.sprinterNote(8), language).toContain("8");
      if (language !== "en") {
        // The sentences that carry the facts must not have been left in English.
        for (const key of ["intro", "ticketsNotIncluded", "payInCar", "shortNotice", "submit"] as const) {
          expect(copy[key], `${language}.${key}`).not.toBe(en[key]);
        }
      }
    }
  });
});
