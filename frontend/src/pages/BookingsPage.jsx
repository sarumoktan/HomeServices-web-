import React from "react";
import { BOOKINGS, SERVICES, STATUSES } from "../constants/data";

export function BookingsPage({ setShowChat, setShowMap, setReview, setBooking, PROVIDERS }) {
  return (
    <div className="max-w-[900px] mx-auto py-9 px-6 font-sans text-stone-900">
      <h2 className="font-extrabold text-[24px] mb-6 text-stone-900">
        My Bookings
      </h2>
      <div className="flex flex-col gap-3.5">
        {BOOKINGS.map((b) => {
          const st = STATUSES[b.status];
          const svc = SERVICES.find((s) => s.name === b.service);
          
          return (
            <div
              key={b.id}
              className="bg-white border border-stone-200 rounded-2xl p-0 overflow-hidden group hover:border-[#E8AE3F]/40 shadow-sm transition duration-200">
              
              {/* Top accent line */}
              <div 
                className="h-[3px] w-full" 
                style={{ background: svc?.grad || "linear-gradient(135deg, #E8AE3F 0%, #D97706 100%)" }} 
              />
              
              <div className="py-4 px-5">
                <div className="flex justify-between flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="font-extrabold text-[16px] text-stone-900">
                        {b.service}
                      </span>
                      <span
                        className="text-[11px] font-bold rounded-lg py-[3px] px-[11px] flex items-center gap-[5px]"
                        style={{
                          backgroundColor: st.bg,
                          color: st.color,
                        }}>
                        <span
                          className="w-[5px] h-[5px] rounded-full block"
                          style={{
                            backgroundColor: st.dot,
                            boxShadow: `0 0 5px ${st.dot}`,
                          }}
                        />
                        {st.label}
                      </span>
                    </div>
                    <div className="text-[13px] mb-1 text-stone-500">
                      Provider: <span className="font-semibold text-stone-900">{b.provider}</span>
                    </div>
                    <div className="text-[12px] text-stone-400">
                      {b.date} · {b.time} · {b.address}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-black text-[19px] bg-clip-text text-transparent bg-gradient-to-r from-[#E8AE3F] to-[#D97706]">
                      NPR {b.amount}
                    </div>
                    <div className="text-[11px] mt-0.5 text-stone-400">
                      {b.id}
                    </div>
                  </div>
                </div>

                {b.status === "completed" && (
                  <div className="mt-3.5 flex gap-2 flex-wrap">
                    <button
                      onClick={() => setReview(b.provider)}
                      className="rounded-[10px] py-[7px] px-4 text-[12px] cursor-pointer font-bold transition-opacity hover:opacity-90 bg-amber-500/10 border border-amber-500/25 text-amber-600">
                      Rate & Review
                    </button>
                    <button
                      onClick={() => setBooking(PROVIDERS.find((p) => p.name === b.provider) || PROVIDERS[0])}
                      className="rounded-[10px] py-[7px] px-4 text-[12px] cursor-pointer font-bold transition-opacity hover:opacity-90 bg-orange-500/10 border border-orange-500/25 text-orange-600">
                      Book Again
                    </button>
                  </div>
                )}

                {b.status === "confirmed" && (
                  <div className="mt-3.5 flex gap-2 flex-wrap">
                    <button
                      onClick={() => setShowChat(true)}
                      className="rounded-[10px] py-[7px] px-4 text-[12px] cursor-pointer font-bold transition-opacity hover:opacity-90 bg-sky-500/10 border border-sky-500/25 text-sky-600">
                      Chat with Provider
                    </button>
                    <button
                      onClick={() => setShowMap(true)}
                      className="rounded-[10px] py-[7px] px-4 text-[12px] cursor-pointer font-bold transition-opacity hover:opacity-90 bg-emerald-500/10 border border-emerald-500/25 text-emerald-600">
                      Track Live
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}