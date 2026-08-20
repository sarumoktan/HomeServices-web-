import React, { useState, useRef } from "react";
import { T } from "../constants/theme";
import { card, btnP, inp } from "../constants/styles";

export function AuthPage({ authTab, setAuthTab, userType, setUserType, onLogin }) {
  const [step, setStep] = useState("auth");
  const [useEmail, setUseEmail] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password] = useState("Password123!");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAuthSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg(useEmail ? "Please enter your email address." : "Please enter your phone number.");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    try {
      let currentEmail = "";
      let currentPhone = "";

      if (useEmail) {
        currentEmail = identifier.trim();
        currentPhone = `+97798${Math.floor(10000000 + Math.random() * 90000000)}`;
        setEmailAddress(currentEmail);
      } else {
        currentPhone = identifier.trim();
        currentEmail = `${identifier.replace(/[^0-9]/g, "") || "user"}@placeholder.com`;
        setPhone(currentPhone);
      }

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim() || (useEmail ? identifier.split("@")[0] : "Valued"),
          lastName: lastName.trim() || "Customer",
          email: currentEmail,
          phone: currentPhone,
          password: password,
          role: userType === "provider" ? "provider" : "user",
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        console.error("Server validation error details:", data);
        const detailedError = data.errors ? data.errors.map(err => err.message).join(", ") : data.message;
        throw new Error(detailedError || "Failed to send verification code.");
      }

      setLoading(false);
      setStep("otp");
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || "Network connection error. Please try again.");
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtpSubmit = async (e) => {
    if (e) e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < otp.length) {
      setErrorMsg(`Please enter the complete ${otp.length}-digit code.`);
      return;
    }
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailAddress || identifier,
          otp: enteredOtp,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP code.");
      }

      setLoading(false);
      setStep("profile");
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || "Invalid OTP code. Please try again.");
    }
  };

  const handleCompleteProfileSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
      onLogin(userType, { 
        fullName: `${firstName} ${lastName}`.trim(), 
        address, 
        email: emailAddress || identifier, 
        phone: phone || identifier, 
        role: userType 
      });
    } catch (err) {
      setLoading(false);
      setErrorMsg("Failed to complete profile.");
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
        background: T.bg || "#fdfbf7",
      }}
    >
      <div
        style={{
          ...card,
          width: "min(420px, 100%)",
          padding: "36px 28px",
          textAlign: "center",
          background: "#fdfbf7",
          boxShadow: "none",
        }}
      >
        {step === "auth" && (
          <>
            <div
              style={{
                fontFamily: T.font,
                fontWeight: 800,
                fontSize: 32,
                marginBottom: 16,
                letterSpacing: "-0.5px",
              }}
            >
              <span style={{ color: "#ff6b35" }}>Home</span>{" "}
              <span style={{ color: "#2c3e50", fontWeight: 400 }}>service</span>
            </div>

            <div
              style={{
                fontFamily: T.font,
                color: "#2c3e50",
                fontSize: 15,
                lineHeight: 1.5,
                marginBottom: 28,
                maxWidth: 320,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              We'll sign you in or create a new account if you don't have one yet.
            </div>

            {errorMsg && (
              <div
                style={{
                  marginBottom: 16,
                  padding: "10px",
                  background: "rgba(255,0,0,0.1)",
                  borderRadius: 8,
                  color: "#ff6b6b",
                  fontSize: 13,
                  fontFamily: T.font,
                }}
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAuthSubmit}>
              <div style={{ marginBottom: 16 }}>
                <input
                  type={useEmail ? "email" : "text"}
                  required
                  placeholder={useEmail ? "name@example.com" : "Phone number"}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{
                    ...inp,
                    height: 52,
                    borderRadius: 12,
                    border: "1.5px solid #ff6b35",
                    background: "#ffffff",
                    textAlign: "left",
                    padding: "0 16px",
                    fontSize: 16,
                    outline: "none",
                    boxShadow: "0 2px 6px rgba(255, 107, 53, 0.08)",
                    color: "#2c3e50",
                    width: "100%",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setUseEmail(!useEmail);
                    setIdentifier("");
                    setErrorMsg("");
                  }}
                  style={{
                    width: 48,
                    height: 26,
                    borderRadius: 13,
                    background: useEmail ? "#ff6b35" : "#d1d5db",
                    border: "none",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    padding: 0,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 3,
                      left: useEmail ? 25 : 3,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "white",
                      transition: "left 0.2s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                  />
                </button>
                <span
                  style={{
                    fontFamily: T.font,
                    fontSize: 15,
                    color: "#2c3e50",
                    fontWeight: 500,
                  }}
                >
                  Use Email
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...btnP,
                  width: "100%",
                  height: 52,
                  borderRadius: 12,
                  background: "#38bdf8",
                  border: "none",
                  color: "white",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(56, 189, 248, 0.3)",
                  marginBottom: 28,
                  transition: "opacity 0.2s",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Please wait..." : "Continue"}
              </button>
            </form>
          </>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtpSubmit} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: T.font,
                fontWeight: 800,
                fontSize: 26,
                marginBottom: 12,
                color: "#2c3e50",
              }}
            >
              Enter Verification Code
            </div>

            <div style={{ fontSize: 14, color: "#64748b", marginBottom: 20, fontFamily: T.font }}>
              We sent a temporary 6-digit code to your {useEmail ? "email" : "phone number"}:<br />
              <strong style={{ color: "#2c3e50" }}>{identifier}</strong>{" "}
              <button
                type="button"
                onClick={() => setStep("auth")}
                style={{ background: "none", border: "none", color: "#ff6b35", cursor: "pointer", fontSize: 13, fontWeight: 500 }}
              >
                [Change]
              </button>
            </div>

            {errorMsg && (
              <div
                style={{
                  marginBottom: 16,
                  padding: "10px",
                  background: "rgba(255,0,0,0.1)",
                  borderRadius: 8,
                  color: "#ff6b6b",
                  fontSize: 13,
                  fontFamily: T.font,
                }}
              >
                {errorMsg}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  style={{
                    width: 44,
                    height: 48,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    borderRadius: 10,
                    border: "1.5px solid #ff6b35",
                    background: "#ffffff",
                    color: "#2c3e50",
                    outline: "none",
                    boxShadow: "0 2px 6px rgba(255, 107, 53, 0.08)",
                  }}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...btnP,
                width: "100%",
                height: 52,
                borderRadius: 12,
                background: "#38bdf8",
                border: "none",
                color: "white",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(56, 189, 248, 0.3)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === "profile" && (
          <form onSubmit={handleCompleteProfileSubmit} style={{ textAlign: "left" }}>
            <div
              style={{
                fontFamily: T.font,
                fontWeight: 800,
                fontSize: 26,
                marginBottom: 6,
                textAlign: "center",
                color: "#2c3e50",
              }}
            >
              Complete Profile
            </div>
            <div
              style={{
                fontFamily: T.font,
                fontSize: 14,
                color: "#64748b",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Please provide your details to finish setting up your account.
            </div>

            {errorMsg && (
              <div
                style={{
                  marginBottom: 16,
                  padding: "10px",
                  background: "rgba(255,0,0,0.1)",
                  borderRadius: 8,
                  color: "#ff6b6b",
                  fontSize: 13,
                  fontFamily: T.font,
                }}
              >
                {errorMsg}
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: T.font, fontSize: 13, color: "#2c3e50", fontWeight: 500, marginBottom: 6 }}>
                First Name <span style={{ color: "#ff6b35" }}>*</span>
              </div>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ ...inp, height: 48, borderRadius: 10, border: "1.5px solid #d1d5db", background: "#ffffff", color: "#2c3e50", padding: "0 14px", fontSize: 15, outline: "none", width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: T.font, fontSize: 13, color: "#2c3e50", fontWeight: 500, marginBottom: 6 }}>
                Last Name <span style={{ color: "#ff6b35" }}>*</span>
              </div>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ ...inp, height: 48, borderRadius: 10, border: "1.5px solid #d1d5db", background: "#ffffff", color: "#2c3e50", padding: "0 14px", fontSize: 15, outline: "none", width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: T.font, fontSize: 13, color: "#2c3e50", fontWeight: 500, marginBottom: 6 }}>
                Address <span style={{ color: "#ff6b35" }}>*</span>
              </div>
              <input
                type="text"
                required
                placeholder="eg: Baluwatar, Kathmandu"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ ...inp, height: 48, borderRadius: 10, border: "1.5px solid #d1d5db", background: "#ffffff", color: "#2c3e50", padding: "0 14px", fontSize: 15, outline: "none", width: "100%" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...btnP,
                width: "100%",
                height: 52,
                borderRadius: 12,
                background: "#38bdf8",
                border: "none",
                color: "white",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(56, 189, 248, 0.3)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Saving Profile..." : "Complete Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
