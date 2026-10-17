import type { LinksFunction } from "react-router";
import { useLoaderData } from "react-router";
import { BlogIndexPage } from "../components/BlogIndexPage";
import { CookieConsent } from "../components/CookieConsent";
import blogStyles from "../blog.css?url";
import { LanguageProvider } from "../i18n";
import { articleSummaries } from "../lib/articles";
import { blogLanguageFromPath } from "../lib/blog-paths";
import { pageMessages } from "../lib/page-data.server";
import { blogMeta } from "../lib/seo";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: blogStyles }];

/** The index needs each article's heading and excerpt, never its body. */
export function loader({ request }: { request: Request }) {
  const language = blogLanguageFromPath(new URL(request.url).pathname);
  return {
    language,
    posts: articleSummaries(language),
    meta: blogMeta(language),
    messages: pageMessages(language),
  };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => loaderData?.meta ?? [];

export default function BlogRoute() {
  const { language, posts, messages } = useLoaderData<typeof loader>();

  return (
    <LanguageProvider initialLanguage={language} messages={messages}>
      <BlogIndexPage language={language} posts={posts} />
      <CookieConsent />
    </LanguageProvider>
  );
}
