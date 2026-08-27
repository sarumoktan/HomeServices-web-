import React from 'react';
import { FiEdit2, FiPlus, FiUser, FiMail, FiMapPin } from 'react-icons/fi';

export default function ProfilePage() {
  const profileDetails = [
    { label: 'Name', value: 'simple moktan', icon: FiUser },
    { label: 'Email', value: 'sarumoktan198@gmail.com', icon: FiMail },
    { label: 'Address', value: 'jorpati,kathmandu', icon: FiMapPin },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf7] relative pb-16">
      {/* Breadcrumb Header */}
      <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-gray-500">
        <span className="hover:underline cursor-pointer">Home</span> / <span className="text-gray-800 font-medium">My Profile</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {/* Left Column: Avatar & Address Book Section */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3 shadow-inner">
              <FiUser size={36} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">simple moktan</h2>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <FiMapPin className="mr-1 text-gray-400" /> jorpati,kathmandu
            </p>
          </div>

          {/* Address Book Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-base">Address Book</h3>
            <button className="bg-[#e85d24] text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 shadow hover:bg-opacity-90">
              <FiPlus />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Right Column: Profile Details List */}
        <div className="md:col-span-2 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Details</h2>
          
          <div className="space-y-4">
            {profileDetails.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-gray-50/70 border border-gray-100 rounded-xl p-4 flex items-center justify-between transition hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-400">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                  <button className="text-[#e85d24] hover:bg-orange-50 p-2 rounded-lg transition">
                    <FiEdit2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}