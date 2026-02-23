-- Добавляем колонки is_active и created_at в таблицу promotions
ALTER TABLE public.promotions 
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Создаём индекс для фильтрации по is_active
CREATE INDEX IF NOT EXISTS promotions_is_active_idx ON public.promotions(is_active);

-- Создаём индекс для сортировки по created_at
CREATE INDEX IF NOT EXISTS promotions_created_at_idx ON public.promotions(created_at DESC);
