# Changelog

## 1.4.4 - 2026-11-01
### Features
- Added Serbian (Cyrillic and Latin) translations of both cards and the visual editor; the editor's language option now offers Српски (`sr`) and Srpski (latinica) (`sr-Latn`), and `sr-Latn` is picked automatically when Home Assistant uses it.

## 1.4.3 - 2026-10-29
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
