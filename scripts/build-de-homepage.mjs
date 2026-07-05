import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const sourceHtmlPath = path.join(root, "index.html");
const targetHtmlPath = path.join(root, "de", "index.html");
const mainJsPath = path.join(root, "src", "main.js");

const deTitle = "Flughafen Antalya Transfer | Privater VIP Chauffeurservice";
const deDescription =
  "Private Festpreis-Transfers vom Flughafen Antalya nach Belek, Side, Kemer, Alanya und mehr. Mercedes Vito & Sprinter, Meet & Greet, Flugverfolgung und Zahlung im Fahrzeug.";

function extractObjectLiteral(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) throw new Error(`Marker not found: ${marker}`);

  const start = source.indexOf("{", markerIndex);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  throw new Error(`Object literal for ${marker} is not closed`);
}

function getGermanTranslations(mainJs) {
  const literal = extractObjectLiteral(mainJs, "const translations =");
  const context = {};
  vm.runInNewContext(`result = (${literal});`, context);
  return context.result.de;
}

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceDataI18n(html, translations) {
  const tokenPattern = /<\/?([a-z0-9]+)\b[^>]*>/gi;
  const voidElements = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  const stack = [];
  const replacements = [];
  let match;

  while ((match = tokenPattern.exec(html))) {
    const token = match[0];
    const tag = match[1].toLowerCase();
    if (token.startsWith("</")) {
      for (let index = stack.length - 1; index >= 0; index -= 1) {
        if (stack[index].tag !== tag) continue;
        const node = stack.splice(index, 1)[0];
        if (node.key && translations[node.key]) {
          replacements.push({ start: node.contentStart, end: match.index, value: translations[node.key] });
        }
        break;
      }
      continue;
    }

    if (voidElements.has(tag) || token.endsWith("/>")) continue;
    const key = token.match(/\bdata-i18n="([^"]+)"/)?.[1];
    stack.push({ tag, key, contentStart: tokenPattern.lastIndex });
  }

  replacements.sort((a, b) => b.start - a.start);
  for (const replacement of replacements) {
    html = html.slice(0, replacement.start) + replacement.value + html.slice(replacement.end);
  }

  return html.replace(/<input\b[^>]*\bdata-i18n-placeholder="([^"]+)"[^>]*>/gi, (tag, key) => {
    if (!translations[key]) return tag;
    return tag.replace(/placeholder="[^"]*"/, `placeholder="${escapeAttr(translations[key])}"`);
  });
}

function setLanguageButtonState(html) {
  return html
    .replace(/<button\b[^>]*\bdata-language="(en|de)"[^>]*>/gi, (tag, language) => {
      const classMatch = tag.match(/\bclass="([^"]*)"/);
      if (!classMatch) return tag;

      const classes = new Set(
        classMatch[1]
          .split(/\s+/)
          .map((item) => item.trim())
          .filter(Boolean),
      );

      if (language === "de") classes.add("active");
      if (language === "en") classes.delete("active");

      return tag.replace(classMatch[0], `class="${Array.from(classes).join(" ")}"`);
    })
    .replace(
      /<span class="lang-flag-current">.*?<\/span>/,
      '<span class="lang-flag-current">🇩🇪</span>',
    );
}

function localizeHead(html) {
  return html
    .replace('<html lang="en">', '<html lang="de">')
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta\n      name="description"\n      content="${escapeAttr(deDescription)}"\n    />`,
    )
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${deTitle}</title>`)
    .replace(
      /<!-- hreflang[\s\S]*?<link\s+rel="alternate"\s+hreflang="x-default"[\s\S]*?\/>/,
      `<!-- hreflang -->\n    <link rel="alternate" hreflang="de" href="https://antalyaviptourism.com/de/" />\n    <link rel="alternate" hreflang="en" href="https://antalyaviptourism.com/" />\n    <link rel="alternate" hreflang="tr" href="https://antalyaviptourism.com/tr/" />\n    <link rel="alternate" hreflang="ru" href="https://antalyaviptourism.com/ru/" />\n    <link\n      rel="alternate"\n      hreflang="x-default"\n      href="https://antalyaviptourism.com/"\n    />`,
    )
    .replace(
      '<link rel="canonical" href="https://antalyaviptourism.com/" />',
      '<link rel="canonical" href="https://antalyaviptourism.com/de/" />',
    )
    .replace(
      '<meta property="og:url" content="https://antalyaviptourism.com/" />',
      '<meta property="og:url" content="https://antalyaviptourism.com/de/" />',
    )
    .replace(
      /property="og:title"\s+content="[^"]*"/,
      `property="og:title"\n      content="${escapeAttr(deTitle)}"`,
    )
    .replace(
      /property="og:description"\s+content="[^"]*"/,
      `property="og:description"\n      content="${escapeAttr(deDescription)}"`,
    )
    .replace('<meta property="og:locale" content="en_GB" />', '<meta property="og:locale" content="de_DE" />')
    .replace(
      /name="twitter:title"\s+content="[^"]*"/,
      `name="twitter:title"\n      content="${escapeAttr(deTitle)}"`,
    )
    .replace(
      /name="twitter:description"\s+content="[^"]*"/,
      `name="twitter:description"\n      content="${escapeAttr(deDescription)}"`,
    );
}

