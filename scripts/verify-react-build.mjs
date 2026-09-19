import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";
import { articlePaths, b2bPaths, blogPaths, clinicPaths, healthPaths, homePaths, hotelPaths, legalPaths, prerenderPaths, publicLanguages, sitemapPaths, transferPaths } from "../src/public-paths.js";
import { articleLanguages, articlesForLanguage, blogPath } from "../src/articles/index.js";
import { publicRouteSlugs, routeCatalog } from "../src/routes.js";
import { AGENCY_DISCOUNT_EUR, agencyPrice } from "../src/b2b-pricing.js";

const root = process.cwd();
const dist = path.join(root, "dist");
const domain = "https://antalyaviptourism.com";
const homeSet = new Set(homePaths);
const healthSet = new Set(healthPaths);
const clinicSet = new Set(clinicPaths);
const b2bSet = new Set(b2bPaths);
const transferSet = new Set(transferPaths);
const hotelSet = new Set(hotelPaths);
const legalSet = new Set(legalPaths);
const blogSet = new Set(blogPaths);
const articleSet = new Set(articlePaths);
// The blog is published in fewer languages than the rest of the site, so its
// hreflang group is smaller on purpose - claiming the site-wide set would
// point at pages that do not exist.
const expectedBlogAlternates = articleLanguages.length + 1;
// Derived from the language list rather than repeated here: the two drifted
// apart once already, when the site grew to 23 languages and this file kept
// checking for 11 of them.
const localisedPrefix = new RegExp(`^/(${publicLanguages.filter((language) => language !== "en").join("|")})(?:/|$)`);
// Every indexable language, plus the x-default that points at English.
const expectedAlternates = publicLanguages.length + 1;
const failures = [];

const outputFile = (urlPath) => {
  if (urlPath === "/") return path.join(dist, "index.html");
  if (urlPath.endsWith(".html")) return path.join(dist, urlPath.slice(1));
  return path.join(dist, urlPath.slice(1), "index.html");
};
const exists = async (file) => stat(file).then(() => true, () => false);
const fail = (message) => failures.push(message);
const hasSchemaType = (value, prohibitedTypes) => {
  if (Array.isArray(value)) return value.some((item) => hasSchemaType(item, prohibitedTypes));
  if (!value || typeof value !== "object") return false;
  const type = value["@type"];
  if (Array.isArray(type) && type.some((item) => prohibitedTypes.has(item))) return true;
  if (typeof type === "string" && prohibitedTypes.has(type)) return true;
  return Object.values(value).some((item) => hasSchemaType(item, prohibitedTypes));
};

