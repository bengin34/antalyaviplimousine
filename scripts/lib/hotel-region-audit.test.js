import { describe, expect, test } from "vitest";
import { routeCatalog } from "../../src/routes.js";
import {
  classifyAuditRow,
  classifyFromEvidence,
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
// A coordinate inside the Boğazkent longitude band, away from its edges. Kept a
// per-call override, never a default on place(): several tests below rely on a
// Place with no coordinate at all, which is how source 2 abstains.
const withLocation = (overrides = {}) =>
  place({ location: { latitude: 36.85, longitude: 31.18 }, ...overrides });

// Pre-fix state of the motivating row: indexed under Belek, address says Boğazkent.
const belazur = {
  slug: "kirman-belazur-resort-spa", name: "Kirman Belazur Resort & Spa",
  region: "belek", regionSource: "district", aliases: [],
};

describe("classifyAuditRow", () => {
  test("fix: identity verified and address region differs (Belazur regression)", () => {
    expect(classifyAuditRow(belazur, { place: withLocation() }, routeCatalog)).toEqual({
      slug: "kirman-belazur-resort-spa", name: "Kirman Belazur Resort & Spa",
      regionSource: "district", indexRegion: "belek", derivedRegion: "bogazkent",
      matchedTerm: "bogazkent", matchedIlce: "serik", addressRegion: "bogazkent",
      locationRegion: "bogazkent", locationReview: null, kmRegion: null,
      identityVerified: true, identityStrength: "strict", identityNotes: [],
      agreeingSources: 2, candidateRegions: [], unresolvedReason: null,
      bucket: "fix", terminal: false, euroDelta: 5, priceEquivalent: false,
    });
  });

  test("ok: identity verified and regions agree", () => {
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: withLocation() }, routeCatalog);
    expect(row.bucket).toBe("ok");
    expect(row.euroDelta).toBe(0);
    expect(row.agreeingSources).toBe(2);
  });

  // Inverted deliberately. Manavgat ilçe holds Side €50 and Kızılağaç €70, so an
  // address that names only the ilçe can no longer resolve to Side by itself.
  test("an address naming only Manavgat no longer decides a price", () => {
    const hotel = { slug: "x", name: "X", region: "manavgat", regionSource: "district", aliases: [] };
    const row = classifyAuditRow(hotel, { place: place({ displayName: { text: "X Hotel" }, addressComponents: components("Manavgat") }) }, routeCatalog);
    expect(row.matchedTerm).toBe("manavgat");
    expect(row.addressRegion).toBe(null);
    expect(row.bucket).not.toBe("ok");
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
    const row = classifyAuditRow({ ...belazur, aliases: ["Some Other"] }, { place: withLocation({ displayName: { text: "Some Other Resort" } }) }, routeCatalog);
    expect(row.bucket).toBe("fix");
  });

  test("loose name match: ok when the address agrees with the index", () => {
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: withLocation({ displayName: { text: "Belazur Kirman Premium" } }) }, routeCatalog);
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

describe("two agreeing sources", () => {
  const ranges = { bogazkent: { min: 41, max: 44 }, belek: { min: 26, max: 40 } };

  // Narrowed by the conclusive-term rule: a lone source confirms only when it is
  // the address naming the index region. Everything else still needs corroboration.
  test("a lone coordinate never confirms", () => {
    const noAddress = place({ addressComponents: components("Nowhere", "Antalya"), location: { latitude: 36.85, longitude: 31.18 } });
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: noAddress }, routeCatalog, { kmRanges: {}, km: null });
    expect(row.addressRegion).toBe(null);
    expect(row.bucket).toBe("unresolved");
    expect(row.unresolvedReason).toBe("single-source");
    expect(row.agreeingSources).toBe(1);
  });

  test("a coordinate on a band edge abstains and is not counted", () => {
    const onEdge = place({ location: { latitude: 36.85, longitude: 31.134 } });
    const row = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: onEdge }, routeCatalog, { kmRanges: {}, km: null });
    expect(row.locationRegion).toBe(null);
    expect(row.locationReview).toBe("near-pricing-boundary");
    expect(row.agreeingSources).toBe(1);
  });

  test("price-equivalent sources count as agreement, not conflict", () => {
    // side and manavgat are both 50/85; agreedRegion must not read them as a
    // conflict. Built directly, since no real address yields manavgat any more.
    const stored = {
      slug: "x", name: "X", indexRegion: "side", regionSource: "district",
      addressRegion: "side", locationRegion: "manavgat", matchedIlce: null,
      identityStrength: "strict", identityVerified: true, identityNotes: [],
      bucket: null, terminal: false, derivedRegion: null, matchedTerm: "side",
      agreeingSources: 0, candidateRegions: [], unresolvedReason: null,
      euroDelta: 0, priceEquivalent: false, kmRegion: null,
    };
    const row = classifyFromEvidence(stored, routeCatalog, { kmRanges: {}, km: null });
    expect(row.bucket).toBe("ok");
    expect(row.agreeingSources).toBe(2);
  });

  test("conflicting sources report the dearest candidate", () => {
    const stored = {
      slug: "y", name: "Y", indexRegion: "side", regionSource: "district",
      addressRegion: "kizilagac", locationRegion: "alanya_bati", matchedIlce: null,
      identityStrength: "strict", identityVerified: true, identityNotes: [],
      bucket: null, terminal: false, derivedRegion: null, matchedTerm: "kizilagac",
      agreeingSources: 0, candidateRegions: [], unresolvedReason: null,
      euroDelta: 0, priceEquivalent: false, kmRegion: null,
    };
    const row = classifyFromEvidence(stored, routeCatalog, { kmRanges: {}, km: null });
    expect(row.bucket).toBe("unresolved");
    expect(row.unresolvedReason).toBe("conflict");
    expect(row.candidateRegions).toEqual(expect.arrayContaining(["kizilagac", "alanya_bati"]));
    expect(row.derivedRegion).toBe("kizilagac"); // 70/115 beats alanya_bati 70/90 on Sprinter
  });

  test("no evidence at all names no candidate", () => {
    const bare = place({ addressComponents: components("Türkiye") });
    const row = classifyAuditRow({ ...belazur, region: "side" }, { place: bare }, routeCatalog, { kmRanges: {}, km: null });
    expect(row.unresolvedReason).toBe("no-evidence");
    expect(row.derivedRegion).toBe(null);
  });

  test("a loose name pointing at another region stays residue, even on one source", () => {
    // A location word, not a generic one: placeIdentityKey strips "resort"/"spa"
    // but keeps "kemer", so this is a loose match rather than a strict one.
    const sibling = place({ displayName: { text: "Kirman Belazur Kemer" }, addressComponents: components("Çamyuva", "Kemer", "Antalya") });
    const row = classifyAuditRow({ ...belazur, region: "alanya_bati" }, { place: sibling }, routeCatalog, { kmRanges: {}, km: null });
    expect(row.identityStrength).toBe("loose");
    expect(row.bucket).toBe("identity");
    expect(row.identityReason).toBe("loose-name-region-conflict");
  });

  describe("classifyFromEvidence re-judges a stored row", () => {
    test("the same evidence gains a source once a km range exists", () => {
      const first = classifyAuditRow({ ...belazur, region: "bogazkent" }, { place: withLocation() }, routeCatalog, { kmRanges: {}, km: 43 });
      expect(first.bucket).toBe("ok");
      expect(first.agreeingSources).toBe(2);

      const again = classifyFromEvidence(first, routeCatalog, { kmRanges: ranges, km: 43 });
      expect(again.kmRegion).toBe("bogazkent");
      expect(again.agreeingSources).toBe(3);
    });

    test("a terminal row is returned untouched", () => {
      const gone = classifyAuditRow(belazur, { notFound: true }, routeCatalog, {});
      expect(classifyFromEvidence(gone, routeCatalog, { kmRanges: ranges, km: 43 })).toEqual(gone);
    });
  });
});

