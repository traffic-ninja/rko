-- Таблица для банков
CREATE TABLE public.banks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    description TEXT NOT NULL,
    rating REAL,
    tariff_count INTEGER NOT NULL,
    min_price INTEGER NOT NULL,
    has_online_opening BOOLEAN NOT NULL,
    has_free_tariff BOOLEAN NOT NULL,
    regions TEXT[] NOT NULL
);

-- Таблица для тарифов
CREATE TABLE public.tariffs (
    id TEXT PRIMARY KEY,
    bank_id TEXT NOT NULL REFERENCES public.banks(id),
    bank_name TEXT NOT NULL,
    bank_logo TEXT NOT NULL,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    price_label TEXT NOT NULL,
    description TEXT NOT NULL,
    target_audience TEXT NOT NULL,
    operations_limit INTEGER NOT NULL,
    transfer_commission TEXT NOT NULL,
    cash_withdrawal_commission TEXT NOT NULL,
    free_transfers INTEGER NOT NULL,
    features TEXT[] NOT NULL,
    requirements TEXT[] NOT NULL,
    is_recommended BOOLEAN,
    recommendation_reason TEXT
);

-- Таблица для акций
CREATE TABLE public.promotions (
    id TEXT PRIMARY KEY,
    bank_id TEXT NOT NULL REFERENCES public.banks(id),
    bank_name TEXT NOT NULL,
    bank_logo TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL, -- 'cashback' | 'free_service' | 'bonus'
    expires_at TIMESTAMPTZ,
    link TEXT NOT NULL
);

-- Таблица для статей блога
CREATE TABLE public.blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL, -- 'news' | 'guides' | 'reviews' | 'comparisons'
    published_at TIMESTAMPTZ NOT NULL,
    read_time INTEGER NOT NULL,
    author_name TEXT NOT NULL,
    author_avatar TEXT
);