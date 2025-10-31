'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SciFiCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function SciFiCard({ children, className = '', glowColor = 'cyan' }: SciFiCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 
        backdrop-blur-md border border-cyan-500/30 rounded-lg
        shadow-lg hover:shadow-cyan-500/20 transition-all duration-300
        before:absolute before:inset-0 before:rounded-lg before:p-[1px]
        before:bg-gradient-to-r before:from-cyan-500/50 before:to-purple-500/50
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
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60"></div>
    </motion.div>
  );
}