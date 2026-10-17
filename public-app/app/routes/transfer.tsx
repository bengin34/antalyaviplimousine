import { useLoaderData } from "react-router";
import { localizedRoute, routeCatalog } from "../../../src/routes.js";
import { CookieConsent } from "../components/CookieConsent";
import { TransferPage } from "../components/TransferPage";
import { LanguageProvider } from "../i18n";
import { LandOfLegendsBookingCopyProvider } from "../lib/land-of-legends-booking-copy";
import { landOfLegendsBookingCopy, pageMessages, transferPageData } from "../lib/page-data.server";
import { routeMeta } from "../lib/seo";
import { domain, indexableLanguages, type IndexableLanguage } from "../lib/site";

const indexedLanguages = new Set<string>(indexableLanguages);

export function loader({ params }: { params: Record<string, string | undefined> }) {
  const language = (params.language && indexedLanguages.has(params.language)
    ? params.language
    : "en") as IndexableLanguage;
  const slug = params.slug ?? "";
  if (!routeCatalog[slug as keyof typeof routeCatalog]) throw new Response("Not found", { status: 404 });
  const route = localizedRoute(slug, language);
  return {
    language,
    route,
    data: route ? transferPageData(language, route) : null,
    meta: routeMeta(language, route?.slug ?? "antalya"),
    messages: pageMessages(language),
    landOfLegendsBooking: landOfLegendsBookingCopy(language),
  };
}

export const meta = ({ loaderData, params }: { loaderData?: ReturnType<typeof loader>; params?: Record<string, string | undefined> }) => {
  const metas = loaderData?.meta ?? [];
  const urlLang = params?.language;
  if (!urlLang || indexedLanguages.has(urlLang)) return metas;
  const slug = loaderData?.route?.slug ?? params?.slug ?? "antalya";
  const canonical = `${domain}/${urlLang}/transfers/${slug}/`;
  return metas.map((m) =>
    (m as Record<string, string>).tagName === "link" && (m as Record<string, string>).rel === "canonical"
      ? { ...(m as object), href: canonical }
      : m,
  );
};

export default function TransferRoute() {
  const { language, route, data, messages, landOfLegendsBooking } = useLoaderData<typeof loader>();
  if (!route || !data) return null;
  return (
    <LanguageProvider initialLanguage={language} messages={messages}>
      <LandOfLegendsBookingCopyProvider copy={landOfLegendsBooking}>
        <TransferPage language={language} route={route} data={data} />
      </LandOfLegendsBookingCopyProvider>
      <CookieConsent />
    </LanguageProvider>
  );
}
