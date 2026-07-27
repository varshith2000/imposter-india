"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { PlayerAvatar } from "@/components/brand";
import { Modal } from "@/components/ui/controls";
import { playSfx } from "@/lib/sound";
import { cn } from "@/lib/utils";
import type { GamePlayer } from "@/lib/types";

export function VotingPhase({
  players,
  myId,
  myVote,
  amAlive,
  votedIds,
  onVote,
}: {
  players: GamePlayer[];
  myId: string;
  myVote: string | null;
  amAlive: boolean;
  votedIds: string[]; // players who have already voted (shown as "locked in")
  onVote: (targetId: string) => void;
}) {
  const [pending, setPending] = useState<GamePlayer | null>(null);
  const alive = players.filter((p) => p.alive);

  const confirm = () => {
    if (!pending) return;
    playSfx("vote");
    onVote(pending.id);
    setPending(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="font-display text-2xl font-extrabold">
          🗳️ Who&apos;s the <span className="text-gradient">Imposter?</span>
        </p>
        <p className="mt-1 text-sm text-white/50">
          {amAlive
            ? myVote
              ? "Vote locked in! Waiting for others…"
              : "Tap a player to cast your secret vote"
            : "You were eliminated — watch the drama unfold 👻"}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" role="list" aria-label="Vote for a player">
        {alive.map((p, i) => {
          const isMe = p.id === myId;
          const selected = myVote === p.id;
          const hasVoted = votedIds.includes(p.id);
          return (
            <motion.button
              key={p.id}
              role="listitem"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isMe || !amAlive || !!myVote}
              onClick={() => setPending(p)}
              aria-label={isMe ? "You (cannot vote for yourself)" : `Vote for ${p.name}`}
              className={cn(
                "glass-card relative flex flex-col items-center gap-2 p-4 transition focus-ring tap-highlight-none",
                selected && "border-rose/60 bg-rose/10 shadow-glow-pink",
                !isMe && amAlive && !myVote && "hover:border-white/25 hover:bg-white/[0.09] cursor-pointer",
                (isMe || (!!myVote && !selected)) && "opacity-60",
              )}
            >
              <PlayerAvatar emoji={p.avatar} name={p.name} size="lg" ring={isMe ? "self" : "none"} />
              <span className="max-w-full truncate text-sm font-semibold">{isMe ? "You" : p.name}</span>
              {hasVoted && (
                <span className="absolute right-2 top-2 rounded-full bg-mint/20 p-1 text-mint" aria-label="Has voted">
                  <Check size={12} />
                </span>
              )}
              {selected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-rose px-3 py-0.5 text-xs font-bold"
                >
                  Your vote
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      <GlassCard className="flex items-center gap-3 py-3 text-sm text-white/50">
        <ShieldQuestion size={18} className="shrink-0 text-peacock" aria-hidden />
        Votes stay hidden until everyone has voted. Choose wisely — a wrong vote helps the imposter!
      </GlassCard>

      <Modal open={!!pending} onClose={() => setPending(null)} title="Confirm your vote">
        {pending && (
          <div className="flex flex-col items-center gap-4">
            <PlayerAvatar emoji={pending.avatar} name={pending.name} size="xl" ring="danger" />
            <p className="text-center">
              Vote out <b className="text-rose">{pending.name}</b>?
              <br />
              <span className="text-sm text-white/50">You can&apos;t change this later.</span>
            </p>
            <div className="flex w-full gap-3">
              <Button variant="glass" className="flex-1" onClick={() => setPending(null)}>
                Cancel
              </Button>
              <Button variant="danger" className="flex-1" onClick={confirm}>
                🗳️ Vote Out
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ---------------- Vote reveal ---------------- */

export function VoteRevealPhase({
  players,
  votes,
  eliminatedId,
  wasImposter,
  tie,
  isHost,
  onContinue,
}: {
  players: GamePlayer[];
  votes: { voterId: string; targetId: string }[];
  eliminatedId: string | null;
  wasImposter: boolean;
  tie: boolean;
  isHost: boolean;
  onContinue: () => void;
}) {
  const byId = (id: string) => players.find((p) => p.id === id);
  const eliminated = eliminatedId ? byId(eliminatedId) : null;

  // group votes per target
  const grouped = new Map<string, string[]>();
  for (const v of votes) {
    grouped.set(v.targetId, [...(grouped.get(v.targetId) ?? []), v.voterId]);
  }
  const sorted = [...grouped.entries()].sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="flex flex-col gap-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <p className="font-display text-2xl font-extrabold">📢 Votes Revealed!</p>
      </motion.div>

      <div className="space-y-2">
        <AnimatePresence>
          {sorted.map(([targetId, voters], i) => {
            const target = byId(targetId);
            if (!target) return null;
            return (
              <motion.div
                key={targetId}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.35 }}
              >
                <GlassCard
                  className={cn(
                    "flex items-center gap-3 py-3",
                    targetId === eliminatedId && "border-danger/50 bg-danger/10",
                  )}
                >
                  <PlayerAvatar emoji={target.avatar} name={target.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{target.name}</p>
                    <p className="truncate text-xs text-white/40">
                      voted by {voters.map((v) => byId(v)?.name ?? "?").join(", ")}
                    </p>
                  </div>
                  <span className="font-display text-xl font-bold text-rose">{voters.length}</span>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 + sorted.length * 0.35, type: "spring" }}
      >
        <GlassCard className="py-6 text-center">
          {tie ? (
            <>
              <p className="mb-1 text-4xl" aria-hidden>🤝</p>
              <p className="font-display text-xl font-bold">It&apos;s a tie!</p>
              <p className="text-sm text-white/50">Nobody was eliminated. The imposter survives…</p>
            </>
          ) : eliminated ? (
            <>
              <p className="mb-1 text-4xl" aria-hidden>{wasImposter ? "🎯" : "💔"}</p>
              <p className="font-display text-xl font-bold">
                <span className="text-rose">{eliminated.name}</span> was eliminated!
              </p>
              <p className="mt-1 text-sm text-white/60">
                They were {wasImposter ? (
                  <b className="text-danger">the IMPOSTER! 😈</b>
                ) : (
                  <b className="text-mint">innocent crew 😇</b>
                )}
              </p>
            </>
          ) : null}
        </GlassCard>
      </motion.div>

      {isHost ? (
        <Button variant="primary" size="lg" className="w-full" onClick={onContinue}>
          Continue → Next Discussion
        </Button>
      ) : (
        <p className="text-center text-sm text-white/40">⏳ Waiting for host to continue…</p>
      )}
    </div>
  );
}
