/**
 * Hotel name matching for the booking form.
 *
 * Guests type the hotel name in their own language and spelling: "Rixos
 * Premium Belek", "Delfin Imperial", "Титаник Бич Лара". Matching therefore
 * runs on a folded form of the text — diacritics removed, Cyrillic
 * transliterated, punctuation dropped — plus a phonetic key that reconciles
 * the spellings the same sound gets across those languages (ph/f, c/k, w/v,
 * x/ks, y/i). Tokens are compared by prefix so a partial name ("rixos belek")
 * finds the hotel without collapsing distinct ones ("Side Star Beach" vs
 * "Side Star Resort").
 *
 * Everything here is pure and synchronous: the index ships in the bundle, so
 * search costs no network round-trip and no API budget.
 */
import { hotelIndex } from "./hotel-index.js";

/** Letters that survive Unicode decomposition and still need folding. */
const LETTER_FOLD = { "ı": "i", "ß": "ss", "æ": "ae", "ø": "o", "đ": "d", "ł": "l", "þ": "th" };

/** Cyrillic transliteration, wide enough for Russian and Ukrainian spellings. */
const CYRILLIC_FOLD = {
  "а": "a", "б": "b", "в": "v", "г": "g", "ґ": "g", "д": "d", "е": "e", "ё": "e", "є": "e",
  "ж": "zh", "з": "z", "и": "i", "і": "i", "ї": "i", "й": "i", "к": "k", "л": "l", "м": "m",
  "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h",
  "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sch", "ъ": "", "ы": "y", "ь": "", "э": "e",
  "ю": "yu", "я": "ya",
};

/**
 * Folds a hotel name or a guest's query into a comparable ASCII form.
 * `İstanbul` → `istanbul`, `Kumköy` → `kumkoy`, `Титаник` → `titanik`.
 */
export function foldHotelText(value) {
  const lowered = String(value ?? "").replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();
  let folded = "";
  for (const character of lowered.normalize("NFD").replace(/\p{M}+/gu, "")) {
    folded += CYRILLIC_FOLD[character] ?? LETTER_FOLD[character] ?? character;
  }
  return folded.replace(/[^a-z0-9]+/g, " ").trim();
}

/**
 * Collapses spellings that sound alike across our guests' languages, so
 * "Delphin" and "Delfin", or "Xanadu" and "Ksanadu", share one key.
 */
export const phoneticKey = (folded) => folded
  .replace(/ph/g, "f")
  .replace(/ck/g, "k")
  .replace(/[cq]/g, "k")
  .replace(/w/g, "v")
  .replace(/x/g, "ks")
  .replace(/y/g, "i")
  .replace(/(.)\1+/g, "$1");

/** Splits text into `{ raw, key }` tokens, dropping punctuation and blanks. */
const tokenize = (value) =>
  foldHotelText(value).split(" ").filter(Boolean).map((raw) => ({ raw, key: phoneticKey(raw) }));

/** Levenshtein distance, capped: returns `limit + 1` as soon as it is exceeded. */
function editDistance(a, b, limit) {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
      if (current[j] < best) best = current[j];
    }
    if (best > limit) return limit + 1;
    previous = current;
  }
  return previous[b.length];
}

/**
 * How well one query token matches one hotel token: 2 for a literal prefix,
 * 1 for a phonetic prefix or a single-character typo, 0 for no match.
 */
function tokenAffinity(queryToken, hotelToken) {
  if (hotelToken.raw.startsWith(queryToken.raw)) return 2;
  // A phonetic key can be much shorter than the text it came from ("zzzz" → "z"),
  // so only trust it as a prefix once it carries at least two characters.
  if (queryToken.key.length < 2) return 0;
  if (hotelToken.key.startsWith(queryToken.key)) return 1;
  if (queryToken.key.length >= 4 && editDistance(queryToken.key, hotelToken.key.slice(0, queryToken.key.length + 1), 1) <= 1) return 1;
  return 0;
}

