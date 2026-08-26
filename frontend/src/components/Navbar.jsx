import React from "react";
import { MapPin, ChevronDown, UserRound } from "lucide-react";

export function Navbar({ page, loggedIn, onLogout, onNavigate, userType }) {
  return (
    <header className="h-[48px] bg-[#F7F6F2] border-b border-black/5 flex items-center justify-between px-[41px] sticky top-0 z-50">
      {/* Left: Logo */}
      <div 
        onClick={() => onNavigate("home")} 
        className="cursor-pointer flex items-center text-[25px] tracking-tight font-bold select-none"
      >
        <span className="text-[#E8AE3F]">Home</span>
        <span className="text-[#17181A]">Service</span>
      </div>

      {/* Right: Provider link, Location selector, Profile button */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => onNavigate("auth")}
          className="text-[12px] font-normal text-[#17181A] hover:opacity-75 transition-opacity bg-transparent border-none cursor-pointer"
        >
          Become a Provider
        </button>

        <div className="w-[181px] h-[31px] bg-white border border-black/10 rounded-[6px] shadow-xs flex items-center justify-between px-2.5 text-[13px] text-[#17181A] cursor-pointer">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#17181A]/60 shrink-0" />
            <span className="truncate font-medium">Kathmandu</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#17181A]/60 shrink-0" />
        </div>

        <button
          onClick={() => {
            if (loggedIn) {
              if (userType === "admin") onNavigate("admin");
              else if (userType === "provider") onNavigate("provider");
              else onNavigate("profile");
            } else {
              onNavigate("auth");
            }
          }}
          className="w-[35px] h-[35px] rounded-full bg-[#F4F3EE] border border-black/5 flex items-center justify-center text-[#17181A]/80 hover:bg-[#EAE8E1] transition-colors cursor-pointer"
          title={loggedIn ? "Profile / Dashboard" : "Sign In"}
        >
          <UserRound className="w-[18px] h-[18px]" />
        </button>
      </div>
    </header>
  );
}