// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { LanguageProvider } from "../i18n";
import { BookingForm } from "./BookingForm";

afterEach(cleanup);

describe("BookingForm route summary", () => {
  test("shows localized labels instead of internal private-address values", () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr">
        <BookingForm scrollOnSelect={false} />
      </LanguageProvider>,
    );

    fireEvent.change(container.querySelector("#pickup")!, {
      target: { value: "private_address" },
    });
    fireEvent.change(container.querySelector("#destination")!, {
      target: { value: "private_address" },
    });

    const routeSummary = container.querySelector(".price-display-route");
    expect(routeSummary).toHaveTextContent("Özel adres → Özel adres");
    expect(routeSummary).not.toHaveTextContent("private_address");
    expect(container.querySelector("#main-book-submit")).toHaveTextContent("Fiyat teklifi al");
  });
});
