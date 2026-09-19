// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { publicRouteSlugs, routeCatalog } from "../../../src/routes.js";
import { AGENCY_DISCOUNT_EUR, b2bRates } from "../lib/b2b";
import { LanguageProvider } from "../i18n";
import { B2bPage } from "./B2bPage";

afterEach(cleanup);

const renderB2b = () => render(
  <LanguageProvider initialLanguage="en">
    <B2bPage />
  </LanguageProvider>,
);

const rateTable = () => screen.getByRole("table", { name: /Vito transfer rates/ });

// By position rather than by name: "Manavgat" and "Manavgat/Kızılağaç" are
// separate routes at separate fares, and a name match cannot tell them apart.
const rowFor = (slug: string) => {
  const index = b2bRates.findIndex((rate) => rate.slug === slug);
  expect(index, `no rate row for ${slug}`).toBeGreaterThan(-1);
  const [, ...rows] = within(rateTable()).getAllByRole("row");
  return rows[index];
};

describe("B2bPage", () => {
  test("opens on the published rate, which is what a guest riding with us pays", () => {
    renderB2b();

    const published = screen.getByRole("radio", { name: /Your guest travels in our vehicle/ });
    expect(published).toBeChecked();
    expect(screen.getByRole("radio", { name: /You buy the transfer from us/ })).not.toBeChecked();

    expect(
      within(rowFor("belek")).getByText(`€${routeCatalog.belek.prices.vito}`),
    ).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Published price" })).toBeInTheDocument();
  });

  test("switching to the agency option takes the discount off every fare", () => {
    renderB2b();

    fireEvent.click(screen.getByRole("radio", { name: /You buy the transfer from us/ }));

    expect(screen.getByRole("columnheader", { name: "Agency net price" })).toBeInTheDocument();
    for (const rate of b2bRates) {
      const row = rowFor(rate.slug);
      expect(within(row).getByText(`€${rate.guest - AGENCY_DISCOUNT_EUR}`)).toBeInTheDocument();
      // The fare it was cut from stays visible, so the agency can see the
      // margin rather than having to work it out.
      expect(within(row).getByText(`€${rate.guest}`)).toBeInTheDocument();
    }
  });

  test("quotes every marketed route at the fare the rest of the site quotes", () => {
    renderB2b();

    expect(b2bRates).toHaveLength(publicRouteSlugs.length);

    for (const slug of publicRouteSlugs) {
      const route = routeCatalog[slug];
      const rate = b2bRates.find((entry) => entry.slug === slug);
      expect(rate?.guest).toBe(route.prices.vito);
      const row = rowFor(slug);
      expect(within(row).getByText(route.names.en)).toBeInTheDocument();
      expect(within(row).getByText(`€${route.prices.vito}`)).toBeInTheDocument();
    }
  });

  test("never derives an agency rate at or below zero", () => {
    for (const rate of b2bRates) {
      expect(rate.agency).toBeGreaterThan(0);
      expect(rate.agency).toBe(rate.guest - AGENCY_DISCOUNT_EUR);
    }
  });

  test("states the discount rather than leaving the two options to be compared by hand", () => {
    renderB2b();

    expect(screen.getByText(`Website rate − €${AGENCY_DISCOUNT_EUR} per transfer`)).toBeInTheDocument();
    expect(screen.getByText("Published website rate")).toBeInTheDocument();
  });

  test("keeps the partner contact routes pointed at the business channels", () => {
    renderB2b();

    for (const link of screen.getAllByRole("link", { name: /WhatsApp/ })) {
      expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/905302655790"));
    }
    expect(screen.getByRole("link", { name: "support@antalyaviptourism.com" })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:support@antalyaviptourism.com"),
    );
  });
});
