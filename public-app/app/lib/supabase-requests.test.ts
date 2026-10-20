// @vitest-environment jsdom

/**
 * The public site's Supabase call sites, checked at the wire: each one must
 * send the request supabase-js used to send (table, columns, filters, anon
 * headers) and keep its fallback behaviour when Supabase is down or unset.
 */

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fetchLivePriceOverrides } from "./booking";
import { verifyFlightNumber } from "./flight-verification";
import { fetchLandOfLegendsLiveRates } from "./land-of-legends";
import { track } from "./track";

const fetchMock = vi.fn();
const anonHeaders = { apikey: "anon-key", Authorization: "Bearer anon-key" };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("VITE_SUPABASE_URL", "https://project.supabase.co");
  vi.stubEnv("VITE_SUPABASE_ANON_KEY", "anon-key");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function unconfigure() {
  vi.stubEnv("VITE_SUPABASE_URL", "");
}

describe("fetchLivePriceOverrides", () => {
  test("reads airport routes and chauffeur rates with the same select/filter as before", async () => {
    fetchMock.mockImplementation(async (url: string) =>
      url.includes("/routes?")
        ? json([{ to_location: "side", vehicle_type: "vclass", price_eur: "70.00" }])
        : json([{ vehicle_type: "vito", daily_rate_eur: 250 }]),
    );

    await expect(fetchLivePriceOverrides()).resolves.toEqual({
      routePrices: { "side:sprinter": 70 },
      dailyRates: { vito: 250 },
    });
    const urls = fetchMock.mock.calls.map(([url]) => url);
    expect(urls).toEqual([
      "https://project.supabase.co/rest/v1/routes?select=to_location%2Cvehicle_type%2Cprice_eur&from_location=eq.airport",
      "https://project.supabase.co/rest/v1/chauffeur_service_rates?select=vehicle_type%2Cdaily_rate_eur",
    ]);
    for (const [, init] of fetchMock.mock.calls) {
      expect(init).toMatchObject({ method: "GET", headers: { ...anonHeaders, "Accept-Profile": "public" } });
    }
  });

  test("a failing table leaves only that table empty, as with supabase-js", async () => {
    fetchMock.mockImplementation(async (url: string) =>
      url.includes("/routes?") ? json({ message: "denied" }, 401) : json([{ vehicle_type: "vclass", daily_rate_eur: 300 }]),
    );

    await expect(fetchLivePriceOverrides()).resolves.toEqual({ routePrices: {}, dailyRates: { sprinter: 300 } });
  });

  test("without configuration it falls back to the bundled prices and sends nothing", async () => {
    unconfigure();
    await expect(fetchLivePriceOverrides()).resolves.toEqual({});
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("fetchLandOfLegendsLiveRates", () => {
  test("reads land_of_legends_rates with the same columns as before", async () => {
    fetchMock.mockResolvedValue(json([{ region_slug: "belek", vehicle_type: "vito", price_eur: 90 }]));

    await expect(fetchLandOfLegendsLiveRates()).resolves.toEqual({ "belek:vito": 90 });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://project.supabase.co/rest/v1/land_of_legends_rates?select=region_slug%2Cvehicle_type%2Cprice_eur",
      expect.objectContaining({ method: "GET", headers: expect.objectContaining(anonHeaders) }),
    );
  });

  test("without configuration it keeps the built-in tariff", async () => {
    unconfigure();
    await expect(fetchLandOfLegendsLiveRates()).resolves.toEqual({});
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("track", () => {
  test("inserts one site_events row, fire-and-forget, with keepalive", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 201 }));

    expect(track("landing_view", { route: "side" })).toBeUndefined();
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://project.supabase.co/rest/v1/site_events");
    expect(init).toMatchObject({
      method: "POST",
      keepalive: true,
      headers: { ...anonHeaders, Prefer: "return=minimal", "Content-Type": "application/json" },
    });
    expect(JSON.parse(init.body)).toMatchObject({ event: "landing_view", route: "side" });
  });

  test("a failed insert never reaches the page", async () => {
    const unhandled = vi.fn();
    process.on("unhandledRejection", unhandled);
    fetchMock.mockRejectedValue(new TypeError("blocked by client"));

    expect(() => track("landing_view")).not.toThrow();
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalled());
    await new Promise((resolve) => setTimeout(resolve, 0));
    process.off("unhandledRejection", unhandled);
    expect(unhandled).not.toHaveBeenCalled();
  });
});

describe("verifyFlightNumber (default transport)", () => {
  test("posts to verify-flight and returns the verified result", async () => {
    fetchMock.mockResolvedValue(json({ status: "verified", arrivalTime: "14:35" }));

    await expect(verifyFlightNumber("TK2412", "2026-09-20")).resolves.toEqual({
      status: "verified",
      arrivalTime: "14:35",
    });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://project.supabase.co/functions/v1/verify-flight");
    expect(init).toMatchObject({ method: "POST", headers: { ...anonHeaders, "Content-Type": "application/json" } });
    expect(JSON.parse(init.body)).toEqual({ flightNumber: "TK2412", date: "2026-09-20" });
  });

  test("HTTP and network failures are 'unavailable'", async () => {
    fetchMock.mockResolvedValueOnce(json({ error: "quota" }, 429));
    await expect(verifyFlightNumber("TK2412", "2026-09-20")).resolves.toEqual({ status: "unavailable" });

    fetchMock.mockRejectedValueOnce(new TypeError("offline"));
    await expect(verifyFlightNumber("TK2412", "2026-09-20")).resolves.toEqual({ status: "unavailable" });
  });

  test("without configuration it is 'unavailable' and sends nothing", async () => {
    unconfigure();
    await expect(verifyFlightNumber("TK2412", "2026-09-20")).resolves.toEqual({ status: "unavailable" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
