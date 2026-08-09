import legalData from "../generated/legal-copy.json";
import type { IndexableLanguage } from "../lib/seo";
import { Header } from "./Header";

type LegalRecord = (typeof legalData)[keyof typeof legalData];

const privacyPath = { en: "/privacy/", de: "/de/datenschutz/", tr: "/tr/gizlilik/", ru: "/ru/privacy/" } as const;
const imprintPath = { en: "/impressum.html", de: "/de/impressum/", tr: "/tr/kunye/", ru: "/ru/impressum/" } as const;

export function LegalPage({ language, privacy }: { language: IndexableLanguage; privacy: boolean }) {
  const key = `${language}-${privacy ? "privacy" : "imprint"}` as keyof typeof legalData;
  const page = legalData[key] as LegalRecord;
  const homeHref = language === "en" ? "/" : `/${language}/`;

  return (
    <>
      <Header compact homeHref={homeHref} />
      <main className="legal-page-react">
        <section className="legal-hero"><div className="eyebrow light"><span /><p>{page.hero.eyebrow}</p></div><h1>{page.hero.title}</h1><p>{page.hero.intro}</p></section>
        <section className="legal-content" aria-label={page.hero.title}>{page.cards.map((card) => <article className={`legal-card${card.paragraphs.length ? " legal-card-wide" : ""}`} key={card.title}><h2>{card.title}</h2>{card.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{card.details.length > 0 && <dl className="legal-details">{card.details.map((detail) => <div key={detail.term}><dt>{detail.term}</dt><dd>{detail.href ? <a href={detail.href}>{detail.value}</a> : detail.value}</dd></div>)}</dl>}{card.privacySettings && <p><button className="button button-gold" type="button" data-open-consent>Open privacy settings</button></p>}</article>)}</section>
      </main>
      <footer><div className="footer-bottom"><span>© 2026 Antalya VIP Tourism</span><a href={privacy ? imprintPath[language] : privacyPath[language]}>{privacy ? "Imprint" : "Privacy"}</a></div></footer>
    </>
  );
}
