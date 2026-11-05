import { describe, expect, it } from "vitest";
import { cop31Languages as publishedLanguages, cop31Paths } from "../../../src/public-paths.js";
import { buildCop31Payload, cop31Quote, createCop31Schema, daysToCop31, type Cop31Values } from "./cop31";
import { cop31Copy, cop31Languages, cop31Path } from "./cop31-copy";
import { cop31DialogCopy } from "./cop31-dialog-copy";
import { shouldShowCop31Dialog } from "./cop31-paths";

const valid: Cop31Values = {
  vehicle: "vito",
  startDate: "2026-11-09",
  endDate: "2026-11-13",
  startTime: "08:00",
  hotelName: "Rixos Downtown Antalya",
  guests: "3",
  customerName: "Ana Silva",
  customerPhone: "+49 151 23456789",
  customerEmail: "ana@example.org",
  notes: "",
};
const noAttribution = { utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, utm_content: null, gclid: null, landing_page: null, referrer: null };
const schema = createCop31Schema(cop31Copy.en.errors);
const issuesFor = (values: Partial<Cop31Values>) =>
  (schema.safeParse({ ...valid, ...values }).error?.issues ?? []).map((issue) => issue.path.join("."));

describe("COP31 quote", () => {
  it("multiplies the package day rate by the inclusive day count", () => {
    expect(cop31Quote("vito", "2026-11-09", "2026-11-13")).toEqual({ days: 5, price: 1000 });
    expect(cop31Quote("sprinter", "2026-11-09", "2026-11-09")).toEqual({ days: 1, price: 250 });
  });

  it("quotes nothing outside the package window", () => {
    expect(cop31Quote("vito", "2026-11-05", "2026-11-09").price).toBe(0);
    expect(cop31Quote("vito", "2026-11-12", "2026-11-10").price).toBe(0);
  });
});

describe("COP31 form schema", () => {
  it("accepts a complete booking", () => {
    expect(issuesFor({})).toEqual([]);
  });

  it("keeps the hire inside 7–22 November", () => {
    expect(issuesFor({ startDate: "2026-11-06" })).toContain("startDate");
    expect(issuesFor({ endDate: "2026-11-23" })).toContain("endDate");
    expect(issuesFor({ endDate: "2026-11-08" })).toContain("endDate");
  });

  it("caps passengers by vehicle", () => {
    expect(issuesFor({ guests: "7" })).toContain("guests");
    expect(issuesFor({ guests: "7", vehicle: "sprinter" })).toEqual([]);
    expect(issuesFor({ guests: "16", vehicle: "sprinter" })).toEqual([]);
    expect(issuesFor({ guests: "17", vehicle: "sprinter" })).toContain("guests");
  });

  it("needs a hotel, a start time and reachable contact details", () => {
    expect(issuesFor({ hotelName: " " })).toContain("hotelName");
    expect(issuesFor({ startTime: "" })).toContain("startTime");
    expect(issuesFor({ customerPhone: "0151 23456789" })).toContain("customerPhone");
    expect(issuesFor({ customerEmail: "ana@" })).toContain("customerEmail");
  });
});

describe("COP31 booking payload", () => {
  it("sends a daily chauffeur hire flagged as the COP31 package, without fuel terms", () => {
    const payload = buildCop31Payload({ ...valid, vehicle: "sprinter", customerEmail: " Ana@Example.org " }, "de", noAttribution);
    expect(payload).toMatchObject({
      trip_type: "daily_chauffeur",
      service_package: "cop31",
      pickup_location: "hotel",
      pickup_date: "2026-11-09",
      service_end_date: "2026-11-13",
      pickup_time: "08:00",
      vehicle_type: "vclass",
      guests: 3,
      customer_email: "ana@example.org",
      payment_method: "cash",
      language: "de",
    });
    expect(payload).not.toHaveProperty("fuel_terms_accepted");
  });
});

describe("COP31 opening dialog", () => {
  it("shows on other pages until the summit ends, once per visitor", () => {
    expect(shouldShowCop31Dialog("/", "2026-11-05", false)).toBe(true);
    expect(shouldShowCop31Dialog("/de/transfers/belek/", "2026-11-20", false)).toBe(true);
    expect(shouldShowCop31Dialog("/", "2026-11-21", false)).toBe(false);
    expect(shouldShowCop31Dialog("/", "2026-11-05", true)).toBe(false);
  });

  it("never covers the COP31 page or the clinic page", () => {
    expect(shouldShowCop31Dialog("/cop31/", "2026-11-05", false)).toBe(false);
    expect(shouldShowCop31Dialog("/tr/cop31/", "2026-11-05", false)).toBe(false);
    expect(shouldShowCop31Dialog("/clinic/", "2026-11-05", false)).toBe(false);
  });

  it("has copy for every page language", () => {
    expect(Object.keys(cop31DialogCopy).sort()).toEqual([...cop31Languages].sort());
  });
});

describe("COP31 page wiring", () => {
  it("prerenders exactly the languages that have copy", () => {
    expect([...publishedLanguages]).toEqual([...cop31Languages]);
    expect([...cop31Paths]).toEqual(cop31Languages.map(cop31Path));
    expect(Object.keys(cop31Copy).sort()).toEqual([...cop31Languages].sort());
  });

  it("counts whole days to the opening and stops at zero", () => {
    expect(daysToCop31(Date.parse("2026-11-05T09:00:00+03:00"))).toBe(4);
    expect(daysToCop31(Date.parse("2026-11-12T09:00:00+03:00"))).toBe(0);
  });
});
