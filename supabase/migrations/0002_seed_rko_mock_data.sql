-- Seed regions
insert into public.regions (name)
values
  ('Москва'),
  ('Санкт-Петербург'),
  ('Екатеринбург'),
  ('Новосибирск'),
  ('Казань'),
  ('Нижний Новгород'),
  ('Все регионы');

-- Seed banks
insert into public.banks (id, slug, name, logo_url, description, rating, tariff_count, min_price, has_online_opening, has_free_tariff)
values
  ('tinkoff', 'tinkoff', 'Тинькофф Банк', '/tinkoff-bank-logo-yellow.jpg', 'Онлайн-банк для бизнеса с быстрым открытием счёта', 4.8, 3, 0, true, true),
  ('sber', 'sber', 'Сбербанк', '/sberbank-logo-green.jpg', 'Крупнейший банк России с широкой сетью отделений', 4.5, 4, 0, true, true),
  ('alfa', 'alfa', 'Альфа-Банк', '/alfa-bank-logo-red.jpg', 'Надёжный банк с выгодными условиями для бизнеса', 4.6, 3, 0, true, true),
  ('vtb', 'vtb', 'ВТБ', '/vtb-bank-logo-blue.jpg', 'Государственный банк с гибкими тарифами', 4.4, 3, 0, true, false),
  ('raiffeisen', 'raiffeisen', 'Райффайзенбанк', '/raiffeisen-bank-logo-yellow-black.jpg', 'Международный банк с качественным сервисом', 4.7, 2, 490, true, false),
  ('otkritie', 'otkritie', 'Открытие', '/otkritie-bank-logo-blue.jpg', 'Универсальный банк для малого бизнеса', 4.3, 3, 0, true, true),
  ('modul', 'modul', 'Модульбанк', '/modulbank-logo-green.jpg', 'Банк для предпринимателей с простым интерфейсом', 4.6, 3, 0, true, true),
  ('tochka', 'tochka', 'Точка', '/tochka-bank-logo-blue.jpg', 'Цифровой банк с инновационными решениями', 4.7, 2, 0, true, true);

-- Link banks to regions
insert into public.bank_regions (bank_id, region_id)
select b.id, r.id
from public.banks b
join public.regions r on r.name = any (case b.id
  when 'raiffeisen' then array['Москва','Санкт-Петербург','Екатеринбург']
  else array['Москва','Санкт-Петербург','Все регионы']
end);

-- Seed tariffs
insert into public.tariffs (
  id,
  slug,
  bank_id,
  name,
  description,
  target_audience,
  price,
  price_label,
  operations_limit,
  transfer_commission,
  cash_withdrawal_commission,
  free_transfers,
  features,
  requirements,
  is_recommended,
  recommendation_reason
)
values
  -- Тинькофф
  (
    'tinkoff-simple',
    'tinkoff-simple',
    'tinkoff',
    'Простой',
    'Базовый тариф для начинающего бизнеса',
    'ИП с небольшим оборотом до 500 000 ₽',
    0,
    'Бесплатно',
    10,
    '49 ₽ за платёж',
    '1.5% + 99 ₽',
    3,
    array['Бесплатное обслуживание','3 бесплатных платежа','Мобильное приложение','Круглосуточная поддержка'],
    array['Паспорт','ИНН','ОГРНИП'],
    true,
    'Лучший выбор для старта бизнеса'
  ),
  (
    'tinkoff-advanced',
    'tinkoff-advanced',
    'tinkoff',
    'Продвинутый',
    'Для активного бизнеса с большим количеством операций',
    'ИП и ООО с оборотом до 2 000 000 ₽',
    1990,
    '1 990 ₽/мес',
    50,
    '29 ₽ за платёж',
    '1% + 79 ₽',
    20,
    array['20 бесплатных платежей','Сниженные комиссии','Бизнес-карта','Кэшбэк до 5%'],
    array['Паспорт','ИНН','ОГРН'],
    false,
    null
  ),
  (
    'tinkoff-professional',
    'tinkoff-professional',
    'tinkoff',
    'Профессиональный',
    'Максимум возможностей для крупного бизнеса',
    'ООО с оборотом от 5 000 000 ₽',
    4990,
    '4 990 ₽/мес',
    200,
    '19 ₽ за платёж',
    '0.5%',
    100,
    array['100 бесплатных платежей','VIP-поддержка','Персональный менеджер','Овердрафт'],
    array['Паспорт','ИНН','ОГРН','Устав'],
    false,
    null
  ),
  -- Сбербанк
  (
    'sber-start',
    'sber-start',
    'sber',
    'Лёгкий старт',
    'Бесплатный тариф для начинающих предпринимателей',
    'ИП и самозанятые',
    0,
    'Бесплатно',
    5,
    '100 ₽ за платёж',
    '2%',
    0,
    array['Бесплатное открытие','Мобильный банк','Интеграция с 1С'],
    array['Паспорт','ИНН'],
    false,
    null
  ),
  (
    'sber-business',
    'sber-business',
    'sber',
    'Бизнес старт',
    'Оптимальный тариф для малого бизнеса',
    'ИП и ООО с оборотом до 1 000 000 ₽',
    990,
    '990 ₽/мес',
    30,
    '50 ₽ за платёж',
    '1.5%',
    10,
    array['10 бесплатных платежей','Эквайринг со скидкой','Бизнес-карта'],
    array['Паспорт','ИНН','ОГРН'],
    false,
    null
  ),
  -- Альфа-Банк
  (
    'alfa-free',
    'alfa-free',
    'alfa',
    'На старте',
    'Бесплатное обслуживание для нового бизнеса',
    'ИП с оборотом до 300 000 ₽',
    0,
    'Бесплатно',
    10,
    '59 ₽ за платёж',
    '1.9%',
    5,
    array['5 бесплатных платежей','Онлайн-открытие за 10 минут','Мобильный банк'],
    array['Паспорт','ИНН'],
    true,
    'Быстрое открытие и удобное приложение'
  ),
  (
    'alfa-optimal',
    'alfa-optimal',
    'alfa',
    'Оптимальный',
    'Сбалансированный тариф для растущего бизнеса',
    'ИП и ООО с оборотом до 3 000 000 ₽',
    1490,
    '1 490 ₽/мес',
    50,
    '35 ₽ за платёж',
    '1.3%',
    25,
    array['25 бесплатных платежей','Кэшбэк на бизнес-расходы','Бесплатная бизнес-карта'],
    array['Паспорт','ИНН','ОГРН'],
    false,
    null
  ),
  -- Модульбанк
  (
    'modul-start',
    'modul-start',
    'modul',
    'Стартовый',
    'Бесплатный счёт для микробизнеса',
    'ИП с редкими операциями',
    0,
    'Бесплатно',
    5,
    '90 ₽ за платёж',
    '2.5%',
    0,
    array['Бесплатное обслуживание','Простой интерфейс','Быстрое открытие'],
    array['Паспорт','ИНН'],
    false,
    null
  ),
  (
    'modul-optimal',
    'modul-optimal',
    'modul',
    'Оптимальный',
    'Выгодный тариф для активного ИП',
    'ИП с оборотом до 1 000 000 ₽',
    690,
    '690 ₽/мес',
    30,
    '19 ₽ за платёж',
    '1%',
    15,
    array['15 бесплатных платежей','Сниженные комиссии','Интеграция с бухгалтерией'],
    array['Паспорт','ИНН'],
    true,
    'Лучшее соотношение цены и возможностей'
  );

