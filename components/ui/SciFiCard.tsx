'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SciFiCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  isDark?: boolean;
}

export default function SciFiCard({ children, className = '', glowColor = 'cyan', isDark = true }: SciFiCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative ${isDark ? 'bg-gradient-to-br from-gray-900/90 to-gray-800/90' : 'bg-gradient-to-br from-white/95 to-gray-50/95'}
        backdrop-blur-md border ${isDark ? 'border-cyan-500/30 hover:shadow-cyan-500/20' : 'border-blue-500/30 hover:shadow-blue-500/20'} rounded-lg
        shadow-lg transition-all duration-300
        before:absolute before:inset-0 before:rounded-lg before:p-[1px]
        ${isDark ? 'before:bg-gradient-to-r before:from-cyan-500/50 before:to-purple-500/50' : 'before:bg-gradient-to-r before:from-blue-500/50 before:to-indigo-500/50'}
        before:-z-10 before:blur-sm
        ${className}
      `}
      style={{
        boxShadow: `0 0 20px rgba(0, 255, 255, 0.1), inset 0 0 20px rgba(0, 255, 255, 0.05)`
      }}
    >
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Corner decorations */}
      <div className={`absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 ${isDark ? 'border-cyan-400/60' : 'border-blue-500/60'}`}></div>
      <div className={`absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 ${isDark ? 'border-cyan-400/60' : 'border-blue-500/60'}`}></div>
      <div className={`absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 ${isDark ? 'border-cyan-400/60' : 'border-blue-500/60'}`}></div>
      <div className={`absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 ${isDark ? 'border-cyan-400/60' : 'border-blue-500/60'}`}></div>
    </motion.div>
  );
}