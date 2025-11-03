'use client';

import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export default function MobileApp({ children }: { children: React.ReactNode }) {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const initMobileApp = async () => {
      if (Capacitor.isNativePlatform()) {
        setIsNative(true);
        
        // Configure status bar
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#0f172a' });
        
        // Hide splash screen after app loads
        setTimeout(async () => {
          await SplashScreen.hide();
        }, 2000);
      }
    };

    initMobileApp();
  }, []);

  return (
    <div className={`min-h-screen ${isNative ? 'pt-safe-top pb-safe-bottom' : ''}`}>
      {children}
      
      {/* Mobile App Specific Styles */}
      {isNative && (
        <style jsx global>{`
          .pt-safe-top {
            padding-top: env(safe-area-inset-top);
          }
          .pb-safe-bottom {
            padding-bottom: env(safe-area-inset-bottom);
          }
          .pl-safe-left {
            padding-left: env(safe-area-inset-left);
          }
          .pr-safe-right {
            padding-right: env(safe-area-inset-right);
          }
        `}</style>
      )}
    </div>
  );
}