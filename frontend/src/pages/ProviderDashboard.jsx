import React from "react";
import { Briefcase, DollarSign, Star, Clock } from "lucide-react";

export function ProviderDashboard() {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#17181A] py-8 px-6 max-w-[1280px] mx-auto space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold tracking-tight">Provider Dashboard</h1>
        <p className="text-sm text-[#17181A]/70 mt-1">
          Track your service requests, earnings, and client ratings.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E4CDB] flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Rs. 45,200</h3>
          <p className="text-xs font-semibold text-[#17181A]/60 uppercase tracking-wider">
            Total Earnings (This Month)
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#E8AE3F] flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">28</h3>
          <p className="text-xs font-semibold text-[#17181A]/60 uppercase tracking-wider">
            Completed Jobs
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">4.9</h3>
          <p className="text-xs font-semibold text-[#17181A]/60 uppercase tracking-wider">
            Average Rating
          </p>
        </div>
      </div>

      {/* Active Service Requests Section */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-[#17181A]">Active Service Requests</h3>
        
        <div className="space-y-3">
          <div className="p-4 bg-[#F7F6F2] rounded-xl border border-black/5 flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#17181A]">Deep Home Cleaning</span>
                <span className="px-2.5 py-0.5 bg-blue-100 text-[#2E4CDB] text-[10px] font-semibold rounded-full">
                  Confirmed
                </span>
              </div>
              <p className="text-xs text-[#17181A]/70 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Tomorrow, 10:00 AM • Lazimpat, Kathmandu
              </p>
            </div>
            
            <button className="bg-[#2E4CDB] hover:bg-[#233EC2] text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm">
              Start Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}