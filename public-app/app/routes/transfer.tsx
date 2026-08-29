import { useLoaderData } from "react-router";
import { localizedRoute, routeCatalog } from "../../../src/routes.js";
import { CookieConsent } from "../components/CookieConsent";
import { TransferPage } from "../components/TransferPage";
import { LanguageProvider } from "../i18n";
import { domain, languageFromPath, routeMeta, type IndexableLanguage } from "../lib/seo";

const indexedLanguages = new Set(["en", "de", "tr", "ru", "cs", "fr", "uk", "ur"]);

export function loader({ params }: { params: Record<string, string | undefined> }) {
  const language = (params.language && indexedLanguages.has(params.language)
    ? params.language
    : "en") as IndexableLanguage;
  const slug = params.slug ?? "";
  if (!routeCatalog[slug as keyof typeof routeCatalog]) throw new Response("Not found", { status: 404 });
  return { language, route: localizedRoute(slug, language) };
}

export const meta = ({ loaderData, params }: { loaderData?: ReturnType<typeof loader>; params?: Record<string, string | undefined> }) => {
  const metas = routeMeta(loaderData?.language ?? "en", loaderData?.route?.slug ?? "antalya");
  const urlLang = params?.language;
  if (!urlLang || indexedLanguages.has(urlLang)) return metas;
  const slug = loaderData?.route?.slug ?? params?.slug ?? "antalya";
  const canonical = `${domain}/${urlLang}/transfers/${slug}/`;
  return metas.map((m) =>
    (m as Record<string, string>).tagName === "link" && (m as Record<string, string>).rel === "canonical"
      ? { ...(m as object), href: canonical }
      : m,
  );
};

export default function TransferRoute() {
  const { language, route } = useLoaderData<typeof loader>();
  if (!route) return null;
  return <LanguageProvider initialLanguage={language}><TransferPage language={language} route={route} /><CookieConsent /></LanguageProvider>;
}
