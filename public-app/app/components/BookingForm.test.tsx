// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import { routeCatalog } from "../../../src/routes.js";
import { LanguageProvider } from "../i18n";
import { LandOfLegendsBookingCopyProvider } from "../lib/land-of-legends-booking-copy";
import { landOfLegendsBookingCopy, pageMessages } from "../lib/page-data.server";
import { shouldApplyFlightArrival, verifyFlightNumber } from "../lib/flight-verification";
import { BookingForm } from "./BookingForm";
import { preloadHotelData } from "../lib/hotel-data";

vi.mock("../lib/flight-verification", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../lib/flight-verification")>();
  return {
    ...actual,
    verifyFlightNumber: vi.fn(),
    shouldApplyFlightArrival: vi.fn(actual.shouldApplyFlightArrival),
  };
});

afterEach(cleanup);

// In the browser the hotel index is fetched when the guest reaches the hotel
// field; these cases type into it straight away, so it is loaded up front and
// the suggestions are there on the first keystroke.
beforeAll(() => preloadHotelData());

describe("BookingForm route summary", () => {
  test("shows localized labels instead of internal private-address values", () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
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

  test("asks for golf bags and strollers and moves a Vito that no longer fits to the Sprinter", async () => {
    const { container, getByText } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
      </LanguageProvider>,
    );

    fireEvent.click(container.querySelector('input[value="daily_chauffeur"]')!);
    expect(getByText("Golf çantası ve bebek arabası bagajda ekstra yer kaplar; göndereceğimiz aracı değiştirebilir.")).toBeInTheDocument();

    fireEvent.change(container.querySelector("#guests")!, { target: { value: "4" } });
    fireEvent.change(container.querySelector("#luggage")!, { target: { value: "4" } });
    expect(container.querySelector<HTMLSelectElement>("#vehicle-type")!.value).toBe("vito");

    fireEvent.change(container.querySelector("#golf-bags")!, { target: { value: "2" } });
    await waitFor(() => expect(container.querySelector<HTMLSelectElement>("#vehicle-type")!.value).toBe("sprinter"));
    expect(container.querySelector<HTMLOptionElement>('#vehicle-type option[value="vito"]')!.disabled).toBe(true);
  });

  test("requires the fuel acknowledgement before a daily chauffeur booking can continue", async () => {
    const { container, findByRole } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
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

    // The phone input library is loaded on demand.
    await waitFor(() => expect(container.querySelector("#customer-phone")).not.toBeNull());
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
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
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
    expect(container.querySelector(".price-display-amount")).toHaveTextContent("€43");
    expect(container.querySelector(".hotel-region-hint")).toHaveTextContent("Rixos Premium Belek — Belek");
  });

  test("names the belde when the hotel is priced under a neighbouring region", () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
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
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
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

    expect(container.querySelector(".price-display-amount")).toHaveTextContent("€53");
  });

  test("does not change the destination when the guest is leaving their hotel", () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
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
    expect(container.querySelector(".price-display-amount")).toHaveTextContent("€43");
    expect(container.querySelector(".price-display-route")).toHaveTextContent("Belek → Antalya Havalimanı (AYT)");
  });

  test("a hotel-to-hotel transfer asks for both hotels", () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
      </LanguageProvider>,
    );

    // One hotel while the airport is an end of the journey...
    expect(container.querySelector("#dropoff-hotel-name")).not.toBeInTheDocument();
    fireEvent.change(container.querySelector("#pickup")!, { target: { value: "hotel" } });
    fireEvent.change(container.querySelector("#destination")!, { target: { value: "airport" } });
    expect(container.querySelector("#dropoff-hotel-name")).not.toBeInTheDocument();

    // ...and a second one as soon as both ends are hotels.
    fireEvent.change(container.querySelector("#destination")!, { target: { value: "belek" } });
    expect(container.querySelector("#dropoff-hotel-name")).toBeInTheDocument();

    fireEvent.change(container.querySelector("#hotel-name")!, { target: { value: "lara barut" } });
    fireEvent.click(container.querySelectorAll('[role="option"]')[0]);
    const pickupHotel = container.querySelector<HTMLInputElement>("#hotel-name")!.value;
    expect(pickupHotel).not.toBe("");

    // The destination hotel is its own field: naming it leaves the pick-up
    // hotel alone, and sets the region the journey is priced on.
    fireEvent.change(container.querySelector("#dropoff-hotel-name")!, { target: { value: "rixos belek" } });
    fireEvent.click(container.querySelectorAll('#dropoff-hotel-row [role="option"]')[0]);
    expect(container.querySelector<HTMLInputElement>("#dropoff-hotel-name")!.value).toBe("Rixos Premium Belek");
    expect(container.querySelector<HTMLInputElement>("#hotel-name")!.value).toBe(pickupHotel);
    expect(container.querySelector<HTMLSelectElement>("#destination")!.value).toBe("belek");
  });

  test("a hotel-to-hotel summary names the region of each end, not the destination twice", () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
      </LanguageProvider>,
    );

    fireEvent.change(container.querySelector("#pickup")!, { target: { value: "hotel" } });
    fireEvent.change(container.querySelector("#destination")!, { target: { value: "bodrum" } });

    // No hotel named yet, so the pick-up end is only known to be a hotel.
    expect(container.querySelector(".price-display-route")).toHaveTextContent("Otel → Bodrum");

    fireEvent.change(container.querySelector("#hotel-name")!, { target: { value: "rixos belek" } });
    fireEvent.click(container.querySelectorAll('[role="option"]')[0]);

    // Naming it tells us the region we collect from — which is not Bodrum.
    expect(container.querySelector(".price-display-route")).toHaveTextContent("Belek → Bodrum");
  });

  test("a journey with no airport end is not asked about a flight", async () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
      </LanguageProvider>,
    );

    fireEvent.change(container.querySelector("#pickup")!, { target: { value: "hotel" } });
    fireEvent.change(container.querySelector("#destination")!, { target: { value: "bodrum" } });
    fireEvent.change(container.querySelector("#hotel-name")!, { target: { value: "Lara Barut Collection" } });
    fireEvent.change(container.querySelector("#dropoff-hotel-name")!, { target: { value: "Mandarin Oriental Bodrum" } });
    fireEvent.click(container.querySelector("#main-book-step1")!);

    await waitFor(() => expect(container.querySelector("#travel-date")).toBeInTheDocument());
    expect(container.querySelector("#flight-number")).not.toBeInTheDocument();
    expect(container.querySelector("#arrival-time")).not.toBeInTheDocument();

    cleanup();

    // The same step still asks for it when the airport is an end.
    const airport = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
      </LanguageProvider>,
    );
    fireEvent.change(airport.container.querySelector("#destination")!, { target: { value: "belek" } });
    fireEvent.change(airport.container.querySelector("#hotel-name")!, { target: { value: "Rixos Premium Belek" } });
    fireEvent.click(airport.container.querySelector("#main-book-step1")!);

    await waitFor(() => expect(airport.container.querySelector("#travel-date")).toBeInTheDocument());
    expect(airport.container.querySelector("#flight-number")).toBeInTheDocument();
  });

  test("a journey that does not start at the airport asks when to collect the guest", async () => {
    const { container, getByText } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
      </LanguageProvider>,
    );

    fireEvent.change(container.querySelector("#pickup")!, { target: { value: "hotel" } });
    fireEvent.change(container.querySelector("#destination")!, { target: { value: "bodrum" } });
    fireEvent.change(container.querySelector("#hotel-name")!, { target: { value: "Lara Barut Collection" } });
    fireEvent.change(container.querySelector("#dropoff-hotel-name")!, { target: { value: "Mandarin Oriental Bodrum" } });
    fireEvent.click(container.querySelector("#main-book-step1")!);

    await waitFor(() => expect(container.querySelector("#transfer-pickup-time")).toBeInTheDocument());
    // Two hotels have no flight to arrive on, so the date is not an arrival.
    expect(getByText("Alış tarihi")).toBeInTheDocument();
    expect(getByText("Alış saati")).toBeInTheDocument();

    cleanup();

    // An airport pick-up is timed by the landing we track, so it is not asked.
    const arrival = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
      </LanguageProvider>,
    );
    fireEvent.change(arrival.container.querySelector("#destination")!, { target: { value: "belek" } });
    fireEvent.change(arrival.container.querySelector("#hotel-name")!, { target: { value: "Rixos Premium Belek" } });
    fireEvent.click(arrival.container.querySelector("#main-book-step1")!);

    await waitFor(() => expect(arrival.container.querySelector("#travel-date")).toBeInTheDocument());
    expect(arrival.container.querySelector("#transfer-pickup-time")).not.toBeInTheDocument();
  });

  test("a journey to the airport asks about the flight the guest leaves on, and never checks arrivals for it", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "23:59", arrivalAirport: "AYT" });
    const { container, getByText } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
      </LanguageProvider>,
    );

    fireEvent.change(container.querySelector("#pickup")!, { target: { value: "hotel" } });
    fireEvent.change(container.querySelector("#destination")!, { target: { value: "airport" } });
    fireEvent.change(container.querySelector("#hotel-name")!, { target: { value: "Rixos Premium Belek" } });
    fireEvent.click(container.querySelector("#main-book-step1")!);

    await waitFor(() => expect(container.querySelector("#flight-number")).toBeInTheDocument());
    expect(getByText("Kalkış tarihi")).toBeInTheDocument();
    expect(getByText("Kalkış uçuş numarası")).toBeInTheDocument();
    expect(getByText("Kalkış uçuş saati")).toBeInTheDocument();
    // The driver still needs an hour: a departure has no landing to wait for.
    expect(container.querySelector("#transfer-pickup-time")).toBeInTheDocument();

    fireEvent.change(container.querySelector("#flight-number")!, { target: { value: "TK2403" } });
    fireEvent.blur(container.querySelector("#flight-number")!);
    // The lookup only knows landings at AYT; asked about an outbound flight it
    // answers about another aircraft, so it is never asked.
    await waitFor(() => expect(container.querySelector<HTMLInputElement>("#flight-number")!.value).toBe("TK2403"));
    expect(verifyFlightNumber).not.toHaveBeenCalled();
  });

  test("the destination hotel is required before the price step", async () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
      </LanguageProvider>,
    );

    fireEvent.change(container.querySelector("#pickup")!, { target: { value: "hotel" } });
    fireEvent.change(container.querySelector("#destination")!, { target: { value: "belek" } });
    fireEvent.change(container.querySelector("#hotel-name")!, { target: { value: "Lara Barut Collection" } });
    fireEvent.click(container.querySelector("#main-book-step1")!);

    await waitFor(() => {
      expect(container.querySelector("#dropoff-hotel-name")).toHaveAttribute("aria-invalid", "true");
    });
    expect(container.querySelector("#travel-date")).not.toBeInTheDocument();
  });
});

