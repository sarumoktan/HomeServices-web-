import React from "react";
import { T } from "../constants/theme";
import { SERVICES, PROVIDERS, BOOKINGS, STATUSES } from "../constants/data";
import { SvcIcon } from "../components/SvcIcon";
import { Avatar } from "../components/Avatar";

export function AdminDashboard({ adminTab, setAdminTab, pending, setPending }) {
  return (
    <div className="max-w-[1100px] mx-auto py-9 px-6 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-[46px] h-[46px] rounded-xl flex items-center justify-center text-[22px] bg-gradient-to-br from-amber-400 to-amber-600 shadow-sm text-white">
          ⚙
        </div>
        <div>
          <div className="font-bold text-[20px] text-stone-900 tracking-tight">
            Admin Dashboard
          </div>
          <div className="text-[13px] text-stone-500">
            ServiHub Operations · Kathmandu
          </div> 
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5 mb-7">
        {[
          ["12,483", "Total Users", "+8.2%"],
          ["1,247", "Providers", "+3.1%"],
          ["348", "Bookings Today", "+12.5%"],
          ["4,82,900", "Revenue NPR", "+5.8%"],
        ].map(([v, l, chg]) => (
          <div key={l} className="bg-white border border-stone-200 rounded-2xl p-[18px] relative overflow-hidden shadow-sm">
            <div className="text-[12px] mb-2 text-stone-500 font-medium">
              {l}
            </div>
            <div className="font-black text-[22px] mb-1.5 text-stone-900 tracking-tight">
              {v}
            </div>
            <div className="text-[12px] font-bold text-emerald-600">
              {chg} this week
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-5">
        {[
          ["overview", "Overview"],
          ["users", "Users"],
          ["providers", "Providers"],
          ["bookings", "Bookings"],
        ].map(([t, l]) => {
          const isActive = adminTab === t;
          return (
            <button
              key={t}
              onClick={() => setAdminTab(t)}
              className={`rounded-xl py-2 px-[18px] cursor-pointer text-[13px] transition-all border ${
                isActive
                  ? "bg-[#E8AE3F] border-[#E8AE3F] text-white font-bold shadow-sm"
                  : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 font-normal"
              }`}
            >
              {l}
            </button>
          );
        })}
      </div>

      {/* Overview Tab Content */}
      {adminTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Service Distribution */}
          <div className="bg-white border border-stone-200 rounded-2xl p-[22px] shadow-sm">
            <div className="font-bold text-[15px] mb-[18px] flex items-center gap-2 text-stone-900">
              <span className="w-[3px] h-4 rounded-[2px] block bg-[#E8AE3F]" />
              Service Distribution
            </div>
            {SERVICES.map((sv) => (
              <div key={sv.id} className="mb-3">
                <div className="flex justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <SvcIcon type={sv.name} size={18} />
                    <span className="text-[12px] font-semibold text-stone-800">
                      {sv.name}
                    </span>
                  </div>
                  <span className="text-[12px] text-stone-500 font-medium">
                    {sv.count}
                  </span>
                </div>
                <div className="h-[5px] bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#E8AE3F]"
                    style={{
                      width: `${(sv.count / 215) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pending Approvals */}
          <div className="bg-white border border-stone-200 rounded-2xl p-[22px] shadow-sm">
            <div className="font-bold text-[15px] mb-[18px] flex items-center gap-2 text-stone-900">
              <span className="w-[3px] h-4 rounded-[2px] block bg-red-500" />
              Pending Approvals
              {pending.length > 0 && (
                <span className="text-[11px] font-extrabold rounded-full py-0.5 px-2 bg-red-50 text-red-500">
                  {pending.length}
                </span>
              )}
            </div>
            {pending.map((p) => (
              <div
                key={p.id}
                className="bg-stone-50 border border-stone-100 rounded-xl py-[13px] px-[14px] mb-2.5"
              >
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <div className="font-bold text-[13px] text-stone-900">
                      {p.name}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {p.service} · Joined {p.joined}
                    </div>
                    {!p.docs && (
                      <span className="text-[10px] font-bold rounded-md py-0.5 px-2 mt-1 inline-block bg-amber-50 text-amber-600 border border-amber-200/50">
                        Docs Missing
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setPending((prev) => prev.filter((x) => x.id !== p.id))}
                      className="border-none rounded-lg py-1 px-3 text-[12px] cursor-pointer font-extrabold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setPending((prev) => prev.filter((x) => x.id !== p.id))}
                      className="rounded-lg py-1 px-3 text-[12px] cursor-pointer bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 font-semibold transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {pending.length === 0 && (
              <div className="text-[13px] text-center py-5 text-stone-400 font-medium">
                All providers reviewed
              </div>
            )}
          </div>
        </div>
      )}

      {/* Providers Tab Content */}
      {adminTab === "providers" && (
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  {["Provider", "Service", "Rating", "Jobs", "Status", "Action"].map((h) => (
                    <th
                      key={h}
                      className="py-3 px-4 text-left text-[12px] font-semibold text-stone-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROVIDERS.map((p) => (
                  <tr key={p.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={p.initials} gradient={p.grad} size={32} />
                        <span className="font-semibold text-[13px] text-stone-900">
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[12px] text-stone-600">
                      {p.service}
                    </td>
                    <td className="py-3 px-4 font-bold text-[13px] text-amber-500">
                      ★ {p.rating}
                    </td>
                    <td className="py-3 px-4 text-[13px] text-stone-800 font-medium">
                      {p.jobs}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-bold rounded-lg py-[3px] px-2.5 ${
                          p.verified
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50"
                            : "bg-amber-50 text-amber-600 border border-amber-200/50"
                        }`}
                      >
                        {p.verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg py-1 px-3 text-[11px] cursor-pointer text-stone-700 font-medium transition">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bookings Tab Content */}
      {adminTab === "bookings" && (
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  {["ID", "Service", "Provider", "Date", "Amount", "Status"].map((h) => (
                    <th
                      key={h}
                      className="py-3 px-4 text-left text-[12px] font-semibold text-stone-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BOOKINGS.map((b) => {
                  const st = STATUSES[b.status] || { bg: "bg-stone-100", color: "text-stone-600", label: b.status };
                  return (
                    <tr key={b.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition">
                      <td className="py-3 px-4 font-bold text-[12px] text-[#E8AE3F]">
                        {b.id}
                      </td>
                      <td className="py-3 px-4 text-[13px] text-stone-900 font-medium">
                        {b.service}
                      </td>
                      <td className="py-3 px-4 text-[12px] text-stone-500">
                        {b.provider}
                      </td>
                      <td className="py-3 px-4 text-[12px] text-stone-500">
                        {b.date}
                      </td>
                      <td className="py-3 px-4 font-bold text-[13px] text-stone-900">
                        NPR {b.amount}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="text-[11px] font-bold rounded-lg py-[3px] px-2.5 inline-block"
                          style={{
                            backgroundColor: st.bg,
                            color: st.color,
                          }}
                        >
                          {st.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}