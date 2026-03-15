export default function StatsBar({ week }) {
  const brotCount  = week.days.filter((d) => d.abend.tags.includes("brot")).length;
  const sweetCount = week.days.filter((d) => d.abend.tags.includes("sweet")).length;
  const spontanCount = week.days.filter(
    (d) => d.mittag.tags.includes("spontan") || d.abend.tags.includes("spontan")
  ).length;
  const resteCount = week.days.filter(
    (d) => d.mittag.tags.includes("reste") || d.abend.tags.includes("reste")
  ).length;

  const stats = [
    { label: "Brotzeit abends",  val: brotCount,   max: 3,    icon: "🥪", warn: brotCount > 3 },
    { label: "Süßes abends",     val: sweetCount,  max: 1,    icon: "🍬", warn: sweetCount > 1 },
    { label: "Spontan-Slots",    val: spontanCount,max: null, icon: "❓", warn: false },
    { label: "Reste-Mahlzeiten", val: resteCount,  max: null, icon: "🔄", warn: false },
  ];

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            flex: "1 1 120px",
            background: "#fff",
            borderRadius: 10,
            padding: "8px 12px",
            border: `1px solid ${s.warn ? "#fca5a5" : "#e2e8f0"}`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 18 }}>{s.icon}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: s.warn ? "#ef4444" : "#0f172a" }}>
            {s.val}{s.max ? `/${s.max}` : ""}
          </div>
          <div style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
