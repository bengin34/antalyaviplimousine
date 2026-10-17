/**
 * The blog's languages on their own, without any article text, so client
 * code can ask "is this a blog language?" without pulling in the catalogue.
 * ./translations/index.js re-exports this list.
 *
 * Ordered by visitors arriving at Antalya Airport from each market rather
 * than alphabetically: Russia, Germany, the UK, Poland and Ukraine lead, and
 * the tail is where a guide earns the least. Arabic covers the Gulf and
 * Egypt, which book late and land at night - the two things these guides
 * answer. Every language the public site serves is now covered.
 */
export const languageOrder = Object.freeze([
  "ru", "de", "en", "pl", "uk", "nl", "cs", "ro", "tr", "he", "fr", "sv",
  "da", "ar", "hu", "es", "it", "pt", "el", "zh", "ko", "ja", "ur",
]);