function localizeStructuredData(html, translations) {
  const faqKeys = [
    ["faqOneQ", "faqOneA"],
    ["faqTwoQ", "faqTwoA"],
    ["faqThreeQ", "faqThreeA"],
    ["faqFourQ", "faqFourA"],
    ["faqFiveQ", "faqFiveA"],
  ];

  return html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (match, jsonText) => {
      let data;
      try {
        data = JSON.parse(jsonText);
      } catch {
        return match;
      }

      if (data["@type"] === "TravelAgency") {
        data.logo = "https://antalyaviptourism.com/assets/optimized/logo.png";
        data.image =
          "https://antalyaviptourism.com/assets/optimized/og-antalya-transfer.jpg";
        data.telephone = "+90 530 265 57 90";
        data.priceRange = "€20-€300";
        data.address = {
          "@type": "PostalAddress",
          streetAddress:
            "Belek Mah. Belek 61 Sk. Belek Deniz Apt No: 19 Ic Kapi No: 4",
          addressLocality: "Serik",
          addressRegion: "Antalya",
          addressCountry: "TR",
        };
        data.description =
          "Privater Festpreis-Flughafentransfer vom Flughafen Antalya nach Belek, Side, Kemer, Alanya und zu umliegenden Resorts.";
      }

      if (data["@type"] === "FAQPage") {
        data.mainEntity = faqKeys.map(([questionKey, answerKey]) => ({
          "@type": "Question",
          name: translations[questionKey],
          acceptedAnswer: {
            "@type": "Answer",
            text: translations[answerKey],
          },
        }));
      }

      return `<script type="application/ld+json">\n${JSON.stringify(data, null, 8)}\n    </script>`;
    },
  );
}

function localizeStaticChrome(html) {
  return html
    .replaceAll('aria-label="Antalya VIP Tourism home"', 'aria-label="Antalya VIP Tourism Startseite"')
    .replaceAll('aria-label="Primary navigation"', 'aria-label="Hauptnavigation"')
    .replaceAll('aria-label="Mobile navigation"', 'aria-label="Mobile Navigation"')
    .replaceAll('aria-label="Language selection"', 'aria-label="Sprachauswahl"')
    .replaceAll('aria-label="Language"', 'aria-label="Sprache"')
    .replaceAll('aria-label="Change language"', 'aria-label="Sprache ändern"')
    .replaceAll('aria-label="Open menu"', 'aria-label="Menü öffnen"')
    .replaceAll('English · Deutsch · Türkçe', 'Deutsch · English · Türkçe')
    .replaceAll('aria-label="Route prices from Antalya Airport"', 'aria-label="Transferpreise ab Flughafen Antalya"')
    .replaceAll('Minimum prices shown', 'Mindestpreise angezeigt')
    .replaceAll('Previous routes', 'Vorherige Routen')
    .replaceAll('Next routes', 'Nächste Routen')
    .replaceAll('Antalya Airport transfer routes', 'Transferrouten ab Flughafen Antalya')
    .replaceAll('From</span><strong>', 'Ab</span><strong>')
    .replaceAll('Antalya Airport <span>→</span>', 'Flughafen Antalya <span>→</span>')
    .replaceAll('Antalya City', 'Antalya Stadt')
    .replaceAll('href="/impressum.html"', 'href="/de/impressum/"')
    .replaceAll('href="/privacy/"', 'href="/de/datenschutz/"')
    .replaceAll('>Privacy</a>', '>Datenschutz</a>');
}

function localizeRouteLinks(html) {
  const routes = [
    "antalya",
    "belek",
    "side",
    "kemer",
    "alanya",
    "bogazkent",
    "manavgat",
    "tekirova",
    "bodrum",
    "dalaman",
    "fethiye",
    "pamukkale",
    "kapadokya",
  ];

  for (const route of routes) {
    html = html.replaceAll(`/transfers/${route}/`, `/de/transfers/${route}/`);
  }

  return html;
}

const [html, mainJs] = await Promise.all([
  readFile(sourceHtmlPath, "utf8"),
  readFile(mainJsPath, "utf8"),
]);

const translations = getGermanTranslations(mainJs);
let output = localizeHead(html);
output = replaceDataI18n(output, translations);
output = localizeStructuredData(output, translations);
output = setLanguageButtonState(output);
output = localizeStaticChrome(output);
output = localizeRouteLinks(output);

await mkdir(path.dirname(targetHtmlPath), { recursive: true });
await writeFile(targetHtmlPath, output);

console.log("Generated de/index.html");
