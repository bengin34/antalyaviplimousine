import { describe, expect, test } from "vitest";
import {
  buildRootCells,
  buildNearbyRequest,
  classifyMinistryHotels,
  extractMinistryRows,
  filterMinistryHotels,
  findPossibleCurrentMatch,
  mergeHotelClassifications,
  processPlaces,
  runAdaptiveScan,
  selectRootCells,
  selectBatchOneRecoveryRoots,
} from "./hotel-discovery-pilot.mjs";

const ministryHtml = `<script>var jsondata = [
  {"belgeNo":"1","tesisAdi":"SIDE SUN HOTEL","belgeTuru":"Turizm İşletmesi Belgesi","tesisTuru":"Otel","sehir":"ANTALYA","ilce":"MANAVGAT"},
  {"belgeNo":"2","tesisAdi":"APART ONE","belgeTuru":"Basit Konaklama","tesisTuru":"Apart Otel","sehir":"ANTALYA","ilce":"ALANYA"},
  {"belgeNo":"3","tesisAdi":"KAŞ HOTEL","belgeTuru":"Turizm İşletmesi Belgesi","tesisTuru":"Otel","sehir":"ANTALYA","ilce":"KAŞ"}
  ,{"belgeNo":"4","tesisAdi":"HIDDEN APART HOTEL","belgeTuru":"Turizm İşletmesi Belgesi","tesisTuru":"Otel","sehir":"ANTALYA","ilce":"ALANYA"}
];Sys.Application.add_init(function() {});</script>`;

