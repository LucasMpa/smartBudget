create extension if not exists "pgcrypto";

create table expenses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  amount numeric(10,2) not null,
  created_at timestamptz not null default now()
);