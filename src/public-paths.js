import { publicRouteSlugs } from "./routes.js";

export const publicLanguages = Object.freeze(["en", "de", "tr", "ru"]);

export const legalPaths = Object.freeze([
  "/impressum.html",
  "/privacy/",
  "/de/datenschutz/",
  "/de/impressum/",
  "/tr/gizlilik/",
  "/tr/kunye/",
  "/ru/privacy/",
  "/ru/impressum/",
]);

export const languagePrefix = (language) => language === "en" ? "" : `/${language}`;

export const homePaths = Object.freeze(
  publicLanguages.map((language) => `${languagePrefix(language)}/`),
);

export const transferPaths = Object.freeze(
  publicLanguages.flatMap((language) =>
    publicRouteSlugs.map((slug) => `${languagePrefix(language)}/transfers/${slug}/`),
  ),
);

export const prerenderPaths = Object.freeze([
  ...homePaths,
  ...transferPaths,
  ...legalPaths,
]);
