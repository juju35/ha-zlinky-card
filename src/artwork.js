// ── Artwork ──────────────────────────────────────────────────────────────────
// Short label for a tariff tier from its name: initials for a multi-word name
// ("Heures creuses" → "HC"), else the first letters ("Base" → "BASE").
import { zlEsc } from "./i18n-helpers.js";

export function zlAbbr(name) {
  var w = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (w.length > 1) return w.map((x) => x[0]).join('').toUpperCase().slice(0, 4);
  return String(name || '').toUpperCase().slice(0, 6);
}

// Front view of a Linky meter, true to the real device: anise-green body, status
// LED on top, "Linky" mark, light recessed LCD. `scr` is one rolling screen
// { l: label, v: value, u: unit }; a tap cycles to the next (see _picture). The
// LED (class "led"/"glow") blinks faster as the load rises.
export function zlMeterArt(scr, uid) {
  // `uid` keeps each card's gradient ids apart (several cards on one page).
  var k = uid ? `-${uid}` : '';
  var l = zlEsc(scr?.l || ''), v = zlEsc(scr?.v || ''), u = zlEsc(scr?.u || '');
  var uw = u ? u.length * 2.4 + 1.5 : 0;        // unit box width (unit font ≈ 2.4 u/char) + gap
  var vx = (56.5 - uw).toFixed(1);              // same value font on every screen; it can't overflow
  var lcd = `<text class="lbl" x="23.5" y="43">${l}</text>` +
    `<text class="lcd" x="${vx}" y="57.6" text-anchor="end">${v}</text>` +
    (u ? `<text class="unit" x="56.5" y="57.6" text-anchor="end">${u}</text>` : '');
  return '<svg viewBox="0 0 80 100" aria-hidden="true">' +
    `<defs><linearGradient id="zl-mb${k}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a6c516"/><stop offset=".5" stop-color="#c6db28"/><stop offset="1" stop-color="#a6c516"/></linearGradient>` +
    `<linearGradient id="zl-sh${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".32"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
    `<linearGradient id="zl-bz${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f4f0"/><stop offset="1" stop-color="#d8d8d2"/></linearGradient>` +
    `<linearGradient id="zl-ls${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfc6ad"/><stop offset=".5" stop-color="#d4d9c5"/><stop offset="1" stop-color="#c7cdb6"/></linearGradient>` +
    `<radialGradient id="zl-mg${k}" cx=".5" cy=".5" r=".5"><stop offset="0" class="glow-c" stop-opacity=".6"/><stop offset="1" class="glow-c" stop-opacity="0"/></radialGradient></defs>` +
    '<ellipse cx="40" cy="97.5" rx="30" ry="2.3" fill="#000" opacity=".12"/>' +
    `<rect x="5" y="2" width="70" height="95" rx="10" fill="url(#zl-mb${k})" stroke="#8aa30c" stroke-width="1"/>` +
    `<rect x="5" y="2" width="70" height="95" rx="10" fill="url(#zl-sh${k})"/>` +
    `<circle class="glow" cx="40" cy="13" r="6" fill="url(#zl-mg${k})"/>` +
    '<circle cx="40" cy="13" r="2.7" fill="#1f270a" opacity=".5"/>' +
    '<circle class="led" cx="40" cy="13" r="2"/>' +
    '<text class="brand" x="40" y="25.5" text-anchor="middle">Linky</text>' +
    `<rect x="18" y="30" width="44" height="47" rx="4" fill="url(#zl-bz${k})" stroke="#b9b9b0" stroke-width="1"/>` +
    '<rect x="21" y="33" width="38" height="31" rx="2.5" fill="#20260f"/>' +
    `<rect x="22" y="34" width="36" height="29" rx="2" fill="url(#zl-ls${k})"/>` +
    '<rect x="22" y="34" width="36" height="4" rx="2" fill="#000" opacity=".10"/>' +
    lcd +
    '<path d="M28 71.5h5" stroke="#55602c" stroke-width="1.7" stroke-linecap="round"/>' +
    '<path d="M47 71.5h5M49.5 69v5" stroke="#55602c" stroke-width="1.7" stroke-linecap="round"/>' +
    '<path d="M40 86v5M36 91h8" stroke="#6b7838" stroke-width="1.4" stroke-linecap="round"/></svg>';
}
