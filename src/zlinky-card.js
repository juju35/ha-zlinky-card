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
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Appareil LiXee ZLinky_TIC (ZHA ou Zigbee2MQTT)',
    ed_name: 'Nom',
    ed_name_helper: 'Laisser vide pour « Linky »',
    ed_icon: 'Icône',
    ed_subscribed_power: 'Puissance souscrite (kVA)',
    ed_subscribed_power_helper: 'Sert à la jauge de charge ; 6 kVA par défaut',
    ed_price: 'Prix du kWh',
    ed_price_helper: 'Optionnel : affiche le coût à côté des consommations',
    ed_tiers: 'Noms des index',
    ed_tiers_helper: 'Dans l\'ordre des index 1 à 6 (ex. Heures creuses, Heures pleines)',
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
    en_injection: 'Index injection',
    en_tariff: 'Période tarifaire',
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
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'LiXee ZLinky_TIC device (ZHA or Zigbee2MQTT)',
    ed_name: 'Name',
    ed_name_helper: 'Leave empty for "Linky"',
    ed_icon: 'Icon',
    ed_subscribed_power: 'Subscribed power (kVA)',
    ed_subscribed_power_helper: 'Used for the load gauge; 6 kVA by default',
    ed_price: 'Price per kWh',
    ed_price_helper: 'Optional: shows the cost next to the consumption',
    ed_tiers: 'Tier names',
    ed_tiers_helper: 'In index order, 1 to 6 (e.g. Off-peak, Peak)',
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
    en_injection: 'Injection index',
    en_tariff: 'Tariff period',
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
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'LiXee-ZLinky_TIC-Gerät (ZHA oder Zigbee2MQTT)',
    ed_name: 'Name',
    ed_name_helper: 'Leer lassen für „Linky“',
    ed_icon: 'Symbol',
    ed_subscribed_power: 'Vertragliche Anschlussleistung (kVA)',
    ed_subscribed_power_helper: 'Für die Lastanzeige; standardmäßig 6 kVA',
    ed_price: 'Preis pro kWh',
    ed_price_helper: 'Optional: zeigt die Kosten neben dem Verbrauch an',
    ed_tiers: 'Namen der Zählwerke',
    ed_tiers_helper: 'In der Reihenfolge der Zählwerke 1 bis 6 (z. B. HC Nebenzeit, HP Hauptzeit)',
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
    en_injection: 'Zählerstand Einspeisung',
    en_tariff: 'Tarifperiode',
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
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Dispositivo LiXee ZLinky_TIC (ZHA o Zigbee2MQTT)',
    ed_name: 'Nombre',
    ed_name_helper: 'Déjalo vacío para «Linky»',
    ed_icon: 'Icono',
    ed_subscribed_power: 'Potencia contratada (kVA)',
    ed_subscribed_power_helper: 'Se usa para el indicador de carga; 6 kVA por defecto',
    ed_price: 'Precio por kWh',
    ed_price_helper: 'Opcional: muestra el coste junto a los consumos',
    ed_tiers: 'Nombres de los índices',
    ed_tiers_helper: 'En el orden de los índices 1 a 6 (p. ej. HC horas valle, HP horas punta)',
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
    en_injection: 'Índice de inyección',
    en_tariff: 'Periodo tarifario',
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
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Уређај LiXee ZLinky_TIC (ZHA или Zigbee2MQTT)',
    ed_name: 'Назив',
    ed_name_helper: 'Оставите празно за „Linky“',
    ed_icon: 'Иконица',
    ed_subscribed_power: 'Уговорена снага (kVA)',
    ed_subscribed_power_helper: 'Користи се за мерач оптерећења; подразумевано 6 kVA',
    ed_price: 'Цена по kWh',
    ed_price_helper: 'Опционо: приказује трошак поред потрошње',
    ed_tiers: 'Називи тарифа',
    ed_tiers_helper: 'Редом по тарифама од 1 до 6 (нпр. Нижа тарифа, Виша тарифа)',
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
    en_injection: 'Стање предаје у мрежу',
    en_tariff: 'Тарифни период',
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
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Uređaj LiXee ZLinky_TIC (ZHA ili Zigbee2MQTT)',
    ed_name: 'Naziv',
    ed_name_helper: 'Ostavite prazno za „Linky“',
    ed_icon: 'Ikonica',
    ed_subscribed_power: 'Ugovorena snaga (kVA)',
    ed_subscribed_power_helper: 'Koristi se za merač opterećenja; podrazumevano 6 kVA',
    ed_price: 'Cena po kWh',
    ed_price_helper: 'Opciono: prikazuje trošak pored potrošnje',
    ed_tiers: 'Nazivi tarifa',
    ed_tiers_helper: 'Redom po tarifama od 1 do 6 (npr. Niža tarifa, Viša tarifa)',
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
    en_injection: 'Stanje predaje u mrežu',
    en_tariff: 'Tarifni period',
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
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Dispositivo LiXee ZLinky_TIC (ZHA o Zigbee2MQTT)',
    ed_name: 'Nome',
    ed_name_helper: 'Lascia vuoto per «Linky»',
    ed_icon: 'Icona',
    ed_subscribed_power: 'Potenza impegnata (kVA)',
    ed_subscribed_power_helper: 'Usata per l\'indicatore di carico; 6 kVA predefiniti',
    ed_price: 'Prezzo per kWh',
    ed_price_helper: 'Facoltativo: mostra il costo accanto ai consumi',
    ed_tiers: 'Nomi delle fasce',
    ed_tiers_helper: 'Nell\'ordine delle fasce da 1 a 6 (es. Fuori punta, Punta)',
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
    en_injection: 'Lettura immissione',
    en_tariff: 'Fascia oraria',
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
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'LiXee ZLinky_TIC-apparaat (ZHA of Zigbee2MQTT)',
    ed_name: 'Naam',
    ed_name_helper: 'Leeg laten voor "Linky"',
    ed_icon: 'Pictogram',
    ed_subscribed_power: 'Aansluitvermogen (kVA)',
    ed_subscribed_power_helper: 'Gebruikt voor de belastingsmeter; standaard 6 kVA',
    ed_price: 'Prijs per kWh',
    ed_price_helper: 'Optioneel: toont de kosten naast het verbruik',
    ed_tiers: 'Namen van de telwerken',
    ed_tiers_helper: 'In de volgorde van telwerk 1 tot 6 (bijv. Daluren, Piekuren)',
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
    en_injection: 'Meterstand teruglevering',
    en_tariff: 'Tariefperiode',
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
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Dispositivo LiXee ZLinky_TIC (ZHA ou Zigbee2MQTT)',
    ed_name: 'Nome',
    ed_name_helper: 'Deixe vazio para «Linky»',
    ed_icon: 'Ícone',
    ed_subscribed_power: 'Potência contratada (kVA)',
    ed_subscribed_power_helper: 'Usada no indicador de carga; 6 kVA por omissão',
    ed_price: 'Preço por kWh',
    ed_price_helper: 'Opcional: mostra o custo junto aos consumos',
    ed_tiers: 'Nomes das leituras',
    ed_tiers_helper: 'Pela ordem das leituras 1 a 6 (p. ex. Vazio, Fora de vazio)',
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
    en_injection: 'Leitura de injeção',
    en_tariff: 'Período tarifário',
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
    ed_device_id: 'ZLinky',
    ed_device_id_helper: 'Urządzenie LiXee ZLinky_TIC (ZHA lub Zigbee2MQTT)',
    ed_name: 'Nazwa',
    ed_name_helper: 'Pozostaw puste, aby użyć „Linky”',
    ed_icon: 'Ikona',
    ed_subscribed_power: 'Moc umowna (kVA)',
    ed_subscribed_power_helper: 'Używana przez wskaźnik obciążenia; domyślnie 6 kVA',
    ed_price: 'Cena za kWh',
    ed_price_helper: 'Opcjonalnie: pokazuje koszt obok zużycia',
    ed_tiers: 'Nazwy stref',
    ed_tiers_helper: 'W kolejności stref od 1 do 6 (np. Strefa nocna, Strefa dzienna)',
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
    en_injection: 'Stan energii oddanej',
    en_tariff: 'Strefa taryfowa',
    en_tier1: 'Strefa 1', en_tier2: 'Strefa 2', en_tier3: 'Strefa 3', en_tier4: 'Strefa 4', en_tier5: 'Strefa 5', en_tier6: 'Strefa 6',
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
  tariff: { keys: ['current_tarif', 'active_register_tier_delivered'], id: /(_ptec|_ltarf|_current_tarif|_periode_tarifaire|_tarif_en_cours|_ngtf)$/ },
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
  'injection', 'tariff'].concat(ZL_TIERS);

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

