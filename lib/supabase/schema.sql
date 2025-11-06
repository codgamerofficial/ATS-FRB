-- ============================================================================
-- MAIN DATABASE SCHEMA FOR SUPABASE
-- ============================================================================
-- This is the complete database schema for the resume builder application
-- with proper Supabase optimizations, performance indexes, and security.
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- CREATE PROFILES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_full_name ON public.profiles(full_name);

-- ============================================================================
-- CREATE TEMPLATES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  preview_url text,
  is_premium boolean DEFAULT false,
  tags jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_templates_name ON public.templates(name);
CREATE INDEX IF NOT EXISTS idx_templates_is_premium ON public.templates(is_premium);

-- ============================================================================
-- CREATE RESUMES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.resumes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  template_id uuid REFERENCES public.templates(id) ON DELETE SET NULL,
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  is_public boolean DEFAULT false,
  is_template boolean DEFAULT false,
  slug text UNIQUE,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_template_id ON public.resumes(template_id);
CREATE INDEX IF NOT EXISTS idx_resumes_is_public ON public.resumes(is_public);
CREATE INDEX IF NOT EXISTS idx_resumes_slug ON public.resumes(slug);
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON public.resumes(created_at);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- CREATE SECURITY POLICIES
-- ============================================================================

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;

DROP POLICY IF EXISTS "Users can view their own resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can insert their own resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can update their own resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can delete their own resumes" ON public.resumes;

DROP POLICY IF EXISTS "Templates are viewable by everyone" ON public.templates;
DROP POLICY IF EXISTS "Templates are viewable by authenticated users" ON public.templates;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- Resumes policies
CREATE POLICY "Users can view their own resumes" ON public.resumes
  FOR SELECT USING (
    auth.uid() = user_id 
    OR is_public = true
    OR is_template = true
  );

CREATE POLICY "Users can insert their own resumes" ON public.resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes" ON public.resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes" ON public.resumes
  FOR DELETE USING (auth.uid() = user_id);

-- Templates policies
CREATE POLICY "Templates are viewable by everyone" ON public.templates
  FOR SELECT USING (true);

-- ============================================================================
-- CREATE HELPER FUNCTIONS
-- ============================================================================

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- Function to generate unique slug for resumes
CREATE OR REPLACE FUNCTION public.generate_resume_slug(resume_id uuid, base_title text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 1;
BEGIN
  -- Create base slug from title
  base_slug := lower(trim(regexp_replace(base_title, '[^a-zA-Z0-9\s-]', '', 'g')));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := trim(base_slug, '-');
  
  -- Ensure it's not too long
  IF length(base_slug) > 50 THEN
    base_slug := substr(base_slug, 1, 50);
  END IF;
  
  -- Make sure it's not empty
  IF base_slug = '' THEN
    base_slug := 'resume';
  END IF;
  
  final_slug := base_slug;
  
  -- Check for uniqueness
  WHILE EXISTS (SELECT 1 FROM public.resumes WHERE slug = final_slug AND id != resume_id) LOOP
    final_slug := base_slug || '-' || counter;
    counter := counter + 1;
  END LOOP;
  
  RETURN final_slug;
END;
$$;

-- ============================================================================
-- CREATE TRIGGERS
-- ============================================================================

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Triggers for updated_at timestamps
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_templates_updated_at ON public.templates;
CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON public.templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_resumes_updated_at ON public.resumes;
CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- INSERT DEFAULT TEMPLATES
-- ============================================================================

-- Insert default templates with proper error handling
INSERT INTO public.templates (name, description, is_premium) VALUES
  ('Modern Professional', 'Clean and modern design perfect for tech professionals', false),
  ('Classic Executive', 'Traditional format ideal for corporate positions', false),
  ('Creative Designer', 'Stylish template for creative professionals', true),
  ('ATS Optimized', 'Specifically designed to pass Applicant Tracking Systems', false),
  ('Minimalist', 'Simple and elegant design focusing on content', false),
  ('Tech Lead', 'Perfect for senior technical positions', true),
  ('Marketing Specialist', 'Designed for marketing professionals', false),
  ('Finance Professional', 'Clean layout for financial services', true)
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- SET PERMISSIONS AND GRANTS
-- ============================================================================

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.resumes TO authenticated;
GRANT SELECT ON public.templates TO authenticated;

-- Grant function permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_resume_slug(uuid, text) TO authenticated;

-- Grant permissions to service_role for admin operations
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================================
-- ADD COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.profiles IS 'User profiles with authentication integration';
COMMENT ON TABLE public.templates IS 'Resume templates available to users';
COMMENT ON TABLE public.resumes IS 'User-created resumes with JSON content';
COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates profile when user registers';
COMMENT ON FUNCTION public.update_updated_at_column() IS 'Automatically updates updated_at timestamp';
COMMENT ON FUNCTION public.generate_resume_slug() IS 'Generates unique URL-friendly slugs for resumes';