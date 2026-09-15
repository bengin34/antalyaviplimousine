import { describe, expect, test } from "vitest";
import {
  captureAttribution,
  currentAttribution,
  emptyAttribution,
  mergeAttribution,
} from "./attribution";

/** Minimal Storage stand-in so the capture path is testable outside jsdom. */
function memoryStorage(seed: Record<string, string> = {}) {
  const map = new Map(Object.entries(seed));
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => void map.set(key, value),
  };
}

describe("attribution", () => {
  test("reads the campaign parameters off the landing URL", () => {
    expect(
      mergeAttribution(
        {
          search: "?utm_source=google&utm_medium=cpc&utm_campaign=antalya&gclid=abc123",
          pathname: "/de/transfers/side/",
          referrer: "https://www.google.com/",
        },
        {},
      ),
    ).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "antalya",
      utm_term: null,
      utm_content: null,
      gclid: "abc123",
      landing_page: "/de/transfers/side/",
      referrer: "https://www.google.com/",
    });
  });

  test("keeps the campaign through in-app navigation that drops the query string", () => {
    const landing = mergeAttribution(
      { search: "?utm_source=google&gclid=abc123", pathname: "/de/", referrer: "https://www.google.com/" },
      {},
    );
    // Second page view inside the SPA: no query string, no referrer.
    const next = mergeAttribution({ search: "", pathname: "/de/transfers/side/", referrer: "" }, landing);

    expect(next.utm_source).toBe("google");
    expect(next.gclid).toBe("abc123");
    // Landing page and referrer are first-touch: they describe how the visit started.
    expect(next.landing_page).toBe("/de/");
    expect(next.referrer).toBe("https://www.google.com/");
  });

  test("a fresh campaign overrides the stored one", () => {
    const stored = mergeAttribution({ search: "?utm_source=google", pathname: "/", referrer: "" }, {});
    const next = mergeAttribution({ search: "?utm_source=bing", pathname: "/", referrer: "" }, stored);

    expect(next.utm_source).toBe("bing");
  });

  test("direct visits carry nulls rather than empty strings", () => {
    expect(mergeAttribution({ search: "", pathname: "/", referrer: "" }, {})).toEqual({
      ...emptyAttribution(),
      landing_page: "/",
    });
  });

  test("capture persists the first touch and later reads return it", () => {
    const storage = memoryStorage();
    captureAttribution(
      { search: "?utm_campaign=spring", pathname: "/en/", referrer: "https://t.co/" },
      storage,
    );

    expect(currentAttribution(storage)).toMatchObject({
      utm_campaign: "spring",
      landing_page: "/en/",
      referrer: "https://t.co/",
    });
  });

  test("survives unavailable or corrupt storage", () => {
    expect(currentAttribution(null)).toEqual(emptyAttribution());
    expect(currentAttribution(memoryStorage({ "avl-attribution": "{not json" }))).toEqual(emptyAttribution());
  });
});
