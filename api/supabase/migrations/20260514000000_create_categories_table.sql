create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

alter table expenses
  add column category uuid references categories(id) on delete set null;

create index expenses_category_idx on expenses(category);

