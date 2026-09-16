/**
 * Multilingual article catalogue behind /blog/.
 *
 * An article file carries only its metadata; the text for every language
 * lives in ./translations/<language>.js keyed by the article id. A language
 * appears on the site as soon as its file carries that article, and the
 * routing, sitemap, hreflang and feed layers pick it up from there.
 *
 * Slugs are localized per language so each market indexes on its own
 * keyword. `hreflang` is emitted only between the languages an article
 * actually has.
 */
import transferVsTaxi from "./transfer-vs-taxi.js";
import airportArrivalGuide from "./airport-arrival-guide.js";
import familyChildSeats from "./family-child-seats.js";
import belekGolfTransfer from "./belek-golf-transfer.js";
import alanyaDistanceGuide from "./alanya-distance-guide.js";
import whenToVisitAntalya from "./when-to-visit-antalya.js";
import { languageOrder, translations } from "./translations/index.js";

/** Languages the blog is published in, largest source market first. */
export const articleLanguages = languageOrder;

/** Newest first: the blog index and the feeds both read this order. */
const catalogue = [
  transferVsTaxi,
  airportArrivalGuide,
  alanyaDistanceGuide,
  familyChildSeats,
  belekGolfTransfer,
  whenToVisitAntalya,
];

export const articles = Object.freeze(
  catalogue.map((article) =>
    Object.freeze({
      ...article,
      content: Object.fromEntries(
        articleLanguages
          .map((language) => [language, translations[language]?.articles?.[article.id]])
          .filter(([, copy]) => Boolean(copy)),
      ),
    }),
  ),
);

export const articleById = Object.freeze(
  Object.fromEntries(articles.map((article) => [article.id, article])),
);

/** The language prefix used everywhere in the public site. */
const prefix = (language) => (language === "en" ? "" : `/${language}`);

export const blogPath = (language) => `${prefix(language)}/blog/`;

export const articlePath = (language, article) => {
  const copy = article.content[language];
  return copy ? `${prefix(language)}/blog/${copy.slug}/` : null;
};

/** Articles published in a language, in catalogue order. */
export const articlesForLanguage = (language) =>
  articles.filter((article) => Boolean(article.content[language]));

/** Languages an article exists in, in `articleLanguages` order. */
export const articleAlternateLanguages = (article) =>
  articleLanguages.filter((language) => Boolean(article.content[language]));

export const articleBySlug = (language, slug) =>
  articles.find((article) => article.content[language]?.slug === slug) ?? null;

/**
 * Every published article URL. Used for prerendering, the sitemap and the
 * per-language feeds, so it must stay the single source of truth.
 */
export const articlePaths = Object.freeze(
  articleLanguages.flatMap((language) =>
    articlesForLanguage(language)
      .map((article) => articlePath(language, article))
      .filter((path) => path !== null),
  ),
);

export const blogPaths = Object.freeze(
  articleLanguages
    .filter((language) => articlesForLanguage(language).length > 0)
    .map((language) => blogPath(language)),
);

/** Latest change across an article's languages, for sitemap `lastmod`. */
export const articleLastmod = (article) => article.updated ?? article.published;

/** Articles that reference a marketed route, for cross-linking landing pages. */
export const articlesForRoute = (language, slug) =>
  articlesForLanguage(language).filter((article) => article.relatedRoutes.includes(slug));
