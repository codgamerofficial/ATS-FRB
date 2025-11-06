-- ============================================================================
-- COLLABORATION SCHEMA FOR SUPABASE
-- ============================================================================
-- This schema adds collaboration, analytics, and version control features
-- to the existing resume management system.
--
-- Run this in the Supabase SQL Editor with proper error handling and grants.
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ADD COLUMNS TO EXISTING RESUMES TABLE
-- ============================================================================

-- Add collaboration and analytics columns to resumes table
ALTER TABLE public.resumes 
ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS collaborators jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS version_history jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS analytics jsonb DEFAULT '{
  "views": 0,
  "downloads": 0,
  "shares": 0,
  "last_viewed": null
}'::jsonb;

-- ============================================================================
-- CREATE ANALYTICS TABLE
-- ============================================================================

-- Create resume_analytics table for detailed tracking
CREATE TABLE IF NOT EXISTS public.resume_analytics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  resume_id uuid REFERENCES public.resumes(id) ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL, -- 'view', 'download', 'share', 'edit'
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_resume_analytics_resume_id ON public.resume_analytics(resume_id);
CREATE INDEX IF NOT EXISTS idx_resume_analytics_user_id ON public.resume_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_resume_analytics_event_type ON public.resume_analytics(event_type);

-- ============================================================================
-- CREATE VERSION HISTORY TABLE
-- ============================================================================

-- Create resume_versions table for version history
CREATE TABLE IF NOT EXISTS public.resume_versions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  resume_id uuid REFERENCES public.resumes(id) ON DELETE CASCADE NOT NULL,
  version_number integer NOT NULL,
  content jsonb NOT NULL,
  changes_summary text,
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  -- Ensure unique version numbers per resume
  UNIQUE(resume_id, version_number)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_resume_versions_resume_id ON public.resume_versions(resume_id);
CREATE INDEX IF NOT EXISTS idx_resume_versions_created_by ON public.resume_versions(created_by);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE public.resume_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_versions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- CREATE SECURITY POLICIES
-- ============================================================================

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view analytics for their resumes" ON public.resume_analytics;
DROP POLICY IF EXISTS "Users can insert analytics for any resume" ON public.resume_analytics;

DROP POLICY IF EXISTS "Users can view versions of their resumes" ON public.resume_versions;
DROP POLICY IF EXISTS "Users can create versions of their resumes" ON public.resume_versions;

-- Analytics policies
CREATE POLICY "Users can view analytics for their resumes" ON public.resume_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.resumes 
      WHERE resumes.id = resume_analytics.resume_id 
      AND (resumes.user_id = auth.uid() OR resumes.is_public = true)
    )
  );

CREATE POLICY "Users can insert analytics for any resume" ON public.resume_analytics
  FOR INSERT WITH CHECK (true);

-- Version history policies
CREATE POLICY "Users can view versions of their resumes" ON public.resume_versions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.resumes 
      WHERE resumes.id = resume_versions.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create versions of their resumes" ON public.resume_versions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.resumes 
      WHERE resumes.id = resume_versions.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

-- ============================================================================
-- CREATE ANALYTICS TRACKING FUNCTION
-- ============================================================================

