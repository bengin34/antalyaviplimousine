import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  articleLanguages,
  articlePath,
  articlesForLanguage,
  blogPath,
} from "../src/articles/index.js";
import { blogCopy } from "../src/articles/copy.js";

const root = process.cwd();
const domain = "https://antalyaviptourism.com";

/** RSS wants RFC 822; the catalogue stores plain ISO dates. */
const rfc822 = (isoDate) => new Date(`${isoDate}T09:00:00Z`).toUTCString();

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

let written = 0;

for (const language of articleLanguages) {
  const posts = articlesForLanguage(language);
  if (posts.length === 0) continue;

  const text = blogCopy[language] ?? blogCopy.en;
  const feedPath = `${blogPath(language)}feed.xml`;
  const items = posts
    .map((article) => {
      const copy = article.content[language];
      const url = `${domain}${articlePath(language, article)}`;
      return [
        "    <item>",
        `      <title>${escapeXml(copy.heading)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(copy.excerpt)}</description>`,
        `      <pubDate>${rfc822(article.published)}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(text.heading)} | Antalya VIP Tourism</title>`,
    `    <link>${domain}${blogPath(language)}</link>`,
    `    <description>${escapeXml(text.indexDescription)}</description>`,
    `    <language>${language}</language>`,
    `    <atom:link href="${domain}${feedPath}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  const target = path.join(root, "public", feedPath.replace(/^\//, ""));
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, feed);
  written += 1;
}

console.log(`Generated ${written} blog feeds`);
