import { publicRouteSlugs, routeCatalog } from "../../../src/routes.js";
import { hotelBySlug } from "../../../src/hotels.js";
import translationData from "../generated/legacy-translations.json";

export const domain = "https://antalyaviptourism.com";
export const indexableLanguages = ["en", "de", "fr", "tr", "ru", "cs"] as const;
export type IndexableLanguage = (typeof indexableLanguages)[number];

const homeSeo = {
  en: { locale: "en_GB", title: "Antalya Airport Transfer | Private VIP Tourism Service", description: "Private fixed-price transfers from Antalya Airport to resorts across Türkiye." },
  de: { locale: "de_DE", title: "Flughafen Antalya Transfer | Privater VIP Chauffeurservice", description: "Private Festpreis-Transfers vom Flughafen Antalya zu Reisezielen in der gesamten Türkei." },
  tr: { locale: "tr_TR", title: "Antalya Havalimanı Transferi | Özel VIP Transfer", description: "Antalya Havalimanı'ndan Belek, Side, Kemer, Alanya ve çevresine özel sabit fiyatlı transfer. Vito ve Sprinter, uçuş takibi ve karşılama." },
  ru: { locale: "ru_RU", title: "Трансфер из аэропорта Антальи | Частный VIP-трансфер", description: "Частные трансферы по фиксированной цене из аэропорта Антальи в Белек, Сиде, Кемер, Аланью и другие курорты. Встреча и отслеживание рейса." },
  fr: { locale: "fr_FR", title: "Transfert Aéroport Antalya | Service VIP Privé", description: "Transferts privés à prix fixe depuis l'aéroport d'Antalya vers Belek, Side, Kemer et Alanya. Accueil, suivi de vol et service porte-à-porte." },
  cs: { locale: "cs_CZ", title: "Transfer z letiště Antalya | Soukromá VIP přeprava", description: "Soukromé transfery s pevnou cenou z letiště Antalya do Beleku, Side, Kemeru a Alanye. Uvítání, sledování letů a služba od dveří ke dveřím." },
} as const;

const healthSeo = {
  en: {
    locale: "en_GB",
    title: "Health Travel Coordination in Antalya | Antalya VIP Tourism",
    description: "Plan your Antalya health journey with clear provider roles, private transfers, accommodation coordination and continuity of care led by authorised medical teams.",
    service: "Health travel coordination and concierge logistics",
  },
  de: {
    locale: "de_DE",
    title: "Koordination Ihrer Gesundheitsreise in Antalya | Antalya VIP Tourism",
    description: "Planen Sie Ihre Gesundheitsreise nach Antalya mit klaren Zuständigkeiten, privaten Transfers, Unterkunftskoordination und ärztlich geführter Betreuung.",
    service: "Koordination von Gesundheitsreisen und Concierge-Logistik",
  },
  tr: {
    locale: "tr_TR",
    title: "Antalya Sağlık Seyahati Koordinasyonu | Antalya VIP Tourism",
    description: "Antalya'daki sağlık seyahatinizi net görev ayrımı, özel transfer, konaklama koordinasyonu ve yetkili sağlık ekiplerinin klinik takibiyle planlayın.",
    service: "Sağlık seyahati koordinasyonu ve concierge lojistiği",
  },
  ru: {
    locale: "ru_RU",
    title: "Координация медицинской поездки в Анталью | Antalya VIP Tourism",
    description: "Спланируйте поездку в Анталью с чётким разделением обязанностей, частным трансфером, координацией проживания и наблюдением медицинской команды.",
    service: "Координация медицинских поездок и консьерж-логистика",
  },
  fr: {
    locale: "fr_FR",
    title: "Coordination de voyage de santé à Antalya | Antalya VIP Tourism",
    description: "Planifiez votre voyage de santé à Antalya avec des rôles clairs, des transferts privés, une coordination d'hébergement et un suivi médical continu par des équipes autorisées.",
    service: "Coordination de voyages de santé et logistique conciergerie",
  },
  cs: {
    locale: "cs_CZ",
    title: "Koordinace zdravotní cesty do Antalye | Antalya VIP Tourism",
    description: "Naplánujte svou zdravotní cestu do Antalye s jasným rozdělením rolí, soukromými transfery, koordinací ubytování a kontinuální péčí vedenou odbornými lékařskými týmy.",
    service: "Koordinace zdravotní cesty a concierge logistika",
  },
} as const;

