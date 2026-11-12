import { en } from "./airport-map-copy/en";
import { de } from "./airport-map-copy/de";
import { fr } from "./airport-map-copy/fr";
import { tr } from "./airport-map-copy/tr";
import { ru } from "./airport-map-copy/ru";
import { cs } from "./airport-map-copy/cs";
import { uk } from "./airport-map-copy/uk";
import { ur } from "./airport-map-copy/ur";
import { pl } from "./airport-map-copy/pl";
import { nl } from "./airport-map-copy/nl";
import { ar } from "./airport-map-copy/ar";
import { sv } from "./airport-map-copy/sv";
import { da } from "./airport-map-copy/da";
import { el } from "./airport-map-copy/el";
import { es } from "./airport-map-copy/es";
import { he } from "./airport-map-copy/he";
import { hu } from "./airport-map-copy/hu";
import { it } from "./airport-map-copy/it";
import { ja } from "./airport-map-copy/ja";
import { ko } from "./airport-map-copy/ko";
import { pt } from "./airport-map-copy/pt";
import { ro } from "./airport-map-copy/ro";
import { zh } from "./airport-map-copy/zh";

/**
 * Copy for the interactive airport map, one file per language in
 * ./airport-map-copy/. The type has no optional keys, so a language missing a
 * string fails the typecheck instead of silently showing English.
 */
export const airportMapLanguages = ["en", "de", "fr", "tr", "ru", "cs", "uk", "ur", "pl", "nl", "ar", "sv", "da", "el", "es", "he", "hu", "it", "ja", "ko", "pt", "ro", "zh"] as const;
export type AirportMapLanguage = (typeof airportMapLanguages)[number];

export const airportMapPath = (language: AirportMapLanguage) =>
  `${language === "en" ? "" : `/${language}`}/airport-map/`;

/** Arrival steps, in the order a passenger meets them. */
export type AirportStepId = "passport" | "baggage" | "customs" | "exit" | "meetGreet";

export type AirportMapCopy = {
  locale: string;
  metaTitle: string;
  metaDescription: string;
  home: string;
  transfers: string;
  bookNow: string;
  heading: string;
  intro: string;
  /** Names the 3D canvas for screen readers; the step list carries the same route as text. */
  canvasLabel: string;
  loading: string;
  noWebgl: string;
  dragHint: string;
  fullscreen: string;
  exitFullscreen: string;
  walk: string;
  pause: string;
  routeTitle: Record<"t2" | "t1", string>;
  overviewHint: string;
  views: Record<"t2" | "t1" | "overview", string>;
  levels: Record<"pier" | "extensionPier" | "ground", string>;
  steps: Record<"t2" | "t1", Partial<Record<AirportStepId, readonly [title: string, text: string]>>>;
  /** Labels drawn on the map, keyed by the kind of place in airport-map-data.json. */
  places: Record<
    | "passport" | "security" | "customs" | "escalator" | "elevator" | "wc" | "exchange" | "atm" | "dutyFree"
    | "lostBaggage" | "carRental" | "prayer" | "info" | "lounge" | "ftaExclusive" | "fastTrack" | "food" | "ticket"
    | "exit" | "police" | "meetGreet" | "arrivalsGateA" | "arrivalsGateB" | "baggageEscalators"
    | "connectionCorridor" | "oversizedBaggage" | "domestic" | "busStopT2" | "shuttleToT1" | "shuttleToT2",
    string
  >;
  greeterTitle: string;
  greeterText: readonly string[];
  faqTitle: string;
  faq: ReadonlyArray<readonly [string, string]>;
  sourcesTitle: string;
  sources: string;
};

export const airportMapCopy: Record<AirportMapLanguage, AirportMapCopy> = { en, de, fr, tr, ru, cs, uk, ur, pl, nl, ar, sv, da, el, es, he, hu, it, ja, ko, pt, ro, zh };
