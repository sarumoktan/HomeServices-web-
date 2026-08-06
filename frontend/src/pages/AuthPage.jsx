import { T } from "../constants/theme";
import { card, btnP, btnG, inp } from "../constants/styles";
import { SERVICES } from "../constants/data";

export function AuthPage({ authTab, setAuthTab, userType, setUserType, onLogin }) {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 62px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: `radial-gradient(ellipse at 30% 30%,rgba(255,107,53,0.08) 0%,transparent 55%),radial-gradient(ellipse at 70% 70%,rgba(118,75,162,0.08) 0%,transparent 55%),${T.bg}`,
      }}>
      <div style={{ ...card, width: "min(420px,100%)", overflow: "hidden" }}>
        <div style={{ background: T.grad1, padding: "26px 24px 22px" }}>
          <div
            style={{
              fontFamily: T.font,
              fontWeight: 900,
              fontSize: 22,
              color: "white",
              marginBottom: 4,
            }}>
            {authTab === "login" ? "Welcome back 👋" : "Create account 🚀"}
          </div>
          <div style={{ fontFamily: T.font, color: "rgba(255,255,255,0.72)", fontSize: 14 }}>
            {authTab === "login"
              ? "Sign in to manage your bookings"
              : "Start booking or earning today"}
          </div>
        </div>

        <div style={{ display: "flex" }}>
          {[
            ["login", "Sign In"],
            ["register", "Register"],
          ].map(([t, l]) => (
            <button
              key={t}
              onClick={() => setAuthTab(t)}
              style={{
                flex: 1,
                background:
                  authTab === t ? "rgba(255,107,53,0.12)" : "transparent",
                border: "none",
                borderBottom: `2.5px solid ${
                  authTab === t ? T.orange : "transparent"
                }`,
                padding: "12px",
                color: authTab === t ? T.orange : T.muted,
                fontWeight: authTab === t ? 700 : 500,
                cursor: "pointer",
                fontSize: 13,
                fontFamily: T.font,
                transition: "all .2s",
              }}>
              {l}
            </button>
          ))}
        </div>

        <div style={{ padding: "22px 24px 24px" }}>
          {authTab === "login" ? (
            <>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                Email
              </div>
              <input type="email" placeholder="you@email.com" style={{ ...inp, marginBottom: 14 }} />
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                Password
              </div>
              <input type="password" placeholder="••••••••" style={{ ...inp, marginBottom: 20 }} />
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 10 }}>
                Sign in as:
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[
                  ["user", "👤 User"],
                  ["provider", "🛠️ Provider"],
                  ["admin", "⚙️ Admin"],
                ].map(([t, l]) => (
                  <button
                    key={t}
                    onClick={() => setUserType(t)}
                    style={{
                      flex: 1,
                      background:
                        userType === t
                          ? "rgba(255,107,53,0.15)"
                          : "rgba(255,255,255,0.04)",
                      border: `1px solid ${
                        userType === t ? T.orange : "rgba(255,255,255,0.1)"
                      }`,
                      borderRadius: 10,
                      padding: "8px 4px",
                      color: userType === t ? T.orange : T.muted,
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: T.font,
                      fontWeight: userType === t ? 700 : 400,
                    }}>
                    {l}
                  </button>
                ))}
              </div>
              <button onClick={() => onLogin(userType)} style={btnP}>
                Sign In →
              </button>
            </>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                    First Name
                  </div>
                  <input placeholder="Ram" style={inp} />
                </div>
                <div>
                  <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                    Last Name
                  </div>
                  <input placeholder="Sharma" style={inp} />
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                  Email
                </div>
                <input type="email" placeholder="you@email.com" style={inp} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                  Phone
                </div>
                <input placeholder="+977-98XXXXXXXX" style={inp} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                  Password
                </div>
                <input type="password" placeholder="••••••••" style={inp} />
              </div>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 10 }}>
                Register as:
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {[
                  ["user", "👤 Customer"],
                  ["provider", "🛠️ Provider"],
                ].map(([t, l]) => (
                  <button
                    key={t}
                    onClick={() => setUserType(t)}
                    style={{
                      flex: 1,
                      background: userType === t ? T.grad1 : "rgba(255,255,255,0.05)",
                      border: `1px solid ${
                        userType === t ? "transparent" : "rgba(255,255,255,0.1)"
                      }`,
                      borderRadius: 12,
                      padding: "10px",
                      color: "white",
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: T.font,
                      fontWeight: 700,
                    }}>
                    {l}
                  </button>
                ))}
              </div>
              {userType === "provider" && (
                <>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                      Service Type
                    </div>
                    <select style={{ ...inp, marginBottom: 0, appearance: "none" }}>
                      {SERVICES.map((sv) => (
                        <option key={sv.id}>{sv.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                      Hourly Rate (NPR)
                    </div>
                    <input type="number" placeholder="e.g. 350" style={inp} />
                  </div>
                </>
              )}
              <button onClick={() => onLogin(userType)} style={btnP}>
                Create Account →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