describe("report columns", () => {
  test("the table shows why a row was not confirmed", () => {
    const report = buildAuditReport([{
      slug: "x", bucket: "unresolved", euroDelta: 20, indexRegion: "side",
      derivedRegion: "kizilagac", matchedTerm: "manavgat", regionSource: "district",
      addressRegion: null, locationRegion: null, kmRegion: "kizilagac",
      agreeingSources: 1, unresolvedReason: "single-source",
    }], { generatedAt: "2026-09-11T00:00:00.000Z", indexed: 1 });
    const row = renderAuditTable(report).split("\n").find((line) => line.startsWith("| x |"));
    expect(row).toContain("single-source");
    expect(row).toContain("kizilagac");
  });
});

describe("the three rows that motivated this work", () => {
  const sideRanges = { side: { min: 54, max: 72 }, kizilagac: { min: 80, max: 88 } };
  const kemerRanges = { kemer: { min: 43, max: 71 }, tekirova: { min: 75, max: 78 } };

  test("Orange County Belek: named Belek, addressed Boğazkent, confirmed there", () => {
    const hotel = {
      slug: "orange-county-resort-hotel-belek", name: "Orange County Resort Hotel Belek",
      region: "bogazkent", regionSource: "district", aliases: ["Orange County Belek"],
    };
    const details = { place: place({
      displayName: { text: "Orange County Resort Hotel Belek" },
      addressComponents: components("Boğazkent", "Serik", "Antalya"),
      location: { latitude: 36.85, longitude: 31.18 },
    }) };
    const row = classifyAuditRow(hotel, details, routeCatalog,
      { kmRanges: { bogazkent: { min: 41, max: 44 }, belek: { min: 26, max: 42 } }, km: 43 });
    expect(row.bucket).toBe("ok");
    expect(row.derivedRegion).toBe("bogazkent");
  });

  test("Caner Mountain: Kemer ilçe cannot confirm it; coordinate and scoped km both say Tekirova", () => {
    const hotel = {
      slug: "caner-mountain-hotel", name: "Caner Mountain Hotel",
      region: "kemer", regionSource: "district", aliases: [],
    };
    const details = { place: place({
      displayName: { text: "Caner Mountain Hotel" },
      addressComponents: components("Kemer", "Antalya"),
      location: { latitude: 36.50, longitude: 30.55 },
    }) };
    const row = classifyAuditRow(hotel, details, routeCatalog, { kmRanges: kemerRanges, km: 74 });
    expect(row.addressRegion).toBe(null);      // Kemer ilçe decides nothing
    expect(row.kmRegion).toBe("tekirova");     // 74 is nearer tekirova's 75 than kemer's 71
    expect(row.bucket).toBe("fix");            // coordinate + km, against an index of kemer
    expect(row.derivedRegion).toBe("tekirova");
  });

  test("La Benata: Manavgat ilçe cannot confirm Side; coordinate and scoped km both say Kızılağaç", () => {
    const hotel = {
      slug: "la-benata-hotel", name: "LA BENATA HOTEL",
      region: "side", regionSource: "discovery", aliases: [],
    };
    const details = { place: place({
      displayName: { text: "LA BENATA HOTEL" },
      addressComponents: components("Manavgat", "Antalya"),
      location: { latitude: 36.78, longitude: 31.60 },
    }) };
    const row = classifyAuditRow(hotel, details, routeCatalog, { kmRanges: sideRanges, km: 90 });
    expect(row.addressRegion).toBe(null);
    expect(row.kmRegion).toBe("kizilagac");
    expect(row.bucket).toBe("fix");
    expect(row.derivedRegion).toBe("kizilagac");
  });
});

