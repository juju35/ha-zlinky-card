var ZLINKY_CARD_VERSION = '__VERSION__';

// ── i18n ──────────────────────────────────────────────────────────────────────
var ZlI18n = {
  fr: {
    title: 'Linky',
    meter: 'Compteur ZLinky',
    load_low: 'Charge faible',
    load_mid: 'Charge modérée',
    load_high: 'Charge élevée',
    offline: 'Hors ligne',
    of_subscribed: 'de {p} kVA souscrits',
    today: 'Aujourd\'hui',
    yesterday: 'Hier',
    month: 'Ce mois',
    last_24h: 'Dernières 24 h',
    peak: 'max {v}',
    index: 'Index',
    tier: 'Index {n}',
    injection: 'Injection',
    phases: 'Phases',
    no_device: 'Aucun ZLinky trouvé',
    no_sensor: 'Aucun capteur ZLinky reconnu : choisissez-les dans « {e} »',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Appareil LiXee ZLinky_TIC (ZHA ou Zigbee2MQTT)',
    ed_name: 'Nom',
    ed_name_helper: 'Laisser vide pour « Linky »',
    ed_icon: 'Icône',
    ed_icon_helper: 'Remplace l\'illustration du compteur',
    ed_subscribed_power: 'Puissance souscrite (kVA)',
    ed_subscribed_power_helper: 'Sert à la jauge de charge ; 6 kVA par défaut',
    ed_subscribed_power_entity: 'Capteur de puissance souscrite',
    ed_subscribed_power_entity_helper: 'Optionnel : capteur donnant la puissance souscrite (kVA, ou A comme ISOUSC, par phase en triphasé). Remplace la valeur saisie',
    ed_price: 'Prix du kWh',
    ed_price_helper: 'Optionnel : affiche le coût à côté des consommations',
    ed_tiers: 'Noms des index',
    ed_tiers_helper: 'Dans l\'ordre des index 1 à 6 (ex. Heures creuses, Heures pleines)',
    ed_prices: 'Prix par index',
    ed_prices_helper: 'Un prix par index, dans le même ordre : nombre ou capteur donnant le prix du kWh. Remplace le prix du kWh',
    ed_compare: 'Comparer Base et Heures creuses',
    ed_compare_base: 'Prix Base par kWh',
    ed_compare_hc: 'Prix Heures creuses par kWh',
    ed_compare_hp: 'Prix Heures pleines par kWh',
    ed_hc_hours: 'Heures creuses',
    ed_hc_hours_helper: 'Par ex. 22:30-06:30, ou 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Abonnement Base par mois',
    ed_sub_hchp: 'Abonnement HC/HP par mois',
    cmp_title: 'Base ou Heures creuses ?',
    cmp_base: 'Base',
    cmp_hchp: 'Heures creuses / pleines',
    cmp_share: '{p} % en heures creuses',
    cmp_saves: '{c} : {v} d\'économie',
    cmp_same: 'Équivalents : {v} d\'écart',
    cmp_days: '{d} jours',
    ed_show_graph: 'Courbe 24 h',
    ed_show_stats: 'Consommations',
    ed_show_index: 'Index du compteur',
    ed_show_phases: 'Détail des phases',
    ed_show_logo: 'Icône compteur',
    ed_zoom: 'Bouton détail',
    ed_zoom_helper: 'Bouton en haut à droite qui passe la mini-carte en carte complète et inversement',
    zoom_in: 'Afficher la carte complète',
    zoom_out: 'Revenir à la vue compacte',
    ed_language: 'Langue',
    ed_language_helper: 'Laisser vide pour suivre la langue de Home Assistant',
    ed_entities: 'Entités (avancé)',
    ed_entities_helper: 'Détectées automatiquement depuis l\'appareil ; à renseigner seulement pour forcer une entité',
    en_energy: 'Index total',
    en_power: 'Puissance active',
    en_apparent_power: 'Puissance apparente',
    en_current: 'Courant',
    en_voltage: 'Tension',
    en_current_b: 'Courant phase 2',
    en_current_c: 'Courant phase 3',
    en_voltage_b: 'Tension phase 2',
    en_voltage_c: 'Tension phase 3',
    en_apparent_power_a: 'Puissance apparente phase 1',
    en_apparent_power_b: 'Puissance apparente phase 2',
    en_apparent_power_c: 'Puissance apparente phase 3',
    en_injection: 'Index injection',
    en_tariff: 'Période tarifaire',
    tomorrow: 'Demain',
    tempo_blue: 'Bleu',
    tempo_white: 'Blanc',
    tempo_red: 'Rouge',
    tempo_unknown: 'Pas encore connue',
    ed_show_tempo: 'Couleur Tempo',
    ed_load_warning: 'Seuil de charge modérée',
    ed_load_warning_helper: 'Charge modérée à partir de ce pourcentage de la puissance souscrite ; 50 % par défaut',
    ed_load_critical: 'Seuil de charge élevée',
    ed_load_critical_helper: 'Charge élevée à partir de ce pourcentage de la puissance souscrite ; 80 % par défaut',
    en_tempo: 'Couleur Tempo du jour',
    en_tomorrow: 'Couleur Tempo de demain',
    en_tier1: 'Index 1', en_tier2: 'Index 2', en_tier3: 'Index 3', en_tier4: 'Index 4', en_tier5: 'Index 5', en_tier6: 'Index 6',
  },
  en: {
    title: 'Linky',
    meter: 'ZLinky meter',
    load_low: 'Low load',
    load_mid: 'Moderate load',
    load_high: 'High load',
    offline: 'Offline',
    of_subscribed: 'of {p} kVA subscribed',
    today: 'Today',
    yesterday: 'Yesterday',
    month: 'This month',
    last_24h: 'Last 24 h',
    peak: 'max {v}',
    index: 'Index',
    tier: 'Index {n}',
    injection: 'Injection',
    phases: 'Phases',
    no_device: 'No ZLinky found',
    no_sensor: 'No ZLinky sensor found: set them under “{e}”',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'LiXee ZLinky_TIC device (ZHA or Zigbee2MQTT)',
    ed_name: 'Name',
    ed_name_helper: 'Leave empty for "Linky"',
    ed_icon: 'Icon',
    ed_icon_helper: 'Replaces the meter illustration',
    ed_subscribed_power: 'Subscribed power (kVA)',
    ed_subscribed_power_helper: 'Used for the load gauge; 6 kVA by default',
    ed_subscribed_power_entity: 'Subscribed power sensor',
    ed_subscribed_power_entity_helper: 'Optional: a sensor giving the subscribed power (kVA, or A like ISOUSC, per phase on three-phase). Replaces the number above',
    ed_price: 'Price per kWh',
    ed_price_helper: 'Optional: shows the cost next to the consumption',
    ed_tiers: 'Tier names',
    ed_tiers_helper: 'In index order, 1 to 6 (e.g. Off-peak, Peak)',
    ed_prices: 'Price per tier',
    ed_prices_helper: 'One price per tier, in the same order: a number or a sensor giving the price per kWh. Replaces the price per kWh',
    ed_compare: 'Compare Base and Off-peak',
    ed_compare_base: 'Base price per kWh',
    ed_compare_hc: 'Off-peak price per kWh',
    ed_compare_hp: 'Peak price per kWh',
    ed_hc_hours: 'Off-peak hours',
    ed_hc_hours_helper: 'E.g. 22:30-06:30, or 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Base subscription per month',
    ed_sub_hchp: 'Off-peak / Peak subscription per month',
    cmp_title: 'Base or Off-peak?',
    cmp_base: 'Base',
    cmp_hchp: 'Off-peak / Peak',
    cmp_share: '{p} % off-peak',
    cmp_saves: '{c} saves {v}',
    cmp_same: 'About the same: {v} apart',
    cmp_days: '{d} days',
    ed_show_graph: '24 h graph',
    ed_show_stats: 'Consumption',
    ed_show_index: 'Meter index',
    ed_show_phases: 'Phase details',
    ed_show_logo: 'Meter icon',
    ed_zoom: 'Detail button',
    ed_zoom_helper: 'Button at the top right that switches the mini card to the full card and back',
    zoom_in: 'Show the full card',
    zoom_out: 'Back to the compact view',
    ed_language: 'Language',
    ed_language_helper: 'Leave empty to follow the Home Assistant language',
    ed_entities: 'Entities (advanced)',
    ed_entities_helper: 'Detected from the device automatically; only set one to override it',
    en_energy: 'Total index',
    en_power: 'Active power',
    en_apparent_power: 'Apparent power',
    en_current: 'Current',
    en_voltage: 'Voltage',
    en_current_b: 'Phase 2 current',
    en_current_c: 'Phase 3 current',
    en_voltage_b: 'Phase 2 voltage',
    en_voltage_c: 'Phase 3 voltage',
    en_apparent_power_a: 'Phase 1 apparent power',
    en_apparent_power_b: 'Phase 2 apparent power',
    en_apparent_power_c: 'Phase 3 apparent power',
    en_injection: 'Injection index',
    en_tariff: 'Tariff period',
    tomorrow: 'Tomorrow',
    tempo_blue: 'Blue',
    tempo_white: 'White',
    tempo_red: 'Red',
    tempo_unknown: 'Not known yet',
    ed_show_tempo: 'Tempo color',
    ed_load_warning: 'Moderate load threshold',
    ed_load_warning_helper: 'Moderate load from this share of the subscribed power; 50 % by default',
    ed_load_critical: 'High load threshold',
    ed_load_critical_helper: 'High load from this share of the subscribed power; 80 % by default',
    en_tempo: 'Tempo color today',
    en_tomorrow: 'Tempo color tomorrow',
    en_tier1: 'Index 1', en_tier2: 'Index 2', en_tier3: 'Index 3', en_tier4: 'Index 4', en_tier5: 'Index 5', en_tier6: 'Index 6',
  },
  de: {
    title: 'Linky',
    meter: 'ZLinky-Zähler',
    load_low: 'Geringe Last',
    load_mid: 'Mittlere Last',
    load_high: 'Hohe Last',
    offline: 'Offline',
    of_subscribed: 'von {p} kVA Anschlussleistung',
    today: 'Heute',
    yesterday: 'Gestern',
    month: 'Dieser Monat',
    last_24h: 'Letzte 24 h',
    peak: 'max. {v}',
    index: 'Zählerstand',
    tier: 'Zählwerk {n}',
    injection: 'Einspeisung',
    phases: 'Phasen',
    no_device: 'Kein ZLinky gefunden',
    no_sensor: 'Kein ZLinky-Sensor erkannt: unter „{e}“ festlegen',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'LiXee-ZLinky_TIC-Gerät (ZHA oder Zigbee2MQTT)',
    ed_name: 'Name',
    ed_name_helper: 'Leer lassen für „Linky“',
    ed_icon: 'Symbol',
    ed_icon_helper: 'Ersetzt die Zählerabbildung',
    ed_subscribed_power: 'Vertragliche Anschlussleistung (kVA)',
    ed_subscribed_power_helper: 'Für die Lastanzeige; standardmäßig 6 kVA',
    ed_subscribed_power_entity: 'Sensor der Anschlussleistung',
    ed_subscribed_power_entity_helper: 'Optional: Sensor mit der vertraglichen Anschlussleistung (kVA oder A wie ISOUSC, bei Drehstrom je Phase). Ersetzt den eingegebenen Wert',
    ed_price: 'Preis pro kWh',
    ed_price_helper: 'Optional: zeigt die Kosten neben dem Verbrauch an',
    ed_tiers: 'Namen der Zählwerke',
    ed_tiers_helper: 'In der Reihenfolge der Zählwerke 1 bis 6 (z. B. HC Nebenzeit, HP Hauptzeit)',
    ed_prices: 'Preis pro Zählwerk',
    ed_prices_helper: 'Ein Preis pro Zählwerk, in derselben Reihenfolge: Zahl oder Sensor mit dem Preis pro kWh. Ersetzt den Preis pro kWh',
    ed_compare: 'Grundtarif und Nebenzeit vergleichen',
    ed_compare_base: 'Grundtarif pro kWh',
    ed_compare_hc: 'Nebenzeit-Preis pro kWh',
    ed_compare_hp: 'Hauptzeit-Preis pro kWh',
    ed_hc_hours: 'Nebenzeiten',
    ed_hc_hours_helper: 'Z. B. 22:30-06:30 oder 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Grundgebühr Grundtarif pro Monat',
    ed_sub_hchp: 'Grundgebühr HT/NT pro Monat',
    cmp_title: 'Grundtarif oder Nebenzeit?',
    cmp_base: 'Grundtarif',
    cmp_hchp: 'Neben- / Hauptzeit',
    cmp_share: '{p} % in Nebenzeit',
    cmp_saves: '{c} spart {v}',
    cmp_same: 'Etwa gleich: {v} Unterschied',
    cmp_days: '{d} Tage',
    ed_show_graph: '24-h-Verlauf',
    ed_show_stats: 'Verbrauch',
    ed_show_index: 'Zählerstände',
    ed_show_phases: 'Phasendetails',
    ed_show_logo: 'Zählersymbol',
    ed_zoom: 'Detail-Schaltfläche',
    ed_zoom_helper: 'Schaltfläche oben rechts, die die Mini-Karte zur vollständigen Karte umschaltet und zurück',
    zoom_in: 'Vollständige Karte anzeigen',
    zoom_out: 'Zurück zur kompakten Ansicht',
    ed_language: 'Sprache',
    ed_language_helper: 'Leer lassen, um der Sprache von Home Assistant zu folgen',
    ed_entities: 'Entitäten (erweitert)',
    ed_entities_helper: 'Werden automatisch vom Gerät erkannt; nur ausfüllen, um eine Entität zu erzwingen',
    en_energy: 'Gesamtzählerstand',
    en_power: 'Wirkleistung',
    en_apparent_power: 'Scheinleistung',
    en_current: 'Strom',
    en_voltage: 'Spannung',
    en_current_b: 'Strom Phase 2',
    en_current_c: 'Strom Phase 3',
    en_voltage_b: 'Spannung Phase 2',
    en_voltage_c: 'Spannung Phase 3',
    en_apparent_power_a: 'Scheinleistung Phase 1',
    en_apparent_power_b: 'Scheinleistung Phase 2',
    en_apparent_power_c: 'Scheinleistung Phase 3',
    en_injection: 'Zählerstand Einspeisung',
    en_tariff: 'Tarifperiode',
    tomorrow: 'Morgen',
    tempo_blue: 'Blau',
    tempo_white: 'Weiß',
    tempo_red: 'Rot',
    tempo_unknown: 'Noch nicht bekannt',
    ed_show_tempo: 'Tempo-Farbe',
    ed_load_warning: 'Schwelle mittlere Last',
    ed_load_warning_helper: 'Mittlere Last ab diesem Anteil der Anschlussleistung; standardmäßig 50 %',
    ed_load_critical: 'Schwelle hohe Last',
    ed_load_critical_helper: 'Hohe Last ab diesem Anteil der Anschlussleistung; standardmäßig 80 %',
    en_tempo: 'Tempo-Farbe heute',
    en_tomorrow: 'Tempo-Farbe morgen',
    en_tier1: 'Zählwerk 1', en_tier2: 'Zählwerk 2', en_tier3: 'Zählwerk 3', en_tier4: 'Zählwerk 4', en_tier5: 'Zählwerk 5', en_tier6: 'Zählwerk 6',
  },
  es: {
    title: 'Linky',
    meter: 'Contador ZLinky',
    load_low: 'Carga baja',
    load_mid: 'Carga moderada',
    load_high: 'Carga alta',
    offline: 'Desconectado',
    of_subscribed: 'de {p} kVA contratados',
    today: 'Hoy',
    yesterday: 'Ayer',
    month: 'Este mes',
    last_24h: 'Últimas 24 h',
    peak: 'máx. {v}',
    index: 'Índice',
    tier: 'Índice {n}',
    injection: 'Inyección',
    phases: 'Fases',
    no_device: 'No se ha encontrado ningún ZLinky',
    no_sensor: 'No se ha reconocido ningún sensor del ZLinky: elíjalos en «{e}»',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Dispositivo LiXee ZLinky_TIC (ZHA o Zigbee2MQTT)',
    ed_name: 'Nombre',
    ed_name_helper: 'Déjalo vacío para «Linky»',
    ed_icon: 'Icono',
    ed_icon_helper: 'Sustituye la ilustración del contador',
    ed_subscribed_power: 'Potencia contratada (kVA)',
    ed_subscribed_power_helper: 'Se usa para el indicador de carga; 6 kVA por defecto',
    ed_subscribed_power_entity: 'Sensor de potencia contratada',
    ed_subscribed_power_entity_helper: 'Opcional: sensor con la potencia contratada (kVA, o A como ISOUSC, por fase en trifásico). Sustituye al valor introducido',
    ed_price: 'Precio por kWh',
    ed_price_helper: 'Opcional: muestra el coste junto a los consumos',
    ed_tiers: 'Nombres de los índices',
    ed_tiers_helper: 'En el orden de los índices 1 a 6 (p. ej. HC horas valle, HP horas punta)',
    ed_prices: 'Precio por índice',
    ed_prices_helper: 'Un precio por índice, en el mismo orden: número o sensor con el precio del kWh. Sustituye al precio por kWh',
    ed_compare: 'Comparar Base y Horas valle',
    ed_compare_base: 'Precio Base por kWh',
    ed_compare_hc: 'Precio horas valle por kWh',
    ed_compare_hp: 'Precio horas punta por kWh',
    ed_hc_hours: 'Horas valle',
    ed_hc_hours_helper: 'P. ej. 22:30-06:30, o 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Abono Base al mes',
    ed_sub_hchp: 'Abono valle / punta al mes',
    cmp_title: '¿Base u horas valle?',
    cmp_base: 'Base',
    cmp_hchp: 'Valle / punta',
    cmp_share: '{p} % en horas valle',
    cmp_saves: '{c} ahorra {v}',
    cmp_same: 'Prácticamente igual: {v} de diferencia',
    cmp_days: '{d} días',
    ed_show_graph: 'Curva de 24 h',
    ed_show_stats: 'Consumos',
    ed_show_index: 'Índices del contador',
    ed_show_phases: 'Detalle de las fases',
    ed_show_logo: 'Icono del contador',
    ed_zoom: 'Botón de detalle',
    ed_zoom_helper: 'Botón arriba a la derecha que cambia la minitarjeta a la tarjeta completa y viceversa',
    zoom_in: 'Mostrar la tarjeta completa',
    zoom_out: 'Volver a la vista compacta',
    ed_language: 'Idioma',
    ed_language_helper: 'Déjalo vacío para seguir el idioma de Home Assistant',
    ed_entities: 'Entidades (avanzado)',
    ed_entities_helper: 'Se detectan automáticamente desde el dispositivo; rellénalo solo para forzar una entidad',
    en_energy: 'Índice total',
    en_power: 'Potencia activa',
    en_apparent_power: 'Potencia aparente',
    en_current: 'Corriente',
    en_voltage: 'Tensión',
    en_current_b: 'Corriente fase 2',
    en_current_c: 'Corriente fase 3',
    en_voltage_b: 'Tensión fase 2',
    en_voltage_c: 'Tensión fase 3',
    en_apparent_power_a: 'Potencia aparente fase 1',
    en_apparent_power_b: 'Potencia aparente fase 2',
    en_apparent_power_c: 'Potencia aparente fase 3',
    en_injection: 'Índice de inyección',
    en_tariff: 'Periodo tarifario',
    tomorrow: 'Mañana',
    tempo_blue: 'Azul',
    tempo_white: 'Blanco',
    tempo_red: 'Rojo',
    tempo_unknown: 'Aún no se conoce',
    ed_show_tempo: 'Color Tempo',
    ed_load_warning: 'Umbral de carga moderada',
    ed_load_warning_helper: 'Carga moderada a partir de este porcentaje de la potencia contratada; 50 % por defecto',
    ed_load_critical: 'Umbral de carga alta',
    ed_load_critical_helper: 'Carga alta a partir de este porcentaje de la potencia contratada; 80 % por defecto',
    en_tempo: 'Color Tempo de hoy',
    en_tomorrow: 'Color Tempo de mañana',
    en_tier1: 'Índice 1', en_tier2: 'Índice 2', en_tier3: 'Índice 3', en_tier4: 'Índice 4', en_tier5: 'Índice 5', en_tier6: 'Índice 6',
  },
  sr: {
    title: 'Linky',
    meter: 'ZLinky бројило',
    load_low: 'Мало оптерећење',
    load_mid: 'Умерено оптерећење',
    load_high: 'Велико оптерећење',
    offline: 'Ван мреже',
    of_subscribed: 'од {p} kVA уговорене снаге',
    today: 'Данас',
    yesterday: 'Јуче',
    month: 'Овај месец',
    last_24h: 'Последња 24 h',
    peak: 'макс. {v}',
    index: 'Стање бројила',
    tier: 'Тарифа {n}',
    injection: 'Предаја у мрежу',
    phases: 'Фазе',
    no_device: 'Није пронађен ниједан ZLinky',
    no_sensor: 'Није препознат ниједан сензор ZLinky: изаберите их у „{e}“',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Уређај LiXee ZLinky_TIC (ZHA или Zigbee2MQTT)',
    ed_name: 'Назив',
    ed_name_helper: 'Оставите празно за „Linky“',
    ed_icon: 'Иконица',
    ed_icon_helper: 'Замењује илустрацију бројила',
    ed_subscribed_power: 'Уговорена снага (kVA)',
    ed_subscribed_power_helper: 'Користи се за мерач оптерећења; подразумевано 6 kVA',
    ed_subscribed_power_entity: 'Сензор уговорене снаге',
    ed_subscribed_power_entity_helper: 'Опционо: сензор са уговореном снагом (kVA или ампери, по фази код трофазног). Замењује унету вредност',
    ed_price: 'Цена по kWh',
    ed_price_helper: 'Опционо: приказује трошак поред потрошње',
    ed_tiers: 'Називи тарифа',
    ed_tiers_helper: 'Редом по тарифама од 1 до 6 (нпр. Нижа тарифа, Виша тарифа)',
    ed_prices: 'Цена по тарифи',
    ed_prices_helper: 'Једна цена по тарифи, истим редом: број или сензор са ценом по kWh. Замењује цену по kWh',
    ed_compare: 'Упореди Базну и Нижу тарифу',
    ed_compare_base: 'Базна цена по kWh',
    ed_compare_hc: 'Цена ниже тарифе по kWh',
    ed_compare_hp: 'Цена више тарифе по kWh',
    ed_hc_hours: 'Сати ниже тарифе',
    ed_hc_hours_helper: 'Нпр. 22:30-06:30 или 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Базна претплата месечно',
    ed_sub_hchp: 'Претплата ниже/више тарифе месечно',
    cmp_title: 'Базна или нижа тарифа?',
    cmp_base: 'Базна',
    cmp_hchp: 'Нижа / виша тарифа',
    cmp_share: '{p} % у нижој тарифи',
    cmp_saves: '{c} штеди {v}',
    cmp_same: 'Готово исто: разлика {v}',
    cmp_days: '{d} дана',
    ed_show_graph: 'Крива за 24 h',
    ed_show_stats: 'Потрошња',
    ed_show_index: 'Стање бројила',
    ed_show_phases: 'Детаљи фаза',
    ed_show_logo: 'Иконица бројила',
    ed_zoom: 'Дугме за детаље',
    ed_zoom_helper: 'Дугме у горњем десном углу које пребацује мини картицу на пун приказ и назад',
    zoom_in: 'Прикажи целу картицу',
    zoom_out: 'Назад на компактни приказ',
    ed_language: 'Језик',
    ed_language_helper: 'Оставите празно да бисте пратили језик Home Assistant-а',
    ed_entities: 'Ентитети (напредно)',
    ed_entities_helper: 'Аутоматски се откривају са уређаја; попуните само да бисте наметнули ентитет',
    en_energy: 'Укупно стање',
    en_power: 'Активна снага',
    en_apparent_power: 'Привидна снага',
    en_current: 'Струја',
    en_voltage: 'Напон',
    en_current_b: 'Струја фазе 2',
    en_current_c: 'Струја фазе 3',
    en_voltage_b: 'Напон фазе 2',
    en_voltage_c: 'Напон фазе 3',
    en_apparent_power_a: 'Привидна снага фазе 1',
    en_apparent_power_b: 'Привидна снага фазе 2',
    en_apparent_power_c: 'Привидна снага фазе 3',
    en_injection: 'Стање предаје у мрежу',
    en_tariff: 'Тарифни период',
    tomorrow: 'Сутра',
    tempo_blue: 'Плава',
    tempo_white: 'Бела',
    tempo_red: 'Црвена',
    tempo_unknown: 'Још није позната',
    ed_show_tempo: 'Темпо боја',
    ed_load_warning: 'Праг умереног оптерећења',
    ed_load_warning_helper: 'Умерено оптерећење од овог удела уговорене снаге; подразумевано 50 %',
    ed_load_critical: 'Праг високог оптерећења',
    ed_load_critical_helper: 'Високо оптерећење од овог удела уговорене снаге; подразумевано 80 %',
    en_tempo: 'Темпо боја данас',
    en_tomorrow: 'Темпо боја сутра',
    en_tier1: 'Тарифа 1', en_tier2: 'Тарифа 2', en_tier3: 'Тарифа 3', en_tier4: 'Тарифа 4', en_tier5: 'Тарифа 5', en_tier6: 'Тарифа 6',
  },
  'sr-Latn': {
    title: 'Linky',
    meter: 'ZLinky brojilo',
    load_low: 'Malo opterećenje',
    load_mid: 'Umereno opterećenje',
    load_high: 'Veliko opterećenje',
    offline: 'Van mreže',
    of_subscribed: 'od {p} kVA ugovorene snage',
    today: 'Danas',
    yesterday: 'Juče',
    month: 'Ovaj mesec',
    last_24h: 'Poslednja 24 h',
    peak: 'maks. {v}',
    index: 'Stanje brojila',
    tier: 'Tarifa {n}',
    injection: 'Predaja u mrežu',
    phases: 'Faze',
    no_device: 'Nije pronađen nijedan ZLinky',
    no_sensor: 'Nije prepoznat nijedan senzor ZLinky: izaberite ih u „{e}“',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Uređaj LiXee ZLinky_TIC (ZHA ili Zigbee2MQTT)',
    ed_name: 'Naziv',
    ed_name_helper: 'Ostavite prazno za „Linky“',
    ed_icon: 'Ikonica',
    ed_icon_helper: 'Zamenjuje ilustraciju brojila',
    ed_subscribed_power: 'Ugovorena snaga (kVA)',
    ed_subscribed_power_helper: 'Koristi se za merač opterećenja; podrazumevano 6 kVA',
    ed_subscribed_power_entity: 'Senzor ugovorene snage',
    ed_subscribed_power_entity_helper: 'Opciono: senzor sa ugovorenom snagom (kVA, ili A kao ISOUSC, po fazi kod trofaznog). Zamenjuje unetu vrednost',
    ed_price: 'Cena po kWh',
    ed_price_helper: 'Opciono: prikazuje trošak pored potrošnje',
    ed_tiers: 'Nazivi tarifa',
    ed_tiers_helper: 'Redom po tarifama od 1 do 6 (npr. Niža tarifa, Viša tarifa)',
    ed_prices: 'Cena po tarifi',
    ed_prices_helper: 'Jedna cena po tarifi, istim redom: broj ili senzor sa cenom po kWh. Zamenjuje cenu po kWh',
    ed_compare: 'Uporedi Baznu i Nižu tarifu',
    ed_compare_base: 'Bazna cena po kWh',
    ed_compare_hc: 'Cena niže tarife po kWh',
    ed_compare_hp: 'Cena više tarife po kWh',
    ed_hc_hours: 'Sati niže tarife',
    ed_hc_hours_helper: 'Npr. 22:30-06:30 ili 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Bazna pretplata mesečno',
    ed_sub_hchp: 'Pretplata niže/više tarife mesečno',
    cmp_title: 'Bazna ili niža tarifa?',
    cmp_base: 'Bazna',
    cmp_hchp: 'Niža / viša tarifa',
    cmp_share: '{p} % u nižoj tarifi',
    cmp_saves: '{c} štedi {v}',
    cmp_same: 'Gotovo isto: razlika {v}',
    cmp_days: '{d} dana',
    ed_show_graph: 'Kriva za 24 h',
    ed_show_stats: 'Potrošnja',
    ed_show_index: 'Stanje brojila',
    ed_show_phases: 'Detalji faza',
    ed_show_logo: 'Ikonica brojila',
    ed_zoom: 'Dugme za detalje',
    ed_zoom_helper: 'Dugme u gornjem desnom uglu koje prebacuje mini karticu na pun prikaz i nazad',
    zoom_in: 'Prikaži celu karticu',
    zoom_out: 'Nazad na kompaktni prikaz',
    ed_language: 'Jezik',
    ed_language_helper: 'Ostavite prazno da biste pratili jezik Home Assistant-a',
    ed_entities: 'Entiteti (napredno)',
    ed_entities_helper: 'Automatski se otkrivaju sa uređaja; popunite samo da biste nametnuli entitet',
    en_energy: 'Ukupno stanje',
    en_power: 'Aktivna snaga',
    en_apparent_power: 'Prividna snaga',
    en_current: 'Struja',
    en_voltage: 'Napon',
    en_current_b: 'Struja faze 2',
    en_current_c: 'Struja faze 3',
    en_voltage_b: 'Napon faze 2',
    en_voltage_c: 'Napon faze 3',
    en_apparent_power_a: 'Prividna snaga faze 1',
    en_apparent_power_b: 'Prividna snaga faze 2',
    en_apparent_power_c: 'Prividna snaga faze 3',
    en_injection: 'Stanje predaje u mrežu',
    en_tariff: 'Tarifni period',
    tomorrow: 'Sutra',
    tempo_blue: 'Plava',
    tempo_white: 'Bela',
    tempo_red: 'Crvena',
    tempo_unknown: 'Još nije poznata',
    ed_show_tempo: 'Tempo boja',
    ed_load_warning: 'Prag umerenog opterećenja',
    ed_load_warning_helper: 'Umereno opterećenje od ovog udela ugovorene snage; podrazumevano 50 %',
    ed_load_critical: 'Prag visokog opterećenja',
    ed_load_critical_helper: 'Visoko opterećenje od ovog udela ugovorene snage; podrazumevano 80 %',
    en_tempo: 'Tempo boja danas',
    en_tomorrow: 'Tempo boja sutra',
    en_tier1: 'Tarifa 1', en_tier2: 'Tarifa 2', en_tier3: 'Tarifa 3', en_tier4: 'Tarifa 4', en_tier5: 'Tarifa 5', en_tier6: 'Tarifa 6',
  },
  it: {
    title: 'Linky',
    meter: 'Contatore ZLinky',
    load_low: 'Carico basso',
    load_mid: 'Carico moderato',
    load_high: 'Carico elevato',
    offline: 'Non in linea',
    of_subscribed: 'di {p} kVA di potenza impegnata',
    today: 'Oggi',
    yesterday: 'Ieri',
    month: 'Questo mese',
    last_24h: 'Ultime 24 h',
    peak: 'max {v}',
    index: 'Lettura',
    tier: 'Fascia {n}',
    injection: 'Immissione',
    phases: 'Fasi',
    no_device: 'Nessun ZLinky trovato',
    no_sensor: 'Nessun sensore ZLinky riconosciuto: sceglili in «{e}»',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Dispositivo LiXee ZLinky_TIC (ZHA o Zigbee2MQTT)',
    ed_name: 'Nome',
    ed_name_helper: 'Lascia vuoto per «Linky»',
    ed_icon: 'Icona',
    ed_icon_helper: 'Sostituisce l\'illustrazione del contatore',
    ed_subscribed_power: 'Potenza impegnata (kVA)',
    ed_subscribed_power_helper: 'Usata per l\'indicatore di carico; 6 kVA predefiniti',
    ed_subscribed_power_entity: 'Sensore della potenza impegnata',
    ed_subscribed_power_entity_helper: 'Facoltativo: sensore con la potenza impegnata (kVA, o A come ISOUSC, per fase in trifase). Sostituisce il valore inserito',
    ed_price: 'Prezzo per kWh',
    ed_price_helper: 'Facoltativo: mostra il costo accanto ai consumi',
    ed_tiers: 'Nomi delle fasce',
    ed_tiers_helper: 'Nell\'ordine delle fasce da 1 a 6 (es. Fuori punta, Punta)',
    ed_prices: 'Prezzo per fascia',
    ed_prices_helper: 'Un prezzo per fascia, nello stesso ordine: numero o sensore con il prezzo del kWh. Sostituisce il prezzo per kWh',
    ed_compare: 'Confronta Monoraria e Fasce',
    ed_compare_base: 'Prezzo monorario per kWh',
    ed_compare_hc: 'Prezzo fuori picco per kWh',
    ed_compare_hp: 'Prezzo di picco per kWh',
    ed_hc_hours: 'Ore fuori picco',
    ed_hc_hours_helper: 'Es. 22:30-06:30, o 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Abbonamento monorario al mese',
    ed_sub_hchp: 'Abbonamento fasce al mese',
    cmp_title: 'Monoraria o fasce?',
    cmp_base: 'Monoraria',
    cmp_hchp: 'Fuori picco / picco',
    cmp_share: '{p} % fuori picco',
    cmp_saves: '{c} fa risparmiare {v}',
    cmp_same: 'Praticamente uguali: {v} di differenza',
    cmp_days: '{d} giorni',
    ed_show_graph: 'Curva 24 h',
    ed_show_stats: 'Consumi',
    ed_show_index: 'Letture del contatore',
    ed_show_phases: 'Dettaglio delle fasi',
    ed_show_logo: 'Icona del contatore',
    ed_zoom: 'Pulsante dettaglio',
    ed_zoom_helper: 'Pulsante in alto a destra che passa dalla mini scheda alla scheda completa e viceversa',
    zoom_in: 'Mostra la scheda completa',
    zoom_out: 'Torna alla vista compatta',
    ed_language: 'Lingua',
    ed_language_helper: 'Lascia vuoto per seguire la lingua di Home Assistant',
    ed_entities: 'Entità (avanzate)',
    ed_entities_helper: 'Rilevate automaticamente dal dispositivo; da compilare solo per forzare un\'entità',
    en_energy: 'Lettura totale',
    en_power: 'Potenza attiva',
    en_apparent_power: 'Potenza apparente',
    en_current: 'Corrente',
    en_voltage: 'Tensione',
    en_current_b: 'Corrente fase 2',
    en_current_c: 'Corrente fase 3',
    en_voltage_b: 'Tensione fase 2',
    en_voltage_c: 'Tensione fase 3',
    en_apparent_power_a: 'Potenza apparente fase 1',
    en_apparent_power_b: 'Potenza apparente fase 2',
    en_apparent_power_c: 'Potenza apparente fase 3',
    en_injection: 'Lettura immissione',
    en_tariff: 'Fascia oraria',
    tomorrow: 'Domani',
    tempo_blue: 'Blu',
    tempo_white: 'Bianco',
    tempo_red: 'Rosso',
    tempo_unknown: 'Non ancora noto',
    ed_show_tempo: 'Colore Tempo',
    ed_load_warning: 'Soglia di carico moderato',
    ed_load_warning_helper: 'Carico moderato da questa percentuale della potenza contrattuale; 50 % per impostazione predefinita',
    ed_load_critical: 'Soglia di carico elevato',
    ed_load_critical_helper: 'Carico elevato da questa percentuale della potenza contrattuale; 80 % per impostazione predefinita',
    en_tempo: 'Colore Tempo di oggi',
    en_tomorrow: 'Colore Tempo di domani',
    en_tier1: 'Fascia 1', en_tier2: 'Fascia 2', en_tier3: 'Fascia 3', en_tier4: 'Fascia 4', en_tier5: 'Fascia 5', en_tier6: 'Fascia 6',
  },
  nl: {
    title: 'Linky',
    meter: 'ZLinky-meter',
    load_low: 'Lage belasting',
    load_mid: 'Matige belasting',
    load_high: 'Hoge belasting',
    offline: 'Offline',
    of_subscribed: 'van {p} kVA aansluitvermogen',
    today: 'Vandaag',
    yesterday: 'Gisteren',
    month: 'Deze maand',
    last_24h: 'Laatste 24 u',
    peak: 'max. {v}',
    index: 'Meterstand',
    tier: 'Telwerk {n}',
    injection: 'Teruglevering',
    phases: 'Fasen',
    no_device: 'Geen ZLinky gevonden',
    no_sensor: 'Geen ZLinky-sensor herkend: kies ze onder “{e}”',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'LiXee ZLinky_TIC-apparaat (ZHA of Zigbee2MQTT)',
    ed_name: 'Naam',
    ed_name_helper: 'Leeg laten voor "Linky"',
    ed_icon: 'Pictogram',
    ed_icon_helper: 'Vervangt de afbeelding van de meter',
    ed_subscribed_power: 'Aansluitvermogen (kVA)',
    ed_subscribed_power_helper: 'Gebruikt voor de belastingsmeter; standaard 6 kVA',
    ed_subscribed_power_entity: 'Sensor voor aansluitvermogen',
    ed_subscribed_power_entity_helper: 'Optioneel: een sensor met het aansluitvermogen (kVA, of A zoals ISOUSC, per fase bij driefasig). Vervangt de ingevoerde waarde',
    ed_price: 'Prijs per kWh',
    ed_price_helper: 'Optioneel: toont de kosten naast het verbruik',
    ed_tiers: 'Namen van de telwerken',
    ed_tiers_helper: 'In de volgorde van telwerk 1 tot 6 (bijv. Daluren, Piekuren)',
    ed_prices: 'Prijs per telwerk',
    ed_prices_helper: 'Eén prijs per telwerk, in dezelfde volgorde: een getal of een sensor met de prijs per kWh. Vervangt de prijs per kWh',
    ed_compare: 'Enkel- en dubbeltarief vergelijken',
    ed_compare_base: 'Enkeltarief per kWh',
    ed_compare_hc: 'Daltarief per kWh',
    ed_compare_hp: 'Piektarief per kWh',
    ed_hc_hours: 'Daluren',
    ed_hc_hours_helper: 'Bijv. 22:30-06:30, of 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Vastrecht enkeltarief per maand',
    ed_sub_hchp: 'Vastrecht dubbeltarief per maand',
    cmp_title: 'Enkel- of dubbeltarief?',
    cmp_base: 'Enkeltarief',
    cmp_hchp: 'Dal / piek',
    cmp_share: '{p} % in daluren',
    cmp_saves: '{c} bespaart {v}',
    cmp_same: 'Ongeveer gelijk: {v} verschil',
    cmp_days: '{d} dagen',
    ed_show_graph: '24-uursgrafiek',
    ed_show_stats: 'Verbruik',
    ed_show_index: 'Meterstanden',
    ed_show_phases: 'Details per fase',
    ed_show_logo: 'Meterpictogram',
    ed_zoom: 'Detailknop',
    ed_zoom_helper: 'Knop rechtsboven die de minikaart naar de volledige kaart omschakelt en terug',
    zoom_in: 'Volledige kaart tonen',
    zoom_out: 'Terug naar de compacte weergave',
    ed_language: 'Taal',
    ed_language_helper: 'Leeg laten om de taal van Home Assistant te volgen',
    ed_entities: 'Entiteiten (geavanceerd)',
    ed_entities_helper: 'Automatisch gedetecteerd via het apparaat; alleen invullen om een entiteit te forceren',
    en_energy: 'Totale meterstand',
    en_power: 'Actief vermogen',
    en_apparent_power: 'Schijnbaar vermogen',
    en_current: 'Stroom',
    en_voltage: 'Spanning',
    en_current_b: 'Stroom fase 2',
    en_current_c: 'Stroom fase 3',
    en_voltage_b: 'Spanning fase 2',
    en_voltage_c: 'Spanning fase 3',
    en_apparent_power_a: 'Schijnbaar vermogen fase 1',
    en_apparent_power_b: 'Schijnbaar vermogen fase 2',
    en_apparent_power_c: 'Schijnbaar vermogen fase 3',
    en_injection: 'Meterstand teruglevering',
    en_tariff: 'Tariefperiode',
    tomorrow: 'Morgen',
    tempo_blue: 'Blauw',
    tempo_white: 'Wit',
    tempo_red: 'Rood',
    tempo_unknown: 'Nog niet bekend',
    ed_show_tempo: 'Tempo-kleur',
    ed_load_warning: 'Drempel matige belasting',
    ed_load_warning_helper: 'Matige belasting vanaf dit aandeel van het gecontracteerde vermogen; standaard 50 %',
    ed_load_critical: 'Drempel hoge belasting',
    ed_load_critical_helper: 'Hoge belasting vanaf dit aandeel van het gecontracteerde vermogen; standaard 80 %',
    en_tempo: 'Tempo-kleur vandaag',
    en_tomorrow: 'Tempo-kleur morgen',
    en_tier1: 'Telwerk 1', en_tier2: 'Telwerk 2', en_tier3: 'Telwerk 3', en_tier4: 'Telwerk 4', en_tier5: 'Telwerk 5', en_tier6: 'Telwerk 6',
  },
  pt: {
    title: 'Linky',
    meter: 'Contador ZLinky',
    load_low: 'Carga baixa',
    load_mid: 'Carga moderada',
    load_high: 'Carga elevada',
    offline: 'Sem ligação',
    of_subscribed: 'de {p} kVA de potência contratada',
    today: 'Hoje',
    yesterday: 'Ontem',
    month: 'Este mês',
    last_24h: 'Últimas 24 h',
    peak: 'máx. {v}',
    index: 'Leitura',
    tier: 'Leitura {n}',
    injection: 'Injeção',
    phases: 'Fases',
    no_device: 'Nenhum ZLinky encontrado',
    no_sensor: 'Nenhum sensor ZLinky reconhecido: escolha-os em «{e}»',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Dispositivo LiXee ZLinky_TIC (ZHA ou Zigbee2MQTT)',
    ed_name: 'Nome',
    ed_name_helper: 'Deixe vazio para «Linky»',
    ed_icon: 'Ícone',
    ed_icon_helper: 'Substitui a ilustração do contador',
    ed_subscribed_power: 'Potência contratada (kVA)',
    ed_subscribed_power_helper: 'Usada no indicador de carga; 6 kVA por omissão',
    ed_subscribed_power_entity: 'Sensor da potência contratada',
    ed_subscribed_power_entity_helper: 'Opcional: sensor com a potência contratada (kVA, ou A como ISOUSC, por fase em trifásico). Substitui o valor introduzido',
    ed_price: 'Preço por kWh',
    ed_price_helper: 'Opcional: mostra o custo junto aos consumos',
    ed_tiers: 'Nomes das leituras',
    ed_tiers_helper: 'Pela ordem das leituras 1 a 6 (p. ex. Vazio, Fora de vazio)',
    ed_prices: 'Preço por leitura',
    ed_prices_helper: 'Um preço por leitura, pela mesma ordem: número ou sensor com o preço do kWh. Substitui o preço por kWh',
    ed_compare: 'Comparar Simples e Bi-horária',
    ed_compare_base: 'Preço simples por kWh',
    ed_compare_hc: 'Preço vazio por kWh',
    ed_compare_hp: 'Preço fora de vazio por kWh',
    ed_hc_hours: 'Horas de vazio',
    ed_hc_hours_helper: 'Ex. 22:30-06:30, ou 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Assinatura simples por mês',
    ed_sub_hchp: 'Assinatura bi-horária por mês',
    cmp_title: 'Simples ou bi-horária?',
    cmp_base: 'Simples',
    cmp_hchp: 'Vazio / fora de vazio',
    cmp_share: '{p} % em vazio',
    cmp_saves: '{c} poupa {v}',
    cmp_same: 'Praticamente igual: {v} de diferença',
    cmp_days: '{d} dias',
    ed_show_graph: 'Curva de 24 h',
    ed_show_stats: 'Consumos',
    ed_show_index: 'Leituras do contador',
    ed_show_phases: 'Detalhe das fases',
    ed_show_logo: 'Ícone do contador',
    ed_zoom: 'Botão de detalhe',
    ed_zoom_helper: 'Botão no canto superior direito que alterna entre o mini cartão e o cartão completo',
    zoom_in: 'Mostrar o cartão completo',
    zoom_out: 'Voltar à vista compacta',
    ed_language: 'Idioma',
    ed_language_helper: 'Deixe vazio para seguir o idioma do Home Assistant',
    ed_entities: 'Entidades (avançado)',
    ed_entities_helper: 'Detetadas automaticamente a partir do dispositivo; preencha apenas para forçar uma entidade',
    en_energy: 'Leitura total',
    en_power: 'Potência ativa',
    en_apparent_power: 'Potência aparente',
    en_current: 'Corrente',
    en_voltage: 'Tensão',
    en_current_b: 'Corrente fase 2',
    en_current_c: 'Corrente fase 3',
    en_voltage_b: 'Tensão fase 2',
    en_voltage_c: 'Tensão fase 3',
    en_apparent_power_a: 'Potência aparente fase 1',
    en_apparent_power_b: 'Potência aparente fase 2',
    en_apparent_power_c: 'Potência aparente fase 3',
    en_injection: 'Leitura de injeção',
    en_tariff: 'Período tarifário',
    tomorrow: 'Amanhã',
    tempo_blue: 'Azul',
    tempo_white: 'Branco',
    tempo_red: 'Vermelho',
    tempo_unknown: 'Ainda não se sabe',
    ed_show_tempo: 'Cor Tempo',
    ed_load_warning: 'Limiar de carga moderada',
    ed_load_warning_helper: 'Carga moderada a partir desta percentagem da potência contratada; 50 % por omissão',
    ed_load_critical: 'Limiar de carga elevada',
    ed_load_critical_helper: 'Carga elevada a partir desta percentagem da potência contratada; 80 % por omissão',
    en_tempo: 'Cor Tempo de hoje',
    en_tomorrow: 'Cor Tempo de amanhã',
    en_tier1: 'Leitura 1', en_tier2: 'Leitura 2', en_tier3: 'Leitura 3', en_tier4: 'Leitura 4', en_tier5: 'Leitura 5', en_tier6: 'Leitura 6',
  },
  pl: {
    title: 'Linky',
    meter: 'Licznik ZLinky',
    load_low: 'Małe obciążenie',
    load_mid: 'Średnie obciążenie',
    load_high: 'Duże obciążenie',
    offline: 'Brak połączenia',
    of_subscribed: 'z {p} kVA mocy umownej',
    today: 'Dzisiaj',
    yesterday: 'Wczoraj',
    month: 'Ten miesiąc',
    last_24h: 'Ostatnie 24 h',
    peak: 'maks. {v}',
    index: 'Stan licznika',
    tier: 'Strefa {n}',
    injection: 'Oddawanie do sieci',
    phases: 'Fazy',
    no_device: 'Nie znaleziono żadnego ZLinky',
    no_sensor: 'Nie rozpoznano żadnego czujnika ZLinky: wybierz je w „{e}”',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Urządzenie LiXee ZLinky_TIC (ZHA lub Zigbee2MQTT)',
    ed_name: 'Nazwa',
    ed_name_helper: 'Pozostaw puste, aby użyć „Linky”',
    ed_icon: 'Ikona',
    ed_icon_helper: 'Zastępuje ilustrację licznika',
    ed_subscribed_power: 'Moc umowna (kVA)',
    ed_subscribed_power_helper: 'Używana przez wskaźnik obciążenia; domyślnie 6 kVA',
    ed_subscribed_power_entity: 'Czujnik mocy umownej',
    ed_subscribed_power_entity_helper: 'Opcjonalnie: czujnik podający moc umowną (kVA lub A jak ISOUSC, na fazę przy trójfazowym). Zastępuje wpisaną wartość',
    ed_price: 'Cena za kWh',
    ed_price_helper: 'Opcjonalnie: pokazuje koszt obok zużycia',
    ed_tiers: 'Nazwy stref',
    ed_tiers_helper: 'W kolejności stref od 1 do 6 (np. Strefa nocna, Strefa dzienna)',
    ed_prices: 'Cena za strefę',
    ed_prices_helper: 'Jedna cena na strefę, w tej samej kolejności: liczba lub czujnik z ceną za kWh. Zastępuje cenę za kWh',
    ed_compare: 'Porównaj taryfę jedno- i dwustrefową',
    ed_compare_base: 'Cena taryfy jednostrefowej za kWh',
    ed_compare_hc: 'Cena strefy nocnej za kWh',
    ed_compare_hp: 'Cena strefy dziennej za kWh',
    ed_hc_hours: 'Godziny strefy nocnej',
    ed_hc_hours_helper: 'Np. 22:30-06:30 lub 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Opłata stała jednostrefowa miesięcznie',
    ed_sub_hchp: 'Opłata stała dwustrefowa miesięcznie',
    cmp_title: 'Jedno- czy dwustrefowa?',
    cmp_base: 'Jednostrefowa',
    cmp_hchp: 'Noc / dzień',
    cmp_share: '{p} % w strefie nocnej',
    cmp_saves: '{c}: oszczędność {v}',
    cmp_same: 'Prawie to samo: różnica {v}',
    cmp_days: '{d} dni',
    ed_show_graph: 'Wykres 24 h',
    ed_show_stats: 'Zużycie',
    ed_show_index: 'Stany licznika',
    ed_show_phases: 'Szczegóły faz',
    ed_show_logo: 'Ikona licznika',
    ed_zoom: 'Przycisk szczegółów',
    ed_zoom_helper: 'Przycisk w prawym górnym rogu, który przełącza minikartę na pełną kartę i z powrotem',
    zoom_in: 'Pokaż pełną kartę',
    zoom_out: 'Wróć do widoku kompaktowego',
    ed_language: 'Język',
    ed_language_helper: 'Pozostaw puste, aby używać języka Home Assistant',
    ed_entities: 'Encje (zaawansowane)',
    ed_entities_helper: 'Wykrywane automatycznie z urządzenia; wypełnij tylko, aby wymusić encję',
    en_energy: 'Stan łączny',
    en_power: 'Moc czynna',
    en_apparent_power: 'Moc pozorna',
    en_current: 'Prąd',
    en_voltage: 'Napięcie',
    en_current_b: 'Prąd fazy 2',
    en_current_c: 'Prąd fazy 3',
    en_voltage_b: 'Napięcie fazy 2',
    en_voltage_c: 'Napięcie fazy 3',
    en_apparent_power_a: 'Moc pozorna fazy 1',
    en_apparent_power_b: 'Moc pozorna fazy 2',
    en_apparent_power_c: 'Moc pozorna fazy 3',
    en_injection: 'Stan energii oddanej',
    en_tariff: 'Strefa taryfowa',
    tomorrow: 'Jutro',
    tempo_blue: 'Niebieski',
    tempo_white: 'Biały',
    tempo_red: 'Czerwony',
    tempo_unknown: 'Jeszcze nieznany',
    ed_show_tempo: 'Kolor Tempo',
    ed_load_warning: 'Próg umiarkowanego obciążenia',
    ed_load_warning_helper: 'Umiarkowane obciążenie od tego udziału mocy umownej; domyślnie 50 %',
    ed_load_critical: 'Próg wysokiego obciążenia',
    ed_load_critical_helper: 'Wysokie obciążenie od tego udziału mocy umownej; domyślnie 80 %',
    en_tempo: 'Kolor Tempo dziś',
    en_tomorrow: 'Kolor Tempo jutro',
    en_tier1: 'Strefa 1', en_tier2: 'Strefa 2', en_tier3: 'Strefa 3', en_tier4: 'Strefa 4', en_tier5: 'Strefa 5', en_tier6: 'Strefa 6',
  },
  ro: {
    title: 'Linky',
    meter: 'Contor ZLinky',
    load_low: 'Sarcină redusă',
    load_mid: 'Sarcină medie',
    load_high: 'Sarcină ridicată',
    offline: 'Deconectat',
    of_subscribed: 'din {p} kVA putere contractată',
    today: 'Astăzi',
    yesterday: 'Ieri',
    month: 'Luna aceasta',
    last_24h: 'Ultimele 24 h',
    peak: 'max. {v}',
    index: 'Index',
    tier: 'Index {n}',
    injection: 'Injecție',
    phases: 'Faze',
    no_device: 'Niciun ZLinky găsit',
    no_sensor: 'Niciun senzor ZLinky recunoscut: alegeți-i în „{e}”',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Dispozitiv LiXee ZLinky_TIC (ZHA sau Zigbee2MQTT)',
    ed_name: 'Nume',
    ed_name_helper: 'Lăsați gol pentru „Linky”',
    ed_icon: 'Pictogramă',
    ed_icon_helper: 'Înlocuiește ilustrația contorului',
    ed_subscribed_power: 'Putere contractată (kVA)',
    ed_subscribed_power_helper: 'Folosită pentru indicatorul de sarcină; implicit 6 kVA',
    ed_subscribed_power_entity: 'Senzor de putere contractată',
    ed_subscribed_power_entity_helper: 'Opțional: senzor care dă puterea contractată (kVA sau A, ca ISOUSC, pe fază la trifazat). Înlocuiește valoarea introdusă',
    ed_price: 'Preț per kWh',
    ed_price_helper: 'Opțional: afișează costul lângă consum',
    ed_tiers: 'Numele indexurilor',
    ed_tiers_helper: 'În ordinea indexurilor, de la 1 la 6 (ex. Noapte, Zi)',
    ed_prices: 'Preț per index',
    ed_prices_helper: 'Un preț per index, în aceeași ordine: număr sau senzor cu prețul pe kWh. Înlocuiește prețul per kWh',
    ed_compare: 'Compară Monoorar și Bioorar',
    ed_compare_base: 'Preț monoorar pe kWh',
    ed_compare_hc: 'Preț de noapte pe kWh',
    ed_compare_hp: 'Preț de zi pe kWh',
    ed_hc_hours: 'Ore de noapte',
    ed_hc_hours_helper: 'De ex. 22:30-06:30 sau 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Abonament monoorar pe lună',
    ed_sub_hchp: 'Abonament bioorar pe lună',
    cmp_title: 'Monoorar sau bioorar?',
    cmp_base: 'Monoorar',
    cmp_hchp: 'Noapte / zi',
    cmp_share: '{p} % noaptea',
    cmp_saves: '{c} economisește {v}',
    cmp_same: 'Aproape la fel: diferență de {v}',
    cmp_days: '{d} zile',
    ed_show_graph: 'Grafic 24 h',
    ed_show_stats: 'Consum',
    ed_show_index: 'Indexurile contorului',
    ed_show_phases: 'Detalii faze',
    ed_show_logo: 'Pictograma contorului',
    ed_zoom: 'Buton de detalii',
    ed_zoom_helper: 'Buton din dreapta sus care comută mini-cardul în cardul complet și invers',
    zoom_in: 'Afișează cardul complet',
    zoom_out: 'Înapoi la vizualizarea compactă',
    ed_language: 'Limbă',
    ed_language_helper: 'Lăsați gol pentru a urma limba Home Assistant',
    ed_entities: 'Entități (avansat)',
    ed_entities_helper: 'Detectate automat din dispozitiv; completați doar pentru a forța o entitate',
    en_energy: 'Index total',
    en_power: 'Putere activă',
    en_apparent_power: 'Putere aparentă',
    en_current: 'Curent',
    en_voltage: 'Tensiune',
    en_current_b: 'Curent faza 2',
    en_current_c: 'Curent faza 3',
    en_voltage_b: 'Tensiune faza 2',
    en_voltage_c: 'Tensiune faza 3',
    en_apparent_power_a: 'Putere aparentă faza 1',
    en_apparent_power_b: 'Putere aparentă faza 2',
    en_apparent_power_c: 'Putere aparentă faza 3',
    en_injection: 'Index injecție',
    en_tariff: 'Perioadă tarifară',
    tomorrow: 'Mâine',
    tempo_blue: 'Albastru',
    tempo_white: 'Alb',
    tempo_red: 'Roșu',
    tempo_unknown: 'Încă necunoscută',
    ed_show_tempo: 'Culoare Tempo',
    ed_load_warning: 'Prag de sarcină moderată',
    ed_load_warning_helper: 'Sarcină moderată de la acest procent din puterea contractată; implicit 50 %',
    ed_load_critical: 'Prag de sarcină ridicată',
    ed_load_critical_helper: 'Sarcină ridicată de la acest procent din puterea contractată; implicit 80 %',
    en_tempo: 'Culoare Tempo azi',
    en_tomorrow: 'Culoare Tempo mâine',
    en_tier1: 'Index 1', en_tier2: 'Index 2', en_tier3: 'Index 3', en_tier4: 'Index 4', en_tier5: 'Index 5', en_tier6: 'Index 6',
  },
  da: {
    title: 'Linky',
    meter: 'ZLinky-måler',
    load_low: 'Lav last',
    load_mid: 'Moderat last',
    load_high: 'Høj last',
    offline: 'Offline',
    of_subscribed: 'af {p} kVA aftalt effekt',
    today: 'I dag',
    yesterday: 'I går',
    month: 'Denne måned',
    last_24h: 'Seneste 24 t',
    peak: 'maks. {v}',
    index: 'Målerstand',
    tier: 'Tælleværk {n}',
    injection: 'Levering til nettet',
    phases: 'Faser',
    no_device: 'Ingen ZLinky fundet',
    no_sensor: 'Ingen ZLinky-sensor genkendt: vælg dem under »{e}«',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'LiXee ZLinky_TIC-enhed (ZHA eller Zigbee2MQTT)',
    ed_name: 'Navn',
    ed_name_helper: 'Lad stå tomt for »Linky«',
    ed_icon: 'Ikon',
    ed_icon_helper: 'Erstatter illustrationen af måleren',
    ed_subscribed_power: 'Aftalt effekt (kVA)',
    ed_subscribed_power_helper: 'Bruges til belastningsmåleren; 6 kVA som standard',
    ed_subscribed_power_entity: 'Sensor for aftalt effekt',
    ed_subscribed_power_entity_helper: 'Valgfrit: en sensor med den aftalte effekt (kVA eller A som ISOUSC, pr. fase ved trefaset). Erstatter den indtastede værdi',
    ed_price: 'Pris pr. kWh',
    ed_price_helper: 'Valgfrit: viser prisen ved siden af forbruget',
    ed_tiers: 'Navne på tælleværker',
    ed_tiers_helper: 'I tælleværkernes rækkefølge, 1 til 6 (f.eks. Lavlast, Spidslast)',
    ed_prices: 'Pris pr. tælleværk',
    ed_prices_helper: 'Én pris pr. tælleværk, i samme rækkefølge: et tal eller en sensor med prisen pr. kWh. Erstatter prisen pr. kWh',
    ed_compare: 'Sammenlign Fast pris og Lavlast',
    ed_compare_base: 'Fast pris pr. kWh',
    ed_compare_hc: 'Lavlastpris pr. kWh',
    ed_compare_hp: 'Spidslastpris pr. kWh',
    ed_hc_hours: 'Lavlasttimer',
    ed_hc_hours_helper: 'F.eks. 22:30-06:30 eller 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Abonnement fast pris pr. måned',
    ed_sub_hchp: 'Abonnement lav/spids pr. måned',
    cmp_title: 'Fast pris eller lavlast?',
    cmp_base: 'Fast pris',
    cmp_hchp: 'Lav- / spidslast',
    cmp_share: '{p} % i lavlast',
    cmp_saves: '{c} sparer {v}',
    cmp_same: 'Næsten det samme: {v} til forskel',
    cmp_days: '{d} dage',
    ed_show_graph: '24 t-graf',
    ed_show_stats: 'Forbrug',
    ed_show_index: 'Målerstande',
    ed_show_phases: 'Fasedetaljer',
    ed_show_logo: 'Målerikon',
    ed_zoom: 'Detaljeknap',
    ed_zoom_helper: 'Knap øverst til højre, der skifter minikortet til det fulde kort og tilbage',
    zoom_in: 'Vis det fulde kort',
    zoom_out: 'Tilbage til kompakt visning',
    ed_language: 'Sprog',
    ed_language_helper: 'Lad stå tomt for at følge sproget i Home Assistant',
    ed_entities: 'Entiteter (avanceret)',
    ed_entities_helper: 'Registreres automatisk fra enheden; udfyld kun for at tilsidesætte en entitet',
    en_energy: 'Samlet målerstand',
    en_power: 'Aktiv effekt',
    en_apparent_power: 'Tilsyneladende effekt',
    en_current: 'Strøm',
    en_voltage: 'Spænding',
    en_current_b: 'Strøm fase 2',
    en_current_c: 'Strøm fase 3',
    en_voltage_b: 'Spænding fase 2',
    en_voltage_c: 'Spænding fase 3',
    en_apparent_power_a: 'Tilsyneladende effekt fase 1',
    en_apparent_power_b: 'Tilsyneladende effekt fase 2',
    en_apparent_power_c: 'Tilsyneladende effekt fase 3',
    en_injection: 'Målerstand for levering',
    en_tariff: 'Tarifperiode',
    tomorrow: 'I morgen',
    tempo_blue: 'Blå',
    tempo_white: 'Hvid',
    tempo_red: 'Rød',
    tempo_unknown: 'Endnu ikke kendt',
    ed_show_tempo: 'Tempo-farve',
    ed_load_warning: 'Tærskel for moderat belastning',
    ed_load_warning_helper: 'Moderat belastning fra denne andel af den abonnerede effekt; 50 % som standard',
    ed_load_critical: 'Tærskel for høj belastning',
    ed_load_critical_helper: 'Høj belastning fra denne andel af den abonnerede effekt; 80 % som standard',
    en_tempo: 'Tempo-farve i dag',
    en_tomorrow: 'Tempo-farve i morgen',
    en_tier1: 'Tælleværk 1', en_tier2: 'Tælleværk 2', en_tier3: 'Tælleværk 3', en_tier4: 'Tælleværk 4', en_tier5: 'Tælleværk 5', en_tier6: 'Tælleværk 6',
  },
  sv: {
    title: 'Linky',
    meter: 'ZLinky-mätare',
    load_low: 'Låg last',
    load_mid: 'Måttlig last',
    load_high: 'Hög last',
    offline: 'Offline',
    of_subscribed: 'av {p} kVA abonnerad effekt',
    today: 'I dag',
    yesterday: 'I går',
    month: 'Denna månad',
    last_24h: 'Senaste 24 h',
    peak: 'max {v}',
    index: 'Mätarställning',
    tier: 'Register {n}',
    injection: 'Inmatning',
    phases: 'Faser',
    no_device: 'Ingen ZLinky hittades',
    no_sensor: 'Ingen ZLinky-sensor kändes igen: välj dem under ”{e}”',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'LiXee ZLinky_TIC-enhet (ZHA eller Zigbee2MQTT)',
    ed_name: 'Namn',
    ed_name_helper: 'Lämna tomt för ”Linky”',
    ed_icon: 'Ikon',
    ed_icon_helper: 'Ersätter mätarillustrationen',
    ed_subscribed_power: 'Abonnerad effekt (kVA)',
    ed_subscribed_power_helper: 'Används för belastningsmätaren; 6 kVA som standard',
    ed_subscribed_power_entity: 'Sensor för abonnerad effekt',
    ed_subscribed_power_entity_helper: 'Valfritt: en sensor med den abonnerade effekten (kVA eller A som ISOUSC, per fas vid trefas). Ersätter det angivna värdet',
    ed_price: 'Pris per kWh',
    ed_price_helper: 'Valfritt: visar kostnaden bredvid förbrukningen',
    ed_tiers: 'Registernamn',
    ed_tiers_helper: 'I registerordning, 1 till 6 (t.ex. Lågpris, Högpris)',
    ed_prices: 'Pris per register',
    ed_prices_helper: 'Ett pris per register, i samma ordning: ett tal eller en sensor med priset per kWh. Ersätter priset per kWh',
    ed_compare: 'Jämför Enkeltariff och Lågtid',
    ed_compare_base: 'Enkeltariff per kWh',
    ed_compare_hc: 'Lågtidspris per kWh',
    ed_compare_hp: 'Högtidspris per kWh',
    ed_hc_hours: 'Lågtidstimmar',
    ed_hc_hours_helper: 'T.ex. 22:30-06:30 eller 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Abonnemang enkeltariff per månad',
    ed_sub_hchp: 'Abonnemang låg/hög per månad',
    cmp_title: 'Enkeltariff eller lågtid?',
    cmp_base: 'Enkeltariff',
    cmp_hchp: 'Låg- / högtid',
    cmp_share: '{p} % lågtid',
    cmp_saves: '{c} sparar {v}',
    cmp_same: 'Ungefär samma: {v} i skillnad',
    cmp_days: '{d} dagar',
    ed_show_graph: '24 h-diagram',
    ed_show_stats: 'Förbrukning',
    ed_show_index: 'Mätarställningar',
    ed_show_phases: 'Fasdetaljer',
    ed_show_logo: 'Mätarikon',
    ed_zoom: 'Detaljknapp',
    ed_zoom_helper: 'Knapp uppe till höger som växlar minikortet till hela kortet och tillbaka',
    zoom_in: 'Visa hela kortet',
    zoom_out: 'Tillbaka till kompakt vy',
    ed_language: 'Språk',
    ed_language_helper: 'Lämna tomt för att följa språket i Home Assistant',
    ed_entities: 'Entiteter (avancerat)',
    ed_entities_helper: 'Identifieras automatiskt från enheten; fyll bara i för att åsidosätta en entitet',
    en_energy: 'Total mätarställning',
    en_power: 'Aktiv effekt',
    en_apparent_power: 'Skenbar effekt',
    en_current: 'Ström',
    en_voltage: 'Spänning',
    en_current_b: 'Ström fas 2',
    en_current_c: 'Ström fas 3',
    en_voltage_b: 'Spänning fas 2',
    en_voltage_c: 'Spänning fas 3',
    en_apparent_power_a: 'Skenbar effekt fas 1',
    en_apparent_power_b: 'Skenbar effekt fas 2',
    en_apparent_power_c: 'Skenbar effekt fas 3',
    en_injection: 'Mätarställning inmatning',
    en_tariff: 'Tariffperiod',
    tomorrow: 'I morgon',
    tempo_blue: 'Blå',
    tempo_white: 'Vit',
    tempo_red: 'Röd',
    tempo_unknown: 'Inte känd än',
    ed_show_tempo: 'Tempo-färg',
    ed_load_warning: 'Tröskel för måttlig last',
    ed_load_warning_helper: 'Måttlig last från denna andel av den abonnerade effekten; 50 % som standard',
    ed_load_critical: 'Tröskel för hög last',
    ed_load_critical_helper: 'Hög last från denna andel av den abonnerade effekten; 80 % som standard',
    en_tempo: 'Tempo-färg i dag',
    en_tomorrow: 'Tempo-färg i morgon',
    en_tier1: 'Register 1', en_tier2: 'Register 2', en_tier3: 'Register 3', en_tier4: 'Register 4', en_tier5: 'Register 5', en_tier6: 'Register 6',
  },
  bg: {
    title: 'Linky',
    meter: 'Електромер ZLinky',
    load_low: 'Нисък товар',
    load_mid: 'Умерен товар',
    load_high: 'Висок товар',
    offline: 'Офлайн',
    of_subscribed: 'от {p} kVA договорена мощност',
    today: 'Днес',
    yesterday: 'Вчера',
    month: 'Този месец',
    last_24h: 'Последните 24 h',
    peak: 'макс. {v}',
    index: 'Показание',
    tier: 'Тарифа {n}',
    injection: 'Отдадена енергия',
    phases: 'Фази',
    no_device: 'Не е намерен ZLinky',
    no_sensor: 'Не е разпознат сензор на ZLinky: изберете ги в „{e}“',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Устройство LiXee ZLinky_TIC (ZHA или Zigbee2MQTT)',
    ed_name: 'Име',
    ed_name_helper: 'Оставете празно за „Linky“',
    ed_icon: 'Икона',
    ed_icon_helper: 'Заменя илюстрацията на електромера',
    ed_subscribed_power: 'Договорена мощност (kVA)',
    ed_subscribed_power_helper: 'Използва се за индикатора на натоварването; по подразбиране 6 kVA',
    ed_subscribed_power_entity: 'Сензор за договорена мощност',
    ed_subscribed_power_entity_helper: 'По избор: сензор с договорената мощност (kVA или A като ISOUSC, на фаза при трифазно). Заменя въведената стойност',
    ed_price: 'Цена за kWh',
    ed_price_helper: 'По избор: показва цената до потреблението',
    ed_tiers: 'Имена на тарифите',
    ed_tiers_helper: 'По реда на тарифите, от 1 до 6 (напр. Нощна, Дневна)',
    ed_prices: 'Цена за тарифа',
    ed_prices_helper: 'Една цена за тарифа, в същия ред: число или сензор с цената за kWh. Заменя цената за kWh',
    ed_compare: 'Сравняване на Еднотарифен и Нощна тарифа',
    ed_compare_base: 'Еднотарифна цена за kWh',
    ed_compare_hc: 'Нощна цена за kWh',
    ed_compare_hp: 'Дневна цена за kWh',
    ed_hc_hours: 'Часове на нощна тарифа',
    ed_hc_hours_helper: 'Напр. 22:30-06:30 или 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Абонамент еднотарифен на месец',
    ed_sub_hchp: 'Абонамент дневна/нощна на месец',
    cmp_title: 'Еднотарифен или нощна тарифа?',
    cmp_base: 'Еднотарифен',
    cmp_hchp: 'Нощна / дневна',
    cmp_share: '{p} % нощна тарифа',
    cmp_saves: '{c} спестява {v}',
    cmp_same: 'Почти еднакво: разлика {v}',
    cmp_days: '{d} дни',
    ed_show_graph: 'Графика за 24 h',
    ed_show_stats: 'Потребление',
    ed_show_index: 'Показания на електромера',
    ed_show_phases: 'Подробности за фазите',
    ed_show_logo: 'Икона на електромера',
    ed_zoom: 'Бутон за подробности',
    ed_zoom_helper: 'Бутон горе вдясно, който превключва мини картата към пълната карта и обратно',
    zoom_in: 'Покажи пълната карта',
    zoom_out: 'Назад към компактния изглед',
    ed_language: 'Език',
    ed_language_helper: 'Оставете празно, за да се използва езикът на Home Assistant',
    ed_entities: 'Обекти (разширени)',
    ed_entities_helper: 'Откриват се автоматично от устройството; попълнете само за да зададете друг обект',
    en_energy: 'Общо показание',
    en_power: 'Активна мощност',
    en_apparent_power: 'Пълна мощност',
    en_current: 'Ток',
    en_voltage: 'Напрежение',
    en_current_b: 'Ток фаза 2',
    en_current_c: 'Ток фаза 3',
    en_voltage_b: 'Напрежение фаза 2',
    en_voltage_c: 'Напрежение фаза 3',
    en_apparent_power_a: 'Пълна мощност фаза 1',
    en_apparent_power_b: 'Пълна мощност фаза 2',
    en_apparent_power_c: 'Пълна мощност фаза 3',
    en_injection: 'Показание за отдадена енергия',
    en_tariff: 'Тарифен период',
    tomorrow: 'Утре',
    tempo_blue: 'Син',
    tempo_white: 'Бял',
    tempo_red: 'Червен',
    tempo_unknown: 'Все още не е известен',
    ed_show_tempo: 'Цвят Tempo',
    ed_load_warning: 'Праг за умерено натоварване',
    ed_load_warning_helper: 'Умерено натоварване от този дял от договорената мощност; по подразбиране 50 %',
    ed_load_critical: 'Праг за високо натоварване',
    ed_load_critical_helper: 'Високо натоварване от този дял от договорената мощност; по подразбиране 80 %',
    en_tempo: 'Цвят Tempo днес',
    en_tomorrow: 'Цвят Tempo утре',
    en_tier1: 'Тарифа 1', en_tier2: 'Тарифа 2', en_tier3: 'Тарифа 3', en_tier4: 'Тарифа 4', en_tier5: 'Тарифа 5', en_tier6: 'Тарифа 6',
  },
  ru: {
    title: 'Linky',
    meter: 'Счетчик ZLinky',
    load_low: 'Низкая нагрузка',
    load_mid: 'Средняя нагрузка',
    load_high: 'Высокая нагрузка',
    offline: 'Не в сети',
    of_subscribed: 'из {p} kVA по договору',
    today: 'Сегодня',
    yesterday: 'Вчера',
    month: 'Этот месяц',
    last_24h: 'Последние 24 h',
    peak: 'макс. {v}',
    index: 'Показания',
    tier: 'Тариф {n}',
    injection: 'Отдача в сеть',
    phases: 'Фазы',
    no_device: 'ZLinky не найден',
    no_sensor: 'Не распознано ни одного сенсора ZLinky: выберите их в разделе «{e}»',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Устройство LiXee ZLinky_TIC (ZHA или Zigbee2MQTT)',
    ed_name: 'Название',
    ed_name_helper: 'Оставьте пустым для «Linky»',
    ed_icon: 'Иконка',
    ed_icon_helper: 'Заменяет изображение счетчика',
    ed_subscribed_power: 'Мощность по договору (kVA)',
    ed_subscribed_power_helper: 'Используется для индикатора нагрузки; по умолчанию 6 kVA',
    ed_subscribed_power_entity: 'Датчик мощности по договору',
    ed_subscribed_power_entity_helper: 'Необязательно: датчик с мощностью по договору (kVA или A, как ISOUSC, на фазу при трёхфазном). Заменяет введённое значение',
    ed_price: 'Цена за kWh',
    ed_price_helper: 'Необязательно: показывает стоимость рядом с потреблением',
    ed_tiers: 'Названия тарифов',
    ed_tiers_helper: 'В порядке тарифов, от 1 до 6 (например, Ночь, День)',
    ed_prices: 'Цена по тарифам',
    ed_prices_helper: 'Одна цена на тариф, в том же порядке: число или датчик с ценой за kWh. Заменяет цену за kWh',
    ed_compare: 'Сравнить однотарифный и ночной',
    ed_compare_base: 'Однотарифная цена за kWh',
    ed_compare_hc: 'Ночная цена за kWh',
    ed_compare_hp: 'Дневная цена за kWh',
    ed_hc_hours: 'Часы ночного тарифа',
    ed_hc_hours_helper: 'Напр. 22:30-06:30 или 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Абонплата однотарифная в месяц',
    ed_sub_hchp: 'Абонплата день/ночь в месяц',
    cmp_title: 'Однотарифный или ночной?',
    cmp_base: 'Однотарифный',
    cmp_hchp: 'Ночь / день',
    cmp_share: '{p} % ночью',
    cmp_saves: '{c} экономит {v}',
    cmp_same: 'Почти одинаково: разница {v}',
    cmp_days: '{d} дн.',
    ed_show_graph: 'График за 24 h',
    ed_show_stats: 'Потребление',
    ed_show_index: 'Показания счетчика',
    ed_show_phases: 'Данные по фазам',
    ed_show_logo: 'Иконка счетчика',
    ed_zoom: 'Кнопка подробностей',
    ed_zoom_helper: 'Кнопка в правом верхнем углу, переключающая мини-карточку на полную карточку и обратно',
    zoom_in: 'Показать полную карточку',
    zoom_out: 'Вернуться к компактному виду',
    ed_language: 'Язык',
    ed_language_helper: 'Оставьте пустым, чтобы использовать язык Home Assistant',
    ed_entities: 'Объекты (дополнительно)',
    ed_entities_helper: 'Определяются автоматически по устройству; заполняйте, только чтобы заменить объект',
    en_energy: 'Общие показания',
    en_power: 'Активная мощность',
    en_apparent_power: 'Полная мощность',
    en_current: 'Ток',
    en_voltage: 'Напряжение',
    en_current_b: 'Ток фазы 2',
    en_current_c: 'Ток фазы 3',
    en_voltage_b: 'Напряжение фазы 2',
    en_voltage_c: 'Напряжение фазы 3',
    en_apparent_power_a: 'Полная мощность фазы 1',
    en_apparent_power_b: 'Полная мощность фазы 2',
    en_apparent_power_c: 'Полная мощность фазы 3',
    en_injection: 'Показания отдачи',
    en_tariff: 'Тарифная зона',
    tomorrow: 'Завтра',
    tempo_blue: 'Синий',
    tempo_white: 'Белый',
    tempo_red: 'Красный',
    tempo_unknown: 'Пока неизвестен',
    ed_show_tempo: 'Цвет Tempo',
    ed_load_warning: 'Порог умеренной нагрузки',
    ed_load_warning_helper: 'Умеренная нагрузка с этой доли договорной мощности; по умолчанию 50 %',
    ed_load_critical: 'Порог высокой нагрузки',
    ed_load_critical_helper: 'Высокая нагрузка с этой доли договорной мощности; по умолчанию 80 %',
    en_tempo: 'Цвет Tempo сегодня',
    en_tomorrow: 'Цвет Tempo завтра',
    en_tier1: 'Тариф 1', en_tier2: 'Тариф 2', en_tier3: 'Тариф 3', en_tier4: 'Тариф 4', en_tier5: 'Тариф 5', en_tier6: 'Тариф 6',
  },
  uk: {
    title: 'Linky',
    meter: 'Лічильник ZLinky',
    load_low: 'Низьке навантаження',
    load_mid: 'Середнє навантаження',
    load_high: 'Високе навантаження',
    offline: 'Не в мережі',
    of_subscribed: 'з {p} kVA за договором',
    today: 'Сьогодні',
    yesterday: 'Вчора',
    month: 'Цей місяць',
    last_24h: 'Останні 24 h',
    peak: 'макс. {v}',
    index: 'Показники',
    tier: 'Тариф {n}',
    injection: 'Віддача в мережу',
    phases: 'Фази',
    no_device: 'ZLinky не знайдено',
    no_sensor: 'Не розпізнано жодного сенсора ZLinky: виберіть їх у розділі «{e}»',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Пристрій LiXee ZLinky_TIC (ZHA або Zigbee2MQTT)',
    ed_name: 'Назва',
    ed_name_helper: 'Залиште порожнім для «Linky»',
    ed_icon: 'Іконка',
    ed_icon_helper: 'Замінює зображення лічильника',
    ed_subscribed_power: 'Потужність за договором (kVA)',
    ed_subscribed_power_helper: 'Використовується для індикатора навантаження; типово 6 kVA',
    ed_subscribed_power_entity: 'Датчик потужності за договором',
    ed_subscribed_power_entity_helper: 'Необов’язково: датчик із потужністю за договором (kVA або A, як ISOUSC, на фазу при трифазному). Замінює введене значення',
    ed_price: 'Ціна за kWh',
    ed_price_helper: 'Необов’язково: показує вартість поруч зі споживанням',
    ed_tiers: 'Назви тарифів',
    ed_tiers_helper: 'У порядку тарифів, від 1 до 6 (наприклад, Ніч, День)',
    ed_prices: 'Ціна за тарифами',
    ed_prices_helper: 'Одна ціна на тариф, у тому самому порядку: число або датчик із ціною за kWh. Замінює ціну за kWh',
    ed_compare: 'Порівняти однотарифний і нічний',
    ed_compare_base: 'Однотарифна ціна за kWh',
    ed_compare_hc: 'Нічна ціна за kWh',
    ed_compare_hp: 'Денна ціна за kWh',
    ed_hc_hours: 'Години нічного тарифу',
    ed_hc_hours_helper: 'Напр. 22:30-06:30 або 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Абонплата однотарифна на місяць',
    ed_sub_hchp: 'Абонплата день/ніч на місяць',
    cmp_title: 'Однотарифний чи нічний?',
    cmp_base: 'Однотарифний',
    cmp_hchp: 'Ніч / день',
    cmp_share: '{p} % вночі',
    cmp_saves: '{c} заощаджує {v}',
    cmp_same: 'Майже однаково: різниця {v}',
    cmp_days: '{d} дн.',
    ed_show_graph: 'Графік за 24 h',
    ed_show_stats: 'Споживання',
    ed_show_index: 'Показники лічильника',
    ed_show_phases: 'Дані по фазах',
    ed_show_logo: 'Іконка лічильника',
    ed_zoom: 'Кнопка деталей',
    ed_zoom_helper: 'Кнопка у правому верхньому куті, що перемикає мінікартку на повну картку й назад',
    zoom_in: 'Показати повну картку',
    zoom_out: 'Повернутися до компактного вигляду',
    ed_language: 'Мова',
    ed_language_helper: 'Залиште порожнім, щоб використовувати мову Home Assistant',
    ed_entities: 'Сутності (додатково)',
    ed_entities_helper: 'Визначаються автоматично з пристрою; заповнюйте лише, щоб замінити сутність',
    en_energy: 'Загальні показники',
    en_power: 'Активна потужність',
    en_apparent_power: 'Повна потужність',
    en_current: 'Струм',
    en_voltage: 'Напруга',
    en_current_b: 'Струм фази 2',
    en_current_c: 'Струм фази 3',
    en_voltage_b: 'Напруга фази 2',
    en_voltage_c: 'Напруга фази 3',
    en_apparent_power_a: 'Повна потужність фази 1',
    en_apparent_power_b: 'Повна потужність фази 2',
    en_apparent_power_c: 'Повна потужність фази 3',
    en_injection: 'Показники віддачі',
    en_tariff: 'Тарифна зона',
    tomorrow: 'Завтра',
    tempo_blue: 'Синій',
    tempo_white: 'Білий',
    tempo_red: 'Червоний',
    tempo_unknown: 'Ще невідомий',
    ed_show_tempo: 'Колір Tempo',
    ed_load_warning: 'Поріг помірного навантаження',
    ed_load_warning_helper: 'Помірне навантаження з цієї частки договірної потужності; типово 50 %',
    ed_load_critical: 'Поріг високого навантаження',
    ed_load_critical_helper: 'Високе навантаження з цієї частки договірної потужності; типово 80 %',
    en_tempo: 'Колір Tempo сьогодні',
    en_tomorrow: 'Колір Tempo завтра',
    en_tier1: 'Тариф 1', en_tier2: 'Тариф 2', en_tier3: 'Тариф 3', en_tier4: 'Тариф 4', en_tier5: 'Тариф 5', en_tier6: 'Тариф 6',
  },
  hu: {
    title: 'Linky',
    meter: 'ZLinky mérő',
    load_low: 'Kis terhelés',
    load_mid: 'Közepes terhelés',
    load_high: 'Nagy terhelés',
    offline: 'Nem elérhető',
    of_subscribed: '{p} kVA lekötött teljesítményből',
    today: 'Ma',
    yesterday: 'Tegnap',
    month: 'Ez a hónap',
    last_24h: 'Elmúlt 24 h',
    peak: 'max. {v}',
    index: 'Mérőállás',
    tier: 'Tarifa {n}',
    injection: 'Betáplálás',
    phases: 'Fázisok',
    no_device: 'Nem található ZLinky',
    no_sensor: 'Nem ismerhető fel ZLinky érzékelő: válassza ki őket itt: „{e}”',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'LiXee ZLinky_TIC eszköz (ZHA vagy Zigbee2MQTT)',
    ed_name: 'Név',
    ed_name_helper: 'Hagyja üresen a „Linky” névhez',
    ed_icon: 'Ikon',
    ed_icon_helper: 'A mérő illusztrációját helyettesíti',
    ed_subscribed_power: 'Lekötött teljesítmény (kVA)',
    ed_subscribed_power_helper: 'A terhelésjelzőhöz használatos; alapértelmezés: 6 kVA',
    ed_subscribed_power_entity: 'Lekötött teljesítmény érzékelője',
    ed_subscribed_power_entity_helper: 'Opcionális: a lekötött teljesítményt adó érzékelő (kVA, vagy A, mint az ISOUSC, háromfázisnál fázisonként). A beírt érték helyébe lép',
    ed_price: 'kWh-ár',
    ed_price_helper: 'Opcionális: a költséget a fogyasztás mellett jeleníti meg',
    ed_tiers: 'Tarifák nevei',
    ed_tiers_helper: 'A tarifák sorrendjében, 1-től 6-ig (pl. Völgyidő, Csúcsidő)',
    ed_prices: 'Ár tarifánként',
    ed_prices_helper: 'Tarifánként egy ár, ugyanabban a sorrendben: szám vagy a kWh-árat adó érzékelő. A kWh-ár helyébe lép',
    ed_compare: 'Egyzónás és vezérelt tarifa összevetése',
    ed_compare_base: 'Egyzónás ár kWh-nként',
    ed_compare_hc: 'Völgyidőszaki ár kWh-nként',
    ed_compare_hp: 'Csúcsidőszaki ár kWh-nként',
    ed_hc_hours: 'Völgyidőszak',
    ed_hc_hours_helper: 'Pl. 22:30-06:30 vagy 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Egyzónás alapdíj havonta',
    ed_sub_hchp: 'Kétzónás alapdíj havonta',
    cmp_title: 'Egyzónás vagy völgyidőszak?',
    cmp_base: 'Egyzónás',
    cmp_hchp: 'Völgy / csúcs',
    cmp_share: '{p} % völgyidőszakban',
    cmp_saves: '{c}: {v} megtakarítás',
    cmp_same: 'Nagyjából ugyanannyi: {v} eltérés',
    cmp_days: '{d} nap',
    ed_show_graph: '24 h grafikon',
    ed_show_stats: 'Fogyasztás',
    ed_show_index: 'Mérőállások',
    ed_show_phases: 'Fázisok részletei',
    ed_show_logo: 'Mérő ikonja',
    ed_zoom: 'Részletek gomb',
    ed_zoom_helper: 'A jobb felső sarokban lévő gomb, amely a minikártyát teljes kártyára váltja, majd vissza',
    zoom_in: 'Teljes kártya megjelenítése',
    zoom_out: 'Vissza a kompakt nézethez',
    ed_language: 'Nyelv',
    ed_language_helper: 'Hagyja üresen a Home Assistant nyelvének követéséhez',
    ed_entities: 'Entitások (haladó)',
    ed_entities_helper: 'Automatikusan felismerve az eszközből; csak egy entitás felülbírálásához töltse ki',
    en_energy: 'Összesített mérőállás',
    en_power: 'Hatásos teljesítmény',
    en_apparent_power: 'Látszólagos teljesítmény',
    en_current: 'Áramerősség',
    en_voltage: 'Feszültség',
    en_current_b: '2. fázis áramerőssége',
    en_current_c: '3. fázis áramerőssége',
    en_voltage_b: '2. fázis feszültsége',
    en_voltage_c: '3. fázis feszültsége',
    en_apparent_power_a: '1. fázis látszólagos teljesítménye',
    en_apparent_power_b: '2. fázis látszólagos teljesítménye',
    en_apparent_power_c: '3. fázis látszólagos teljesítménye',
    en_injection: 'Betáplálási mérőállás',
    en_tariff: 'Tarifaidőszak',
    tomorrow: 'Holnap',
    tempo_blue: 'Kék',
    tempo_white: 'Fehér',
    tempo_red: 'Piros',
    tempo_unknown: 'Még nem ismert',
    ed_show_tempo: 'Tempo szín',
    ed_load_warning: 'Közepes terhelés küszöbe',
    ed_load_warning_helper: 'Közepes terhelés a szerződéses teljesítmény ezen arányától; alapértelmezés 50 %',
    ed_load_critical: 'Magas terhelés küszöbe',
    ed_load_critical_helper: 'Magas terhelés a szerződéses teljesítmény ezen arányától; alapértelmezés 80 %',
    en_tempo: 'Mai Tempo szín',
    en_tomorrow: 'Holnapi Tempo szín',
    en_tier1: 'Tarifa 1', en_tier2: 'Tarifa 2', en_tier3: 'Tarifa 3', en_tier4: 'Tarifa 4', en_tier5: 'Tarifa 5', en_tier6: 'Tarifa 6',
  },
  sk: {
    title: 'Linky',
    meter: 'Elektromer ZLinky',
    load_low: 'Nízka záťaž',
    load_mid: 'Stredná záťaž',
    load_high: 'Vysoká záťaž',
    offline: 'Offline',
    of_subscribed: 'z {p} kVA zmluvného výkonu',
    today: 'Dnes',
    yesterday: 'Včera',
    month: 'Tento mesiac',
    last_24h: 'Posledných 24 h',
    peak: 'max. {v}',
    index: 'Stav',
    tier: 'Pásmo {n}',
    injection: 'Dodávka do siete',
    phases: 'Fázy',
    no_device: 'Nenašiel sa žiadny ZLinky',
    no_sensor: 'Nerozpoznal sa žiadny senzor ZLinky: vyberte ich v časti „{e}“',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Zariadenie LiXee ZLinky_TIC (ZHA alebo Zigbee2MQTT)',
    ed_name: 'Názov',
    ed_name_helper: 'Nechajte prázdne pre „Linky“',
    ed_icon: 'Ikona',
    ed_icon_helper: 'Nahrádza ilustráciu elektromera',
    ed_subscribed_power: 'Zmluvný výkon (kVA)',
    ed_subscribed_power_helper: 'Používa sa pre ukazovateľ zaťaženia; predvolene 6 kVA',
    ed_subscribed_power_entity: 'Senzor zmluvného výkonu',
    ed_subscribed_power_entity_helper: 'Voliteľné: senzor so zmluvným výkonom (kVA alebo A ako ISOUSC, pri trojfázovom na fázu). Nahrádza zadanú hodnotu',
    ed_price: 'Cena za kWh',
    ed_price_helper: 'Voliteľné: zobrazí náklady vedľa spotreby',
    ed_tiers: 'Názvy pásiem',
    ed_tiers_helper: 'V poradí pásiem od 1 do 6 (napr. Nízka tarifa, Vysoká tarifa)',
    ed_prices: 'Cena podľa pásma',
    ed_prices_helper: 'Jedna cena na pásmo, v rovnakom poradí: číslo alebo senzor s cenou za kWh. Nahrádza cenu za kWh',
    ed_compare: 'Porovnať jednotarif a nízku tarifu',
    ed_compare_base: 'Cena jednotarifu za kWh',
    ed_compare_hc: 'Cena nízkej tarify za kWh',
    ed_compare_hp: 'Cena vysokej tarify za kWh',
    ed_hc_hours: 'Hodiny nízkej tarify',
    ed_hc_hours_helper: 'Napr. 22:30-06:30 alebo 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Poplatok jednotarif mesačne',
    ed_sub_hchp: 'Poplatok dvojtarif mesačne',
    cmp_title: 'Jednotarif alebo nízka tarifa?',
    cmp_base: 'Jednotarif',
    cmp_hchp: 'Nízka / vysoká',
    cmp_share: '{p} % v nízkej tarife',
    cmp_saves: '{c} ušetrí {v}',
    cmp_same: 'Takmer rovnaké: rozdiel {v}',
    cmp_days: '{d} dní',
    ed_show_graph: 'Graf za 24 h',
    ed_show_stats: 'Spotreba',
    ed_show_index: 'Stavy elektromera',
    ed_show_phases: 'Podrobnosti fáz',
    ed_show_logo: 'Ikona elektromera',
    ed_zoom: 'Tlačidlo podrobností',
    ed_zoom_helper: 'Tlačidlo vpravo hore, ktoré prepína minikartu na celú kartu a späť',
    zoom_in: 'Zobraziť celú kartu',
    zoom_out: 'Späť na kompaktné zobrazenie',
    ed_language: 'Jazyk',
    ed_language_helper: 'Nechajte prázdne, ak chcete používať jazyk Home Assistant',
    ed_entities: 'Entity (pokročilé)',
    ed_entities_helper: 'Zisťujú sa automaticky zo zariadenia; vyplňte, len ak chcete entitu vynútiť',
    en_energy: 'Celkový stav',
    en_power: 'Činný výkon',
    en_apparent_power: 'Zdanlivý výkon',
    en_current: 'Prúd',
    en_voltage: 'Napätie',
    en_current_b: 'Prúd fázy 2',
    en_current_c: 'Prúd fázy 3',
    en_voltage_b: 'Napätie fázy 2',
    en_voltage_c: 'Napätie fázy 3',
    en_apparent_power_a: 'Zdanlivý výkon fázy 1',
    en_apparent_power_b: 'Zdanlivý výkon fázy 2',
    en_apparent_power_c: 'Zdanlivý výkon fázy 3',
    en_injection: 'Stav dodávky',
    en_tariff: 'Tarifné obdobie',
    tomorrow: 'Zajtra',
    tempo_blue: 'Modrá',
    tempo_white: 'Biela',
    tempo_red: 'Červená',
    tempo_unknown: 'Zatiaľ neznáma',
    ed_show_tempo: 'Farba Tempo',
    ed_load_warning: 'Prah stredného zaťaženia',
    ed_load_warning_helper: 'Stredné zaťaženie od tohto podielu zmluvného výkonu; predvolene 50 %',
    ed_load_critical: 'Prah vysokého zaťaženia',
    ed_load_critical_helper: 'Vysoké zaťaženie od tohto podielu zmluvného výkonu; predvolene 80 %',
    en_tempo: 'Farba Tempo dnes',
    en_tomorrow: 'Farba Tempo zajtra',
    en_tier1: 'Pásmo 1', en_tier2: 'Pásmo 2', en_tier3: 'Pásmo 3', en_tier4: 'Pásmo 4', en_tier5: 'Pásmo 5', en_tier6: 'Pásmo 6',
  },
  cs: {
    title: 'Linky',
    meter: 'Elektroměr ZLinky',
    load_low: 'Nízké zatížení',
    load_mid: 'Střední zatížení',
    load_high: 'Vysoké zatížení',
    offline: 'Offline',
    of_subscribed: 'z {p} kVA rezervovaného příkonu',
    today: 'Dnes',
    yesterday: 'Včera',
    month: 'Tento měsíc',
    last_24h: 'Posledních 24 h',
    peak: 'max. {v}',
    index: 'Stav',
    tier: 'Pásmo {n}',
    injection: 'Dodávka do sítě',
    phases: 'Fáze',
    no_device: 'Nebyl nalezen žádný ZLinky',
    no_sensor: 'Nebyl rozpoznán žádný senzor ZLinky: vyberte je v části „{e}“',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Zařízení LiXee ZLinky_TIC (ZHA nebo Zigbee2MQTT)',
    ed_name: 'Název',
    ed_name_helper: 'Ponechte prázdné pro „Linky“',
    ed_icon: 'Ikona',
    ed_icon_helper: 'Nahrazuje ilustraci elektroměru',
    ed_subscribed_power: 'Rezervovaný příkon (kVA)',
    ed_subscribed_power_helper: 'Používá se pro ukazatel zatížení; výchozí 6 kVA',
    ed_subscribed_power_entity: 'Senzor rezervovaného příkonu',
    ed_subscribed_power_entity_helper: 'Volitelné: senzor s rezervovaným příkonem (kVA nebo A jako ISOUSC, u třífázového na fázi). Nahrazuje zadanou hodnotu',
    ed_price: 'Cena za kWh',
    ed_price_helper: 'Volitelné: zobrazí náklady vedle spotřeby',
    ed_tiers: 'Názvy pásem',
    ed_tiers_helper: 'V pořadí pásem od 1 do 6 (např. Nízký tarif, Vysoký tarif)',
    ed_prices: 'Cena podle pásma',
    ed_prices_helper: 'Jedna cena na pásmo, ve stejném pořadí: číslo nebo senzor s cenou za kWh. Nahrazuje cenu za kWh',
    ed_compare: 'Porovnat jednotarif a nízký tarif',
    ed_compare_base: 'Cena jednotarifu za kWh',
    ed_compare_hc: 'Cena nízkého tarifu za kWh',
    ed_compare_hp: 'Cena vysokého tarifu za kWh',
    ed_hc_hours: 'Hodiny nízkého tarifu',
    ed_hc_hours_helper: 'Např. 22:30-06:30 nebo 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Poplatek jednotarif měsíčně',
    ed_sub_hchp: 'Poplatek dvoutarif měsíčně',
    cmp_title: 'Jednotarif, nebo nízký tarif?',
    cmp_base: 'Jednotarif',
    cmp_hchp: 'Nízký / vysoký',
    cmp_share: '{p} % v nízkém tarifu',
    cmp_saves: '{c} ušetří {v}',
    cmp_same: 'Téměř stejné: rozdíl {v}',
    cmp_days: '{d} dní',
    ed_show_graph: 'Graf za 24 h',
    ed_show_stats: 'Spotřeba',
    ed_show_index: 'Stavy elektroměru',
    ed_show_phases: 'Podrobnosti fází',
    ed_show_logo: 'Ikona elektroměru',
    ed_zoom: 'Tlačítko podrobností',
    ed_zoom_helper: 'Tlačítko vpravo nahoře, které přepíná minikartu na celou kartu a zpět',
    zoom_in: 'Zobrazit celou kartu',
    zoom_out: 'Zpět na kompaktní zobrazení',
    ed_language: 'Jazyk',
    ed_language_helper: 'Ponechte prázdné, chcete-li používat jazyk Home Assistant',
    ed_entities: 'Entity (pokročilé)',
    ed_entities_helper: 'Zjišťují se automaticky ze zařízení; vyplňte, jen pokud chcete entitu vynutit',
    en_energy: 'Celkový stav',
    en_power: 'Činný výkon',
    en_apparent_power: 'Zdánlivý výkon',
    en_current: 'Proud',
    en_voltage: 'Napětí',
    en_current_b: 'Proud fáze 2',
    en_current_c: 'Proud fáze 3',
    en_voltage_b: 'Napětí fáze 2',
    en_voltage_c: 'Napětí fáze 3',
    en_apparent_power_a: 'Zdánlivý výkon fáze 1',
    en_apparent_power_b: 'Zdánlivý výkon fáze 2',
    en_apparent_power_c: 'Zdánlivý výkon fáze 3',
    en_injection: 'Stav dodávky',
    en_tariff: 'Tarifní období',
    tomorrow: 'Zítra',
    tempo_blue: 'Modrá',
    tempo_white: 'Bílá',
    tempo_red: 'Červená',
    tempo_unknown: 'Zatím neznámá',
    ed_show_tempo: 'Barva Tempo',
    ed_load_warning: 'Práh středního zatížení',
    ed_load_warning_helper: 'Střední zatížení od tohoto podílu sjednaného příkonu; výchozí 50 %',
    ed_load_critical: 'Práh vysokého zatížení',
    ed_load_critical_helper: 'Vysoké zatížení od tohoto podílu sjednaného příkonu; výchozí 80 %',
    en_tempo: 'Barva Tempo dnes',
    en_tomorrow: 'Barva Tempo zítra',
    en_tier1: 'Pásmo 1', en_tier2: 'Pásmo 2', en_tier3: 'Pásmo 3', en_tier4: 'Pásmo 4', en_tier5: 'Pásmo 5', en_tier6: 'Pásmo 6',
  },
  sl: {
    title: 'Linky',
    meter: 'Števec ZLinky',
    load_low: 'Nizka obremenitev',
    load_mid: 'Zmerna obremenitev',
    load_high: 'Visoka obremenitev',
    offline: 'Brez povezave',
    of_subscribed: 'od {p} kVA dogovorjene moči',
    today: 'Danes',
    yesterday: 'Včeraj',
    month: 'Ta mesec',
    last_24h: 'Zadnjih 24 h',
    peak: 'maks. {v}',
    index: 'Stanje',
    tier: 'Tarifa {n}',
    injection: 'Oddaja v omrežje',
    phases: 'Faze',
    no_device: 'Najden ni bil noben ZLinky',
    no_sensor: 'Prepoznan ni bil noben senzor ZLinky: izberite jih v razdelku »{e}«',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Naprava LiXee ZLinky_TIC (ZHA ali Zigbee2MQTT)',
    ed_name: 'Ime',
    ed_name_helper: 'Pustite prazno za »Linky«',
    ed_icon: 'Ikona',
    ed_icon_helper: 'Nadomesti ilustracijo števca',
    ed_subscribed_power: 'Dogovorjena moč (kVA)',
    ed_subscribed_power_helper: 'Uporablja se za kazalnik obremenitve; privzeto 6 kVA',
    ed_subscribed_power_entity: 'Senzor dogovorjene moči',
    ed_subscribed_power_entity_helper: 'Neobvezno: senzor z dogovorjeno močjo (kVA ali A kot ISOUSC, pri trifaznem na fazo). Nadomesti vneseno vrednost',
    ed_price: 'Cena za kWh',
    ed_price_helper: 'Neobvezno: prikaže strošek poleg porabe',
    ed_tiers: 'Imena tarif',
    ed_tiers_helper: 'V vrstnem redu tarif od 1 do 6 (npr. Nizka tarifa, Visoka tarifa)',
    ed_prices: 'Cena po tarifi',
    ed_prices_helper: 'Ena cena na tarifo, v enakem vrstnem redu: število ali senzor s ceno za kWh. Nadomesti ceno za kWh',
    ed_compare: 'Primerjaj enotno in nižjo tarifo',
    ed_compare_base: 'Enotna cena za kWh',
    ed_compare_hc: 'Cena nižje tarife za kWh',
    ed_compare_hp: 'Cena višje tarife za kWh',
    ed_hc_hours: 'Ure nižje tarife',
    ed_hc_hours_helper: 'Npr. 22:30-06:30 ali 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Naročnina enotna na mesec',
    ed_sub_hchp: 'Naročnina dvotarifna na mesec',
    cmp_title: 'Enotna ali nižja tarifa?',
    cmp_base: 'Enotna',
    cmp_hchp: 'Nižja / višja',
    cmp_share: '{p} % v nižji tarifi',
    cmp_saves: '{c} prihrani {v}',
    cmp_same: 'Skoraj enako: razlika {v}',
    cmp_days: '{d} dni',
    ed_show_graph: 'Graf 24 h',
    ed_show_stats: 'Poraba',
    ed_show_index: 'Stanja števca',
    ed_show_phases: 'Podrobnosti faz',
    ed_show_logo: 'Ikona števca',
    ed_zoom: 'Gumb za podrobnosti',
    ed_zoom_helper: 'Gumb zgoraj desno, ki preklopi mini kartico v polno kartico in nazaj',
    zoom_in: 'Prikaži polno kartico',
    zoom_out: 'Nazaj na strnjen pogled',
    ed_language: 'Jezik',
    ed_language_helper: 'Pustite prazno, če želite uporabljati jezik Home Assistanta',
    ed_entities: 'Entitete (napredno)',
    ed_entities_helper: 'Zaznajo se samodejno iz naprave; izpolnite le, če želite vsiliti entiteto',
    en_energy: 'Skupno stanje',
    en_power: 'Delovna moč',
    en_apparent_power: 'Navidezna moč',
    en_current: 'Tok',
    en_voltage: 'Napetost',
    en_current_b: 'Tok faze 2',
    en_current_c: 'Tok faze 3',
    en_voltage_b: 'Napetost faze 2',
    en_voltage_c: 'Napetost faze 3',
    en_apparent_power_a: 'Navidezna moč faze 1',
    en_apparent_power_b: 'Navidezna moč faze 2',
    en_apparent_power_c: 'Navidezna moč faze 3',
    en_injection: 'Stanje oddaje',
    en_tariff: 'Tarifno obdobje',
    tomorrow: 'Jutri',
    tempo_blue: 'Modra',
    tempo_white: 'Bela',
    tempo_red: 'Rdeča',
    tempo_unknown: 'Še ni znana',
    ed_show_tempo: 'Barva Tempo',
    ed_load_warning: 'Prag zmerne obremenitve',
    ed_load_warning_helper: 'Zmerna obremenitev od tega deleža priključne moči; privzeto 50 %',
    ed_load_critical: 'Prag visoke obremenitve',
    ed_load_critical_helper: 'Visoka obremenitev od tega deleža priključne moči; privzeto 80 %',
    en_tempo: 'Barva Tempo danes',
    en_tomorrow: 'Barva Tempo jutri',
    en_tier1: 'Tarifa 1', en_tier2: 'Tarifa 2', en_tier3: 'Tarifa 3', en_tier4: 'Tarifa 4', en_tier5: 'Tarifa 5', en_tier6: 'Tarifa 6',
  },
  lv: {
    title: 'Linky',
    meter: 'ZLinky skaitītājs',
    load_low: 'Zema slodze',
    load_mid: 'Mērena slodze',
    load_high: 'Augsta slodze',
    offline: 'Bezsaistē',
    of_subscribed: 'no {p} kVA pieslēguma jaudas',
    today: 'Šodien',
    yesterday: 'Vakar',
    month: 'Šis mēnesis',
    last_24h: 'Pēdējās 24 h',
    peak: 'maks. {v}',
    index: 'Rādījums',
    tier: 'Zona {n}',
    injection: 'Nodošana tīklā',
    phases: 'Fāzes',
    no_device: 'Nav atrasts neviens ZLinky',
    no_sensor: 'Nav atpazīts neviens ZLinky sensors: izvēlieties tos sadaļā “{e}”',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'LiXee ZLinky_TIC ierīce (ZHA vai Zigbee2MQTT)',
    ed_name: 'Nosaukums',
    ed_name_helper: 'Atstājiet tukšu, lai izmantotu “Linky”',
    ed_icon: 'Ikona',
    ed_icon_helper: 'Aizstāj skaitītāja ilustrāciju',
    ed_subscribed_power: 'Pieslēguma jauda (kVA)',
    ed_subscribed_power_helper: 'Izmanto slodzes rādītājam; pēc noklusējuma 6 kVA',
    ed_subscribed_power_entity: 'Pieslēguma jaudas sensors',
    ed_subscribed_power_entity_helper: 'Neobligāti: sensors ar pieslēguma jaudu (kVA vai A kā ISOUSC, trīsfāžu gadījumā uz fāzi). Aizstāj ievadīto vērtību',
    ed_price: 'Cena par kWh',
    ed_price_helper: 'Neobligāti: rāda izmaksas blakus patēriņam',
    ed_tiers: 'Zonu nosaukumi',
    ed_tiers_helper: 'Zonu secībā no 1 līdz 6 (piem., Nakts, Diena)',
    ed_prices: 'Cena pa zonām',
    ed_prices_helper: 'Viena cena katrai zonai, tādā pašā secībā: skaitlis vai sensors ar cenu par kWh. Aizstāj cenu par kWh',
    ed_compare: 'Salīdzināt vienas zonas un nakts tarifu',
    ed_compare_base: 'Vienas zonas cena par kWh',
    ed_compare_hc: 'Nakts cena par kWh',
    ed_compare_hp: 'Dienas cena par kWh',
    ed_hc_hours: 'Nakts tarifa stundas',
    ed_hc_hours_helper: 'Piem. 22:30-06:30 vai 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Vienas zonas abonēšana mēnesī',
    ed_sub_hchp: 'Divu zonu abonēšana mēnesī',
    cmp_title: 'Viena zona vai nakts tarifs?',
    cmp_base: 'Viena zona',
    cmp_hchp: 'Nakts / diena',
    cmp_share: '{p} % naktī',
    cmp_saves: '{c} ietaupa {v}',
    cmp_same: 'Gandrīz vienādi: {v} starpība',
    cmp_days: '{d} dienas',
    ed_show_graph: '24 h grafiks',
    ed_show_stats: 'Patēriņš',
    ed_show_index: 'Skaitītāja rādījumi',
    ed_show_phases: 'Fāžu dati',
    ed_show_logo: 'Skaitītāja ikona',
    ed_zoom: 'Detaļu poga',
    ed_zoom_helper: 'Poga augšējā labajā stūrī, kas pārslēdz mini karti uz pilno karti un atpakaļ',
    zoom_in: 'Rādīt pilno karti',
    zoom_out: 'Atpakaļ uz kompakto skatu',
    ed_language: 'Valoda',
    ed_language_helper: 'Atstājiet tukšu, lai izmantotu Home Assistant valodu',
    ed_entities: 'Vienības (papildu)',
    ed_entities_helper: 'Nosaka automātiski no ierīces; aizpildiet tikai, lai norādītu citu vienību',
    en_energy: 'Kopējais rādījums',
    en_power: 'Aktīvā jauda',
    en_apparent_power: 'Šķietamā jauda',
    en_current: 'Strāva',
    en_voltage: 'Spriegums',
    en_current_b: '2. fāzes strāva',
    en_current_c: '3. fāzes strāva',
    en_voltage_b: '2. fāzes spriegums',
    en_voltage_c: '3. fāzes spriegums',
    en_apparent_power_a: '1. fāzes šķietamā jauda',
    en_apparent_power_b: '2. fāzes šķietamā jauda',
    en_apparent_power_c: '3. fāzes šķietamā jauda',
    en_injection: 'Nodošanas rādījums',
    en_tariff: 'Tarifa periods',
    tomorrow: 'Rīt',
    tempo_blue: 'Zila',
    tempo_white: 'Balta',
    tempo_red: 'Sarkana',
    tempo_unknown: 'Vēl nav zināma',
    ed_show_tempo: 'Tempo krāsa',
    ed_load_warning: 'Mērenas slodzes slieksnis',
    ed_load_warning_helper: 'Mērena slodze no šīs līgumjaudas daļas; pēc noklusējuma 50 %',
    ed_load_critical: 'Augstas slodzes slieksnis',
    ed_load_critical_helper: 'Augsta slodze no šīs līgumjaudas daļas; pēc noklusējuma 80 %',
    en_tempo: 'Tempo krāsa šodien',
    en_tomorrow: 'Tempo krāsa rīt',
    en_tier1: 'Zona 1', en_tier2: 'Zona 2', en_tier3: 'Zona 3', en_tier4: 'Zona 4', en_tier5: 'Zona 5', en_tier6: 'Zona 6',
  },
  el: {
    title: 'Linky',
    meter: 'Μετρητής ZLinky',
    load_low: 'Χαμηλό φορτίο',
    load_mid: 'Μέτριο φορτίο',
    load_high: 'Υψηλό φορτίο',
    offline: 'Χωρίς σύνδεση',
    of_subscribed: 'από {p} kVA συμφωνημένης ισχύος',
    today: 'Σήμερα',
    yesterday: 'Χθες',
    month: 'Τρέχων μήνας',
    last_24h: 'Τελευταίες 24 h',
    peak: 'μέγ. {v}',
    index: 'Ένδειξη',
    tier: 'Ζώνη {n}',
    injection: 'Απόδοση στο δίκτυο',
    phases: 'Φάσεις',
    no_device: 'Δεν βρέθηκε ZLinky',
    no_sensor: 'Δεν αναγνωρίστηκε κανένας αισθητήρας ZLinky: επιλέξτε τους στο «{e}»',
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Συσκευή LiXee ZLinky_TIC (ZHA ή Zigbee2MQTT)',
    ed_name: 'Όνομα',
    ed_name_helper: 'Αφήστε κενό για «Linky»',
    ed_icon: 'Εικονίδιο',
    ed_icon_helper: 'Αντικαθιστά την εικόνα του μετρητή',
    ed_subscribed_power: 'Συμφωνημένη ισχύς (kVA)',
    ed_subscribed_power_helper: 'Χρησιμοποιείται για τον δείκτη φορτίου, προεπιλογή 6 kVA',
    ed_subscribed_power_entity: 'Αισθητήρας συμφωνημένης ισχύος',
    ed_subscribed_power_entity_helper: 'Προαιρετικό: αισθητήρας με τη συμφωνημένη ισχύ (kVA ή A όπως το ISOUSC, ανά φάση στο τριφασικό). Αντικαθιστά την τιμή που δόθηκε',
    ed_price: 'Τιμή ανά kWh',
    ed_price_helper: 'Προαιρετικό: εμφανίζει το κόστος δίπλα στην κατανάλωση',
    ed_tiers: 'Ονόματα ζωνών',
    ed_tiers_helper: 'Με τη σειρά των ζωνών, 1 έως 6 (π.χ. Νυχτερινό, Ημερήσιο)',
    ed_prices: 'Τιμή ανά ζώνη',
    ed_prices_helper: 'Μία τιμή ανά ζώνη, με την ίδια σειρά: αριθμός ή αισθητήρας με την τιμή ανά kWh. Αντικαθιστά την τιμή ανά kWh',
    ed_compare: 'Σύγκριση Ενιαίου και Νυχτερινού',
    ed_compare_base: 'Ενιαία τιμή ανά kWh',
    ed_compare_hc: 'Νυχτερινή τιμή ανά kWh',
    ed_compare_hp: 'Ημερήσια τιμή ανά kWh',
    ed_hc_hours: 'Ώρες νυχτερινού',
    ed_hc_hours_helper: 'Π.χ. 22:30-06:30 ή 01:00-07:00, 12:30-14:30',
    ed_sub_base: 'Πάγιο ενιαίου ανά μήνα',
    ed_sub_hchp: 'Πάγιο ημέρας/νύχτας ανά μήνα',
    cmp_title: 'Ενιαίο ή νυχτερινό;',
    cmp_base: 'Ενιαίο',
    cmp_hchp: 'Νύχτα / ημέρα',
    cmp_share: '{p} % νυχτερινό',
    cmp_saves: '{c}: εξοικονόμηση {v}',
    cmp_same: 'Περίπου το ίδιο: διαφορά {v}',
    cmp_days: '{d} ημέρες',
    ed_show_graph: 'Γράφημα 24 h',
    ed_show_stats: 'Κατανάλωση',
    ed_show_index: 'Ενδείξεις μετρητή',
    ed_show_phases: 'Λεπτομέρειες φάσεων',
    ed_show_logo: 'Εικονίδιο μετρητή',
    ed_zoom: 'Κουμπί λεπτομερειών',
    ed_zoom_helper: 'Κουμπί πάνω δεξιά που αλλάζει τη μίνι κάρτα σε πλήρη κάρτα και αντίστροφα',
    zoom_in: 'Εμφάνιση πλήρους κάρτας',
    zoom_out: 'Επιστροφή στη συμπαγή προβολή',
    ed_language: 'Γλώσσα',
    ed_language_helper: 'Αφήστε κενό για να ακολουθεί τη γλώσσα του Home Assistant',
    ed_entities: 'Οντότητες (για προχωρημένους)',
    ed_entities_helper: 'Εντοπίζονται αυτόματα από τη συσκευή, συμπληρώστε μόνο για να ορίσετε άλλη οντότητα',
    en_energy: 'Συνολική ένδειξη',
    en_power: 'Ενεργός ισχύς',
    en_apparent_power: 'Φαινόμενη ισχύς',
    en_current: 'Ρεύμα',
    en_voltage: 'Τάση',
    en_current_b: 'Ρεύμα φάσης 2',
    en_current_c: 'Ρεύμα φάσης 3',
    en_voltage_b: 'Τάση φάσης 2',
    en_voltage_c: 'Τάση φάσης 3',
    en_apparent_power_a: 'Φαινόμενη ισχύς φάσης 1',
    en_apparent_power_b: 'Φαινόμενη ισχύς φάσης 2',
    en_apparent_power_c: 'Φαινόμενη ισχύς φάσης 3',
    en_injection: 'Ένδειξη απόδοσης',
    en_tariff: 'Χρονική ζώνη χρέωσης',
    tomorrow: 'Αύριο',
    tempo_blue: 'Μπλε',
    tempo_white: 'Λευκή',
    tempo_red: 'Κόκκινη',
    tempo_unknown: 'Δεν είναι ακόμη γνωστή',
    ed_show_tempo: 'Χρώμα Tempo',
    ed_load_warning: 'Όριο μέτριου φορτίου',
    ed_load_warning_helper: 'Μέτριο φορτίο από αυτό το ποσοστό της συμφωνημένης ισχύος· προεπιλογή 50 %',
    ed_load_critical: 'Όριο υψηλού φορτίου',
    ed_load_critical_helper: 'Υψηλό φορτίο από αυτό το ποσοστό της συμφωνημένης ισχύος· προεπιλογή 80 %',
    en_tempo: 'Χρώμα Tempo σήμερα',
    en_tomorrow: 'Χρώμα Tempo αύριο',
    en_tier1: 'Ζώνη 1', en_tier2: 'Ζώνη 2', en_tier3: 'Ζώνη 3', en_tier4: 'Ζώνη 4', en_tier5: 'Ζώνη 5', en_tier6: 'Ζώνη 6',
  },
};