describe("BookingForm flight verification", () => {
  const flightFuture = `${new Date().getFullYear() + 1}-08-10`;

  // verifyFlightNumber modul duzeyinde paylasilan bir vi.fn(); dosyanin
  // afterEach(cleanup) cagrisi onu sifirlamaz. Sifirlanmazsa cagri sayilari ve
  // mockResolvedValueOnce kuyrugu testler arasinda tasar.
  // mockReset on a vi.fn(impl) restores that impl in Vitest 3, so
  // shouldApplyFlightArrival keeps its real logic while losing its call log.
  beforeEach(() => {
    vi.mocked(verifyFlightNumber).mockReset();
    vi.mocked(shouldApplyFlightArrival).mockReset();
  });

  const goToStep2 = () => {
    const { container } = render(
      <LanguageProvider initialLanguage="tr" messages={pageMessages("tr")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("tr")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
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

  // The only test that asserts `touched` at all. Every other test here fills the
  // arrival time first, so `current` is non-empty and the rule short-circuits
  // before `touched` is ever consulted — meaning none of them can tell
  // `touched: true` from `touched: false`. This one catches a wrong field name,
  // a hardcoded false, or a future react-hook-form that gates the computation.
  // (In 7.85.0 only `isDirty` is proxy-gated; `dirtyFields` is maintained
  // unconditionally, so the render-time read below is correct-by-the-book rather
  // than load-bearing today. Keep it anyway — it costs nothing and an upgrade
  // should not have to rediscover it.)
  test("the rule is told the guest touched the arrival time", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await waitFor(() => expect(container.querySelector("#flight-arrival-time")).not.toBeNull());
    fireEvent.change(arrivalField(container), { target: { value: "09:15" } });
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(shouldApplyFlightArrival).toHaveBeenCalled());
    expect(vi.mocked(shouldApplyFlightArrival).mock.calls[0][1]).toEqual({
      current: "09:15",
      touched: true,
    });
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

  // WCAG 1.4.1: onay ile uyari arasindaki fark yalnizca renk olamaz. Anlami
  // metin tasiyor; isaret dekoratif, o yuzden aria-hidden.
  test("the two hints are told apart by a marker, not only by colour", async () => {
    const marker = (container: HTMLElement) =>
      container.querySelector(".flight-hint [aria-hidden='true']")?.textContent?.trim();

    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    let container = goToStep2();
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(container.querySelector(".flight-hint")).not.toBeNull());
    const okMarker = marker(container);
    expect(okMarker).toBeTruthy();
    cleanup();

    vi.mocked(verifyFlightNumber).mockReset().mockResolvedValue({ status: "wrong_airport", arrivalAirport: "IST" });
    container = goToStep2();
    await enterFlight(container, "TK1");
    await waitFor(() => expect(container.querySelector(".flight-hint")).not.toBeNull());
    const warnMarker = marker(container);
    expect(warnMarker).toBeTruthy();
    expect(warnMarker).not.toBe(okMarker);
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

  // Bu ozelligin var olma sebebi tam olarak bu hatayi onlemek. Once dolan saat
  // "musterinin yazdigi saat" gibi korunursa, ikinci ucusun saati alana hic
  // girmez: alanda 14:35 kalir, ustundeki ipucu 09:00 der ve rezervasyon
  // ikisini birden tasir. Soforu yanlis saatte gonderen sey budur.
  test("a second flight number replaces the time the first one filled in", async () => {
    vi.mocked(verifyFlightNumber)
      .mockResolvedValueOnce({ status: "verified", arrivalTime: "14:35" })
      .mockResolvedValueOnce({ status: "verified", arrivalTime: "09:00" });
    const container = goToStep2();
    await enterFlight(container, "TK1");
    await waitFor(() => expect(arrivalField(container).value).toBe("14:35"));
    await enterFlight(container, "TK2");
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(arrivalField(container).value).toBe("09:00"));
  });

  test("clearing the flight number clears the answer that belonged to it", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "wrong_airport", arrivalAirport: "IST" });
    const container = goToStep2();
    await enterFlight(container, "TK1");
    await waitFor(() => expect(container.querySelector(".flight-hint")).toHaveTextContent("IST"));

    const field = container.querySelector<HTMLInputElement>("#flight-number")!;
    fireEvent.change(field, { target: { value: "" } });
    fireEvent.blur(field);
    await waitFor(() => expect(container.querySelector(".flight-hint")).toBeNull());

    // Tekrar sorma kaydi da temizlenmeli: bosaltilip yeniden yazilan ayni
    // numara, artik cevabi olmayan yeni bir soru.
    fireEvent.change(field, { target: { value: "TK1" } });
    fireEvent.blur(field);
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalledTimes(2));
  });

  test("changing the travel date drops the old answer without buying a new one", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "wrong_airport", arrivalAirport: "IST" });
    const container = goToStep2();
    await enterFlight(container, "TK1");
    await waitFor(() => expect(container.querySelector(".flight-hint")).toHaveTextContent("IST"));

    fireEvent.change(container.querySelector("#travel-date")!, {
      target: { value: `${new Date().getFullYear() + 1}-08-11` },
    });
    await waitFor(() => expect(container.querySelector(".flight-hint")).toBeNull());
    // Tarih alaninda her oynama kotadan hak yiyemez; yeni sorgu blur ile gelir.
    expect(verifyFlightNumber).toHaveBeenCalledTimes(1);
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

  // iOS'ta saat alanina dokunmak tekerlek secicisini acar ve seciciden cikinca
  // o anki saat alana yazilir. Saat alani ucus numarasindan once gelirse
  // musteri sirayla doldururken alani kirletir, dogrulanan saat de artik
  // yazilamaz. Bu yuzden sorulma sirasi: once ucus numarasi, sonra saat.
  test("the flight number is asked for before the arrival time", async () => {
    const container = goToStep2();
    await waitFor(() => expect(container.querySelector("#flight-number")).not.toBeNull());
    const flight = container.querySelector("#flight-number")!;
    const time = container.querySelector("#flight-arrival-time")!;
    expect(flight.compareDocumentPosition(time) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  const applyButton = (container: HTMLElement) =>
    container.querySelector<HTMLButtonElement>(".flight-hint button");

  test("an empty field is filled without asking, so no button is offered", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(arrivalField(container).value).toBe("14:35"));
    expect(applyButton(container)).toBeNull();
  });

  // Ipucu "11:00'de iniyor" derken alanda 21:22 yazmasi bir celiskiydi ve
  // musterinin bunu cozecek bir yolu yoktu. Artik var - ama basana kadar
  // onun degerine dokunulmaz.
  test("a time that differs from the verified one can be replaced on request", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await waitFor(() => expect(container.querySelector("#flight-arrival-time")).not.toBeNull());
    fireEvent.change(arrivalField(container), { target: { value: "09:15" } });
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(applyButton(container)).not.toBeNull());

    const button = applyButton(container)!;
    expect(button.tagName).toBe("BUTTON");
    expect(button.type).toBe("button");
    expect(button).toHaveTextContent("14:35");
    // Hicbir sey sessizce yazilmaz: basilana kadar musterinin degeri durur.
    expect(arrivalField(container).value).toBe("09:15");

    fireEvent.click(button);
    await waitFor(() => expect(arrivalField(container).value).toBe("14:35"));
    // Artik alan dogrulanan saati tasiyor; onerilecek bir sey kalmadi.
    await waitFor(() => expect(applyButton(container)).toBeNull());
  });

  // Dugme, ucus numarasi alanini saran <label>'in icinde duruyor. Label'a
  // tiklamak odagi kendi alanina yollar; saati uygulayan musteri kendini ucus
  // numarasi alaninda - mobilde klavye acilmis halde - bulmamali. Bu test
  // sonucu bekliyor (odak kacmasin), yolu degil: jsdom etkilesimli bir torunun
  // tiklamasini label'a hic tasimiyor, yani buradaki preventDefault'un kendisi
  // bu testle KANITLANMIS degil.
  test("pressing the hint does not throw focus into the flight number field", async () => {
    vi.mocked(verifyFlightNumber).mockResolvedValue({ status: "verified", arrivalTime: "14:35" });
    const container = goToStep2();
    await waitFor(() => expect(container.querySelector("#flight-arrival-time")).not.toBeNull());
    fireEvent.change(arrivalField(container), { target: { value: "09:15" } });
    await enterFlight(container, "TK2412");
    await waitFor(() => expect(applyButton(container)).not.toBeNull());

    const flightNumber = container.querySelector<HTMLInputElement>("#flight-number")!;
    flightNumber.blur();
    fireEvent.click(applyButton(container)!);
    await waitFor(() => expect(arrivalField(container).value).toBe("14:35"));
    expect(document.activeElement).not.toBe(flightNumber);
  });

  test("a time applied from the hint is ours, so a new flight number still replaces it", async () => {
    vi.mocked(verifyFlightNumber)
      .mockResolvedValueOnce({ status: "verified", arrivalTime: "14:35" })
      .mockResolvedValueOnce({ status: "verified", arrivalTime: "09:00" });
    const container = goToStep2();
    await waitFor(() => expect(container.querySelector("#flight-arrival-time")).not.toBeNull());
    fireEvent.change(arrivalField(container), { target: { value: "21:22" } });
    await enterFlight(container, "TK1");
    await waitFor(() => expect(applyButton(container)).not.toBeNull());
    fireEvent.click(applyButton(container)!);
    await waitFor(() => expect(arrivalField(container).value).toBe("14:35"));

    await enterFlight(container, "TK2");
    await waitFor(() => expect(verifyFlightNumber).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(arrivalField(container).value).toBe("09:00"));
  });
});

