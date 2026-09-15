/**
 * Campaign attribution for public bookings.
 *
 * The `bookings` table already has the columns (migration
 * 20260822120000_add_utm_attribution); this fills them from the visitor's
 * landing URL so a booking can be traced back to the ad that paid for it.
 * The query string only exists on the landing page, so the values are held in
 * session storage for the rest of the visit.
 */

export type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  landing_page: string | null;
  referrer: string | null;
};

/** Anything with the two Storage methods we use — real or a test double. */
type StorageLike = Pick<Storage, "getItem" | "setItem">;

const STORAGE_KEY = "avl-attribution";
const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

export function emptyAttribution(): Attribution {
  return {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
    gclid: null,
    landing_page: null,
    referrer: null,
  };
}

type Visit = { search: string; pathname: string; referrer: string };

/**
 * Campaign keys are last-touch — a visitor who returns through a second ad
 * should be credited to that ad. Landing page and referrer are first-touch:
 * they describe how the visit began and must survive in-app navigation.
 */
export function mergeAttribution(visit: Visit, stored: Partial<Attribution>): Attribution {
  const params = new URLSearchParams(visit.search);
  const merged = emptyAttribution();
  for (const key of CAMPAIGN_KEYS) {
    merged[key] = params.get(key) || stored[key] || null;
  }
  merged.landing_page = stored.landing_page || visit.pathname || null;
  merged.referrer = stored.referrer || visit.referrer || null;
  return merged;
}

function readStored(storage: StorageLike | null): Partial<Attribution> {
  if (!storage) return {};
  try {
    const raw = storage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? (parsed as Partial<Attribution>) : {};
  } catch {
    // Storage blocked or the stored value is not ours; attribution is
    // never worth breaking a booking over.
    return {};
  }
}

function sessionStorageOrNull(): StorageLike | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Records the current visit. Call once per page load. */
export function captureAttribution(
  visit: Visit = {
    search: typeof window === "undefined" ? "" : window.location.search,
    pathname: typeof window === "undefined" ? "" : window.location.pathname,
    referrer: typeof document === "undefined" ? "" : document.referrer,
  },
  storage: StorageLike | null = sessionStorageOrNull(),
): Attribution {
  const merged = mergeAttribution(visit, readStored(storage));
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // The values still apply to this page view.
  }
  return merged;
}

/** What to send with a booking. Never throws, never blocks a submit. */
export function currentAttribution(
  storage: StorageLike | null = sessionStorageOrNull(),
): Attribution {
  return { ...emptyAttribution(), ...readStored(storage) };
}
