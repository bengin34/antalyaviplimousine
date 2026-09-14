import { beforeEach, describe, expect, test, vi } from "vitest";
import { normalizeFlightNumber, resolveFlightStatus, verifyFlight, type FlightResult } from "./verify";
import aytArrival from "./fixtures/ayt-arrival.json";
import notAyt from "./fixtures/not-ayt.json";

const ok = (body: unknown) => ({ ok: true, status: 200, text: async () => JSON.stringify(body) });

/** Bellekte duran sahte depo; cagri sayilari testlerde dogrudan okunur. */
const fakeStore = (cap = 380) => {
  const cache = new Map<string, FlightResult>();
  let calls = 0;
  return {
    get: vi.fn(async (key: string) => cache.get(key) ?? null),
    put: vi.fn(async (key: string, result: FlightResult) => { cache.set(key, result); }),
    consumeQuota: vi.fn(async () => (calls < cap ? (calls++, true) : false)),
    get used() { return calls; },
  };
};

describe("normalizeFlightNumber", () => {
  test("strips spaces and dashes and upper-cases", () => {
    expect(normalizeFlightNumber(" tk 24-12 ")).toBe("TK2412");
  });
});

describe("resolveFlightStatus", () => {
  test("an AYT leg verifies and reports its local landing time", () => {
    const result = resolveFlightStatus(aytArrival);
    expect(result.status).toBe("verified");
    expect(result.arrivalTime).toBe("11:00");
    expect(result.terminal).toBe("D");
  });

  test("a flight landing elsewhere names the airport it actually lands at", () => {
    const result = resolveFlightStatus(notAyt);
    expect(result.status).toBe("wrong_airport");
    expect(result.arrivalAirport).toMatch(/^[A-Z]{3}$/);
    expect(result.arrivalAirport).not.toBe("AYT");
    expect(result.arrivalAirport).toBe("JFK");
  });

  test("any leg landing at AYT verifies the whole query", () => {
    expect(resolveFlightStatus([...(notAyt as unknown[]), ...(aytArrival as unknown[])]).status).toBe("verified");
  });

  test("an empty list is not found", () => {
    expect(resolveFlightStatus([]).status).toBe("not_found");
  });

  test("a shape we do not recognise is unavailable, never a crash", () => {
    expect(resolveFlightStatus([{ nonsense: true }]).status).toBe("unavailable");
    expect(resolveFlightStatus({ not: "an array" }).status).toBe("unavailable");
  });
});

