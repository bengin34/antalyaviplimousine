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

    // Step 1 CTA shows "Continue" (no price for private→private quote)
    expect(container.querySelector("#main-book-step1")).toBeInTheDocument();
  });

  test("requires the fuel acknowledgement before a daily chauffeur booking can continue", async () => {
    const { container, findByRole } = render(
      <LanguageProvider initialLanguage="tr">
        <BookingForm scrollOnSelect={false} />
      </LanguageProvider>,
    );

    const future = `${new Date().getFullYear() + 1}-08-10`;

    fireEvent.click(
      container.querySelector('input[value="daily_chauffeur"]')!,
    );

    fireEvent.change(container.querySelector("#travel-date")!, {
      target: { value: future },
    });

    fireEvent.change(container.querySelector("#service-end-date")!, {
      target: { value: future },
    });

    fireEvent.change(container.querySelector("#daily-pickup-time")!, {
      target: { value: "09:00" },
    });

    fireEvent.change(container.querySelector("#hotel-name")!, {
      target: { value: "Test Hotel" },
    });

    // Luggage is required by the booking schema.
    fireEvent.change(container.querySelector("#luggage")!, {
      target: { value: "0" },
    });

    fireEvent.change(container.querySelector("#customer-name")!, {
      target: { value: "Test Guest" },
    });

    fireEvent.change(container.querySelector("#customer-phone")!, {
      target: { value: "+49 151 23456789" },
    });

    fireEvent.change(container.querySelector("#customer-email")!, {
      target: { value: "guest@example.com" },
    });

    fireEvent.click(container.querySelector("#main-book-submit")!);

    const dialog = await findByRole("dialog", {
      name: "Yakıt ücreti hakkında önemli bilgi",
    });

    const confirm =
      dialog.querySelector<HTMLButtonElement>(".button-gold")!;

    expect(confirm).toBeDisabled();

    fireEvent.click(
      dialog.querySelector('input[type="checkbox"]')!,
    );

    expect(confirm).toBeEnabled();
  });
});