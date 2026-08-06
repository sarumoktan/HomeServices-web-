import { T } from "../constants/theme";
import { card, btnP, btnG, inp } from "../constants/styles";
import { SERVICES, PROVIDERS } from "../constants/data";
import { SvcIcon } from "../components/SvcIcon";
import { Avatar } from "../components/Avatar";
import { StarRow } from "../components/StarRow";

export function ServicesPage({
  filter,
  setFilter,
  search,
  setSearch,
  setShowChat,
  setBooking,
  loggedIn,
  onNavigate,
  setShowMap,
}) {
  const filtered = PROVIDERS.filter(
    (p) =>
      (filter === "All" || p.service === filter) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.service.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
          flexWrap: "wrap",
          gap: 12,
        }}>
        <h2
          style={{
            fontFamily: T.font,
            fontWeight: 800,
            fontSize: 24,
            color: T.text,
            margin: 0,
          }}>
          Find a Provider
        </h2>
        <button
          onClick={() => setShowMap(true)}
          style={{ ...btnG, display: "flex", alignItems: "center", gap: 8 }}>
          📍 Map View
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input
          placeholder="🔍 Search providers or services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inp, flex: "1 1 220px", width: "auto", marginBottom: 0 }}
        />
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {["All", ...SERVICES.map((s) => s.name)].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? T.grad1 : "rgba(255,255,255,0.05)",
              border: `1px solid ${filter === f ? "transparent" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 22,
              padding: "7px 16px",
              color: filter === f ? "white" : T.muted,
              fontSize: 12,
              cursor: "pointer",
              fontWeight: filter === f ? 700 : 400,
              fontFamily: T.font,
              transition: "all .2s",
            }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ fontFamily: T.font, color: T.muted, fontSize: 13, marginBottom: 18 }}>
        {filtered.length} providers found
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 16 }}>
        {filtered.map((p) => {
          const svc = SERVICES.find((s) => s.name === p.service);
          return (
            <div
              key={p.id}
              style={{ ...card, padding: 0, overflow: "hidden", transition: "all .2s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}>
              <div style={{ height: 3, background: svc?.grad || T.grad1 }} />
              <div style={{ padding: 18 }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <Avatar initials={p.initials} gradient={p.grad} size={52} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span
                        style={{
                          fontFamily: T.font,
                          fontWeight: 800,
                          color: T.text,
                          fontSize: 15,
                        }}>
                        {p.name}
                      </span>
                      {p.verified && <span style={{ fontSize: 12 }}>✅</span>}
                    </div>
                    <div
                      style={{
                        fontFamily: T.font,
                        color: T.muted,
                        fontSize: 12,
                        margin: "3px 0",
                      }}>
                      {p.service} · 📍 {p.distance}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <StarRow rating={p.rating} />
                      <span style={{ fontFamily: T.font, fontSize: 11, color: T.muted, marginLeft: 4 }}>
                        {p.rating} · {p.reviews} reviews
                      </span>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        background: p.available
                          ? "rgba(56,239,125,0.1)"
                          : "rgba(255,255,255,0.05)",
                        borderRadius: 8,
                        padding: "3px 9px",
                        marginBottom: 4,
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
                          fontSize: 10,
                          color: p.available ? T.success : T.dim,
                          fontWeight: 600,
                        }}>
                        {p.available ? "Available" : "Busy"}
                      </span>
                    </div>
                    <div style={{ fontFamily: T.font, color: T.dim, fontSize: 10, textAlign: "center" }}>
                      {p.jobs}+ jobs
                    </div>
                  </div>
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
                  <span style={{ fontFamily: T.font, fontSize: 12, color: T.dim, fontStyle: "italic" }}>
                    "{p.bio}"
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setShowChat(true)}
                    style={{ ...btnG, flex: 1, padding: "9px", fontSize: 14 }}>
                    💬
                  </button>
                  <button
                    onClick={() => (loggedIn ? setBooking(p) : onNavigate("auth"))}
                    style={{
                      ...btnP,
                      flex: 3,
                      width: "auto",
                      background: p.available ? T.grad1 : "rgba(255,255,255,0.06)",
                      color: p.available ? "white" : T.muted,
                      cursor: p.available ? "pointer" : "not-allowed",
                      padding: "9px",
                    }}>
                    {p.available ? "Book Now →" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
