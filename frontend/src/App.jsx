import { useState } from "react";
import { PROVIDERS } from "./constants/data";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { MapModal } from "./components/modals/MapModal";
import { BookingModal } from "./components/modals/BookingModal";
import ChatModal from "./components/modals/ChatModal";
import { ReviewModal } from "./components/modals/ReviewModal";

import { HomePage } from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import { AuthPage } from "./pages/AuthPage";
import { BookingsPage } from "./pages/BookingsPage";
import { ProviderDashboard } from "./pages/ProviderDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import ProviderOnboardingFlow from "./pages/ProviderOnboarding";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  // AUTHENTICATION

  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const [userType, setUserType] = useState(() => {
    return localStorage.getItem("userType") || "user";
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("currentUser");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Could not load current user:", error);
      return null;
    }
  });

  // NAVIGATION

  const [page, setPage] = useState("home");

  const [authTab, setAuthTab] = useState("login");

  // MAP

  const [showMap, setShowMap] = useState(false);

  // BOOKING

  const [booking, setBooking] = useState(null);

  // CHAT

  const [showChat, setShowChat] = useState(false);

  // This stores the provider the user clicked.
  const [selectedChatProvider, setSelectedChatProvider] =
    useState(null);

  // REVIEWS

  const [review, setReview] = useState(null);

  // SERVICES FILTER

  const [filter, setFilter] = useState("All");

  const [search, setSearch] = useState("");

  // PROVIDER DASHBOARD

  const [provTab, setProvTab] = useState("jobs");

  // ADMIN DASHBOARD

  const [adminTab, setAdminTab] = useState("overview");

  const [pending, setPending] = useState([
    {
      id: 1,
      name: "Deepak Shrestha",
      service: "AC Repair",
      joined: "Apr 9",
      docs: true,
    },
    {
      id: 2,
      name: "Maya Tamang",
      service: "Cleaning",
      joined: "Apr 10",
      docs: false,
    },
    {
      id: 3,
      name: "Rohan Joshi",
      service: "Carpentry",
      joined: "Apr 10",
      docs: true,
    },
  ]);

  // NAVIGATION FUNCTION

  const go = (pg) => {
    setPage(pg);
  };

  // LOGIN

  const handleLogin = (type, data) => {
    const token = data?.token || "mock-token";

    const userObj = data?.user || data;

    try {
      localStorage.setItem("token", token);

      localStorage.setItem("loggedIn", "true");

      localStorage.setItem("userType", type);

      if (userObj) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(userObj)
        );
      }
    } catch (error) {
      console.error("Could not save login:", error);
    }

    if (userObj) {
      setCurrentUser(userObj);
    }

    setLoggedIn(true);

    setUserType(type);

    const target =
      type === "admin"
        ? "admin"
        : type === "provider"
        ? "provider-dash"
        : "home";

    go(target);
  };

  // LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("userType");

    localStorage.removeItem("currentUser");

    setLoggedIn(false);

    setUserType("user");

    setCurrentUser(null);

    // Close any open modals
    setShowMap(false);
    setBooking(null);
    setShowChat(false);
    setSelectedChatProvider(null);
    setReview(null);

    go("home");
  };

  // OPEN CHAT

  const handleOpenChat = (provider) => {
    console.log("================================");
    console.log("OPENING CHAT");
    console.log("Selected provider:", provider);
    console.log("================================");

    // First save the provider
    setSelectedChatProvider(provider);

    // Then open chat
    setShowChat(true);
  };

  // CLOSE CHAT

  const handleCloseChat = () => {
    setShowChat(false);

    // Clear selected provider after closing
    setSelectedChatProvider(null);
  };

  // APP UI

  return (
    <div
      className="
        bg-[#F4F3EE]
        min-h-screen
        text-stone-900
        font-sans
        selection:bg-[#E8AE3F]/30
      "
    >
      {/* NAVBAR */}

      <Navbar
        page={page}
        loggedIn={loggedIn}
        onLogout={handleLogout}
        onNavigate={go}
        userType={userType}
        setUserType={setUserType}
        currentUser={currentUser}
      />

      {/* MAP MODAL */}

      {showMap && (
        <MapModal
          onClose={() => {
            setShowMap(false);
          }}
        />
      )}

      {/* BOOKING MODAL */}

      {booking && (
        <BookingModal
          provider={booking}
          onClose={() => {
            setBooking(null);
          }}
        />
      )}

      {/* CHAT MODAL */}

      {showChat && selectedChatProvider && (
        <ChatModal
          provider={selectedChatProvider}
          onClose={handleCloseChat}
        />
      )}

      {/* REVIEW MODAL */}

      {review && (
        <ReviewModal
          provider={review}
          onClose={() => {
            setReview(null);
          }}
        />
      )}

      {/* HOME */}

      {page === "home" && (
        <HomePage
          onNavigate={go}
          setShowMap={setShowMap}
          setBooking={setBooking}
          setUserType={setUserType}
          loggedIn={loggedIn}
        />
      )}

      {/* BECOME PROVIDER */}

      {page === "become-provider" && (
        <ProviderOnboardingFlow />
      )}

      {/* SERVICES */}

      {page === "services" && (
        <ServicesPage
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          setShowChat={setShowChat}
          setSelectedChatProvider={setSelectedChatProvider}
          setBooking={setBooking}
          loggedIn={loggedIn}
          onNavigate={go}
          setShowMap={setShowMap}
        />
      )}

      {/* AUTH */}

      {page === "auth" && (
        <AuthPage
          authTab={authTab}
          setAuthTab={setAuthTab}
          userType={userType}
          setUserType={setUserType}
          onLogin={handleLogin}
        />
      )}

      {/* BOOKINGS */}

      {page === "bookings" && (
        <BookingsPage
          setShowChat={setShowChat}
          setShowMap={setShowMap}
          setReview={setReview}
          setBooking={setBooking}
          PROVIDERS={PROVIDERS}
        />
      )}

      {/* PROFILE */}

      {page === "profile" && (
        <ProfilePage
          user={currentUser}
          onNavigate={go}
        />
      )}

      {/* PROVIDER DASHBOARD */}

      {page === "provider-dash" && (
        <ProviderDashboard
          setShowChat={setShowChat}
          provTab={provTab}
          setProvTab={setProvTab}
        />
      )}

      {/* ADMIN */}

      {(page === "admin" || page === "providers") && (
        <AdminDashboard
          adminTab={adminTab}
          setAdminTab={setAdminTab}
          pending={pending}
          setPending={setPending}
        />
      )}

      {/* FOOTER */}

      <Footer onNavigate={go} />
    </div>
  );
}