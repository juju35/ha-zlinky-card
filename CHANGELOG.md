# Changelog

## 1.11.0 - 2026-11-10

### Features
- **Three-phase, apparent power per phase** ([#43](https://github.com/juju35/ha-zlinky-card/issues/43), suggested by @FredM67): with the standard TIC's SINSTS1/2/3, the phase rows show each phase's apparent power in VA and the gauge measures it against a third of the subscribed power, as the meter does, instead of the current converted at a fixed 230 V. New overridable entities `apparent_power_a`, `apparent_power_b`, `apparent_power_c`, detected from `_sinsts1|2|3` (and ZHA's phase B / C apparent power). Without the three of them (historic TIC, ZHA) the rows stay in amperes.

### Improvements
- Currents read in whole amperes, as the meter reports them (IRMS, IINST); one decimal only when the source has one.
- Three-phase: the hero's current and voltage chips are labelled *L1*, since they are phase 1's (IRMS1, URMS1), not totals.

## 1.10.2 - 2026-11-09

### Improvements
- Contract comparison: when Base and Off-peak / Peak are less than 2 % apart, the verdict reads *About the same: €4.56 apart* instead of naming a winner over a few euros a year.

## 1.10.1 - 2026-11-09

### Maintenance
- No code change: released again to check the installation from the Marketplace.

## 1.10.0 - 2026-11-09

### Features
- **Contract comparison**: with both contracts' prices and your off-peak hours (`compare_base`, `compare_hc`, `compare_hp`, `hc_hours`, and optionally the monthly `sub_base` / `sub_hchp`), the full card prices your last 12 months of hourly consumption as Base and as Off-peak / Peak, and says which one saves how much, with the share of your consumption in off-peak hours. One hourly statistics query every 6 hours; hours read in Home Assistant's time zone.

## 1.9.1 - 2026-11-09

### Fixes
- Translations: the cards are defined once the page's language file has arrived (at most 1.5 s; Home Assistant builds a card when its element gets defined), so the first render is already translated instead of English then redrawn; until a language file is in, a missing text reads the English one wherever the card has no fallback of its own.

## 1.9.0 - 2026-11-09

### Performance
- **Translations load on demand**: the bundle keeps English only (134 KB → 72 KB) and each other language is its own `zlinky-card.i18n.<lang>.js` file next to it, fetched the first time a card needs it. Home Assistant loads every dashboard resource on every dashboard, so each page used to download and parse all 22 languages to use one. Until a language file has arrived (a few milliseconds), texts fall back to English, and the cards redraw once it is there.

### Maintenance
- Build: `scripts/i18n-split.mjs` splits the built bundle and rebuilds every table from the split files to check them (the build fails on any difference); `src/` keeps every language as before.
- Release: every file of `dist/` is attached. Manual installation copies the translation files too.

## 1.8.1 - 2026-11-09

### Fixes
- **Historic TIC, three-phase** ([#5](https://github.com/juju35/ha-zlinky-card/issues/5)): the phase section now shows the three phases' currents when the meter gives no voltage per phase (Zigbee2MQTT `IINST1` / `IINST2` / `IINST3`), instead of staying hidden; a single-phase meter whose phase B / C sensors read 0 V still shows none.
- **24 h curve without statistics**: when the power sensor has no long-term statistics (no `state_class`, as the `PAPP` of some Zigbee2MQTT setups), the curve and its peak are built from the recorder's state history, in the same 5-minute steps, instead of not showing.

### Maintenance
- Tests: historic three-phase meter (Zigbee2MQTT), the history fallback of the curve and its peak, no history query when the statistics give a curve.

## 1.8.0 - 2026-11-08

### What's new
- The mini card shows today's and tomorrow's Tempo colors as two dots (with `show_tempo`), each opening its sensor.
- `load_warning` and `load_critical` set the load gauge's moderate and high thresholds (50 % and 80 % of the subscribed power by default), also in the visual editor.

### Fixes
- The 24 h curve's "max" is now the highest reading of the day, read from the recorder's 5-minute maximums, instead of the highest 5-minute mean.

## 1.7.0 - 2026-11-07

### What's new
- `subscribed_power` also takes a sensor giving the subscribed power (in kVA, or in A like the historic TIC's `ISOUSC`), with a **Subscribed power sensor** entity picker in the visual editor.

### Fixes
- The 24 h curve now uses a real time axis over the last 24 hours and breaks the line where the recorder has no data for more than 10 minutes, instead of spreading the points evenly and joining them across gaps.
- With one price per tier but no statistics for the tiers, yesterday's and this month's tiles no longer show a cost priced at the current tier's price.
- The mini card's header icon keeps its 40 px badge, like the other mini cards.

## 1.6.0 - 2026-11-07

### What's new
- Price per tier: `price` takes one price per tier (off-peak / peak, the 6 Tempo tiers, EJP) or a sensor giving the price per kWh, alone or in the list. The costs of today, yesterday and this month (full and mini card) add up each tier's kWh × its price; with only the total index, they use the current tier's price. The visual editor gets a **Price per tier** field.

## 1.5.0 - 2026-11-07

### Features
- Tempo contract: today's color (read from the tariff period, `HPJB`, `HP BLEU`…) and tomorrow's (`DEMAIN`, *Not known yet* until it is announced) under the live power. `entities.tempo` / `entities.tomorrow` take any sensor naming a color (an RTE Tempo integration), `show_tempo: false` hides them (also in the visual editor).

## 1.4.8 - 2026-11-04

### Documentation
- README: images and links use absolute URLs, so the screenshots, icons, badges and links display in HACS (relative paths broke there).
- README: screenshots get a display size, so cards no longer show oversized in HACS and on GitHub.

## 1.4.7 - 2026-11-04
### Features
- Added Romanian, Danish, Swedish, Bulgarian, Russian, Ukrainian, Hungarian, Slovak, Czech, Slovenian, Latvian and Greek translations of both cards and the visual editor; the editor's language option now offers Română (`ro`), Dansk (`da`), Svenska (`sv`), Български (`bg`), Русский (`ru`), Українська (`uk`), Magyar (`hu`), Slovenčina (`sk`), Čeština (`cs`), Slovenščina (`sl`), Latviešu (`lv`) and Ελληνικά (`el`). Regional variants such as `ro-RO`, `sv-SE` or `el-GR` pick them automatically.

## 1.4.6 - 2026-11-01
### Fixes
- Mini card on a phone (6 columns, about 156 to 186 px): the live reading no longer runs past the card's edge, the meter gets smaller, today's line wraps instead of cutting off the cost, and the status pill keeps its colored dot with the status in its tooltip.
- Narrow full card: the consumption tiles put their unit under the value and let their label wrap instead of overflowing; the full card now needs 9 columns at least in the Sections view (6 columns left too little room for the meter, the reading and the three tiles).
- The status pill stays on the title's line (it sat between the title and the subtitle), keeps its whole label while the title still has room ("Moderate load" no longer turns into "Mod…" next to a long name) and, on the narrowest mini card, keeps a round, uncut dot.
- Inside layout-card, button-card or any parent that sizes the card to its content, the card no longer collapses to a thin strip: it takes its usual width (and still shrinks to fit a two-column grid or a horizontal stack).
- A ZLinky on which none of the meter's sensors is recognised now says "No ZLinky sensor found" and points to **Entities (advanced)**, instead of showing the meter "Offline".
- The 24 h curve's title no longer capitalises the hour symbol ("LAST 24 h", not "LAST 24 H").
- The keyboard focus ring follows the round detail button and the chips; opening or closing the mini card's detail from the keyboard no longer scrolls the page to the button.
- Visual editor: the **Icon** field now explains that it replaces the meter illustration (all languages).

## 1.4.5 - 2026-11-01
### Features
- Added Italian, Dutch, European Portuguese and Polish translations of both cards and the visual editor; the editor's language option now offers Italiano (`it`), Nederlands (`nl`), Português (Portugal) (`pt`) and Polski (`pl`). Regional variants such as `it-IT`, `nl-BE`, `pt-BR` or `pl-PL` pick them automatically (`pt-BR` uses the European Portuguese texts, with Home Assistant's number and currency format).

## 1.4.4 - 2026-11-01
### Features
- Added Serbian (Cyrillic and Latin) translations of both cards and the visual editor; the editor's language option now offers Српски (`sr`) and Srpski (latinica) (`sr-Latn`), and `sr-Latn` is picked automatically when Home Assistant uses it.

## 1.4.3 - 2026-11-01
### Fixes
- Better contrast in the light theme: the cost under each consumption tile and the load status text ("Low load", "High load"…) are now easy to read; the status dot and badge keep the load color.
- With "reduce motion" enabled in the system settings, the load and phase gauges no longer animate (the meter's LED already stopped blinking).
- The card's in-place updates no longer touch the content of the icon elements it contains (no visible change in Home Assistant, where icons draw in their own shadow DOM; the README screenshots got their icons back).

## 1.4.2 - 2026-10-29
### Fixes
- Visual editor: the device field now shows its translated label ("ZLinky") and help text instead of "ed_device_id".
- Mini card: `show_stats: false` now hides today's consumption on the folded card, and the recorder is no longer queried for it.

## 1.4.1 - 2026-10-29
### Fixes
- Discovery: entities renamed by Home Assistant with a `_2` / `_3` suffix (re-paired ZLinky, second ZLinky) are found again; on Zigbee2MQTT the card could show "Offline" with no values.
- The card now updates its content in place: the meter's LED no longer restarts its blink on every power reading, the load and phase gauges animate, and the keyboard focus stays on the selected value.
- An entity that only gets its state after the card first loads (Home Assistant still starting) is now picked up without waiting for a registry change.
- When only part of the recorder statistics fails to load, the other consumption tiles keep their previous values instead of showing "—".
- After a config change, a statistics reply for the previous config no longer briefly shows the old values.
- German: the tariff indexes are consistently called "Zählwerk" (the total stays "Zählerstand").
- Without a `device_id`, the ZLinky lookup is no longer repeated on every state update.

### Documentation
- README: Translations table.

## 1.4.0 - 2026-10-28
### Features
- German and Spanish translations of both cards and the visual editor; the editor's language option now offers Deutsch and Español.

## 1.3.0 - 2026-10-28
### Features
- Visual editor: the `tiers` option (names of the meter indexes) can now be set from the editor, as a multiple text field; it is dropped from the config when left empty.

### Fixes
- The 24 h power curve is only fetched from the recorder when the graph is shown (not with `show_graph: false`, nor while the mini card is folded); unfolding the mini card loads it immediately.
- Entity role matching is cached and only recomputed when the entity registry, the device or the config changes, instead of on every Home Assistant state update.
- After a failed recorder call, the consumption tiles retry after about 30 s instead of showing a dash for the whole 5 min refresh window.
- The main power value is no longer a clickable more-info button when no power entity is resolved.

### Documentation
- README: live animation GIFs (normal and high load), HACS "Dashboard" category naming, note on the Zigbee2MQTT EASF07-EASF10 distributor indexes not covered by `tier1`-`tier6`.

## 1.2.0 - 2026-10-26
### Fixes
- Visual editor: the device picker only listed devices from the "LiXee" manufacturer, so ZLinky_TIC meters exposed through Zigbee2MQTT (which often lack that manufacturer but carry the `ZLinky_TIC` model) were missing from the dropdown. A second filter on the model is added, so both LiXee and Zigbee2MQTT ZLinky devices now appear. No impact on automatic discovery.

## 1.1.0
### Changes
- Header icon: the drawn Linky tile is replaced by an electric meter icon in a round badge tinted with the load color, like the other cards (40 px, 32 px on the mini card). `show_logo: false` still hides it.
- The Last 24 h and Phases section titles have a leading 16 px icon, like the other cards' section titles; the peak ("max 2,405 VA") stays on the right.
- The main power value is 30 px (was 32 px), like the other cards' main value; 24 px on the mini card as before.
- Header geometry: the body starts 8 px under the header (was 12 px); badge 12 px from the top and left edges, status pill 12 px from the right edge (detail button 8 px on the mini card).

## 1.0.0

### Features
- First release: `zlinky-card` and its compact version `zlinky-mini-card` for the LiXee ZLinky_TIC (ZHA or Zigbee2MQTT).
- Automatic discovery of the meter and its entities, each one can be overridden.
- Live apparent / active power, current and voltage, load gauge against the subscribed power.
- Today, yesterday and this month's consumption from the recorder statistics, with an optional cost per kWh.
- 24 h power curve, meter index with the tiers in use (named with `tiers`), injection index, three-phase details.
- Animated Linky meter illustration whose screen shows the live power and whose LED blinks with the load.
- Visual editor, English and French, light and dark themes.
