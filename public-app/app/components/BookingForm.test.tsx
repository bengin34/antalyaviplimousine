// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { routeCatalog } from "../../../src/routes.js";
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

  test("picking a hotel from the suggestions fills in the region and its price", () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr">
        <BookingForm scrollOnSelect={false} />
      </LanguageProvider>,
    );

    const destination = container.querySelector<HTMLSelectElement>("#destination")!;
    expect(destination.value).toBe("");

    fireEvent.change(container.querySelector("#hotel-name")!, {
      target: { value: "rixos belek" },
    });

    const options = container.querySelectorAll('[role="option"]');
    expect(options.length).toBeGreaterThan(0);
    expect(options[0]).toHaveTextContent("Rixos Premium Belek");

    fireEvent.click(options[0]);

    expect(destination.value).toBe("belek");
    expect(container.querySelector<HTMLInputElement>("#hotel-name")!.value).toBe("Rixos Premium Belek");
    expect(container.querySelector(".price-display-amount")).toHaveTextContent("€40");
    expect(container.querySelector(".hotel-region-hint")).toHaveTextContent("Rixos Premium Belek — Belek");
  });

  test("names the belde when the hotel is priced under a neighbouring region", () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr">
        <BookingForm scrollOnSelect={false} />
      </LanguageProvider>,
    );

    fireEvent.change(container.querySelector("#hotel-name")!, {
      target: { value: "kirman leodikya" },
    });
    fireEvent.click(container.querySelectorAll('[role="option"]')[0]);

    expect(container.querySelector<HTMLSelectElement>("#destination")!.value).toBe("alanya_bati");
    expect(container.querySelector(".hotel-region-hint"))
      .toHaveTextContent("Kirman Leodikya Resort · Okurcalar — Batı Alanya");
    expect(container.querySelector(".price-display-amount"))
      .toHaveTextContent(`€${routeCatalog.alanya_bati.prices.vito}`);
    expect(container.querySelectorAll('[role="option"]')).toHaveLength(0);
  });

  test("a guest whose hotel is not indexed keeps their text and chooses the region", () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr">
        <BookingForm scrollOnSelect={false} />
      </LanguageProvider>,
    );

    fireEvent.change(container.querySelector("#hotel-name")!, {
      target: { value: "Qwx Zyx Konukevi" },
    });

    expect(container.querySelectorAll('[role="option"]')).toHaveLength(0);
    fireEvent.click(container.querySelector(".hotel-combobox-dismiss")!);

    expect(container.querySelector<HTMLInputElement>("#hotel-name")!.value).toBe("Qwx Zyx Konukevi");

    fireEvent.change(container.querySelector("#destination")!, {
      target: { value: "side" },
    });

    expect(container.querySelector(".price-display-amount")).toHaveTextContent("€50");
  });

  test("does not change the destination when the guest is leaving their hotel", () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr">
        <BookingForm scrollOnSelect={false} />
      </LanguageProvider>,
    );

    fireEvent.change(container.querySelector("#pickup")!, {
      target: { value: "hotel" },
    });
    fireEvent.change(container.querySelector("#destination")!, {
      target: { value: "airport" },
    });

    fireEvent.change(container.querySelector("#hotel-name")!, {
      target: { value: "rixos belek" },
    });
    fireEvent.click(container.querySelectorAll('[role="option"]')[0]);

    expect(container.querySelector<HTMLInputElement>("#hotel-name")!.value).toBe("Rixos Premium Belek");
    expect(container.querySelector<HTMLSelectElement>("#destination")!.value).toBe("airport");

    // The return costs the same as the outbound, so knowing the hotel is
    // enough to quote it: Belek → airport is the Belek price.
    expect(container.querySelector(".price-display-amount")).toHaveTextContent("€40");
    expect(container.querySelector(".price-display-route")).toHaveTextContent("Belek → Antalya Havalimanı (AYT)");
  });
});