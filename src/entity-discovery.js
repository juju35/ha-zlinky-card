// ── Entity discovery ─────────────────────────────────────────────────────────
// Roles the card looks for on the device. Each matcher tries the entity registry translation_key first,
// then the entity_id suffix (ZHA French / English slugs and Zigbee2MQTT TIC labels), then the device class.
// Zigbee2MQTT per-phase labels end in a letter + phase digit (`irms2`, `sinsts3`): a bare `_2` / `_3` is
// Home Assistant's de-duplication suffix (re-paired device, second ZLinky), not a phase.
export var ZL_PHASE = /(phase_[bc23]|_ph_[bc]|_l[23]$|[a-z][23]$)/;
export var ZL_TIER = /(partie|tranche|tier|easf|index)_?0?([1-6])|index_(eco|sobriete|bonus)_/;
export var ZL_ROLES = {
  energy: { keys: ['summation_delivered'], id: /(_consommation|_summation_delivered|_east|_base|_energy|_energie|_energie_totale_soutiree)$/,
    test: (id, s) => s.attributes.device_class === 'energy' && !ZL_TIER.test(id) && !/(received|recu|injection|eait)/.test(id) },
  injection: { keys: ['summation_received'], id: /(_summation_received|_cumul_recu|_eait|_injection)$/ },
  power: { keys: ['active_power', 'power'], id: /(_puissance|_active_power|_power|_ccasn)$/,
    test: (id, s) => s.attributes.device_class === 'power' && !zlIsPhase(id) && !/(total|max)/.test(id) },
  apparent_power: { keys: ['apparent_power'], id: /(_puissance_apparente|_apparent_power|_sinsts|_papp)$/,
    test: (id, s) => s.attributes.device_class === 'apparent_power' && !zlIsPhase(id) },
  current: { keys: ['rms_current', 'current'], id: /(_courant|_rms_current|_current|_irms1?|_iinst1?)$/,
    test: (id, s) => s.attributes.device_class === 'current' && !zlIsPhase(id) && !/max/.test(id) },
  voltage: { keys: ['rms_voltage', 'voltage'], id: /(_tension|_rms_voltage|_voltage|_urms1?)$/,
    test: (id, s) => s.attributes.device_class === 'voltage' && !zlIsPhase(id) },
  current_b: { keys: ['rms_current_ph_b'], id: /(courant_phase_b|rms_current_ph_b|_irms2|_iinst2)$/ },
  current_c: { keys: ['rms_current_ph_c'], id: /(courant_phase_c|rms_current_ph_c|_irms3|_iinst3)$/ },
  voltage_b: { keys: ['rms_voltage_ph_b'], id: /(tension_phase_b|rms_voltage_ph_b|_urms2)$/ },
  voltage_c: { keys: ['rms_voltage_ph_c'], id: /(tension_phase_c|rms_voltage_ph_c|_urms3)$/ },
  // Apparent power per phase (SINSTS1/2/3 of the standard TIC, 1 VA resolution). ZHA only gives phases B and C
  // (phase A shares `apparent_power` with the single-phase total), so ZHA phase rows stay in amperes.
  apparent_power_a: { keys: [], id: /_sinsts1$/ },
  apparent_power_b: { keys: ['apparent_power_ph_b'], id: /(puissance_apparente_phase_b|apparent_power_ph_b|_sinsts2)$/ },
  apparent_power_c: { keys: ['apparent_power_ph_c'], id: /(puissance_apparente_phase_c|apparent_power_ph_c|_sinsts3)$/ },
  // NGTF (the calendar's name, e.g. "pointe mobile") is not the tariff period: only LTARF / PTEC.
  tariff: { keys: ['current_tarif', 'active_register_tier_delivered'], id: /(_ptec|_ltarf|_current_tarif|_periode_tarifaire(_en_cours)?|_tarif_en_cours)$/ },
  // Tempo: tomorrow's color (DEMAIN of the historic TIC). Today's color comes from the tariff period, or from
  // `entities.tempo` (any sensor whose state names a color, e.g. an RTE Tempo integration).
  tomorrow: { keys: ['tomorrow_color', 'demain'], id: /(_demain|_tomorrow_colou?r|_couleur_demain|_couleur_lendemain)$/ },
  tempo: { keys: [] },
};
// ESPHome `teleinfo` indexes named after the Zen Flex periods (#47): Éco, Sobriété then Bonus days, off-peak then
// peak, in the order of EASF01 to EASF06.
export var ZL_ZEN_INDEX = ['eco_heures_creuses', 'eco_heures_pleines', 'sobriete_heures_creuses', 'sobriete_heures_pleines',
  'bonus_heures_creuses', 'bonus_heures_pleines'];
