import { useLoaderData } from "react-router";
import { CookieConsent } from "../components/CookieConsent";
import { HomePage } from "../components/HomePage";
import { LanguageProvider } from "../i18n";
import { LandOfLegendsBookingCopyProvider } from "../lib/land-of-legends-booking-copy";
import { landOfLegendsBookingCopy, pageMessages } from "../lib/page-data.server";
import { homeMeta } from "../lib/seo";
import { domain, languageFromPath } from "../lib/site";

const routeCanonical = (matches: Array<{ id: string }>, prefix: string): string => {
  const id = matches.find((m) => m.id.startsWith(prefix))?.id ?? "";
  const lang = id.replace(prefix, "") || "en";
  return lang === "en" ? `${domain}/` : `${domain}/${lang}/`;
};

// Loader-only imports (seo, page-data) never reach the browser: the meta tags
// are computed here at prerender time and travel as loader data.
export function loader({ request }: { request: Request }) {
  const language = languageFromPath(new URL(request.url).pathname);
  return {
    language,
    meta: homeMeta(language),
    messages: pageMessages(language),
    landOfLegendsBooking: landOfLegendsBookingCopy(language),
  };
}

export const meta = ({ loaderData, matches }: { loaderData?: ReturnType<typeof loader>; matches?: Array<{ id: string }> }) => {
  const metas = loaderData?.meta ?? [];
  if (!matches) return metas;
  const canonical = routeCanonical(matches, "home-");
  return metas.map((m) =>
    (m as Record<string, string>).tagName === "link" && (m as Record<string, string>).rel === "canonical"
      ? { ...(m as object), href: canonical }
      : m,
  );
};

export default function HomeRoute() {
  const { language, messages, landOfLegendsBooking } = useLoaderData<typeof loader>();
  return (
    <LanguageProvider initialLanguage={language} messages={messages}>
      <LandOfLegendsBookingCopyProvider copy={landOfLegendsBooking}>
        <HomePage initialLanguage={language} />
      </LandOfLegendsBookingCopyProvider>
      <CookieConsent />
    </LanguageProvider>
  );
}
