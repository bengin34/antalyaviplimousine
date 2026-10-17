/**
 * The excursion's languages and URLs, without its copy, so the airport
 * booking form can link to the excursion page without loading the copy of
 * all 23 languages. ./land-of-legends-copy re-exports these.
 */
export const landOfLegendsLanguages = ["en", "de", "fr", "tr", "ru", "cs", "uk", "ur", "pl", "nl", "ar", "sv", "da", "el", "es", "he", "hu", "it", "ja", "ko", "pt", "ro", "zh"] as const;
export type LandOfLegendsLanguage = (typeof landOfLegendsLanguages)[number];

/** Narrows any site language to one with excursion copy, English otherwise. */
export const landOfLegendsLanguageFor = (language: string): LandOfLegendsLanguage =>
  (landOfLegendsLanguages as readonly string[]).includes(language) ? language as LandOfLegendsLanguage : "en";

export const landOfLegendsPath = (language: LandOfLegendsLanguage) =>
  `${language === "en" ? "" : `/${language}`}/land-of-legends/`;
