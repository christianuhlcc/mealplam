"use client";

import { useState } from "react";
import Link from "next/link";
import { WEEKS } from "@/data/meals";
import { MEAL_INGREDIENTS, CATEGORIES } from "@/data/ingredients";

function buildShoppingList(week) {
  const seen = new Map(); // name.toLowerCase() -> {name, category, meals, multi}

  for (const day of week.days) {
    for (const slot of ["mittag", "abend"]) {
      const entry = day[slot];
      if (entry.tags.includes("spontan") || entry.tags.includes("reste")) continue;
      const items = MEAL_INGREDIENTS[entry.id] || [];
      for (const item of items) {
        const key = item.name.toLowerCase();
        if (seen.has(key)) {
          const existing = seen.get(key);
          existing.multi = true;
          if (!existing.meals.includes(day.day)) existing.meals.push(day.day);
        } else {
          seen.set(key, { ...item, meals: [day.day], multi: false });
        }
      }
    }
  }

  const grouped = {};
  for (const cat of CATEGORIES) grouped[cat] = [];
  for (const item of seen.values()) {
    grouped[item.category].push(item);
  }
  return grouped;
}

export default function ShoppingPage() {
  const [activeWeek, setActiveWeek] = useState(0);
  const [checked, setChecked] = useState({});

  const week = WEEKS[activeWeek];
  const grouped = buildShoppingList(week);
  const totalItems = Object.values(grouped).flat().length;
  const checkedCount = Object.values(checked).filter(Boolean).length;

  function toggle(key) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function resetChecked() {
    setChecked({});
  }

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#f0f4f8", minHeight: "100vh", padding: "24px 16px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          <Link href="/" style={{ fontSize: 12, color: "#64748b", textDecoration: "none", display: "block", marginBottom: 8 }}>
            ← Zurück zum Essensplan
          </Link>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            🛒 Einkaufsliste
          </h1>
          <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
            Für Samstags-Einkauf · {checkedCount}/{totalItems} erledigt
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ background: "#e2e8f0", borderRadius: 999, height: 6, marginBottom: 20, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%`,
            background: "#22c55e",
            borderRadius: 999,
            transition: "width 0.3s",
          }} />
        </div>

        {/* Week Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {WEEKS.map((w, i) => (
            <button
              key={i}
              onClick={() => { setActiveWeek(i); setChecked({}); }}
              style={{
                padding: "8px 18px",
                borderRadius: 8,
                border: "2px solid",
                borderColor: activeWeek === i ? "#334155" : "#cbd5e1",
                background: activeWeek === i ? "#334155" : "#fff",
                color: activeWeek === i ? "#fff" : "#475569",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Woche {w.week}
            </button>
          ))}
        </div>

        {/* Reset button */}
        {checkedCount > 0 && (
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <button
              onClick={resetChecked}
              style={{
                fontSize: 12, color: "#ef4444", background: "none",
                border: "1px solid #fca5a5", borderRadius: 6,
                padding: "4px 12px", cursor: "pointer", fontFamily: "inherit",
              }}
            >
              ✕ Auswahl zurücksetzen
            </button>
          </div>
        )}

        {/* Grouped list */}
        {CATEGORIES.map((cat) => {
          const items = grouped[cat];
          if (!items || items.length === 0) return null;
          return (
            <div key={cat} style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: 12, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.08em", color: "#64748b",
                padding: "4px 0 8px", borderBottom: "1px solid #e2e8f0",
                marginBottom: 6,
              }}>
                {cat}
              </div>
              {items.map((item) => {
                const key = item.name.toLowerCase();
                const done = !!checked[key];
                return (
                  <div
                    key={key}
                    onClick={() => toggle(key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 8,
                      background: done ? "#f1f5f9" : "#fff",
                      marginBottom: 4,
                      cursor: "pointer",
                      border: "1px solid",
                      borderColor: done ? "#e2e8f0" : "#e8edf2",
                      transition: "background 0.15s",
                    }}
                  >
                    {/* Checkbox */}
                    <div style={{
                      width: 20, height: 20, borderRadius: 6,
                      border: `2px solid ${done ? "#22c55e" : "#cbd5e1"}`,
                      background: done ? "#22c55e" : "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, transition: "all 0.15s",
                    }}>
                      {done && <span style={{ color: "#fff", fontSize: 12, lineHeight: 1 }}>✓</span>}
                    </div>

                    {/* Name & amount */}
                    <div style={{ flex: 1 }}>
                      <span style={{
                        fontSize: 14, fontWeight: 500,
                        color: done ? "#94a3b8" : "#1e293b",
                        textDecoration: done ? "line-through" : "none",
                      }}>
                        {item.name}
                      </span>
                      {item.multi && (
                        <span style={{ fontSize: 11, color: "#f97316", marginLeft: 6, fontWeight: 600 }}>
                          mehrfach
                        </span>
                      )}
                    </div>

                    {/* Amount */}
                    <span style={{ fontSize: 12, color: done ? "#cbd5e1" : "#64748b", whiteSpace: "nowrap" }}>
                      {item.amount}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Footer */}
        <div style={{ marginTop: 16, padding: "10px 14px", background: "#fffbeb", borderRadius: 10, border: "1px solid #fde68a", fontSize: 12, color: "#78350f" }}>
          <strong>💡 Tipp:</strong> Spontan-Slots und Reste-Mahlzeiten sind nicht enthalten – die brauchen nichts Neues.
        </div>

      </div>
    </div>
  );
}
