-- ============================================================================
-- FINAL DATABASE SCHEMA FOR SUPABASE
-- ============================================================================
-- This is a production-ready, optimized schema for the resume builder application.
-- Includes proper indexing, security policies, and performance optimizations.
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- DROP AND RECREATE RESUMES TABLE (COMPLETE REBUILD)
-- ============================================================================

-- Drop existing table if it exists
DROP TABLE IF EXISTS public.resume_analytics CASCADE;
DROP TABLE IF EXISTS public.resume_versions CASCADE;
DROP TABLE IF EXISTS public.resumes CASCADE;

-- Create resumes table with all optimizations
CREATE TABLE public.resumes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_id uuid REFERENCES public.templates(id) ON DELETE SET NULL,
  title text NOT NULL DEFAULT 'My Resume',
  content jsonb NOT NULL DEFAULT '{}',
  is_public boolean DEFAULT false,
  is_template boolean DEFAULT false,
  slug text UNIQUE,
  metadata jsonb DEFAULT '{
    "views": 0,
    "downloads": 0,
    "shares": 0,
    "last_viewed": null,
    "ai_score": null,
    "ats_score": null
  }'::jsonb,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, slug)
);

-- Create comprehensive indexes
CREATE INDEX idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX idx_resumes_template_id ON public.resumes(template_id);
CREATE INDEX idx_resumes_is_public ON public.resumes(is_public);
CREATE INDEX idx_resumes_is_template ON public.resumes(is_template);
CREATE INDEX idx_resumes_slug ON public.resumes(slug);
CREATE INDEX idx_resumes_created_at ON public.resumes(created_at);
CREATE INDEX idx_resumes_updated_at ON public.resumes(updated_at);
CREATE INDEX idx_resumes_user_template ON public.resumes(user_id, template_id);
CREATE INDEX idx_resumes_metadata_views ON ((metadata->>'views')::int);
CREATE INDEX idx_resumes_metadata_ai_score ON ((metadata->>'ai_score')::numeric);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- CREATE SECURITY POLICIES
-- ============================================================================

-- Drop existing policies for clean rebuild
DROP POLICY IF EXISTS "Users can manage their own resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can view public resumes" ON public.resumes;
DROP POLICY IF EXISTS "Users can view template resumes" ON public.resumes;

-- Main policy: Users can manage their own resumes
CREATE POLICY "Users can manage their own resumes" ON public.resumes
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Public access policy for public resumes and templates
CREATE POLICY "Public access for public resumes" ON public.resumes
  FOR SELECT USING (
    is_public = true 
    OR is_template = true
  );

-- ============================================================================
-- CREATE HELPER FUNCTIONS
-- ============================================================================

-- Function to get resume analytics
CREATE OR REPLACE FUNCTION public.get_resume_analytics(resume_uuid uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  -- Check if user has access to this resume
  IF NOT EXISTS (
    SELECT 1 FROM public.resumes 
    WHERE id = resume_uuid 
    AND (user_id = auth.uid() OR is_public = true OR is_template = true)
  ) THEN
    RAISE EXCEPTION 'Access denied or resume not found';
  END IF;
  
  -- Get analytics
  SELECT jsonb_build_object(
    'views', COALESCE((metadata->>'views')::int, 0),
    'downloads', COALESCE((metadata->>'downloads')::int, 0),
    'shares', COALESCE((metadata->>'shares')::int, 0),
    'last_viewed', metadata->>'last_viewed',
    'ai_score', COALESCE((metadata->>'ai_score')::numeric, 0),
    'ats_score', COALESCE((metadata->>'ats_score')::numeric, 0)
  ) INTO result
  FROM public.resumes
  WHERE id = resume_uuid;
  
  RETURN result;
END;
$$;

-- Function to update resume analytics
CREATE OR REPLACE FUNCTION public.update_resume_analytics(
  resume_uuid uuid,
  event_type text,
  event_data jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update the analytics counter
  UPDATE public.resumes 
  SET metadata = jsonb_set(
    jsonb_set(
      metadata,
      ARRAY[event_type || 's'],
      (COALESCE((metadata->>(event_type || 's'))::int, 0) + 1)::text::jsonb
    ),
    ARRAY['last_viewed'],
    now()::text::jsonb
  )
  WHERE id = resume_uuid
  AND (user_id = auth.uid() OR is_public = true OR is_template = true);
  
  -- If no rows updated, the user doesn't have permission
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Access denied or resume not found';
  END IF;
END;
$$;

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

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_resumes_updated_at ON public.resumes;
CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE FUNCTION public.update_resumes_updated_at();

-- ============================================================================
-- SET PERMISSIONS AND GRANTS
-- ============================================================================

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.resumes TO authenticated;

-- Grant function permissions
GRANT EXECUTE ON FUNCTION public.get_resume_analytics(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_resume_analytics(uuid, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_resumes_updated_at() TO authenticated;

-- Grant permissions to service_role for admin operations
GRANT ALL ON public.resumes TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- ============================================================================
-- CREATE USEFUL VIEWS
-- ============================================================================

-- View for resume analytics summary
CREATE OR REPLACE VIEW public.resumes_analytics_summary AS
SELECT 
  r.id,
  r.title,
  r.user_id,
  r.is_public,
  r.is_template,
  r.slug,
  r.created_at,
  r.updated_at,
  COALESCE((r.metadata->>'views')::int, 0) as view_count,
  COALESCE((r.metadata->>'downloads')::int, 0) as download_count,
  COALESCE((r.metadata->>'shares')::int, 0) as share_count,
  r.metadata->>'last_viewed' as last_viewed,
  COALESCE((r.metadata->>'ai_score')::numeric, 0) as ai_score,
  COALESCE((r.metadata->>'ats_score')::numeric, 0) as ats_score
FROM public.resumes r;

-- Grant access to the view
GRANT SELECT ON public.resumes_analytics_summary TO authenticated;

-- ============================================================================
-- ADD COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.resumes IS 'User resumes with embedded analytics and metadata';
COMMENT ON FUNCTION public.get_resume_analytics() IS 'Get analytics data for a specific resume';
COMMENT ON FUNCTION public.update_resume_analytics() IS 'Update analytics counters for a resume';
COMMENT ON VIEW public.resumes_analytics_summary IS 'Summary view of all resume analytics data';