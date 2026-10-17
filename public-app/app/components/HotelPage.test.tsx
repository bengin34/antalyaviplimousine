// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { hotelBySlug } from "../../../src/hotels.js";
import { routeCatalog } from "../../../src/routes.js";
import { LanguageProvider } from "../i18n";
import { LandOfLegendsBookingCopyProvider } from "../lib/land-of-legends-booking-copy";
import { landOfLegendsBookingCopy, pageMessages } from "../lib/page-data.server";
import { hotelMeta } from "../lib/seo";
import { HotelPage } from "./HotelPage";

afterEach(cleanup);

describe("German hotel transfer landing pages", () => {
  test("Utopia structured prices and FAQs agree with its Kargicak landing price", () => {
    const hotel = hotelBySlug("utopia-world-hotel")!;
    render(<LanguageProvider initialLanguage="de" messages={pageMessages("de")}><LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("de")}><HotelPage hotel={hotel} /></LandOfLegendsBookingCopyProvider></LanguageProvider>);
    // Utopia sits in Kargıcak, so it is quoted at that sub-region's tariff
    // rather than the Alanya page's own — read it from the catalogue so a
    // tariff change moves the page and this test together.
    const vito = routeCatalog.kargicak.prices.vito;
    expect(screen.getAllByText(`€${vito}`).length).toBeGreaterThan(0);
    const metas = hotelMeta(hotel.slug);
    expect(metas).toContainEqual(expect.objectContaining({ name: "description", content: expect.stringContaining(`€${vito}`) }));
    expect(metas).toContainEqual({ "script:ld+json": expect.objectContaining({ "@type": "Service", offers: expect.arrayContaining([expect.objectContaining({ name: "Mercedes Vito", price: String(vito) })]) }) });
    expect(metas).toContainEqual({ "script:ld+json": expect.objectContaining({ "@type": "FAQPage", mainEntity: expect.arrayContaining([expect.objectContaining({ name: "Was kostet der Transfer?", acceptedAnswer: expect.objectContaining({ text: expect.stringContaining(`€${vito}`) }) })]) }) });
  });

  test("uses its regional route facts instead of hotel-specific figures", () => {
    const hotel = hotelBySlug("rixos-premium-belek");
    if (!hotel) throw new Error("Missing hotel catalogue entry");

    render(<LanguageProvider initialLanguage="de" messages={pageMessages("de")}><LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("de")}><HotelPage hotel={hotel} /></LandOfLegendsBookingCopyProvider></LanguageProvider>);

    expect(screen.getByRole("heading", { level: 1, name: /Rixos Premium Belek/ })).toBeInTheDocument();
    expect(screen.getByText("35–40 Minuten")).toBeInTheDocument();
    expect(screen.getByText("45 km")).toBeInTheDocument();
    expect(screen.getAllByText("€43")[0]).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Transfer nach Belek" })).toHaveAttribute("href", "/de/transfers/belek/");
  });

  test("publishes a German-only canonical and service schema", () => {
    const metas = hotelMeta("rixos-premium-belek");

    expect(metas).toContainEqual({ tagName: "link", rel: "canonical", href: "https://antalyaviptourism.com/de/hotels/rixos-premium-belek/" });
    expect(metas.some((meta) => "script:ld+json" in meta && (meta["script:ld+json"] as { "@type": string })["@type"] === "Service")).toBe(true);
    expect(metas.some((meta) => "hrefLang" in meta)).toBe(false);
  });

  test("renders hotel-specific location copy and mirrors visible FAQs in FAQPage schema", () => {
    const hotel = hotelBySlug("rixos-premium-belek");
    if (!hotel) throw new Error("Missing hotel catalogue entry");

    render(<LanguageProvider initialLanguage="de" messages={pageMessages("de")}><LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("de")}><HotelPage hotel={hotel} /></LandOfLegendsBookingCopyProvider></LanguageProvider>);

    expect(screen.getByText(/Kadriye und dem Belek Beach Park/)).toBeInTheDocument();
    const faq = hotelMeta(hotel.slug).find((meta) => "script:ld+json" in meta && (meta["script:ld+json"] as { "@type": string })["@type"] === "FAQPage");
    expect(faq).toMatchObject({ "script:ld+json": { mainEntity: [
      { name: `Wie lange dauert die Fahrt zum ${hotel.name}?`, acceptedAnswer: { text: "Bei normalem Verkehr ungefähr 35–40 Minuten." } },
      { name: "Was kostet der Transfer?", acceptedAnswer: { text: "Der Mercedes Vito kostet ab €43 pro Fahrzeug." } },
      { name: "Was passiert bei einer Flugverspätung?", acceptedAnswer: { text: "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an." } },
      { name: "Wie lange wartet mein Chauffeur am Flughafen?", acceptedAnswer: { text: "Die ersten 90 Minuten nach der Landung sind kostenfrei enthalten, und bei Flugverspätungen verschiebt sich dieses Zeitfenster automatisch." } },
      { name: "Wie bezahle ich den Transfer?", acceptedAnswer: { text: "Bar an Ihren Chauffeur zu Beginn der Fahrt - zum Festpreis aus Ihrer Buchung, pro Fahrzeug." } },
    ] } });
  });
});
