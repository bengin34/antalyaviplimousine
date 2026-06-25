import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const pages = {
  en: {
    file: "privacy/index.html", url: "privacy/", title: "Privacy Policy", eyebrow: "Privacy",
    description: "Privacy policy of Antalya VIP Tourism covering booking data, optional analytics and your rights.",
    intro: "How we process personal data and the choices available to you.",
    headings: ["Controller", "Booking and contact data", "Technical delivery", "Google Analytics and Google Ads", "Service providers and recipients", "Your rights", "Updates"],
    bodies: [
      "Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkiye. Email: support@antalyaviptourism.com. Phone: +90 530 265 57 90.",
      "When you request or book a journey, we process the contact, travel, flight, pickup, destination and payment information you provide. This is necessary to answer your request, perform the journey, communicate with you and meet legal obligations. Data is retained only as long as required for these purposes or statutory retention periods.",
      "When the website is accessed, technically necessary log data may be processed, including IP address, time, requested page, browser and device information. This supports secure and stable website delivery.",
      "Google Analytics and Google Ads load only after you consent in the privacy dialog. Usage, device, interaction and conversion data may then be sent to Google. The provider is Google Ireland Limited and processing by affiliated companies outside the European Economic Area may occur. You may withdraw consent at any time through Privacy settings. Rejecting analytics does not affect booking functions.",
      "Hosting, database, payment and communication providers may process only the data required for their task. Payment details are processed by the selected payment provider.",
      "Where applicable law provides, you may request access, correction, deletion, restriction, portability or object to processing. You may withdraw consent for the future and lodge a complaint with a competent supervisory authority.",
      "This policy is updated when services or legal requirements change. Last updated: 19 June 2026.",
    ],
    settings: "Open privacy settings", home: "Home", imprint: "Imprint", imprintUrl: "/impressum.html",
  },
  de: {
    file: "de/datenschutz/index.html", url: "de/datenschutz/", title: "Datenschutzerklärung", eyebrow: "Datenschutz",
    description: "Datenschutzerklärung von Antalya VIP Tourism mit Informationen zu Buchungsdaten, optionaler Analyse und Ihren Rechten.",
    intro: "Wie wir personenbezogene Daten verarbeiten und welche Wahlmöglichkeiten Sie haben.",
    headings: ["Verantwortlicher", "Buchungs- und Kontaktdaten", "Technische Bereitstellung", "Google Analytics und Google Ads", "Dienstleister und Empfänger", "Ihre Rechte", "Änderungen"],
    bodies: [
      "Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkei. E-Mail: support@antalyaviptourism.com. Telefon: +90 530 265 57 90.",
      "Wenn Sie eine Fahrt anfragen oder buchen, verarbeiten wir die von Ihnen angegebenen Kontakt-, Reise-, Flug-, Abhol-, Ziel- und Zahlungsinformationen. Dies ist erforderlich, um Ihre Anfrage zu bearbeiten, die Fahrt durchzuführen, mit Ihnen zu kommunizieren und gesetzliche Pflichten zu erfüllen. Daten werden nur so lange gespeichert, wie sie für diese Zwecke oder gesetzliche Aufbewahrungsfristen benötigt werden.",
      "Beim Aufruf der Website können technisch erforderliche Protokolldaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt, aufgerufene Seite, Browser- und Geräteinformationen. Dies dient der sicheren und stabilen Bereitstellung.",
      "Google Analytics und Google Ads werden erst nach Ihrer Einwilligung geladen. Dabei können Nutzungs-, Geräte-, Interaktions- und Conversion-Daten an Google Ireland Limited übermittelt werden. Eine Verarbeitung außerhalb des Europäischen Wirtschaftsraums kann stattfinden. Sie können Ihre Einwilligung jederzeit über die Datenschutzeinstellungen widerrufen. Eine Ablehnung beeinträchtigt die Buchung nicht.",
      "Hosting-, Datenbank-, Zahlungs- und Kommunikationsdienstleister erhalten nur die für ihre Aufgabe erforderlichen Daten. Zahlungsdaten verarbeitet der gewählte Zahlungsdienstleister.",
      "Soweit anwendbares Recht dies vorsieht, können Sie Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit oder Widerspruch verlangen. Sie können Einwilligungen für die Zukunft widerrufen und sich bei einer zuständigen Aufsichtsbehörde beschweren.",
      "Diese Erklärung wird bei Änderungen der Dienste oder rechtlichen Anforderungen aktualisiert. Stand: 19. Juni 2026.",
    ],
    settings: "Datenschutzeinstellungen öffnen", home: "Startseite", imprint: "Impressum", imprintUrl: "/de/impressum/",
  },
  tr: {
    file: "tr/gizlilik/index.html", url: "tr/gizlilik/", title: "Gizlilik Politikası", eyebrow: "Gizlilik",
    description: "Antalya VIP Tourism gizlilik politikası: rezervasyon verileri, isteğe bağlı analizler ve haklarınız.",
    intro: "Kişisel verileri nasıl işlediğimiz ve kullanabileceğiniz seçenekler.",
    headings: ["Veri sorumlusu", "Rezervasyon ve iletişim verileri", "Teknik hizmet", "Google Analytics ve Google Ads", "Hizmet sağlayıcılar", "Haklarınız", "Güncellemeler"],
    bodies: [
      "Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 İç Kapı No: 4, Serik / Antalya, Türkiye. E-posta: support@antalyaviptourism.com. Telefon: +90 530 265 57 90.",
      "Bir yolculuk talep ettiğinizde veya rezervasyon yaptığınızda verdiğiniz iletişim, seyahat, uçuş, alış, varış ve ödeme bilgilerini işleriz. Bu bilgiler talebinizi yanıtlamak, yolculuğu gerçekleştirmek, sizinle iletişim kurmak ve yasal yükümlülükleri yerine getirmek için gereklidir. Veriler yalnızca gerekli veya yasal saklama süresi boyunca tutulur.",
      "Web sitesi kullanılırken IP adresi, zaman, istenen sayfa, tarayıcı ve cihaz bilgileri gibi teknik günlük verileri güvenli ve istikrarlı hizmet için işlenebilir.",
      "Google Analytics ve Google Ads yalnızca onayınızdan sonra yüklenir. Kullanım, cihaz, etkileşim ve dönüşüm verileri Google Ireland Limited şirketine iletilebilir ve Avrupa Ekonomik Alanı dışında işlenebilir. Onayınızı Gizlilik ayarlarından istediğiniz zaman geri çekebilirsiniz. Reddetmek rezervasyon işlevlerini etkilemez.",
      "Barındırma, veri tabanı, ödeme ve iletişim sağlayıcıları yalnızca görevleri için gerekli verileri işler. Ödeme bilgileri seçilen ödeme sağlayıcısı tarafından işlenir.",
      "Uygulanabilir mevzuat kapsamında erişim, düzeltme, silme, kısıtlama, veri taşınabilirliği veya itiraz haklarınızı kullanabilirsiniz. Onayınızı gelecek için geri çekebilir ve yetkili makama şikâyette bulunabilirsiniz.",
      "Hizmetler veya yasal gereklilikler değiştiğinde bu politika güncellenir. Son güncelleme: 19 Haziran 2026.",
    ],
    settings: "Gizlilik ayarlarını aç", home: "Ana sayfa", imprint: "Künye", imprintUrl: "/tr/kunye/",
  },
  ru: {
    file: "ru/privacy/index.html", url: "ru/privacy/", title: "Политика конфиденциальности", eyebrow: "Конфиденциальность",
    description: "Политика конфиденциальности Antalya VIP Tourism: данные бронирования, необязательная аналитика и ваши права.",
    intro: "Как мы обрабатываем персональные данные и какие возможности выбора у вас есть.",
    headings: ["Ответственное лицо", "Данные бронирования и контактов", "Техническая работа сайта", "Google Analytics и Google Ads", "Поставщики услуг", "Ваши права", "Обновления"],
    bodies: [
      "Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkiye. Email: support@antalyaviptourism.com. Телефон: +90 530 265 57 90.",
      "При запросе или бронировании поездки мы обрабатываем предоставленные контактные, туристические, полётные, адресные и платёжные данные. Это необходимо для ответа на запрос, выполнения поездки, связи с вами и соблюдения закона. Данные хранятся только в течение необходимого или установленного законом срока.",
      "При посещении сайта могут обрабатываться технические журналы: IP-адрес, время, запрошенная страница, сведения о браузере и устройстве. Это необходимо для безопасной и стабильной работы сайта.",
      "Google Analytics и Google Ads загружаются только после вашего согласия. Данные об использовании, устройстве, взаимодействиях и конверсиях могут передаваться Google Ireland Limited и обрабатываться за пределами Европейской экономической зоны. Согласие можно отозвать через настройки конфиденциальности. Отказ не влияет на бронирование.",
      "Поставщики хостинга, базы данных, платежей и связи получают только необходимые для их задачи данные. Платёжные данные обрабатывает выбранный платёжный сервис.",
      "В рамках применимого права вы можете запросить доступ, исправление, удаление, ограничение, перенос данных или возразить против обработки. Вы можете отозвать согласие на будущее и обратиться в компетентный надзорный орган.",
      "Политика обновляется при изменении сервисов или требований закона. Обновлено: 19 июня 2026 года.",
    ],
    settings: "Открыть настройки конфиденциальности", home: "Главная", imprint: "Правовая информация", imprintUrl: "/ru/impressum/",
  },
};

