import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  buildSelectUrl,
  cleanColumns,
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
  inFilterValue,
  insertRow,
  invokeFunction,
  selectRows,
  supabaseConfig,
} from "./supabase-rest";

const config = { url: "https://project.supabase.co", key: "anon-key" };
const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...headers } });

describe("configuration", () => {
  test("needs both the URL and the anon key, like src/lib/supabase.js", () => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "anon-key");
    expect(supabaseConfig()).toEqual(config);

    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "");
    expect(supabaseConfig()).toBeNull();

    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "anon-key");
    vi.stubEnv("VITE_SUPABASE_URL", "");
    expect(supabaseConfig()).toBeNull();
  });

  test("missing configuration sends nothing and never throws", async () => {
    await expect(selectRows("routes", "*", {}, null)).resolves.toMatchObject({ data: null });
    await expect(insertRow("site_events", {}, {}, null)).resolves.toMatchObject({ status: 0 });
    await expect(invokeFunction("verify-flight", {}, null)).resolves.toMatchObject({ data: null });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("PostgREST query building (same encoding as postgrest-js)", () => {
  test("strips whitespace from the select list except inside quotes", () => {
    expect(cleanColumns("to_location, vehicle_type, price_eur")).toBe("to_location,vehicle_type,price_eur");
    expect(cleanColumns('a, "b c"')).toBe('a,"b c"');
  });

  test("quotes in() values that contain reserved characters and drops duplicates", () => {
    expect(inFilterValue(["side", "a,b", "side", 3])).toBe('in.(side,"a,b",3)');
  });

  test("encodes select, eq and in as query parameters", () => {
    const url = buildSelectUrl(config, "routes", "to_location, vehicle_type", {
      eq: { from_location: "airport" },
      in: { vehicle_type: ["vito", "vclass"] },
    });
    expect(url.origin + url.pathname).toBe("https://project.supabase.co/rest/v1/routes");
    expect(url.search).toBe(
      "?select=to_location%2Cvehicle_type&from_location=eq.airport&vehicle_type=in.%28vito%2Cvclass%29",
    );
  });

  test("tolerates a trailing slash on the project URL", () => {
    expect(buildSelectUrl({ ...config, url: `${config.url}/` }, "routes", "*").pathname).toBe("/rest/v1/routes");
  });
});

describe("selectRows", () => {
  test("GETs with the anon apikey/Authorization and the public schema profile", async () => {
    fetchMock.mockResolvedValue(json([{ vehicle_type: "vito" }]));

    await expect(selectRows("chauffeur_service_rates", "vehicle_type", {}, config)).resolves.toEqual({
      data: [{ vehicle_type: "vito" }],
      error: null,
      status: 200,
    });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://project.supabase.co/rest/v1/chauffeur_service_rates?select=vehicle_type");
    expect(init).toEqual({
      method: "GET",
      headers: { apikey: "anon-key", Authorization: "Bearer anon-key", "Accept-Profile": "public" },
    });
  });

  test("an error status resolves to { data: null, error } instead of throwing", async () => {
    fetchMock.mockResolvedValue(json({ message: "permission denied", code: "42501" }, 401));

    await expect(selectRows("routes", "*", {}, config)).resolves.toEqual({
      data: null,
      error: { message: "permission denied", code: "42501" },
      status: 401,
    });
  });

  test("retries a transient 503 like postgrest-js, honouring Retry-After", async () => {
    vi.useFakeTimers();
    fetchMock.mockResolvedValueOnce(json({ message: "schema cache" }, 503, { "Retry-After": "2" }));
    fetchMock.mockResolvedValueOnce(json([]));

    const pending = selectRows("routes", "*", {}, config);
    await vi.advanceTimersByTimeAsync(2000);
    await expect(pending).resolves.toMatchObject({ data: [], error: null });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][1].headers["X-Retry-Count"]).toBe("1");
  });

  test("gives up after three retries on a network error and resolves with the error", async () => {
    vi.useFakeTimers();
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));

    const pending = selectRows("routes", "*", {}, config);
    await vi.advanceTimersByTimeAsync(1000 + 2000 + 4000);
    await expect(pending).resolves.toMatchObject({ data: null, error: { message: "TypeError: Failed to fetch" } });
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });
});

