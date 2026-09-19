import type { LinksFunction } from "react-router";
import { B2bPage } from "../components/B2bPage";
import { CookieConsent } from "../components/CookieConsent";
import b2bStyles from "../b2b.css?url";
import { LanguageProvider } from "../i18n";
import { b2bMeta } from "../lib/seo";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: b2bStyles },
];

export function loader() {
  return { language: "en" as const };
}

export const meta = () => b2bMeta();

export default function B2bRoute() {
  return (
    <LanguageProvider initialLanguage="en">
      <B2bPage />
      <CookieConsent />
    </LanguageProvider>
  );
}
