'use client';

import { motion } from 'framer-motion';
import { useDarkMode } from '@/hooks/useDarkMode';

export default function DarkModeToggle() {
  const { isDark, setIsDark } = useDarkMode();

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="relative w-16 h-8 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
          : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative w-6 h-6 rounded-full shadow-lg flex items-center justify-center"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
        }}
        animate={{
          x: isDark ? 32 : 0,
          rotate: isDark ? 180 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isDark 
              ? '0 0 20px rgba(251, 191, 36, 0.6), inset 0 0 10px rgba(245, 158, 11, 0.3)'
              : '0 0 15px rgba(59, 130, 246, 0.3), inset 0 0 8px rgba(255, 255, 255, 0.8)'
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Sun rays */}
        {!isDark && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-2 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full"
                style={{
                  top: '-6px',
                  left: '50%',
                  transformOrigin: '50% 18px',
                  transform: `translateX(-50%) rotate(${i * 45}deg)`
                }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Moon craters */}
        {isDark && (
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-600 rounded-full opacity-60" />
            <div className="absolute top-3 right-1 w-0.5 h-0.5 bg-yellow-600 rounded-full opacity-40" />
            <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-yellow-600 rounded-full opacity-50" />
          </motion.div>
        )}
      </motion.div>

      {/* Background stars for dark mode */}
      {isDark && (
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`
              }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.button>
  );
}