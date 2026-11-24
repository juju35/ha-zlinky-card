// ── i18n ──────────────────────────────────────────────────────────────────────
import { ZlI18n } from "./i18n/zli18n.js";

// Card language: the full code when the dictionary has it (`sr-Latn`), else its base (`fr-FR` -> `fr`), else English.
export function zlLang(lang) {
  var l = String(lang || 'en');
  if (ZlI18n[l]) return l;
  l = l.split('-')[0];
  return ZlI18n[l] ? l : 'en';
}

// Locale for Intl: Home Assistant's full locale (`pt-PT`, `de-CH`) when its base is the card language,
// else the card language itself. A bare `pt` means European Portuguese here (the dictionary's variant).
export function zlFmtLang(lang, haLang) {
  var ha = String(haLang || '');
  // (Not when HA's code is another card language of its own, e.g. `sr-Latn` with the card forced to `sr`.)
  var l = !lang.includes('-') && !ZlI18n[ha] && ha.split('-')[0] === lang ? ha : lang;
  return l === 'pt' ? 'pt-PT' : l;
}

export function zlT(lang, key) {
  var strings = ZlI18n[lang] || ZlI18n.en;
  return strings[key] || ZlI18n.en[key] || key;
}

export function zlEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// A section title whose trailing unit ("24 h", "24 u") keeps its case under the titles' text-transform: uppercase
// (the hour symbol is "h", "LAST 24 H" is wrong).
export function zlUnitCase(text) {
  return zlEsc(text).replace(/(\d[\s\u00a0]+)(\S+)$/, '$1<span class="unit">$2</span>');
}
