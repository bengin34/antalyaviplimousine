/**
 * The client-side half of the blog: language list, URLs and page chrome.
 *
 * Imports no article text, so headers, footers and cross-links can use it on
 * every page. Article bodies and summaries come from ./articles, which only
 * route loaders import (they run at prerender time and are stripped from the
 * browser bundle).
 */
import { blogCopy as rawBlogCopy, blogLocale as rawBlogLocale } from "../../../src/articles/copy.js";
import { languageOrder } from "../../../src/articles/languages.js";
import { blogPath as rawBlogPath } from "../../../src/articles/paths.js";

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

/** Languages the blog is published in, largest source market first. */
export const articleLanguages = languageOrder as readonly string[];
export const blogCopy = rawBlogCopy as unknown as Record<string, BlogCopy>;
export const blogLocale = rawBlogLocale as unknown as Record<string, string>;

export const blogPath = (language: string) => rawBlogPath(language) as string;

/** Falls back to English so a missing translation never renders undefined. */
export const blogText = (language: string): BlogCopy => blogCopy[language] ?? blogCopy.en;

export const isArticleLanguage = (language: string) => articleLanguages.includes(language);

/** First path segment, when it names a language the blog is published in. */
export const blogLanguageFromPath = (pathname: string) => {
  const candidate = pathname.split("/").filter(Boolean)[0] ?? "";
  return articleLanguages.includes(candidate) ? candidate : "en";
};
