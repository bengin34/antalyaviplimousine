/**
 * The COP31 page's languages and URLs without its copy, so the opening dialog
 * on every page can link to it cheaply. Mirrors `cop31Languages` in
 * src/public-paths.js, which prerenders and lists these URLs; a test keeps the
 * two in step.
 */
export const cop31Languages = ["en", "tr", "de", "fr", "ru", "ar", "es"] as const;
export type Cop31Language = (typeof cop31Languages)[number];

/** Narrows any site language to one with COP31 copy, English otherwise. */
export const cop31LanguageFor = (language: string): Cop31Language =>
  (cop31Languages as readonly string[]).includes(language) ? language as Cop31Language : "en";

export const cop31Path = (language: Cop31Language) => `${language === "en" ? "" : `/${language}`}/cop31/`;

/** The dialog stops once the summit's last day is over in Antalya. */
export const COP31_DIALOG_LAST_DAY = "2026-11-20";

/** The dialog shows until the summit ends, never on the COP31 page itself, and once per visitor. */
export function shouldShowCop31Dialog(pathname: string, turkeyDate: string, dismissed: boolean) {
  if (dismissed || turkeyDate > COP31_DIALOG_LAST_DAY) return false;
  const segments = pathname.split("/").filter(Boolean);
  // The clinic page is a separate Turkish-language offer with its own audience.
  return !segments.includes("cop31") && segments[0] !== "clinic";
}
