import React, { useState } from "react";
import { X, Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { SERVICES } from "../../constants/data";

export function BookingModal({ provider, service, onClose, onConfirm }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceName = service || provider?.service;
    const matchedService = SERVICES.find(
      (s) => s.name.toLowerCase() === (serviceName || "").toLowerCase()
    );

    if (!matchedService) {
      alert(
        `Could not match "${serviceName}" to a known service. Please contact support.`
      );
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          providerId: provider.id,
          serviceId: matchedService.id,
          bookingDate: date,
          timeSlot: time,
          serviceAddress: address,
          specialInstructions: notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          onConfirm?.(data.data);
          onClose();
        }, 1200);
      } else {
        alert(data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Connection error. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
          <h2 className="text-lg font-bold text-[#17181A]">Book Service</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#17181A]/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 animate-bounce" />
            <h3 className="text-xl font-bold text-[#17181A]">Booking Confirmed!</h3>
            <p className="text-sm text-[#17181A]/70">Your provider has been notified and will arrive on schedule.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {provider && (
              <div className="bg-[#F7F6F2] p-3.5 rounded-xl border border-black/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2E4CDB]/10 text-[#2E4CDB] flex items-center justify-center font-bold">
                  {provider.name?.[0] || "P"}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#17181A]">{provider.name}</h4>
                  <p className="text-xs text-[#17181A]/60">{service || provider.service || "Professional Service"}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#17181A]/80 uppercase tracking-wider mb-1.5">Date</label>
              <div className="flex items-center bg-[#F7F6F2] border border-black/10 rounded-lg px-3 py-2">
                <Calendar className="w-4 h-4 text-[#17181A]/40 mr-2 shrink-0" />
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-sm text-[#17181A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17181A]/80 uppercase tracking-wider mb-1.5">Time Slot</label>
              <div className="flex items-center bg-[#F7F6F2] border border-black/10 rounded-lg px-3 py-2">
                <Clock className="w-4 h-4 text-[#17181A]/40 mr-2 shrink-0" />
                <select
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-sm text-[#17181A]"
                >
                  <option value="">Select a time slot</option>
                  <option value="08:00-10:00">08:00 AM - 10:00 AM</option>
                  <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
                  <option value="12:00-14:00">12:00 PM - 02:00 PM</option>
                  <option value="14:00-16:00">02:00 PM - 04:00 PM</option>
                  <option value="16:00-18:00">04:00 PM - 06:00 PM</option>
                  <option value="18:00-20:00">06:00 PM - 08:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17181A]/80 uppercase tracking-wider mb-1.5">Service Address</label>
              <div className="flex items-center bg-[#F7F6F2] border border-black/10 rounded-lg px-3 py-2">
                <MapPin className="w-4 h-4 text-[#17181A]/40 mr-2 shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="Enter full address in Kathmandu"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-sm text-[#17181A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17181A]/80 uppercase tracking-wider mb-1.5">Special Instructions (Optional)</label>
              <textarea
                rows="2"
                placeholder="Gate code, specific issues, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#F7F6F2] border border-black/10 rounded-lg p-3 text-sm text-[#17181A] outline-none resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#17181A]/70 hover:bg-black/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#2E4CDB] hover:bg-[#233EC2] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}