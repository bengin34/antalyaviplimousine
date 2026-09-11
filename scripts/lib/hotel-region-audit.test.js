import { describe, expect, test } from "vitest";
import { routeCatalog } from "../../src/routes.js";
import {
  classifyAuditRow,
  euroDelta,
  isConclusiveTerm,
  kmRangesFromCompleted,
  kmRegionFor,
  regionsInIlce,
  buildAuditReport,
  renderAuditTable,
} from "./hotel-region-audit.mjs";

const components = (...texts) => texts.map((longText) => ({ longText, shortText: longText }));
const place = (overrides = {}) => ({
  id: "ChIJ5Y7F-AxkwxQRR9PP9OvOW8c",
  displayName: { text: "Kirman Belazur Resort & Spa" },
  businessStatus: "OPERATIONAL",
  primaryType: "resort_hotel",
  addressComponents: components("Boğazkent", "Serik", "Antalya"),
  ...overrides,
});
// Pre-fix state of the motivating row: indexed under Belek, address says Boğazkent.
const belazur = {
  slug: "kirman-belazur-resort-spa", name: "Kirman Belazur Resort & Spa",
  region: "belek", regionSource: "district", aliases: [],
};

describe("classifyAuditRow", () => {
  test("fix: identity verified and address region differs (Belazur regression)", () => {
    expect(classifyAuditRow(belazur, { place: place() }, routeCatalog)).toEqual({
      slug: "kirman-belazur-resort-spa", name: "Kirman Belazur Resort & Spa",
      regionSource: "district", indexRegion: "belek", derivedRegion: "bogazkent",
      matchedTerm: "bogazkent", identityVerified: true, identityStrength: "strict", bucket: "fix",
      euroDelta: 5, priceEquivalent: false, identityNotes: [],
    });
  });

  test("ok: identity verified and regions agree", () => {
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: place() }, routeCatalog);
    expect(row.bucket).toBe("ok");
    expect(row.euroDelta).toBe(0);
  });

  test("ok: price-equivalent regions (manavgat address resolves to side)", () => {
    const hotel = { slug: "x", name: "X", region: "manavgat", regionSource: "district", aliases: [] };
    const row = classifyAuditRow(hotel, { place: place({ displayName: { text: "X Hotel" }, addressComponents: components("Manavgat") }) }, routeCatalog);
    expect(row).toMatchObject({ bucket: "ok", derivedRegion: "side", priceEquivalent: true, euroDelta: 0 });
  });

  test("unresolved: identity verified but no known locality", () => {
    const row = classifyAuditRow(belazur, { place: place({ addressComponents: components("Nowhere", "Antalya") }) }, routeCatalog);
    expect(row).toMatchObject({ bucket: "unresolved", derivedRegion: null, matchedTerm: null, identityVerified: true });
  });

  test("identity: display name does not match", () => {
    const row = classifyAuditRow(belazur, { place: place({ displayName: { text: "Some Other Resort" } }) }, routeCatalog);
    expect(row).toMatchObject({ bucket: "identity", identityVerified: false, identityReason: "name" });
  });

  test("identity: aliases are accepted", () => {
    const row = classifyAuditRow({ ...belazur, aliases: ["Some Other"] }, { place: place({ displayName: { text: "Some Other Resort" } }) }, routeCatalog);
    expect(row.bucket).toBe("fix");
  });

  test("loose name match: ok when the address agrees with the index", () => {
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: place({ displayName: { text: "Belazur Kirman Premium" } }) }, routeCatalog);
    expect(row).toMatchObject({ bucket: "ok", identityStrength: "loose", identityVerified: true });
  });

  test("loose name match: a region disagreement is residue, never an automatic fix", () => {
    const orangeCounty = { slug: "orange-county-alanya", name: "Orange County Alanya", region: "alanya_bati", regionSource: "district", aliases: [] };
    const row = classifyAuditRow(orangeCounty, { place: place({ displayName: { text: "Orange County Resort Hotel" }, addressComponents: components("Çamyuva", "Kemer", "Antalya") }) }, routeCatalog);
    expect(row).toMatchObject({ bucket: "identity", identityReason: "loose-name-region-conflict", derivedRegion: "kemer", euroDelta: 15 });
  });

  // Reversed deliberately: how Google files a place says nothing about where it
  // is, so an unusual type is a note on the row, not grounds to reject it.
  test("a non-lodging type is recorded, not rejected", () => {
    const row = classifyAuditRow(belazur, { place: place({ primaryType: "restaurant" }) }, routeCatalog);
    expect(row.identityReason).toBeUndefined();
    expect(row).toMatchObject({ identityStrength: "strict", identityNotes: ["type"], derivedRegion: "bogazkent" });
  });

  test("gone: closed permanently or not found", () => {
    expect(classifyAuditRow(belazur, { place: place({ businessStatus: "CLOSED_PERMANENTLY" }) }, routeCatalog).bucket).toBe("gone");
    expect(classifyAuditRow(belazur, { notFound: true }, routeCatalog)).toMatchObject({ bucket: "gone", identityVerified: false });
  });

  test("never leaks Places text into the row", () => {
    const row = classifyAuditRow(belazur, { place: place() }, routeCatalog);
    const json = JSON.stringify(row);
    expect(json).not.toMatch(/Serik|displayName|formattedAddress|addressComponents|businessStatus/);
  });
});

