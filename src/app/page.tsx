"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Play, Plus, LogIn, HelpCircle, Trophy, Target, User, Settings,
  Volume2, VolumeX, Flame, Coins, Zap, Users, Crown, Bot,
} from "lucide-react";
import { Logo, PlayerAvatar } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { GlassCard, Badge, Progress, Skeleton } from "@/components/ui/card";
import { useProfile, useMute } from "@/hooks/use-profile";
import { getLevelInfo } from "@/lib/profile";
import { titleForLevel } from "@/lib/data/progression";
import { claimDailyLogin } from "@/lib/game/rewards";
import { formatNumber } from "@/lib/utils";
import { fireConfetti } from "@/components/effects/confetti";
import { playSfx } from "@/lib/sound";

const RECENT_WINNERS = [
  { name: "MasalaMaverick", avatar: "🐯", word: "Sholay" },
  { name: "ChaiChamp42", avatar: "🦚", word: "Vada Pav" },
  { name: "BiryaniBoss", avatar: "🐘", word: "MS Dhoni" },
  { name: "GullyGuru", avatar: "🦜", word: "Taj Mahal" },
  { name: "FilmyFox", avatar: "🦊", word: "Naatu Naatu" },
];

const TOP_PLAYERS = [
  { name: "DesiDetective", avatar: "🦁", xp: 48250, rank: 1 },
  { name: "SamosaSleuth", avatar: "🐉", xp: 41100, rank: 2 },
  { name: "DhamakaDon", avatar: "🦅", xp: 38900, rank: 3 },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 22 } },
};

