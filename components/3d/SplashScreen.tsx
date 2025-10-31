'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setShowLogo(true), 500);
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)'
        }}
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }} />
        </div>

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Main Content */}
        <div className="text-center relative z-10">
          {/* 3D Logo Container */}
          <motion.div
            initial={{ scale: 0, rotateY: -180, rotateX: 45 }}
            animate={showLogo ? { 
              scale: 1, 
              rotateY: 0, 
              rotateX: 0,
              rotateZ: [0, 5, -5, 0]
            } : {}}
            transition={{ 
              duration: 1.2, 
              type: "spring", 
              stiffness: 80,
              rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="mb-8 perspective-1000"
          >
            <div className="relative transform-gpu">
              {/* Outer Glow Ring */}
              <motion.div 
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(0, 255, 255, 0.3)',
                    '0 0 80px rgba(0, 255, 255, 0.6)',
                    '0 0 40px rgba(0, 255, 255, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Logo Background */}
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-full p-8 border border-cyan-400/30">
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <FileText className="h-20 w-20 text-cyan-400" style={{
                    filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))'
                  }} />
                </motion.div>
              </div>
              
              {/* Corner Decorations */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400"></div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30, rotateX: 90 }}
            animate={showLogo ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            className="text-5xl font-bold text-white mb-3"
            style={{
              textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)'
            }}
          >
            ATSFRB
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={showLogo ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-cyan-300 mb-8 text-lg tracking-wider"
          >
            Advanced Resume Builder
          </motion.p>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={showLogo ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-cyan-100 mb-8 text-sm"
          >
            Initializing quantum resume algorithms...
          </motion.p>

          {/* Progress Bar */}
          <div className="w-80 mx-auto">
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-cyan-500/30">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.6)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-between items-center mt-3"
            >
              <span className="text-cyan-300 text-sm font-mono">{progress.toFixed(0)}%</span>
              <span className="text-cyan-300 text-sm">Loading...</span>
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          .perspective-1000 {
            perspective: 1000px;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}