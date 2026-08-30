import React from "react";
import { Star, MessageSquare } from "lucide-react";

export function ProviderCard({ provider, service, onChatClick, onBookNow }) {
  const p = provider || {};
  const svc = service || {};

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
      {/* Top status indicator */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
            {p.name ? p.name.slice(0, 2).toUpperCase() : "HS"}
          </div>
          <div>
            <h3 className="font-bold text-lg text-stone-900">{p.name || "Rajesh Kumar"}</h3>
            {p.verified && (
              <span className="inline-block bg-emerald-50 text-emerald-600 text-xs px-2 py-0.5 rounded-md font-medium mt-0.5">Verified</span>
            )}
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 ${p.available ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>
          <span className={`w-2 h-2 rounded-full ${p.available ? "bg-emerald-500 animate-pulse" : "bg-stone-400"}`}></span> 
          {p.available ? "Available" : "Busy"}
        </span>
      </div>

      {/* Service and distance info */}
      <p className="text-stone-600 text-sm mb-2 font-medium">{p.service || svc.name || "General"} • {p.distance || "1.2 km away"}</p>
      
      {/* Rating */}
      <div className="flex items-center gap-1 text-sm text-stone-700 mb-4">
        <span className="font-bold text-stone-900">{p.rating || "4.9"}</span>
        <span className="text-amber-400">★★★★★</span>
        <span className="text-stone-400 text-xs">({p.reviews || 312} reviews)</span>
      </div>

      {/* Pricing */}
      <div className="mb-4">
        <span className="text-2xl font-black text-orange-500">NPR {p.price || 350}</span>
        <span className="text-stone-500 text-sm"> /hr</span>
      </div>

      <p className="text-xs text-stone-500 italic mb-5">"{p.bio || "10+ yrs • Licensed & insured"}"</p>

      {/* Action Buttons: Chat & Book Now */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onChatClick && onChatClick(p)}
          className="flex-1 py-2.5 px-4 rounded-xl border border-stone-200 text-stone-800 font-semibold hover:bg-stone-50 transition-colors cursor-pointer text-sm"
        >
          Chat
        </button>
        <button 
          onClick={() => onBookNow && onBookNow(p)}
          disabled={!p.available}
          className={`flex-1 py-2.5 px-4 rounded-xl text-white font-semibold shadow-md transition-opacity text-sm ${
            p.available !== false 
              ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 cursor-pointer" 
              : "bg-stone-300 cursor-not-allowed"
          }`}
        >
          {p.available !== false ? "Book Now →" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}