import React, { useState, useEffect, useCallback } from "react";
import { SERVICES } from "../constants/data";
import { SearchFilter } from "../components/SearchFilter";
import { ProviderCard } from "../components/ProviderCard";

export function ServicesPage({
  filter,
  setFilter,
  search,
  setSearch,
  setShowChat,
  setSelectedChatProvider,
  setBooking,
  loggedIn,
  onNavigate,
  setShowMap,
}) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProviders = useCallback(async () => {
    let apiProviders = [];
    try {
      const response = await fetch('http://localhost:5000/api/providers');
      const result = await response.json();
      if (result.success && result.data) {
        apiProviders = result.data.filter(
          (p) => p.name !== "Rajesh Kumar" && p.name !== "Hari bahadur" && p.name !== "Ramesh Chhetri" && p.name !== "Basanta Rai"
        );
      }
    } catch (error) {
      console.error("Backend fetch failed, relying on LocalStorage:", error);
    }
    
    // Retrieve dynamic items saved from CompleteProfileModal
    const savedProviders = JSON.parse(localStorage.getItem('dynamic_providers') || '[]');
    
    // Prioritize locally registered providers
    setProviders([...savedProviders, ...apiProviders]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProviders();

    const handleUpdate = () => {
      loadProviders();
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('providerUpdated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('providerUpdated', handleUpdate);
    };
  }, [loadProviders]);

  const filtered = providers.filter((p) => {
    const matchesFilter = filter === "All" || 
      (p.service && p.service.toLowerCase() === filter.toLowerCase()) || 
      (p.category && p.category.toLowerCase() === filter.toLowerCase());

    const matchesSearch = !search ||
      (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
      (p.service && p.service.toLowerCase().includes(search.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#F7F6F2] py-[42px] px-6 font-sans">
      <div className="w-full max-w-[1280px] mx-auto rounded-[32px] shadow-[0_28px_80px_rgba(15,23,42,0.08)] bg-white p-6">
        
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          services={SERVICES}
          onMapClick={() => setShowMap(true)}
        />

        <div className="text-[#5C6370] text-[13px] mb-[18px] font-medium">
          {loading ? "Loading providers..." : `${filtered.length} providers found`}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
          {filtered.map((p) => {
            const svc = SERVICES.find((s) => s.name === p.service || s.name === p.category);
            return (
              <ProviderCard
                key={p.id || p._id}
                provider={p}
                service={svc}
                loggedIn={loggedIn}
                onNavigate={onNavigate}
                onChatClick={() => {
                  if (typeof setSelectedChatProvider === 'function') {
                    setSelectedChatProvider(p);
                  }
                  setShowChat(true);
                }}
                onBookNow={(providerData) => setBooking(providerData)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}