// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { Cop31Form } from "./Cop31Form";

// The default period follows today's date; pin it before the summit so the totals below hold.
beforeEach(() => { vi.useFakeTimers({ toFake: ["Date"] }); vi.setSystemTime(new Date("2026-11-05T09:00:00Z")); });
afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("Cop31Form", () => {
  test("sells Vito and Sprinter 'from' prices plus the three Ultra Lux vehicles", () => {
    const { container } = render(<Cop31Form language="en" />);
    expect(container).toHaveTextContent("from €300");
    expect(container).toHaveTextContent("from €400");
    expect(container.querySelectorAll(".ultra-lux-card")).toHaveLength(3);
    expect(container).toHaveTextContent("from €1750");
    expect(container).toHaveTextContent("Vehicle availability is confirmed after you book.");
    expect(container.querySelector('input[type="checkbox"]')).toBeNull();
  });

  test("selecting a lux vehicle prices it and asks for the fuel terms", () => {
    const { container } = render(<Cop31Form language="en" />);
    fireEvent.click(screen.getByRole("button", { name: /Maybach/ }));
    expect(screen.getByRole("button", { name: /Maybach/ })).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector('input[type="checkbox"]')).not.toBeNull();
    // default period 9–13 Nov = 5 days × 1750
    expect(container.querySelector(".cop-total strong")).toHaveTextContent("from €8750");
    expect(container).toHaveTextContent("Fuel is not included");
  });
});
