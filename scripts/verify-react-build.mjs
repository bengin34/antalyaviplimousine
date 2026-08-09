import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";
import { homePaths, legalPaths, prerenderPaths, transferPaths } from "../src/public-paths.js";
import { routeCatalog } from "../src/routes.js";

const root = process.cwd();
const dist = path.join(root, "dist");
const domain = "https://antalyaviptourism.com";
const homeSet = new Set(homePaths);
const transferSet = new Set(transferPaths);
const legalSet = new Set(legalPaths);
const failures = [];

const outputFile = (urlPath) => {
  if (urlPath === "/") return path.join(dist, "index.html");
  if (urlPath.endsWith(".html")) return path.join(dist, urlPath.slice(1));
  return path.join(dist, urlPath.slice(1), "index.html");
};
const exists = async (file) => stat(file).then(() => true, () => false);
const fail = (message) => failures.push(message);

for (const urlPath of prerenderPaths) {
  const file = outputFile(urlPath);
  if (!(await exists(file))) {
    fail(`${urlPath}: HTML output is missing`);
    continue;
  }

  const html = await readFile(file, "utf8");
  const document = new JSDOM(html).window.document;
  const expectedLanguage = urlPath.match(/^\/(de|tr|ru)(?:\/|$)/)?.[1] || "en";
  if (document.documentElement.lang !== expectedLanguage) fail(`${urlPath}: wrong html lang`);
  if (document.querySelector('link[rel="canonical"]')?.href !== `${domain}${urlPath}`) fail(`${urlPath}: wrong canonical URL`);
  if (document.querySelectorAll('link[rel="alternate"][hreflang]').length !== 5) fail(`${urlPath}: incomplete language alternates`);
  if (!document.querySelector('script[type="module"]')) fail(`${urlPath}: React client entry is missing`);
  if (html.includes('/src/main.js') || html.includes('/src/consent.js')) fail(`${urlPath}: legacy runtime is still referenced`);

  for (const element of document.querySelectorAll('[src^="/assets/"], [href^="/assets/"]')) {
    const reference = element.getAttribute("src") || element.getAttribute("href");
    if (!reference) continue;
    const assetFile = path.join(dist, decodeURIComponent(reference.split("?")[0].slice(1)));
    if (!(await exists(assetFile))) fail(`${urlPath}: missing asset ${reference}`);
  }

  if (homeSet.has(urlPath) || transferSet.has(urlPath)) {
    if (!document.querySelector("#quote-form")) fail(`${urlPath}: React booking form is missing`);
    if (!document.querySelector("#main-book-submit")) fail(`${urlPath}: booking submit action is missing`);
    if (!document.querySelector('meta[property="og:url"]')) fail(`${urlPath}: Open Graph metadata is missing`);
    if (document.querySelector("#travel-date")?.hasAttribute("min")) fail(`${urlPath}: build-time date leaked into prerendered HTML`);
  }

  if (transferSet.has(urlPath)) {
    const slug = urlPath.match(/\/transfers\/([^/]+)\/$/)?.[1];
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent || "{}"));
    const service = schemas.find((schema) => schema["@type"] === "Service");
    if (!service) fail(`${urlPath}: Service schema is missing`);
    const expected = slug && routeCatalog[slug]?.prices;
    if (expected && !service?.offers?.some((offer) => Number(offer.price) === expected.vito)) fail(`${urlPath}: canonical Vito price is missing`);
    if (expected && !service?.offers?.some((offer) => Number(offer.price) === expected.sprinter)) fail(`${urlPath}: canonical Sprinter price is missing`);
  }
}

const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
const expectedUrls = [...prerenderPaths].map((urlPath) => `${domain}${urlPath}`).sort();
if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedUrls)) fail("sitemap does not match the 68 canonical React routes");

for (const required of ["admin/index.html", "admin/service-worker.js", "CNAME", "robots.txt"]) {
  if (!(await exists(path.join(dist, required)))) fail(`${required}: deploy artifact is missing`);
}

if (failures.length) {
  console.error(`React build verification failed (${failures.length}):\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

console.log(`Verified ${prerenderPaths.length} React pages, canonical SEO, assets, sitemap, booking forms and admin output.`);
