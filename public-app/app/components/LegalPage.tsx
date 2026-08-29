import legalData from "../generated/legal-copy.json";
import type { IndexableLanguage } from "../lib/seo";
import { StaticPageHeader } from "./StaticPageHeader";

type LegalRecord = (typeof legalData)[keyof typeof legalData];

const privacyPath = { en: "/privacy/", de: "/de/datenschutz/", fr: "/fr/privacy/", tr: "/tr/gizlilik/", ru: "/ru/privacy/", cs: "/cs/privacy/", uk: "/uk/privacy/", ur: "/ur/privacy/" } as const;
const imprintPath = { en: "/impressum.html", de: "/de/impressum/", fr: "/fr/impressum/", tr: "/tr/kunye/", ru: "/ru/impressum/", cs: "/cs/impressum/", uk: "/uk/impressum/", ur: "/ur/impressum/" } as const;
const privacyLabel = { en: "Privacy", de: "Datenschutz", fr: "Confidentialité", tr: "Gizlilik", ru: "Конфиденциальность", cs: "Ochrana soukromí", uk: "Конфіденційність", ur: "پرائیویسی" } as const;
const imprintLabel = { en: "Imprint", de: "Impressum", fr: "Mentions légales", tr: "Künye", ru: "Правовая информация", cs: "Impressum", uk: "Правова інформація", ur: "قانونی معلومات" } as const;
const privacySettingsLabel = { en: "Open privacy settings", de: "Datenschutzeinstellungen öffnen", fr: "Ouvrir les paramètres de confidentialité", tr: "Gizlilik ayarlarını aç", ru: "Открыть настройки конфиденциальности", cs: "Otevřít nastavení soukromí", uk: "Відкрити налаштування конфіденційності", ur: "پرائیویسی سیٹنگز کھولیں" } as const;

export function LegalPage({ language, privacy }: { language: IndexableLanguage; privacy: boolean }) {
  const key = `${language}-${privacy ? "privacy" : "imprint"}` as keyof typeof legalData;
  const page = legalData[key] as LegalRecord;
  const homeHref = language === "en" ? "/" : `/${language}/`;
  const pPath = (privacyPath as Record<string, string>)[language] ?? privacyPath.en;
  const iPath = (imprintPath as Record<string, string>)[language] ?? imprintPath.en;
  const pLabel = (privacyLabel as Record<string, string>)[language] ?? privacyLabel.en;
  const iLabel = (imprintLabel as Record<string, string>)[language] ?? imprintLabel.en;
  const psLabel = (privacySettingsLabel as Record<string, string>)[language] ?? privacySettingsLabel.en;

  return (
    <>
      <StaticPageHeader homeHref={homeHref} homeLabel={page.homeLabel} secondaryHref={privacy ? iPath : pPath} secondaryLabel={privacy ? iLabel : pLabel} legal />
      <main>
        <section className="legal-hero"><div className="eyebrow light"><span /><p>{page.hero.eyebrow}</p></div><h1>{page.hero.title}</h1><p>{page.hero.intro}</p></section>
        <section className="legal-content" aria-label={page.hero.title}>{page.cards.map((card) => <div className={`legal-card${card.paragraphs.length ? " legal-card-wide" : ""}`} key={card.title}><h2>{card.title}</h2>{card.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{card.details.length > 0 && <dl className="legal-details">{card.details.map((detail) => <div key={detail.term}><dt>{detail.term}</dt><dd>{detail.href ? <a href={detail.href}>{detail.value}</a> : detail.value}</dd></div>)}</dl>}{card.privacySettings && <p><button className="button button-gold" type="button" data-open-consent>{psLabel}</button></p>}</div>)}</section>
      </main>
      <footer><div className="footer-bottom"><span>© 2026 Antalya VIP Tourism</span><a href={privacy ? iPath : pPath}>{privacy ? iLabel : pLabel}</a></div></footer>
    </>
  );
}
