import { useLoaderData } from "react-router";
import { CookieConsent } from "../components/CookieConsent";
import { HomePage } from "../components/HomePage";
import { LanguageProvider } from "../i18n";
import { domain, homeMeta, languageFromPath } from "../lib/seo";
import type { IndexableLanguage } from "../lib/seo";

const routeCanonical = (matches: Array<{ id: string }>, prefix: string): string => {
  const id = matches.find((m) => m.id.startsWith(prefix))?.id ?? "";
  const lang = id.replace(prefix, "") || "en";
  return lang === "en" ? `${domain}/` : `${domain}/${lang}/`;
};

export function loader({ request }: { request: Request }) {
  return { language: languageFromPath(new URL(request.url).pathname) };
}

export const meta = ({ loaderData, matches }: { loaderData?: ReturnType<typeof loader>; matches?: Array<{ id: string }> }) => {
  const metas = homeMeta(loaderData?.language ?? "en");
  if (!matches) return metas;
  const canonical = routeCanonical(matches, "home-");
  return metas.map((m) =>
    (m as Record<string, string>).tagName === "link" && (m as Record<string, string>).rel === "canonical"
      ? { ...(m as object), href: canonical }
      : m,
  );
};

export default function HomeRoute() {
  const { language } = useLoaderData<typeof loader>();
  return <LanguageProvider initialLanguage={language as IndexableLanguage}><HomePage initialLanguage={language as IndexableLanguage} /><CookieConsent /></LanguageProvider>;
}
