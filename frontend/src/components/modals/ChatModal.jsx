import { useState, useEffect, useRef } from "react";
import { T } from "../../constants/theme";
import { card, inp } from "../../constants/styles";
import { Overlay } from "../Overlay";
import { Avatar } from "../Avatar";

export function ChatModal({ onClose }) {
  const [msgs, setMsgs] = useState([
    { id: 1, from: "p", text: "Hello! I'll be at your location by 10:15 AM.", time: "9:45 AM" },
    {
      id: 2,
      from: "u",
      text: "Great! Please bring the pipe fittings too.",
      time: "9:47 AM",
    },
    {
      id: 3,
      from: "p",
      text: "Sure, I have everything. See you soon! 👍",
      time: "9:48 AM",
    },
  ]);
  const [inp2, setInp2] = useState("");
  const ref = useRef(null);

  useEffect(() => ref.current?.scrollIntoView({ behavior: "smooth" }), [msgs]);

  const send = () => {
    if (!inp2.trim()) return;
    setMsgs([
      ...msgs,
      {
        id: msgs.length + 1,
        from: "u",
        text: inp2,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInp2("");
  };

  return (
    <Overlay>
      <div style={{ ...card, width: "min(400px,100%)", display: "flex", flexDirection: "column", height: 500 }}>
        <div
          style={{
            background: T.grad2,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderRadius: "17px 17px 0 0",
          }}>
          <Avatar initials="RK" gradient="orange" size={38} />
          <div>
            <div style={{ fontFamily: T.font, fontWeight: 700, color: "white", fontSize: 14 }}>
              Rajesh Kumar
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: T.success }} />
              <span style={{ fontFamily: T.font, color: "rgba(255,255,255,0.8)", fontSize: 11 }}>
                On the way · 8 min
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              marginLeft: "auto",
              background: "rgba(0,0,0,0.2)",
              border: "none",
              borderRadius: 8,
              width: 28,
              height: 28,
              color: "white",
              cursor: "pointer",
              fontSize: 16,
            }}>
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "14px" }}>
          {msgs.map((m) => (
            <div
              key={m.id}
              style={{
                display: "flex",
                justifyContent: m.from === "u" ? "flex-end" : "flex-start",
                marginBottom: 10,
              }}>
              <div
                style={{
                  maxWidth: "78%",
                  background:
                    m.from === "u" ? T.grad1 : "rgba(255,255,255,0.07)",
                  borderRadius:
                    m.from === "u"
                      ? "16px 16px 3px 16px"
                      : "16px 16px 16px 3px",
                  padding: "9px 13px",
                }}>
                <div
                  style={{
                    fontFamily: T.font,
                    color: m.from === "u" ? "white" : T.text,
                    fontSize: 13,
                  }}>
                  {m.text}
                </div>
                <div
                  style={{
                    fontFamily: T.font,
                    fontSize: 9,
                    color: "rgba(255,255,255,0.4)",
                    marginTop: 2,
                    textAlign: m.from === "u" ? "right" : "left",
                  }}>
                  {m.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={ref} />
        </div>

        <div
          style={{
            padding: "10px 14px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            gap: 8,
          }}>
          <input
            value={inp2}
            onChange={(e) => setInp2(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message..."
            style={{ ...inp, flex: 1, marginBottom: 0 }}
          />
          <button
            onClick={send}
            style={{
              background: T.grad1,
              border: "none",
              borderRadius: 10,
              padding: "0 18px",
              color: "white",
              fontWeight: 800,
              cursor: "pointer",
              fontSize: 16,
            }}>
            →
          </button>
        </div>
      </div>
    </Overlay>
  );
}
