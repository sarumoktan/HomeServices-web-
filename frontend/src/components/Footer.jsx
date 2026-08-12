import { T } from "../constants/theme";

export function Footer() {
  return (
    <footer
      style={{
        background: "rgba(248, 249, 250, 0.95)", // Changed to off-white to match the navbar
        borderTop: "1px solid rgba(0, 0, 0, 0.08)", // Adjusted border for light background
        padding: "34px 24px",
        marginTop: 24,
      }}>
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: T.grad1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}>
            🏠
          </div>
          <span
            style={{
              fontFamily: T.font,
              fontWeight: 900,
              fontSize: 15,
              background: T.grad1,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            ServiHub
          </span>
        </div>
        <div style={{ fontFamily: T.font, color: "#718096", fontSize: 12, textAlign: "center", flex: 1, minWidth: 220 }}>
          © 2026 ServiHub • Kathmandu, Nepal • Reliable home services at your doorstep
        </div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
          {["Privacy", "Terms", "Support", "Blog"].map((l) => (
            <span key={l} style={{ fontFamily: T.font, color: "#4A5568", fontSize: 12, cursor: "pointer" }}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}