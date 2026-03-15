import { TAG_CONFIG } from "@/data/meals";

export default function TagBadge({ tag }) {
  const cfg = TAG_CONFIG[tag];
  if (!cfg) return null;
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "10px",
        fontWeight: 600,
        padding: "1px 6px",
        borderRadius: "999px",
        background: cfg.bg,
        color: cfg.color,
        marginLeft: "6px",
        whiteSpace: "nowrap",
        letterSpacing: "0.02em",
      }}
    >
      {cfg.label}
    </span>
  );
}
