import React, { useState, useEffect, useCallback } from "react";
import { SERVICES } from "../constants/data";
import { ProviderCard } from "../components/ProviderCard";
import { getMyBookings, cancelBooking } from "../services/booking.api"; // <-- confirm this path once BookingModal.jsx tells us the real API-file location

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
  
  const [activeTab, setActiveTab] = useState("browse");

  const [selectedSubCategory, setSelectedSubCategory] = useState("Plumbing");
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

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

 
  // NEW: My Bookings panel state + logic
  
  const [myBookings, setMyBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const loadMyBookings = useCallback(async () => {
    setBookingsLoading(true);
    setBookingsError(null);
    try {
      const res = await getMyBookings();
      setMyBookings(res.data || []);
    } catch (err) {
      setBookingsError(err?.data?.message || err?.message || 'Failed to load your bookings');
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "my-bookings") {
      loadMyBookings();
    }
  }, [activeTab, loadMyBookings]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;
    setCancellingId(bookingId);
    try {
      await cancelBooking(bookingId);
      setMyBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))
      );
    } catch (err) {
      alert(err?.data?.message || err?.message || "Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  const statusBadgeClass = (status) =>
    status === "cancelled"
      ? "bg-gray-200 text-gray-600"
      : status === "completed"
      ? "bg-green-100 text-green-700"
      : status === "confirmed"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="w-full min-h-screen bg-[#F7F6F2] py-[42px] px-6 font-sans">
      {/* Breadcrumb navigation */}
      <div className="w-full max-w-[1280px] mx-auto mb-4 text-xs text-[#5C6370]">
        Home / Home Repairs / <span className="text-[#17181A] font-semibold">View Service</span>
      </div>

      {/* NEW: tab toggle */}
      <div className="w-full max-w-[1280px] mx-auto mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab("browse")}
          className={`px-4 py-2 rounded-full text-sm font-semibold border-none cursor-pointer transition-colors ${
            activeTab === "browse"
              ? "bg-[#FF6B35] text-white"
              : "bg-white text-[#5C6370] border border-black/10"
          }`}
        >
          Browse Providers
        </button>
        <button
          onClick={() => setActiveTab("my-bookings")}
          className={`px-4 py-2 rounded-full text-sm font-semibold border-none cursor-pointer transition-colors ${
            activeTab === "my-bookings"
              ? "bg-[#FF6B35] text-white"
              : "bg-white text-[#5C6370] border border-black/10"
          }`}
        >
          My Bookings
        </button>
      </div>

      {activeTab === "browse" && (
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
      )}

      {/* NEW: My Bookings panel */}
      {activeTab === "my-bookings" && (
        <div className="w-full max-w-[1280px] mx-auto bg-white border border-black/10 rounded-[32px] shadow-[0_28px_80px_rgba(15,23,42,0.08)] p-6 min-h-[500px]">
          <h2 className="font-extrabold text-[24px] text-[#17181A] mb-6 tracking-tight">
            My Bookings
          </h2>

          {bookingsLoading && (
            <div className="py-16 text-center text-stone-400 text-sm">Loading your bookings...</div>
          )}

          {!bookingsLoading && bookingsError && (
            <div className="py-16 text-center text-red-500 text-sm">{bookingsError}</div>
          )}

          {!bookingsLoading && !bookingsError && myBookings.length === 0 && (
            <div className="py-16 text-center text-stone-400 text-sm">
              You haven't made any bookings yet.
            </div>
          )}

          {!bookingsLoading && !bookingsError && myBookings.length > 0 && (
            <div className="flex flex-col gap-4">
              {myBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-black/10 rounded-2xl p-4 flex justify-between items-start"
                >
                  <div>
                    <p className="font-semibold text-[#17181A]">
                      {booking.service?.title || "Service"} —{" "}
                      {[booking.provider?.firstName, booking.provider?.lastName]
                        .filter(Boolean)
                        .join(" ") || "Provider"}
                    </p>
                    <p className="text-sm text-[#5C6370] mt-1">
                      {booking.bookingDate} · {booking.timeSlot}
                    </p>
                    <p className="text-sm text-[#5C6370]">{booking.serviceAddress}</p>
                    {booking.specialInstructions && (
                      <p className="text-sm text-stone-400 mt-1">Note: {booking.specialInstructions}</p>
                    )}
                    <span
                      className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium ${statusBadgeClass(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {(booking.status === "pending" || booking.status === "confirmed") && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="text-sm text-red-500 hover:underline disabled:opacity-50 bg-transparent border-none cursor-pointer"
                    >
                      {cancellingId === booking.id ? "Cancelling..." : "Cancel"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}