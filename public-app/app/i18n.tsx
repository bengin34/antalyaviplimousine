import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import videoTranslationData from "./video-translations.json";
import { resolvePriceTokens } from "../../src/prices.js";

export const languageOptions = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "tr", flag: "🇹🇷", label: "Türkçe" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
  { code: "cs", flag: "🇨🇿", label: "Čeština" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
  { code: "pl", flag: "🇵🇱", label: "Polski" },
  { code: "nl", flag: "🇳🇱", label: "Nederlands" },
  { code: "uk", flag: "🇺🇦", label: "Українська" },
  { code: "ur", flag: "🇵🇰", label: "اردو" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "sv", flag: "🇸🇪", label: "Svenska" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
  { code: "zh", flag: "🇨🇳", label: "简体中文" },
  { code: "da", flag: "🇩🇰", label: "Dansk" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "el", flag: "🇬🇷", label: "Ελληνικά" },
  { code: "he", flag: "🇮🇱", label: "עברית" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "hu", flag: "🇭🇺", label: "Magyar" },
  { code: "pt", flag: "🇵🇹", label: "Português" },
  { code: "ro", flag: "🇷🇴", label: "Română" },
] as const;

export type LanguageCode = (typeof languageOptions)[number]["code"];

const supportedLanguages = new Set(languageOptions.map(({ code }) => code));
const indexableLanguages = new Set(["en", "de", "tr", "ru", "cs", "uk", "ur", "fr", "pl", "nl", "ar", "sv", "da", "el", "es", "he", "hu", "it", "ja", "ko", "pt", "ro", "zh"]);
const videoResources = videoTranslationData.resources as Record<string, Record<string, string>>;

/** One language's UI strings, as generated into ./generated/translations/. */
export type Messages = Record<string, string>;

/**
 * Every language's dictionary as a lazy chunk. A page renders with the one
 * dictionary its loader passed in; the others are fetched only when the
 * visitor switches language without leaving the page.
 */
const dictionaryLoaders = import.meta.glob<Messages>("./generated/translations/*.json", { import: "default" });

const i18n = i18next.createInstance();
void i18n.init({
  fallbackLng: "en",
  initAsync: false,
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {},
});

/**
 * Each generated dictionary already contains every English key, so English
 * is only needed as a fallback for the video strings, which are translated
 * into fewer languages; they are merged here, with the language's own video
 * strings on top as before.
 */
function addDictionary(language: string, messages: Messages) {
  if (i18n.hasResourceBundle(language, "translation")) return;
  i18n.addResourceBundle(language, "translation", {
    ...(videoResources.en || {}),
    ...messages,
    ...(videoResources[language] || {}),
  });
}

async function loadDictionary(language: LanguageCode) {
  if (i18n.hasResourceBundle(language, "translation")) return;
  const load = dictionaryLoaders[`./generated/translations/${language}.json`];
  if (!load) throw new Error(`No dictionary for ${language}`);
  addDictionary(language, await load());
}

type LanguageContextValue = {
  language: LanguageCode;
  selectLanguage: (language: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const normalizeLanguage = (value: string | null | undefined): LanguageCode =>
  supportedLanguages.has(value as LanguageCode) ? value as LanguageCode : "en";

const browserLanguage = () => {
  if (typeof navigator === "undefined") return "en";
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    const language = normalizeLanguage(candidate?.split("-")[0].toLowerCase());
    if (language !== "en" || candidate?.toLowerCase().startsWith("en")) return language;
  }
  return "en";
};

function localizedPath(pathname: string, language: LanguageCode) {
  if (!indexableLanguages.has(language)) return null;
  const normalized = pathname.endsWith("/") || pathname.endsWith(".html")
    ? pathname
    : `${pathname}/`;
  const localizedMatch = normalized.match(/^\/(de|tr|ru|cs|uk|ur|fr|pl|nl|ar|sv)(\/.*)?$/);
  const basePath = localizedMatch ? localizedMatch[2] || "/" : normalized;
  if (
    basePath !== "/" &&
    basePath !== "/health/" &&
    !basePath.startsWith("/transfers/")
  ) return null;
  return `${language === "en" ? "" : `/${language}`}${basePath}`;
}

export function LanguageProvider({
  children,
  initialLanguage,
  messages,
}: {
  children: ReactNode;
  initialLanguage: string;
  /** The route language's dictionary, from the route loader (pageMessages). */
  messages: Messages;
}) {
  const routeLanguage = normalizeLanguage(initialLanguage);
  // Synchronous, so the prerendered HTML and the hydrating client render the
  // same text from the very first pass.
  addDictionary(routeLanguage, messages);
  const [language, setLanguage] = useState<LanguageCode>(routeLanguage);
  const latestRequest = useRef(0);

  /** Switches once the dictionary is in, so no text flashes in English. */
  const switchLanguage = useCallback((nextLanguage: LanguageCode) => {
    const request = ++latestRequest.current;
    loadDictionary(nextLanguage).then(
      () => {
        if (request === latestRequest.current) setLanguage(nextLanguage);
      },
      () => {
        // The chunk could not be fetched (offline, or a deploy replaced it):
        // keep the page in the language it is already showing.
      },
    );
  }, []);

  useEffect(() => {
    if (indexableLanguages.has(routeLanguage) && routeLanguage !== "en") return;
    let detected: LanguageCode;
    try {
      detected = normalizeLanguage(localStorage.getItem("avl-language") || browserLanguage());
    } catch {
      detected = browserLanguage();
    }
    switchLanguage(detected);
  }, [routeLanguage, switchLanguage]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = ["ar", "ur", "he"].includes(language) ? "rtl" : "ltr";
  }, [language]);

  const selectLanguage = useCallback((nextLanguage: LanguageCode) => {
    try {
      localStorage.setItem("avl-language", nextLanguage);
    } catch {
      // The selection remains active for this page when storage is unavailable.
    }

    const target = typeof window === "undefined"
      ? null
      : localizedPath(window.location.pathname, nextLanguage);
    if (target && target !== window.location.pathname) {
      window.location.assign(`${target}${window.location.hash}`);
      return;
    }
    switchLanguage(nextLanguage);
  }, [switchLanguage]);

  const t = useCallback((key: string, fallback = key) => {
    const value = i18n.getFixedT(language)(key, { defaultValue: fallback });
    return resolvePriceTokens(String(value));
  }, [language]);

  const value = useMemo(() => ({ language, selectLanguage, t }), [language, selectLanguage, t]);

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
    </I18nextProvider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function LineBreakText({ value }: { value: string }) {
  return value.split(/<br\s*\/?>/i).map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 && <br />}
      {part}
    </span>
  ));
}
