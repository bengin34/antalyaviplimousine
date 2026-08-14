import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import translationData from "./generated/legacy-translations.json";
import videoTranslationData from "./video-translations.json";
import { resolvePriceTokens } from "../../src/prices.js";

export const languageOptions = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "tr", flag: "🇹🇷", label: "Türkçe" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
  { code: "pl", flag: "🇵🇱", label: "Polski" },
  { code: "nl", flag: "🇳🇱", label: "Nederlands" },
  { code: "uk", flag: "🇺🇦", label: "Українська" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "sv", flag: "🇸🇪", label: "Svenska" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
] as const;

export type LanguageCode = (typeof languageOptions)[number]["code"];

const supportedLanguages = new Set(languageOptions.map(({ code }) => code));
const indexableLanguages = new Set(["en", "de", "tr", "ru"]);
const legacyResources = translationData.resources as Record<string, Record<string, string>>;
const videoResources = videoTranslationData.resources as Record<string, Record<string, string>>;
const rawResources = Object.fromEntries(
  Object.entries(legacyResources).map(([language, translation]) => [
    language,
    { ...translation, ...(videoResources[language] || {}) },
  ]),
);

const i18n = i18next.createInstance();
void i18n.init({
  fallbackLng: "en",
  initAsync: false,
  interpolation: { escapeValue: false },
  lng: "en",
  resources: Object.fromEntries(
    Object.entries(rawResources).map(([language, translation]) => [language, { translation }]),
  ),
});

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
  const localizedMatch = normalized.match(/^\/(de|tr|ru)(\/.*)?$/);
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
}: {
  children: ReactNode;
  initialLanguage: string;
}) {
  const routeLanguage = normalizeLanguage(initialLanguage);
  const [language, setLanguage] = useState<LanguageCode>(routeLanguage);

  useEffect(() => {
    if (indexableLanguages.has(routeLanguage) && routeLanguage !== "en") return;
    try {
      setLanguage(normalizeLanguage(localStorage.getItem("avl-language") || browserLanguage()));
    } catch {
      setLanguage(browserLanguage());
    }
  }, [routeLanguage]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
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
    setLanguage(nextLanguage);
  }, []);

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
