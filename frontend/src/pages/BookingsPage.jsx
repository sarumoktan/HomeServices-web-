import React, { useState, useEffect, useCallback } from "react";
import { SERVICES } from "../constants/data";
import { ProviderCard } from "../components/ProviderCard";

// === FIXED: aligned with the real categories used across the app
// (ServicesPage / BecomeProvider) instead of a mismatched static list
// like "Air Conditioning" / "Housekeeping and Cleaning" that never
// matched any real provider's category. ===
const subCategories = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Cleaning",
  "Tutoring",
  "Painting",
  "Gardening",
  "AC Repair",
];

export function BookingsPage({ setShowChat, setShowMap, setReview, setBooking }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState("Plumbing");
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  // === FIXED: pulls from the real backend (same endpoint ServicesPage
  // uses) instead of a static, disconnected PROVIDERS constant. ===
  const loadProviders = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/providers');
      const result = await response.json();
      if (result.success && result.data) {
        setProviders(result.data);
      } else {
        setProviders([]);
      }
    } catch (error) {
      console.error("Failed to load providers from backend:", error);
      setProviders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProviders();

    const handleUpdate = () => loadProviders();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('providerUpdated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('providerUpdated', handleUpdate);
    };
  }, [loadProviders]);

  const filteredProviders = providers.filter((p) => {
    const target = selectedSubCategory.trim().toLowerCase();
    const pService = (p.service || "").trim().toLowerCase();
    const pCategory = (p.category || "").trim().toLowerCase();
    return pService === target || pCategory === target;
  });

  return (
    <div className="w-full min-h-screen bg-[#F7F6F2] py-[42px] px-6 font-sans">
      {/* Breadcrumb navigation */}
      <div className="w-full max-w-[1280px] mx-auto mb-4 text-xs text-[#5C6370]">
        Home / Home Repairs / <span className="text-[#17181A] font-semibold">View Service</span>
      </div>

      <div className="w-full max-w-[1280px] mx-auto flex gap-6 items-start">
        {/* Left sidebar containing the sub-categories list */}
        <div className="w-[260px] bg-white border border-black/10 rounded-[24px] p-6 shadow-sm shrink-0">
          <div className="text-[11px] font-bold text-[#5C6370] tracking-wider mb-4">
            SUB CATEGORIES
          </div>
          <div className="flex flex-col gap-2">
            {subCategories.map((cat) => {
              const isActive = selectedSubCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedSubCategory(cat)}
                  className={`text-left py-2 px-3 rounded-xl text-sm font-medium transition-colors cursor-pointer border-none bg-transparent ${
                    isActive
                      ? "text-[#FF6B35] font-bold bg-[#FF6B35]/5"
                      : "text-[#5C6370] hover:text-[#17181A] hover:bg-stone-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right content area for providers */}
        <div className="flex-1 bg-white border border-black/10 rounded-[32px] shadow-[0_28px_80px_rgba(15,23,42,0.08)] p-6 min-h-[500px]">
          <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
            <h2 className="font-extrabold text-[24px] text-[#17181A] m-0 tracking-tight">
              {selectedSubCategory} Providers
            </h2>
          </div>

          <div className="text-[#5C6370] text-[13px] mb-[18px] font-medium">
            {loading ? "Loading providers..." : `${filteredProviders.length} providers found`}
          </div>

          {!loading && filteredProviders.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
              {filteredProviders.map((p) => {
                const svc = SERVICES.find((s) => s.name === p.service || s.name === p.category);
                return (
                  <ProviderCard
                    key={p.id}
                    provider={p}
                    service={svc}
                    loggedIn={true}
                    onChatClick={() => setShowChat(true)}
                    onBookNow={(providerData) => setBooking(providerData)}
                  />
                );
              })}
            </div>
          ) : !loading ? (
            <div className="py-16 text-center text-stone-400 text-sm">
              No providers available for {selectedSubCategory} at the moment.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}