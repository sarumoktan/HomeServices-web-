import React, { useState, useEffect } from "react";
import { T } from "../constants/theme";
import { card, btnP, inp } from "../constants/styles";

export function ProfilePage({ user: propUser }) {
  // State to hold profile user information fields
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // useEffect runs when the component loads to fetch user profile from backend API or props
  useEffect(() => {
    // If parent provided user (after login), use it immediately
    if (propUser) {
      const name = (propUser.firstName || propUser.name || '') + (propUser.lastName ? ` ${propUser.lastName}` : '');
      setUser({
        name: name.trim() || (propUser.fullName || ''),
        email: propUser.email || '',
        phone: propUser.phone || '',
        address: propUser.address || '',
      });
      return;
    }

    const token = localStorage.getItem("token"); // Login garda save bhako token nikalne

    if (token) {
      fetch('/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Token pathayesi backend le user chinxa
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            setUser({
              name: data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.fullName || "",
              email: data.email || "",
              phone: data.phone || "",
              address: data.address || "",
            });
          }
        })
        .catch(err => console.error("Error fetching profile from backend:", err));
    }
  }, [propUser]);

  // Handle input field changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "36px 24px" }}>
      {/* Profile Header Card */}
      <div style={{ ...card, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ height: 120, background: T.grad2, position: "relative" }}>
          {/* User Avatar Circle displaying the first letter of the name */}
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
            {/* User Details Display */}
            <div>
              <div style={{ fontFamily: T.font, fontWeight: 900, fontSize: 20, color: T.text }}>
                {user.name || "Name not set"}
              </div>
              <div style={{ fontFamily: T.font, color: T.muted, fontSize: 13 }}>
                {user.email || "Email not set"} · {user.address || "Kathmandu, Nepal"} · Member since Jan 2025
              </div>
            </div>
            {/* Active Status Badge */}
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

      {/* Edit Profile Form Card */}
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
          {/* Full Name Input */}
          <div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>Full Name</div>
            <input name="name" value={user.name} onChange={handleChange} autoComplete="off" style={inp} />
          </div>
          {/* Email Input */}
          <div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>Email</div>
            <input name="email" value={user.email} onChange={handleChange} autoComplete="off" style={inp} />
          </div>
          {/* Phone Input */}
          <div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>Phone</div>
            <input name="phone" value={user.phone} onChange={handleChange} autoComplete="off" style={inp} />
          </div>
          {/* Address Input */}
          <div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>Address</div>
            <input name="address" value={user.address} onChange={handleChange} autoComplete="off" style={inp} />
          </div>
        </div>
        {/* Save Changes Button */}
        <button style={{ ...btnP, width: "auto", padding: "10px 28px", marginTop: 16 }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;