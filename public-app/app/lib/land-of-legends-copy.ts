import type { LandOfLegendsErrors } from "./land-of-legends";
import type { landOfLegendsZoneKm } from "../../../src/land-of-legends.js";
import { en } from "./land-of-legends-copy/en";
import { de } from "./land-of-legends-copy/de";
import { fr } from "./land-of-legends-copy/fr";
import { tr } from "./land-of-legends-copy/tr";
import { ru } from "./land-of-legends-copy/ru";
import { cs } from "./land-of-legends-copy/cs";
import { uk } from "./land-of-legends-copy/uk";
import { ur } from "./land-of-legends-copy/ur";
import { pl } from "./land-of-legends-copy/pl";
import { nl } from "./land-of-legends-copy/nl";
import { ar } from "./land-of-legends-copy/ar";
import { sv } from "./land-of-legends-copy/sv";
import { da } from "./land-of-legends-copy/da";
import { el } from "./land-of-legends-copy/el";
import { es } from "./land-of-legends-copy/es";
import { he } from "./land-of-legends-copy/he";
import { hu } from "./land-of-legends-copy/hu";
import { it } from "./land-of-legends-copy/it";
import { ja } from "./land-of-legends-copy/ja";
import { ko } from "./land-of-legends-copy/ko";
import { pt } from "./land-of-legends-copy/pt";
import { ro } from "./land-of-legends-copy/ro";
import { zh } from "./land-of-legends-copy/zh";

/**
 * Copy for The Land of Legends excursion page and form, one file per site
 * language in ./land-of-legends-copy/. Every language the site publishes has
 * its own full copy: the type has no optional keys, so a language missing a
 * string fails the typecheck instead of silently showing English.
 */
export const landOfLegendsLanguages = ["en", "de", "fr", "tr", "ru", "cs", "uk", "ur", "pl", "nl", "ar", "sv", "da", "el", "es", "he", "hu", "it", "ja", "ko", "pt", "ro", "zh"] as const;
export type LandOfLegendsLanguage = (typeof landOfLegendsLanguages)[number];
export type LandOfLegendsRegion = keyof typeof landOfLegendsZoneKm;

export type LandOfLegendsCopy = {
  locale: string;
  metaTitle: string;
  metaDescription: (fromPrice: number) => string;
  home: string;
  transfers: string;
  bookNow: string;
  eyebrow: string;
  heading: string;
  intro: string;
  fromLabel: (price: number) => string;
  highlights: readonly string[];
  priceTableTitle: string;
  priceTableNote: string;
  regionColumn: string;
  onRequest: string;
  formTitle: string;
  ticketsNotIncluded: string;
  meetingLabel: string;
  shortNotice: string;
  driveTime: (minutes: number, area: string) => string;
  regionOnRequest: string;
  sprinterNote: (guests: number) => string;
  bigGroup: string;
  askWhatsapp: string;
  confirmedPriceLabel: string;
  /** Journey-type option and hint inside the main airport booking form. */
  tripOption: string;
  tripHint: string;
  detailsLink: string;
  hotelLabel: string;
  hotelPlaceholder: string;
  hotelNotListed: string;
  hotelNoMatch: string;
  hotelMatched: (hotel: string, region: string) => string;
  hotelUnmatched: string;
  dateLabel: string;
  departureLabel: string;
  departureHint: string;
  returnLabel: string;
  returnHint: string;
  guestsLabel: string;
  vehicleLabel: string;
  vito: string;
  sprinter: string;
  childSeatsLabel: string;
  childSeatNone: string;
  childAgeLabel: (index: number) => string;
  childAgeSelect: string;
  childAgeBaby: string;
  strollersLabel: string;
  nameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  notesLabel: string;
  notesPlaceholder: string;
  totalLabel: string;
  totalIncludes: string;
  quoteOnRequest: string;
  payInCar: string;
  submit: string;
  submitting: string;
  submitError: string;
  confirmedTitle: string;
  confirmedFixed: string;
  confirmedQuote: string;
  reference: string;
  whatsappCta: string;
  newBooking: string;
  faqTitle: string;
  faq: ReadonlyArray<readonly [string, string]>;
  errors: LandOfLegendsErrors;
  /** Heading of the last price-table row: areas quoted on request (Kaş, Fethiye…). */
  otherAreas: string;
  /**
   * Every Land of Legends pricing region, as a stand-alone name (nominative,
   * not "to Alanya"). The route catalog's names are written for "transfer to
   * …" and are not translated into every language.
   */
  regionNames: Readonly<Record<LandOfLegendsRegion, string>>;
};

export const landOfLegendsCopy: Record<LandOfLegendsLanguage, LandOfLegendsCopy> = { en, de, fr, tr, ru, cs, uk, ur, pl, nl, ar, sv, da, el, es, he, hu, it, ja, ko, pt, ro, zh };

/** Narrows any site language to one with excursion copy, English otherwise. */
export const landOfLegendsLanguageFor = (language: string): LandOfLegendsLanguage =>
  (landOfLegendsLanguages as readonly string[]).includes(language) ? language as LandOfLegendsLanguage : "en";

/** A pricing region's name in this page's language. */
export function landOfLegendsRegionName(region: string, language: LandOfLegendsLanguage) {
  return landOfLegendsCopy[language].regionNames[region as LandOfLegendsRegion] ?? region;
}

export const landOfLegendsPath = (language: LandOfLegendsLanguage) =>
  `${language === "en" ? "" : `/${language}`}/land-of-legends/`;
