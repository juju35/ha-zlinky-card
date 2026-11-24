// ── Illustrated header ───────────────────────────────────────────────────────
// Tariff period from the meter's label: off-peak (`HC..`, `HEURE CREUSE`, `HCJB`…), peak (`HP..`, `HPJR`,
// `HEURES PLEINES`…), else null (Base, EJP, an unknown label).
export function zlPeriod(text) {
  var t = String(text || '').trim().toUpperCase();
  if (!t) return null;
  if (/^HC|CREUS/.test(t)) return 'hc';
  if (/^HP|PLEIN/.test(t)) return 'hp';
  return null;
}

// Night picture: forced by illustration_theme, else Home Assistant's dark theme alone (a light theme keeps the day
// picture after sunset).
export function zlIsNight(hass, config) {
  var theme = config?.illustration_theme;
  if (theme === 'night') return true;
  if (theme === 'day') return false;
  return !!hass?.themes?.darkMode;
}


// The banner's picture, 200 × 80 at the right of the banner (1 unit = 1 px at meter_size 100): the technical
// sheath (GTL) panel that holds the meter (the card's own drawing, laid over it as the .picture element), and on
// the wall at its left, by state: the off-peak / peak contactor (moon or sun), and the cable to the home with the
// current flowing along it, to a lit bulb while consuming, from a solar panel while producing (none offline).
// `uid` keeps the ids of each card apart. Everything left of x 70 is plain wall: the title sits there.
// `bare`: the scene without the meter's sheath (the meter is drawn big in the card's body): the bulb or the solar
// panel and the contactor, fed by a cable coming from the right edge.
export function zlSceneSvg(uid, state, period, bare) {
  var acc = '';
  if (period) {
    var glyph = period === 'hc'
      ? '<path class="zl-moon" d="M116.6 26.4a3.6 3.6 0 1 0 3.2 5.4 2.9 2.9 0 1 1-3.2-5.4Z"/>'
      : `<circle class="zl-sun" cx="116" cy="30" r="2.4"/><path class="zl-rays" d="${[0, 45, 90, 135, 180, 225, 270, 315]
        .map((a) => { var r = (a * Math.PI) / 180, c = Math.cos(r), n = Math.sin(r); return `M${(116 + c * 3.6).toFixed(1)} ${(30 + n * 3.6).toFixed(1)}L${(116 + c * 4.8).toFixed(1)} ${(30 + n * 4.8).toFixed(1)}`; }).join('')}"/>`;
    acc += '<g class="zl-contactor"><path class="zl-wire" d="M116 20V9H131"/>' +
      '<rect class="zl-din" x="108" y="20" width="16" height="28" rx="2"/><rect class="zl-win" x="110.5" y="23.5" width="11" height="13" rx="1.5"/>' +
      glyph + '<circle class="zl-ind" cx="116" cy="42.5" r="1.6"/></g>';
  }
  if (state !== 'off') {
    var end = state === 'prod'
      ? '<g class="zl-panel"><circle class="zl-sun" cx="84" cy="44" r="3.4"/><path class="zl-pv" d="M84 64H104L108 51H88Z"/>' +
        '<path class="zl-pvl" d="M89 60.5H105.2M90.2 57H106.3M91.3 53.8H107.3M91 64L95 51M97.6 64L101.4 51"/><path class="zl-wire" d="M96 64V68"/></g>'
      : `<g class="zl-bulb"><circle class="zl-halo" cx="96" cy="57" r="10" fill="url(#zl-halo-${uid})"/><circle class="zl-glass" cx="96" cy="57" r="4.6"/>` +
        '<rect class="zl-base" x="93.6" y="61.2" width="4.8" height="3.6" rx=".8"/><rect class="zl-socket" x="92" y="64.6" width="8" height="3.6" rx="1"/></g>';
    acc += '<path class="zl-cable" d="M131 68H96"/><path class="zl-flow" d="M131 68H96"/>' + end;
  }
  var defs = `<defs><radialGradient id="zl-halo-${uid}"><stop offset="0" stop-color="#ffd65a" stop-opacity=".75"/><stop offset="1" stop-color="#ffd65a" stop-opacity="0"/></radialGradient></defs>`;
  if (bare) {
    // The distribution board at the right: a row of breakers on its rail, the off-peak / peak contactor and the main
    // breaker on the second rail; the cable leaves it to the bulb (or comes back from the solar panel).
    var board = '<rect class="zl-gtl" x="138" y="4" width="58" height="72" rx="3"/><rect class="zl-gtl-in" x="141" y="7" width="52" height="66" rx="2"/>' +
      '<path class="zl-wire" d="M142 21H192M142 52H192"/>' +
      [0, 1, 2, 3, 4].map((i) => { var x = 144 + i * 9.4; return `<rect class="zl-din" x="${x}" y="12" width="8" height="18" rx="1.2"/><rect class="zl-win" x="${x + 2.2}" y="15" width="3.6" height="6" rx=".8"/>`; }).join('') +
      '<rect class="zl-din" x="164" y="38" width="26" height="28" rx="2"/><rect class="zl-win" x="168" y="42" width="18" height="9" rx="1.5"/><rect class="zl-win" x="174.5" y="55" width="5" height="7" rx="1"/>';
    var contactor = acc.match(/<g class="zl-contactor">[\s\S]*?<\/g>/);
    var rest = acc.replace(/<g class="zl-contactor">[\s\S]*?<\/g>/, '').replace(/M131 68H96/g, 'M120 68H96');
    return `<svg class="zl-scene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">${defs}` +
      `<g class="zl-board">${board}${contactor ? `<g transform="translate(36 18)">${contactor[0].replace(/<path class="zl-wire" d="M116 20V9H131"\/>/, '')}</g>` : ''}</g>` +
      `<g class="zl-load" transform="translate(18 0)">${rest}</g></svg>`;
  }
  return `<svg class="zl-scene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">${defs}` +
    (bare ? '' :
      '<rect class="zl-gtl" x="120" y="-2" width="78" height="84" rx="3"/><rect class="zl-gtl-in" x="123" y="1" width="72" height="80" rx="2"/>' +
      `<g class="zl-acc" transform="translate(-8 0)">${acc}</g></svg>`);
}
