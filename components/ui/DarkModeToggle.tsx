'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const { isDark, toggleDark, isLoaded } = useDarkMode();

  if (!isLoaded) {
    return (
      <div className="w-12 h-6 sm:w-16 sm:h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  return (
    <motion.button
      onClick={toggleDark}
      className="relative w-12 h-6 sm:w-16 sm:h-8 rounded-full p-0.5 sm:p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 active:scale-95"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
          : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-lg flex items-center justify-center overflow-hidden"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
        }}
        animate={{
          x: isDark ? 'calc(100% + 4px)' : 0,
          rotate: isDark ? 360 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          duration: 0.4
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isDark 
              ? '0 0 15px rgba(251, 191, 36, 0.5), inset 0 0 8px rgba(245, 158, 11, 0.2)'
              : '0 0 12px rgba(59, 130, 246, 0.3), inset 0 0 6px rgba(255, 255, 255, 0.6)'
          }}
          transition={{ duration: 0.3 }}
        />
        
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-800" />
              {/* Moon craters */}
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-gray-600 rounded-full opacity-60" />
              <div className="absolute top-2 right-0.5 w-0.5 h-0.5 bg-gray-600 rounded-full opacity-40" />
              <div className="absolute bottom-0.5 left-1 w-0.5 h-0.5 bg-gray-600 rounded-full opacity-50" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -180 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated rays for sun */}
        {!isDark && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-1.5 sm:h-2 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full"
                style={{
                  top: '-4px',
                  left: '50%',
                  transformOrigin: '50% 14px',
                  transform: `translateX(-50%) rotate(${i * 45}deg)`
                }}
                animate={{ 
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Background stars for dark mode */}
      <AnimatePresence>
        {isDark && (
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                style={{
                  top: `${25 + (i * 15)}%`,
                  left: `${15 + (i * 20)}%`
                }}
                animate={{ 
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}