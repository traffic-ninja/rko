-- Добавить индекс на tariffs.bank_id
CREATE INDEX tariffs_bank_id_idx ON public.tariffs (bank_id);

-- Добавить индекс на promotions.bank_id
CREATE INDEX promotions_bank_id_idx ON public.promotions (bank_id);

-- Добавить индекс на blog_posts.published_at
CREATE INDEX blog_posts_published_at_idx ON public.blog_posts (published_at DESC);
