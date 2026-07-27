"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Coins, Gift, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, Badge, Progress, Skeleton } from "@/components/ui/card";
import { useProfile } from "@/hooks/use-profile";
import { DAILY_CHALLENGES } from "@/lib/data/progression";
import { claimChallenge, claimDailyLogin } from "@/lib/game/rewards";
import { cn } from "@/lib/utils";
import { playSfx } from "@/lib/sound";
import { fireConfetti } from "@/components/effects/confetti";

const today = () => new Date().toISOString().slice(0, 10);

export default function ChallengesPage() {
  const profile = useProfile();

  if (!profile) {
    return (
      <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pt-6 sm:max-w-2xl">
        <Skeleton className="mb-4 h-24 rounded-3xl" />
        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="mb-3 h-24 rounded-3xl" />)}
      </main>
    );
  }

  const loginClaimed = profile.lastLoginBonus === today();

  const onClaimLogin = () => {
    if (claimDailyLogin() > 0) {
      playSfx("victory");
      fireConfetti();
    }
  };

  const onClaimChallenge = (id: string) => {
    if (claimChallenge(id)) {
      playSfx("victory");
      fireConfetti();
    }
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-8 pt-6 sm:max-w-2xl">
      <header className="mb-6 flex items-center gap-3">
        <Link href="/" aria-label="Back to home" className="glass rounded-full p-2.5 text-white/70 hover:text-white focus-ring">
          <ArrowLeft size={17} />
        </Link>
        <h1 className="font-display text-2xl font-extrabold">
          Daily <span className="text-gradient">Challenges</span>
        </h1>
      </header>

      {/* Daily login bonus */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className={cn("flex items-center gap-4 border-gold/30", loginClaimed && "opacity-70")}>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-3xl" aria-hidden>
            🎁
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display font-bold">Daily Login Bonus</p>
            <p className="text-xs text-white/50">Come back every day for free rewards!</p>
            <div className="mt-1 flex gap-2 text-[11px] font-bold">
              <span className="text-gold">+25 coins</span>
              <span className="text-peacock">+40 XP</span>
            </div>
          </div>
          {loginClaimed ? (
            <Badge className="text-mint"><Check size={13} aria-hidden /> Claimed</Badge>
          ) : (
            <Button variant="gold" size="sm" onClick={onClaimLogin}>
              <Gift size={15} aria-hidden /> Claim
            </Button>
          )}
        </GlassCard>
      </motion.div>

      {/* Challenges */}
      <h2 className="mb-2 mt-6 font-display text-sm font-bold uppercase tracking-widest text-white/50">
        Today&apos;s Challenges
      </h2>
      <div className="space-y-3">
        {DAILY_CHALLENGES.map((c, i) => {
          const prog = profile.challengeProgress[c.id];
          const value = prog?.date === today() ? prog.value : 0;
          const done = value >= c.goal;
          const claimed = prog?.date === today() && prog.claimed;
          return (
            <motion.div key={c.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.07 }}>
              <GlassCard className={cn("space-y-2", claimed && "opacity-60")}>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-2xl" aria-hidden>
                    {c.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{c.name}</p>
                    <p className="text-xs text-white/50">{c.description}</p>
                  </div>
                  {claimed ? (
                    <Badge className="text-mint"><Check size={13} aria-hidden /> Done</Badge>
                  ) : done ? (
                    <Button variant="gold" size="sm" onClick={() => onClaimChallenge(c.id)}>
                      Claim
                    </Button>
                  ) : (
                    <div className="flex flex-col items-end gap-0.5 text-[11px] font-bold">
                      <span className="flex items-center gap-1 text-peacock"><Zap size={11} aria-hidden />{c.xp} XP</span>
                      <span className="flex items-center gap-1 text-gold"><Coins size={11} aria-hidden />{c.coins}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={Math.min(100, (value / c.goal) * 100)} className="flex-1" />
                  <span className="w-14 text-right text-[11px] font-bold text-white/50">
                    {Math.min(value, c.goal)}/{c.goal}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center text-xs text-white/35"
      >
        ⏰ Challenges reset at midnight. Naya din, naye challenges!
      </motion.p>

      <Button asChild variant="primary" size="xl" className="mt-4 w-full font-display">
        <Link href="/play">🎮 Play to Complete</Link>
      </Button>
    </main>
  );
}
