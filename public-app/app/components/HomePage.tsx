import { lazy, Suspense, useEffect, useRef, useState } from "react";
const ReactPlayer = lazy(() => import("react-player"));
import { publicRouteSlugs, routeCatalog } from "../../../src/routes.js";
import { LineBreakText, useLanguage } from "../i18n";
import { homeFaqOrder } from "../lib/faq";
import { BookingForm } from "./BookingForm";
import { Header } from "./Header";
import { Icon } from "./Icon";

const VIDEO_ID = "r79dH1HLJtk";

type Vehicle = "vito" | "sprinter";

const serviceItems = [
  [
    "trackingTitle",
    "Flight tracking",
    "trackingBody",
    "We monitor your flight in real time and adjust your pick-up automatically, at no extra charge.",
    "plane",
  ],
  [
    "chauffeurTitle",
    "Professional chauffeurs",
    "chauffeurBody",
    "Immaculately presented, discreet and selected for their local knowledge and service standards.",
    "user-check",
  ],
  [
    "greetTitle",
    "Meet & greet",
    "greetBody",
    "Your chauffeur welcomes you in arrivals and assists with luggage.",
    "sparkle",
  ],
  [
    "supportTitle",
    "24/7 concierge",
    "supportBody",
    "A real person is always available by phone or WhatsApp before, during and after your journey.",
    "headphones",
  ],
  [
    "priceTitle",
    "Fixed prices",
    "priceBody",
    "The price confirmed is the price you pay. Waiting time, parking and flight delays are included.",
    "tag",
  ],
  [
    "familyTitle",
    "Family ready",
    "familyBody",
    "Age-appropriate child seats, spacious cabins and patient assistance for a relaxed family arrival.",
    "baby",
  ],
] as const;

const reviews = [
  [
    "L.E",
    "LE",
    "5 days ago",
    "It was a perfect experience — I recommend them :)",
    "🇫🇷 France",
  ],
  [
    "M.Ö",
    "MÖ",
    "2 months ago",
    "I found them online and booked after reading the reviews — so glad I did. The car was air-conditioned and spotless, and the driver was very friendly. They never left us struggling in the Antalya heat. Thank you.",
    "🇹🇷 Turkey",
  ],
  [
    "R.M",
    "RM",
    "1 week ago",
    "Thank you for your service. The driver was very patient — it was perfect 👌🙏❤️",
    "🇩🇿 Algeria",
  ],
  [
    "A.K",
    "AK",
    "2 months ago",
    "I had no issues at all during my transfer. The vehicles were new and clean, and they give the utmost importance to driving safety. Thank you.",
    "🇹🇷 Turkey",
  ],
  [
    "P.V",
    "PV",
    "1 week ago",
    "Perfect service.",
    "🇧🇪 Belgium",
  ],
  [
    "A.KA",
    "AK",
    "2 months ago",
    "We had a wonderful trip — cold refreshments on board, great comfort, and a smooth drive. It truly deserves 5 stars 😊",
    "🇹🇷 Turkey",
  ],
  [
    "M.A",
    "MA",
    "3 weeks ago",
    "I highly recommend them.",
    "🇸🇦 Saudi Arabia",
  ],
  [
    "E.D",
    "ED",
    "2 months ago",
    "It was a journey with excellent service. We were picked up right on time and the vehicle was very comfortable. Our driver was a true professional and got us there safely. We'll choose you again on our next trip. Thank you.",
    "🇹🇷 Turkey",
  ],
  [
    "A.I",
    "AI",
    "2 months ago",
    "We received support for our transfer in Antalya and were extremely satisfied. Many thanks to Antalya VIP Tourism for helping us with a super-luxurious vehicle and such a kind, friendly manner. Coming from Germany, getting service like this made us very happy. I highly recommend them to anyone who needs an airport–hotel transfer.",
    "🇩🇪 Germany",
  ],
  [
    "R.Ö",
    "RÖ",
    "2 months ago",
    "A genuinely attentive company — I recommend them to everyone. The staff were very helpful from the very first moment. Thanks for everything.",
    "🇳🇱 Netherlands",
  ],
  [
    "E.Y",
    "EY",
    "2 months ago",
    "It was flawless. Thank you!",
    "🇸🇦 Saudi Arabia",
  ],
  [
    "D.E",
    "DE",
    "2 months ago",
    "A reliable, friendly team. You can choose them with complete peace of mind.",
    "🇩🇪 Germany",
  ],
] as const;

const routeOrder = [
  "belek",
  "side",
  "kemer",
  "alanya",
  "tekirova",
  "manavgat",
  "kizilagac",
  "bogazkent",
  "antalya",
  "bodrum",
  "dalaman",
  "fethiye",
  "pamukkale",
  "kapadokya",
] as const;

