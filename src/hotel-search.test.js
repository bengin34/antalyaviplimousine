import { describe, expect, test } from "vitest";
import { foldHotelText, phoneticKey, resolveHotelRegion, searchHotels } from "./hotel-search.js";

const names = (query, options) => searchHotels(query, options).map((hotel) => hotel.name);

/** Two real hotels whose names share only the words every hotel name carries. */
const lookalikes = [
  { slug: "esmeralda-butik-otel", name: "Esmeralda Butik Otel", region: "kizilagac", district: "Kızılot", aliases: [], status: "draft" },
  { slug: "the-grand-ring-hotel", name: "The Grand Ring Hotel", region: "kemer", district: "Beldibi", aliases: [], status: "draft" },
];

describe("text folding", () => {
  test("folds Turkish letters", () => {
    expect(foldHotelText("Kumköy")).toBe("kumkoy");
    expect(foldHotelText("Çolaklı")).toBe("colakli");
    expect(foldHotelText("Gündoğdu")).toBe("gundogdu");
    expect(foldHotelText("İstanbul")).toBe("istanbul");
  });

  test("folds German letters", () => {
    expect(foldHotelText("Schloß Grün")).toBe("schloss grun");
  });

  test("transliterates Cyrillic", () => {
    expect(foldHotelText("Титаник")).toBe("titanik");
    expect(foldHotelText("Белек")).toBe("belek");
  });

  test("drops punctuation and collapses whitespace", () => {
    expect(foldHotelText("  Adam & Eve   Hotels ")).toBe("adam eve hotels");
  });

  test("phonetic key reconciles spellings of the same sound", () => {
    expect(phoneticKey("delphin")).toBe(phoneticKey("delfin"));
    expect(phoneticKey("titanic")).toBe(phoneticKey("titanik"));
    expect(phoneticKey("xanadu")).toBe("ksanadu");
  });
});

describe("hotel search", () => {
  test("finds a hotel from a partial name", () => {
    expect(names("rixos belek")).toContain("Rixos Premium Belek");
    expect(names("land of legends")).toContain("The Land of Legends");
  });

  test("matches an alias the guest is more likely to type", () => {
    expect(names("legends")).toContain("The Land of Legends");
    expect(names("mardan palace")).toContain("Titanic Mardan Palace");
  });

  test("survives German and Russian spellings of the same hotel", () => {
    expect(names("delfin imperial")).toContain("Delphin Imperial Lara");
    expect(names("Ривос Премиум Белек")).toContain("Rixos Premium Belek");
    expect(names("Титаник Бич Лара")).toContain("Titanic Beach Lara");
  });

  test("tolerates a single-character typo", () => {
    expect(names("xanado")).toContain("Xanadu Resort Hotel");
    expect(names("gloriaa golf")).toContain("Gloria Golf Resort");
  });

  test("finds hotels by district", () => {
    expect(names("kadriye").length).toBeGreaterThan(0);
    expect(searchHotels("kadriye").every((hotel) => hotel.district === "Kadriye")).toBe(true);
  });

  test("keeps similarly named hotels distinct and ranks the exact name first", () => {
    const results = names("side star");
    expect(results).toEqual(expect.arrayContaining(["Side Star Resort", "Side Star Beach", "Side Star Elegance"]));
    expect(names("Side Star Beach")[0]).toBe("Side Star Beach");
  });

  test("returns nothing for a query that matches no hotel", () => {
    expect(names("zzzz")).toEqual([]);
    expect(names("qwertyuiop")).toEqual([]);
  });

  test("stays quiet while the guest is still typing", () => {
    expect(names("")).toEqual([]);
    expect(names("r")).toEqual([]);
  });

  test("honours the result limit", () => {
    expect(names("hotel", { limit: 3 }).length).toBeLessThanOrEqual(3);
  });
});

describe("unambiguous resolution", () => {
  test("resolves a full name typed without opening the suggestions", () => {
    expect(resolveHotelRegion("Voyage Sorgun")?.region).toBe("side");
    expect(resolveHotelRegion("delfin imperial lara")?.region).toBe("antalya");
  });

  test("resolves an exact name even when similar hotels exist", () => {
    expect(resolveHotelRegion("Side Star Beach")?.name).toBe("Side Star Beach");
  });

  test("refuses to guess when the query is ambiguous", () => {
    expect(resolveHotelRegion("maxx royal")).toBeNull();
    expect(resolveHotelRegion("gloria")).toBeNull();
  });

  test("returns null when nothing matches", () => {
    expect(resolveHotelRegion("zzzz")).toBeNull();
  });

  test("resolves a name still being typed, as long as one hotel answers to it", () => {
    expect(resolveHotelRegion("voyage sorg")?.name).toBe("Voyage Sorgun");
  });

  test("refuses a lookalike that merely shares generic words", () => {
    // Pinned to a fixture: this is about the resolver's judgement, not about
    // which hotels happen to be indexed today. Suggestion ranking offers these
    // pairs together, and resolving one into the other without the guest
    // confirming would price an Antalya stay as Kızılot or Kemer.
    for (const query of ["Kaleiçi Butik Otel", "Grand Can Hotel", "Deniz Apart Otel"]) {
      expect(resolveHotelRegion(query, { index: lookalikes }), `${query} resolved to another hotel`).toBeNull();
    }
    expect(resolveHotelRegion("Esmeralda Butik Otel", { index: lookalikes })?.region).toBe("kizilagac");
  });
});
