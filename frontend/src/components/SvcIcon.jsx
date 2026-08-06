export function SvcIcon({ type, size = 44 }) {
  const cfg = {
    Plumbing: { grad: "#FF6B35,#F7931E", bg: "#FF6B3520", e: "🔧" },
    Electrical: { grad: "#F7971E,#FFD200", bg: "#FFD23F20", e: "⚡" },
    Cleaning: { grad: "#11998E,#38EF7D", bg: "#38EF7D20", e: "🧹" },
    Tutoring: { grad: "#667EEA,#764BA2", bg: "#764BA220", e: "📚" },
    Painting: { grad: "#FC466B,#3F5EFB", bg: "#FC466B20", e: "🎨" },
    Gardening: { grad: "#56ab2f,#a8e063", bg: "#38EF7D18", e: "🌿" },
    Carpentry: { grad: "#F7971E,#FFD200", bg: "#F7931E20", e: "🪵" },
    "AC Repair": { grad: "#4facfe,#00f2fe", bg: "#4facfe20", e: "❄️" },
  };
  const c = cfg[type] || cfg.Plumbing;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: c.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.44,
        flexShrink: 0,
        border: `1.5px solid ${c.bg.replace("20", "40")}`,
      }}>
      {c.e}
    </div>
  );
}
