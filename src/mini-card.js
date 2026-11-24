// ── Mini card ────────────────────────────────────────────────────────────────
// A full card drawn compact, like the other ha-* mini cards: its detail button (top right, `zoom: false`
// removes it) switches it to the full card and back, and a click anywhere else on the page folds it again.
import { zlEsc } from "./i18n-helpers.js";
import { ZlinkyCard } from "./base-card.js";

export var zlInDialog = (ev) => ev.composedPath().some((n) => ['ha-more-info-dialog', 'ha-dialog', 'dialog'].indexOf(n.localName) >= 0);

// "A click elsewhere" is caught on the pointer, not only on the click event: on iOS (Safari and the companion app) a
// tap on something that is not clickable (the background, an empty spot, a card with no action) sends no click to the
// page. It counts when the press and the release are both outside the card (a drag that ends outside does not fold
// it), and a scroll does not count (the browser cancels the pointer). Keyboard clicks still go through the click
// event (detail 0). `tap(ev)` (a press and a release at the same spot) is for the tests.
export var zlWatchOutside = (isOut, handler) => {
  var downOutside = false;
  var onDown = (ev) => { downOutside = isOut(ev); };
  var onUp = (ev) => {
    if (downOutside && isOut(ev)) handler(ev);
    downOutside = false;
  };
  var onClick = (ev) => { if (ev.detail === 0 && isOut(ev)) handler(ev); };
  return {
    on() {
      document.addEventListener('pointerdown', onDown, true);
      document.addEventListener('pointerup', onUp, true);
      document.addEventListener('click', onClick, true);
    },
    tap(ev) { onDown(ev); onUp(ev); },
    off() {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('pointerup', onUp, true);
      document.removeEventListener('click', onClick, true);
    },
  };
};

export class ZlinkyMiniCard extends ZlinkyCard {
  static getConfigElement() {
    var el = ZlinkyCard.getConfigElement();
    el.mini = true;
    return el;
  }

  constructor() {
    super();
    this._outside = zlWatchOutside(
      (ev) => !ev.composedPath().includes(this) && !zlInDialog(ev),
      () => { if (this._zoomed) this._setZoom(false); },
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this._outside.on();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._outside.off();
    // Back to the compact view once off the page (another view, a conditional card hidden), as the other mini cards.
    this._zoomed = false;
    this._sig = null;
  }

  getCardSize() { return this._zoomed ? super.getCardSize() : 2; }

  getGridOptions() { return this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 6 }; }

  _compact() { return !this._zoomed; }

  _zoomButton() {
    if (this._config.zoom === false) return '';
    var z = !!this._zoomed;
    var label = zlEsc(this._t(z ? 'zoom_out' : 'zoom_in'));
    return `<button class="zoom" data-action="zoom" title="${label}" aria-label="${label}"><ha-icon icon="${z ? 'mdi:arrow-collapse' : 'mdi:arrow-expand'}"></ha-icon></button>`;
  }

  _setZoom(on) {
    this._zoomed = on;
    this._update();
  }

  // From the keyboard (Enter / Space: no click count), the focus follows to the button that replaced this one.
  _toggleZoom(ev) {
    this._setZoom(!this._zoomed);
    // preventScroll: the card changes height, the page must not jump to the button.
    if (ev.detail === 0) this.shadowRoot.querySelector('.zoom')?.focus({ preventScroll: true });
  }
}
