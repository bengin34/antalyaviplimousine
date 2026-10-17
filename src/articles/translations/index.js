/**
 * Every published blog language, in Antalya arrival-volume order.
 *
 * The order is the priority order: it decides which market's alternate is
 * listed first and which language a new article has to be written in before
 * the next one. Adding a market is adding a file here and one entry below.
 */
import * as ru from "./ru.js";
import * as de from "./de.js";
import * as en from "./en.js";
import * as pl from "./pl.js";
import * as uk from "./uk.js";
import * as nl from "./nl.js";
import * as cs from "./cs.js";
import * as ro from "./ro.js";
import * as tr from "./tr.js";
import * as he from "./he.js";
import * as fr from "./fr.js";
import * as sv from "./sv.js";
import * as da from "./da.js";
import * as ar from "./ar.js";
import * as hu from "./hu.js";
import * as es from "./es.js";
import * as it from "./it.js";
import * as pt from "./pt.js";
import * as el from "./el.js";
import * as zh from "./zh.js";
import * as ko from "./ko.js";
import * as ja from "./ja.js";
import * as ur from "./ur.js";

export const translations = {
  ru, de, en, pl, uk, nl, cs, ro, tr, he, fr, sv,
  da, ar, hu, es, it, pt, el, zh, ko, ja, ur,
};

/** Lives in ../languages.js so it can be imported without the article text. */
export { languageOrder } from "../languages.js";
