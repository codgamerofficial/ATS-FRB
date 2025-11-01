import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export default function Logo({ size = 40, className = '', animated = true }: LogoProps) {
  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  const LogoSVG = () => (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
      <defs>
        <linearGradient id={`bgGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#1e293b', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#0f172a', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id={`circuitGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#06b6d4', stopOpacity:0.8}} />
          <stop offset="100%" style={{stopColor:'#0891b2', stopOpacity:0.6}} />
        </linearGradient>
        <filter id={`glow-${size}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer Shield */}
      <path d="M100 20 L160 40 L180 100 L160 160 L100 180 L40 160 L20 100 L40 40 Z" 
            fill={`url(#bgGradient-${size})`}
            stroke="#d4af37" 
            strokeWidth="3" 
            filter={`url(#glow-${size})`}/>
      
      {/* Inner Shield */}
      <path d="M100 35 L145 50 L160 100 L145 150 L100 165 L55 150 L40 100 L55 50 Z" 
            fill="#0f172a" 
            stroke="#06b6d4" 
            strokeWidth="2"/>
      
      {/* Circuit Pattern */}
      <g stroke={`url(#circuitGradient-${size})`} strokeWidth="1.5" fill="none" opacity="0.7">
        {/* Horizontal lines */}
        <line x1="60" y1="80" x2="140" y2="80"/>
        <line x1="60" y1="100" x2="140" y2="100"/>
        <line x1="60" y1="120" x2="140" y2="120"/>
        
        {/* Vertical lines */}
        <line x1="80" y1="60" x2="80" y2="140"/>
        <line x1="100" y1="60" x2="100" y2="140"/>
        <line x1="120" y1="60" x2="120" y2="140"/>
        
        {/* Circuit nodes */}
        <circle cx="80" cy="80" r="2" fill="#06b6d4"/>
        <circle cx="120" cy="80" r="2" fill="#06b6d4"/>
        <circle cx="80" cy="120" r="2" fill="#06b6d4"/>
        <circle cx="120" cy="120" r="2" fill="#06b6d4"/>
      </g>
      
      {/* User Icon Circle */}
      <circle cx="100" cy="85" r="20" fill="#06b6d4" stroke="#d4af37" strokeWidth="2"/>
      
      {/* User Icon */}
      <g fill="#0f172a">
        {/* Head */}
        <circle cx="100" cy="80" r="6"/>
        {/* Body */}
        <path d="M88 95 Q100 90 112 95 L110 100 L90 100 Z"/>
      </g>
      
      {/* ATSFRB Text */}
      <text x="100" y="135" 
            fontFamily="Arial, sans-serif" 
            fontSize="16" 
            fontWeight="bold" 
            fill="#d4af37" 
            textAnchor="middle"
            filter={`url(#glow-${size})`}>ATSFRB</text>
    </svg>
  );

  if (!animated) {
    return <LogoSVG />;
  }

  return (
    <motion.div
      variants={logoVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="cursor-pointer"
    >
      <LogoSVG />
    </motion.div>
  );
}