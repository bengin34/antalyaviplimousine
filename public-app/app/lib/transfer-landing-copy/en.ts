import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * English carries the same argument as the German pages — fixed price per
 * vehicle, no prepayment, where the driver waits — written for the mixed
 * international audience that lands on the unprefixed URLs.
 */
export const en: TransferLandingCopy = {
  heroHeading: (name) => `Antalya Airport → ${name} private transfer`,
  heroCta: "Book your transfer",
  heroTrust: [
    "Up to 7 passengers",
    "No prepayment required",
    "Pay the driver directly",
    "Fixed total price, no hidden fees",
    "Free child seat on request",
    "Flight tracking included",
  ],
  serviceHeading: (name) => `Your private transfer to ${name}`,
  aboutHeading: (name) => `About ${name}`,
  ownGroup: (name) =>
    `You travel with your own party only, straight to your hotel in ${name}. No shuttle bus, no strangers in the car and no detours to other hotels — the fixed price covers the whole vehicle.`,
  arrivalHeading: "Arriving at Antalya Airport",
  arrivalBody:
    "Once you have collected your luggage, walk to the Meet & Greet area J / 777. Our airport team finds your booking and hands you over to your driver. Because we track your flight, a delay moves the pickup with it at no extra cost.",
  returnHeading: "Return transfer",
  returnBody: (name) =>
    `We also arrange the return leg from ${name} back to Antalya Airport. Give us your flight number and the pickup time you want when you book.`,
  privateHeading: "Private, not shared",
  privateBody: (name) =>
    `Only you and the people travelling with you are in the car. After booking you get a clear confirmation with your travel details and a direct contact. On the day of arrival our team follows your flight; if you land early or late we adjust the handover to match. Your driver takes you and your luggage to the reception desk, or to the private address you gave us in ${name}.`,
  priceBody:
    "The figure shown is a fixed total for the vehicle, not a price per person. There are no hidden surcharges for flight tracking, the usual waiting time or child seats on request. You pay cash directly to the driver at the start of the ride, so the cost is settled before you even travel.",
  vehicleHeading: "Vehicle, luggage and children",
  vehicleBody:
    "A Mercedes Vito suits up to six passengers with normal holiday luggage; larger groups travel in a Mercedes Sprinter with up to 12 seats. Tell us about oversized luggage, a pushchair or the child seats you need when you book, and we match the vehicle to your party.",
  wholeVehicle: "Price for the whole vehicle",
  priceTrust: [
    "No prepayment required",
    "Pay the driver directly",
    "No hidden fees",
  ],
  hotelsEyebrow: "For your accommodation",
  hotelsHeading: (name) => `Popular hotels in ${name}`,
  hotelsBody: () => "We drive directly to these and to any other hotel in the area.",
  faq: [
    [
      "Where do I meet the transfer team at Antalya Airport?",
      "After you collect your luggage, go to the Meet & Greet area J / 777. Our airport team finds your booking and brings you to your driver.",
    ],
    [
      "Do I have to pay for the transfer in advance?",
      "No. No prepayment is required. You pay the fixed total price directly to the driver.",
    ],
    [
      "Is a child seat available?",
      "Yes. Child seats are free on request. Please tell us the number of children and their ages when you book.",
    ],
  ],
  regions: {
    antalya: {
      about: "Antalya city, with the Lara and Kundu beach strips, sits only a few kilometres from the airport. Large themed resorts and city hotels line the Lara coast, while Konyaaltı in the west offers a pebble beach and a long seafront promenade.",
      routeDetails: "The short drive from Antalya Airport runs along the Lara coast road or straight into the city centre. Even on a short leg a private car pays off: no waiting for other guests, no transfers along the way, and you arrive at your own hotel door.",
    },
    belek: {
      about: "Belek lies east of Antalya and is known above all for its golf courses, large all-inclusive resorts and wide sandy beaches. The hotels spread out between Kadriye and the coast near Serik, which is why the exact hotel address helps when you book.",
      routeDetails: "The drive leaves Antalya Airport on the D400 towards Serik and Belek. For families, golfers and anyone on a late flight the direct private transfer is the easy option, because you reach your accommodation without collection stops or a change of vehicle.",
    },
    side: {
      about: "Side pairs a historic old town with long sandy beaches and sprawling holiday complexes. Besides Side itself, the resort takes in the popular hotel zones of Kumköy, Evrenseki, Çolaklı, Sorgun and Titreyengöl.",
      routeDetails: "From Antalya Airport the route follows the coast road towards Manavgat and Side. A private vehicle is especially welcome on a late arrival: your party drives straight to the resort you booked, without waiting for other hotel guests.",
    },
    kemer: {
      about: "Kemer lies west of Antalya between the Taurus mountains and the Mediterranean. The area covers central Kemer along with Beldibi, Göynük, Kiriş and Çamyuva — beach hotels, a marina and a mountain backdrop.",
      routeDetails: "The direct drive follows the coast west of Antalya. Your driver takes you to your hotel with no change of vehicle, which matters most when you travel with children, with sports equipment, or after an evening landing.",
    },
    alanya: {
      about: "Alanya is one of the best-loved destinations on the Turkish Riviera and sits considerably further east than the resorts around Antalya. Alongside the centre, Mahmutlar, Kestel, Avsallar, Türkler and Okurcalar are the hotel areas guests ask for most.",
      routeDetails: "On a longer coastal drive a fixed price per vehicle is where the value shows. With a private transfer you travel with your own group and carry on from the landing straight to your hotel reception.",
    },
    kizilagac: {
      about: "Kızılağaç lies east of Manavgat and is known for spacious beach resorts and quiet family holidays. The area borders Sorgun and Manavgat; many hotels sit a little off the main road, right by the sea.",
      routeDetails: "From Antalya Airport you take the D400 towards Manavgat and then on to Kızılağaç. A private vehicle saves you the extra hotel stops that shared transfers tend to make on exactly this stretch.",
    },
    tekirova: {
      about: "Tekirova lies south of Kemer on the edge of the Olympos-Beydağları national park. It combines well-kept resort grounds with small bays and sits close to the ancient site of Phaselis.",
      routeDetails: "The drive runs from Antalya Airport through Kemer and on to Tekirova. The coastal setting and the distance make a direct transfer the sensible choice: no change of vehicle and no waiting for other guests on the way to your hotel.",
    },
  },
};
