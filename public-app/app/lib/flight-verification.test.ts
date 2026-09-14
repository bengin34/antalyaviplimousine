import { describe, expect, test, vi } from "vitest";
import { shouldApplyFlightArrival, verifyFlightNumber } from "./flight-verification";

describe("shouldApplyFlightArrival", () => {
  const verified = { status: "verified", arrivalTime: "14:35" } as const;

  test("fills an empty untouched field", () => {
    expect(shouldApplyFlightArrival(verified, { current: "", touched: false })).toBe("14:35");
  });

  test("never overwrites what the guest typed", () => {
    expect(shouldApplyFlightArrival(verified, { current: "12:00", touched: true })).toBeNull();
  });

  test("leaves a field the guest cleared alone", () => {
    expect(shouldApplyFlightArrival(verified, { current: "", touched: true })).toBeNull();
  });

  test("does not fill from a flight landing somewhere else", () => {
    expect(shouldApplyFlightArrival({ status: "wrong_airport" }, { current: "", touched: false })).toBeNull();
  });

  test("does not fill when the check told us nothing", () => {
    for (const status of ["not_found", "unavailable"] as const) {
      expect(shouldApplyFlightArrival({ status }, { current: "", touched: false })).toBeNull();
    }
  });

  test("does not fill when the API gave no time", () => {
    expect(shouldApplyFlightArrival({ status: "verified" }, { current: "", touched: false })).toBeNull();
  });
});

describe("verifyFlightNumber", () => {
  test("passes the flight and date through and returns the result", async () => {
    const invoke = vi.fn().mockResolvedValue({ data: { status: "verified", arrivalTime: "14:35" }, error: null });
    const result = await verifyFlightNumber("tk 2412", "2026-09-20", { invoke });
    expect(invoke).toHaveBeenCalledWith("verify-flight", { body: { flightNumber: "tk 2412", date: "2026-09-20" } });
    expect(result).toEqual({ status: "verified", arrivalTime: "14:35" });
  });

  test("a transport error is unavailable, never a rejection", async () => {
    const invoke = vi.fn().mockResolvedValue({ data: null, error: new Error("boom") });
    await expect(verifyFlightNumber("TK2412", "2026-09-20", { invoke })).resolves.toEqual({ status: "unavailable" });
  });

  test("a thrown invoke is unavailable", async () => {
    const invoke = vi.fn().mockRejectedValue(new Error("offline"));
    await expect(verifyFlightNumber("TK2412", "2026-09-20", { invoke })).resolves.toEqual({ status: "unavailable" });
  });

  test("an unrecognised status is unavailable", async () => {
    const invoke = vi.fn().mockResolvedValue({ data: { status: "weird" }, error: null });
    await expect(verifyFlightNumber("TK2412", "2026-09-20", { invoke })).resolves.toEqual({ status: "unavailable" });
  });

  test("a missing flight number or date never calls out", async () => {
    const invoke = vi.fn();
    await expect(verifyFlightNumber("", "2026-09-20", { invoke })).resolves.toEqual({ status: "unavailable" });
    await expect(verifyFlightNumber("TK2412", "", { invoke })).resolves.toEqual({ status: "unavailable" });
    expect(invoke).not.toHaveBeenCalled();
  });
});
