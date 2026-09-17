import React from "react";

export function Footer({ onNavigate }) {
  return (
    //  Changed background color to black (bg-black) and text color to white/light gray
    <footer className="bg-black border-t border-white/10 text-white/90 py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center text-[22px] tracking-tight font-bold select-none">
            <span className="text-[#E8AE3F]">Home</span>
            {/* CHANGED HERE: Made "Service" text white for visibility */}
            <span className="text-white">Service</span>
          </div>
          {/* CHANGED HERE: Updated description text color for dark background */}
          <p className="text-xs text-white/70 leading-relaxed">
            Your trusted partner for home maintenance, repair, and cleaning services across Kathmandu.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-3">Quick Links</h4>
          {/* CHANGED HERE: Updated links text color and hover effect for dark background */}
          <ul className="space-y-2 text-xs text-white/70">
            <li><button onClick={() => onNavigate("home")} className="hover:text-[#E8AE3F] bg-transparent border-none cursor-pointer">Home</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-[#E8AE3F] bg-transparent border-none cursor-pointer">Explore Services</button></li>
            <li><button onClick={() => onNavigate("auth")} className="hover:text-[#E8AE3F] bg-transparent border-none cursor-pointer">Become a Provider</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-3">Categories</h4>
          {/* CHANGED HERE: Updated category items text color */}
          <ul className="space-y-2 text-xs text-white/70">
            <li>Plumbing & Electrical</li>
            <li>Deep House Cleaning</li>
            <li>Appliance Repair</li>
            <li>Carpentry & Painting</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-3">Contact</h4>
          {/* CHANGED HERE: Updated contact info text color */}
          <p className="text-xs text-white/70 leading-relaxed mb-2">
            Kathmandu, Nepal<br />
            support@homeservice.com.np
          </p>
          {/* CHANGED HERE: Adjusted phone color to match theme accent */}
          <p className="text-xs font-bold text-[#E8AE3F]">
            +977 1-4000000
          </p>
        </div>
      </div>

      {/* CHANGED HERE: Updated copyright and policy links colors for dark background */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50">
        <p>&copy; {new Date().getFullYear()} HomeService Nepal. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}