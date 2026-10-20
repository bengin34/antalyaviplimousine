/**
 * The public site's whole conversation with Supabase, over plain fetch.
 *
 * supabase-js is ~54 KB gzip and the public pages use three of its features:
 * an anonymous PostgREST select, an anonymous insert, and an Edge Function
 * call. This module sends the same requests supabase-js sends for the anon
 * role (`apikey` + `Authorization: Bearer <anon key>`) and returns results of
 * the same shape, so callers keep their error handling unchanged. The admin
 * app keeps the full client (it needs auth sessions).
 */

type Scalar = string | number | boolean;

export type SupabaseConfig = { url: string; key: string };

/**
 * Mirrors src/lib/supabase.js: both values set means configured, anything
 * else means "no Supabase" (callers fall back to bundled prices, skip
 * tracking, or report "Supabase is not configured"). Read at call time.
 */
export function supabaseConfig(): SupabaseConfig | null {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key ? { url, key } : null;
}

function endpoint(config: SupabaseConfig, path: string): URL {
  // supabase-js resolves "rest/v1" / "functions/v1" against the project URL
  // with a trailing slash; this does the same and throws on an invalid URL,
  // as createClient() does.
  const base = config.url.endsWith("/") ? config.url : `${config.url}/`;
  return new URL(path, new URL(base));
}

function authHeaders(config: SupabaseConfig): Record<string, string> {
  return { apikey: config.key, Authorization: `Bearer ${config.key}` };
}

// ---------------------------------------------------------------------------
// PostgREST
// ---------------------------------------------------------------------------

export type RestError = { message: string; details?: string; hint?: string; code?: string };
export type SelectResult<Row> = { data: Row[] | null; error: RestError | null; status: number };
export type InsertResult = { error: RestError | null; status: number };

export type SelectFilters = {
  /** `.eq(column, value)` → `column=eq.value` */
  eq?: Record<string, Scalar>;
  /** `.in(column, values)` → `column=in.(a,"b,c")` */
  in?: Record<string, readonly Scalar[]>;
};

/** postgrest-js strips whitespace from a select list except inside quotes. */
export function cleanColumns(columns: string): string {
  let quoted = false;
  return columns
    .split("")
    .map((char) => {
      if (/\s/.test(char) && !quoted) return "";
      if (char === '"') quoted = !quoted;
      return char;
    })
    .join("");
}

/** postgrest-js quotes values containing PostgREST's reserved `,()`. */
export function inFilterValue(values: readonly Scalar[]): string {
  const cleaned = Array.from(new Set(values))
    .map((value) => (typeof value === "string" && /[,()]/.test(value) ? `"${value}"` : `${value}`))
    .join(",");
  return `in.(${cleaned})`;
}

export function buildSelectUrl(config: SupabaseConfig, table: string, columns: string, filters: SelectFilters = {}): URL {
  const url = endpoint(config, `rest/v1/${table}`);
  url.searchParams.set("select", cleanColumns(columns));
  for (const [column, value] of Object.entries(filters.eq ?? {})) url.searchParams.append(column, `eq.${value}`);
  for (const [column, values] of Object.entries(filters.in ?? {})) url.searchParams.append(column, inFilterValue(values));
  return url;
}

// postgrest-js retries idempotent requests on a network error or a transient
// 503 (schema cache loading) / 520 (Cloudflare), up to 3 times, backing off
// 1s, 2s, 4s or honouring Retry-After. Kept so a cold PostgREST still yields
// live prices rather than the bundled fallback.
const MAX_RETRIES = 3;
const RETRYABLE_STATUS = [503, 520];
const retryDelay = (attempt: number) => Math.min(1000 * 2 ** attempt, 30_000);
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function isAbort(error: unknown): boolean {
  const candidate = error as { name?: unknown; code?: unknown } | null;
  return candidate?.name === "AbortError" || candidate?.code === "ABORT_ERR";
}

function networkError(error: unknown): RestError {
  const name = error instanceof Error ? error.name : "FetchError";
  const message = error instanceof Error ? error.message : String(error);
  return { message: `${name}: ${message}`, details: "", hint: "", code: "" };
}

async function errorFromResponse(response: Response): Promise<RestError> {
  const body = await response.text();
  try {
    const parsed: unknown = JSON.parse(body);
    if (parsed && typeof parsed === "object" && typeof (parsed as RestError).message === "string") {
      return parsed as RestError;
    }
  } catch {
    // Not JSON (e.g. an HTML gateway page); fall through to the raw text.
  }
  return { message: body || response.statusText || `HTTP ${response.status}` };
}

/**
 * `supabase.from(table).select(columns).eq(...)`: never throws, resolves to
 * `{ data, error }` exactly like supabase-js does without `throwOnError()`.
 */
