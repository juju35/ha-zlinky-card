// Renders the card with mock data and saves the README screenshots.
// Usage: npm run build && npm run screenshots
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
// Fixed clock and time zone: the 24 h curve in the captures does not depend on when they are taken.
const NOW = Date.parse("2026-10-24T18:44:00Z");
const cardJs = readFileSync(`${root}dist/zlinky-card.js`, "utf8");

const THEMES = {
  light: {
    "--primary-background-color": "#e8eaed",
    "--secondary-background-color": "#ececec",
    "--card-background-color": "#ffffff",
    "--primary-text-color": "#212121",
    "--secondary-text-color": "#727272",
    "--divider-color": "rgba(0,0,0,.12)",
  },
  dark: {
    "--primary-background-color": "#111111",
    "--secondary-background-color": "#282828",
    "--card-background-color": "#1c1c1c",
    "--primary-text-color": "#e1e1e1",
    "--secondary-text-color": "#9b9b9b",
    "--divider-color": "rgba(225,225,225,.12)",
  },
};
const COMMON = {
  "--primary-color": "#03a9f4",
  "--info-color": "#039be5",
  "--success-color": "#43a047",
  "--warning-color": "#ffa600",
  "--error-color": "#db4437",
  "--text-primary-color": "#ffffff",
};

// Minimal stand-ins for Home Assistant's <ha-card> and <ha-icon> (Material Design Icons paths below).
const haElements = (icons) => `
const ICONS = ${JSON.stringify(icons)};
customElements.define("ha-card", class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML =
      "<style>:host{display:block;background:var(--card-background-color);border-radius:12px;" +
      "border:1px solid var(--divider-color);color:var(--primary-text-color);overflow:hidden}</style><slot></slot>";
  }
});
customElements.define("ha-icon", class extends HTMLElement {
  static get observedAttributes() { return ["icon"]; }
  connectedCallback() { this._draw(); }
  attributeChangedCallback() { this._draw(); }
  // Draws in its own shadow root, as the real (Lit) ha-icon does: the card's DOM patching never sees the <svg>.
  _draw() {
    const path = ICONS[(this.getAttribute("icon") || "").replace("mdi:", "")] || "";
    this.style.display = "inline-flex";
    (this.shadowRoot || this.attachShadow({ mode: "open" })).innerHTML = '<svg viewBox="0 0 24 24" style="width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);fill:currentColor"><path d="' + path + '"/></svg>';
  }
});`;

const pageHtml = (theme, width) => `<!doctype html><html><head><meta charset="utf-8">
<style>
  :root { ${Object.entries({ ...THEMES[theme], ...COMMON }).map(([k, v]) => `${k}:${v};`).join("")} }
  body { margin: 0; padding: 16px; background: var(--primary-background-color); color: var(--primary-text-color);
         font-family: Roboto, "Segoe UI", Helvetica, Arial, sans-serif; width: ${width}px; }
</style></head><body><div id="root"></div></body></html>`;

// Opens one shot { file, type, theme, width, config, hass?, after? } in a fresh page and returns it.
// A fresh page per shot: re-running the scripts in the same realm would redeclare their globals.
async function openCard(browser, s, { icons = {}, hass = {}, extra = "" }) {
  const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1000, height: 2000 }, timezoneId: "UTC" });
  page.on("pageerror", (err) => console.error(`${s.file}: ${err.message}`));
  await page.clock.setFixedTime(NOW);
  await page.setContent(pageHtml(s.theme, s.width));
  await page.addScriptTag({ content: haElements(icons) + extra });
  await page.addScriptTag({ content: cardJs });
  await page.evaluate(
    ({ type, config, hass, dark }) => {
      const el = document.createElement(type);
      el.setConfig({ type: `custom:${type}`, ...config });
      el.hass = { states: {}, entities: {}, devices: {}, language: "en", locale: { language: "en" },
                  themes: { darkMode: dark }, callService: async () => {}, callWS: async () => ({}), ...hass, ...(window.__ws ? { callWS: window.__ws } : {}) };
      document.getElementById("root").appendChild(el);
    },
    { type: s.type, config: s.config || {}, hass: { ...hass, ...(s.hass || {}) }, dark: s.theme === "dark" }
  );
  if (s.after) await s.after(page);
  return page;
}

