import TagBadge from "./TagBadge";
import { getMeal } from "@/data/meals";

export default function MealCell({ entry, slot }) {
  const meal = getMeal(entry.id);
  const isSpontan = entry.tags.includes("spontan");

  const visibleTags = entry.tags.filter(
    (t) => !(t === "prep" && entry.tags.includes("reste"))
  );

  return (
    <div
      style={{
        padding: "8px 10px",
        borderRadius: "8px",
        background: isSpontan ? "#f8fafc" : "#ffffff",
        border: "1px solid",
        borderColor: isSpontan ? "#e2e8f0" : "#e8edf2",
        minHeight: 44,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#94a3b8",
        }}
      >
        {slot === "mittag" ? "🌞 Mittag" : "🌙 Abend"}
      </div>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <span
          style={{
            fontSize: "13px",
            color: isSpontan ? "#94a3b8" : "#1e293b",
            fontStyle: isSpontan ? "italic" : "normal",
            fontWeight: isSpontan ? 400 : 500,
          }}
        >
          {meal.label}
        </span>
        {visibleTags.map((t) => (
          <TagBadge key={t} tag={t} />
        ))}
      </div>
      {meal.notes && !isSpontan && (
        <div style={{ fontSize: "10px", color: "#94a3b8", fontStyle: "italic" }}>
          {meal.notes}
        </div>
      )}
    </div>
  );
}
