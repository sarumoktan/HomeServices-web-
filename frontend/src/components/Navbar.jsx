import { useState } from "react";
import { T } from "../constants/theme";
import { btnG, btnP } from "../constants/styles";
import { NOTIFS } from "../constants/data";

export function Navbar({ page, loggedIn, onLogout, onNavigate, userType }) {
  const [notifOpen, setNotifOpen] = useState(false);

  const navLinks =
    loggedIn
      ? userType === "admin"
        ? [
            { id: "admin", l: "Dashboard" },
            { id: "providers", l: "Providers" },
            { id: "bookings", l: "Bookings" },
          ]
        : userType === "provider"
          ? [
              { id: "home", l: "Home" },
              { id: "provider-dash", l: "My Jobs" },
              { id: "profile", l: "Profile" },
            ]
          : [
              { id: "home", l: "Home" },
              { id: "services", l: "Browse" },
              { id: "bookings", l: "My Bookings" },
              { id: "profile", l: "Profile" },
            ]
      : [
          { id: "home", l: "Home" },
          { id: "services", l: "Services" },
          { id: "auth", l: "Sign In" },
        ];

  const unread = NOTIFS.filter((n) => !n.read).length;

  return (
    <nav
      style={{
        background: "rgba(9,9,15,0.92)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        height: 62,
        position: "sticky",
        top: 0,
        zIndex: 100,
        gap: 8,
      }}
      onClick={() => notifOpen && setNotifOpen(false)}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          marginRight: 16,
        }}
        onClick={() => onNavigate("home")}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: T.grad1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            boxShadow: "0 4px 16px rgba(255,107,53,0.4)",
          }}>
          🏠
        </div>
        <span
          style={{
            fontFamily: T.font,
            fontWeight: 900,
            fontSize: 18,
            background: T.grad1,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
          ServiHub
        </span>
      </div>

      <div style={{ display: "flex", gap: 2, flex: 1, flexWrap: "wrap" }}>
        {navLinks.map((n) => (
          <button
            key={n.id}
            onClick={() => onNavigate(n.id)}
            style={{
              background: page === n.id ? "rgba(255,107,53,0.15)" : "transparent",
              border: `1px solid ${page === n.id ? "rgba(255,107,53,0.4)" : "transparent"}`,
              borderRadius: 8,
              padding: "6px 14px",
              color: page === n.id ? T.orange : T.muted,
              fontWeight: page === n.id ? 700 : 500,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: T.font,
              transition: "all .2s",
            }}>
            {n.l}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {loggedIn && (
          <div style={{ position: "relative" }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setNotifOpen(!notifOpen);
              }}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                width: 38,
                height: 38,
                cursor: "pointer",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              🔔
            </button>
            {unread > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: T.danger,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <span style={{ fontFamily: T.font, fontSize: 10, color: "white", fontWeight: 800 }}>
                  {unread}
                </span>
              </div>
            )}
            {notifOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute",
                  top: 46,
                  right: 0,
                  background: "#0D0D20",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16,
                  width: 320,
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
                }}>
                <div
                  style={{
                    padding: "12px 16px",
                    fontFamily: T.font,
                    fontWeight: 700,
                    color: T.text,
                    fontSize: 14,
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}>
                  Notifications
                </div>
                {NOTIFS.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: "11px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      background: n.read ? "transparent" : "rgba(255,107,53,0.05)",
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: n.color + "22",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        flexShrink: 0,
                      }}>
                      {n.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: T.font, fontSize: 13, color: T.text, lineHeight: 1.4 }}>
                        {n.msg}
                      </div>
                      <div style={{ fontFamily: T.font, fontSize: 11, color: T.dim, marginTop: 2 }}>
                        {n.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {loggedIn ? (
          <button
            onClick={() => onLogout()}
            style={{ ...btnG, padding: "7px 14px", fontSize: 12 }}>
            Logout
          </button>
        ) : (
          <button
            onClick={() => onNavigate("auth")}
            style={{
              background: T.grad1,
              border: "none",
              borderRadius: 10,
              padding: "8px 20px",
              color: "white",
              fontWeight: 800,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: T.font,
              boxShadow: "0 4px 18px rgba(255,107,53,0.35)",
            }}>
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
}
