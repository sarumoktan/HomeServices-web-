import { T } from "../constants/theme";

export function Avatar({ initials, gradient, size = 48 }) {
  const grads = {
    orange: "linear-gradient(135deg,#FF6B35,#F7931E)",
    green: "linear-gradient(135deg,#11998E,#38EF7D)",
    blue: "linear-gradient(135deg,#667EEA,#764BA2)",
    purple: "linear-gradient(135deg,#F093FB,#F5576C)",
    teal: "linear-gradient(135deg,#4facfe,#00f2fe)",
    pink: "linear-gradient(135deg,#FC466B,#3F5EFB)",
  };
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: grads[gradient] || grads.blue,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        color: "white",
        fontSize: Math.round(size * 0.32),
        fontFamily: T.font,
        flexShrink: 0,
        letterSpacing: 1,
        boxShadow: `0 4px 16px ${grads[gradient] || grads.blue}55`,
      }}>
      {initials}
    </div>
  );
}
