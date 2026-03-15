// ============================================================
//  ESSENSPLAN – Datenkonfiguration
//  Hier alle Gerichte und Wochenpläne verwalten.
// ============================================================

export const MEAL_CATALOG = [
  { id: "pasta-tomato",          label: "Nudeln mit Tomatensauce",            slots: "both" },
  { id: "pasta-spinach",         label: "Nudeln mit Spinat-Käse-Sauce",        slots: "both" },
  { id: "potato-spinach-egg",    label: "Kartoffeln mit Spinat & Ei",          slots: "both", notes: "Reste → am nächsten Mittag als Bratkartoffeln" },
  { id: "roast-potatoes",        label: "Bratkartoffeln",                      slots: "both" },
  { id: "rice-pudding",          label: "Milchreis",                           slots: "abend" },
  { id: "nuggets-fries",         label: "Chicken Nuggets & Pommes",            slots: "both" },
  { id: "rice-veggie-tempeh",    label: "Reis mit Gemüse & Tempeh",            slots: "both", notes: "Reste Reis → nächsten Mittag als Gebratener Gemüse-Eier-Reis" },
  { id: "cordon-bleu-veg",       label: "Veg. Cordon bleu mit Reis & Gemüse", slots: "both" },
  { id: "fried-rice",            label: "Gebratener Gemüse-Eier-Reis",         slots: "both" },
  { id: "pizza",                 label: "Pizza",                               slots: "mittag" },
  { id: "salad-cheese-egg",      label: "Salat mit Käse, Ei & Nüssen",         slots: "mittag" },
  { id: "stew-baguette",         label: "Eintopf mit Kräuterbutter-Baguette", slots: "both", notes: "Reste → am nächsten Mittag aufwärmen" },
  { id: "stew-leftover",         label: "Eintopf (Reste)",                     slots: "mittag" },
  { id: "pancakes",              label: "Pfannkuchen",                         slots: "both" },
  { id: "potato-broccoli-mince", label: "Kartoffel-Brokkoli-Hack-Auflauf",    slots: "both", notes: "Große Portion → Reste für nächsten Tag" },
  { id: "veggie-curry",          label: "Gemüsecurry mit Reis",                slots: "mittag", notes: "Reste Reis → nächsten Mittag als Gebratener Gemüse-Eier-Reis" },
  { id: "veggie-soup",           label: "Gemüsesuppe",                         slots: "both", notes: "Reste → am nächsten Mittag aufwärmen" },
  { id: "semolina-soup",         label: "Griessnockensuppe",                   slots: "both", notes: "Reste → am nächsten Mittag aufwärmen" },
  { id: "kaesespaetzle",         label: "Käsespätzle",                         slots: "both", weekendOnly: true },
  { id: "schupfnudeln",          label: "Schupfnudeln mit Sauerkraut",         slots: "both" },
  { id: "brotzeit",              label: "Brotzeit",                            slots: "abend" },
  { id: "waffles",               label: "Waffeln",                             slots: "both" },
  { id: "gnocchi-tomato",        label: "Fertige Gnocchi mit Tomatensauce",    slots: "both" },
  { id: "spontan",               label: "Spontan",                             slots: "both" },
];

export function getMeal(id) {
  const meal = MEAL_CATALOG.find((m) => m.id === id);
  if (!meal) throw new Error(`Unbekannte Mahlzeit-ID: "${id}"`);
  return meal;
}

export const TAG_CONFIG = {
  reste:   { label: "🔄 Reste",    bg: "#e0f2fe", color: "#0369a1" },
  prep:    { label: "⏭ Vorkoch",  bg: "#dcfce7", color: "#15803d" },
  sweet:   { label: "🍬 Süß",     bg: "#fef9c3", color: "#92400e" },
  brot:    { label: "🥪 Brotzeit", bg: "#fce7f3", color: "#9d174d" },
  we:      { label: "🏠 WE",      bg: "#f3e8ff", color: "#6b21a8" },
  spontan: { label: "❓ Spontan",  bg: "#f1f5f9", color: "#475569" },
};

