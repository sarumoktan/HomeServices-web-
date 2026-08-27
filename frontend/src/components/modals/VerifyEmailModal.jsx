import React, { useEffect, useRef, useState } from "react";
import { Overlay } from "../Overlay";
import { X, KeyRound, Check } from "lucide-react";

const API = "http://localhost:5000/api/auth";
const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // must match OTP_RESEND_COOLDOWN_MS in auth.service.js

// Amber envelope with a key and a masked code peeking out
function EnvelopeArt() {
  return (
    <svg viewBox="0 0 160 122" className="w-[150px] h-auto block mx-auto">
      {/* open flap, sits behind the letter */}
      <path d="M12 48 L80 6 L148 48 Z" fill="#F7B955" />

      {/* the letter itself */}
      <rect x="30" y="20" width="100" height="58" rx="7" fill="#FFFFFF" stroke="#EDEDED" strokeWidth="1.5" />

      {/* key */}
      <g fill="#F2622A">
        <circle cx="48" cy="49" r="8.5" fill="none" stroke="#F2622A" strokeWidth="5" />
        <rect x="55" y="46.5" width="18" height="5" rx="2.5" />
        <rect x="63" y="51" width="4" height="6.5" rx="1.6" />
        <rect x="70" y="51" width="4" height="6.5" rx="1.6" />
      </g>

      {/* masked code */}
      <text x="79" y="56" fontSize="14" fontWeight="800" fill="#5F6368" letterSpacing="1" className="font-sans">
        ******
      </text>

      {/* envelope front, tucks the letter in */}
      <path d="M10 46 L80 90 L150 46 L150 108 Q150 116 142 116 L18 116 Q10 116 10 108 Z" fill="#F2A93B" />
      <path d="M10 46 L80 90 L150 46" fill="none" stroke="#E39A2B" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

// Teal circled check for the success state
function VerifiedArt() {
  return (
    <svg viewBox="0 0 100 100" className="w-[92px] h-[92px] block mx-auto">
      <circle cx="50" cy="50" r="44" fill="none" stroke="#1BB99A" strokeWidth="3.5" />
      <polyline
        points="31,51 44,64 70,38"
        fill="none"
        stroke="#1BB99A"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VerifyEmailModal({ email, onClose, onVerified, onChangeEmail }) {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [focused, setFocused] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [noteMsg, setNoteMsg] = useState("");
  const [verified, setVerified] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);

  const boxes = useRef([]);

  useEffect(() => {
    boxes.current[0]?.focus();
  }, []);

  // Tick the Resend Code countdown down to zero
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const code = digits.join("");

  const focusBox = (i) => {
    const target = boxes.current[Math.max(0, Math.min(OTP_LENGTH - 1, i))];
    target?.focus();
    target?.select();
  };

  const handleChange = (i, raw) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    setErrorMsg("");
    if (digit && i < OTP_LENGTH - 1) focusBox(i + 1);
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      if (digits[i]) return;
      e.preventDefault();
      setDigits((prev) => {
        const next = [...prev];
        next[i - 1] = "";
        return next;
      });
      focusBox(i - 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusBox(i - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusBox(i + 1);
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();

    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((d, idx) => (next[idx] = d));
    setDigits(next);
    setErrorMsg("");
    focusBox(pasted.length - 1);

    if (pasted.length === OTP_LENGTH) submit(pasted);
  };

  const submit = async (value) => {
    const otp = value ?? code;
    if (otp.length !== OTP_LENGTH || loading) return;

    setErrorMsg("");
    setNoteMsg("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (!response.ok) {
        const err = new Error(data.message || "We couldn't verify that code.");
        err.code = data.code;
        throw err;
      }

      setLoading(false);
      setVerified(true);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || "Network connection error.");
      if (err.code === "OTP_EXPIRED" || err.code === "TOO_MANY_ATTEMPTS") {
        setDigits(Array(OTP_LENGTH).fill(""));
        focusBox(0);
      }
    }
  };

  const resend = async () => {
    if (cooldown > 0 || loading) return;

    setErrorMsg("");
    setNoteMsg("");

    try {
      const response = await fetch(`${API}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.retryAfter) setCooldown(data.retryAfter);
        throw new Error(data.message || "Couldn't send a new code.");
      }

      setDigits(Array(OTP_LENGTH).fill(""));
      focusBox(0);
      setCooldown(RESEND_COOLDOWN);
      setNoteMsg(data.message || "A new code has been sent to your email.");
    } catch (err) {
      setErrorMsg(err.message || "Network connection error.");
    }
  };

  /* ================= VERIFIED ================= */
  if (verified)
    return (
      <Overlay>
        <div className="bg-white rounded-2xl p-[44px_34px_34px] w-full max-w-[360px] text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)] animate-in fade-in zoom-in-95 duration-200">
          <VerifiedArt />

          <div className="font-extrabold text-2xl text-[#1F2430] mt-[22px]">
            Email Verified
          </div>
          <div className="text-[13px] text-[#6B7280] mt-2">
            Your email address was successfully verified.
          </div>

          <button
            onClick={onVerified}
            className="w-full bg-[#12ABE3] hover:bg-[#0f97cd] border-none rounded-full p-[15px] text-white font-extrabold text-[15px] cursor-pointer mt-[26px] transition-colors shadow-md"
          >
            Back to Login
          </button>
        </div>
      </Overlay>
    );

  /* ================= CODE ENTRY ================= */
  return (
    <Overlay>
      <div className="bg-white rounded-2xl p-[34px_30px_26px] w-full max-w-[420px] relative shadow-[0_24px_60px_rgba(0,0,0,0.35)] animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3.5 bg-transparent border-none text-[#9AA0A6] hover:text-[#1F2430] text-xl leading-none cursor-pointer transition-colors"
        >
          ✕
        </button>

        <EnvelopeArt />

        <div className="font-extrabold text-[22px] text-[#1F2430] text-center mt-[18px]">
          Verify Your Email Address
        </div>
        <div className="text-[13.5px] text-[#6B7280] text-center mt-2 leading-relaxed">
          Please enter the 6-digit verification code sent to
          <br />
          <strong className="text-[#1F2430]">{email}</strong>.
        </div>

        <div className="flex gap-2.5 justify-center mt-[22px]">
          {digits.map((d, i) => {
            const isFocused = focused === i;
            return (
              <input
                key={i}
                ref={(el) => (boxes.current[i] = el)}
                value={d}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                onFocus={() => setFocused(i)}
                className={`w-[46px] h-[54px] text-center text-[22px] font-extrabold text-[#1F2430] rounded-[10px] outline-none box-border transition-all duration-150 ${
                  isFocused
                    ? "bg-white border-2 border-[#E8A33D] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    : "bg-[#F1F1F1] border-2 border-transparent"
                }`}
              />
            );
          })}
        </div>

        {errorMsg && (
          <div className="text-[12.5px] text-[#D93025] text-center mt-3">
            {errorMsg}
          </div>
        )}
        {noteMsg && !errorMsg && (
          <div className="text-[12.5px] text-[#1E8E3E] text-center mt-3">
            {noteMsg}
          </div>
        )}

        <div className="text-[12.5px] text-[#6B7280] text-center mt-[18px]">
          Want to Change Your Email Address?{" "}
          <button
            onClick={onChangeEmail}
            className="bg-transparent border-none p-0 text-[#E08A1E] hover:underline font-bold text-[12.5px] cursor-pointer"
          >
            Change Here
          </button>
        </div>

        <button
          onClick={() => submit()}
          disabled={code.length !== OTP_LENGTH || loading}
          className={`w-full bg-[#F5A623] hover:bg-[#e0951c] border-none rounded-xl p-3.5 text-white font-extrabold text-[15px] mt-4 transition-all shadow-sm ${
            code.length === OTP_LENGTH && !loading ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-55"
          }`}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        <div className="text-center mt-4">
          <button
            onClick={resend}
            disabled={cooldown > 0 || loading}
            className={`bg-transparent border-none p-0 text-[12.5px] underline transition-colors ${
              cooldown > 0 ? "text-[#9AA0A6] cursor-default" : "text-[#4B5563] hover:text-[#1F2430] cursor-pointer"
            }`}
          >
            {cooldown > 0 ? `Resend Code in ${cooldown}s` : "Resend Code"}
          </button>
        </div>
      </div>
    </Overlay>
  );
}