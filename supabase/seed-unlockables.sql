-- ============================================================================
-- Who's The Imposter? — India Edition
-- Seeds for the achievements + unlockables tables (admin dashboard / shop).
-- Run AFTER schema.sql. Idempotent (safe to re-run).
-- Values mirror src/lib/data/progression.ts.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- ACHIEVEMENTS
-- ---------------------------------------------------------------------------
insert into public.achievements (id, name, description, emoji, goal, stat, coins) values
  ('first-win',        'Pehli Jeet',                   'Win your first game',                '🥳', 1,   'wins',         50),
  ('ten-wins',         'Dus Ka Dum',                   'Win 10 games',                       '💪', 10,  'wins',         150),
  ('fifty-wins',       'Half Century',                 'Win 50 games',                       '🏏', 50,  'wins',         400),
  ('hundred-wins',     'Century Superstar',            'Win 100 games',                      '💯', 100, 'wins',         1000),
  ('detective',        'Perfect Detective',            'Vote correctly 25 times',            '🕵️', 25,  'correctVotes', 200),
  ('sherlock',         'Sherlock of Sadar Bazaar',     'Vote correctly 100 times',           '🧠', 100, 'correctVotes', 500),
  ('master-imposter',  'Master Imposter',              'Win 10 games as the Imposter',       '😈', 10,  'imposterWins', 300),
  ('regular',          'Adda Regular',                 'Play 25 games',                      '🎮', 25,  'games',        100),
  ('veteran',          'Mehfil Veteran',               'Play 100 games',                     '🎪', 100, 'games',        350),
  ('streak-3',         'Hat-trick Hero',               'Win 3 games in a row',               '🎩', 3,   'streak',       120),
  ('streak-5',         'On Fire',                      'Win 5 games in a row',               '🔥', 5,   'streak',       250),
  ('level-10',         'Rising Star',                  'Reach level 10',                     '⭐', 10,  'level',        100),
  ('level-25',         'Local Legend',                 'Reach level 25',                     '🌟', 25,  'level',        250),
  ('level-50',         'The Legend',                   'Reach level 50',                     '👑', 50,  'level',        600)
  on conflict (id) do update set
    name = excluded.name, description = excluded.description, emoji = excluded.emoji,
    goal = excluded.goal, stat = excluded.stat, coins = excluded.coins;

-- ---------------------------------------------------------------------------
-- UNLOCKABLES (avatars, themes, frames, emotes, badges, titles, room effects)
-- ---------------------------------------------------------------------------
insert into public.unlockables (id, kind, name, emoji, cost) values
  -- Avatars (free + coin-gated)
  ('av-tiger',    'avatar', 'Sher Khan',         '🐯', 0),
  ('av-peacock',  'avatar', 'Mor Raja',          '🦚', 0),
  ('av-elephant', 'avatar', 'Gaja',              '🐘', 0),
  ('av-cobra',    'avatar', 'Naagraj',           '🐍', 0),
  ('av-monkey',   'avatar', 'Bandar',            '🐵', 0),
  ('av-parrot',   'avatar', 'Mitthu',            '🦜', 0),
  ('av-cow',      'avatar', 'Gau Mata',          '🐄', 100),
  ('av-camel',    'avatar', 'Registan Rider',    '🐪', 100),
  ('av-lion',     'avatar', 'Gir Lion',          '🦁', 200),
  ('av-eagle',    'avatar', 'Garud',             '🦅', 200),
  ('av-fox',      'avatar', 'Chalak Lomdi',      '🦊', 300),
  ('av-panda',    'avatar', 'Chill Panda',       '🐼', 300),
  ('av-unicorn',  'avatar', 'Startup Unicorn',   '🦄', 500),
  ('av-dragon',   'avatar', 'Mysore Dragon',     '🐉', 800),
  ('av-alien',    'avatar', 'Jaadu',             '👽', 1000),
  ('av-robot',    'avatar', 'Chitti',            '🤖', 1000),
  -- Themes
  ('th-royal',    'theme',  'Royal Purple',      '🟣', 400),
  ('th-sunset',   'theme',  'Saffron Sunset',    '🌅', 400),
  ('th-ocean',    'theme',  'Peacock Ocean',     '🌊', 400),
  ('th-holi',     'theme',  'Holi Splash',       '🎨', 700),
  -- Frames
  ('fr-gold',     'frame',  'Gold Frame',        '🟨', 300),
  ('fr-fire',     'frame',  'Fire Frame',        '🔥', 500),
  ('fr-crown',    'frame',  'Crown Frame',       '👑', 900),
  -- Emotes
  ('em-namaste',  'emote',  'Namaste',           '🙏', 0),
  ('em-thumbsup', 'emote',  'Full Support',      '👍', 50),
  ('em-mindblown','emote',  'Mind Blown',        '🤯', 150),
  ('em-suspicious','emote', 'Suspicious',        '👀', 150),
  ('em-victory',  'emote',  'Victory',           '✌️', 250),
  -- Badges
  ('bd-rookie',   'badge',  'Rookie',            '🌱', 0),
  ('bd-pro',      'badge',  'Pro Bluffer',       '🎭', 500),
  ('bd-legend',   'badge',  'Legend',            '🏆', 1500),
  -- Titles
  ('ti-detective','title',  'Detective',         '🔍', 300),
  ('ti-imposter', 'title',  'The Imposter',      '😈', 600),
  ('ti-ustad',    'title',  'The Ustad',         '🧙', 1200),
  -- Room effects
  ('rf-confetti', 'room_effect', 'Confetti Burst', '🎉', 400),
  ('rf-fireworks','room_effect', 'Fireworks',      '🎆', 700),
  ('rf-diya',     'room_effect', 'Diya Lights',    '🪔', 500)
  on conflict (id) do update set
    kind = excluded.kind, name = excluded.name, emoji = excluded.emoji, cost = excluded.cost;

-- Give every new user the free starters (avatars, the rookie badge, namaste emote).
-- Triggered here as a one-off for existing profiles too.
insert into public.inventory (user_id, unlockable_id)
select p.id, u.id
from public.profiles p
cross join public.unlockables u
where u.cost = 0
on conflict do nothing;
