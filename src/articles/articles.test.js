import { describe, expect, test } from "vitest";
import { routeCatalog } from "../routes.js";
import {
  articleLanguages,
  articlePath,
  articlePaths,
  articles,
  articlesForLanguage,
  articlesForRoute,
  articleAlternateLanguages,
  articleBySlug,
  blogPath,
  blogPaths,
} from "./index.js";
import { blogCopy } from "./copy.js";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Search engines truncate on rendered width, not character count, and a CJK
 * glyph is about twice as wide as a Latin one. Counting raw `.length` would
 * demand Japanese descriptions twice as long as they should be, so measure
 * the width the snippet will actually occupy.
 */
const displayWidth = (text) =>
  [...text].reduce((total, character) => total + (character.codePointAt(0) > 0x2e7f ? 2 : 1), 0);

describe("article catalogue", () => {
  test("publishes every article in every declared language", () => {
    for (const article of articles) {
      expect(articleAlternateLanguages(article)).toEqual([...articleLanguages]);
    }
  });

  test("keeps one localized slug per language and never repeats a URL", () => {
    expect(new Set(articlePaths).size).toBe(articlePaths.length);
    expect(articlePaths.length).toBe(articles.length * articleLanguages.length);

    for (const language of articleLanguages) {
      const slugs = articlesForLanguage(language).map((article) => article.content[language].slug);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  test("resolves a slug back to its article in its own language only", () => {
    const article = articles[0];
    const german = article.content.de.slug;

    expect(articleBySlug("de", german)?.id).toBe(article.id);
    expect(articleBySlug("ru", german)).toBeNull();
  });

  test("carries the metadata every SEO surface reads", () => {
    for (const article of articles) {
      expect(article.published).toMatch(isoDate);
      expect(article.updated).toMatch(isoDate);
      expect(article.image.startsWith("/assets/")).toBe(true);

      for (const language of articleLanguages) {
        const copy = article.content[language];
        // Search results truncate beyond roughly this length, and anything
        // shorter than 70 characters is not a description at all.
        expect(displayWidth(copy.description)).toBeGreaterThan(70);
        expect(displayWidth(copy.description)).toBeLessThan(200);
        expect(displayWidth(copy.title)).toBeGreaterThan(20);
        expect(displayWidth(copy.heading)).toBeGreaterThan(10);
        expect(displayWidth(copy.excerpt)).toBeGreaterThan(40);
        expect(copy.readingMinutes).toBeGreaterThan(0);
        expect(copy.faq.length).toBeGreaterThanOrEqual(4);
        for (const entry of copy.faq) expect(entry).toHaveLength(2);
        expect(copy.blocks.filter((block) => block.type === "h2").length).toBeGreaterThanOrEqual(4);
      }
    }
  });

  test("only links routes that exist in the catalogue", () => {
    for (const article of articles) {
      expect(article.relatedRoutes.length).toBeGreaterThan(0);
      for (const slug of article.relatedRoutes) {
        expect(routeCatalog[slug], `Unknown route ${slug} in ${article.id}`).toBeTruthy();
      }
    }
  });

  test("finds the guides that belong to a marketed route", () => {
    const belek = articlesForRoute("de", "belek").map((article) => article.id);

    expect(belek).toContain("belek-golf-transfer");
    expect(articlesForRoute("de", "kapadokya").length).toBeGreaterThan(0);
  });

  test("builds blog and article paths with the site language prefix", () => {
    expect(blogPath("en")).toBe("/blog/");
    expect(blogPath("de")).toBe("/de/blog/");
    expect(blogPaths).toHaveLength(articleLanguages.length);
    expect(articlePath("en", articles[0])).toBe(`/blog/${articles[0].content.en.slug}/`);
    expect(articlePath("tr", articles[0])).toBe(`/tr/blog/${articles[0].content.tr.slug}/`);
  });

  test("translates the blog chrome for every published language", () => {
    for (const language of articleLanguages) {
      const copy = blogCopy[language];
      expect(copy, `Missing blog copy for ${language}`).toBeTruthy();
      for (const key of Object.keys(blogCopy.en)) {
        expect(copy[key], `Missing ${key} for ${language}`).toBeTruthy();
      }
      expect(copy.minRead(5)).toContain("5");
    }
  });
});