describe("a conclusive term confirms its own index region", () => {
  const stored = (over = {}) => ({
    slug: "x", name: "X", indexRegion: "kas", regionSource: "district",
    addressRegion: "kas", matchedTerm: "kas", matchedIlce: "kas",
    locationRegion: null, locationReview: "outside-pricing-corridor", kmRegion: null,
    identityStrength: "strict", identityVerified: true, identityNotes: [],
    bucket: null, terminal: false, derivedRegion: null,
    agreeingSources: 0, candidateRegions: [], unresolvedReason: null,
    euroDelta: 0, priceEquivalent: false, ...over,
  });

  test("Google's own address naming the index region is enough on its own", () => {
    const row = classifyFromEvidence(stored(), routeCatalog, { kmRanges: {}, km: 202 });
    expect(row.bucket).toBe("ok");
    expect(row.agreeingSources).toBe(1);
  });

  test("but only when it agrees: a conclusive term elsewhere still needs a second source", () => {
    const row = classifyFromEvidence(stored({ addressRegion: "kumluca", matchedTerm: "kumluca", matchedIlce: "kumluca" }), routeCatalog, { kmRanges: {}, km: 202 });
    expect(row.bucket).toBe("unresolved");
    expect(row.unresolvedReason).toBe("single-source");
  });

  test("an inconclusive term never confirms, however well it agrees", () => {
    // The original bug: Manavgat ilçe holds Side and Kızılağaç, so an address
    // matching only it must not be able to confirm Side on its own.
    const row = classifyFromEvidence(stored({
      indexRegion: "side", addressRegion: null, matchedTerm: "manavgat", matchedIlce: "manavgat",
    }), routeCatalog, { kmRanges: {}, km: 60 });
    expect(row.bucket).not.toBe("ok");
  });
});
