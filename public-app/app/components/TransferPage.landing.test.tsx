// @vitest-environment jsdom

/**
 * The German route pages carry the full landing copy — region description,
 * arrival instructions, trust bullets, hotel list, extra FAQ — while every
 * other language used to get a bare template. These tests hold the other
 * published landings to the same structure, so a language cannot be added to
 * `transferLandingCopy` half-finished.
 */

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { localizedRoute } from "../../../src/routes.js";
import { indexableLanguages } from "../lib/site";
import { LanguageProvider } from "../i18n";
import { LandOfLegendsBookingCopyProvider } from "../lib/land-of-legends-booking-copy";
import { landOfLegendsBookingCopy, pageMessages, transferPageData } from "../lib/page-data.server";
import { transferLandingCopy, transferLandingLanguages } from "../lib/transfer-landing-copy";
import type { IndexableLanguage } from "../lib/site";
import { TransferPage } from "./TransferPage";

afterEach(cleanup);

/** The regions whose copy is written; a route outside this set stays on the template. */
const landingRoutes = ["antalya", "belek", "side", "kemer", "alanya", "kizilagac", "tekirova"] as const;

/**
 * The length floor only exists to catch a stub left in place of real prose. A
 * character carries far more of a sentence in Chinese, Japanese and Korean, so
 * the same floor there would demand several times the content the Latin-script
 * languages carry.
 */
const minimumProseLength = (language: IndexableLanguage) =>
  (["zh", "ja", "ko"] as readonly string[]).includes(language) ? 60 : 120;

const renderRoute = (language: IndexableLanguage, slug: string) => {
  const route = localizedRoute(slug, language);
  if (!route) throw new Error(`Missing route ${slug} for ${language}`);

  return render(
    <LanguageProvider initialLanguage={language} messages={pageMessages(language)}>
      <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy(language)}>
        <TransferPage language={language} route={route} data={transferPageData(language, route)} />
      </LandOfLegendsBookingCopyProvider>
    </LanguageProvider>,
  );
};

describe("transfer landing copy", () => {
  test("publishes every indexable language", () => {
    expect([...transferLandingLanguages].sort()).toEqual([...indexableLanguages].sort());
  });

  test.each(transferLandingLanguages)("%s names every landing region", (language) => {
    const copy = transferLandingCopy(language);
    if (!copy) throw new Error(`Missing copy for ${language}`);

    for (const slug of landingRoutes) {
      const region = copy.regions[slug];
      expect(region, `${language}/${slug}`).toBeDefined();
      expect(region?.about.length ?? 0, `${language}/${slug} about`).toBeGreaterThan(minimumProseLength(language));
      expect(region?.routeDetails.length ?? 0, `${language}/${slug} route`).toBeGreaterThan(minimumProseLength(language));
    }
  });

  test.each(transferLandingLanguages)("%s writes its own copy rather than reusing German", (language) => {
    const copy = transferLandingCopy(language);
    const german = transferLandingCopy("de");
    if (!copy || !german) throw new Error("Missing copy");
    if (language === "de") return;

    expect(copy.heroCta).not.toBe(german.heroCta);
    expect(copy.regions.belek?.about).not.toBe(german.regions.belek?.about);
  });
});

/**
 * Rendering every language against every landing route is 161 page renders and
 * the route axis only swaps the region block, so the language axis is checked
 * on one route and the route axis on the two reference languages below.
 *
 * German is left out here because it is the one language that links its own
 * hotel landing pages, which the hotel-list assertion forbids.
 */
const addedLanguages = transferLandingLanguages.filter((language) => language !== "de");

describe.each(addedLanguages)("%s transfer landing pages", (language) => {
  const copy = transferLandingCopy(language);
  if (!copy) throw new Error(`Missing copy for ${language}`);

  test("shows the whole-vehicle price and its trust bullets", () => {
    renderRoute(language, "belek");

    expect(screen.getAllByText(copy.wholeVehicle)[0]).toBeInTheDocument();
    for (const bullet of copy.priceTrust) {
      expect(screen.getAllByText(bullet)[0], `belek: ${bullet}`).toBeInTheDocument();
    }
  });

  test("describes the destination, not only the drive", () => {
    renderRoute(language, "side");

    const region = copy.regions.side;
    if (!region) throw new Error("Missing side region copy");
    expect(screen.getByText(region.about)).toBeInTheDocument();
    expect(screen.getByText(region.routeDetails)).toBeInTheDocument();
  });

  test("gives the Meet & Greet arrival instructions", () => {
    renderRoute(language, "side");

    expect(screen.getAllByText(/J \/ 777/).length).toBeGreaterThan(0);
  });

  test("lists regional hotels as text without linking the German hotel pages", () => {
    renderRoute(language, "belek");

    const belek = localizedRoute("belek", language);
    const place = copy.regions.belek?.name?.location ?? belek?.name ?? "";
    expect(screen.getByRole("heading", { name: copy.hotelsHeading(place) })).toBeInTheDocument();
    expect(screen.getByText("Rixos Premium Belek")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Rixos Premium Belek" })).not.toBeInTheDocument();
  });

  test("adds the landing FAQ entries on top of the route FAQ", () => {
    renderRoute(language, "belek");

    for (const [question] of copy.faq) {
      expect(screen.getByRole("heading", { name: question })).toBeInTheDocument();
    }
  });
});

describe.each(["de", "en"] as const)("%s covers every landing route", (language) => {
  const copy = transferLandingCopy(language);
  if (!copy) throw new Error(`Missing copy for ${language}`);

  test.each(landingRoutes)("%s shows the whole-vehicle price and its region copy", (slug) => {
    renderRoute(language, slug);

    expect(screen.getAllByText(copy.wholeVehicle)[0]).toBeInTheDocument();
    const region = copy.regions[slug];
    if (!region) throw new Error(`Missing ${slug} region copy`);
    expect(screen.getByText(region.about)).toBeInTheDocument();
  });
});

describe("place names carry the case the sentence needs", () => {
  test("Russian puts hotels in Белеке, not in the accusative Белек of the booking form", () => {
    renderRoute("ru", "belek");

    expect(screen.getByRole("heading", { name: /Популярные отели в Белеке/ })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Популярные отели в Белек$/ })).not.toBeInTheDocument();
  });

  test("Russian returns из Аланьи while the booking form still reads в Аланью", () => {
    renderRoute("ru", "alanya");

    expect(screen.getByText(/Обратный трансфер из Аланьи/)).toBeInTheDocument();
  });

  test("Polish inflects the destination after do", () => {
    renderRoute("pl", "belek");

    expect(screen.getByRole("heading", { name: /transfer do Beleku/ })).toBeInTheDocument();
  });
});

describe("routes without region copy", () => {
  test("fall back to the route template without crashing", () => {
    const copy = transferLandingCopy("en");
    expect(copy.regions.bodrum).toBeUndefined();

    renderRoute("en", "bodrum");

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.queryByText(copy.wholeVehicle)).not.toBeInTheDocument();
    expect(screen.queryByText("Preis für das gesamte Fahrzeug")).not.toBeInTheDocument();
  });
});
