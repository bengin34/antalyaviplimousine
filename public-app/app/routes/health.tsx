import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { CookieConsent } from "../components/CookieConsent";
import { HealthPage } from "../components/HealthPage";
import healthStyles from "../health.css?url";
import { LanguageProvider } from "../i18n";
import { domain, healthMeta, languageFromPath } from "../lib/seo";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: healthStyles },
];

export function loader({ request }: { request: Request }) {
  return { language: languageFromPath(new URL(request.url).pathname) };
}

export const meta = ({ loaderData, matches }: { loaderData?: ReturnType<typeof loader>; matches?: Array<{ id: string }> }) => {
  const metas = healthMeta(loaderData?.language ?? "en");
  if (!matches) return metas;
  const id = matches.find((m) => m.id.startsWith("health-"))?.id ?? "";
  const lang = id.replace("health-", "") || "en";
  const canonical = lang === "en" ? `${domain}/health/` : `${domain}/${lang}/health/`;
  return metas.map((m) =>
    (m as Record<string, string>).tagName === "link" && (m as Record<string, string>).rel === "canonical"
      ? { ...(m as object), href: canonical }
      : m,
  );
};

export default function HealthRoute() {
  const { language } = useLoaderData<typeof loader>();

  return (
    <LanguageProvider initialLanguage={language}>
      <HealthPage />
      <CookieConsent />
    </LanguageProvider>
  );
}
