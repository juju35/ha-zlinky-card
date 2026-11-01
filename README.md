# ha-zlinky-card

[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![HACS Validation](https://github.com/juju35/ha-zlinky-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/juju35/ha-zlinky-card/actions/workflows/hacs.yml)
[![Validate](https://github.com/juju35/ha-zlinky-card/actions/workflows/validate.yml/badge.svg)](https://github.com/juju35/ha-zlinky-card/actions/workflows/validate.yml)
[![Release](https://img.shields.io/github/v/release/juju35/ha-zlinky-card)](https://github.com/juju35/ha-zlinky-card/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Custom Lovelace card for the [LiXee ZLinky_TIC](https://lixee.fr/) Zigbee module, which reads the French **Linky** smart meter's TIC output, in Home Assistant (through [ZHA](https://www.home-assistant.io/integrations/zha/) or [Zigbee2MQTT](https://www.zigbee2mqtt.io/devices/ZLinky_TIC.html)).

Pick the ZLinky, the card finds all its entities by itself.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=juju35&repository=ha-zlinky-card&category=plugin)

While the meter is online, the card animates: the LED blinks and glows, faster as power rises. It settles to a still card when offline (and honours `prefers-reduced-motion`).

| | Light | Dark |
|---|---|---|
| Normal load — green gauge, slow LED blink | ![ZLinky card, live meter animation at normal load](https://raw.githubusercontent.com/juju35/ha-zlinky-card/main/screenshots/live.gif) | ![ZLinky card, live meter animation at normal load, dark theme](https://raw.githubusercontent.com/juju35/ha-zlinky-card/main/screenshots/live-dark.gif) |
| High load — red gauge, fast LED blink near the subscribed power | ![ZLinky card, live meter animation at high load](https://raw.githubusercontent.com/juju35/ha-zlinky-card/main/screenshots/live-high.gif) | ![ZLinky card, live meter animation at high load, dark theme](https://raw.githubusercontent.com/juju35/ha-zlinky-card/main/screenshots/live-high-dark.gif) |

| Card | Dark theme |
|---|---|
| ![ZLinky card](https://raw.githubusercontent.com/juju35/ha-zlinky-card/main/screenshots/card.png) | ![ZLinky card, dark theme](https://raw.githubusercontent.com/juju35/ha-zlinky-card/main/screenshots/card-dark.png) |

| Mini card | Mini card, dark theme |
|---|---|
| ![ZLinky mini card](https://raw.githubusercontent.com/juju35/ha-zlinky-card/main/screenshots/mini.png) | ![ZLinky mini card, dark theme](https://raw.githubusercontent.com/juju35/ha-zlinky-card/main/screenshots/mini-dark.png) |

## Features

- Two cards: `zlinky-card` and its mini version `zlinky-mini-card` (compact, a detail button unfolds the full card)
- Automatic discovery of the ZLinky and its entities (ZHA with English or French entity IDs, Zigbee2MQTT TIC labels), each entity can be overridden
- Live apparent power (or active power), with active power, current and voltage
- Load gauge against your subscribed power (kVA), colored green / orange / red
- **Today**, **yesterday** and **this month**'s consumption from Home Assistant's long-term statistics, with the cost when a price per kWh is set
- 24 h power curve with its peak
- Meter index, the tiers in use (off-peak / peak, Tempo… named as you like) and the injection index when you produce
- Three-phase details (current and voltage per phase) on three-phase meters
- An animated Linky meter: its screen shows the live power and its LED blinks faster as the load rises
- Tap any value to open its history
- Visual editor in the dashboard UI (no YAML needed)
- English, French, German, Spanish, Serbian (Cyrillic and Latin), Italian, Dutch, European Portuguese and Polish, follows the Home Assistant language
- Light and dark theme compatible
- Single file, no dependencies, HACS-ready

## Prerequisites

- Home Assistant 2024.8 or later
- A ZLinky_TIC paired with ZHA or Zigbee2MQTT
- The consumption tiles and the curve use the recorder's statistics: the energy and power sensors need a `state_class` (the ZLinky's have one)

## Installation

### Via HACS (recommended)

Click the button below to add the repository directly:

[![Add to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=juju35&repository=ha-zlinky-card&category=plugin)

Or manually:

1. Open HACS → **Dashboard** → **⋮** → **Custom repositories**
2. Add `https://github.com/juju35/ha-zlinky-card` — Category: **Dashboard** (Lovelace)
3. Search for **ZLinky Card** and install it
4. Clear your browser cache and refresh

HACS registers the dashboard resource for you.

### Manual

1. Download `zlinky-card.js` from the [latest release](https://github.com/juju35/ha-zlinky-card/releases/latest)
2. Copy it to `/config/www/zlinky-card.js`
3. Go to **Settings → Dashboards → Resources** → Add resource:
   - URL: `/local/zlinky-card.js`
   - Type: **JavaScript Module**
4. Clear your browser cache and refresh

## Configuration

### Visual editor

Add the card from the dashboard (**Add card** → **ZLinky Card**). The first ZLinky found is picked automatically; change it with the **ZLinky** field, then set the subscribed power, the price and the sections to show. The **Entities (advanced)** panel lets you force any entity if auto-detection picks the wrong one. Options left at their default are not written to the YAML.

### Minimal

```yaml
type: custom:zlinky-card
```

### Mini card

```yaml
type: custom:zlinky-mini-card
subscribed_power: 9
```

The mini card shows the meter, the live power, the load gauge and today's consumption (hidden with `show_stats: false`). The detail button (top right) unfolds the full card; a click anywhere else on the page folds it back. It takes the same options as the full card, plus `zoom`.

### Full options

```yaml
type: custom:zlinky-card
device_id: a9b4cb527f0afb6cf4988dd5a3eee88b
name: Linky
subscribed_power: 9
price: 0.2016
tiers:
  - Off-peak
  - Peak
show_stats: true
show_graph: true
show_index: true
show_phases: true
show_logo: true
language: en
entities:
  apparent_power: sensor.lixee_zlinky_tic_puissance_apparente
  energy: sensor.lixee_zlinky_tic_consommation
```

### Options reference

| Option | Required | Default | Description |
|---|---|---|---|
| `device_id` | ❌ | Auto | ZLinky device (the first ZLinky found is used if missing) |
| `entity` | ❌ | — | Any entity of the ZLinky, used to find the device |
| `name` | ❌ | `Linky` | Card title |
| `icon` | ❌ | Illustration | Replaces the meter illustration with an icon |
| `subscribed_power` | ❌ | `6` | Subscribed power in kVA, for the load gauge |
| `price` | ❌ | — | Price per kWh, shows the cost of each consumption (currency from Home Assistant) |
| `tiers` | ❌ | `Index 1`… | Names of the tiers, in order (`[Off-peak, Peak]`, Tempo colors…) |
| `show_stats` | ❌ | `true` | Today / yesterday / this month |
| `show_graph` | ❌ | `true` | 24 h power curve |
| `show_index` | ❌ | `true` | Meter index, tiers and injection |
| `show_phases` | ❌ | `true` | Per-phase details (three-phase meters only) |
| `show_logo` | ❌ | `true` | Meter icon in the header |
| `zoom` | ❌ | `true` | Mini card only: detail button that unfolds the full card |
| `language` | ❌ | HA language | `en`, `fr`, `de`, `es`, `sr`, `sr-Latn`, `it`, `nl`, `pt` or `pl` |
| `entities` | ❌ | Auto | Override any detected entity: `energy`, `power`, `apparent_power`, `current`, `voltage`, `current_b`, `current_c`, `voltage_b`, `voltage_c`, `injection`, `tariff`, `tier1`…`tier6` |

Tiers are listed only when more than one carries an index. The phase section appears only when phases 2 or 3 report a voltage. The Zigbee2MQTT distributor indexes `EASF07`–`EASF10` are not mapped: every standard French contract (Base, off-peak/peak, Tempo) fits in `tier1`…`tier6`.

## Translations

The cards auto-detect the language from your Home Assistant settings. Currently supported:

| Language | Code |
|---|---|
| English | `en` |
| Français | `fr` |
| Deutsch | `de` |
| Español | `es` |
| Српски | `sr` |
| Srpski (latinica) | `sr-Latn` |
| Italiano | `it` |
| Nederlands | `nl` |
| Português (Portugal) | `pt` |
| Polski | `pl` |

Other regional variants fall back to their base language (`pt-BR` uses the European Portuguese texts, `nl-BE` Dutch), and unsupported languages to English.

## Development

```bash
npm run build        # builds dist/zlinky-card.js
npm test             # unit tests
npm run screenshots  # regenerates the README screenshots and the live GIFs (Playwright + ffmpeg)
```

## License

[MIT](LICENSE)
