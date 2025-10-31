-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create templates table
CREATE TABLE IF NOT EXISTS public.templates (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  preview_url text,
  is_premium boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create resumes table
CREATE TABLE IF NOT EXISTS public.resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  content jsonb not null,
  template_id uuid default gen_random_uuid(),
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own resumes" ON resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes" ON resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON resumes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Templates are viewable by everyone" ON templates FOR SELECT USING (true);

-- Insert default templates
INSERT INTO public.templates (name, description, is_premium) VALUES
  ('Modern Professional', 'Clean and modern design perfect for tech professionals', false),
  ('Classic Executive', 'Traditional format ideal for corporate positions', false),
  ('ATS Optimized', 'Specifically designed to pass Applicant Tracking Systems', false)
ON CONFLICT DO NOTHING;