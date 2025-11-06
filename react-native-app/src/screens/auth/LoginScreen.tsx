// Beautiful Login Screen
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'expo-linear-gradient';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { theme } from '../theme/Theme';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // TODO: Implement Supabase authentication
      // const { error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      
      // if (error) throw error;
      
      // Simulate successful login
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert('Success', 'Logged in successfully!');
      
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen
    Alert.alert('Info', 'Forgot password feature coming soon!');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2574&q=80' }}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(99, 102, 241, 0.9)', 'rgba(139, 92, 246, 0.8)']}
        style={styles.gradientOverlay}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>
                  Sign in to your account to continue building amazing resumes
                </Text>
              </View>

              {/* Login Form */}
              <Card style={styles.formCard} variant="elevated">
                <Input
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email}
                  leftIcon={
                    <Text style={styles.icon}>📧</Text>
                  }
                />

                <Input
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                  error={errors.password}
                  leftIcon={
                    <Text style={styles.icon}>🔒</Text>
                  }
                />

                <Button
                  title="Sign In"
                  onPress={handleLogin}
                  loading={loading}
                  variant="gradient"
                  size="lg"
                  style={styles.loginButton}
                />

                <Button
                  title="Forgot Password?"
                  onPress={handleForgotPassword}
                  variant="outline"
                  size="sm"
                  style={styles.forgotButton}
                />
              </Card>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Don't have an account?{' '}
                  <Text style={styles.linkText}>Sign Up</Text>
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  gradientOverlay: {
    flex: 1,
  },
  
  safeArea: {
    flex: 1,
  },
  
  container: {
    flex: 1,
  },
  
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  },
  
  title: {
    ...theme.createStyles().heading1,
    color: 'white',
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.relaxed,
    paddingHorizontal: theme.spacing.lg,
  },
  
  formCard: {
    marginBottom: theme.spacing.xl,
  },
  
  loginButton: {
    marginTop: theme.spacing.lg,
  },
  
  forgotButton: {
    marginTop: theme.spacing.md,
  },
  
  icon: {
    fontSize: 20,
  },
  
  footer: {
    alignItems: 'center',
  },
  
  footerText: {
    fontSize: theme.typography.fontSize.md,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  
  linkText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;