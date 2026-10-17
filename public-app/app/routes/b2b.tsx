import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { B2bPage } from "../components/B2bPage";
import { CookieConsent } from "../components/CookieConsent";
import b2bStyles from "../b2b.css?url";
import { LanguageProvider } from "../i18n";
import { pageMessages } from "../lib/page-data.server";
import { b2bMeta } from "../lib/seo";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: b2bStyles },
];

export function loader() {
  return { language: "en" as const, meta: b2bMeta(), messages: pageMessages("en") };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => loaderData?.meta ?? [];

export default function B2bRoute() {
  const { messages } = useLoaderData<typeof loader>();
  return (
    <LanguageProvider initialLanguage="en" messages={messages}>
      <B2bPage />
      <CookieConsent />
    </LanguageProvider>
  );
}