// Renders each shot { file, type, theme, width, config, hass?, after? } into screenshots/<file>.png.
// extra: more stand-in elements, as script source.
export async function render(shots, { icons = {}, hass = {}, extra = "" } = {}) {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of shots) {
    const page = await openCard(browser, s, { icons, hass, extra });
    await page.waitForTimeout(400);
    // The card plus the 16px page padding around it, on the theme background.
    const box = await page.locator("#root").boundingBox();
    await page.screenshot({
      path: `${root}screenshots/${s.file}.png`,
      clip: { x: 0, y: 0, width: s.width + 32, height: Math.ceil(box.height) + 32 },
      animations: "disabled",
    });
    console.log(`screenshots/${s.file}.png`);
    await page.close();
  }
  await browser.close();
}

// Records one shot as a looping GIF (screenshots/<file>.gif) — needs ffmpeg on PATH. Every animation is paused and
// stepped frame by frame, so the GIF is identical whatever the machine's speed.
export async function animate(shot, { icons = {}, hass = {}, extra = "", fps = 20, seconds = 3 } = {}) {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await openCard(browser, shot, { icons, hass, extra });
  await page.waitForTimeout(300);
  const box = await page.locator("#root").boundingBox();
  const clip = { x: 0, y: 0, width: shot.width + 32, height: Math.ceil(box.height) + 32 };
  const dir = mkdtempSync(join(tmpdir(), "zl-frames-"));
  const frames = Math.round(fps * seconds);
  for (let i = 0; i < frames; i++) {
    // document.getAnimations() does not see the card's shadow DOM: collect the animations of every shadow root, so
    // they are really paused and stepped (otherwise each frame catches them at wall-clock time and the GIF changes).
    const stepped = await page.evaluate((t) => {
      const all = [];
      const walk = (r) => {
        all.push(...r.getAnimations());
        for (const el of r.querySelectorAll("*")) if (el.shadowRoot) walk(el.shadowRoot);
      };
      walk(document);
      for (const a of all) { a.pause(); a.currentTime = t; }
      return all.length;
    }, (i * 1000) / fps);
    if (!stepped) throw new Error(`${shot.file}: no animation to record`);
    await page.screenshot({ path: join(dir, `f${String(i).padStart(3, "0")}.png`), clip });
  }
  await browser.close();
  const out = `${root}screenshots/${shot.file}.gif`;
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-framerate", String(fps), "-i", join(dir, "f%03d.png"),
    "-vf", `scale=${clip.width}:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=bayer:bayer_scale=4`,
    "-loop", "0", out,
  ]);
  rmSync(dir, { recursive: true });
  console.log(`screenshots/${shot.file}.gif`);
}

const icons = {
  "flash-outline": "M7,2H17L13.5,9H17L10,22V14H7V2M9,4V12H12V14.66L14,11H10.24L13.76,4H9Z",
  "chart-areaspline": "M17.45,15.18L22,7.31V19L22,21H2V3H4V15.54L9.5,6L16,9.78L20.24,2.45L21.97,3.45L16.74,12.5L10.23,8.75L4.31,19H6.57L10.96,11.44L17.45,15.18Z",
  "transmission-tower": "M8.28,5.45L6.5,4.55L7.76,2H16.23L17.5,4.55L15.72,5.44L15,4H9L8.28,5.45M18.62,8H14.09L13.3,5H10.7L9.91,8H5.38L4.1,10.55L5.89,11.44L6.62,10H17.38L18.1,11.45L19.89,10.56L18.62,8M17.77,22H15.7L15.46,21.1L12,15.9L8.53,21.1L8.3,22H6.23L9.12,11H11.19L10.83,12.35L12,14.1L13.16,12.35L12.81,11H14.88L17.77,22M11.4,15L10.5,13.65L9.32,18.13L11.4,15M14.68,18.12L13.5,13.64L12.6,15L14.68,18.12Z",
  "current-ac": "M12.43 11C12.28 10.84 10 7 7 7S2.32 10.18 2 11V13H11.57C11.72 13.16 14 17 17 17S21.68 13.82 22 13V11H12.43M7 9C8.17 9 9.18 9.85 10 11H4.31C4.78 10.17 5.54 9 7 9M17 15C15.83 15 14.82 14.15 14 13H19.69C19.22 13.83 18.46 15 17 15Z",
  "sine-wave": "M16.5,21C13.5,21 12.31,16.76 11.05,12.28C10.14,9.04 9,5 7.5,5C4.11,5 4,11.93 4,12H2C2,11.63 2.06,3 7.5,3C10.5,3 11.71,7.25 12.97,11.74C13.83,14.8 15,19 16.5,19C19.94,19 20.03,12.07 20.03,12H22.03C22.03,12.37 21.97,21 16.5,21Z",
  "counter": "M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z",
  "calendar-today": "M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z",
  "arrow-expand": "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z",
  "arrow-collapse": "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z",
  "lan-disconnect": "M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M3.88,13.46L2.46,14.88L4.59,17L2.46,19.12L3.88,20.54L6,18.41L8.12,20.54L9.54,19.12L7.41,17L9.54,14.88L8.12,13.46L6,15.59L3.88,13.46M14,15H20V19H14V15Z",
  "meter-electric-outline": "M21 11C21 6.03 16.97 2 12 2S3 6.03 3 11C3 14.92 5.5 18.24 9 19.5V22H11V19.94C11.33 20 11.66 20 12 20S12.67 20 13 19.94V22H15V19.5C18.5 18.24 21 14.92 21 11M12 18C8.14 18 5 14.86 5 11S8.14 4 12 4 19 7.14 19 11 15.86 18 12 18M8 7H16V9H8V7M12.75 10L9.75 13L11 14.25L9.75 15.5L11.25 17L14.25 14L13 12.75L14.25 11.5L12.75 10Z"
};

