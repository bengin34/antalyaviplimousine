import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { routeData } from "../src/prices.js";

const root = process.cwd();
const languages = {
  en: {
    locale: "en_GB",
    title: "Antalya Airport Transfer | Private VIP Tourism Service",
    description: "Private fixed-price transfers from Antalya Airport to resorts across Türkiye.",
    home: "Home", routes: "Transfer routes",
    routeTitle: (name) => `Antalya Airport to ${name} Transfer | Private Fixed-Price Service`,
    routeDescription: (name, price) => `Private fixed-price transfer from Antalya Airport to ${name} from €${price}. Meet and greet, flight tracking and door-to-door service.`,
    h1: (name) => `Private transfer from Antalya Airport to ${name}`,
    intro: (name, duration, distance) => `The ${distance} journey from Antalya Airport to ${name} takes approximately ${duration} in normal traffic. Your chauffeur meets you in arrivals with a name sign and drives directly to your accommodation.`,
    priceHeading: "Fixed transfer prices", vito: "Mercedes Vito · up to 7 passengers", sprinter: "Mercedes Sprinter · up to 13 passengers", included: "Included in the price",
    includeItems: ["Personal meet and greet", "Real-time flight tracking", "Airport parking and waiting", "Luggage assistance and bottled water", "Free child seat on request"],
    duration: "Estimated time", distance: "Distance", from: "Price from", book: "Book your transfer", faq: "Frequently asked questions", campaign: "Online special: 25% discount already applied to all transfer prices.",
    faqItems: (name, price, duration) => [[`How long is the transfer from Antalya Airport to ${name}?`, `The journey takes approximately ${duration} in normal traffic.`], [`What is the fixed transfer price to ${name}?`, `Mercedes Vito prices start from €${price} per vehicle. The confirmed total is shown when booking.`], ["What happens if my flight is delayed?", "We track your flight in real time and adjust the meeting time at no extra charge."]],
    other: "Other Antalya Airport transfers", contact: "Contact us on WhatsApp for bookings and questions.", privacy: "Privacy", privacyUrl: "/privacy/", imprint: "Imprint", imprintUrl: "/impressum.html",
  },
  de: {
    locale: "de_DE",
    title: "Flughafen Antalya Transfer | Privater VIP Chauffeurservice",
    description: "Private Festpreis-Transfers vom Flughafen Antalya zu Reisezielen in der gesamten Türkei.",
    home: "Startseite", routes: "Transferrouten",
    routeTitle: (name) => `Flughafen Antalya nach ${name} Transfer | Privater Festpreis-Transfer`,
    routeDescription: (name, price) => `Privater Festpreis-Transfer vom Flughafen Antalya nach ${name} ab €${price}. Meet & Greet, Flugverfolgung und Tür-zu-Tür-Service.`,
    h1: (name) => `Privater Transfer vom Flughafen Antalya nach ${name}`,
    intro: (name, duration, distance) => `Die ${distance} lange Fahrt vom Flughafen Antalya nach ${name} dauert bei normalem Verkehr ungefähr ${duration}. Ihr Chauffeur empfängt Sie in der Ankunftshalle mit Namensschild und fährt direkt zu Ihrer Unterkunft.`,
    priceHeading: "Feste Transferpreise", vito: "Mercedes Vito · bis 7 Personen", sprinter: "Mercedes Sprinter · bis 13 Personen", included: "Im Preis enthalten",
    includeItems: ["Persönlicher Empfang mit Namensschild", "Flugverfolgung in Echtzeit", "Flughafenparken und Wartezeit", "Gepäckhilfe und Mineralwasser", "Kostenloser Kindersitz auf Wunsch"],
    duration: "Geschätzte Fahrzeit", distance: "Entfernung", from: "Preis ab", book: "Transfer buchen", faq: "Häufig gestellte Fragen", campaign: "Online Spezial: 25% Rabatt ist in allen Transferpreisen bereits abgezogen.",
    faqItems: (name, price, duration) => [[`Wie lange dauert der Transfer vom Flughafen Antalya nach ${name}?`, `Die Fahrt dauert bei normalem Verkehr ungefähr ${duration}.`], [`Was kostet der Festpreis-Transfer nach ${name}?`, `Die Preise für einen Mercedes Vito beginnen bei €${price} pro Fahrzeug. Der bestätigte Gesamtpreis wird bei der Buchung angezeigt.`], ["Was passiert bei einer Flugverspätung?", "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an."]],
    other: "Weitere Transfers vom Flughafen Antalya", contact: "Für Buchungen und Fragen erreichen Sie uns über WhatsApp.", privacy: "Datenschutz", privacyUrl: "/de/datenschutz/", imprint: "Impressum", imprintUrl: "/de/impressum/",
  },
  tr: {
    locale: "tr_TR",
    title: "Antalya Havalimanı Transferi | Özel VIP Transfer",
    description: "Antalya Havalimanı'ndan Belek, Side, Kemer, Alanya ve çevresine özel sabit fiyatlı transfer. Vito ve Sprinter, uçuş takibi ve karşılama.",
    home: "Ana sayfa",
    routes: "Transfer rotaları",
    routeTitle: (name) => `Antalya Havalimanı ${name} Transferi | Özel Sabit Fiyat`,
    routeDescription: (name, price) => `Antalya Havalimanı'ndan ${name} bölgesine €${price}'dan başlayan özel sabit fiyatlı transfer. Uçuş takibi, karşılama ve kapıdan kapıya hizmet.`,
    h1: (name) => `Antalya Havalimanı'ndan ${name} bölgesine özel transfer`,
    intro: (name, duration, distance) => `Antalya Havalimanı ile ${name} arasındaki ${distance} mesafeli yolculuk normal trafik koşullarında yaklaşık ${duration} sürer. Şoförünüz sizi gelen yolcu salonunda isim tabelasıyla karşılar ve doğrudan konaklama adresinize götürür.`,
    priceHeading: "Sabit transfer fiyatları",
    vito: "Mercedes Vito · 7 yolcuya kadar",
    sprinter: "Mercedes Sprinter · 13 yolcuya kadar",
    included: "Fiyata dahil olanlar",
    includeItems: ["Kişisel isim tabelasıyla karşılama", "Gerçek zamanlı uçuş takibi", "Havalimanı otoparkı ve bekleme", "Bagaj yardımı ve şişe su", "Talep üzerine ücretsiz çocuk koltuğu"],
    duration: "Tahmini süre",
    distance: "Mesafe",
    from: "Başlangıç fiyatı",
    book: "Transferinizi ayırtın",
    faq: "Sık sorulan sorular",
    campaign: "Online'a özel: Tüm transfer fiyatlarına %25 indirim uygulanmıştır.",
    faqItems: (name, price, duration) => [
      [`Antalya Havalimanı ile ${name} arası transfer ne kadar sürer?`, `Normal trafik koşullarında yolculuk yaklaşık ${duration} sürer. Trafik ve otel konumu süreyi etkileyebilir.`],
      [`${name} transferinin sabit fiyatı nedir?`, `Mercedes Vito fiyatları araç başına €${price}'dan başlar. Kesin toplam rezervasyon sırasında gösterilir.`],
      ["Uçuşum gecikirse ne olur?", "Uçuşunuzu gerçek zamanlı takip eder, karşılama saatini ücretsiz olarak güncelleriz."],
    ],
    other: "Diğer Antalya Havalimanı transferleri",
    contact: "Rezervasyon ve sorularınız için WhatsApp üzerinden bize ulaşın.",
    privacy: "Gizlilik",
    imprint: "Künye",
    privacyUrl: "/tr/gizlilik/",
    imprintUrl: "/tr/kunye/",
  },
  ru: {
    locale: "ru_RU",
    title: "Трансфер из аэропорта Антальи | Частный VIP-трансфер",
    description: "Частные трансферы по фиксированной цене из аэропорта Антальи в Белек, Сиде, Кемер, Аланью и другие курорты. Встреча и отслеживание рейса.",
    home: "Главная",
    routes: "Маршруты трансфера",
    routeTitle: (name) => `Трансфер из аэропорта Антальи в ${name} | Фиксированная цена`,
    routeDescription: (name, price) => `Частный трансфер из аэропорта Антальи в ${name} от €${price} за автомобиль. Встреча, отслеживание рейса и доставка до отеля.`,
    h1: (name) => `Частный трансфер из аэропорта Антальи в ${name}`,
    intro: (name, duration, distance) => `Поездка из аэропорта Антальи в ${name} на расстояние ${distance} занимает примерно ${duration} при обычном движении. Водитель встретит вас в зале прилёта с именной табличкой и отвезёт прямо к месту проживания.`,
    priceHeading: "Фиксированные цены",
    vito: "Mercedes Vito · до 7 пассажиров",
    sprinter: "Mercedes Sprinter · до 13 пассажиров",
    included: "В стоимость включено",
    includeItems: ["Встреча с именной табличкой", "Отслеживание рейса в реальном времени", "Парковка и ожидание в аэропорту", "Помощь с багажом и вода", "Бесплатное детское кресло по запросу"],
    duration: "Время в пути",
    distance: "Расстояние",
    from: "Цена от",
    book: "Забронировать трансфер",
    faq: "Частые вопросы",
    campaign: "Онлайн-акция: скидка 25% уже применена ко всем трансферам.",
    faqItems: (name, price, duration) => [
      [`Сколько длится трансфер из аэропорта Антальи в ${name}?`, `При обычном движении поездка занимает около ${duration}. Точное время зависит от дорожной ситуации и расположения отеля.`],
      [`Сколько стоит трансфер в ${name}?`, `Стоимость Mercedes Vito начинается от €${price} за автомобиль. Итоговая фиксированная цена показывается при бронировании.`],
      ["Что произойдёт при задержке рейса?", "Мы отслеживаем рейс в реальном времени и бесплатно корректируем время встречи."],
    ],
    other: "Другие трансферы из аэропорта Антальи",
    contact: "Для бронирования и вопросов напишите нам в WhatsApp.",
    privacy: "Конфиденциальность",
    imprint: "Правовая информация",
    privacyUrl: "/ru/privacy/",
    imprintUrl: "/ru/impressum/",
  },
};

