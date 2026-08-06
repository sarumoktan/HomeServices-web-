import { useState } from "react";
import { T } from "../../constants/theme";
import { card, btnP } from "../../constants/styles";
import { Overlay } from "../Overlay";

export function MapModal({ onClose }) {
  const [sel, setSel] = useState(null);
  const pins = [
    { id: 1, x: 37, y: 43, name: "Rajesh K.", service: "Plumber", price: 350, rating: 4.9 },
    { id: 2, x: 61, y: 31, name: "Sita S.", service: "Cleaner", price: 280, rating: 4.8 },
    { id: 3, x: 54, y: 57, name: "Arun T.", service: "Electrician", price: 400, rating: 4.7 },
    { id: 4, x: 27, y: 64, name: "Priya D.", service: "Tutor", price: 500, rating: 5.0 },
    { id: 5, x: 71, y: 51, name: "Bikram R.", service: "Painter", price: 320, rating: 4.6 },
  ];

  return (
    <Overlay>
      <div style={{ ...card, width: "min(760px,96vw)", overflow: "hidden" }}>
        <div style={{ background: T.grad2, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: T.font, fontWeight: 800, color: "white", fontSize: 16 }}>
            📍 Nearby Providers — Kathmandu
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "none",
              borderRadius: 8,
              width: 30,
              height: 30,
              color: "white",
              cursor: "pointer",
              fontSize: 16,
            }}>
            ✕
          </button>
        </div>

        <div style={{ display: "flex", height: 420 }}>
          <div style={{ flex: 1, position: "relative", background: "linear-gradient(160deg,#06060F,#0A0A22)" }}>
            <svg width="100%" height="100%">
              {[...Array(14)].map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0"
                  y1={`${(i + 1) * 7}%`}
                  x2="100%"
                  y2={`${(i + 1) * 7}%`}
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              ))}
              {[...Array(14)].map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={`${(i + 1) * 7}%`}
                  y1="0"
                  x2={`${(i + 1) * 7}%`}
                  y2="100%"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              ))}
              {[
                [18, 22, 26, 3],
                [44, 17, 21, 3],
                [64, 24, 19, 3],
                [14, 39, 23, 3],
                [49, 37, 19, 3],
                [71, 37, 17, 3],
                [24, 57, 21, 3],
                [54, 54, 23, 3],
              ].map(([x, y, w, h], i) => (
                <rect
                  key={i}
                  x={`${x}%`}
                  y={`${y}%`}
                  width={`${w}%`}
                  height={`${h}%`}
                  rx="3"
                  fill="#1A1A3A"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.5"
                />
              ))}
              {[
                [0, 34, 100, 1],
                [0, 64, 100, 1],
                [43, 0, 1, 100],
                [65, 0, 1, 100],
              ].map(([x, y, w, h], i) => (
                <rect key={i} x={`${x}%`} y={`${y}%`} width={`${w}%`} height={`${h}%`} fill="#111128" />
              ))}
              <circle cx="45%" cy="45%" r="20" fill="rgba(79,172,254,0.1)" />
              <circle cx="45%" cy="45%" r="11" fill="rgba(79,172,254,0.22)" />
              <circle cx="45%" cy="45%" r="6" fill="#4facfe" />
              {pins.map((pin) => (
                <g key={pin.id} onClick={() => setSel(sel?.id === pin.id ? null : pin)} style={{ cursor: "pointer" }}>
                  <circle
                    cx={`${pin.x}%`}
                    cy={`${pin.y}%`}
                    r="22"
                    fill={sel?.id === pin.id ? "rgba(255,107,53,0.22)" : "rgba(255,255,255,0.04)"}
                  />
                  <circle
                    cx={`${pin.x}%`}
                    cy={`${pin.y}%`}
                    r="14"
                    fill={sel?.id === pin.id ? "#FF6B35" : "#1E1E40"}
                    stroke={sel?.id === pin.id ? "#FF6B35" : "rgba(255,255,255,0.2)"}
                    strokeWidth="1.5"
                  />
                  <text
                    x={`${pin.x}%`}
                    y={`${pin.y + 0.6}%`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="9"
                    fontFamily={T.font}
                    fontWeight="700">
                    {pin.service.slice(0, 4)}
                  </text>
                </g>
              ))}
            </svg>
            {sel && (
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 12,
                  right: 12,
                  background: "rgba(15,15,35,0.97)",
                  border: "1px solid rgba(255,107,53,0.4)",
                  borderRadius: 14,
                  padding: "13px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <div>
                  <div style={{ fontFamily: T.font, fontWeight: 800, color: T.text, fontSize: 15 }}>
                    {sel.name}
                  </div>
                  <div style={{ fontFamily: T.font, color: T.muted, fontSize: 12 }}>
                    {sel.service} · ⭐ {sel.rating}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: T.font,
                      fontWeight: 900,
                      background: T.grad1,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: 16,
                    }}>
                    NPR {sel.price}/hr
                  </div>
                  <button
                    onClick={onClose}
                    style={{
                      marginTop: 5,
                      background: T.grad1,
                      border: "none",
                      borderRadius: 8,
                      padding: "4px 14px",
                      color: "white",
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: "pointer",
                      fontFamily: T.font,
                    }}>
                    Book Now
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ width: 200, borderLeft: "1px solid rgba(255,255,255,0.07)", overflowY: "auto" }}>
            <div
              style={{
                padding: "12px 14px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontFamily: T.font,
                fontSize: 12,
                color: T.muted,
                fontWeight: 700,
              }}>
              5 Providers Nearby
            </div>
            {pins.map((pin) => (
              <div
                key={pin.id}
                onClick={() => setSel(sel?.id === pin.id ? null : pin)}
                style={{
                  padding: "12px 14px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  background: sel?.id === pin.id ? "rgba(255,107,53,0.08)" : "transparent",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{ width: 8, height: 8, borderRadius: 4, background: T.orange, flexShrink: 0 }}
                  />
                  <div>
                    <div style={{ fontFamily: T.font, fontWeight: 700, color: T.text, fontSize: 12 }}>
                      {pin.name}
                    </div>
                    <div style={{ fontFamily: T.font, color: T.muted, fontSize: 11 }}>
                      {pin.service}
                    </div>
                    <div
                      style={{
                        fontFamily: T.font,
                        background: T.grad1,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: 11,
                        fontWeight: 800,
                      }}>
                      NPR {pin.price}/hr
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
}
