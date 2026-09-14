// Bu dosya, kota penceresi hakkinda bilinen her seyin tek kaynagi. Deno
// API'lerine ve herhangi bir import'a bagimli degil: hem Edge Function
// (store.ts) hem de admin paneli (FlightQuotaCard.tsx) buradan okur.
// Bu iki taraf ayri sabitler tutsaydi, panel yanlis satiri okuyup kota
// bittigi gun "bol bol hak var" derdi - gostergeyi degersiz kilan tam
// olarak budur. Yeni bir import EKLEME: Deno tarafi uzantili yol ister,
// admin tarafi uzanti-siz import ister; iki tarafi da memnun eden tek
// hal, bu dosyanin hicbir seyi import etmemesidir.

/** Ucretsiz plan ayda 400 cagri veriyor; 20'lik pay elle teste ayrildi. */
export const MONTHLY_CAP = 380;

/** Abonelik yildonumu gunu; hesap sahibiyle dogrulandi. */
export const DEFAULT_ANCHOR_DAY = 14;

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