/** Precomputes the token fields a hotel is matched on. Built once per index. */
const prepareEntries = (index) => index.map((hotel) => ({
  hotel,
  foldedName: foldHotelText(hotel.name),
  fields: [
    { tokens: tokenize(hotel.name), weight: 60 },
    ...hotel.aliases.map((alias) => ({ tokens: tokenize(alias), weight: 45 })),
    { tokens: tokenize(hotel.district), weight: 20 },
  ],
}));

const preparedCache = new WeakMap();
const preparedFor = (index) => {
  const cached = preparedCache.get(index);
  if (cached) return cached;
  const prepared = prepareEntries(index);
  preparedCache.set(index, prepared);
  return prepared;
};

/** Best score any of a hotel's tokens gives this query token, or 0 for no match. */
function bestTokenScore(entry, queryToken) {
  let best = 0;
  for (const field of entry.fields) {
    for (const hotelToken of field.tokens) {
      const affinity = tokenAffinity(queryToken, hotelToken);
      if (affinity === 0) continue;
      const candidate = field.weight + affinity * 5 + (hotelToken.raw === queryToken.raw ? 10 : 0);
      if (candidate > best) best = candidate;
    }
  }
  return best;
}

/**
 * Scores one hotel against the query. `minimumMatched` is how many of the
 * query's tokens must land: the strict pass demands all of them, the relaxed
 * fallback pass accepts a majority so that a guest transliterating a word we
 * cannot fold ("Бич" for "Beach") still finds their hotel.
 */
function scoreEntry(entry, queryTokens, foldedQuery, minimumMatched) {
  let score = 0;
  let matched = 0;
  for (const queryToken of queryTokens) {
    const best = bestTokenScore(entry, queryToken);
    if (best === 0) continue;
    matched += 1;
    score += best;
  }
  if (matched < minimumMatched) return null;
  score -= (queryTokens.length - matched) * 25;
  if (entry.foldedName === foldedQuery) score += 400;
  else if (entry.foldedName.startsWith(foldedQuery)) score += 150;
  if (entry.hotel.status === "verified") score += 5;
  // Prefer the shorter of two otherwise equal names, so "Side Star Beach"
  // does not outrank "Side Star" for the query "side star".
  return score - entry.foldedName.length / 100;
}

const rank = (prepared, queryTokens, foldedQuery, minimumMatched, limit) => {
  const scored = [];
  for (const entry of prepared) {
    const score = scoreEntry(entry, queryTokens, foldedQuery, minimumMatched);
    if (score !== null) scored.push({ hotel: entry.hotel, score });
  }
  scored.sort((a, b) => b.score - a.score || a.hotel.name.localeCompare(b.hotel.name, "tr"));
  return scored.slice(0, limit).map((match) => match.hotel);
};

/**
 * Finds hotels matching a free-text query, best match first.
 * A query shorter than two characters returns nothing: the guest is still
 * typing, and a list of arbitrary hotels would only be noise.
 */
export function searchHotels(query, { limit = 8, index = hotelIndex } = {}) {
  const foldedQuery = foldHotelText(query);
  if (foldedQuery.length < 2) return [];
  const queryTokens = tokenize(foldedQuery);
  const prepared = preparedFor(index);

  const strict = rank(prepared, queryTokens, foldedQuery, queryTokens.length, limit);
  if (strict.length > 0 || queryTokens.length < 2) return strict;
  return rank(prepared, queryTokens, foldedQuery, Math.ceil(queryTokens.length / 2), limit);
}

/**
 * Resolves a typed hotel name to a single hotel when the match is unambiguous,
 * so a guest who types the full name and never opens the suggestion list still
 * gets their region pre-selected. Returns `null` when the answer is uncertain.
 */
export function resolveHotelRegion(query, options = {}) {
  const matches = searchHotels(query, { ...options, limit: 2 });
  if (matches.length === 0) return null;
  if (matches.length > 1 && foldHotelText(matches[0].name) !== foldHotelText(query)) return null;
  return matches[0];
}
