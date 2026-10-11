// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { LanguageProvider } from "../i18n";
import { LandOfLegendsPage } from "./LandOfLegendsPage";
import type { LandOfLegendsLanguage } from "../lib/land-of-legends-copy";

const createBooking = vi.fn();
vi.mock("../../../src/lib/api.js", () => ({ createBooking: (data: unknown) => createBooking(data) }));
vi.mock("../../../src/lib/supabase.js", () => ({ supabase: null }));

afterEach(cleanup);
beforeEach(() => createBooking.mockReset());

const renderPage = (language: LandOfLegendsLanguage = "en") =>
  render(
    <LanguageProvider initialLanguage={language}>
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

const fillContact = (container: HTMLElement) => {
  fireEvent.change(container.querySelector("#lol-name")!, { target: { value: "Anna Schmidt" } });
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
    fillContact(container);
    fireEvent.submit(container.querySelector(".lol-form")!);
    expect(await findByText(/no later than 23:30/)).toBeInTheDocument();
    expect(createBooking).not.toHaveBeenCalled();
  });

  test("submits a land_of_legends booking with the hotel region and shows the reference", async () => {
    createBooking.mockResolvedValue({ booking_ref: "AVL-2026-ABCD1234", price_eur: 105 });
    const { container, findByText } = renderPage();
    pickHotel(container, "Delphin Imperial Lara");
    fillContact(container);
    fireEvent.submit(container.querySelector(".lol-form")!);

    expect(await findByText("AVL-2026-ABCD1234")).toBeInTheDocument();
    const payload = createBooking.mock.calls[0][0];
    expect(payload).toMatchObject({
      trip_type: "land_of_legends",
      pickup_location: "hotel",
      dropoff_location: "land_of_legends",
      hotel_name: "Delphin Imperial Lara",
      excursion_region: "antalya",
      pickup_time: "09:30",
      return_pickup_time: "22:30",
      vehicle_type: "vito",
      guests: 2,
      payment_method: "cash",
    });
    expect(payload.return_date).toBe(payload.pickup_date);
    expect(container.querySelector(".lol-confirmation")).toHaveTextContent("Your Land of Legends transfer is booked");
  });

  test("still books an unplaced hotel and promises a WhatsApp quote", async () => {
    createBooking.mockResolvedValue({ booking_ref: "AVL-2026-QUOTE001", price_eur: 0 });
    const { container, findByText } = renderPage("tr");
    fireEvent.change(container.querySelector("#lol-hotel")!, { target: { value: "Küçük Pansiyon Kaleiçi" } });
    fillContact(container);
    fireEvent.submit(container.querySelector(".lol-form")!);

    expect(await findByText("AVL-2026-QUOTE001")).toBeInTheDocument();
    await waitFor(() => expect(createBooking.mock.calls[0][0].excursion_region).toBeNull());
    expect(container.querySelector(".lol-confirmation")).toHaveTextContent("WhatsApp'tan onaylayacağız");
  });
});
