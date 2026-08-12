import React, { useState, useEffect } from "react";
import { T } from "../constants/theme";
import { card, btnP, inp } from "../constants/styles";

export function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          name: parsedUser.name || parsedUser.fullName || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
          address: parsedUser.address || "",
        });
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
            {user.name ? user.name.charAt(0).toUpperCase() : "A"}
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
                {user.name || "Name not set"}
              </div>
              <div style={{ fontFamily: T.font, color: T.muted, fontSize: 13 }}>
                {user.email || "Email not set"} · {user.address || "Kathmandu, Nepal"} · Member since Jan 2025
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
          <div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>Full Name</div>
            <input name="name" value={user.name} onChange={handleChange} autoComplete="off" style={inp} />
          </div>
          <div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>Email</div>
            <input name="email" value={user.email} onChange={handleChange} autoComplete="off" style={inp} />
          </div>
          <div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>Phone</div>
            <input name="phone" value={user.phone} onChange={handleChange} autoComplete="off" style={inp} />
          </div>
          <div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>Address</div>
            <input name="address" value={user.address} onChange={handleChange} autoComplete="off" style={inp} />
          </div>
        </div>
        <button style={{ ...btnP, width: "auto", padding: "10px 28px", marginTop: 16 }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
