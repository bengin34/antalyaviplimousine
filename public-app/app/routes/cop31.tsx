import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { CookieConsent } from "../components/CookieConsent";
import { Cop31Page } from "../components/Cop31Page";
import cop31Styles from "../cop31.css?url";
import { LanguageProvider } from "../i18n";
import { cop31Languages, type Cop31Language } from "../lib/cop31-copy";
import { pageMessages } from "../lib/page-data.server";
import { cop31Meta } from "../lib/seo";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cop31Styles },
];

const published = new Set<string>(cop31Languages);

export function loader({ request }: { request: Request }) {
  const first = new URL(request.url).pathname.split("/").filter(Boolean)[0] ?? "";
  const language = (published.has(first) ? first : "en") as Cop31Language;
  return { language, meta: cop31Meta(language), messages: pageMessages(language) };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => loaderData?.meta ?? [];

export default function Cop31Route() {
  const { language, messages } = useLoaderData<typeof loader>();
  return (
    <LanguageProvider initialLanguage={language} messages={messages}>
      <Cop31Page language={language} />
      <CookieConsent />
    </LanguageProvider>
  );
}
