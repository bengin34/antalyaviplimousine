import type { IndexableLanguage } from "./site";
import { de } from "./transfer-landing-copy/de";
import { en } from "./transfer-landing-copy/en";
import { ru } from "./transfer-landing-copy/ru";
import { tr } from "./transfer-landing-copy/tr";
import { pl } from "./transfer-landing-copy/pl";
import { fr } from "./transfer-landing-copy/fr";
import { nl } from "./transfer-landing-copy/nl";
import { es } from "./transfer-landing-copy/es";
import { it } from "./transfer-landing-copy/it";
import { pt } from "./transfer-landing-copy/pt";
import { ro } from "./transfer-landing-copy/ro";
import { cs } from "./transfer-landing-copy/cs";
import { uk } from "./transfer-landing-copy/uk";
import { hu } from "./transfer-landing-copy/hu";
import { el } from "./transfer-landing-copy/el";
import { sv } from "./transfer-landing-copy/sv";
import { da } from "./transfer-landing-copy/da";
import { ar } from "./transfer-landing-copy/ar";
import { he } from "./transfer-landing-copy/he";
import { ja } from "./transfer-landing-copy/ja";
import { ko } from "./transfer-landing-copy/ko";
import { zh } from "./transfer-landing-copy/zh";
import { ur } from "./transfer-landing-copy/ur";

/**
 * The long-form copy of a transfer route landing page, one file per language
 * in ./transfer-landing-copy/.
 *
 * This started as German-only prose inlined in TransferPage.tsx, which left
 * the other 22 languages on a variable-swap template: same headings, only the
 * route name and price changed. That is the thin-page pattern search engines
 * discount, and it also loses the German pages' booking arguments (fixed price
 * per vehicle, no prepayment, where the driver waits). All 23 indexable
 * languages now carry their own prose, so the map is a full `Record` and the
 * compiler refuses a new site language without copy for it.
 *
 * `regions` stays `Partial`: the seven resort regions are written, the
 * long-distance routes (Bodrum, Dalaman, Pamukkale…) are not. A route
 * missing from `regions` keeps the plain template rather than showing
 * machine-filled headings.
 */
/**
 * The place name in the grammatical forms the prose needs.
 *
 * `routeCatalog` carries one name per language, and for Russian that name is
 * already accusative ("Аланью") because the booking form reads "трансфер в …".
 * Reusing it for "отели в …" produces "отели в Аланью", which is wrong — a
 * Russian or Polish reader sees a broken sentence, not a localized page. So a
 * written language states only the forms that differ from the catalogue name;
 * German, English and Turkish inflect nothing here and so declare none.
 */
export type TransferLandingPlace = {
  /** Subject position: "Antalya Airport → X". */
  nominative: string;
  /** Movement towards: "transfer to X". */
  direction: string;
  /** Being there: "your hotel in X", "hotels in X". */
  location: string;
  /** Movement away: "return from X". */
  origin: string;
};

/** Every form falls back to the route name from `routeCatalog`. */
export type TransferLandingPlaceOverrides = Partial<TransferLandingPlace>;

export type TransferLandingRegion = {
  name?: TransferLandingPlaceOverrides;
  /** The destination as a place, not as a drive: what the visitor is booking into. */
  about: string;
  /** The drive itself, and why a private car beats a shuttle on this route. */
  routeDetails: string;
};

export type TransferLandingCopy = {
  heroHeading: (name: string) => string;
  heroCta: string;
  heroTrust: readonly string[];
  serviceHeading: (name: string) => string;
  aboutHeading: (name: string) => string;
  ownGroup: (name: string) => string;
  arrivalHeading: string;
  arrivalBody: string;
  returnHeading: string;
  returnBody: (name: string) => string;
  privateHeading: string;
  privateBody: (name: string) => string;
  priceBody: string;
  vehicleHeading: string;
  vehicleBody: string;
  /** Printed under each vehicle price: the figure covers the car, not a seat. */
  wholeVehicle: string;
  priceTrust: readonly string[];
  hotelsEyebrow: string;
  hotelsHeading: (name: string) => string;
  hotelsBody: (name: string) => string;
  /** Appended to the route FAQ; question first, answer second. */
  faq: readonly (readonly [string, string])[];
  regions: Partial<Record<string, TransferLandingRegion>>;
};

const landingCopy: Record<IndexableLanguage, TransferLandingCopy> = {
  de, en, ru, tr, pl, fr, nl, es, it, pt, ro, cs, uk, hu, el, sv, da, ar, he, ja, ko, zh, ur,
};

/** The languages whose landing copy is written, in publication order. */
export const transferLandingLanguages = Object.freeze(
  Object.keys(landingCopy) as IndexableLanguage[],
);

export function transferLandingCopy(language: IndexableLanguage): TransferLandingCopy {
  return landingCopy[language];
}
