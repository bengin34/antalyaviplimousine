import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { ClinicPage } from "../components/ClinicPage";
import { CookieConsent } from "../components/CookieConsent";
import clinicStyles from "../clinic.css?url";
import { LanguageProvider } from "../i18n";
import { pageMessages } from "../lib/page-data.server";
import { clinicMeta } from "../lib/seo";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: clinicStyles },
];

export function loader() {
  return { language: "tr" as const, meta: clinicMeta(), messages: pageMessages("tr") };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => loaderData?.meta ?? [];

export default function ClinicRoute() {
  const { messages } = useLoaderData<typeof loader>();
  return (
    <LanguageProvider initialLanguage="tr" messages={messages}>
      <ClinicPage />
      <CookieConsent />
    </LanguageProvider>
  );
}
