import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { ArticlePage } from "../components/ArticlePage";
import { CookieConsent } from "../components/CookieConsent";
import blogStyles from "../blog.css?url";
import { LanguageProvider } from "../i18n";
import { articleBySlug, blogLanguageFromPath } from "../lib/articles";
import { articleMeta } from "../lib/seo";
import type { IndexableLanguage } from "../lib/seo";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: blogStyles }];

/**
 * Only the language and the slug travel in the loader payload; the article
 * itself is looked up from the bundled catalogue so its text is not shipped
 * twice - once as HTML and once as serialized loader data.
 */
export function loader({ params, request }: { params: Record<string, string | undefined>; request: Request }) {
  const language = blogLanguageFromPath(new URL(request.url).pathname);
  const slug = params.slug ?? "";
  if (!articleBySlug(language, slug)) throw new Response("Not found", { status: 404 });
  return { language, slug };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => {
  if (!loaderData) return [];
  const article = articleBySlug(loaderData.language, loaderData.slug);
  return article ? articleMeta(loaderData.language, article) : [];
};

export default function ArticleRoute() {
  const { language, slug } = useLoaderData<typeof loader>();
  const article = articleBySlug(language, slug);
  if (!article) return null;

  return (
    <LanguageProvider initialLanguage={language as IndexableLanguage}>
      <ArticlePage language={language} article={article} />
      <CookieConsent />
    </LanguageProvider>
  );
}
