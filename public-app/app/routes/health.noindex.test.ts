import { describe, expect, it } from "vitest";
import { prerenderPaths, publicLanguages, sitemapPaths } from "../../../src/public-paths.js";
import { loader, meta } from "./health";

const pages = publicLanguages.map((language) => [language, language === "en" ? "/health/" : `/${language}/health/`]);

describe("health demo stays live but unindexed (MEN-1150)", () => {
  it.each(pages)("%s: noindex,nofollow, no hreflang, own canonical", (language, path) => {
    const loaderData = loader({ request: new Request(`https://antalyaviptourism.com${path}`) });
    const tags = meta({ loaderData, matches: [{ id: "root" }, { id: `health-${language}` }] }) as Array<Record<string, unknown>>;

    expect(tags.filter((t) => t.name === "robots")).toEqual([{ name: "robots", content: "noindex,nofollow" }]);
    expect(tags.filter((t) => t.rel === "alternate")).toEqual([]);
    expect(tags.filter((t) => t.rel === "canonical").map((t) => t.href)).toEqual([`https://antalyaviptourism.com${path}`]);
  });

  it("prerenders all 23 pages and lists none in the sitemap", () => {
    expect(pages).toHaveLength(23);
    expect(prerenderPaths).toEqual(expect.arrayContaining(pages.map(([, path]) => path)));
    expect([...sitemapPaths].filter((path) => path.includes("/health/"))).toEqual([]);
  });

  it("rewrites only the canonical link, leaving other rel links alone", () => {
    const loaderData = loader({ request: new Request("https://antalyaviptourism.com/health/") });
    const preload = { tagName: "link", rel: "preload", href: "/assets/hero.webp" };
    const withPreload = { ...loaderData, meta: [...loaderData.meta, preload] } as typeof loaderData;
    const tags = meta({ loaderData: withPreload, matches: [{ id: "health-de" }] }) as Array<Record<string, unknown>>;

    expect(tags.filter((t) => t.rel === "preload")).toEqual([preload]);
  });

  // The route override, not the loader's own URL, decides the canonical per route id.
  it("takes the canonical from the matched route id", () => {
    const loaderData = loader({ request: new Request("https://antalyaviptourism.com/health/") });
    const tags = meta({ loaderData, matches: [{ id: "health-de" }] }) as Array<Record<string, unknown>>;

    expect(tags.filter((t) => t.rel === "canonical").map((t) => t.href)).toEqual(["https://antalyaviptourism.com/de/health/"]);
  });
});
