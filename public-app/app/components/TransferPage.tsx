import { localizedRoute, publicRouteSlugs, routeCatalog } from "../../../src/routes.js";
import { useLanguage } from "../i18n";
import { routeCopy, type IndexableLanguage } from "../lib/seo";
import { BookingForm } from "./BookingForm";
import { Header } from "./Header";

type LocalizedRoute = NonNullable<ReturnType<typeof localizedRoute>>;

const copy = {
  en: { home: "Home", routes: "Transfer routes", priceHeading: "Fixed transfer prices", included: "Included in the price", duration: "Estimated time", distance: "Distance", from: "Price from", book: "Book your transfer", faq: "Frequently asked questions", other: "Other Antalya Airport transfers", intro: (name: string, duration: string, distance: string) => `The ${distance} journey from Antalya Airport to ${name} takes approximately ${duration} in normal traffic. Your chauffeur meets you in arrivals with a name sign and drives directly to your accommodation.`, items: ["Personal meet and greet", "Real-time flight tracking", "Airport parking and waiting", "Luggage assistance and bottled water", "Free child seat on request"] },
  de: { home: "Startseite", routes: "Transferrouten", priceHeading: "Feste Transferpreise", included: "Im Preis enthalten", duration: "Geschätzte Fahrzeit", distance: "Entfernung", from: "Preis ab", book: "Transfer buchen", faq: "Häufig gestellte Fragen", other: "Weitere Transfers vom Flughafen Antalya", intro: (name: string, duration: string, distance: string) => `Die ${distance} lange Fahrt vom Flughafen Antalya nach ${name} dauert bei normalem Verkehr ungefähr ${duration}. Ihr Chauffeur empfängt Sie in der Ankunftshalle mit Namensschild und fährt direkt zu Ihrer Unterkunft.`, items: ["Persönlicher Empfang mit Namensschild", "Flugverfolgung in Echtzeit", "Flughafenparken und Wartezeit", "Gepäckhilfe und Mineralwasser", "Kostenloser Kindersitz auf Wunsch"] },
  tr: { home: "Ana sayfa", routes: "Transfer rotaları", priceHeading: "Sabit transfer fiyatları", included: "Fiyata dahil olanlar", duration: "Tahmini süre", distance: "Mesafe", from: "Başlangıç fiyatı", book: "Transferinizi ayırtın", faq: "Sık sorulan sorular", other: "Diğer Antalya Havalimanı transferleri", intro: (name: string, duration: string, distance: string) => `Antalya Havalimanı ile ${name} arasındaki ${distance} mesafeli yolculuk normal trafik koşullarında yaklaşık ${duration} sürer. Şoförünüz sizi gelen yolcu salonunda isim tabelasıyla karşılar ve doğrudan konaklama adresinize götürür.`, items: ["Kişisel isim tabelasıyla karşılama", "Gerçek zamanlı uçuş takibi", "Havalimanı otoparkı ve bekleme", "Bagaj yardımı ve şişe su", "Talep üzerine ücretsiz çocuk koltuğu"] },
  ru: { home: "Главная", routes: "Маршруты трансфера", priceHeading: "Фиксированные цены", included: "В стоимость включено", duration: "Время в пути", distance: "Расстояние", from: "Цена от", book: "Забронировать трансфер", faq: "Частые вопросы", other: "Другие трансферы из аэропорта Антальи", intro: (name: string, duration: string, distance: string) => `Поездка из аэропорта Антальи в ${name} на расстояние ${distance} занимает примерно ${duration} при обычном движении. Водитель встретит вас в зале прилёта с именной табличкой и отвезёт прямо к месту проживания.`, items: ["Встреча с именной табличкой", "Отслеживание рейса в реальном времени", "Парковка и ожидание в аэропорту", "Помощь с багажом и вода", "Бесплатное детское кресло по запросу"] },
} as const;

export function TransferPage({ language, route }: { language: IndexableLanguage; route: LocalizedRoute }) {
  const { t } = useLanguage();
  const text = copy[language];
  const seo = routeCopy(language);
  const prefix = language === "en" ? "" : `/${language}`;
  const heading = seo.heading(route.name);
  const faq = seo.faq(route.name, route.prices.vito, route.durationLabel);

  return (
    <>
      <Header compact homeHref={`${prefix}/`} />
      <main>
        <section className="localized-route react-transfer-hero"><div className="eyebrow light"><span /><p>Antalya VIP Tourism</p></div><h1>{heading}</h1><p>{seo.description(route.name, route.prices.vito)}</p><p className="localized-campaign">{t("campaignApplied", "Online discount already applied to all transfer prices.")}</p><div className="localized-stats"><div><strong>{route.durationLabel}</strong><span>{text.duration}</span></div><div><strong>{route.distance}</strong><span>{text.distance}</span></div><div><strong>€{route.prices.vito}</strong><span>{text.from}</span></div></div></section>
        <section className="localized-content" id="details"><div className="localized-grid"><div><h2>{heading}</h2><p>{text.intro(route.name, route.durationLabel, route.distance)}</p><h3>{text.included}</h3><ul>{text.items.map((item) => <li key={item}>✓ {item}</li>)}</ul></div><aside><h2>{text.priceHeading}</h2><div className="localized-price"><p>Mercedes Vito · 7</p><strong>€{route.prices.vito}</strong></div><div className="localized-price"><p>Mercedes Sprinter · 13</p><strong>€{route.prices.sprinter}</strong></div><p><a className="button button-gold" href="#booking">{text.book}</a></p></aside></div></section>
        <section className="localized-faq"><h2>{text.faq}</h2>{faq.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</section>
        <BookingForm selection={{ route: route.slug, vehicle: "vito", nonce: 1 }} scrollOnSelect={false} />
        <section className="localized-links"><h2>{text.other}</h2><div>{publicRouteSlugs.filter((slug) => slug !== route.slug).map((slug) => <a href={`${prefix}/transfers/${slug}/`} key={slug}>{routeCatalog[slug].names[language]}</a>)}</div></section>
      </main>
      <footer><div className="footer-bottom"><span>© 2026 Antalya VIP Tourism</span><span><a href={language === "en" ? "/impressum.html" : `${prefix}/${language === "tr" ? "kunye" : "impressum"}/`}>Imprint</a> · <a href={language === "en" ? "/privacy/" : language === "de" ? "/de/datenschutz/" : language === "tr" ? "/tr/gizlilik/" : "/ru/privacy/"}>Privacy</a></span></div></footer>
      <a className="floating-whatsapp" href="https://wa.me/905302655790" target="_blank" rel="noreferrer"><span>◉</span><span>{t("chatWithUs", "Chat with us")}</span></a>
    </>
  );
}
