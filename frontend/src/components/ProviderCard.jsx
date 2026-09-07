import React from "react";
import { Star, MessageCircle, Calendar } from "lucide-react";

export function ProviderCard({
  provider,
  service,
  loggedIn,
  onNavigate,
  onChatClick,
  onBookNow,
}) {
  const handleChatAction = () => {
    if (!loggedIn) {
      onNavigate("auth");
      return;
    }
    if (onChatClick) onChatClick();
  };

  const handleBookAction = () => {
    if (!loggedIn) {
      onNavigate("auth");
      return;
    }
    if (onBookNow) onBookNow(provider);
  };

  return (
    <div className="bg-white rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-all p-4 flex flex-col justify-between">
      <div>
        {/* Provider Image / Gradient Header */}
        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-stone-100 mb-4">
          {provider.image ? (
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center text-white text-xl font-bold ${
                provider.grad || "bg-gradient-to-br from-[#2E4CDB] to-[#1d35a6]"
              }`}
            >
              {provider.initials || "DP"}
            </div>
          )}
        </div>

        {/* Provider Info Row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-sm text-stone-800 shrink-0 border border-stone-200">
            {provider.initials || provider.name?.slice(0, 2).toUpperCase() || "DP"}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-sm text-[#17181A] truncate">
              {provider.name}
            </h4>
            <p className="text-xs text-[#17181A]/60 truncate">
              {provider.service || provider.category}
            </p>
          </div>
        </div>

        {/* Rating Section */}
        <div className="flex items-center gap-1.5 mb-3 text-xs">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-bold text-[#17181A]">
            {provider.rating || 5.0}
          </span>
          <span className="text-[#17181A]/50">
            • {provider.reviews || 0} reviews
          </span>
        </div>

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-[#17181A]">
              NPR {provider.price || provider.hourlyRate || 150}
            </span>
            <span className="text-xs text-[#17181A]/60">/hr</span>
          </div>
        </div>
      </div>

      {/* Button Area (Side-by-side layout) */}
      <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
        <button
          onClick={handleChatAction}
          className="flex-1 flex items-center justify-center gap-1.5 border border-[#2E4CDB] text-[#2E4CDB] hover:bg-blue-50 py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Chat
        </button>
        <button
          onClick={handleBookAction}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#00A86B] hover:bg-[#00965E] text-white py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5" />
          Book Now
        </button>
      </div>
    </div>
  );
}