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
import type { localizedRoute } from "../../../src/routes.js";
import { routeArticleSummaries } from "./articles";
import { landOfLegendsCopy, landOfLegendsLanguageFor, landOfLegendsPath } from "./land-of-legends-copy";
import { routeCopy } from "./seo";
import type { IndexableLanguage } from "./site";

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
  };
}

export type TransferPageData = ReturnType<typeof transferPageData>;
