import { T } from "../constants/theme";
import { card, btnP, btnG } from "../constants/styles";
import { SERVICES, PROVIDERS } from "../constants/data";
import { HeroIllustration } from "../components/HeroIllustration";
import { SvcIcon } from "../components/SvcIcon";
import { Avatar } from "../components/Avatar";
import { StarRow } from "../components/StarRow";

export function HomePage({ onNavigate, setShowMap, setBooking, setUserType, loggedIn }) {
  return (
    <div>
      {/* HERO */}
      <div
        style={{
          background: T.gradHero,
          padding: "68px 24px 56px",
          position: "relative",
          overflow: "hidden",
        }}>
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 600,
            height: 600,
            borderRadius: 300,
            background: "radial-gradient(circle,rgba(255,107,53,0.12) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: 250,
            background: "radial-gradient(circle,rgba(118,75,162,0.14) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "35%",
            right: "22%",
            width: 350,
            height: 350,
            borderRadius: 175,
            background: "radial-gradient(circle,rgba(56,239,125,0.07) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 40,
          }}>
          <div style={{ flex: "1 1 420px", position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,107,53,0.12)",
                border: "1px solid rgba(255,107,53,0.32)",
                borderRadius: 24,
                padding: "7px 16px",
                marginBottom: 24,
              }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: T.success,
                  boxShadow: `0 0 10px ${T.success}`,
                }}
              />
              <span
                style={{
                  fontFamily: T.font,
                  color: T.orange,
                  fontSize: 12,
                  fontWeight: 700,
                }}>
                500+ Verified Providers in Kathmandu
              </span>
            </div>

            <h1
              style={{
                fontFamily: T.font,
                fontWeight: 900,
                fontSize: "clamp(34px,5.5vw,58px)",
                color: "white",
                lineHeight: 1.1,
                margin: "0 0 18px",
              }}>
              Your Home, <span style={{ background: T.grad1, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Perfectly</span>
              <br />
              Taken Care Of
            </h1>

            <p
              style={{
                fontFamily: T.font,
                color: T.muted,
                fontSize: 16,
                lineHeight: 1.7,
                maxWidth: 440,
                margin: "0 0 32px",
              }}>
              Book trusted plumbers, electricians, cleaners & more. Real-time tracking, secure payment,
              guaranteed satisfaction.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button
                onClick={() => onNavigate("services")}
                style={{
                  background: T.grad1,
                  border: "none",
                  borderRadius: 14,
                  padding: "15px 34px",
                  color: "white",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
                  fontFamily: T.font,
                  boxShadow: "0 8px 32px rgba(255,107,53,0.4)",
                }}>
                Book a Service →
              </button>
              <button
                onClick={() => setShowMap(true)}
                style={{ ...btnG, borderRadius: 14, padding: "15px 26px", display: "flex", alignItems: "center", gap: 8 }}>
                📍 View Map
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: 32,
                marginTop: 36,
                flexWrap: "wrap",
              }}>
              {[
                ["50K+", "Bookings"],
                ["1.2K+", "Providers"],
                ["4.8★", "Avg Rating"],
                ["98%", "Satisfaction"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div
                    style={{
                      fontFamily: T.font,
                      fontWeight: 900,
                      fontSize: 22,
                      background: T.grad1,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                    {v}
                  </div>
                  <div style={{ fontFamily: T.font, color: T.muted, fontSize: 12, marginTop: 2 }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 320px", display: "flex", justifyContent: "center", zIndex: 1 }}>
            <HeroIllustration />
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 24px 36px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}>
          <h2
            style={{
              fontFamily: T.font,
              fontWeight: 800,
              fontSize: 24,
              color: T.text,
              margin: 0,
            }}>
            Popular Services
          </h2>
          <button
            onClick={() => onNavigate("services")}
            style={{
              background: "transparent",
              border: "none",
              color: T.orange,
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: T.font,
            }}>
            View All →
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(128px,1fr))", gap: 12 }}>
          {SERVICES.map((sv) => (
            <div
              key={sv.id}
              onClick={() => onNavigate("services")}
              style={{ ...card, padding: "20px 12px", cursor: "pointer", textAlign: "center", transition: "all .2s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,107,53,0.4)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}>
              <SvcIcon type={sv.name} size={44} />
              <div
                style={{
                  fontFamily: T.font,
                  fontWeight: 700,
                  fontSize: 13,
                  color: T.text,
                  marginTop: 10,
                  marginBottom: 4,
                }}>
                {sv.name}
              </div>
              <div style={{ fontFamily: T.font, fontSize: 11, color: T.dim }}>
                {sv.count} providers
              </div>
              <div
                style={{
                  height: 2,
                  borderRadius: 1,
                  background: sv.grad,
                  marginTop: 12,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* TOP PROVIDERS */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 52px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}>
          <h2
            style={{
              fontFamily: T.font,
              fontWeight: 800,
              fontSize: 24,
              color: T.text,
              margin: 0,
            }}>
            Top Rated Providers
          </h2>
          <button
            onClick={() => onNavigate("services")}
            style={{
              background: "transparent",
              border: "none",
              color: T.orange,
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: T.font,
            }}>
            See All →
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 16 }}>
          {PROVIDERS.slice(0, 3).map((p) => {
            const svc = SERVICES.find((s) => s.name === p.service);
            return (
              <div
                key={p.id}
                style={{ ...card, padding: 0, overflow: "hidden", transition: "all .2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,107,53,0.35)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div style={{ height: 4, background: svc?.grad || T.grad1 }} />
                <div style={{ padding: 18 }}>
                  <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <Avatar initials={p.initials} gradient={p.grad} size={54} />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 3,
                        }}>
                        <span
                          style={{
                            fontFamily: T.font,
                            fontWeight: 800,
                            color: T.text,
                            fontSize: 15,
                          }}>
                          {p.name}
                        </span>
                        {p.verified && <span style={{ fontSize: 13 }}>✅</span>}
                      </div>
                      <div
                        style={{
                          fontFamily: T.font,
                          color: T.muted,
                          fontSize: 12,
                          marginBottom: 5,
                        }}>
                        {p.service} · {p.distance}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <StarRow rating={p.rating} />
                        <span
                          style={{
                            fontFamily: T.font,
                            fontSize: 11,
                            color: T.muted,
                            marginLeft: 4,
                          }}>
                          {p.rating} ({p.reviews})
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        background: p.available
                          ? "rgba(56,239,125,0.1)"
                          : "rgba(255,255,255,0.05)",
                        borderRadius: 10,
                        padding: "4px 10px",
                        height: "fit-content",
                        flexShrink: 0,
                      }}>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          background: p.available ? T.success : T.dim,
                          boxShadow: p.available ? `0 0 6px ${T.success}` : "none",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: T.font,
                          fontSize: 11,
                          color: p.available ? T.success : T.muted,
                          fontWeight: 600,
                        }}>
                        {p.available ? "Now" : "Busy"}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: T.font,
                      fontSize: 12,
                      color: T.dim,
                      marginBottom: 14,
                      fontStyle: "italic",
                    }}>
                    "{p.bio}"
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 14,
                    }}>
                    <div>
                      <span
                        style={{
                          fontFamily: T.font,
                          fontWeight: 900,
                          fontSize: 20,
                          background: T.grad1,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}>
                        NPR {p.price}
                      </span>
                      <span style={{ fontFamily: T.font, color: T.dim, fontSize: 12 }}>
                        /hr
                      </span>
                    </div>
                    <span style={{ fontFamily: T.font, color: T.dim, fontSize: 11 }}>
                      {p.jobs}+ jobs
                    </span>
                  </div>
                  <button
                    onClick={() => (loggedIn ? setBooking(p) : onNavigate("auth"))}
                    style={{
                      ...btnP,
                      background: p.available ? T.grad1 : "rgba(255,255,255,0.07)",
                      color: p.available ? "white" : T.muted,
                      cursor: p.available ? "pointer" : "not-allowed",
                    }}>
                    {p.available ? "Book Now →" : "Currently Unavailable"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: "linear-gradient(180deg,#09090F 0%,#0F0C2A 100%)", padding: "52px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2
              style={{
                fontFamily: T.font,
                fontWeight: 900,
                fontSize: 26,
                color: T.text,
                margin: "0 0 10px",
              }}>
              How It Works
            </h2>
            <p style={{ fontFamily: T.font, color: T.muted, fontSize: 15, margin: 0 }}>
              Get your service done in 4 simple steps
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {[
              { n: "01", icon: "🔍", grad: T.grad1, title: "Search", desc: "Browse or search for the service you need" },
              { n: "02", icon: "👤", grad: T.grad2, title: "Pick Provider", desc: "Compare ratings, reviews, and pricing" },
              { n: "03", icon: "💳", grad: T.grad3, title: "Book & Pay", desc: "Choose your slot and pay securely" },
              { n: "04", icon: "⭐", grad: T.grad4, title: "Rate & Review", desc: "Share your feedback after the service" },
            ].map((step, i) => (
              <div
                key={i}
                style={{ ...card, padding: "24px 20px", position: "relative", overflow: "hidden", transition: "all .2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div
                  style={{
                    position: "absolute",
                    top: -24,
                    right: -24,
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    background: step.grad,
                    opacity: 0.09,
                  }}
                />
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: step.grad,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 14,
                    boxShadow: `0 6px 20px rgba(0,0,0,0.3)`,
                  }}>
                  {step.icon}
                </div>
                <div
                  style={{
                    fontFamily: T.font,
                    fontSize: 11,
                    fontWeight: 800,
                    color: T.orange,
                    letterSpacing: 3,
                    marginBottom: 7,
                  }}>
                  {step.n}
                </div>
                <div
                  style={{
                    fontFamily: T.font,
                    fontWeight: 700,
                    color: T.text,
                    fontSize: 16,
                    marginBottom: 8,
                  }}>
                  {step.title}
                </div>
                <div
                  style={{
                    fontFamily: T.font,
                    color: T.muted,
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}>
                  {step.desc}
                </div>
                <div
                  style={{
                    height: 2,
                    background: step.grad,
                    borderRadius: 1,
                    marginTop: 18,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12 }}>
          {[
            ["🛡️", T.grad3, "100% Verified", "Background-checked providers"],
            ["⚡", T.grad2, "Instant Booking", "Book in under 2 minutes"],
            ["🔒", T.grad6, "Secure Payment", "Stripe · eSewa · Cash"],
            ["⭐", T.grad1, "4.8★ Average", "50,000+ happy customers"],
          ].map(([icon, grad, title, desc]) => (
            <div
              key={title}
              style={{ ...card, padding: "18px 16px", display: "flex", gap: 14, alignItems: "center", transition: "all .2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: grad,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                  boxShadow: `0 4px 16px rgba(0,0,0,0.3)`,
                }}>
                {icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: T.font,
                    fontWeight: 700,
                    color: T.text,
                    fontSize: 14,
                  }}>
                  {title}
                </div>
                <div
                  style={{
                    fontFamily: T.font,
                    color: T.muted,
                    fontSize: 12,
                    marginTop: 2,
                  }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROVIDER CTA */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 56px" }}>
        <div
          style={{
            background: T.grad2,
            borderRadius: 22,
            padding: "38px 36px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(102,126,234,0.3)",
          }}>
          <div
            style={{
              position: "absolute",
              right: -50,
              top: -50,
              width: 240,
              height: 240,
              borderRadius: 120,
              background: "rgba(255,255,255,0.06)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 70,
              bottom: -70,
              width: 180,
              height: 180,
              borderRadius: 90,
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: T.font, fontWeight: 900, fontSize: 24, color: "white", marginBottom: 8 }}>
              Are you a service provider? 🛠️
            </div>
            <div
              style={{
                fontFamily: T.font,
                color: "rgba(255,255,255,0.72)",
                fontSize: 14,
              }}>
              Join 1,200+ providers growing their income on ServiHub
            </div>
          </div>
          <button
            onClick={() => {
              setUserType("provider");
              onNavigate("auth");
            }}
            style={{
              background: "white",
              border: "none",
              borderRadius: 14,
              padding: "15px 32px",
              color: "#302B63",
              fontWeight: 900,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: T.font,
              position: "relative",
              flexShrink: 0,
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}>
            Join as Provider →
          </button>
        </div>
      </div>
    </div>
  );
}
