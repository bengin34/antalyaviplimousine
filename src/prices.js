import { routeData } from "./routes.js";

export { routeData } from "./routes.js";

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
