# BloodLink+ - Blood Donation & Donor Finder Platform

## Project Overview
BloodLink+ is an enterprise-grade mobile blood donation platform built with Expo (React Native) and TypeScript. The app connects blood donors and recipients through real-time location tracking, map visualization, and smart search filters with a trustworthy, medical-grade UI.

**Created:** October 27, 2025  
**Last Updated:** October 28, 2025  
**Status:** Expo Router Migration ✓ | Modern UI Redesign (Auth Screens) ✓ | Backend Development Pending

## Tech Stack
- **Framework:** Expo (React Native) with TypeScript
- **Navigation:** Expo Router (File-based routing)
- **Maps:** react-native-maps (Google Maps)
- **Styling:** React Native StyleSheet (no CSS-in-JS)
- **Icons:** @expo/vector-icons (Ionicons)
- **Location:** expo-location
- **Image Picker:** expo-image-picker

## Design System (Modernized)

### Color Palette
- **Primary:** Crimson Red (#D32F2F)
- **Secondary:** Deep Blue (#1976D2)
- **Success:** Light Green (#4CAF50)
- **Gray:** Cool Gray (#ECECEC)

### Gradients (14 Variants)
- **Primary Gradients:** Red-based gradients (redDark, redLight, redWarm, redCool)
- **Secondary Gradients:** Blue-based gradients (blueDark, blueLight, blueWarm)
- **Accent Gradients:** sunrise, sunset, ocean, forest, purple, warm, cool

### Glassmorphism Effects (8 Overlays)
- **Light:** light10-30 (10-30% white opacity with blur)
- **Dark:** dark10-30 (10-30% black opacity with blur)
- **Frosted:** frostedLight, frostedDark (ultra-blurred backgrounds)

### Typography
- **Font:** System font (fallback for Inter/Poppins)
- **Sizes:** 12px - 36px scale
- **Weights:** Regular (400), Medium (500), Semibold (600), Bold (700)
- **Line Heights:** Pixel-based values (16px - 44px) for React Native compatibility
- **Letter Spacing:** 0.3px - 1.5px for improved readability

### Spacing & Layout
- **Grid System:** 8px base unit (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)
- **Border Radius:** 8px - 24px (soft corners throughout)
- **Shadows:** 3-tier elevation system (sm, md, lg)

### Animations & Effects
- **Blur Values:** sm (8), md (16), lg (24)
- **Opacity Values:** light (0.1-0.3), medium (0.4-0.6), heavy (0.7-0.9)
- **Animations:** Fade, scale, slide, pulse, shimmer

## Project Structure
```
BloodLinkPlus/
├── app/                    # Expo Router file-based routing
│   ├── _layout.tsx         # Root layout
│   ├── index.tsx           # Splash screen (/)
│   ├── onboarding.tsx      # Onboarding flow
│   ├── (auth)/             # Auth route group
│   │   ├── _layout.tsx     # Auth layout
│   │   ├── login.tsx       # Login screen
│   │   ├── signup.tsx      # Signup screen
│   │   └── profile-setup.tsx
│   ├── (tabs)/             # Tab navigator group
│   │   ├── _layout.tsx     # Tab layout
│   │   ├── index.tsx       # Home screen (default tab)
│   │   ├── map.tsx         # Map screen
│   │   ├── requests.tsx    # Requests screen
│   │   └── settings.tsx    # Settings screen
│   ├── donor-profile.tsx   # Modal: Donor details
│   ├── request-blood.tsx   # Modal: Blood request form
│   └── chat.tsx            # Modal: Messaging
├── src/
│   ├── theme/              # Design system tokens
│   │   ├── colors.ts       # Color palette
│   │   ├── typography.ts   # Font sizes & weights
│   │   ├── spacing.ts      # Spacing & shadows
│   │   └── index.ts
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx      # Primary/Outline/Ghost variants
│   │   ├── Input.tsx       # Text input with labels & icons
│   │   ├── Card.tsx        # Elevated/Outlined/Flat cards
│   │   ├── StatusBadge.tsx # Color-coded status indicators
│   │   ├── FAB.tsx         # Floating action button
│   │   └── index.ts
│   └── data/               # Mock data
│       └── mockData.ts
└── package.json
```

## Key Features Implemented

### Authentication Flow
- ✓ Animated splash screen with logo
- ✓ 3-slide onboarding flow
- ✓ Login/Signup screens with medical-grade forms
- ✓ Profile setup with blood group picker

### Donor Discovery
- ✓ Home screen with search bar & filter chips
- ✓ Donor cards with availability status badges
- ✓ Distance-based sorting
- ✓ Interactive map with custom blood drop markers
- ✓ Bottom sheet donor preview

### Blood Request System
- ✓ 3-step request form (Requirements → Hospital → Details)
- ✓ Urgency level selector
- ✓ Timeline view of requests
- ✓ Status badges (Open, Accepted, Fulfilled, Cancelled)

### Communication
- ✓ WhatsApp-style chat interface
- ✓ Message bubbles with timestamps
- ✓ Contact buttons (Call, Chat)

### User Profile & Settings
- ✓ Profile card with blood group badge
- ✓ Notification & location toggles
- ✓ Account management
- ✓ Logout functionality

## Running the Project

### Development Server
```bash
cd BloodLinkPlus
npm run dev
```
The app runs on **http://localhost:5000** (configured for Replit environment)

### Available Scripts
- `npm start` - Start Expo dev server
- `npm run web` - Start web version
- `npm run dev` - Start web on port 5000 (Replit workflow)
- `npm run android` - Start Android version
- `npm run ios` - Start iOS version (requires macOS)

## Mock Data
The app includes realistic mock data for demonstration:
- **5 donors** with different blood groups and availability status
- **3 blood requests** in various states
- **4 chat messages** showing conversation flow
- **8 cities** for location selection
- **8 blood groups** (A+, A-, B+, B-, AB+, AB-, O+, O-)

## Navigation Structure (Expo Router)
```
/                          → Splash Screen (index.tsx)
/onboarding               → Onboarding Flow
/(auth)/login            → Login Screen
/(auth)/signup           → Signup Screen
/(auth)/profile-setup    → Profile Setup

/(tabs)/                  → Main Tab Navigation
  ├─> / (index)          → Home Screen
  ├─> /map               → Map Screen
  ├─> /requests          → My Requests Screen
  └─> /settings          → Settings Screen

Modal Screens:
├─> /donor-profile       → Donor Details
├─> /request-blood       → Blood Request Form
└─> /chat                → Messaging
```

## Design Tone
**"Trust, Care, Connection, Speed, Clarity, Simplicity, Empathy"**

The UI follows medical app design principles with:
- Clean, minimal layouts
- Ample white space
- Clear visual hierarchy
- Accessible touch targets (44x44px minimum)
- Color-coded status indicators
- Soft shadows for depth

## Recent Changes (October 28, 2025)
### Completed:
- ✅ **Expo Router Migration** - Migrated from React Navigation to Expo Router for file-based routing
  - Created app directory with proper route groups
  - Implemented (auth) and (tabs) route groups
  - Converted all 12 screens to use router hooks (useRouter, useLocalSearchParams)
  - Updated package.json entry point to expo-router/entry
  - Added expo-router scheme configuration
  - All navigation now uses push/replace/back instead of navigation props

- ✅ **Modern Design System** - Redesigned theme system with advanced design tokens
  - Added 14 gradient variants (primary, secondary, accent, nature-inspired)
  - Created 8 glassmorphism overlay effects with blur and opacity
  - Fixed lineHeight calculations (now pixel-based for React Native compatibility)
  - Added animation tokens (blur, opacity values)
  - Implemented ES6 imports/exports throughout theme system
  - Installed expo-linear-gradient package for gradient support

- ✅ **Authentication Screens Redesign** - Modernized all 5 auth screens with contemporary UI
  - **Splash Screen:** LinearGradient background (primary → primaryDark → primaryLight), pulse animation, glassmorphism icon container, modern typography with letter spacing
  - **Onboarding:** Per-slide gradient backgrounds, scale/opacity animations, improved navigation controls
  - **Login:** Gradient header, modern card-based form layout, glassmorphism icon container, smooth animations
  - **Signup:** Gradient header, modern card-based form, glassmorphic back button, enhanced form controls
  - **ProfileSetup:** Gradient header, color-coded blood group badges, interactive toggle switch with proper left/right positioning
  - Fixed critical lineHeight bug (converted from fractional ratios to pixel values)
  - Fixed toggle switch alignment issue (thumb now properly shifts between left/right positions)

### Currently Working On:
- [ ] Main screens redesign (Home, Map, Requests, Settings)
- [ ] Enhanced component library with modern variants
- [ ] Backend API development (Node.js + Express + MongoDB)

## Next Steps (Future v2 Features)
- [ ] Update package versions to Expo-recommended ranges
- [ ] Add real-time location tracking with opt-in
- [ ] Integrate Firebase Cloud Messaging for push notifications
- [ ] Implement donor verification badge system
- [ ] Add donation history with achievement badges
- [ ] Dark mode variant
- [ ] Multi-language support (Urdu + English)
- [ ] Backend API integration
- [ ] Hospital & blood bank listings
- [ ] Admin dashboard

## Known Limitations
- Currently uses mock data (no backend integration)
- Map markers are static (no real-time updates)
- Chat is UI-only (no real messaging)
- Package versions have minor compatibility warnings (non-blocking)

## Architecture Notes
- All styling uses StyleSheet (no styled-components or emotion)
- Components consume design tokens from theme system
- Navigation types should be refined from `any` to typed stacks
- Animated values should use `useRef` for better React lifecycle integration
