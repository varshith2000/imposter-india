"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, Share2, Home, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, Badge } from "@/components/ui/card";
import { PlayerAvatar } from "@/components/brand";
import { fireVictory, fireFireworks } from "@/components/effects/confetti";
import { playSfx } from "@/lib/sound";
import type { GamePlayer, Winner, XpBreakdown } from "@/lib/types";
import type { MatchRewardsResult } from "@/lib/game/rewards";

export function GameOverScreen({
  winner,
  iWon,
  players,
  imposterIds,
  word,
  categoryName,
  rewards,
  isHost,
  onPlayAgain,
  onExit,
}: {
  winner: Winner;
  iWon: boolean;
  players: GamePlayer[];
  imposterIds: string[];
  word: string;
  categoryName?: string;
  rewards: MatchRewardsResult | null;
  isHost: boolean;
  onPlayAgain: () => void;
  onExit: () => void;
}) {
  useEffect(() => {
    if (iWon) {
      playSfx("victory");
      fireVictory();
      setTimeout(fireFireworks, 900);
    } else {
      playSfx("defeat");
    }
  }, [iWon]);

  const imposters = players.filter((p) => imposterIds.includes(p.id));
  const breakdown: XpBreakdown | undefined = rewards?.breakdown;

  const share = async () => {
    const text = `🕵️ Who's The Imposter? — India Edition\n${
      iWon ? "I WON! 🏆" : "Close game! 😅"
    } The secret word was "${word}". Come play with me!`;
    try {
      if (navigator.share) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        alert("Result copied to clipboard! 📋");
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* Banner */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="text-center"
      >
        <p className="mb-2 text-6xl" aria-hidden>
          {iWon ? "🏆" : "😭"}
        </p>
        <h1 className="font-display text-4xl font-extrabold">
          {winner === "crew" ? (
            <span className="text-gradient">Crew Wins!</span>
          ) : (
            <span className="text-rose">Imposter Wins!</span>
          )}
        </h1>
        <p className="mt-2 text-white/60">
          {iWon ? "Shandaar performance! 🎉" : "Agli baar pakka jeetenge! 💪"}
        </p>
      </motion.div>

      {/* Reveal */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <GlassCard className="space-y-4 text-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">The secret word was</p>
            <p className="font-display text-3xl font-extrabold text-gradient-gold">{word}</p>
            {categoryName && <Badge className="mt-2">{categoryName}</Badge>}
          </div>
          <div className="border-t border-white/[0.08] pt-4">
            <p className="mb-2 text-xs uppercase tracking-widest text-white/40">
              The imposter{imposters.length > 1 ? "s were" : " was"}
            </p>
            <div className="flex items-center justify-center gap-4">
              {imposters.map((p) => (
                <div key={p.id} className="flex flex-col items-center gap-1">
                  <PlayerAvatar emoji={p.avatar} name={p.name} size="lg" ring="danger" />
                  <span className="text-sm font-semibold text-rose">{p.name} 😈</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* XP breakdown */}
      {breakdown && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <GlassCard>
            <p className="mb-3 font-display font-bold">⚡ Rewards Earned</p>
            <div className="space-y-1.5 text-sm">
              <Row label="Participation" value={breakdown.participation} />
              {breakdown.correctVote > 0 && <Row label="Correct vote 🎯" value={breakdown.correctVote} />}
              {breakdown.win > 0 && <Row label="Victory 🏆" value={breakdown.win} />}
              {breakdown.stayedTillEnd > 0 && <Row label="Stayed till end" value={breakdown.stayedTillEnd} />}
              {breakdown.streakBonus > 0 && <Row label="Streak bonus 🔥" value={breakdown.streakBonus} />}
              <div className="flex items-center justify-between border-t border-white/[0.08] pt-2 font-bold">
                <span>Total XP</span>
                <motion.span
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, type: "spring" }}
                  className="text-gradient-gold font-display text-lg"
                >
                  +{breakdown.total} XP
                </motion.span>
              </div>
              <div className="flex items-center justify-between text-gold">
                <span>Coins</span>
                <span className="font-bold">+{breakdown.coins} 🪙</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Level up / achievements */}
      {rewards?.leveledUpTo && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}>
          <GlassCard className="border-gold/40 bg-gold/10 py-3 text-center">
            <p className="font-display text-lg font-bold text-gold">
              ⬆️ LEVEL UP! You reached Level {rewards.leveledUpTo}
            </p>
          </GlassCard>
        </motion.div>
      )}
      {rewards?.newAchievements.map((a, i) => (
        <motion.div
          key={a.id}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.1 + i * 0.15 }}
        >
          <GlassCard className="flex items-center gap-3 border-primary/40 py-3">
            <span className="text-3xl" aria-hidden>{a.emoji}</span>
            <div className="flex-1">
              <p className="font-bold">Achievement Unlocked: {a.name}</p>
              <p className="text-xs text-gold">+{a.coins} coins</p>
            </div>
          </GlassCard>
        </motion.div>
      ))}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 gap-3"
      >
        <Button variant="primary" size="lg" className="col-span-2" onClick={onPlayAgain}>
          <RotateCcw size={18} aria-hidden />
          {isHost ? "Play Again — Same Room" : "Ready for Rematch"}
        </Button>
        <Button variant="glass" onClick={share}>
          <Share2 size={16} aria-hidden /> Share Result
        </Button>
        <Button asChild variant="glass">
          <Link href="/room/create">
            <Plus size={16} aria-hidden /> New Room
          </Link>
        </Button>
        <Button variant="ghost" className="col-span-2" onClick={onExit}>
          <Home size={16} aria-hidden /> Exit to Home
        </Button>
      </motion.div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-white/70">
      <span>{label}</span>
      <span className="font-semibold text-white">+{value}</span>
    </div>
  );
}