for (var zlN = 1; zlN <= 6; zlN++) {
  ZL_ROLES[`tier${zlN}`] = { keys: [`tier${zlN}_summation_delivered`],
    id: new RegExp(`(consommation_(partie|tranche)_${zlN}|tier${zlN}_summation_delivered|_easf0${zlN}|_index_${zlN}|_index_${ZL_ZEN_INDEX[zlN - 1]})$`) };
}
export var ZL_TIERS = [1, 2, 3, 4, 5, 6].map((n) => `tier${n}`);

// An entity_id without Home Assistant's de-duplication suffix (`sensor.zlinky_sinsts_2` -> `sensor.zlinky_sinsts`).
// Only used as a fallback: `_index_1` legitimately ends in `_1`.
export function zlBaseId(id) {
  return id.replace(/_\d+$/, '');
}

export function zlIsPhase(id) {
  return ZL_PHASE.test(id) || ZL_PHASE.test(zlBaseId(id));
}
export var ZL_OVERRIDABLE = ['energy', 'power', 'apparent_power', 'current', 'voltage', 'current_b', 'current_c', 'voltage_b', 'voltage_c',
  'apparent_power_a', 'apparent_power_b', 'apparent_power_c',
  'injection', 'tariff', 'tempo', 'tomorrow'].concat(ZL_TIERS);

// Tempo day color named by a tariff period or a color text: "HPJB", "HC JR", "HP BLEU", "BLAN", "Rouge", "white"…
// null for anything else (Base, off-peak / peak, "----" before tomorrow's color is announced).
export var ZL_TEMPO_COLORS = { blue: '#1e88e5', white: '#b0bec5', red: '#e53935' };
export var ZL_ZEN_COLORS = { eco: '#43a047', sobriety: '#e53935', bonus: '#00897b' };
export function zlTempo(text) {
  var t = String(text || '').toUpperCase();
  if (/BLEU|BLUE/.test(t)) return 'blue';
  if (/BLANC|BLAN\b|WHITE/.test(t)) return 'white';
  if (/ROUGE|ROUG\b|\bRED\b/.test(t)) return 'red';
  var m = /\bH[CP]\s*J([BWR])\b/.exec(t);
  return m ? { B: 'blue', W: 'white', R: 'red' }[m[1]] : null;
}

// EDF Zen Flex day type ('eco', 'sobriety' or 'bonus') named by a tariff period or a day-type sensor, or null.
// LTARF reads "HC Jnormal" / "HP Jnormal" on an Éco day; the meter's label on a Sobriété day is not published,
// so any other "HC J…" / "HP J…" that names no Tempo color counts as Sobriété (#47). Sensors: edf-zen-flex
// (eco, sobriete, bonus), MyElectricalData (ECO, SOBRIETE, BONUS), EDF's own codes (RAS, ZENF_PM, ZENF_BONIF).
export function zlZenDay(text) {
  var t = String(text || '').trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/SOBRI|ZENF_PM/.test(t)) return 'sobriety';
  if (/BONIF|BONUS/.test(t)) return 'bonus';
  if (/^(ECO|RAS)$|J\s*NORMAL/.test(t)) return 'eco';
  var m = /\bH[CP]\s*J\s*([A-Z]+)/.exec(t);
  return m && !zlTempo(t) && !/^OURS?$/.test(m[1]) ? 'sobriety' : null;
}

// Tier (1 to 6, the index order of the TIC) named by a tariff period, or null. A configured tier name wins;
// then a tier number (ZHA), Tempo (HCJB, HPJB, HCJW, HPJW, HCJR, HPJR, "HP BLEU"…), off-peak / peak (HC, HP),
// EJP (HN normal, PM peak).
export function zlTierOf(text, names) {
  var u = String(text || '').trim().toUpperCase();
  if (!u) return null;
  var byName = (Array.isArray(names) ? names : []).findIndex((n) => n && String(n).trim().toUpperCase() === u);
  if (byName >= 0) return byName + 1;
  if (/^[1-6]$/.test(u)) return Number(u);
  var hc = /^HC|\bHC\b|CREUSE|OFF.?PEAK/.test(u);
  var hp = !hc && /^HP|\bHP\b|PLEINE|PEAK/.test(u);
  var color = zlTempo(u);
  if (color) return hc || hp ? { blue: 1, white: 3, red: 5 }[color] + (hp ? 1 : 0) : null;
  // Zen Flex: Éco days on EASF01 / EASF02, Sobriété days on EASF03 / EASF04, Bonus days on EASF05 / EASF06 (#47).
  var zen = hc || hp ? zlZenDay(u) : null;
  if (zen) return { eco: 1, sobriety: 3, bonus: 5 }[zen] + (hp ? 1 : 0);
  if (hc || /^HN|NORMAL/.test(u)) return 1;
  if (hp || /^PM|POINTE/.test(u)) return 2;
  return null;
}

