import { useLoaderData } from "react-router";
import { CookieConsent } from "../components/CookieConsent";
import { LegalPage } from "../components/LegalPage";
import legalData from "../generated/legal-copy.json";
import { LanguageProvider } from "../i18n";
import { languageFromPath, type IndexableLanguage } from "../lib/seo";

export function loader({ request }: { request: Request }) {
  const pathname = new URL(request.url).pathname;
  const language = languageFromPath(pathname);
  const privacy = /privacy|datenschutz|gizlilik/.test(pathname);
  return { language, privacy };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => {
  const language = loaderData?.language ?? "en";
  const key = `${language}-${loaderData?.privacy ? "privacy" : "imprint"}` as keyof typeof legalData;
  const page = legalData[key] ?? legalData["en-imprint"];
  return [
    { title: page.title }, { name: "description", content: page.description },
    { tagName: "link", rel: "canonical", href: page.canonical },
    ...page.alternates.map((alternate) => ({ tagName: "link", rel: "alternate", hrefLang: alternate.language ?? "", href: alternate.href ?? "" })),
    { name: "robots", content: "index, follow" },
  ];
};

export default function LegalRoute() {
  const { language, privacy } = useLoaderData<typeof loader>();
  return <LanguageProvider initialLanguage={language}><LegalPage language={language as IndexableLanguage} privacy={privacy} /><CookieConsent /></LanguageProvider>;
}
