import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { CookieConsent } from "../components/CookieConsent";
import { HealthPage } from "../components/HealthPage";
import healthStyles from "../health.css?url";
import { LanguageProvider } from "../i18n";
import { healthMeta, languageFromPath } from "../lib/seo";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: healthStyles },
];

export function loader({ request }: { request: Request }) {
  return { language: languageFromPath(new URL(request.url).pathname) };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) =>
  healthMeta(loaderData?.language ?? "en");

export default function HealthRoute() {
  const { language } = useLoaderData<typeof loader>();

  return (
    <LanguageProvider initialLanguage={language}>
      <HealthPage />
      <CookieConsent />
    </LanguageProvider>
  );
}
