import { useState } from "react";
import { T } from "../../constants/theme";
import { card, btnP, btnG, inp } from "../../constants/styles";
import { SERVICES } from "../../constants/data";
import { Overlay } from "../Overlay";
import { Avatar } from "../Avatar";

export function BookingModal({ provider, onClose }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [addr, setAddr] = useState("Thamel, Kathmandu");
  const [pay, setPay] = useState("card");
  const [done, setDone] = useState(false);

  if (done)
    return (
      <Overlay>
        <div
          style={{
            ...card,
            padding: 40,
            textAlign: "center",
            maxWidth: 360,
            width: "100%",
            border: "1px solid rgba(56,239,125,0.3)",
          }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 38,
              background: "linear-gradient(135deg,#11998E,#38EF7D)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              margin: "0 auto 20px",
            }}>
            ✅
          </div>
          <div style={{ fontFamily: T.font, fontWeight: 900, fontSize: 22, color: T.text, marginBottom: 8 }}>
            Booking Confirmed!
          </div>
          <div style={{ fontFamily: T.font, color: T.muted, fontSize: 14, marginBottom: 5 }}>
            ID: <span style={{ color: T.teal, fontWeight: 700 }}>#BK2406</span>
          </div>
          <div style={{ fontFamily: T.font, color: T.muted, fontSize: 13, marginBottom: 28 }}>
            {provider.name} arrives {time || "10:00 AM"} · {date || "Apr 12, 2025"}
          </div>
          <button
            onClick={onClose}
            style={{
              ...btnP,
              background: "linear-gradient(135deg,#11998E,#38EF7D)",
              color: "#0A1A0A",
            }}>
            Done
          </button>
        </div>
      </Overlay>
    );

  return (
    <Overlay>
      <div style={{ ...card, width: "min(490px,100%)", overflow: "hidden" }}>
        <div style={{ background: T.grad1, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: T.font, fontWeight: 900, color: "white", fontSize: 16 }}>
              Book {provider.name}
            </div>
            <div style={{ fontFamily: T.font, color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
              Step {step} of 3
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "none",
              borderRadius: 8,
              width: 30,
              height: 30,
              color: "white",
              cursor: "pointer",
              fontSize: 16,
            }}>
            ✕
          </button>
        </div>

        <div style={{ display: "flex", gap: 3, padding: "12px 20px 0" }}>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: n <= step ? T.orange : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>

        <div style={{ padding: "16px 20px 22px" }}>
          {step === 1 && (
            <>
              <div style={{ fontFamily: T.font, color: T.muted, fontSize: 12, marginBottom: 14 }}>
                Schedule your service
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                    Date
                  </div>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inp} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                    Time
                  </div>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inp} />
                </div>
              </div>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                Address
              </div>
              <input value={addr} onChange={(e) => setAddr(e.target.value)} style={{ ...inp, marginBottom: 12 }} />
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 6 }}>
                Notes (optional)
              </div>
              <textarea
                rows={2}
                placeholder="E.g. Ring bell on 3rd floor"
                style={{ ...inp, resize: "none" }}
              />
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ fontFamily: T.font, color: T.muted, fontSize: 12, marginBottom: 14 }}>
                Choose payment method
              </div>
              {[
                ["card", "💳", "Credit / Debit Card"],
                ["esewa", "🟢", "eSewa"],
                ["cash", "💵", "Cash on Service"],
              ].map(([id, icon, label]) => (
                <div
                  key={id}
                  onClick={() => setPay(id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: `1.5px solid ${pay === id ? T.orange : "rgba(255,255,255,0.1)"}`,
                    background: pay === id ? "rgba(255,107,53,0.1)" : "rgba(255,255,255,0.03)",
                    marginBottom: 10,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <span style={{ fontFamily: T.font, fontWeight: 600, color: T.text, fontSize: 14 }}>
                    {label}
                  </span>
                  {pay === id && (
                    <span style={{ marginLeft: "auto", color: T.orange, fontSize: 18, fontWeight: 900 }}>
                      ✓
                    </span>
                  )}
                </div>
              ))}
              {pay === "card" && (
                <div style={{ marginTop: 10 }}>
                  <input placeholder="1234 5678 9012 3456" style={{ ...inp, marginBottom: 10 }} />
                  <div style={{ display: "flex", gap: 10 }}>
                    <input placeholder="MM/YY" style={{ ...inp, flex: 1 }} />
                    <input placeholder="CVV" style={{ ...inp, flex: 1 }} />
                  </div>
                </div>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <div style={{ fontFamily: T.font, color: T.muted, fontSize: 12, marginBottom: 14 }}>
                Review your booking
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 16, marginBottom: 14 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                    paddingBottom: 14,
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}>
                  <Avatar initials={provider.initials} gradient={provider.grad} size={44} />
                  <div>
                    <div style={{ fontFamily: T.font, fontWeight: 700, color: T.text }}>
                      {provider.name}
                    </div>
                    <div style={{ fontFamily: T.font, color: T.muted, fontSize: 12 }}>
                      {provider.service}
                    </div>
                  </div>
                </div>
                {[
                  ["Date", date || "Apr 12, 2025"],
                  ["Time", time || "10:00 AM"],
                  ["Address", addr],
                  [
                    "Payment",
                    pay === "card" ? "Credit Card" : pay === "esewa" ? "eSewa" : "Cash",
                  ],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
                    <span style={{ fontFamily: T.font, color: T.muted, fontSize: 13 }}>{k}</span>
                    <span style={{ fontFamily: T.font, color: T.text, fontSize: 13, fontWeight: 600 }}>
                      {v}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    marginTop: 10,
                    paddingTop: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <span style={{ fontFamily: T.font, color: T.muted, fontWeight: 600 }}>Total</span>
                  <span
                    style={{
                      fontFamily: T.font,
                      fontWeight: 900,
                      fontSize: 20,
                      background: T.grad1,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                    NPR {provider.price}
                  </span>
                </div>
              </div>
            </>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} style={{ ...btnG, flex: 1 }}>
                ← Back
              </button>
            )}
            <button
              onClick={() => (step < 3 ? setStep(step + 1) : setDone(true))}
              style={{ ...btnP, flex: 2, width: "auto" }}>
              {step === 3 ? "🔒 Confirm & Pay" : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
