// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { LanguageProvider } from "../i18n";
import { pageMessages } from "../lib/page-data.server";
import { LandOfLegendsPage } from "./LandOfLegendsPage";
import type { LandOfLegendsLanguage } from "../lib/land-of-legends-copy";

const createBooking = vi.fn();
vi.mock("../../../src/lib/api.js", () => ({ createBooking: (data: unknown) => createBooking(data) }));
// No Supabase in tests: live rates resolve empty and the built-in tariff applies.
vi.mock("../../../src/lib/supabase-rest", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../../src/lib/supabase-rest")>()),
  supabaseConfig: () => null,
}));

afterEach(cleanup);
beforeEach(() => createBooking.mockReset());

const renderPage = (language: LandOfLegendsLanguage = "en") =>
  render(
    <LanguageProvider initialLanguage={language} messages={pageMessages(language)}>
      <LandOfLegendsPage language={language} />
    </LanguageProvider>,
  );

const pickHotel = (container: HTMLElement, name: string) => {
  const input = container.querySelector<HTMLInputElement>("#lol-hotel")!;
  fireEvent.change(input, { target: { value: name } });
  const option = [...container.querySelectorAll('[role="option"]')].find((node) => node.textContent?.includes(name));
  if (!option) throw new Error(`No suggestion for ${name}`);
  fireEvent.click(option);
};

const fillContact = async (container: HTMLElement) => {
  fireEvent.change(container.querySelector("#lol-name")!, { target: { value: "Anna Schmidt" } });
  // The phone input library is loaded on demand.
  await waitFor(() => expect(container.querySelector("#lol-phone")).not.toBeNull());
  fireEvent.change(container.querySelector("#lol-phone")!, { target: { value: "+49 151 23456789" } });
  fireEvent.change(container.querySelector("#lol-email")!, { target: { value: "anna@example.com" } });
};

