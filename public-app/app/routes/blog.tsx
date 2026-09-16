import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { BlogIndexPage } from "../components/BlogIndexPage";
import { CookieConsent } from "../components/CookieConsent";
import blogStyles from "../blog.css?url";
import { LanguageProvider } from "../i18n";
import { blogLanguageFromPath } from "../lib/articles";
import { blogMeta } from "../lib/seo";
import type { IndexableLanguage } from "../lib/seo";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: blogStyles }];

export function loader({ request }: { request: Request }) {
  return { language: blogLanguageFromPath(new URL(request.url).pathname) };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) =>
  blogMeta(loaderData?.language ?? "en");

export default function BlogRoute() {
  const { language } = useLoaderData<typeof loader>();

  return (
    <LanguageProvider initialLanguage={language as IndexableLanguage}>
      <BlogIndexPage language={language} />
      <CookieConsent />
    </LanguageProvider>
  );
}
