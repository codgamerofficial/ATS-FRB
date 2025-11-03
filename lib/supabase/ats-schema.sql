-- ATS Analysis Storage Schema

-- Create ats_analyses table for storing analysis results
CREATE TABLE IF NOT EXISTS public.ats_analyses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_size integer,
  overall_score integer NOT NULL,
  analysis_data jsonb NOT NULL,
  processing_time integer,
  industry_detected text,
  keyword_count integer,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.ats_analyses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own analyses" ON ats_analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analyses" ON ats_analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analyses" ON ats_analyses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analyses" ON ats_analyses
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS ats_analyses_user_id_idx ON public.ats_analyses(user_id);
CREATE INDEX IF NOT EXISTS ats_analyses_created_at_idx ON public.ats_analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS ats_analyses_overall_score_idx ON public.ats_analyses(overall_score);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_ats_analyses_updated_at 
    BEFORE UPDATE ON public.ats_analyses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();