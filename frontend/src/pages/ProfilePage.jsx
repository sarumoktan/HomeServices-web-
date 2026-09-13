import React, { useState, useEffect } from "react";
import { User, Mail, MapPin, Edit3 } from "lucide-react";

export function ProfilePage({ currentUser, user, onUpdateUser }) {
  const activeUser = currentUser || user;

  const [name, setName] = useState(() => {
    if (activeUser) {
      return activeUser.fullName || activeUser.name || `${activeUser.firstName || ""} ${activeUser.lastName || ""}`.trim();
    }
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.fullName || parsed.name || `${parsed.firstName || ""} ${parsed.lastName || ""}`.trim();
      } catch (e) {}
    }
    return "";
  });

  const [address, setAddress] = useState(() => {
    if (activeUser?.address) return activeUser.address;
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      try { return JSON.parse(saved).address || ""; } catch (e) {}
    }
    return "";
  });

  const [email, setEmail] = useState(() => {
    if (activeUser?.email) return activeUser.email;
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      try { return JSON.parse(saved).email || ""; } catch (e) {}
    }
    return "";
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = activeUser || (() => {
      try {
        return JSON.parse(localStorage.getItem("currentUser"));
      } catch (e) {
        return null;
      }
    })();

    if (userData) {
      setName(userData.fullName || userData.name || `${userData.firstName || ""} ${userData.lastName || ""}`.trim());
      setAddress(userData.address || "");
      setEmail(userData.email || "");
    }
  }, [activeUser]);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedData = { ...(activeUser || {}), name, fullName: name, address, email };
    
    try {
      localStorage.setItem("currentUser", JSON.stringify(updatedData));
    } catch (err) {}

    if (onUpdateUser) {
      onUpdateUser(updatedData);
    }
    setIsEditing(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 font-sans text-stone-900">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm text-center h-fit">
          <div className="w-20 h-20 bg-stone-100 rounded-full mx-auto flex items-center justify-center mb-4 text-stone-400">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">{name || "User Profile"}</h2>
          <p className="text-sm text-stone-500 mt-1 flex items-center justify-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {address || "No address specified"}
          </p>
        </div>

        {/* Right Column: Profile Details Form */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
            <h3 className="text-lg font-bold text-stone-900">Profile Details</h3>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" /> {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-stone-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Address</label>
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-stone-900"
                />
              </div>
              <button 
                type="submit"
                className="bg-stone-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-sm">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex justify-between items-center">
                <div>
                  <span className="text-xs text-stone-400 block uppercase font-semibold">Name</span>
                  <span className="font-medium text-stone-800">{name || "Not provided"}</span>
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex justify-between items-center">
                <div>
                  <span className="text-xs text-stone-400 block uppercase font-semibold">Email</span>
                  <span className="font-medium text-stone-800">{email || "Not provided"}</span>
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex justify-between items-center">
                <div>
                  <span className="text-xs text-stone-400 block uppercase font-semibold">Address</span>
                  <span className="font-medium text-stone-800">{address || "Not provided"}</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}