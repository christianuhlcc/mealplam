"use client";

import { useState } from "react";
import Link from "next/link";
import { WEEKS, TAG_CONFIG } from "@/data/meals";
import MealCell from "./MealCell.jsx";
import StatsBar from "./StatsBar.jsx";

export default function MealPlan() {
  const [activeWeek, setActiveWeek] = useState(0);
  const week = WEEKS[activeWeek];

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#f0f4f8", minHeight: "100vh", padding: "24px 16px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
            🍽 Familienessensplan
          </h1>
          <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
            2 Erwachsene · 1 Kind (Mittags Kita) · 4 Wochen
          </p>
          <Link href="/shopping" style={{
            display: "inline-block",
            marginTop: 10,
            padding: "7px 16px",
            borderRadius: 8,
            background: "#334155",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
            fontFamily: "Georgia, serif",
          }}>
            🛒 Zur Einkaufsliste
          </Link>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20, justifyContent: "center" }}>
          {Object.entries(TAG_CONFIG).map(([k, v]) => (
            <span key={k} style={{ fontSize: "11px", padding: "3px 8px", borderRadius: 999, background: v.bg, color: v.color, fontWeight: 600 }}>
              {v.label}
            </span>
          ))}
        </div>

        {/* Week Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {WEEKS.map((w, i) => (
            <button
              key={i}
              onClick={() => setActiveWeek(i)}
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

        <StatsBar week={week} />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {week.days.map((d, i) => {
            const isWeekend = d.day === "Samstag" || d.day === "Sonntag";
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr 1fr",
                  gap: 8,
                  background: isWeekend ? "#f8f6ff" : "#fff",
                  borderRadius: 12,
                  padding: "10px",
                  border: "1px solid",
                  borderColor: isWeekend ? "#e2d9f3" : "#e8edf2",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: isWeekend ? "#6b21a8" : "#334155" }}>
                    {d.day}
                  </div>
                  {isWeekend && (
                    <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 600 }}>Wochenende</div>
                  )}
                </div>
                <MealCell entry={d.mittag} slot="mittag" />
                <MealCell entry={d.abend} slot="abend" />
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 20, padding: "12px 16px", background: "#fffbeb", borderRadius: 10, border: "1px solid #fde68a", fontSize: 12, color: "#78350f" }}>
          <strong>💡 Hinweis:</strong> ⏭ Vorkoch-Gerichte liefern am nächsten Tag die 🔄 Reste-Mahlzeit.
          Freitags steht für die Erwachsenen immer Pizza als Mittagsoption – das Kind isst sowieso in der Kita.
        </div>

      </div>
    </div>
  );
}
