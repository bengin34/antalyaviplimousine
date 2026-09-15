/**
 * Google Consent Mode v2.
 *
 * Previously the tag was not loaded at all until the visitor accepted, which
 * meant every visitor who ignored or rejected the banner was invisible — and
 * for German and other EEA traffic that is most of them. Consent Mode loads
 * the tag with every signal denied: no cookies are written and no identifiers
 * are sent, but Google can model the conversions it never directly observed,
 * and Ads bidding keeps working. Accepting upgrades the same tag in place.
 *
 * Shared by the legacy pages (src/consent.js) and the React site
 * (public-app/app/components/CookieConsent.tsx) so the two banners cannot
 * drift apart.
 */

export const GA_ID = "G-0VSR8E00FG";
export const ADS_ID = "AW-18248114753";
export const CONSENT_KEY = "avl-analytics-consent";

export const DENIED_SIGNALS = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

export const GRANTED_SIGNALS = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
};

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  // gtag pushes the `arguments` object itself; an array is not equivalent.
  // Marked on the function rather than tracked in a flag: other code installs
  // a no-op `window.gtag` so call sites can fire safely before the tag exists,
  // and a flag would leave that no-op in place and swallow every command.
  if (!window.gtag?.__avlReal) {
    const gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    gtag.__avlReal = true;
    window.gtag = gtag;
  }
}

/** Reads the stored choice: "accepted", "rejected" or "unknown". */
export function readConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) || "unknown";
  } catch {
    return "unknown";
  }
}

export function saveConsent(choice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // The choice still applies to the current page.
  }
}

export function grantConsent() {
  ensureGtag();
  window.gtag("consent", "update", GRANTED_SIGNALS);
}

export function denyConsent() {
  ensureGtag();
  window.gtag("consent", "update", DENIED_SIGNALS);
}

/**
 * Loads the tag exactly once, denied by default. Safe to call on every page
 * load regardless of what the visitor has or has not chosen.
 */
export function startAnalytics(consent = readConsent()) {
  if (typeof window === "undefined") return;
  if (window.__avlAnalyticsLoaded) {
    if (consent === "accepted") grantConsent();
    return;
  }
  window.__avlAnalyticsLoaded = true;
  ensureGtag();

  // Must be queued before configuration; Google ignores a default that
  // arrives after the tag has already been configured.
  window.gtag("consent", "default", { ...DENIED_SIGNALS, wait_for_update: 500 });
  // Strips ad identifiers from requests while ad_storage is denied, and lets
  // a gclid survive in the URL so ad clicks stay attributable without cookies.
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("set", "url_passthrough", true);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
  window.gtag("config", ADS_ID);

  if (consent === "accepted") grantConsent();
}
