import { useState } from "react";
import { T } from "../constants/theme";
import { card, btnP, inp } from "../constants/styles";
import { SERVICES } from "../constants/data";

// Main Authentication Component handling both Login and Registration views
export function AuthPage({ authTab, setAuthTab, userType, setUserType, onLogin }) {
  // Form state hooks to capture and manage input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState(SERVICES?.[0]?.name || "");
  const [hourlyRate, setHourlyRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // BACKEND API HANDLER
  const handleAuthSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    const isLogin = authTab === "login";
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    const payload = isLogin
      ? { email, password, role: userType }
      : {
          firstName,
          lastName,
          email,
          phone,
          password,
          role: userType,
          serviceType: userType === "provider" ? serviceType : undefined,
          hourlyRate: userType === "provider" ? Number(hourlyRate) : undefined,
        };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed. Please try again.");
      }

      setLoading(false);

      if (isLogin) {
        // Trigger homepage view in App.jsx
        onLogin(userType, data);
      } else {
        setSuccessMsg(data.message || "Registration successful! You can now log in.");
        setAuthTab("login"); // Switch to login tab after success
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || "Network connection error.");
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 62px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: `radial-gradient(ellipse at 30% 30%,rgba(255,107,53,0.08) 0%,transparent 55%),radial-gradient(ellipse at 70% 70%,rgba(118,75,162,0.08) 0%,transparent 55%),${T.bg}`,
      }}
    >
      <div style={{ ...card, width: "min(420px,100%)", overflow: "hidden" }}>
        {/* Header section */}
        <div style={{ background: T.grad1, padding: "26px 24px 22px" }}>
          <div
            style={{
              fontFamily: T.font,
              fontWeight: 900,
              fontSize: 22,
              color: "white",
              marginBottom: 4,
            }}
          >
            {authTab === "login" ? "Welcome back 👋" : "Create account 🚀"}
          </div>
          <div style={{ fontFamily: T.font, color: "rgba(255,255,255,0.72)", fontSize: 14 }}>
            {authTab === "login"
              ? "Sign in to manage your bookings"
              : "Start booking or earning today"}
          </div>
        </div>

        {/* Navigation tab switchers */}
        <div style={{ display: "flex" }}>
          {[
            ["login", "Sign In"],
            ["register", "Register"],
          ].map(([t, l]) => (
            <button
              key={t}
              onClick={() => {
                setAuthTab(t);
                setErrorMsg("");
                setSuccessMsg("");
              }}
              style={{
                flex: 1,
                background: authTab === t ? "rgba(255,107,53,0.12)" : "transparent",
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
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Alert Banners */}
        {errorMsg && (
          <div style={{ margin: "16px 24px 0", padding: "10px 12px", background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.3)", borderRadius: 8, color: "#ff6b6b", fontSize: 12, fontFamily: T.font }}>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ margin: "16px 24px 0", padding: "10px 12px", background: "rgba(46, 204, 113, 0.15)", border: "1px solid rgba(46, 204, 113, 0.4)", borderRadius: 8, color: "#2ecc71", fontSize: 12, fontFamily: T.font }}>
            {successMsg}
          </div>
        )}

        {/* Form Body */}
        <div style={{ padding: "22px 24px 24px" }}>
          {authTab === "login" ? (
            /* ================= LOGIN FORM ================= */
            <form onSubmit={handleAuthSubmit}>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                Email
              </div>
              <input
                type="email"
                required
                placeholder="saru@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ ...inp, marginBottom: 14 }}
              />

              <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                Password
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inp, marginBottom: 20 }}
              />

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
                    type="button"
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
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <button type="submit" disabled={loading} style={{ ...btnP, opacity: loading ? 0.7 : 1 }}>
                {loading ? "Signing In..." : "Sign In →"}
              </button>
            </form>
          ) : (
            /* ================= REGISTRATION FORM ================= */
            <form onSubmit={handleAuthSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                    First Name
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Saru"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={inp}
                  />
                </div>
                <div>
                  <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                    Last Name
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Moktan"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={inp}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                  Email
                </div>
                <input
                  type="email"
                  required
                  placeholder="saru@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inp}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                  Phone
                </div>
                <input
                  type="text"
                  required
                  placeholder="+977-98XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inp}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                  Password
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inp}
                />
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
                    type="button"
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
                    }}
                  >
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
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      style={{ ...inp, marginBottom: 0, appearance: "none" }}
                    >
                      {SERVICES.map((sv) => (
                        <option key={sv.id} value={sv.name}>
                          {sv.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                      Hourly Rate (NPR)
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 350"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      style={inp}
                    />
                  </div>
                </>
              )}

              <button type="submit" disabled={loading} style={{ ...btnP, opacity: loading ? 0.7 : 1 }}>
                {loading ? "Creating Account..." : "Create Account →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
