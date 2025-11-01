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

  useEffect(() => {
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
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)'
        }}
      >
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <div style={{ position: 'relative', zIndex: 10, transformStyle: 'preserve-3d', perspective: '1000px' }}>
              <motion.div
                initial={{ scale: 0, rotateY: -180, rotateX: 45 }}
                animate={showLogo ? { 
                  scale: 1, 
                  rotateY: [0, 360], 
                  rotateX: 0,
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
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95), rgba(0, 0, 0, 0.95))',
                    backdropFilter: 'blur(24px)',
                    borderRadius: '50%',
                    padding: '3rem',
                    border: '2px solid transparent',
                    backgroundImage: 'linear-gradient(to right, #f59e0b, #06b6d4)'
                  }}>
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
                </div>
              </motion.div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              fontSize: '4rem',
              fontWeight: '900',
              background: 'linear-gradient(to right, #f59e0b, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              <motion.h1
                initial={{ opacity: 0, y: 50, rotateX: 90 }}
                animate={showLogo ? { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0
                } : {}}
                transition={{ 
                  delay: 0.8, 
                  duration: 1, 
                  type: "spring"
                }}
                style={{
                  textShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(6, 182, 212, 0.6)'
                }}
              >
                ATSFRB
              </motion.h1>
            </div>
            
            <div style={{
              height: '4px',
              background: 'linear-gradient(to right, transparent, #06b6d4, transparent)',
              margin: '0 auto',
              maxWidth: '18rem'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={showLogo ? { width: '100%' } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
                style={{ height: '100%', background: '#06b6d4' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={showLogo ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.8, type: "spring" }}
            >
              <p style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                color: '#67e8f9',
                marginBottom: '0.5rem'
              }}>
                AI-Powered Resume Builder
              </p>
              <p style={{
                fontSize: '1.125rem',
                color: 'rgba(165, 243, 252, 0.8)'
              }}>
                Crafting Your Professional Future
              </p>
            </motion.div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={showLogo ? { opacity: 1 } : {}}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <div style={{
                color: '#a5f3fc',
                fontSize: '1.125rem',
                fontWeight: '500'
              }}>
                <motion.p
                  animate={{
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {progress < 30 ? '🚀 Initializing AI algorithms...' :
                   progress < 60 ? '⚡ Loading premium templates...' :
                   progress < 90 ? '🎯 Optimizing ATS compatibility...' :
                   '✨ Almost ready to transform your career!'}
                </motion.p>
              </div>
            </motion.div>
          </div>

          <div style={{ width: '24rem', margin: '0 auto' }}>
            <div style={{
              position: 'relative',
              background: 'rgba(30, 41, 59, 0.6)',
              backdropFilter: 'blur(12px)',
              borderRadius: '9999px',
              height: '1rem',
              overflow: 'hidden',
              border: '2px solid rgba(251, 191, 36, 0.3)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(71, 85, 105, 0.5), rgba(75, 85, 99, 0.5))'
              }} />
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  position: 'relative',
                  height: '100%',
                  background: 'linear-gradient(to right, #f59e0b, #fbbf24, #06b6d4)',
                  borderRadius: '9999px',
                  boxShadow: '0 0 20px rgba(251, 191, 36, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                }}
              >
                <motion.div 
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)'
                  }}
                />
              </motion.div>
              
              <motion.div
                style={{ 
                  position: 'absolute',
                  top: '50%',
                  left: `${progress}%`,
                  width: '24px',
                  height: '24px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  border: '2px solid #f59e0b',
                  transform: 'translateY(-50%)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
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
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem'
              }}
            >
              <motion.span 
                style={{
                  color: '#fbbf24',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace'
                }}
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
              <span style={{ color: '#67e8f9', fontSize: '1.125rem', fontWeight: '600' }}>
                {progress < 100 ? 'Loading...' : 'Ready! 🚀'}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}