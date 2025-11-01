'use client';

import { useEffect, useState, useCallback } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleDark = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    // Default to dark mode for SCI-FI theme
    const initialDark = stored ? JSON.parse(stored) : true;
    
    setIsDark(initialDark);
    setIsLoaded(true);

    // Listen for system theme changes
    // Remove system theme listener since we default to dark
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark, isLoaded]);

  return { isDark, setIsDark, toggleDark, isLoaded };
}