/**
 * Blog chrome per language, assembled from the per-language translation
 * files. `minReadLabel` is stored as a template so the translation files stay
 * plain data; the callable `minRead` is built here.
 */
import { languageOrder, translations } from "./translations/index.js";

export const blogCopy = Object.freeze(
  Object.fromEntries(
    languageOrder.map((language) => {
      const { minReadLabel, ...chrome } = translations[language].chrome;
      return [
        language,
        Object.freeze({
          ...chrome,
          minRead: (minutes) => minReadLabel.replace("{minutes}", String(minutes)),
        }),
      ];
    }),
  ),
);

export const blogLocale = Object.freeze(
  Object.fromEntries(
    languageOrder.map((language) => [language, translations[language].chrome.locale]),
  ),
);