// Card language: the full code when the dictionary has it (`sr-Latn`), else its base (`fr-FR` -> `fr`), else English.
function zlLang(lang) {
  var l = String(lang || 'en');
  if (ZlI18n[l]) return l;
  l = l.split('-')[0];
  return ZlI18n[l] ? l : 'en';
}

// Locale for Intl: Home Assistant's full locale (`pt-PT`, `de-CH`) when its base is the card language,
// else the card language itself. A bare `pt` means European Portuguese here (the dictionary's variant).
function zlFmtLang(lang, haLang) {
  var ha = String(haLang || '');
  // (Not when HA's code is another card language of its own, e.g. `sr-Latn` with the card forced to `sr`.)
  var l = !lang.includes('-') && !ZlI18n[ha] && ha.split('-')[0] === lang ? ha : lang;
  return l === 'pt' ? 'pt-PT' : l;
}

function zlT(lang, key) {
  var strings = ZlI18n[lang] || ZlI18n.en;
  return strings[key] || ZlI18n.en[key] || key;
}

function zlEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// A section title whose trailing unit ("24 h", "24 u") keeps its case under the titles' text-transform: uppercase
// (the hour symbol is "h", "LAST 24 H" is wrong).
function zlUnitCase(text) {
  return zlEsc(text).replace(/(\d[\s\u00a0]+)(\S+)$/, '$1<span class="unit">$2</span>');
}

