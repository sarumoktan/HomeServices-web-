import React from "react";
import { SERVICES, PROVIDERS } from "../constants/data";
import { SearchFilter } from "../components/SearchFilter";
import { ProviderCard } from "../components/ProviderCard";

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
        
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          services={SERVICES}
          onMapClick={() => setShowMap(true)}
        />

        <div className="text-[#5C6370] text-[13px] mb-[18px] font-medium">
          {filtered.length} providers found
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
          {filtered.map((p) => {
            const svc = SERVICES.find((s) => s.name === p.service);
            return (
              <ProviderCard
                key={p.id}
                provider={p}
                service={svc}
                loggedIn={loggedIn}
                onNavigate={onNavigate}
                onChatClick={() => setShowChat(true)}
                onBookNow={(providerData) => setBooking(providerData)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}