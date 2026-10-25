import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * Polish charter traffic to Antalya runs heavily to Side, Kızılağaç and
 * Alanya, so the copy leans on the shared-shuttle comparison: those are the
 * routes where a bus collects several hotels before yours.
 *
 * Written by the team, not natively reviewed yet — flag any wording a Polish
 * reader would phrase differently before the next content pass.
 */
export const pl: TransferLandingCopy = {
  heroHeading: (name) => `Lotnisko Antalya → ${name}: transfer prywatny`,
  heroCta: "Zarezerwuj transfer",
  heroTrust: [
    "Do 7 osób",
    "Bez przedpłaty",
    "Płatność bezpośrednio u kierowcy",
    "Stała cena końcowa, bez ukrytych opłat",
    "Fotelik dziecięcy bezpłatnie na życzenie",
    "Monitorowanie lotu w cenie",
  ],
  serviceHeading: (name) => `Twój prywatny transfer do ${name}`,
  aboutHeading: (name) => `O regionie ${name}`,
  ownGroup: (name) =>
    `Jedziesz tylko ze swoją grupą, prosto do hotelu w regionie ${name}. Bez autobusu zbiorowego, bez obcych pasażerów i bez zbędnych przystanków — stała cena obejmuje cały samochód.`,
  arrivalHeading: "Przylot na lotnisko w Antalyi",
  arrivalBody:
    "Po odebraniu bagażu przejdź do strefy powitalnej Meet & Greet J / 777. Nasz zespół na lotnisku znajdzie Twoją rezerwację i przekaże Cię kierowcy. Monitorujemy lot, więc przy opóźnieniu godzina odbioru przesuwa się bez dodatkowej opłaty.",
  returnHeading: "Transfer w obie strony",
  returnBody: (name) =>
    `Transfer powrotny z regionu ${name} na lotnisko w Antalyi organizujemy na tych samych zasadach. Podaj przy rezerwacji numer lotu i godzinę odbioru.`,
  privateHeading: "Prywatnie, nie zbiorowo",
  privateBody: (name) =>
    `W samochodzie jesteś tylko Ty i osoby, z którymi podróżujesz. Po rezerwacji otrzymujesz jasne potwierdzenie z danymi podróży i kontaktem. W dniu przylotu nasz zespół śledzi lot; przy wcześniejszym lub późniejszym wylądowaniu odpowiednio przesuwamy spotkanie. Kierowca dowozi Ciebie i bagaż pod samą recepcję hotelu albo pod wskazany adres prywatny w regionie ${name}.`,
  priceBody:
    "Podana kwota to stała cena za samochód, a nie za osobę. Nie ma ukrytych dopłat za monitorowanie lotu, zwykły czas oczekiwania ani za fotelik dziecięcy na życzenie. Płatność gotówką u kierowcy na początku przejazdu, więc koszt znasz jeszcze przed wyjazdem.",
  vehicleHeading: "Samochód, bagaż i dzieci",
  vehicleBody:
    "Mercedes Vito mieści do sześciu osób ze zwykłym bagażem wakacyjnym; dla większych grup mamy Mercedesa Sprintera z maksymalnie 12 miejscami. Przy rezerwacji napisz o bagażu niestandardowym, wózku dziecięcym lub potrzebnych fotelikach — dobierzemy samochód do Twojej grupy.",
  wholeVehicle: "Cena za cały samochód",
  priceTrust: [
    "Bez przedpłaty",
    "Płatność bezpośrednio u kierowcy",
    "Bez ukrytych opłat",
  ],
  hotelsEyebrow: "Dla Twojego noclegu",
  hotelsHeading: (name) => `Popularne hotele w regionie ${name}`,
  hotelsBody: () => "Dowozimy bezpośrednio do tych i do pozostałych hoteli w regionie.",
  faq: [
    [
      "Gdzie spotkam zespół transferowy na lotnisku w Antalyi?",
      "Po odebraniu bagażu przejdź do strefy powitalnej Meet & Greet J / 777. Nasz zespół znajdzie Twoją rezerwację i przekaże Cię kierowcy.",
    ],
    [
      "Czy muszę zapłacić za transfer z góry?",
      "Nie. Przedpłata nie jest wymagana. Stałą kwotę płacisz bezpośrednio kierowcy.",
    ],
    [
      "Czy dostępny jest fotelik dziecięcy?",
      "Tak. Foteliki udostępniamy bezpłatnie na życzenie. Podaj przy rezerwacji liczbę dzieci i ich wiek.",
    ],
  ],
  regions: {
    antalya: {
      name: { nominative: "Antalya", direction: "Antalyi" },
      about: "Antalya wraz z nadmorskimi dzielnicami Lara i Kundu leży zaledwie kilka kilometrów od lotniska. Wzdłuż wybrzeża Lary stoją duże hotele tematyczne i hotele miejskie, a Konyaaltı na zachodzie przyciąga kamienistą plażą i długą promenadą.",
      routeDetails: "Krótki przejazd z lotniska w Antalyi prowadzi drogą nadmorską przez Larę albo prosto do centrum. Nawet na tak krótkim odcinku transfer prywatny się opłaca: bez czekania na innych pasażerów, bez przesiadek, samochód podjeżdża pod Twój hotel.",
    },
    belek: {
      name: { nominative: "Belek", direction: "Beleku" },
      about: "Belek leży na wschód od Antalyi i jest znany przede wszystkim z pól golfowych, dużych hoteli all inclusive i szerokich piaszczystych plaż. Hotele rozciągają się między Kadriye a wybrzeżem przy Seriku, dlatego dokładny adres hotelu przy rezerwacji bardzo pomaga.",
      routeDetails: "Trasa wychodzi z lotniska w Antalyi na drogę D400 w stronę Seriku i Beleku. Dla rodzin, golfistów i osób z późnym lotem bezpośredni transfer prywatny jest najwygodniejszy, bo docierasz do hotelu bez przystanków i bez przesiadki.",
    },
    side: {
      about: "Side łączy zabytkowe stare miasto z długimi piaszczystymi plażami i rozległymi kompleksami wakacyjnymi. Poza samym Side do kurortu należą popularne strefy hotelowe Kumköy, Evrenseki, Çolaklı, Sorgun i Titreyengöl.",
      routeDetails: "Z lotniska w Antalyi trasa biegnie drogą nadmorską w stronę Manavgatu i Side. Przy późnym przylocie prywatny samochód jest szczególnie wygodny: Twoja grupa jedzie prosto do zarezerwowanego hotelu i nie czeka na innych gości.",
    },
    kemer: {
      name: { nominative: "Kemer", direction: "Kemeru" },
      about: "Kemer leży na zachód od Antalyi, między górami Taurus a Morzem Śródziemnym. Region obejmuje centrum Kemeru oraz Beldibi, Göynük, Kiriş i Çamyuvę — hotele przy plaży, marinę i górskie tło.",
      routeDetails: "Bezpośredni przejazd prowadzi wybrzeżem na zachód od Antalyi. Kierowca dowozi Cię do hotelu bez przesiadki, co ma największe znaczenie przy podróży z dziećmi, ze sprzętem sportowym albo po wieczornym lądowaniu.",
    },
    alanya: {
      name: { nominative: "Alanya", direction: "Alanyi" },
      about: "Alanya to jeden z najchętniej wybieranych kierunków Riwiery Tureckiej i leży wyraźnie dalej na wschód niż hotele wokół Antalyi. Obok centrum najczęściej pytane strefy hotelowe to Mahmutlar, Kestel, Avsallar, Türkler i Okurcalar.",
      routeDetails: "Na długiej trasie wybrzeżem stała cena za samochód jest najbardziej przejrzysta. Transferem prywatnym jedziesz tylko ze swoją grupą i spokojnie docierasz od samolotu pod recepcję hotelu.",
    },
    kizilagac: {
      name: { nominative: "Kızılağaç", direction: "Kızılağaç" },
      about: "Kızılağaç leży na wschód od Manavgatu i jest znany z rozległych hoteli przy plaży oraz spokojnych wakacji rodzinnych. Okolica graniczy z Sorgunem i Manavgatem; wiele hoteli stoi nieco poza główną drogą, bezpośrednio nad morzem.",
      routeDetails: "Z lotniska w Antalyi jedziesz drogą D400 w stronę Manavgatu, a następnie dalej do Kızılağaç. Prywatny samochód oszczędza dodatkowych przystanków pod obcymi hotelami, typowych na tym odcinku dla transferów zbiorowych.",
    },
    tekirova: {
      name: { nominative: "Tekirova", direction: "Tekirovej" },
      about: "Tekirova leży na południe od Kemeru, na skraju parku narodowego Olympos-Beydağları. Łączy zadbane tereny hotelowe z małymi zatokami i znajduje się blisko antycznego Phaselis.",
      routeDetails: "Trasa prowadzi z lotniska w Antalyi przez Kemer dalej do Tekirovej. Położenie nad morzem i odległość sprawiają, że bezpośredni transfer ma sens: bez przesiadki i bez czekania na innych gości aż pod hotel.",
    },
  },
};