// ── Entity discovery ─────────────────────────────────────────────────────────
// Roles the card looks for on the device. Each matcher tries the entity registry translation_key first,
// then the entity_id suffix (ZHA French / English slugs and Zigbee2MQTT TIC labels), then the device class.
// Zigbee2MQTT per-phase labels end in a letter + phase digit (`irms2`, `sinsts3`): a bare `_2` / `_3` is
// Home Assistant's de-duplication suffix (re-paired device, second ZLinky), not a phase.
var ZL_PHASE = /(phase_[bc23]|_ph_[bc]|_l[23]$|[a-z][23]$)/;
var ZL_TIER = /(partie|tranche|tier|easf|index)_?0?([1-6])/;
var ZL_ROLES = {
  energy: { keys: ['summation_delivered'], id: /(_consommation|_summation_delivered|_east|_base|_energy|_energie)$/,
    test: (id, s) => s.attributes.device_class === 'energy' && !ZL_TIER.test(id) && !/(received|recu|injection|eait)/.test(id) },
  injection: { keys: ['summation_received'], id: /(_summation_received|_cumul_recu|_eait|_injection)$/ },
  power: { keys: ['active_power', 'power'], id: /(_puissance|_active_power|_power|_ccasn)$/,
    test: (id, s) => s.attributes.device_class === 'power' && !zlIsPhase(id) && !/(total|max)/.test(id) },
  apparent_power: { keys: ['apparent_power'], id: /(_puissance_apparente|_apparent_power|_sinsts|_papp)$/,
    test: (id, s) => s.attributes.device_class === 'apparent_power' && !zlIsPhase(id) },
  current: { keys: ['rms_current', 'current'], id: /(_courant|_rms_current|_current|_irms1?|_iinst1?)$/,
    test: (id, s) => s.attributes.device_class === 'current' && !zlIsPhase(id) && !/max/.test(id) },
  voltage: { keys: ['rms_voltage', 'voltage'], id: /(_tension|_rms_voltage|_voltage|_urms1?)$/,
    test: (id, s) => s.attributes.device_class === 'voltage' && !zlIsPhase(id) },
  current_b: { keys: ['rms_current_ph_b'], id: /(courant_phase_b|rms_current_ph_b|_irms2|_iinst2)$/ },
  current_c: { keys: ['rms_current_ph_c'], id: /(courant_phase_c|rms_current_ph_c|_irms3|_iinst3)$/ },
  voltage_b: { keys: ['rms_voltage_ph_b'], id: /(tension_phase_b|rms_voltage_ph_b|_urms2)$/ },
  voltage_c: { keys: ['rms_voltage_ph_c'], id: /(tension_phase_c|rms_voltage_ph_c|_urms3)$/ },
  // Apparent power per phase (SINSTS1/2/3 of the standard TIC, 1 VA resolution). ZHA only gives phases B and C
  // (phase A shares `apparent_power` with the single-phase total), so ZHA phase rows stay in amperes.
  apparent_power_a: { keys: [], id: /_sinsts1$/ },
  apparent_power_b: { keys: ['apparent_power_ph_b'], id: /(puissance_apparente_phase_b|apparent_power_ph_b|_sinsts2)$/ },
  apparent_power_c: { keys: ['apparent_power_ph_c'], id: /(puissance_apparente_phase_c|apparent_power_ph_c|_sinsts3)$/ },
  tariff: { keys: ['current_tarif', 'active_register_tier_delivered'], id: /(_ptec|_ltarf|_current_tarif|_periode_tarifaire|_tarif_en_cours|_ngtf)$/ },
  // Tempo: tomorrow's color (DEMAIN of the historic TIC). Today's color comes from the tariff period, or from
  // `entities.tempo` (any sensor whose state names a color, e.g. an RTE Tempo integration).
  tomorrow: { keys: ['tomorrow_color', 'demain'], id: /(_demain|_tomorrow_colou?r|_couleur_demain|_couleur_lendemain)$/ },
  tempo: { keys: [] },
};
for (var zlN = 1; zlN <= 6; zlN++) {
  ZL_ROLES[`tier${zlN}`] = { keys: [`tier${zlN}_summation_delivered`],
    id: new RegExp(`(consommation_(partie|tranche)_${zlN}|tier${zlN}_summation_delivered|_easf0${zlN}|_index_${zlN})$`) };
}
var ZL_TIERS = [1, 2, 3, 4, 5, 6].map((n) => `tier${n}`);

