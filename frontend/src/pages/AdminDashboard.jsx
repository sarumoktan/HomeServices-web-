import { T } from "../constants/theme";
import { card } from "../constants/styles";
import { SERVICES, PROVIDERS, BOOKINGS, STATUSES } from "../constants/data";
import { SvcIcon } from "../components/SvcIcon";
import { Avatar } from "../components/Avatar";

export function AdminDashboard({ adminTab, setAdminTab, pending, setPending }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 13,
            background: T.grad2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}>
          ⚙️
        </div>
        <div>
          <div style={{ fontFamily: T.font, fontWeight: 900, fontSize: 20, color: T.text }}>
            Admin Dashboard
          </div>
          <div style={{ fontFamily: T.font, color: T.muted, fontSize: 13 }}>
            ServiHub Operations · Kathmandu
          </div> 
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 14,
          marginBottom: 28,
        }}>
        {[
          ["12,483", T.grad1, "Total Users", "👥", "+8.2%"],
          ["1,247", T.grad2, "Providers", "🛠️", "+3.1%"],
          ["348", T.grad3, "Bookings Today", "📋", "+12.5%"],
          ["4,82,900", T.grad4, "Revenue NPR", "💰", "+5.8%"],
        ].map(([v, g, l, icon, chg]) => (
          <div key={l} style={{ ...card, padding: 18, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -16, right: -16, fontSize: 50, opacity: 0.07 }}>
              {icon}
            </div>
            <div style={{ fontFamily: T.font, color: T.muted, fontSize: 12, marginBottom: 8 }}>
              {l}
            </div>
            <div
              style={{
                fontFamily: T.font,
                fontWeight: 900,
                fontSize: 22,
                background: g,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 6,
              }}>
              {v}
            </div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.success, fontWeight: 700 }}>
              {chg} this week
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          ["overview", "📊 Overview"],
          ["users", "👥 Users"],
          ["providers", "🛠️ Providers"],
          ["bookings", "📋 Bookings"],
        ].map(([t, l]) => (
          <button
            key={t}
            onClick={() => setAdminTab(t)}
            style={{
              background: adminTab === t ? T.grad1 : "rgba(255,255,255,0.06)",
              border: `1px solid ${adminTab === t ? "transparent" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 10,
              padding: "8px 18px",
              color: adminTab === t ? "white" : T.muted,
              fontWeight: adminTab === t ? 700 : 400,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: T.font,
            }}>
            {l}
          </button>
        ))}
      </div>

      {adminTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ ...card, padding: 22 }}>
            <div
              style={{
                fontFamily: T.font,
                fontWeight: 700,
                color: T.text,
                fontSize: 15,
                marginBottom: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
              <span style={{ width: 3, height: 16, background: T.grad1, borderRadius: 2, display: "block" }} />
              Service Distribution
            </div>
            {SERVICES.map((sv) => (
              <div key={sv.id} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <SvcIcon type={sv.name} size={18} />
                    <span style={{ fontFamily: T.font, fontSize: 12, color: T.text, fontWeight: 600 }}>
                      {sv.name}
                    </span>
                  </div>
                  <span style={{ fontFamily: T.font, fontSize: 12, color: T.muted }}>
                    {sv.count}
                  </span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                  <div
                    style={{
                      height: 5,
                      borderRadius: 3,
                      background: sv.grad,
                      width: `${(sv.count / 215) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ ...card, padding: 22 }}>
            <div
              style={{
                fontFamily: T.font,
                fontWeight: 700,
                color: T.text,
                fontSize: 15,
                marginBottom: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
              <span style={{ width: 3, height: 16, background: T.grad5, borderRadius: 2, display: "block" }} />
              Pending Approvals
              {pending.length > 0 && (
                <span
                  style={{
                    background: "rgba(252,70,107,0.15)",
                    color: T.danger,
                    fontFamily: T.font,
                    fontSize: 11,
                    fontWeight: 800,
                    borderRadius: 8,
                    padding: "2px 9px",
                  }}>
                  {pending.length}
                </span>
              )}
            </div>
            {pending.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 12,
                  padding: "13px 14px",
                  marginBottom: 10,
                }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8,
                  }}>
                  <div>
                    <div style={{ fontFamily: T.font, fontWeight: 700, color: T.text, fontSize: 13 }}>
                      {p.name}
                    </div>
                    <div style={{ fontFamily: T.font, color: T.muted, fontSize: 11 }}>
                      {p.service} · Joined {p.joined}
                    </div>
                    {!p.docs && (
                      <span
                        style={{
                          background: "rgba(255,210,63,0.12)",
                          color: T.warning,
                          fontFamily: T.font,
                          fontSize: 10,
                          fontWeight: 700,
                          borderRadius: 6,
                          padding: "2px 8px",
                          marginTop: 4,
                          display: "inline-block",
                        }}>
                        ⚠ Docs Missing
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => setPending((prev) => prev.filter((x) => x.id !== p.id))}
                      style={{
                        background: "linear-gradient(135deg,#11998E,#38EF7D)",
                        border: "none",
                        borderRadius: 8,
                        padding: "5px 12px",
                        color: "#0A1A0A",
                        fontSize: 12,
                        cursor: "pointer",
                        fontWeight: 800,
                        fontFamily: T.font,
                      }}>
                      ✓
                    </button>
                    <button
                      onClick={() => setPending((prev) => prev.filter((x) => x.id !== p.id))}
                      style={{
                        background: "rgba(252,70,107,0.12)",
                        border: "1px solid rgba(252,70,107,0.25)",
                        borderRadius: 8,
                        padding: "5px 12px",
                        color: T.danger,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: T.font,
                      }}>
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {pending.length === 0 && (
              <div
                style={{
                  fontFamily: T.font,
                  color: T.muted,
                  fontSize: 13,
                  textAlign: "center",
                  padding: "20px 0",
                }}>
                ✅ All providers reviewed
              </div>
            )}
          </div>
        </div>
      )}

      {adminTab === "providers" && (
        <div style={{ ...card, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.font }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                  {["Provider", "Service", "Rating", "Jobs", "Status", "Action"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        color: T.muted,
                        fontSize: 12,
                        fontWeight: 600,
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                      }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROVIDERS.map((p) => (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar initials={p.initials} gradient={p.grad} size={32} />
                        <span
                          style={{
                            fontFamily: T.font,
                            fontWeight: 600,
                            color: T.text,
                            fontSize: 13,
                          }}>
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", color: T.muted, fontSize: 12 }}>
                      {p.service}
                    </td>
                    <td style={{ padding: "12px 16px", color: T.warning, fontWeight: 700, fontSize: 13 }}>
                      ⭐ {p.rating}
                    </td>
                    <td style={{ padding: "12px 16px", color: T.text, fontSize: 13 }}>
                      {p.jobs}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          background: p.verified
                            ? "rgba(56,239,125,0.1)"
                            : "rgba(255,210,63,0.1)",
                          color: p.verified ? T.success : T.warning,
                          fontSize: 11,
                          fontWeight: 700,
                          borderRadius: 8,
                          padding: "3px 10px",
                        }}>
                        {p.verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "none",
                          borderRadius: 7,
                          padding: "4px 12px",
                          color: T.text,
                          fontSize: 11,
                          cursor: "pointer",
                          fontFamily: T.font,
                        }}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {adminTab === "bookings" && (
        <div style={{ ...card, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.font }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                  {["ID", "Service", "Provider", "Date", "Amount", "Status"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        color: T.muted,
                        fontSize: 12,
                        fontWeight: 600,
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                      }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BOOKINGS.map((b) => {
                  const st = STATUSES[b.status];
                  return (
                    <tr
                      key={b.id}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}>
                      <td
                        style={{
                          padding: "12px 16px",
                          color: T.orange,
                          fontWeight: 700,
                          fontSize: 12,
                          fontFamily: T.font,
                        }}>
                        {b.id}
                      </td>
                      <td style={{ padding: "12px 16px", color: T.text, fontSize: 13, fontFamily: T.font }}>
                        {b.service}
                      </td>
                      <td style={{ padding: "12px 16px", color: T.muted, fontSize: 12, fontFamily: T.font }}>
                        {b.provider}
                      </td>
                      <td style={{ padding: "12px 16px", color: T.muted, fontSize: 12, fontFamily: T.font }}>
                        {b.date}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontFamily: T.font,
                          fontWeight: 900,
                          background: T.grad1,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontSize: 13,
                        }}>
                        NPR {b.amount}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            background: st.bg,
                            color: st.color,
                            fontFamily: T.font,
                            fontSize: 11,
                            fontWeight: 700,
                            borderRadius: 8,
                            padding: "3px 10px",
                          }}>
                          {st.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
