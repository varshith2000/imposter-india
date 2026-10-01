-- ============================================================================
-- Who's The Imposter? — India Edition
-- Complete PostgreSQL schema for Supabase
-- Run this in the Supabase SQL editor (or `supabase db push`).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- EXTENSIONS
-- pgcrypto provides gen_random_bytes(), used by create_room to mint room codes.
-- (gen_random_uuid() is built-in, but gen_random_bytes is not.)
-- ---------------------------------------------------------------------------
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- PROFILES
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null default 'Player',
  avatar text not null default '🐯',
  xp integer not null default 0,
  coins integer not null default 100,
  games_played integer not null default 0,
  wins integer not null default 0,
  imposter_wins integer not null default 0,
  correct_votes integer not null default 0,
  correct_guesses integer not null default 0,
  streak integer not null default 0,
  best_streak integer not null default 0,
  country text,
  state text,
  city text,
  is_guest boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are viewable by everyone" on public.profiles;
create policy "profiles are viewable by everyone"
  on public.profiles for select using (true);
drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile"
  on public.profiles for update using (auth.uid() = id);
drop policy if exists "users insert own profile" on public.profiles;
create policy "users insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username)
  values (new.id, 'Player' || floor(random() * 90000 + 10000)::text)
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- CATEGORIES & WORDS (admin managed; seeded from the app data)
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id text primary key,
  name text not null,
  emoji text not null default '🎯',
  grp text not null default 'General India',
  difficulty text not null default 'medium' check (difficulty in ('easy','medium','hard')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.words (
  id bigint generated always as identity primary key,
  category_id text not null references public.categories(id) on delete cascade,
  word text not null,
  hint text,
  is_active boolean not null default true,
  unique (category_id, word)
);

alter table public.categories enable row level security;
alter table public.words enable row level security;
drop policy if exists "categories readable" on public.categories;
create policy "categories readable" on public.categories for select using (true);
drop policy if exists "words readable" on public.words;
create policy "words readable" on public.words for select using (true);

-- ---------------------------------------------------------------------------
-- ROOMS & PLAYERS
-- ---------------------------------------------------------------------------
create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  host_id uuid not null references auth.users(id),
  phase text not null default 'lobby'
    check (phase in ('lobby','word-reveal','discussion','voting','vote-reveal','round-end','game-over')),
  settings jsonb not null default '{}'::jsonb,
  round integer not null default 0,
  category_id text,
  category_name text,
  -- secret word is NEVER exposed through this table; it lives in round_secrets
  winner text check (winner in ('crew','imposter')),
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.room_players (
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  username text not null,
  avatar text not null default '🐯',
  is_host boolean not null default false,
  alive boolean not null default true,
  connected boolean not null default true,
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

-- Per-player secrets: RLS ensures a player can only read their own row.
create table if not exists public.player_secrets (
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  round integer not null,
  role text not null check (role in ('crew','imposter')),
  secret_word text, -- null for imposters
  hint text, -- word-specific hint for crew, null for imposters
  primary key (room_id, user_id, round)
);

create table if not exists public.votes (
  room_id uuid not null references public.rooms(id) on delete cascade,
  round integer not null,
  voter_id uuid not null references auth.users(id) on delete cascade,
  target_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (room_id, round, voter_id) -- prevents duplicate votes
);

create table if not exists public.round_results (
  room_id uuid not null references public.rooms(id) on delete cascade,
  round integer not null,
  eliminated_id uuid,
  was_imposter boolean not null default false,
  tie boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (room_id, round)
);

create table if not exists public.chat_messages (
  id bigint generated always as identity primary key,
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  username text not null,
  avatar text not null default '🐯',
  kind text not null default 'chat' check (kind in ('chat','emoji','system','hint')),
  content text not null check (char_length(content) <= 300),
  created_at timestamptz not null default now()
);

alter table public.rooms enable row level security;
alter table public.room_players enable row level security;
alter table public.player_secrets enable row level security;
alter table public.votes enable row level security;
alter table public.round_results enable row level security;
alter table public.chat_messages enable row level security;

drop policy if exists "rooms readable by all" on public.rooms;
create policy "rooms readable by all" on public.rooms for select using (true);
drop policy if exists "room players readable" on public.room_players;
create policy "room players readable" on public.room_players for select using (true);
drop policy if exists "own secret only" on public.player_secrets;
create policy "own secret only" on public.player_secrets for select using (auth.uid() = user_id);
drop policy if exists "results readable" on public.round_results;
create policy "results readable" on public.round_results for select using (true);
drop policy if exists "chat readable by room members" on public.chat_messages;
create policy "chat readable by room members" on public.chat_messages for select using (
  exists (select 1 from public.room_players rp where rp.room_id = chat_messages.room_id and rp.user_id = auth.uid())
);
drop policy if exists "chat insert by room members" on public.chat_messages;
create policy "chat insert by room members" on public.chat_messages for insert with check (
  auth.uid() = user_id and exists (
    select 1 from public.room_players rp where rp.room_id = chat_messages.room_id and rp.user_id = auth.uid()
  )
);
-- Votes: hidden while voting is live (revealed via round_results & RPC tally)
drop policy if exists "votes visible after reveal" on public.votes;
create policy "votes visible after reveal" on public.votes for select using (
  exists (select 1 from public.rooms r where r.id = votes.room_id and r.phase in ('vote-reveal','round-end','game-over'))
  or voter_id = auth.uid()
);

-- ---------------------------------------------------------------------------
-- MATCH HISTORY / XP LEDGER / ACHIEVEMENTS / INVENTORY
-- ---------------------------------------------------------------------------
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references public.rooms(id) on delete set null,
  category_id text,
  word text,
  winner text check (winner in ('crew','imposter')),
  rounds integer not null default 1,
  duration_seconds integer,
  played_at timestamptz not null default now()
);

create table if not exists public.match_participants (
  match_id uuid not null references public.matches(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('crew','imposter')),
  won boolean not null default false,
  voted_correctly boolean not null default false,
  xp_earned integer not null default 0,
  coins_earned integer not null default 0,
  primary key (match_id, user_id)
);

create table if not exists public.xp_ledger (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  amount integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.achievements (
  id text primary key,
  name text not null,
  description text not null,
  emoji text not null default '🏅',
  goal integer not null default 1,
  stat text not null,
  coins integer not null default 0
);

create table if not exists public.user_achievements (
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id text not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

create table if not exists public.unlockables (
  id text primary key,
  kind text not null check (kind in ('avatar','theme','frame','emote','badge','title','room_effect')),
  name text not null,
  emoji text,
  cost integer not null default 0
);

create table if not exists public.inventory (
  user_id uuid not null references auth.users(id) on delete cascade,
  unlockable_id text not null references public.unlockables(id) on delete cascade,
  acquired_at timestamptz not null default now(),
  primary key (user_id, unlockable_id)
);

alter table public.matches enable row level security;
alter table public.match_participants enable row level security;
alter table public.xp_ledger enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.unlockables enable row level security;
alter table public.inventory enable row level security;

drop policy if exists "matches readable" on public.matches;
create policy "matches readable" on public.matches for select using (true);
drop policy if exists "participants readable" on public.match_participants;
create policy "participants readable" on public.match_participants for select using (true);
drop policy if exists "own ledger" on public.xp_ledger;
create policy "own ledger" on public.xp_ledger for select using (auth.uid() = user_id);
drop policy if exists "achievements readable" on public.achievements;
create policy "achievements readable" on public.achievements for select using (true);
drop policy if exists "user achievements readable" on public.user_achievements;
create policy "user achievements readable" on public.user_achievements for select using (true);
drop policy if exists "unlockables readable" on public.unlockables;
create policy "unlockables readable" on public.unlockables for select using (true);
drop policy if exists "own inventory" on public.inventory;
create policy "own inventory" on public.inventory for select using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- LEADERBOARD VIEW
-- ---------------------------------------------------------------------------
create or replace view public.leaderboard as
select
  p.id, p.username, p.avatar, p.xp, p.wins, p.games_played,
  case when p.games_played = 0 then 0
       else round((p.wins::numeric / p.games_played) * 100) end as win_pct,
  rank() over (order by p.xp desc) as rank
from public.profiles p
where p.games_played > 0;

-- ---------------------------------------------------------------------------
-- RPC: create_room
-- ---------------------------------------------------------------------------
create or replace function public.create_room(p_settings jsonb, p_username text, p_avatar text)
returns table (room_id uuid, room_code text)
language plpgsql security definer set search_path = public as $$
declare
  v_code text;
  v_room uuid;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  loop
    v_code := upper(substr(translate(encode(gen_random_bytes(8), 'base64'), '+/=0OIl1', 'ABCDEFGH'), 1, 6));
    exit when not exists (select 1 from rooms where code = v_code);
  end loop;
  insert into rooms (code, host_id, settings, is_public)
  values (v_code, auth.uid(), p_settings, coalesce((p_settings->>'isPublic')::boolean, false))
  returning id into v_room;
  insert into room_players (room_id, user_id, username, avatar, is_host)
  values (v_room, auth.uid(), left(p_username, 24), p_avatar, true);
  return query select v_room, v_code;
end $$;

-- ---------------------------------------------------------------------------
-- RPC: join_room
-- ---------------------------------------------------------------------------
create or replace function public.join_room(p_code text, p_username text, p_avatar text)
returns uuid
language plpgsql security definer set search_path = public as $$
declare
  v_room rooms%rowtype;
  v_count integer;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  select * into v_room from rooms where code = upper(p_code);
  if not found then raise exception 'ROOM_NOT_FOUND'; end if;
  if v_room.phase <> 'lobby' then
    -- allow rejoin (reconnect support)
    if exists (select 1 from room_players where room_id = v_room.id and user_id = auth.uid()) then
      update room_players set connected = true where room_id = v_room.id and user_id = auth.uid();
      return v_room.id;
    end if;
    raise exception 'GAME_IN_PROGRESS';
  end if;
  select count(*) into v_count from room_players where room_id = v_room.id;
  if v_count >= coalesce((v_room.settings->>'maxPlayers')::int, 15) then
    raise exception 'ROOM_FULL';
  end if;
  insert into room_players (room_id, user_id, username, avatar)
  values (v_room.id, auth.uid(), left(p_username, 24), p_avatar)
  on conflict (room_id, user_id) do update set connected = true;
  return v_room.id;
end $$;

-- ---------------------------------------------------------------------------
-- RPC: start_game (host only) — assigns roles & secret words server-side
-- ---------------------------------------------------------------------------
create or replace function public.start_game(p_room_id uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare
  v_room rooms%rowtype;
  v_players uuid[];
  v_imposters uuid[];
  v_imposter_count int;
  v_word text;
  v_hint text;
  v_cat_id text;
  v_cat_name text;
  v_uid uuid;
  v_cat_ids text[];
  v_difficulty text;
begin
  select * into v_room from rooms where id = p_room_id for update;
  if not found then raise exception 'ROOM_NOT_FOUND'; end if;
  if v_room.host_id <> auth.uid() then raise exception 'ONLY_HOST'; end if;

  select array_agg(user_id) into v_players from room_players where room_id = p_room_id;
  if array_length(v_players, 1) < 3 then raise exception 'NEED_3_PLAYERS'; end if;

  -- pick category & word (honours the host's chosen topics + difficulty)
  select array(select jsonb_array_elements_text(coalesce(v_room.settings->'categoryIds', '[]'::jsonb))) into v_cat_ids;
  v_difficulty := coalesce(v_room.settings->>'difficulty', 'mixed');
  select w.word, w.hint, c.id, c.name into v_word, v_hint, v_cat_id, v_cat_name
  from words w join categories c on c.id = w.category_id
  where w.is_active and c.is_active
    and (cardinality(v_cat_ids) = 0 or c.id = any(v_cat_ids))
    and (v_difficulty = 'mixed' or c.difficulty = v_difficulty)
  order by random() limit 1;
  -- fallback: relax the difficulty filter if that combo has no words
  if v_word is null then
    select w.word, w.hint, c.id, c.name into v_word, v_hint, v_cat_id, v_cat_name
    from words w join categories c on c.id = w.category_id
    where w.is_active and c.is_active
      and (cardinality(v_cat_ids) = 0 or c.id = any(v_cat_ids))
    order by random() limit 1;
  end if;
  if v_word is null then raise exception 'NO_WORDS'; end if;

  v_imposter_count := least(coalesce((v_room.settings->>'imposters')::int, 1),
                            greatest(1, array_length(v_players, 1) / 3));

  select array(select u from unnest(v_players) u order by random() limit v_imposter_count)
    into v_imposters;

  update room_players set alive = true where room_id = p_room_id;
  delete from votes where room_id = p_room_id;
  delete from round_results where room_id = p_room_id;
  delete from player_secrets where room_id = p_room_id;

  foreach v_uid in array v_players loop
    insert into player_secrets (room_id, user_id, round, role, secret_word, hint)
    values (
      p_room_id, v_uid, v_room.round + 1,
      case when v_uid = any(v_imposters) then 'imposter' else 'crew' end,
      case when v_uid = any(v_imposters) then null else v_word end,
      case when v_uid = any(v_imposters) then null else v_hint end
    );
  end loop;

  update rooms set
    phase = 'word-reveal',
    round = round + 1,
    category_id = v_cat_id,
    category_name = v_cat_name,
    winner = null,
    updated_at = now()
  where id = p_room_id;
end $$;

-- ---------------------------------------------------------------------------
-- RPC: set_phase (host only) — e.g. host presses "Start Voting"
-- ---------------------------------------------------------------------------
create or replace function public.set_phase(p_room_id uuid, p_phase text)
returns void
language plpgsql security definer set search_path = public as $$
declare v_host uuid;
begin
  select host_id into v_host from rooms where id = p_room_id;
  if v_host <> auth.uid() then raise exception 'ONLY_HOST'; end if;
  if p_phase not in ('discussion','voting','lobby') then raise exception 'BAD_PHASE'; end if;
  if p_phase = 'voting' then
    delete from votes v using rooms r where r.id = p_room_id and v.room_id = p_room_id and v.round = r.round;
  end if;
  update rooms set phase = p_phase, updated_at = now() where id = p_room_id;
end $$;

-- ---------------------------------------------------------------------------
-- RPC: cast_vote (server-validated, one vote per round)
-- ---------------------------------------------------------------------------
create or replace function public.cast_vote(p_room_id uuid, p_target uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare
  v_room rooms%rowtype;
  v_alive boolean;
  v_target_alive boolean;
  v_total int;
  v_voted int;
begin
  select * into v_room from rooms where id = p_room_id for update;
  if v_room.phase <> 'voting' then raise exception 'NOT_VOTING'; end if;
  select alive into v_alive from room_players where room_id = p_room_id and user_id = auth.uid();
  if not coalesce(v_alive, false) then raise exception 'NOT_ALIVE'; end if;
  if p_target = auth.uid() then raise exception 'NO_SELF_VOTE'; end if;
  select alive into v_target_alive from room_players where room_id = p_room_id and user_id = p_target;
  if not coalesce(v_target_alive, false) then raise exception 'TARGET_NOT_ALIVE'; end if;

  insert into votes (room_id, round, voter_id, target_id)
  values (p_room_id, v_room.round, auth.uid(), p_target);
  -- duplicate votes rejected by primary key

  -- auto-reveal when everyone alive has voted
  select count(*) into v_total from room_players where room_id = p_room_id and alive;
  select count(*) into v_voted from votes where room_id = p_room_id and round = v_room.round;
  if v_voted >= v_total then
    perform public.tally_votes(p_room_id);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- RPC: tally_votes — computes elimination, win condition, updates room
-- ---------------------------------------------------------------------------
create or replace function public.tally_votes(p_room_id uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare
  v_room rooms%rowtype;
  v_eliminated uuid;
  v_max int;
  v_ties int;
  v_was_imposter boolean := false;
  v_alive_imposters int;
  v_alive_crew int;
begin
  select * into v_room from rooms where id = p_room_id for update;
  if v_room.phase <> 'voting' then return; end if;

  select target_id, cnt into v_eliminated, v_max from (
    select target_id, count(*) cnt from votes
    where room_id = p_room_id and round = v_room.round
    group by target_id order by cnt desc limit 1
  ) t;

  select count(*) into v_ties from (
    select target_id, count(*) cnt from votes
    where room_id = p_room_id and round = v_room.round
    group by target_id having count(*) = v_max
  ) t2;

  if v_ties > 1 or v_eliminated is null then
    insert into round_results (room_id, round, eliminated_id, was_imposter, tie)
    values (p_room_id, v_room.round, null, false, true);
    update rooms set phase = 'vote-reveal', updated_at = now() where id = p_room_id;
    return;
  end if;

  select (role = 'imposter') into v_was_imposter
  from player_secrets
  where room_id = p_room_id and user_id = v_eliminated and round = v_room.round;

  update room_players set alive = false where room_id = p_room_id and user_id = v_eliminated;

  insert into round_results (room_id, round, eliminated_id, was_imposter, tie)
  values (p_room_id, v_room.round, v_eliminated, coalesce(v_was_imposter, false), false);

  select count(*) into v_alive_imposters
  from room_players rp join player_secrets ps
    on ps.room_id = rp.room_id and ps.user_id = rp.user_id and ps.round = v_room.round
  where rp.room_id = p_room_id and rp.alive and ps.role = 'imposter';

  select count(*) into v_alive_crew
  from room_players rp join player_secrets ps
    on ps.room_id = rp.room_id and ps.user_id = rp.user_id and ps.round = v_room.round
  where rp.room_id = p_room_id and rp.alive and ps.role = 'crew';

  if v_alive_imposters = 0 then
    update rooms set phase = 'game-over', winner = 'crew', updated_at = now() where id = p_room_id;
  elsif v_alive_imposters >= v_alive_crew then
    update rooms set phase = 'game-over', winner = 'imposter', updated_at = now() where id = p_room_id;
  else
    update rooms set phase = 'vote-reveal', updated_at = now() where id = p_room_id;
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- RPC: continue_round (host) — after vote-reveal, go back to discussion
-- ---------------------------------------------------------------------------
create or replace function public.continue_round(p_room_id uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare v_room rooms%rowtype;
begin
  select * into v_room from rooms where id = p_room_id for update;
  if v_room.host_id <> auth.uid() then raise exception 'ONLY_HOST'; end if;
  if v_room.phase <> 'vote-reveal' then raise exception 'BAD_PHASE'; end if;
  -- carry secrets forward into next voting round
  insert into player_secrets (room_id, user_id, round, role, secret_word, hint)
  select room_id, user_id, v_room.round + 1, role, secret_word, hint
  from player_secrets where room_id = p_room_id and round = v_room.round
  on conflict do nothing;
  update rooms set phase = 'discussion', round = round + 1, updated_at = now()
  where id = p_room_id;
end $$;

-- ---------------------------------------------------------------------------
-- RPC: restart_room (host) — instant replay with same players
-- ---------------------------------------------------------------------------
create or replace function public.restart_room(p_room_id uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare v_host uuid;
begin
  select host_id into v_host from rooms where id = p_room_id;
  if v_host <> auth.uid() then raise exception 'ONLY_HOST'; end if;
  update room_players set alive = true where room_id = p_room_id;
  update rooms set phase = 'lobby', round = 0, winner = null, category_id = null,
    category_name = null, updated_at = now()
  where id = p_room_id;
  perform public.start_game(p_room_id);
end $$;

-- ---------------------------------------------------------------------------
-- RPC: leave_room (host migration + cleanup)
-- ---------------------------------------------------------------------------
create or replace function public.leave_room(p_room_id uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare
  v_room rooms%rowtype;
  v_next uuid;
begin
  delete from room_players where room_id = p_room_id and user_id = auth.uid();
  select * into v_room from rooms where id = p_room_id;
  if not found then return; end if;
  if v_room.host_id = auth.uid() then
    select user_id into v_next from room_players where room_id = p_room_id order by joined_at limit 1;
    if v_next is null then
      delete from rooms where id = p_room_id;
    else
      update rooms set host_id = v_next, updated_at = now() where id = p_room_id;
      update room_players set is_host = true where room_id = p_room_id and user_id = v_next;
    end if;
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- RPC: award_results — grant XP/coins after game over (idempotent per match)
-- ---------------------------------------------------------------------------
create or replace function public.award_results(p_room_id uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare
  v_room rooms%rowtype;
  v_match uuid;
  r record;
  v_xp int;
  v_coins int;
  v_won boolean;
  v_correct boolean;
begin
  select * into v_room from rooms where id = p_room_id;
  if v_room.phase <> 'game-over' or v_room.winner is null then return; end if;
  if v_room.host_id <> auth.uid() then raise exception 'ONLY_HOST'; end if;
  if exists (select 1 from matches where room_id = p_room_id
             and played_at > v_room.updated_at - interval '1 minute') then
    return; -- already awarded
  end if;

  insert into matches (room_id, category_id, winner, rounds)
  values (p_room_id, v_room.category_id, v_room.winner, v_room.round)
  returning id into v_match;

  for r in
    select rp.user_id, ps.role,
      exists (
        select 1 from votes v
        join player_secrets ips on ips.room_id = v.room_id and ips.user_id = v.target_id
          and ips.round = v.round and ips.role = 'imposter'
        where v.room_id = p_room_id and v.voter_id = rp.user_id
      ) as voted_correctly
    from room_players rp
    join player_secrets ps on ps.room_id = rp.room_id and ps.user_id = rp.user_id
      and ps.round = v_room.round
    where rp.room_id = p_room_id
  loop
    v_won := (r.role = 'imposter' and v_room.winner = 'imposter')
          or (r.role = 'crew' and v_room.winner = 'crew');
    v_correct := r.voted_correctly and r.role = 'crew';
    v_xp := 25 + 20 + case when v_won then 150 else 0 end + case when v_correct then 50 else 0 end;
    v_coins := 10 + case when v_won then 60 else 0 end + case when v_correct then 15 else 0 end;

    insert into match_participants (match_id, user_id, role, won, voted_correctly, xp_earned, coins_earned)
    values (v_match, r.user_id, r.role, v_won, v_correct, v_xp, v_coins);

    update profiles set
      xp = xp + v_xp,
      coins = coins + v_coins,
      games_played = games_played + 1,
      wins = wins + case when v_won then 1 else 0 end,
      imposter_wins = imposter_wins + case when v_won and r.role = 'imposter' then 1 else 0 end,
      correct_votes = correct_votes + case when v_correct then 1 else 0 end,
      streak = case when v_won then streak + 1 else 0 end,
      best_streak = greatest(best_streak, case when v_won then streak + 1 else 0 end),
      updated_at = now()
    where id = r.user_id;

    insert into xp_ledger (user_id, amount, reason) values (r.user_id, v_xp, 'match:' || v_match);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Realtime (idempotent — safe to re-run this whole file)
-- ---------------------------------------------------------------------------
do $$
begin
  alter publication supabase_realtime add table public.rooms;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.room_players;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.votes;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.round_results;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.chat_messages;
exception when duplicate_object then null;
end $$;