// An entity_id without Home Assistant's de-duplication suffix (`sensor.zlinky_sinsts_2` -> `sensor.zlinky_sinsts`).
// Only used as a fallback: `_index_1` legitimately ends in `_1`.
function zlBaseId(id) {
  return id.replace(/_\d+$/, '');
}

function zlIsPhase(id) {
  return ZL_PHASE.test(id) || ZL_PHASE.test(zlBaseId(id));
}
var ZL_OVERRIDABLE = ['energy', 'power', 'apparent_power', 'current', 'voltage', 'current_b', 'current_c', 'voltage_b', 'voltage_c',
  'apparent_power_a', 'apparent_power_b', 'apparent_power_c',
  'injection', 'tariff', 'tempo', 'tomorrow'].concat(ZL_TIERS);

// Tempo day color named by a tariff period or a color text: "HPJB", "HC JR", "HP BLEU", "BLAN", "Rouge", "white"…
// null for anything else (Base, off-peak / peak, "----" before tomorrow's color is announced).
var ZL_TEMPO_COLORS = { blue: '#1e88e5', white: '#b0bec5', red: '#e53935' };
function zlTempo(text) {
  var t = String(text || '').toUpperCase();
  if (/BLEU|BLUE/.test(t)) return 'blue';
  if (/BLANC|BLAN\b|WHITE/.test(t)) return 'white';
  if (/ROUGE|ROUG\b|\bRED\b/.test(t)) return 'red';
  var m = /\bH[CP]\s*J([BWR])\b/.exec(t);
  return m ? { B: 'blue', W: 'white', R: 'red' }[m[1]] : null;
}

