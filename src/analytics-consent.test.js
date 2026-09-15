// @vitest-environment jsdom

import { beforeEach, describe, expect, test } from "vitest";
import { DENIED_SIGNALS, GRANTED_SIGNALS, grantConsent, startAnalytics } from "./analytics-consent.js";

/** dataLayer holds `arguments` objects; this reads them back as arrays. */
const pushed = () => Array.from(window.dataLayer ?? []).map((entry) => Array.from(entry));
const commandIndex = (name, second) =>
  pushed().findIndex(([command, argument]) => command === name && (second === undefined || argument === second));

beforeEach(() => {
  document.head.innerHTML = "";
  delete window.dataLayer;
  delete window.gtag;
  delete window.__avlAnalyticsLoaded;
});

describe("consent mode v2", () => {
  test("denies every signal before the tag is configured", () => {
    startAnalytics("unknown");

    const defaultIndex = commandIndex("consent", "default");
    expect(defaultIndex).toBeGreaterThanOrEqual(0);
    expect(pushed()[defaultIndex][2]).toMatchObject(DENIED_SIGNALS);
    // Google only honours the default if it precedes configuration.
    expect(defaultIndex).toBeLessThan(commandIndex("config"));
  });

  test("a rejected visitor still gets no granted signal", () => {
    startAnalytics("rejected");

    expect(commandIndex("consent", "update")).toBe(-1);
  });

  test("accepting upgrades the signals in place, without a second tag", () => {
    startAnalytics("accepted");

    const updateIndex = commandIndex("consent", "update");
    expect(pushed()[updateIndex][2]).toMatchObject(GRANTED_SIGNALS);
    expect(updateIndex).toBeGreaterThan(commandIndex("consent", "default"));
    expect(document.querySelectorAll("script[src*='googletagmanager']")).toHaveLength(1);
  });

  test("consent given later reaches the tag that is already loaded", () => {
    startAnalytics("unknown");
    expect(commandIndex("consent", "update")).toBe(-1);

    grantConsent();

    expect(pushed()[commandIndex("consent", "update")][2]).toMatchObject(GRANTED_SIGNALS);
    expect(document.querySelectorAll("script[src*='googletagmanager']")).toHaveLength(1);
  });

  test("loads the tag once however often it is started", () => {
    startAnalytics("accepted");
    startAnalytics("accepted");

    expect(document.querySelectorAll("script[src*='googletagmanager']")).toHaveLength(1);
  });
});
