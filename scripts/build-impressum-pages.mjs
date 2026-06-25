import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const pages = {
  en: {
    file: "impressum.html",
    url: "impressum.html",
    title: "Imprint",
    eyebrow: "Legal notice",
    description:
      "Legal notice and provider information for Antalya VIP Tourism.",
    intro:
      "Provider information for this website under the applicable information obligations.",
    home: "Home",
    privacy: "Privacy",
    privacyUrl: "/privacy/",
    labels: {
      operator: "Operator",
      name: "Name",
      businessName: "Business name",
      address: "Address",
      contact: "Contact",
      phone: "Phone / WhatsApp",
      tax: "Tax information",
      taxOffice: "Tax office",
      taxNumber: "Tax number / Vergi Kimlik No",
      startDate: "Business start date",
      activity: "Business activity",
      liability: "Liability for content",
    },
    activity:
      "Passenger transport in urban, suburban and rural areas by road vehicles, including staff, student and comparable group transfers.",
    liability:
      "If you notice any inaccuracy or have a concern about the content on this website, please contact us directly.",
  },
  de: {
    file: "de/impressum/index.html",
    url: "de/impressum/",
    title: "Impressum",
    eyebrow: "Anbieterkennzeichnung",
    description:
      "Impressum und Anbieterkennzeichnung von Antalya VIP Tourism.",
    intro:
      "Angaben gemaess den anwendbaren Informationspflichten fuer den Anbieter dieser Website.",
    home: "Startseite",
    privacy: "Datenschutz",
    privacyUrl: "/de/datenschutz/",
    labels: {
      operator: "Betreiber",
      name: "Name",
      businessName: "Geschaeftsbezeichnung",
      address: "Adresse",
      contact: "Kontakt",
      phone: "Telefon / WhatsApp",
      tax: "Steuerliche Angaben",
      taxOffice: "Finanzamt",
      taxNumber: "Steuernummer / Vergi Kimlik No",
      startDate: "Taetigkeitsbeginn",
      activity: "Taetigkeit",
      liability: "Haftung fuer Inhalte",
    },
    activity:
      "Personenbefoerderung im Stadt-, Vorort- und laendlichen Verkehr mit Strassenfahrzeugen, einschliesslich Personal-, Schueler- und vergleichbarer Gruppentransfers.",
    liability:
      "Falls Sie einen Fehler oder eine Unklarheit auf dieser Website entdecken, freuen wir uns ueber Ihre Nachricht. Bitte kontaktieren Sie uns direkt.",
  },
  tr: {
    file: "tr/kunye/index.html",
    url: "tr/kunye/",
    title: "Künye",
    eyebrow: "Yasal bilgiler",
    description:
      "Antalya VIP Tourism künye ve hizmet sağlayıcı bilgileri.",
    intro: "Bu web sitesinin hizmet sağlayıcısına ait yasal bilgilendirme.",
    home: "Ana sayfa",
    privacy: "Gizlilik",
    privacyUrl: "/tr/gizlilik/",
    labels: {
      operator: "İşletmeci",
      name: "Ad soyad",
      businessName: "İşletme adı",
      address: "Adres",
      contact: "İletişim",
      phone: "Telefon / WhatsApp",
      tax: "Vergi bilgileri",
      taxOffice: "Vergi dairesi",
      taxNumber: "Vergi kimlik no",
      startDate: "İşe başlama tarihi",
      activity: "Faaliyet",
      liability: "İçerik sorumluluğu",
    },
    activity:
      "Şehir içi, banliyö ve kırsal alanlarda kara yolu ile personel, öğrenci ve benzeri grup taşımacılığı.",
    liability:
      "Web sitemizdeki içeriklerle ilgili bir hata veya eksiklik fark ederseniz lütfen doğrudan bizimle iletişime geçin.",
  },
  ru: {
    file: "ru/impressum/index.html",
    url: "ru/impressum/",
    title: "Правовая информация",
    eyebrow: "Правовая информация",
    description:
      "Правовая информация и сведения о поставщике услуг Antalya VIP Tourism.",
    intro:
      "Информация о поставщике услуг этого сайта в соответствии с применимыми требованиями.",
    home: "Главная",
    privacy: "Конфиденциальность",
    privacyUrl: "/ru/privacy/",
    labels: {
      operator: "Оператор",
      name: "Имя",
      businessName: "Название компании",
      address: "Адрес",
      contact: "Контакты",
      phone: "Телефон / WhatsApp",
      tax: "Налоговая информация",
      taxOffice: "Налоговая инспекция",
      taxNumber: "Налоговый номер / Vergi Kimlik No",
      startDate: "Дата начала деятельности",
      activity: "Вид деятельности",
      liability: "Ответственность за содержание",
    },
    activity:
      "Пассажирские перевозки автомобильным транспортом в городских, пригородных и сельских районах, включая трансферы персонала, учащихся и сопоставимых групп.",
    liability:
      "Если вы заметили неточность или у вас есть вопрос по содержанию сайта, пожалуйста, свяжитесь с нами напрямую.",
  },
};

