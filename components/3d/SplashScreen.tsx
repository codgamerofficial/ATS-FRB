'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [glitchText, setGlitchText] = useState('ATSFRB');

  useEffect(() => {
    // Glitch effect for brand name
    const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const originalText = 'ATSFRB';
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const glitched = originalText.split('').map(char => 
          Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 200);
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.5;
        
        // Phase transitions
        if (newProgress > 20 && phase === 0) setPhase(1);
        if (newProgress > 40 && phase === 1) setPhase(2);
        if (newProgress > 60 && phase === 2) setPhase(3);
        if (newProgress > 80 && phase === 3) setPhase(4);
        
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          clearInterval(glitchInterval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => {
      clearInterval(progressTimer);
      clearInterval(glitchInterval);
    };
  }, [onComplete, phase]);

  const getStatusText = () => {
    switch(phase) {
      case 0: return '⚡ INITIALIZING QUANTUM CORE';
      case 1: return '🧠 LOADING AI NEURAL NETWORKS';
      case 2: return '🎯 CALIBRATING ATS ALGORITHMS';
      case 3: return '✨ SYNCHRONIZING TEMPLATES';
      case 4: return '🚀 LAUNCHING EXPERIENCE';
      default: return '💫 READY FOR TAKEOFF';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }} />
        </div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" style={{
          animation: 'hologram-sweep 8s ease-in-out infinite'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-lg mx-auto">
          
          {/* Logo with Holographic Effect */}
          <div className="mb-12 relative">
            <div className="relative inline-block">
              {/* Multiple Glow Layers */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-500/30 blur-3xl scale-150 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-pink-500/20 blur-2xl scale-125" style={{
                animation: 'glow-rotate 4s linear infinite'
              }} />
              
              {/* Logo Container */}
              <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-full p-12 border-2 border-cyan-400/30 shadow-2xl" style={{
                boxShadow: '0 0 50px rgba(6, 182, 212, 0.3), inset 0 0 50px rgba(6, 182, 212, 0.1)'
              }}>
                <Logo size={120} animated={true} />
              </div>
              
              {/* Rotating Ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/50" style={{
                animation: 'ring-rotate 6s linear infinite'
              }} />
            </div>
          </div>

          {/* Brand Name with Glitch Effect */}
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl font-black mb-4" style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
              background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 3s ease infinite, text-glow 2s ease-in-out infinite alternate'
            }}>
              {glitchText}
            </h1>
            
            {/* Animated Underline */}
            <div className="relative h-2 w-48 mx-auto overflow-hidden rounded-full bg-gray-800/50">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" style={{
                animation: 'line-scan 2s ease-in-out infinite'
              }} />
            </div>
          </div>

          {/* Tagline with Typewriter Effect */}
          <div className="mb-12">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-3" style={{
              fontFamily: 'ui-sans-serif, system-ui, sans-serif'
            }}>
              AI-POWERED RESUME BUILDER
            </p>
            <p className="text-gray-400 text-lg font-medium tracking-wider" style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace'
            }}>
              &gt; CRAFTING_YOUR_DIGITAL_FUTURE.EXE
            </p>
          </div>

          {/* Status Display */}
          <div className="mb-8">
            <div className="bg-black/60 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4 font-mono">
              <div className="flex items-center justify-center space-x-2 text-cyan-400">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <span className="text-sm font-bold tracking-wider">{getStatusText()}</span>
              </div>
            </div>
          </div>

          {/* Futuristic Progress Bar */}
          <div className="w-full max-w-md mx-auto">
            <div className="relative">
              {/* Progress Container */}
              <div className="relative bg-black/60 backdrop-blur-sm rounded-full h-4 overflow-hidden border border-cyan-400/30" style={{
                boxShadow: 'inset 0 0 20px rgba(6, 182, 212, 0.2)'
              }}>
                {/* Progress Fill */}
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 relative transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  {/* Scanning Line */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{
                    animation: 'scan-line 1.5s ease-in-out infinite'
                  }} />
                </div>
                
                {/* Progress Markers */}
                {[25, 50, 75].map(marker => (
                  <div
                    key={marker}
                    className={`absolute top-0 bottom-0 w-0.5 transition-colors duration-300 ${
                      progress >= marker ? 'bg-white/60' : 'bg-gray-600/60'
                    }`}
                    style={{ left: `${marker}%` }}
                  />
                ))}
              </div>
              
              {/* Progress Info */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-cyan-400 text-xl font-bold font-mono" style={{
                  textShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
                }}>
                  {progress.toFixed(1)}%
                </span>
                <span className="text-purple-400 text-sm font-medium tracking-wider">
                  {progress < 100 ? 'LOADING...' : 'COMPLETE ✓'}
                </span>
              </div>
            </div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-3 h-3 bg-cyan-400 rounded-full"
                style={{
                  animation: `loading-pulse 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes glow-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes ring-rotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes text-glow {
          0% { filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5)); }
          100% { filter: drop-shadow(0 0 20px rgba(255, 0, 255, 0.8)); }
        }
        
        @keyframes line-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes hologram-sweep {
          0%, 100% { transform: translateX(-100%) skewX(-15deg); }
          50% { transform: translateX(100%) skewX(-15deg); }
        }
        
        @keyframes loading-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}