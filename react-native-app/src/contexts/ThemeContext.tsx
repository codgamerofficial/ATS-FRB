import React, { createContext, useContext, useState } from 'react';
import { AppTheme } from '../constants/theme';

interface ThemeContextType {
  theme: AppTheme;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme: AppTheme = {
    ...require('../constants/theme').theme,
    dark: isDarkMode,
    colors: {
      ...require('../constants/theme').theme.colors,
      background: isDarkMode ? '#111827' : '#ffffff',
      surface: isDarkMode ? '#1f2937' : '#f8fafc',
      text: isDarkMode ? '#ffffff' : '#1f2937',
      disabled: isDarkMode ? '#374151' : '#e5e7eb',
      placeholder: isDarkMode ? '#6b7280' : '#9ca3af',
      backdrop: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
    },
  };

  const value: ThemeContextType = {
    theme,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}