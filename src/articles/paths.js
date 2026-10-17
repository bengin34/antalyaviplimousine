/**
 * URL helpers for the blog, kept apart from the catalogue so client code can
 * build blog links without importing any article text. ./index.js re-exports
 * them.
 */

/** The language prefix used everywhere in the public site. */
export const languagePrefix = (language) => (language === "en" ? "" : `/${language}`);

export const blogPath = (language) => `${languagePrefix(language)}/blog/`;
