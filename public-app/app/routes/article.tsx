import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { ArticlePage } from "../components/ArticlePage";
import { CookieConsent } from "../components/CookieConsent";
import blogStyles from "../blog.css?url";
import { LanguageProvider } from "../i18n";
import { articleBySlug, articleInLanguage, moreArticleSummaries } from "../lib/articles";
import { blogLanguageFromPath } from "../lib/blog-paths";
import { pageMessages } from "../lib/page-data.server";
import { articleMeta } from "../lib/seo";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: blogStyles }];

/**
 * The article travels as loader data with only this language's text, so the
 * browser bundle never carries the article catalogue.
 */
export function loader({ params, request }: { params: Record<string, string | undefined>; request: Request }) {
  const language = blogLanguageFromPath(new URL(request.url).pathname);
  const article = articleBySlug(language, params.slug ?? "");
  if (!article) throw new Response("Not found", { status: 404 });
  return {
    language,
    article: articleInLanguage(language, article),
    moreArticles: moreArticleSummaries(language, article),
    meta: articleMeta(language, article),
    messages: pageMessages(language),
  };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => loaderData?.meta ?? [];

export default function ArticleRoute() {
  const { language, article, moreArticles, messages } = useLoaderData<typeof loader>();

  return (
    <LanguageProvider initialLanguage={language} messages={messages}>
      <ArticlePage language={language} article={article} moreArticles={moreArticles} />
      <CookieConsent />
    </LanguageProvider>
  );
}
