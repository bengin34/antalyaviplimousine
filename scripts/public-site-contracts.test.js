import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { describe, expect, test } from "vitest";
import { resolvePriceTokens, routeData } from "../src/prices.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const domain = "https://antalyaviptourism.com";

const languages = {
  en: { prefix: "", locale: "en_GB" },
  de: { prefix: "de/", locale: "de_DE" },
  tr: { prefix: "tr/", locale: "tr_TR" },
  ru: { prefix: "ru/", locale: "ru_RU" },
};

const routeSlugs = [
  "antalya",
  "belek",
  "side",
  "kemer",
  "alanya",
  "bogazkent",
  "manavgat",
  "kizilagac",
  "tekirova",
  "bodrum",
  "dalaman",
  "fethiye",
  "pamukkale",
  "kapadokya",
];

const legalPaths = [
  "/impressum.html",
  "/privacy/",
  "/de/datenschutz/",
  "/de/impressum/",
  "/tr/gizlilik/",
  "/tr/kunye/",
  "/ru/privacy/",
  "/ru/impressum/",
];

const pagePath = (language, slug = "") =>
  `/${languages[language].prefix}${slug ? `transfers/${slug}/` : ""}`;

const fileForPath = (urlPath) => {
  if (urlPath === "/") return path.join(root, "index.html");
  if (urlPath.endsWith(".html")) return path.join(root, urlPath.slice(1));
  return path.join(root, urlPath.slice(1), "index.html");
};

const readPage = (urlPath) =>
  resolvePriceTokens(readFileSync(fileForPath(urlPath), "utf8"));

const parsePage = (urlPath) => {
  const html = readPage(urlPath);
  return { html, document: new JSDOM(html).window.document };
};

const canonicalFor = (urlPath) => `${domain}${urlPath}`;

const alternateUrls = (slug = "") => ({
  en: canonicalFor(pagePath("en", slug)),
  de: canonicalFor(pagePath("de", slug)),
  tr: canonicalFor(pagePath("tr", slug)),
  ru: canonicalFor(pagePath("ru", slug)),
  "x-default": canonicalFor(pagePath("en", slug)),
});

const structuredData = (document) =>
  [...document.querySelectorAll('script[type="application/ld+json"]')].map(
    (script) => JSON.parse(script.textContent),
  );

const schemaByType = (schemas, type) =>
  schemas.find((schema) => schema["@type"] === type);

