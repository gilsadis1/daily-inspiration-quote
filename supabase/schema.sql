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

alter table public.subscribers enable row level security;
alter table public.verification_tokens enable row level security;
alter table public.sent_quotes enable row level security;
