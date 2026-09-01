import { describe, test, expect } from "vitest";
import { slugsToProcess, applyResult } from "./hotel-distances-merge.mjs";

const index = [
  { slug: "a", name: "A Hotel", district: "Side" },
  { slug: "b", name: "B Hotel", district: "Belek" },
];

describe("slugsToProcess", () => {
  test("default run picks only slugs missing from the data or with null km", () => {
    const data = { a: { km: 50, checked: false } };
    expect(slugsToProcess(index, data, {})).toEqual(["b"]);
  });

  test("null-km rows are reprocessed on a default run", () => {
    const data = { a: { km: null }, b: { km: 40 } };
    expect(slugsToProcess(index, data, {})).toEqual(["a"]);
  });

  test("--refresh reprocesses all except checked:true rows", () => {
    const data = { a: { km: 50, checked: true }, b: { km: 40, checked: false } };
    expect(slugsToProcess(index, data, { refresh: true })).toEqual(["b"]);
  });

  test("--only limits to one slug", () => {
    const data = { a: { km: 50 }, b: { km: 40 } };
    expect(slugsToProcess(index, data, { only: "a" })).toEqual(["a"]);
  });
});

describe("applyResult", () => {
  test("writes km + place for a matched hotel", () => {
    const next = applyResult({}, { slug: "a", district: "Side" }, { km: 50, place: "p" });
    expect(next.a).toEqual({ km: 50, place: "p", district: "Side", checked: false });
  });

  test("writes km:null + note for a no-match", () => {
    const next = applyResult({}, { slug: "a", district: "Side" }, null);
    expect(next.a).toEqual({ km: null, place: null, district: "Side", checked: false, note: "no-match" });
  });

  test("never overwrites a checked:true row", () => {
    const data = { a: { km: 50, place: "p", district: "Side", checked: true } };
    const next = applyResult(data, { slug: "a", district: "Side" }, { km: 999, place: "q" });
    expect(next.a).toEqual(data.a);
  });
});
