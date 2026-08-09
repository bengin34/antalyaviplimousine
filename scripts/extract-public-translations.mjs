import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { JSDOM } from "jsdom";

const root = process.cwd();

function extractObject(source, variableName) {
  const marker = `const ${variableName} =`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`${variableName} object could not be found`);
  const start = source.indexOf("{", markerIndex);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") quote = character;
    else if (character === "{") depth += 1;
    else if (character === "}" && --depth === 0) {
      const context = {};
      vm.runInNewContext(`result = (${source.slice(start, index + 1)});`, context);
      return context.result;
    }
  }

  throw new Error(`${variableName} object could not be parsed`);
}

const [source, homepage] = await Promise.all([
  readFile(path.join(root, "src", "main.js"), "utf8"),
  readFile(path.join(root, "index.html"), "utf8"),
]);
const translations = extractObject(source, "translations");
const paymentTranslations = extractObject(source, "paymentTranslations");
const tripTranslations = extractObject(source, "tripTranslations");
const document = new JSDOM(homepage).window.document;
const english = {};

for (const element of document.querySelectorAll("[data-i18n]")) {
  const key = element.getAttribute("data-i18n");
  const value = [...element.childNodes]
    .map((node) => node.nodeName === "BR" ? "<br />" : node.textContent || "")
    .join("")
    .trim()
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/\s*<br \/>\s*/g, "<br />");
  if (key && value && !english[key]) english[key] = value;
}
for (const element of document.querySelectorAll("[data-i18n-placeholder]")) {
  const key = element.getAttribute("data-i18n-placeholder");
  const value = element.getAttribute("placeholder");
  if (key && value) english[key] = value;
}

const resources = { en: { ...english, ...paymentTranslations.en, ...tripTranslations.en } };
for (const [language, copy] of Object.entries(translations)) {
  resources[language] = {
    ...resources.en,
    ...tripTranslations.en,
    ...copy,
    ...(paymentTranslations[language] || {}),
    ...(tripTranslations[language] || {}),
  };
}
const output = path.join(root, "public-app", "app", "generated", "legacy-translations.json");

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify({ resources }, null, 2)}\n`);
console.log(`Extracted ${Object.keys(resources).length} public languages`);
