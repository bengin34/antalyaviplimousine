import { readFile } from "node:fs/promises";
import { describe, expect, test } from "vitest";
import { hotelIndex, hotelSlug } from "./hotel-index.js";
import {
  hotelRegionModulePath,
  hotelRegionTable,
  renderHotelRegionModule,
} from "../scripts/generate-hotel-regions.mjs";
import {
  hotelNameSlug,
  hoursUntilTurkeyTime,
  landOfLegendsNotice,
  resolveHotelRegion,
  turkeyToday,
} from "../supabase/functions/_shared/land-of-legends-rules.js";

describe("server-side hotel region table", () => {
  test("the committed table matches the hotel index (run npm run generate:hotel-regions)", async () => {
    expect(await readFile(hotelRegionModulePath, "utf8")).toBe(renderHotelRegionModule());
  });

  test("the server slug is the index slug for every hotel name", () => {
    for (const hotel of hotelIndex) {
      for (const name of [hotel.name, ...hotel.aliases]) expect(hotelNameSlug(name)).toBe(hotelSlug(name));
    }
  });

  test("resolves a hotel to its own region whatever the casing, and ignores what the client claims", () => {
    const table = hotelRegionTable();
    const kemer = hotelIndex.find((hotel) => hotel.region === "kemer");
    expect(resolveHotelRegion(kemer.name, table)).toBe("kemer");
    expect(resolveHotelRegion(`  ${kemer.name.toUpperCase()} `, table)).toBe("kemer");
    expect(resolveHotelRegion("Some Pension Nobody Indexed", table)).toBeNull();
    expect(resolveHotelRegion("", table)).toBeNull();
    expect(resolveHotelRegion("constructor", table)).toBeNull();
  });
});

describe("Turkey-time notice rules", () => {
  // 2026-10-20 10:00 in Turkey = 07:00 UTC.
  const now = new Date("2026-10-20T07:00:00Z");

  test("uses Turkey's calendar date, not UTC or the visitor's", () => {
    expect(turkeyToday(new Date("2026-10-11T21:30:00Z"))).toBe("2026-10-12"); // 23:30 Berlin, 00:30 Antalya
    expect(turkeyToday(now)).toBe("2026-10-20");
  });

  test("measures hours to a Turkey-local pick-up", () => {
    expect(hoursUntilTurkeyTime("2026-10-20", "13:00", now)).toBe(3);
    expect(Number.isNaN(hoursUntilTurkeyTime("2026-10-20", "", now))).toBe(true);
  });

  test("refuses under 3 hours, flags under 12 for manual confirmation, confirms the rest", () => {
    expect(landOfLegendsNotice("2026-10-20", "09:30", now)).toBe("too_soon"); // already passed
    expect(landOfLegendsNotice("2026-10-20", "12:30", now)).toBe("too_soon");
    expect(landOfLegendsNotice("2026-10-20", "13:00", now)).toBe("short");
    expect(landOfLegendsNotice("2026-10-20", "21:30", now)).toBe("short");
    expect(landOfLegendsNotice("2026-10-21", "09:30", now)).toBe("ok");
  });
});
