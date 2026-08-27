import { SERVICES } from "../constants/data";

export function HomePage({ onNavigate, setShowMap }) {
  const serviceCards = [
    {
      title: "Cleaning & Sanitization",
      description: "Get your space sparkling clean with our expert sanitization services.",
      icon: "bg-blue-50 text-blue-600",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12l8-8 8 8M6 10v10h12V10"/></svg>
      ),
    },
    {
      title: "Plumbing & Repairs",
      description: "Get your plumbing fixed fast with reliable, experienced technicians.",
      icon: "bg-rose-50 text-rose-500",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 4h6v4H9zM12 8v9M8 21h8"/></svg>
      ),
    },
    {
      title: "Electrical & Lighting",
      description: "Safe, code-compliant wiring and fixture installs from licensed pros.",
      icon: "bg-amber-50 text-amber-600",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>
      ),
    },
    {
      title: "Painting & Renovation",
      description: "Transform your space with a fresh coat and expert finishing.",
      icon: "bg-purple-50 text-purple-600",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21l6-2 11-11-4-4L5 15l-2 6zM14 5l4 4"/></svg>
      ),
    },
    {
      title: "Handyman Services",
      description: "Small fixes, big impact — general repairs handled with care.",
      icon: "bg-emerald-50 text-emerald-600",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v6M4.2 6.2l4.3 4.3M19.8 6.2l-4.3 4.3M4 15a8 8 0 0016 0"/></svg>
      ),
    },
    {
      title: "Landscaping & Gardening",
      description: "Keep your yard thriving with seasonal care and design.",
      icon: "bg-stone-100 text-stone-900",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v9M8 8l4-5 4 5M5 21c0-5 3-8 7-8s7 3 7 8"/></svg>
      ),
    },
  ];

  const workSteps = [
    {
      number: "01",
      title: "Search",
      description: "Search a service for the service you need.",
      icon: "bg-amber-50 text-amber-600",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
      ),
    },
    {
      number: "02",
      title: "Pick Provider",
      description: "Compare ratings, reviews, and pricing.",
      icon: "bg-purple-50 text-purple-600",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21v-6a4 4 0 014-4h8a4 4 0 014 4v6M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
      ),
    },
    {
      number: "03",
      title: "Book & Pay",
      description: "Choose your slot and pay securely.",
      icon: "bg-emerald-50 text-emerald-600",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
      ),
    },
    {
      number: "04",
      title: "Rate & Review",
      description: "Share your feedback after the service.",
      icon: "bg-rose-50 text-rose-500",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
      ),
    },
  ];

  return (
    <main className="bg-white text-stone-900 font-sans">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider bg-stone-200 text-stone-700 rounded-full">
              Trusted by 1,200+ providers
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 mb-6 leading-tight">
              Reliable Home Services, Right at your <span className="italic font-serif font-normal">doorstep</span>
            </h1>
            <p className="text-lg text-stone-600 mb-8">
              Fast, easy, and connect a trusted professional in minutes. Every task is handled with care by vetted, experienced pros.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl shadow-sm border border-stone-200 max-w-lg mb-6">
              <div className="flex items-center gap-3 px-4 py-3 text-stone-400 flex-1">
                <svg className="w-5 h-5 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
                <span>Search for a service</span>
              </div>
              <button 
                onClick={() => onNavigate("services")}
                className="bg-stone-900 hover:bg-stone-800 text-white font-medium px-6 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-stone-600">
              <span className="text-amber-500 tracking-wider">★★★★★</span>
              <strong className="text-stone-900 font-semibold">4.8</strong> rating from 75k+ happy customers
            </div>
          </div>

          <div className="relative h-80 lg:h-96 bg-stone-200 rounded-3xl overflow-hidden flex items-center justify-center border border-stone-300">
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">Hey there!</div>
            <div className="absolute bottom-6 right-6 bg-stone-900 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">Gemma Rose</div>
            <div className="flex gap-4 items-center justify-center">
              <div className="w-16 h-32 bg-stone-300 rounded-t-full flex flex-col items-center pt-2">
                <div className="w-8 h-8 bg-stone-400 rounded-full mb-2"></div>
                <div className="w-12 h-16 bg-stone-400 rounded-t-lg"></div>
              </div>
              <div className="w-16 h-32 bg-stone-300 rounded-t-full flex flex-col items-center pt-2">
                <div className="w-8 h-8 bg-stone-400 rounded-full mb-2"></div>
                <div className="w-12 h-16 bg-stone-400 rounded-t-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Strips (Updated to Light Theme) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-stone-200 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-stone-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-stone-900">Online Booking System</h3>
                <p className="text-stone-600 text-sm">Schedule a service in seconds, no phone calls, no waiting on hold.</p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-stone-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-stone-900">24/7 Emergency Service</h3>
                <p className="text-stone-600 text-sm">Urgent leak or lockout? Our on-call pros respond around the clock.</p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-stone-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21l6-6M14.5 5.5l4 4M9 9l6 6"/><path d="M17 3l4 4-2 2-4-4z"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-stone-900">Cleaning Your Home & Office</h3>
                <p className="text-stone-600 text-sm">Spotless spaces, every time, from top-to-bottom deep cleans.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center">
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-stone-300 flex items-center justify-center relative">
              <div className="absolute top-4 bg-stone-900 text-white text-xs font-bold px-3 py-1 rounded-full">24hr</div>
              <div className="w-48 h-48 bg-stone-100 rounded-full flex flex-col items-center justify-center">
                <div className="w-10 h-10 bg-stone-300 rounded-full mb-2"></div>
                <div className="w-16 h-20 bg-stone-300 rounded-t-xl"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">About Us</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
              Let Us Handle the Mess, <span className="italic font-serif font-normal">You Enjoy the Clean</span>
            </h2>
            <p className="text-stone-600 mb-6">
              Our vetted, background-checked pros bring their own tools and a genuine care for your space. Book once, and let us take the chore off your plate.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-stone-700 font-medium">
              <li className="flex items-center gap-2">✓ Screened & certified pros</li>
              <li className="flex items-center gap-2">✓ Same-day appointments</li>
              <li className="flex items-center gap-2">✓ Fair, upfront pricing</li>
              <li className="flex items-center gap-2">✓ Satisfaction guaranteed</li>
            </ul>
            <div className="flex flex-wrap items-center gap-6">
              <button 
                onClick={() => onNavigate("services")}
                className="bg-stone-900 hover:bg-stone-800 text-white font-medium px-6 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Book Now
              </button>
              <div className="text-sm text-stone-600 flex items-center gap-2">
                <span className="text-amber-500">★★★★★</span> 4.8/5 from 2,300 reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-stone-50 border-t border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">Our Offer</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-3">Everything Your Home Needs</h2>
            <p className="text-stone-600">Six categories, hundreds of vetted pros, one place to book them all.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((card) => (
              <div key={card.title} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${card.icon}`}>
                    <div className="w-6 h-6">{card.svg}</div>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{card.title}</h3>
                  <p className="text-stone-600 text-sm mb-6">{card.description}</p>
                </div>
                <button 
                  onClick={() => onNavigate("services")}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-2.5 rounded-xl transition-colors cursor-pointer text-sm"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">How It Works</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-3 font-serif italic">“How It Works”</h2>
            <p className="text-stone-600">Get your services fixed in 4 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {workSteps.map((step) => (
              <div key={step.title} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 relative">
                <span className="absolute top-4 right-4 text-xs font-bold text-stone-400">{step.number}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${step.icon}`}>
                  <div className="w-5 h-5">{step.svg}</div>
                </div>
                <h4 className="font-bold text-stone-900 mb-1">{step.title}</h4>
                <p className="text-stone-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-stone-200 bg-white">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-stone-900 text-sm">100% Verified</h5>
                <span className="text-xs text-stone-500">Background-checked pros</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-stone-200 bg-white">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-stone-900 text-sm">Instant Booking</h5>
                <span className="text-xs text-stone-500">Book in seconds</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-stone-200 bg-white">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="10" width="18" height="10" rx="2"/><path d="M7 10V7a5 5 0 0110 0v3"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-stone-900 text-sm">Secure Payment</h5>
                <span className="text-xs text-stone-500">Encrypted checkout</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-stone-200 bg-white">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-stone-900 text-sm">4.8 Average</h5>
                <span className="text-xs text-stone-500">Rated by 75k customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Strip (Updated to Light Theme / Clean Borders) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold mb-2 text-emerald-950">100% Verified</h4>
              <p className="text-emerald-700 text-sm">Background-checked pros you'll trust on ServiHub.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 text-blue-900 p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold mb-2 text-blue-950">Secure Payment</h4>
              <p className="text-blue-700 text-sm">Fast, encrypted checkout — every time.</p>
            </div>
            <button 
              onClick={() => onNavigate("auth")}
              className="bg-blue-600 text-white hover:bg-blue-700 font-medium px-5 py-2.5 rounded-xl transition-colors shrink-0 cursor-pointer text-sm shadow-sm"
            >
              Join as Provider →
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA (White Background) */}
      <div className="bg-white border-t border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-900 mb-1">Are you a service provider?</h3>
            <p className="text-stone-600 text-sm">Join 1,200+ providers growing their income on ServiHub.</p>
          </div>
          <button 
            onClick={() => onNavigate("auth")}
            className="bg-stone-900 text-white hover:bg-stone-800 font-medium px-6 py-3 rounded-xl transition-colors shrink-0 cursor-pointer text-sm shadow-sm"
          >
            Join as Provider →
          </button>
        </div>
      </div>
    </main>
  );
}