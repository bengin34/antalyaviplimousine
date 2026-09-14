// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { LanguageProvider } from "../i18n";
import { verifyFlightNumber } from "../lib/flight-verification";
import { BookingForm } from "./BookingForm";

vi.mock("../lib/flight-verification", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../lib/flight-verification")>()),
  verifyFlightNumber: vi.fn(),
}));

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
    expect(container.querySelector(".price-display-amount")).toHaveTextContent("€70");
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

describe("BookingForm flight verification", () => {
  const flightFuture = `${new Date().getFullYear() + 1}-08-10`;

  // verifyFlightNumber modul duzeyinde paylasilan bir vi.fn(); dosyanin
  // afterEach(cleanup) cagrisi onu sifirlamaz. Sifirlanmazsa cagri sayilari ve
  // mockResolvedValueOnce kuyrugu testler arasinda tasar.
  beforeEach(() => { vi.mocked(verifyFlightNumber).mockReset(); });

  const goToStep2 = () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr">
        <BookingForm scrollOnSelect={false} />
      </LanguageProvider>,
    );
    // advanceToStep2 also gates on trigger("hotelName"), and the schema requires
    // a hotel name for any destination that is not a private address.
    fireEvent.change(container.querySelector("#hotel-name")!, { target: { value: "Test Hotel" } });
    fireEvent.change(container.querySelector("#destination")!, { target: { value: "side" } });
    fireEvent.click(container.querySelector("#main-book-step1")!);
    return container;
  };

  const enterFlight = async (container: HTMLElement, value: string) => {
    await waitFor(() => expect(container.querySelector("#flight-number")).not.toBeNull());
    fireEvent.change(container.querySelector("#travel-date")!, { target: { value: flightFuture } });
    const field = container.querySelector<HTMLInputElement>("#flight-number")!;
    fireEvent.change(field, { target: { value } });
    fireEvent.blur(field);
  };

  const arrivalField = (container: HTMLElement) =>
    container.querySelector<HTMLInputElement>("#flight-arrival-time")!;

  test("a confirmed flight fills the arrival time the guest left empty", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(arrivalField(container).value).toBe("14:35"));
  });

  test("the filled-in time stays editable", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(arrivalField(container).value).toBe("14:35"));
    expect(arrivalField(container)).not.toBeDisabled();
    expect(arrivalField(container)).not.toHaveAttribute("readonly");
    fireEvent.change(arrivalField(container), { target: { value: "16:00" } });
    expect(arrivalField(container).value).toBe("16:00");
  });

  test("a time the guest typed is never overwritten", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await waitFor(() => expect(container.querySelector("#flight-arrival-time")).not.toBeNull());
    fireEvent.change(arrivalField(container), { target: { value: "09:15" } });
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalled());
    expect(arrivalField(container).value).toBe("09:15");
  });

  test("a flight landing elsewhere says so", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "wrong_airport", arrivalAirport: "IST" });
    const container = goToStep2();
    await enterFlight(container, "TK1");
    await waitFor(() => expect(container.querySelector(".flight-hint")).toHaveTextContent("IST"));
  });

  test("a flight the schedule does not know stays silent", async () => {
    for (const status of ["not_found", "unavailable"] as const) {
      vi.mocked(verifyFlightNumber).mockReset().mockResolvedValue({ status });
      const container = goToStep2();
      await enterFlight(container, "ZZ9999");
      await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalled());
      expect(container.querySelector(".flight-hint")).toBeNull();
      expect(arrivalField(container).value).toBe("");
      cleanup();
    }
  });

  test("the same flight and date is never asked about twice", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalledTimes(1));
    fireEvent.blur(container.querySelector("#flight-number")!);
    fireEvent.blur(container.querySelector("#flight-number")!);
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalledTimes(1));
  });

  test("a late answer for a flight number the guest has moved on from is ignored", async () => {
    let resolveFirst: (value: any) => void = () => {};
    vi.mocked(verifyFlightNumber)
      .mockImplementationOnce(() => new Promise(resolve => { resolveFirst = resolve; }))
      .mockResolvedValueOnce({ status: "not_found" });
    const container = goToStep2();
    await enterFlight(container, "TK2412");
    await enterFlight(container, "PC2148");
    resolveFirst({ status: "verified", arrivalTime: "14:35" });
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalledTimes(2));
    expect(arrivalField(container).value).toBe("");
  });
});
