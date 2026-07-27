-- ============================================================================
-- RPC FUNCTIONS — Who's The Imposter? India Edition
-- ----------------------------------------------------------------------------
-- Your database already has the TABLES (rooms, room_players, profiles, …) but
-- is MISSING the RPC functions, which is why create_room / join_room / etc.
-- return 404. Paste this whole file into the Supabase SQL Editor and Run.
-- It is idempotent — safe to run more than once.
-- ============================================================================

create extension if not exists pgcrypto;

-- RPC: create_room
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

-- RPC: join_room
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

-- RPC: start_game (host only)
create or replace function public.start_game(p_room_id uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare
  v_room rooms%rowtype;
  v_players uuid[];
  v_imposters uuid[];
  v_imposter_count int;
  v_word text;
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

  select array(select jsonb_array_elements_text(coalesce(v_room.settings->'categoryIds', '[]'::jsonb))) into v_cat_ids;
  v_difficulty := coalesce(v_room.settings->>'difficulty', 'mixed');
  select w.word, c.id, c.name into v_word, v_cat_id, v_cat_name
  from words w join categories c on c.id = w.category_id
  where w.is_active and c.is_active
    and (cardinality(v_cat_ids) = 0 or c.id = any(v_cat_ids))
    and (v_difficulty = 'mixed' or c.difficulty = v_difficulty)
  order by random() limit 1;
  if v_word is null then
    select w.word, c.id, c.name into v_word, v_cat_id, v_cat_name
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
    insert into player_secrets (room_id, user_id, round, role, secret_word)
    values (
      p_room_id, v_uid, v_room.round + 1,
      case when v_uid = any(v_imposters) then 'imposter' else 'crew' end,
      case when v_uid = any(v_imposters) then null else v_word end
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

-- RPC: set_phase (host only)
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

-- RPC: cast_vote
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

  select count(*) into v_total from room_players where room_id = p_room_id and alive;
  select count(*) into v_voted from votes where room_id = p_room_id and round = v_room.round;
  if v_voted >= v_total then
    perform public.tally_votes(p_room_id);
  end if;
end $$;

-- RPC: tally_votes
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

-- RPC: continue_round (host)
create or replace function public.continue_round(p_room_id uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare v_room rooms%rowtype;
begin
  select * into v_room from rooms where id = p_room_id for update;
  if v_room.host_id <> auth.uid() then raise exception 'ONLY_HOST'; end if;
  if v_room.phase <> 'vote-reveal' then raise exception 'BAD_PHASE'; end if;
  insert into player_secrets (room_id, user_id, round, role, secret_word)
  select room_id, user_id, v_room.round + 1, role, secret_word
  from player_secrets where room_id = p_room_id and round = v_room.round
  on conflict do nothing;
  update rooms set phase = 'discussion', round = round + 1, updated_at = now()
  where id = p_room_id;
end $$;

-- RPC: restart_room (host)
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

-- RPC: leave_room (host migration + cleanup)
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

-- RPC: award_results
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
    return;
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
