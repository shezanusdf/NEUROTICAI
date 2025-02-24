create table accounts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users,
  account_type varchar(50) not null, -- 'source' or 'destination'
  platform varchar(50) not null, -- 'instagram', 'tiktok', etc.
  account_name varchar(255) not null,
  credentials jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table branding_settings (
  id uuid default uuid_generate_v4() primary key,
  account_id uuid references accounts(id),
  logo_url text not null,
  position varchar(20) not null, -- 'top-left', 'bottom-right', etc.
  size_percentage integer default 20,
  opacity float default 0.8,
  custom_colors jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table jobs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users,
  source_video_id text not null,
  status varchar(50) not null,
  progress integer default 0,
  output_urls jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table account_links (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users,
  source_account_id uuid references accounts(id),
  destination_account_id uuid references accounts(id),
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
