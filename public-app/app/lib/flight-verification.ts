export type FlightStatus = "verified" | "not_found" | "wrong_airport" | "unavailable";

export type FlightResult = {
  status: FlightStatus;
  arrivalTime?: string;
  arrivalAirport?: string;
  terminal?: string;
};

const UNAVAILABLE: FlightResult = { status: "unavailable" };
const KNOWN: FlightStatus[] = ["verified", "not_found", "wrong_airport", "unavailable"];

type Invoke = (name: string, options: { body: Record<string, unknown> }) => Promise<{ data: unknown; error: unknown }>;

/** Dogrulamanin basarisizligi rezervasyonun basarisizligi degildir: bu fonksiyon
 *  hicbir kosulda reddetmez, her aksaklik "unavailable" olarak doner. */
export async function verifyFlightNumber(
  flightNumber: string,
  date: string,
  deps?: { invoke?: Invoke },
): Promise<FlightResult> {
  if (!flightNumber?.trim() || !date?.trim()) return UNAVAILABLE;

  try {
    // invoke, this baglamina ihtiyac duyar (client.url / client.headers okur);
    // metodu nesnesinden koparip gecmek onu sessizce bozar. Bu yuzden sarmalayici.
    const invoke = deps?.invoke ?? await (async () => {
      const { supabase } = await import("../../../src/lib/supabase.js");
      if (!supabase) return null;
      return ((name, options) => supabase.functions.invoke(name, options)) as Invoke;
    })();
    if (!invoke) return UNAVAILABLE;

    const { data, error } = await invoke("verify-flight", { body: { flightNumber, date } });
    if (error || !data) return UNAVAILABLE;

    const result = data as FlightResult;
    return KNOWN.includes(result.status) ? result : UNAVAILABLE;
  } catch {
    return UNAVAILABLE;
  }
}

/** Varis saati yalnizca boşken ve musteri alana hic dokunmamisken doldurulur.
 *  null donerse alana dokunulmaz. */
export function shouldApplyFlightArrival(
  result: Pick<FlightResult, "status" | "arrivalTime">,
  field: { current: string; touched: boolean },
): string | null {
  if (result.status !== "verified" || !result.arrivalTime) return null;
  if (field.touched || field.current) return null;
  return result.arrivalTime;
}
