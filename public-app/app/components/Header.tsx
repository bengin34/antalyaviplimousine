import { useEffect, useRef, useState } from "react";
import { languageOptions, useLanguage, type LanguageCode } from "../i18n";
import { Icon } from "./Icon";

type HeaderProps = {
  homeHref?: string;
  compact?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

export function Header({
  homeHref = "",
  compact = false,
  ctaHref,
  ctaLabel,
}: HeaderProps) {
  const { language, selectLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(compact);
  const languageMenu = useRef<HTMLDivElement>(null);
  const languageTrigger = useRef<HTMLButtonElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);
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

  // SC 2.1.2 No Keyboard Trap: both overlays must be dismissable from the
  // keyboard, and focus has to land back on the control that opened them —
  // otherwise the tab order restarts at the top of the document.
  useEffect(() => {
    if (!menuOpen && !languagesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (languagesOpen) {
        setLanguagesOpen(false);
        languageTrigger.current?.focus();
        return;
      }
      setMenuOpen(false);
      menuTrigger.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, languagesOpen]);

  // The open menu covers the page, so Tab must stay inside it; otherwise
  // focus walks the hidden content behind the overlay (SC 2.4.3).
  useEffect(() => {
    if (!menuOpen) return;
    const node = mobileMenu.current;
    if (!node) return;

    const focusable = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((element) => element.offsetParent !== null);

    // The overlay animates in from visibility:hidden, and a hidden element
    // silently refuses focus. There is no event for "the visibility
    // transition has started", so retry across frames until the focus
    // actually sticks, giving up rather than spinning if it never does.
    let frame = 0;
    let attempts = 0;
    const focusFirst = () => {
      const first = focusable()[0];
      first?.focus();
      if (document.activeElement === first) return;
      if (++attempts < 40) frame = requestAnimationFrame(focusFirst);
    };
    frame = requestAnimationFrame(focusFirst);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !node.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const chooseLanguage = (code: LanguageCode) => {
    setLanguagesOpen(false);
    setMenuOpen(false);
    selectLanguage(code);
  };

  const scrollTo = (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!homeHref) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        const top = id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const nav = [
    { hash: "#fleet", href: sectionHref("#fleet"), label: t("navFleet", "Fleet") },
    { hash: "#services", href: sectionHref("#services"), label: t("navService", "Service") },
    { hash: "#routes", href: sectionHref("#routes"), label: t("navRoutes", "Routes") },
    { hash: "#reviews", href: sectionHref("#reviews"), label: t("navReviews", "Reviews") },
    { hash: "#contact", href: sectionHref("#contact"), label: t("navContact", "Contact") },
    { hash: "", href: "/b2b/", label: "B2B Partners" },
  ];

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`} id="site-header">
        <a className="brand" href={sectionHref("#top")} onClick={scrollTo("#top")} aria-label="Antalya VIP Tourism home">
          <picture>
            <source srcSet="/assets/optimized/logo.webp" type="image/webp" />
            <img src="/assets/optimized/logo.png" alt="Antalya VIP Tourism" className="brand-logo" width="160" height="120" />
          </picture>
          <span className="brand-copy"><strong>Antalya VIP</strong><span>Tourism</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <a
              href={item.href}
              key={item.href}
              onClick={item.hash ? scrollTo(item.hash) : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className={`lang-dropdown${languagesOpen ? " open" : ""}`} ref={languageMenu}>
            <button
              className="lang-trigger"
              type="button"
              ref={languageTrigger}
              aria-haspopup="true"
              aria-controls="language-menu"
              aria-expanded={languagesOpen}
              aria-label={`Change language (current: ${currentLanguage.label})`}
              onClick={(event) => { event.stopPropagation(); setLanguagesOpen((open) => !open); }}
            >
              {/* The flag is decoration: the accessible name above already
                  carries the current language, and a flag emoji announces
                  as a country, not a language. */}
              <span className="lang-flag-current" aria-hidden="true">{currentLanguage.flag}</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" focusable="false"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {/* A plain list of native buttons rather than a listbox: these
                navigate on activation, and role="option" on a <button>
                inside an <li> is not a shape the listbox pattern allows. */}
            <ul className="lang-menu" id="language-menu" aria-label="Language">
              {languageOptions.map((option) => (
                <li key={option.code}>
                  <button
                    className={`language-button${language === option.code ? " active" : ""}`}
                    type="button"
                    lang={option.code}
                    aria-current={language === option.code ? "true" : undefined}
                    onClick={() => chooseLanguage(option.code)}
                  ><span aria-hidden="true">{option.flag}</span> {option.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <a
            className="header-cta"
            href={ctaHref ?? sectionHref("#booking")}
            onClick={ctaHref ? undefined : scrollTo("#booking")}
          ><span>{ctaLabel ?? t("bookNow", "Book now")}</span><Icon name="arrow-up-right" className="icon" /></a>
          <button
            className="menu-button"
            type="button"
            ref={menuTrigger}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          ><span aria-hidden="true" /><span aria-hidden="true" /></button>
        </div>
      </header>
      {/* The open menu covers the whole viewport, so it behaves as a dialog:
          that gives its nav, language buttons and footer a containing
          landmark and lets focus be trapped while the page behind is inert. */}
      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        id="mobile-menu"
        ref={mobileMenu}
        role="dialog"
        aria-modal={menuOpen || undefined}
        aria-label={t("menu", "Menu")}
        aria-hidden={!menuOpen}
        // `inert` keeps the closed overlay's links out of the tab order even
        // where the CSS visibility transition has not finished, so aria-hidden
        // never ends up hiding a focusable element from screen readers only.
        inert={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {nav.map((item) => (
            <a
              href={item.href}
              key={item.href}
              onClick={(event) => {
                setMenuOpen(false);
                if (item.hash) scrollTo(item.hash)(event);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        {/* aria-label on a bare <div> is dropped by assistive technology —
            the group role is what makes the name reachable. */}
        <div className="mobile-language-switcher" role="group" aria-label="Language selection">
          {languageOptions.map((option) => (
            <button
              className={`language-button${language === option.code ? " active" : ""}`}
              type="button"
              key={option.code}
              lang={option.code}
              aria-label={option.label}
              aria-current={language === option.code ? "true" : undefined}
              onClick={() => chooseLanguage(option.code)}
            ><span aria-hidden="true">{option.flag} {option.code.toUpperCase()}</span></button>
          ))}
        </div>
        <div className="mobile-menu-footer"><a href="tel:+905302655790">+90 530 265 57 90</a><span>{t("alwaysAvailable", "Available 24 hours, every day")}</span></div>
      </div>
    </>
  );
}