describe("verifyFlight", () => {
  let store: ReturnType<typeof fakeStore>;
  const base = () => ({ flightNumber: "TK2412", date: "2026-09-20", apiKey: "k", store });

  beforeEach(() => { store = fakeStore(); });

  // Gercek API tanimadigi ucus icin 204 + bos govde donuyor - olculdu, uydurma degil.
  // Bu yol yanlislikla unavailable olursa panelde "bulunamadi" rozeti hic cikmaz
  // ve yanlis yazilmis her ucus numarasi kotadan tekrar tekrar hak yer.
  test("the real not-found shape, 204 with an empty body, is not found", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true, status: 204,
      text: async () => "",
      json: async () => { throw new SyntaxError("Unexpected end of JSON input"); },
    });
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("not_found");
  });

  // Govde bos degilse "bos govde -> not_found" kestirmesi devreye girmez; bu test
  // yalnizca status === 204 kontrolu sayesinde gecer. O kontrol kaldirilirsa govde
  // JSON olarak parse edilip "verified" donerdi ve bu test kirmiziya duserdi.
  test("a 204 with a non-empty body is still not found, via the status check itself", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true, status: 204,
      text: async () => '[{"arrival":{"airport":{"iata":"AYT"}}}]',
    });
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("not_found");
  });

  test("a 200 with an empty body is also not found", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200, text: async () => "  " });
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("not_found");
  });

  test("a not-found answer is cached so a typo cannot drain the quota", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 204, text: async () => "" });
    await verifyFlight({ ...base(), fetchImpl });
    await verifyFlight({ ...base(), fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(store.used).toBe(1);
  });

  // 404 olculmedi ama savunma amacli tutuluyor: RapidAPI ag gecidi, yukari akistan
  // bagimsiz olarak bozuk bir yol icin 404 donebilir.
  test("404 from upstream means not found", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 404, text: async () => "" });
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("not_found");
  });

  test("a body that is not JSON at all is unavailable, not not_found", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200, text: async () => "<html>502</html>" });
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("unavailable");
  });

  test("a server error is unavailable, not an exception", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 500, text: async () => "" });
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("unavailable");
  });

  test("a rejected fetch is unavailable", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("network down"));
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("unavailable");
  });

  test("a missing api key never reaches the network or the quota", async () => {
    const fetchImpl = vi.fn();
    expect((await verifyFlight({ ...base(), apiKey: "", fetchImpl })).status).toBe("unavailable");
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(store.consumeQuota).not.toHaveBeenCalled();
  });

  test("a malformed date is rejected before the network", async () => {
    const fetchImpl = vi.fn();
    expect((await verifyFlight({ ...base(), date: "20/09/2026", fetchImpl })).status).toBe("unavailable");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  test("a cached answer costs no quota and no request", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(ok(aytArrival));
    await verifyFlight({ ...base(), fetchImpl });
    await verifyFlight({ ...base(), fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(store.used).toBe(1);
  });

  test("the request carries the flight, date and RapidAPI auth header", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(ok(aytArrival));
    await verifyFlight({ ...base(), fetchImpl });
    expect(fetchImpl).toHaveBeenCalledWith(
      expect.stringContaining("/TK2412/2026-09-20"),
      expect.objectContaining({
        headers: expect.objectContaining({ "X-RapidAPI-Key": "k" }),
      }),
    );
  });

  test("a different date is fetched again", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(ok(aytArrival));
    await verifyFlight({ ...base(), fetchImpl });
    await verifyFlight({ ...base(), date: "2026-09-21", fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  test("an unavailable result is not cached", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 500, text: async () => "" })
      .mockResolvedValueOnce(ok(aytArrival));
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("unavailable");
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("verified");
  });

  test("an exhausted quota never reaches the network", async () => {
    store = fakeStore(0);
    const fetchImpl = vi.fn();
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("unavailable");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  test("the cache still answers after the quota is gone", async () => {
    store = fakeStore(1);
    const fetchImpl = vi.fn().mockResolvedValue(ok(aytArrival));
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("verified");
    expect((await verifyFlight({ ...base(), fetchImpl })).status).toBe("verified");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test("a broken store degrades to unavailable instead of throwing", async () => {
    const broken = {
      get: vi.fn().mockRejectedValue(new Error("db down")),
      put: vi.fn(),
      consumeQuota: vi.fn(),
    };
    const fetchImpl = vi.fn();
    await expect(verifyFlight({ ...base(), store: broken, fetchImpl })).resolves.toEqual({ status: "unavailable" });
  });

  // Onbellek yazma islemi basarisiz olsa bile, kota harcanip elde edilmis
  // gecerli bir sonuc kaybedilmemeli. put() gercek Postgres deposunda
  // (aksine sahte bellek-ici depoda) reddedebilir; disaridaki try/catch bunu
  // yutup "unavailable" donerse, zaten odenmis bir cevap bosa gitmis olur.
  test("a cache write that rejects still returns the verified result it already paid for", async () => {
    const brokenPut = {
      get: vi.fn(async () => null),
      put: vi.fn().mockRejectedValue(new Error("db down")),
      consumeQuota: vi.fn(async () => true),
    };
    const fetchImpl = vi.fn().mockResolvedValue(ok(aytArrival));
    const result = await verifyFlight({ ...base(), store: brokenPut, fetchImpl });
    expect(result.status).toBe("verified");
  });
});
