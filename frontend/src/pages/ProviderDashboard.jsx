import { T } from "../constants/theme";
import { card, btnP, inp } from "../constants/styles";
import { Avatar } from "../components/Avatar";
import { BOOKINGS, STATUSES } from "../constants/data";

export function ProviderDashboard({ setShowChat, provTab, setProvTab }) {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 28,
          flexWrap: "wrap",
        }}>
        <Avatar initials="RK" gradient="orange" size={52} />
        <div>
          <div style={{ fontFamily: T.font, fontWeight: 900, fontSize: 20, color: T.text }}>
            Rajesh Kumar
          </div>
          <div style={{ fontFamily: T.font, color: T.muted, fontSize: 13 }}>
            Plumbing Provider · Kathmandu Valley
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(56,239,125,0.1)",
            border: "1px solid rgba(56,239,125,0.25)",
            borderRadius: 10,
            padding: "7px 14px",
          }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: 4,
              background: T.success,
              boxShadow: `0 0 8px ${T.success}`,
            }}
          />
          <span style={{ fontFamily: T.font, fontSize: 12, color: T.success, fontWeight: 700 }}>
            Available for Jobs
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 12,
          marginBottom: 28,
        }}>
        {[
          ["NPR 18,400", "linear-gradient(135deg,#11998E,#38EF7D)", "This Month"],
          ["24", T.grad1, "Total Jobs"],
          ["4.8 ⭐", T.grad2, "Rating"],
          ["3", T.grad5, "Pending"],
        ].map(([v, g, l]) => (
          <div key={l} style={{ ...card, padding: "18px 16px" }}>
            <div
              style={{
                fontFamily: T.font,
                fontWeight: 900,
                fontSize: 22,
                background: g,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 4,
              }}>
              {v}
            </div>
            <div style={{ fontFamily: T.font, color: T.muted, fontSize: 12 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          ["jobs", "📋 Jobs"],
          ["profile", "👤 Profile"],
          ["earnings", "💰 Earnings"],
        ].map(([t, l]) => (
          <button
            key={t}
            onClick={() => setProvTab(t)}
            style={{
              background: provTab === t ? T.grad1 : "rgba(255,255,255,0.06)",
              border: `1px solid ${provTab === t ? "transparent" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 10,
              padding: "8px 20px",
              color: provTab === t ? "white" : T.muted,
              fontWeight: provTab === t ? 700 : 400,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: T.font,
            }}>
            {l}
          </button>
        ))}
      </div>

      {provTab === "jobs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[...BOOKINGS].map((b) => {
            const st = STATUSES[b.status] || STATUSES.pending;
            return (
              <div
                key={b.id}
                style={{
                  ...card,
                  padding: "15px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 5,
                    }}>
                    <span style={{ fontFamily: T.font, fontWeight: 700, color: T.text, fontSize: 14 }}>
                      {b.service}
                    </span>
                    <span
                      style={{
                        background: st.bg,
                        color: st.color,
                        fontFamily: T.font,
                        fontSize: 11,
                        fontWeight: 700,
                        borderRadius: 6,
                        padding: "2px 10px",
                      }}>
                      {st.label}
                    </span>
                  </div>
                  <div style={{ fontFamily: T.font, color: T.dim, fontSize: 12 }}>
                    📅 {b.date} · {b.time} · 📍 {b.address}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      fontFamily: T.font,
                      fontWeight: 900,
                      background: T.grad1,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: 15,
                    }}>
                    NPR {b.amount}
                  </span>
                  {b.status === "confirmed" && (
                    <button
                      onClick={() => setShowChat(true)}
                      style={{
                        background: "rgba(79,172,254,0.1)",
                        border: "1px solid rgba(79,172,254,0.25)",
                        borderRadius: 8,
                        padding: "5px 14px",
                        color: T.blue,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: T.font,
                      }}>
                      💬 Chat
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {provTab === "profile" && (
        <div style={{ ...card, padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              ["Display Name", "Rajesh Kumar"],
              ["Service", "Plumbing"],
              ["Rate (NPR/hr)", "350"],
              ["Phone", "+977-9841234567"],
              ["Service Area", "Kathmandu Valley"],
              ["Hours", "Mon–Sat 8AM–6PM"],
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                  {l}
                </div>
                <input defaultValue={v} style={inp} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
              About Me
            </div>
            <textarea
              rows={3}
              defaultValue="10+ years of plumbing experience. Licensed and insured."
              style={{ ...inp, resize: "none" }}
            />
          </div>
          <button style={{ ...btnP, width: "auto", padding: "10px 28px", marginTop: 14 }}>
            Save Profile
          </button>
        </div>
      )}

      {provTab === "earnings" && (
        <div style={{ ...card, padding: 24 }}>
          {[
            ["Apr 2025", 18400, 24, "#38EF7D"],
            ["Mar 2025", 22750, 31, "#4facfe"],
            ["Feb 2025", 14200, 18, "#F093FB"],
            ["Jan 2025", 19900, 27, "#FFD23F"],
          ].map(([m, a, j, c]) => (
            <div
              key={m}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "13px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
              <div style={{ width: 3, height: 38, background: c, borderRadius: 2, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.font, fontWeight: 600, color: T.text, fontSize: 14 }}>
                  {m}
                </div>
                <div style={{ fontFamily: T.font, color: T.muted, fontSize: 12 }}>
                  {j} jobs completed
                </div>
              </div>
              <div style={{ fontFamily: T.font, fontWeight: 900, fontSize: 16, color: c }}>
                NPR {a.toLocaleString()}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, marginTop: 4 }}>
            <span style={{ fontFamily: T.font, fontWeight: 700, color: T.text, fontSize: 15 }}>
              Total Earned
            </span>
            <span
              style={{
                fontFamily: T.font,
                fontWeight: 900,
                fontSize: 20,
                background: T.grad1,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              NPR 75,250
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
