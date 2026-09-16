import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "react-router";
import { useEffect, type ReactNode } from "react";
import { IconSprite } from "./components/Icon";
import { captureAttribution } from "./lib/attribution";
import { track } from "./lib/track";
import siteStyles from "../../src/styles.css?url";
import reactPublicStyles from "./react-public.css?url";

export const links = () => [
  { rel: "stylesheet", href: siteStyles },
  { rel: "stylesheet", href: reactPublicStyles },
  { rel: "icon", href: "/assets/favicon.svg", type: "image/svg+xml" },
  { rel: "manifest", href: "/assets/favicons/site.webmanifest" },
];

/** Skip-link wording per site language; falls back to English. */
const skipLabels: Record<string, string> = {
  en: "Skip to main content",
  de: "Zum Hauptinhalt springen",
  tr: "Ana içeriğe geç",
  ru: "Перейти к основному содержанию",
  fr: "Aller au contenu principal",
  cs: "Přejít na hlavní obsah",
  uk: "Перейти до основного вмісту",
  ar: "تخطي إلى المحتوى الرئيسي",
  ur: "مرکزی مواد پر جائیں",
  nl: "Naar hoofdinhoud",
  pl: "Przejdź do treści głównej",
  sv: "Hoppa till huvudinnehållet",
  ja: "本文へスキップ",
  ko: "본문으로 건너뛰기",
  da: "Gå til hovedindholdet",
  el: "Μετάβαση στο κύριο περιεχόμενο",
  es: "Saltar al contenido principal",
  he: "דלג לתוכן הראשי",
  hu: "Ugrás a fő tartalomra",
  it: "Vai al contenuto principale",
  pt: "Ir para o conteúdo principal",
  ro: "Sari la conținutul principal",
  zh: "跳转到主要内容",
};

export function Layout({ children }: { children: ReactNode }) {
  const matches = useMatches();
  const routeData = [...matches].reverse().find((match) => {
    const data = match.loaderData as { language?: string } | undefined;
    return Boolean(data?.language);
  })?.loaderData as { language?: string } | undefined;
  const language = routeData?.language ?? "en";

  // The ad click only puts its parameters on the landing URL, so record them
  // once per page load before any in-app navigation drops the query string.
  useEffect(() => {
    captureAttribution();
    // Denominator of every funnel rate below it, so it has to be recorded
    // after attribution, never before.
    track("landing_view", {});
  }, []);

  return (
    <html lang={language} dir={["ar", "ur", "he"].includes(language) ? "rtl" : "ltr"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <IconSprite />
        {/* SC 2.4.1 Bypass Blocks: every page repeats the same header and
            nav, so the first Tab stop offers a jump straight to the page's
            own content. Each route labels its <main> with id="main-content". */}
        <a className="skip-link" href="#main-content">
          {skipLabels[language] ?? skipLabels.en}
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <div className="react-route-loading">Loading…</div>;
}
