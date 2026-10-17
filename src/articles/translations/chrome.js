/**
 * Only the blog chrome (navigation labels, headings) of every language.
 *
 * Named `chrome` imports keep the article bodies out of any bundle that
 * needs just the chrome: the unused `articles` exports are tree-shaken.
 */
import { chrome as ru } from "./ru.js";
import { chrome as de } from "./de.js";
import { chrome as en } from "./en.js";
import { chrome as pl } from "./pl.js";
import { chrome as uk } from "./uk.js";
import { chrome as nl } from "./nl.js";
import { chrome as cs } from "./cs.js";
import { chrome as ro } from "./ro.js";
import { chrome as tr } from "./tr.js";
import { chrome as he } from "./he.js";
import { chrome as fr } from "./fr.js";
import { chrome as sv } from "./sv.js";
import { chrome as da } from "./da.js";
import { chrome as ar } from "./ar.js";
import { chrome as hu } from "./hu.js";
import { chrome as es } from "./es.js";
import { chrome as it } from "./it.js";
import { chrome as pt } from "./pt.js";
import { chrome as el } from "./el.js";
import { chrome as zh } from "./zh.js";
import { chrome as ko } from "./ko.js";
import { chrome as ja } from "./ja.js";
import { chrome as ur } from "./ur.js";

export const chromeByLanguage = {
  ru, de, en, pl, uk, nl, cs, ro, tr, he, fr, sv,
  da, ar, hu, es, it, pt, el, zh, ko, ja, ur,
};
