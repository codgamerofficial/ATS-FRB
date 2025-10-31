-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create templates table
create table public.templates (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  preview_url text,
  is_premium boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create resumes table
create table public.resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content jsonb not null,
  template_id uuid references public.templates(id) not null,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.resumes enable row level security;
alter table public.templates enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

create policy "Users can view their own resumes." on resumes
  for select using (auth.uid() = user_id or is_public = true);

create policy "Users can insert their own resumes." on resumes
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own resumes." on resumes
  for update using (auth.uid() = user_id);

create policy "Users can delete their own resumes." on resumes
  for delete using (auth.uid() = user_id);

create policy "Templates are viewable by everyone." on templates
  for select using (true);

-- Create function to handle new user
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Insert default templates
insert into public.templates (name, description, is_premium) values
  ('Modern Professional', 'Clean and modern design perfect for tech professionals', false),
  ('Classic Executive', 'Traditional format ideal for corporate positions', false),
  ('Creative Designer', 'Stylish template for creative professionals', true),
  ('ATS Optimized', 'Specifically designed to pass Applicant Tracking Systems', false),
  ('Minimalist', 'Simple and elegant design focusing on content', false);