export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 520, height: "auto" }}>
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#764BA2" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#764BA2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38EF7D" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#38EF7D" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="260" cy="200" r="185" fill="url(#g1)" />
      <circle cx="90" cy="90" r="130" fill="url(#g2)" />
      <circle cx="420" cy="300" r="100" fill="url(#g3)" />

      {/* City skyline */}
      {[
        [30, 270, 30, 80, 3],
        [70, 250, 45, 100, 3],
        [125, 235, 55, 115, 4],
        [190, 258, 38, 92, 3],
        [240, 245, 50, 105, 3],
        [302, 262, 34, 88, 3],
        [348, 240, 48, 110, 3],
        [408, 255, 36, 95, 3],
        [456, 268, 44, 82, 3],
      ].map(([x, y, w, h, r], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={w}
          height={h}
          rx={r}
          fill={
            [
              "#1A1A35",
              "#1E1E3F",
              "#1A1A3A",
              "#16163A",
              "#1A1835",
              "#141430",
              "#18183A",
              "#141432",
              "#12122E",
            ][i]
          }
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
        />
      ))}

      {/* Window grids */}
      {[
        [36, 258, 5, 4, 3, 4, 5, 3, "#FFD23F", 0.7],
        [74, 258, 8, 7, 5, 5, 8, 12, "#4facfe", 0.5],
        [130, 243, 10, 8, 6, 3, 16, 14, "#FF6B35", 0.6],
        [194, 264, 12, 10, 4, 4, 12, 16, "#38EF7D", 0.5],
        [244, 252, 9, 8, 6, 3, 14, 14, "#F093FB", 0.5],
        [352, 248, 9, 8, 6, 5, 13, 14, "#FFD23F", 0.5],
      ].map(([x, y, w, h, cols, rows, sx, sy, c, o], gi) =>
        Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, col) => (
            <rect
              key={`${gi}-${r}-${col}`}
              x={x + col * sx}
              y={y + r * sy}
              width={w}
              height={h}
              rx="1"
              fill={c}
              opacity={Math.random() > 0.35 ? o : 0.1}
            />
          ))
        )
      )}

      <rect x="0" y="348" width="520" height="52" fill="#0A0A20" />
      <rect x="0" y="345" width="520" height="6" fill="#1A1A40" />

      {/* Floating cards */}
      <g transform="translate(18,72)">
        <rect width="118" height="60" rx="14" fill="#1E1E40" stroke="rgba(255,107,53,0.45)" strokeWidth="1.2" />
        <rect x="10" y="10" width="24" height="24" rx="8" fill="#FF6B35" />
        <text x="14" y="27" fontSize="13" fill="white">
          🔧
        </text>
        <rect x="42" y="13" width="56" height="7" rx="3" fill="#FF6B35" opacity="0.75" />
        <rect x="42" y="25" width="38" height="5" rx="2" fill="#55556A" />
        <rect x="42" y="34" width="48" height="5" rx="2" fill="#55556A" />
        <rect x="10" y="44" width="97" height="7" rx="3" fill="rgba(255,107,53,0.18)" />
      </g>

      <g transform="translate(376,52)">
        <rect width="118" height="60" rx="14" fill="#1E1E40" stroke="rgba(79,172,254,0.45)" strokeWidth="1.2" />
        <rect x="10" y="10" width="24" height="24" rx="8" fill="#4facfe" />
        <text x="13" y="27" fontSize="13" fill="white">
          ⚡
        </text>
        <rect x="42" y="13" width="56" height="7" rx="3" fill="#4facfe" opacity="0.75" />
        <rect x="42" y="25" width="38" height="5" rx="2" fill="#55556A" />
        <rect x="42" y="34" width="48" height="5" rx="2" fill="#55556A" />
        <rect x="10" y="44" width="97" height="7" rx="3" fill="rgba(79,172,254,0.15)" />
      </g>

      <g transform="translate(195,28)">
        <rect width="130" height="66" rx="16" fill="#1E1E40" stroke="rgba(56,239,125,0.45)" strokeWidth="1.2" />
        <circle cx="26" cy="24" r="16" fill="#11998E" />
        <text x="18" y="30" fontSize="15" fill="white">
          🧹
        </text>
        <rect x="50" y="12" width="60" height="8" rx="3" fill="#38EF7D" opacity="0.8" />
        <rect x="50" y="26" width="42" height="5" rx="2" fill="#55556A" />
        <rect x="50" y="36" width="54" height="5" rx="2" fill="#55556A" />
        <rect x="12" y="48" width="105" height="8" rx="3" fill="rgba(56,239,125,0.18)" />
      </g>

      {/* Rating badge */}
      <g transform="translate(420,160)">
        <rect width="90" height="38" rx="19" fill="#FFD23F" />
        <text x="14" y="25" fontSize="14" fill="#412402" fontWeight="bold">
          ⭐ 4.9
        </text>
      </g>

      {/* Live dot */}
      <g transform="translate(65,185)">
        <circle cx="18" cy="18" r="18" fill="rgba(252,70,107,0.12)" />
        <circle cx="18" cy="18" r="11" fill="rgba(252,70,107,0.22)" />
        <circle cx="18" cy="18" r="5" fill="#FC466B" />
        <rect x="38" y="7" width="76" height="22" rx="11" fill="#1E1E40" stroke="rgba(252,70,107,0.4)" strokeWidth="1" />
        <text x="48" y="22" fontSize="10" fill="#FC466B" fontWeight="bold">
          ● Live Track
        </text>
      </g>

      {/* NPR badge */}
      <g transform="translate(305,140)">
        <rect width="100" height="36" rx="10" fill="rgba(118,75,162,0.35)" stroke="rgba(118,75,162,0.6)" strokeWidth="1" />
        <text x="14" y="24" fontSize="13" fill="#F093FB" fontWeight="bold">
          NPR 350/hr
        </text>
      </g>
    </svg>
  );
}
