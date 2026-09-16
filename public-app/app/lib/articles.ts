/**
 * Typed view over the plain-JS article catalogue in src/articles.
 *
 * The catalogue is JS so the sitemap and feed scripts can read it without a
 * build step; this module is the single place where those values get their
 * types, so no component has to cast.
 */
import {
  articleAlternateLanguages as rawAlternateLanguages,
  articleBySlug as rawArticleBySlug,
  articleLanguages as rawArticleLanguages,
  articlePath as rawArticlePath,
  articles as rawArticles,
  articlesForLanguage as rawArticlesForLanguage,
  articlesForRoute as rawArticlesForRoute,
  blogPath,
} from "../../../src/articles/index.js";
import { blogCopy as rawBlogCopy, blogLocale as rawBlogLocale } from "../../../src/articles/copy.js";

export type ArticleBlock =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "table"; head: readonly string[]; rows: readonly (readonly string[])[] };

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

export type BlogCopy = {
  indexTitle: string;
  indexDescription: string;
  heading: string;
  intro: string;
  blog: string;
  readMore: string;
  minRead: (minutes: number) => string;
  updated: string;
  contents: string;
  faqHeading: string;
  relatedHeading: string;
  routeGuidesHeading: string;
  moreHeading: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
  backToBlog: string;
  home: string;
  routes: string;
  book: string;
  imprint: string;
  privacy: string;
  imprintUrl: string;
  privacyUrl: string;
};

export const articleLanguages = rawArticleLanguages as readonly string[];
export const articles = rawArticles as unknown as readonly Article[];
export const blogCopy = rawBlogCopy as unknown as Record<string, BlogCopy>;
export const blogLocale = rawBlogLocale as unknown as Record<string, string>;

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

export { blogPath };

/** Falls back to English so a missing translation never renders undefined. */
export const blogText = (language: string): BlogCopy => blogCopy[language] ?? blogCopy.en;

export const isArticleLanguage = (language: string) => articleLanguages.includes(language);

/** First path segment, when it names a language the blog is published in. */
export const blogLanguageFromPath = (pathname: string) => {
  const candidate = pathname.split("/").filter(Boolean)[0] ?? "";
  return articleLanguages.includes(candidate) ? candidate : "en";
};
