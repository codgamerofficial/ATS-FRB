// Beautiful theme configuration for React Native + Expo
import { StyleSheet } from 'react-native';

export const colors = {
  // Primary brand colors
  primary: '#6366f1', // Modern indigo
  primaryDark: '#4f46e5',
  primaryLight: '#818cf8',
  
  // Secondary colors
  secondary: '#06b6d4', // Cyan
  secondaryDark: '#0891b2',
  secondaryLight: '#67e8f9',
  
  // Accent colors
  accent: '#f59e0b', // Amber
  accentDark: '#d97706',
  accentLight: '#fbbf24',
  
  // Neutral colors
  background: '#f8fafc', // Very light gray
  surface: '#ffffff', // Pure white
  surfaceVariant: '#f1f5f9', // Light gray
  border: '#e2e8f0', // Border gray
  borderLight: '#f1f5f9',
  
  // Text colors
  text: '#0f172a', // Dark slate
  textSecondary: '#475569', // Medium slate
  textLight: '#94a3b8', // Light slate
  textMuted: '#cbd5e1', // Muted
  
  // Status colors
  success: '#10b981', // Green
  warning: '#f59e0b', // Amber
  error: '#ef4444', // Red
  info: '#3b82f6', // Blue
  
  // Gradients
  gradientPrimary: ['#6366f1', '#8b5cf6', '#a855f7'],
  gradientSecondary: ['#06b6d4', '#0891b2', '#0e7490'],
  gradientAccent: ['#f59e0b', '#ea580c', '#dc2626'],
  gradientBackground: ['#f8fafc', '#e2e8f0', '#cbd5e1'],
  
  // Shadows
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  shadowDark: 'rgba(0, 0, 0, 0.15)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const typography = {
  // Font families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    light: 'System',
  },
  
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  },
};

export const animations = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

export const createStyles = () => StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Layout styles
  row: {
    flexDirection: 'row',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  spaceAround: {
    justifyContent: 'space-around',
  },
  
  // Card styles
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  
  cardElevated: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.lg,
  },
  
  // Button styles
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonSecondary: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Text styles
  heading1: {
    fontSize: typography.fontSize.display,
    fontWeight: 'bold',
    color: colors.text,
    lineHeight: typography.lineHeight.tight,
  },
  
  heading2: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.text,
    lineHeight: typography.lineHeight.tight,
  },
  
  heading3: {
    fontSize: typography.fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
    lineHeight: typography.lineHeight.tight,
  },
  
  body: {
    fontSize: typography.fontSize.md,
    color: colors.text,
    lineHeight: typography.lineHeight.normal,
  },
  
  bodyLarge: {
    fontSize: typography.fontSize.lg,
    color: colors.text,
    lineHeight: typography.lineHeight.normal,
  },
  
  caption: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.normal,
  },
  
  // Input styles
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceVariant,
  },
  
  // Gradient styles
  gradientBackground: {
    flex: 1,
  },
  
  gradientCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  
  // Animation styles
  fadeIn: {
    opacity: 1,
  },
  
  slideUp: {
    transform: [{ translateY: 0 }],
  },
  
  scaleIn: {
    transform: [{ scale: 1 }],
  },
});

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animations,
  createStyles,
};

export default theme;