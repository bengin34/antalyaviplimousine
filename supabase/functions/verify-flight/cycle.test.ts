import { describe, expect, test } from "vitest";
import { cycleKey } from "./cycle";

describe("cycleKey", () => {
  test("the day before the anchor rolls back to last month's anchor", () => {
    expect(cycleKey(new Date("2026-09-13T00:00:00Z"), 14)).toBe("2026-08-14");
  });

  test("the day of the anchor uses this month's anchor", () => {
    expect(cycleKey(new Date("2026-09-14T00:00:00Z"), 14)).toBe("2026-09-14");
  });

  test("the day after the anchor still uses this month's anchor", () => {
    expect(cycleKey(new Date("2026-09-15T00:00:00Z"), 14)).toBe("2026-09-14");
  });

  test("the 1st of the month with anchor 14 rolls back to last month's anchor", () => {
    expect(cycleKey(new Date("2026-09-01T00:00:00Z"), 14)).toBe("2026-08-14");
  });

  test("January with anchor 14 rolls back into December of the previous year", () => {
    expect(cycleKey(new Date("2026-01-05T00:00:00Z"), 14)).toBe("2025-12-14");
  });

  test("anchor 31 in mid-February rolls back to January 31", () => {
    expect(cycleKey(new Date("2026-02-15T00:00:00Z"), 31)).toBe("2026-01-31");
  });

  test("anchor 31 on 1 March clamps to February's last day in a non-leap year", () => {
    expect(cycleKey(new Date("2026-03-01T00:00:00Z"), 31)).toBe("2026-02-28");
  });

  test("anchor 31 on 1 March clamps to February 29 in a leap year", () => {
    expect(cycleKey(new Date("2028-03-01T00:00:00Z"), 31)).toBe("2028-02-29");
  });

  test("anchor 1 always resolves to this month's 1st, on the 1st itself", () => {
    expect(cycleKey(new Date("2026-09-01T00:00:00Z"), 1)).toBe("2026-09-01");
  });

  test("anchor 1 always resolves to this month's 1st, mid-month", () => {
    expect(cycleKey(new Date("2026-09-15T00:00:00Z"), 1)).toBe("2026-09-01");
  });

  test("an anchor of 0 is nonsense and falls back to the default anchor, 14", () => {
    expect(cycleKey(new Date("2026-09-13T00:00:00Z"), 0)).toBe("2026-08-14");
  });

  test("an anchor of 32 is nonsense and falls back to the default anchor, 14", () => {
    expect(cycleKey(new Date("2026-09-13T00:00:00Z"), 32)).toBe("2026-08-14");
  });

  test("a NaN anchor is nonsense and falls back to the default anchor, 14", () => {
    expect(cycleKey(new Date("2026-09-13T00:00:00Z"), NaN)).toBe("2026-08-14");
  });
});