export async function selectRows<Row>(
  table: string,
  columns: string,
  filters: SelectFilters = {},
  config: SupabaseConfig | null = supabaseConfig(),
): Promise<SelectResult<Row>> {
  if (!config) return { data: null, error: { message: "Supabase is not configured" }, status: 0 };
  try {
    const url = buildSelectUrl(config, table, columns, filters).toString();
    for (let attempt = 0; ; attempt += 1) {
      const headers: Record<string, string> = { ...authHeaders(config), "Accept-Profile": "public" };
      if (attempt > 0) headers["X-Retry-Count"] = String(attempt);
      let response: Response;
      try {
        response = await fetch(url, { method: "GET", headers });
      } catch (error) {
        if (!isAbort(error) && attempt < MAX_RETRIES) {
          await sleep(retryDelay(attempt));
          continue;
        }
        return { data: null, error: networkError(error), status: 0 };
      }
      if (RETRYABLE_STATUS.includes(response.status) && attempt < MAX_RETRIES) {
        const retryAfter = response.headers.get("Retry-After");
        await response.text().catch(() => "");
        await sleep(retryAfter !== null ? Math.max(0, parseInt(retryAfter, 10) || 0) * 1000 : retryDelay(attempt));
        continue;
      }
      if (!response.ok) return { data: null, error: await errorFromResponse(response), status: response.status };
      const body = await response.text();
      if (body === "") return { data: null, error: null, status: response.status };
      try {
        return { data: JSON.parse(body) as Row[], error: null, status: response.status };
      } catch {
        return { data: null, error: { message: body }, status: response.status };
      }
    }
  } catch (error) {
    return { data: null, error: networkError(error), status: 0 };
  }
}

/**
 * `supabase.from(table).insert(row)` with `Prefer: return=minimal`. `keepalive`
 * lets a row sent while the page unloads still reach the server. Never throws.
 */
export async function insertRow(
  table: string,
  row: Record<string, unknown>,
  options: { keepalive?: boolean } = {},
  config: SupabaseConfig | null = supabaseConfig(),
): Promise<InsertResult> {
  if (!config) return { error: { message: "Supabase is not configured" }, status: 0 };
  try {
    const response = await fetch(endpoint(config, `rest/v1/${table}`).toString(), {
      method: "POST",
      headers: {
        ...authHeaders(config),
        "Content-Profile": "public",
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      keepalive: options.keepalive ?? false,
    });
    if (!response.ok) return { error: await errorFromResponse(response), status: response.status };
    return { error: null, status: response.status };
  } catch (error) {
    return { error: networkError(error), status: 0 };
  }
}

// ---------------------------------------------------------------------------
// Edge Functions
// ---------------------------------------------------------------------------

/**
 * Same names, messages and `context` as @supabase/functions-js, so code that
 * reads `error.context` (a Response for HTTP/relay errors, the fetch error for
 * network failures) keeps working.
 */
export class FunctionsError extends Error {
  context: unknown;
  constructor(message: string, name: string, context: unknown) {
    super(message);
    this.name = name;
    this.context = context;
  }
}

export class FunctionsFetchError extends FunctionsError {
  constructor(context: unknown) {
    super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
  }
}

export class FunctionsRelayError extends FunctionsError {
  declare context: Response;
  constructor(context: Response) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
  }
}

export class FunctionsHttpError extends FunctionsError {
  declare context: Response;
  constructor(context: Response) {
    super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
  }
}

export type InvokeResult<Data> =
  | { data: Data; error: null; response: Response }
  | { data: null; error: FunctionsError | Error; response: Response | undefined };

export type InvokeOptions = { body?: unknown; signal?: AbortSignal; timeout?: number };

/**
 * `supabase.functions.invoke(name, { body })`: POST, JSON body, response
 * parsed by its Content-Type. Never throws; failures come back as `error`.
 */
export async function invokeFunction<Data = unknown>(
  name: string,
  options: InvokeOptions = {},
  config: SupabaseConfig | null = supabaseConfig(),
): Promise<InvokeResult<Data>> {
  if (!config) return { data: null, error: new Error("Supabase is not configured"), response: undefined };
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    const headers: Record<string, string> = { ...authHeaders(config) };
    let body: string | undefined;
    if (options.body !== undefined && options.body !== null) {
      if (typeof options.body === "string") {
        headers["Content-Type"] = "text/plain";
        body = options.body;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(options.body);
      }
    }

    let signal = options.signal;
    if (options.timeout) {
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), options.timeout);
      options.signal?.addEventListener("abort", () => controller.abort());
      signal = controller.signal;
    }

    const response = await fetch(endpoint(config, `functions/v1/${name}`).toString(), {
      method: "POST",
      headers,
      body,
      signal,
    }).catch((fetchError: unknown) => {
      throw new FunctionsFetchError(fetchError);
    });

    if (response.headers.get("x-relay-error") === "true") throw new FunctionsRelayError(response);
    if (!response.ok) throw new FunctionsHttpError(response);

    const responseType = (response.headers.get("Content-Type") ?? "text/plain").split(";")[0].trim();
    const data = (responseType === "application/json" ? await response.json() : await response.text()) as Data;
    return { data, error: null, response };
  } catch (error) {
    const typed = error instanceof Error ? error : new Error(String(error));
    return {
      data: null,
      error: typed,
      response: error instanceof FunctionsHttpError || error instanceof FunctionsRelayError ? error.context : undefined,
    };
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}
