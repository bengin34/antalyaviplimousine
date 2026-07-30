export const routeData = {
  belek:     { name: "Belek",             originalPrices: { vito: 50, sprinter: 70  }, prices: { vito: 40,  sprinter: 60  } },
  side:      { name: "Side",              originalPrices: { vito: 60, sprinter: 85  }, prices: { vito: 50,  sprinter: 70  } },
  kemer:     { name: "Kemer",             originalPrices: { vito: 65, sprinter: 90  }, prices: { vito: 55,  sprinter: 75  } },
  alanya:    { name: "Alanya",            originalPrices: { vito: 110, sprinter: 140 }, prices: { vito: 95,  sprinter: 120 } },
  tekirova:  { name: "Tekirova",          originalPrices: { vito: 110, sprinter: 140 }, prices: { vito: 95,  sprinter: 120 } },
  manavgat:  { name: "Manavgat",          originalPrices: { vito: 60, sprinter: 85  }, prices: { vito: 50,  sprinter: 70  } },
  kizilagac: { name: "Manavgat/Kızılağaç",originalPrices: { vito: 70, sprinter: 95  }, prices: { vito: 60,  sprinter: 80  } },
  bogazkent: { name: "Boğazkent",         originalPrices: { vito: 55, sprinter: 75  }, prices: { vito: 45,  sprinter: 65  } },
  antalya:   { name: "Antalya City",      originalPrices: { vito: 40, sprinter: 55  }, prices: { vito: 35,  sprinter: 45  } },
  bodrum:    { name: "Bodrum",            originalPrices: { vito: 210, sprinter: 260 }, prices: { vito: 180, sprinter: 220 } },
  dalaman:   { name: "Dalaman",           originalPrices: { vito: 210, sprinter: 260 }, prices: { vito: 180, sprinter: 220 } },
  fethiye:   { name: "Fethiye",           originalPrices: { vito: 210, sprinter: 260 }, prices: { vito: 180, sprinter: 220 } },
  pamukkale: { name: "Pamukkale",         originalPrices: { vito: 210, sprinter: 260 }, prices: { vito: 180, sprinter: 220 } },
  kapadokya: { name: "Kapadokya",         originalPrices: { vito: 310, sprinter: 410 }, prices: { vito: 265, sprinter: 350 } },
};

const formatPriceValue = (value) => {
  const number = Number(value);
  return Number.isInteger(number) ? number.toFixed(0) : number.toFixed(2);
};

export const getPriceRange = () => {
  const prices = Object.values(routeData).flatMap((route) =>
    Object.values(route.prices),
  );
  return `€${formatPriceValue(Math.min(...prices))}-€${formatPriceValue(Math.max(...prices))}`;
};

/**
 * Resolves price placeholders used by static HTML and translated copy.
 *
 * Examples:
 *   {{PRICE:belek:vito}}
 *   {{PRICE:belek:vito:orig}}
 *   {{PRICE_RANGE}}
 */
export const resolvePriceTokens = (value) =>
  String(value)
    .replaceAll("{{PRICE_RANGE}}", getPriceRange())
    .replace(
      /\{\{PRICE:(\w+):(vito|sprinter)(?::(orig))?\}\}/g,
      (match, routeKey, vehicleKey, original) => {
        const route = routeData[routeKey];
        if (!route) return match;

        const prices = original ? route.originalPrices : route.prices;
        const price = prices[vehicleKey];
        return price == null ? match : formatPriceValue(price);
      },
    );
