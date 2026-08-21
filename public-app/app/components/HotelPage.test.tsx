// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { hotelBySlug } from "../../../src/hotels.js";
import { LanguageProvider } from "../i18n";
import { hotelMeta } from "../lib/seo";
import { HotelPage } from "./HotelPage";

afterEach(cleanup);

describe("German hotel transfer landing pages", () => {
  test("uses its regional route facts instead of hotel-specific figures", () => {
    const hotel = hotelBySlug("rixos-premium-belek");
    if (!hotel) throw new Error("Missing hotel catalogue entry");

    render(<LanguageProvider initialLanguage="de"><HotelPage hotel={hotel} /></LanguageProvider>);

    expect(screen.getByRole("heading", { level: 1, name: /Rixos Premium Belek/ })).toBeInTheDocument();
    expect(screen.getByText("35–40 Minuten")).toBeInTheDocument();
    expect(screen.getByText("45 km")).toBeInTheDocument();
    expect(screen.getAllByText("€40")[0]).toBeInTheDocument();
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

    render(<LanguageProvider initialLanguage="de"><HotelPage hotel={hotel} /></LanguageProvider>);

    expect(screen.getByText(/Kadriye und dem Belek Beach Park/)).toBeInTheDocument();
    const faq = hotelMeta(hotel.slug).find((meta) => "script:ld+json" in meta && (meta["script:ld+json"] as { "@type": string })["@type"] === "FAQPage");
    expect(faq).toMatchObject({ "script:ld+json": { mainEntity: [
      { name: `Wie lange dauert die Fahrt zum ${hotel.name}?`, acceptedAnswer: { text: "Bei normalem Verkehr ungefähr 35–40 Minuten." } },
      { name: "Was kostet der Transfer?", acceptedAnswer: { text: "Der Mercedes Vito kostet ab €40 pro Fahrzeug." } },
    ] } });
  });
});
