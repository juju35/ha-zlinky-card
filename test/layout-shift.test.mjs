// Layout shift on state updates, in a real browser (Chromium through Playwright; CHROMIUM_PATH, or skipped without
// one): Home Assistant pushes a new hass on every state change of the instance. An update of an entity the card does
// not show changes nothing in its shadow DOM; an update of its own entities is patched in place (no node replaced:
// the meter, its LED animation and the icons stay the same nodes) and the card keeps its height on
// every frame, so that the dashboard does not move.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { after, test } from "node:test";

const source = readFileSync(new URL("../src/zlinky-card.js", import.meta.url), "utf8");

let browser = null;
try {
  const { chromium } = await import("playwright");
  browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
} catch {}
after(() => browser?.close());

// ha-card as in Home Assistant (Lit): its slot is only drawn a microtask after it is connected, so that its content has
// no size until then. ha-icon: empty (no size) until its icon is loaded, a little later.
const STUBS = `customElements.define("ha-card", class extends HTMLElement { constructor() { super(); this.attachShadow({ mode: "open" });
  this.updateComplete = new Promise((res) => { this._done = res; }); }
  connectedCallback() { if (this._drawn) return; this._drawn = true; Promise.resolve().then(() => {
    this.shadowRoot.innerHTML = "<style>:host{display:block;border:1px solid #ddd}</style><slot></slot>"; this._done(true); }); } });
customElements.define("ha-icon", class extends HTMLElement { constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { setTimeout(() => { this.shadowRoot.innerHTML = '<span style="display:inline-block;width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px)"></span>'; }, 16); } });`;

// A single-phase ZLinky (ZHA entity IDs) with two tiers.
const entities = {};
const states = {};
const add = (id, state, attributes = {}) => {
  entities[id] = { entity_id: id, device_id: "zl" };
  states[id] = { entity_id: id, state, attributes: { friendly_name: id, ...attributes } };
};
const p = "sensor.linky_zlinky_tic_";
add(`${p}consommation`, "18342.6", { device_class: "energy", unit_of_measurement: "kWh" });
add(`${p}consommation_partie_1`, "7128.4", { device_class: "energy", unit_of_measurement: "kWh" });
add(`${p}consommation_partie_2`, "11214.2", { device_class: "energy", unit_of_measurement: "kWh" });
add(`${p}puissance`, "1640", { device_class: "power", unit_of_measurement: "W" });
add(`${p}puissance_apparente`, "1880", { device_class: "apparent_power", unit_of_measurement: "VA" });
add(`${p}courant`, "8", { device_class: "current", unit_of_measurement: "A" });
add(`${p}tension`, "236", { device_class: "voltage", unit_of_measurement: "V" });
const devices = { zl: { id: "zl", name: "LiXee ZLinky_TIC", manufacturer: "LiXee", model: "ZLinky_TIC" } };

// Own entities changed one after another, with readings of another number of digits.
const CHANGES = [
  [`${p}puissance_apparente`, "980"],
  [`${p}puissance`, "11380"],
  [`${p}courant`, "52"],
  [`${p}puissance_apparente`, "12450"],
  [`${p}consommation`, "18342.7"],
];
const CARDS = [
  ["zlinky-card", {}],
  ["zlinky-mini-card", {}],
  ["zlinky-mini-card", { illustration: false }],
];

for (const [type, extra] of CARDS) {
  test(`${type}${extra.illustration === false ? " (classic header)" : ""}: state updates neither replace nodes nor change the height`, { skip: !browser && "no Chromium" }, async () => {
    const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
    try {
      await page.setContent('<!doctype html><body style="margin:0;font-family:Arial,sans-serif"></body>');
      await page.addScriptTag({ content: STUBS });
      await page.addScriptTag({ content: source });
      const r = await page.evaluate(
        async ({ type, extra, data, CHANGES }) => {
          const frame = () => new Promise((res) => requestAnimationFrame(res));
          const hassOf = (s) => ({ states: s, entities: data.entities, devices: data.devices, language: "en", locale: { language: "en" }, themes: {}, callService() {}, callWS: async () => ({}), config: { currency: "EUR" } });
          const outer = document.body.appendChild(document.createElement("div"));
          outer.style.width = "400px";
          const card = document.createElement(type);
          card.setConfig({ type: `custom:${type}`, ...extra });
          let s = { ...data.states };
          card.hass = hassOf(s);
          outer.appendChild(card);
          await new Promise((res) => setTimeout(res, 300));
          for (let i = 0; i < 5; i++) await frame();
          let count = { removed: 0, other: 0 };
          const tally = (ms) => {
            for (const m of ms) m.type === "childList" ? (count.removed += m.removedNodes.length) : count.other++;
          };
          const mo = new MutationObserver(tally);
          mo.observe(card.shadowRoot, { subtree: true, childList: true, attributes: true, characterData: true });
          const heights = new Set();
          let on = true;
          (async () => {
            while (on) {
              heights.add(Math.round(card.getBoundingClientRect().height));
              await frame();
            }
          })();
          const settle = async () => {
            for (let i = 0; i < 3; i++) await frame();
            tally(mo.takeRecords());
            const c = count;
            count = { removed: 0, other: 0 };
            return c;
          };
          const unrelated = [];
          const own = [];
          for (const [id, state] of CHANGES) {
            s = { ...s, "sensor.unrelated": { entity_id: "sensor.unrelated", state: String(Math.random()), attributes: {} } };
            card.hass = hassOf(s);
            unrelated.push(await settle());
            s = { ...s, [id]: { ...s[id], state } };
            card.hass = hassOf(s);
            own.push(await settle());
          }
          on = false;
          mo.disconnect();
          return { unrelated, own, heights: [...heights] };
        },
        { type, extra, data: { states, entities, devices }, CHANGES },
      );
      assert.deepEqual(r.unrelated, CHANGES.map(() => ({ removed: 0, other: 0 })), "an unrelated update mutated the card");
      assert.ok(r.own.some((c) => c.other), "the card's own updates were not shown");
      assert.deepEqual(r.own.map((c) => c.removed), CHANGES.map(() => 0), "an update replaced nodes instead of patching them");
      assert.equal(r.heights.length, 1, `the height changed: ${r.heights}`);
    } finally {
      await page.close();
    }
  });
}