// The price of the tier at `i` (0-based) in a list of prices (null where unknown): beyond the end of the list
// the last one, an unknown price the closest one before it, else the first known one.
export function zlPriceAt(prices, i) {
  for (var j = Math.min(i, prices.length - 1); j >= 0; j--) if (prices[j] != null) return prices[j];
  var first = prices.find((p) => p != null);
  return first == null ? null : first;
}

// Tarif EDF (delphiki/hass-tarif-edf): its price sensors per contract, in the meter's index order (the same order
// as `price`: Tempo HCJB, HPJB, HCJW, HPJW, HCJR, HPJR; off-peak then peak; Base), its subscribed power and its
// Tempo colors. Matched on the object id, with HA's "_2" suffix for a second entry allowed.
export var ZL_EDF_CONTRACTS = [
  ['bleu_tempo_heures_creuses', 'bleu_tempo_heures_pleines', 'blanc_tempo_heures_creuses', 'blanc_tempo_heures_pleines',
    'rouge_tempo_heures_creuses', 'rouge_tempo_heures_pleines'],
  ['heures_creuses', 'heures_pleines'],
  ['base'],
];
export var zlEdfCache = new WeakMap();
// { price: [entity ids] | null, power, today, tomorrow } from the Tarif EDF entities, or null when there are none.
// With the registry's `platform`, only that integration's sensors count; without it, the sensor ids alone.
export function zlTarifEdf(hass) {
  var reg = hass.entities || {};
  var key = Object.keys(hass.states || {}).length;
  var hit = zlEdfCache.get(reg);
  if (hit && hit.key === key) return hit.v;
  var ids = Object.keys(hass.states || {}).filter((id) => id.indexOf('sensor.') === 0);
  var mine = ids.filter((id) => reg[id]?.platform === 'tarif_edf');
  if (mine.length) ids = mine;
  var find = (re) => ids.find((id) => re.test(id)) || null;
  var price = null;
  ZL_EDF_CONTRACTS.some((names) => {
    var list = names.map((n) => find(new RegExp(`^sensor\\.tarif_${n}_ttc(_\\d+)?$`)));
    if (list.every((x) => x)) price = list;
    return !!price;
  });
  var v = {
    price: price,
    power: find(/^sensor\.puissance_souscrite_\w*kva(_\d+)?$/),
    today: find(/^sensor\.tarif_tempo_couleur_aujourd_hui(_\d+)?$/),
    tomorrow: find(/^sensor\.tarif_tempo_couleur_demain(_\d+)?$/),
  };
  if (!price && !v.power && !v.today) v = null;
  zlEdfCache.set(reg, { key: key, v: v });
  return v;
}

// Registry entries grouped by device, built once per `hass.entities` object (it only changes with the registry).
export var zlRegistryIndex = new WeakMap();
export function zlRegistryByDevice(reg) {
  var index = zlRegistryIndex.get(reg);
  if (!index) {
    index = new Map();
    Object.values(reg).forEach((e) => {
      if (!e.device_id || e.hidden) return;
      if (!index.has(e.device_id)) index.set(e.device_id, []);
      index.get(e.device_id).push(e);
    });
    zlRegistryIndex.set(reg, index);
  }
  return index;
}

export function zlDeviceEntities(hass, deviceId) {
  if (!hass?.entities || !deviceId) return [];
  return (zlRegistryByDevice(hass.entities).get(deviceId) || [])
    .filter((e) => e.entity_id.indexOf('sensor.') === 0 && hass.states[e.entity_id]);
}

export function zlFindRole(hass, list, role) {
  var m = ZL_ROLES[role];
  var hit = list.find((e) => m.keys.indexOf(e.translation_key) >= 0);
  if (!hit && m.id) hit = list.find((e) => m.id.test(e.entity_id)) || list.find((e) => m.id.test(zlBaseId(e.entity_id)));
  if (!hit && m.test) hit = list.find((e) => m.test(e.entity_id, hass.states[e.entity_id]));
  return hit ? hit.entity_id : undefined;
}

export function zlIsZlinky(dev) {
  return !!dev && /zlinky/i.test(`${dev.model || ''} ${dev.model_id || ''} ${dev.name || ''}`);
}

// Memoized per `hass.devices` object (only replaced on device registry updates): without a `device_id`
// the card looks the ZLinky up on every state update.
export var zlDeviceLookup = new WeakMap();
export function zlFindDevice(hass) {
  if (!hass?.devices) return undefined;
  if (!zlDeviceLookup.has(hass.devices)) {
    zlDeviceLookup.set(hass.devices, Object.keys(hass.devices).find((id) => zlIsZlinky(hass.devices[id])));
  }
  return zlDeviceLookup.get(hass.devices);
}
