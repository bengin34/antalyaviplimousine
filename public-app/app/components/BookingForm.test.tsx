// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { LanguageProvider } from "../i18n";
import { shouldApplyFlightArrival, verifyFlightNumber } from "../lib/flight-verification";
import { BookingForm } from "./BookingForm";

vi.mock("../lib/flight-verification", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../lib/flight-verification")>();
  return {
    ...actual,
    verifyFlightNumber: vi.fn(),
    shouldApplyFlightArrival: vi.fn(actual.shouldApplyFlightArrival),
  };
});

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
  // mockReset on a vi.fn(impl) restores that impl in Vitest 3, so
  // shouldApplyFlightArrival keeps its real logic while losing its call log.
  beforeEach(() => {
    vi.mocked(verifyFlightNumber).mockReset();
    vi.mocked(shouldApplyFlightArrival).mockReset();
  });

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
