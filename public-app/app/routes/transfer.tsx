import { useLoaderData } from "react-router";
import { localizedRoute, routeCatalog } from "../../../src/routes.js";
import { CookieConsent } from "../components/CookieConsent";
import { TransferPage } from "../components/TransferPage";
import { LanguageProvider } from "../i18n";
import { languageFromPath, routeMeta, type IndexableLanguage } from "../lib/seo";

const languages = new Set(["en", "de", "tr", "ru"]);

export function loader({ request, params }: { request: Request; params: Record<string, string | undefined> }) {
  const language = (params.language && languages.has(params.language)
    ? params.language
    : languageFromPath(new URL(request.url).pathname)) as IndexableLanguage;
  const slug = params.slug ?? "";
  if (!routeCatalog[slug as keyof typeof routeCatalog]) throw new Response("Not found", { status: 404 });
  return { language, route: localizedRoute(slug, language) };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => routeMeta(loaderData?.language ?? "en", loaderData?.route?.slug ?? "antalya");

export default function TransferRoute() {
  const { language, route } = useLoaderData<typeof loader>();
  if (!route) return null;
  return <LanguageProvider initialLanguage={language}><TransferPage language={language} route={route} /><CookieConsent /></LanguageProvider>;
}
