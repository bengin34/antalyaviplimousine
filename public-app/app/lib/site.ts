/**
 * Site-wide constants that client code needs at runtime.
 *
 * Deliberately free of data imports: anything a component or a route's
 * `meta` export reads ships to the browser, so this module must stay small.
 * The heavy SEO copy lives in ./seo and is only imported from loaders.
 */
export const domain = "https://antalyaviptourism.com";
export const indexableLanguages = ["en", "de", "fr", "tr", "ru", "cs", "uk", "ur", "pl", "nl", "ar", "sv", "da", "el", "es", "he", "hu", "it", "ja", "ko", "pt", "ro", "zh"] as const;
export type IndexableLanguage = (typeof indexableLanguages)[number];

export const languageFromPath = (pathname: string): IndexableLanguage => {
  const candidate = pathname.split("/").filter(Boolean)[0];
  return (indexableLanguages as readonly string[]).includes(candidate ?? "")
    ? (candidate as IndexableLanguage)
    : "en";
};
