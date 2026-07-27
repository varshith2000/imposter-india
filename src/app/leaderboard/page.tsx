"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import { GlassCard, Badge, Skeleton } from "@/components/ui/card";
import { PlayerAvatar } from "@/components/brand";
import { useProfile } from "@/hooks/use-profile";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { formatNumber, cn } from "@/lib/utils";
import { levelFromXp } from "@/lib/data/progression";

interface Row {
  id: string;
  username: string;
  avatar: string;
  xp: number;
  wins: number;
  games_played: number;
  win_pct: number;
  rank: number;
  isMe?: boolean;
}

const SAMPLE: Row[] = [
  { id: "s1", username: "DesiDetective", avatar: "🦁", xp: 48250, wins: 312, games_played: 420, win_pct: 74, rank: 1 },
  { id: "s2", username: "SamosaSleuth", avatar: "🐉", xp: 41100, wins: 275, games_played: 390, win_pct: 71, rank: 2 },
  { id: "s3", username: "DhamakaDon", avatar: "🦅", xp: 38900, wins: 244, games_played: 350, win_pct: 70, rank: 3 },
  { id: "s4", username: "FilmyFox88", avatar: "🦊", xp: 30500, wins: 198, games_played: 310, win_pct: 64, rank: 4 },
  { id: "s5", username: "ChaiChamp", avatar: "🐼", xp: 27800, wins: 176, games_played: 290, win_pct: 61, rank: 5 },
  { id: "s6", username: "GullyGuru", avatar: "🦜", xp: 24100, wins: 150, games_played: 265, win_pct: 57, rank: 6 },
  { id: "s7", username: "PakodaPro", avatar: "🐵", xp: 21000, wins: 132, games_played: 240, win_pct: 55, rank: 7 },
  { id: "s8", username: "BiryaniBoss", avatar: "🐘", xp: 18400, wins: 118, games_played: 225, win_pct: 52, rank: 8 },
];

const TABS = ["All Time", "Weekly", "Daily", "Friends"] as const;

export default function LeaderboardPage() {
  const profile = useProfile();
  const [tab, setTab] = useState<(typeof TABS)[number]>("All Time");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    (async () => {
      const sb = getSupabase();
      if (isSupabaseConfigured && sb) {
        const { data } = await sb.from("leaderboard").select("*").limit(50);
        if (data && data.length > 0) {
          setRows(data as Row[]);
          setLive(true);
          return;
        }
      }
      // demo board + local player merged in
      await new Promise((r) => setTimeout(r, 500)); // let skeletons breathe
      setRows(SAMPLE);
    })();
  }, []);

  const merged = (() => {
    if (!rows) return null;
    if (live || !profile || profile.gamesPlayed === 0) return rows;
    const mine: Row = {
      id: profile.id,
      username: profile.username,
      avatar: profile.avatar,
      xp: profile.xp,
      wins: profile.wins,
      games_played: profile.gamesPlayed,
      win_pct: profile.gamesPlayed ? Math.round((profile.wins / profile.gamesPlayed) * 100) : 0,
      rank: 0,
      isMe: true,
    };
    const all = [...rows, mine].sort((a, b) => b.xp - a.xp).map((r, i) => ({ ...r, rank: i + 1 }));
    return all;
  })();

  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-8 pt-6 sm:max-w-2xl">
      <header className="mb-6 flex items-center gap-3">
        <Link href="/" aria-label="Back to home" className="glass rounded-full p-2.5 text-white/70 hover:text-white focus-ring">
          <ArrowLeft size={17} />
        </Link>
        <h1 className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <Trophy className="text-gold" size={24} aria-hidden />
          Leader<span className="text-gradient">board</span>
        </h1>
        {!live && <Badge className="text-white/40">demo data</Badge>}
      </header>

      {/* Tabs */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Leaderboard period">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition focus-ring",
              tab === t ? "bg-rose text-white" : "glass text-white/60",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Podium */}
      {tab !== "All Time" ? (
        <GlassCard className="py-12 text-center">
          <p className="mb-2 text-4xl" aria-hidden>🚧</p>
          <p className="font-display text-lg font-bold">{tab} board coming soon!</p>
          <p className="mt-1 text-sm text-white/50">Seasonal ladders unlock in a future update. Check All Time meanwhile.</p>
        </GlassCard>
      ) : merged ? (
        <>
          <div className="mb-4 flex items-end justify-center gap-3">
            {[merged[1], merged[0], merged[2]].filter(Boolean).map((p, i) => {
              const isFirst = i === 1;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12, type: "spring" }}
                  className={cn("flex flex-col items-center gap-1", isFirst && "-translate-y-3")}
                >
                  <span className="text-2xl" aria-hidden>{isFirst ? "👑" : p.rank === 2 ? "🥈" : "🥉"}</span>
                  <PlayerAvatar emoji={p.avatar} name={p.username} size={isFirst ? "xl" : "lg"} ring={isFirst ? "host" : "none"} />
                  <span className="max-w-24 truncate text-xs font-bold">{p.username}</span>
                  <span className="text-[11px] text-gold">{formatNumber(p.xp)} XP</span>
                </motion.div>
              );
            })}
          </div>

          {/* List */}
          <GlassCard className="divide-y divide-white/[0.06] p-2">
            {merged.slice(3, 20).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
                className={cn("flex items-center gap-3 rounded-xl p-2.5", p.isMe && "bg-primary/15")}
              >
                <span className="w-7 text-center font-display font-bold text-white/40">#{p.rank}</span>
                <PlayerAvatar emoji={p.avatar} name={p.username} size="sm" ring={p.isMe ? "self" : "none"} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {p.username} {p.isMe && <span className="text-peacock">(You)</span>}
                  </p>
                  <p className="text-[11px] text-white/40">
                    Lv {levelFromXp(p.xp).level} · {p.wins} wins · {p.win_pct}% WR
                  </p>
                </div>
                <span className="text-sm font-bold text-gold">{formatNumber(p.xp)}</span>
              </motion.div>
            ))}
          </GlassCard>
        </>
      ) : (
        <div className="space-y-3">
          <div className="flex items-end justify-center gap-6 py-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-16 w-16 rounded-full" />
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-2xl" />
          ))}
        </div>
      )}
    </main>
  );
}
