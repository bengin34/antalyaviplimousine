// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { LanguageProvider } from "../i18n";
import { articleBySlug, articleLanguages } from "../lib/articles";
import { articleMeta, blogMeta, domain } from "../lib/seo";
import { ArticlePage } from "./ArticlePage";
import { BlogIndexPage } from "./BlogIndexPage";

afterEach(cleanup);

const comparison = articleBySlug("en", "antalya-airport-transfer-vs-taxi")!;
const golf = articleBySlug("de", "belek-golf-transfer-guide")!;

const schemaOf = (metas: unknown[], type: string) =>
  metas
    .map((meta) => (meta as Record<string, { "@type"?: string }>)["script:ld+json"])
    .find((schema) => schema?.["@type"] === type);

describe("article pages", () => {
  test("renders the heading, comparison table and FAQ a reader can open", () => {
    render(
      <LanguageProvider initialLanguage="en">
        <ArticlePage language="en" article={comparison} />
      </LanguageProvider>,
    );

    expect(screen.getByRole("heading", { level: 1, name: comparison.content.en!.heading }))
      .toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(within(screen.getByRole("table")).getByText("Fixed, per vehicle")).toBeInTheDocument();

    for (const [question] of comparison.content.en!.faq) {
      expect(screen.getByText(question)).toBeInTheDocument();
    }
  });

  test("links every related route to its own language's landing page", () => {
    render(
      <LanguageProvider initialLanguage="de">
        <ArticlePage language="de" article={golf} />
      </LanguageProvider>,
    );

    expect(screen.getByRole("link", { name: "Belek" })).toHaveAttribute(
      "href",
      "/de/transfers/belek/",
    );
    expect(screen.getByRole("link", { name: "Transfer buchen" })).toHaveAttribute(
      "href",
      "/de/#booking",
    );
  });

  test("keeps the breadcrumb pointing back at the language's own blog", () => {
    render(
      <LanguageProvider initialLanguage="tr">
        <ArticlePage language="tr" article={comparison} />
      </LanguageProvider>,
    );

    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });

    expect(within(breadcrumb).getByRole("link", { name: "Ana sayfa" })).toHaveAttribute("href", "/tr/");
    expect(within(breadcrumb).getByRole("link", { name: "Rehberler" })).toHaveAttribute("href", "/tr/blog/");
  });
});

describe("article metadata", () => {
  test("publishes a self-referencing canonical and one alternate per language", () => {
    const metas = articleMeta("de", comparison);
    const alternates = metas.filter((meta) => "hrefLang" in (meta as object)) as Array<
      Record<string, string>
    >;

    expect(metas).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: `${domain}/de/blog/${comparison.content.de!.slug}/`,
    });
    // One per published language plus x-default, and x-default is English.
    expect(alternates).toHaveLength(articleLanguages.length + 1);
    expect(alternates.at(-1)).toMatchObject({
      hrefLang: "x-default",
      href: `${domain}/blog/${comparison.content.en!.slug}/`,
    });
  });

  test("mirrors the visible FAQ in FAQPage schema", () => {
    const faq = schemaOf(articleMeta("ru", comparison), "FAQPage") as {
      mainEntity: Array<{ name: string }>;
    };

    expect(faq.mainEntity.map((entry) => entry.name)).toEqual(
      comparison.content.ru!.faq.map(([question]) => question),
    );
  });

  test("dates the BlogPosting and names the publisher", () => {
    const posting = schemaOf(articleMeta("en", comparison), "BlogPosting") as Record<string, unknown>;

    expect(posting).toMatchObject({
      headline: comparison.content.en!.heading,
      datePublished: comparison.published,
      dateModified: comparison.updated,
      inLanguage: "en",
      publisher: { name: "Antalya VIP Tourism" },
    });
  });
});

describe("blog index", () => {
  test("lists every article of its language with a link to the localized slug", () => {
    render(
      <LanguageProvider initialLanguage="pl">
        <BlogIndexPage language="pl" />
      </LanguageProvider>,
    );

    expect(screen.getByRole("link", { name: comparison.content.pl!.heading })).toHaveAttribute(
      "href",
      `/pl/blog/${comparison.content.pl!.slug}/`,
    );
  });

  test("advertises the language's own feed and canonical", () => {
    const metas = blogMeta("nl");

    expect(metas).toContainEqual({ tagName: "link", rel: "canonical", href: `${domain}/nl/blog/` });
    expect(metas).toContainEqual(
      expect.objectContaining({ type: "application/rss+xml", href: `${domain}/nl/blog/feed.xml` }),
    );

    const blog = schemaOf(metas, "Blog") as { blogPost: unknown[] };

    expect(blog.blogPost).toHaveLength(6);
  });
});
