"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Coins, Lock, Pencil, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, Badge, Progress, Skeleton } from "@/components/ui/card";
import { Input, Modal } from "@/components/ui/controls";
import { PlayerAvatar } from "@/components/brand";
import { useProfile } from "@/hooks/use-profile";
import { updateProfile, winRate } from "@/lib/profile";
import { ACHIEVEMENTS, AVATARS, levelFromXp, titleForLevel } from "@/lib/data/progression";
import { getCategoryById } from "@/lib/data/categories";
import { formatNumber, timeAgo, cn } from "@/lib/utils";
import { playSfx } from "@/lib/sound";
import { fireConfetti } from "@/components/effects/confetti";

export default function ProfilePage() {
  const profile = useProfile();
  const [editOpen, setEditOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState("");

  if (!profile) {
    return (
      <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pt-6 sm:max-w-2xl">
        <Skeleton className="mb-4 h-44 rounded-3xl" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
        </div>
      </main>
    );
  }

  const lvl = levelFromXp(profile.xp);
  const title = titleForLevel(lvl.level);
  const favCat = profile.favoriteCategory ? getCategoryById(profile.favoriteCategory) : undefined;

  const saveName = () => {
    const clean = nameDraft.trim().slice(0, 20);
    if (clean.length >= 2) {
      updateProfile((p) => ({ ...p, username: clean }));
      playSfx("click");
    }
    setEditOpen(false);
  };

  const pickAvatar = (emoji: string, cost: number) => {
    const owned = profile.unlockedAvatars.includes(emoji);
    if (owned) {
      updateProfile((p) => ({ ...p, avatar: emoji }));
      playSfx("click");
      return;
    }
    if (profile.coins < cost) {
      playSfx("tick");
      return;
    }
    updateProfile((p) => ({
      ...p,
      coins: p.coins - cost,
      unlockedAvatars: [...p.unlockedAvatars, emoji],
      avatar: emoji,
    }));
    playSfx("reveal");
    fireConfetti();
  };

  const stats: { label: string; value: string | number }[] = [
    { label: "Games", value: profile.gamesPlayed },
    { label: "Wins", value: profile.wins },
    { label: "Win Rate", value: `${winRate(profile)}%` },
    { label: "Correct Votes", value: profile.correctVotes },
    { label: "Imposter Wins", value: profile.imposterWins },
    { label: "Best Streak", value: `${profile.bestStreak} 🔥` },
  ];

  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-8 pt-6 sm:max-w-2xl">
      <header className="mb-6 flex items-center gap-3">
        <Link href="/" aria-label="Back to home" className="glass rounded-full p-2.5 text-white/70 hover:text-white focus-ring">
          <ArrowLeft size={17} />
        </Link>
        <h1 className="font-display text-2xl font-extrabold">
          My <span className="text-gradient">Profile</span>
        </h1>
      </header>

      {/* Identity card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="relative overflow-hidden text-center">
          <div className="absolute inset-x-0 top-0 h-24 bg-india-gradient opacity-20" aria-hidden />
          <button
            onClick={() => setAvatarOpen(true)}
            className="group relative mx-auto block focus-ring rounded-full"
            aria-label="Change avatar"
          >
            <PlayerAvatar emoji={profile.avatar} name={profile.username} size="xl" ring="self" />
            <span className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 text-white shadow-glow transition group-hover:scale-110">
              <Pencil size={12} aria-hidden />
            </span>
          </button>

          <button
            onClick={() => { setNameDraft(profile.username); setEditOpen(true); }}
            className="mx-auto mt-3 flex items-center gap-1.5 rounded-xl px-2 py-1 font-display text-xl font-extrabold hover:bg-white/[0.06] focus-ring"
          >
            {profile.username}
            <Pencil size={13} className="text-white/40" aria-hidden />
          </button>
          <p className="text-sm text-white/50">
            {title.emoji} {title.title} · Level {lvl.level}
          </p>

          <div className="mx-auto mt-4 max-w-xs">
            <div className="mb-1 flex justify-between text-[11px] text-white/45">
              <span>Level {lvl.level}</span>
              <span>{formatNumber(lvl.current)} / {formatNumber(lvl.needed)} XP</span>
            </div>
            <Progress value={lvl.progress * 100} />
          </div>

          <div className="mt-4 flex justify-center gap-3">
            <Badge className="text-gold"><Coins size={13} aria-hidden /> {formatNumber(profile.coins)}</Badge>
            <Badge className="text-peacock">⚡ {formatNumber(profile.xp)} XP</Badge>
            {favCat && <Badge>{favCat.emoji} {favCat.name}</Badge>}
          </div>
        </GlassCard>
      </motion.div>

      {/* Stats grid */}
      <h2 className="mb-2 mt-6 font-display text-sm font-bold uppercase tracking-widest text-white/50">Statistics</h2>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="p-3 text-center">
              <p className="font-display text-lg font-extrabold">{s.value}</p>
              <p className="text-[11px] text-white/45">{s.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <h2 className="mb-2 mt-6 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-white/50">
        <Trophy size={14} className="text-gold" aria-hidden />
        Achievements ({profile.unlockedAchievements.length}/{ACHIEVEMENTS.length})
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => {
          const unlocked = profile.unlockedAchievements.includes(a.id);
          return (
            <motion.div key={a.id} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.03 }}>
              <GlassCard className={cn("flex items-center gap-2.5 p-3", !unlocked && "opacity-45")}>
                <span className="text-2xl" aria-hidden>{unlocked ? a.emoji : "🔒"}</span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold">{a.name}</p>
                  <p className="truncate text-[10px] text-white/45">{a.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Recent matches */}
      <h2 className="mb-2 mt-6 font-display text-sm font-bold uppercase tracking-widest text-white/50">Recent Matches</h2>
      {profile.recentMatches.length === 0 ? (
        <GlassCard className="py-8 text-center">
          <p className="mb-2 text-4xl" aria-hidden>🎮</p>
          <p className="text-sm text-white/50">No matches yet. Play your first game!</p>
          <Link href="/play" className="mt-4 inline-block">
            <Button variant="primary">Play Now</Button>
          </Link>
        </GlassCard>
      ) : (
        <GlassCard className="divide-y divide-white/[0.06] p-2">
          {profile.recentMatches.slice(0, 10).map((m) => (
            <div key={m.id} className="flex items-center gap-3 p-2.5">
              <span className={cn("text-xl", m.won ? "" : "grayscale opacity-70")} aria-hidden>
                {m.won ? "🏆" : "💔"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {m.won ? "Won" : "Lost"} as {m.role === "imposter" ? "😈 Imposter" : "🕵️ Crew"}
                </p>
                <p className="truncate text-[11px] text-white/40">
                  {m.word} · {m.category} · {timeAgo(m.playedAt)}
                </p>
              </div>
              <span className="text-xs font-bold text-gold">+{m.xpEarned} XP</span>
            </div>
          ))}
        </GlassCard>
      )}

      {/* Edit name modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Change Username">
        <Input
          value={nameDraft}
          onChange={(e) => setNameDraft(e.target.value)}
          maxLength={20}
          placeholder="Your desi name…"
          aria-label="Username"
          onKeyDown={(e) => e.key === "Enter" && saveName()}
        />
        <Button variant="primary" size="lg" className="mt-4 w-full" onClick={saveName} disabled={nameDraft.trim().length < 2}>
          Save
        </Button>
      </Modal>

      {/* Avatar shop modal */}
      <Modal open={avatarOpen} onClose={() => setAvatarOpen(false)} title="Choose Avatar">
        <p className="mb-3 flex items-center gap-1.5 text-sm text-white/50">
          <Coins size={14} className="text-gold" aria-hidden /> You have <span className="font-bold text-gold">{formatNumber(profile.coins)}</span> coins
        </p>
        <div className="grid grid-cols-4 gap-2">
          {AVATARS.map((a) => {
            const owned = profile.unlockedAvatars.includes(a.emoji);
            const selected = profile.avatar === a.emoji;
            const affordable = profile.coins >= a.cost;
            return (
              <button
                key={a.id}
                onClick={() => pickAvatar(a.emoji, a.cost)}
                disabled={!owned && !affordable}
                aria-label={`${a.name}${owned ? "" : `, costs ${a.cost} coins`}`}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl p-2.5 transition focus-ring",
                  selected ? "bg-primary/25 ring-2 ring-primary" : "glass hover:bg-white/[0.08]",
                  !owned && !affordable && "opacity-40",
                )}
              >
                <span className="text-3xl" aria-hidden>{a.emoji}</span>
                <span className="w-full truncate text-center text-[9px] text-white/50">{a.name}</span>
                {!owned && (
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-gold">
                    {affordable ? <Coins size={9} aria-hidden /> : <Lock size={9} aria-hidden />} {a.cost}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Modal>
    </main>
  );
}
