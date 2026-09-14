const DEFAULT_ANCHOR_DAY = 14;

const lastDayOfMonth = (year: number, month0: number) =>
  new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate();

const pad2 = (value: number) => String(value).padStart(2, "0");

/** Gecerli araliktaki (1-31) bir tamsayi degilse varsayilan gune duser -
 *  bu, tanimsiz davranis birakmak yerine bilincli bir secim. */
const normalizeAnchorDay = (anchorDay: number) =>
  Number.isInteger(anchorDay) && anchorDay >= 1 && anchorDay <= 31 ? anchorDay : DEFAULT_ANCHOR_DAY;

/** RapidAPI kotasi abonelik yildonumunde sifirlanir, ayin 1'inde degil.
 *  Sayaci takvim ayina baglamak, iki pencere kaydiginda tek bir RapidAPI
 *  dongusunde 400'u gercekten asmamiza yol acar. */
export function cycleKey(now: Date, anchorDay: number): string {
  const anchor = normalizeAnchorDay(anchorDay);
  const year = now.getUTCFullYear();
  const month0 = now.getUTCMonth();
  const day = now.getUTCDate();

  let cycleYear = year;
  let cycleMonth0 = month0;
  if (day < anchor) {
    cycleMonth0 -= 1;
    if (cycleMonth0 < 0) {
      cycleMonth0 = 11;
      cycleYear -= 1;
    }
  }
  const clampedDay = Math.min(anchor, lastDayOfMonth(cycleYear, cycleMonth0));
  return `${cycleYear}-${pad2(cycleMonth0 + 1)}-${pad2(clampedDay)}`;
}