const routeImageClasses = [
  "route-image-1",
  "route-image-2",
  "route-image-3",
  "route-image-4",
  "route-image-5",
  "route-image-6",
  "route-image-6",
  "route-image-1 route-image-alt-1",
  "route-image-2 route-image-alt-2",
  "route-image-3 route-image-alt-3",
  "route-image-4 route-image-alt-4",
  "route-image-5 route-image-alt-5",
  "route-image-6 route-image-alt-6",
  "route-image-3 route-image-alt-7",
] as const;

const routeDisplayNames: Record<(typeof routeOrder)[number], string> = {
  belek: "Belek",
  side: "Side",
  kemer: "Kemer",
  alanya: "Alanya",
  tekirova: "Tekirova",
  manavgat: "Manavgat",
  kizilagac: "Manavgat/Kızılağaç",
  bogazkent: "Boğazkent",
  antalya: "Antalya City",
  bodrum: "Bodrum",
  dalaman: "Dalaman",
  fethiye: "Fethiye",
  pamukkale: "Pamukkale",
  kapadokya: "Kapadokya",
};

const fallbackFleetPhotos = [
  {
    src: "/assets/optimized/chauffeur-arrival.jpg",
    caption: "Chauffeur arrival",
    alt: "Professional chauffeur opening a luxury black executive van",
  },
  {
    src: "/assets/optimized/executive-interior.jpg",
    caption: "VIP interior",
    alt: "Cream leather executive seating inside a luxury passenger van",
  },
  {
    src: "/assets/optimized/antalya-coastline-hero.jpg",
    caption: "Exterior",
    alt: "Luxury black executive van driving along Antalya's coastline",
  },
];

const vehiclePhotoModules = import.meta.glob(
  "../../../assets/optimized/images/*.webp",
  { eager: true, import: "default", query: "?url" },
) as Record<string, string>;
const customerPhotoModules = import.meta.glob(
  "../../../assets/optimized/customers/*.jpg",
  { eager: true, import: "default", query: "?url" },
) as Record<string, string>;

const photoCaption = (path: string) => {
  const name = path.toLowerCase();
  if (name.includes("customer")) return "Happy customer";
  if (name.includes("interior") || name.includes("lounge"))
    return "VIP interior";
  if (name.includes("cabin") || name.includes("seat")) return "Passenger cabin";
  if (
    name.includes("arrival") ||
    name.includes("chauffeur") ||
    name.includes("driver")
  )
    return "Chauffeur arrival";
  if (
    name.includes("exterior") ||
    name.includes("front") ||
    name.includes("side")
  )
    return "Exterior";
  return "Our vehicle";
};

const vehiclePhotos = Object.entries(vehiclePhotoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    caption: photoCaption(path),
    alt: `${photoCaption(path)} photo from Antalya VIP Tourism fleet`,
  }));
const customerPhotos = Object.entries(customerPhotoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => ({
    src,
    caption: "Happy customer",
    alt: "Satisfied customer with Antalya VIP Tourism transfer service",
  }));
const fleetPhotos = (() => {
  const photos = [...vehiclePhotos];
  const step = photos.length / (customerPhotos.length + 1);
  customerPhotos.forEach((photo, index) =>
    photos.splice(Math.round(step * (index + 1)) + index, 0, photo),
  );
  return photos.length ? photos : fallbackFleetPhotos;
})();

