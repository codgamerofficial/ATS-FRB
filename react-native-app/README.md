# React Native + Expo Mobile App Setup

## 📱 Beautiful Resume Builder App

This is a beautiful, modern React Native + Expo app for building professional resumes. The app has been optimized to remove Capacitor dependencies and provide a seamless mobile experience.

## ✨ Features

- **Beautiful Modern UI** - Clean, gradient-based design with smooth animations
- **React Native + Expo** - Fast development and hot reloading
- **Supabase Integration** - Authentication and database
- **Custom Components** - Reusable Button, Input, and Card components
- **Responsive Design** - Optimized for all screen sizes
- **Dark/Light Theme Support** - Beautiful color schemes

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Expo CLI installed globally: `npm install -g @expo/cli`
- Expo Go app on your phone (for testing)

### Installation

1. **Navigate to the React Native app directory:**
   ```bash
   cd react-native-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on your device:**
   - **iOS:** Scan QR code with Expo Go app or press `i` in the terminal
   - **Android:** Scan QR code with Expo Go app or press `a` in the terminal
   - **Web:** Press `w` in the terminal to open in browser

## 📦 Project Structure

```
react-native-app/
├── src/
│   ├── components/
│   │   └── ui/              # Reusable UI components
│   │       ├── Button.tsx   # Beautiful button component
│   │       ├── Card.tsx     # Card component with variants
│   │       └── Input.tsx    # Input component with validation
│   ├── screens/
│   │   ├── auth/            # Authentication screens
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   └── ForgotPasswordScreen.tsx
│   │   ├── HomeScreen.tsx   # Beautiful home screen
│   │   ├── DashboardScreen.tsx
│   │   ├── BuilderScreen.tsx
│   │   ├── TemplatesScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── theme/
│   │   └── Theme.ts         # Centralized theme and styling
│   ├── contexts/
│   │   ├── AuthContext.tsx  # Authentication state management
│   │   └── ThemeContext.tsx # Theme management
│   ├── navigation/
│   │   └── RootNavigator.tsx # Navigation setup
│   ├── lib/
│   │   └── supabase.ts      # Supabase client configuration
│   └── App.tsx              # Main app component
├── package.json
├── app.json                 # Expo configuration
├── babel.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Colors
- **Primary:** `#6366f1` (Modern Indigo)
- **Secondary:** `#06b6d4` (Cyan)
- **Accent:** `#f59e0b` (Amber)
- **Background:** `#f8fafc` (Light Gray)
- **Surface:** `#ffffff` (White)

### Components
- **Button:** Multiple variants (primary, secondary, outline, gradient)
- **Input:** With validation, icons, and different styles
- **Card:** Various styles (default, elevated, gradient, outlined)

## 🏗️ Available Scripts

```bash
# Start development server
npm start

# Run on specific platforms
npm run ios          # iOS simulator
npm run android      # Android emulator
npm run web          # Web browser

# Build for production
npm run build:ios
npm run build:android

# Code quality
npm run lint         # ESLint
npm run type-check   # TypeScript
```

## 🔧 Configuration

### Expo Configuration (`app.json`)
```json
{
  "expo": {
    "name": "ATS Resume Builder",
    "slug": "ats-resume-builder",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#6366f1"
    }
  }
}
```

### Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔐 Authentication Setup

The app uses Supabase for authentication:

1. **Install Supabase:**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Configure Supabase client:**
   ```typescript
   // src/lib/supabase.ts
   import { createClient } from '@supabase/supabase-js';
   
   const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
   const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
   
   export const supabase = createClient(supabaseUrl, supabaseKey);
   ```

## 📱 Deployment

### Development Build
```bash
# iOS
expo build:ios

# Android
expo build:android
```

### EAS Build (Recommended)
1. Install EAS CLI: `npm install -g @expo/eas-cli`
2. Login: `eas login`
3. Configure: `eas build:configure`
4. Build: `eas build --platform ios` or `eas build --platform android`

## 🎯 Key Features Implemented

### ✨ Beautiful UI Components
- **Modern Gradient Design** - Eye-catching gradients and colors
- **Consistent Spacing** - Unified spacing system
- **Smooth Animations** - Beautiful transitions and effects
- **Responsive Layout** - Works on all device sizes

### 🔧 Custom Components
- **Button Component** - Multiple variants and states
- **Input Component** - With validation and error states
- **Card Component** - Various card styles
- **Theme System** - Centralized styling system

### 📱 Navigation
- **React Navigation** - Stack and tab navigation
- **Deep Linking** - Handle app URL schemes
- **Navigation State** - Persist navigation state

### 🔐 Authentication
- **Supabase Auth** - Email/password authentication
- **Protected Routes** - Guarded navigation
- **User State** - Global user state management

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues:**
   ```bash
   npx expo start --clear
   ```

2. **iOS simulator issues:**
   ```bash
   npx expo install --fix
   ```

3. **Android emulator issues:**
   ```bash
   adb reverse tcp:8081 tcp:8081
   ```

### Development Tips

1. **Enable Fast Refresh** - Keep it enabled for better development experience
2. **Use Expo Doctor** - `expo doctor` to check for issues
3. **Clear Cache** - `expo start -c` for clean start

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for all new files
3. Add proper documentation
4. Test on multiple devices

## 📄 License

This project is licensed under the MIT License.