describe("insertRow", () => {
  test("POSTs JSON with return=minimal and keepalive", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 201 }));

    await expect(insertRow("site_events", { event: "landing_view" }, { keepalive: true }, config)).resolves.toEqual({
      error: null,
      status: 201,
    });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://project.supabase.co/rest/v1/site_events");
    expect(init).toEqual({
      method: "POST",
      headers: {
        apikey: "anon-key",
        Authorization: "Bearer anon-key",
        "Content-Profile": "public",
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ event: "landing_view" }),
      keepalive: true,
    });
  });

  test("never throws on a network failure or a rejected row", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("blocked"));
    await expect(insertRow("site_events", {}, {}, config)).resolves.toMatchObject({ status: 0 });

    fetchMock.mockResolvedValueOnce(json({ message: "violates check constraint" }, 400));
    await expect(insertRow("site_events", {}, {}, config)).resolves.toMatchObject({
      status: 400,
      error: { message: "violates check constraint" },
    });
  });
});

describe("invokeFunction (FunctionsClient parity)", () => {
  test("POSTs a JSON body and parses a JSON response", async () => {
    fetchMock.mockResolvedValue(json({ status: "verified" }));

    const result = await invokeFunction("verify-flight", { body: { flightNumber: "TK2412" } }, config);
    expect(result).toMatchObject({ data: { status: "verified" }, error: null });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://project.supabase.co/functions/v1/verify-flight");
    expect(init).toMatchObject({
      method: "POST",
      headers: { apikey: "anon-key", Authorization: "Bearer anon-key", "Content-Type": "application/json" },
      body: JSON.stringify({ flightNumber: "TK2412" }),
    });
  });

  test("a non-JSON success body is returned as text", async () => {
    fetchMock.mockResolvedValue(new Response("ok", { headers: { "Content-Type": "text/plain" } }));
    await expect(invokeFunction("ping", {}, config)).resolves.toMatchObject({ data: "ok", error: null });
  });

  test("non-2xx is a FunctionsHttpError whose context is the response", async () => {
    const response = json({ error: "nope" }, 400);
    fetchMock.mockResolvedValue(response);

    const result = await invokeFunction("create-booking", { body: {} }, config);
    expect(result.error).toBeInstanceOf(FunctionsHttpError);
    expect(result.error?.message).toBe("Edge Function returned a non-2xx status code");
    expect((result.error as FunctionsHttpError).context).toBe(response);
    expect(result.response).toBe(response);
  });

  test("x-relay-error is a FunctionsRelayError", async () => {
    fetchMock.mockResolvedValue(json({}, 200, { "x-relay-error": "true" }));
    const result = await invokeFunction("create-booking", { body: {} }, config);
    expect(result.error).toBeInstanceOf(FunctionsRelayError);
    expect(result.error?.message).toBe("Relay Error invoking the Edge Function");
  });

  test("a network failure is a FunctionsFetchError carrying the fetch error", async () => {
    const offline = new TypeError("Failed to fetch");
    fetchMock.mockRejectedValue(offline);

    const result = await invokeFunction("create-booking", { body: {} }, config);
    expect(result.error).toBeInstanceOf(FunctionsFetchError);
    expect(result.error?.message).toBe("Failed to send a request to the Edge Function");
    expect((result.error as FunctionsFetchError).context).toBe(offline);
    expect(result.response).toBeUndefined();
  });

  test("a timeout aborts the request and surfaces as a FunctionsFetchError", async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation((_url: string, init: RequestInit) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
    }));

    const pending = invokeFunction("verify-flight", { body: {}, timeout: 5000 }, config);
    await vi.advanceTimersByTimeAsync(5000);
    await expect(pending).resolves.toMatchObject({ data: null });
    expect((await pending).error).toBeInstanceOf(FunctionsFetchError);
  });
});
