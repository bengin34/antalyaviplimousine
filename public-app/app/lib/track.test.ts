import { describe, expect, test, vi } from "vitest";
import { buildEvent, ensureSessionId, isTrackedEvent } from "./track";

const context = {
  sessionId: "abcdef0123456789",
  page: "/de/transfers/side/",
  language: "de",
  attribution: {
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "antalya-transfer",
    utm_term: null,
    utm_content: null,
    gclid: "abc123",
    landing_page: "/de/",
    referrer: "https://www.google.com/",
  },
};

function memoryStorage(seed: Record<string, string> = {}) {
  const map = new Map(Object.entries(seed));
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => void map.set(key, value),
  };
}

describe("site event rows", () => {
  test("lifts the funnel fields into their own columns", () => {
    expect(buildEvent("price_shown", { route: "side", vehicle: "vito", price: 53 }, context)).toMatchObject({
      event: "price_shown",
      route: "side",
      vehicle: "vito",
      price: 53,
      page: "/de/transfers/side/",
      language: "de",
      session_id: "abcdef0123456789",
    });
  });

  test("copies the campaign the visitor arrived on", () => {
    expect(buildEvent("landing_view", {}, context)).toMatchObject({
      utm_source: "google",
      utm_campaign: "antalya-transfer",
      gclid: "abc123",
    });
  });

  test("keeps anything else in props", () => {
    expect(buildEvent("whatsapp_clicked", { source: "floating_button" }, context).props).toEqual({
      source: "floating_button",
    });
  });

  test("never writes personal data, whatever the caller passes", () => {
    const row = buildEvent(
      "booking_submitted",
      {
        route: "side",
        customerName: "Test Guest",
        customer_email: "guest@example.com",
        phone: "+49 151 23456789",
        email: "guest@example.com",
        hotelName: "Some Hotel",
      },
      context,
    );

    expect(row.props).toEqual({});
    expect(JSON.stringify(row)).not.toContain("guest@example.com");
    expect(JSON.stringify(row)).not.toContain("Test Guest");
  });

  test("refuses an event name the table would reject", () => {
    expect(isTrackedEvent("price_shown")).toBe(true);
    expect(isTrackedEvent("made_up_event")).toBe(false);
  });

  test("drops a price that is not a finite number", () => {
    expect(buildEvent("price_shown", { price: Number.NaN }, context).price).toBeNull();
    expect(buildEvent("price_shown", { price: "53" }, context).price).toBe(53);
  });
});

describe("session id", () => {
  test("is created once and reused for the rest of the visit", () => {
    const storage = memoryStorage();
    const first = ensureSessionId(storage);

    expect(first).toMatch(/^[a-z0-9]{8,64}$/);
    expect(ensureSessionId(storage)).toBe(first);
  });

  test("still returns a usable id when storage is unavailable", () => {
    expect(ensureSessionId(null)).toMatch(/^[a-z0-9]{8,64}$/);
  });

  test("replaces a stored id the table constraint would reject", () => {
    expect(ensureSessionId(memoryStorage({ "avl-session": "short" }))).not.toBe("short");
  });
});
