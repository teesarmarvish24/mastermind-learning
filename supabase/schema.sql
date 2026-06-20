-- ============================================
-- Mastermind Learning App — Database Schema
-- Run this entire file in Supabase SQL Editor
-- ============================================

-- 1. PROFILES — extends Supabase auth.users with app-specific data
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. USER_PROGRESS — tracks module completion + practice submissions
-- (Primary persistent data model required by the capstone brief)
create table if not exists public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  module_slug text not null,
  practice_submission text,
  reflection_submission text,
  completed boolean default false,
  completed_at timestamptz,
  updated_at timestamptz default now(),
  unique (user_id, module_slug)
);

alter table public.user_progress enable row level security;

create policy "Users can view their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);


-- 3. CONTACT_MESSAGES — stores contact form submissions
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.contact_messages enable row level security;

-- Anyone (including logged-out visitors) can submit a contact message
create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  with check (true);

-- Only the message sender's own future-authenticated reads are blocked;
-- no public read policy is created, so messages are only visible
-- via the Supabase dashboard (service role) — keeps submissions private.

-- ============================================
-- End of schema
-- ============================================
