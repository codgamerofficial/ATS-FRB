# 📱 ATS Resume Builder - Mobile App

Convert your web app to native mobile apps for Android and iOS app stores.

## 🚀 Quick Start

### Build Mobile App
```bash
npm run build:mobile
```

### Run on Android
```bash
npm run android
```

### Run on iOS (macOS only)
```bash
npm run ios
```

## 📦 App Store Deployment

### Android (Google Play Store)

1. **Build Release APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. **Generate Signed APK**
   - Open `android/` in Android Studio
   - Build > Generate Signed Bundle/APK
   - Follow signing wizard

3. **Upload to Play Console**
   - Go to [Google Play Console](https://play.google.com/console)
   - Create new app listing
   - Upload signed APK/AAB

### iOS (App Store)

1. **Open in Xcode**
   ```bash
   npx cap open ios
   ```

2. **Configure Signing**
   - Select your development team
   - Configure bundle identifier
   - Set up provisioning profiles

3. **Build for App Store**
   - Product > Archive
   - Upload to App Store Connect

## 🔧 Configuration

### App Details
- **App Name**: ATS Resume Builder
- **Package ID**: com.atsfrb.app
- **Version**: 1.0.0

### Features
- ✅ Offline resume editing
- ✅ Camera integration for video resumes
- ✅ File sharing capabilities
- ✅ Native splash screen
- ✅ Status bar customization
- ✅ Safe area handling

### Permissions
- **Camera**: Video resume recording
- **Storage**: Save/load resume files
- **Internet**: Sync and updates

## 📋 App Store Requirements

### Google Play Store
- Target API level 33+
- 64-bit architecture support
- Privacy policy URL
- App content rating
- Store listing assets

### Apple App Store
- iOS 12.0+ support
- App Store guidelines compliance
- Privacy policy
- App screenshots and metadata

## 🎨 Assets Needed

### Icons
- Android: 192x192, 512x512 PNG
- iOS: Multiple sizes (see Xcode)

### Screenshots
- Android: 1080x1920, 1920x1080
- iOS: Various device sizes

### Store Listing
- App description (4000 chars max)
- Short description (80 chars)
- Keywords and categories
- Privacy policy URL

## 🔄 Updates

### Over-the-Air Updates
```bash
# Update web content
npm run build:mobile

# Push to app stores for native updates
```

## 🛠 Development

### Debug on Device
```bash
# Android
npx cap run android --target=device

# iOS  
npx cap run ios --target=device
```

### Live Reload
```bash
# Start dev server
npm run dev

# In another terminal
npx cap run android --livereload-url=http://localhost:3000
```

## 📊 Analytics & Monitoring

### Recommended Services
- **Crashlytics**: Crash reporting
- **Analytics**: User behavior tracking
- **Performance**: App performance monitoring

## 🚀 Deployment Checklist

- [ ] Test on physical devices
- [ ] Optimize app size and performance
- [ ] Configure app signing
- [ ] Prepare store assets
- [ ] Write app description
- [ ] Set up privacy policy
- [ ] Test offline functionality
- [ ] Verify all features work natively

## 📱 Platform-Specific Notes

### Android
- Minimum SDK: 22 (Android 5.1)
- Target SDK: 33 (Android 13)
- Supports Android App Bundle (AAB)

### iOS
- Minimum iOS: 12.0
- Supports iPhone and iPad
- Requires Apple Developer Account ($99/year)

Your ATS Resume Builder is now ready for global mobile app distribution! 🌍