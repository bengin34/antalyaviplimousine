import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";

const root = process.cwd();
const pages = {
  "en-privacy": "privacy/index.html",
  "en-imprint": "impressum.html",
  "de-privacy": "de/datenschutz/index.html",
  "de-imprint": "de/impressum/index.html",
  "tr-privacy": "tr/gizlilik/index.html",
  "tr-imprint": "tr/kunye/index.html",
  "ru-privacy": "ru/privacy/index.html",
  "ru-imprint": "ru/impressum/index.html",
};

const normalize = (value = "") => value.trim().replace(/\s+/g, " ");
const normalizeWithBreaks = (element) => [...(element?.childNodes || [])]
  .map((node) => node.nodeName === "BR" ? "\n" : node.textContent || "")
  .join("")
  .split("\n")
  .map(normalize)
  .filter(Boolean)
  .join("\n");
const output = {};

for (const [key, file] of Object.entries(pages)) {
  const html = await readFile(path.join(root, file), "utf8");
  const document = new JSDOM(html).window.document;
  const hero = document.querySelector(".legal-hero");
  output[key] = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
    alternates: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => ({
      language: link.getAttribute("hreflang"),
      href: link.getAttribute("href"),
    })),
    hero: {
      eyebrow: normalize(hero?.querySelector(".eyebrow p")?.textContent),
      title: normalize(hero?.querySelector("h1")?.textContent),
      intro: normalize(hero?.querySelector(":scope > p")?.textContent),
    },
    cards: [...document.querySelectorAll(".legal-card")].map((card) => ({
      title: normalize(card.querySelector("h2")?.textContent),
      paragraphs: [...card.querySelectorAll(":scope > p")]
        .filter((paragraph) => !paragraph.querySelector("button"))
        .map((paragraph) => normalize(paragraph.textContent)),
      details: [...card.querySelectorAll("dl > div")].map((detail) => ({
        term: normalize(detail.querySelector("dt")?.textContent),
        value: normalizeWithBreaks(detail.querySelector("dd")),
        href: detail.querySelector("dd a")?.getAttribute("href") || null,
      })),
      privacySettings: Boolean(card.querySelector("[data-open-consent]")),
    })),
    homeLabel: normalize(document.querySelector(".desktop-nav a")?.textContent) || "Home",
  };
}

const target = path.join(root, "public-app", "app", "generated", "legal-copy.json");
await mkdir(path.dirname(target), { recursive: true });
await writeFile(target, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Extracted ${Object.keys(output).length} legal pages`);