for (const urlPath of prerenderPaths) {
  const file = outputFile(urlPath);
  if (!(await exists(file))) {
    fail(`${urlPath}: HTML output is missing`);
    continue;
  }

  const html = await readFile(file, "utf8");
  const document = new JSDOM(html).window.document;
  const expectedLanguage = clinicSet.has(urlPath)
    ? "tr"
    : urlPath.match(localisedPrefix)?.[1] || "en";
  if (document.documentElement.lang !== expectedLanguage) fail(`${urlPath}: wrong html lang`);
  if (document.querySelector('link[rel="canonical"]')?.href !== `${domain}${urlPath}`) fail(`${urlPath}: wrong canonical URL`);
  const alternateCount = document.querySelectorAll('link[rel="alternate"][hreflang]').length;
  if (clinicSet.has(urlPath) || hotelSet.has(urlPath)) {
    if (alternateCount !== 0) fail(`${urlPath}: noindex clinic route must not publish unavailable language alternates`);
  } else if (b2bSet.has(urlPath)) {
    // Indexed, but published in English alone — an hreflang set here would
    // point at translations that do not exist.
    if (alternateCount !== 0) fail(`${urlPath}: English-only partner page must not publish language alternates`);
  } else if (legalSet.has(urlPath)) {
    if (alternateCount < 5) fail(`${urlPath}: incomplete language alternates`);
  } else if (blogSet.has(urlPath) || articleSet.has(urlPath)) {
    if (alternateCount !== expectedBlogAlternates) fail(`${urlPath}: expected ${expectedBlogAlternates} blog language alternates, found ${alternateCount}`);
  } else if (alternateCount !== expectedAlternates) fail(`${urlPath}: expected ${expectedAlternates} language alternates, found ${alternateCount}`);
  if (!document.querySelector('script[type="module"]')) fail(`${urlPath}: React client entry is missing`);
  if (html.includes('/src/main.js') || html.includes('/src/consent.js')) fail(`${urlPath}: legacy runtime is still referenced`);

  for (const element of document.querySelectorAll('[src^="/assets/"], [href^="/assets/"]')) {
    const reference = element.getAttribute("src") || element.getAttribute("href");
    if (!reference) continue;
    const assetFile = path.join(dist, decodeURIComponent(reference.split("?")[0].split("#")[0].slice(1)));
    if (!(await exists(assetFile))) fail(`${urlPath}: missing asset ${reference}`);
  }

  if (homeSet.has(urlPath) || transferSet.has(urlPath) || hotelSet.has(urlPath)) {
    if (!document.querySelector("#quote-form")) fail(`${urlPath}: React booking form is missing`);
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

  if (healthSet.has(urlPath)) {
    if (!document.querySelector("#health-consultation")) fail(`${urlPath}: health consultation entry point is missing`);
    if (!document.querySelector("#health-process")) fail(`${urlPath}: health journey process is missing`);
    if (!document.querySelector(".health-role-notice")) fail(`${urlPath}: provider-role disclaimer is missing`);
    if (document.querySelector("#quote-form")) fail(`${urlPath}: transfer booking form leaked into health route`);

    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent || "{}"));
    const service = schemas.find((schema) => schema["@type"] === "Service");
    if (service?.provider?.["@type"] !== "TravelAgency") fail(`${urlPath}: health coordinator schema must identify a travel agency`);
    if (schemas.some((schema) => ["MedicalClinic", "Hospital"].includes(schema["@type"]))) fail(`${urlPath}: health route incorrectly claims a medical-provider schema`);
  }

  if (blogSet.has(urlPath) || articleSet.has(urlPath)) {
    const language = urlPath.match(localisedPrefix)?.[1] || "en";
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent || "{}"));
    const wanted = articleSet.has(urlPath) ? "BlogPosting" : "Blog";
    if (!schemas.some((schema) => schema["@type"] === wanted)) fail(`${urlPath}: ${wanted} schema is missing`);
    if (!schemas.some((schema) => schema["@type"] === "BreadcrumbList")) fail(`${urlPath}: blog breadcrumb schema is missing`);
    if (document.querySelectorAll("h1").length !== 1) fail(`${urlPath}: a guide must have exactly one H1`);
    const feed = document.querySelector('link[rel="alternate"][type="application/rss+xml"]')?.getAttribute("href");
    if (feed !== `${domain}${blogPath(language)}feed.xml`) fail(`${urlPath}: feed link is missing or wrong`);
    if (!(await exists(path.join(dist, `${blogPath(language)}feed.xml`.slice(1))))) fail(`${urlPath}: feed file is missing from the build`);
    if (articlesForLanguage(language).length === 0) fail(`${urlPath}: blog route published for a language with no articles`);
  }

  if (b2bSet.has(urlPath)) {
    if (document.querySelectorAll('input[name="b2b-rate-mode"]').length !== 2) {
      fail(`${urlPath}: both partner rate options must be offered`);
    }
    if (!document.querySelector("#b2b-prices")) fail(`${urlPath}: partner rate table is missing`);
    if (document.querySelector("#quote-form")) fail(`${urlPath}: guest booking form leaked into the partner page`);
    if (!document.body.textContent?.includes(`€${AGENCY_DISCOUNT_EUR}`)) {
      fail(`${urlPath}: the agency reduction is never stated`);
    }

    // The page prerenders in its default mode, so the published fares are the
    // ones in the markup. Agency rates are derived from them in the browser,
    // which is the whole point of deriving rather than storing them.
    const quoted = [...document.querySelectorAll(".b2b-price-table td.price")]
      .map((cell) => cell.textContent?.trim());
    for (const slug of publicRouteSlugs) {
      const published = routeCatalog[slug].prices.vito;
      if (!quoted.includes(`€${published}`)) {
        fail(`${urlPath}: published Vito fare €${published} for ${slug} is missing`);
      }
      if (agencyPrice(published) <= 0) {
        fail(`${urlPath}: ${slug} would be sold to agencies for €${agencyPrice(published)}`);
      }
    }
  }

  if (clinicSet.has(urlPath)) {
    if (!document.querySelector("#clinic-contact")) fail(`${urlPath}: clinic contact entry point is missing`);
    if (!document.querySelector("#clinic-journey")) fail(`${urlPath}: clinic journey section is missing`);
    if (!document.querySelector(".clinic-demo-disclaimer")) fail(`${urlPath}: clinic demo disclaimer is missing`);
    if (document.querySelector("#quote-form")) fail(`${urlPath}: transfer booking form leaked into clinic route`);

    const robots = document.querySelector('meta[name="robots"]')?.content.toLowerCase().replace(/\s+/g, "");
    if (robots !== "noindex,nofollow") fail(`${urlPath}: clinic route must remain noindex,nofollow`);
    if (document.querySelector('meta[property="og:image"]')?.content !== `${domain}/assets/optimized/og-clinic-demo.jpg`) {
      fail(`${urlPath}: clinic Open Graph image is incorrect`);
    }
    if (!(await exists(path.join(dist, "assets", "optimized", "og-clinic-demo.jpg")))) {
      fail(`${urlPath}: clinic Open Graph image asset is missing`);
    }

    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent || "{}"));
    const prohibitedTypes = new Set(["MedicalClinic", "Physician", "Review", "AggregateRating"]);
    if (schemas.some((schema) => hasSchemaType(schema, prohibitedTypes))) {
      fail(`${urlPath}: clinic demo must not claim medical-provider, physician or review schema`);
    }
  }
}

const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
const expectedUrls = [...sitemapPaths].map((urlPath) => `${domain}${urlPath}`).sort();
if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedUrls)) fail(`sitemap does not match the ${sitemapPaths.length} indexable React routes`);
for (const clinicPath of clinicPaths) {
  if (sitemapUrls.includes(`${domain}${clinicPath}`)) fail(`${clinicPath}: noindex clinic route leaked into sitemap`);
}

for (const required of ["admin/index.html", "admin/service-worker.js", "CNAME", "robots.txt"]) {
  if (!(await exists(path.join(dist, required)))) fail(`${required}: deploy artifact is missing`);
}

if (failures.length) {
  console.error(`React build verification failed (${failures.length}):\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

console.log(`Verified ${prerenderPaths.length} prerendered React pages, ${sitemapPaths.length} sitemap URLs, canonical SEO, assets, booking forms and admin output.`);
