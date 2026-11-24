// ── Formatting ───────────────────────────────────────────────────────────────
export function zlNum(lang, v, digits) {
  try {
    return new Intl.NumberFormat(lang, { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(v);
  } catch (_e) {
    return String(Math.round(v * 10 ** digits) / 10 ** digits);
  }
}

// narrowSymbol: Romanian, Hungarian and Ukrainian would otherwise print "2,38 EUR", too wide for the cost tile.
export function zlMoney(lang, v, currency) {
  try {
    return new Intl.NumberFormat(lang, {
      style: 'currency',
      currency: currency || 'EUR',
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: 2,
    }).format(v);
  } catch (_e) {
    return `${v.toFixed(2)} ${currency || 'EUR'}`;
  }
}

// Watts (or VA) with a kilo prefix from 10 000 on, like the meter's own screen.
export function zlPower(lang, v, unit) {
  if (Math.abs(v) >= 10000) return `${zlNum(lang, v / 1000, 1)} k${unit}`;
  return `${zlNum(lang, v, 0)} ${unit}`;
}

// A current: whole amperes as the meter gives them (IRMS, IINST), one decimal only when the source has some.
export function zlAmps(lang, a) {
  return zlNum(lang, a, Number.isInteger(a) ? 0 : 1);
}

// A power reading in its base unit (W or VA), whatever unit the sensor reports.
export function zlBase(state) {
  var v = Number(state?.state);
  if (!Number.isFinite(v)) return null;
  var u = String(state.attributes.unit_of_measurement || '');
  return /^k/.test(u) ? v * 1000 : v;
}

// Energy in kWh, whatever unit the sensor reports.
export function zlKwh(state) {
  var v = Number(state?.state);
  if (!Number.isFinite(v)) return null;
  var u = String(state.attributes.unit_of_measurement || 'kWh');
  if (u === 'Wh') return v / 1000;
  if (u === 'MWh') return v * 1000;
  return v;
}

export var ZL_LOAD_COLORS = {
  low: 'var(--success-color, #43a047)',
  mid: 'var(--warning-color, #ffa600)',
  high: 'var(--error-color, #db4437)',
  off: 'var(--disabled-text-color, #9e9e9e)',
};
// Producing (the injection index rising, or a negative active power): the header's icon and the flow turn green.
export var ZL_PRODUCE_COLOR = 'var(--success-color, #43a047)';
// How long after the injection index last rose the meter still counts as producing.
export var ZL_PRODUCE_HOLD = 10 * 60000;

// Load level from the share of the subscribed power in use: `load_warning` / `load_critical` (%, 50 / 80 by default).
export var ZL_LOAD_WARNING = 50;
export var ZL_LOAD_CRITICAL = 80;
export function zlLoadLevel(pct, warning = ZL_LOAD_WARNING, critical = ZL_LOAD_CRITICAL) {
  if (pct == null) return 'low';
  if (pct >= critical) return 'high';
  if (pct >= warning) return 'mid';
  return 'low';
}

// A threshold option as a number, or its default when it is missing or not a number.
export function zlPct(v, def) {
  var n = v == null || v === '' ? NaN : Number(v);
  return Number.isFinite(n) ? n : def;
}

// Area chart of a series [{t, v}] (5-minute means), drawn in a 300×64 box on a real time axis: x runs over the
// last 24 h up to `now`, and the line breaks where the recorder has no point for more than two periods (the meter
// or Home Assistant was off), instead of joining the points on both sides of the gap.
export var ZL_SPARK_SPAN = 24 * 3600000;
export var ZL_SPARK_GAP = 2 * 5 * 60000;
export function zlSpark(points, now = Date.now()) {
  if (!points || points.length < 2) return '';
  var W = 300, H = 64, t0 = now - ZL_SPARK_SPAN;
  var max = Math.max(...points.map((p) => p.v), 1);
  var x = (t) => Math.max(0, Math.min(W, ((t - t0) / ZL_SPARK_SPAN) * W)).toFixed(1);
  var y = (v) => (H - 3 - (v / max) * (H - 8)).toFixed(1);
  var segs = [];
  points.forEach((p, i) => {
    if (!i || p.t - points[i - 1].t > ZL_SPARK_GAP) segs.push([]);
    segs[segs.length - 1].push(p);
  });
  var line = '', area = '';
  segs.forEach((seg) => {
    var d = seg.map((p, i) => `${i ? 'L' : 'M'}${x(p.t)} ${y(p.v)}`).join('');
    line += d;
    // A lone point has no width: its area would be a vertical line, only the line's cap shows it.
    if (seg.length > 1) area += `${d}L${x(seg[seg.length - 1].t)} ${H}L${x(seg[0].t)} ${H}Z`;
  });
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">` +
    '<defs><linearGradient id="zl-sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="spark-c" stop-opacity=".35"/><stop offset="1" class="spark-c" stop-opacity="0"/></linearGradient></defs>' +
    (area ? `<path d="${area}" fill="url(#zl-sg)"/>` : '') +
    `<path d="${line}" fill="none" class="spark-l" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}

export var ZL_STATS_REFRESH = 5 * 60000;
// After a failed recorder call the tiles show "—": retry on the next update past this delay
// instead of sitting on the failure for the whole refresh window.
export var ZL_STATS_RETRY = 30000;

// Contract comparison: the last 12 months of hourly consumption, priced as Base and as Off-peak / Peak.
export var ZL_COMPARE_DAYS = 365;
export var ZL_COMPARE_SAME = 0.02;
export var ZL_COMPARE_REFRESH = 6 * 3600000;

// Off-peak ranges from "22:30-06:30, 12:00-14:00" as [start, end) in minutes of the day (end may be past midnight).
export function zlHcRanges(text) {
  return String(text || '').split(/[,;]/).map((part) => {
    var m = part.trim().match(/^(\d{1,2})[:h](\d{2})?\s*-\s*(\d{1,2})[:h](\d{2})?$/i);
    if (!m) return null;
    var a = Number(m[1]) * 60 + Number(m[2] || 0), b = Number(m[3]) * 60 + Number(m[4] || 0);
    return a < 1440 && b <= 1440 && a !== b ? [a, b] : null;
  }).filter(Boolean);
}

// Whether a minute of the day is in one of the ranges (a range over midnight, 22:30-06:30, wraps).
export function zlInRanges(min, ranges) {
  return ranges.some(([a, b]) => (a < b ? min >= a && min < b : min >= a || min < b));
}

// Minute of the day (0-1439) in the time zone `tz` (the meter's: Home Assistant's), for a timestamp in ms.
export function zlMinuteOfDay(fmt, ms) {
  var parts = fmt.formatToParts(new Date(ms));
  var h = Number(parts.find((p) => p.type === 'hour')?.value || 0) % 24;
  return h * 60 + Number(parts.find((p) => p.type === 'minute')?.value || 0);
}

// Hours and minutes in the time zone `tz` (Home Assistant's), for zlMinuteOfDay.
export function zlTimeFmt(tz) {
  try {
    return new Intl.DateTimeFormat('en-GB', { timeZone: tz || undefined, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  } catch (_e) {
    return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  }
}

// A day as "Sat 21 Nov" in the UI language, in Home Assistant's time zone.
export function zlDayLabel(lang, ms, tz) {
  var o = { weekday: 'short', day: 'numeric', month: 'short' };
  try {
    return new Intl.DateTimeFormat(lang, { ...o, timeZone: tz || undefined }).format(new Date(ms));
  } catch (_e) {
    return new Intl.DateTimeFormat(lang, o).format(new Date(ms));
  }
}

// Hourly kWh ({ start, kwh }) priced both ways. An hour counts as off-peak when its middle is (hourly statistics
// can't split 22:30). Subscriptions are monthly, counted over the days the statistics cover.
export function zlCompare(hours, c, tz) {
  var ranges = zlHcRanges(c.hc_hours);
  if (!hours.length || !ranges.length) return null;
  var fmt = zlTimeFmt(tz);
  var total = 0, hc = 0;
  hours.forEach((h) => {
    total += h.kwh;
    if (zlInRanges(zlMinuteOfDay(fmt, h.start + 1800000), ranges)) hc += h.kwh;
  });
  var days = Math.max(1, Math.round((hours[hours.length - 1].start + 3600000 - hours[0].start) / 86400000));
  var months = days / 30.44;
  var base = total * Number(c.compare_base) + months * (Number(c.sub_base) || 0);
  var hchp = hc * Number(c.compare_hc) + (total - hc) * Number(c.compare_hp) + months * (Number(c.sub_hchp) || 0);
  return { total: total, hc: hc, days: days, base: base, hchp: hchp };
}

// How far into its month `now` is, in Home Assistant's time zone: { elapsed, days } in days (elapsed counts the
// hours of the current day too), for the month-end estimate.
export function zlMonthProgress(now, tz) {
  var fmt;
  try {
    fmt = new Intl.DateTimeFormat('en-GB', { timeZone: tz || undefined, year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  } catch (_e) {
    fmt = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  }
  var p = {};
  fmt.formatToParts(new Date(now)).forEach((x) => { p[x.type] = Number(x.value); });
  var days = new Date(Date.UTC(p.year, p.month, 0)).getUTCDate();
  return { elapsed: p.day - 1 + (p.hour * 60 + p.minute) / 1440, days: days };
}

// HA Linky (bokub/ha-linky): the app imports the meter's data from Enedis as long-term statistics, without any
// entity — `linky:<PRM>` (Wh, hourly, the day after), and `linky:<PRM>_cost` (€) when it prices them. `linky_prm`
// (the 14-digit PRM, or the whole statistic id) points the card at them; null when it is not set.
export function zlLinkyId(c) {
  var prm = String(c?.linky_prm ?? '').replace(/\s/g, '').replace(/^linky:/, '');
  return prm ? `linky:${prm}` : null;
}

// Statistics rows (`change` per period) as [{ start, kwh }], the unusable ones dropped.
export function zlRows(rows) {
  return (rows || []).map((p) => ({ start: typeof p.start === 'number' ? p.start : Date.parse(p.start), kwh: Number(p.change) }))
    .filter((p) => Number.isFinite(p.start) && Number.isFinite(p.kwh) && p.kwh >= 0);
}

// The days of the HA Linky bars: 30, yesterday last (the data comes the day after).
export var ZL_LINKY_DAYS = 30;
