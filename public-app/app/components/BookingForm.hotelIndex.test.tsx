// @vitest-environment jsdom

/**
 * The hotel index is 1246 hotels and their airport distances, and it used to
 * sit in the chunk every landing page preloads. It is now fetched when the
 * guest reaches the hotel field, so this file renders the form the way a
 * visitor gets it — index not loaded — and holds that path to its promises:
 * the field still takes input, it never claims an unknown hotel while the
 * index is on its way, and the suggestions appear once it is here.
 *
 * It deliberately does not preload, so it has to be its own file: the loader
 * caches the index per module registry, and the other form suites warm it.
 */

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { LanguageProvider } from "../i18n";
import { LandOfLegendsBookingCopyProvider } from "../lib/land-of-legends-booking-copy";
import { landOfLegendsBookingCopy, pageMessages } from "../lib/page-data.server";
import { loadedHotelData } from "../lib/hotel-data";
import { BookingForm } from "./BookingForm";

afterEach(cleanup);

const renderForm = () =>
  render(
    <LanguageProvider initialLanguage="en" messages={pageMessages("en")}>
      <LandOfLegendsBookingCopyProvider copy={landOfLegendsBookingCopy("en")}>
        <BookingForm scrollOnSelect={false} />
      </LandOfLegendsBookingCopyProvider>
    </LanguageProvider>,
  );

describe("the hotel field before its index has loaded", () => {
  test("renders the booking form without the index", () => {
    expect(loadedHotelData()).toBeNull();

    const { container } = renderForm();

    expect(container.querySelector("#hotel-name")).toBeInTheDocument();
  });

  test("takes what the guest types and offers nothing yet, without calling the hotel unknown", () => {
    const { container } = renderForm();
    const field = container.querySelector<HTMLInputElement>("#hotel-name")!;

    fireEvent.change(field, { target: { value: "rixos belek" } });

    expect(field.value).toBe("rixos belek");
    expect(container.querySelectorAll('[role="option"]')).toHaveLength(0);
    expect(container.querySelector(".hotel-combobox-empty")).not.toBeInTheDocument();
    expect(field).toHaveAttribute("aria-busy", "true");
  });

  test("suggests hotels as soon as the index arrives, and the guest can pick one", async () => {
    const { container } = renderForm();
    const field = container.querySelector<HTMLInputElement>("#hotel-name")!;

    fireEvent.change(field, { target: { value: "rixos belek" } });
    const option = await waitFor(() => {
      const first = container.querySelector('[role="option"]');
      if (!first) throw new Error("no suggestion yet");
      return first;
    });

    expect(option).toHaveTextContent("Rixos Premium Belek");
    expect(field).not.toHaveAttribute("aria-busy");

    fireEvent.click(option);

    expect(field.value).toBe("Rixos Premium Belek");
    expect(container.querySelector<HTMLSelectElement>("#destination")!.value).toBe("belek");
    expect(container.querySelector(".price-display-amount")).toHaveTextContent("€43");
  });
});
