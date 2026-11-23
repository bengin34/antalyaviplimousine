/**
 * Typed view over the plain-JS article catalogue in src/articles.
 *
 * The catalogue is JS so the sitemap and feed scripts can read it without a
 * build step; this module is the single place where those values get their
 * types, so no component has to cast.
 *
 * It imports every article in every language, so only route loaders (which
 * run at prerender time and never ship to the browser) may import it.
 * Components receive what they need as loader data; client code that only
 * needs blog URLs or chrome uses ./blog-paths.
 */
import {
  articleAlternateLanguages as rawAlternateLanguages,
  articleBySlug as rawArticleBySlug,
  articlePath as rawArticlePath,
  articles as rawArticles,
  articlesForLanguage as rawArticlesForLanguage,
  articlesForRoute as rawArticlesForRoute,
} from "../../../src/articles/index.js";
import { articleLanguages, blogPath } from "./blog-paths";

export type ArticleBlock =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "table"; head: readonly string[]; rows: readonly (readonly string[])[] }
  | {
      type: "routelinks";
      text: string;
      routes: readonly string[];
      button: string;
      /** Route page the button opens; the home page booking form when absent. */
      buttonRoute?: string;
    }
  | {
      type: "whatsapp";
      heading: string;
      text: string;
      fields: readonly string[];
      button: string;
      /** Pre-filled WhatsApp message, in the article's language. */
      message: string;
    };

export type ArticleCopy = {
  slug: string;
  title: string;
  heading: string;
  description: string;
  excerpt: string;
  readingMinutes: number;
  blocks: readonly ArticleBlock[];
  faq: readonly (readonly string[])[];
};

export type Article = {
  id: string;
  published: string;
  updated: string;
  image: string;
  relatedRoutes: readonly string[];
  content: Record<string, ArticleCopy | undefined>;
};


export const articles = rawArticles as unknown as readonly Article[];

export const articlesForLanguage = (language: string) =>
  rawArticlesForLanguage(language) as unknown as readonly Article[];

export const articlesForRoute = (language: string, slug: string) =>
  rawArticlesForRoute(language, slug) as unknown as readonly Article[];

export const articleBySlug = (language: string, slug: string) =>
  rawArticleBySlug(language, slug) as unknown as Article | null;

export const articleAlternateLanguages = (article: Article) =>
  rawAlternateLanguages(article as unknown as never) as readonly string[];

export const articlePath = (language: string, article: Article) =>
  rawArticlePath(language, article as unknown as never) as string | null;

export {
  articleLanguages,
  blogCopy,
  blogLanguageFromPath,
  blogLocale,
  blogPath,
  blogText,
  isArticleLanguage,
  type BlogCopy,
} from "./blog-paths";

/** What a link to an article needs: enough for a list entry, no body text. */
export type ArticleSummary = {
  id: string;
  updated: string;
  href: string;
  heading: string;
  excerpt: string;
  readingMinutes: number;
};

export const articleSummary = (language: string, article: Article): ArticleSummary => {
  const copy = article.content[language];
  if (!copy) throw new Error(`Article ${article.id} is not published in ${language}`);
  return {
    id: article.id,
    updated: article.updated,
    href: articlePath(language, article) ?? blogPath(language),
    heading: copy.heading,
    excerpt: copy.excerpt,
    readingMinutes: copy.readingMinutes,
  };
};

/** Every article of a language, in catalogue order, as blog index entries. */
export const articleSummaries = (language: string) =>
  articlesForLanguage(language).map((article) => articleSummary(language, article));

/** Guides that cover a marketed route, for its landing page. */
export const routeArticleSummaries = (language: string, slug: string) =>
  articleLanguages.includes(language)
    ? articlesForRoute(language, slug).map((article) => articleSummary(language, article))
    : [];

/** The next articles after this one in its language, for "more guides". */
export const moreArticleSummaries = (language: string, article: Article, count = 3) =>
  articlesForLanguage(language)
    .filter((entry) => entry.id !== article.id)
    .slice(0, count)
    .map((entry) => articleSummary(language, entry));

/** The article with only one language's text, for a page's loader data. */
export const articleInLanguage = (language: string, article: Article): Article => ({
  ...article,
  content: { [language]: article.content[language] },
});
