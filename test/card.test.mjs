import assert from "node:assert/strict";
import { test } from "node:test";
import { loadCard } from "./load.mjs";

const { ZlinkyCard, ZlinkyMiniCard, zlFindDevice, zlSpark, zlMorph, ZlI18n, zlLang, zlNum, zlMoney, customElements } = loadCard("zlinky-card.js", [
  "ZlinkyCard",
  "ZlinkyMiniCard",
  "zlFindDevice",
  "zlSpark",
  "zlMorph",
  "ZlI18n",
  "zlLang",
  "zlNum",
  "zlMoney",
]);

const st = (state, attributes = {}) => ({ state, attributes });

// The entities ZHA creates for a ZLinky_TIC (single-phase, Base), with French entity IDs.
function zhaHass({ extra = {}, callWS } = {}) {
  const p = "sensor.lixee_zlinky_tic_";
  const states = {
    [`${p}consommation`]: st("25155.049", { device_class: "energy", unit_of_measurement: "kWh" }),
    [`${p}consommation_partie_1`]: st("25155.049", { device_class: "energy", unit_of_measurement: "kWh" }),
    [`${p}consommation_partie_2`]: st("0.0", { device_class: "energy", unit_of_measurement: "kWh" }),
    [`${p}summation_received`]: st("0.0", { device_class: "energy", unit_of_measurement: "kWh" }),
    [`${p}puissance`]: st("314.0", { device_class: "power", unit_of_measurement: "W" }),
    [`${p}puissance_phase_b`]: st("1706.0", { device_class: "power", unit_of_measurement: "W" }),
    [`${p}puissance_totale`]: st("4760.0", { device_class: "power", unit_of_measurement: "W" }),
    [`${p}puissance_apparente`]: st("440.0", { device_class: "apparent_power", unit_of_measurement: "VA" }),
    [`${p}courant`]: st("2.0", { device_class: "current", unit_of_measurement: "A" }),
    [`${p}courant_phase_b`]: st("0.0", { device_class: "current", unit_of_measurement: "A" }),
    [`${p}tension`]: st("239.0", { device_class: "voltage", unit_of_measurement: "V" }),
    [`${p}tension_phase_b`]: st("0.0", { device_class: "voltage", unit_of_measurement: "V" }),
    [`${p}tension_phase_c`]: st("0.0", { device_class: "voltage", unit_of_measurement: "V" }),
    "sensor.other_power": st("12", { device_class: "power", unit_of_measurement: "W" }),
    ...extra,
  };
  const entities = {};
  for (const id of Object.keys(states)) entities[id] = { entity_id: id, device_id: id.startsWith(p) ? "z1" : "o1" };
  return {
    language: "fr",
    states,
    entities,
    devices: { o1: { name: "Plug", model: "Smart plug" }, z1: { name: "LiXee ZLinky_TIC", manufacturer: "LiXee", model: "ZLinky_TIC" } },
    callWS: callWS || (() => Promise.resolve({})),
  };
}

function make(Card, hass, config = {}) {
  const card = new Card();
  card.setConfig(config);
  card.hass = hass;
  return card;
}

test("finds the ZLinky device and its entities (ZHA, French IDs)", () => {
  const hass = zhaHass();
  assert.equal(zlFindDevice(hass), "z1");
  assert.deepEqual({ ...ZlinkyCard.getStubConfig(hass) }, { device_id: "z1" });
  const card = make(ZlinkyCard, hass);
  const ent = card._resolve().ent;
  const p = "sensor.lixee_zlinky_tic_";
  assert.equal(ent.energy, `${p}consommation`);
  assert.equal(ent.power, `${p}puissance`);
  assert.equal(ent.apparent_power, `${p}puissance_apparente`);
  assert.equal(ent.current, `${p}courant`);
  assert.equal(ent.voltage, `${p}tension`);
  assert.equal(ent.current_b, `${p}courant_phase_b`);
  assert.equal(ent.voltage_c, `${p}tension_phase_c`);
  assert.equal(ent.tier1, `${p}consommation_partie_1`);
  assert.equal(ent.tier2, `${p}consommation_partie_2`);
  assert.equal(ent.injection, `${p}summation_received`);
});

test("finds Zigbee2MQTT TIC entities", () => {
  const z = "sensor.zlinky_";
  const states = {
    [`${z}east`]: st("1200", { device_class: "energy", unit_of_measurement: "kWh" }),
    [`${z}easf01`]: st("800", { device_class: "energy", unit_of_measurement: "kWh" }),
    [`${z}easf02`]: st("400", { device_class: "energy", unit_of_measurement: "kWh" }),
    [`${z}sinsts`]: st("1.2", { device_class: "apparent_power", unit_of_measurement: "kVA" }),
    [`${z}irms1`]: st("5", { device_class: "current", unit_of_measurement: "A" }),
    [`${z}urms1`]: st("231", { device_class: "voltage", unit_of_measurement: "V" }),
    [`${z}ltarf`]: st("HEURE CREUSE"),
  };
  const entities = {};
  for (const id of Object.keys(states)) entities[id] = { entity_id: id, device_id: "m1" };
  const hass = { language: "en", states, entities, devices: { m1: { name: "Linky", model: "ZLinky_TIC" } } };
  const card = make(ZlinkyCard, hass);
  const { ent } = card._resolve();
  assert.equal(ent.energy, `${z}east`);
  assert.equal(ent.tier1, `${z}easf01`);
  assert.equal(ent.apparent_power, `${z}sinsts`);
  assert.equal(ent.current, `${z}irms1`);
  assert.equal(ent.voltage, `${z}urms1`);
  assert.equal(ent.tariff, `${z}ltarf`);
  const html = card.shadowRoot.innerHTML;
  // kVA reading shown in VA, both tiers listed, tariff in the subtitle.
  assert.match(html, /1[\s ,.]?200 VA/);
  assert.match(html, /Index 1/);
  assert.match(html, /Index 2/);
  assert.match(html, /HEURE CREUSE/);
});