describe("euroDelta", () => {
  test("is the absolute per-vehicle Vito difference between two regions", () => {
    expect(euroDelta("belek", "bogazkent", routeCatalog)).toBe(5);
    expect(euroDelta("kemer", "tekirova", routeCatalog)).toBe(20);
    expect(euroDelta("side", null, routeCatalog)).toBe(0);
  });

  test("side and manavgat are price-equivalent in the catalog (the ok rule depends on it)", () => {
    expect(routeCatalog.side.prices).toEqual(routeCatalog.manavgat.prices);
  });
});

describe("buildAuditReport", () => {
  const rows = [
    { slug: "a", bucket: "fix", euroDelta: 5 },
    { slug: "b", bucket: "fix", euroDelta: 20 },
    { slug: "c", bucket: "ok", euroDelta: 0 },
    { slug: "d", bucket: "identity", euroDelta: 0 },
  ];

  test("counts buckets and orders rows by money at risk, fixes first", () => {
    const report = buildAuditReport(rows, { generatedAt: "2026-09-10T00:00:00.000Z", indexed: 4 });
    expect(report.counts).toEqual({ ok: 1, fix: 2, unresolved: 0, identity: 1, gone: 0 });
    expect(report.rows.map((row) => row.slug)).toEqual(["b", "a", "d", "c"]);
    expect(report.audited).toBe(4);
    expect(report.indexed).toBe(4);
  });

  test("renders a markdown table with the same order", () => {
    const table = renderAuditTable(buildAuditReport(rows, { generatedAt: "x", indexed: 4 }));
    expect(table.indexOf("| b |")).toBeLessThan(table.indexOf("| a |"));
    expect(table).toContain("| slug |");
  });
});

describe("renderAuditTable header", () => {
  test("shows remaining and failed counts so an operator sees an incomplete run", () => {
    const report = { ...buildAuditReport([], { generatedAt: "x", indexed: 3 }), remaining: 2, failures: { a: "Places API 500" } };
    expect(renderAuditTable(report)).toContain("2 not yet audited, 1 failed fetches.");
  });
});

describe("isConclusiveTerm", () => {
  test("a belde term decides a price", () => {
    expect(isConclusiveTerm({ region: "side", term: "kumkoy" }, routeCatalog)).toBe(true);
  });

  test("Manavgat cannot: it holds Side €50 and Kızılağaç €70", () => {
    expect(isConclusiveTerm({ region: "side", term: "manavgat" }, routeCatalog)).toBe(false);
  });

  test("Kemer cannot: it holds Kemer €55 and Tekirova €75", () => {
    expect(isConclusiveTerm({ region: "kemer", term: "kemer" }, routeCatalog)).toBe(false);
  });

  test("an ilçe holding one price region can, so Kaş and Kumluca keep their evidence", () => {
    expect(isConclusiveTerm({ region: "kas", term: "kas" }, routeCatalog)).toBe(true);
    expect(isConclusiveTerm({ region: "kumluca", term: "kumluca" }, routeCatalog)).toBe(true);
  });

  test("a region with no ilçe gate is conclusive", () => {
    expect(isConclusiveTerm({ region: "antalya", term: "lara" }, routeCatalog)).toBe(true);
  });

  test("conclusiveness follows the prices, not a hand-written list", () => {
    // The demotion path is the samePrices loop. Exercise it by pricing
    // Manavgat's two regions the same: the term that cannot decide today
    // becomes able to, because there is no longer a price to decide between.
    const flat = { ...routeCatalog, kizilagac: { ...routeCatalog.kizilagac, prices: { ...routeCatalog.side.prices } } };
    expect(isConclusiveTerm({ region: "side", term: "manavgat" }, routeCatalog)).toBe(false);
    expect(isConclusiveTerm({ region: "side", term: "manavgat" }, flat)).toBe(true);
  });
});

