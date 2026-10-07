import { AGENCY_DISCOUNT_EUR, agencyPrice } from "../../../src/b2b-pricing.js";
import { publicRouteSlugs, routeCatalog } from "../../../src/routes.js";

export { AGENCY_DISCOUNT_EUR, agencyPrice };

/**
 * The two ways a partner can book a journey with us, and the only thing that
 * separates them commercially.
 *
 * `guest` — the traveller rides in our vehicle at the fare the public site
 * quotes, and pays it. Nothing is discounted, because nothing is resold: the
 * agency simply hands the journey to us.
 *
 * `agency` — the agency buys the journey from us and sells it on under its
 * own name and its own price. It pays the published fare minus
 * {@link AGENCY_DISCOUNT_EUR}, and whatever it charges its own customer above
 * that is its margin.
 */
export type B2bRateMode = "guest" | "agency";

export type B2bRate = {
  slug: string;
  name: string;
  distanceKm: number;
  /** Published site fare — what the traveller pays under `guest`. */
  guest: number;
  /** What the agency pays us under `agency`. */
  agency: number;
};

export const rateFor = (mode: B2bRateMode, rate: B2bRate) =>
  mode === "agency" ? rate.agency : rate.guest;

/**
 * The marketed routes, nearest first. Sub-regions such as West Alanya carry no
 * landing page of their own and are quoted on request, so `publicRouteSlugs`
 * is the right list here.
 */
export const b2bRates: readonly B2bRate[] = publicRouteSlugs
  .map((slug) => {
    const route = routeCatalog[slug];
    return {
      slug,
      name: route.names.en,
      distanceKm: route.distanceKm,
      guest: route.prices.vito,
      agency: agencyPrice(route.prices.vito),
    };
  })
  .sort((a, b) => a.distanceKm - b.distanceKm);