// Tier (1 to 6, the index order of the TIC) named by a tariff period, or null. A configured tier name wins;
// then a tier number (ZHA), Tempo (HCJB, HPJB, HCJW, HPJW, HCJR, HPJR, "HP BLEU"…), off-peak / peak (HC, HP),
// EJP (HN normal, PM peak).
function zlTierOf(text, names) {
  var u = String(text || '').trim().toUpperCase();
  if (!u) return null;
  var byName = (Array.isArray(names) ? names : []).findIndex((n) => n && String(n).trim().toUpperCase() === u);
  if (byName >= 0) return byName + 1;
  if (/^[1-6]$/.test(u)) return Number(u);
  var hc = /^HC|\bHC\b|CREUSE|OFF.?PEAK/.test(u);
  var hp = !hc && /^HP|\bHP\b|PLEINE|PEAK/.test(u);
  var color = zlTempo(u);
  if (color) return hc || hp ? { blue: 1, white: 3, red: 5 }[color] + (hp ? 1 : 0) : null;
  if (hc || /^HN|NORMAL/.test(u)) return 1;
  if (hp || /^PM|POINTE/.test(u)) return 2;
  return null;
}

// The price of the tier at `i` (0-based) in a list of prices (null where unknown): beyond the end of the list
// the last one, an unknown price the closest one before it, else the first known one.
function zlPriceAt(prices, i) {
  for (var j = Math.min(i, prices.length - 1); j >= 0; j--) if (prices[j] != null) return prices[j];
  var first = prices.find((p) => p != null);
  return first == null ? null : first;
}