// Mock ZLinky (ZHA entity IDs), single-phase with two tiers (off-peak / peak hours).
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
const hass = { states, entities, devices, config: { currency: "EUR" } };

// Recorder mock: day / month totals and a plausible 24 h load curve (night base load, morning and evening peaks).
const ws = `window.__ws = async (msg) => {
  if (msg.type === "recorder/statistic_during_period") {
    return { change: msg.calendar.period === "month" ? 286.4 : (msg.calendar.offset === 0 ? 11.8 : 14.3) };
  }
  const now = Date.now(), out = [];
  for (let i = 288; i > 0; i--) {
    const t = now - i * 300000, h = new Date(t).getUTCHours() + new Date(t).getUTCMinutes() / 60;
    const bump = (c, w, a) => a * Math.exp(-((h - c) ** 2) / (2 * w * w));
    const v = 260 + bump(7.5, 0.8, 1400) + bump(12.5, 0.6, 900) + bump(19.5, 1.1, 2100) + 60 * Math.sin(i * 0.9) ** 2;
    out.push({ start: t, mean: v });
  }
  return { [msg.statistic_ids[0]]: out };
};`;

await render(
  [
    { file: "card", type: "zlinky-card", theme: "light", width: 460, config: { price: 0.2016, tiers: ["Off-peak", "Peak"] } },
    { file: "card-dark", type: "zlinky-card", theme: "dark", width: 460, config: { price: 0.2016, tiers: ["Off-peak", "Peak"] } },
    { file: "mini", type: "zlinky-mini-card", theme: "light", width: 380, config: { price: 0.2016 } },
    { file: "mini-dark", type: "zlinky-mini-card", theme: "dark", width: 380, config: { price: 0.2016 } },
  ],
  { icons, hass, extra: ws }
);

// Every animation is recorded in both themes with the same setup: <file>.gif light, <file>-dark.gif dark.
const animateBoth = async (shot, opts) => {
  await animate(shot, opts);
  await animate({ ...shot, file: `${shot.file}-dark`, theme: "dark" }, opts);
};

await animateBoth(
  { file: "live", type: "zlinky-card", theme: "light", width: 460, config: { price: 0.2016, tiers: ["Off-peak", "Peak"] } },
  { icons, hass, extra: ws }
);

// High load: near the subscribed power the gauge turns red and the LED blinks much faster.
const highStates = {
  ...states,
  [`${p}puissance`]: { ...states[`${p}puissance`], state: "5620" },
  [`${p}puissance_apparente`]: { ...states[`${p}puissance_apparente`], state: "5810" },
  [`${p}courant`]: { ...states[`${p}courant`], state: "25" },
};
await animateBoth(
  { file: "live-high", type: "zlinky-card", theme: "light", width: 460,
    config: { price: 0.2016, tiers: ["Off-peak", "Peak"] }, hass: { states: highStates } },
  { icons, hass, extra: ws }
);