const alternates = `<link rel="alternate" hreflang="en" href="https://antalyaviptourism.com/privacy/" /><link rel="alternate" hreflang="de" href="https://antalyaviptourism.com/de/datenschutz/" /><link rel="alternate" hreflang="tr" href="https://antalyaviptourism.com/tr/gizlilik/" /><link rel="alternate" hreflang="ru" href="https://antalyaviptourism.com/ru/privacy/" /><link rel="alternate" hreflang="x-default" href="https://antalyaviptourism.com/privacy/" />`;

function render(code, page) {
  const cards = page.headings.map((heading, index) => `<div class="legal-card legal-card-wide"><h2>${index + 1}. ${heading}</h2><p>${page.bodies[index]}</p>${index === 3 ? `<p><button class="button button-gold" type="button" data-open-consent>${page.settings}</button></p>` : ""}</div>`).join("");
  return `<!doctype html><html lang="${code}"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="description" content="${page.description}" /><title>${page.title} | Antalya VIP Tourism</title><link rel="canonical" href="https://antalyaviptourism.com/${page.url}" />${alternates}<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" /><link rel="stylesheet" href="/src/styles.css" /></head><body class="legal-page"><header class="site-header legal-header scrolled"><a class="brand" href="/${code === "en" ? "" : `${code}/`}"><span class="brand-mark">AVL</span><span class="brand-copy"><strong>Antalya VIP</strong><span>Tourism</span></span></a><nav class="desktop-nav"><a href="/${code === "en" ? "" : `${code}/`}">${page.home}</a><a href="${page.imprintUrl}">${page.imprint}</a></nav></header><main><section class="legal-hero"><div class="eyebrow light"><span></span><p>${page.eyebrow}</p></div><h1>${page.title}</h1><p>${page.intro}</p></section><section class="legal-content">${cards}</section></main><footer><div class="footer-bottom"><span>© 2026 Antalya VIP Tourism</span><a href="${page.imprintUrl}">${page.imprint}</a></div></footer><script type="module" src="/src/consent.js"></script></body></html>`;
}

for (const [code, page] of Object.entries(pages)) {
  const target = path.join(root, page.file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, render(code, page));
}

await writeFile(path.join(root, "privacy.html"), `<!doctype html><html lang="de"><head><meta charset="UTF-8" /><meta name="robots" content="noindex,follow" /><link rel="canonical" href="https://antalyaviptourism.com/de/datenschutz/" /><meta http-equiv="refresh" content="0;url=/de/datenschutz/" /><title>Datenschutz | Antalya VIP Tourism</title></head><body><p><a href="/de/datenschutz/">Zur Datenschutzerklärung</a></p></body></html>`);
console.log("Generated localized privacy pages");
