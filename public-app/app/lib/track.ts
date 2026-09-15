/**
 * First-party funnel tracking.
 *
 * GA4 only ever sees consenting visitors who are not running a blocker, so
 * it cannot answer "how many people who saw a price actually booked". These
 * rows go from our own domain to our own database (`site_events`, migration
 * 20260915120000) and land in the same schema as `bookings`, so campaign
 * spend can be joined against real revenue.
 *
 * Nothing here identifies a person: no IP, no name, email or phone. The
 * session id is random and dies with the tab. That is what keeps these rows
 * outside the cookie-consent question — so do not add personal fields.
 */

import { currentAttribution, type Attribution } from "./attribution";

export const TRACKED_EVENTS = [
  "landing_view",
  "route_selected",
  "vehicle_selected",
  "price_shown",
  "quote_unavailable",
  "booking_started",
  "form_abandoned",
  "flight_verification_failed",
  "begin_checkout",
  "booking_submitted",
  "whatsapp_clicked",
  "phone_clicked",
] as const;

export type TrackedEvent = (typeof TRACKED_EVENTS)[number];

type StorageLike = Pick<Storage, "getItem" | "setItem">;
type Props = Record<string, unknown>;

export type SiteEventRow = {
  session_id: string;
  event: TrackedEvent;
  page: string | null;
  language: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  gclid: string | null;
  route: string | null;
  vehicle: string | null;
  price: number | null;
  props: Props;
};

const SESSION_KEY = "avl-session";

/**
 * Personal fields must never reach this table. The check is on substrings
 * rather than an exact list because callers pass through form values, where
 * the same idea appears as `customerName`, `customer_email`, `phone`…
 */
const PERSONAL_KEY_PATTERN = /name|mail|phone|address|hotel|flight_number|ref/i;

/** Columns the funnel is actually queried by; the rest goes to `props`. */
const COLUMN_PROPS = ["route", "vehicle", "price"] as const;

export function isTrackedEvent(event: string): event is TrackedEvent {
  return (TRACKED_EVENTS as readonly string[]).includes(event);
}

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function finiteNumber(value: unknown): number | null {
  const parsed = typeof value === "string" ? Number(value) : value;
  return typeof parsed === "number" && Number.isFinite(parsed) ? parsed : null;
}

export type TrackContext = {
  sessionId: string;
  page: string | null;
  language: string | null;
  attribution: Attribution;
};

export function buildEvent(event: TrackedEvent, props: Props, context: TrackContext): SiteEventRow {
  const rest: Props = {};
  for (const [key, value] of Object.entries(props)) {
    if (PERSONAL_KEY_PATTERN.test(key)) continue;
    if ((COLUMN_PROPS as readonly string[]).includes(key)) continue;
    if (value === undefined || value === null) continue;
    // Only scalars: a nested object could smuggle in a whole form value and
    // would blow past the row's size constraint.
    if (typeof value === "object") continue;
    rest[key] = typeof value === "string" ? value.slice(0, 200) : value;
  }

  return {
    session_id: context.sessionId,
    event,
    page: text(context.page, 300),
    language: text(context.language, 8),
    utm_source: text(context.attribution.utm_source, 100),
    utm_campaign: text(context.attribution.utm_campaign, 200),
    gclid: text(context.attribution.gclid, 200),
    route: text(props.route, 100),
    vehicle: text(props.vehicle, 40),
    price: finiteNumber(props.price),
    props: rest,
  };
}

function randomId(): string {
  const bytes = new Uint8Array(8);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function sessionStorageOrNull(): StorageLike | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

/** A random per-tab id. `site_events_field_lengths` rejects anything shorter than 8. */
export function ensureSessionId(storage: StorageLike | null = sessionStorageOrNull()): string {
  let existing: string | null = null;
  try {
    existing = storage?.getItem(SESSION_KEY) ?? null;
  } catch {
    existing = null;
  }
  if (existing && existing.length >= 8 && existing.length <= 64) return existing;

  const created = randomId();
  try {
    storage?.setItem(SESSION_KEY, created);
  } catch {
    // The id still holds for this page view.
  }
  return created;
}

/**
 * Fire-and-forget. Measurement must never delay a booking or surface an
 * error to a customer, so every failure here is swallowed on purpose.
 */
export function track(event: TrackedEvent, props: Props = {}): void {
  if (typeof window === "undefined" || !isTrackedEvent(event)) return;

  const row = buildEvent(event, props, {
    sessionId: ensureSessionId(),
    page: window.location.pathname,
    language: document.documentElement.lang || null,
    attribution: currentAttribution(),
  });

  void (async () => {
    try {
      const { supabase } = await import("../../../src/lib/supabase.js");
      await supabase?.from("site_events").insert(row);
    } catch {
      // Blocked network, missing configuration, RLS change — all silent.
    }
  })();
}
