import { T } from "../constants/theme";
import { card, btnP, inp } from "../constants/styles";

export function ProfilePage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "36px 24px" }}>
      <div style={{ ...card, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ height: 120, background: T.grad2, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              bottom: -32,
              left: 24,
              width: 66,
              height: 66,
              borderRadius: 18,
              background: T.grad1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 25,
              color: "white",
              fontFamily: T.font,
              border: "3px solid #09090F",
              boxShadow: "0 6px 20px rgba(255,107,53,0.4)",
            }}>
            A
          </div>
        </div>
        <div style={{ padding: "48px 24px 24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 20,
            }}>
            <div>
              <div style={{ fontFamily: T.font, fontWeight: 900, fontSize: 20, color: T.text }}>
                Arjun Shrestha
              </div>
              <div style={{ fontFamily: T.font, color: T.muted, fontSize: 13 }}>
                arjun@email.com · Kathmandu, Nepal · Member since Jan 2025
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(56,239,125,0.1)",
                border: "1px solid rgba(56,239,125,0.2)",
                borderRadius: 10,
                padding: "5px 14px",
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
                Active
              </span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 12 }}>
            {[
              ["12", "Total Bookings", T.orange],
              ["8", "Completed", T.success],
              ["3", "Upcoming", T.blue],
              ["4.8★", "Avg Rating", T.warning],
            ].map(([v, l, c]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px", textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: T.font,
                    fontWeight: 900,
                    fontSize: 20,
                    background: `linear-gradient(90deg,${c},${c}BB)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  {v}
                </div>
                <div style={{ fontFamily: T.font, color: T.muted, fontSize: 11, marginTop: 3 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ ...card, padding: 24 }}>
        <div
          style={{
            fontFamily: T.font,
            fontWeight: 800,
            fontSize: 16,
            color: T.text,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
          <span style={{ width: 3, height: 18, background: T.grad1, borderRadius: 2, display: "block" }} />
          Edit Profile
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            ["Full Name", "Arjun Shrestha"],
            ["Email", "arjun@email.com"],
            ["Phone", "+977-9812345678"],
            ["Address", "Thamel, Kathmandu"],
          ].map(([l, v]) => (
            <div key={l}>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                {l}
              </div>
              <input defaultValue={v} style={inp} />
            </div>
          ))}
        </div>
        <button style={{ ...btnP, width: "auto", padding: "10px 28px", marginTop: 16 }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