describe("LandOfLegendsPage", () => {
  test("publishes the fixed price table per hotel area", () => {
    const { container } = renderPage();
    const rows = [...container.querySelectorAll(".lol-table tbody tr")];
    const antalya = rows.find((row) => row.querySelector("th")?.textContent === "Antalya City")!;
    expect(within(antalya as HTMLElement).getByText("€105")).toBeInTheDocument();
    expect(within(antalya as HTMLElement).getByText("€145")).toBeInTheDocument();
    expect(container.querySelector(".lol-table")).toHaveTextContent("On request");
  });

  test("quotes the hotel's region once the guest picks their hotel", () => {
    const { container } = renderPage();
    expect(container.querySelector(".lol-summary strong")).toHaveTextContent("Price confirmed on WhatsApp");

    pickHotel(container, "Barut Acanthus & Cennet");
    expect(container.querySelector(".lol-summary strong")).toHaveTextContent("€115");
    expect(container.querySelector("#lol-hotel-status")).toHaveTextContent("priced as Side");

    fireEvent.change(container.querySelector("#lol-vehicle")!, { target: { value: "sprinter" } });
    expect(container.querySelector(".lol-summary strong")).toHaveTextContent("€160");
  });

  test("drops the quote when the guest edits the picked hotel name", () => {
    const { container } = renderPage();
    pickHotel(container, "Delphin Imperial Lara");
    expect(container.querySelector(".lol-summary strong")).toHaveTextContent("€105");
    fireEvent.change(container.querySelector("#lol-hotel")!, { target: { value: "Delphin Imperial Lara 2" } });
    expect(container.querySelector(".lol-summary strong")).toHaveTextContent("Price confirmed on WhatsApp");
  });

  test("moves a party that does not fit a Vito to the Sprinter", () => {
    const { container } = renderPage();
    fireEvent.change(container.querySelector("#lol-guests")!, { target: { value: "8" } });
    expect(container.querySelector<HTMLSelectElement>("#lol-vehicle")!.value).toBe("sprinter");
  });

  test("rejects a park pick-up past 23:30", async () => {
    const { container, findByText } = renderPage();
    pickHotel(container, "Delphin Imperial Lara");
    fireEvent.change(container.querySelector("#lol-return")!, { target: { value: "23:45" } });
    await fillContact(container);
    fireEvent.submit(container.querySelector(".lol-form")!);
    expect(await findByText(/no later than 23:30/)).toBeInTheDocument();
    expect(createBooking).not.toHaveBeenCalled();
  });

  test("submits a land_of_legends booking with the hotel region and shows the reference", async () => {
    createBooking.mockResolvedValue({ booking_ref: "AVL-2026-ABCD1234", price_eur: 105 });
    const { container, findByText } = renderPage();
    pickHotel(container, "Delphin Imperial Lara");
    await fillContact(container);
    fireEvent.submit(container.querySelector(".lol-form")!);

    expect(await findByText("AVL-2026-ABCD1234")).toBeInTheDocument();
    const payload = createBooking.mock.calls[0][0];
    expect(payload).toMatchObject({
      trip_type: "land_of_legends",
      pickup_location: "hotel",
      dropoff_location: "land_of_legends",
      hotel_name: "Delphin Imperial Lara",
      excursion_region: "antalya",
      pickup_time: "08:45", // suggested from the ~54 min drive from Antalya
      return_pickup_time: "22:30",
      vehicle_type: "vito",
      guests: 2,
      payment_method: "cash",
    });
    expect(payload.return_date).toBe(payload.pickup_date);
    expect(container.querySelector(".lol-confirmation")).toHaveTextContent("Your Land of Legends transfer is booked");
    expect(container.querySelector(".lol-summary-list")).toHaveTextContent("€105");
    expect(container.querySelector(".lol-summary-list")).toHaveTextContent("Main entrance car park");
    expect(container.querySelector(".lol-confirmation")).toHaveTextContent("Park tickets not included");
    expect(document.activeElement?.tagName).toBe("H3");
  });

  test("still books an unplaced hotel and promises a WhatsApp quote", async () => {
    createBooking.mockResolvedValue({ booking_ref: "AVL-2026-QUOTE001", price_eur: 0 });
    const { container, findByText } = renderPage("tr");
    fireEvent.change(container.querySelector("#lol-hotel")!, { target: { value: "Küçük Pansiyon Kaleiçi" } });
    await fillContact(container);
    fireEvent.submit(container.querySelector(".lol-form")!);

    expect(await findByText("AVL-2026-QUOTE001")).toBeInTheDocument();
    await waitFor(() => expect(createBooking.mock.calls[0][0].excursion_region).toBeNull());
    expect(container.querySelector(".lol-confirmation")).toHaveTextContent("WhatsApp'tan onaylayacağız");
  });

  test("prices a hotel typed in full without tapping a suggestion", () => {
    const { container } = renderPage();
    fireEvent.change(container.querySelector("#lol-hotel")!, { target: { value: "barut acanthus & cennet" } });
    expect(container.querySelector(".lol-summary strong")).toHaveTextContent("€115");
  });

  test("suggests an earlier pick-up for a far-away hotel and shows the drive time", () => {
    const { container } = renderPage();
    pickHotel(container, "Barut Acanthus & Cennet");
    expect(container.querySelector<HTMLInputElement>("#lol-departure")!.value).toBe("08:45");
    expect(container.querySelector("#lol-departure")!.closest("label")).toHaveTextContent("About 60 min drive from Side");
  });

  test("keeps a pick-up time the guest set themselves", () => {
    const { container } = renderPage();
    fireEvent.change(container.querySelector("#lol-departure")!, { target: { value: "11:00" } });
    pickHotel(container, "Barut Acanthus & Cennet");
    expect(container.querySelector<HTMLInputElement>("#lol-departure")!.value).toBe("11:00");
  });

  test("an area without a fixed rate says so instead of claiming the hotel is unknown", () => {
    const { container } = renderPage();
    pickHotel(container, "Dantel Pansiyon");
    expect(container.querySelector("#lol-hotel-status")).toHaveTextContent("priced on request");
    expect(container.querySelector(".lol-summary strong")).toHaveTextContent("Price confirmed on WhatsApp");
  });

  test("goes back to the Vito when the group shrinks again, and says why it upgraded", () => {
    const { container } = renderPage();
    fireEvent.change(container.querySelector("#lol-guests")!, { target: { value: "8" } });
    expect(container.querySelector("#lol-vehicle")!.closest("label")).toHaveTextContent("We selected the Sprinter for 8 guests.");
    fireEvent.change(container.querySelector("#lol-guests")!, { target: { value: "4" } });
    expect(container.querySelector<HTMLSelectElement>("#lol-vehicle")!.value).toBe("vito");
  });

  // The form used to carry a line telling groups of 13+ to use WhatsApp. It is
  // gone, so the guest learns the vehicle rule only by the field acting on it:
  // the Vito carries six, and the seventh guest has to move the booking up.
  test("upgrades on the seventh guest and stops offering the Vito", () => {
    const { container } = renderPage();
    const guests = container.querySelector("#lol-guests")!;
    const vehicle = () => container.querySelector<HTMLSelectElement>("#lol-vehicle")!;
    const vitoOption = () => container.querySelector<HTMLOptionElement>('#lol-vehicle option[value="vito"]')!;

    fireEvent.change(guests, { target: { value: "6" } });
    expect(vehicle().value).toBe("vito");
    expect(vitoOption().disabled).toBe(false);

    fireEvent.change(guests, { target: { value: "7" } });
    expect(vehicle().value).toBe("sprinter");
    expect(vitoOption().disabled).toBe(true);
  });

  test("names tickets and the meeting point before the guest books", () => {
    const { container } = renderPage("de");
    expect(container.querySelector(".lol-summary")).toHaveTextContent("Parktickets nicht enthalten");
    expect(container.querySelector(".lol-summary")).toHaveTextContent("Parkplatz am Haupteingang");
  });

});
