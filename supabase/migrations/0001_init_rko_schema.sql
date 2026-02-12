create table if not exists public.banks (
  id text primary key,
  slug text unique not null,
  name text not null,
  logo_url text,
  description text,
  rating numeric,
  tariff_count integer not null default 0,
  min_price integer not null default 0,
  has_online_opening boolean not null default false,
  has_free_tariff boolean not null default false,
  inserted_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.regions (
  id serial primary key,
  code text unique,
  name text not null
);

create table if not exists public.bank_regions (
  bank_id text not null references public.banks (id) on delete cascade,
  region_id integer not null references public.regions (id) on delete cascade,
  primary key (bank_id, region_id)
);

create type public.tariff_feature as (
  label text
);

create table if not exists public.tariffs (
  id text primary key,
  slug text unique,
  bank_id text not null references public.banks (id) on delete cascade,
  name text not null,
  description text,
  target_audience text,
  price integer not null default 0,
  price_label text not null,
  operations_limit integer,
  transfer_commission text,
  cash_withdrawal_commission text,
  free_transfers integer not null default 0,
  features text[] not null default '{}',
  requirements text[] not null default '{}',
  is_recommended boolean not null default false,
  recommendation_reason text,
  inserted_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create type public.promotion_type as enum ('cashback', 'free_service', 'bonus');

create table if not exists public.promotions (
  id text primary key,
  slug text unique,
  bank_id text references public.banks (id) on delete set null,
  title text not null,
  description text,
  type public.promotion_type not null,
  expires_at date,
  link text not null,
  inserted_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create type public.blog_category as enum ('news', 'guides', 'reviews', 'comparisons');

create table if not exists public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  image text,
  category public.blog_category not null,
  published_at timestamptz,
  read_time integer,
  author_name text,
  author_avatar text,
  is_published boolean not null default true,
  inserted_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

