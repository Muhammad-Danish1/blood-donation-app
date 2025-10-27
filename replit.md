# BloodLink+ - Blood Donation & Donor Finder Platform

## Project Overview
BloodLink+ is an enterprise-grade mobile blood donation platform built with Expo (React Native) and TypeScript. The app connects blood donors and recipients through real-time location tracking, map visualization, and smart search filters with a trustworthy, medical-grade UI.

**Created:** October 27, 2025  
**Status:** MVP Complete ✓

## Tech Stack
- **Framework:** Expo (React Native) with TypeScript
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **Maps:** react-native-maps (Google Maps)
- **Styling:** React Native StyleSheet (no CSS-in-JS)
- **Icons:** @expo/vector-icons (Ionicons)
- **Location:** expo-location
- **Image Picker:** expo-image-picker

## Design System

### Color Palette
- **Primary:** Crimson Red (#D32F2F)
- **Secondary:** Deep Blue (#1976D2)
- **Success:** Light Green (#4CAF50)
- **Gray:** Cool Gray (#ECECEC)

### Typography
- **Font:** System font (fallback for Inter/Poppins)
- **Sizes:** 12px - 36px scale
- **Weights:** Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing & Layout
- **Grid System:** 8px base unit (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)
- **Border Radius:** 8px - 24px (soft corners throughout)
- **Shadows:** 3-tier elevation system (sm, md, lg)

## Project Structure
```
BloodLinkPlus/
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
│   ├── screens/            # All app screens
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── ProfileSetupScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── DonorProfileScreen.tsx
│   │   ├── RequestBloodScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── MyRequestsScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── index.ts
│   ├── navigation/         # Navigation setup
│   │   └── AppNavigator.tsx
│   └── data/               # Mock data
│       └── mockData.ts
├── App.tsx                 # Entry point
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

## Navigation Structure
```
Splash
  └─> Onboarding
       └─> Login <──> Signup
            └─> ProfileSetup
                 └─> Main (Tab Navigator)
                      ├─> Home
                      ├─> Map
                      ├─> Requests
                      └─> Settings
                           
Modal/Stack Screens:
├─> DonorProfile
├─> RequestBlood
└─> Chat
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
