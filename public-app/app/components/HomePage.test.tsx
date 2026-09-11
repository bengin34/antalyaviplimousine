// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { LanguageProvider } from "../i18n";
import { HomePage } from "./HomePage";

/**
 * jsdom lays nothing out, so Embla would measure every slide as zero-wide and
 * collapse the rail to a single snap point. Feeding it a synthetic geometry —
 * an 800px viewport over 340px cards — is what lets the drag/snap behaviour be
 * asserted at all.
 */
const VIEWPORT_WIDTH = 800;
const ROUTE_CARD_WIDTH = 340;

function stubLayout() {
  // Embla derives snap points from each slide's left offset relative to the
  // track, so the stub has to lay the slides out in a row, not just size them.
  const geometry = (element: HTMLElement) => {
    const slideWidth = element.classList.contains("route-card")
      ? ROUTE_CARD_WIDTH
      : element.classList.contains("fleet-carousel-slide")
        ? VIEWPORT_WIDTH
        : 0;
    if (slideWidth && element.parentElement) {
      const index = Array.prototype.indexOf.call(
        element.parentElement.children,
        element,
      );
      return { left: index * slideWidth, width: slideWidth };
    }
    // The flex track is as wide as its viewport in a real browser — the slides
    // are what overflow it — and Embla derives the view size from it.
    return { left: 0, width: VIEWPORT_WIDTH };
  };
  // Embla reads offsetLeft/offsetWidth, which jsdom always reports as 0.
  Object.defineProperty(HTMLElement.prototype, "offsetLeft", {
    configurable: true,
    get(this: HTMLElement) {
      return geometry(this).left;
    },
  });
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    get(this: HTMLElement) {
      return geometry(this).width;
    },
  });
  Object.defineProperty(HTMLElement.prototype, "offsetTop", {
    configurable: true,
    get: () => 0,
  });
  Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
    configurable: true,
    get: () => 400,
  });
}

beforeAll(() => {
  if (typeof window.matchMedia !== "function") {
    // Embla resolves its breakpoint options through matchMedia, which jsdom
    // does not implement; nothing here uses breakpoints, so "no match" is right.
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  }
  // Embla watches the viewport for resizes and the slides for visibility;
  // jsdom ships neither observer.
  class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  if (!("ResizeObserver" in globalThis)) {
    globalThis.ResizeObserver = NoopObserver as unknown as typeof ResizeObserver;
  }
  if (!("IntersectionObserver" in globalThis)) {
    globalThis.IntersectionObserver =
      NoopObserver as unknown as typeof IntersectionObserver;
  }
  stubLayout();
});

afterEach(cleanup);

const renderHome = () =>
  render(
    <LanguageProvider initialLanguage="en">
      <HomePage initialLanguage="en" />
    </LanguageProvider>,
  );

describe("fleet photo carousel", () => {
  test("renders every photo as its own slide with a position label", () => {
    renderHome();

    const carousel = screen.getByRole("group", { name: "Our vehicle photos" });
    const slides = within(carousel).getAllByRole("group", {
      name: /^\d+ of \d+$/,
    });

    expect(slides.length).toBeGreaterThan(1);
    slides.forEach((slide, index) => {
      expect(slide).toHaveAttribute("aria-roledescription", "slide");
      expect(slide).toHaveAccessibleName(`${index + 1} of ${slides.length}`);
    });
  });

  test("dots mark the selected photo and moving on selects the next one", () => {
    renderHome();

    const dots = screen
      .getByRole("group", { name: "Vehicle photo selection" })
      .querySelectorAll<HTMLButtonElement>(".fleet-carousel-dot");

    expect(dots[0]).toHaveAttribute("aria-current", "true");

    fireEvent.click(screen.getByRole("button", { name: "Next vehicle photo" }));

    expect(dots[0]).toHaveAttribute("aria-current", "false");
    expect(dots[1]).toHaveAttribute("aria-current", "true");
  });

  test("a dot jumps straight to its photo", () => {
    renderHome();

    const dots = screen
      .getByRole("group", { name: "Vehicle photo selection" })
      .querySelectorAll<HTMLButtonElement>(".fleet-carousel-dot");

    fireEvent.click(dots[3]);

    expect(dots[3]).toHaveAttribute("aria-current", "true");
  });

  test("loops backwards from the first photo instead of dead-ending", () => {
    renderHome();

    const dots = screen
      .getByRole("group", { name: "Vehicle photo selection" })
      .querySelectorAll<HTMLButtonElement>(".fleet-carousel-dot");

    fireEvent.click(screen.getByRole("button", { name: "Previous vehicle photo" }));

    expect(dots[dots.length - 1]).toHaveAttribute("aria-current", "true");
  });

  test("announces the current photo through a live region", () => {
    renderHome();

    const carousel = screen.getByRole("group", { name: "Our vehicle photos" });
    const live = carousel.querySelector(
      "[aria-live='polite'][aria-atomic='true']",
    );
    expect(live).toHaveTextContent(/photo 1 of \d+$/);

    fireEvent.click(screen.getByRole("button", { name: "Next vehicle photo" }));
    expect(live).toHaveTextContent(/photo 2 of \d+$/);
  });

  test("only the neighbouring photos are in the DOM", () => {
    const { container } = renderHome();

    const slides = container.querySelectorAll(".fleet-carousel-slide");
    const loaded = container.querySelectorAll(".fleet-carousel-slide img");

    expect(slides.length).toBeGreaterThan(loaded.length);
    // Selected slide plus one neighbour on each side of the looping rail.
    expect(loaded.length).toBe(3);
  });
});

describe("route slider", () => {
  const routeButtons = () => ({
    prev: screen.getByRole("button", { name: "Previous routes" }),
    next: screen.getByRole("button", { name: "Next routes" }),
  });

  test("starts parked at the first route with the back control disabled", () => {
    renderHome();

    const { prev, next } = routeButtons();
    expect(prev).toBeDisabled();
    expect(next).toBeEnabled();
  });

  test("advancing and returning flips the edge controls back", () => {
    renderHome();

    fireEvent.click(routeButtons().next);
    expect(routeButtons().prev).toBeEnabled();

    fireEvent.click(routeButtons().prev);
    expect(routeButtons().prev).toBeDisabled();
    expect(routeButtons().next).toBeEnabled();
  });

  test("the rail answers arrow keys so its tab stop is operable", () => {
    renderHome();

    const rail = screen.getByRole("group", {
      name: "Antalya Airport transfer routes",
    });
    expect(rail).toHaveAttribute("tabindex", "0");

    fireEvent.keyDown(rail, { key: "ArrowRight" });
    expect(routeButtons().prev).toBeEnabled();

    fireEvent.keyDown(rail, { key: "Home" });
    expect(routeButtons().prev).toBeDisabled();

    fireEvent.keyDown(rail, { key: "End" });
    expect(routeButtons().next).toBeDisabled();
  });

  test("every catalogue route is still a card inside the rail", () => {
    const { container } = renderHome();

    const rail = screen.getByRole("group", {
      name: "Antalya Airport transfer routes",
    });
    const cards = rail.querySelectorAll(".route-card");

    expect(cards.length).toBe(container.querySelectorAll(".route-card").length);
    expect(cards.length).toBeGreaterThanOrEqual(14);
    expect(rail.querySelector(".route-slider")).not.toBeNull();
  });
});