export default function HomePage() {
  const profile = useProfile();
  const [muted, setMuted] = useMute();
  const [online, setOnline] = useState(0);
  const [bonusShown, setBonusShown] = useState(false);

  useEffect(() => {
    // playful simulated "online now" counter until backend is connected
    setOnline(1800 + Math.floor(Math.random() * 900));
    const iv = setInterval(
      () => setOnline((o) => Math.max(1200, o + Math.floor(Math.random() * 21) - 10)),
      4000,
    );
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!profile || bonusShown) return;
    const granted = claimDailyLogin();
    if (granted > 0) {
      setBonusShown(true);
      setTimeout(() => {
        fireConfetti();
        playSfx("confetti");
      }, 700);
    }
  }, [profile, bonusShown]);

  const level = profile ? getLevelInfo(profile) : null;
  const title = level ? titleForLevel(level.level) : null;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col gap-5 px-4 pb-8 pt-6 sm:max-w-2xl lg:max-w-4xl">
      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <Badge className="text-gold" aria-label={`${profile?.coins ?? 0} coins`}>
            <Coins size={13} aria-hidden /> {formatNumber(profile?.coins ?? 0)}
          </Badge>
          <button
            onClick={() => setMuted(!muted)}
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
            className="glass rounded-full p-2.5 text-white/70 hover:text-white focus-ring"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <Link href="/settings" aria-label="Settings" className="glass rounded-full p-2.5 text-white/70 hover:text-white focus-ring">
            <Settings size={16} />
          </Link>
        </div>
      </motion.header>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-4xl glass-strong p-6 sm:p-8"
      >
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl" aria-hidden />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-saffron/25 blur-3xl" aria-hidden />
        <div className="relative">
          <Logo size="lg" className="mb-3" />
          <p className="mb-6 font-display text-lg text-white/70">
            Bluff. Debate. Vote. <span className="text-gradient-gold font-bold">Win.</span>
          </p>

          {/* Player chip */}
          {profile && level && title ? (
            <Link
              href="/profile"
              className="mb-6 flex items-center gap-3 rounded-2xl glass p-3 transition hover:bg-white/[0.09] focus-ring"
            >
              <PlayerAvatar emoji={profile.avatar} name={profile.username} ring="self" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{profile.username}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50">
                    Lv {level.level} · {title.emoji} {title.title}
                  </span>
                </div>
                <Progress value={level.progress * 100} className="mt-1.5 h-1.5" />
              </div>
              <div className="text-right text-xs text-white/50">
                <p className="flex items-center gap-1 text-saffron">
                  <Flame size={12} aria-hidden /> {profile.streak} streak
                </p>
                <p className="mt-1 flex items-center gap-1">
                  <Zap size={12} aria-hidden /> {formatNumber(profile.xp)} XP
                </p>
              </div>
            </Link>
          ) : (
            <div className="mb-6 flex items-center gap-3 rounded-2xl glass p-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-32" />
                <Skeleton className="w-24" />
              </div>
            </div>
          )}

          {/* Big Play */}
          <Link href="/play" className="block">
            <Button variant="primary" size="xl" className="w-full animate-pulse-glow font-display text-xl">
              <Play className="fill-current" aria-hidden /> PLAY NOW
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Action grid */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        aria-label="Game menu"
      >
        {[
          { href: "/room/create", icon: Plus, label: "Create Room", desc: "Host a party", accent: "text-saffron" },
          { href: "/room/join", icon: LogIn, label: "Join Room", desc: "Enter a code", accent: "text-peacock" },
          { href: "/practice", icon: Bot, label: "Practice", desc: "Play vs bots", accent: "text-mint" },
          { href: "/how-to-play", icon: HelpCircle, label: "How To Play", desc: "60-sec guide", accent: "text-rose" },
          { href: "/leaderboard", icon: Trophy, label: "Leaderboard", desc: "Top ustads", accent: "text-gold" },
          { href: "/challenges", icon: Target, label: "Challenges", desc: "Daily rewards", accent: "text-primary" },
        ].map(({ href, icon: Icon, label, desc, accent }) => (
          <motion.div key={href} variants={item}>
            <Link href={href} className="block focus-ring rounded-3xl">
              <GlassCard hover className="flex flex-col gap-2">
                <Icon className={accent} size={22} aria-hidden />
                <div>
                  <p className="font-display font-bold leading-tight">{label}</p>
                  <p className="text-xs text-white/45">{desc}</p>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      {/* Profile shortcut */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-3">
        <motion.div variants={item}>
          <Link href="/profile" className="block focus-ring rounded-3xl">
            <GlassCard hover className="flex items-center gap-3">
              <User className="text-peacock" size={20} aria-hidden />
              <span className="font-display font-bold">Profile</span>
            </GlassCard>
          </Link>
        </motion.div>
        <motion.div variants={item}>
          <GlassCard className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
            </span>
            <div>
              <p className="font-display font-bold leading-tight">{formatNumber(online)}</p>
              <p className="text-xs text-white/45">players online</p>
            </div>
            <Users size={18} className="ml-auto text-white/30" aria-hidden />
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Recent winners ticker */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        aria-label="Recent winners"
      >
        <h2 className="mb-2 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-white/50">
          <Crown size={14} className="text-gold" aria-hidden /> Recent Winners
        </h2>
        <div className="overflow-hidden rounded-2xl glass p-1.5">
          <motion.div
            className="flex gap-2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {[...RECENT_WINNERS, ...RECENT_WINNERS].map((w, i) => (
              <div key={i} className="flex shrink-0 items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2">
                <span aria-hidden>{w.avatar}</span>
                <span className="text-sm font-semibold">{w.name}</span>
                <span className="text-xs text-white/40">cracked “{w.word}”</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Top players */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        aria-label="Top players"
      >
        <h2 className="mb-2 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-white/50">
          <Trophy size={14} className="text-gold" aria-hidden /> Top Players
        </h2>
        <GlassCard className="divide-y divide-white/[0.06] p-2">
          {TOP_PLAYERS.map((p) => (
            <div key={p.rank} className="flex items-center gap-3 p-2.5">
              <span className="w-6 text-center font-display text-lg font-bold text-gold" aria-label={`Rank ${p.rank}`}>
                {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : "🥉"}
              </span>
              <PlayerAvatar emoji={p.avatar} name={p.name} size="sm" />
              <span className="flex-1 truncate font-semibold">{p.name}</span>
              <span className="text-sm text-white/50">{formatNumber(p.xp)} XP</span>
            </div>
          ))}
        </GlassCard>
      </motion.section>

      <footer className="safe-bottom mt-2 text-center text-xs text-white/30">
        Made with ❤️ for India · Bluff responsibly!
      </footer>
    </main>
  );
}
