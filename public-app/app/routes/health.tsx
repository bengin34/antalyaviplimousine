import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { CookieConsent } from "../components/CookieConsent";
import { HealthPage } from "../components/HealthPage";
import healthStyles from "../health.css?url";
import { LanguageProvider } from "../i18n";
import { pageMessages } from "../lib/page-data.server";
import { healthMeta } from "../lib/seo";
import { domain, languageFromPath } from "../lib/site";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: healthStyles },
];

export function loader({ request }: { request: Request }) {
  const language = languageFromPath(new URL(request.url).pathname);
  return { language, meta: healthMeta(language), messages: pageMessages(language) };
}

export const meta = ({ loaderData, matches }: { loaderData?: ReturnType<typeof loader>; matches?: Array<{ id: string }> }) => {
  const metas = loaderData?.meta ?? [];
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
  const { language, messages } = useLoaderData<typeof loader>();

  return (
    <LanguageProvider initialLanguage={language} messages={messages}>
      <HealthPage />
      <CookieConsent />
    </LanguageProvider>
  );
}
