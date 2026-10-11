import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { CookieConsent } from "../components/CookieConsent";
import { LandOfLegendsPage } from "../components/LandOfLegendsPage";
import landOfLegendsStyles from "../land-of-legends.css?url";
import { LanguageProvider } from "../i18n";
import { landOfLegendsLanguages, type LandOfLegendsLanguage } from "../lib/land-of-legends-copy";
import { landOfLegendsMeta } from "../lib/seo";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: landOfLegendsStyles },
];

const published = new Set<string>(landOfLegendsLanguages);

export function loader({ request }: { request: Request }) {
  const first = new URL(request.url).pathname.split("/").filter(Boolean)[0] ?? "";
  const language = (published.has(first) ? first : "en") as LandOfLegendsLanguage;
  return { language };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) =>
  landOfLegendsMeta(loaderData?.language ?? "en");

export default function LandOfLegendsRoute() {
  const { language } = useLoaderData<typeof loader>();
  return (
    <LanguageProvider initialLanguage={language}>
      <LandOfLegendsPage language={language} />
      <CookieConsent />
    </LanguageProvider>
  );
}
