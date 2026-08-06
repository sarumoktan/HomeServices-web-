import { T } from "./theme";

export const inp = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 10,
  padding: "10px 14px",
  color: T.text,
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box",
  fontFamily: T.font,
  outline: "none",
};

export const card = {
  background: T.card,
  border: `1px solid ${T.border}`,
  borderRadius: 18,
};

export const btnP = {
  background: T.grad1,
  border: "none",
  borderRadius: 12,
  padding: "12px 24px",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: 14,
  fontFamily: T.font,
  width: "100%",
};

export const btnG = {
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  padding: "11px 20px",
  color: T.text,
  fontWeight: 600,
  cursor: "pointer",
  fontSize: 13,
  fontFamily: T.font,
};