test("full card: live power, load gauge, single phase without phase details", () => {
  const card = make(ZlinkyCard, zhaHass());
  const html = card.shadowRoot.innerHTML;
  assert.match(html, /440 VA/);
  assert.match(html, /314 W/);
  assert.match(html, /239 V/);
  assert.match(html, /7 % de 6 kVA souscrits/);
  assert.match(html, /Charge faible/);
  // Only one tier in use: no tier rows; phases B / C at 0 V: no phase section.
  assert.doesNotMatch(html, /Index 1/);
  assert.doesNotMatch(html, /Phases/);
  // The stray "Puissance totale" / phase B power entities are not mistaken for the live power.
  assert.doesNotMatch(html, /4[\s ]?760/);
});

test("load level follows the subscribed power", () => {
  const hass = zhaHass();
  hass.states["sensor.lixee_zlinky_tic_puissance_apparente"] = st("5400", { device_class: "apparent_power", unit_of_measurement: "VA" });
  const html = make(ZlinkyCard, hass, { subscribed_power: 6 }).shadowRoot.innerHTML;
  assert.match(html, /90 %/);
  assert.match(html, /Charge élevée/);
});

test("three-phase meter shows the phase section", () => {
  const hass = zhaHass();
  hass.states["sensor.lixee_zlinky_tic_tension_phase_b"] = st("231", { device_class: "voltage", unit_of_measurement: "V" });
  const html = make(ZlinkyCard, hass, { language: "en" }).shadowRoot.innerHTML;
  assert.match(html, /Phases/);
  assert.match(html, /L3/);
});

test("offline when the meter entities are unavailable", () => {
  const hass = zhaHass();
  for (const id of Object.keys(hass.states)) if (id.includes("zlinky")) hass.states[id] = st("unavailable");
  const html = make(ZlinkyCard, hass, { language: "en" }).shadowRoot.innerHTML;
  assert.match(html, /Offline/);
});

