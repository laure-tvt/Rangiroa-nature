-- Rangiroa Nature — Supabase Schema
create extension if not exists "uuid-ossp";

-- PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  username text not null,
  avatar_url text,
  bio text,
  total_identifications integer default 0,
  total_favorites integer default 0,
  joined_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can view all profiles" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, email, username)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- SPECIES
create table public.species (
  id uuid default uuid_generate_v4() primary key,
  name_common_fr text not null,
  name_common_en text not null,
  name_scientific text not null,
  category text not null check (category in ('fish','shark','ray','mammal','bird','invertebrate','plant','coral')),
  habitat text[] default '{}',
  description text not null,
  image_url text not null,
  thumbnail_url text not null,
  conservation_status text not null check (conservation_status in ('LC','NT','VU','EN','CR','EW','EX','DD')),
  is_endemic boolean default false,
  fun_fact text not null,
  inaturalist_id integer,
  created_at timestamptz default now()
);
alter table public.species enable row level security;
create policy "Species are publicly readable" on public.species for select using (true);

create table public.species_locations (
  id uuid default uuid_generate_v4() primary key,
  species_id uuid references public.species on delete cascade not null,
  latitude double precision not null,
  longitude double precision not null,
  name text not null
);
alter table public.species_locations enable row level security;
create policy "Species locations are publicly readable" on public.species_locations for select using (true);

-- IDENTIFICATIONS
create table public.identifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  species_id uuid references public.species on delete set null,
  photo_url text not null,
  confidence double precision not null check (confidence >= 0 and confidence <= 1),
  latitude double precision,
  longitude double precision,
  notes text,
  created_at timestamptz default now()
);
alter table public.identifications enable row level security;
create policy "Users can view own identifications" on public.identifications for select using (auth.uid() = user_id);
create policy "Users can insert own identifications" on public.identifications for insert with check (auth.uid() = user_id);
create policy "Users can delete own identifications" on public.identifications for delete using (auth.uid() = user_id);

create or replace function public.increment_identification_count() returns trigger as $$
begin
  update public.profiles set total_identifications = total_identifications + 1 where id = new.user_id;
  return new;
end;
$$ language plpgsql security definer;
create trigger on_identification_created after insert on public.identifications for each row execute procedure public.increment_identification_count();

-- FAVORITES
create table public.favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  species_id uuid references public.species on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, species_id)
);
alter table public.favorites enable row level security;
create policy "Users can view own favorites" on public.favorites for select using (auth.uid() = user_id);
create policy "Users can insert own favorites" on public.favorites for insert with check (auth.uid() = user_id);
create policy "Users can delete own favorites" on public.favorites for delete using (auth.uid() = user_id);

create or replace function public.sync_favorites_count() returns trigger as $$
begin
  if (tg_op = 'INSERT') then
    update public.profiles set total_favorites = total_favorites + 1 where id = new.user_id;
  elsif (tg_op = 'DELETE') then
    update public.profiles set total_favorites = total_favorites - 1 where id = old.user_id;
  end if;
  return null;
end;
$$ language plpgsql security definer;
create trigger on_favorite_changed after insert or delete on public.favorites for each row execute procedure public.sync_favorites_count();

-- STORAGE
insert into storage.buckets (id, name, public) values ('identification-photos', 'identification-photos', true);
create policy "Users can upload own photos" on storage.objects for insert with check (bucket_id = 'identification-photos' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Photos are publicly readable" on storage.objects for select using (bucket_id = 'identification-photos');
create policy "Users can delete own photos" on storage.objects for delete using (bucket_id = 'identification-photos' and auth.uid()::text = (storage.foldername(name))[1]);
