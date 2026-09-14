import React, { useState, useEffect } from "react";
import { Briefcase, DollarSign, Star, Clock, MessageSquare } from "lucide-react";
import ChatModal from "../components/modals/ChatModal";

export function ProviderDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalEarnings: 45200,
    completedJobs: 28,
    averageRating: 4.9,
    activeRequests: [
      { id: 1, serviceName: "Deep Home Cleaning", status: "confirmed", schedule: "Tomorrow, 10:00 AM • Lazimpat, Kathmandu", clientId: 1, clientName: "Customer" }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/providers/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.success && result.data) {
          setDashboardData(result.data);
        }
      } catch (error) {
        console.error("Failed to load dashboard data from backend:", error);
      }
    };
    fetchDashboard();
  }, []);

  const handleStartJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/providers/jobs/${jobId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'in-progress' }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Job status updated to in-progress successfully!');
        window.location.reload(); 
      } else {
        alert(data.message || 'Failed to update job status.');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Connection error while updating status.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#17181A] py-8 px-6 max-w-[1280px] mx-auto space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-serif font-bold tracking-tight">Provider Dashboard</h1>
        <p className="text-sm text-[#17181A]/70 mt-1">
          Track your service requests, earnings, and client ratings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E4CDB] flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Rs. {dashboardData.totalEarnings?.toLocaleString()}</h3>
          <p className="text-xs font-semibold text-[#17181A]/60 uppercase tracking-wider">
            Total Earnings (This Month)
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#E8AE3F] flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">{dashboardData.completedJobs}</h3>
          <p className="text-xs font-semibold text-[#17181A]/60 uppercase tracking-wider">
            Completed Jobs
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">{dashboardData.averageRating}</h3>
          <p className="text-xs font-semibold text-[#17181A]/60 uppercase tracking-wider">
            Average Rating
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-[#17181A]">Active Service Requests</h3>
        
        <div className="space-y-3">
          {dashboardData.activeRequests && dashboardData.activeRequests.length > 0 ? (
            dashboardData.activeRequests.map((job) => (
              <div key={job.id || 1} className="p-4 bg-[#F7F6F2] rounded-xl border border-black/5 flex items-center justify-between flex-wrap gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#17181A]">{job.serviceName || job.title || 'Deep Home Cleaning'}</span>
                    <span className="px-2.5 py-0.5 bg-blue-100 text-[#2E4CDB] text-[10px] font-semibold rounded-full uppercase">
                      {job.status || 'Confirmed'}
                    </span>
                  </div>
                  <p className="text-xs text-[#17181A]/70 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {job.schedule || 'Tomorrow, 10:00 AM • Lazimpat, Kathmandu'}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedClient({ id: job.clientId || 1, name: job.clientName || 'Customer' })}
                    className="bg-gray-200 hover:bg-gray-300 text-[#17181A] px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Chat
                  </button>

                  <button 
                    onClick={() => handleStartJob(job.id || 1)}
                    className="bg-[#2E4CDB] hover:bg-[#233EC2] text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
                  >
                    Start Job
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#17181A]/60 py-4">No active service requests right now.</p>
          )}
        </div>
      </div>

      {selectedClient && (
        <ChatModal 
          recipient={selectedClient} 
          onClose={() => setSelectedClient(null)} 
        />
      )}
    </div>
  );
}