const routes = {
  antalya: { en: "Antalya City", de: "Antalya Stadt", tr: "Antalya şehir merkezi", ru: "центр Антальи", distance: "15 km", duration: { en: "20–30 minutes", de: "20–30 Minuten", tr: "20–30 dakika", ru: "20–30 минут" } },
  belek: { en: "Belek", de: "Belek", tr: "Belek", ru: "Белек", distance: "35 km", duration: { en: "35–40 minutes", de: "35–40 Minuten", tr: "35–40 dakika", ru: "35–40 минут" } },
  side: { en: "Side", de: "Side", tr: "Side", ru: "Сиде", distance: "65 km", duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут" } },
  kemer: { en: "Kemer", de: "Kemer", tr: "Kemer", ru: "Кемер", distance: "45 km", duration: { en: "40–50 minutes", de: "40–50 Minuten", tr: "40–50 dakika", ru: "40–50 минут" } },
  alanya: { en: "Alanya", de: "Alanya", tr: "Alanya", ru: "Аланью", distance: "125 km", duration: { en: "110–130 minutes", de: "110–130 Minuten", tr: "110–130 dakika", ru: "110–130 минут" } },
  bogazkent: { en: "Boğazkent", de: "Boğazkent", tr: "Boğazkent", ru: "Богазкент", distance: "40 km", duration: { en: "40–45 minutes", de: "40–45 Minuten", tr: "40–45 dakika", ru: "40–45 минут" } },
  manavgat: { en: "Manavgat", de: "Manavgat", tr: "Manavgat", ru: "Манавгат", distance: "70 km", duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут" } },
  kizilagac: { en: "Manavgat/Kızılağaç", de: "Manavgat/Kızılağaç", tr: "Manavgat/Kızılağaç", ru: "Манавгат/Кызылагач", distance: "85 km", duration: { en: "70–80 minutes", de: "70–80 Minuten", tr: "70–80 dakika", ru: "70–80 минут" } },
  tekirova: { en: "Tekirova", de: "Tekirova", tr: "Tekirova", ru: "Текирову", distance: "75 km", duration: { en: "75–90 minutes", de: "75–90 Minuten", tr: "75–90 dakika", ru: "75–90 минут" } },
  bodrum: { en: "Bodrum", de: "Bodrum", tr: "Bodrum", ru: "Бодрум", distance: "420 km", duration: { en: "5–6 hours", de: "5–6 Stunden", tr: "5–6 saat", ru: "5–6 часов" } },
  dalaman: { en: "Dalaman", de: "Dalaman", tr: "Dalaman", ru: "Даламан", distance: "235 km", duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа" } },
  fethiye: { en: "Fethiye", de: "Fethiye", tr: "Fethiye", ru: "Фетхие", distance: "200 km", duration: { en: "2.5–3 hours", de: "2,5–3 Stunden", tr: "2,5–3 saat", ru: "2,5–3 часа" } },
  pamukkale: { en: "Pamukkale", de: "Pamukkale", tr: "Pamukkale", ru: "Памуккале", distance: "240 km", duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа" } },
  kapadokya: { en: "Cappadocia", de: "Kappadokien", tr: "Kapadokya", ru: "Каппадокию", distance: "540 km", duration: { en: "7–8 hours", de: "7–8 Stunden", tr: "7–8 saat", ru: "7–8 часов" } },
};

const hreflangs = (slug = "") => {
  const suffix = slug ? `transfers/${slug}/` : "";
  return `<link rel="alternate" hreflang="en" href="https://antalyaviptourism.com/${suffix}" />
    <link rel="alternate" hreflang="de" href="https://antalyaviptourism.com/de/${suffix}" />
    <link rel="alternate" hreflang="tr" href="https://antalyaviptourism.com/tr/${suffix}" />
    <link rel="alternate" hreflang="ru" href="https://antalyaviptourism.com/ru/${suffix}" />
    <link rel="alternate" hreflang="x-default" href="https://antalyaviptourism.com/${suffix}" />`;
};

function extractTranslations(source) {
  const marker = "const translations =";
  const start = source.indexOf("{", source.indexOf(marker));
  let depth = 0, quote = null, escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") quote = char;
    else if (char === "{") depth += 1;
    else if (char === "}" && --depth === 0) {
      const context = {};
      vm.runInNewContext(`result = (${source.slice(start, i + 1)});`, context);
      return context.result;
    }
  }
  throw new Error("Translations object could not be parsed");
}

function replaceDataI18n(html, translations) {
  const tokenPattern = /<\/?([a-z0-9]+)\b[^>]*>/gi;
  const voidElements = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  const stack = [];
  const replacements = [];
  let match;

  while ((match = tokenPattern.exec(html))) {
    const token = match[0];
    const tag = match[1].toLowerCase();
    if (token.startsWith("</")) {
      for (let index = stack.length - 1; index >= 0; index -= 1) {
        if (stack[index].tag !== tag) continue;
        const node = stack.splice(index, 1)[0];
        if (node.key && translations[node.key]) {
          replacements.push({ start: node.contentStart, end: match.index, value: translations[node.key] });
        }
        break;
      }
      continue;
    }
    if (voidElements.has(tag) || token.endsWith("/>")) continue;
    stack.push({
      tag,
      key: token.match(/\bdata-i18n="([^"]+)"/)?.[1],
      contentStart: tokenPattern.lastIndex,
    });
  }

  replacements.sort((a, b) => b.start - a.start);
  for (const replacement of replacements) {
    html = html.slice(0, replacement.start) + replacement.value + html.slice(replacement.end);
  }

  return html.replace(/<input\b[^>]*\bdata-i18n-placeholder="([^"]+)"[^>]*>/gi, (tag, key) => {
    if (!translations[key]) return tag;
    return tag.replace(/placeholder="[^"]*"/, `placeholder="${translations[key].replaceAll('"', '&quot;')}"`);
  });
}

