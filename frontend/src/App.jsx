import { useState } from "react";
import { PROVIDERS } from "./constants/data";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MapModal } from "./components/modals/MapModal";
import { BookingModal } from "./components/modals/BookingModal";
import { ChatModal } from "./components/modals/ChatModal";
import { ReviewModal } from "./components/modals/ReviewModal";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { AuthPage } from "./pages/AuthPage";
import { BookingsPage } from "./pages/BookingsPage";
import { ProviderDashboard } from "./pages/ProviderDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { BecomeProvider } from './pages/BecomeProviderPage';
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });
  
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem("userType") || "user";
  });
  
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [page, setPage] = useState("home");
  const [authTab, setAuthTab] = useState("login");
  const [showMap, setShowMap] = useState(false);
  const [booking, setBooking] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [review, setReview] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [provTab, setProvTab] = useState("jobs");
  const [adminTab, setAdminTab] = useState("overview");
  const [pending, setPending] = useState([
    { id: 1, name: "Deepak Shrestha", service: "AC Repair", joined: "Apr 9", docs: true },
    { id: 2, name: "Maya Tamang", service: "Cleaning", joined: "Apr 10", docs: false },
    { id: 3, name: "Rohan Joshi", service: "Carpentry", joined: "Apr 10", docs: true },
  ]);

  const go = (pg) => {
    setPage(pg);
  };

  const handleLogin = (type, data) => {
    const token = data?.token || "mock-token";
    const userObj = data?.user || data;

    try {
      localStorage.setItem("token", token);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userType", type);
      if (userObj) {
        localStorage.setItem("currentUser", JSON.stringify(userObj));
      }
    } catch (e) {}

    if (userObj) setCurrentUser(userObj);
    setLoggedIn(true);
    setUserType(type);
    
    const target = type === "admin" ? "admin" : type === "provider" ? "provider-dash" : "home";
    go(target);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("currentUser");

    setLoggedIn(false);
    setUserType("user");
    setCurrentUser(null);
    go("home");
  };

  return (
    <div className="bg-[#F4F3EE] min-h-screen text-stone-900 font-sans selection:bg-[#E8AE3F]/30">
      <Navbar
        page={page}
        loggedIn={loggedIn}
        onLogout={handleLogout}
        onNavigate={go}
        userType={userType}
        setUserType={setUserType}
        currentUser={currentUser}
      />
      
      {showMap && <MapModal onClose={() => setShowMap(false)} />}
      {booking && <BookingModal provider={booking} onClose={() => setBooking(null)} />}
      {showChat && <ChatModal onClose={() => setShowChat(false)} />}
      {review && <ReviewModal provider={review} onClose={() => setReview(null)} />}

      {page === "home" && (
        <HomePage
          onNavigate={go}
          setShowMap={setShowMap}
          setBooking={setBooking}
          setUserType={setUserType}
          loggedIn={loggedIn}
        />
      )}

      {page === "become-provider" && <BecomeProvider />}

      {page === "services" && (
        <ServicesPage
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          setShowChat={setShowChat}
          setBooking={setBooking}
          loggedIn={loggedIn}
          onNavigate={go}
          setShowMap={setShowMap}
        />
      )}

      {page === "auth" && (
        <AuthPage
          authTab={authTab}
          setAuthTab={setAuthTab}
          userType={userType}
          setUserType={setUserType}
          onLogin={handleLogin}
        />
      )}

      {page === "bookings" && (
        <BookingsPage
          setShowChat={setShowChat}
          setShowMap={setShowMap}
          setReview={setReview}
          setBooking={setBooking}
          PROVIDERS={PROVIDERS}
        />
      )}

      {page === "profile" && <ProfilePage user={currentUser} onNavigate={go} />} 

      {page === "provider-dash" && (
        <ProviderDashboard
          setShowChat={setShowChat}
          provTab={provTab}
          setProvTab={setProvTab}
        />
      )}

      {(page === "admin" || page === "providers") && (
        <AdminDashboard
          adminTab={adminTab}
          setAdminTab={setAdminTab}
          pending={pending}
          setPending={setPending}
        />
      )}

      <Footer onNavigate={go} />
    </div>
  );
}