// Registry entries grouped by device, built once per `hass.entities` object (it only changes with the registry).
var zlRegistryIndex = new WeakMap();
function zlRegistryByDevice(reg) {
  var index = zlRegistryIndex.get(reg);
  if (!index) {
    index = new Map();
    Object.values(reg).forEach((e) => {
      if (!e.device_id || e.hidden) return;
      if (!index.has(e.device_id)) index.set(e.device_id, []);
      index.get(e.device_id).push(e);
    });
    zlRegistryIndex.set(reg, index);
  }
  return index;
}

function zlDeviceEntities(hass, deviceId) {
  if (!hass?.entities || !deviceId) return [];
  return (zlRegistryByDevice(hass.entities).get(deviceId) || [])
    .filter((e) => e.entity_id.indexOf('sensor.') === 0 && hass.states[e.entity_id]);
}

function zlFindRole(hass, list, role) {
  var m = ZL_ROLES[role];
  var hit = list.find((e) => m.keys.indexOf(e.translation_key) >= 0);
  if (!hit && m.id) hit = list.find((e) => m.id.test(e.entity_id)) || list.find((e) => m.id.test(zlBaseId(e.entity_id)));
  if (!hit && m.test) hit = list.find((e) => m.test(e.entity_id, hass.states[e.entity_id]));
  return hit ? hit.entity_id : undefined;
}

function zlIsZlinky(dev) {
  return !!dev && /zlinky/i.test(`${dev.model || ''} ${dev.model_id || ''} ${dev.name || ''}`);
}

// Memoized per `hass.devices` object (only replaced on device registry updates): without a `device_id`
// the card looks the ZLinky up on every state update.
var zlDeviceLookup = new WeakMap();
function zlFindDevice(hass) {
  if (!hass?.devices) return undefined;
  if (!zlDeviceLookup.has(hass.devices)) {
    zlDeviceLookup.set(hass.devices, Object.keys(hass.devices).find((id) => zlIsZlinky(hass.devices[id])));
  }
  return zlDeviceLookup.get(hass.devices);
}

// ── DOM patching ─────────────────────────────────────────────────────────────
// Brings `from`'s children in line with `to`'s, position by position: nodes of the same kind are kept
// and updated (text, attributes, then their own children), the others are replaced, added or removed.
function zlMorph(from, to) {
  var a = Array.from(from.childNodes), b = Array.from(to.childNodes);
  b.forEach((nb, i) => {
    var na = a[i];
    if (!na) { from.appendChild(nb); return; }
    if (na.nodeType !== nb.nodeType || na.nodeName !== nb.nodeName) { from.replaceChild(nb, na); return; }
    if (nb.nodeType !== 1) {
      if (na.nodeValue !== nb.nodeValue) na.nodeValue = nb.nodeValue;
      return;
    }
    Array.from(na.attributes).forEach((at) => { if (!nb.hasAttribute(at.name)) na.removeAttribute(at.name); });
    Array.from(nb.attributes).forEach((at) => { if (na.getAttribute(at.name) !== at.value) na.setAttribute(at.name, at.value); });
    // A custom element left empty by the template (ha-icon) owns its children: they are its own rendering, keep them.
    if (!nb.childNodes.length && (nb.localName || '').indexOf('-') > 0) return;
    zlMorph(na, nb);
  });
  for (var i = a.length - 1; i >= b.length; i--) from.removeChild(a[i]);
}

// ── Artwork ──────────────────────────────────────────────────────────────────
// Front view of the meter. Its screen shows the live power and its LED blinks faster as the load rises.
function zlMeterArt(screen) {
  return '<svg viewBox="0 0 80 100" aria-hidden="true">' +
    '<defs><linearGradient id="zl-mb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e4ee5a"/><stop offset=".5" stop-color="#c2d426"/><stop offset="1" stop-color="#97ad10"/></linearGradient>' +
    '<linearGradient id="zl-mc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a7bb1a"/><stop offset="1" stop-color="#7d9108"/></linearGradient>' +
    '<linearGradient id="zl-ms" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3a14"/><stop offset="1" stop-color="#18220a"/></linearGradient>' +
    '<radialGradient id="zl-mg" cx=".5" cy=".5" r=".5"><stop offset="0" class="glow-c" stop-opacity=".6"/><stop offset="1" class="glow-c" stop-opacity="0"/></radialGradient></defs>' +
    '<ellipse cx="40" cy="97" rx="30" ry="2.6" fill="#000" opacity=".12"/>' +
    '<path d="M12 4h56a8 8 0 0 1 8 8v60H4V12a8 8 0 0 1 8-8Z" fill="url(#zl-mb)" stroke="#8aa30c" stroke-width="1"/>' +
    '<path d="M4 72h72v14a8 8 0 0 1-8 8H12a8 8 0 0 1-8-8Z" fill="url(#zl-mc)" stroke="#7d9108" stroke-width="1"/>' +
    '<path d="M10 8h60" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M4 30Q40 14 76 22V12a8 8 0 0 0-8-8H12a8 8 0 0 0-8 8Z" fill="#fff" opacity=".14"/>' +
    '<rect x="11" y="14" width="58" height="22" rx="4" fill="#5d6d0c" opacity=".35"/>' +
    '<rect x="12" y="15" width="56" height="20" rx="3.5" fill="url(#zl-ms)"/>' +
    `<text class="lcd" x="64" y="29.5" text-anchor="end">${zlEsc(screen)}</text>` +
    '<path d="M15 18.5h12" stroke="#c9e04a" stroke-opacity=".35" stroke-width="1.2" stroke-linecap="round"/>' +
    '<circle cx="21" cy="48" r="5" fill="#a7bb1a" stroke="#7d9108"/><path d="M18.6 48h4.8M21 45.6v4.8" stroke="#3d4a08" stroke-width="1.4" stroke-linecap="round"/>' +
    '<circle cx="35" cy="48" r="5" fill="#a7bb1a" stroke="#7d9108"/><path d="M32.6 48h4.8" stroke="#3d4a08" stroke-width="1.4" stroke-linecap="round"/>' +
    '<circle class="glow" cx="60" cy="48" r="8" fill="url(#zl-mg)"/>' +
    '<circle class="led" cx="60" cy="48" r="2.6"/>' +
    '<path d="M12 60h56" stroke="#7d9108" stroke-opacity=".45"/>' +
    '<g fill="#3d4a08" opacity=".55"><rect x="14" y="78" width="8" height="10" rx="1.5"/><rect x="28" y="78" width="8" height="10" rx="1.5"/>' +
      '<rect x="44" y="78" width="8" height="10" rx="1.5"/><rect x="58" y="78" width="8" height="10" rx="1.5"/></g>' +
    '<path d="M36 63.5l-4 5h3l-1.5 3.5 4.5-5h-3Z" fill="#3d4a08" opacity=".6"/></svg>';
}

