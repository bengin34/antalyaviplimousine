import { localizedRoute } from "../../../src/routes.js";
import type { hotelCatalog } from "../../../src/hotels.js";
import { BookingForm } from "./BookingForm";
import { StaticPageHeader } from "./StaticPageHeader";

type Hotel = (typeof hotelCatalog)[keyof typeof hotelCatalog];

export function HotelPage({ hotel }: { hotel: Hotel }) {
  const route = localizedRoute(hotel.regionSlug, "de");
  if (!route) return null;

  const transferHref = `/de/transfers/${hotel.regionSlug}/`;
  const bookingHref = "/de/#booking";

  return <>
    <StaticPageHeader homeHref="/de/" homeLabel="Startseite" secondaryHref={transferHref} secondaryLabel="Transferroute" tertiaryHref="#kontakt" tertiaryLabel="WhatsApp" ctaHref={bookingHref} ctaLabel="Transfer buchen" />
    <main>
      <section className="localized-route">
        <div className="eyebrow light"><span /><p>Antalya VIP Tourism</p></div>
        <h1>Flughafen Antalya → {hotel.name} Privattransfer</h1>
        <p>Privater Festpreis-Transfer vom Flughafen Antalya direkt zum {hotel.name}. Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung und bringt Sie mit Ihrem Fahrer zusammen; anschließend fährt Ihre Gruppe ohne Zwischenstopps zum Hotel.</p>
        <a className="button button-gold" href={bookingHref}>Jetzt Transfer buchen</a>
        <ul className="localized-trust"><li>Bis zu 7 Personen</li><li>Keine Vorauszahlung erforderlich</li><li>Zahlung direkt beim Fahrer</li><li>Kostenloser Kindersitz auf Anfrage</li></ul>
        <div className="localized-stats"><div><strong>{route.durationLabel}</strong><span>Geschätzte Fahrzeit</span></div><div><strong>{route.distance}</strong><span>Entfernung</span></div><div><strong>€{route.prices.vito}</strong><span>Preis ab</span></div></div>
      </section>
      <section className="localized-content" id="details"><div className="localized-grid"><div>
        <h2>Ihr privater Transfer zum {hotel.name}</h2>
        <p>Die Fahrt vom Flughafen Antalya nach {route.name} dauert bei normalem Verkehr ungefähr {route.durationLabel}. Der angegebene Festpreis gilt für das gesamte Fahrzeug, nicht pro Person.</p>
        <h3>Lage des Hotels</h3><p>{hotel.locationCopy}</p><h3>Ankunft, Zahlung und Kindersitz</h3>
        <p>Nach der Gepäckausgabe gehen Sie bitte zum Meet &amp; Greet Bereich J / 777. Unser Team bringt Sie mit Ihrem Fahrer zusammen. Wir verfolgen Ihren Flug; bei Verspätung passen wir die Abholung ohne Aufpreis an. Sie zahlen direkt beim Fahrer. Kindersitze stellen wir auf Wunsch kostenlos bereit.</p>
        <p><a className="button button-gold" href={transferHref}>Transfer nach {route.name}</a></p>
      </div><aside><h2>Feste Transferpreise</h2><div className="localized-price"><p>Mercedes Vito · bis 6 Personen</p><strong>€{route.prices.vito}</strong><span>Preis für das gesamte Fahrzeug</span></div><div className="localized-price"><p>Mercedes Sprinter · bis 12 Personen</p><strong>€{route.prices.sprinter}</strong><span>Preis für das gesamte Fahrzeug</span></div></aside></div></section>
      <section className="localized-faq"><h2>Häufig gestellte Fragen</h2><article><h3>Wie lange dauert die Fahrt zum {hotel.name}?</h3><p>Bei normalem Verkehr ungefähr {route.durationLabel}.</p></article><article><h3>Was kostet der Transfer?</h3><p>Der Mercedes Vito kostet ab €{route.prices.vito} pro Fahrzeug.</p></article><article><h3>Was passiert bei einer Flugverspätung?</h3><p>Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an.</p></article><article><h3>Wie lange wartet mein Chauffeur am Flughafen?</h3><p>Die ersten 90 Minuten nach der Landung sind kostenfrei enthalten, und bei Flugverspätungen verschiebt sich dieses Zeitfenster automatisch.</p></article><article><h3>Wie bezahle ich den Transfer?</h3><p>Bar an Ihren Chauffeur zu Beginn der Fahrt - zum Festpreis aus Ihrer Buchung, pro Fahrzeug.</p></article></section>
      <section className="localized-contact" id="kontakt"><h2>Transfer buchen</h2><p>Für Buchungen und Fragen erreichen Sie uns über WhatsApp.</p><a className="button button-gold" href="https://wa.me/905302655790">WhatsApp</a></section>
    </main>
    <div hidden aria-hidden="true"><BookingForm selection={{ route: hotel.regionSlug, vehicle: "vito", nonce: 1 }} scrollOnSelect={false} /></div>
  </>;
}
