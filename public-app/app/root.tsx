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

export function Layout({ children }: { children: ReactNode }) {
  const matches = useMatches();
  const routeData = [...matches].reverse().find((match) => {
    const data = match.loaderData as { language?: string } | undefined;
    return Boolean(data?.language);
  })?.loaderData as { language?: string } | undefined;
  const language = routeData?.language ?? "en";

  return (
    <html lang={language} dir={["ar", "ur"].includes(language) ? "rtl" : "ltr"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <IconSprite />
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
