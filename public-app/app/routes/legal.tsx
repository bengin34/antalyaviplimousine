import { useLoaderData } from "react-router";
import { CookieConsent } from "../components/CookieConsent";
import { LegalPage } from "../components/LegalPage";
import legalData from "../generated/legal-copy.json";
import { LanguageProvider } from "../i18n";
import { domain, languageFromPath, type IndexableLanguage } from "../lib/seo";

const allLegalLanguages = new Set(["en", "de", "tr", "ru", "cs", "uk", "ur"]);

export function loader({ request }: { request: Request }) {
  const pathname = new URL(request.url).pathname;
  const language = languageFromPath(pathname);
  const rawLang = pathname.split("/").filter(Boolean)[0];
  const legalLanguage = allLegalLanguages.has(rawLang) ? rawLang : language;
  const privacy = /privacy|datenschutz|gizlilik/.test(pathname);
  return { language, legalLanguage, privacy };
}

const legalRouteCanonical: Record<string, string> = {
  "legal-imprint-en": `${domain}/impressum.html`,
  "legal-privacy-en": `${domain}/privacy/`,
  "legal-privacy-de": `${domain}/de/datenschutz/`,
  "legal-imprint-de": `${domain}/de/impressum/`,
  "legal-privacy-tr": `${domain}/tr/gizlilik/`,
  "legal-imprint-tr": `${domain}/tr/kunye/`,
  "legal-privacy-ru": `${domain}/ru/privacy/`,
  "legal-imprint-ru": `${domain}/ru/impressum/`,
  "legal-privacy-cs": `${domain}/cs/privacy/`,
  "legal-imprint-cs": `${domain}/cs/impressum/`,
  "legal-privacy-uk": `${domain}/uk/privacy/`,
  "legal-imprint-uk": `${domain}/uk/impressum/`,
  "legal-privacy-ur": `${domain}/ur/privacy/`,
  "legal-imprint-ur": `${domain}/ur/impressum/`,
};

export const meta = ({ loaderData, matches }: { loaderData?: ReturnType<typeof loader>; matches?: Array<{ id: string }> }) => {
  const legalLanguage = loaderData?.legalLanguage ?? loaderData?.language ?? "en";
  const key = `${legalLanguage}-${loaderData?.privacy ? "privacy" : "imprint"}` as keyof typeof legalData;
  const page = legalData[key] ?? legalData["en-imprint"];
  const routeId = matches?.find((m) => m.id.startsWith("legal-"))?.id;
  const canonicalHref = (routeId && legalRouteCanonical[routeId]) ?? page.canonical;
  return [
    { title: page.title }, { name: "description", content: page.description },
    { tagName: "link", rel: "canonical", href: canonicalHref },
    ...page.alternates.map((alternate) => ({ tagName: "link", rel: "alternate", hrefLang: alternate.language ?? "", href: alternate.href ?? "" })),
    { name: "robots", content: "index, follow" },
  ];
};

export default function LegalRoute() {
  const { language, privacy } = useLoaderData<typeof loader>();
  return <LanguageProvider initialLanguage={language}><LegalPage language={language as IndexableLanguage} privacy={privacy} /><CookieConsent /></LanguageProvider>;
}