describe("identity judged on the name", () => {
  const bogazkent = { ...belazur, region: "bogazkent" };

  test("an unusual place type no longer blocks verification", () => {
    const row = classifyAuditRow(bogazkent, { place: place({ primaryType: "restaurant" }) }, routeCatalog);
    expect(row.identityStrength).toBe("strict");
    expect(row.identityNotes).toEqual(["type"]);
    expect(row.identityReason).toBeUndefined();
  });

  test("a temporarily closed listing no longer blocks verification", () => {
    const row = classifyAuditRow(bogazkent, { place: place({ businessStatus: "CLOSED_TEMPORARILY" }) }, routeCatalog);
    expect(row.identityStrength).toBe("strict");
    expect(row.identityNotes).toEqual(["status"]);
  });

  test("a different business still fails on the name", () => {
    const row = classifyAuditRow(bogazkent, { place: place({ displayName: { text: "Bim Market" } }) }, routeCatalog);
    expect(row.bucket).toBe("identity");
    expect(row.identityReason).toBe("name");
  });

  test("permanently closed still reaches gone without consulting identity", () => {
    const row = classifyAuditRow(bogazkent, { place: place({ businessStatus: "CLOSED_PERMANENTLY" }) }, routeCatalog);
    expect(row.bucket).toBe("gone");
  });
});

describe("km ranges", () => {
  const completed = {
    a: { slug: "a", addressRegion: "kemer", locationRegion: "kemer" },
    b: { slug: "b", addressRegion: "kemer", locationRegion: null },
    c: { slug: "c", addressRegion: "tekirova", locationRegion: "tekirova" },
    d: { slug: "d", addressRegion: "tekirova", locationRegion: "tekirova" },
    weak: { slug: "weak", addressRegion: null, locationRegion: "kemer" },
    conflicted: { slug: "conflicted", addressRegion: "kemer", locationRegion: "tekirova" },
  };
  const distances = {
    a: { km: 44 }, b: { km: 68 }, c: { km: 75 }, d: { km: 78 },
    weak: { km: 5 }, conflicted: { km: 200 },
  };
  const kemerIlce = ["kemer", "tekirova"];

  test("only conclusive, uncontradicted rows set a range", () => {
    expect(kmRangesFromCompleted(completed, distances)).toEqual({
      kemer: { min: 44, max: 68 },
      tekirova: { min: 75, max: 78 },
    });
  });

  test("a km inside exactly one candidate's range names it", () => {
    const ranges = kmRangesFromCompleted(completed, distances);
    expect(kmRegionFor(76, ranges, kemerIlce)).toBe("tekirova");
    expect(kmRegionFor(50, ranges, kemerIlce)).toBe("kemer");
  });

  test("in the gap between candidates, the clearly nearer boundary wins", () => {
    const ranges = kmRangesFromCompleted(completed, distances);
    // 74: six past kemer's 68, one short of tekirova's 75 — Caner Mountain.
    expect(kmRegionFor(74, ranges, kemerIlce)).toBe("tekirova");
  });

  test("midway between candidates it stays silent", () => {
    const ranges = { kemer: { min: 44, max: 60 }, tekirova: { min: 80, max: 90 } };
    expect(kmRegionFor(70, ranges, kemerIlce)).toBe(null);
  });

  test("a km inside two candidates' ranges names nothing", () => {
    const ranges = { belek: { min: 26, max: 42 }, bogazkent: { min: 41, max: 44 } };
    expect(kmRegionFor(41, ranges, ["belek", "bogazkent"])).toBe(null);
    expect(kmRegionFor(43, ranges, ["belek", "bogazkent"])).toBe("bogazkent");
  });

  test("fewer than two known candidates is always silent", () => {
    const ranges = kmRangesFromCompleted(completed, distances);
    expect(kmRegionFor(50, ranges, ["kemer"])).toBe(null);
    expect(kmRegionFor(50, ranges, [])).toBe(null);
    expect(kmRegionFor(50, ranges, ["kemer", "atlantis"])).toBe(null);
  });

  test("regionsInIlce names the candidates an ilçe address leaves open", () => {
    expect(regionsInIlce("kemer").sort()).toEqual(["kemer", "tekirova"]);
    expect(regionsInIlce("manavgat").sort()).toEqual(["kizilagac", "side"]);
    expect(regionsInIlce(undefined)).toEqual([]);
  });
});
