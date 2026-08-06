import { useState } from "react";
import { T } from "../../constants/theme";
import { card, btnP, inp } from "../../constants/styles";
import { Overlay } from "../Overlay";

export function ReviewModal({ provider, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  if (done)
    return (
      <Overlay>
        <div
          style={{
            ...card,
            padding: 36,
            textAlign: "center",
            maxWidth: 340,
            width: "100%",
            border: "1px solid rgba(255,210,63,0.3)",
          }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>⭐</div>
          <div
            style={{
              fontFamily: T.font,
              fontWeight: 900,
              fontSize: 20,
              color: T.text,
              marginBottom: 8,
            }}>
            Review Submitted!
          </div>
          <div
            style={{
              fontFamily: T.font,
              color: T.muted,
              fontSize: 13,
              marginBottom: 24,
            }}>
            Thanks for helping the community
          </div>
          <button
            onClick={onClose}
            style={{
              ...btnP,
              background: "linear-gradient(135deg,#F7971E,#FFD200)",
              color: "#1A0A00",
            }}>
            Done
          </button>
        </div>
      </Overlay>
    );

  return (
    <Overlay>
      <div style={{ ...card, width: "min(380px,100%)", padding: 26 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}>
          <div
            style={{
              fontFamily: T.font,
              fontWeight: 800,
              fontSize: 16,
              color: T.text,
            }}>
            Rate {provider}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: T.muted,
              fontSize: 20,
              cursor: "pointer",
            }}>
            ✕
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 14 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              style={{
                fontSize: 38,
                cursor: "pointer",
                opacity: (hover || rating) >= n ? 1 : 0.22,
                transition: "opacity .15s,transform .12s",
                transform:
                  (hover || rating) >= n ? "scale(1.18)" : "scale(1)",
                display: "inline-block",
              }}>
              ⭐
            </span>
          ))}
        </div>

        {rating > 0 && (
          <div
            style={{
              textAlign: "center",
              marginBottom: 12,
              fontFamily: T.font,
              background: T.grad1,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              fontSize: 15,
            }}>
            {["", "Poor", "Fair", "Good", "Great", "Excellent!"][rating]}
          </div>
        )}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Share your experience..."
          style={{ ...inp, resize: "none", marginBottom: 16 }}
        />

        <button
          onClick={() => rating > 0 && setDone(true)}
          style={{
            ...btnP,
            background:
              rating > 0
                ? "linear-gradient(135deg,#F7971E,#FFD200)"
                : "rgba(255,255,255,0.06)",
            color: rating > 0 ? "#1A0A00" : T.muted,
            cursor: rating > 0 ? "pointer" : "not-allowed",
          }}>
          Submit Review {rating > 0 && "⭐".repeat(rating)}
        </button>
      </div>
    </Overlay>
  );
}
