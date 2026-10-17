// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { LanguageProvider, useLanguage } from "./i18n";
import { pageMessages } from "./lib/page-data.server";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

function Probe() {
  const { language, t } = useLanguage();
  return <p data-language={language}>{t("bookNow", "fallback")}</p>;
}

describe("LanguageProvider dictionaries", () => {
  test("renders the route language from the dictionary its loader passed", () => {
    render(
      <LanguageProvider initialLanguage="de" messages={pageMessages("de")}>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByText(pageMessages("de").bookNow)).toHaveAttribute("data-language", "de");
  });

  test("loads a stored language on demand and only then switches to it", async () => {
    localStorage.setItem("avl-language", "pl");
    render(
      <LanguageProvider initialLanguage="en" messages={pageMessages("en")}>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByText(pageMessages("en").bookNow)).toHaveAttribute("data-language", "en");
    await waitFor(() => expect(screen.getByText(pageMessages("pl").bookNow)).toHaveAttribute("data-language", "pl"));
  });
});
