# ATS Resume Builder - React Native + Expo

A comprehensive React Native mobile application for building professional resumes, converted from the Next.js web application to provide a seamless mobile experience.

## 📱 Features

### ✅ Completed Features
- **Authentication System**: Sign up, sign in, password reset with Supabase
- **Multi-step Resume Builder**: Step-by-step form with progress tracking
- **Template System**: Browse and select from resume templates
- **State Management**: Zustand stores with AsyncStorage persistence
- **Navigation**: Drawer + Bottom Tab navigation structure
- **Theme System**: Light/dark mode with React Native Paper
- **Error Handling**: Comprehensive error boundaries

### 🚧 Planned Features
- AI-powered resume insights and suggestions
- PDF generation and export
- Resume analytics and ATS scoring
- Template customization
- Multi-language support

## 🏗 Architecture

### Project Structure
```
react-native-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # ErrorBoundary, Loading states
│   │   └── navigation/     # DrawerContent, Navigation components
│   ├── contexts/           # React Context providers
│   │   ├── AuthContext.tsx # Authentication state
│   │   └── ThemeContext.tsx # Theme management
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # External services
│   │   └── supabase.ts     # Supabase client configuration
│   ├── navigation/         # Navigation configuration
│   │   └── RootNavigator.tsx
│   ├── screens/            # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── HomeScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── TemplatesScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── BuilderScreen.tsx
│   ├── store/              # Zustand stores
│   │   └── resumeStore.ts
│   ├── types/              # TypeScript type definitions
│   ├── constants/          # App constants
│   │   └── theme.ts        # React Native Paper theme
│   └── App.tsx             # Root component
├── package.json
├── app.json                # Expo configuration
├── tsconfig.json           # TypeScript configuration
└── .env.example            # Environment variables template
```

### Navigation Structure
```
RootNavigator
├── AuthStack (if not authenticated)
│   ├── LoginScreen
│   ├── RegisterScreen
│   └── ForgotPasswordScreen
└── MainDrawerNavigator (if authenticated)
    ├── MainTabNavigator
    │   ├── HomeScreen
    │   ├── TemplatesScreen
    │   ├── DashboardScreen
    │   └── ProfileScreen
    ├── BuilderScreen
    └── SettingsScreen
```

## 🛠 Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **UI Library**: React Native Paper
- **State Management**: Zustand with AsyncStorage persistence
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Forms**: React Hook Form + Yup validation
- **Icons**: React Native Vector Icons
- **Storage**: AsyncStorage for offline persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your phone (for testing)

### Installation

1. **Install dependencies**:
   ```bash
   cd react-native-app
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Configure Supabase**:
   - Create a new Supabase project
   - Copy your project URL and anon key to `.env`
   - Run the database schema (see `/lib/supabase` folder)

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Run on device/emulator**:
   ```bash
   # Android
   npm run android
   
   # iOS  
   npm run ios
   
   # Expo Go (scan QR code)
   npm start
   ```

## 📋 Migration Summary

### What's Changed
- **Styling**: Tailwind CSS → React Native Paper components
- **Navigation**: Next.js pages → React Navigation stack/drawer/tabs
- **Storage**: Browser localStorage → React Native AsyncStorage
- **Icons**: Lucide React → React Native Vector Icons
- **Forms**: React Hook Form with React Native TextInput components

### Preserved Features
- ✅ All authentication functionality
- ✅ Resume data structure and state management
- ✅ Supabase integration
- ✅ Theme switching (light/dark mode)
- ✅ Error handling and loading states
- ✅ Mobile-responsive design patterns

### Key Differences
- **Mobile-first**: All components optimized for touch interactions
- **Offline Support**: AsyncStorage for local data persistence
- **Native Navigation**: Drawer and bottom tab navigation
- **Paper Design**: Material Design 3 with React Native Paper

## 🔧 Development

### Adding New Features
1. Create screen in `src/screens/`
2. Add navigation routes in `src/navigation/RootNavigator.tsx`
3. Update types in `src/types/index.ts`
4. Add state management to `src/store/`
5. Use React Native Paper components for consistency

### Code Style
- Use TypeScript for all new files
- Follow React Native Paper component patterns
- Use React Hook Form for form handling
- Implement proper error boundaries
- Add loading states for async operations

## 📱 Testing

### Manual Testing
1. Test authentication flow (signup, signin, signout)
2. Test resume builder step progression
3. Test template selection
4. Test theme switching
5. Test offline functionality

### Automated Testing (Planned)
- Unit tests with Jest
- Component testing with React Native Testing Library
- E2E testing with Detox

## 🚀 Deployment

### Android
```bash
npm run build:android
```

### iOS
```bash
npm run build:ios
```

### Expo Application Services (EAS)
```bash
eas build --platform android
eas build --platform ios
```

## 📝 Configuration Files

### app.json
- App metadata and configuration
- Platform-specific settings
- Expo plugins and assets

### package.json
- Dependencies for React Native + Expo
- Development scripts
- Expo version compatibility

### tsconfig.json
- TypeScript configuration
- Path aliases for clean imports

## 🔍 Troubleshooting

### Common Issues
1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS build errors**: Run `pod install` in `ios/` directory
3. **Android build errors**: Check Gradle version compatibility
4. **TypeScript errors**: Ensure proper type definitions

### Debugging
- Use Expo Developer Tools for debugging
- Check Metro logs for bundling issues
- Use React Native debugger for Redux DevTools
- Check device logs with `adb logcat` (Android) or Console.app (iOS)

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation v6](https://reactnavigation.org/)
- [React Native Paper](https://reactnativepaper.com/)
- [Supabase React Native](https://supabase.com/docs/guides/getting-started/quickstarts/react-native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the ATS Resume Builder application.