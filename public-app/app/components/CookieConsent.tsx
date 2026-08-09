import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../i18n";

const CONSENT_KEY = "avl-analytics-consent";
const GA_ID = "G-0VSR8E00FG";
const ADS_ID = "AW-18248114753";

const consentCopy = {
  de: { label: "Datenschutzeinstellungen", title: "Dürfen wir Analysedaten verwenden?", body: "Wir verwenden optionale Google-Analyse- und Werbetechnologien, um Nutzung und Buchungen zu messen. Sie werden erst nach Ihrer Zustimmung geladen.", privacy: "Datenschutzerklärung", reject: "Optionales ablehnen", accept: "Analyse akzeptieren", url: "/de/datenschutz/" },
  en: { label: "Privacy settings", title: "May we use analytics?", body: "We use optional Google analytics and advertising technologies to measure visits and bookings. They load only after you consent.", privacy: "Privacy policy", reject: "Reject optional", accept: "Accept analytics", url: "/privacy/" },
  tr: { label: "Gizlilik ayarları", title: "Analiz verilerini kullanabilir miyiz?", body: "Ziyaretleri ve rezervasyonları ölçmek için isteğe bağlı Google analiz ve reklam teknolojilerini kullanıyoruz. Bunlar yalnızca onayınızdan sonra yüklenir.", privacy: "Gizlilik politikası", reject: "İsteğe bağlıları reddet", accept: "Analizi kabul et", url: "/tr/gizlilik/" },
  ru: { label: "Настройки конфиденциальности", title: "Разрешить аналитику?", body: "Мы используем необязательные технологии Google для анализа посещений и бронирований. Они загружаются только после вашего согласия.", privacy: "Политика конфиденциальности", reject: "Отклонить необязательные", accept: "Разрешить аналитику", url: "/ru/privacy/" },
  ar: { label: "إعدادات الخصوصية", title: "هل تسمح لنا باستخدام بيانات التحليلات؟", body: "نستخدم تقنيات Google الاختيارية للتحليلات والإعلانات لقياس الزيارات والحجوزات. لا يتم تحميلها إلا بعد موافقتك.", privacy: "سياسة الخصوصية", reject: "رفض التقنيات الاختيارية", accept: "قبول التحليلات", url: "/privacy/" },
} as const;

function loadAnalytics() {
  if (window.__avlAnalyticsLoaded) return;
  window.__avlAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => { window.dataLayer?.push(args); };
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
  window.gtag("config", ADS_ID);
}

export function CookieConsent() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const copy = useMemo(() => consentCopy[language as keyof typeof consentCopy] ?? consentCopy.en, [language]);

  useEffect(() => {
    window.gtag = window.gtag || (() => undefined);
    let consent: string | null = null;
    try { consent = localStorage.getItem(CONSENT_KEY); } catch { /* no-op */ }
    if (consent === "accepted") loadAnalytics();
    else if (consent !== "rejected") setVisible(true);

    const openSettings = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest("[data-open-consent]")) {
        event.preventDefault();
        setVisible(true);
      }
    };
    document.addEventListener("click", openSettings);
    return () => document.removeEventListener("click", openSettings);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("consent-open", visible);
    return () => document.body.classList.remove("consent-open");
  }, [visible]);

  const choose = (choice: "accepted" | "rejected") => {
    try { localStorage.setItem(CONSENT_KEY, choice); } catch { /* no-op */ }
    if (choice === "accepted") loadAnalytics();
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <section className="consent-dialog" role="dialog" aria-modal="true" aria-labelledby="consent-title" id="analytics-consent">
      <div className="consent-copy"><span className="consent-label">{copy.label}</span><h2 id="consent-title">{copy.title}</h2><p>{copy.body} <a href={copy.url}>{copy.privacy}</a>.</p></div>
      <div className="consent-actions">
        <button className="button consent-reject" type="button" onClick={() => choose("rejected")}>{copy.reject}</button>
        <button className="button button-gold consent-accept" type="button" onClick={() => choose("accepted")}>{copy.accept}</button>
      </div>
    </section>
  );
}
