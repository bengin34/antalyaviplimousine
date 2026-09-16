import { routeCatalog } from "../../../src/routes.js";
import {
  articlePath,
  articlesForLanguage,
  blogPath,
  blogText,
  type Article,
  type ArticleBlock,
} from "../lib/articles";
import { StaticPageHeader } from "./StaticPageHeader";

const routeName = (slug: string, language: string) => {
  const route = routeCatalog[slug as keyof typeof routeCatalog];
  if (!route) return null;
  const names = route.names as Record<string, string>;
  return names[language] ?? names.en;
};

function Block({ block }: { block: ArticleBlock }) {
  if (block.type === "h2") return <h2>{block.text}</h2>;
  if (block.type === "h3") return <h3>{block.text}</h3>;
  if (block.type === "ul") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "table") {
    // Wide comparison tables must scroll inside their own box rather than
    // pushing the page sideways on a phone.
    return (
      <div className="article-table-scroll">
        <table>
          <thead>
            <tr>
              {block.head.map((cell, index) => (
                <th key={cell || `col-${index}`} scope="col">{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, index) => (
                  index === 0
                    ? <th key={cell} scope="row">{cell}</th>
                    : <td key={`${cell}-${index}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <p>{block.text}</p>;
}

export function ArticlePage({ language, article }: { language: string; article: Article }) {
  const copy = article.content[language];
  const text = blogText(language);
  const prefix = language === "en" ? "" : `/${language}`;
  const homeHref = `${prefix}/`;
  const blogHref = blogPath(language);
  if (!copy) return null;

  const related = article.relatedRoutes
    .map((slug) => ({ slug, name: routeName(slug, language) }))
    .filter((route): route is { slug: string; name: string } => Boolean(route.name));

  const others = articlesForLanguage(language)
    .filter((entry) => entry.id !== article.id)
    .slice(0, 3);

  return (
    <>
      <StaticPageHeader
        homeHref={homeHref}
        homeLabel={text.home}
        secondaryHref={blogHref}
        secondaryLabel={text.blog}
        tertiaryHref="#contact"
        tertiaryLabel="WhatsApp"
        ctaHref={`${homeHref}#booking`}
        ctaLabel={text.book}
      />
      <main id="main-content" tabIndex={-1} className="article-page">
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href={homeHref}>{text.home}</a></li>
            <li><a href={blogHref}>{text.blog}</a></li>
            <li aria-current="page">{copy.heading}</li>
          </ol>
        </nav>

        <header className="article-header">
          <h1>{copy.heading}</h1>
          <p className="article-lede">{copy.excerpt}</p>
          <p className="article-meta">
            <time dateTime={article.updated}>{text.updated} {article.updated}</time>
            <span aria-hidden="true">·</span>
            <span>{text.minRead(copy.readingMinutes)}</span>
          </p>
        </header>

        <article className="article-body">
          {copy.blocks.map((block, index) => (
            <Block key={`${block.type}-${index}`} block={block} />
          ))}
        </article>

        <section className="article-faq" aria-labelledby="article-faq-heading">
          <h2 id="article-faq-heading">{text.faqHeading}</h2>
          {copy.faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>

        {related.length > 0 && (
          <section className="article-related" aria-labelledby="article-related-heading">
            <h2 id="article-related-heading">{text.relatedHeading}</h2>
            <div>
              {related.map(({ slug, name }) => (
                <a key={slug} href={`${prefix}/transfers/${slug}/`}>{name}</a>
              ))}
            </div>
          </section>
        )}

        <section className="article-cta" id="contact">
          <h2>{text.ctaHeading}</h2>
          <p>{text.ctaText}</p>
          <p className="article-cta-actions">
            <a className="button button-gold" href={`${homeHref}#booking`}>{text.ctaButton}</a>
            <a className="button" href="https://wa.me/905302655790">WhatsApp</a>
          </p>
        </section>

        {others.length > 0 && (
          <section className="article-more" aria-labelledby="article-more-heading">
            <h2 id="article-more-heading">{text.moreHeading}</h2>
            <ul>
              {others.map((entry) => {
                const entryCopy = entry.content[language]!;
                return (
                  <li key={entry.id}>
                    <a href={articlePath(language, entry) ?? blogHref}>{entryCopy.heading}</a>
                    <p>{entryCopy.excerpt}</p>
                  </li>
                );
              })}
            </ul>
            <p><a className="text-link" href={blogHref}>{text.backToBlog}</a></p>
          </section>
        )}
      </main>
      <footer>
        <div className="footer-bottom">
          <span>© 2026 Antalya VIP Tourism</span>
          <span>
            <a href={text.imprintUrl}>{text.imprint}</a> · <a href={text.privacyUrl}>{text.privacy}</a>
          </span>
        </div>
      </footer>
    </>
  );
}
