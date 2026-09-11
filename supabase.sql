create table if not exists public.profiles (
  id text primary key check (id ~ '^[A-Z2-9]{4}$'),
  name text not null check (char_length(name) between 1 and 32),
  title text not null check (char_length(title) between 1 and 48),
  bio text not null check (char_length(bio) between 1 and 180),
  accent_color text not null check (accent_color ~ '^#[0-9A-Fa-f]{6}$'),
  interaction text not null check (interaction in ('glow', 'confetti', 'reveal')),
  secret_text text not null default '' check (char_length(secret_text) <= 80),
  template_id text not null check (template_id in ('orbit', 'blueprint', 'studio')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

revoke all on table public.profiles from anon, authenticated;

drop policy if exists "Anyone can read public profiles" on public.profiles;
create policy "Anyone can read public profiles"
on public.profiles for select
to anon
using (true);

drop policy if exists "Anyone can create a profile" on public.profiles;
create policy "Anyone can create a profile"
on public.profiles for insert
to anon
with check (true);

grant select, insert on public.profiles to anon;
