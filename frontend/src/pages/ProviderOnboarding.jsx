import React, { useState } from 'react';

export default function ProviderOnboardingFlow() {
  const [step, setStep] = useState('landing'); // 'landing' | 'auth' | 'profile'
  const [useEmail, setUseEmail] = useState(false);
  const [identifier, setIdentifier] = useState('');
  
  // Profile form state
  const [profile, setProfile] = useState({
    fullName: '',
    category: 'Plumbing',
    hourlyRate: '',
    bio: ''
  });

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!identifier) return;
    setStep('profile');
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Profile published successfully to directory!');
    // Reset or handle final submission logic here
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 font-sans">
      
      {/* Step 1: Landing Banner */}
      {step === 'landing' && (
        <div className="bg-white border border-stone-200 rounded-lg p-6 max-w-4xl w-full flex flex-col sm:flex-row items-center justify-between shadow-sm gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">Are you a service provider?</h2>
            <p className="text-sm text-stone-600 mt-1">Join 1,200+ providers growing their income on ServiHub.</p>
          </div>
          <button 
            onClick={() => setStep('auth')}
            className="bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition flex items-center gap-2 whitespace-nowrap"
          >
            Join as Provider &rarr;
          </button>
        </div>
      )}

      {/* Step 2: Authentication Modal / Card */}
      {step === 'auth' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-8 max-w-md w-full shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-stone-900">
              <span className="text-amber-500">Home</span> service
            </h2>
            <p className="text-xs text-stone-500 mt-2">
              We'll sign you in or create a new account if you don't have one yet.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <input 
                type={useEmail ? "email" : "tel"}
                placeholder={useEmail ? "Email address" : "Phone number"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-sm font-medium text-stone-800">Use Email</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useEmail} 
                  onChange={() => setUseEmail(!useEmail)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-lg transition text-sm shadow-sm"
            >
              Continue
            </button>
          </form>
        </div>
      )}

      {/* Step 3: Provider Profile Form */}
      {step === 'profile' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-8 max-w-xl w-full shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-stone-900">Become a Service Provider</h2>
            <p className="text-xs text-stone-500 mt-1">
              Complete your professional profile so local customers can discover and book your services.
            </p>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                1. Full Name
              </label>
              <input 
                type="text" 
                placeholder="e.g. Rajesh Kumar"
                value={profile.fullName}
                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                2. Service Category
              </label>
              <select 
                value={profile.category}
                onChange={(e) => setProfile({...profile, category: e.target.value})}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                3. Hourly Rate (NPR)
              </label>
              <input 
                type="number" 
                placeholder="e.g. 350"
                value={profile.hourlyRate}
                onChange={(e) => setProfile({...profile, hourlyRate: e.target.value})}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                4. Professional Bio / Description
              </label>
              <textarea 
                rows="3"
                placeholder="e.g. 10+ yrs • Licensed & insured professional..."
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none"
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition text-sm shadow-sm"
            >
              Publish Profile to Directory
            </button>
          </form>
        </div>
      )}

    </div>
  );
}