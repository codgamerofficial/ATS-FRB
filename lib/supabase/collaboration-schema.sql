-- Add collaboration support to existing schema

-- Add missing columns to resumes table
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

-- Create resume_analytics table for detailed tracking
CREATE TABLE IF NOT EXISTS public.resume_analytics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  resume_id uuid REFERENCES public.resumes(id) ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL, -- 'view', 'download', 'share', 'edit'
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create resume_versions table for version history
CREATE TABLE IF NOT EXISTS public.resume_versions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  resume_id uuid REFERENCES public.resumes(id) ON DELETE CASCADE NOT NULL,
  version_number integer NOT NULL,
  content jsonb NOT NULL,
  changes_summary text,
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on new tables
ALTER TABLE public.resume_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_versions ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics
CREATE POLICY "Users can view analytics for their resumes" ON resume_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = resume_analytics.resume_id 
      AND (resumes.user_id = auth.uid() OR resumes.is_public = true)
    )
  );

CREATE POLICY "Users can insert analytics for any resume" ON resume_analytics
  FOR INSERT WITH CHECK (true);

-- Create policies for versions
CREATE POLICY "Users can view versions of their resumes" ON resume_versions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = resume_versions.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create versions of their resumes" ON resume_versions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = resume_versions.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

-- Function to track analytics
CREATE OR REPLACE FUNCTION track_resume_event(
  p_resume_id uuid,
  p_event_type text,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS void AS $$
BEGIN
  -- Insert analytics event
  INSERT INTO public.resume_analytics (resume_id, event_type, user_id, metadata)
  VALUES (p_resume_id, p_event_type, auth.uid(), p_metadata);
  
  -- Update resume analytics counter
  UPDATE public.resumes 
  SET analytics = jsonb_set(
    analytics,
    ARRAY[p_event_type || 's'],
    (COALESCE((analytics->(p_event_type || 's'))::int, 0) + 1)::text::jsonb
  )
  WHERE id = p_resume_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create resume version
CREATE OR REPLACE FUNCTION create_resume_version(
  p_resume_id uuid,
  p_content jsonb,
  p_changes_summary text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  v_version_number integer;
  v_version_id uuid;
BEGIN
  -- Get next version number
  SELECT COALESCE(MAX(version_number), 0) + 1 
  INTO v_version_number
  FROM public.resume_versions 
  WHERE resume_id = p_resume_id;
  
  -- Create version
  INSERT INTO public.resume_versions (resume_id, version_number, content, changes_summary, created_by)
  VALUES (p_resume_id, v_version_number, p_content, p_changes_summary, auth.uid())
  RETURNING id INTO v_version_id;
  
  RETURN v_version_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;