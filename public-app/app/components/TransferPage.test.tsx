// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { localizedRoute } from "../../../src/routes.js";
import { LanguageProvider } from "../i18n";
import { TransferPage } from "./TransferPage";

afterEach(cleanup);

const renderGermanRoute = (slug: string) => {
  const route = localizedRoute(slug, "de");
  if (!route) throw new Error(`Missing route ${slug}`);

  return render(
    <LanguageProvider initialLanguage="de">
      <TransferPage language="de" route={route} />
    </LanguageProvider>,
  );
};

describe("German transfer landing pages", () => {
  test.each(["belek", "side", "kemer", "alanya", "kizilagac", "tekirova"])(
    "%s presents the fixed vehicle price and booking trust signals",
    (slug) => {
      renderGermanRoute(slug);

      expect(screen.getAllByText("Preis für das gesamte Fahrzeug")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Keine Vorauszahlung erforderlich")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Zahlung direkt beim Fahrer")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Keine versteckten Gebühren")[0]).toBeInTheDocument();
    },
  );

  test("describes Side as a destination rather than only as a transfer route", () => {
    renderGermanRoute("side");

    expect(screen.getByText(/historische Altstadt mit langen Sandstränden/)).toBeInTheDocument();
    expect(screen.getByText(/Kumköy, Evrenseki, Çolaklı, Sorgun und Titreyengöl/)).toBeInTheDocument();
  });

  test("uses the agreed Meet & Greet Area J / 777 arrival instructions", () => {
    renderGermanRoute("side");

    expect(screen.getAllByText(/Meet & Greet Bereich J \/ 777/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Unser Flughafen-Team findet Ihre Buchung/).length).toBeGreaterThan(0);
  });

  test("links a German route page to its regional hotel choices", () => {
    renderGermanRoute("belek");

    expect(screen.getByRole("heading", { name: "Beliebte Hotels in Belek" })).toBeInTheDocument();
    expect(screen.getByText("Rixos Premium Belek")).toBeInTheDocument();
  });

  test("links catalogued German hotels to their landing page", () => {
    renderGermanRoute("belek");

    expect(screen.getByRole("link", { name: "Rixos Premium Belek" })).toHaveAttribute("href", "/de/hotels/rixos-premium-belek/");
  });
});
