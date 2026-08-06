import { T } from "../constants/theme";
import { card, btnP } from "../constants/styles";
import { BOOKINGS, SERVICES, STATUSES } from "../constants/data";

export function BookingsPage({ setShowChat, setShowMap, setReview, setBooking, PROVIDERS }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "36px 24px" }}>
      <h2
        style={{
          fontFamily: T.font,
          fontWeight: 800,
          fontSize: 24,
          color: T.text,
          marginBottom: 24,
        }}>
        My Bookings
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {BOOKINGS.map((b) => {
          const st = STATUSES[b.status];
          const svc = SERVICES.find((s) => s.name === b.service);
          return (
            <div
              key={b.id}
              style={{ ...card, padding: 0, overflow: "hidden", transition: "border-color .2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,53,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}>
              <div style={{ height: 3, background: svc?.grad || T.grad1 }} />
              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontFamily: T.font, fontWeight: 800, color: T.text, fontSize: 16 }}>
                        {b.service}
                      </span>
                      <span
                        style={{
                          background: st.bg,
                          color: st.color,
                          fontFamily: T.font,
                          fontSize: 11,
                          fontWeight: 700,
                          borderRadius: 8,
                          padding: "3px 11px",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}>
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: 3,
                            background: st.dot,
                            display: "block",
                            boxShadow: `0 0 5px ${st.dot}`,
                          }}
                        />
                        {st.label}
                      </span>
                    </div>
                    <div style={{ fontFamily: T.font, color: T.muted, fontSize: 13, marginBottom: 4 }}>
                      Provider: <span style={{ color: T.text, fontWeight: 600 }}>{b.provider}</span>
                    </div>
                    <div style={{ fontFamily: T.font, color: T.dim, fontSize: 12 }}>
                      📅 {b.date} · {b.time} · 📍 {b.address}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: T.font,
                        fontWeight: 900,
                        fontSize: 19,
                        background: T.grad1,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}>
                      NPR {b.amount}
                    </div>
                    <div style={{ fontFamily: T.font, color: T.dim, fontSize: 11, marginTop: 2 }}>
                      {b.id}
                    </div>
                  </div>
                </div>

                {b.status === "completed" && (
                  <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      onClick={() => setReview(b.provider)}
                      style={{
                        background: "rgba(255,210,63,0.1)",
                        border: "1px solid rgba(255,210,63,0.25)",
                        borderRadius: 10,
                        padding: "7px 16px",
                        color: T.warning,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: T.font,
                        fontWeight: 700,
                      }}>
                      ⭐ Rate & Review
                    </button>
                    <button
                      onClick={() => setBooking(PROVIDERS.find((p) => p.name === b.provider) || PROVIDERS[0])}
                      style={{
                        background: "rgba(255,107,53,0.1)",
                        border: "1px solid rgba(255,107,53,0.25)",
                        borderRadius: 10,
                        padding: "7px 16px",
                        color: T.orange,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: T.font,
                        fontWeight: 700,
                      }}>
                      🔄 Book Again
                    </button>
                  </div>
                )}
                {b.status === "confirmed" && (
                  <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      onClick={() => setShowChat(true)}
                      style={{
                        background: "rgba(79,172,254,0.1)",
                        border: "1px solid rgba(79,172,254,0.25)",
                        borderRadius: 10,
                        padding: "7px 16px",
                        color: T.blue,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: T.font,
                        fontWeight: 700,
                      }}>
                      💬 Chat with Provider
                    </button>
                    <button
                      onClick={() => setShowMap(true)}
                      style={{
                        background: "rgba(56,239,125,0.1)",
                        border: "1px solid rgba(56,239,125,0.25)",
                        borderRadius: 10,
                        padding: "7px 16px",
                        color: T.success,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: T.font,
                        fontWeight: 700,
                      }}>
                      📍 Track Live
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
