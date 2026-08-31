// Home page FAQ accordion, grouped into categories. Shared so the visible
// list and the FAQPage structured data never drift apart.
//
// `key` picks the translation strings (`faq<Key>Q` / `faq<Key>A`); `slug` is the
// anchor the question is linked by. The slug is what a customer reads in a
// WhatsApp message, so it names the question rather than its position in the
// list — `#faq-return-contact`, not `#faq-Ten`.
export const homeFaqGroups = [
  {
    labelKey: "faqCatArrival",
    labelFallback: "Arrival & transfer",
    items: [
      { key: "One", slug: "flight-delay" },
      { key: "Two", slug: "airport-pickup" },
      { key: "Six", slug: "domestic-arrival" },
      { key: "Seven", slug: "meeting-point" },
      { key: "Eight", slug: "airport-waiting" },
    ],
  },
  {
    labelKey: "faqCatJourney",
    labelFallback: "Return & journey",
    items: [
      { key: "Ten", slug: "return-contact" },
      { key: "Fourteen", slug: "return-delay" },
      { key: "Fifteen", slug: "extra-stops" },
    ],
  },
  {
    labelKey: "faqCatPayment",
    labelFallback: "Payment & price",
    items: [
      { key: "Nine", slug: "payment" },
      { key: "Twelve", slug: "currency" },
      { key: "Eleven", slug: "cancellation" },
      { key: "Five", slug: "price-final" },
    ],
  },
  {
    labelKey: "faqCatVehicle",
    labelFallback: "Vehicle & luggage",
    items: [
      { key: "Three", slug: "child-seats" },
      { key: "Thirteen", slug: "luggage" },
      { key: "Four", slug: "golf-luggage" },
    ],
  },
];

// Flat order, used for the FAQPage structured data.
export const homeFaqOrder = homeFaqGroups.flatMap((group) =>
  group.items.map((item) => item.key),
);

export const faqAnchor = (slug: string) => `faq-${slug}`;

// Links already sent to customers use the old positional anchors, so keep
// resolving them to the question they were pointing at.
const LEGACY_ANCHORS: Record<string, string> = Object.fromEntries(
  homeFaqGroups.flatMap((group) =>
    group.items.map((item) => [`faq-${item.key}`, faqAnchor(item.slug)]),
  ),
);

export const resolveFaqAnchor = (hash: string) => LEGACY_ANCHORS[hash] ?? hash;