test("statistics: today / yesterday / month with cost, and the 24 h curve", async () => {
  const calls = [];
  const callWS = (msg) => {
    calls.push(msg);
    if (msg.type === "recorder/statistic_during_period") {
      const v = { day: msg.calendar.offset === 0 ? 4.2 : 9.8, month: 210 }[msg.calendar.period];
      return Promise.resolve({ change: v });
    }
    const now = Date.now();
    return Promise.resolve({ [msg.statistic_ids[0]]: [{ start: now - 600000, mean: 300 }, { start: now - 300000, mean: 1500 }] });
  };
  const card = make(ZlinkyCard, zhaHass({ callWS }), { price: 0.2 });
  await new Promise((r) => setTimeout(r, 10));
  const html = card.shadowRoot.innerHTML;
  assert.equal(calls.filter((c) => c.type === "recorder/statistic_during_period").length, 3);
  assert.equal(calls.find((c) => c.type === "recorder/statistics_during_period").statistic_ids[0], "sensor.lixee_zlinky_tic_puissance_apparente");
  assert.match(html, /Aujourd&#39;hui|Aujourd'hui/);
  assert.match(html, /4,2/);
  assert.match(html, /9,8/);
  assert.match(html, /210/);
  assert.match(html, /0,84/);
  assert.match(html, /class="spark"/);
  assert.match(html, /max 1[\s ]?500 VA/);
  // Not fetched again on the next state update.
  card.hass = zhaHass({ callWS });
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(calls.length, 4);
});

test("show_graph: false skips the 24 h curve query but keeps the tiles", async () => {
  const calls = [];
  const callWS = (msg) => { calls.push(msg); return Promise.resolve({ change: 1 }); };
  make(ZlinkyCard, zhaHass({ callWS }), { show_graph: false });
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(calls.filter((c) => c.type === "recorder/statistic_during_period").length, 3);
  assert.equal(calls.filter((c) => c.type === "recorder/statistics_during_period").length, 0);
});

test("mini card fetches the 24 h curve only once unfolded", async () => {
  const calls = [];
  const callWS = (msg) => { calls.push(msg); return Promise.resolve(msg.statistic_ids ? {} : { change: 1 }); };
  const card = make(ZlinkyMiniCard, zhaHass({ callWS }));
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(calls.filter((c) => c.type === "recorder/statistics_during_period").length, 0);
  card._setZoom(true);
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(calls.filter((c) => c.type === "recorder/statistics_during_period").length, 1);
});

test("a failed stats fetch retries after 30 s instead of the full refresh window", async () => {
  const callWS = () => Promise.reject(new Error("recorder down"));
  const card = make(ZlinkyCard, zhaHass({ callWS }));
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(card._stats.today, null);
  // _statsAt was backdated so the fetch is stale again in ~30 s, not in 5 min.
  const age = Date.now() - card._statsAt;
  assert.ok(age >= 5 * 60000 - 30000 - 1000, `stats age ${age} ms`);
});

test("the main readout is a plain span when no power entity is resolved", () => {
  const hass = zhaHass();
  for (const id of Object.keys(hass.states)) {
    if (/puissance/.test(id)) { delete hass.states[id]; delete hass.entities[id]; }
  }
  const card = make(ZlinkyCard, hass);
  assert.match(card.shadowRoot.innerHTML, /<span class="big">/);
  assert.doesNotMatch(card.shadowRoot.innerHTML, /<button class="big"/);
  const withPower = make(ZlinkyCard, zhaHass());
  assert.match(withPower.shadowRoot.innerHTML, /<button class="big" data-more="/);
});

test("entity role matching is cached until the registry or config changes", () => {
  const card = make(ZlinkyCard, zhaHass());
  const r1 = card._resolve();
  assert.equal(card._resolve(), r1);
  card.hass = { ...card._hass };
  assert.equal(card._resolve(), r1);
  card.hass = zhaHass();
  const r2 = card._resolve();
  assert.notEqual(r2, r1);
  assert.deepEqual(r2.ent, r1.ent);
  card.setConfig({ entities: { power: "sensor.other_power" } });
  card.hass = zhaHass();
  assert.equal(card._resolve().ent.power, "sensor.other_power");
});

test("mini card: compact, unfolds with the detail button", () => {
  const card = make(ZlinkyMiniCard, zhaHass(), { language: "en" });
  assert.match(card.shadowRoot.innerHTML, /class="mini"/);
  assert.match(card.shadowRoot.innerHTML, /data-action="zoom"/);
  assert.equal(card.getGridOptions().columns, 6);
  card._setZoom(true);
  assert.doesNotMatch(card.shadowRoot.innerHTML, /class="mini"/);
  assert.equal(card.getGridOptions().columns, 12);
  const noZoom = make(ZlinkyMiniCard, zhaHass(), { zoom: false });
  assert.doesNotMatch(noZoom.shadowRoot.innerHTML, /data-action="zoom"/);
});

test("escapes user text and registers the cards", () => {
  const html = make(ZlinkyCard, zhaHass(), { name: "<b>x</b>" }).shadowRoot.innerHTML;
  assert.match(html, /&lt;b&gt;x&lt;\/b&gt;/);
  assert.ok(customElements.get("zlinky-card"));
  assert.ok(customElements.get("zlinky-mini-card"));
  assert.ok(customElements.get("zlinky-card-editor"));
});

test("sparkline needs at least two points", () => {
  assert.equal(zlSpark([{ t: 1, v: 2 }]), "");
  assert.match(zlSpark([{ t: 1, v: 2 }, { t: 2, v: 4 }]), /<path/);
});

test("I18N parity: every language has exactly the English keys and placeholders", () => {
  const ref = ZlI18n.en;
  const holes = (v) => (String(v).match(/\{\w+\}/g) || []).sort();
  for (const lang of ["fr", "de", "es", "sr", "sr-Latn", "it", "nl", "pt", "pl"]) {
    assert.ok(ZlI18n[lang], lang);
    assert.deepEqual(Object.keys(ZlI18n[lang]).sort(), Object.keys(ref).sort(), lang);
    for (const k of Object.keys(ref)) {
      assert.deepEqual(holes(ZlI18n[lang][k]), holes(ref[k]), `${lang}.${k}`);
      assert.ok(String(ZlI18n[lang][k]).trim(), `${lang}.${k} is empty`);
    }
  }
});

// Proper nouns, brands and units (Linky, ZLinky, LiXee, ZHA, kVA, kWh, h, Home Assistant) are the only Latin
// words allowed in the Cyrillic dictionary; the Latin one has no Cyrillic at all.
const SR_LATIN_OK = /\b(Z?Linky|LiXee|ZLinky_TIC|ZHA|Zigbee2MQTT|Home Assistant|kVA|kWh|h)\b|\{\w+\}/g;
test("Serbian: no Latin letters in sr (apart from names and units), no Cyrillic in sr-Latn", () => {
  for (const [k, v] of Object.entries(ZlI18n.sr)) {
    assert.doesNotMatch(v.replace(SR_LATIN_OK, ""), /[A-Za-z]/, `sr.${k}: ${v}`);
  }
  for (const [k, v] of Object.entries(ZlI18n["sr-Latn"])) assert.doesNotMatch(v, /[\u0400-\u04ff]/, `sr-Latn.${k}: ${v}`);
});

test("language resolution: full code, then its base, then English", () => {
  assert.equal(zlLang("fr-FR"), "fr");
  assert.equal(zlLang("sr-Latn"), "sr-Latn");
  assert.equal(zlLang("sr"), "sr");
  assert.equal(zlLang("pt-BR"), "pt");
  assert.equal(zlLang("ja"), "en");
  assert.equal(zlLang(undefined), "en");
  const Editor = customElements.get("zlinky-card-editor");
  for (const [code, want] of [["fr-FR", "fr"], ["sr-Latn", "sr-Latn"], ["sr", "sr"], ["pt-BR", "pt"], ["pl-PL", "pl"], ["ja", "en"]]) {
    // Home Assistant's language, no card option.
    assert.equal(make(ZlinkyCard, { ...zhaHass(), language: code })._lang(), want, `card hass ${code}`);
    const ed = new Editor();
    ed.setConfig({ type: "custom:zlinky-card" });
    ed.hass = { ...zhaHass(), language: code };
    assert.equal(ed._lang(), want, `editor hass ${code}`);
  }
  // The card option still wins over Home Assistant's language.
  assert.equal(make(ZlinkyCard, { ...zhaHass(), language: "sr-Latn" }, { language: "de" })._lang(), "de");
});

test("renders in Serbian, Cyrillic and Latin (numbers and money included)", () => {
  const cyr = make(ZlinkyCard, { ...zhaHass(), language: "sr" }).shadowRoot.innerHTML;
  assert.match(cyr, /Мало оптерећење/);
  assert.match(cyr, /од 6 kVA уговорене снаге/);
  const lat = make(ZlinkyCard, { ...zhaHass(), language: "sr-Latn" }).shadowRoot.innerHTML;
  assert.match(lat, /Malo opterećenje/);
  assert.match(lat, /od 6 kVA ugovorene snage/);
  assert.doesNotMatch(lat, /[\u0400-\u04ff]/);
  // Intl formatting in sr-Latn stays Latin.
  assert.doesNotMatch(`${zlNum("sr-Latn", 1234.5, 1)} ${zlMoney("sr-Latn", 12.5, "RSD")}`, /[\u0400-\u04ff]/);
});

test("editor: Serbian language options", () => {
  const Editor = customElements.get("zlinky-card-editor");
  const ed = new Editor();
  ed.setConfig({ type: "custom:zlinky-card" });
  ed.hass = zhaHass();
  const opts = ed._form.schema.find((s) => s.name === "language").selector.select.options;
  assert.ok(opts.some((o) => o.value === "sr" && o.label === "Српски"));
  assert.ok(opts.some((o) => o.value === "sr-Latn" && o.label === "Srpski (latinica)"));
});

test("language resolution: Italian, Dutch, Portuguese and Polish", () => {
  for (const [code, want] of [
    ["it-IT", "it"],
    ["nl-BE", "nl"],
    ["pt", "pt"],
    ["pt-BR", "pt"],
    ["pl-PL", "pl"],
    ["sr-Latn", "sr-Latn"],
    ["ja", "en"],
  ]) {
    assert.equal(zlLang(code), want, code);
  }
});

test("editor: Italian, Dutch, Portuguese and Polish language options", () => {
  const Editor = customElements.get("zlinky-card-editor");
  const ed = new Editor();
  ed.setConfig({ type: "custom:zlinky-card" });
  ed.hass = zhaHass();
  const opts = ed._form.schema.find((s) => s.name === "language").selector.select.options;
  for (const [value, label] of [["it", "Italiano"], ["nl", "Nederlands"], ["pt", "Português (Portugal)"], ["pl", "Polski"]]) {
    assert.ok(opts.some((o) => o.value === value && o.label === label), value);
  }
  // Every option has a dictionary, and every dictionary an option.
  assert.deepEqual([...opts.map((o) => o.value)].sort(), [...Object.keys(ZlI18n)].sort());
});

test("renders in Italian, Dutch, Portuguese and Polish", () => {
  const html = (language) => make(ZlinkyCard, zhaHass(), { language }).shadowRoot.innerHTML;
  assert.match(html("it"), /Ultime 24 h|Carico basso/);
  assert.match(html("nl"), /Laatste 24 u|Lage belasting/);
  assert.match(html("pt"), /Últimas 24 h|Carga baixa/);
  assert.match(html("pl"), /Ostatnie 24 h|Małe obciążenie/);
});

test("Intl formatting follows Home Assistant's full locale when it matches the card language", () => {
  const fmt = (hass, config = {}) => make(ZlinkyCard, { ...zhaHass(), ...hass }, config)._fmtLang();
  // A bare `pt` is European Portuguese: 2,38 € and 18 343, not the Brazilian € 2,38 and 18.343.
  assert.equal(fmt({ language: "pt" }), "pt-PT");
  assert.equal(zlMoney(fmt({ language: "pt" }), 2.38, "EUR").replace(/\s/g, " "), "2,38 €");
  assert.equal(zlNum(fmt({ language: "pt" }), 18343, 0).replace(/\s/g, " "), "18 343");
  // HA's full locale is used when its base is the card language.
  assert.equal(fmt({ language: "pt-BR" }), "pt-BR");
  assert.equal(fmt({ language: "de", locale: { language: "de-CH" } }), "de-CH");
  // The card's language option still wins: a non-matching HA locale is ignored.
  assert.equal(fmt({ language: "pt-BR" }, { language: "pl" }), "pl");
  assert.equal(fmt({ language: "sr" }, { language: "sr-Latn" }), "sr-Latn");
  assert.equal(fmt({ language: "sr-Latn" }, { language: "sr" }), "sr");
});

test("renders in German and Spanish", () => {
  assert.match(make(ZlinkyCard, zhaHass(), { language: "de" }).shadowRoot.innerHTML, /Letzte 24 h|Geringe Last/);
  assert.match(make(ZlinkyCard, zhaHass(), { language: "es" }).shadowRoot.innerHTML, /Últimas 24 h|Carga baja/);
});

test("finds Zigbee2MQTT entities carrying Home Assistant's _2 de-duplication suffix", () => {
  const z = "sensor.zlinky_";
  const states = {
    [`${z}east_2`]: st("1200", { device_class: "energy", unit_of_measurement: "kWh" }),
    [`${z}easf01_2`]: st("800", { device_class: "energy", unit_of_measurement: "kWh" }),
    [`${z}sinsts_2`]: st("1.2", { device_class: "apparent_power", unit_of_measurement: "kVA" }),
    [`${z}irms1_2`]: st("5", { device_class: "current", unit_of_measurement: "A" }),
    [`${z}irms2_2`]: st("3", { device_class: "current", unit_of_measurement: "A" }),
    [`${z}urms1_2`]: st("231", { device_class: "voltage", unit_of_measurement: "V" }),
    [`${z}power_3`]: st("900", { device_class: "power", unit_of_measurement: "W" }),
  };
  const entities = {};
  for (const id of Object.keys(states)) entities[id] = { entity_id: id, device_id: "m1" };
  const hass = { language: "en", states, entities, devices: { m1: { name: "Linky", model: "ZLinky_TIC" } } };
  const card = make(ZlinkyCard, hass);
  const { ent } = card._resolve();
  assert.equal(ent.energy, `${z}east_2`);
  assert.equal(ent.tier1, `${z}easf01_2`);
  assert.equal(ent.apparent_power, `${z}sinsts_2`);
  assert.equal(ent.current, `${z}irms1_2`);
  assert.equal(ent.current_b, `${z}irms2_2`);
  assert.equal(ent.voltage, `${z}urms1_2`);
  assert.equal(ent.power, `${z}power_3`);
  assert.doesNotMatch(card.shadowRoot.innerHTML, /Offline/);
});

test("an entity whose state appears after the first resolve is picked up", () => {
  const hass = zhaHass();
  const id = "sensor.lixee_zlinky_tic_puissance_apparente";
  const saved = hass.states[id];
  delete hass.states[id];
  const card = make(ZlinkyCard, hass);
  assert.notEqual(card._resolve().ent.apparent_power, id);
  // Same registry object, the state now exists (HA finished starting).
  card.hass = { ...hass, states: { ...hass.states, [id]: saved } };
  assert.equal(card._resolve().ent.apparent_power, id);
});

test("the ZLinky device lookup is memoized per device registry object", () => {
  const hass = zhaHass();
  let scans = 0;
  const devices = new Proxy(hass.devices, { ownKeys: (t) => { scans++; return Reflect.ownKeys(t); } });
  const h = { ...hass, devices };
  assert.equal(zlFindDevice(h), "z1");
  assert.equal(zlFindDevice({ ...h }), "z1");
  assert.equal(scans, 1);
});

test("a partial stats failure keeps the previous values instead of dashes", async () => {
  let fail = false;
  const callWS = (msg) => {
    if (msg.type === "recorder/statistics_during_period") return Promise.resolve({});
    if (fail && msg.calendar.offset === -1) return Promise.reject(new Error("timeout"));
    return Promise.resolve({ change: msg.calendar.offset === -1 ? 9.8 : 4.2 });
  };
  const card = make(ZlinkyCard, zhaHass({ callWS }));
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(card._stats.yesterday, 9.8);
  fail = true;
  card._statsAt = 0;
  card.hass = zhaHass({ callWS });
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(card._stats.yesterday, 9.8);
  assert.equal(card._stats.today, 4.2);
});

test("a stats reply for a previous config is ignored", async () => {
  let release;
  const gate = new Promise((r) => { release = r; });
  const calls = [];
  const callWS = (msg) => {
    calls.push(msg);
    return calls.length <= 4 ? gate.then(() => ({ change: 111 })) : Promise.resolve({ change: 2 });
  };
  const card = make(ZlinkyCard, zhaHass({ callWS }));
  card.setConfig({ entities: { energy: "sensor.lixee_zlinky_tic_consommation_partie_1" } });
  release();
  await new Promise((r) => setTimeout(r, 10));
  assert.notEqual(card._stats.today, 111);
  assert.equal(card._stats.today, 2);
  assert.ok(calls.slice(4).some((c) => c.statistic_id === "sensor.lixee_zlinky_tic_consommation_partie_1"));
});

// Minimal DOM nodes, enough for zlMorph.
class FakeNode {
  constructor(name, attrs = {}, kids = [], text = null) {
    this.nodeName = name;
    this.nodeType = name === "#text" ? 3 : 1;
    this.nodeValue = text;
    this.attrs = { ...attrs };
    this.childNodes = [];
    for (const k of kids) this.appendChild(k);
  }
  get localName() { return this.nodeType === 1 ? this.nodeName.toLowerCase() : undefined; }
  get attributes() { return Object.entries(this.attrs).map(([name, value]) => ({ name, value })); }
  hasAttribute(n) { return n in this.attrs; }
  getAttribute(n) { return n in this.attrs ? this.attrs[n] : null; }
  setAttribute(n, v) { this.attrs[n] = v; }
  removeAttribute(n) { delete this.attrs[n]; }
  appendChild(n) { n.parent?.removeChild(n); n.parent = this; this.childNodes.push(n); return n; }
  removeChild(n) { this.childNodes.splice(this.childNodes.indexOf(n), 1); n.parent = null; return n; }
  replaceChild(n, old) { n.parent?.removeChild(n); this.childNodes[this.childNodes.indexOf(old)] = n; n.parent = this; old.parent = null; return old; }
}
const txt = (v) => new FakeNode("#text", {}, [], v);

test("re-renders patch the DOM in place (meter and gauge nodes are kept)", () => {
  const picture = new FakeNode("DIV", { class: "picture live", style: "--zl-blink:2.00s" }, [txt("300 VA")]);
  const fill = new FakeNode("DIV", { class: "fill", style: "width:5%" });
  const chip = new FakeNode("BUTTON", { class: "chip" });
  const root = new FakeNode("ROOT", {}, [picture, fill, chip]);
  const next = new FakeNode("ROOT", {}, [
    new FakeNode("DIV", { class: "picture live", style: "--zl-blink:1.00s" }, [txt("4 200 VA")]),
    new FakeNode("DIV", { class: "fill", style: "width:70%" }),
    new FakeNode("SPAN", { class: "chip" }),
  ]);
  zlMorph(root, next);
  assert.equal(root.childNodes[0], picture);
  assert.equal(picture.attrs.style, "--zl-blink:1.00s");
  assert.equal(picture.childNodes[0].nodeValue, "4 200 VA");
  assert.equal(root.childNodes[1], fill);
  assert.equal(fill.attrs.style, "width:70%");
  assert.equal(root.childNodes[2].nodeName, "SPAN");
  zlMorph(root, new FakeNode("ROOT", {}, [new FakeNode("DIV", { class: "picture" })]));
  assert.equal(root.childNodes.length, 1);
  assert.equal(root.childNodes[0], picture);
  assert.deepEqual(picture.attrs, { class: "picture" });
  assert.equal(picture.childNodes.length, 0);
});

// Every leaf field of the editor schema, grids and expandables flattened.
function schemaLeaves(schema) {
  return schema.flatMap((s) => (s.schema ? schemaLeaves(s.schema) : [s]));
}

test("editor: every field has a translated label, and the device field its helper", () => {
  const Editor = customElements.get("zlinky-card-editor");
  for (const lang of ["en", "fr", "de", "es", "sr", "sr-Latn", "it", "nl", "pt", "pl"]) {
    for (const type of ["custom:zlinky-card", "custom:zlinky-mini-card"]) {
      const ed = new Editor();
      ed.setConfig({ type, language: lang });
      ed.hass = zhaHass();
      for (const s of schemaLeaves(ed._form.schema)) {
        const label = ed._form.computeLabel(s);
        assert.ok(label && !/^(ed|en)_/.test(label), `${lang} ${type} ${s.name}: ${label}`);
      }
      const helper = ed._form.computeHelper({ name: "device_id" });
      assert.ok(helper && !/^ed_/.test(helper), `${lang} device_id helper: ${helper}`);
    }
  }
});

test("mini card: show_stats: false hides today's line and skips the recorder query", async () => {
  const calls = [];
  const callWS = (msg) => { calls.push(msg); return Promise.resolve(msg.statistic_ids ? {} : { change: 2 }); };
  const card = make(ZlinkyMiniCard, zhaHass({ callWS }), { language: "en", show_stats: false });
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(calls.length, 0);
  assert.doesNotMatch(card.shadowRoot.innerHTML, /mdi:calendar-today/);
  // Unfolded, the 24 h curve is still fetched since show_graph is on.
  card._setZoom(true);
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(calls.filter((c) => c.type === "recorder/statistics_during_period").length, 1);
});

test("mini card: today's line is shown by default", async () => {
  const callWS = (msg) => Promise.resolve(msg.statistic_ids ? {} : { change: 2 });
  const card = make(ZlinkyMiniCard, zhaHass({ callWS }), { language: "en" });
  await new Promise((r) => setTimeout(r, 10));
  assert.match(card.shadowRoot.innerHTML, /mdi:calendar-today/);
});

test("full card: show_stats: false still fetches the 24 h curve and shows no tiles", async () => {
  const calls = [];
  const callWS = (msg) => { calls.push(msg); return Promise.resolve(msg.statistic_ids ? {} : { change: 2 }); };
  const card = make(ZlinkyCard, zhaHass({ callWS }), { show_stats: false });
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(calls.filter((c) => c.type === "recorder/statistics_during_period").length, 1);
  assert.doesNotMatch(card.shadowRoot.innerHTML, /class="tile"/);
});

test("mini card: turning show_stats back on fetches today's consumption", async () => {
  const calls = [];
  const callWS = (msg) => { calls.push(msg); return Promise.resolve(msg.statistic_ids ? {} : { change: 2 }); };
  const card = make(ZlinkyMiniCard, zhaHass({ callWS }), { language: "en", show_stats: false });
  await new Promise((r) => setTimeout(r, 10));
  card.setConfig({ language: "en", show_stats: true });
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(calls.filter((c) => c.type === "recorder/statistic_during_period").length, 3);
  assert.match(card.shadowRoot.innerHTML, /mdi:calendar-today/);
});

// A custom element (ha-icon) draws its own content: the template never has it, so a re-render must not strip it.
test("re-renders keep what a custom element drew, but still update its attributes", () => {
  const svg = new FakeNode("svg", {});
  const icon = new FakeNode("HA-ICON", { icon: "mdi:arrow-expand" }, [svg]);
  const root = new FakeNode("ROOT", {}, [new FakeNode("BUTTON", { class: "zoom" }, [icon])]);
  zlMorph(root, new FakeNode("ROOT", {}, [new FakeNode("BUTTON", { class: "zoom" }, [new FakeNode("HA-ICON", { icon: "mdi:arrow-collapse" })])]));
  assert.equal(root.childNodes[0].childNodes[0], icon);
  assert.equal(icon.attrs.icon, "mdi:arrow-collapse");
  assert.deepEqual(icon.childNodes, [svg]);
});

test("re-renders still patch the children a custom element gets from the template (ha-card)", () => {
  const val = new FakeNode("SPAN", { class: "val" }, [txt("300 VA")]);
  const card = new FakeNode("HA-CARD", {}, [val, new FakeNode("DIV", { class: "old" })]);
  const root = new FakeNode("ROOT", {}, [card]);
  zlMorph(root, new FakeNode("ROOT", {}, [new FakeNode("HA-CARD", {}, [new FakeNode("SPAN", { class: "val" }, [txt("4 200 VA")])])]));
  assert.equal(root.childNodes[0], card);
  assert.equal(card.childNodes.length, 1);
  assert.equal(val.childNodes[0].nodeValue, "4 200 VA");
});

// WCAG 2.x relative luminance / contrast ratio, and CSS color-mix(in srgb, A p%, B) on opaque colors.
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixRgb = (a, b, p) => a.map((v, i) => v * p + b[i] * (1 - p));
const lum = (c) => {
  const [r, g, b] = c.map((v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
// Home Assistant's default themes (and the README screenshots' tile background, #ececec).
const THEMES = {
  light: { text: "#212121", card: "#ffffff", tiles: ["#e5e5e5", "#ececec"] },
  dark: { text: "#e1e1e1", card: "#1c1c1c", tiles: ["#282828"] },
};
const LOAD = { low: "#43a047", mid: "#ffa600", high: "#db4437", off: "#9e9e9e" };
function cardCss() {
  return make(ZlinkyCard, zhaHass(), { language: "en" }).shadowRoot.innerHTML;
}
function mixShare(css, re) {
  const m = css.match(re);
  assert.ok(m, `${re} not found in the card styles`);
  return Number(m[1]) / 100;
}

test("contrast: the tiles' cost text reaches 4.5:1 in light and dark themes", () => {
  const css = cardCss();
  assert.match(css, /\.tc \{[^}]*color: var\(--zl-green\)/);
  const p = mixShare(css, /--zl-green: color-mix\(in srgb, #9ab00f (\d+)%, var\(--primary-text-color/);
  for (const t of Object.values(THEMES)) {
    const fg = mixRgb(rgb("#9ab00f"), rgb(t.text), p);
    for (const bg of t.tiles) assert.ok(contrast(fg, rgb(bg)) >= 4.5, `${contrast(fg, rgb(bg)).toFixed(2)}:1 on ${bg}`);
  }
});

test("contrast: the status pill text reaches 4.5:1 for every load level, light and dark", () => {
  const css = cardCss();
  const st = css.match(/\.st \{[^}]*\}/)[0];
  const m = st.match(/color: color-mix\(in srgb, var\(--zl-color\) (\d+)%, var\(--primary-text-color/);
  const p = m ? Number(m[1]) / 100 : 1; // a plain var(--zl-color) is the load color itself
  for (const t of Object.values(THEMES)) {
    for (const [level, c] of Object.entries(LOAD)) {
      const fg = mixRgb(rgb(c), rgb(t.text), p);
      const bg = mixRgb(rgb(c), rgb(t.card), 0.15); // the pill's 15% tint over the card
      assert.ok(contrast(fg, bg) >= 4.5, `${level}: ${contrast(fg, bg).toFixed(2)}:1`);
    }
  }
});

test("prefers-reduced-motion also stops the load gauges' width transition", () => {
  const css = cardCss();
  const block = css.match(/@media \(prefers-reduced-motion: reduce\) \{(.*?\})\s*\}/);
  assert.ok(block, "no reduced-motion block");
  assert.match(block[1], /\.picture \*[^}]*animation: none/);
  assert.match(block[1], /\.fill \{[^}]*transition: none/);
});

// ── Review pass 9 ────────────────────────────────────────────────────────────

// The ZLinky device with only sensors the card does not use (link quality, RSSI): wrong device or unexpected naming.
function noRoleHass(withStates = true) {
  const ids = ["sensor.lixee_zlinky_tic_rssi", "sensor.lixee_zlinky_tic_lqi"];
  const states = {};
  const entities = {};
  for (const id of ids) {
    entities[id] = { entity_id: id, device_id: "z1" };
    if (withStates) states[id] = st("-60", { device_class: "signal_strength", unit_of_measurement: "dBm" });
  }
  return { language: "en", states, entities, devices: { z1: { name: "LiXee ZLinky_TIC", model: "ZLinky_TIC" } } };
}

test("a ZLinky without any recognised sensor says so instead of showing Offline", () => {
  for (const Card of [ZlinkyCard, ZlinkyMiniCard]) {
    const html = make(Card, noRoleHass()).shadowRoot.innerHTML;
    assert.doesNotMatch(html, /Offline/);
    assert.match(html, /No ZLinky sensor found/);
    // It points at the editor section where the entities can be set by hand.
    assert.match(html, /Entities \(advanced\)/);
  }
  // Translated, like the rest of the card.
  assert.match(make(ZlinkyCard, { ...noRoleHass(), language: "fr" }).shadowRoot.innerHTML, /Entités \(avancé\)/);
});

test("a ZLinky whose sensors have no state yet (integration still starting) is still Offline, not 'no sensor'", () => {
  const html = make(ZlinkyCard, noRoleHass(false)).shadowRoot.innerHTML;
  assert.match(html, /Offline/);
  assert.doesNotMatch(html, /No ZLinky sensor found/);
  // Once the sensors get their state and none is a meter reading, the card says so (re-rendered, not stuck on Offline).
  const card = make(ZlinkyCard, noRoleHass(false));
  card.hass = noRoleHass(true);
  assert.match(card.shadowRoot.innerHTML, /No ZLinky sensor found/);
  // And a recognised meter with every entity unavailable stays Offline too.
  const hass = zhaHass();
  for (const id of Object.keys(hass.states)) if (id.includes("zlinky")) hass.states[id] = st("unavailable");
  assert.doesNotMatch(make(ZlinkyCard, hass, { language: "en" }).shadowRoot.innerHTML, /No ZLinky sensor found/);
});

test("the 24 h section title keeps the hour symbol in lower case (no 'LAST 24 H')", async () => {
  const callWS = (msg) => {
    if (msg.type === "recorder/statistic_during_period") return Promise.resolve({ change: 1 });
    const now = Date.now();
    return Promise.resolve({ [msg.statistic_ids[0]]: [{ start: now - 600000, mean: 300 }, { start: now - 300000, mean: 1500 }] });
  };
  for (const [language, unit] of [["en", "h"], ["pl", "h"], ["sr-Latn", "h"], ["nl", "u"]]) {
    const card = make(ZlinkyCard, zhaHass({ callWS }), { language });
    await new Promise((r) => setTimeout(r, 10));
    assert.match(card.shadowRoot.innerHTML, new RegExp(`24 <span class="unit">${unit}</span>`), language);
  }
  assert.match(cardCss(), /\.section-title \.unit \{ text-transform: none; \}/);
});

test("editor: the icon field says it replaces the meter illustration, in every language", () => {
  const Editor = customElements.get("zlinky-card-editor");
  for (const lang of Object.keys(ZlI18n)) {
    const ed = new Editor();
    ed.setConfig({ type: "custom:zlinky-card", language: lang });
    ed.hass = zhaHass();
    const helper = ed._form.computeHelper({ name: "icon" });
    assert.ok(helper && !/^ed_/.test(helper), `${lang}: ${helper}`);
  }
  assert.match(ZlI18n.en.ed_icon_helper, /illustration/);
});

// The CSS rules of a selector, as written in the card's <style> (several blocks are merged).
function rules(css, selector) {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [...css.matchAll(new RegExp(`(?:^|[}>;])\\s*${esc} \\{([^}]*)\\}`, "g"))].map((m) => m[1]).join(";");
}

test("focus ring: the generic button rule does not square off the round detail button and chips", () => {
  const css = cardCss();
  assert.doesNotMatch(rules(css, "button:focus-visible"), /border-radius/);
  assert.match(rules(css, ".zoom"), /border-radius: 50%/);
  assert.match(rules(css, ".chip"), /border-radius: 12px/);
});

test("narrow header: the title keeps ~4 characters, the pill shrinks and turns into its dot, buttons never shrink", () => {
  const css = cardCss();
  assert.match(rules(css, "ha-card"), /container-type: inline-size/);
  const titles = rules(css, ".titles");
  assert.match(titles, /flex: 1 1 auto/);
  assert.match(titles, /min-width: [4-6]ch/);
  const pill = rules(css, ".st");
  assert.match(pill, /flex: 0 1 auto/);
  assert.match(pill, /min-width: 0/);
  assert.match(pill, /max-width: 50%/);
  assert.match(rules(css, ".zoom"), /flex: none/);
  assert.match(css, /@container \(max-width: \d+px\) \{[^@]*\.stt \{ display: none; \}/);
  // Shown as a dot only, the status stays in the tooltip and for screen readers.
  for (const Card of [ZlinkyCard, ZlinkyMiniCard]) {
    const html = make(Card, zhaHass(), { language: "en" }).shadowRoot.innerHTML;
    assert.match(html, /<span class="st" role="img" title="Low load" aria-label="Low load">/);
  }
});

test("with a subtitle, the status pill sits on the title's line", () => {
  const css = cardCss();
  assert.match(make(ZlinkyCard, zhaHass()).shadowRoot.innerHTML, /<div class="header sub2">/);
  assert.doesNotMatch(make(ZlinkyMiniCard, zhaHass()).shadowRoot.innerHTML, /header sub2/);
  assert.match(rules(css, ".header.sub2 .st"), /align-self: flex-start/);
});

test("narrow mini card: the meter shrinks, the reading ellipsizes and today's line wraps instead of being cut", async () => {
  const callWS = (msg) => Promise.resolve(msg.statistic_ids ? {} : { change: 11.8 });
  const card = make(ZlinkyMiniCard, { ...zhaHass({ callWS }), config: { currency: "EUR" } }, { language: "en", price: 0.2 });
  await new Promise((r) => setTimeout(r, 10));
  const html = card.shadowRoot.innerHTML;
  // Each part of today's line is kept whole: the line wraps between them.
  assert.match(html, /<span class="seg">Today ·<\/span> <span class="seg">11\.8 kWh ·<\/span> <span class="seg">€2\.36<\/span>/);
  // Without a price, no cost part and no trailing separator.
  const noPrice = make(ZlinkyMiniCard, zhaHass({ callWS }), { language: "en" });
  await new Promise((r) => setTimeout(r, 10));
  assert.match(noPrice.shadowRoot.innerHTML, /<span class="seg">11\.8 kWh<\/span><\/span>/);
  const css = html;
  assert.doesNotMatch(rules(css, ".line > span"), /nowrap/);
  assert.match(rules(css, ".big .val"), /text-overflow: ellipsis/);
  assert.match(rules(css, ".big .val"), /font-size: clamp\(/);
  assert.match(css, /@container \(max-width: \d+px\) \{[^@]*ha-card\.mini \.picture \{ width: \d+px; height: \d+px; \}/);
});

test("narrow full card: the tiles' unit goes under the value, and the card asks for 9 columns at least", () => {
  const css = cardCss();
  assert.match(css, /@container \(max-width: \d+px\) \{[^@]*\.tv small \{ display: block; \}/);
  assert.deepEqual({ ...make(ZlinkyCard, zhaHass()).getGridOptions() }, { columns: 12, min_columns: 9 });
  // The mini card still fits 6 columns, and unfolded it follows the full card.
  const mini = make(ZlinkyMiniCard, zhaHass());
  assert.deepEqual({ ...mini.getGridOptions() }, { columns: 6, min_columns: 6 });
  mini._setZoom(true);
  assert.deepEqual({ ...mini.getGridOptions() }, { columns: 12, min_columns: 9 });
});