const routeText = {
  en: {
    title: (name: string) => `Antalya Airport to ${name} Transfer | Private Fixed-Price Service`,
    description: (name: string, price: number) => `Private fixed-price transfer from Antalya Airport to ${name} from €${price}. Meet and greet, flight tracking and door-to-door service.`,
    heading: (name: string) => `Private transfer from Antalya Airport to ${name}`,
    faq: (name: string, price: number, duration: string) => [[`How long is the transfer from Antalya Airport to ${name}?`, `The journey takes approximately ${duration} in normal traffic.`], [`What is the fixed transfer price to ${name}?`, `Mercedes Vito prices start from €${price} per vehicle. The confirmed total is shown when booking.`], ["What happens if my flight is delayed?", "We track your flight in real time and adjust the meeting time at no extra charge."]],
  },
  de: {
    title: (name: string) => `Flughafen Antalya nach ${name} Transfer | Privater Festpreis-Transfer`,
    description: (name: string, price: number) => `Privater Festpreis-Transfer vom Flughafen Antalya nach ${name} ab €${price}. Meet & Greet, Flugverfolgung und Tür-zu-Tür-Service.`,
    heading: (name: string) => `Privater Transfer vom Flughafen Antalya nach ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Wie lange dauert der Transfer vom Flughafen Antalya nach ${name}?`, `Die Fahrt dauert bei normalem Verkehr ungefähr ${duration}.`], [`Was kostet der Festpreis-Transfer nach ${name}?`, `Die Preise für einen Mercedes Vito beginnen bei €${price} pro Fahrzeug.`], ["Was passiert bei einer Flugverspätung?", "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an."]],
  },
  tr: {
    title: (name: string) => `Antalya Havalimanı ${name} Transferi | Özel Sabit Fiyat`,
    description: (name: string, price: number) => `Antalya Havalimanı'ndan ${name} bölgesine €${price}'dan başlayan özel sabit fiyatlı transfer. Uçuş takibi, karşılama ve kapıdan kapıya hizmet.`,
    heading: (name: string) => `Antalya Havalimanı'ndan ${name} bölgesine özel transfer`,
    faq: (name: string, price: number, duration: string) => [[`Antalya Havalimanı ile ${name} arası transfer ne kadar sürer?`, `Normal trafik koşullarında yolculuk yaklaşık ${duration} sürer.`], [`${name} transferinin sabit fiyatı nedir?`, `Mercedes Vito fiyatları araç başına €${price}'dan başlar.`], ["Uçuşum gecikirse ne olur?", "Uçuşunuzu gerçek zamanlı takip eder, karşılama saatini ücretsiz olarak güncelleriz."]],
  },
  ru: {
    title: (name: string) => `Трансфер из аэропорта Антальи в ${name} | Фиксированная цена`,
    description: (name: string, price: number) => `Частный трансфер из аэропорта Антальи в ${name} от €${price} за автомобиль. Встреча, отслеживание рейса и доставка до отеля.`,
    heading: (name: string) => `Частный трансфер из аэропорта Антальи в ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Сколько длится трансфер из аэропорта Антальи в ${name}?`, `При обычном движении поездка занимает около ${duration}.`], [`Сколько стоит трансфер в ${name}?`, `Стоимость Mercedes Vito начинается от €${price} за автомобиль.`], ["Что произойдёт при задержке рейса?", "Мы отслеживаем рейс в реальном времени и бесплатно корректируем время встречи."]],
  },
  fr: {
    title: (name: string) => `Transfert Aéroport Antalya vers ${name} | Prix Fixe Privé`,
    description: (name: string, price: number) => `Transfert privé à prix fixe depuis l'aéroport d'Antalya vers ${name} à partir de €${price}. Accueil, suivi de vol et service porte-à-porte.`,
    heading: (name: string) => `Transfert privé depuis l'aéroport d'Antalya vers ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Combien de temps dure le transfert de l'aéroport d'Antalya vers ${name} ?`, `Le trajet dure environ ${duration} en trafic normal.`], [`Quel est le prix fixe du transfert vers ${name} ?`, `Les prix Mercedes Vito commencent à €${price} par véhicule. Le montant total confirmé est affiché lors de la réservation.`], ["Que se passe-t-il si mon vol est retardé ?", "Nous suivons votre vol en temps réel et ajustons l'heure de prise en charge sans frais supplémentaires."]],
  },
  cs: {
    title: (name: string) => `Transfer z letiště Antalya do ${name} | Soukromá pevná cena`,
    description: (name: string, price: number) => `Soukromý transfer s pevnou cenou z letiště Antalya do ${name} od €${price}. Uvítání, sledování letů a přeprava od dveří ke dveřím.`,
    heading: (name: string) => `Soukromý transfer z letiště Antalya do ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Jak dlouho trvá transfer z letiště Antalya do ${name}?`, `Cesta trvá přibližně ${duration} při běžném provozu.`], [`Jaká je pevná cena transferu do ${name}?`, `Ceny Mercedes Vito začínají od €${price} za vozidlo. Potvrzená celková cena je zobrazena při rezervaci.`], ["Co se stane, když má můj let zpoždění?", "Sledujeme váš let v reálném čase a upravujeme čas setkání bez příplatku."]],
  },
} as const;

