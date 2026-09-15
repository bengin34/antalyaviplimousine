import {
  denyConsent,
  grantConsent,
  readConsent,
  saveConsent,
  startAnalytics,
} from "./analytics-consent.js";

const PRIVACY_URLS = {
  de: "/de/datenschutz/",
  en: "/privacy/",
  tr: "/tr/gizlilik/",
  ru: "/ru/privacy/",
  ar: "/privacy/",
};

const copy = {
  de: {
    label: "Datenschutzeinstellungen",
    title: "Dürfen wir Analysedaten verwenden?",
    body: "Wir verwenden Google-Analyse- und Werbetechnologien, um Nutzung und Buchungen zu messen. Ohne Ihre Zustimmung laufen sie ohne Cookies; mit Ihrer Zustimmung werden Cookies gesetzt und die Messung wird genauer.",
    privacy: "Datenschutzerklärung",
    reject: "Optionales ablehnen",
    accept: "Analyse akzeptieren",
  },
  en: {
    label: "Privacy settings",
    title: "May we use analytics?",
    body: "We use Google analytics and advertising technologies to measure visits and bookings. Without your consent they run without cookies; accepting allows cookies and a more accurate measurement.",
    privacy: "Privacy policy",
    reject: "Reject optional",
    accept: "Accept analytics",
  },
  tr: {
    label: "Gizlilik ayarları",
    title: "Analiz verilerini kullanabilir miyiz?",
    body: "Ziyaretleri ve rezervasyonları ölçmek için Google analiz ve reklam teknolojilerini kullanıyoruz. Onayınız olmadan çerezsiz çalışırlar; kabul ederseniz çerez kullanılır ve ölçüm daha kesin olur.",
    privacy: "Gizlilik politikası",
    reject: "İsteğe bağlıları reddet",
    accept: "Analizi kabul et",
  },
  ru: {
    label: "Настройки конфиденциальности",
    title: "Разрешить аналитику?",
    body: "Мы используем технологии Google для анализа посещений и бронирований. Без вашего согласия они работают без файлов cookie; с согласием устанавливаются cookie и измерение становится точнее.",
    privacy: "Политика конфиденциальности",
    reject: "Отклонить необязательные",
    accept: "Разрешить аналитику",
  },
  ar: {
    label: "إعدادات الخصوصية",
    title: "هل تسمح لنا باستخدام بيانات التحليلات؟",
    body: "نستخدم تقنيات Google للتحليلات والإعلانات لقياس الزيارات والحجوزات. بدون موافقتك تعمل دون ملفات تعريف الارتباط؛ وبالموافقة يتم استخدامها ويصبح القياس أدق.",
    privacy: "سياسة الخصوصية",
    reject: "رفض التقنيات الاختيارية",
    accept: "قبول التحليلات",
  },
};

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
    if (choice === "accepted") grantConsent();
    else denyConsent();
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

// The tag always loads, with every signal denied until the visitor accepts;
// the banner only decides whether those signals are upgraded.
const savedConsent = readConsent();
startAnalytics(savedConsent);
if (savedConsent === "unknown") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showDialog, { once: true });
  } else {
    showDialog();
  }
}
