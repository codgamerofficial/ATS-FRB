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
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          {/* Logo Container */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0, opacity: 0, rotateY: -180 }}
              animate={showLogo ? { 
                scale: 1, 
                opacity: 1, 
                rotateY: 0
              } : {}}
              transition={{ 
                duration: 1.2, 
                type: "spring", 
                stiffness: 100,
                damping: 15
              }}
              className="relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl scale-150" />
              
              {/* Logo Background */}
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-full p-8 border border-cyan-500/20 shadow-2xl">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    filter: [
                      'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))',
                      'drop-shadow(0 0 30px rgba(6, 182, 212, 0.8))',
                      'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))'
                    ]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Logo size={100} animated={true} />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2">
              ATSFRB
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full" />
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-xl font-semibold text-cyan-300 mb-2">
              AI-Powered Resume Builder
            </p>
            <p className="text-gray-400 text-sm">
              Crafting Your Professional Future
            </p>
          </motion.div>

          {/* Loading Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6"
          >
            <motion.p
              className="text-cyan-400 text-sm font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {progress < 25 ? '🚀 Initializing AI algorithms...' :
               progress < 50 ? '⚡ Loading premium templates...' :
               progress < 75 ? '🎯 Optimizing ATS compatibility...' :
               progress < 95 ? '✨ Finalizing your experience...' :
               '🎉 Ready to transform your career!'}
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={showContent ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full max-w-xs mx-auto"
          >
            <div className="relative bg-slate-800/60 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-cyan-500/20">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <motion.span 
                className="text-cyan-400 text-lg font-bold font-mono"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(6, 182, 212, 0.8)',
                    '0 0 20px rgba(6, 182, 212, 1)',
                    '0 0 10px rgba(6, 182, 212, 0.8)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {progress.toFixed(0)}%
              </motion.span>
              <span className="text-gray-400 text-sm font-medium">
                {progress < 100 ? 'Loading...' : 'Ready! 🚀'}
              </span>
            </div>
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}