-- Seed promotions
insert into public.promotions (id, slug, bank_id, title, description, type, expires_at, link)
values
  (
    'tinkoff-promo-1',
    'tinkoff-promo-1',
    'tinkoff',
    '3 месяца бесплатно на тарифе \"Продвинутый\"',
    'Откройте счёт до конца месяца и получите 3 месяца бесплатного обслуживания',
    'free_service',
    '2026-02-28',
    '/banks/tinkoff'
  ),
  (
    'alfa-promo-1',
    'alfa-promo-1',
    'alfa',
    'Кэшбэк 10% на топливо',
    'Повышенный кэшбэк на АЗС для новых клиентов в течение первого месяца',
    'cashback',
    '2026-01-31',
    '/banks/alfa'
  ),
  (
    'modul-promo-1',
    'modul-promo-1',
    'modul',
    'Бонус 5000 ₽ на счёт',
    'Получите бонус при открытии счёта и первом пополнении от 50 000 ₽',
    'bonus',
    null,
    '/banks/modul'
  ),
  (
    'sber-promo-1',
    'sber-promo-1',
    'sber',
    'Бесплатная бухгалтерия на 6 месяцев',
    'Подключите онлайн-бухгалтерию бесплатно при открытии счёта',
    'free_service',
    null,
    '/banks/sber'
  );

-- Seed blog posts
insert into public.blog_posts (
  slug,
  title,
  excerpt,
  content,
  image,
  category,
  published_at,
  read_time,
  author_name,
  is_published
)
values
  (
    'kak-vybrat-rko-dlya-ip',
    'Как выбрать РКО для ИП в 2026 году',
    'Подробный гайд по выбору расчётно-кассового обслуживания для индивидуальных предпринимателей: на что обратить внимание и как сэкономить.',
    '',
    '/business-banking-guide.jpg',
    'guides',
    '2026-01-15T00:00:00+00',
    8,
    'Анна Смирнова',
    true
  ),
  (
    'sravnenie-tarify-2026',
    'Сравнение тарифов РКО топ-5 банков',
    'Детальное сравнение условий расчётно-кассового обслуживания в крупнейших банках России.',
    '',
    '/bank-comparison-chart.jpg',
    'comparisons',
    '2026-01-10T00:00:00+00',
    12,
    'Михаил Петров',
    true
  ),
  (
    'besplatnoe-rko-podvodnye-kamni',
    'Бесплатное РКО: подводные камни',
    'Разбираемся, действительно ли бесплатные тарифы выгодны и какие скрытые комиссии могут вас ждать.',
    '',
    '/financial-analysis-workspace.png',
    'reviews',
    '2026-01-05T00:00:00+00',
    6,
    'Елена Козлова',
    true
  );

