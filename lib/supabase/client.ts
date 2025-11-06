import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

function createSupabaseClient() {
  // Check if environment variables are available and valid
  if (!supabaseUrl || !supabaseAnonKey ||
      supabaseUrl === 'https://pnolxnnhavgwcplgoaxd.supabase.co' ||
      supabaseAnonKey === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBub2x4bm5oYXZnd2NwbGdvYXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NDkwNDYsImV4cCI6MjA3NzQyNTA0Nn0.NYWC4orZp5sx41OtIEYm-4StxJOWJrsVZr3kNNrhuhY') {
    
    console.warn('⚠️  Supabase credentials are not properly configured. The app will run but database features will be disabled.')
    
    // Create a safe fallback that won't crash the app
    const fallbackUrl = 'https://placeholder.supabase.co'
    const fallbackKey = 'placeholder_key'
    
    try {
      const supabase = createClient(fallbackUrl, fallbackKey)
      // Override the real client with safe methods
      return {
        ...supabase,
        auth: {
          ...supabase.auth,
          getUser: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase not configured') }),
          signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase not configured - please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY') }),
          signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured - please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY') }),
          signOut: () => Promise.resolve({ error: new Error('Supabase not configured - please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY') }),
        },
        from: () => ({
          select: () => ({ data: [], error: new Error('Supabase not configured - please set environment variables') }),
          insert: () => ({ data: null, error: new Error('Supabase not configured - please set environment variables') }),
          update: () => ({ data: null, error: new Error('Supabase not configured - please set environment variables') }),
          delete: () => ({ data: null, error: new Error('Supabase not configured - please set environment variables') }),
        })
      }
    } catch (error) {
      console.error('Error creating Supabase client:', error)
      throw new Error('Failed to initialize Supabase. Please check your environment variables.')
    }
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          title: string
          content: any
          template_id: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: any
          template_id: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: any
          template_id?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string
          preview_url: string | null
          is_premium: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          preview_url?: string | null
          is_premium?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          preview_url?: string | null
          is_premium?: boolean
          created_at?: string
        }
      }
    }
  }
}