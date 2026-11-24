// Entry point: the card's modules in their original order. scripts/bundle.mjs concatenates them in this order into the
// single classic script the card ships as.
import "./card-picker.js";
import "./i18n/zli18n.js";
import "./i18n-helpers.js";
import "./entity-discovery.js";
import "./dom-patching.js";
import "./artwork.js";
import "./illustrated-header.js";
import "./formatting.js";
import "./base-card.js";
import "./mini-card.js";
import "./zlinky-card-editor.js";
