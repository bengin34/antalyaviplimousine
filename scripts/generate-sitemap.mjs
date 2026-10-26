import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { publicRouteSlugs } from "../src/routes.js";
import {
  articlePaths,
  blogPaths,
  homePaths,
  landOfLegendsLanguages,
  languagePrefix,
  legalPaths,
  publicLanguages,
  sitemapPaths,
} from "../src/public-paths.js";
import {
  articleAlternateLanguages,
  articleLanguages,
  articlePath,
  articles,
  articleLastmod,
  articlesForLanguage,
  blogPath,
} from "../src/articles/index.js";

const root = process.cwd();
const domain = "https://antalyaviptourism.com";
const today = new Date().toISOString().slice(0, 10);

/**
 * `lastmod` has to say when a page actually changed: a sitemap that stamps
 * every URL with the build date teaches crawlers to ignore the field.
 * Articles carry their own dates; every other page is rendered from the
 * app source, so the last commit that touched it is the honest date. CI
 * checks out full history for this (a shallow clone would date every page
 * by the deploy commit).
 */
const sourceDate = (() => {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", "public-app/app", "src"],
      { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : today;
  } catch {
    return today;
  }
})();

const articleDates = new Map();
for (const article of articles) {
  for (const language of articleAlternateLanguages(article)) {
    articleDates.set(articlePath(language, article), articleLastmod(article));
  }
}
for (const language of articleLanguages) {
  const dates = articlesForLanguage(language).map(articleLastmod).sort();
  if (dates.length > 0) articleDates.set(blogPath(language), dates[dates.length - 1]);
}
const lastmodFor = (url) => articleDates.get(url) ?? sourceDate;

const homeSet = new Set(homePaths);
const legalSet = new Set(legalPaths);
const blogSet = new Set([...blogPaths, ...articlePaths]);

/**
 * hreflang groups: every URL that has translations points at all of them.
 * Google reads the annotations from the sitemap as well as from the page, and
 * on a site this size the sitemap is the cheaper place to keep them correct.
 */
const alternateGroups = new Map();

const addGroup = (paths) => {
  const group = Object.entries(paths);
  if (group.length < 2) return;
  for (const [, urlPath] of group) alternateGroups.set(urlPath, paths);
};

addGroup(Object.fromEntries(publicLanguages.map((language) => [language, `${languagePrefix(language)}/`])));
addGroup(Object.fromEntries(publicLanguages.map((language) => [language, `${languagePrefix(language)}/health/`])));
addGroup(Object.fromEntries(
  landOfLegendsLanguages.map((language) => [language, `${languagePrefix(language)}/land-of-legends/`]),
));
for (const slug of publicRouteSlugs) {
  addGroup(Object.fromEntries(
    publicLanguages.map((language) => [language, `${languagePrefix(language)}/transfers/${slug}/`]),
  ));
}
addGroup(Object.fromEntries(
  articleLanguages
    .filter((language) => articlesForLanguage(language).length > 0)
    .map((language) => [language, blogPath(language)]),
));
for (const article of articles) {
  addGroup(Object.fromEntries(
    articleAlternateLanguages(article).map((language) => [language, articlePath(language, article)]),
  ));
}

const changefreqFor = (url) => {
  if (homeSet.has(url)) return "weekly";
  if (legalSet.has(url)) return "yearly";
  if (blogSet.has(url)) return "weekly";
  return "monthly";
};

const priorityFor = (url) => {
  if (homeSet.has(url)) return "1.0";
  if (legalSet.has(url)) return "0.2";
  if (blogSet.has(url)) return "0.6";
  return "0.8";
};

const records = [...sitemapPaths]
  .sort((left, right) => left.localeCompare(right))
  .map((url) => ({
    url,
    lastmod: lastmodFor(url),
    changefreq: changefreqFor(url),
    priority: priorityFor(url),
    alternates: alternateGroups.get(url),
  }));

const alternateLinks = (alternates) => {
  if (!alternates) return "";
  const links = Object.entries(alternates).map(
    ([language, href]) =>
      `\n    <xhtml:link rel="alternate" hreflang="${language}" href="${domain}${href}" />`,
  );
  const fallback = alternates.en ?? Object.values(alternates)[0];
  links.push(`\n    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}${fallback}" />`);
  return links.join("");
};

const body = records
  .map(({ url, lastmod, changefreq, priority, alternates }) =>
    `  <url>\n    <loc>${domain}${url}</loc>${alternateLinks(alternates)}\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join("\n");

await writeFile(
  path.join(root, "public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`,
);
console.log(`Generated sitemap with ${records.length} canonical React URLs`);