function localizeHomeStructuredData(html, text, translations) {
  const faqKeys = [
    ["faqOneQ", "faqOneA"],
    ["faqTwoQ", "faqTwoA"],
    ["faqThreeQ", "faqThreeA"],
    ["faqFourQ", "faqFourA"],
    ["faqFiveQ", "faqFiveA"],
  ];

  const localizeStructuredText = (value) => {
    if (typeof value === "string") {
      const routeMatch = value.match(/^Antalya Airport to (.+) Transfer$/);
      if (routeMatch) {
        const route = Object.values(routes).find((item) => item.en === routeMatch[1]);
        if (route) {
          if (text.locale === "tr_TR") return `Antalya Havalimanı ${route.tr} Transferi`;
          if (text.locale === "ru_RU") return `Трансфер из аэропорта Антальи в ${route.ru}`;
        }
      }
      return value;
    }
    if (Array.isArray(value)) return value.map(localizeStructuredText);
    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, localizeStructuredText(item)]),
      );
    }
    return value;
  };

  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (block, json) => {
    let data;
    try { data = JSON.parse(json); } catch { return block; }
    if (data["@type"] === "TravelAgency") data.description = text.description;
    if (data["@type"] === "FAQPage") {
      data.mainEntity = faqKeys.map(([question, answer]) => ({
        "@type": "Question",
        name: translations[question],
        acceptedAnswer: { "@type": "Answer", text: translations[answer] },
      }));
    }
    data = localizeStructuredText(data);
    return `<script type="application/ld+json">\n${JSON.stringify(data, null, 8)}\n    </script>`;
  });
}