export const languageFromPath = (pathname: string): IndexableLanguage => {
  const candidate = pathname.split("/").filter(Boolean)[0];
  return candidate === "de" || candidate === "fr" || candidate === "tr" || candidate === "ru" || candidate === "cs" ? candidate : "en";
};

export const localizedPath = (language: IndexableLanguage, suffix = "") =>
  `/${language === "en" ? "" : `${language}/`}${suffix}`;

const alternateDescriptors = (suffix = "") => [
  ...indexableLanguages.map((language) => ({ tagName: "link", rel: "alternate", hrefLang: language, href: `${domain}${localizedPath(language, suffix)}` })),
  { tagName: "link", rel: "alternate", hrefLang: "x-default", href: `${domain}${localizedPath("en", suffix)}` },
];

const socialDescriptors = (
  title: string,
  description: string,
  url: string,
  locale: string,
  image = `${domain}/assets/optimized/og-antalya-transfer.jpg`,
) => [
  { property: "og:type", content: "website" }, { property: "og:url", content: url },
  { property: "og:site_name", content: "Antalya VIP Tourism" }, { property: "og:title", content: title },
  { property: "og:description", content: description }, { property: "og:image", content: image },
  { property: "og:locale", content: locale }, { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
  { name: "twitter:image", content: image },
];

export function homeMeta(language: IndexableLanguage) {
  const seo = homeSeo[language];
  const pathname = localizedPath(language);
  const resources = translationData.resources as Record<string, Record<string, string>>;
  const copy = resources[language] ?? resources.en;
  const faq = [1, 2, 3, 4, 5].map((number) => {
    const word = ["One", "Two", "Three", "Four", "Five"][number - 1];
    return { "@type": "Question", name: copy[`faq${word}Q`], acceptedAnswer: { "@type": "Answer", text: copy[`faq${word}A`] } };
  });
  const travelAgency = {
    "@context": "https://schema.org", "@type": "TravelAgency", name: "Antalya VIP Tourism",
    url: domain, telephone: "+90 530 265 57 90", image: `${domain}/assets/optimized/og-antalya-transfer.jpg`,
    address: { "@type": "PostalAddress", streetAddress: "Belek Mah. Belek 61 Sk. Belek Deniz Apt No: 19 Ic Kapi No: 4", addressLocality: "Serik", addressRegion: "Antalya", addressCountry: "TR" },
    areaServed: publicRouteSlugs.map((slug) => ({ "@type": "City", name: routeCatalog[slug].names.en })),
  };
  return [
    { title: seo.title }, { name: "description", content: seo.description },
    { tagName: "link", rel: "canonical", href: `${domain}${pathname}` }, ...alternateDescriptors(),
    ...socialDescriptors(seo.title, seo.description, `${domain}${pathname}`, seo.locale),
    { "script:ld+json": travelAgency },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq } },
  ];
}

export function healthMeta(language: IndexableLanguage) {
  const seo = healthSeo[language];
  const pathname = localizedPath(language, "health/");
  const url = `${domain}${pathname}`;
  const image = `${domain}/assets/optimized/og-health-tourism.jpg`;
  const provider = {
    "@type": "TravelAgency",
    name: "Antalya VIP Tourism",
    url: domain,
    telephone: "+90 530 265 57 90",
  };

  return [
    { title: seo.title },
    { name: "description", content: seo.description },
    { tagName: "link", rel: "canonical", href: url },
    ...alternateDescriptors("health/"),
    ...socialDescriptors(seo.title, seo.description, url, seo.locale, image),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Antalya VIP Tourism", item: `${domain}${localizedPath(language)}` },
          { "@type": "ListItem", position: 2, name: seo.service, item: url },
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Service",
        name: seo.service,
        description: seo.description,
        url,
        provider,
        areaServed: { "@type": "AdministrativeArea", name: "Antalya, Türkiye" },
        audience: { "@type": "Audience", audienceType: "International travellers" },
      },
    },
  ];
}

