import { T } from "../constants/theme";

export function Footer() {
  return (
    <footer
      style={{
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "28px 24px",
        marginTop: 20,
      }}>
      <div
        style={{
          maxWidth: 1100,
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
              width: 32,
              height: 32,
              borderRadius: 9,
              background: T.grad1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
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
        <div style={{ fontFamily: T.font, color: T.dim, fontSize: 12 }}>
          © 2025 ServiHub · Kathmandu, Nepal · Making homes better
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Support", "Blog"].map((l) => (
            <span key={l} style={{ fontFamily: T.font, color: T.muted, fontSize: 12, cursor: "pointer" }}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
