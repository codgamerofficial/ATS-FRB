// Beautiful Input Component
import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '../../theme/Theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outline';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  variant = 'default',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const getInputStyle = () => {
    const baseStyle = [styles.input];
    
    switch (variant) {
      case 'filled':
        baseStyle.push(styles.inputFilled);
        break;
      case 'outline':
        baseStyle.push(styles.inputOutline);
        break;
      default:
        baseStyle.push(styles.inputDefault);
    }
    
    if (isFocused) {
      baseStyle.push(styles.inputFocused);
    }
    
    if (error) {
      baseStyle.push(styles.inputError);
    }
    
    return baseStyle;
  };
  
  const getLabelStyle = () => {
    const baseStyle = [styles.label];
    
    if (isFocused) {
      baseStyle.push(styles.labelFocused);
    }
    
    if (error) {
      baseStyle.push(styles.labelError);
    }
    
    return baseStyle;
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[...getLabelStyle(), styles.labelSpacing]}>
          {label}
        </Text>
      )}
      
      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[
            ...getInputStyle(),
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            inputStyle,
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={theme.colors.textLight}
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.sm,
  },
  
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  
  labelFocused: {
    color: theme.colors.primary,
  },
  
  labelError: {
    color: theme.colors.error,
  },
  
  labelSpacing: {
    marginBottom: theme.spacing.xs,
  },
  
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  input: {
    flex: 1,
    height: 50,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  },
  
  inputDefault: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
  },
  
  inputFilled: {
    borderWidth: 0,
    backgroundColor: theme.colors.surfaceVariant,
    paddingHorizontal: theme.spacing.lg,
  },
  
  inputOutline: {
    borderWidth: 2,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
  
  inputFocused: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  
  inputError: {
    borderColor: theme.colors.error,
  },
  
  inputWithLeftIcon: {
    paddingLeft: theme.spacing.xl,
  },
  
  inputWithRightIcon: {
    paddingRight: theme.spacing.xl,
  },
  
  leftIcon: {
    position: 'absolute',
    left: theme.spacing.md,
    zIndex: 1,
  },
  
  rightIcon: {
    position: 'absolute',
    right: theme.spacing.md,
    zIndex: 1,
  },
  
  errorText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
});

export default Input;