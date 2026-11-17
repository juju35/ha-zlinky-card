// The status pill's place (zlPlacePill), on a stub of the header: beside the whole title when the whole title and the
// whole label fit on the row; else on its own line under the subtitle; else, when its label is still cut there or the
// text block runs over the banner's ground strip, its dot alone.
import assert from "node:assert/strict";
import { test } from "node:test";
import { loadCard } from "./load.mjs";

const { zlPlacePill } = loadCard("zlinky-card.js", ["zlPlacePill"], { getComputedStyle: () => ({ columnGap: "8px", display: "block" }) });

// Widths in px: the title's whole text, the pill, the row; the text block's bottom once the pill is on its own line,
// the ground strip's top (null: the classic header), the label cut or not there.
function placed({ title, pill, row, cut = false, bottom = 60, ground = 80 }) {
  const attrs = new Set();
  const rect = (o) => ({ getBoundingClientRect: () => ({ top: 0, bottom: 0, width: 0, ...o }) });
  const text = {
    ...rect({ width: pill - 20 }),
    get scrollWidth() {
      return cut && attrs.has("data-wrap") ? 100 : 50;
    },
    clientWidth: 50,
  };
  const chip = { ...rect({ width: pill }), querySelector: () => text };
  const name = { ...rect({ width: Math.min(title, row - pill) }), scrollWidth: title, clientWidth: Math.min(title, row - pill) };
  const head = { ...rect({ top: 0 }), setAttribute: (a) => attrs.add(a), removeAttribute: (a) => attrs.delete(a) };
  const rowEl = {
    ...rect({ width: row }),
    querySelector: (s) => (s.includes(".st") ? chip : name),
    parentElement: { getBoundingClientRect: () => ({ top: 10, bottom: attrs.has("data-wrap") ? bottom : 40 }) },
  };
  zlPlacePill(head, rowEl, ground == null ? null : rect({ top: ground }));
  return [...attrs].sort().join(" ");
}

test("status pill place: beside the whole title, else under the subtitle, else its dot alone", () => {
  // Whole title (100) + gap (8) + whole pill (60) fit a 200 px row: on the title row
  assert.equal(placed({ title: 100, pill: 60, row: 200 }), "");
  // A pixel short: on its own line, whatever the language's label length
  assert.equal(placed({ title: 133, pill: 60, row: 200 }), "data-wrap");
  // On its own line its label is still cut: the dot alone, back on the title row
  assert.equal(placed({ title: 300, pill: 60, row: 200, cut: true }), "data-dot");
  // On its own line the text block runs over the ground strip: the dot alone
  assert.equal(placed({ title: 300, pill: 60, row: 200, bottom: 85, ground: 80 }), "data-dot");
  // The classic header (no ground strip) keeps it on its own line
  assert.equal(placed({ title: 300, pill: 60, row: 200, bottom: 85, ground: null }), "data-wrap");
});
