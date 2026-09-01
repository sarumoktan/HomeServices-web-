import React from "react";

export function ProviderCard({ provider, service, onChatClick, onBookNow, loggedIn, onNavigate }) {
  const p = provider || {};

  return (
    <div className="bg-white border border-black/10 rounded-[24px] p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between w-full">
      <div>
        {/* Top Service Image Banner */}
        <div className="w-full h-[160px] rounded-[16px] overflow-hidden mb-3.5 bg-stone-100">
          <img 
            src={p.image || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"} 
            alt={p.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Provider Profile Info & Verified Badge */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-stone-100 border border-black/5 flex items-center justify-center font-bold text-stone-700 text-xs shrink-0">
            {p.initials || "HS"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-stone-900 text-base truncate">{p.name}</h3>
              {p.verified && (
                <span className="bg-emerald-50 text-emerald-600 text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0">
                  Verified
                </span>
              )}
            </div>
            <p className="text-stone-500 text-xs truncate">
              {p.service} &bull; {p.distance}
            </p>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-stone-700 mb-3">
          <span className="text-emerald-600 font-bold">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <span className="font-bold text-stone-900">{p.rating}</span>
          <span className="text-stone-400">&bull; {p.reviews} reviews</span>
        </div>

        {/* Pricing and Experience/Bio */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-extrabold text-stone-900 text-lg">NPR {p.price}</span>
            <span className="text-stone-500 text-xs">/hr</span>
            <span className="text-stone-400 text-xs ml-auto italic truncate max-w-[150px]">"{p.bio}"</span>
          </div>
        </div>
      </div>

      {/* Action Button: Green Book Now */}
      <button 
        onClick={() => (loggedIn ? onBookNow(p) : onNavigate("auth"))}
        disabled={!p.available && loggedIn}
        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors cursor-pointer"
      >
        Book Now
      </button>
    </div>
  );
}