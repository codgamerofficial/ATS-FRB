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
        <linearGradient id={`shieldGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#0f4c75', stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:'#1e3a8a', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#0f172a', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id={`goldGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#d97706', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id={`circuitGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#06b6d4', stopOpacity:0.9}} />
          <stop offset="100%" style={{stopColor:'#0891b2', stopOpacity:0.7}} />
        </linearGradient>
        <filter id={`glow-${size}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id={`textGlow-${size}`}>
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Main Shield Shape */}
      <path d="M100 15 L170 35 L185 100 L170 165 L100 185 L30 165 L15 100 L30 35 Z" 
            fill={`url(#shieldGradient-${size})`}
            stroke={`url(#goldGradient-${size})`}
            strokeWidth="4" 
            filter={`url(#glow-${size})`}/>
      
      {/* Inner Shield Border */}
      <path d="M100 25 L160 42 L172 100 L160 158 L100 175 L40 158 L28 100 L40 42 Z" 
            fill="none" 
            stroke={`url(#goldGradient-${size})`}
            strokeWidth="2" 
            opacity="0.6"/>
      
      {/* Advanced Circuit Pattern */}
      <g stroke={`url(#circuitGradient-${size})`} strokeWidth="1.5" fill="none" opacity="0.8">
        {/* Main circuit lines */}
        <line x1="50" y1="70" x2="85" y2="70"/>
        <line x1="115" y1="70" x2="150" y2="70"/>
        <line x1="50" y1="100" x2="85" y2="100"/>
        <line x1="115" y1="100" x2="150" y2="100"/>
        <line x1="50" y1="130" x2="85" y2="130"/>
        <line x1="115" y1="130" x2="150" y2="130"/>
        
        {/* Vertical connections */}
        <line x1="70" y1="50" x2="70" y2="85"/>
        <line x1="100" y1="50" x2="100" y2="65"/>
        <line x1="130" y1="50" x2="130" y2="85"/>
        <line x1="70" y1="115" x2="70" y2="150"/>
        <line x1="100" y1="135" x2="100" y2="150"/>
        <line x1="130" y1="115" x2="130" y2="150"/>
        
        {/* Circuit nodes */}
        <circle cx="70" cy="70" r="2.5" fill="#06b6d4"/>
        <circle cx="130" cy="70" r="2.5" fill="#06b6d4"/>
        <circle cx="70" cy="130" r="2.5" fill="#06b6d4"/>
        <circle cx="130" cy="130" r="2.5" fill="#06b6d4"/>
        <circle cx="50" cy="100" r="2" fill="#f59e0b"/>
        <circle cx="150" cy="100" r="2" fill="#f59e0b"/>
      </g>
      
      {/* Central Professional Icon Circle */}
      <circle cx="100" cy="100" r="25" 
              fill={`url(#goldGradient-${size})`}
              stroke="#0f172a" 
              strokeWidth="2" 
              filter={`url(#glow-${size})`}/>
      
      {/* Professional User Icon */}
      <g fill="#0f172a">
        {/* Head */}
        <circle cx="100" cy="92" r="7"/>
        {/* Suit/Body */}
        <path d="M85 110 Q100 105 115 110 L113 118 L87 118 Z"/>
        {/* Tie */}
        <path d="M98 105 L102 105 L101 115 L99 115 Z" fill="#1e40af"/>
      </g>
      
      {/* Brand Text */}
      <text x="100" y="155" 
            fontFamily="'Segoe UI', Arial, sans-serif" 
            fontSize="18" 
            fontWeight="900" 
            fill={`url(#goldGradient-${size})`}
            textAnchor="middle"
            filter={`url(#textGlow-${size})`}>ATSFRB</text>
      
      {/* Subtitle */}
      <text x="100" y="170" 
            fontFamily="'Segoe UI', Arial, sans-serif" 
            fontSize="8" 
            fontWeight="600" 
            fill="#06b6d4" 
            textAnchor="middle"
            opacity="0.9">AI RESUME BUILDER</text>
    </svg>
  );

  if (!animated) {
    return <LogoSVG />;
  }

  return (
    <div className="cursor-pointer">
      <motion.div
        variants={logoVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <LogoSVG />
      </motion.div>
    </div>
  );
}