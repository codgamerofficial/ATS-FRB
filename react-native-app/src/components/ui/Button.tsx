// Beautiful Button Component
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'expo-linear-gradient';
import { theme } from '../theme/Theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.buttonSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.buttonOutline);
        break;
      case 'gradient':
        baseStyle.push(styles.buttonGradient);
        break;
      default:
        baseStyle.push(styles.buttonPrimary);
    }
    
    switch (size) {
      case 'sm':
        baseStyle.push(styles.buttonSm);
        break;
      case 'lg':
        baseStyle.push(styles.buttonLg);
        break;
      default:
        baseStyle.push(styles.buttonMd);
    }
    
    if (disabled || loading) {
      baseStyle.push(styles.buttonDisabled);
    }
    
    return baseStyle;
  };
  
  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.textSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.textOutline);
        break;
      case 'gradient':
        baseStyle.push(styles.textGradient);
        break;
      default:
        baseStyle.push(styles.textPrimary);
    }
    
    return baseStyle;
  };
  
  const buttonContent = (
    <>
      {loading && <ActivityIndicator color="white" style={styles.loading} />}
      {icon && !loading && <>{icon}</>}
      <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
    </>
  );
  
  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[...getButtonStyle(), style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={theme.colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientContainer, styles.buttonBase]}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[...getButtonStyle(), style]}
      activeOpacity={0.8}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.md,
  },
  
  buttonBase: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  
  buttonSm: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  
  buttonMd: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  
  buttonLg: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  
  buttonGradient: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  
  buttonDisabled: {
    backgroundColor: theme.colors.textLight,
    shadowOpacity: 0.05,
  },
  
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  textPrimary: {
    color: 'white',
  },
  
  textSecondary: {
    color: 'white',
  },
  
  textOutline: {
    color: theme.colors.primary,
  },
  
  textGradient: {
    color: 'white',
  },
  
  loading: {
    marginRight: theme.spacing.sm,
  },
});

export default Button;