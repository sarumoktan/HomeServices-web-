import React from "react";

export function SearchFilter({ search, setSearch, filter, setFilter, services = [], onMapClick }) {
  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
        <h2 className="font-extrabold text-[28px] text-[#17181A] m-0 tracking-tight">
          Find a Provider
        </h2>
        <button
          onClick={onMapClick}
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
        {["All", ...services.map((s) => s.name)].map((f) => {
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
    </>
  );
}