export function HomePage({ initialLanguage }: { initialLanguage: string }) {
  const { language, t } = useLanguage();
  const [fleet, setFleet] = useState<Vehicle>("sprinter");
  const [fleetPhotoIndex, setFleetPhotoIndex] = useState(0);
  const [selection, setSelection] = useState<{
    route: string;
    vehicle: Vehicle;
    nonce: number;
  }>();
  const [openFaq, setOpenFaq] = useState(0);
  const [routeSliderEdges, setRouteSliderEdges] = useState({
    atStart: true,
    atEnd: false,
  });
  const routeSlider = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const routePrefix = ["de", "tr", "ru"].includes(initialLanguage)
    ? `/${initialLanguage}`
    : "";
  const routeAirportName =
    (
      {
        de: "Flughafen Antalya",
        tr: "Antalya Havalimanı",
        ru: "Аэропорт Антальи",
      } as const
    )[initialLanguage as "de" | "tr" | "ru"] ?? "Antalya Airport";
  const privacyHref =
    initialLanguage === "de"
      ? "/de/datenschutz/"
      : initialLanguage === "tr"
        ? "/tr/gizlilik/"
        : initialLanguage === "ru"
          ? "/ru/privacy/"
          : "/privacy/";
  const imprintHref =
    initialLanguage === "de"
      ? "/de/impressum/"
      : initialLanguage === "tr"
        ? "/tr/kunye/"
        : initialLanguage === "ru"
          ? "/ru/impressum/"
          : "/impressum.html";
  const fleetCopy =
    fleet === "sprinter"
      ? {
          name: "Mercedes Sprinter",
          shortName: "Sprinter",
          classKey: "fleetVclassClass",
          classFallback: "Business · First Class",
          descriptionKey: "fleetVclassDescription",
          descriptionFallback:
            "Spacious VIP transport for larger groups, with generous room for passengers and luggage.",
          guests: 13,
          bags: 12,
        }
      : {
          name: "Mercedes Vito",
          shortName: "Vito",
          classKey: "fleetVitoClass",
          classFallback: "VIP · Grand Touring",
          descriptionKey: "fleetVitoDescription",
          descriptionFallback:
            "A refined private cabin for families and small groups travelling in comfort.",
          guests: 8,
          bags: 6,
        };
  const fleetPhoto = fleetPhotos[fleetPhotoIndex % fleetPhotos.length];

  const bookRoute = (route: string, vehicle: Vehicle = "vito") => {
    window.gtag?.("event", "route_selected", { route, vehicle, source: "home_page" });
    setSelection({ route, vehicle, nonce: Date.now() });
  };
  const scrollRoutes = (direction: -1 | 1) => {
    const card = routeSlider.current?.querySelector<HTMLElement>(".route-card");
    routeSlider.current?.scrollBy({
      left: direction * ((card?.offsetWidth ?? 340) + 15),
      behavior: "smooth",
    });
  };
  const changeFleet = (vehicle: Vehicle) => {
    setFleet(vehicle);
    setFleetPhotoIndex(0);
  };
  const changeFleetPhoto = (direction: -1 | 1) =>
    setFleetPhotoIndex(
      (index) => (index + direction + fleetPhotos.length) % fleetPhotos.length,
    );

  const faqItems = homeFaqOrder.map((number) => [
    t(`faq${number}Q`, "Frequently asked question"),
    t(`faq${number}A`, "Contact us for complete details."),
    `faq-${number}`,
  ]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const index = faqItems.findIndex(([, , id]) => id === hash);
    if (index >= 0) setOpenFaq(index);
    const target = document.getElementById(hash);
    if (target) {
      requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    const slider = routeSlider.current;
    if (!slider) return;
    const update = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      setRouteSliderEdges({
        atStart: slider.scrollLeft <= 4,
        atEnd: slider.scrollLeft >= maxScroll - 4,
      });
    };
    update();
    slider.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      slider.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".service-card, .route-card, .review-card"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => {
      const siblings = Array.from(element.parentElement?.children ?? []);
      const delay = (siblings.indexOf(element) % 4) * 0.09;
      element.style.opacity = "0";
      element.style.transform = "translateY(22px)";
      element.style.transition = `opacity .65s ease ${delay}s, transform .65s ease ${delay}s, box-shadow .35s ease`;
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="hero" id="top">
          <picture className="hero-media">
            <source
              srcSet="/assets/optimized/antalya-coastline-hero.webp"
              type="image/webp"
            />
            <img
              src="/assets/optimized/antalya-coastline-hero.jpg"
              alt="Luxury black executive van driving along Antalya's coastline"
              width="1672"
              height="941"
              fetchPriority="high"
            />
          </picture>
          <div className="hero-shade" />
          <div className="hero-grain" />
          <div className="hero-content">
            <div className="hero-copy">
              <div className="eyebrow light reveal">
                <span />
                <p>{t("heroEyebrow", "Private chauffeur service · Antalya")}</p>
              </div>
              <div className="campaign-badge reveal">
                <span>{t("campaignBadge", "Online special")}</span>
                <strong>{t("campaignDiscount", "25% off")}</strong>
                <span>{t("campaignScope", "all transfer prices")}</span>
              </div>
              <h1 className="reveal">
                <LineBreakText
                  value={t(
                    "heroTitle",
                    "Premium Airport<br />Transfers in Antalya",
                  )}
                />
              </h1>
              <p className="hero-subtitle reveal">
                {t(
                  "heroSubtitle",
                  "Private chauffeur-driven transfers from Antalya Airport to Belek, Side, Kemer and Alanya.",
                )}
              </p>
              <div className="hero-buttons reveal">
                <a className="button button-gold" href="#booking">
                  <span>{t("bookTransfer", "Book your transfer")}</span>
                  <Icon name="arrow-right" className="icon" />
                </a>
                <a className="button button-glass" href="#booking">
                  {t("instantQuote", "Get instant quote")}
                </a>
              </div>
              {language === "de" && <ul className="hero-payment-trust reveal"><li>Keine Vorauszahlung erforderlich</li><li>Zahlung direkt beim Fahrer</li><li>Fester Gesamtpreis</li><li>Keine versteckten Gebühren</li></ul>}
            </div>
            <div className="hero-proof reveal">
              <div className="rating-lockup">
                <div className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <strong>4.9</strong>
              </div>
              <div className="proof-divider" />
              <p>
                <span>{t("googleRated", "Google rated")}</span>
                <strong>
                  {t("trustedGuests", "Trusted by 2,500+ guests")}
                </strong>
              </p>
            </div>
          </div>
          <div className="hero-scroll" aria-hidden="true">
            <span>{t("discover", "Discover")}</span>
            <i />
          </div>
        </section>

        <div className="trust-bar" aria-label="Service credentials">
          {[
            ["tbLicensed", "TÜRSAB Licensed"],
            ["tbFlightTracking", "Flight Tracking"],
            ["tbFixedPrice", "Fixed Pricing"],
            ["tb247Concierge", "24/7 Concierge"],
            ["tbChildSeats", "Child Seats Included"],
          ].map(([key, fallback]) => (
            <div className="trust-bar-item" key={key}>
              <span className="trust-bar-check">✓</span>
              <span>{t(key, fallback)}</span>
            </div>
          ))}
        </div>

        <BookingForm selection={selection} />

        <section className="trust-strip" aria-label="Service guarantees">
          {[
            ["flightTracking", "Real-time flight tracking", "clock"],
            ["fixedPrice", "Fixed price guarantee", "shield"],
            ["meetGreet", "Personal meet & greet", "sparkle"],
            ["speakingDrivers", "English & German speaking", "globe"],
          ].map(([key, fallback, icon]) => (
            <div key={key}>
              <Icon name={icon as "clock"} className="icon" />
              <span>{t(key, fallback)}</span>
            </div>
          ))}
        </section>
        <div
          className="price-strip"
          aria-label="Route prices from Antalya Airport"
        >
          <span className="price-strip-label">
            {t("fromAirport", "From Antalya Airport")}
          </span>
          <div className="price-strip-pills">
            {(["belek", "side", "kemer", "alanya", "antalya"] as const).map(
              (slug) => (
                <button
                  className="price-pill"
                  type="button"
                  key={slug}
                  onClick={() => bookRoute(slug)}
                >
                  {routeCatalog[slug].names[
                    language as keyof (typeof routeCatalog)[typeof slug]["names"]
                  ] ?? routeCatalog[slug].names.en}{" "}
                  <strong>€{routeCatalog[slug].prices.vito}</strong>
                </button>
              ),
            )}
          </div>
        </div>

        <section className="editorial-intro section">
          <div className="section-index">01</div>
          <div className="eyebrow">
            <span />
            <p>{t("welcomeEyebrow", "Welcome to a better arrival")}</p>
          </div>
          <div className="editorial-grid">
            <h2>
              <LineBreakText
                value={t(
                  "welcomeTitle",
                  "Travel beautifully.<br />Arrive effortlessly.",
                )}
              />
            </h2>
            <div>
              <p>
                {t(
                  "welcomeBody",
                  "From the moment your flight lands, every detail is considered. Your chauffeur waits inside arrivals, handles your luggage and guides you to a meticulously prepared private vehicle.",
                )}
              </p>
              <a className="text-link" href="#services">
                <span>{t("ourStandards", "Our service standards")}</span>
                <Icon name="arrow-right" className="icon" />
              </a>
            </div>
          </div>
          <div className="luxury-stats">
            <div>
              <strong>24/7</strong>
              <span>{t("concierge", "Concierge support")}</span>
            </div>
            <div>
              <strong>2,500+</strong>
              <span>{t("guestsWelcomed", "Guests welcomed")}</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>{t("guestRating", "Average guest rating")}</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>{t("privateTransfers", "Private transfers")}</span>
            </div>
          </div>
        </section>

        <section className="fleet section-dark" id="fleet">
          <div className="section section-inner">
            <div className="section-heading light-heading">
              <div>
                <div className="eyebrow light">
                  <span />
                  <p>{t("fleetEyebrow", "The fleet")}</p>
                </div>
                <h2>
                  <LineBreakText
                    value={t(
                      "fleetTitle",
                      "Your private space,<br />refined in every detail.",
                    )}
                  />
                </h2>
              </div>
              <p>
                {t(
                  "fleetIntro",
                  "Travel in quiet comfort with generous space for your family, golf equipment and luggage.",
                )}
              </p>
            </div>
            <div className="fleet-showcase">
              <div
                className="fleet-image fleet-carousel"
                aria-label="Our vehicle photos"
              >
                <div className="fleet-carousel-track">
                  <img
                    src={fleetPhoto.src}
                    alt={fleetPhoto.alt}
                    width="1600"
                    height="765"
                    loading="lazy"
                  />
                </div>
                <div className="image-badge">
                  <span>{t("signatureFleet", "Signature fleet")}</span>
                  <strong>{fleetCopy.shortName}</strong>
                </div>
                <div className="fleet-carousel-caption">
                  {fleetPhoto.caption}
                </div>
                <div className="fleet-carousel-controls">
                  <button
                    className="fleet-carousel-button"
                    type="button"
                    aria-label="Previous vehicle photo"
                    onClick={() => changeFleetPhoto(-1)}
                  >
                    <Icon name="arrow-left" className="icon" />
                  </button>
                  <div
                    className="fleet-carousel-dots"
                    aria-label="Vehicle photo selection"
                  >
                    {fleetPhotos.map((photo, index) => (
                      <button
                        className={`fleet-carousel-dot${index === fleetPhotoIndex ? " active" : ""}`}
                        type="button"
                        aria-label={`Show ${photo.caption.toLowerCase()} photo ${index + 1}`}
                        aria-current={index === fleetPhotoIndex}
                        onClick={() => setFleetPhotoIndex(index)}
                        key={`${photo.src}-${index}`}
                      />
                    ))}
                  </div>
                  <button
                    className="fleet-carousel-button"
                    type="button"
                    aria-label="Next vehicle photo"
                    onClick={() => changeFleetPhoto(1)}
                  >
                    <Icon name="arrow-right" className="icon" />
                  </button>
                </div>
              </div>
              <div className="fleet-panel">
                <div
                  className="fleet-tabs"
                  role="tablist"
                  aria-label="Fleet vehicles"
                >
                  <button
                    className={`fleet-tab${fleet === "sprinter" ? " active" : ""}`}
                    type="button"
                    role="tab"
                    onClick={() => changeFleet("sprinter")}
                  >
                    Mercedes Sprinter
                  </button>
                  <button
                    className={`fleet-tab${fleet === "vito" ? " active" : ""}`}
                    type="button"
                    role="tab"
                    onClick={() => changeFleet("vito")}
                  >
                    Mercedes Vito
                  </button>
                </div>
                <div className="fleet-panel-copy">
                  <span className="mini-label">
                    {t(fleetCopy.classKey, fleetCopy.classFallback)}
                  </span>
                  <h3>{fleetCopy.name}</h3>
                  <p>
                    {t(fleetCopy.descriptionKey, fleetCopy.descriptionFallback)}
                  </p>
                </div>
                <div className="fleet-capacity">
                  <div>
                    <Icon name="users" className="icon" />
                    <span>
                      <strong>{fleetCopy.guests}</strong>{" "}
                      <span>{t("passengers", "passengers")}</span>
                    </span>
                  </div>
                  <div>
                    <Icon name="luggage" className="icon" />
                    <span>
                      <strong>{fleetCopy.bags}</strong>{" "}
                      <span>{t("suitcases", "suitcases")}</span>
                    </span>
                  </div>
                </div>
                <ul className="amenity-list">
                  {[
                    ["television", "In-vehicle television"],
                    ["coldDrinks", "Cold drinks"],
                    ["snacks", "Snacks"],
                    ["childSeats", "Child seat available"],
                    ["wifi", "Complimentary WiFi"],
                  ].map(([key, fallback]) => (
                    <li key={key}>
                      <Icon name="check" className="icon" />
                      <span>{t(key, fallback)}</span>
                    </li>
                  ))}
                </ul>
                <div className="fleet-welcome-note">
                  <Icon name="user-check" className="icon" />
                  <span>
                    {t(
                      "nameSignGreeting",
                      "Personal meet & greet on arrival",
                    )}
                  </span>
                </div>
                <a className="button button-outline-gold" href="#booking">
                  <span>{t("reserveVehicle", "Reserve this vehicle")}</span>
                  <Icon name="arrow-right" className="icon" />
                </a>
              </div>
            </div>
            <div className="interior-banner">
              <img
                src="/assets/optimized/executive-interior.jpg"
                alt="Cream leather executive seating inside a luxury passenger van"
                width="1400"
                height="933"
                loading="lazy"
              />
              <div className="interior-copy">
                <span className="mini-label">
                  {t("insideVclass", "Inside the Sprinter")}
                </span>
                <h3>
                  <LineBreakText
                    value={t(
                      "interiorTitle",
                      "A private lounge between<br />the airport and your hotel.",
                    )}
                  />
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section className="service section" id="services">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                <p>{t("serviceEyebrow", "The Antalya VIP standard")}</p>
              </div>
              <h2>
                <LineBreakText
                  value={t(
                    "serviceTitle",
                    "More than a transfer.<br />A considered welcome.",
                  )}
                />
              </h2>
            </div>
            <p>
              {t(
                "serviceIntro",
                "Hotel-level attention, experienced local chauffeurs and complete peace of mind from runway to resort.",
              )}
            </p>
          </div>
          <div className="service-grid">
            {serviceItems.map(
              ([titleKey, title, bodyKey, body, icon], index) => {
                const isGreet = titleKey === "greetTitle";
                const CardEl = isGreet ? "a" : "article";
                return (
                  <CardEl
                    className={`service-card${index === 0 ? " featured" : ""}${isGreet ? " service-card-link" : ""}`}
                    key={titleKey}
                    {...(isGreet ? { href: "#meet-greet" } : {})}
                  >
                    <span className="service-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="service-icon">
                      <Icon name={icon} />
                    </div>
                    <h3>{t(titleKey, title)}</h3>
                    <p>{t(bodyKey, body)}</p>
                  </CardEl>
                );
              },
            )}
          </div>
        </section>

        <section className="routes section" id="routes">
          <div className="section-heading route-heading">
            <div>
              <div className="eyebrow">
                <span />
                <p>{t("routesEyebrow", "Our most requested journeys")}</p>
              </div>
              <h2>
                <LineBreakText
                  value={t(
                    "routesTitle",
                    "From Antalya Airport<br />to the Turkish Riviera.",
                  )}
                />
              </h2>
            </div>
            <p>
              {t(
                "routesIntro",
                "All prices are per vehicle, never per passenger, with complimentary waiting time included.",
              )}
            </p>
          </div>
          <div className="route-slider-toolbar">
            <span className="route-slider-hint">
              {t("discountPricesShown", "Online -25% prices shown")}
            </span>
            <div className="route-slider-controls">
              <button
                className="route-slider-button route-slider-prev"
                type="button"
                aria-label="Previous routes"
                disabled={routeSliderEdges.atStart}
                onClick={() => scrollRoutes(-1)}
              >
                <Icon name="arrow-right" />
              </button>
              <button
                className="route-slider-button route-slider-next"
                type="button"
                aria-label="Next routes"
                disabled={routeSliderEdges.atEnd}
                onClick={() => scrollRoutes(1)}
              >
                <Icon name="arrow-right" />
              </button>
            </div>
          </div>
          <div
            className="route-slider"
            ref={routeSlider}
            aria-label="Antalya Airport transfer routes"
            tabIndex={0}
          >
            {routeOrder.map((slug, index) => {
              const route = routeCatalog[slug];
              const destination =
                slug === "antalya"
                  ? (route.names[language as keyof typeof route.names] ??
                    route.names.en)
                  : routeDisplayNames[slug];
              const title = (
                <>
                  {routeAirportName} <span>→</span> {destination}
                </>
              );
              return (
                <article
                  className={`route-card ${routeImageClasses[index]}`}
                  data-route={slug}
                  key={slug}
                >
                  <div className="route-card-top">
                    <span className="route-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {slug === "belek" && (
                      <span className="route-chip">
                        {t("golfFavourite", "Golf favourite")}
                      </span>
                    )}
                  </div>
                  <div className="route-card-copy">
                    <div className="route-line">
                      <span>AYT</span>
                      <i />
                      <Icon name="arrow-right" />
                      <i />
                      <span>{slug.toUpperCase()}</span>
                    </div>
                    <h3>
                      {index >= 9 ? (
                        <a href={`${routePrefix}/transfers/${slug}/`}>
                          {title}
                        </a>
                      ) : (
                        title
                      )}
                    </h3>
                    <div className="route-vehicle-prices">
                      <button
                        className="route-price-button"
                        type="button"
                        onClick={() => bookRoute(slug)}
                      >
                        <strong>€{route.prices.vito}</strong>
                        <Icon name="arrow-up-right" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="reviews section-dark" id="reviews">
          <div className="section section-inner">
            <div className="review-summary">
              <div>
                <div className="eyebrow light">
                  <span />
                  <p>{t("reviewsEyebrow", "Guest reviews")}</p>
                </div>
                <h2>
                  <LineBreakText
                    value={t(
                      "reviewsTitle",
                      "Service remembered<br />long after arrival.",
                    )}
                  />
                </h2>
              </div>
              <div className="google-score">
                <div className="google-g">G</div>
                <div>
                  <div>
                    <strong>5.0</strong>
                    <span className="stars">★★★★★</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-marquee">
              <div className="review-track">
                {[...reviews, ...reviews].map(
                  ([name, initials, time, review, country], index) => (
                    <a
                      className="review-card"
                      href="https://www.google.com/maps/place/Antalya+Vip+Tourism/@36.7321721,30.4262099,17z"
                      target="_blank"
                      rel="noopener"
                      key={`${name}-${index}`}
                      aria-hidden={index >= reviews.length}
                      tabIndex={index >= reviews.length ? -1 : undefined}
                    >
                      <div className="review-card-top">
                        <span className="stars">★★★★★</span>
                        <span>Google</span>
                      </div>
                      <blockquote>“{review}”</blockquote>
                      <footer>
                        <div className="avatar">{initials}</div>
                        <div>
                          <strong>{name}</strong>
                        </div>
                        <div className="review-meta">
                          <time>{time}</time>
                          <span className="review-country">
                            {country.split(" ")[0]}
                          </span>
                        </div>
                      </footer>
                    </a>
                  ),
                )}
              </div>
            </div>
            <div className="trusted-by">
              <span>
                {t(
                  "trustedBy",
                  "Trusted by guests of Antalya's leading resorts",
                )}
              </span>
              <div>
                <strong>MAXX ROYAL</strong>
                <strong>REGNUM CARYA</strong>
                <strong>GLORIA</strong>
                <strong>VOYAGE</strong>
                <strong>RIXOS</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="video-section section" id="meet-greet">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                <p>{t("videoEyebrow", "How to find us")}</p>
              </div>
              <h2>
                <LineBreakText
                  value={t(
                    "videoTitle",
                    "Find us at J / 777<br />after you land.",
                  )}
                />
              </h2>
            </div>
            <p>
              {t(
                "videoSubtitle",
                "Our chauffeurs wait at the Meet & Greet Area — meeting point J / 777. Exit baggage claim, head to point J / 777, and we handle the rest.",
              )}
            </p>
          </div>

          <div
            className="video-card"
            onClick={() => setVideoOpen(true)}
            role="button"
            tabIndex={0}
            aria-label={t("videoWatch", "Watch the clip")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setVideoOpen(true);
            }}
          >
            <div className="video-thumb">
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt={t(
                  "videoThumbnailAlt",
                  "Antalya Airport meet and greet area",
                )}
                width="280"
                height="498"
              />
              <div className="video-play-overlay" aria-hidden="true">
                <div className="video-play-btn">
                  <Icon name="play" className="icon" />
                </div>
              </div>
            </div>
            <div className="video-copy">
              <span className="mini-label">
                {t("videoEyebrow", "How to find us")}
              </span>
              <h3>
                <LineBreakText
                  value={t(
                    "videoCardTitle",
                    "Antalya Airport<br />Meet & Greet Point",
                  )}
                />
              </h3>
              <p>
                {t(
                  "videoCardBody",
                  "After collecting your luggage, exit to the Meet & Greet Area and look for meeting point J / 777. Tell our team your name — we'll take it from there.",
                )}
              </p>
              <button className="button button-outline-gold" type="button">
                <span>{t("videoWatch", "Watch the clip")}</span>
                <Icon name="play" className="icon" />
              </button>
            </div>
          </div>

          {videoOpen && (
            <div
              className="video-overlay"
              onClick={() => setVideoOpen(false)}
              role="dialog"
              aria-label={t(
                "videoDialogLabel",
                "Antalya Airport meet and greet video",
              )}
            >
              <div
                className="video-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="video-dialog-close"
                  type="button"
                  aria-label={t("videoClose", "Close")}
                  onClick={() => setVideoOpen(false)}
                >
                  ✕
                </button>
                <Suspense fallback={null}>
                  <ReactPlayer
                    src={`https://www.youtube.com/shorts/${VIDEO_ID}`}
                    playing
                    controls
                    width="100%"
                    height="100%"
                  />
                </Suspense>
              </div>
            </div>
          )}
        </section>

        <section className="faq section" id="faq">
          <div className="faq-heading">
            <div className="eyebrow">
              <span />
              <p>{t("faqEyebrow", "Frequently asked")}</p>
            </div>
            <h2>{t("faqTitle", "Before you travel.")}</h2>
            <p>
              {t(
                "faqIntro",
                "Everything you need to know about your private Antalya airport transfer.",
              )}
            </p>
            <a className="text-link" href="#contact">
              <span>{t("askQuestion", "Ask us a question")}</span>
              <Icon name="arrow-right" className="icon" />
            </a>
          </div>
          <div className="accordion">
            {faqItems.map(([question, answer, id], index) => (
              <article
                id={id}
                className={`faq-item${openFaq === index ? " open" : ""}`}
                key={question}
              >
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() => {
                    const next = openFaq === index ? -1 : index;
                    setOpenFaq(next);
                    if (next === index && typeof history !== "undefined") {
                      history.replaceState(null, "", `#${id}`);
                    }
                  }}
                >
                  <span>{question}</span>
                  <i />
                </button>
                <div className="faq-answer">
                  <p>{answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section-dark" id="contact">
          <div className="contact-bg" />
          <div className="section contact-inner">
            <div className="contact-copy">
              <div className="eyebrow light">
                <span />
                <p>{t("contactEyebrow", "Your journey starts here")}</p>
              </div>
              <h2>
                <LineBreakText
                  value={t(
                    "contactTitle",
                    "Arrive in Antalya<br />exceptionally well.",
                  )}
                />
              </h2>
              <p>
                {t(
                  "contactBody",
                  "Book online in less than two minutes or speak directly with our 24/7 concierge team.",
                )}
              </p>
              <a className="button button-gold" href="#booking">
                <span>{t("bookTransfer", "Book your transfer")}</span>
                <Icon name="arrow-right" className="icon" />
              </a>
            </div>
            <div className="contact-options">
              <a
                className="contact-card whatsapp"
                href="https://wa.me/905302655790"
                target="_blank"
                rel="noreferrer"
                onClick={() => window.gtag?.("event", "whatsapp_clicked", { source: "contact_section" })}
              >
                <div className="contact-icon">
                  <Icon name="whatsapp" className="whatsapp-icon" />
                </div>
                <div>
                  <span>{t("whatsappUs", "WhatsApp us")}</span>
                  <strong>+90 530 265 57 90</strong>
                  <small>
                    {t("replyMinutes", "Usually replies within minutes")}
                  </small>
                </div>
                <Icon name="arrow-up-right" className="arrow" />
              </a>
              <a className="contact-card" href="tel:+905302655790">
                <div className="contact-icon">
                  <Icon name="phone" />
                </div>
                <div>
                  <span>{t("callUs", "Call us 24/7")}</span>
                  <strong>+90 530 265 57 90</strong>
                  <small>English · Deutsch · Türkçe</small>
                </div>
                <Icon name="arrow-up-right" className="arrow" />
              </a>
              <a
                className="contact-card"
                href="mailto:support@antalyaviptourism.com"
              >
                <div className="contact-icon">
                  <Icon name="mail" />
                </div>
                <div>
                  <span>{t("emailUs", "Email concierge")}</span>
                  <strong>support@antalyaviptourism.com</strong>
                  <small>{t("replyHour", "Replies within one hour")}</small>
                </div>
                <Icon name="arrow-up-right" className="arrow" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <a className="brand footer-brand" href="#top">
            <picture>
              <source srcSet="/assets/optimized/logo.webp" type="image/webp" />
              <img
                src="/assets/optimized/logo.png"
                alt="Antalya VIP Tourism"
                className="brand-logo"
                width="160"
                height="120"
                loading="lazy"
              />
            </picture>
            <span className="brand-copy">
              <strong>Antalya VIP</strong>
              <span>Tourism</span>
            </span>
          </a>
          <p>
            {t(
              "footerTagline",
              "Private chauffeur services across the Turkish Riviera.",
            )}
          </p>
          <div className="footer-links">
            <div>
              <span>{t("explore", "Explore")}</span>
              <a href="#fleet">{t("navFleet", "Fleet")}</a>
              <a href="#services">{t("navService", "Service")}</a>
              <a href="#routes">{t("navRoutes", "Routes")}</a>
            </div>
            <div>
              <span>{t("information", "Information")}</span>
              <a href="#faq">FAQ</a>
              <a href="#contact">{t("navContact", "Contact")}</a>
              <a href={imprintHref}>Impressum</a>
              <a href={privacyHref}>Privacy</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Antalya VIP Tourism</span>
          <span>
            {t(
              "licensed",
              "Licensed private transfer operator · TÜRSAB compliant",
            )}
          </span>
        </div>
      </footer>
      <a
        className="floating-whatsapp"
        href="https://wa.me/905302655790"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => window.gtag?.("event", "whatsapp_clicked", { source: "floating_button" })}
      >
        <Icon name="whatsapp" className="whatsapp-icon" />
        <span>{t("chatWithUs", "Chat with us")}</span>
      </a>
    </>
  );
}
