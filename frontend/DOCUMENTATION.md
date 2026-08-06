# ServiHub Frontend - Project Documentation

## 📌 Quick Overview

This is a **clean, modular React + Vite frontend** for the ServiHub home service booking platform. All code is organized into separate components and pages for easy maintenance and scalability.

## 🗂️ Folder Structure Breakdown

### `/src/constants/`
**Purpose**: Store reusable data, themes, and styles

- **theme.js**: Color palette, gradients, and global theme variables
- **styles.js**: Reusable React inline styles (buttons, inputs, cards)
- **data.js**: Mock data for services, providers, bookings, notifications

### `/src/components/`
**Purpose**: Reusable UI components

**Root level components**:
- **Avatar.jsx**: Shows user initials with gradient background
- **SvcIcon.jsx**: Service-specific icons with emoji
- **StarRow.jsx**: Displays star ratings (e.g., 4.5/5)
- **HeroIllustration.jsx**: SVG illustration for hero section
- **Navbar.jsx**: Top navigation with notifications
- **Footer.jsx**: Bottom footer
- **Overlay.jsx**: Backdrop for modals

**Modal components** (`/modals/`):
- **MapModal.jsx**: Interactive map showing nearby providers
- **BookingModal.jsx**: Multi-step booking form
- **ChatModal.jsx**: Real-time chat interface
- **ReviewModal.jsx**: Rating and review submission

### `/src/pages/`
**Purpose**: Full-page views for different routes

- **HomePage.jsx**: Landing page (hero + services + cta)
- **ServicesPage.jsx**: Browse & filter providers
- **AuthPage.jsx**: Login/Register form
- **BookingsPage.jsx**: View past/upcoming bookings
- **ProfilePage.jsx**: User profile settings
- **ProviderDashboard.jsx**: Provider's job management
- **AdminDashboard.jsx**: Admin control panel

### `/src/App.jsx`
**Purpose**: Main application component

- Manages global state (page, user, modals)
- Routes between pages
- Renders navbar, footer, modals
- Handles logging in/out

### `/src/main.jsx`
**Purpose**: React app entry point

### `/src/index.css`
**Purpose**: Global styles

- Reset styles
- Scrollbar customization
- Animation keyframes
- Utility classes

### `/public/index.html`
**Purpose**: HTML template

---

## 🎯 Flow & User Experience

### User Journey

1. **First Visit** → HomePage
   - See services, top providers, CTA
   - Click "Get Started" or "Book a Service"

2. **Not Logged In** → AuthPage
   - Choose role: User, Provider, or Admin
   - Sign in or register

3. **After Login** → Home/Dashboard based on role
   - **User**: Can browse services, book, track, review
   - **Provider**: See jobs, manage schedule, track earnings
   - **Admin**: Monitor system, approve providers

4. **Booking Flow**
   - Browse services → Select provider → Fill booking form → Payment → Confirmation

---

## 🔄 State Management Pattern

```javascript
// Top-level App state
const [page, setPage] = useState("home");          // Current page
const [loggedIn, setLoggedIn] = useState(false);   // Auth status
const [userType, setUserType] = useState("user");  // user|provider|admin
const [booking, setBooking] = useState(null);      // Active booking
const [showMap, setShowMap] = useState(false);     // Modal visibility
// ... more state

// Pass down as props to pages
<HomePage onNavigate={go} setShowMap={setShowMap} setBooking={setBooking} ... />
```

### Passing Data Down
- Pages receive callbacks like `onNavigate`, `setBooking`, `setShowChat`
- Pages call these to trigger actions
- Simple and predictable

---

## 🎨 Styling Approach

**100% Inline Styles** using React objects:
```javascript
const btnP = {
  background: T.grad1,
  border: "none",
  borderRadius: 12,
  padding: "12px 24px",
  // ...
};

<button style={btnP}>Click Me</button>
```

**Advantages**:
- No CSS files to manage
- All styles visible in code
- Easy to customize
- No class name conflicts

**Disadvantages** (when upgrading):
- Can be verbose for large UIs
- Consider Tailwind CSS or CSS-in-JS library if needed

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Start development server (opens http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📊 Data Structure Examples

### Provider Object
```javascript
{
  id: 1,
  name: "Rajesh Kumar",
  service: "Plumbing",
  rating: 4.9,
  reviews: 312,
  price: 350,
  available: true,
  distance: "1.2 km",
  initials: "RK",
  grad: "orange",
  verified: true,
  jobs: 890,
  bio: "10+ yrs · Licensed & insured"
}
```

### Booking Object
```javascript
{
  id: "#BK2401",
  service: "Plumbing",
  provider: "Rajesh Kumar",
  date: "Apr 12, 2025",
  time: "10:00 AM",
  status: "confirmed",        // confirmed|completed|cancelled
  amount: 350,
  address: "Thamel, KTM"
}
```

---

## 🔌 API Integration (Future)

Currently using mock data. To integrate backend:

1. **Replace mock data in `data.js`**:
   ```javascript
   // Before: import from constants
   // After: fetch from API
   
   const [services, setServices] = useState([]);
   useEffect(() => {
     fetch('/api/services')
       .then(r => r.json())
       .then(setServices);
   }, []);
   ```

2. **Add API service layer**:
   ```javascript
   // src/services/api.js
   export const bookService = async (providerData) => {
     return fetch('/api/bookings', {
       method: 'POST',
       body: JSON.stringify(providerData)
     }).then(r => r.json());
   };
   ```

3. **Update components to use API**:
   ```javascript
   const handleBooking = async (provider) => {
     const result = await bookService(provider);
     // Handle result
   };
   ```

---

## 🎓 Learning Path

1. **Understand Structure**: Browse the folder organization
2. **Read App.jsx**: See how pages and modals work together
3. **Explore a Page**: Check HomePage.jsx to see component assembly
4. **Study a Component**: Look at Avatar.jsx or SvcIcon.jsx for reusable patterns
5. **Customize Styles**: Edit src/constants/theme.js colors
6. **Add New Page**: Copy ProfilePage structure to create one

---

## ✅ Checklist for Production

- [ ] Replace mock data with API calls
- [ ] Add form validation
- [ ] Implement authentication (JWT, etc.)
- [ ] Add error handling & loading states
- [ ] Test responsive design on mobile
- [ ] Optimize images
- [ ] Set up error boundary
- [ ] Add analytics
- [ ] Configure environment variables
- [ ] Set up CI/CD pipeline
- [ ] Security: CORS, CSP headers

---

## 📞 Support

For questions about:
- **Component structure**: See `/src/components/`
- **Styling**: Check `/src/constants/styles.js`
- **Data**: Look in `/src/constants/data.js`
- **Pages**: Browse `/src/pages/`

---

## 🎯 Next Steps

1. Run `npm install && npm run dev`
2. Explore the UI in browser
3. Read through component files
4. Customize colors in `theme.js`
5. Replace mock data with real API
6. Deploy! 🚀
