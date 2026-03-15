# 🍽 Familienessensplan

4-Wochen Essensplan mit Reste-Logik für die Familie – gebaut mit Next.js 14.

## Lokale Entwicklung

```bash
npm install
npm run dev
```

App läuft dann auf [http://localhost:3000](http://localhost:3000).

---

## Deployment

### 1. GitHub Repository anlegen

```bash
# Im Projektordner:
git init
git add .
git commit -m "Initial commit"

# Neues Repo auf github.com anlegen, dann:
git remote add origin https://github.com/DEIN-USERNAME/family-mealplan.git
git branch -M main
git push -u origin main
```

### 2. Vercel Deployment

1. Auf [vercel.com](https://vercel.com) einloggen
2. **"Add New Project"** → GitHub Repo auswählen
3. Framework wird automatisch als **Next.js** erkannt
4. **"Deploy"** klicken – fertig ✅

Bei jedem `git push` auf `main` deployed Vercel automatisch.

---

## Gerichte anpassen

Alle Gerichte und Wochenpläne sind in einer einzigen Datei:

```
src/data/meals.js
```

### Neues Gericht hinzufügen

Im `MEAL_CATALOG`-Array einen neuen Eintrag ergänzen:

```js
{
  id: "meine-neue-mahlzeit",   // eindeutige ID (kebab-case)
  label: "Mein neues Gericht", // Anzeigename
  slots: "both",               // "mittag" | "abend" | "both"
  weekendOnly: false,          // optional: true = nur Sa/So
  notes: "Tipp hier",          // optional: Vorkochtipp etc.
},
```

### Gericht in einen Wochenplan einsetzen

Im `WEEKS`-Array die entsprechende `id` verwenden:

```js
{
  day: "Montag",
  mittag: { id: "meine-neue-mahlzeit", tags: [] },
  abend:  { id: "brotzeit",            tags: ["brot"] },
},
```

### Erlaubte Tags

| Tag       | Bedeutung                          |
|-----------|------------------------------------|
| `reste`   | Ist ein Reste-Gericht vom Vortag   |
| `prep`    | Heute viel kochen → Reste für morgen |
| `sweet`   | Süßes Abendessen (max. 1×/Woche)   |
| `brot`    | Brotzeit (max. 3×/Woche)           |
| `we`      | Nur am Wochenende                  |
| `spontan` | Freier Slot                        |

### Neue Woche hinzufügen

Einfach ein weiteres Objekt ans `WEEKS`-Array anhängen:

```js
{
  week: 5,
  days: [
    // 7 Einträge Mo–So
  ],
},
```

---

## Projektstruktur

```
src/
├── app/
│   ├── layout.js        # HTML-Rahmen & Metadata
│   ├── page.js          # Einstiegspunkt
│   └── globals.css      # Basis-Reset
├── components/
│   ├── MealPlan.jsx     # Hauptkomponente (Tab-Ansicht)
│   ├── MealCell.jsx     # Einzelne Mahlzeit-Kachel
│   ├── StatsBar.jsx     # Wochenstatistik (Brotzeit/Süß/etc.)
│   └── TagBadge.jsx     # Farbiges Label-Badge
└── data/
    └── meals.js         # ← HIER alles anpassen
```
