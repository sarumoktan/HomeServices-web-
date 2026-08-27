import React, { useState } from "react";
import { Overlay } from "../Overlay";
import { X, MapPin, Star, ArrowRight } from "lucide-react";

export function MapModal({ onClose }) {
  const [sel, setSel] = useState(null);
  const pins = [
    { id: 1, x: 37, y: 43, name: "Rajesh K.", service: "Plumber", price: 350, rating: 4.9 },
    { id: 2, x: 61, y: 31, name: "Sita S.", service: "Cleaner", price: 280, rating: 4.8 },
    { id: 3, x: 54, y: 57, name: "Arun T.", service: "Electrician", price: 400, rating: 4.7 },
    { id: 4, x: 27, y: 64, name: "Priya D.", service: "Tutor", price: 500, rating: 5.0 },
    { id: 5, x: 71, y: 51, name: "Bikram R.", service: "Painter", price: 320, rating: 4.6 },
  ];

  return (
    <Overlay>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[760px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2E4CDB] to-[#233EC2] px-5 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <MapPin className="w-5 h-5 text-[#E8AE3F]" />
            <span>Nearby Providers — Kathmandu</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
            aria-label="Close map"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row h-[420px]">
          
          {/* Map Area */}
          <div className="flex-1 relative bg-gradient-to-br from-[#06060F] to-[#0A0A22] overflow-hidden">
            <svg className="w-full h-full">
              {[...Array(14)].map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0"
                  y1={`${(i + 1) * 7}%`}
                  x2="100%"
                  y2={`${(i + 1) * 7}%`}
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              ))}
              {[...Array(14)].map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={`${(i + 1) * 7}%`}
                  y1="0"
                  x2={`${(i + 1) * 7}%`}
                  y2="100%"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              ))}
              {[
                [18, 22, 26, 3],
                [44, 17, 21, 3],
                [64, 24, 19, 3],
                [14, 39, 23, 3],
                [49, 37, 19, 3],
                [71, 37, 17, 3],
                [24, 57, 21, 3],
                [54, 54, 23, 3],
              ].map(([x, y, w, h], i) => (
                <rect
                  key={i}
                  x={`${x}%`}
                  y={`${y}%`}
                  width={`${w}%`}
                  height={`${h}%`}
                  rx="3"
                  fill="#1A1A3A"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.5"
                />
              ))}
              {[
                [0, 34, 100, 1],
                [0, 64, 100, 1],
                [43, 0, 1, 100],
                [65, 0, 1, 100],
              ].map(([x, y, w, h], i) => (
                <rect key={i} x={`${x}%`} y={`${y}%`} width={`${w}%`} height={`${h}%`} fill="#111128" />
              ))}
              <circle cx="45%" cy="45%" r="20" fill="rgba(79,172,254,0.1)" />
              <circle cx="45%" cy="45%" r="11" fill="rgba(79,172,254,0.22)" />
              <circle cx="45%" cy="45%" r="6" fill="#4facfe" />
              
              {pins.map((pin) => {
                const isSelected = sel?.id === pin.id;
                return (
                  <g 
                    key={pin.id} 
                    onClick={() => setSel(isSelected ? null : pin)} 
                    className="cursor-pointer"
                  >
                    <circle
                      cx={`${pin.x}%`}
                      cy={`${pin.y}%`}
                      r="22"
                      fill={isSelected ? "rgba(232,174,63,0.25)" : "rgba(255,255,255,0.04)"}
                    />
                    <circle
                      cx={`${pin.x}%`}
                      cy={`${pin.y}%`}
                      r="14"
                      fill={isSelected ? "#E8AE3F" : "#1E1E40"}
                      stroke={isSelected ? "#E8AE3F" : "rgba(255,255,255,0.2)"}
                      strokeWidth="1.5"
                    />
                    <text
                      x={`${pin.x}%`}
                      y={`${pin.y + 0.6}%`}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="9"
                      fontWeight="700"
                    >
                      {pin.service.slice(0, 4)}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Selected Pin Popup Card */}
            {sel && (
              <div className="absolute bottom-3.5 left-3 right-3 bg-[#0F0F23]/95 backdrop-blur-md border border-[#E8AE3F]/40 rounded-xl p-3.5 flex justify-between items-center shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div>
                  <div className="font-bold text-white text-sm">{sel.name}</div>
                  <div className="text-white/70 text-xs flex items-center gap-1.5 mt-0.5">
                    <span>{sel.service}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5 text-[#E8AE3F]">
                      <Star className="w-3 h-3 fill-current" /> {sel.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-[#E8AE3F] text-sm">
                    NPR {sel.price}/hr
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-1 bg-[#2E4CDB] hover:bg-[#233EC2] text-white px-3.5 py-1 rounded-lg text-xs font-bold transition-colors shadow-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Provider List */}
          <div className="w-full sm:w-[200px] border-t sm:border-t-0 sm:border-l border-black/10 bg-white overflow-y-auto max-h-[180px] sm:max-h-none">
            <div className="p-3 border-b border-black/5 text-xs font-bold text-[#17181A]/60 uppercase tracking-wider">
              5 Providers Nearby
            </div>
            {pins.map((pin) => {
              const isSelected = sel?.id === pin.id;
              return (
                <div
                  key={pin.id}
                  onClick={() => setSel(isSelected ? null : pin)}
                  className={`p-3 border-b border-black/5 cursor-pointer transition-colors ${
                    isSelected ? "bg-[#2E4CDB]/5 border-l-4 border-l-[#2E4CDB]" : "hover:bg-black/[02%]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[#E8AE3F] shrink-0" />
                    <div className="min-w-0">
                      <div className="font-bold text-[#17181A] text-xs truncate">{pin.name}</div>
                      <div className="text-[#17181A]/60 text-[11px] truncate">{pin.service}</div>
                      <div className="font-extrabold text-[#2E4CDB] text-[11px] mt-0.5">
                        NPR {pin.price}/hr
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </Overlay>
  );
}