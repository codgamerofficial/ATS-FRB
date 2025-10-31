-- Drop existing table if it exists
DROP TABLE IF EXISTS public.resumes;

-- Create resumes table
CREATE TABLE public.resumes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL DEFAULT 'My Resume',
  content jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own resumes" ON public.resumes
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.resumes TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;