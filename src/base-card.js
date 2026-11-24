// ── Base card ────────────────────────────────────────────────────────────────
import { zlEsc, zlFmtLang, zlLang, zlT, zlUnitCase } from "./i18n-helpers.js";
import { ZL_TEMPO_COLORS, ZL_TIERS, ZL_ZEN_COLORS, zlDeviceEntities, zlFindDevice, zlFindRole, zlPriceAt, zlRegistryByDevice, zlTarifEdf, zlTempo, zlTierOf, zlZenDay } from "./entity-discovery.js";
import { zlMorph } from "./dom-patching.js";
import { zlAbbr, zlMeterArt } from "./artwork.js";
import { zlIsNight, zlPeriod, zlSceneSvg } from "./illustrated-header.js";
import { ZL_COMPARE_DAYS, ZL_COMPARE_REFRESH, ZL_COMPARE_SAME, ZL_LINKY_DAYS, ZL_LOAD_COLORS, ZL_LOAD_CRITICAL, ZL_LOAD_WARNING, ZL_PRODUCE_COLOR, ZL_PRODUCE_HOLD, ZL_STATS_REFRESH, ZL_STATS_RETRY, zlAmps, zlBase, zlCompare, zlDayLabel, zlHcRanges, zlInRanges, zlKwh, zlLinkyId, zlLoadLevel, zlMinuteOfDay, zlMoney, zlMonthProgress, zlNum, zlPct, zlPower, zlRows, zlSpark, zlTimeFmt } from "./formatting.js";

export var zlUidN = 0;

// The status pill's place, decided by measurement after each render and each new width (the same rule on every
// card): on the title row, right after the title, only when the whole title and the pill's whole label fit there;
// otherwise on its own line under the subtitle (one line), the title whole on its row (cut only when it does not fit
// alone). When the label is still cut there, or the text block leaves the banner or runs over its ground strip, the
// pill keeps its dot alone, on the title row (its label stays in title and aria-label). A card of 200 px or less
// shows the dot alone anyway (CSS), beside the title.
export function zlPlacePill(head, row, ground) {
  if (!head) return;
  head.removeAttribute('data-wrap');
  head.removeAttribute('data-dot');
  var pill = row.querySelector(':scope > .st');
  var text = pill?.querySelector('.stt');
  if (!text?.getBoundingClientRect || text.getBoundingClientRect().width <= 1) return;
  var name = row.querySelector(':scope > .name');
  var gap = parseFloat(getComputedStyle(row).columnGap) || 0;
  var title = name && getComputedStyle(name).display !== 'none' ? (name.scrollWidth > name.clientWidth ? name.scrollWidth : name.getBoundingClientRect().width) + gap : 0;
  if (title + pill.getBoundingClientRect().width <= row.getBoundingClientRect().width + 0.5) return;
  head.setAttribute('data-wrap', '');
  var box = row.parentElement.getBoundingClientRect();
  var frame = head.getBoundingClientRect();
  var out = ground && (box.bottom > ground.getBoundingClientRect().top + 0.5 || box.top < frame.top - 0.5);
  if (text.scrollWidth > text.clientWidth + 0.5 || out) {
    head.removeAttribute('data-wrap');
    head.setAttribute('data-dot', '');
  }
}

