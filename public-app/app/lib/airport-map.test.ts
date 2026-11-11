import { describe, expect, test } from "vitest";
import { publicLanguages } from "../../../src/public-paths.js";
import { airportMap, arrivalRoutes } from "./airport-map";
import { airportMapCopy, airportMapLanguages } from "./airport-map-copy";

const labels = (objects: { kind: string; label?: string }[], kind: string) =>
  objects.filter((o) => o.kind === kind).map((o) => o.label);

describe("airport map", () => {
  test("has the belts of the official plans and the shelter row our airport team gave", () => {
    const t2 = airportMap.t2.levels.ground;
    expect(labels(t2.objects, "belt").sort()).toEqual(["201", "202", "203", "204", "205", "206", "211", "212", "213", "214", "215"]);
    expect(labels(airportMap.t1.levels.ground.objects, "belt").sort()).toEqual(["101", "102", "103", "104", "105", "106"]);
    // Out of the door, to the left: police first, then A to G.
    const row = t2.objects.filter((o) => o.kind === "police" || o.kind === "shelter").sort((a, b) => a.x - b.x);
    expect(row.map((o) => o.label ?? o.kind)).toEqual(["police", "A", "B", "C", "D", "E", "F", "G"]);
    expect(row[0].x).toBeGreaterThan(t2.exit!.x);
    expect(airportMap.t1.levels.ground.exit).toBeDefined();
  });

  test("routes end at the Meet & Greet row (T2) and the exit (T1)", () => {
    expect(arrivalRoutes.t2.map((s) => s.id)).toEqual(["passport", "baggage", "customs", "exit", "meetGreet"]);
    expect(arrivalRoutes.t1.map((s) => s.id)).toEqual(["passport", "baggage", "customs", "exit"]);
    for (const step of [...arrivalRoutes.t2, ...arrivalRoutes.t1]) expect(step.points.flat().every(Number.isFinite), step.id).toBe(true);
  });

  test("copy exists for every published language, with every step translated", () => {
    expect([...airportMapLanguages].sort()).toEqual([...publicLanguages].sort());
    const en = airportMapCopy.en;
    for (const language of airportMapLanguages) {
      const copy = airportMapCopy[language];
      expect(Object.keys(copy).sort(), language).toEqual(Object.keys(en).sort());
      expect(Object.keys(copy.places).sort(), language).toEqual(Object.keys(en.places).sort());
      for (const t of ["t2", "t1"] as const) expect(Object.keys(copy.steps[t]), language).toEqual(arrivalRoutes[t].map((s) => s.id));
      expect(copy.faq.length, language).toBe(en.faq.length);
      if (language !== "en") expect(copy.intro, language).not.toBe(en.intro);
    }
  });
});