export const WEEKS = [
  // ── WOCHE 1 ────────────────────────────────────────────────
  {
    week: 1,
    days: [
      { day: "Montag",     mittag: { id: "salad-cheese-egg",     tags: [] },          abend: { id: "rice-veggie-tempeh",    tags: ["prep"] } },
      { day: "Dienstag",   mittag: { id: "fried-rice",           tags: ["reste"] },   abend: { id: "semolina-soup",         tags: ["prep"] } },
      { day: "Mittwoch",   mittag: { id: "semolina-soup",        tags: ["reste"] },   abend: { id: "pasta-tomato",          tags: [] } },
      { day: "Donnerstag", mittag: { id: "spontan",              tags: ["spontan"] }, abend: { id: "brotzeit",              tags: ["brot"] } },
      { day: "Freitag",    mittag: { id: "pizza",                tags: [] },          abend: { id: "schupfnudeln",          tags: [] } },
      { day: "Samstag",    mittag: { id: "spontan",              tags: ["spontan"] }, abend: { id: "kaesespaetzle",         tags: ["we"] } },
      { day: "Sonntag",    mittag: { id: "spontan",              tags: ["spontan"] }, abend: { id: "rice-pudding",          tags: ["sweet"] } },
    ],
  },

  // ── WOCHE 2 ────────────────────────────────────────────────
  {
    week: 2,
    days: [
      { day: "Montag",     mittag: { id: "spontan",              tags: ["spontan"] }, abend: { id: "stew-baguette",         tags: ["prep"] } },
      { day: "Dienstag",   mittag: { id: "stew-leftover",        tags: ["reste"] },   abend: { id: "potato-spinach-egg",    tags: ["prep"] } },
      { day: "Mittwoch",   mittag: { id: "roast-potatoes",       tags: ["reste"] },   abend: { id: "nuggets-fries",         tags: [] } },
      { day: "Donnerstag", mittag: { id: "salad-cheese-egg",     tags: [] },          abend: { id: "brotzeit",              tags: ["brot"] } },
      { day: "Freitag",    mittag: { id: "pizza",                tags: [] },          abend: { id: "potato-broccoli-mince", tags: ["prep"] } },
      { day: "Samstag",    mittag: { id: "potato-broccoli-mince",tags: ["reste"] },   abend: { id: "pancakes",              tags: ["sweet"] } },
      { day: "Sonntag",    mittag: { id: "spontan",              tags: ["spontan"] }, abend: { id: "brotzeit",              tags: ["brot"] } },
    ],
  },

  // ── WOCHE 3 ────────────────────────────────────────────────
  {
    week: 3,
    days: [
      { day: "Montag",     mittag: { id: "veggie-curry",         tags: [] },          abend: { id: "rice-veggie-tempeh",    tags: ["prep"] } },
      { day: "Dienstag",   mittag: { id: "fried-rice",           tags: ["reste"] },   abend: { id: "veggie-soup",           tags: ["prep"] } },
      { day: "Mittwoch",   mittag: { id: "veggie-soup",          tags: ["reste"] },   abend: { id: "pasta-spinach",         tags: [] } },
      { day: "Donnerstag", mittag: { id: "spontan",              tags: ["spontan"] }, abend: { id: "gnocchi-tomato",        tags: [] } },
      { day: "Freitag",    mittag: { id: "pizza",                tags: [] },          abend: { id: "cordon-bleu-veg",       tags: [] } },
      { day: "Samstag",    mittag: { id: "spontan",              tags: ["spontan"] }, abend: { id: "roast-potatoes",        tags: [] } },
      { day: "Sonntag",    mittag: { id: "spontan",              tags: ["spontan"] }, abend: { id: "waffles",               tags: ["sweet"] } },
    ],
  },

  // ── WOCHE 4 ────────────────────────────────────────────────
  {
    week: 4,
    days: [
      { day: "Montag",     mittag: { id: "veggie-curry",         tags: [] },          abend: { id: "stew-baguette",         tags: ["prep"] } },
      { day: "Dienstag",   mittag: { id: "stew-leftover",        tags: ["reste"] },   abend: { id: "rice-veggie-tempeh",    tags: ["prep"] } },
      { day: "Mittwoch",   mittag: { id: "fried-rice",           tags: ["reste"] },   abend: { id: "schupfnudeln",          tags: [] } },
      { day: "Donnerstag", mittag: { id: "spontan",              tags: ["spontan"] }, abend: { id: "brotzeit",              tags: ["brot"] } },
      { day: "Freitag",    mittag: { id: "pizza",                tags: [] },          abend: { id: "potato-broccoli-mince", tags: ["prep"] } },
      { day: "Samstag",    mittag: { id: "potato-broccoli-mince",tags: ["reste"] },   abend: { id: "kaesespaetzle",         tags: ["we"] } },
      { day: "Sonntag",    mittag: { id: "spontan",              tags: ["spontan"] }, abend: { id: "rice-pudding",          tags: ["sweet"] } },
    ],
  },
];
