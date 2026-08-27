import React, { useState } from 'react';

export function CompleteProfileModal({ onComplete }) {
    const [formData, setFormData] = useState({
        firstName: 'saru',
        lastName: 'moktan',
        address: 'Jorpati, Kathmandu'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await fetch('/api/users/profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result.success) {
                alert("Profile completed successfully!");
                if (onComplete) onComplete(); // Switch view to profile page
            } else {
                alert(result.message || "Failed to save profile.");
            }
        } catch (err) {
            console.error("Error saving profile:", err);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-white p-[30px] rounded-xl max-w-[400px] w-full mx-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200 font-sans"
        >
            <h2 className="text-xl font-extrabold text-[#1F2430] mb-1.5">Complete Profile</h2>
            <p className="text-sm text-[#6B7280] mb-6">Please provide your details to finish setting up your account.</p>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-[#1F2430]/70 uppercase tracking-wider mb-1.5">
                        First Name *
                    </label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        className="w-full bg-[#F1F1F1] border-2 border-transparent focus:border-[#E8A33D] focus:bg-white rounded-lg p-2.5 text-sm text-[#1F2430] font-medium outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#1F2430]/70 uppercase tracking-wider mb-1.5">
                        Last Name *
                    </label>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        className="w-full bg-[#F1F1F1] border-2 border-transparent focus:border-[#E8A33D] focus:bg-white rounded-lg p-2.5 text-sm text-[#1F2430] font-medium outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#1F2430]/70 uppercase tracking-wider mb-1.5">
                        Address *
                    </label>
                    <input 
                        type="text" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        className="w-full bg-[#F1F1F1] border-2 border-transparent focus:border-[#E8A33D] focus:bg-white rounded-lg p-2.5 text-sm text-[#1F2430] font-medium outline-none transition-all"
                    />
                </div>
            </div>

            <button 
                type="submit" 
                className="w-full bg-[#12ABE3] hover:bg-[#0f97cd] text-white p-3 font-extrabold text-sm border-none rounded-lg mt-6 cursor-pointer transition-colors shadow-md"
            >
                Complete Profile
            </button>
        </form>
    );
}