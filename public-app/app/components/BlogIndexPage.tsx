import { articlePath, articlesForLanguage, blogPath, blogText } from "../lib/articles";
import { StaticPageHeader } from "./StaticPageHeader";

export function BlogIndexPage({ language }: { language: string }) {
  const text = blogText(language);
  const prefix = language === "en" ? "" : `/${language}`;
  const homeHref = `${prefix}/`;
  const posts = articlesForLanguage(language);

  return (
    <>
      <StaticPageHeader
        homeHref={homeHref}
        homeLabel={text.home}
        secondaryHref={blogPath(language)}
        secondaryLabel={text.blog}
        tertiaryHref={`${homeHref}#routes`}
        tertiaryLabel={text.routes}
        ctaHref={`${homeHref}#booking`}
        ctaLabel={text.book}
      />
      <main id="main-content" tabIndex={-1} className="article-page">
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href={homeHref}>{text.home}</a></li>
            <li aria-current="page">{text.heading}</li>
          </ol>
        </nav>

        <header className="article-header">
          <h1>{text.heading}</h1>
          <p className="article-lede">{text.intro}</p>
        </header>

        <ul className="article-index">
          {posts.map((article) => {
            const copy = article.content[language]!;
            const href = articlePath(language, article) ?? blogPath(language);
            return (
              <li key={article.id}>
                <article>
                  <h2><a href={href}>{copy.heading}</a></h2>
                  <p>{copy.excerpt}</p>
                  <p className="article-meta">
                    <time dateTime={article.updated}>{text.updated} {article.updated}</time>
                    <span aria-hidden="true">·</span>
                    <span>{text.minRead(copy.readingMinutes)}</span>
                  </p>
                  <a className="text-link" href={href}>{text.readMore}</a>
                </article>
              </li>
            );
          })}
        </ul>

        <section className="article-cta">
          <h2>{text.ctaHeading}</h2>
          <p>{text.ctaText}</p>
          <p className="article-cta-actions">
            <a className="button button-gold" href={`${homeHref}#booking`}>{text.ctaButton}</a>
            <a className="button" href="https://wa.me/905302655790">WhatsApp</a>
          </p>
        </section>
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
