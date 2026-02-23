-- Удаляем избыточные индексы из таблицы promotions
-- Эти индексы не нужны при малом количестве данных

DROP INDEX IF EXISTS promotions_is_active_idx;
DROP INDEX IF EXISTS promotions_created_at_idx;

