'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

interface AuthError {
  message: string;
  status?: number;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error.message);
          toast.error('Authentication error. Please try again.');
          return;
        }
        
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Unexpected error during auth initialization:', error);
        toast.error('An unexpected error occurred. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          setUser(session?.user ?? null);
          
          // Handle specific auth events with user feedback
          switch (event) {
            case 'SIGNED_IN':
              toast.success('Successfully signed in!');
              break;
            case 'SIGNED_OUT':
              toast.success('Successfully signed out!');
              break;
            case 'TOKEN_REFRESHED':
              // Silent refresh, no notification needed
              break;
            case 'USER_UPDATED':
              // Silent update, no notification needed
              break;
            default:
              break;
          }
        } catch (error) {
          console.error('Auth state change error:', error);
          // Don't show toast on every auth state change to avoid spam
        } finally {
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        // Handle specific Supabase errors
        const errorMessage = getAuthErrorMessage(error.message);
        toast.error(errorMessage);
        return { data: null, error: { ...error, message: errorMessage } };
      }

      if (data.user && !data.session) {
        toast.success('Please check your email to confirm your account!');
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      const errorMessage = 'An unexpected error occurred during sign up';
      toast.error(errorMessage);
      return { data: null, error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const errorMessage = getAuthErrorMessage(error.message);
        toast.error(errorMessage);
        return { data: null, error: { ...error, message: errorMessage } };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      const errorMessage = 'An unexpected error occurred during sign in';
      toast.error(errorMessage);
      return { data: null, error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        const errorMessage = getAuthErrorMessage(error.message);
        toast.error(errorMessage);
        return { error: { ...error, message: errorMessage } };
      }

      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      const errorMessage = 'An unexpected error occurred during sign out';
      toast.error(errorMessage);
      return { error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        const errorMessage = getAuthErrorMessage(error.message);
        toast.error(errorMessage);
        return { data: null, error: { ...error, message: errorMessage } };
      }

      toast.success('Password reset email sent! Please check your inbox.');
      return { data, error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      const errorMessage = 'An unexpected error occurred while sending reset email';
      toast.error(errorMessage);
      return { data: null, error: { message: errorMessage } };
    }
  };

  const resendConfirmation = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/verify`,
        },
      });

      if (error) {
        const errorMessage = getAuthErrorMessage(error.message);
        toast.error(errorMessage);
        return { data: null, error: { ...error, message: errorMessage } };
      }

      toast.success('Confirmation email sent! Please check your inbox.');
      return { data, error: null };
    } catch (error) {
      console.error('Resend confirmation error:', error);
      const errorMessage = 'An unexpected error occurred while sending confirmation';
      toast.error(errorMessage);
      return { data: null, error: { message: errorMessage } };
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    resendConfirmation,
  };
}

// Helper function to provide user-friendly error messages
function getAuthErrorMessage(errorMessage: string): string {
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'Invalid email or password. Please check your credentials and try again.',
    'Email not confirmed': 'Please check your email and click the confirmation link before signing in.',
    'User already registered': 'An account with this email already exists. Please sign in instead.',
    'Password should be at least 6 characters': 'Password must be at least 6 characters long.',
    'Unable to validate email address: invalid format': 'Please enter a valid email address.',
    'Signup is disabled': 'Account registration is currently disabled. Please contact support.',
    'Email rate limit exceeded': 'Too many attempts. Please wait a few minutes before trying again.',
    'Network request failed': 'Network error. Please check your internet connection and try again.',
    'Invalid API key': 'Authentication configuration error. Please contact support.',
  };

  // Check for exact matches first
  if (errorMap[errorMessage]) {
    return errorMap[errorMessage];
  }

  // Check for partial matches
  for (const [key, value] of Object.entries(errorMap)) {
    if (errorMessage.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  // Return the original message if no match found
  return errorMessage;
}