// Beautiful Card Component
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'expo-linear-gradient';
import { theme } from '../../theme/Theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'gradient' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  margin?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
  padding = 'md',
  margin = 'md',
}) => {
  const getCardStyle = () => {
    const baseStyle = [styles.card];
    
    switch (variant) {
      case 'elevated':
        baseStyle.push(styles.cardElevated);
        break;
      case 'gradient':
        baseStyle.push(styles.cardGradient);
        break;
      case 'outlined':
        baseStyle.push(styles.cardOutlined);
        break;
      default:
        baseStyle.push(styles.cardDefault);
    }
    
    return baseStyle;
  };
  
  const getPaddingStyle = () => {
    switch (padding) {
      case 'sm':
        return styles.paddingSm;
      case 'lg':
        return styles.paddingLg;
      default:
        return styles.paddingMd;
    }
  };
  
  const getMarginStyle = () => {
    switch (margin) {
      case 'sm':
        return styles.marginSm;
      case 'lg':
        return styles.marginLg;
      default:
        return styles.marginMd;
    }
  };
  
  const cardContent = (
    <View style={[...getCardStyle(), ...getPaddingStyle(), ...getMarginStyle(), style]}>
      {children}
    </View>
  );
  
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {cardContent}
      </TouchableOpacity>
    );
  }
  
  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={theme.colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[...getCardStyle(), ...getPaddingStyle(), ...getMarginStyle(), style]}
      >
        {children}
      </LinearGradient>
    );
  }
  
  return cardContent;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  
  cardDefault: {
    backgroundColor: theme.colors.surface,
  },
  
  cardElevated: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.lg,
  },
  
  cardGradient: {
    backgroundColor: 'transparent',
  },
  
  cardOutlined: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  
  paddingSm: {
    padding: theme.spacing.sm,
  },
  
  paddingMd: {
    padding: theme.spacing.md,
  },
  
  paddingLg: {
    padding: theme.spacing.lg,
  },
  
  marginSm: {
    margin: theme.spacing.sm,
  },
  
  marginMd: {
    margin: theme.spacing.md,
  },
  
  marginLg: {
    margin: theme.spacing.lg,
  },
});

export default Card;