import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { AirportMapPage } from "../components/AirportMapPage";
import { CookieConsent } from "../components/CookieConsent";
import airportMapStyles from "../airport-map.css?url";
import { LanguageProvider } from "../i18n";
import { airportMapLanguages, type AirportMapLanguage } from "../lib/airport-map-copy";
import { pageMessages } from "../lib/page-data.server";
import { airportMapMeta } from "../lib/seo";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: airportMapStyles },
];

const published = new Set<string>(airportMapLanguages);

export function loader({ request }: { request: Request }) {
  const first = new URL(request.url).pathname.split("/").filter(Boolean)[0] ?? "";
  const language = (published.has(first) ? first : "en") as AirportMapLanguage;
  return { language, meta: airportMapMeta(language), messages: pageMessages(language) };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => loaderData?.meta ?? [];

export default function AirportMapRoute() {
  const { language, messages } = useLoaderData<typeof loader>();
  return (
    <LanguageProvider initialLanguage={language} messages={messages}>
      <AirportMapPage language={language} />
      <CookieConsent />
    </LanguageProvider>
  );
}
