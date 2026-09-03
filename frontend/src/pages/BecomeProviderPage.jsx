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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/providers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        alert('Application submitted successfully! Your profile is now live.');
        window.location.href = '/find-provider';
      } else {
        alert(result.message || 'Failed to submit profile.');
      }
    } catch (error) {
      console.error('Error submitting provider application:', error);
      alert('Connection error while registering.');
    } finally {
      setSubmitting(false);
    }
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
              placeholder="e.g. Rajesh Kumar"
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
              placeholder="e.g. 10+ yrs • Licensed & insured professional..."
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