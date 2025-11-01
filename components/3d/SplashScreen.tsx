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
          {/* Enhanced 3D Logo Container */}
          <div className="relative mb-8">
            {/* Rotating Outer Ring */}
            <div className="absolute inset-0 w-64 h-64 mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-2 border-dashed border-cyan-400/30"></div>
              </motion.div>
            </div>
            
            {/* Pulsing Energy Rings */}
            <div className="absolute inset-0 w-56 h-56 mx-auto my-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-full rounded-full border border-gold-400/40 bg-gradient-to-r from-cyan-400/10 to-purple-400/10"></div>
              </motion.div>
            </div>
            
            {/* Main Logo Container */}
            <div className="relative z-10 transform-gpu perspective-1000">
              <motion.div
                initial={{ scale: 0, rotateY: -180, rotateX: 45, z: -100 }}
                animate={showLogo ? { 
                  scale: 1, 
                  rotateY: [0, 360], 
                  rotateX: 0,
                  z: 0,
                  rotateZ: [0, 5, -5, 0]
                } : {}}
                transition={{ 
                  duration: 2, 
                  type: "spring", 
                  stiffness: 60,
                  rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                  rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}

            >
              <div className="relative">
                {/* Glowing Background */}
                <div className="absolute inset-0 rounded-full">
                  <motion.div 
                    animate={{
                      boxShadow: [
                        '0 0 60px rgba(251, 191, 36, 0.4), 0 0 120px rgba(6, 182, 212, 0.3)',
                        '0 0 100px rgba(251, 191, 36, 0.7), 0 0 200px rgba(6, 182, 212, 0.5)',
                        '0 0 60px rgba(251, 191, 36, 0.4), 0 0 120px rgba(6, 182, 212, 0.3)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                  />
                </div>
                
                {/* Logo Container with Enhanced Background */}
                <div className="relative bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-black/95 backdrop-blur-xl rounded-full p-12 border-2 border-gradient-to-r from-gold-400 to-cyan-400">
                  {/* Circuit Animation Overlay */}
                  <div className="absolute inset-4 rounded-full">
                    <motion.div
                      style={{
                        background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
                        width: '100%', 
                        height: '100%', 
                        borderRadius: '50%'
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  
                  {/* Main Logo with Multiple Animations */}
                  <motion.div
                    animate={{ 
                      rotateY: [0, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      rotateY: { duration: 12, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 40px rgba(6, 182, 212, 0.6))'
                    }}
                  >
                    <Logo size={120} animated={false} />
                  </motion.div>
                </div>
                
                {/* Animated Corner Elements */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`absolute w-8 h-8 border-2 border-gold-400 ${
                      i === 0 ? '-top-4 -left-4 border-r-0 border-b-0' :
                      i === 1 ? '-top-4 -right-4 border-l-0 border-b-0' :
                      i === 2 ? '-bottom-4 -left-4 border-r-0 border-t-0' :
                      '-bottom-4 -right-4 border-l-0 border-t-0'
                    }`}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                ))}
                
                {/* Orbiting Elements */}
                {[0, 1, 2].map((i) => (
                  <div
                    key={`orbit-${i}`}
                    className="absolute w-3 h-3"
                    style={{
                      top: '50%',
                      left: '50%'
                    }}
                  >
                    <motion.div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to right, #06b6d4, #f59e0b)',
                        borderRadius: '50%',
                        transformOrigin: '0 0'
                      }}
                      animate={{
                        rotate: 360,
                        x: Math.cos((i * 120) * Math.PI / 180) * 140,
                        y: Math.sin((i * 120) * Math.PI / 180) * 140
                      }}
                      transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>
                ))}
              </div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Title with Typewriter Effect */}
          <motion.div className="mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 50, rotateX: 90 }}
              animate={showLogo ? { 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                textShadow: [
                  '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(6, 182, 212, 0.6)',
                  '0 0 30px rgba(251, 191, 36, 1), 0 0 60px rgba(6, 182, 212, 0.8)',
                  '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(6, 182, 212, 0.6)'
                ]
              } : {}}
              transition={{ 
                delay: 0.8, 
                duration: 1, 
                type: "spring",
                textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-6xl md:text-7xl font-black bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-400 bg-clip-text text-transparent mb-4"
            >
              ATSFRB
            </motion.h1>
            
            {/* Animated Underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={showLogo ? { width: '100%' } : {}}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto max-w-xs"
            />
          </motion.div>

          {/* Enhanced Subtitle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={showLogo ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <p className="text-2xl md:text-3xl font-bold text-cyan-300 mb-2">
              AI-Powered Resume Builder
            </p>
            <p className="text-lg text-cyan-100/80">
              Crafting Your Professional Future
            </p>
          </motion.div>

          {/* Dynamic Loading Messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showLogo ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mb-8"
          >
            <motion.p
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-cyan-200 text-lg font-medium"
            >
              {progress < 30 ? '🚀 Initializing AI algorithms...' :
               progress < 60 ? '⚡ Loading premium templates...' :
               progress < 90 ? '🎯 Optimizing ATS compatibility...' :
               '✨ Almost ready to transform your career!'}
            </motion.p>
          </motion.div>

          {/* Enhanced Progress Bar */}
          <div className="w-96 mx-auto">
            <div className="relative bg-slate-800/60 backdrop-blur-md rounded-full h-4 overflow-hidden border-2 border-gradient-to-r from-gold-400/30 to-cyan-400/30 shadow-lg">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700/50 to-slate-600/50" />
              
              {/* Progress Fill */}
              <motion.div
                className="relative h-full bg-gradient-to-r from-gold-400 via-yellow-300 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  boxShadow: '0 0 20px rgba(251, 191, 36, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                }}
              >
                {/* Animated Shine Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Progress Indicator Dot */}
              <motion.div
                className="absolute top-1/2 w-6 h-6 bg-white rounded-full border-2 border-gold-400 shadow-lg transform -translate-y-1/2"
                style={{ left: `${progress}%` }}
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    '0 0 10px rgba(251, 191, 36, 0.6)',
                    '0 0 20px rgba(251, 191, 36, 1)',
                    '0 0 10px rgba(251, 191, 36, 0.6)'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            
            {/* Progress Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="flex justify-between items-center mt-4"
            >
              <motion.span 
                className="text-gold-300 text-xl font-bold font-mono"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(251, 191, 36, 0.8)',
                    '0 0 20px rgba(251, 191, 36, 1)',
                    '0 0 10px rgba(251, 191, 36, 0.8)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {progress.toFixed(0)}%
              </motion.span>
              <span className="text-cyan-300 text-lg font-semibold">
                {progress < 100 ? 'Loading...' : 'Ready! 🚀'}
              </span>
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