# Supabase локальная настройка для проекта RKO

## 1. Установка Supabase CLI

- Установи Supabase CLI по официальной инструкции: `https://supabase.com/docs/guides/cli`

## 2. Инициализация проекта Supabase

В корне проекта:

```bash
supabase init
```

Это создаст директорию `supabase` (если её нет) и базовые конфиги.

## 3. Запуск локального Supabase

```bash
supabase start
```

- Поднимется локальный Postgres и сервисы Supabase.

## 4. Применение миграций (схема + данные из `mock-data.ts`)

В корне проекта:

```bash
supabase db reset
```

или

```bash
supabase db push
```

- Будут применены миграции из `supabase/migrations`, включая:
  - `0001_init_rko_schema.sql` — схема таблиц (`banks`, `regions`, `bank_regions`, `tariffs`, `promotions`, `blog_posts`).
  - `0002_seed_rko_mock_data.sql` — данные, эквивалентные `src/lib/mock-data.ts`.

## 5. Переменные окружения для Next.js

Добавь в `.env.local`:

```bash
SUPABASE_URL=<url_из_supabase>
SUPABASE_ANON_KEY=<anon_key_из_supabase>
```

- Для локального запуска значения возьми из вывода `supabase start` или панели Supabase.

## 6. Генерация типов БД (по желанию)

```bash
supabase gen types typescript --linked --schema=public > src/lib/database.types.ts
```

- Эти типы будут использоваться в data layer для типобезопасных запросов к Supabase.

