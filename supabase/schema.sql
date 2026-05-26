-- ============================================================
-- Rangiroa Explorer – Schéma Supabase
-- ============================================================

-- Profils utilisateurs (extension de auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  username text unique not null,
  avatar_url text,
  bio text,
  identifications_count int default 0,
  favorites_count int default 0
);

alter table public.profiles enable row level security;

create policy "Les profils sont visibles par tous" on public.profiles
  for select using (true);

create policy "Utilisateurs peuvent modifier leur propre profil" on public.profiles
  for update using (auth.uid() = id);

-- Espèces
create table public.species (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  name_fr text not null,
  name_local text,
  name_scientific text not null,
  category text not null check (category in (
    'fish', 'coral', 'mammal', 'bird', 'reptile', 'invertebrate', 'plant', 'algae'
  )),
  description text,
  habitat text,
  conservation_status text default 'LC' check (conservation_status in (
    'LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX'
  )),
  images text[] default '{}',
  is_dangerous boolean default false,
  fun_facts text[] default '{}',
  location_lat double precision,
  location_lng double precision
);

alter table public.species enable row level security;

create policy "Espèces visibles par tous" on public.species
  for select using (true);

-- Identifications
create table public.identifications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  user_id uuid references auth.users(id) on delete cascade not null,
  species_id uuid references public.species(id) on delete set null,
  image_url text not null,
  confidence double precision not null check (confidence >= 0 and confidence <= 1),
  location_lat double precision,
  location_lng double precision,
  notes text
);

alter table public.identifications enable row level security;

create policy "Utilisateurs voient leurs propres identifications" on public.identifications
  for select using (auth.uid() = user_id);

create policy "Utilisateurs créent leurs propres identifications" on public.identifications
  for insert with check (auth.uid() = user_id);

create policy "Utilisateurs suppriment leurs propres identifications" on public.identifications
  for delete using (auth.uid() = user_id);

-- Favoris
create table public.favorites (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  user_id uuid references auth.users(id) on delete cascade not null,
  species_id uuid references public.species(id) on delete cascade not null,
  unique(user_id, species_id)
);

alter table public.favorites enable row level security;

create policy "Utilisateurs voient leurs propres favoris" on public.favorites
  for select using (auth.uid() = user_id);

create policy "Utilisateurs gèrent leurs propres favoris" on public.favorites
  for all using (auth.uid() = user_id);

-- Trigger : créer un profil automatiquement à l'inscription
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Trigger : mettre à jour updated_at
create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger species_updated_at before update on public.species
  for each row execute function public.update_updated_at();

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.update_updated_at();

-- Storage bucket pour les images
insert into storage.buckets (id, name, public) values ('species-images', 'species-images', true);
insert into storage.buckets (id, name, public) values ('identification-images', 'identification-images', false);
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