function localizeHomeStaticChrome(html, code) {
  const replacements = code === "tr"
    ? [
        ["Antalya Airport", "Antalya Havalimanı"],
        ["Antalya City", "Antalya şehir merkezi"],
        ["From</span><strong>", "Başlangıç</span><strong>"],
        ['href="/impressum.html"', 'href="/tr/kunye/"'],
        [">Impressum</a>", ">Künye</a>"],
        ['aria-label="Primary navigation"', 'aria-label="Ana navigasyon"'],
        ['aria-label="Change language"', 'aria-label="Dili değiştir"'],
        ['aria-label="Language"', 'aria-label="Dil"'],
        ['aria-label="Open menu"', 'aria-label="Menüyü aç"'],
        ['aria-label="Mobile navigation"', 'aria-label="Mobil navigasyon"'],
        ['aria-label="Language selection"', 'aria-label="Dil seçimi"'],
        ['aria-label="Book your transfer"', 'aria-label="Transferinizi ayırtın"'],
        ['aria-label="Pick-up location"', 'aria-label="Alış konumu"'],
        ['aria-label="Destination"', 'aria-label="Varış noktası"'],
        ['aria-label="Vehicle"', 'aria-label="Araç"'],
        ['aria-label="Number of guests"', 'aria-label="Yolcu sayısı"'],
        ['aria-label="Service guarantees"', 'aria-label="Hizmet güvenceleri"'],
        ['aria-label="Previous vehicle photo"', 'aria-label="Önceki araç fotoğrafı"'],
        ['aria-label="Next vehicle photo"', 'aria-label="Sonraki araç fotoğrafı"'],
        ['aria-label="Previous routes"', 'aria-label="Önceki rotalar"'],
        ['aria-label="Next routes"', 'aria-label="Sonraki rotalar"'],
        ['aria-label="Close"', 'aria-label="Kapat"'],
        ['aria-label="Chat on WhatsApp"', 'aria-label="WhatsApp\'tan yazın"'],
      ]
    : [
        ["Antalya Airport", "Аэропорт Антальи"],
        ["Antalya City", "центр Антальи"],
        ["From</span><strong>", "От</span><strong>"],
        ['href="/impressum.html"', 'href="/ru/impressum/"'],
        [">Impressum</a>", ">Правовая информация</a>"],
        ['aria-label="Primary navigation"', 'aria-label="Основная навигация"'],
        ['aria-label="Change language"', 'aria-label="Изменить язык"'],
        ['aria-label="Language"', 'aria-label="Язык"'],
        ['aria-label="Open menu"', 'aria-label="Открыть меню"'],
        ['aria-label="Mobile navigation"', 'aria-label="Мобильная навигация"'],
        ['aria-label="Language selection"', 'aria-label="Выбор языка"'],
        ['aria-label="Book your transfer"', 'aria-label="Забронировать трансфер"'],
        ['aria-label="Pick-up location"', 'aria-label="Место подачи"'],
        ['aria-label="Destination"', 'aria-label="Пункт назначения"'],
        ['aria-label="Vehicle"', 'aria-label="Автомобиль"'],
        ['aria-label="Number of guests"', 'aria-label="Число пассажиров"'],
        ['aria-label="Service guarantees"', 'aria-label="Гарантии сервиса"'],
        ['aria-label="Previous vehicle photo"', 'aria-label="Предыдущее фото автомобиля"'],
        ['aria-label="Next vehicle photo"', 'aria-label="Следующее фото автомобиля"'],
        ['aria-label="Previous routes"', 'aria-label="Предыдущие маршруты"'],
        ['aria-label="Next routes"', 'aria-label="Следующие маршруты"'],
        ['aria-label="Close"', 'aria-label="Закрыть"'],
        ['aria-label="Chat on WhatsApp"', 'aria-label="Написать в WhatsApp"'],
      ];

  for (const [source, target] of replacements) html = html.replaceAll(source, target);
  return html;
}

