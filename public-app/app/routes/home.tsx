import { useLoaderData } from "react-router";
import { CookieConsent } from "../components/CookieConsent";
import { HomePage } from "../components/HomePage";
import { LanguageProvider } from "../i18n";
import { homeMeta, languageFromPath } from "../lib/seo";

export function loader({ request }: { request: Request }) {
  return { language: languageFromPath(new URL(request.url).pathname) };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => homeMeta(loaderData?.language ?? "en");

export default function HomeRoute() {
  const { language } = useLoaderData<typeof loader>();
  return <LanguageProvider initialLanguage={language}><HomePage initialLanguage={language} /><CookieConsent /></LanguageProvider>;
}
