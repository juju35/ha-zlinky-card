import assert from "node:assert/strict";
import { test } from "node:test";
import { loadCard } from "./load.mjs";

const { ZlinkyCard, ZlinkyMiniCard, zlFindDevice, zlSpark, zlMorph, ZlI18n, customElements } = loadCard("zlinky-card.js", [
  "ZlinkyCard",
  "ZlinkyMiniCard",
  "zlFindDevice",
  "zlSpark",
  "zlMorph",
  "ZlI18n",
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
  for (const lang of ["fr", "de", "es"]) {
    assert.deepEqual(Object.keys(ZlI18n[lang]).sort(), Object.keys(ref).sort(), lang);
    for (const k of Object.keys(ref)) assert.deepEqual(holes(ZlI18n[lang][k]), holes(ref[k]), `${lang}.${k}`);
  }
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
  for (const lang of ["en", "fr", "de", "es"]) {
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