function zlMoney(lang, v, currency) {
  try {
    return new Intl.NumberFormat(lang, { style: 'currency', currency: currency || 'EUR', maximumFractionDigits: 2 }).format(v);
  } catch (_e) {
    return `${v.toFixed(2)} ${currency || 'EUR'}`;
  }
}

// Watts (or VA) with a kilo prefix from 10 000 on, like the meter's own screen.
function zlPower(lang, v, unit) {
  if (Math.abs(v) >= 10000) return `${zlNum(lang, v / 1000, 1)} k${unit}`;
  return `${zlNum(lang, v, 0)} ${unit}`;
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

function zlLoadLevel(pct) {
  if (pct == null) return 'low';
  if (pct >= 80) return 'high';
  if (pct >= 50) return 'mid';
  return 'low';
}

// Area chart of a series [{t, v}], drawn in a 300×64 box.
function zlSpark(points) {
  if (!points || points.length < 2) return '';
  var W = 300, H = 64, t0 = points[0].t, t1 = points[points.length - 1].t;
  var max = Math.max(...points.map((p) => p.v), 1);
  var x = (t) => (t1 === t0 ? 0 : ((t - t0) / (t1 - t0)) * W);
  var y = (v) => H - 3 - (v / max) * (H - 8);
  var line = points.map((p, i) => `${i ? 'L' : 'M'}${x(p.t).toFixed(1)} ${y(p.v).toFixed(1)}`).join('');
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">` +
    '<defs><linearGradient id="zl-sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="spark-c" stop-opacity=".35"/><stop offset="1" class="spark-c" stop-opacity="0"/></linearGradient></defs>' +
    `<path d="${line}L${W} ${H}L0 ${H}Z" fill="url(#zl-sg)"/>` +
    `<path d="${line}" fill="none" class="spark-l" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>`;
}

var ZL_STATS_REFRESH = 5 * 60000;
// After a failed recorder call the tiles show "—": retry on the next update past this delay
// instead of sitting on the failure for the whole refresh window.
var ZL_STATS_RETRY = 30000;

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
      show_graph: true, show_stats: true, show_index: true, show_phases: true, show_logo: true,
    }, config);
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.addEventListener('click', (ev) => this._onClick(ev));
    }
    this._stats = null;
    this._statsKey = null;
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

  getGridOptions() { return { columns: 12, min_columns: 6 }; }

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
    var order = ['current_b', 'current_c', 'voltage_b', 'voltage_c', 'injection', 'apparent_power'].concat(ZL_TIERS,
      ['energy', 'power', 'current', 'voltage', 'tariff']);
    order.forEach((role) => {
      if (over[role]) { ent[role] = over[role]; return; }
      var taken = Object.values(ent);
      ent[role] = zlFindRole(hass, list.filter((e) => taken.indexOf(e.entity_id) < 0), role);
    });
    var r = { deviceId: deviceId, ent: ent };
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
    var states = JSON.stringify(Object.keys(r.ent).map((k) => {
      var s = r.ent[k] && hass.states[r.ent[k]];
      return s ? s.state : null;
    }));
    var sig = JSON.stringify([this._lang(), this._fmtLang(), r.deviceId, this._zoomed, this._statsKey, this._statsVer, states]);
    if (sig === this._sig) return;
    this._sig = sig;
    this._r = r;
    this._render(r);
  }

  // Today / yesterday / this month from the recorder's long-term statistics, plus the 24 h power curve.
  _fetchStats(r) {
    var c = this._config, hass = this._hass;
    if (!hass.callWS || this._statsBusy) return;
    var curveId = r.ent.apparent_power || r.ent.power;
    // The 24 h curve (288 points) is only fetched when it will be drawn: `show_graph` on the full
    // card, or the mini once unfolded. The flag is part of the key, so unfolding refetches at once.
    var wantCurve = !!(curveId && c.show_graph && !this._compact());
    var key = `${r.ent.energy}|${curveId}|${wantCurve ? 1 : 0}`;
    var fresh = this._statsKey === key && Date.now() - (this._statsAt || 0) < ZL_STATS_REFRESH;
    // Nothing to fetch when neither the tiles (or the mini's "today" line) nor the curve are shown.
    if (fresh || !(c.show_stats || wantCurve)) return;
    this._statsBusy = true;
    this._statsKey = key;
    this._statsAt = Date.now();
    var failed = false;
    var change = (period, offset) => (r.ent.energy
      ? hass.callWS({ type: 'recorder/statistic_during_period', statistic_id: r.ent.energy,
        calendar: { period: period, offset: offset }, types: ['change'], units: { energy: 'kWh' } })
        .then((x) => (x?.change != null ? Number(x.change) : null)).catch(() => { failed = true; return null; })
      : Promise.resolve(null));
    var curve = wantCurve
      ? hass.callWS({ type: 'recorder/statistics_during_period', statistic_ids: [curveId], period: '5minute', types: ['mean'],
        start_time: new Date(Date.now() - 24 * 3600000).toISOString() })
        .then((x) => {
          var unitK = /^k/.test(String(this._st(curveId)?.attributes.unit_of_measurement || ''));
          return (x?.[curveId] || []).map((p) => ({
            t: typeof p.start === 'number' ? p.start : Date.parse(p.start),
            v: Number(p.mean) * (unitK ? 1000 : 1),
          })).filter((p) => Number.isFinite(p.t) && Number.isFinite(p.v));
        }).catch(() => { failed = true; return []; })
      : Promise.resolve([]);
    Promise.all([change('day', 0), change('day', -1), change('month', 0), curve]).then((res) => {
      // A reply for a previous config (setConfig while in flight) is dropped: the next update refetches.
      if (this._statsKey !== key) return;
      var next = { key: key, today: res[0], yesterday: res[1], month: res[2], curve: res[3] };
      var prev = this._stats;
      // On a partial failure, keep the previous values of the same query rather than falling back to "—".
      if (failed && prev && prev.key === key) {
        ['today', 'yesterday', 'month'].forEach((k) => { if (next[k] == null) next[k] = prev[k]; });
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
    var subscribed = Number(c.subscribed_power) > 0 ? Number(c.subscribed_power) : 6;
    var pct = main != null ? Math.max(0, Math.min(100, (main / (subscribed * 1000)) * 100)) : null;
    var level = online ? zlLoadLevel(pct) : 'off';
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

  _cost(kwh) {
    var price = Number(this._config.price);
    if (!(price > 0) || kwh == null) return '';
    return zlMoney(this._fmtLang(), kwh * price, this._hass.config?.currency);
  }

  _render(r) {
    var c = this._config, ent = r.ent;
    if (!r.deviceId && !c.entities) {
      this._setHtml(`${this._styles()}<ha-card><div class="empty"><ha-icon icon="mdi:meter-electric-outline"></ha-icon>${this._t('no_device')}</div></ha-card>`);
      return;
    }
    var m = this._model(r);
    if (this._compact()) {
      this._setHtml(this._miniHtml(m));
      return;
    }
    var lang = m.lang;

    // Hero: meter, live power, active power / current / voltage, load gauge.
    var chips = [];
    if (m.va != null && m.watts != null) chips.push(this._chip('mdi:flash-outline', zlPower(lang, m.watts, 'W'), ent.power));
    var amps = this._numv(ent.current), volts = this._numv(ent.voltage);
    if (amps != null) chips.push(this._chip('mdi:current-ac', `${zlNum(lang, amps, 1)} A`, ent.current));
    if (volts != null && volts > 0) chips.push(this._chip('mdi:sine-wave', `${zlNum(lang, volts, 0)} V`, ent.voltage));
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
      var peak = Math.max(...curve.map((p) => p.v));
      graph = '<div class="section">' +
        `<div class="section-title"><ha-icon icon="mdi:chart-areaspline"></ha-icon><span>${this._t('last_24h')}</span><span class="aside">${zlEsc(this._t('peak').replace('{v}', zlPower(lang, peak, m.mainUnit)))}</span></div>` +
        `<div class="graph">${zlSpark(curve)}</div></div>`;
    }

    // Consumption tiles.
    var stats = '';
    if (c.show_stats && ent.energy && this._stats) {
      var tiles = [['today', this._stats.today], ['yesterday', this._stats.yesterday], ['month', this._stats.month]]
        .map(([k, v]) => {
          var cost = this._cost(v);
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

    // Three-phase details, only when the other phases carry a voltage.
    var phases = '';
    var vb = this._numv(ent.voltage_b), vc = this._numv(ent.voltage_c);
    if (c.show_phases && (vb > 0 || vc > 0)) {
      var maxA = Math.max(1, (m.subscribed * 1000) / 3 / 230);
      var lines = [['1', ent.current, ent.voltage], ['2', ent.current_b, ent.voltage_b], ['3', ent.current_c, ent.voltage_c]].map(([n, ci, vi]) => {
        var a = this._numv(ci), v = this._numv(vi);
        var w = a == null ? 0 : Math.min(100, (a / maxA) * 100);
        return `<div class="phase"><span class="pn">L${n}</span><div class="bar"><div class="fill" style="width:${w.toFixed(1)}%"></div></div>` +
          `<span class="pv">${a == null ? '—' : `${zlNum(lang, a, 1)} A`}</span><span class="pv dim">${v == null ? '' : `${zlNum(lang, v, 0)} V`}</span></div>`;
      });
      phases = `<div class="section"><div class="section-title"><ha-icon icon="mdi:transmission-tower"></ha-icon><span>${this._t('phases')}</span></div>${lines.join('')}</div>`;
    }

    this._setHtml(this._styles(m.color) + '<ha-card>' +
      '<div class="header">' + m.logo +
        `<div class="titles"><div class="name">${zlEsc(m.name)}</div><div class="sub">${zlEsc(m.sub)}</div></div>` +
        `<span class="st"><span class="dot"></span><span class="stt">${zlEsc(m.statusText)}</span></span>` + this._zoomButton() +
      '</div>' + hero + stats + graph + index + phases +
    '</ha-card>');
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
      var cost = this._cost(today);
      lines.push(`<div class="line"><ha-icon icon="mdi:calendar-today"></ha-icon><span>${this._t('today')} · ${zlNum(m.lang, today, 1)} kWh${cost ? ` · ${zlEsc(cost)}` : ''}</span></div>`);
    }
    return this._styles(m.color) + '<ha-card class="mini">' +
      '<div class="header">' + m.logo +
        `<div class="titles"><div class="name">${zlEsc(m.name)}</div></div>` +
        `<span class="st"><span class="dot"></span><span class="stt">${zlEsc(m.statusText)}</span></span>` + this._zoomButton() +
      '</div>' +
      '<div class="content">' + this._picture(m) +
        '<div class="info">' +
          this._big(m.ent.apparent_power || m.ent.power, m.mainText) +
          this._loadBar(m) + lines.join('') +
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
      'ha-card { height: 100%; box-sizing: border-box; padding: 12px; display: flex; flex-direction: column; gap: 12px; }' +
      '.empty { display: flex; align-items: center; gap: 10px; color: var(--secondary-text-color); }' +
      'button { all: unset; box-sizing: border-box; cursor: pointer; }' +
      'button:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px; border-radius: 8px; }' +
      // The body starts 8px under the header (the card gap is 12px between body blocks).
      '.header { display: flex; align-items: center; gap: 10px; margin-bottom: -4px; }' +
      '.hbadge { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; flex: none;' +
        ' background: color-mix(in srgb, var(--zl-color) 16%, transparent); color: var(--zl-color); }' +
      '.hbadge ha-icon { --mdc-icon-size: 24px; }' +
      'ha-card.mini .hbadge { width: 32px; height: 32px; }' +
      'ha-card.mini .hbadge ha-icon { --mdc-icon-size: 20px; }' +
      // The name keeps at least ~5 characters ("Linky"): past that a long status pill ellipsizes instead.
      '.titles { flex: 1; min-width: 2.4em; }' +
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.st { display: inline-flex; align-items: center; gap: 4px; flex-shrink: 1; min-width: 0; padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;' +
        ' white-space: nowrap; background: color-mix(in srgb, var(--zl-color) 15%, transparent);' +
        ' color: color-mix(in srgb, var(--zl-color) 50%, var(--primary-text-color, #212121)); }' +
      '.stt { overflow: hidden; text-overflow: ellipsis; }' +
      '.dot { flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--zl-color); }' +
      '.zoom { flex-shrink: 0; width: 24px; height: 24px; margin: -4px -4px -4px 0; border-radius: 50%;' +
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
      '.big .val { font-size: 30px; font-weight: 400; line-height: 1.1; color: var(--primary-text-color); white-space: nowrap; }' +
      'ha-card.mini .big .val { font-size: 24px; }' +
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
      '.line span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }' +
      '.tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }' +
      '.tile { display: flex; flex-direction: column; gap: 2px; padding: 8px 10px; border-radius: 12px; min-width: 0;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.tl { font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.tv { font-size: 18px; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; }' +
      '.tv small, .iv small { font-size: 11px; font-weight: 400; color: var(--secondary-text-color); }' +
      '.tc { font-size: 11px; font-weight: 500; color: var(--zl-green); }' +
      '.section { display: flex; flex-direction: column; gap: 6px; }' +
      '.section-title { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; text-transform: uppercase;' +
        ' letter-spacing: .04em; color: var(--secondary-text-color); }' +
      '.section-title ha-icon { --mdc-icon-size: 16px; }' +
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
      '.rv { font-variant-numeric: tabular-nums; color: var(--primary-text-color); }' +
      '.phase { display: grid; grid-template-columns: 22px 1fr 52px 40px; align-items: center; gap: 8px; font-size: 12px; }' +
      '.pn { font-weight: 500; color: var(--secondary-text-color); }' +
      '.pv { text-align: right; color: var(--primary-text-color); white-space: nowrap; } .pv.dim { color: var(--secondary-text-color); }' +
    '</style>';
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
    if (ev.detail === 0) this.shadowRoot.querySelector('.zoom')?.focus();
  }
}

// ── zlinky-card-editor (visual editor, built on HA's ha-form) ────────────────
var ZL_EDITOR_DEFAULTS = { show_graph: true, show_stats: true, show_index: true, show_phases: true, show_logo: true, zoom: true };

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
          { name: 'subscribed_power', selector: { number: { min: 3, max: 36, step: 1, mode: 'box', unit_of_measurement: 'kVA' } } },
          { name: 'price', selector: { number: { min: 0, max: 2, step: 0.0001, mode: 'box' } } },
        ],
      },
      { name: 'tiers', selector: { text: { multiple: true } } },
      {
        type: 'grid', name: '', schema: [
          { name: 'show_stats', selector: { boolean: {} } },
          { name: 'show_graph', selector: { boolean: {} } },
          { name: 'show_index', selector: { boolean: {} } },
          { name: 'show_phases', selector: { boolean: {} } },
          { name: 'show_logo', selector: { boolean: {} } },
        ].concat(mini ? [{ name: 'zoom', selector: { boolean: {} } }] : []),
      },
      {
        name: 'language',
        selector: { select: { mode: 'dropdown', options: [{ value: 'fr', label: 'Français' }, { value: 'en', label: 'English' }, { value: 'de', label: 'Deutsch' }, { value: 'es', label: 'Español' }, { value: 'sr', label: 'Српски' }, { value: 'sr-Latn', label: 'Srpski (latinica)' }, { value: 'it', label: 'Italiano' }, { value: 'nl', label: 'Nederlands' }, { value: 'pt', label: 'Português (Portugal)' }, { value: 'pl', label: 'Polski' }] } },
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
    this._form.data = Object.assign({}, ZL_EDITOR_DEFAULTS, this._config);
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left empty or at their default.
    Object.keys(value).forEach((key) => {
      if (value[key] === '' || value[key] === null || value[key] === undefined) delete value[key];
    });
    if (Array.isArray(value.tiers) && !value.tiers.filter((t) => t).length) delete value.tiers;
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
    this._config = value;
    // A new language option relabels the form.
    if (lang !== this._lang()) this._render();
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
