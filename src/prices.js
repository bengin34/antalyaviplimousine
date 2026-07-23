export const routeData = {
  belek:     { name: "Belek",             originalPrices: { vito: 45, sprinter: 65  }, prices: { vito: 35,  sprinter: 55  } },
  side:      { name: "Side",              originalPrices: { vito: 55, sprinter: 80  }, prices: { vito: 45,  sprinter: 65  } },
  kemer:     { name: "Kemer",             originalPrices: { vito: 60, sprinter: 85  }, prices: { vito: 50,  sprinter: 70  } },
  alanya:    { name: "Alanya",            originalPrices: { vito: 105, sprinter: 135 }, prices: { vito: 90,  sprinter: 115 } },
  tekirova:  { name: "Tekirova",          originalPrices: { vito: 105, sprinter: 135 }, prices: { vito: 90,  sprinter: 115 } },
  manavgat:  { name: "Manavgat",          originalPrices: { vito: 55, sprinter: 80  }, prices: { vito: 45,  sprinter: 65  } },
  kizilagac: { name: "Manavgat/Kızılağaç",originalPrices: { vito: 65, sprinter: 90  }, prices: { vito: 55,  sprinter: 75  } },
  bogazkent: { name: "Boğazkent",         originalPrices: { vito: 50, sprinter: 70  }, prices: { vito: 40,  sprinter: 60  } },
  antalya:   { name: "Antalya City",      originalPrices: { vito: 35, sprinter: 50  }, prices: { vito: 30,  sprinter: 40  } },
  bodrum:    { name: "Bodrum",            originalPrices: { vito: 205, sprinter: 255 }, prices: { vito: 175, sprinter: 215 } },
  dalaman:   { name: "Dalaman",           originalPrices: { vito: 205, sprinter: 255 }, prices: { vito: 175, sprinter: 215 } },
  fethiye:   { name: "Fethiye",           originalPrices: { vito: 205, sprinter: 255 }, prices: { vito: 175, sprinter: 215 } },
  pamukkale: { name: "Pamukkale",         originalPrices: { vito: 205, sprinter: 255 }, prices: { vito: 175, sprinter: 215 } },
  kapadokya: { name: "Kapadokya",         originalPrices: { vito: 305, sprinter: 405 }, prices: { vito: 260, sprinter: 345 } },
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
