import { SERVICES } from "../constants/data";

export function HomePage({ onNavigate, setShowMap }) {
  const serviceCards = [
    {
      title: "Cleaning & Sanitization",
      description: "Get your space sparkling clean with our expert sanitization services.",
      icon: "blue",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2E4CDB" strokeWidth="2"><path d="M4 12l8-8 8 8M6 10v10h12V10"/></svg>
      ),
    },
    {
      title: "Plumbing & Repairs",
      description: "Get your plumbing fixed fast with reliable, experienced technicians.",
      icon: "pink",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#D96476" strokeWidth="2"><path d="M9 4h6v4H9zM12 8v9M8 21h8"/></svg>
      ),
    },
    {
      title: "Electrical & Lighting",
      description: "Safe, code-compliant wiring and fixture installs from licensed pros.",
      icon: "amber",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#C68A1F" strokeWidth="2"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>
      ),
    },
    {
      title: "Painting & Renovation",
      description: "Transform your space with a fresh coat and expert finishing.",
      icon: "lav",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#7C6AC7" strokeWidth="2"><path d="M3 21l6-2 11-11-4-4L5 15l-2 6zM14 5l4 4"/></svg>
      ),
    },
    {
      title: "Handyman Services",
      description: "Small fixes, big impact — general repairs handled with care.",
      icon: "green",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#4E7A4A" strokeWidth="2"><path d="M12 2v6M4.2 6.2l4.3 4.3M19.8 6.2l-4.3 4.3M4 15a8 8 0 0016 0"/></svg>
      ),
    },
    {
      title: "Landscaping & Gardening",
      description: "Keep your yard thriving with seasonal care and design.",
      icon: "ink",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#17181A" strokeWidth="2"><path d="M12 3v9M8 8l4-5 4 5M5 21c0-5 3-8 7-8s7 3 7 8"/></svg>
      ),
    },
  ];

  const workSteps = [
    {
      number: "01",
      title: "Search",
      description: "Search a service for the service you need.",
      icon: "amber",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#C68A1F" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
      ),
    },
    {
      number: "02",
      title: "Pick Provider",
      description: "Compare ratings, reviews, and pricing.",
      icon: "lav",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#7C6AC7" strokeWidth="2"><path d="M4 21v-6a4 4 0 014-4h8a4 4 0 014 4v6M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
      ),
    },
    {
      number: "03",
      title: "Book & Pay",
      description: "Choose your slot and pay securely.",
      icon: "green",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#4E7A4A" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
      ),
    },
    {
      number: "04",
      title: "Rate & Review",
      description: "Share your feedback after the service.",
      icon: "pink",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#D96476" strokeWidth="2"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
      ),
    },
  ];

  return (
    <main>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">Trusted by 1,200+ providers</div>
            <h1>Reliable Home Services, Right at your <em>doorstep</em></h1>
            <p className="hero-copy">Fast, easy, and connect a trusted professional in minutes. Every task is handled with care by vetted, experienced pros.</p>
            <div className="search-row">
              <div className="search-input">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
                Search for a service
              </div>
              <button className="btn btn-dark" onClick={() => onNavigate("services")}>Search</button>
            </div>
            <div className="rating-row">
              <span className="stars">★★★★★</span>
              <strong>4.8</strong> rating from 75k+ happy customers
            </div>
          </div>
          <div className="hero-art">
            <div className="dot-badge" />
            <div className="dot-badge-2" />
            <div className="bubble bubble-1">Hey there!</div>
            <div className="bubble bubble-2">Gemma Rose</div>
            <div className="figures">
              <div className="figure fig-a">
                <div className="avatar-head" />
                <div className="avatar-body" />
              </div>
              <div className="figure fig-b">
                <div className="avatar-head" />
                <div className="avatar-body" />
              </div>
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="strip">
            <div className="strip-1">
              <div className="strip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg></div>
              <h3>Online Booking System</h3>
              <p>Schedule a service in seconds, no phone calls, no waiting on hold.</p>
            </div>
            <div className="strip-2">
              <div className="strip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div>
              <h3>24/7 Emergency Service</h3>
              <p>Urgent leak or lockout? Our on-call pros respond around the clock.</p>
            </div>
            <div className="strip-3">
              <div className="strip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#17181A" strokeWidth="2"><path d="M4 21l6-6M14.5 5.5l4 4M9 9l6 6"/><path d="M17 3l4 4-2 2-4-4z"/></svg></div>
              <h3>Cleaning Your Home &amp; Office</h3>
              <p>Spotless spaces, every time, from top-to-bottom deep cleans.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="wrap about-grid">
          <div className="ring-wrap">
            <div className="ring">
              <div className="ring-inner">
                <div className="ring-badge">24hr</div>
                <div className="ring-figure figure">
                  <div className="avatar-head" />
                  <div className="avatar-body" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="about-eyebrow">About Us</div>
            <h2>Let Us Handle the Mess, <em>You Enjoy the Clean</em></h2>
            <p className="about-copy">Our vetted, background-checked pros bring their own tools and a genuine care for your space. Book once, and let us take the chore off your plate.</p>
            <ul className="about-points">
              <li>Screened &amp; certified pros</li>
              <li>Same-day appointments</li>
              <li>Fair, upfront pricing</li>
              <li>Satisfaction guaranteed</li>
            </ul>
            <div className="about-footer">
              <button className="btn btn-dark" onClick={() => onNavigate("services")}>Book Now</button>
              <span className="rating-row"><span className="stars">★★★★★</span> 4.8/5 from 2,300 reviews</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="wrap">
          <div className="section-head">
            <div className="about-eyebrow">Our Offer</div>
            <h2>Everything Your Home Needs</h2>
            <p>Six categories, hundreds of vetted pros, one place to book them all.</p>
          </div>
          <div className="service-grid">
            {serviceCards.map((card) => (
              <div key={card.title} className="service-card">
                <div className={`service-icon icon-${card.icon}`}>{card.svg}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <button className="btn btn-dark" onClick={() => onNavigate("services")}>Get Started</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how">
        <div className="wrap">
          <div className="section-head">
            <div className="about-eyebrow">How It Works</div>
            <h2><em>“How It Works”</em></h2>
            <p>Get your services fixed in 4 simple steps.</p>
          </div>

          <div className="steps">
            {workSteps.map((step) => (
              <div key={step.title} className="step-card">
                <div className="step-num">{step.number}</div>
                <div className={`step-icon icon-${step.icon}`}>{step.svg}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>

          <div className="stat-row">
            <div className="stat-card">
              <div className="stat-icon icon-green"><svg viewBox="0 0 24 24" fill="none" stroke="#4E7A4A" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg></div>
              <div><h5>100% Verified</h5><span>Background-checked pros</span></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon icon-lav"><svg viewBox="0 0 24 24" fill="none" stroke="#7C6AC7" strokeWidth="2"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg></div>
              <div><h5>Instant Booking</h5><span>Book in seconds</span></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon icon-blue"><svg viewBox="0 0 24 24" fill="none" stroke="#2E4CDB" strokeWidth="2"><rect x="3" y="10" width="18" height="10" rx="2"/><path d="M7 10V7a5 5 0 0110 0v3"/></svg></div>
              <div><h5>Secure Payment</h5><span>Encrypted checkout</span></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon icon-amber"><svg viewBox="0 0 24 24" fill="none" stroke="#C68A1F" strokeWidth="2"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg></div>
              <div><h5>4.8 Average</h5><span>Rated by 75k customers</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-strip wrap">
        <div className="banner banner-green">
          <div>
            <h4>100% Verified</h4>
            <p>Background-checked pros you'll trust on ServiHub.</p>
          </div>
        </div>
        <div className="banner banner-blue">
          <div>
            <h4>Secure Payment</h4>
            <p>Fast, encrypted checkout — every time.</p>
          </div>
          <button className="btn btn-light" onClick={() => onNavigate("auth")}>Join as Provider →</button>
        </div>
      </section>

      <div className="final-cta">
        <div className="final-cta-inner">
          <div>
            <h3>Are you a service provider?</h3>
            <p>Join 1,200+ providers growing their income on ServiHub.</p>
          </div>
          <button className="btn btn-light" onClick={() => onNavigate("auth")}>Join as Provider →</button>
        </div>
      </div>

    </main>
  );
}