describe("hotel discovery pilot", () => {
  test("extracts only in-scope Ministry hotels", () => {
    const rows = filterMinistryHotels(extractMinistryRows(ministryHtml));
    expect(rows).toEqual([
      expect.objectContaining({ certificateNo: "1", name: "SIDE SUN HOTEL", district: "MANAVGAT" }),
    ]);
  });

  test("interleaves root cells so the pilot starts in every corridor segment", () => {
    const cells = buildRootCells(2000);
    expect(new Set(cells.slice(0, 6).map((cell) => cell.zoneId)).size).toBe(6);
  });

  test("selects only roots not covered by the earlier pilot", () => {
    const cells = buildRootCells(2000);
    const remaining = selectRootCells(cells, 1000);
    expect(remaining[0].id).toBe(cells[1000].id);
    expect(remaining).toHaveLength(cells.length - 1000);
  });

  test("recovery selection skips first-pilot blocks that produced no saturated cells", () => {
    const cells = buildRootCells(2000);
    const recovery = selectBatchOneRecoveryRoots(cells);
    expect(recovery).toHaveLength(775);
    expect(recovery).not.toContain(cells[99]);
    expect(recovery).toContain(cells[100]);
    expect(recovery).not.toContain(cells[125]);
    expect(recovery).toContain(cells[175]);
    expect(recovery).not.toContain(cells[875]);
    expect(recovery).toContain(cells[900]);
  });

  test("stops exactly at the configured request ceiling", async () => {
    let requests = 0;
    const state = await runAdaptiveScan({
      maxCalls: 3,
      rootCells: buildRootCells(2000).slice(0, 4),
      search: async () => { requests += 1; return []; },
      context: { ministryRows: [], currentHotels: [] },
    });
    expect(requests).toBe(3);
    expect(state.attempts).toBe(3);
    expect(state.queue.length).toBe(1);
  });

  test("resumes from a reduced checkpoint without repeating completed cells", async () => {
    const cells = buildRootCells(2000).slice(0, 3);
    const requested = [];
    let checkpoint;
    await runAdaptiveScan({
      maxCalls: 1,
      rootCells: cells,
      search: async (cell) => { requested.push(cell.id); return []; },
      context: { ministryRows: [], currentHotels: [] },
      onCheckpoint: async (state) => { checkpoint = state; },
    });
    const resumed = await runAdaptiveScan({
      maxCalls: 3,
      initialState: checkpoint,
      search: async (cell) => { requested.push(cell.id); return []; },
      context: { ministryRows: [], currentHotels: [] },
    });
    expect(requested).toEqual(cells.map((cell) => cell.id));
    expect(resumed.attempts).toBe(3);
    expect(JSON.stringify(resumed)).not.toMatch(/displayName|businessStatus|primaryType/);
  });

  test("stops immediately on a fatal API configuration error", async () => {
    const fatal = Object.assign(new Error("403 forbidden"), { fatal: true });
    await expect(runAdaptiveScan({
      maxCalls: 1000,
      rootCells: buildRootCells(2000).slice(0, 4),
      search: async () => { throw fatal; },
      context: { ministryRows: [], currentHotels: [] },
    })).rejects.toThrow("403 forbidden");
  });

  test("requests only hotel primary types with the minimum verification fields", () => {
    const request = buildNearbyRequest(buildRootCells(2000)[0], "secret-key");
    expect(request.url).toBe("https://places.googleapis.com/v1/places:searchNearby");
    expect(request.headers["X-Goog-FieldMask"]).toBe("places.id,places.displayName,places.location,places.primaryType,places.businessStatus");
    expect(request.body).toMatchObject({
      includedPrimaryTypes: ["hotel", "resort_hotel"],
      maxResultCount: 20,
      includeFutureOpeningBusinesses: false,
      rankPreference: "DISTANCE",
    });
  });

  test("reduces Places responses to IDs and internal evidence before persistence", () => {
    const ministryRows = filterMinistryHotels(extractMinistryRows(ministryHtml));
    const evidence = processPlaces([{
      id: "p-side",
      displayName: { text: "Side Sun Hotel" },
      location: { latitude: 36.79, longitude: 31.37 },
      primaryType: "hotel",
      businessStatus: "OPERATIONAL",
    }], { south: 36.7, west: 31.3, north: 36.9, east: 31.5 }, { ministryRows, currentHotels: [] });

    expect(evidence).toEqual([{
      placeId: "p-side", ministryCertificateNos: ["1"], currentSlugs: [], operationalConfirmed: true,
    }]);
    expect(JSON.stringify(evidence)).not.toMatch(/Side Sun|displayName|location|businessStatus|primaryType/);

    const result = classifyMinistryHotels({ ministryRows, currentHotels: [], evidence });
    expect(result.missing).toEqual([
      expect.objectContaining({ certificateNo: "1", name: "SIDE SUN HOTEL", placeId: "p-side" }),
    ]);
  });

  test("treats generic hotel words as name variants when comparing the current index", () => {
    const ministryRows = [{ certificateNo: "9", name: "ALAİYE RESORT & SPA HOTEL" }];
    const result = classifyMinistryHotels({
      ministryRows,
      currentHotels: [{ name: "Alaiye Resort & Spa", aliases: [], slug: "alaiye-resort-spa" }],
      evidence: [{ placeId: "p-9", ministryCertificateNos: ["9"], currentSlugs: [], operationalConfirmed: true }],
    });
    expect(result.missing).toEqual([]);
    expect(result.known).toEqual([expect.objectContaining({ certificateNo: "9" })]);
  });

  test("flags a strong partial-name match for manual duplicate review", () => {
    expect(findPossibleCurrentMatch(
      { name: "VOYAGE BELEK" },
      [{ name: "Voyage Belek Golf & Spa", aliases: [], slug: "voyage-belek-golf-spa" }],
    )).toMatchObject({ slug: "voyage-belek-golf-spa" });
  });

  test("merges scan batches once per certificate with conservative precedence", () => {
    const merged = mergeHotelClassifications([
      {
        known: [],
        possibleDuplicates: [{ certificateNo: "2", name: "Maybe Hotel" }],
        missing: [{ certificateNo: "1", name: "New Hotel" }],
        statusConflicts: [],
        unverifiedMinistry: [{ certificateNo: "2", name: "Maybe Hotel" }, { certificateNo: "3", name: "Known Later" }],
      },
      {
        known: [{ certificateNo: "3", name: "Known Later" }],
        possibleDuplicates: [],
        missing: [{ certificateNo: "2", name: "Maybe Hotel" }],
        statusConflicts: [],
        unverifiedMinistry: [{ certificateNo: "1", name: "New Hotel" }],
      },
    ]);
    expect(merged.known.map((row) => row.certificateNo)).toEqual(["3"]);
    expect(merged.possibleDuplicates.map((row) => row.certificateNo)).toEqual(["2"]);
    expect(merged.missing.map((row) => row.certificateNo)).toEqual(["1"]);
    expect(merged.unverifiedMinistry).toEqual([]);
  });

  test("a later equal-priority match enriches an existing candidate", () => {
    const merged = mergeHotelClassifications([
      { missing: [{ certificateNo: "1", name: "SIDE SUN OTEL", firstPartySource: "https://example.test" }] },
      { missing: [{ certificateNo: "1", name: "SIDE SUN OTEL", placeId: "p-side", reason: "operational-confirmed" }] },
    ]);
    expect(merged.missing).toEqual([
      expect.objectContaining({ certificateNo: "1", placeId: "p-side", firstPartySource: "https://example.test" }),
    ]);
  });
});
