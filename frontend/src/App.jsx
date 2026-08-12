import { useState } from "react";
import { T } from "./constants/theme";
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
import { ProfilePage } from "./pages/ProfilePage";
import { ProviderDashboard } from "./pages/ProviderDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";

export default function App() {
  const [page, setPage] = useState("home");
  const [authTab, setAuthTab] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState("user");
  const [currentUser, setCurrentUser] = useState(null);
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
    // store token and set current user from backend response
    if (data && data.token) {
      try {
        localStorage.setItem('token', data.token);
      } catch (e) {}
    }
    if (data && data.user) setCurrentUser(data.user);
    setLoggedIn(true);
    setUserType(type);
    
    // Updated target: regular users now navigate directly to "home" instead of "profile"
    const target = type === "admin" ? "admin" : type === "provider" ? "provider-dash" : "home";
    go(target);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType("user");
    go("home");
  };

  return (
    <div
      style={{
        background: T.bg,
        minHeight: "100vh",
        color: T.text,
        fontFamily: T.font,
      }}>
      <Navbar
        page={page}
        loggedIn={loggedIn}
        onLogout={handleLogout}
        onNavigate={go}
        userType={userType}
      />

      {/* MODALS */}
      {showMap && <MapModal onClose={() => setShowMap(false)} />}
      {booking && <BookingModal provider={booking} onClose={() => setBooking(null)} />}
      {showChat && <ChatModal onClose={() => setShowChat(false)} />}
      {review && <ReviewModal provider={review} onClose={() => setReview(null)} />}

      {/* PAGES */}
      {page === "home" && (
        <HomePage
          onNavigate={go}
          setShowMap={setShowMap}
          setBooking={setBooking}
          setUserType={setUserType}
          loggedIn={loggedIn}
        />
      )}

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

      {page === "profile" && <ProfilePage user={currentUser} />}

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

      <Footer />
    </div>
  );
}
