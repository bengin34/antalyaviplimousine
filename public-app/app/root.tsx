import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "react-router";
import type { ReactNode } from "react";
import { IconSprite } from "./components/Icon";
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
};

export function Layout({ children }: { children: ReactNode }) {
  const matches = useMatches();
  const routeData = [...matches].reverse().find((match) => {
    const data = match.loaderData as { language?: string } | undefined;
    return Boolean(data?.language);
  })?.loaderData as { language?: string } | undefined;
  const language = routeData?.language ?? "en";

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
