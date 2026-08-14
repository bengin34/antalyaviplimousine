// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { LanguageProvider } from "../i18n";
import { HealthPage } from "./HealthPage";

afterEach(cleanup);

describe("HealthPage", () => {
  test("states the coordinator and healthcare-provider roles explicitly", () => {
    render(
      <LanguageProvider initialLanguage="tr">
        <HealthPage />
      </LanguageProvider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Sağlığınız için doğru sorularla başlayan planlı bir yolculuk.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Koordinasyon, sağlık hizmeti değildir.")).toBeInTheDocument();
    expect(screen.getAllByText(/Antalya VIP Tourism bir sağlık kuruluşu değildir/).length).toBeGreaterThan(0);
  });

  test("builds a prefilled consultation link without requesting medical records", () => {
    const { container } = render(
      <LanguageProvider initialLanguage="en">
        <HealthPage />
      </LanguageProvider>,
    );

    fireEvent.change(container.querySelector("#health-service")!, {
      target: { value: "2" },
    });

    const link = container.querySelector<HTMLAnchorElement>(".health-consultation-submit");
    expect(link?.href).toContain("https://wa.me/905302655790?");
    expect(decodeURIComponent(link?.href ?? "")).toContain("Dental care");
    expect(screen.getByText(/Please do not send medical records or photographs/)).toBeInTheDocument();
  });

  test("expands and collapses the health FAQ", () => {
    render(
      <LanguageProvider initialLanguage="en">
        <HealthPage />
      </LanguageProvider>,
    );

    const secondQuestion = screen.getByRole("button", {
      name: /Which technique is right for me?/,
    });
    expect(secondQuestion).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(secondQuestion);
    expect(secondQuestion).toHaveAttribute("aria-expanded", "true");
  });
});
