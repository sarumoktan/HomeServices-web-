import React, { useState } from "react";
import { User, Briefcase, DollarSign, FileText } from "lucide-react";

export function BecomeProvider() {
  const [formData, setFormData] = useState({
    name: "",
    category: "Plumbing",
    hourlyRate: "",
    bio: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Replace handleSubmit with this implementation
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const rateNum = Number(formData.hourlyRate) || 0;
    const newProviderEntry = {
      id: Date.now(),
      name: formData.name,
      service: formData.category,
      category: formData.category,
      rating: 5.0,
      reviews: 1,
      price: rateNum,
      hourlyRate: rateNum,
      available: true,
      distance: "1.0 km",
      initials: formData.name ? formData.name.split(' ').map(n => n[0]).join('').toUpperCase() : "DP",
      grad: "bg-gradient-to-br from-[#2E4CDB] to-[#1d35a6]",
      verified: true,
      jobs: 1,
      bio: formData.bio,
    };

    // Save locally immediately so it renders on the directory
    const existingProviders = JSON.parse(localStorage.getItem('dynamic_providers') || '[]');
    localStorage.setItem('dynamic_providers', JSON.stringify([newProviderEntry, ...existingProviders]));

    // Attempt backend sync in the background without blocking the UI
    fetch('http://localhost:5000/api/providers/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).catch(err => console.log("Backend sync offline, using local storage:", err));

    setSubmitting(false);
    alert('Profile published successfully!');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#17181A] py-12 px-6 max-w-[800px] mx-auto font-sans">
      <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-tight">Become a Service Provider</h1>
          <p className="text-sm text-[#17181A]/70 mt-1">
            Complete your professional profile so local customers can discover and book your services.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#17181A]/70 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#17181A]/70" /> 1. Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Dil Bahadur Rai"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#F7F6F2] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#2E4CDB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#17181A]/70 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#17181A]/70" /> 2. Service Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#F7F6F2] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#2E4CDB]"
            >
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Tutoring">Tutoring</option>
              <option value="Painting">Painting</option>
              <option value="Gardening">Gardening</option>
              <option value="Carpentry">Carpentry</option>
              <option value="AC Repair">AC Repair</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#17181A]/70 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#17181A]/70" /> 3. Hourly Rate (NPR)
            </label>
            <input
              type="number"
              name="hourlyRate"
              required
              placeholder="e.g. 350"
              value={formData.hourlyRate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#F7F6F2] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#2E4CDB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#17181A]/70 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#17181A]/70" /> 4. Professional Bio / Description
            </label>
            <textarea
              name="bio"
              rows="3"
              required
              placeholder="e.g. 5+ yrs • Professional cleaning services..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#F7F6F2] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#2E4CDB]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#2E4CDB] hover:bg-[#233EC2] text-white py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-sm"
          >
            {submitting ? "Submitting Application..." : "Publish Profile to Directory"}
          </button>
        </form>
      </div>
    </div>
  );
}