-- Function to track resume analytics events
CREATE OR REPLACE FUNCTION public.track_resume_event(
  p_resume_id uuid,
  p_event_type text,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid;
BEGIN
  -- Get current user ID
  current_user_id := auth.uid();
  
  -- Validate inputs
  IF p_resume_id IS NULL THEN
    RAISE EXCEPTION 'Resume ID cannot be null';
  END IF;
  
  IF p_event_type IS NULL OR p_event_type = '' THEN
    RAISE EXCEPTION 'Event type cannot be null or empty';
  END IF;
  
  -- Insert analytics event
  INSERT INTO public.resume_analytics (resume_id, event_type, user_id, metadata)
  VALUES (p_resume_id, p_event_type, current_user_id, p_metadata);
  
  -- Update resume analytics counter
  UPDATE public.resumes 
  SET analytics = jsonb_set(
    jsonb_set(
      analytics,
      ARRAY[p_event_type || 's'],
      (COALESCE((analytics->(p_event_type || 's'))::int, 0) + 1)::text::jsonb
    ),
    ARRAY['last_viewed'],
    now()::text::jsonb
  )
  WHERE id = p_resume_id;
  
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the transaction
    RAISE WARNING 'Error in track_resume_event: %', SQLERRM;
END;
$$;

-- ============================================================================
-- CREATE VERSION CONTROL FUNCTION
-- ============================================================================

-- Function to create resume version
CREATE OR REPLACE FUNCTION public.create_resume_version(
  p_resume_id uuid,
  p_content jsonb,
  p_changes_summary text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_version_number integer;
  v_version_id uuid;
  current_user_id uuid;
BEGIN
  -- Get current user ID
  current_user_id := auth.uid();
  
  -- Validate inputs
  IF p_resume_id IS NULL THEN
    RAISE EXCEPTION 'Resume ID cannot be null';
  END IF;
  
  IF p_content IS NULL THEN
    RAISE EXCEPTION 'Content cannot be null';
  END IF;
  
  -- Check if user owns the resume
  IF NOT EXISTS (
    SELECT 1 FROM public.resumes 
    WHERE id = p_resume_id AND user_id = current_user_id
  ) THEN
    RAISE EXCEPTION 'You can only create versions of your own resumes';
  END IF;
  
  -- Get next version number
  SELECT COALESCE(MAX(version_number), 0) + 1 
  INTO v_version_number
  FROM public.resume_versions 
  WHERE resume_id = p_resume_id;
  
  -- Create version
  INSERT INTO public.resume_versions (resume_id, version_number, content, changes_summary, created_by)
  VALUES (p_resume_id, v_version_number, p_content, p_changes_summary, current_user_id)
  RETURNING id INTO v_version_id;
  
  -- Update resume's version history
  UPDATE public.resumes 
  SET version_history = version_history || jsonb_build_object(
    'version_id', v_version_id,
    'version_number', v_version_number,
    'created_at', now(),
    'created_by', current_user_id,
    'changes_summary', COALESCE(p_changes_summary, 'Version ' || v_version_number)
  )
  WHERE id = p_resume_id;
  
  RETURN v_version_id;
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error creating resume version: %', SQLERRM;
END;
$$;

-- ============================================================================
-- SET PERMISSIONS AND GRANTS
-- ============================================================================

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.resume_analytics TO authenticated;
GRANT ALL ON public.resume_versions TO authenticated;

-- Grant function permissions
GRANT EXECUTE ON FUNCTION public.track_resume_event(uuid, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_resume_version(uuid, jsonb, text) TO authenticated;

-- Grant permissions to service_role for admin operations
GRANT ALL ON public.resume_analytics TO service_role;
GRANT ALL ON public.resume_versions TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- ============================================================================
-- CREATE HELPFUL VIEWS
-- ============================================================================

-- View for resume analytics summary
CREATE OR REPLACE VIEW public.resume_analytics_summary AS
SELECT 
  r.id as resume_id,
  r.title,
  r.user_id,
  r.is_public,
  COALESCE(a.total_views, 0) as total_views,
  COALESCE(a.total_downloads, 0) as total_downloads,
  COALESCE(a.total_shares, 0) as total_shares,
  r.analytics->>'last_viewed' as last_viewed
FROM public.resumes r
LEFT JOIN (
  SELECT 
    resume_id,
    SUM(CASE WHEN event_type = 'view' THEN 1 ELSE 0 END) as total_views,
    SUM(CASE WHEN event_type = 'download' THEN 1 ELSE 0 END) as total_downloads,
    SUM(CASE WHEN event_type = 'share' THEN 1 ELSE 0 END) as total_shares
  FROM public.resume_analytics
  GROUP BY resume_id
) a ON r.id = a.resume_id;

-- Grant access to the view
GRANT SELECT ON public.resume_analytics_summary TO authenticated;

-- ============================================================================
-- ADD COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.resume_analytics IS 'Tracks detailed analytics events for resumes (views, downloads, shares, edits)';
COMMENT ON TABLE public.resume_versions IS 'Stores version history for resumes with content snapshots';
COMMENT ON FUNCTION public.track_resume_event IS 'Tracks analytics events for resumes with proper error handling';
COMMENT ON FUNCTION public.create_resume_version IS 'Creates a new version of a resume with version control';
COMMENT ON VIEW public.resume_analytics_summary IS 'Summary view of resume analytics metrics';