export function clinicMeta() {
  const title = "ORIVA Clinic — Premium Estetik Klinik Web Sitesi Demosu";
  const description = "Antalya estetik klinikleri için hazırlanmış kurgusal premium web sitesi konsepti. Gerçek klinik, hekim, hasta veya tedavi sonucu içermez.";
  const url = `${domain}/clinic/`;
  const image = `${domain}/assets/optimized/og-clinic-demo.jpg`;

  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex,nofollow" },
    { tagName: "link", rel: "canonical", href: url },
    ...socialDescriptors(title, description, url, "tr_TR", image),
  ];
}

export function routeMeta(language: IndexableLanguage, slug: string) {
  const route = routeCatalog[slug as keyof typeof routeCatalog];
  if (!route) return [];
  const text = routeText[language];
  const names = route.names as Record<string, string>;
  const durations = route.duration as Record<string, string>;
  const name = names[language] ?? names["en"];
  const title = text.title(name);
  const description = text.description(name, route.prices.vito);
  const pathname = localizedPath(language, `transfers/${slug}/`);
  const url = `${domain}${pathname}`;
  const faq = text.faq(name, route.prices.vito, durations[language] ?? durations["en"]);
  return [
    { title }, { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url }, ...alternateDescriptors(`transfers/${slug}/`),
    ...socialDescriptors(title, description, url, homeSeo[language].locale),
    { "script:ld+json": { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${domain}${localizedPath(language)}` }, { "@type": "ListItem", position: 2, name: "Transfer routes", item: `${domain}${localizedPath(language)}#routes` }, { "@type": "ListItem", position: 3, name: text.heading(name), item: url }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "Service", name: text.heading(name), url, provider: { "@type": "TravelAgency", name: "Antalya VIP Tourism", url: domain, telephone: "+90 530 265 57 90" }, areaServed: { "@type": "Place", name }, offers: [{ "@type": "Offer", name: "Mercedes Vito", price: String(route.prices.vito), priceCurrency: "EUR" }, { "@type": "Offer", name: "Mercedes Sprinter", price: String(route.prices.sprinter), priceCurrency: "EUR" }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) } },
  ];
}

export function hotelMeta(slug: string) {
  const hotel = hotelBySlug(slug);
  if (!hotel) return [];
  const route = routeCatalog[hotel.regionSlug];
  const url = `${domain}/de/hotels/${hotel.slug}/`;
  const transferUrl = `${domain}/de/transfers/${hotel.regionSlug}/`;
  const title = `Flughafen Antalya → ${hotel.name} Transfer | Privater Festpreis`;
  const description = `Privater Transfer vom Flughafen Antalya zum ${hotel.name} ab €${route.prices.vito} pro Fahrzeug. Flugverfolgung, Empfang und direkte Fahrt zum Hotel.`;
  const serviceName = `Privattransfer vom Flughafen Antalya zum ${hotel.name}`;
  const faq = [
    { "@type": "Question", name: `Wie lange dauert die Fahrt zum ${hotel.name}?`, acceptedAnswer: { "@type": "Answer", text: `Bei normalem Verkehr ungefähr ${route.duration.de}.` } },
    { "@type": "Question", name: "Was kostet der Transfer?", acceptedAnswer: { "@type": "Answer", text: `Der Mercedes Vito kostet ab €${route.prices.vito} pro Fahrzeug.` } },
  ];
  return [
    { title }, { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    ...socialDescriptors(title, description, url, homeSeo.de.locale),
    { "script:ld+json": { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Antalya VIP Tourism", item: `${domain}/de/` }, { "@type": "ListItem", position: 2, name: `Transfer nach ${route.names.de}`, item: transferUrl }, { "@type": "ListItem", position: 3, name: hotel.name, item: url }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "Service", name: serviceName, description, url, provider: { "@type": "TravelAgency", name: "Antalya VIP Tourism", url: domain, telephone: "+90 530 265 57 90" }, areaServed: { "@type": "Hotel", name: hotel.name }, offers: [{ "@type": "Offer", name: "Mercedes Vito", price: String(route.prices.vito), priceCurrency: "EUR" }, { "@type": "Offer", name: "Mercedes Sprinter", price: String(route.prices.sprinter), priceCurrency: "EUR" }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq } },
  ];
}

export const routeCopy = (language: IndexableLanguage) => routeText[language];