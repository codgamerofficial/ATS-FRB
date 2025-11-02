'use client';

import { ReactNode } from 'react';

interface SciFiCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  isDark?: boolean;
  variant?: 'default' | 'premium' | 'glow' | 'minimal';
  interactive?: boolean;
}

export default function SciFiCard({ 
  children, 
  className = '', 
  glowColor = 'cyan', 
  isDark = true,
  variant = 'default',
  interactive = true
}: SciFiCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'premium':
        return 'bg-gradient-to-br from-purple-900/95 to-pink-900/95 border-purple-400/50 shadow-purple-500/30';
      case 'glow':
        return 'bg-gray-900/95 border-cyan-400/70 shadow-cyan-400/40 animate-pulse';
      case 'minimal':
        return 'bg-gray-800/70 border-gray-500/40 shadow-gray-400/20';
      default:
        return isDark 
          ? 'bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-cyan-500/40 shadow-cyan-500/25' 
          : 'bg-gradient-to-br from-white/98 to-gray-50/98 border-blue-500/40 shadow-blue-500/25';
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl ${getVariantStyles()} border-2 backdrop-blur-xl shadow-2xl ${interactive ? 'hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-2' : ''} transition-all duration-500 ease-out ${className}`}>
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Enhanced corner accents */}
      <div className="absolute top-0 left-0 w-12 h-12">
        <div className={`absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 ${isDark ? 'border-cyan-400/70' : 'border-blue-500/70'} rounded-tl-xl group-hover:border-cyan-300 transition-colors duration-300`} />
        <div className={`absolute top-1 left-1 w-2 h-2 ${isDark ? 'bg-cyan-400/50' : 'bg-blue-500/50'} rounded-full animate-pulse`} />
      </div>
      <div className="absolute bottom-0 right-0 w-12 h-12">
        <div className={`absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 ${isDark ? 'border-cyan-400/70' : 'border-blue-500/70'} rounded-br-xl group-hover:border-cyan-300 transition-colors duration-300`} />
        <div className={`absolute bottom-1 right-1 w-2 h-2 ${isDark ? 'bg-cyan-400/50' : 'bg-blue-500/50'} rounded-full animate-pulse`} />
      </div>
      
      {/* Floating particles */}
      <div className={`absolute top-4 right-4 w-1 h-1 ${isDark ? 'bg-cyan-400/60' : 'bg-blue-500/60'} rounded-full animate-ping`} />
      <div className={`absolute bottom-6 left-6 w-1 h-1 ${isDark ? 'bg-purple-400/60' : 'bg-indigo-500/60'} rounded-full animate-ping`} style={{ animationDelay: '1s' }} />
      
      {/* Holographic effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'skewX(-12deg)' }} />
    </div>
  );
}