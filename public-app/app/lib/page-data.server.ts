/**
 * Data that route loaders hand to their page components.
 *
 * Loaders run only at prerender time, so these imports (every language's
 * dictionary, excursion copy, SEO copy and articles) never reach the browser. The
 * `.server` suffix makes the build fail if client code ever imports this.
 */
import translationData from "../generated/legacy-translations.json";
import type { Messages } from "../i18n";
import type { LandOfLegendsBookingCopyByLanguage } from "./land-of-legends-booking-copy";
import { landOfLegendsRates } from "../../../src/land-of-legends.js";
import { hotelsForRegion } from "../../../src/hotels.js";
import type { localizedRoute } from "../../../src/routes.js";
import { routeArticleSummaries } from "./articles";
import { landOfLegendsCopy, landOfLegendsLanguageFor, landOfLegendsPath } from "./land-of-legends-copy";
import { routeCopy } from "./seo";
import type { IndexableLanguage } from "./site";
import { transferLandingCopy } from "./transfer-landing-copy";

const dictionaries = translationData.resources as Record<string, Messages>;

/** The UI dictionary for a page's language, for LanguageProvider. */
export const pageMessages = (language: string): Messages => dictionaries[language] ?? dictionaries.en;

/** What the airport booking form shows of the Land of Legends day trip. */
export function landOfLegendsBookingCopy(language: string): LandOfLegendsBookingCopyByLanguage {
  const excursionLanguage = landOfLegendsLanguageFor(language);
  const { tripOption, tripHint, detailsLink } = landOfLegendsCopy[excursionLanguage];
  return { [excursionLanguage]: { tripOption, tripHint, detailsLink } };
}

type LocalizedRoute = NonNullable<ReturnType<typeof localizedRoute>>;

/** Excursion teaser on landing pages of regions the day trip serves. */
export type LandOfLegendsRoutePromo = { heading: string; hint: string; href: string; label: string };

/** Hotel names are proper nouns, so one list serves every language. */
const landingHotels: Partial<Record<string, readonly string[]>> = {
  antalya: ["Delphin Diva Premiere", "Delphin Imperial Lara", "Delphin BE Grand Resort", "Royal Wings Hotel", "Akra Hotel"],
  belek: ["Rixos Premium Belek", "The Land of Legends", "Maxx Royal Belek", "Regnum Carya", "Gloria Golf Resort", "Cornelia Diamond Golf Resort & Spa", "IC Hotels Santai Family Resort"],
  side: ["Arum Barut Collection", "Side Star Resort", "Royal Dragon Hotel", "Barut Hemera", "Voyage Sorgun", "Crystal Sunset Luxury Resort & Spa"],
  kemer: ["Maxx Royal Kemer Resort", "Orange County Resort Hotel Kemer", "Paloma Pasha Resort", "Amara Prestige Hotel"],
  alanya: ["Utopia World Hotel", "Sentido Gold Island Hotel", "Q Premium Resort Hotel Alanya", "Kirman Arycanda De Luxe"],
  kizilagac: ["Sentido Flora Garden", "Starlight Resort Hotel", "Sunrise Resort Hotel", "Crystal Admiral Resort", "Club Hotel Turan Prince", "Selectum Family Resort"],
  tekirova: ["Rixos Premium Kemer", "Rixos Premium Tekirova", "Nirvana Dolce Vita", "Club Marco Polo", "Pirate’s Beach Club", "Club Hotel Phaselis Rose"],
};

/**
 * The long-form landing of one route page, resolved to plain strings.
 *
 * `transfer-landing-copy` holds all 23 languages and writes its sentences as
 * functions of the place name, so resolving them in the loader keeps the whole
 * set in the server bundle: the browser receives only the sentences its own
 * page prints. A route with no region copy returns null and the page falls
 * back to the plain route template.
 */
function transferLanding(language: IndexableLanguage, route: LocalizedRoute) {
  const copy = transferLandingCopy(language);
  const region = copy.regions[route.slug];
  if (!region) return null;
  // Which form of the place name a sentence needs depends on where the name
  // sits in it; a language that inflects says so in its own copy file.
  const place = {
    nominative: region.name?.nominative ?? route.name,
    direction: region.name?.direction ?? route.name,
    location: region.name?.location ?? route.name,
    origin: region.name?.origin ?? route.name,
  };
  // Hotel landing pages exist in German only, so only German links to them.
  const catalogued = language === "de" ? hotelsForRegion(route.slug) : [];
  return {
    heroHeading: copy.heroHeading(place.nominative),
    heroCta: copy.heroCta,
    heroTrust: copy.heroTrust,
    serviceHeading: copy.serviceHeading(place.direction),
    aboutHeading: copy.aboutHeading(place.nominative),
    about: region.about,
    routeDetails: region.routeDetails,
    ownGroup: copy.ownGroup(place.location),
    arrivalHeading: copy.arrivalHeading,
    arrivalBody: copy.arrivalBody,
    returnHeading: copy.returnHeading,
    returnBody: copy.returnBody(place.origin),
    privateHeading: copy.privateHeading,
    privateBody: copy.privateBody(place.location),
    priceBody: copy.priceBody,
    vehicleHeading: copy.vehicleHeading,
    vehicleBody: copy.vehicleBody,
    wholeVehicle: copy.wholeVehicle,
    priceTrust: copy.priceTrust,
    hotelsEyebrow: copy.hotelsEyebrow,
    hotelsHeading: copy.hotelsHeading(place.location),
    hotelsBody: copy.hotelsBody(place.location),
    faq: copy.faq,
    hotels: (landingHotels[route.slug] ?? []).map((name) => {
      const entry = catalogued.find((hotel) => hotel.name === name);
      return { name, href: entry ? `/de/hotels/${entry.slug}/` : null };
    }),
  };
}

export type TransferLanding = NonNullable<ReturnType<typeof transferLanding>>;

/** Everything a transfer landing page shows beyond the route itself. */
export function transferPageData(language: IndexableLanguage, route: LocalizedRoute) {
  const seo = routeCopy(language);
  let landOfLegendsPromo: LandOfLegendsRoutePromo | null = null;
  if (route.slug in landOfLegendsRates) {
    const excursionLanguage = landOfLegendsLanguageFor(language);
    const excursion = landOfLegendsCopy[excursionLanguage];
    const price = landOfLegendsRates[route.slug as keyof typeof landOfLegendsRates].vito;
    landOfLegendsPromo = {
      heading: excursion.tripOption,
      hint: excursion.tripHint,
      href: landOfLegendsPath(excursionLanguage),
      label: excursion.fromLabel(price),
    };
  }
  return {
    heading: seo.heading(route.name),
    description: seo.description(route.name, route.prices.vito),
    guides: routeArticleSummaries(language, route.slug),
    landOfLegendsPromo,
    landing: transferLanding(language, route),
  };
}

export type TransferPageData = ReturnType<typeof transferPageData>;
