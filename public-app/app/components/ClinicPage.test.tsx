// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { LanguageProvider } from "../i18n";
import { ClinicPage } from "./ClinicPage";

afterEach(cleanup);

const renderClinic = () => render(
  <LanguageProvider initialLanguage="tr">
    <ClinicPage />
  </LanguageProvider>,
);

describe("ClinicPage", () => {
  test("keeps the fictional demo status visible while presenting a complete clinic concept", () => {
    renderClinic();

    expect(screen.getByRole("heading", { level: 1, name: /Daha fazlası değil.*Size uygun olan/ })).toBeInTheDocument();
    expect(screen.getByText("KURGU SATIŞ DEMOSU")).toBeInTheDocument();
    expect(screen.getByText(/ORIVA Clinic ve bu sayfadaki kişiler/)).toBeInTheDocument();
    expect(screen.getAllByText(/gerçek kişi/i).length).toBeGreaterThan(0);
  });

  test("labels fictional doctors, generated portraits and illustrative cases explicitly", () => {
    renderClinic();

    for (const name of ["Dr. Ada Varel", "Dr. Kerem Loran", "Dt. Nil Arven"]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
    expect(screen.getAllByText("YAPAY ÜRETİM · KURGU PORTRE")).toHaveLength(3);
    expect(screen.getAllByText("YAPAY OLARAK ÜRETİLMİŞ TEMSİLİ GÖRSEL")).toHaveLength(3);
    expect(screen.getAllByText(/Tıbbi sonuç veya tedavi önerisi göstermez/)).toHaveLength(3);
  });

  test("uses the contact action only for a clinic website sales conversation", () => {
    renderClinic();

    const link = screen.getByRole("link", { name: /Canlı sunum talep edin/ });
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/905302655790?text="));
    expect(decodeURIComponent(link.getAttribute("href") ?? "")).toContain("web sitesi demosu");
    expect(screen.getByText(/tıbbi randevu veya ön değerlendirme oluşturmaz/)).toBeInTheDocument();
  });

  test("expands and collapses the clinic FAQ accessibly", () => {
    renderClinic();

    const first = screen.getByRole("button", { name: /ORIVA gerçek bir klinik mi?/ });
    const second = screen.getByRole("button", { name: /Bu sayfadaki hekimler gerçek mi?/ });
    expect(first).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
  });
});
