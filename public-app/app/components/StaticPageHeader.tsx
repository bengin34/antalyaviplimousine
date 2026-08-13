type StaticPageHeaderProps = {
  homeHref: string;
  homeLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  tertiaryHref?: string;
  tertiaryLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
  legal?: boolean;
};

export function StaticPageHeader({
  homeHref,
  homeLabel,
  secondaryHref,
  secondaryLabel,
  tertiaryHref,
  tertiaryLabel,
  ctaHref,
  ctaLabel,
  legal = false,
}: StaticPageHeaderProps) {
  return (
    <header className={`site-header${legal ? " legal-header" : ""} scrolled`}>
      <a className="brand" href={homeHref}>
        <span className="brand-mark">AVL</span>
        <span className="brand-copy"><strong>Antalya VIP</strong><span>Tourism</span></span>
      </a>
      <nav className="desktop-nav">
        <a href={homeHref}>{homeLabel}</a>
        <a href={secondaryHref}>{secondaryLabel}</a>
        {tertiaryHref && tertiaryLabel && <a href={tertiaryHref}>{tertiaryLabel}</a>}
      </nav>
      {ctaHref && ctaLabel && <a className="header-cta" href={ctaHref}>{ctaLabel}</a>}
    </header>
  );
}
