# ServiHub Frontend

A modern home service booking platform built with React and Vite.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Avatar.jsx              # User avatar component
│   │   ├── Footer.jsx              # Footer component
│   │   ├── HeroIllustration.jsx    # SVG hero illustration
│   │   ├── Navbar.jsx              # Navigation bar
│   │   ├── Overlay.jsx             # Modal overlay wrapper
│   │   ├── SvcIcon.jsx             # Service type icon
│   │   ├── StarRow.jsx             # Star rating component
│   │   └── modals/
│   │       ├── BookingModal.jsx    # Booking form modal
│   │       ├── ChatModal.jsx       # Chat interface modal
│   │       ├── MapModal.jsx        # Provider location map modal
│   │       └── ReviewModal.jsx     # Review/rating modal
│   ├── pages/
│   │   ├── AdminDashboard.jsx      # Admin control panel
│   │   ├── AuthPage.jsx            # Login/register page
│   │   ├── BookingsPage.jsx        # User bookings history
│   │   ├── HomePage.jsx            # Landing page
│   │   ├── ProfilePage.jsx         # User profile page
│   │   ├── ProviderDashboard.jsx   # Provider dashboard
│   │   └── ServicesPage.jsx        # Service catalog & search
│   ├── constants/
│   │   ├── data.js                 # Mock data (services, providers, bookings)
│   │   ├── styles.js               # Reusable React styles
│   │   └── theme.js                # Color theme & constants
│   ├── App.jsx                     # Main app component
│   ├── index.css                   # Global styles
│   └── main.jsx                    # App entry point
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── .gitignore                      # Git ignore
└── README.md                       # This file
```

## 🎨 Design System

### Color Palette
- **Primary Gradients**: 6 unique gradients for different services
- **Background**: Dark theme (#09090F, #0F0F1A, #141428)
- **Text**: Neutral tones (#F0F0FF, #8888AA)
- **Accents**: Orange (#FF6B35), Green (#38EF7D), Blue (#4facfe)

### Typography
- Font: 'Plus Jakarta Sans', 'DM Sans', system-ui

### Components
- **Reusable**: Avatar, StarRow, SvcIcon, Overlay
- **Pages**: 7 main pages with different user roles
- **Modals**: 4 modal components for interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (for pnpm/npm/yarn)
- npm/yarn/pnpm package manager

### Installation

```bash
cd frontend
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
yarn dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 📱 Features

### User Roles
1. **Customer**: Browse services, book providers, track bookings, leave reviews
2. **Provider**: Manage jobs, view earnings, update profile
3. **Admin**: Dashboard, user management, provider approval, analytics

### Pages
- **Home**: Landing page with hero section, services showcase
- **Services**: Browse providers with advanced filtering & search
- **Auth**: Login/register for all user types
- **Bookings**: View booking history with status tracking
- **Profile**: User profile management
- **Provider Dashboard**: Job management & earnings tracking
- **Admin Dashboard**: System monitoring & approvals

### Modals
- Map view of nearby providers
- Booking form with multi-step process
- Real-time chat with providers
- Review & rating system

## 🔧 Customization

### Adding a New Service
Edit `src/constants/data.js`:
```javascript
export const SERVICES = [
  // Add new service object
];
```

### Changing Theme
Edit `src/constants/theme.js`:
```javascript
export const T = {
  // Update colors
};
```

### Modifying Styles
Props-based inline styles in components can be extracted to `src/constants/styles.js`

## 📦 Dependencies
- **React 18.2**: UI library
- **Vite 4.4**: Build tool & dev server

## 🏗️ Architecture

### Component Hierarchy
```
App
├── Navbar
├── Page Components (based on current page)
│   ├── HomePage
│   ├── ServicesPage
│   ├── AuthPage
│   └── ...
├── Modal Components (conditionally rendered)
│   ├── MapModal
│   ├── BookingModal
│   ├── ChatModal
│   └── ReviewModal
├── Footer
```

### State Management
Using React hooks (useState) at the App level for global state:
- `page`: Current page
- `loggedIn`: Authentication state
- `userType`: Role (user, provider, admin)
- `booking`: Active booking
- `showMap/showChat/showReview`: Modal visibility
- `filter/search`: Service browsing filters

## 📝 Notes

- All styling is inline using React style objects for maximum portability
- Data is currently mocked (replace with API calls)
- No external UI library dependency (lightweight)
- Component-based architecture for easy maintenance and scaling

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications with WebSocket
- [ ] Payment gateway integration
- [ ] Image uploads for profiles
- [ ] Responsive design improvements
- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n)
- [ ] Advanced analytics
