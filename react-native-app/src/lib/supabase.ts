import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

function createSupabaseClient() {
  // Check if environment variables are available and valid
  if (!supabaseUrl || !supabaseAnonKey ||
      supabaseUrl === 'https://pnolxnnhavgwcplgoaxd.supabase.co' ||
      supabaseAnonKey === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBub2x4bm5oYXZnd2NwbGdvYXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NDkwNDYsImV4cCI6MjA3NzQyNTA0Nn0.NYWC4orZp5sx41OtIEYm-4StxJOWJrsVZr3kNNrhuhY') {
    
    console.warn('⚠️  Supabase credentials are not properly configured. The React Native app will run but database features will be disabled.');
    
    // Create a fallback client that won't crash
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase not configured - please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY') }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase not configured - please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY') }),
        signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured - please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY') }),
        signOut: () => Promise.resolve({ error: new Error('Supabase not configured - please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY') }),
        storage: {
          getItem: () => Promise.resolve(null),
          setItem: () => Promise.resolve(),
          removeItem: () => Promise.resolve(),
        },
      },
      from: () => ({
        select: () => ({ data: [], error: new Error('Supabase not configured - please set environment variables') }),
        insert: () => ({ data: null, error: new Error('Supabase not configured - please set environment variables') }),
        update: () => ({ data: null, error: new Error('Supabase not configured - please set environment variables') }),
        delete: () => ({ data: null, error: new Error('Supabase not configured - please set environment variables') }),
      })
    };
  }
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: {
        getItem: (key: string) => {
          // For React Native, we'll use AsyncStorage
          try {
            const AsyncStorage = require('@react-native-async-storage/async-storage');
            return AsyncStorage.getItem(key);
          } catch (error) {
            console.warn('AsyncStorage not available:', error);
            return null;
          }
        },
        setItem: (key: string, value: string) => {
          try {
            const AsyncStorage = require('@react-native-async-storage/async-storage');
            return AsyncStorage.setItem(key, value);
          } catch (error) {
            console.warn('AsyncStorage not available:', error);
            return Promise.resolve();
          }
        },
        removeItem: (key: string) => {
          try {
            const AsyncStorage = require('@react-native-async-storage/async-storage');
            return AsyncStorage.removeItem(key);
          } catch (error) {
            console.warn('AsyncStorage not available:', error);
            return Promise.resolve();
          }
        },
      },
    },
  });
}

export const supabase = createSupabaseClient();

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      resumes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: any;
          template_id: string;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: any;
          template_id: string;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: any;
          template_id?: string;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      templates: {
        Row: {
          id: string;
          name: string;
          description: string;
          preview_url: string | null;
          is_premium: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          preview_url?: string | null;
          is_premium?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          preview_url?: string | null;
          is_premium?: boolean;
          created_at?: string;
        };
      };
    };
  };
};