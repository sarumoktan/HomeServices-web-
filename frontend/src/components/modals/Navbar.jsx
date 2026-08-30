import React, { useState } from 'react';
import { FiUser, FiCalendar, FiLogOut, FiMapPin } from 'react-icons/fi';

export function Navbar({ page, loggedIn, onLogout, onNavigate, userType }) {
  // 1. ADDED STATE: Controls whether the dropdown menu is open or closed
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo / Brand Name */}
        <div 
          onClick={() => onNavigate("home")} 
          className="text-2xl font-bold tracking-tight cursor-pointer text-stone-900"
        >
          Home<span className="text-[#e85d24]">Service</span>
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-6">
          <span className="text-stone-700 font-medium cursor-pointer hover:text-[#e85d24]">
            Become a Provider
          </span>

          {/* Location Selector */}
          <div className="flex items-center space-x-1 border border-stone-200 rounded-lg px-3 py-1.5 text-sm text-stone-700">
            <FiMapPin className="text-stone-400" />
            <span>Kathmandu</span>
          </div>

          {/* Profile Icon / Avatar Section */}
          <div className="relative">
            {loggedIn ? (
              // 2. CHANGED HERE: Clicking this profile button toggles the dropdown open/closed
              <div 
                onClick={() => setShowDropdown(!showDropdown)} 
                className="w-10 h-10 bg-stone-100 border border-stone-200 rounded-full flex items-center justify-center text-stone-600 cursor-pointer hover:bg-stone-200 transition"
              >
                <FiUser size={20} />
              </div>
            ) : (
              // Show login button if user is not logged in
              <button 
                onClick={() => onNavigate("auth")}
                className="bg-[#e85d24] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow hover:bg-opacity-90 transition"
              >
                Login
              </button>
            )}

            {/* 3. CHANGED HERE: The dropdown menu appears when showDropdown is true */}
            {showDropdown && loggedIn && (
              <div className="absolute right-0 mt-3 w-52 bg-white border border-stone-100 rounded-2xl shadow-xl py-2 z-50">
                
                {/* Greeting */}
                <div className="px-4 py-2.5 text-stone-500 font-medium text-sm border-b border-stone-100">
                  Hello simple
                </div>

                {/* My Bookings Option */}
                <button 
                  onClick={() => { setShowDropdown(false); onNavigate("bookings"); }} 
                  className="w-full text-left px-4 py-2.5 text-stone-800 hover:bg-stone-50 text-sm font-medium flex items-center space-x-2"
                >
                  <FiCalendar size={16} className="text-stone-400" />
                  <span>My Bookings</span>
                </button>

                {/* My Profile Option */}
                <button 
                  onClick={() => { setShowDropdown(false); onNavigate("profile"); }} 
                  className="w-full text-left px-4 py-2.5 text-stone-800 hover:bg-stone-50 text-sm font-medium flex items-center space-x-2"
                >
                  <FiUser size={16} className="text-stone-400" />
                  <span>My Profile</span>
                </button>

                {/* Logout Option */}
                <button 
                  onClick={() => { setShowDropdown(false); onLogout(); }} 
                  className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 text-sm font-medium flex items-center space-x-2 border-t border-stone-100"
                >
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </button>

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}