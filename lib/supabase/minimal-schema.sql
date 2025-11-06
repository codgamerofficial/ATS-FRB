-- ============================================================================
-- MINIMAL DATABASE SCHEMA FOR SUPABASE
-- ============================================================================
-- This is a minimal, streamlined schema for quick setup and development.
-- Contains only essential features with Supabase optimizations.
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CREATE ESSENTIAL TABLES
-- ============================================================================

-- Create resumes table (minimal version)
CREATE TABLE IF NOT EXISTS public.resumes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title text NOT NULL DEFAULT 'My Resume',
  content jsonb NOT NULL DEFAULT '{}',
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create simple indexes
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_is_public ON public.resumes(is_public);
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON public.resumes(created_at);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- CREATE SECURITY POLICIES
-- ============================================================================

-- Drop existing policies for clean setup
DROP POLICY IF EXISTS "Users can view own resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can insert own resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can update own resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can delete own resumes" ON public.resumes;

-- Create minimal policies
CREATE POLICY "Users can view own resumes" ON public.resumes
  FOR SELECT USING (
    auth.uid() = user_id 
    OR is_public = true
  );

CREATE POLICY "Users can insert own resumes" ON public.resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes" ON public.resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes" ON public.resumes
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- CREATE HELPER FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_resumes_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- Trigger for automatic updated_at updates
DROP TRIGGER IF EXISTS update_resumes_updated_at ON public.resumes;
CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE FUNCTION public.update_resumes_updated_at();

-- Function to get user's resume count
CREATE OR REPLACE FUNCTION public.get_user_resume_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid;
  resume_count integer;
BEGIN
  -- Get current user ID
  current_user_id := auth.uid();
  
  -- Return 0 if not authenticated
  IF current_user_id IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Count resumes for current user
  SELECT COUNT(*) INTO resume_count
  FROM public.resumes
  WHERE user_id = current_user_id;
  
  RETURN COALESCE(resume_count, 0);
END;
$$;

-- ============================================================================
-- SET PERMISSIONS
-- ============================================================================

-- Grant basic permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.resumes TO authenticated;

-- Grant function permissions
GRANT EXECUTE ON FUNCTION public.update_resumes_updated_at() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_resume_count() TO authenticated;

-- Service role permissions
GRANT ALL ON public.resumes TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- ============================================================================
-- ADD DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.resumes IS 'Minimal resumes table for basic functionality';
COMMENT ON FUNCTION public.update_resumes_updated_at() IS 'Automatically updates updated_at timestamp';
COMMENT ON FUNCTION public.get_user_resume_count() IS 'Get count of resumes for a user';