export class ZlinkyCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('zlinky-card-editor');
  }

  static getStubConfig(hass) {
    var id = zlFindDevice(hass);
    return id ? { device_id: id } : {};
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this._config = Object.assign({
      show_graph: true, show_stats: true, show_index: true, show_phases: true, show_logo: true, show_tempo: true, show_cost: true,
      show_load_pill: true,
    }, config);
    // show_title / show_subtitle: the header's title / subtitle, hidden by the stylesheet
    this.toggleAttribute?.("hide-title", config.show_title === false);
    this.toggleAttribute?.("hide-subtitle", config.show_subtitle === false);
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.addEventListener('click', (ev) => this._onClick(ev));
      // Enter / Space on a role=button element (the scrolling meter) acts like a click.
      this.shadowRoot.addEventListener('keydown', (ev) => {
        if (ev.key !== 'Enter' && ev.key !== ' ') return;
        if (ev.composedPath().some((n) => n.dataset && (n.dataset.action === 'screen' || n.dataset.action === 'day'))) { ev.preventDefault(); this._onClick(ev); }
      });
    }
    this._stats = null;
    this._statsKey = null;
    this._cmp = null;
    this._cmpKey = null;
    this._day = null;
    this._hours = null;
    this._sig = null;
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  connectedCallback() {
    Promise.resolve().then(() => this._fitAfterCard());
    // A new width (or the web font loaded): the status pill is fitted again, in the next frame.
    if (typeof ResizeObserver === 'function') {
      this._resize ??= new ResizeObserver((entries) => {
        var w = Math.round(entries[entries.length - 1].contentRect.width);
        if (w === this._fitWidth) return;
        this._fitWidth = w;
        cancelAnimationFrame(this._fitFrame);
        this._fitFrame = requestAnimationFrame(() => this._fitPill());
      });
      this._resize.observe(this);
    }
    document.fonts?.ready?.then(() => this._fitPill());
    clearInterval(this._timer);
    this._timer = setInterval(() => {
      this._statsAt = 0;
      this._update();
    }, ZL_STATS_REFRESH);
  }

  disconnectedCallback() {
    this._resize?.disconnect();
    this._fitWidth = null;
    clearInterval(this._timer);
  }

  getCardSize() { return 6; }

  // 9 columns at least: narrower (6 columns of a 320 px phone section, ~156 px) the meter, the reading and the
  // three tiles cannot share the width. The mini card fits 6.
  getGridOptions() { return { columns: 12, min_columns: 9 }; }

  _lang() {
    return zlLang((this._config?.language) || (this._hass?.language) || document.documentElement.lang || 'en');
  }

  _t(k) { return zlT(this._lang(), k); }

  _fmtLang() { return zlFmtLang(this._lang(), this._hass?.locale?.language || this._hass?.language); }

  _deviceId() {
    var hass = this._hass, c = this._config;
    if (c.device_id) return c.device_id;
    if (c.entity && hass.entities?.[c.entity]) return hass.entities[c.entity].device_id;
    return zlFindDevice(hass);
  }

  _resolve() {
    var hass = this._hass, c = this._config;
    // HA Linky: no device and no entity, the statistics stand for the total index.
    var lk = zlLinkyId(c);
    if (lk) {
      if (this._resolved?.config === c && this._resolved.r.linky === lk) return this._resolved.r;
      var rl = { deviceId: null, ent: { energy: lk }, n: 0, linky: lk };
      this._resolved = { reg: hass.entities, config: c, n: 0, r: rl };
      return rl;
    }
    var deviceId = this._deviceId();
    // Role matching only depends on the registry, the device, the config and which of the device's entities
    // have a state: cache it and rebuild only when one of them changes (`hass.entities` is replaced on registry
    // updates, `_config` on setConfig; an entity whose state appears late, e.g. while HA starts, changes the count).
    var list = zlDeviceEntities(hass, deviceId);
    var cache = this._resolved;
    if (cache && cache.reg === hass.entities && cache.config === c && cache.r.deviceId === deviceId && cache.n === list.length) return cache.r;
    var over = c.entities || {};
    var ent = {};
    // Phase entities first, so the single-phase matchers skip what they already took.
    var order = ['current_b', 'current_c', 'voltage_b', 'voltage_c', 'apparent_power_a', 'apparent_power_b', 'apparent_power_c',
      'injection', 'apparent_power'].concat(ZL_TIERS,
      ['energy', 'power', 'current', 'voltage', 'tariff', 'tomorrow', 'tempo']);
    order.forEach((role) => {
      if (over[role]) { ent[role] = over[role]; return; }
      var taken = Object.values(ent);
      ent[role] = zlFindRole(hass, list.filter((e) => taken.indexOf(e.entity_id) < 0), role);
    });
    // Tarif EDF: today's and tomorrow's Tempo colors when the meter gives none (an override still wins).
    var edf = c.tarif_edf ? zlTarifEdf(hass) : null;
    if (edf) {
      if (!over.tempo && edf.today) ent.tempo = edf.today;
      if (!ent.tomorrow && edf.tomorrow) ent.tomorrow = edf.tomorrow;
    }
    // `n`: how many of the device's sensors have a state (tells "no sensor recognised" from "still starting").
    var r = { deviceId: deviceId, ent: ent, n: list.length };
    this._resolved = { reg: hass.entities, config: c, n: list.length, r: r };
    return r;
  }

  _st(id) { return id && this._hass.states[id]; }

  _avail(id) {
    var s = this._st(id);
    return !!s && s.state !== 'unavailable' && s.state !== 'unknown';
  }

  _numv(id) {
    if (!this._avail(id)) return null;
    var v = Number(this._st(id).state);
    return Number.isFinite(v) ? v : null;
  }

  _update() {
    if (!this._config || !this._hass || !this.shadowRoot) return;
    var r = this._resolve();
    var hass = this._hass;
    this._fetchStats(r);
    this._fetchCompare(r);
    var states = JSON.stringify(Object.keys(r.ent).map((k) => {
      var s = r.ent[k] && hass.states[r.ent[k]];
      return s ? s.state : null;
    }));
    var sig = JSON.stringify([this._lang(), this._fmtLang(), zlIsNight(hass, this._config), r.deviceId, r.n, this._zoomed, this._statsKey, this._statsVer, this._cmpVer, states, this._prices(), this._subscribed(), this._subscription()]);
    if (sig === this._sig) return;
    this._sig = sig;
    this._r = r;
    this._render(r);
  }

  // The 24 h curve from the recorder's state history, averaged in 5-minute steps (mean and highest reading), for a
  // power sensor that has no long-term statistics. [] when the history has fewer than two readings.
  _historyCurve(id) {
    var end = Date.now(), start = end - 24 * 3600000;
    return this._hass.callWS({ type: 'history/history_during_period', start_time: new Date(start).toISOString(),
      end_time: new Date(end).toISOString(), entity_ids: [id], minimal_response: true, no_attributes: true,
      significant_changes_only: false })
      .then((x) => {
        var unitK = /^k/.test(String(this._st(id)?.attributes.unit_of_measurement || ''));
        var steps = new Map();
        (x?.[id] || []).forEach((h) => {
          var v = Number(h.s ?? h.state) * (unitK ? 1000 : 1);
          var t = h.lu != null ? h.lu * 1000 : Date.parse(h.last_updated || h.last_changed);
          if (!Number.isFinite(v) || !Number.isFinite(t)) return;
          var k = Math.floor(Math.max(t, start) / 300000) * 300000;
          var b = steps.get(k) || { sum: 0, n: 0, max: -Infinity };
          b.sum += v;
          b.n += 1;
          b.max = Math.max(b.max, v);
          steps.set(k, b);
        });
        return [...steps.entries()].sort((a, b) => a[0] - b[0]).map(([t, b]) => ({ t, v: b.sum / b.n, max: b.max }));
      })
      .then((pts) => (pts.length > 1 ? pts : []));
  }

  // Whether the contract comparison is set up: both contracts' prices and the off-peak hours.
  _compareOn() {
    var c = this._config;
    return !this._compact() && Number(c.compare_base) > 0 && Number(c.compare_hc) > 0 && Number(c.compare_hp) > 0 && zlHcRanges(c.hc_hours).length > 0;
  }

  // The last 12 months of hourly kWh of the total index (one statistics query, every 6 hours), for the comparison.
  _fetchCompare(r) {
    var hass = this._hass;
    if (!hass.callWS || !r.ent.energy || !this._compareOn() || this._cmpBusy) return;
    var key = r.ent.energy;
    if (this._cmpKey === key && Date.now() - (this._cmpAt || 0) < ZL_COMPARE_REFRESH) return;
    this._cmpBusy = true;
    this._cmpKey = key;
    this._cmpAt = Date.now();
    hass.callWS({ type: 'recorder/statistics_during_period', statistic_ids: [key], period: 'hour', types: ['change'],
      start_time: new Date(Date.now() - ZL_COMPARE_DAYS * 86400000).toISOString(), units: { energy: 'kWh' } })
      .then((x) => {
        if (this._cmpKey !== key) return;
        this._cmp = (x?.[key] || []).map((p) => ({ start: typeof p.start === 'number' ? p.start : Date.parse(p.start), kwh: Number(p.change) }))
          .filter((p) => Number.isFinite(p.start) && Number.isFinite(p.kwh) && p.kwh >= 0);
        this._cmpVer = (this._cmpVer || 0) + 1;
      })
      .catch(() => { this._cmpAt = Date.now() - ZL_COMPARE_REFRESH + ZL_STATS_RETRY; })
      .finally(() => {
        this._cmpBusy = false;
        this._update();
      });
  }

  // Base or Off-peak / Peak, priced on the last 12 months.
  _compareHtml(lang) {
    if (!this._compareOn() || !this._cmp?.length) return '';
    var c = this._config;
    var res = zlCompare(this._cmp, c, this._hass.config?.time_zone);
    if (!res || res.total <= 0) return '';
    var cur = this._hass.config?.currency;
    var money = (v) => zlMoney(this._fmtLang(), v, cur);
    var share = Math.round((res.hc / res.total) * 100);
    var cheaper = res.hchp < res.base ? 'cmp_hchp' : 'cmp_base';
    var saving = Math.abs(res.base - res.hchp);
    // Under 2 % apart (a few euros a year), neither contract really saves: said so rather than naming a winner.
    var verdict = saving < ZL_COMPARE_SAME * Math.min(res.base, res.hchp)
      ? this._t('cmp_same').replace('{v}', money(saving))
      : this._t('cmp_saves').replace('{c}', this._t(cheaper)).replace('{v}', money(saving));
    return '<div class="section">' +
      `<div class="section-title"><ha-icon icon="mdi:scale-balance"></ha-icon><span>${zlEsc(this._t('cmp_title'))}</span><span class="aside">${zlEsc(this._t('cmp_days').replace('{d}', zlNum(lang, res.days, 0)))}</span></div>` +
      `<div class="row"><span>${zlEsc(this._t('cmp_base'))}</span><span class="rv">${zlEsc(money(res.base))}</span></div>` +
      `<div class="row"><span>${zlEsc(this._t('cmp_hchp'))} · ${zlEsc(this._t('cmp_share').replace('{p}', share))}</span><span class="rv">${zlEsc(money(res.hchp))}</span></div>` +
      `<div class="row cmp-verdict"><span>${zlEsc(verdict)}</span></div>` +
      '</div>';
  }

  // Today / yesterday / this month from the recorder's long-term statistics, plus the 24 h power curve.
  _fetchStats(r) {
    var c = this._config, hass = this._hass;
    if (!hass.callWS || this._statsBusy) return;
    var curveId = r.ent.apparent_power || r.ent.power;
    // The 24 h curve (288 points) is only fetched when it will be drawn: `show_graph` on the full
    // card, or the mini once unfolded. The flag is part of the key, so unfolding refetches at once.
    var wantCurve = !!(curveId && c.show_graph && !this._compact());
    // With one price per tier, each tier's index in use is fetched too: the cost sums each tier's kWh × its price.
    var tierIds = this._prices().length > 1 && r.ent.energy
      ? ZL_TIERS.filter((t) => this._avail(r.ent[t]) && (zlKwh(this._st(r.ent[t])) || 0) > 0) : [];
    // The cost section also needs this week and last month.
    var costOn = this._costOn() && !!r.ent.energy;
    var key = `${r.ent.energy}|${curveId}|${wantCurve ? 1 : 0}|${tierIds.join(',')}|${costOn ? 1 : 0}`;
    var fresh = this._statsKey === key && Date.now() - (this._statsAt || 0) < ZL_STATS_REFRESH;
    var lk = r.linky;
    // HA Linky: the 30 daily bars, on the full card (or the mini once unfolded) with `show_graph`.
    var wantDays = !!(lk && c.show_graph && !this._compact());
    key += `|${wantDays ? 1 : 0}`;
    fresh = this._statsKey === key && Date.now() - (this._statsAt || 0) < ZL_STATS_REFRESH;
    // Nothing to fetch when neither the tiles (or the mini's "today" line), the cost section nor the curve are shown.
    // HA Linky always fetches: its meter screens and its main reading are statistics too.
    if (fresh || !(lk || c.show_stats || costOn || wantCurve)) return;
    this._statsBusy = true;
    this._statsKey = key;
    this._statsAt = Date.now();
    var failed = false;
    var change = (period, offset, id = r.ent.energy) => (id
      ? hass.callWS({ type: 'recorder/statistic_during_period', statistic_id: id,
        calendar: { period: period, offset: offset }, types: ['change'], units: { energy: 'kWh' } })
        .then((x) => (x?.change != null ? Number(x.change) : null)).catch(() => { failed = true; return null; })
      : Promise.resolve(null));
    var curve = wantCurve
      ? hass.callWS({ type: 'recorder/statistics_during_period', statistic_ids: [curveId], period: '5minute', types: ['mean', 'max'],
        start_time: new Date(Date.now() - 24 * 3600000).toISOString() })
        .then((x) => {
          var unitK = /^k/.test(String(this._st(curveId)?.attributes.unit_of_measurement || ''));
          // `v` (the 5-minute mean) draws the curve, `max` (the highest reading in those 5 minutes) gives its peak.
          return (x?.[curveId] || []).map((p) => ({
            t: typeof p.start === 'number' ? p.start : Date.parse(p.start),
            v: Number(p.mean) * (unitK ? 1000 : 1),
            max: p.max == null ? null : Number(p.max) * (unitK ? 1000 : 1),
          })).filter((p) => Number.isFinite(p.t) && Number.isFinite(p.v));
        })
        // No long-term statistics (a sensor without state_class, such as the PAPP of some Zigbee2MQTT setups):
        // the curve comes from the recorder's state history instead, in the same 5-minute steps.
        .then((pts) => (pts.length > 1 ? pts : this._historyCurve(curveId)))
        .catch(() => { failed = true; return []; })
      : Promise.resolve([]);
    // HA Linky has nothing for today yet: yesterday, this week, this month and last month.
    var periods = lk ? [['yesterday', 'day', -1], ['week', 'week', 0], ['month', 'month', 0], ['last_month', 'month', -1]]
      : [['today', 'day', 0], ['yesterday', 'day', -1], ['month', 'month', 0]]
        .concat(costOn ? [['week', 'week', 0], ['last_month', 'month', -1]] : []);
    var names = periods.map((p) => p[0]);
    // Per period, each tier's kWh ({ tier1: 1.2, tier2: 3.4 }), or null when one of them is missing.
    var split = (p) => Promise.all(tierIds.map((t) => change(p[1], p[2], r.ent[t]))).then((v) => {
      if (!tierIds.length || v.some((x) => x == null)) return null;
      var o = {};
      tierIds.forEach((t, i) => { o[t] = v[i]; });
      return o;
    });
    // HA Linky's own cost statistic (€ per period), when the app prices the data; missing is not a failure.
    var costs = lk
      ? Promise.all(periods.map((p) => hass.callWS({ type: 'recorder/statistic_during_period', statistic_id: `${lk}_cost`,
        calendar: { period: p[1], offset: p[2] }, types: ['change'] })
        .then((x) => (x?.change != null ? Number(x.change) : null)).catch(() => null)))
      : Promise.resolve([]);
    var days = wantDays
      ? hass.callWS({ type: 'recorder/statistics_during_period', statistic_ids: [lk], period: 'day', types: ['change'],
        start_time: new Date(Date.now() - (ZL_LINKY_DAYS + 2) * 86400000).toISOString(), units: { energy: 'kWh' } })
        .then((x) => zlRows(x?.[lk]).slice(-ZL_LINKY_DAYS)).catch(() => { failed = true; return []; })
      : Promise.resolve([]);
    Promise.all(periods.map((p) => change(p[1], p[2])).concat([curve], periods.map(split), [costs, days])).then((res) => {
      // A reply for a previous config (setConfig while in flight) is dropped: the next update refetches.
      if (this._statsKey !== key) return;
      var n = names.length;
      var next = { key: key, curve: res[n], tiers: {}, costs: {}, days: res[2 * n + 2] };
      names.forEach((k, i) => {
        next[k] = res[i];
        next.tiers[k] = res[n + 1 + i];
        next.costs[k] = res[2 * n + 1][i] ?? null;
      });
      var prev = this._stats;
      // On a partial failure, keep the previous values of the same query rather than falling back to "—".
      if (failed && prev && prev.key === key) {
        names.forEach((k) => {
          if (next[k] == null) next[k] = prev[k];
          if (next.tiers[k] == null) next.tiers[k] = prev.tiers[k];
        });
        if (!next.curve.length) next.curve = prev.curve;
        if (!next.days.length && prev.days) next.days = prev.days;
      }
      this._stats = next;
      this._statsVer = (this._statsVer || 0) + 1;
      if (failed) this._statsAt = Date.now() - ZL_STATS_REFRESH + ZL_STATS_RETRY;
    }).finally(() => {
      this._statsBusy = false;
      this._update();
    });
  }

  // Overridden by the mini card.
  _compact() { return false; }

  _zoomButton() { return ''; }

  _model(r) {
    var c = this._config, ent = r.ent, lang = this._fmtLang();
    var name = c.name || this._t('title');
    // Header icon in a round badge, in the status color: a flash on the illustrated header, else an electric meter.
    var logo = c.show_logo === false ? '' : `<span class="hbadge"><ha-icon icon="${this._bannerOn() ? 'mdi:flash' : 'mdi:meter-electric-outline'}"></ha-icon></span>`;
    if (r.linky) return this._linkyModel(r, lang, name, logo);
    var online = this._avail(ent.energy) || this._avail(ent.apparent_power) || this._avail(ent.power);
    var watts = this._avail(ent.power) ? zlBase(this._st(ent.power)) : null;
    var va = this._avail(ent.apparent_power) ? zlBase(this._st(ent.apparent_power)) : null;
    var main = va != null ? va : watts;
    // The ZLinky reports apparent power (VA); `power_unit` relabels that reading (e.g. `W`) on the value and
    // the drawn meter, for people who read it as watts. It only swaps the unit shown, with no conversion.
    var mainUnit = va != null ? (c.power_unit || 'VA') : 'W';
    var subscribed = this._subscribed();
    var pct = main != null ? Math.max(0, Math.min(100, (main / (subscribed * 1000)) * 100)) : null;
    var level = online ? zlLoadLevel(pct, zlPct(c.load_warning, ZL_LOAD_WARNING), zlPct(c.load_critical, ZL_LOAD_CRITICAL)) : 'off';
    var tariff = this._avail(ent.tariff) ? this._st(ent.tariff).state : '';
    var sub = tariff ? `${this._t('meter')} · ${tariff}` : this._t('meter');
    var producing = online && this._producing(ent, watts);
    return {
      c, ent, lang, name, online, watts, va, main, mainUnit, subscribed, pct, level, sub, tariff, producing,
      period: zlPeriod(tariff),
      color: producing ? ZL_PRODUCE_COLOR : ZL_LOAD_COLORS[level],
      statusText: !online ? this._t('offline') : producing ? this._t('producing') : this._t(`load_${level}`),
      mainText: main != null ? zlPower(lang, main, mainUnit) : '—',
      screens: this._screens({ ent, lang, online, va, watts, subscribed, tariff }),
      logo,
    };
  }

  // HA Linky: no live reading. The main value is yesterday's kWh, the pill says the data is the day before's,
  // the meter's screens scroll through yesterday, this week, this month and last month, and the LED stays still.
  _linkyModel(r, lang, name, logo) {
    var c = this._config, s = this._stats || {};
    var online = s.yesterday != null || s.month != null;
    var level = online ? 'low' : 'off';
    var num = (x) => zlNum(lang, x, x < 100 ? 1 : 0);
    var screens = [['HIER', s.yesterday], ['SEMAINE', s.week], ['MOIS', s.month], ['MOIS-1', s.last_month]]
      .filter(([, v]) => v != null).map(([l, v]) => ({ l, v: num(v).replace(/[\s  ]/g, ''), u: 'kWh' }));
    return {
      c, ent: r.ent, lang, name, online, linky: true, watts: null, va: null, main: null, mainUnit: 'kWh',
      subscribed: this._subscribed(), pct: null, level, sub: 'HA Linky', tariff: '', producing: false, period: null,
      color: ZL_LOAD_COLORS[level],
      statusText: this._t(online ? 'linky_d1' : 'offline'),
      mainText: s.yesterday != null ? `${num(s.yesterday)} kWh` : '—',
      screens: screens.length ? screens : [{ l: '', v: '- - -', u: '' }],
      logo,
    };
  }

  // Producing: a negative active power, or the injection index risen in the last 10 minutes (the ZLinky gives no
  // injected power of its own on most setups; its index only moves while the home sends energy to the grid).
  _producing(ent, watts) {
    if (watts != null && watts < 0) return true;
    var inj = this._avail(ent.injection) ? zlKwh(this._st(ent.injection)) : null;
    if (inj == null) return false;
    var prev = this._inj;
    this._inj = { id: ent.injection, v: inj, at: prev?.id === ent.injection && inj > prev.v ? Date.now() : prev?.id === ent.injection ? prev.at : 0 };
    return !!this._inj.at && Date.now() - this._inj.at < ZL_PRODUCE_HOLD;
  }

  // The illustrated header (the meter in its panel on a 90 px banner), unless `illustration: false` or an `icon`
  // replaces the meter: those keep the classic header, the meter (or the icon) beside the reading.
  _bannerOn() {
    return this._config.illustration !== false && !this._config.icon;
  }

  _uidv() {
    if (!this._uid) this._uid = ++zlUidN;
    return this._uid;
  }

  // meter_size as a scale factor (0.5–2.5), 1 by default.
  _ms() {
    var size = Number(this._config.meter_size);
    return Number.isFinite(size) && this._config.meter_size != null ? Math.min(250, Math.max(50, size)) / 100 : 1;
  }

  // The banner: the wall and its panel, the ground strip, the card's meter over the panel, then the header (icon in
  // the status color, title, subtitle, status pill, detail button) on the wall at the left. Night: darker wall,
  // lit bulb. meter_size scales the picture; above 100 the banner grows with it (the meter is never cut).
  // `meter: false` (full card, unfolded mini card): the meter is drawn big in the body, the banner keeps the bulb or
  // the solar panel and the contactor at the right, and the text gets the rest.
  _banner(m, titles, meter = true) {
    var c = this._config;
    var state = !m.online ? 'off' : m.producing ? 'prod' : 'cons';
    var zoom = this._zoomButton();
    var cls = `banner zl-${state}${m.period ? ` zl-${m.period}` : ''}${meter ? '' : ' bare'}${zlIsNight(this._hass, c) ? ' night' : ''}${zoom ? ' zbtn' : ''}`;
    var ms = meter ? this._ms() : 1;
    // The detail button sits in the banner's top right corner; the picture steps aside from it (.zbtn).
    return `<div class="${cls}"${ms !== 1 ? ` style="--zl-ms:${ms}"` : ''}>${zlSceneSvg(this._uidv(), state, m.period, !meter)}<div class="ground"></div>` +
      (meter ? this._picture(m) : '') + `<div class="header${titles.indexOf('class="sub"') >= 0 ? ' sub2' : ''}">${m.logo}${titles}</div>${zoom}</div>`;
  }

  // The banner's subtitle: the tariff period (Off-peak / Peak, else the meter's own label). The live reading is not
  // repeated: the body shows it big just below (full card, unfolded mini card).
  _bannerSub(m) {
    if (m.linky) return m.sub;
    return (m.period ? this._t(m.period === 'hc' ? 'off_peak' : 'peak_hours') : m.tariff) || this._t('meter');
  }

  // The meter's rolling screens, built only from the data the ZLinky actually
  // exposes: apparent (or active) power, total index, each tariff index in use,
  // injection, current, voltage, subscribed power, tariff in use. Fixed Linky-style
  // labels (same on the device whatever the UI language). No grouping space in
  // values, like the real LCD. Always at least one screen.
  _screens({ ent, lang, online, va, watts, subscribed, tariff }) {
    var c = this._config, out = [];
    var num = (x, d) => zlNum(lang, x, d).replace(/[\s  ]/g, '');
    if (online) {
      if (va != null) out.push({ l: 'P. APP', v: num(va, 0), u: c.power_unit || 'VA' });
      else if (watts != null) out.push({ l: 'P. ACT', v: num(watts, 0), u: 'W' });
      if (this._avail(ent.energy)) out.push({ l: 'INDEX', v: num(zlKwh(this._st(ent.energy)), 0), u: 'kWh' });
      var names = Array.isArray(c.tiers) ? c.tiers : [];
      ZL_TIERS.forEach((t) => {
        if (this._avail(ent[t]) && (zlKwh(this._st(ent[t])) || 0) > 0) {
          var n = Number(t.slice(4));
          out.push({ l: names[n - 1] ? zlAbbr(names[n - 1]) : `IDX${n}`, v: num(zlKwh(this._st(ent[t])), 0), u: 'kWh' });
        }
      });
      var inj = this._avail(ent.injection) ? zlKwh(this._st(ent.injection)) : null;
      if (inj != null && inj > 0) out.push({ l: 'INJECT', v: num(inj, 0), u: 'kWh' });
      var amps = this._numv(ent.current);
      if (amps != null) out.push({ l: 'INTENS', v: num(amps, amps < 100 ? 1 : 0), u: 'A' });
      var volts = this._numv(ent.voltage);
      if (volts != null && volts > 0) out.push({ l: 'TENSION', v: num(volts, 0), u: 'V' });
      if (subscribed != null) out.push({ l: 'ABONNT', v: num(subscribed, Number.isInteger(subscribed) ? 0 : 1), u: 'kVA' });
      if (tariff) out.push({ l: 'TARIF', v: String(tariff).toUpperCase().slice(0, 7), u: '' });
    }
    return out.length ? out : [{ l: '', v: '- - -', u: '' }];
  }

  _picture(m) {
    if (this._config.icon) return `<div class="badge"><ha-icon icon="${zlEsc(this._config.icon)}"></ha-icon></div>`;
    // Blink period: 2.4 s at no load down to 0.35 s at full load.
    var period = m.pct == null ? 2.4 : Math.max(0.35, 2.4 - (m.pct / 100) * 2.05);
    var n = m.screens.length;
    if (this._scr == null) this._scr = 0;
    var i = ((this._scr % n) + n) % n;              // a tap advances _scr; wrap into range
    // More than one screen: the meter is a button that scrolls to the next one.
    var tap = n > 1 ? ` tap" role="button" tabindex="0" data-action="screen" aria-label="${zlEsc(this._t('meter'))}` : '';
    // meter_size scales the illustration (percent of its default size), so the screen can be made easier to read.
    var ms = this._ms();
    var scale = ms !== 1 ? `;--zl-ms:${ms}` : '';
    return `<div class="picture${m.online && !m.linky ? ' live' : ''}${tap}" style="--zl-blink:${period.toFixed(2)}s${scale}">${zlMeterArt(m.screens[i], this._uidv())}</div>`;
  }

  _loadBar(m) {
    if (m.pct == null) return '';
    var label = `${zlNum(m.lang, m.pct, 0)} % ${this._t('of_subscribed').replace('{p}', zlNum(m.lang, m.subscribed, 1))}`;
    return `<div class="load"><div class="bar"><div class="fill" style="width:${m.pct.toFixed(1)}%"></div></div><div class="load-l">${zlEsc(label)}</div></div>`;
  }

  // `price` as a list of €/kWh, one per tier in index order (null where unknown): a number, a list, or entity
  // ids (a sensor giving the price per kWh) alone or in the list. [] without a price.
  _prices() {
    var p = this._config.price;
    // `tarif_edf`: the Tarif EDF integration's prices, unless `price` is set.
    if ((p == null || p === '') && this._config.tarif_edf) p = zlTarifEdf(this._hass)?.price || null;
    var list = Array.isArray(p) ? p : p == null || p === '' ? [] : [p];
    return list.map((x) => {
      if (typeof x === 'string' && /^[a-z_]+\.\w+$/.test(x.trim())) x = this._numv(x.trim());
      var n = x == null || x === '' ? NaN : Number(x);
      return Number.isFinite(n) && n >= 0 ? n : null;
    });
  }

  // Three-phase meter: when the other phases carry a voltage (standard TIC, ZHA), or, for the historic TIC which
  // gives no voltage per phase (Zigbee2MQTT IINST1/2/3), when phase 2 or 3 currents are there without any phase
  // voltage sensor. A single-phase meter whose ZHA phase B / C sensors read 0 V is not.
  _threePhase(ent) {
    var vb = this._numv(ent.voltage_b), vc = this._numv(ent.voltage_c);
    var currentsOnly = !ent.voltage_b && !ent.voltage_c && (this._numv(ent.current_b) != null || this._numv(ent.current_c) != null);
    return vb > 0 || vc > 0 || currentsOnly;
  }

  // The subscribed power in kVA: a number, or a sensor giving it (in kVA, or in A like the historic TIC's ISOUSC:
  // 1 A = 0.2 kVA, per phase on a three-phase meter, so 1 A = 0.6 kVA there). 6 kVA by default, or while the
  // sensor has no usable state.
  _subscribed() {
    var p = this._config.subscribed_power;
    // `tarif_edf`: the integration's subscribed power, unless `subscribed_power` is set.
    if ((p == null || p === '') && this._config.tarif_edf) p = zlTarifEdf(this._hass)?.power || p;
    var v = p;
    if (typeof p === 'string' && /^[a-z_]+\.\w+$/.test(p.trim())) {
      var s = this._st(p.trim());
      v = this._numv(p.trim());
      var u = String(s?.attributes?.unit_of_measurement || 'kVA');
      if (v != null) v = u === 'A' ? v * (this._threePhase(this._resolve().ent) ? 0.6 : 0.2) : /^(VA|W)$/.test(u) ? v / 1000 : v;
    }
    var n = Number(v);
    return v != null && v !== '' && Number.isFinite(n) && n > 0 ? n : 6;
  }

  // The current tier (0-based) from the tariff period, 0 when it names none.
  _tierNow() {
    var ent = this._resolve().ent;
    var n = this._avail(ent.tariff) ? zlTierOf(this._st(ent.tariff).state, this._config.tiers) : null;
    return n == null ? 0 : n - 1;
  }

  // The cost of `kwh` consumed over `period` (today, yesterday, month): each tier's kWh × its price when the
  // tiers' statistics are there, else every kWh at the current tier's price (or the only one). Without the
  // tiers' statistics a past period (yesterday, month) has no cost when the tiers' prices differ: the current
  // tier's price says nothing of the tiers that period was spent in (a red Tempo day priced at a blue one).
  _cost(kwh, period = 'today') {
    var v = this._costValue(kwh, period);
    return v == null ? '' : this._money(v);
  }

  // The same cost as a number, null when it cannot be told.
  _costValue(kwh, period = 'today') {
    // HA Linky's own cost statistic wins: priced by the app hour by hour, tiers included.
    var own = this._linkyCost(period);
    if (own != null) return own;
    var prices = this._prices();
    if (kwh == null || !prices.some((x) => x > 0)) return null;
    var split = prices.length > 1 ? this._stats?.tiers?.[period] : null;
    var known = prices.filter((x) => x != null);
    if (!split && period !== 'today' && known.some((x) => x !== known[0])) return null;
    return split
      ? Object.keys(split).reduce((sum, t) => sum + split[t] * zlPriceAt(prices, Number(t.slice(4)) - 1), 0)
      : kwh * zlPriceAt(prices, this._tierNow());
  }

  // The HA Linky cost statistic's value for a period, null without it (or off HA Linky).
  _linkyCost(period) {
    return this._hass && this._resolve().linky ? this._stats?.costs?.[period] ?? null : null;
  }

  _money(v) { return zlMoney(this._fmtLang(), v, this._hass.config?.currency); }

  // The cost section (full card): `show_cost` and a price.
  _costOn() {
    return !this._compact() && this._config.show_cost !== false &&
      (this._prices().some((x) => x > 0) || ['week', 'month', 'last_month'].some((k) => this._linkyCost(k) != null));
  }

  // `subscription`: the monthly subscription, a number or a sensor giving it; 0 without one.
  _subscription() {
    var x = this._config.subscription;
    if (typeof x === 'string' && /^[a-z_]+\.\w+$/.test(x.trim())) x = this._numv(x.trim());
    var n = x == null || x === '' ? NaN : Number(x);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  // This week, last month and the month-end estimate: this month's energy cost spread over the whole month at the
  // pace so far, plus the subscription. The estimate waits for the first full day of the month (a few hours say
  // nothing of a month), and compares with last month when it is known.
  _costHtml(lang) {
    var s = this._stats;
    if (!this._costOn() || !s) return '';
    var sub = this._subscription();
    var week = this._costValue(s.week, 'week');
    var last = this._costValue(s.last_month, 'last_month');
    var month = this._costValue(s.month, 'month');
    var prog = zlMonthProgress(Date.now(), this._hass.config?.time_zone);
    // HA Linky's month stops at yesterday: only the whole days elapsed count.
    var elapsed = this._resolve().linky ? Math.floor(prog.elapsed) : prog.elapsed;
    var estimate = month != null && elapsed >= 1 ? (month / elapsed) * prog.days + sub : null;
    if (last != null) last += sub;
    if (week == null && last == null && estimate == null) return '';
    var rows = [];
    if (week != null) rows.push(`<div class="row"><span>${zlEsc(this._t('week'))}</span><span class="rv">${zlEsc(this._money(week))}</span></div>`);
    if (last != null) rows.push(`<div class="row"><span>${zlEsc(this._t('last_month'))}</span><span class="rv">${zlEsc(this._money(last))}</span></div>`);
    if (estimate != null) {
      rows.push(`<div class="row cost-est"><span>${zlEsc(this._t('projection'))}</span><span class="rv">${zlEsc(this._money(estimate))}</span></div>`);
      if (last > 0) {
        var pct = Math.round(((estimate - last) / last) * 100);
        var trend = pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat';
        var txt = this._t('vs_last').replace('{p}', `${pct > 0 ? '+' : pct < 0 ? '−' : '±'}${zlNum(lang, Math.abs(pct), 0)} %`);
        rows.push(`<div class="row cmp-verdict cost-trend ${trend}"><span>${zlEsc(txt)}</span></div>`);
      }
    }
    var aside = sub > 0 ? `<span class="aside">${zlEsc(this._t('sub_incl'))}</span>` : '';
    return '<div class="section">' +
      `<div class="section-title"><ha-icon icon="mdi:cash-multiple"></ha-icon><span>${zlEsc(this._t('cost_title'))}</span>${aside}</div>` +
      rows.join('') + '</div>';
  }

  _render(r) {
    var c = this._config, ent = r.ent;
    if (!r.deviceId && !c.entities && !r.linky) {
      this._setHtml(`${this._styles()}<ha-card><div class="empty"><ha-icon icon="mdi:meter-electric-outline"></ha-icon>${this._t('no_device')}</div></ha-card>`);
      return;
    }
    if (this._noSensor(r)) {
      var msg = this._t('no_sensor').replace('{e}', this._t('ed_entities'));
      this._setHtml(`${this._styles()}<ha-card><div class="empty"><ha-icon icon="mdi:meter-electric-outline"></ha-icon>${zlEsc(msg)}</div></ha-card>`);
      return;
    }
    var m = this._model(r);
    if (this._compact()) {
      this._setHtml(this._miniHtml(m));
      return;
    }
    var lang = m.lang;

    // Three-phase details (see _threePhase); a single-phase meter shows none.
    var threePhase = this._threePhase(ent);

    // Hero: meter, live power, active power / current / voltage, load gauge. On a three-phase meter the current and
    // voltage sensors are phase 1's (IRMS1, URMS1): labelled L1 so they do not read as totals.
    var chips = [];
    if (m.va != null && m.watts != null) chips.push(this._chip('mdi:flash-outline', zlPower(lang, m.watts, 'W'), ent.power));
    var amps = this._numv(ent.current), volts = this._numv(ent.voltage);
    var l1 = threePhase ? 'L1 ' : '';
    // intensity_tap_action: 'none' makes the current chip a plain span, so a tap no longer opens more-info.
    if (amps != null) chips.push(this._chip('mdi:current-ac', `${l1}${zlAmps(lang, amps)} A`, this._noTap(c.intensity_tap_action) ? null : ent.current));
    if (volts != null && volts > 0) chips.push(this._chip('mdi:sine-wave', `${l1}${zlNum(lang, volts, 0)} V`, ent.voltage));
    if (m.linky && this._stats?.yesterday != null) {
      var ycost = this._cost(this._stats.yesterday, 'yesterday');
      chips.push(this._chip('mdi:calendar-today', [this._t('yesterday'), ycost].filter((x) => x).join(' · ')));
    }
    if (!m.online) chips.push(`<span class="chip"><ha-icon icon="mdi:lan-disconnect"></ha-icon>${this._t('offline')}</span>`);
    var banner = this._bannerOn();
    // Under the illustrated header the meter is drawn big here, its screen readable (the banner keeps the scene).
    // The tiles (today, yesterday, this month) join the hero under the illustrated header: beside the meter on a
    // wide card, under the meter and the readings on a narrow one (see .hero.big).
    var hero = (tilesHtml) => `<div class="hero${banner ? ' big' : ''}">` + this._picture(m) +
      '<div class="info">' +
        this._big(ent.apparent_power || ent.power, m.mainText) +
        (chips.length ? `<div class="chips">${chips.join('')}</div>` : '') + this._loadBar(m) +
      '</div>' + tilesHtml + '</div>';

    // 24 h curve.
    var graph = '';
    var curve = this._stats?.curve;
    if (c.show_graph && curve && curve.length > 1) {
      // The real peak: the highest reading of the 24 h, not the highest 5-minute mean (which smooths a short peak away).
      var peak = Math.max(...curve.map((p) => (Number.isFinite(p.max) ? p.max : p.v)));
      graph = '<div class="section">' +
        `<div class="section-title"><ha-icon icon="mdi:chart-areaspline"></ha-icon><span>${zlUnitCase(this._t('last_24h'))}</span><span class="aside">${zlEsc(this._t('peak').replace('{v}', zlPower(lang, peak, m.mainUnit)))}</span></div>` +
        `<div class="graph">${zlSpark(curve)}</div></div>`;
    }

    // Consumption tiles.
    var stats = '';
    if (c.show_stats && ent.energy && this._stats) {
      // HA Linky: yesterday is the main reading, so the tiles are this week, this month and last month.
      var tiles = (r.linky ? ['week', 'month', 'last_month'] : ['today', 'yesterday', 'month']).map((k) => [k, this._stats[k]])
        .map(([k, v]) => {
          var cost = this._cost(v, k);
          return `<div class="tile"><span class="tl">${this._t(k)}</span>` +
            `<span class="tv">${v == null ? '—' : `${zlNum(lang, v, v < 100 ? 1 : 0)}<small> kWh</small>`}</span>` +
            (cost ? `<span class="tc">${zlEsc(cost)}</span>` : '') + '</div>';
        });
      stats = `<div class="tiles">${tiles.join('')}</div>`;
    }

    // Meter index: total, tiers in use, injection.
    var index = '';
    if (c.show_index && this._avail(ent.energy)) {
      var rows = [];
      var tiers = ZL_TIERS.filter((t) => (this._avail(ent[t]) && (zlKwh(this._st(ent[t])) || 0) > 0));
      if (tiers.length > 1) {
        var names = Array.isArray(c.tiers) ? c.tiers : [];
        tiers.forEach((t) => {
          var n = Number(t.slice(4));
          rows.push(this._row(names[n - 1] || this._t('tier').replace('{n}', n), `${zlNum(lang, zlKwh(this._st(ent[t])), 0)} kWh`, ent[t]));
        });
      }
      var inj = this._avail(ent.injection) ? zlKwh(this._st(ent.injection)) : null;
      if (inj) rows.push(this._row(this._t('injection'), `${zlNum(lang, inj, 0)} kWh`, ent.injection));
      index = '<div class="section">' +
        `<button class="index" data-more="${zlEsc(ent.energy)}"><ha-icon icon="mdi:counter"></ha-icon><span class="il">${this._t('index')}</span>` +
        `<span class="iv">${zlNum(lang, zlKwh(this._st(ent.energy)), 0)}<small> kWh</small></span></button>` +
        (rows.length ? `<div class="rows">${rows.join('')}</div>` : '') + '</div>';
    }

    // Each phase against its share of the subscribed power. With the apparent power of all three phases (SINSTS1/2/3,
    // the meter's own measure, 1 VA resolution) the rows show VA; otherwise the current (whole amperes from the meter)
    // against the share converted at 230 V. Never a mix of both.
    var phases = '';
    if (c.show_phases && threePhase) {
      var vaIds = [ent.apparent_power_a, ent.apparent_power_b, ent.apparent_power_c];
      var vaOk = vaIds.every((id) => this._avail(id) && zlBase(this._st(id)) != null);
      var share = (m.subscribed * 1000) / 3;
      var rows3 = [['1', ent.current, ent.voltage], ['2', ent.current_b, ent.voltage_b], ['3', ent.current_c, ent.voltage_c]];
      var lines = rows3.map(([n, ci, vi], i) => {
        var v = this._numv(vi), x, max, text;
        if (vaOk) {
          x = zlBase(this._st(vaIds[i])); max = Math.max(1, share); text = zlPower(lang, x, 'VA');
        } else {
          x = this._numv(ci); max = Math.max(1, share / 230); text = x == null ? '—' : `${zlAmps(lang, x)} A`;
        }
        var w = x == null ? 0 : Math.min(100, (x / max) * 100);
        return `<div class="phase"><span class="pn">L${n}</span>` +
          `<div class="bar"><div class="fill" style="width:${w.toFixed(1)}%"></div></div>` +
          `<span class="pv">${text}</span><span class="pv dim">${v == null ? '' : `${zlNum(lang, v, 0)} V`}</span></div>`;
      });
      phases = `<div class="section"><div class="section-title"><ha-icon icon="mdi:transmission-tower"></ha-icon><span>${this._t('phases')}</span></div>${lines.join('')}</div>`;
    }

    var head = banner
      ? this._banner(m, this._titles(m, this._bannerSub(m)), false)
      : '<div class="header sub2">' + m.logo + this._titles(m, m.sub) + this._zoomButton() + '</div>';
    this._setHtml(this._styles(m.color) + '<ha-card>' + head + hero(banner ? stats : '') + this._tempo(ent) + (banner ? '' : stats) + graph + (r.linky ? this._daysHtml(lang) : '') + this._costHtml(lang) + this._compareHtml(lang) + index + phases +
    '</ha-card>');
  }

  // HA Linky: the last 30 days as bars (yesterday last). A tap on a bar opens that day hour by hour underneath
  // (off-peak hours tinted when `hc_hours` is set); a tap on the same bar closes it.
  _daysHtml(lang) {
    var days = this._stats?.days;
    if (!this._config.show_graph || !days?.length) return '';
    var tz = this._hass.config?.time_zone;
    var W = 300, H = 64, n = days.length, gap = 2;
    var bw = (W - gap * (n - 1)) / n;
    var max = Math.max(...days.map((d) => d.kwh), 0.001);
    var avg = days.reduce((a, d) => a + d.kwh, 0) / n;
    var label = (d) => `${zlDayLabel(this._fmtLang(), d.start, tz)} · ${zlNum(lang, d.kwh, 1)} kWh`;
    var bars = days.map((d, i) => {
      var h = Math.max(1.5, (d.kwh / max) * (H - 4));
      var cls = `dbar${d.start === this._day ? ' on' : ''}${i === n - 1 ? ' last' : ''}`;
      var tip = zlEsc(label(d));
      return `<rect class="${cls}" data-action="day" data-day="${d.start}" role="button" tabindex="0" aria-label="${tip}" ` +
        `x="${(i * (bw + gap)).toFixed(1)}" y="${(H - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="1.5"><title>${tip}</title></rect>`;
    }).join('');
    var html = '<div class="section">' +
      `<div class="section-title"><ha-icon icon="mdi:chart-bar"></ha-icon><span>${zlEsc(this._t('last_30d'))}</span><span class="aside">${zlEsc(this._t('avg_day').replace('{v}', zlNum(lang, avg, 1)))}</span></div>` +
      `<svg class="dbars" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${bars}</svg></div>`;
    var day = days.find((d) => d.start === this._day);
    var hours = day && this._hours?.start === day.start ? this._hours.list : null;
    if (!day || !hours?.length) return html;
    var ranges = zlHcRanges(this._config.hc_hours);
    var fmt = ranges.length ? zlTimeFmt(tz) : null;
    var hmax = Math.max(...hours.map((h) => h.kwh), 0.001), hw = (W - 23 * gap) / 24;
    var hc = 0;
    var hbars = hours.slice(0, 24).map((h, i) => {
      var off = fmt && zlInRanges(zlMinuteOfDay(fmt, h.start + 1800000), ranges);
      if (off) hc += h.kwh;
      var hh = Math.max(1.5, (h.kwh / hmax) * (H - 4));
      return `<rect class="hbar${off ? ' hc' : ''}" x="${(i * (hw + gap)).toFixed(1)}" y="${(H - hh).toFixed(1)}" width="${hw.toFixed(1)}" height="${hh.toFixed(1)}" rx="1.5"/>`;
    }).join('');
    var total = hours.reduce((a, h) => a + h.kwh, 0);
    var aside = fmt && total > 0 ? this._t('cmp_share').replace('{p}', zlNum(lang, Math.round((hc / total) * 100), 0)) : `${zlNum(lang, total, 1)} kWh`;
    return html + '<div class="section">' +
      `<div class="section-title"><ha-icon icon="mdi:clock-outline"></ha-icon><span>${zlEsc(this._t('day_hours').replace('{d}', zlDayLabel(this._fmtLang(), day.start, tz)))}</span><span class="aside">${zlEsc(aside)}</span></div>` +
      `<svg class="dbars" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">${hbars}</svg>` +
      '<div class="haxis"><span>0 h</span><span>6 h</span><span>12 h</span><span>18 h</span><span>24 h</span></div></div>';
  }

  // A tap on a day bar: opens (or closes) that day's hours, fetched once per day.
  _pickDay(start) {
    this._day = this._day === start ? null : start;
    if (this._day != null && this._hours?.start !== start) this._fetchHours(start);
    if (this._r) this._render(this._r);
  }

  // One day's hourly kWh from the HA Linky statistics, up to the next day's start (a DST day has 23 or 25 hours).
  _fetchHours(start) {
    var id = this._r?.linky;
    if (!id || !this._hass?.callWS) return;
    var days = this._stats?.days || [];
    var i = days.findIndex((d) => d.start === start);
    var end = days[i + 1]?.start ?? start + 86400000;
    this._hours = { start, list: null };
    this._hass.callWS({ type: 'recorder/statistics_during_period', statistic_ids: [id], period: 'hour', types: ['change'],
      start_time: new Date(start).toISOString(), end_time: new Date(end).toISOString(), units: { energy: 'kWh' } })
      .then((x) => zlRows(x?.[id]).filter((h) => h.start >= start && h.start < end))
      .catch(() => [])
      .then((list) => {
        if (this._hours?.start !== start) return;
        this._hours = { start, list };
        if (this._r) this._render(this._r);
      });
  }

  // Tempo or Zen Flex contract: today's color / day type and tomorrow's (or "not known yet" until it is announced).
  // Nothing when the tariff period names neither.
  // The days shown: [{ label, color, name, tc, id }], today's then tomorrow's when its sensor is there; [] when hidden.
  _tempoDays(ent) {
    if (!this._config.show_tempo) return [];
    var src = ent.tempo || ent.tariff;
    var kind = (id) => { var v = this._st(id).state; return zlTempo(v) || zlZenDay(v); };
    var today = this._avail(src) ? kind(src) : null;
    if (!today) return [];
    var day = (label, color, id) => ({ label, color, id,
      name: this._t(!color ? 'tempo_unknown' : ZL_TEMPO_COLORS[color] ? `tempo_${color}` : `zen_${color}`),
      tc: color ? ZL_TEMPO_COLORS[color] || ZL_ZEN_COLORS[color] : 'var(--secondary-text-color)' });
    var days = [day(this._t('today'), today, src)];
    if (ent.tomorrow && this._avail(ent.tomorrow)) days.push(day(this._t('tomorrow'), kind(ent.tomorrow), ent.tomorrow));
    return days;
  }

  _tempo(ent) {
    var days = this._tempoDays(ent).map((d) => `<button class="tday" data-more="${zlEsc(d.id)}" style="--tc:${d.tc}">` +
      `<span class="tdot${d.color ? '' : ' none'}"></span><span class="tdl">${zlEsc(d.label)}</span>` +
      `<span class="tdv">${zlEsc(d.name)}</span></button>`);
    return days.length ? `<div class="tempo">${days.join('')}</div>` : '';
  }

  // Mini card: today's and tomorrow's Tempo colors as two dots, each with its day; the color's name is in the
  // tooltip and the accessible name, a click opens the sensor.
  _tempoMini(ent) {
    var days = this._tempoDays(ent).map((d) => {
      var tip = zlEsc(`${d.label} · ${d.name}`);
      return `<button class="tmini" data-more="${zlEsc(d.id)}" style="--tc:${d.tc}" title="${tip}" aria-label="${tip}">` +
        `<span class="tdot${d.color ? '' : ' none'}"></span><span class="tdl">${zlEsc(d.label)}</span></button>`;
    });
    return days.length ? `<div class="line tminis">${days.join('')}</div>` : '';
  }

  // The device is there but none of the sensors that tell its state (index, apparent or active power) was
  // recognised: unexpected naming, disabled entities or the wrong device. "Offline" would send the user looking
  // at the module; the card asks for the entities instead. Not while the device's sensors have no state at all
  // (the integration is still starting): that stays "Offline" until they come.
  _noSensor(r) {
    var ent = r.ent;
    if (ent.energy || ent.apparent_power || ent.power) return false;
    if (r.n) return true;
    var reg = this._hass.entities && r.deviceId ? zlRegistryByDevice(this._hass.entities).get(r.deviceId) || [] : [];
    return !reg.some((e) => e.entity_id.indexOf('sensor.') === 0);
  }

  // The header's texts: the name and the status pill on the title row (8 px apart, the pill centred on the name), the
  // subtitle under them. On a narrow card the pill goes to its own line under the subtitle (see the container tiers).
  _titles(m, sub) {
    return `<div class="titles"><div class="trow"><div class="name">${zlEsc(m.name)}</div>${this._pill(m)}</div>` +
      (sub != null ? `<div class="sub" title="${zlEsc(sub)}">${zlEsc(sub)}</div>` : '') + '</div>';
  }

  // The status pill. On a narrow card it shows its dot only: the status stays in its tooltip and accessible name.
  _pill(m) {
    if (this._config.show_load_pill === false) return '';
    var s = zlEsc(m.statusText);
    return `<span class="st" role="img" title="${s}" aria-label="${s}"><span class="dot"></span><span class="stt">${s}</span></span>`;
  }

  // The first render sets innerHTML; later ones patch the existing DOM in place, so the meter's LED
  // animation is not restarted on every power reading, the gauges' width transition plays and the
  // keyboard focus stays on its chip or row.
  _setHtml(html) {
    var root = this.shadowRoot;
    if (!root.firstChild) {
      root.innerHTML = html;
    } else {
      var tpl = document.createElement('template');
      tpl.innerHTML = html;
      zlMorph(root, tpl.content);
    }
    this._fitPill();
    this._fitAfterCard();
  }

  // <ha-card> (Lit) draws its slot a microtask after it is created: until then the card's content has no size, and the
  // status pill measured then would take the wrong line (the card then changed height once measured again). A new
  // <ha-card> is measured once more as soon as it has rendered, before the frame is painted.
  // Rendered before the card is on the page, <ha-card> is only upgraded once connected: called again then (see
  // connectedCallback).
  _fitAfterCard() {
    const card = this.shadowRoot?.querySelector?.('ha-card');
    if (!card?.updateComplete || card === this._fitCard) return;
    this._fitCard = card;
    card.updateComplete?.then?.(() => this._fitPill());
  }

  // The status pill's place, on the banner and on the classic header (see zlPlacePill).
  _fitPill() {
    var row = this.shadowRoot?.querySelector?.('.titles > .trow');
    if (!row) return;
    var banner = row.closest('.banner');
    zlPlacePill(banner || row.closest('.header'), row, banner?.querySelector('.ground'));
  }

  // A more-info chip, or a plain span when no entity is resolved or its tap is disabled (a button there would
  // show a pointer cursor and do nothing).
  _chip(icon, text, id) {
    var inner = `<ha-icon icon="${icon}"></ha-icon>${zlEsc(text)}`;
    return id ? `<button class="chip" data-more="${zlEsc(id)}">${inner}</button>` : `<span class="chip">${inner}</span>`;
  }

  // Whether a *_tap_action config disables the tap: 'none' or { action: 'none' }.
  _noTap(ta) {
    return ta === 'none' || (ta != null && ta.action === 'none');
  }

  _row(label, value, id) {
    return `<button class="row" data-more="${zlEsc(id || '')}"><span>${zlEsc(label)}</span><span class="rv">${zlEsc(value)}</span></button>`;
  }

  // The main power readout: a more-info button, or a plain span when no power entity is resolved
  // (a button there would show a pointer cursor and do nothing).
  _big(id, text) {
    var val = `<span class="val">${zlEsc(text)}</span>`;
    // power_tap_action: 'none' (or { action: 'none' }) makes the readout a plain span, so a tap no longer opens more-info.
    var noTap = this._noTap(this._config.power_tap_action);
    return id && !noTap ? `<button class="big" data-more="${zlEsc(id)}">${val}</button>` : `<span class="big">${val}</span>`;
  }

  _miniHtml(m) {
    // HA Linky: yesterday is the main reading, the line gives this month instead of today.
    var lineKey = m.linky ? 'month' : 'today';
    var today = this._config.show_stats ? this._stats?.[lineKey] : null;
    var lines = [];
    if (today != null) {
      // Each part is kept whole: on a narrow card the line wraps between them instead of cutting the cost off.
      var parts = [this._t(lineKey), `${zlNum(m.lang, today, today < 100 ? 1 : 0)} kWh`, this._cost(today, lineKey)].filter((x) => x);
      var segs = parts.map((x, i) => `<span class="seg">${zlEsc(x)}${i < parts.length - 1 ? ' ·' : ''}</span>`).join(' ');
      lines.push(`<div class="line"><ha-icon icon="mdi:calendar-today"></ha-icon><span>${segs}</span></div>`);
    }
    var banner = this._bannerOn();
    var titles = this._titles(m, null);
    return this._styles(m.color) + '<ha-card class="mini">' +
      (banner ? this._banner(m, titles) : '<div class="header">' + m.logo + titles + this._zoomButton() + '</div>') +
      '<div class="content">' + (banner ? '' : this._picture(m)) +
        '<div class="info">' +
          this._big(m.ent.apparent_power || m.ent.power, m.mainText) +
          this._loadBar(m) + lines.join('') + this._tempoMini(m.ent) +
        '</div></div>' +
    '</ha-card>';
  }

  _onClick(ev) {
    var el = ev.composedPath().find((n) => n.dataset && (n.dataset.action || n.dataset.more));
    if (!el) return;
    if (el.dataset.action === 'zoom') {
      this._toggleZoom(ev);
      return;
    }
    if (el.dataset.action === 'day') {
      this._pickDay(Number(el.dataset.day));
      return;
    }
    if (el.dataset.action === 'screen') {
      // Scroll the meter to the next screen, like the + button on a real Linky.
      this._scr = (this._scr || 0) + 1;
      if (this._r) this._render(this._r);
      return;
    }
    if (el.dataset.more) {
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: el.dataset.more }, bubbles: true, composed: true }));
    }
  }

  _styles(color) {
    return '<style>' +
      ':host { display: block; height: 100%; --zl-color: ' + (color || ZL_LOAD_COLORS.off) + '; --zl-green: color-mix(in srgb, #9ab00f 50%, var(--primary-text-color, #212121)); }' +
      // A size container: on a narrow card (Sections view, 6 columns) its parts follow the card's width (see @container).
      'ha-card { height: 100%; box-sizing: border-box; padding: 12px; display: flex; flex-direction: column; gap: 12px; container-type: inline-size; }' +
      // A size container has no width of its own: in a shrink-to-fit parent (layout-card, button-card, an inline-block,
      // a grid's auto column) the card fell to its 24 px of padding. This invisible row of 10 breakable boxes gives the
      // card a preferred width (the full card's 400 px, the mini's 245 px) while its minimum stays one box wide, so in
      // a 1fr 1fr grid or a horizontal stack the card still shrinks to its column and never overflows it.
      '.sizer { height: 0; overflow: hidden; visibility: hidden; font-size: 0; line-height: 0; }' +
      '.sizer i { display: inline-block; width: ' + (this._compact() ? '24.5px' : '40px') + '; }' +
      '.empty { display: flex; align-items: center; gap: 10px; color: var(--secondary-text-color); }' +
      // The 8px radius is the buttons' default, so the focus ring follows the round detail button and the chips.
      'button { all: unset; box-sizing: border-box; cursor: pointer; border-radius: 8px; }' +
      'button:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }' +
      // The body starts 8px under the header (the card gap is 12px between body blocks).
      '.header { display: flex; align-items: center; gap: 10px; margin-bottom: -4px; }' +
      '.hbadge { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; flex: none;' +
        ' background: color-mix(in srgb, var(--zl-color) 16%, transparent); color: var(--zl-color); }' +
      '.hbadge ha-icon { --mdc-icon-size: 24px; }' +
      // The name and the pill share the line from a zero basis: the pill keeps its whole label and the name gives way
      // first, down to about 4 characters and its ellipsis; only past that does the pill shrink.
      '.titles { flex: 1 1 0; min-width: 5ch; font-size: 16px; display: flex; flex-direction: column; }' +
      // The name gives way first (ellipsis, 4 characters kept); the pill keeps its whole label, at most 51 % of the line.
      '.trow { display: flex; align-items: center; gap: 8px; min-width: 0; }' +
      '.trow .name { flex: 0 1 auto; min-width: 0; }' +
      ':host([hide-title]) .titles .name, :host([hide-subtitle]) .titles > .sub { display: none; }' +
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.st { display: inline-flex; align-items: center; gap: 4px; flex: none; min-width: 0; max-width: 100%; box-sizing: border-box; overflow: hidden; padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;' +
        ' white-space: nowrap; background: color-mix(in srgb, var(--zl-color) 15%, transparent);' +
        ' color: color-mix(in srgb, var(--zl-color) 50%, var(--primary-text-color, #212121)); }' +
      '.stt { min-width: 0; overflow: hidden; text-overflow: ellipsis; }' +
      // The pill right after the name only when the whole name and its whole label fit there (measured by the card, see
      // zlPlacePill); otherwise on its own line under the subtitle (one line); when even that cuts its label or leaves
      // the banner, and on a card of 200 px or less, its dot alone (label in its tooltip).
      '[data-wrap] .trow { display: contents; } [data-wrap] .titles > .sub { order: 2; }' +
      ' [data-wrap] .titles .st { order: 3; align-self: flex-start; max-width: 100%; margin-top: 2px; }' +
      '[data-dot] .stt { display: none; } [data-dot] .titles .st { flex: none; padding: 5px; }' +
      // With a subtitle the titles span two lines: the detail button stays on the title's line.
      '.header.sub2 .zoom { align-self: flex-start; margin-top: 0; }' +
      '.dot { flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--zl-color); }' +
      '.zoom { flex: none; width: 24px; height: 24px; margin: -4px -4px -4px 0; border-radius: 50%;' +
        ' display: grid; place-items: center; color: var(--secondary-text-color); }' +
      '.zoom ha-icon { --mdc-icon-size: 16px; }' +
      '.zoom:hover { background: color-mix(in srgb, var(--secondary-text-color) 16%, transparent); color: var(--primary-text-color); }' +
      '.hero, .content { display: flex; align-items: center; gap: 14px; }' +
      '.picture { width: calc(108px * var(--zl-ms, 1)); height: calc(135px * var(--zl-ms, 1)); flex-shrink: 0; display: flex; align-items: center; justify-content: center; }' +
      'ha-card.mini .picture { width: calc(82px * var(--zl-ms, 1)); height: calc(102px * var(--zl-ms, 1)); }' +
      '.picture svg { width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.18)); }' +
      '.picture .lcd { font: 700 8px/1 "Roboto Mono", ui-monospace, Menlo, Consolas, monospace; fill: #242b0e; letter-spacing: 0.2px; }' +
      '.picture .unit { font: 700 4px/1 "Roboto Mono", ui-monospace, monospace; fill: #3a4418; }' +
      '.picture .lbl { font: 700 4.6px/1 "Roboto Mono", ui-monospace, monospace; fill: #3a4418; letter-spacing: 0.6px; }' +
      '.picture .brand { font: 700 8px/1 Roboto, sans-serif; fill: #73805a; letter-spacing: 0.3px; }' +
      '.picture.tap { cursor: pointer; -webkit-tap-highlight-color: transparent; }' +
      '.picture.tap:active svg { transform: scale(0.97); }' +
      '.picture.tap:focus-visible { outline: 2px solid var(--zl-color); outline-offset: 2px; border-radius: 8px; }' +
      '.picture .led { fill: #2a330a; }' +
      '.picture .glow { opacity: 0; } .picture .glow-c { stop-color: var(--zl-color); }' +
      '.picture.live .led { fill: var(--zl-color); animation: zl-blink var(--zl-blink, 2s) ease-in-out infinite; }' +
      '.picture.live .glow { animation: zl-glow var(--zl-blink, 2s) ease-in-out infinite; }' +
      '@keyframes zl-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }' +
      '@keyframes zl-glow { 0%, 100% { opacity: 1; } 50% { opacity: 0.1; } }' +
      '@media (prefers-reduced-motion: reduce) { .picture *, .zl-scene * { animation: none !important; } .fill { transition: none; } }' +
      '.badge { width: 56px; height: 56px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center;' +
        ' background: color-mix(in srgb, var(--zl-color) 15%, transparent); color: var(--zl-color); }' +
      '.badge ha-icon { --mdc-icon-size: 32px; }' +
      '.info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }' +
      // The reading scales down with the card (cqi: % of its width) and ellipsizes rather than leave the card.
      '.big .val { display: block; font-size: 30px; font-size: clamp(22px, 13cqi, 30px); font-weight: 400; line-height: 1.1; color: var(--primary-text-color);' +
        ' white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      'ha-card.mini .big .val { font-size: 24px; font-size: clamp(16px, 14cqi, 24px); }' +
      '.chips { display: flex; flex-wrap: wrap; gap: 6px; }' +
      '.chip { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 1px 8px 1px 5px; border-radius: 12px;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--secondary-text-color); }' +
      '.chip ha-icon { --mdc-icon-size: 13px; }' +
      '.load { display: flex; flex-direction: column; gap: 4px; }' +
      '.load-l { font-size: 11px; color: var(--secondary-text-color); }' +
      '.bar { height: 6px; border-radius: 3px; background: var(--secondary-background-color, rgba(128,128,128,0.15)); overflow: hidden; }' +
      '.fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, color-mix(in srgb, var(--zl-color) 55%, transparent), var(--zl-color)); transition: width 0.6s ease; }' +
      '.line { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--secondary-text-color); min-width: 0; }' +
      '.line ha-icon { --mdc-icon-size: 14px; flex-shrink: 0; }' +
      '.line > span { min-width: 0; }' +
      '.seg { display: inline-block; max-width: 100%; vertical-align: top; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.tempo { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 6px; }' +
      '.tday { all: unset; box-sizing: border-box; cursor: pointer; display: flex; align-items: center; gap: 6px; min-width: 0; padding: 6px 10px; border-radius: 12px;' +
        ' border: 1px solid color-mix(in srgb, var(--tc) 45%, transparent); background: color-mix(in srgb, var(--tc) 8%, transparent); font-size: 12px; }' +
      '.tday:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }' +
      '.tdot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; background: var(--tc); box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 18%, transparent); }' +
      '.tdot.none { background: none; border: 1px dashed var(--secondary-text-color); box-shadow: none; box-sizing: border-box; }' +
      '.tdl { color: var(--secondary-text-color); white-space: nowrap; }' +
      '.tminis { flex-wrap: wrap; gap: 4px 10px; }' +
      '.tmini { display: inline-flex; align-items: center; gap: 5px; min-width: 0; }' +
      '.tmini .tdot { width: 8px; height: 8px; }' +
      '.tdv { margin-left: auto; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }' +
      '.tile { display: flex; flex-direction: column; gap: 2px; padding: 8px 10px; border-radius: 12px; min-width: 0;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.tl { font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.tv { font-size: 18px; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.tv small, .iv small { font-size: 11px; font-weight: 400; color: var(--secondary-text-color); }' +
      '.tc { font-size: 11px; font-weight: 500; color: var(--zl-green); }' +
      '.section { display: flex; flex-direction: column; gap: 6px; }' +
      '.section-title { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; text-transform: uppercase;' +
        ' letter-spacing: .04em; color: var(--secondary-text-color); }' +
      '.section-title ha-icon { --mdc-icon-size: 16px; }' +
      '.section-title .unit { text-transform: none; }' +
      '.section-title .aside { margin-left: auto; text-transform: none; letter-spacing: 0; font-weight: 400; font-size: 11px; }' +
      '.graph { height: 64px; border-radius: 10px; overflow: hidden; }' +
      '.spark { width: 100%; height: 100%; display: block; }' +
      '.spark-c { stop-color: var(--zl-color); } .spark-l { stroke: var(--zl-color); }' +
      // HA Linky's daily bars (yesterday darker, the open day outlined) and the open day's hourly bars.
      '.dbars { width: 100%; height: 64px; display: block; }' +
      '.dbar, .hbar { fill: color-mix(in srgb, var(--zl-color) 55%, transparent); }' +
      '.dbar { cursor: pointer; outline: none; } .dbar.last { fill: var(--zl-color); }' +
      '.dbar.on, .dbar:focus-visible { fill: var(--zl-color); stroke: var(--primary-text-color); stroke-width: 1.2px; vector-effect: non-scaling-stroke; }' +
      '.hbar.hc { fill: color-mix(in srgb, var(--info-color, #039be5) 70%, transparent); }' +
      '.haxis { display: flex; justify-content: space-between; font-size: 10px; color: var(--secondary-text-color); margin-top: 2px; }' +
      '.index { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.index ha-icon { --mdc-icon-size: 18px; color: var(--zl-green); }' +
      '.il { flex: 1; font-size: 13px; color: var(--secondary-text-color); }' +
      '.iv { font-variant-numeric: tabular-nums; font-size: 15px; font-weight: 500; color: var(--primary-text-color); }' +
      '.rows { display: flex; flex-direction: column; }' +
      '.row { display: flex; justify-content: space-between; gap: 8px; padding: 4px 10px; font-size: 12px; color: var(--secondary-text-color); }' +
      // The cost and comparison rows sit straight under their section title, flush with the card's other content.
      '.section > .row { padding: 2px 0; }' +
      '.cmp-verdict { color: var(--primary-text-color); font-weight: 500; }' +
      '.cost-est .rv { font-weight: 600; }' +
      '.cost-trend.up { color: var(--error-color, #db4437); }' +
      '.cost-trend.down { color: var(--success-color, #43a047); }' +
      '.rv { font-variant-numeric: tabular-nums; color: var(--primary-text-color); }' +
      '.phase { display: grid; grid-template-columns: 22px 1fr 60px 40px; align-items: center; gap: 8px; font-size: 12px; }' +
      '.pn { font-weight: 500; color: var(--secondary-text-color); }' +
      '.pv { text-align: right; color: var(--primary-text-color); white-space: nowrap; } .pv.dim { color: var(--secondary-text-color); }' +
      // Narrow card (6 columns of the Sections view, ~156 to 250 px): the tiles put their unit under the value and
      // let their label wrap, the meter shrinks; then the mini's meter gets smaller and the pill shows its dot only.
      // Below 300 px the header's gaps tighten (10 → 6 px), so "Moderate load" still fits whole next to the name at 245 px.
      '@container (max-width: 300px) { .header { gap: 6px; } .hero { gap: 10px; } .picture { width: calc(84px * var(--zl-ms, 1)); height: calc(105px * var(--zl-ms, 1)); } .tile { padding: 8px; }' +
        ' .tl { white-space: normal; overflow-wrap: break-word; } .tv small { display: block; } }' +
      '@container (max-width: 200px) { ha-card.mini .picture { width: calc(56px * var(--zl-ms, 1)); height: calc(70px * var(--zl-ms, 1)); } ha-card.mini .content { gap: 8px; } }' +
      // At the mini's narrowest (156 px) the dot-only pill keeps its 16 px (the name its 4 characters): it never gets squashed.
      // A card of 200 px or less (176 px of content): the pill's dot alone (label in its tooltip).
      '@container (max-width: 176px) { .titles { min-width: 4ch; } .stt { display: none; } .st { flex: none; padding: 5px; } }' +
      // ── Illustrated header: a 90 px banner edge to edge at the top of the card (the card's 12 px padding undone),
      // the wall and the meter's panel at the right, a 10 px tiled floor strip along the bottom. meter_size scales the
      // picture from its bottom right corner; above 100 the banner grows with it.
      '.banner { position: relative; overflow: hidden; flex: none; margin: -12px -12px 0; height: calc(10px + 80px * max(1, var(--zl-ms, 1)));' +
        ' border-radius: var(--ha-card-border-radius, 12px) var(--ha-card-border-radius, 12px) 0 0; background: #f1f2f4; color: #0d2a45; }' +
      '.banner.night { background: #24272e; color: #fff; }' +
      '.zl-scene { position: absolute; right: 0; bottom: 10px; width: calc(200px * var(--zl-ms, 1) * var(--zl-bk, 1)); height: calc(80px * var(--zl-ms, 1) * var(--zl-bk, 1)); }' +
      '.banner .ground { position: absolute; left: 0; right: 0; bottom: 0; height: 10px;' +
        ' background: repeating-linear-gradient(90deg, #d9dfe3 0 18px, #c6cdd2 18px 19px); box-shadow: inset 0 2px 0 #b8c0c6; }' +
      '.banner.night .ground { background: repeating-linear-gradient(90deg, #3a4250 0 18px, #2e3542 18px 19px); box-shadow: inset 0 2px 0 #4a5262; }' +
      // The meter (the card's own drawing) over the panel, its body standing on the strip, 6 px clear of the banner's top.
      'ha-card .banner .picture { position: absolute; right: calc(7.4px * var(--zl-ms, 1) * var(--zl-bk, 1)); bottom: calc(10px - 2.16px * var(--zl-ms, 1) * var(--zl-bk, 1)); width: calc(59.2px * var(--zl-ms, 1) * var(--zl-bk, 1)); height: calc(74px * var(--zl-ms, 1) * var(--zl-bk, 1)); }' +
      '.banner .picture svg { filter: drop-shadow(0 1px 2px rgba(0,0,0,0.22)); }' +
      '.zl-gtl { fill: #e3e7ec; stroke: #c9ced6; } .zl-gtl-in { fill: #f4f6f8; }' +
      '.night .zl-gtl { fill: #2e3442; stroke: #3a4050; } .night .zl-gtl-in { fill: #262b36; }' +
      '.zl-wire { fill: none; stroke: #8a95a3; stroke-width: 1.2; stroke-linecap: round; stroke-linejoin: round; } .night .zl-wire { stroke: #6b7684; }' +
      '.zl-din { fill: #fff; stroke: #c3cad3; } .zl-win { fill: #e9edf2; } .night .zl-din { fill: #3a4050; stroke: #4a5262; } .night .zl-win { fill: #2a2f3a; }' +
      '.zl-moon { fill: #5c6bc0; } .night .zl-moon { fill: #9fa8ff; filter: drop-shadow(0 0 1.4px #9fa8ff); }' +
      '.zl-sun { fill: #f5b400; } .zl-rays { stroke: #f5b400; stroke-width: 1; stroke-linecap: round; }' +
      '.zl-ind { fill: #43c463; } .zl-hp .zl-ind { fill: #f5b400; }' +
      // The cable to the home and the current along it: dashes moving to the bulb (consuming), back to the meter from
      // the solar panel (producing), in the status color, faster as the load rises (the LED's period).
      '.zl-cable { fill: none; stroke: #a7b0bb; stroke-width: 2.4; stroke-linecap: round; } .night .zl-cable { stroke: #4f5966; }' +
      '.zl-flow { fill: none; stroke: var(--zl-color); stroke-width: 1.6; stroke-linecap: round; stroke-dasharray: 1.4 5; animation: zl-flow var(--zl-blink, 1.6s) linear infinite; }' +
      '.zl-prod .zl-flow { animation-direction: reverse; animation-duration: 1.6s; }' +
      '@keyframes zl-flow { to { stroke-dashoffset: -12.8; } }' +
      '.zl-glass { fill: #ffe082; stroke: #e0b93a; stroke-width: .6; } .zl-base { fill: #b0b7c0; } .zl-socket { fill: #fff; stroke: #c3cad3; }' +
      '.night .zl-glass { fill: #ffe9a6; filter: drop-shadow(0 0 2px #ffd65a); } .night .zl-socket { fill: #3a4050; stroke: #4a5262; }' +
      '.zl-halo { animation: zl-glow 3s ease-in-out infinite; } .banner:not(.night) .zl-halo { opacity: .55; }' +
      '.zl-pv { fill: #2b4f8a; stroke: #9fb3cc; stroke-width: .6; } .zl-pvl { stroke: #7f9bc4; stroke-width: .4; fill: none; }' +
      '.night .zl-pv { fill: #22385e; } .night .zl-panel .zl-sun { fill: #f4f1dc; }' +
      // The header on the wall, at the left of the picture (the picture starts 130 px from the right at meter_size 100).
      '.banner .header { position: absolute; z-index: 1; left: 12px; top: 0; bottom: 10px; right: calc(130px * var(--zl-ms, 1) * var(--zl-bk, 1) + 4px); margin: 0; min-width: 0; }' +
      // Without the meter (full card, unfolded mini card): a 90 px banner, the bulb or the panel and the contactor at
      // the right, the text up to them.
      '.banner.bare { height: 90px; } .banner.bare .zl-scene { width: calc(200px * var(--zl-bk, 1)); height: calc(80px * var(--zl-bk, 1)); }' +
      '.banner.bare .header { right: calc(102px * var(--zl-bk, 1) + 4px); } .banner.bare.zbtn .header { right: calc(102px * var(--zl-bk, 1) + 34px); }' +
      // The meter big in the body: about 40 % of the card (120 to 200 px wide), its screen readable; on a narrow card
      // it stands above the readings.
      // Beside it, its whole height used: the reading, its chips and the load bar, then the consumption tiles; on a
      // narrow card the meter (about 110 px) stays beside the reading and the tiles take the full width below.
      '.hero.big { display: grid; grid-template-columns: auto minmax(0, 1fr); grid-template-areas: "pic info" "pic tiles"; column-gap: 14px; row-gap: 10px; align-items: start; }' +
      '.hero.big > .picture { grid-area: pic; align-self: center; width: calc(clamp(110px, 36cqw, 165px) * var(--zl-ms, 1)); max-width: 100%; height: auto; aspect-ratio: 108 / 135; }' +
      '.hero.big > .info { grid-area: info; gap: 6px; align-self: start; } .hero.big > .tiles { grid-area: tiles; align-self: end; }' +
      '.hero.big > .tiles .tile { padding: 6px 8px; }' +
      '@container (max-width: 330px) { .hero.big { grid-template-areas: "pic info" "tiles tiles"; column-gap: 10px; } .hero.big > .picture { width: calc(min(110px, 38cqw) * var(--zl-ms, 1)); } .hero.big > .info { align-self: center; } }' +

      '.banner .hbadge { background: rgba(255,255,255,.62); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--zl-color) 22%, transparent); }' +
      '.banner.night .hbadge { background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }' +
      '.banner .name { color: inherit; } .banner .sub { font-size: 13px; color: #3b5b78; } .banner.night .sub { color: rgba(255,255,255,.78); }' +
      '.banner .st { background: color-mix(in srgb, var(--zl-color) 18%, rgba(255,255,255,.78)); color: color-mix(in srgb, var(--zl-color) 45%, #0d2a45); }' +
      '.banner.night .st { background: color-mix(in srgb, var(--zl-color) 30%, rgba(8,18,38,.55)); color: color-mix(in srgb, var(--zl-color) 35%, #ffffff); }' +
      // The detail button in the banner's top right corner, 24 px, frosted (day) or glassy (night); the meter's panel
      // and the header step 30 px aside from it.
      '.banner > .zoom { position: absolute; z-index: 2; top: 5px; right: 5px; width: 24px; height: 24px; margin: 0; border-radius: 50%; display: grid; place-items: center;' +
        ' color: #33506b; background: rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(255,255,255,.7); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }' +
      '.banner > .zoom:hover { background: rgba(255,255,255,.75); color: #33506b; }' +
      '.banner.night > .zoom { color: #fff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }' +
      '.banner.night > .zoom:hover { background: rgba(255,255,255,.22); color: #fff; }' +
      '.banner.zbtn .zl-scene { right: 30px; } ha-card .banner.zbtn .picture { right: calc(30px + 7.4px * var(--zl-ms, 1) * var(--zl-bk, 1)); }' +
      '.banner.zbtn .header { right: calc(130px * var(--zl-ms, 1) * var(--zl-bk, 1) + 34px); }' +
      // Narrow card: the wall accessories go, the meter and its panel stay; narrower still, the icon gives the title room.
      '@container (max-width: 300px) { .zl-acc { display: none; } .banner .header { right: calc(80px * var(--zl-ms, 1) * var(--zl-bk, 1) + 4px); } .banner.zbtn .header { right: calc(80px * var(--zl-ms, 1) * var(--zl-bk, 1) + 34px); } }' +
      // Narrower cards: the meter and its panel are drawn smaller (80 %, then 65 %), so that the title stays whole and
      // the status pill keeps its label beside it.
      '@container (max-width: 340px) { .banner { --zl-bk: .8; } }' +
      '@container (max-width: 270px) { .banner { --zl-bk: .65; } }' +
      // Narrowest, without the meter: the board alone (the bulb or the panel gives the text its room).
      '@container (max-width: 270px) { .banner.bare .zl-load { display: none; } .banner.bare .header { right: calc(64px * var(--zl-bk, 1) + 4px); } .banner.bare.zbtn .header { right: calc(64px * var(--zl-bk, 1) + 34px); } }' +
      '@container (max-width: 210px) { .banner .hbadge { display: none; } .banner .header { left: 10px; } }' +
    '</style><div class="sizer" aria-hidden="true">' + '<i></i> '.repeat(10) + '</div>';
  }
}
