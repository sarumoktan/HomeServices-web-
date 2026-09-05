import React, { useState } from 'react';

export function CompleteProfileModal({ onComplete }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        service: 'Cleaning',
        price: '1000'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        // Combine inputs into dynamic name
        const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'Anonymous Provider';
        
        // Build card entry using exact dynamic form values
        const newProviderEntry = {
            id: Date.now(),
            name: fullName,
            service: formData.service || "Cleaning",
            category: formData.service || "Cleaning",
            rating: 5.0,
            reviews: 1,
            price: Number(formData.price) || 1000,
            hourlyRate: Number(formData.price) || 1000,
            available: true,
            distance: "1.0 km",
            initials: fullName.split(' ').map(n => n[0]).join('').toUpperCase() || 'P',
            grad: "bg-gradient-to-br from-[#2E4CDB] to-[#1d35a6]",
            verified: true,
            jobs: 1,
            bio: `Professional services based in ${formData.address || 'Kathmandu'}`,
        };

        // Save to dynamic_providers array in LocalStorage
        const existingProviders = JSON.parse(localStorage.getItem('dynamic_providers') || '[]');
        localStorage.setItem('dynamic_providers', JSON.stringify([newProviderEntry, ...existingProviders]));

        // Dispatch custom event for real-time page rendering
        window.dispatchEvent(new Event('providerUpdated'));

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
                if (onComplete) onComplete();
            } else {
                alert(result.message || "Saved locally!");
                if (onComplete) onComplete();
            }
        } catch (err) {
            console.error("Error saving profile:", err);
            alert("Profile saved locally!");
            if (onComplete) onComplete();
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-white p-[30px] rounded-xl max-w-[400px] w-full mx-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200 font-sans"
        >
            <h2 className="text-xl font-extrabold text-[#1F2430] mb-1.5">Complete Provider Profile</h2>
            <p className="text-sm text-[#6B7280] mb-6">Please provide your details to finish setting up your account.</p>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-[#1F2430]/70 uppercase tracking-wider mb-1.5">
                        First Name *
                    </label>
                    <input 
                        type="text" 
                        name="firstName" 
                        required
                        value={formData.firstName} 
                        onChange={handleChange} 
                        placeholder="e.g. Umesh / Saru"
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
                        required
                        value={formData.lastName} 
                        onChange={handleChange} 
                        placeholder="e.g. Rai / Moktan"
                        className="w-full bg-[#F1F1F1] border-2 border-transparent focus:border-[#E8A33D] focus:bg-white rounded-lg p-2.5 text-sm text-[#1F2430] font-medium outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#1F2430]/70 uppercase tracking-wider mb-1.5">
                        Service / Kaam *
                    </label>
                    <input 
                        type="text" 
                        name="service" 
                        required
                        value={formData.service} 
                        onChange={handleChange} 
                        placeholder="e.g. Cleaning"
                        className="w-full bg-[#F1F1F1] border-2 border-transparent focus:border-[#E8A33D] focus:bg-white rounded-lg p-2.5 text-sm text-[#1F2430] font-medium outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#1F2430]/70 uppercase tracking-wider mb-1.5">
                        Price / Rate (Rs) *
                    </label>
                    <input 
                        type="number" 
                        name="price" 
                        required
                        value={formData.price} 
                        onChange={handleChange} 
                        placeholder="1000"
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
                        required
                        value={formData.address} 
                        onChange={handleChange} 
                        placeholder="e.g. Dillibazar, Kathmandu"
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