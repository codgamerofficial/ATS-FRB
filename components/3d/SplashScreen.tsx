'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 300);
    const contentTimer = setTimeout(() => setShowContent(true), 800);
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(contentTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          {/* Logo Container */}
          <div className="mb-8">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl scale-150" />
              
              {/* Logo Background */}
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-full p-8 border border-cyan-500/20 shadow-2xl">
                <div className="filter drop-shadow-lg">
                  <Logo size={100} animated={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Brand Name */}
          <div className="mb-6">
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2">
              ATSFRB
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full" />
          </div>

          {/* Tagline */}
          <div className="mb-8">
            <p className="text-xl font-semibold text-cyan-300 mb-2">
              AI-Powered Resume Builder
            </p>
            <p className="text-gray-400 text-sm">
              Crafting Your Professional Future
            </p>
          </div>

          {/* Loading Status */}
          <div className="mb-6">
            <p className="text-cyan-400 text-sm font-medium">
              {progress < 25 ? '🚀 Initializing AI algorithms...' :
               progress < 50 ? '⚡ Loading premium templates...' :
               progress < 75 ? '🎯 Optimizing ATS compatibility...' :
               progress < 95 ? '✨ Finalizing your experience...' :
               '🎉 Ready to transform your career!'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs mx-auto">
            <div className="relative bg-slate-800/60 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-cyan-500/20">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="text-cyan-400 text-lg font-bold font-mono">
                {progress.toFixed(0)}%
              </span>
              <span className="text-gray-400 text-sm font-medium">
                {progress < 100 ? 'Loading...' : 'Ready! 🚀'}
              </span>
            </div>
          </div>


        </div>
      </div>
    </AnimatePresence>
  );
}