# 🕵️ Who's The Imposter? — India Edition

**Bluff. Debate. Vote. Win.**

A premium, mobile-first, real-time multiplayer social deduction party game built for Indian audiences. Everyone gets a secret desi word — except the Imposter. Discuss, drop hints, sniff out the faker, and vote them out!

![Next.js 15](https://img.shields.io/badge/Next.js-15-black) ![React 19](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6) ![Supabase](https://img.shields.io/badge/Supabase-Realtime-3ecf8e)

---

## ✨ Features

- 🎴 **Secret word gameplay** — everyone gets the same Indian word, imposters get nothing
- 🗳️ **Host-controlled voting** — only the room host decides when discussion ends
- 🇮🇳 **26 Indian categories** — Bollywood, IPL, street food, festivals, mythology, ISRO & more
- 🤖 **Practice Mode** — fully offline vs AI bots (no setup needed!)
- 🌐 **Online rooms** — realtime multiplayer via Supabase (4–15 players, 1–3 imposters)
- ⚡ **Full progression** — XP, coins, 100+ levels, achievements, streaks, daily challenges
- 🏆 **Leaderboards, profiles, avatar shop, daily login bonuses**
- 🔊 **Synthesized Indian-inspired SFX** (Raga Bhupali scale, zero audio assets)
- 🎉 Confetti, 3D card flips, glassmorphism, Framer Motion everywhere
- ♿ Accessibility: large text & high contrast modes, reduced-motion support, ARIA labels
- 📱 PWA-ready, mobile-first, works portrait & landscape

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000 — **Practice Mode works instantly**, no configuration required.

## 🌐 Enable Online Multiplayer (Supabase)

1. Create a free project at [supabase.com](https://supabase.com)
2. In the SQL Editor, run **`supabase/schema.sql`** (tables, RLS, RPCs, realtime)
3. Enable **Anonymous sign-ins**: Authentication → Providers → Anonymous
4. (Optional) Enable Google OAuth: Authentication → Providers → Google
5. Copy `.env.local.example` → `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

6. Restart the dev server. Create Room / Join Room now work in realtime!

## 🏗️ Architecture

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home (play, winners, top players)
│   ├── play/             # Game mode selection
│   ├── practice/         # Offline mode vs AI bots
│   ├── room/create|join|[code]/   # Online multiplayer
│   ├── leaderboard/ profile/ challenges/ settings/ login/ how-to-play/
├── components/
│   ├── ui/               # Button (ripple), GlassCard, Modal, Switch, Slider…
│   ├── game/             # WordReveal, Discussion, Voting, GameOver
│   └── effects/          # Confetti (India colors)
├── lib/
│   ├── data/             # 26 categories + words, XP/levels/achievements
│   ├── game/             # Pure engine (roles, tally, winner, rewards)
│   ├── supabase/         # Browser client (graceful offline degradation)
│   ├── profile.ts        # Local-first player profile (localStorage)
│   └── sound.ts          # WebAudio synthesized SFX
└── supabase/schema.sql   # Full Postgres schema + RLS + RPCs
```

### Security & Anti-cheat
- Roles assigned **server-side** in a `SECURITY DEFINER` RPC — imposters never receive the word
- `player_secrets` RLS: each player can read **only their own** role/word
- Votes hidden by RLS until the reveal phase; PK prevents duplicate votes
- Host-only phase transitions enforced in SQL, reconnect support & host migration
- XP awards are idempotent (one grant per match per player)

## 🎮 Game Flow

Home → Create/Join Room → Lobby → Host starts → Secret words → Discussion →
**Host presses 🗳️ Start Voting** → Secret votes → Dramatic reveal → Elimination →
Next round or Game Over → XP/coins/achievements → **Play Again** (instant restart)

## 📦 Deploy to Vercel

```bash
npx vercel
```

Add the two `NEXT_PUBLIC_SUPABASE_*` env vars in the Vercel dashboard.

---

Made with ❤️, masala and jugaad. 🇮🇳