// ── Formatting ───────────────────────────────────────────────────────────────
function zlNum(lang, v, digits) {
  try {
    return new Intl.NumberFormat(lang, { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(v);
  } catch (_e) {
    return String(Math.round(v * 10 ** digits) / 10 ** digits);
  }
}

// narrowSymbol: Romanian, Hungarian and Ukrainian would otherwise print "2,38 EUR", too wide for the cost tile.
function zlMoney(lang, v, currency) {
  try {
    return new Intl.NumberFormat(lang, {
      style: 'currency',
      currency: currency || 'EUR',
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: 2,
    }).format(v);
  } catch (_e) {
    return `${v.toFixed(2)} ${currency || 'EUR'}`;
  }
}

// Watts (or VA) with a kilo prefix from 10 000 on, like the meter's own screen.
function zlPower(lang, v, unit) {
  if (Math.abs(v) >= 10000) return `${zlNum(lang, v / 1000, 1)} k${unit}`;
  return `${zlNum(lang, v, 0)} ${unit}`;
}

// A current: whole amperes as the meter gives them (IRMS, IINST), one decimal only when the source has some.
function zlAmps(lang, a) {
  return zlNum(lang, a, Number.isInteger(a) ? 0 : 1);
}

// A power reading in its base unit (W or VA), whatever unit the sensor reports.
function zlBase(state) {
  var v = Number(state?.state);
  if (!Number.isFinite(v)) return null;
  var u = String(state.attributes.unit_of_measurement || '');
  return /^k/.test(u) ? v * 1000 : v;
}

// Energy in kWh, whatever unit the sensor reports.
function zlKwh(state) {
  var v = Number(state?.state);
  if (!Number.isFinite(v)) return null;
  var u = String(state.attributes.unit_of_measurement || 'kWh');
  if (u === 'Wh') return v / 1000;
  if (u === 'MWh') return v * 1000;
  return v;
}

var ZL_LOAD_COLORS = {
  low: 'var(--success-color, #43a047)',
  mid: 'var(--warning-color, #ffa600)',
  high: 'var(--error-color, #db4437)',
  off: 'var(--disabled-text-color, #9e9e9e)',
};

// Load level from the share of the subscribed power in use: `load_warning` / `load_critical` (%, 50 / 80 by default).
var ZL_LOAD_WARNING = 50;
var ZL_LOAD_CRITICAL = 80;
function zlLoadLevel(pct, warning = ZL_LOAD_WARNING, critical = ZL_LOAD_CRITICAL) {
  if (pct == null) return 'low';
  if (pct >= critical) return 'high';
  if (pct >= warning) return 'mid';
  return 'low';
}

// A threshold option as a number, or its default when it is missing or not a number.
function zlPct(v, def) {
  var n = v == null || v === '' ? NaN : Number(v);
  return Number.isFinite(n) ? n : def;
}

// Area chart of a series [{t, v}] (5-minute means), drawn in a 300×64 box on a real time axis: x runs over the
// last 24 h up to `now`, and the line breaks where the recorder has no point for more than two periods (the meter
// or Home Assistant was off), instead of joining the points on both sides of the gap.
var ZL_SPARK_SPAN = 24 * 3600000;
var ZL_SPARK_GAP = 2 * 5 * 60000;
function zlSpark(points, now = Date.now()) {
  if (!points || points.length < 2) return '';
  var W = 300, H = 64, t0 = now - ZL_SPARK_SPAN;
  var max = Math.max(...points.map((p) => p.v), 1);
  var x = (t) => Math.max(0, Math.min(W, ((t - t0) / ZL_SPARK_SPAN) * W)).toFixed(1);
  var y = (v) => (H - 3 - (v / max) * (H - 8)).toFixed(1);
  var segs = [];
  points.forEach((p, i) => {
    if (!i || p.t - points[i - 1].t > ZL_SPARK_GAP) segs.push([]);
    segs[segs.length - 1].push(p);
  });
  var line = '', area = '';
  segs.forEach((seg) => {
    var d = seg.map((p, i) => `${i ? 'L' : 'M'}${x(p.t)} ${y(p.v)}`).join('');
    line += d;
    // A lone point has no width: its area would be a vertical line, only the line's cap shows it.
    if (seg.length > 1) area += `${d}L${x(seg[seg.length - 1].t)} ${H}L${x(seg[0].t)} ${H}Z`;
  });
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">` +
    '<defs><linearGradient id="zl-sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="spark-c" stop-opacity=".35"/><stop offset="1" class="spark-c" stop-opacity="0"/></linearGradient></defs>' +
    (area ? `<path d="${area}" fill="url(#zl-sg)"/>` : '') +
    `<path d="${line}" fill="none" class="spark-l" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}

var ZL_STATS_REFRESH = 5 * 60000;
// After a failed recorder call the tiles show "—": retry on the next update past this delay
// instead of sitting on the failure for the whole refresh window.
var ZL_STATS_RETRY = 30000;

// Contract comparison: the last 12 months of hourly consumption, priced as Base and as Off-peak / Peak.
var ZL_COMPARE_DAYS = 365;
var ZL_COMPARE_SAME = 0.02;
var ZL_COMPARE_REFRESH = 6 * 3600000;

// Off-peak ranges from "22:30-06:30, 12:00-14:00" as [start, end) in minutes of the day (end may be past midnight).
function zlHcRanges(text) {
  return String(text || '').split(/[,;]/).map((part) => {
    var m = part.trim().match(/^(\d{1,2})[:h](\d{2})?\s*-\s*(\d{1,2})[:h](\d{2})?$/i);
    if (!m) return null;
    var a = Number(m[1]) * 60 + Number(m[2] || 0), b = Number(m[3]) * 60 + Number(m[4] || 0);
    return a < 1440 && b <= 1440 && a !== b ? [a, b] : null;
  }).filter(Boolean);
}

// Whether a minute of the day is in one of the ranges (a range over midnight, 22:30-06:30, wraps).
function zlInRanges(min, ranges) {
  return ranges.some(([a, b]) => (a < b ? min >= a && min < b : min >= a || min < b));
}

// Minute of the day (0-1439) in the time zone `tz` (the meter's: Home Assistant's), for a timestamp in ms.
function zlMinuteOfDay(fmt, ms) {
  var parts = fmt.formatToParts(new Date(ms));
  var h = Number(parts.find((p) => p.type === 'hour')?.value || 0) % 24;
  return h * 60 + Number(parts.find((p) => p.type === 'minute')?.value || 0);
}

// Hourly kWh ({ start, kwh }) priced both ways. An hour counts as off-peak when its middle is (hourly statistics
// can't split 22:30). Subscriptions are monthly, counted over the days the statistics cover.
function zlCompare(hours, c, tz) {
  var ranges = zlHcRanges(c.hc_hours);
  if (!hours.length || !ranges.length) return null;
  var fmt;
  try {
    fmt = new Intl.DateTimeFormat('en-GB', { timeZone: tz || undefined, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  } catch (_e) {
    fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  }
  var total = 0, hc = 0;
  hours.forEach((h) => {
    total += h.kwh;
    if (zlInRanges(zlMinuteOfDay(fmt, h.start + 1800000), ranges)) hc += h.kwh;
  });
  var days = Math.max(1, Math.round((hours[hours.length - 1].start + 3600000 - hours[0].start) / 86400000));
  var months = days / 30.44;
  var base = total * Number(c.compare_base) + months * (Number(c.sub_base) || 0);
  var hchp = hc * Number(c.compare_hc) + (total - hc) * Number(c.compare_hp) + months * (Number(c.sub_hchp) || 0);
  return { total: total, hc: hc, days: days, base: base, hchp: hchp };
}

// ── Base card ────────────────────────────────────────────────────────────────
class ZlinkyCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('zlinky-card-editor');
  }

  static getStubConfig(hass) {
    var id = zlFindDevice(hass);
    return id ? { device_id: id } : {};
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this._config = Object.assign({
      show_graph: true, show_stats: true, show_index: true, show_phases: true, show_logo: true, show_tempo: true,
    }, config);
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.addEventListener('click', (ev) => this._onClick(ev));
    }
    this._stats = null;
    this._statsKey = null;
    this._cmp = null;
    this._cmpKey = null;
    this._sig = null;
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  connectedCallback() {
    clearInterval(this._timer);
    this._timer = setInterval(() => {
      this._statsAt = 0;
      this._update();
    }, ZL_STATS_REFRESH);
  }

  disconnectedCallback() {
    clearInterval(this._timer);
  }

  getCardSize() { return 6; }

  // 9 columns at least: narrower (6 columns of a 320 px phone section, ~156 px) the meter, the reading and the
  // three tiles cannot share the width. The mini card fits 6.
  getGridOptions() { return { columns: 12, min_columns: 9 }; }

  _lang() {
    return zlLang((this._config?.language) || (this._hass?.language) || document.documentElement.lang || 'en');
  }

  _t(k) { return zlT(this._lang(), k); }

  _fmtLang() { return zlFmtLang(this._lang(), this._hass?.locale?.language || this._hass?.language); }

  _deviceId() {
    var hass = this._hass, c = this._config;
    if (c.device_id) return c.device_id;
    if (c.entity && hass.entities?.[c.entity]) return hass.entities[c.entity].device_id;
    return zlFindDevice(hass);
  }

  _resolve() {
    var hass = this._hass, c = this._config;
    var deviceId = this._deviceId();
    // Role matching only depends on the registry, the device, the config and which of the device's entities
    // have a state: cache it and rebuild only when one of them changes (`hass.entities` is replaced on registry
    // updates, `_config` on setConfig; an entity whose state appears late, e.g. while HA starts, changes the count).
    var list = zlDeviceEntities(hass, deviceId);
    var cache = this._resolved;
    if (cache && cache.reg === hass.entities && cache.config === c && cache.r.deviceId === deviceId && cache.n === list.length) return cache.r;
    var over = c.entities || {};
    var ent = {};
    // Phase entities first, so the single-phase matchers skip what they already took.
    var order = ['current_b', 'current_c', 'voltage_b', 'voltage_c', 'apparent_power_a', 'apparent_power_b', 'apparent_power_c',
      'injection', 'apparent_power'].concat(ZL_TIERS,
      ['energy', 'power', 'current', 'voltage', 'tariff', 'tomorrow', 'tempo']);
    order.forEach((role) => {
      if (over[role]) { ent[role] = over[role]; return; }
      var taken = Object.values(ent);
      ent[role] = zlFindRole(hass, list.filter((e) => taken.indexOf(e.entity_id) < 0), role);
    });
    // `n`: how many of the device's sensors have a state (tells "no sensor recognised" from "still starting").
    var r = { deviceId: deviceId, ent: ent, n: list.length };
    this._resolved = { reg: hass.entities, config: c, n: list.length, r: r };
    return r;
  }

  _st(id) { return id && this._hass.states[id]; }

  _avail(id) {
    var s = this._st(id);
    return !!s && s.state !== 'unavailable' && s.state !== 'unknown';
  }

  _numv(id) {
    if (!this._avail(id)) return null;
    var v = Number(this._st(id).state);
    return Number.isFinite(v) ? v : null;
  }

  _update() {
    if (!this._config || !this._hass || !this.shadowRoot) return;
    var r = this._resolve();
    var hass = this._hass;
    this._fetchStats(r);
    this._fetchCompare(r);
    var states = JSON.stringify(Object.keys(r.ent).map((k) => {
      var s = r.ent[k] && hass.states[r.ent[k]];
      return s ? s.state : null;
    }));
    var sig = JSON.stringify([this._lang(), this._fmtLang(), r.deviceId, r.n, this._zoomed, this._statsKey, this._statsVer, this._cmpVer, states, this._prices(), this._subscribed()]);
    if (sig === this._sig) return;
    this._sig = sig;
    this._r = r;
    this._render(r);
  }

  // The 24 h curve from the recorder's state history, averaged in 5-minute steps (mean and highest reading), for a
  // power sensor that has no long-term statistics. [] when the history has fewer than two readings.
  _historyCurve(id) {
    var end = Date.now(), start = end - 24 * 3600000;
    return this._hass.callWS({ type: 'history/history_during_period', start_time: new Date(start).toISOString(),
      end_time: new Date(end).toISOString(), entity_ids: [id], minimal_response: true, no_attributes: true,
      significant_changes_only: false })
      .then((x) => {
        var unitK = /^k/.test(String(this._st(id)?.attributes.unit_of_measurement || ''));
        var steps = new Map();
        (x?.[id] || []).forEach((h) => {
          var v = Number(h.s ?? h.state) * (unitK ? 1000 : 1);
          var t = h.lu != null ? h.lu * 1000 : Date.parse(h.last_updated || h.last_changed);
          if (!Number.isFinite(v) || !Number.isFinite(t)) return;
          var k = Math.floor(Math.max(t, start) / 300000) * 300000;
          var b = steps.get(k) || { sum: 0, n: 0, max: -Infinity };
          b.sum += v;
          b.n += 1;
          b.max = Math.max(b.max, v);
          steps.set(k, b);
        });
        return [...steps.entries()].sort((a, b) => a[0] - b[0]).map(([t, b]) => ({ t, v: b.sum / b.n, max: b.max }));
      })
      .then((pts) => (pts.length > 1 ? pts : []));
  }

  // Whether the contract comparison is set up: both contracts' prices and the off-peak hours.
  _compareOn() {
    var c = this._config;
    return !this._compact() && Number(c.compare_base) > 0 && Number(c.compare_hc) > 0 && Number(c.compare_hp) > 0 && zlHcRanges(c.hc_hours).length > 0;
  }

  // The last 12 months of hourly kWh of the total index (one statistics query, every 6 hours), for the comparison.
  _fetchCompare(r) {
    var hass = this._hass;
    if (!hass.callWS || !r.ent.energy || !this._compareOn() || this._cmpBusy) return;
    var key = r.ent.energy;
    if (this._cmpKey === key && Date.now() - (this._cmpAt || 0) < ZL_COMPARE_REFRESH) return;
    this._cmpBusy = true;
    this._cmpKey = key;
    this._cmpAt = Date.now();
    hass.callWS({ type: 'recorder/statistics_during_period', statistic_ids: [key], period: 'hour', types: ['change'],
      start_time: new Date(Date.now() - ZL_COMPARE_DAYS * 86400000).toISOString(), units: { energy: 'kWh' } })
      .then((x) => {
        if (this._cmpKey !== key) return;
        this._cmp = (x?.[key] || []).map((p) => ({ start: typeof p.start === 'number' ? p.start : Date.parse(p.start), kwh: Number(p.change) }))
          .filter((p) => Number.isFinite(p.start) && Number.isFinite(p.kwh) && p.kwh >= 0);
        this._cmpVer = (this._cmpVer || 0) + 1;
      })
      .catch(() => { this._cmpAt = Date.now() - ZL_COMPARE_REFRESH + ZL_STATS_RETRY; })
      .finally(() => {
        this._cmpBusy = false;
        this._update();
      });
  }

  // Base or Off-peak / Peak, priced on the last 12 months.
  _compareHtml(lang) {
    if (!this._compareOn() || !this._cmp?.length) return '';
    var c = this._config;
    var res = zlCompare(this._cmp, c, this._hass.config?.time_zone);
    if (!res || res.total <= 0) return '';
    var cur = this._hass.config?.currency;
    var money = (v) => zlMoney(this._fmtLang(), v, cur);
    var share = Math.round((res.hc / res.total) * 100);
    var cheaper = res.hchp < res.base ? 'cmp_hchp' : 'cmp_base';
    var saving = Math.abs(res.base - res.hchp);
    // Under 2 % apart (a few euros a year), neither contract really saves: said so rather than naming a winner.
    var verdict = saving < ZL_COMPARE_SAME * Math.min(res.base, res.hchp)
      ? this._t('cmp_same').replace('{v}', money(saving))
      : this._t('cmp_saves').replace('{c}', this._t(cheaper)).replace('{v}', money(saving));
    return '<div class="section">' +
      `<div class="section-title"><ha-icon icon="mdi:scale-balance"></ha-icon><span>${zlEsc(this._t('cmp_title'))}</span><span class="aside">${zlEsc(this._t('cmp_days').replace('{d}', zlNum(lang, res.days, 0)))}</span></div>` +
      `<div class="row"><span>${zlEsc(this._t('cmp_base'))}</span><span class="rv">${zlEsc(money(res.base))}</span></div>` +
      `<div class="row"><span>${zlEsc(this._t('cmp_hchp'))} · ${zlEsc(this._t('cmp_share').replace('{p}', share))}</span><span class="rv">${zlEsc(money(res.hchp))}</span></div>` +
      `<div class="row cmp-verdict"><span>${zlEsc(verdict)}</span></div>` +
      '</div>';
  }

  // Today / yesterday / this month from the recorder's long-term statistics, plus the 24 h power curve.
  _fetchStats(r) {
    var c = this._config, hass = this._hass;
    if (!hass.callWS || this._statsBusy) return;
    var curveId = r.ent.apparent_power || r.ent.power;
    // The 24 h curve (288 points) is only fetched when it will be drawn: `show_graph` on the full
    // card, or the mini once unfolded. The flag is part of the key, so unfolding refetches at once.
    var wantCurve = !!(curveId && c.show_graph && !this._compact());
    // With one price per tier, each tier's index in use is fetched too: the cost sums each tier's kWh × its price.
    var tierIds = this._prices().length > 1 && r.ent.energy
      ? ZL_TIERS.filter((t) => this._avail(r.ent[t]) && (zlKwh(this._st(r.ent[t])) || 0) > 0) : [];
    var key = `${r.ent.energy}|${curveId}|${wantCurve ? 1 : 0}|${tierIds.join(',')}`;
    var fresh = this._statsKey === key && Date.now() - (this._statsAt || 0) < ZL_STATS_REFRESH;
    // Nothing to fetch when neither the tiles (or the mini's "today" line) nor the curve are shown.
    if (fresh || !(c.show_stats || wantCurve)) return;
    this._statsBusy = true;
    this._statsKey = key;
    this._statsAt = Date.now();
    var failed = false;
    var change = (period, offset, id = r.ent.energy) => (id
      ? hass.callWS({ type: 'recorder/statistic_during_period', statistic_id: id,
        calendar: { period: period, offset: offset }, types: ['change'], units: { energy: 'kWh' } })
        .then((x) => (x?.change != null ? Number(x.change) : null)).catch(() => { failed = true; return null; })
      : Promise.resolve(null));
    var curve = wantCurve
      ? hass.callWS({ type: 'recorder/statistics_during_period', statistic_ids: [curveId], period: '5minute', types: ['mean', 'max'],
        start_time: new Date(Date.now() - 24 * 3600000).toISOString() })
        .then((x) => {
          var unitK = /^k/.test(String(this._st(curveId)?.attributes.unit_of_measurement || ''));
          // `v` (the 5-minute mean) draws the curve, `max` (the highest reading in those 5 minutes) gives its peak.
          return (x?.[curveId] || []).map((p) => ({
            t: typeof p.start === 'number' ? p.start : Date.parse(p.start),
            v: Number(p.mean) * (unitK ? 1000 : 1),
            max: p.max == null ? null : Number(p.max) * (unitK ? 1000 : 1),
          })).filter((p) => Number.isFinite(p.t) && Number.isFinite(p.v));
        })
        // No long-term statistics (a sensor without state_class, such as the PAPP of some Zigbee2MQTT setups):
        // the curve comes from the recorder's state history instead, in the same 5-minute steps.
        .then((pts) => (pts.length > 1 ? pts : this._historyCurve(curveId)))
        .catch(() => { failed = true; return []; })
      : Promise.resolve([]);
    var periods = [['today', 'day', 0], ['yesterday', 'day', -1], ['month', 'month', 0]];
    // Per period, each tier's kWh ({ tier1: 1.2, tier2: 3.4 }), or null when one of them is missing.
    var split = (p) => Promise.all(tierIds.map((t) => change(p[1], p[2], r.ent[t]))).then((v) => {
      if (!tierIds.length || v.some((x) => x == null)) return null;
      var o = {};
      tierIds.forEach((t, i) => { o[t] = v[i]; });
      return o;
    });
    Promise.all(periods.map((p) => change(p[1], p[2])).concat([curve], periods.map(split))).then((res) => {
      // A reply for a previous config (setConfig while in flight) is dropped: the next update refetches.
      if (this._statsKey !== key) return;
      var next = { key: key, today: res[0], yesterday: res[1], month: res[2], curve: res[3],
        tiers: { today: res[4], yesterday: res[5], month: res[6] } };
      var prev = this._stats;
      // On a partial failure, keep the previous values of the same query rather than falling back to "—".
      if (failed && prev && prev.key === key) {
        ['today', 'yesterday', 'month'].forEach((k) => {
          if (next[k] == null) next[k] = prev[k];
          if (next.tiers[k] == null) next.tiers[k] = prev.tiers[k];
        });
        if (!next.curve.length) next.curve = prev.curve;
      }
      this._stats = next;
      this._statsVer = (this._statsVer || 0) + 1;
      if (failed) this._statsAt = Date.now() - ZL_STATS_REFRESH + ZL_STATS_RETRY;
    }).finally(() => {
      this._statsBusy = false;
      this._update();
    });
  }

  // Overridden by the mini card.
  _compact() { return false; }

  _zoomButton() { return ''; }

  _model(r) {
    var c = this._config, ent = r.ent, lang = this._fmtLang();
    var name = c.name || this._t('title');
    var online = this._avail(ent.energy) || this._avail(ent.apparent_power) || this._avail(ent.power);
    var watts = this._avail(ent.power) ? zlBase(this._st(ent.power)) : null;
    var va = this._avail(ent.apparent_power) ? zlBase(this._st(ent.apparent_power)) : null;
    var main = va != null ? va : watts;
    var mainUnit = va != null ? 'VA' : 'W';
    var subscribed = this._subscribed();
    var pct = main != null ? Math.max(0, Math.min(100, (main / (subscribed * 1000)) * 100)) : null;
    var level = online ? zlLoadLevel(pct, zlPct(c.load_warning, ZL_LOAD_WARNING), zlPct(c.load_critical, ZL_LOAD_CRITICAL)) : 'off';
    var tariff = this._avail(ent.tariff) ? this._st(ent.tariff).state : '';
    var sub = tariff ? `${this._t('meter')} · ${tariff}` : this._t('meter');
    return {
      c, ent, lang, name, online, watts, va, main, mainUnit, subscribed, pct, level, sub,
      color: ZL_LOAD_COLORS[level],
      statusText: online ? this._t(`load_${level}`) : this._t('offline'),
      mainText: main != null ? zlPower(lang, main, mainUnit) : '—',
      screen: online && main != null ? zlPower(lang, main, mainUnit).replace(/\s/g, ' ') : '- - -',
      // Header icon: an electric meter in a round badge, in the load color.
      logo: c.show_logo === false ? '' : '<span class="hbadge"><ha-icon icon="mdi:meter-electric-outline"></ha-icon></span>',
    };
  }

  _picture(m) {
    if (this._config.icon) return `<div class="badge"><ha-icon icon="${zlEsc(this._config.icon)}"></ha-icon></div>`;
    // Blink period: 2.4 s at no load down to 0.35 s at full load.
    var period = m.pct == null ? 2.4 : Math.max(0.35, 2.4 - (m.pct / 100) * 2.05);
    return `<div class="picture${m.online ? ' live' : ''}" style="--zl-blink:${period.toFixed(2)}s">${zlMeterArt(m.screen)}</div>`;
  }

  _loadBar(m) {
    if (m.pct == null) return '';
    var label = `${zlNum(m.lang, m.pct, 0)} % ${this._t('of_subscribed').replace('{p}', zlNum(m.lang, m.subscribed, 1))}`;
    return `<div class="load"><div class="bar"><div class="fill" style="width:${m.pct.toFixed(1)}%"></div></div><div class="load-l">${zlEsc(label)}</div></div>`;
  }

  // `price` as a list of €/kWh, one per tier in index order (null where unknown): a number, a list, or entity
  // ids (a sensor giving the price per kWh) alone or in the list. [] without a price.
  _prices() {
    var p = this._config.price;
    var list = Array.isArray(p) ? p : p == null || p === '' ? [] : [p];
    return list.map((x) => {
      if (typeof x === 'string' && /^[a-z_]+\.\w+$/.test(x.trim())) x = this._numv(x.trim());
      var n = x == null || x === '' ? NaN : Number(x);
      return Number.isFinite(n) && n >= 0 ? n : null;
    });
  }

  // Three-phase meter: when the other phases carry a voltage (standard TIC, ZHA), or, for the historic TIC which
  // gives no voltage per phase (Zigbee2MQTT IINST1/2/3), when phase 2 or 3 currents are there without any phase
  // voltage sensor. A single-phase meter whose ZHA phase B / C sensors read 0 V is not.
  _threePhase(ent) {
    var vb = this._numv(ent.voltage_b), vc = this._numv(ent.voltage_c);
    var currentsOnly = !ent.voltage_b && !ent.voltage_c && (this._numv(ent.current_b) != null || this._numv(ent.current_c) != null);
    return vb > 0 || vc > 0 || currentsOnly;
  }

  // The subscribed power in kVA: a number, or a sensor giving it (in kVA, or in A like the historic TIC's ISOUSC:
  // 1 A = 0.2 kVA, per phase on a three-phase meter, so 1 A = 0.6 kVA there). 6 kVA by default, or while the
  // sensor has no usable state.
  _subscribed() {
    var p = this._config.subscribed_power, v = p;
    if (typeof p === 'string' && /^[a-z_]+\.\w+$/.test(p.trim())) {
      var s = this._st(p.trim());
      v = this._numv(p.trim());
      var u = String(s?.attributes?.unit_of_measurement || 'kVA');
      if (v != null) v = u === 'A' ? v * (this._threePhase(this._resolve().ent) ? 0.6 : 0.2) : /^(VA|W)$/.test(u) ? v / 1000 : v;
    }
    var n = Number(v);
    return v != null && v !== '' && Number.isFinite(n) && n > 0 ? n : 6;
  }

  // The current tier (0-based) from the tariff period, 0 when it names none.
  _tierNow() {
    var ent = this._resolve().ent;
    var n = this._avail(ent.tariff) ? zlTierOf(this._st(ent.tariff).state, this._config.tiers) : null;
    return n == null ? 0 : n - 1;
  }

  // The cost of `kwh` consumed over `period` (today, yesterday, month): each tier's kWh × its price when the
  // tiers' statistics are there, else every kWh at the current tier's price (or the only one). Without the
  // tiers' statistics a past period (yesterday, month) has no cost when the tiers' prices differ: the current
  // tier's price says nothing of the tiers that period was spent in (a red Tempo day priced at a blue one).
  _cost(kwh, period = 'today') {
    var prices = this._prices();
    if (kwh == null || !prices.some((x) => x > 0)) return '';
    var split = prices.length > 1 ? this._stats?.tiers?.[period] : null;
    var known = prices.filter((x) => x != null);
    if (!split && period !== 'today' && known.some((x) => x !== known[0])) return '';
    var v = split
      ? Object.keys(split).reduce((sum, t) => sum + split[t] * zlPriceAt(prices, Number(t.slice(4)) - 1), 0)
      : kwh * zlPriceAt(prices, this._tierNow());
    return zlMoney(this._fmtLang(), v, this._hass.config?.currency);
  }

  _render(r) {
    var c = this._config, ent = r.ent;
    if (!r.deviceId && !c.entities) {
      this._setHtml(`${this._styles()}<ha-card><div class="empty"><ha-icon icon="mdi:meter-electric-outline"></ha-icon>${this._t('no_device')}</div></ha-card>`);
      return;
    }
    if (this._noSensor(r)) {
      var msg = this._t('no_sensor').replace('{e}', this._t('ed_entities'));
      this._setHtml(`${this._styles()}<ha-card><div class="empty"><ha-icon icon="mdi:meter-electric-outline"></ha-icon>${zlEsc(msg)}</div></ha-card>`);
      return;
    }
    var m = this._model(r);
    if (this._compact()) {
      this._setHtml(this._miniHtml(m));
      return;
    }
    var lang = m.lang;

    // Three-phase details (see _threePhase); a single-phase meter shows none.
    var threePhase = this._threePhase(ent);

    // Hero: meter, live power, active power / current / voltage, load gauge. On a three-phase meter the current and
    // voltage sensors are phase 1's (IRMS1, URMS1): labelled L1 so they do not read as totals.
    var chips = [];
    if (m.va != null && m.watts != null) chips.push(this._chip('mdi:flash-outline', zlPower(lang, m.watts, 'W'), ent.power));
    var amps = this._numv(ent.current), volts = this._numv(ent.voltage);
    var l1 = threePhase ? 'L1 ' : '';
    if (amps != null) chips.push(this._chip('mdi:current-ac', `${l1}${zlAmps(lang, amps)} A`, ent.current));
    if (volts != null && volts > 0) chips.push(this._chip('mdi:sine-wave', `${l1}${zlNum(lang, volts, 0)} V`, ent.voltage));
    if (!m.online) chips.push(`<span class="chip"><ha-icon icon="mdi:lan-disconnect"></ha-icon>${this._t('offline')}</span>`);
    var hero = '<div class="hero">' + this._picture(m) +
      '<div class="info">' +
        this._big(ent.apparent_power || ent.power, m.mainText) +
        (chips.length ? `<div class="chips">${chips.join('')}</div>` : '') + this._loadBar(m) +
      '</div></div>';

    // 24 h curve.
    var graph = '';
    var curve = this._stats?.curve;
    if (c.show_graph && curve && curve.length > 1) {
      // The real peak: the highest reading of the 24 h, not the highest 5-minute mean (which smooths a short peak away).
      var peak = Math.max(...curve.map((p) => (Number.isFinite(p.max) ? p.max : p.v)));
      graph = '<div class="section">' +
        `<div class="section-title"><ha-icon icon="mdi:chart-areaspline"></ha-icon><span>${zlUnitCase(this._t('last_24h'))}</span><span class="aside">${zlEsc(this._t('peak').replace('{v}', zlPower(lang, peak, m.mainUnit)))}</span></div>` +
        `<div class="graph">${zlSpark(curve)}</div></div>`;
    }

    // Consumption tiles.
    var stats = '';
    if (c.show_stats && ent.energy && this._stats) {
      var tiles = [['today', this._stats.today], ['yesterday', this._stats.yesterday], ['month', this._stats.month]]
        .map(([k, v]) => {
          var cost = this._cost(v, k);
          return `<div class="tile"><span class="tl">${this._t(k)}</span>` +
            `<span class="tv">${v == null ? '—' : `${zlNum(lang, v, v < 100 ? 1 : 0)}<small> kWh</small>`}</span>` +
            (cost ? `<span class="tc">${zlEsc(cost)}</span>` : '') + '</div>';
        });
      stats = `<div class="tiles">${tiles.join('')}</div>`;
    }

    // Meter index: total, tiers in use, injection.
    var index = '';
    if (c.show_index && this._avail(ent.energy)) {
      var rows = [];
      var tiers = ZL_TIERS.filter((t) => (this._avail(ent[t]) && (zlKwh(this._st(ent[t])) || 0) > 0));
      if (tiers.length > 1) {
        var names = Array.isArray(c.tiers) ? c.tiers : [];
        tiers.forEach((t) => {
          var n = Number(t.slice(4));
          rows.push(this._row(names[n - 1] || this._t('tier').replace('{n}', n), `${zlNum(lang, zlKwh(this._st(ent[t])), 0)} kWh`, ent[t]));
        });
      }
      var inj = this._avail(ent.injection) ? zlKwh(this._st(ent.injection)) : null;
      if (inj) rows.push(this._row(this._t('injection'), `${zlNum(lang, inj, 0)} kWh`, ent.injection));
      index = '<div class="section">' +
        `<button class="index" data-more="${zlEsc(ent.energy)}"><ha-icon icon="mdi:counter"></ha-icon><span class="il">${this._t('index')}</span>` +
        `<span class="iv">${zlNum(lang, zlKwh(this._st(ent.energy)), 0)}<small> kWh</small></span></button>` +
        (rows.length ? `<div class="rows">${rows.join('')}</div>` : '') + '</div>';
    }

    // Each phase against its share of the subscribed power. With the apparent power of all three phases (SINSTS1/2/3,
    // the meter's own measure, 1 VA resolution) the rows show VA; otherwise the current (whole amperes from the meter)
    // against the share converted at 230 V. Never a mix of both.
    var phases = '';
    if (c.show_phases && threePhase) {
      var vaIds = [ent.apparent_power_a, ent.apparent_power_b, ent.apparent_power_c];
      var vaOk = vaIds.every((id) => this._avail(id) && zlBase(this._st(id)) != null);
      var share = (m.subscribed * 1000) / 3;
      var rows3 = [['1', ent.current, ent.voltage], ['2', ent.current_b, ent.voltage_b], ['3', ent.current_c, ent.voltage_c]];
      var lines = rows3.map(([n, ci, vi], i) => {
        var v = this._numv(vi), x, max, text;
        if (vaOk) {
          x = zlBase(this._st(vaIds[i])); max = Math.max(1, share); text = zlPower(lang, x, 'VA');
        } else {
          x = this._numv(ci); max = Math.max(1, share / 230); text = x == null ? '—' : `${zlAmps(lang, x)} A`;
        }
        var w = x == null ? 0 : Math.min(100, (x / max) * 100);
        return `<div class="phase"><span class="pn">L${n}</span>` +
          `<div class="bar"><div class="fill" style="width:${w.toFixed(1)}%"></div></div>` +
          `<span class="pv">${text}</span><span class="pv dim">${v == null ? '' : `${zlNum(lang, v, 0)} V`}</span></div>`;
      });
      phases = `<div class="section"><div class="section-title"><ha-icon icon="mdi:transmission-tower"></ha-icon><span>${this._t('phases')}</span></div>${lines.join('')}</div>`;
    }

    this._setHtml(this._styles(m.color) + '<ha-card>' +
      '<div class="header sub2">' + m.logo +
        `<div class="titles"><div class="name">${zlEsc(m.name)}</div><div class="sub">${zlEsc(m.sub)}</div></div>` +
        this._pill(m) + this._zoomButton() +
      '</div>' + hero + this._tempo(ent) + stats + graph + this._compareHtml(lang) + index + phases +
    '</ha-card>');
  }

  // Tempo contract: today's color and tomorrow's (or "not known yet" until it is announced, around 11 am).
  // Nothing when the tariff period names no Tempo color.
  // The days shown: [{ label, color, name, tc, id }], today's then tomorrow's when its sensor is there; [] when hidden.
  _tempoDays(ent) {
    if (!this._config.show_tempo) return [];
    var src = ent.tempo || ent.tariff;
    var today = this._avail(src) ? zlTempo(this._st(src).state) : null;
    if (!today) return [];
    var day = (label, color, id) => ({ label, color, id, name: this._t(color ? `tempo_${color}` : 'tempo_unknown'),
      tc: color ? ZL_TEMPO_COLORS[color] : 'var(--secondary-text-color)' });
    var days = [day(this._t('today'), today, src)];
    if (ent.tomorrow && this._avail(ent.tomorrow)) days.push(day(this._t('tomorrow'), zlTempo(this._st(ent.tomorrow).state), ent.tomorrow));
    return days;
  }

  _tempo(ent) {
    var days = this._tempoDays(ent).map((d) => `<button class="tday" data-more="${zlEsc(d.id)}" style="--tc:${d.tc}">` +
      `<span class="tdot${d.color ? '' : ' none'}"></span><span class="tdl">${zlEsc(d.label)}</span>` +
      `<span class="tdv">${zlEsc(d.name)}</span></button>`);
    return days.length ? `<div class="tempo">${days.join('')}</div>` : '';
  }

  // Mini card: today's and tomorrow's Tempo colors as two dots, each with its day; the color's name is in the
  // tooltip and the accessible name, a click opens the sensor.
  _tempoMini(ent) {
    var days = this._tempoDays(ent).map((d) => {
      var tip = zlEsc(`${d.label} · ${d.name}`);
      return `<button class="tmini" data-more="${zlEsc(d.id)}" style="--tc:${d.tc}" title="${tip}" aria-label="${tip}">` +
        `<span class="tdot${d.color ? '' : ' none'}"></span><span class="tdl">${zlEsc(d.label)}</span></button>`;
    });
    return days.length ? `<div class="line tminis">${days.join('')}</div>` : '';
  }

  // The device is there but none of the sensors that tell its state (index, apparent or active power) was
  // recognised: unexpected naming, disabled entities or the wrong device. "Offline" would send the user looking
  // at the module; the card asks for the entities instead. Not while the device's sensors have no state at all
  // (the integration is still starting): that stays "Offline" until they come.
  _noSensor(r) {
    var ent = r.ent;
    if (ent.energy || ent.apparent_power || ent.power) return false;
    if (r.n) return true;
    var reg = this._hass.entities && r.deviceId ? zlRegistryByDevice(this._hass.entities).get(r.deviceId) || [] : [];
    return !reg.some((e) => e.entity_id.indexOf('sensor.') === 0);
  }

  // The status pill. On a narrow card it shows its dot only: the status stays in its tooltip and accessible name.
  _pill(m) {
    var s = zlEsc(m.statusText);
    return `<span class="st" role="img" title="${s}" aria-label="${s}"><span class="dot"></span><span class="stt">${s}</span></span>`;
  }

  // The first render sets innerHTML; later ones patch the existing DOM in place, so the meter's LED
  // animation is not restarted on every power reading, the gauges' width transition plays and the
  // keyboard focus stays on its chip or row.
  _setHtml(html) {
    var root = this.shadowRoot;
    if (!root.firstChild) {
      root.innerHTML = html;
      return;
    }
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    zlMorph(root, tpl.content);
  }

  _chip(icon, text, id) {
    return `<button class="chip" data-more="${zlEsc(id || '')}"><ha-icon icon="${icon}"></ha-icon>${zlEsc(text)}</button>`;
  }

  _row(label, value, id) {
    return `<button class="row" data-more="${zlEsc(id || '')}"><span>${zlEsc(label)}</span><span class="rv">${zlEsc(value)}</span></button>`;
  }

  // The main power readout: a more-info button, or a plain span when no power entity is resolved
  // (a button there would show a pointer cursor and do nothing).
  _big(id, text) {
    var val = `<span class="val">${zlEsc(text)}</span>`;
    return id ? `<button class="big" data-more="${zlEsc(id)}">${val}</button>` : `<span class="big">${val}</span>`;
  }

  _miniHtml(m) {
    var today = this._config.show_stats ? this._stats?.today : null;
    var lines = [];
    if (today != null) {
      // Each part is kept whole: on a narrow card the line wraps between them instead of cutting the cost off.
      var parts = [this._t('today'), `${zlNum(m.lang, today, 1)} kWh`, this._cost(today)].filter((x) => x);
      var segs = parts.map((x, i) => `<span class="seg">${zlEsc(x)}${i < parts.length - 1 ? ' ·' : ''}</span>`).join(' ');
      lines.push(`<div class="line"><ha-icon icon="mdi:calendar-today"></ha-icon><span>${segs}</span></div>`);
    }
    return this._styles(m.color) + '<ha-card class="mini">' +
      '<div class="header">' + m.logo +
        `<div class="titles"><div class="name">${zlEsc(m.name)}</div></div>` +
        this._pill(m) + this._zoomButton() +
      '</div>' +
      '<div class="content">' + this._picture(m) +
        '<div class="info">' +
          this._big(m.ent.apparent_power || m.ent.power, m.mainText) +
          this._loadBar(m) + lines.join('') + this._tempoMini(m.ent) +
        '</div></div>' +
    '</ha-card>';
  }

  _onClick(ev) {
    var el = ev.composedPath().find((n) => n.dataset && (n.dataset.action || n.dataset.more));
    if (!el) return;
    if (el.dataset.action === 'zoom') {
      this._toggleZoom(ev);
      return;
    }
    if (el.dataset.more) {
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: el.dataset.more }, bubbles: true, composed: true }));
    }
  }

  _styles(color) {
    return '<style>' +
      ':host { display: block; height: 100%; --zl-color: ' + (color || ZL_LOAD_COLORS.off) + '; --zl-green: color-mix(in srgb, #9ab00f 50%, var(--primary-text-color, #212121)); }' +
      // A size container: on a narrow card (Sections view, 6 columns) its parts follow the card's width (see @container).
      'ha-card { height: 100%; box-sizing: border-box; padding: 12px; display: flex; flex-direction: column; gap: 12px; container-type: inline-size; }' +
      // A size container has no width of its own: in a shrink-to-fit parent (layout-card, button-card, an inline-block,
      // a grid's auto column) the card fell to its 24 px of padding. This invisible row of 10 breakable boxes gives the
      // card a preferred width (the full card's 400 px, the mini's 245 px) while its minimum stays one box wide, so in
      // a 1fr 1fr grid or a horizontal stack the card still shrinks to its column and never overflows it.
      '.sizer { height: 0; overflow: hidden; visibility: hidden; font-size: 0; line-height: 0; }' +
      '.sizer i { display: inline-block; width: ' + (this._compact() ? '24.5px' : '40px') + '; }' +
      '.empty { display: flex; align-items: center; gap: 10px; color: var(--secondary-text-color); }' +
      // The 8px radius is the buttons' default, so the focus ring follows the round detail button and the chips.
      'button { all: unset; box-sizing: border-box; cursor: pointer; border-radius: 8px; }' +
      'button:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }' +
      // The body starts 8px under the header (the card gap is 12px between body blocks).
      '.header { display: flex; align-items: center; gap: 10px; margin-bottom: -4px; }' +
      '.hbadge { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; flex: none;' +
        ' background: color-mix(in srgb, var(--zl-color) 16%, transparent); color: var(--zl-color); }' +
      '.hbadge ha-icon { --mdc-icon-size: 24px; }' +
      // The name and the pill share the line from a zero basis: the pill keeps its whole label and the name gives way
      // first, down to about 4 characters and its ellipsis; only past that does the pill shrink.
      '.titles { flex: 1 1 0; min-width: 5ch; font-size: 16px; }' +
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.st { display: inline-flex; align-items: center; gap: 4px; flex: 0 1 auto; min-width: 0; max-width: 50%; overflow: hidden; padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;' +
        ' white-space: nowrap; background: color-mix(in srgb, var(--zl-color) 15%, transparent);' +
        ' color: color-mix(in srgb, var(--zl-color) 50%, var(--primary-text-color, #212121)); }' +
      '.stt { min-width: 0; overflow: hidden; text-overflow: ellipsis; }' +
      // With a subtitle the titles span two lines: the pill and the detail button stay on the title's line.
      '.header.sub2 .st { align-self: flex-start; margin-top: 4px; }' +
      '.header.sub2 .zoom { align-self: flex-start; margin-top: 0; }' +
      '.dot { flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--zl-color); }' +
      '.zoom { flex: none; width: 24px; height: 24px; margin: -4px -4px -4px 0; border-radius: 50%;' +
        ' display: grid; place-items: center; color: var(--secondary-text-color); }' +
      '.zoom ha-icon { --mdc-icon-size: 16px; }' +
      '.zoom:hover { background: color-mix(in srgb, var(--secondary-text-color) 16%, transparent); color: var(--primary-text-color); }' +
      '.hero, .content { display: flex; align-items: center; gap: 14px; }' +
      '.picture { width: 72px; height: 90px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }' +
      'ha-card.mini .picture { width: 54px; height: 68px; }' +
      '.picture svg { width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.18)); }' +
      '.picture .lcd { font: 600 10px/1 "Roboto Mono", ui-monospace, Menlo, Consolas, monospace; fill: #d6ef5a; letter-spacing: 0.2px; }' +
      '.picture .led { fill: #6b7a10; }' +
      '.picture .glow { opacity: 0; } .picture .glow-c { stop-color: var(--zl-color); }' +
      '.picture.live .led { fill: var(--zl-color); animation: zl-blink var(--zl-blink, 2s) ease-in-out infinite; }' +
      '.picture.live .glow { animation: zl-glow var(--zl-blink, 2s) ease-in-out infinite; }' +
      '@keyframes zl-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }' +
      '@keyframes zl-glow { 0%, 100% { opacity: 1; } 50% { opacity: 0.1; } }' +
      '@media (prefers-reduced-motion: reduce) { .picture * { animation: none !important; } .fill { transition: none; } }' +
      '.badge { width: 56px; height: 56px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center;' +
        ' background: color-mix(in srgb, var(--zl-color) 15%, transparent); color: var(--zl-color); }' +
      '.badge ha-icon { --mdc-icon-size: 32px; }' +
      '.info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }' +
      // The reading scales down with the card (cqi: % of its width) and ellipsizes rather than leave the card.
      '.big .val { display: block; font-size: 30px; font-size: clamp(22px, 13cqi, 30px); font-weight: 400; line-height: 1.1; color: var(--primary-text-color);' +
        ' white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      'ha-card.mini .big .val { font-size: 24px; font-size: clamp(16px, 14cqi, 24px); }' +
      '.chips { display: flex; flex-wrap: wrap; gap: 6px; }' +
      '.chip { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 1px 8px 1px 5px; border-radius: 12px;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--secondary-text-color); }' +
      '.chip ha-icon { --mdc-icon-size: 13px; }' +
      '.load { display: flex; flex-direction: column; gap: 4px; }' +
      '.load-l { font-size: 11px; color: var(--secondary-text-color); }' +
      '.bar { height: 6px; border-radius: 3px; background: var(--secondary-background-color, rgba(128,128,128,0.15)); overflow: hidden; }' +
      '.fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, color-mix(in srgb, var(--zl-color) 55%, transparent), var(--zl-color)); transition: width 0.6s ease; }' +
      '.line { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--secondary-text-color); min-width: 0; }' +
      '.line ha-icon { --mdc-icon-size: 14px; flex-shrink: 0; }' +
      '.line > span { min-width: 0; }' +
      '.seg { display: inline-block; max-width: 100%; vertical-align: top; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.tempo { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 6px; }' +
      '.tday { all: unset; box-sizing: border-box; cursor: pointer; display: flex; align-items: center; gap: 6px; min-width: 0; padding: 6px 10px; border-radius: 12px;' +
        ' border: 1px solid color-mix(in srgb, var(--tc) 45%, transparent); background: color-mix(in srgb, var(--tc) 8%, transparent); font-size: 12px; }' +
      '.tday:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; }' +
      '.tdot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; background: var(--tc); box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 18%, transparent); }' +
      '.tdot.none { background: none; border: 1px dashed var(--secondary-text-color); box-shadow: none; box-sizing: border-box; }' +
      '.tdl { color: var(--secondary-text-color); white-space: nowrap; }' +
      '.tminis { flex-wrap: wrap; gap: 4px 10px; }' +
      '.tmini { display: inline-flex; align-items: center; gap: 5px; min-width: 0; }' +
      '.tmini .tdot { width: 8px; height: 8px; }' +
      '.tdv { margin-left: auto; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }' +
      '.tile { display: flex; flex-direction: column; gap: 2px; padding: 8px 10px; border-radius: 12px; min-width: 0;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.tl { font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.tv { font-size: 18px; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.tv small, .iv small { font-size: 11px; font-weight: 400; color: var(--secondary-text-color); }' +
      '.tc { font-size: 11px; font-weight: 500; color: var(--zl-green); }' +
      '.section { display: flex; flex-direction: column; gap: 6px; }' +
      '.section-title { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; text-transform: uppercase;' +
        ' letter-spacing: .04em; color: var(--secondary-text-color); }' +
      '.section-title ha-icon { --mdc-icon-size: 16px; }' +
      '.section-title .unit { text-transform: none; }' +
      '.section-title .aside { margin-left: auto; text-transform: none; letter-spacing: 0; font-weight: 400; font-size: 11px; }' +
      '.graph { height: 64px; border-radius: 10px; overflow: hidden; }' +
      '.spark { width: 100%; height: 100%; display: block; }' +
      '.spark-c { stop-color: var(--zl-color); } .spark-l { stroke: var(--zl-color); }' +
      '.index { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.index ha-icon { --mdc-icon-size: 18px; color: var(--zl-green); }' +
      '.il { flex: 1; font-size: 13px; color: var(--secondary-text-color); }' +
      '.iv { font-variant-numeric: tabular-nums; font-size: 15px; font-weight: 500; color: var(--primary-text-color); }' +
      '.rows { display: flex; flex-direction: column; }' +
      '.row { display: flex; justify-content: space-between; gap: 8px; padding: 4px 10px; font-size: 12px; color: var(--secondary-text-color); }' +
      '.cmp-verdict { color: var(--primary-text-color); font-weight: 500; }' +
      '.rv { font-variant-numeric: tabular-nums; color: var(--primary-text-color); }' +
      '.phase { display: grid; grid-template-columns: 22px 1fr 60px 40px; align-items: center; gap: 8px; font-size: 12px; }' +
      '.pn { font-weight: 500; color: var(--secondary-text-color); }' +
      '.pv { text-align: right; color: var(--primary-text-color); white-space: nowrap; } .pv.dim { color: var(--secondary-text-color); }' +
      // Narrow card (6 columns of the Sections view, ~156 to 250 px): the tiles put their unit under the value and
      // let their label wrap, the meter shrinks; then the mini's meter gets smaller and the pill shows its dot only.
      // Below 300 px the header's gaps tighten (10 → 6 px), so "Moderate load" still fits whole next to the name at 245 px.
      '@container (max-width: 300px) { .header { gap: 6px; } .hero { gap: 10px; } .picture { width: 56px; height: 70px; } .tile { padding: 8px; }' +
        ' .tl { white-space: normal; overflow-wrap: break-word; } .tv small { display: block; } }' +
      '@container (max-width: 200px) { ha-card.mini .picture { width: 36px; height: 45px; } ha-card.mini .content { gap: 8px; } }' +
      // At the mini's narrowest (156 px) the dot-only pill keeps its 16 px (the name its 4 characters): it never gets squashed.
      '@container (max-width: 180px) { .titles { min-width: 4ch; } .stt { display: none; } .st { flex: none; padding: 5px; } }' +
    '</style><div class="sizer" aria-hidden="true">' + '<i></i> '.repeat(10) + '</div>';
  }
}

// ── Mini card ────────────────────────────────────────────────────────────────
// A full card drawn compact, like the other ha-* mini cards: its detail button (top right, `zoom: false`
// removes it) switches it to the full card and back, and a click anywhere else on the page folds it again.
var zlInDialog = (ev) => ev.composedPath().some((n) => ['ha-more-info-dialog', 'ha-dialog', 'dialog'].indexOf(n.localName) >= 0);

class ZlinkyMiniCard extends ZlinkyCard {
  static getConfigElement() {
    var el = ZlinkyCard.getConfigElement();
    el.mini = true;
    return el;
  }

  constructor() {
    super();
    this._onUnzoom = (ev) => {
      if (this._zoomed && !ev.composedPath().includes(this) && !zlInDialog(ev)) this._setZoom(false);
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onUnzoom, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onUnzoom, true);
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

// ── zlinky-card-editor (visual editor, built on HA's ha-form) ────────────────
// A price the number field cannot show: a list (one per tier) or an entity id.
function zlPriceList(price) {
  return Array.isArray(price) || typeof price === 'string';
}

var ZL_EDITOR_DEFAULTS = { show_graph: true, show_stats: true, show_index: true, show_phases: true, show_logo: true, show_tempo: true, zoom: true,
  load_warning: ZL_LOAD_WARNING, load_critical: ZL_LOAD_CRITICAL };

class ZlinkyCardEditor extends HTMLElement {
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
      {
        type: 'grid', name: '', schema: [
          { name: 'name', selector: { text: {} } },
          { name: 'icon', selector: { icon: {} } },
        ].concat(typeof this._config.subscribed_power === 'string' ? []
          : [{ name: 'subscribed_power', selector: { number: { min: 3, max: 36, step: 1, mode: 'box', unit_of_measurement: 'kVA' } } }])
          .concat(zlPriceList(this._config.price) ? [] : [{ name: 'price', selector: { number: { min: 0, max: 2, step: 0.0001, mode: 'box' } } }]),
      },
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
          { name: 'show_stats', selector: { boolean: {} } },
          { name: 'show_graph', selector: { boolean: {} } },
          { name: 'show_index', selector: { boolean: {} } },
          { name: 'show_phases', selector: { boolean: {} } },
          { name: 'show_logo', selector: { boolean: {} } },
          { name: 'show_tempo', selector: { boolean: {} } },
        ].concat(mini ? [{ name: 'zoom', selector: { boolean: {} } }] : []),
      },
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
    this._config = value;
    // A new language option relabels the form; per-tier prices hide the single price field, a subscribed power
    // sensor the number field (and back).
    if (lang !== this._lang() || wasList !== zlPriceList(value.price) || wasSensor !== (typeof value.subscribed_power === 'string')) this._render();
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('zlinky-card-editor')) {
  customElements.define('zlinky-card-editor', ZlinkyCardEditor);
}

window.customCards = window.customCards || [];
[
  ['zlinky-card', ZlinkyCard, 'ZLinky Card', 'Linky smart meter card for the LiXee ZLinky_TIC (ZHA or Zigbee2MQTT)'],
  ['zlinky-mini-card', ZlinkyMiniCard, 'ZLinky Mini Card', 'Compact Linky card that unfolds into the full card'],
].forEach(([type, cls, name, description]) => {
  if (customElements.get(type)) return;
  customElements.define(type, cls);
  window.customCards.push({ type, name, description, preview: true, documentationURL: 'https://github.com/juju35/ha-zlinky-card' });
});

console.info(`%c ZLINKY-CARD %c v${ZLINKY_CARD_VERSION} `, 'color:#3d4a08;background:#c2d426;font-weight:700', 'color:#7d9108;background:#fff');
