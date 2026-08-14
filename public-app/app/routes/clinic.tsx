import type { LinksFunction } from "react-router";
import { ClinicPage } from "../components/ClinicPage";
import { CookieConsent } from "../components/CookieConsent";
import clinicStyles from "../clinic.css?url";
import { LanguageProvider } from "../i18n";
import { clinicMeta } from "../lib/seo";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: clinicStyles },
];

export function loader() {
  return { language: "tr" as const };
}

export const meta = () => clinicMeta();

export default function ClinicRoute() {
  return (
    <LanguageProvider initialLanguage="tr">
      <ClinicPage />
      <CookieConsent />
    </LanguageProvider>
  );
}
