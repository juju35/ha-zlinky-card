# Changelog

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
