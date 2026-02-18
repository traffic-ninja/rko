# Команды Supabase CLI

Этот документ описывает общие команды Supabase CLI, используемые в этом проекте для локальной разработки и управления базой данных.

## Локальная разработка

-   **`pnpm dlx supabase start`**
    Запускает все локальные сервисы разработки Supabase, включая Postgres, аутентификацию (Auth), хранилище (Storage), функции (Functions) и Realtime. Эта команда необходима для запуска приложения с локальным бэкендом Supabase.

-   **`pnpm dlx supabase stop`**
    Останавливает все запущенные локальные сервисы разработки Supabase.

-   **`pnpm dlx supabase status`**
    Отображает текущий статус локальных сервисов Supabase, включая их URL-адреса и порты.

-   **`pnpm dlx supabase status --output json | jq -r '.["Studio URL"]' | xargs start`**
    Открывает Supabase Studio в вашем веб-браузере. Команда `jq` извлекает URL-адрес Studio из вывода JSON, а `xargs start` (или `open` в macOS, `xdg-open` в Linux) открывает его.

-   **`pnpm dlx supabase db reset`**
    Сбрасывает локальную базу данных Supabase. Это удалит все данные и повторно применит все миграции из директории `supabase/migrations`. Полезно для начала работы с чистого листа или тестирования миграций.

## Миграции базы данных

-   **`pnpm dlx supabase migration new <migration_name>`**
    Создает новый файл миграции в директории `supabase/migrations`. Затем вы можете отредактировать этот файл, чтобы определить изменения схемы.

-   **`pnpm dlx supabase db push`**
    Применяет ожидающие миграции к вашей локальной базе данных. Это используется для синхронизации схемы вашей локальной базы данных с файлами миграций.

-   **`pnpm dlx supabase migration list`**
    Перечисляет все миграции и их текущий статус (применены или ожидают).

## Генерация типов

-   **`pnpm dlx supabase gen types typescript --project-id "YOUR_PROJECT_REF" --schema public > src/lib/supabase/types.ts`**
    Генерирует типы TypeScript на основе схемы вашей базы данных Supabase. Замените `"YOUR_PROJECT_REF"` на фактический идентификатор вашего проекта Supabase. Эта команда обычно запускается для синхронизации типов вашего фронтенда и бэкенда с вашей базой данных. В этом проекте она определена в `package.json` как `supabase:gen-types`.

## Связывание с удаленным проектом

-   **`pnpm dlx supabase link --project-ref <project_ref>`**
    Связывает ваш локальный проект Supabase с удаленным проектом Supabase. Это необходимо перед развертыванием миграций или функций в удаленной среде.

## Развертывание изменений

-   **`pnpm dlx supabase db diff --local > supabase/migrations/<timestamp>_changes.sql`**
    Генерирует файл миграции, содержащий различия между схемой вашей локальной базы данных и схемой вашего удаленного проекта. Это полезно для создания новых миграций на основе изменений, внесенных непосредственно в вашу локальную базу данных.

-   **`pnpm dlx supabase deploy`**
    Развертывает ваши локальные изменения схемы (миграции) и Edge-функции в связанный удаленный проект Supabase.

## Бэкап базы данных

-   **`pnpm supabase:backup`**
    Создаёт дамп (бэкап) локальной базы данных с именем файла вида `backup_YYYYMMDD_HHMMSS.sql` в папке `backups/`. Рекомендуется выполнять перед внесением крупных изменений.

-   **`pnpm dlx supabase db dump --local > backups/backup.sql`**
    Базовая команда для создания бэкапа локальной базы данных в файл `backup.sql`.

-   **`pnpm dlx supabase db dump --db-url "YOUR_REMOTE_DB_URL" > backups/remote_backup.sql`**
    Создаёт дамп удалённой базы данных Supabase. Замените `YOUR_REMOTE_DB_URL` на строку подключения к вашей удалённой базе (можно найти в панели управления Supabase).

-   **`pnpm dlx supabase db dump --data-only --local > backups/data_only.sql`**
    Создаёт дамп только данных без схемы. Полезно для бэкапа контента перед сбросом базы.

-   **`pnpm dlx supabase db dump --schema-only --local > backups/schema_only.sql`**
    Создаёт дамп только схемы базы данных без данных. Полезно для документирования структуры БД.

-   **`psql "YOUR_DB_URL" < backups/backup_YYYYMMDD_HHMMSS.sql`**
    Восстанавливает базу данных из SQL-дампа. Замените `YOUR_DB_URL` на строку подключения и укажите нужный файл бэкапа.

---
*Примечание: Некоторые команды могут требовать установки переменных окружения, таких как `SUPABASE_PROJECT_ID` или `SUPABASE_REF`.*