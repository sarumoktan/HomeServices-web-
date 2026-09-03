import React, { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown, UserRound, Calendar, User, LogOut } from "lucide-react";

export function Navbar({ page, loggedIn, onLogout, onNavigate, userType, setUserType, currentUser }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (!loggedIn) {
      if (setUserType) setUserType("user"); 
      onNavigate("auth");
    } else {
      if (userType === "user") {
        setShowDropdown((prev) => !prev);
      } else {
        if (userType === "admin") onNavigate("admin");
        else if (userType === "provider") onNavigate("provider-dash");
      }
    }
  };

  return (
    <header className="h-[48px] bg-[#F7F6F2] border-b border-black/5 flex items-center justify-between px-[41px] sticky top-0 z-50">
      <div 
        onClick={() => {
          if (setUserType) setUserType("user"); 
          onNavigate("home");
        }} 
        className="cursor-pointer flex items-center text-[25px] tracking-tight font-bold select-none"
      >
        <span className="text-[#E8AE3F]">Home</span>
        <span className="text-[#17181A]">Service</span>
      </div>

      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        <button
          onClick={() => {
            if (setUserType) setUserType("provider");
            onNavigate("become-provider");
          }}
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

        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="w-[35px] h-[35px] rounded-full bg-[#F4F3EE] border border-black/5 flex items-center justify-center text-[#17181A]/80 hover:bg-[#EAE8E1] transition-colors cursor-pointer"
            title={loggedIn ? "Profile / Dashboard" : "Sign In"}
          >
            <UserRound className="w-[18px] h-[18px]" />
          </button>

          {loggedIn && showDropdown && userType === "user" && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-black/10 rounded-xl shadow-lg py-2 z-50 text-stone-800">
              <div className="px-4 py-2 border-b border-gray-100 text-sm font-medium text-gray-500">
                Hello {currentUser?.name || "simple"}
              </div>

              <button
                onClick={() => {
                  setShowDropdown(false);
                  onNavigate("bookings");
                }}
                className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-stone-600" />
                <span>My Bookings</span>
              </button>

              <button
                onClick={() => {
                  setShowDropdown(false);
                  onNavigate("profile");
                }}
                className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-stone-600" />
                <span>My Profile</span>
              </button>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={() => {
                  setShowDropdown(false);
                  onLogout();
                }}
                className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}