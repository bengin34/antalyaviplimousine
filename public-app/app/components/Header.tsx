import { useEffect, useRef, useState } from "react";
import { languageOptions, useLanguage, type LanguageCode } from "../i18n";
import { Icon } from "./Icon";

export function Header({ homeHref = "", compact = false }: { homeHref?: string; compact?: boolean }) {
  const { language, selectLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(compact);
  const languageMenu = useRef<HTMLDivElement>(null);
  const currentLanguage = languageOptions.find(({ code }) => code === language) ?? languageOptions[0];
  const sectionHref = (hash: string) => `${homeHref}${hash}`;

  useEffect(() => {
    if (compact) return;
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [compact]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!languageMenu.current?.contains(event.target as Node)) setLanguagesOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const chooseLanguage = (code: LanguageCode) => {
    setLanguagesOpen(false);
    setMenuOpen(false);
    selectLanguage(code);
  };

  const nav = [
    ["#fleet", t("navFleet", "Fleet")],
    ["#services", t("navService", "Service")],
    ["#routes", t("navRoutes", "Routes")],
    ["#reviews", t("navReviews", "Reviews")],
    ["#contact", t("navContact", "Contact")],
  ];

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`} id="site-header">
        <a className="brand" href={sectionHref("#top")} aria-label="Antalya VIP Tourism home">
          <img src="/assets/optimized/logo.png" alt="Antalya VIP Tourism" className="brand-logo" width="160" height="120" />
          <span className="brand-copy"><strong>Antalya VIP</strong><span>Tourism</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([href, label]) => <a href={sectionHref(href)} key={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <div className={`lang-dropdown${languagesOpen ? " open" : ""}`} ref={languageMenu}>
            <button
              className="lang-trigger"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={languagesOpen}
              aria-label="Change language"
              onClick={(event) => { event.stopPropagation(); setLanguagesOpen((open) => !open); }}
            >
              <span className="lang-flag-current">{currentLanguage.flag}</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <ul className="lang-menu" role="listbox" aria-label="Language">
              {languageOptions.map((option) => (
                <li key={option.code}>
                  <button
                    className={`language-button${language === option.code ? " active" : ""}`}
                    type="button"
                    role="option"
                    aria-selected={language === option.code}
                    onClick={() => chooseLanguage(option.code)}
                  >{option.flag} {option.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <a className="header-cta" href={sectionHref("#booking")}><span>{t("bookNow", "Book now")}</span><Icon name="arrow-up-right" className="icon" /></a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          ><span /><span /></button>
        </div>
      </header>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {nav.map(([href, label]) => <a href={sectionHref(href)} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="mobile-language-switcher" aria-label="Language selection">
          {languageOptions.map((option) => (
            <button
              className={`language-button${language === option.code ? " active" : ""}`}
              type="button"
              key={option.code}
              onClick={() => chooseLanguage(option.code)}
            >{option.flag} {option.code.toUpperCase()}</button>
          ))}
        </div>
        <div className="mobile-menu-footer"><a href="tel:+905302655790">+90 530 265 57 90</a><span>{t("alwaysAvailable", "Available 24 hours, every day")}</span></div>
      </div>
    </>
  );
}
