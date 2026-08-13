import { T } from "../constants/theme";
import { SERVICES, PROVIDERS } from "../constants/data";
import { Avatar } from "../components/Avatar";
import { StarRow } from "../components/StarRow";

export function ServicesPage({
  filter,
  setFilter,
  search,
  setSearch,
  setShowChat,
  setBooking,
  loggedIn,
  onNavigate,
  setShowMap,
}) {
  const colors = {
    pageBg: "#F7F6F2",
    surface: "#FFFFFF",
    border: "rgba(23,24,26,0.12)",
    text: "#17181A",
    muted: "#5C6370",
    dim: "#6B7280",
    inputBg: "#FFFFFF",
    inputBorder: "rgba(23,24,26,0.12)",
    accent: "linear-gradient(135deg,#FF6B35 0%,#F7931E 40%,#FFD23F 100%)",
    shadow: "0 28px 80px rgba(15,23,42,0.08)",
  };

  const filtered = PROVIDERS.filter(
    (p) =>
      (filter === "All" || p.service === filter) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.service.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: colors.pageBg,
        padding: "42px 24px 52px",
      }}>
      <div
        style={{
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          borderRadius: 32,
          boxShadow: colors.shadow,
          background: colors.surface,
          padding: 24,
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 12,
          }}>
          <h2
            style={{
              fontFamily: T.font,
              fontWeight: 800,
              fontSize: 28,
              color: colors.text,
              margin: 0,
            }}>
            Find a Provider
          </h2>
          <button
            onClick={() => setShowMap(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: colors.accent,
              border: "none",
              borderRadius: 18,
              padding: "12px 18px",
              color: "#fff",
              fontFamily: T.font,
              fontWeight: 700,
              cursor: "pointer",
              transition: "transform .2s",
            }}>
            📍 Map View
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <input
            placeholder="🔍 Search providers or services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "1 1 220px",
              width: "auto",
              marginBottom: 0,
              background: colors.inputBg,
              border: `1px solid ${colors.inputBorder}`,
              borderRadius: 16,
              padding: "14px 16px",
              color: colors.text,
              fontSize: 14,
              fontFamily: T.font,
              outline: "none",
              boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {["All", ...SERVICES.map((s) => s.name)].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? T.grad1 : "rgba(255,255,255,0.05)",
                border: `1px solid ${filter === f ? "transparent" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 22,
                padding: "7px 16px",
                color: filter === f ? "white" : T.muted,
                fontSize: 12,
                cursor: "pointer",
                fontWeight: filter === f ? 700 : 400,
                fontFamily: T.font,
                transition: "all .2s",
              }}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ fontFamily: T.font, color: colors.muted, fontSize: 13, marginBottom: 18 }}>
          {filtered.length} providers found
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 16 }}>
          {filtered.map((p) => {
            const svc = SERVICES.find((s) => s.name === p.service);
            return (
              <div
                key={p.id}
                style={{
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 28,
                  padding: 0,
                  overflow: "hidden",
                  transition: "all .2s",
                  boxShadow: "0 20px 50px rgba(15,23,42,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div style={{ height: 4, background: svc?.grad || colors.accent }} />
                <div style={{ padding: 22 }}>
                  <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                    <Avatar initials={p.initials} gradient={p.grad} size={52} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontFamily: T.font,
                            fontWeight: 800,
                            color: colors.text,
                            fontSize: 15,
                          }}>
                          {p.name}
                        </span>
                        {p.verified && <span style={{ fontSize: 12 }}>✅</span>}
                      </div>
                      <div
                        style={{
                          fontFamily: T.font,
                          color: colors.muted,
                          fontSize: 12,
                          margin: "4px 0",
                        }}>
                        {p.service} · 📍 {p.distance}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <StarRow rating={p.rating} />
                        <span style={{ fontFamily: T.font, fontSize: 12, color: colors.muted }}>
                          {p.rating} · {p.reviews} reviews
                        </span>
                      </div>
                    </div>
                    <div style={{ minWidth: 110 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          background: p.available
                            ? "rgba(56,239,125,0.12)"
                            : "rgba(23,24,26,0.06)",
                          borderRadius: 10,
                          padding: "5px 11px",
                          marginBottom: 6,
                        }}>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            background: p.available ? "#16A34A" : "#9CA3AF",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: T.font,
                            fontSize: 11,
                            color: p.available ? "#16A34A" : "#6B7280",
                            fontWeight: 700,
                          }}>
                          {p.available ? "Available" : "Busy"}
                        </span>
                      </div>
                      <div style={{ fontFamily: T.font, color: colors.dim, fontSize: 11, textAlign: "center" }}>
                        {p.jobs}+ jobs
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                      marginBottom: 18,
                    }}>
                    <div>
                      <span
                        style={{
                          fontFamily: T.font,
                          fontWeight: 900,
                          fontSize: 20,
                          background: colors.accent,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}>
                        NPR {p.price}
                      </span>
                      <span style={{ fontFamily: T.font, color: colors.dim, fontSize: 12, marginLeft: 6 }}>
                        /hr
                      </span>
                    </div>
                    <span style={{ fontFamily: T.font, fontSize: 12, color: colors.dim, fontStyle: "italic", flex: "1 1 140px" }}>
                      "{p.bio}"
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                      onClick={() => setShowChat(true)}
                      style={{
                        flex: 1,
                        padding: "12px 14px",
                        fontSize: 14,
                        background: "#F3F3F5",
                        border: `1px solid ${colors.border}`,
                        borderRadius: 16,
                        color: colors.text,
                        cursor: "pointer",
                        fontFamily: T.font,
                        fontWeight: 700,
                      }}>
                      💬 Chat
                    </button>
                    <button
                      onClick={() => (loggedIn ? setBooking(p) : onNavigate("auth"))}
                      style={{
                        flex: 3,
                        width: "auto",
                        background: p.available ? colors.accent : "#E5E7EB",
                        color: p.available ? "#fff" : colors.muted,
                        cursor: p.available ? "pointer" : "not-allowed",
                        border: "none",
                        borderRadius: 16,
                        padding: "12px 14px",
                        fontFamily: T.font,
                        fontWeight: 700,
                        fontSize: 14,
                      }}>
                      {p.available ? "Book Now →" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
