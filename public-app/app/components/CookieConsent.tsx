import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../i18n";
import {
  denyConsent,
  grantConsent,
  readConsent,
  saveConsent,
  startAnalytics,
} from "../../../src/analytics-consent.js";


const consentCopy = {
  de: { label: "Datenschutzeinstellungen", title: "Dürfen wir Analysedaten verwenden?", body: "Wir verwenden Google-Analyse- und Werbetechnologien, um Nutzung und Buchungen zu messen. Ohne Ihre Zustimmung laufen sie ohne Cookies; mit Ihrer Zustimmung werden Cookies gesetzt und die Messung wird genauer.", privacy: "Datenschutzerklärung", reject: "Optionales ablehnen", accept: "Analyse akzeptieren", url: "/de/datenschutz/" },
  en: { label: "Privacy settings", title: "May we use analytics?", body: "We use Google analytics and advertising technologies to measure visits and bookings. Without your consent they run without cookies; accepting allows cookies and a more accurate measurement.", privacy: "Privacy policy", reject: "Reject optional", accept: "Accept analytics", url: "/privacy/" },
  tr: { label: "Gizlilik ayarları", title: "Analiz verilerini kullanabilir miyiz?", body: "Ziyaretleri ve rezervasyonları ölçmek için Google analiz ve reklam teknolojilerini kullanıyoruz. Onayınız olmadan çerezsiz çalışırlar; kabul ederseniz çerez kullanılır ve ölçüm daha kesin olur.", privacy: "Gizlilik politikası", reject: "İsteğe bağlıları reddet", accept: "Analizi kabul et", url: "/tr/gizlilik/" },
  ru: { label: "Настройки конфиденциальности", title: "Разрешить аналитику?", body: "Мы используем технологии Google для анализа посещений и бронирований. Без вашего согласия они работают без файлов cookie; с согласием устанавливаются cookie и измерение становится точнее.", privacy: "Политика конфиденциальности", reject: "Отклонить необязательные", accept: "Разрешить аналитику", url: "/ru/privacy/" },
  ar: { label: "إعدادات الخصوصية", title: "هل تسمح لنا باستخدام بيانات التحليلات؟", body: "نستخدم تقنيات Google للتحليلات والإعلانات لقياس الزيارات والحجوزات. بدون موافقتك تعمل دون ملفات تعريف الارتباط؛ وبالموافقة يتم استخدامها ويصبح القياس أدق.", privacy: "سياسة الخصوصية", reject: "رفض التقنيات الاختيارية", accept: "قبول التحليلات", url: "/privacy/" },
} as const;

export function CookieConsent() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const copy = useMemo(() => consentCopy[language as keyof typeof consentCopy] ?? consentCopy.en, [language]);
  const dialog = useRef<HTMLElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    setVisible(false);
    // Hand focus back to whatever opened the banner (the "privacy settings"
    // link on the legal pages); on first load there is no opener, so focus
    // falls back to the document and the reading order stays intact.
    returnFocusTo.current?.focus();
    returnFocusTo.current = null;
  }, []);

  useEffect(() => {
    // The tag loads on every visit with Consent Mode signals denied, so a
    // visitor who never answers is still measured — without cookies. The
    // banner decides only whether those signals are upgraded.
    const consent = readConsent();
    startAnalytics(consent);
    if (consent === "unknown") setVisible(true);

    const openSettings = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const opener = target?.closest("[data-open-consent]");
      if (opener) {
        event.preventDefault();
        returnFocusTo.current = opener as HTMLElement;
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

  // aria-modal="true" tells assistive technology the rest of the page is
  // inert, so the keyboard has to behave that way too: focus moves in,
  // Tab cycles inside, and Escape closes without choosing (SC 2.1.2).
  useEffect(() => {
    if (!visible) return;
    const node = dialog.current;
    if (!node) return;

    const focusable = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((element) => element.offsetParent !== null);

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
        return;
      }
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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible, dismiss]);

  const choose = (choice: "accepted" | "rejected") => {
    saveConsent(choice);
    if (choice === "accepted") grantConsent();
    else denyConsent();
    dismiss();
  };

  if (!visible) return null;
  return (
    <section className="consent-dialog" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="consent-title" aria-describedby="consent-body" id="analytics-consent">
      <div className="consent-copy"><span className="consent-label">{copy.label}</span><h2 id="consent-title">{copy.title}</h2><p id="consent-body">{copy.body} <a href={copy.url}>{copy.privacy}</a>.</p></div>
      <div className="consent-actions">
        <button className="button consent-reject" type="button" onClick={() => choose("rejected")}>{copy.reject}</button>
        <button className="button button-gold consent-accept" type="button" onClick={() => choose("accepted")}>{copy.accept}</button>
      </div>
    </section>
  );
}