function localizeHome(source, code, text, translations) {
  const canonical = `https://antalyaviptourism.com/${code}/`;
  let html = source
    .replace('<html lang="en">', `<html lang="${code}">`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${text.description}" />`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${text.title}</title>`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<!-- hreflang -->[\s\S]*?<link rel="alternate" hreflang="x-default"[^>]*\/>/, `<!-- hreflang -->\n    ${hreflangs()}`)
    .replace('<meta property="og:url" content="https://antalyaviptourism.com/" />', `<meta property="og:url" content="${canonical}" />`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*/, `$1${text.title}`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*/, `$1${text.description}`)
    .replace('<meta property="og:locale" content="en_GB" />', `<meta property="og:locale" content="${text.locale}" />`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*/, `$1${text.title}`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*/, `$1${text.description}`)
    .replace(/(<h1[^>]*data-i18n="heroTitle"[^>]*>)[\s\S]*?(<\/h1>)/, `$1${translations.heroTitle}$2`)
    .replace(/(<p[^>]*data-i18n="heroSubtitle"[^>]*>)[\s\S]*?(<\/p>)/, `$1${translations.heroSubtitle}$2`)
    .replace('<span class="lang-flag-current">🇬🇧</span>', `<span class="lang-flag-current">${code === "tr" ? "🇹🇷" : "🇷🇺"}</span>`);
  html = replaceDataI18n(html, translations);
  html = localizeHomeStructuredData(html, text, translations);
  html = localizeHomeStaticChrome(html, code);
  html = html.replaceAll('href="/privacy/"', `href="${text.privacyUrl}"`);
  html = html.replaceAll(">Privacy</a>", `>${text.privacy}</a>`);
  for (const slug of Object.keys(routes)) html = html.replaceAll(`/transfers/${slug}/`, `/${code}/transfers/${slug}/`);
  return html;
}

function routePage(code, slug, route, text) {
  const name = route[code], duration = route.duration[code];
  const prices = routeData[slug]?.prices;
  if (!prices) throw new Error(`Missing prices for route: ${slug}`);
  const vitoPrice = String(prices.vito);
  const sprinterPrice = String(prices.sprinter);
  const prefix = code === "en" ? "" : `${code}/`;
  const localPrefix = code === "en" ? "" : `/${code}`;
  const url = `https://antalyaviptourism.com/${prefix}transfers/${slug}/`;
  const faq = text.faqItems(name, vitoPrice, duration);
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: text.home, item: `https://antalyaviptourism.com/${prefix}` },
    { "@type": "ListItem", position: 2, name: text.routes, item: `https://antalyaviptourism.com/${prefix}#routes` },
    { "@type": "ListItem", position: 3, name: text.h1(name), item: url },
  ] };
  const schema = { "@context": "https://schema.org", "@type": "Service", name: text.h1(name), url, provider: { "@type": "TravelAgency", name: "Antalya VIP Tourism", url: "https://antalyaviptourism.com/", telephone: "+90 530 265 57 90" }, areaServed: { "@type": "Place", name }, offers: [{ "@type": "Offer", name: text.vito, price: vitoPrice, priceCurrency: "EUR" }, { "@type": "Offer", name: text.sprinter, price: sprinterPrice, priceCurrency: "EUR" }] };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return `<!doctype html>
<html lang="${code}"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="description" content="${text.routeDescription(name, vitoPrice)}" /><title>${text.routeTitle(name)}</title>
<link rel="canonical" href="${url}" />${hreflangs(slug)}
<meta property="og:type" content="website" /><meta property="og:url" content="${url}" /><meta property="og:site_name" content="Antalya VIP Tourism" /><meta property="og:title" content="${text.routeTitle(name)}" /><meta property="og:description" content="${text.routeDescription(name, vitoPrice)}" /><meta property="og:image" content="https://antalyaviptourism.com/assets/optimized/og-antalya-transfer.jpg" /><meta property="og:locale" content="${text.locale}" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${text.routeTitle(name)}" /><meta name="twitter:description" content="${text.routeDescription(name, vitoPrice)}" /><meta name="twitter:image" content="https://antalyaviptourism.com/assets/optimized/og-antalya-transfer.jpg" />
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script><script type="application/ld+json">${JSON.stringify(schema)}</script><script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" /><link rel="stylesheet" href="/src/styles.css" />
<style>.localized-route{padding:160px var(--section-x) 90px;background:linear-gradient(115deg,rgba(5,5,5,.94),rgba(5,5,5,.55)),url('/assets/optimized/antalya-coastline-hero.jpg') center/cover;color:#fff}.localized-route h1{max-width:900px;font-family:var(--serif);font-size:clamp(2.5rem,6vw,5.5rem);font-weight:400;line-height:1.03}.localized-campaign{display:inline-block;margin:28px 0 0;padding:10px 14px;border:1px solid rgba(224,198,141,.45);color:var(--gold-light);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase}.localized-stats{display:flex;gap:40px;flex-wrap:wrap;margin-top:45px}.localized-stats strong,.localized-stats span{display:block}.localized-stats span{color:rgba(255,255,255,.65)}.localized-content{padding:80px var(--section-x)}.localized-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:70px;max-width:1180px;margin:auto}.localized-grid h2,.localized-faq h2{font-family:var(--serif);font-size:clamp(1.8rem,3vw,2.7rem);font-weight:400}.localized-grid p,.localized-grid li{line-height:1.75;color:var(--muted)}.localized-price{padding:25px;border:1px solid var(--line);border-radius:14px}.localized-price strong{font-size:1.5rem;color:var(--gold)}.localized-faq{max-width:1180px;margin:auto;padding:0 var(--section-x) 80px}.localized-faq article{padding:24px 0;border-bottom:1px solid var(--line)}.localized-faq h3{font-size:1rem}.localized-faq p{color:var(--muted);line-height:1.7}.localized-links{padding:70px var(--section-x);background:var(--cream)}.localized-links div{display:flex;gap:12px;flex-wrap:wrap}.localized-links a{padding:12px 16px;background:#fff;border:1px solid var(--line);border-radius:8px}.localized-contact{padding:70px var(--section-x);text-align:center;background:#111;color:#fff}@media(max-width:760px){.localized-grid{grid-template-columns:1fr}.localized-route{padding-top:120px}}</style></head>
<body><header class="site-header scrolled"><a class="brand" href="${localPrefix}/"><span class="brand-mark">AVL</span><span class="brand-copy"><strong>Antalya VIP</strong><span>Tourism</span></span></a><nav class="desktop-nav"><a href="${localPrefix}/">${text.home}</a><a href="#details">${text.routes}</a><a href="#contact">WhatsApp</a></nav><a class="header-cta" href="${localPrefix}/#booking">${text.book}</a></header>
<main><section class="localized-route"><div class="eyebrow light"><span></span><p>Antalya VIP Tourism</p></div><h1>${text.h1(name)}</h1><p>${text.routeDescription(name, vitoPrice)}</p><p class="localized-campaign">${text.campaign}</p><div class="localized-stats"><div><strong>${duration}</strong><span>${text.duration}</span></div><div><strong>${route.distance}</strong><span>${text.distance}</span></div><div><strong>€${vitoPrice}</strong><span>${text.from}</span></div></div></section>
<section class="localized-content" id="details"><div class="localized-grid"><div><h2>${text.h1(name)}</h2><p>${text.intro(name, duration, route.distance)}</p><h3>${text.included}</h3><ul>${text.includeItems.map((item) => `<li>${item}</li>`).join("")}</ul></div><aside><h2>${text.priceHeading}</h2><div class="localized-price"><p>${text.vito}</p><strong>€${vitoPrice}</strong></div><div class="localized-price"><p>${text.sprinter}</p><strong>€${sprinterPrice}</strong></div><p><a class="button button-gold" href="${localPrefix}/#booking">${text.book}</a></p></aside></div></section>
<section class="localized-faq"><h2>${text.faq}</h2>${faq.map(([q,a]) => `<article><h3>${q}</h3><p>${a}</p></article>`).join("")}</section>
<section class="localized-links"><h2>${text.other}</h2><div>${Object.entries(routes).filter(([key]) => key !== slug).map(([key,value]) => `<a href="${localPrefix}/transfers/${key}/">${value[code]}</a>`).join("")}</div></section>
<section class="localized-contact" id="contact"><h2>${text.book}</h2><p>${text.contact}</p><a class="button button-gold" href="https://wa.me/905302655790">WhatsApp</a></section></main>
<footer><div class="footer-bottom"><span>© 2026 Antalya VIP Tourism</span><span><a href="${text.imprintUrl}">${text.imprint}</a> · <a href="${text.privacyUrl}">${text.privacy}</a></span></div></footer><script type="module" src="/src/consent.js"></script></body></html>`;
}

const [source, mainJs] = await Promise.all([readFile(path.join(root, "index.html"), "utf8"), readFile(path.join(root, "src/main.js"), "utf8")]);
const translations = extractTranslations(mainJs);
const longDistanceRoutes = new Set(["bodrum", "dalaman", "fethiye", "pamukkale", "kapadokya", "kizilagac"]);
for (const [code, text] of Object.entries(languages)) {
  if (["tr", "ru"].includes(code)) {
    await mkdir(path.join(root, code), { recursive: true });
    await writeFile(path.join(root, code, "index.html"), localizeHome(source, code, text, translations[code]));
  }
  for (const [slug, route] of Object.entries(routes)) {
    if (["en", "de"].includes(code) && !longDistanceRoutes.has(slug)) continue;
    const target = path.join(root, code === "en" ? "" : code, "transfers", slug);
    await mkdir(target, { recursive: true });
    await writeFile(path.join(target, "index.html"), routePage(code, slug, route, text));
  }
}
console.log("Generated localized route pages and Turkish/Russian homepages");
