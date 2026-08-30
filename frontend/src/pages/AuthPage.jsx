import React, { useState, useRef } from "react";

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
          lastName: lastName.trim() || (userType === "provider" ? "Provider" : "Customer"),
          email: currentEmail,
          phone: currentPhone,
          password: password,
          role: userType === "provider" ? "provider" : "user",
          serviceType: userType === "provider" ? "General Home Service" : undefined,
          hourlyRate: userType === "provider" ? 500 : undefined,
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
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
    <div className="min-h-[calc(100vh-62px)] flex items-center justify-center p-6 bg-[#F4F3EE] font-sans">
      <div className="w-[min(420px,100%)] p-9 text-center bg-white border border-stone-200 rounded-2xl shadow-sm">
        
        {step === "auth" && (
          <>
            <div className="font-extrabold text-[32px] mb-4 tracking-tight">
              <span className="text-[#E8AE3F]">Home</span>{" "}
              <span className="text-stone-900 font-normal">service</span>
            </div>

            <p className="text-stone-600 text-[15px] leading-relaxed mb-7 max-w-[320px] mx-auto">
              We'll sign you in or create a new account if you don't have one yet.
            </p>

            {errorMsg && (
              <div className="mb-4 p-2.5 bg-red-500/10 rounded-lg text-red-500 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAuthSubmit}>
              <div className="mb-4">
                <input
                  type={useEmail ? "email" : "text"}
                  required
                  placeholder={useEmail ? "name@example.com" : "Phone number"}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full h-[52px] rounded-xl border-1.5 border-[#E8AE3F] bg-white text-stone-900 px-4 text-base outline-none shadow-sm transition focus:border-amber-600"
                />
              </div>

              <div className="flex items-center justify-start gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setUseEmail(!useEmail);
                    setIdentifier("");
                    setErrorMsg("");
                  }}
                  className={`w-12 h-[26px] rounded-full relative cursor-pointer transition-colors p-0 border-none ${
                    useEmail ? "bg-[#E8AE3F]" : "bg-stone-300"
                  }`}
                >
                  <span
                    className={`absolute top-[3px] w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                      useEmail ? "left-[25px]" : "left-[3px]"
                    }`}
                  />
                </button>
                <span className="text-stone-800 text-[15px] font-medium">
                  Use Email
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[52px] rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-base font-semibold cursor-pointer shadow-md shadow-sky-500/20 mb-7 transition opacity-disabled:70 flex items-center justify-center"
              >
                {loading ? "Please wait..." : "Continue"}
              </button>
            </form>
          </>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtpSubmit} className="text-center">
            <h2 className="font-extrabold text-[26px] mb-3 text-stone-900">
              Enter Verification Code
            </h2>

            <div className="text-sm text-stone-500 mb-5">
              We sent a temporary 6-digit code to your {useEmail ? "email" : "phone number"}:<br />
              <strong className="text-stone-900">{identifier}</strong>{" "}
              <button
                type="button"
                onClick={() => setStep("auth")}
                className="bg-transparent border-none text-[#E8AE3F] cursor-pointer text-xs font-medium hover:underline"
              >
                [Change]
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-2.5 bg-red-500/10 rounded-lg text-red-500 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div className="flex justify-center gap-2 mb-7">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  className="w-[44px] h-[48px] text-center text-xl font-bold rounded-xl border-1.5 border-[#E8AE3F] bg-white text-stone-900 outline-none shadow-sm focus:border-amber-600"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-base font-semibold cursor-pointer shadow-md shadow-sky-500/20 transition flex items-center justify-center"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === "profile" && (
          <form onSubmit={handleCompleteProfileSubmit} className="text-left">
            <h2 className="font-extrabold text-[26px] mb-1.5 text-center text-stone-900">
              Complete Profile
            </h2>
            <p className="text-sm text-stone-500 mb-5 text-center">
              Please provide your details to finish setting up your account.
            </p>

            {errorMsg && (
              <div className="mb-4 p-2.5 bg-red-500/10 rounded-lg text-red-500 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div className="mb-3.5">
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                First Name <span className="text-[#E8AE3F]">*</span>
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-[48px] rounded-xl border border-stone-200 bg-white text-stone-900 px-3.5 text-sm outline-none focus:border-stone-400"
              />
            </div>

            <div className="mb-3.5">
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Last Name <span className="text-[#E8AE3F]">*</span>
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-[48px] rounded-xl border border-stone-200 bg-white text-stone-900 px-3.5 text-sm outline-none focus:border-stone-400"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Address <span className="text-[#E8AE3F]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="eg: Baluwatar, Kathmandu"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-[48px] rounded-xl border border-stone-200 bg-white text-stone-900 px-3.5 text-sm outline-none focus:border-stone-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-base font-semibold cursor-pointer shadow-md shadow-sky-500/20 transition flex items-center justify-center"
            >
              {loading ? "Saving Profile..." : "Complete Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