const expectCoreSeo = (document, urlPath, slug = "") => {
  expect(document.title.trim().length).toBeGreaterThan(20);
  expect(document.querySelector('meta[name="description"]')?.content.length).toBeGreaterThan(50);
  expect(document.querySelector('link[rel="canonical"]')?.href).toBe(canonicalFor(urlPath));
  expect(document.querySelector('meta[property="og:url"]')?.content).toBe(canonicalFor(urlPath));
  expect(document.querySelector('meta[property="og:title"]')?.content).toBeTruthy();
  expect(document.querySelector('meta[property="og:description"]')?.content).toBeTruthy();
  expect(document.querySelector('meta[property="og:image"]')?.content).toMatch(/^https:\/\//);
  expect(document.querySelector('meta[name="twitter:card"]')?.content).toBe("summary_large_image");

  const alternates = Object.fromEntries(
    [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => [
      link.getAttribute("hreflang"),
      link.href,
    ]),
  );
  expect(alternates).toEqual(alternateUrls(slug));
};

const expectBookingFormContract = (document) => {
  const form = document.querySelector("#quote-form");
  expect(form).not.toBeNull();

  const requiredControls = [
    "pickup",
    "destination",
    "vehicle-type",
    "guests",
    "travel-date",
    "flight-arrival-time",
    "flight-number",
    "return-date",
    "return-pickup-time",
    "return-flight-number",
    "pickup-address",
    "dropoff-address",
    "luggage",
    "hotel-name",
    "child-seats",
    "customer-name",
    "customer-phone",
    "customer-email",
    "main-book-submit",
  ];

  for (const id of requiredControls) {
    expect(form.querySelector(`#${id}`), `Missing booking control #${id}`).not.toBeNull();
  }

  expect(form.querySelector('input[name="tripType"][value="one_way"]')).not.toBeNull();
  expect(form.querySelector('input[name="tripType"][value="round_trip"]')).not.toBeNull();
  expect(form.querySelector('input[name="paymentMethod"][value="cash"]')).not.toBeNull();
  expect(document.querySelector('script[type="module"][src="/src/main.js"]')).not.toBeNull();
};

const expectRouteBookingEntry = (document, language) => {
  const form = document.querySelector("#quote-form");
  if (!form) {
    const languageHome = languages[language].prefix
      ? `/${languages[language].prefix}#booking`
      : "/#booking";
    expect(document.querySelector(`a[href="${languageHome}"]`)).not.toBeNull();
    return;
  }

  for (const id of [
    "pickup",
    "destination",
    "vehicle-type",
    "guests",
    "travel-date",
    "customer-name",
    "customer-phone",
    "customer-email",
    "main-book-submit",
  ]) {
    expect(form.querySelector(`#${id}`), `Missing route booking control #${id}`).not.toBeNull();
  }
  expect(document.querySelector('script[type="module"][src="/src/main.js"]')).not.toBeNull();
};

describe("public React migration baseline", () => {
  test("keeps the canonical set of 14 transfer routes", () => {
    expect(Object.keys(routeData).sort()).toEqual([...routeSlugs].sort());
  });

  test("keeps all 68 indexable URLs in the sitemap", () => {
    const commercialPaths = Object.keys(languages).flatMap((language) => [
      pagePath(language),
      ...routeSlugs.map((slug) => pagePath(language, slug)),
    ]);
    const expectedUrls = [...commercialPaths, ...legalPaths]
      .map(canonicalFor)
      .sort();
    const sitemap = readFileSync(path.join(root, "public", "sitemap.xml"), "utf8");
    const actualUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((match) => match[1])
      .sort();

    expect(new Set(actualUrls).size).toBe(68);
    expect(actualUrls).toEqual(expectedUrls);
    for (const urlPath of [...commercialPaths, ...legalPaths]) {
      expect(() => readPage(urlPath), `Missing HTML file for ${urlPath}`).not.toThrow();
    }
  });

  for (const [language, languageConfig] of Object.entries(languages)) {
    test(`${language} homepage keeps SEO, schema and booking contracts`, () => {
      const urlPath = pagePath(language);
      const { document } = parsePage(urlPath);

      expect(document.documentElement.lang).toBe(language);
      expectCoreSeo(document, urlPath);
      expect(document.querySelector('meta[property="og:locale"]')?.content).toBe(
        languageConfig.locale,
      );

      const schemas = structuredData(document);
      expect(schemaByType(schemas, "TravelAgency")).toBeTruthy();
      expect(schemaByType(schemas, "FAQPage")).toBeTruthy();
      expectBookingFormContract(document);
    });
  }

  for (const language of Object.keys(languages)) {
    for (const slug of routeSlugs) {
      test(`${language}/${slug} keeps route SEO, prices and booking entry point`, () => {
        const urlPath = pagePath(language, slug);
        const { document } = parsePage(urlPath);

        expect(document.documentElement.lang).toBe(language);
        expectCoreSeo(document, urlPath, slug);

        const schemas = structuredData(document);
        expect(schemaByType(schemas, "BreadcrumbList")).toBeTruthy();
        expect(schemaByType(schemas, "FAQPage")).toBeTruthy();

        const service = schemaByType(schemas, "Service");
        expect(service).toBeTruthy();
        if (service.url) expect(service.url).toBe(canonicalFor(urlPath));

        expect(service.offers.length).toBeGreaterThan(0);
        for (const offer of service.offers) {
          const vehicle = offer.name.includes("Sprinter") ? "sprinter" : "vito";
          expect(offer.price).toBe(String(routeData[slug].prices[vehicle]));
          expect(offer.priceCurrency).toBe("EUR");
        }

        expectRouteBookingEntry(document, language);
      });
    }
  }

  for (const urlPath of legalPaths) {
    test(`${urlPath} keeps its canonical legal page`, () => {
      const { document } = parsePage(urlPath);
      expect(document.title.trim()).not.toBe("");
      expect(document.querySelector('link[rel="canonical"]')?.href).toBe(canonicalFor(urlPath));
    });
  }
});
