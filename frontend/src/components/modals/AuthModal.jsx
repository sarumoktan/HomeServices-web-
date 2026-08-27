import React, { useState } from "react";
import { X } from "lucide-react";

export function AuthModal({ isOpen, onClose, onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin?.({ email, name: name || "User", role: "customer" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
          <h2 className="text-lg font-bold text-[#17181A]">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#17181A]/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-[#17181A]/80 uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F7F6F2] border border-black/10 rounded-lg px-3.5 py-2.5 text-sm text-[#17181A] outline-none focus:border-[#2E4CDB]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#17181A]/80 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F7F6F2] border border-black/10 rounded-lg px-3.5 py-2.5 text-sm text-[#17181A] outline-none focus:border-[#2E4CDB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17181A]/80 uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F7F6F2] border border-black/10 rounded-lg px-3.5 py-2.5 text-sm text-[#17181A] outline-none focus:border-[#2E4CDB]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2E4CDB] hover:bg-[#233EC2] text-white py-2.5 rounded-lg text-sm font-medium transition-colors mt-2"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-[#2E4CDB] hover:underline bg-transparent border-none cursor-pointer font-medium"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}