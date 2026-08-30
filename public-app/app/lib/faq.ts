// Home page FAQ accordion, grouped into categories. Shared so the visible
// list and the FAQPage structured data never drift apart.
export const homeFaqGroups = [
  {
    labelKey: "faqCatArrival",
    labelFallback: "Arrival & transfer",
    items: ["One", "Two", "Six", "Seven", "Eight", "Ten"],
  },
  {
    labelKey: "faqCatPayment",
    labelFallback: "Payment & price",
    items: ["Nine", "Five"],
  },
  {
    labelKey: "faqCatVehicle",
    labelFallback: "Vehicle & luggage",
    items: ["Three", "Four"],
  },
];

// Flat order, used for the FAQPage structured data.
export const homeFaqOrder = homeFaqGroups.flatMap((group) => group.items);