const alternates = `<link rel="alternate" hreflang="en" href="https://antalyaviptourism.com/impressum.html" /><link rel="alternate" hreflang="de" href="https://antalyaviptourism.com/de/impressum/" /><link rel="alternate" hreflang="tr" href="https://antalyaviptourism.com/tr/kunye/" /><link rel="alternate" hreflang="ru" href="https://antalyaviptourism.com/ru/impressum/" /><link rel="alternate" hreflang="x-default" href="https://antalyaviptourism.com/impressum.html" />`;

const address = {
  en: "Belek Mah. Belek 61 Sk.<br />Belek Deniz Apt No: 19 Ic Kapi No: 4<br />Serik / Antalya<br />Türkiye",
  de: "Belek Mah. Belek 61 Sk.<br />Belek Deniz Apt No: 19 Ic Kapi No: 4<br />Serik / Antalya<br />Tuerkei",
  tr: "Belek Mah. Belek 61 Sk.<br />Belek Deniz Apt No: 19 İç Kapı No: 4<br />Serik / Antalya<br />Türkiye",
  ru: "Belek Mah. Belek 61 Sk.<br />Belek Deniz Apt No: 19 Ic Kapi No: 4<br />Serik / Antalya<br />Türkiye",
};

function render(code, page) {
  const homeUrl = code === "en" ? "/" : `/${code}/`;
  return `<!doctype html><html lang="${code}"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="description" content="${page.description}" /><meta name="theme-color" content="#0b0b0b" /><title>${page.title} | Antalya VIP Tourism</title><link rel="canonical" href="https://antalyaviptourism.com/${page.url}" />${alternates}<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" /><link rel="stylesheet" href="/src/styles.css" /></head><body class="legal-page"><header class="site-header legal-header scrolled"><a class="brand" href="${homeUrl}" aria-label="Antalya VIP Tourism home"><span class="brand-mark">AVL</span><span class="brand-copy"><strong>Antalya VIP</strong><span>Tourism</span></span></a><nav class="desktop-nav"><a href="${homeUrl}">${page.home}</a><a href="${page.privacyUrl}">${page.privacy}</a></nav><div class="header-actions"><a class="header-cta" href="${homeUrl}#booking"><span>${code === "de" ? "Jetzt buchen" : code === "tr" ? "Hemen rezervasyon" : code === "ru" ? "Забронировать" : "Book now"}</span><svg class="icon" aria-hidden="true"><use href="#icon-arrow-up-right"></use></svg></a></div></header><main><section class="legal-hero"><div class="eyebrow light"><span></span><p>${page.eyebrow}</p></div><h1>${page.title}</h1><p>${page.intro}</p></section><section class="legal-content" aria-label="${page.title}"><div class="legal-card"><h2>${page.labels.operator}</h2><dl class="legal-details"><div><dt>${page.labels.name}</dt><dd>Ahmet Karadag</dd></div><div><dt>${page.labels.businessName}</dt><dd>Antalya VIP Tourism</dd></div><div><dt>${page.labels.address}</dt><dd>${address[code]}</dd></div></dl></div><div class="legal-card"><h2>${page.labels.contact}</h2><dl class="legal-details"><div><dt>${page.labels.phone}</dt><dd><a href="tel:+905302655790">+90 530 265 57 90</a></dd></div><div><dt>E-Mail</dt><dd><a href="mailto:support@antalyaviptourism.com">support@antalyaviptourism.com</a></dd></div></dl></div><div class="legal-card"><h2>${page.labels.tax}</h2><dl class="legal-details"><div><dt>${page.labels.taxOffice}</dt><dd>Serik</dd></div><div><dt>${page.labels.taxNumber}</dt><dd>507•••8455</dd></div><div><dt>${page.labels.startDate}</dt><dd>12.04.2021</dd></div></dl></div><div class="legal-card legal-card-wide"><h2>${page.labels.activity}</h2><p>${page.activity}</p></div><div class="legal-card legal-card-wide"><h2>${page.labels.liability}</h2><p>${page.liability}</p></div></section></main><footer><div class="footer-bottom"><span>© 2026 Antalya VIP Tourism</span><span><a href="${page.privacyUrl}">${page.privacy}</a></span></div></footer><svg class="svg-sprite" aria-hidden="true"><symbol id="icon-arrow-up-right" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10" /></symbol></svg><script type="module" src="/src/consent.js"></script></body></html>`;
}

for (const [code, page] of Object.entries(pages)) {
  const target = path.join(root, page.file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, render(code, page));
}

console.log("Generated localized impressum pages");
