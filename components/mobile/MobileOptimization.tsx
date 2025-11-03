'use client';

import { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, Zap } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';

export default function MobileOptimization() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 640) setDeviceType('mobile');
      else if (width < 1024) setDeviceType('tablet');
      else setDeviceType('desktop');
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'tablet': return <Tablet className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SciFiCard className="p-3 max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-cyan-400">{getDeviceIcon()}</div>
          <span className="text-white text-sm font-semibold capitalize">{deviceType}</span>
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
        </div>
        
        <div className="flex items-center gap-2 text-xs">
          <Zap className="w-3 h-3 text-green-400" />
          <span className="text-gray-300">Optimized for {deviceType}</span>
        </div>
        
        {!isOnline && (
          <div className="mt-2 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-300">
            Offline mode active
          </div>
        )}
      </SciFiCard>
    </div>
  );
}