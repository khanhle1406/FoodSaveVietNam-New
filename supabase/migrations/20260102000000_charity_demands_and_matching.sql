-- ─────────────────────────────────────────────────────────────
-- FoodSave Việt Nam: Sprint 1 Migration
-- Tables: charity_demands & demand_matches
-- Hỗ trợ cơ chế kết nối 2 chiều và ghép đơn tự động đa nguồn
-- ─────────────────────────────────────────────────────────────

create table if not exists public.charity_demands (
  id uuid primary key default gen_random_uuid(),
  charity_id uuid references public.charity_profiles(id) on delete cascade,
  charity_name text not null default 'Mái Ấm Tiếp Nhận',
  item_name text not null,
  category text not null default 'bakery',
  target_quantity integer not null check (target_quantity > 0),
  unit text not null default 'phần',
  urgency text not null default 'yellow',
  deadline timestamptz not null default (now() + interval '8 hours'),
  matched_quantity integer not null default 0,
  status text not null default 'open',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.demand_matches (
  id uuid primary key default gen_random_uuid(),
  demand_id uuid not null references public.charity_demands(id) on delete cascade,
  donation_id uuid references public.donations(id) on delete cascade,
  allocated_quantity integer not null check (allocated_quantity > 0),
  volunteer_id uuid references public.volunteers(id) on delete set null,
  stop_order integer not null default 1,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Bật RLS
alter table public.charity_demands enable row level security;
alter table public.demand_matches enable row level security;

-- Policies
create policy "Cho phép mọi người đọc danh sách nhu cầu cứu trợ"
  on public.charity_demands for select
  using (true);

create policy "Tổ chức từ thiện được tạo và cập nhật nhu cầu"
  on public.charity_demands for all
  using (true)
  with check (true);

create policy "Cho phép đọc bảng ghép đơn"
  on public.demand_matches for select
  using (true);

create policy "Cho phép ghi bảng ghép đơn"
  on public.demand_matches for all
  using (true)
  with check (true);

-- Seed data khởi tạo phục vụ demo
insert into public.charity_demands (
  id, charity_name, item_name, category, target_quantity, unit, urgency, notes
) values 
(
  'a1111111-1111-1111-1111-111111111111',
  'Mái Ấm Tre Xanh (Thảo Đàn)',
  'Bánh mì & Bánh ngọt dinh dưỡng',
  'bakery',
  50,
  'cái',
  'yellow',
  'Cần 50 cái bánh phục vụ bữa phụ xế chiều cho các em nhỏ tại mái ấm.'
),
(
  'b2222222-2222-2222-2222-222222222222',
  'Bếp Cơm Yêu Thương Q.7',
  'Rau củ tươi & Nông sản sạch',
  'fresh_produce',
  40,
  'kg',
  'green',
  'Cần rau sạch để nấu 150 suất cơm chay miễn phí cho bệnh viện.'
)
on conflict (id) do nothing;
