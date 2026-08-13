import { writeFile } from "node:fs/promises";
import path from "node:path";
import { homePaths, legalPaths, prerenderPaths } from "../src/public-paths.js";

const root = process.cwd();
const domain = "https://antalyaviptourism.com";
const today = new Date().toISOString().slice(0, 10);
const homeSet = new Set(homePaths);
const legalSet = new Set(legalPaths);

const records = [...prerenderPaths]
  .sort((left, right) => left.localeCompare(right))
  .map((url) => ({
    url,
    lastmod: today,
    changefreq: homeSet.has(url) ? "weekly" : legalSet.has(url) ? "yearly" : "monthly",
    priority: homeSet.has(url) ? "1.0" : legalSet.has(url) ? "0.2" : "0.8",
  }));

const body = records.map(({ url, lastmod, changefreq, priority }) => `  <url>\n    <loc>${domain}${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join("\n");

await writeFile(
  path.join(root, "public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
);
console.log(`Generated sitemap with ${records.length} canonical React URLs`);
