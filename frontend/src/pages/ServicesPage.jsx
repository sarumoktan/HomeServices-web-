import React from "react";
import { T } from "../constants/theme";
import { SERVICES, PROVIDERS } from "../constants/data";
import { Avatar } from "../components/Avatar";
import { StarRow } from "../components/StarRow";

export function ServicesPage({
  filter,
  setFilter,
  search,
  setSearch,
  setShowChat,
  setBooking,
  loggedIn,
  onNavigate,
  setShowMap,
}) {
  const filtered = PROVIDERS.filter(
    (p) =>
      (filter === "All" || p.service === filter) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.service.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full min-h-screen bg-[#F7F6F2] py-[42px] px-6 font-sans">
      <div className="w-full max-w-[1280px] mx-auto rounded-[32px] shadow-[0_28px_80px_rgba(15,23,42,0.08)] bg-white p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
          <h2 className="font-extrabold text-[28px] text-[#17181A] m-0 tracking-tight">
            Find a Provider
          </h2>
          <button
            onClick={() => setShowMap(true)}
            className="flex items-center gap-2 bg-gradient-to-br from-[#FF6B35] via-[#F7931E] to-[#FFD23F] border-none rounded-[18px] py-3 px-[18px] text-white font-bold cursor-pointer transition-transform hover:scale-[1.02] shadow-sm"
          >
            Map View
          </button>
        </div>

        {/* Search Input */}
        <div className="flex gap-2.5 mb-4 flex-wrap items-center">
          <input
            placeholder="Search providers or services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-[1_1_220px] w-auto mb-0 bg-white border border-[#17181A]/12 rounded-2xl py-3.5 px-4 text-[#17181A] text-sm outline-none shadow-[0_8px_24px_rgba(15,23,42,0.06)] focus:border-[#FF6B35]/50 transition"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex gap-2 flex-wrap mb-6">
          {["All", ...SERVICES.map((s) => s.name)].map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-[22px] py-1.5 px-4 text-xs cursor-pointer transition-all border ${
                  isActive
                    ? "bg-[#FF6B35] border-transparent text-white font-bold shadow-sm"
                    : "bg-white/5 border-white/10 text-[#5C6370] font-normal hover:bg-stone-50"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="text-[#5C6370] text-[13px] mb-[18px] font-medium">
          {filtered.length} providers found
        </div>

        {/* Provider Cards Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
          {filtered.map((p) => {
            const svc = SERVICES.find((s) => s.name === p.service);
            return (
              <div
                key={p.id}
                className="bg-white border border-[#17181A]/12 rounded-[28px] p-0 overflow-hidden transition-all duration-200 shadow-[0_20px_50px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:border-[#FF6B35]/30 group"
              >
                {/* Accent Top Bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: svc?.grad || "linear-gradient(135deg,#FF6B35 0%,#F7931E 40%,#FFD23F 100%)" }}
                />

                <div className="p-[22px]">
                  {/* Provider Info Header */}
                  <div className="flex gap-3 mb-3.5 flex-wrap">
                    <Avatar initials={p.initials} gradient={p.grad} size={52} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-[#17181A] text-[15px] tracking-tight">
                          {p.name}
                        </span>
                        {p.verified && (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Verified
                          </span>
                        )}
                      </div>
                      
                      <div className="text-[#5C6370] text-xs my-1">
                        {p.service} &bull; {p.distance}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <StarRow rating={p.rating} />
                        <span className="text-xs text-[#5C6370] font-medium">
                          {p.rating} &bull; {p.reviews} reviews
                        </span>
                      </div>
                    </div>

                    {/* Status and Jobs */}
                    <div className="min-w-[110px]">
                      <div
                        className={`flex items-center gap-1.5 rounded-[10px] py-[5px] px-[11px] mb-1.5 ${
                          p.available ? "bg-[#38ef7d]/12" : "bg-[#17181A]/6"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            p.available ? "bg-[#16A34A]" : "bg-[#9CA3AF]"
                          }`}
                        />
                        <span
                          className={`text-[11px] font-bold ${
                            p.available ? "text-[#16A34A]" : "text-[#6B7280]"
                          }`}
                        >
                          {p.available ? "Available" : "Busy"}
                        </span>
                      </div>
                      <div className="text-[#6B7280] text-[11px] text-center font-medium">
                        {p.jobs}+ jobs
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Bio */}
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-[18px]">
                    <div>
                      <span className="font-black text-[20px] bg-gradient-to-br from-[#FF6B35] via-[#F7931E] to-[#FFD23F] bg-clip-text text-transparent">
                        NPR {p.price}
                      </span>
                      <span className="text-[#6B7280] text-xs ml-1 font-medium">
                        /hr
                      </span>
                    </div>
                    <span className="text-[#6B7280] text-xs italic flex-[1_1_140px] truncate">
                      "{p.bio}"
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2.5 flex-wrap">
                    <button
                      onClick={() => setShowChat(true)}
                      className="flex-1 py-3 px-3.5 text-sm bg-[#F3F3F5] border border-[#17181A]/12 rounded-2xl text-[#17181A] cursor-pointer font-bold hover:bg-stone-200/60 transition"
                    >
                      Chat
                    </button>
                    <button
                      onClick={() => (loggedIn ? setBooking(p) : onNavigate("auth"))}
                      disabled={!p.available && loggedIn}
                      className={`flex-[3] w-auto border-none rounded-2xl py-3 px-3.5 font-bold text-sm transition shadow-sm ${
                        p.available
                          ? "bg-gradient-to-br from-[#FF6B35] via-[#F7931E] to-[#FFD23F] text-white cursor-pointer hover:opacity-95"
                          : "bg-[#E5E7EB] text-[#5C6370] cursor-not-allowed"
                      }`}
                    >
                      {p.available ? "Book Now →" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}