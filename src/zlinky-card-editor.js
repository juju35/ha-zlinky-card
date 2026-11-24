// ── zlinky-card-editor (visual editor, built on HA's ha-form) ────────────────
// A price the number field cannot show: a list (one per tier) or an entity id.
import { ZLINKY_CARD_VERSION, pickerDefine } from "./card-picker.js";
import { zlLang, zlT } from "./i18n-helpers.js";
import { ZL_OVERRIDABLE, ZL_ROLES } from "./entity-discovery.js";
import { ZL_LOAD_CRITICAL, ZL_LOAD_WARNING } from "./formatting.js";
import { ZlinkyCard } from "./base-card.js";
import { ZlinkyMiniCard } from "./mini-card.js";

export function zlPriceList(price) {
  return Array.isArray(price) || typeof price === 'string';
}

export var ZL_EDITOR_DEFAULTS = { show_load_pill: true, show_title: true, show_subtitle: true, show_graph: true, show_stats: true, show_index: true, show_phases: true, show_logo: true, show_tempo: true, show_cost: true, zoom: true, tarif_edf: false, meter_size: 100, illustration: true, illustration_theme: 'auto',
  load_warning: ZL_LOAD_WARNING, load_critical: ZL_LOAD_CRITICAL };

export class ZlinkyCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    var prevLang = this._hass?.language;
    this._hass = hass;
    if (this._form && prevLang === (hass?.language)) {
      this._form.hass = hass;
    } else {
      this._render();
    }
  }

  _lang() {
    return zlLang((this._config?.language) || (this._hass?.language) || 'en');
  }

  _schema() {
    var t = (k) => zlT(this._lang(), k);
    var mini = this.mini || /-mini-card$/.test(this._config.type || '');
    return [
      { name: 'device_id', selector: { device: { filter: [{ manufacturer: 'LiXee' }, { model: 'ZLinky_TIC' }] } } },
      // HA Linky (no ZLinky): the PRM whose statistics the app imports.
      { name: 'linky_prm', selector: { text: {} } },
      {
        type: 'grid', name: '', schema: [
          { name: 'name', selector: { text: {} } },
          { name: 'icon', selector: { icon: {} } },
        ].concat(typeof this._config.subscribed_power === 'string' ? []
          : [{ name: 'subscribed_power', selector: { number: { min: 3, max: 36, step: 1, mode: 'box', unit_of_measurement: 'kVA' } } }])
          .concat(zlPriceList(this._config.price) ? [] : [{ name: 'price', selector: { number: { min: 0, max: 2, step: 0.0001, mode: 'box' } } }])
          // A sensor as the subscription stays YAML only.
          .concat(typeof this._config.subscription === 'string' ? [] : [{ name: 'subscription', selector: { number: { min: 0, max: 200, step: 0.01, mode: 'box' } } }]),
      },
      // Prices, subscribed power and Tempo colors from the Tarif EDF integration.
      { name: 'tarif_edf', selector: { boolean: {} } },
      // A sensor as the subscribed power. Editor-only field, written back to `subscribed_power`.
      { name: 'subscribed_power_entity', selector: { entity: { domain: ['sensor', 'input_number', 'number'] } } },
      {
        type: 'grid', name: '', schema: ['load_warning', 'load_critical']
          .map((name) => ({ name, selector: { number: { min: 0, max: 100, step: 1, mode: 'box', unit_of_measurement: '%' } } })),
      },
      { name: 'tiers', selector: { text: { multiple: true } } },
      // One price per tier: `price` as a list. Editor-only field, written back to `price`.
      { name: 'prices', selector: { text: { multiple: true } } },
      {
        type: 'grid', name: '', schema: [
          { name: 'show_title', selector: { boolean: {} } },
          { name: 'show_subtitle', selector: { boolean: {} } },
          { name: 'show_stats', selector: { boolean: {} } },
          { name: 'show_graph', selector: { boolean: {} } },
          { name: 'show_index', selector: { boolean: {} } },
          { name: 'show_phases', selector: { boolean: {} } },
          { name: 'show_logo', selector: { boolean: {} } },
          { name: 'show_tempo', selector: { boolean: {} } },
          { name: 'show_cost', selector: { boolean: {} } },
          { name: 'show_load_pill', selector: { boolean: {} } },
        ].concat(mini ? [{ name: 'zoom', selector: { boolean: {} } }] : []),
      },
      // Illustrated header (both cards): the meter in its panel on a banner, day or night.
      {
        type: 'grid', name: '', schema: [
          { name: 'illustration', selector: { boolean: {} } },
          { name: 'illustration_theme', selector: { select: { mode: 'dropdown', options: ['auto', 'day', 'night'].map((v) => ({ value: v, label: t(`theme_${v}`) })) } } },
        ],
      },
      // Free label for the apparent-power unit (empty = VA); only the unit shown changes, not the value.
      { name: 'power_unit', selector: { text: {} } },
      // Meter illustration size as a percentage of its default (100 = default).
      { name: 'meter_size', selector: { number: { min: 50, max: 250, step: 5, mode: 'slider', unit_of_measurement: '%' } } },
      {
        name: 'language',
        selector: { select: { mode: 'dropdown', options: [{ value: 'fr', label: 'Français' }, { value: 'en', label: 'English' }, { value: 'de', label: 'Deutsch' }, { value: 'es', label: 'Español' }, { value: 'sr', label: 'Српски' }, { value: 'sr-Latn', label: 'Srpski (latinica)' }, { value: 'it', label: 'Italiano' }, { value: 'nl', label: 'Nederlands' }, { value: 'pt', label: 'Português (Portugal)' }, { value: 'pl', label: 'Polski' }, { value: 'ro', label: 'Română' }, { value: 'da', label: 'Dansk' }, { value: 'sv', label: 'Svenska' }, { value: 'bg', label: 'Български' }, { value: 'ru', label: 'Русский' }, { value: 'uk', label: 'Українська' }, { value: 'hu', label: 'Magyar' }, { value: 'sk', label: 'Slovenčina' }, { value: 'cs', label: 'Čeština' }, { value: 'sl', label: 'Slovenščina' }, { value: 'lv', label: 'Latviešu' }, { value: 'el', label: 'Ελληνικά' }] } },
      },
      // Contract comparison (full card): the prices of both contracts and the off-peak hours.
      {
        type: 'expandable', name: 'compare', title: t('ed_compare'), flatten: true,
        schema: [
          {
            type: 'grid', name: '', schema: ['compare_base', 'compare_hc', 'compare_hp']
              .map((name) => ({ name, selector: { number: { min: 0, max: 2, step: 0.0001, mode: 'box' } } })),
          },
          { name: 'hc_hours', selector: { text: {} } },
          {
            type: 'grid', name: '', schema: ['sub_base', 'sub_hchp']
              .map((name) => ({ name, selector: { number: { min: 0, max: 200, step: 0.01, mode: 'box' } } })),
          },
        ],
      },
      {
        type: 'expandable', name: 'entities', title: t('ed_entities'), flatten: false,
        schema: ZL_OVERRIDABLE.map((r) => ({ name: r, selector: { entity: { domain: 'sensor' } } })),
      },
    ];
  }

  _render() {
    if (!this._config || !this._hass) return;
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.addEventListener('value-changed', (ev) => this._valueChanged(ev));
      this.appendChild(this._form);
    }
    var lang = this._lang();
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.computeLabel = (s) => (ZL_ROLES[s.name] ? zlT(lang, `en_${s.name}`) : zlT(lang, `ed_${s.name}`));
    this._form.computeHelper = (s) => {
      var key = `ed_${s.name}_helper`;
      var txt = zlT(lang, key);
      return txt === key ? undefined : txt;
    };
    var price = this._config.price;
    var sp = this._config.subscribed_power;
    this._form.data = Object.assign({}, ZL_EDITOR_DEFAULTS, this._config,
      { prices: zlPriceList(price) ? [].concat(price).map(String) : [], subscribed_power_entity: typeof sp === 'string' ? sp : '' });
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left empty or at their default.
    Object.keys(value).forEach((key) => {
      if (value[key] === '' || value[key] === null || value[key] === undefined) delete value[key];
    });
    if (Array.isArray(value.tiers) && !value.tiers.filter((t) => t).length) delete value.tiers;
    // The per-tier prices replace the single price; numbers stay numbers ("0,2146" too), entity ids strings.
    var prices = (value.prices || []).map((x) => String(x).trim()).filter((x) => x)
      .map((x) => (Number.isFinite(Number(x.replace(',', '.'))) ? Number(x.replace(',', '.')) : x));
    delete value.prices;
    if (prices.length) value.price = prices;
    else if (zlPriceList(value.price)) delete value.price;
    // The subscribed power sensor replaces the number (and back).
    var spEntity = value.subscribed_power_entity;
    delete value.subscribed_power_entity;
    if (spEntity) value.subscribed_power = spEntity;
    else if (typeof value.subscribed_power === 'string') delete value.subscribed_power;
    Object.keys(ZL_EDITOR_DEFAULTS).forEach((key) => {
      if (value[key] === ZL_EDITOR_DEFAULTS[key]) delete value[key];
    });
    if (value.entities) {
      var e = Object.assign({}, value.entities);
      Object.keys(e).forEach((k) => { if (!e[k]) delete e[k]; });
      if (Object.keys(e).length) value.entities = e; else delete value.entities;
    }
    if (this._config.type) value = Object.assign({ type: this._config.type }, value);
    var lang = this._lang();
    var wasList = zlPriceList(this._config.price);
    var wasSensor = typeof this._config.subscribed_power === 'string';
    var wasSubSensor = typeof this._config.subscription === 'string';
    this._config = value;
    // A new language option relabels the form; per-tier prices hide the single price field, a subscribed power
    // sensor the number field (and back).
    if (lang !== this._lang() || wasList !== zlPriceList(value.price) || wasSensor !== (typeof value.subscribed_power === 'string')
      || wasSubSensor !== (typeof value.subscription === 'string')) this._render();
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('zlinky-card-editor')) {
  pickerDefine('zlinky-card-editor', ZlinkyCardEditor);
}

window.customCards = window.customCards || [];
[
  ['zlinky-card', ZlinkyCard, 'ZLinky Card', 'Linky smart meter card for the LiXee ZLinky_TIC (ZHA or Zigbee2MQTT)'],
  ['zlinky-mini-card', ZlinkyMiniCard, 'ZLinky Mini Card', 'Compact Linky card that unfolds into the full card'],
].forEach(([type, cls, name, description]) => {
  if (customElements.get(type)) return;
  pickerDefine(type, cls);
  window.customCards.push({ type, name, description, preview: true, documentationURL: 'https://github.com/juju35/ha-zlinky-card' });
});

console.info(`%c ZLINKY-CARD %c v${ZLINKY_CARD_VERSION} `, 'color:#3d4a08;background:#c2d426;font-weight:700', 'color:#7d9108;background:#fff');
