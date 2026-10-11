import { describe, expect, test } from "vitest";
import { addDays, landOfLegendsQuote, submitErrorMessage, suggestedDeparture } from "./land-of-legends";

describe("Land of Legends client helpers", () => {
  test("a live admin price wins, even for an area the built-in tariff does not price", () => {
    expect(landOfLegendsQuote("antalya", "vito", { "antalya:vito": 99 })).toBe(99);
    expect(landOfLegendsQuote("kas", "vito", { "kas:vito": 320 })).toBe(320);
    expect(landOfLegendsQuote("kas", "vito")).toBeNull();
    expect(landOfLegendsQuote("", "vito", { ":vito": 1 })).toBeNull();
  });

  test("suggests a pick-up that reaches the park before 10:00, never before 07:00", () => {
    expect(suggestedDeparture(21)).toBe("09:15");
    expect(suggestedDeparture(137)).toBe("07:15"); // Alanya centre
    expect(suggestedDeparture(400)).toBe("07:00");
    expect(suggestedDeparture(null)).toBeNull();
  });

  test("adds calendar days without time-zone drift", () => {
    expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  });

  test("explains a refusal for too little notice", () => {
    const messages = { tooSoon: "notice", generic: "generic" };
    expect(submitErrorMessage(new Error("pickup_too_soon"), messages)).toBe("notice");
    expect(submitErrorMessage(new Error("boom"), messages)).toBe("generic");
    expect(submitErrorMessage("x", messages)).toBe("generic");
  });
});
