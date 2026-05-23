create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'pending' check (status in ('pending', 'active', 'unsubscribed')),
  source text not null default 'daily-inspiration-quote',
  verified_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.verification_tokens (
  id uuid primary key default gen_random_uuid(),
  subscriber_id uuid not null references public.subscribers(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists subscribers_status_idx on public.subscribers(status);
create index if not exists verification_tokens_subscriber_id_idx on public.verification_tokens(subscriber_id);

create table if not exists public.sent_quotes (
  id uuid primary key default gen_random_uuid(),
  sent_date date not null,
  quote_id text not null,
  created_at timestamptz not null default now(),
  unique (sent_date, quote_id)
);

create index if not exists sent_quotes_sent_date_idx on public.sent_quotes(sent_date);

create table if not exists public.published_quotes (
  id uuid primary key default gen_random_uuid(),
  sent_date date not null,
  quote_id text not null,
  author text not null,
  quote_text text not null,
  bio_lines text[] not null,
  wikipedia_url text not null,
  reflection_question text,
  created_at timestamptz not null default now(),
  unique (sent_date, quote_id)
);

create index if not exists published_quotes_sent_date_idx on public.published_quotes(sent_date desc);

create table if not exists public.subscriber_deliveries (
  id uuid primary key default gen_random_uuid(),
  subscriber_id uuid not null references public.subscribers(id) on delete cascade,
  quote_id text not null,
  sent_date date not null,
  delivery_type text not null check (delivery_type in ('welcome', 'daily')),
  created_at timestamptz not null default now(),
  unique (subscriber_id, sent_date)
);

create index if not exists subscriber_deliveries_subscriber_id_idx
  on public.subscriber_deliveries(subscriber_id);
create index if not exists subscriber_deliveries_sent_date_idx
  on public.subscriber_deliveries(sent_date);

alter table public.subscribers enable row level security;
alter table public.verification_tokens enable row level security;
alter table public.sent_quotes enable row level security;
alter table public.published_quotes enable row level security;
alter table public.subscriber_deliveries enable row level security;
