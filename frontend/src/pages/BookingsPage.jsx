import React, { useState } from "react";
import { FiTool, FiZap, FiHome, FiWind, FiActivity, FiShield, FiTv, FiDroplet } from "react-icons/fi";

export function BookingsPage({ setShowChat, setShowMap, setReview, setBooking, PROVIDERS }) {
  // CHANGED HERE: Added state to track which subcategory is currently selected
  const [activeCategory, setActiveCategory] = useState("Plumbing");

  const subCategories = [
    { name: "Plumbing" },
    { name: "Electrical" },
    { name: "Carpentry" },
    { name: "Air Conditioning" },
    { name: "Motor" },
    { name: "Laundry" },
    { name: "Inverter" },
    { name: "Generator" },
    { name: "Television" },
    { name: "Housekeeping and Cleaning" },
    { name: "Gas Stove" },
    { name: "Chimney" },
  ];

  // CHANGED HERE: Comprehensive database of services mapped dynamically to each subcategory
  const allServicesData = {
    Plumbing: [
      {
        id: 1,
        title: "Plumbing: Waste Pipe Leakage",
        provider: "Ashish Raut",
        price: "Rs 350.00",
        rating: "0.0 (0)",
        desc: "Repair or replacement of waste pipe per piece",
        image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 2,
        title: "Plumbing: Wash Basin Faucet...",
        provider: "Ashish Raut",
        price: "Rs 400.00",
        rating: "0.0 (0)",
        desc: "Repair of wash basin's faucet leakage per piece",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 3,
        title: "Plumbing: Angle valve/ connec...",
        provider: "Ashish Raut",
        price: "Rs 400.00",
        rating: "0.0 (0)",
        desc: "Repair and replace of Angle Valve/Connection Pipe",
        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 4,
        title: "Plumbing: Wash Basin Replac...",
        provider: "Ashish Raut",
        price: "Rs 1,300.00",
        rating: "0.0 (0)",
        desc: "Replacement of wash basin",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80",
      },
    ],
    Electrical: [
      {
        id: 5,
        title: "Electrical: Switch & Socket Fix",
        provider: "Ramesh Thapa",
        price: "Rs 250.00",
        rating: "4.8 (12)",
        desc: "Safe installation or repair of switches and power sockets",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 6,
        title: "Electrical: Ceiling Fan Install",
        provider: "Ramesh Thapa",
        price: "Rs 600.00",
        rating: "4.9 (20)",
        desc: "Complete fitting and wiring checks for ceiling fans",
        image: "https://images.unsplash.com/photo-1558441719-752a78722b51?auto=format&fit=crop&w=500&q=80",
      },
    ],
    Carpentry: [
      {
        id: 7,
        title: "Carpentry: Door Lock Repair",
        provider: "Rohan Joshi",
        price: "Rs 500.00",
        rating: "4.7 (8)",
        desc: "Fixing jammed handles, deadbolts, and door latches",
        image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=500&q=80",
      },
    ],
    "Air Conditioning": [
      {
        id: 8,
        title: "AC General Servicing & Gas",
        provider: "Deepak Shrestha",
        price: "Rs 1,200.00",
        rating: "5.0 (15)",
        desc: "Deep cleaning filters, coils, and checking gas pressure",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=500&q=80",
      },
    ],
    Motor: [
      {
        id: 9,
        title: "Water Motor Repair & Rewinding",
        provider: "Hari Sharma",
        price: "Rs 800.00",
        rating: "4.6 (5)",
        desc: "Troubleshooting noisy motors or failure to pump water",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80",
      },
    ],
    Laundry: [
      {
        id: 10,
        title: "Washing Machine Checkup",
        provider: "Binod Karki",
        price: "Rs 500.00",
        rating: "4.5 (9)",
        desc: "Drum inspection, inlet pipe fixes, and draining checks",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=500&q=80",
      },
    ],
    Inverter: [
      {
        id: 11,
        title: "Inverter Battery Maintenance",
        provider: "Kishor KC",
        price: "Rs 450.00",
        rating: "4.9 (11)",
        desc: "Water top-up, terminal cleaning, and backup testing",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=500&q=80",
      },
    ],
    Generator: [
      {
        id: 12,
        title: "Generator Servicing & Tune-up",
        provider: "Kishor KC",
        price: "Rs 1,500.00",
        rating: "4.8 (6)",
        desc: "Oil change, spark plug replacement, and load testing",
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=500&q=80",
      },
    ],
    Television: [
      {
        id: 14,
        title: "LED TV Wall Mount Installation",
        provider: "Bikash Gurung",
        price: "Rs 600.00",
        rating: "4.9 (22)",
        desc: "Secure bracket mounting on concrete or drywall surfaces",
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=500&q=80",
      },
    ],
    "Housekeeping and Cleaning": [
      {
        id: 15,
        title: "Deep House Cleaning Package",
        provider: "Maya Tamang",
        price: "Rs 2,500.00",
        rating: "4.9 (35)",
        desc: "Comprehensive floor scrubbing, dusting, and bathroom wash",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80",
      },
    ],
    "Gas Stove": [
      {
        id: 16,
        title: "Gas Stove Burner Cleaning & Repair",
        provider: "Santosh Lama",
        price: "Rs 400.00",
        rating: "4.6 (10)",
        desc: "Unblocking clogged burner holes and checking gas pipeline leaks",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80",
      },
    ],
    Chimney: [
      {
        id: 17,
        title: "Kitchen Chimney Deep Degreasing",
        provider: "Santosh Lama",
        price: "Rs 1,000.00",
        rating: "4.8 (18)",
        desc: "Chemical washing of baffle filters and motor housing cleanup",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=500&q=80",
      },
    ],
  };

  // Get current list of services matching the selected category, fallback to empty array if none found
  const currentServices = allServicesData[activeCategory] || [];

  return (
    <div className="min-h-screen bg-[#fcfaf7] pb-16">
      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-gray-500">
        <span className="hover:underline cursor-pointer">Home</span>
        {" / "}
        <span className="hover:underline cursor-pointer">Home Repairs</span>
        {" / "}
        <span className="text-gray-800 font-medium">View Service</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mt-2">
        {/* Left Sidebar for SUB CATEGORIES */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm h-fit">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-4">
            SUB CATEGORIES
          </h3>
          <ul className="space-y-3">
            {subCategories.map((cat, index) => (
              <li key={index}>
                <button
                  // CHANGED HERE: Added click handler to update the active category state
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full text-left text-sm transition-colors cursor-pointer py-1 ${
                    activeCategory === cat.name
                      ? "text-[#e85d24] font-semibold"
                      : "text-gray-600 hover:text-[#e85d24]"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Grid Section for Services */}
        <div className="md:col-span-3">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Services — {activeCategory}
          </h2>
          
          {currentServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentServices.map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 bg-gray-100 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">{service.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>{service.provider}</span>
                        <span className="text-amber-500 font-semibold">★ {service.rating}</span>
                      </div>
                      <p className="text-xs text-[#e85d24] font-bold mb-2">{service.price}</p>
                      <p className="text-xs text-gray-400 line-clamp-2">{service.desc}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button 
                      onClick={() => setBooking && setBooking(service)}
                      className="w-full bg-[#e85d24] text-white py-2 rounded-xl text-xs font-semibold shadow hover:bg-opacity-90 transition cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500 text-sm">
              No services available right now for {activeCategory}. Check back soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}