describe("BookingForm Land of Legends day trip", () => {
  test("offers the day trip as a journey type and swaps in its own form", async () => {
    const { container, getByLabelText } = render(
      <LanguageProvider initialLanguage="de" messages={pageMessages("de")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("de")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
      </LanguageProvider>,
    );

    expect(container.querySelector("#lol-hotel")).toBeNull();
    fireEvent.click(getByLabelText("The Land of Legends"));

    expect(container.querySelector("#quote-form")).toHaveClass("is-excursion");
    // The excursion form is loaded on demand.
    await waitFor(() => expect(container.querySelector("#lol-hotel")).toBeInTheDocument());
    expect(container.querySelector(".trip-type-hint a")).toHaveAttribute("href", "/de/land-of-legends/");
    expect(container.querySelector(".booking-steps")).toBeNull();

    fireEvent.click(container.querySelector('input[value="round_trip"]')!);
    expect(container.querySelector("#lol-hotel")).toBeNull();
    expect(container.querySelector("#quote-form")).not.toHaveClass("is-excursion");
  });

  test("speaks the visitor's own language, Polish included", async () => {
    const { getByLabelText, container } = render(
      <LanguageProvider initialLanguage="pl" messages={pageMessages("pl")}>
        <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("pl")}>
          <BookingForm scrollOnSelect={false} />
        </LandOfLegendsBookingCopyProvider>
      </LanguageProvider>,
    );
    fireEvent.click(getByLabelText("The Land of Legends"));
    expect(container.querySelector(".trip-type-hint a")).toHaveAttribute("href", "/pl/land-of-legends/");
    await waitFor(() => expect(container.querySelector(".lol-summary")).toBeInTheDocument());
    expect(container.querySelector(".lol-summary")).not.toHaveTextContent("Price confirmed on WhatsApp");
  });
});
