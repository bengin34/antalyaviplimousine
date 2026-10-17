/**
 * Blog chrome per language, assembled from the per-language translation
 * files - their `chrome` export only, so the article bodies stay out of any
 * bundle that needs just the chrome. `minReadLabel` is stored as a template
 * so the translation files stay plain data; the callable `minRead` is built
 * here.
 */
import { languageOrder } from "./languages.js";
import { chromeByLanguage } from "./translations/chrome.js";

export const blogCopy = Object.freeze(
  Object.fromEntries(
    languageOrder.map((language) => {
      const { minReadLabel, ...chrome } = chromeByLanguage[language];
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
    languageOrder.map((language) => [language, chromeByLanguage[language].locale]),
  ),
);
