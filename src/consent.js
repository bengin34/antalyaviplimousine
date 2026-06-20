const CONSENT_KEY = "avl-analytics-consent";
const GA_ID = "G-0VSR8E00FG";
const ADS_ID = "AW-18248114753";
const PRIVACY_URLS = {
  de: "/de/datenschutz/",
  en: "/privacy/",
  tr: "/tr/gizlilik/",
  ru: "/ru/privacy/",
};

window.gtag = window.gtag || function gtag() {};

const copy = {
  de: {
    label: "Datenschutzeinstellungen",
    title: "Dürfen wir Analysedaten verwenden?",
    body: "Wir verwenden optionale Google-Analyse- und Werbetechnologien, um Nutzung und Buchungen zu messen. Sie werden erst nach Ihrer Zustimmung geladen.",
    privacy: "Datenschutzerklärung",
    reject: "Optionales ablehnen",
    accept: "Analyse akzeptieren",
  },
  en: {
    label: "Privacy settings",
    title: "May we use analytics?",
    body: "We use optional Google analytics and advertising technologies to measure visits and bookings. They load only after you consent.",
    privacy: "Privacy policy",
    reject: "Reject optional",
    accept: "Accept analytics",
  },
  tr: {
    label: "Gizlilik ayarları",
    title: "Analiz verilerini kullanabilir miyiz?",
    body: "Ziyaretleri ve rezervasyonları ölçmek için isteğe bağlı Google analiz ve reklam teknolojilerini kullanıyoruz. Bunlar yalnızca onayınızdan sonra yüklenir.",
    privacy: "Gizlilik politikası",
    reject: "İsteğe bağlıları reddet",
    accept: "Analizi kabul et",
  },
  ru: {
    label: "Настройки конфиденциальности",
    title: "Разрешить аналитику?",
    body: "Мы используем необязательные технологии Google для анализа посещений и бронирований. Они загружаются только после вашего согласия.",
    privacy: "Политика конфиденциальности",
    reject: "Отклонить необязательные",
    accept: "Разрешить аналитику",
  },
};

let analyticsLoaded = false;

function loadAnalytics() {
  if (analyticsLoaded) return;
  analyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
  window.gtag("config", ADS_ID);
}

function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function saveConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // The choice still applies for the current page if storage is unavailable.
  }
}

function removeDialog() {
  document.querySelector("#analytics-consent")?.remove();
}

function showDialog() {
  removeDialog();
  const language = copy[document.documentElement.lang]
    ? document.documentElement.lang
    : "en";
  const text = copy[language];
  const dialog = document.createElement("section");
  dialog.id = "analytics-consent";
  dialog.className = "consent-dialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", "consent-title");
  dialog.innerHTML = `
    <div class="consent-copy">
      <span class="consent-label">${text.label}</span>
      <h2 id="consent-title">${text.title}</h2>
      <p>${text.body} <a href="${PRIVACY_URLS[language]}">${text.privacy}</a>.</p>
    </div>
    <div class="consent-actions">
      <button class="button consent-reject" type="button" data-consent="rejected">${text.reject}</button>
      <button class="button button-gold consent-accept" type="button" data-consent="accepted">${text.accept}</button>
    </div>
  `;

  dialog.addEventListener("click", (event) => {
    const button = event.target.closest("[data-consent]");
    if (!button) return;
    const choice = button.dataset.consent;
    saveConsent(choice);
    if (choice === "accepted") loadAnalytics();
    removeDialog();
  });

  document.body.appendChild(dialog);
  dialog.querySelector(".consent-accept").focus({ preventScroll: true });
}

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-open-consent]")) {
    event.preventDefault();
    showDialog();
  }
});

const savedConsent = getConsent();
if (savedConsent === "accepted") loadAnalytics();
else if (savedConsent !== "rejected") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showDialog, { once: true });
  } else {
    showDialog();
  }
}
