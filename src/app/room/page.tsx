"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Crown, Loader2, Share2, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, Badge, Skeleton } from "@/components/ui/card";
import { PlayerAvatar } from "@/components/brand";
import { WordRevealCard } from "@/components/game/word-reveal";
import { DiscussionPhase } from "@/components/game/discussion";
import { VotingPhase, VoteRevealPhase } from "@/components/game/voting";
import { GameOverScreen } from "@/components/game/game-over";
import { useOnlineRoom } from "@/hooks/use-online-room";
import { useProfile } from "@/hooks/use-profile";
import { applyMatchResult, type MatchRewardsResult } from "@/lib/game/rewards";
import { playSfx } from "@/lib/sound";

// Base path is inlined at build time ("" locally / on Vercel, "/<repo>" on GitHub Pages)
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function RoomInner() {
  const code = (useSearchParams().get("code") ?? "").toUpperCase();
  const router = useRouter();
  const profile = useProfile();
  const { state, actions } = useOnlineRoom(code);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false); // I've seen my word this round
  const [rewards, setRewards] = useState<MatchRewardsResult | null>(null);

  // reset word-seen state each round
  useEffect(() => setReady(false), [state.round]);

  // instant replay: a fresh word-reveal means a brand-new game — clear stale state
  useEffect(() => {
    if (state.phase === "word-reveal" || state.phase === "lobby") {
      setReady(false);
      setRewards(null);
    }
  }, [state.phase]);

  // notify sound only when someone actually joins (not on load / leave)
  const playerCount = state.players.length;
  const prevCount = useRef(0);
  useEffect(() => {
    if (prevCount.current > 0 && playerCount > prevCount.current) playSfx("join");
    prevCount.current = playerCount;
  }, [playerCount]);

  // Game over: host triggers server-side rewards; everyone applies local rewards once
  useEffect(() => {
    if (state.phase !== "game-over" || rewards || !state.myId) return;
    if (state.isHost) void actions.awardResults();
    const amImposter = state.myRole === "imposter";
    const iWon = (state.winner === "imposter") === amImposter;
    // imposterIds arrives async after game over — also check the final round result
    const votedCorrectly =
      !amImposter &&
      state.votes.some(
        (v) =>
          v.voterId === state.myId &&
          (state.imposterIds.includes(v.targetId) ||
            (state.lastResult?.wasImposter && state.lastResult.eliminatedId === v.targetId)),
      );
    const res = applyMatchResult({
      won: iWon,
      wasImposter: amImposter,
      votedCorrectly,
      stayedTillEnd: true,
      streak: profile?.streak ?? 0,
      word: state.secretWord ?? "???",
      categoryId: state.categoryName ?? "unknown",
      categoryName: state.categoryName ?? "Mystery",
    });
    setRewards(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.myId]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(state.code || code);
    setCopied(true);
    playSfx("click");
    setTimeout(() => setCopied(false), 1500);
  };

  const shareInvite = async () => {
    const url = `${window.location.origin}${BASE_PATH}/room?code=${state.code || code}`;
    const text = `🕵️ Join my "Who's The Imposter?" room! Code: ${state.code || code}\n${url}`;
    try {
      if (navigator.share) await navigator.share({ text, url });
      else {
        await navigator.clipboard.writeText(text);
        alert("Invite copied! 📋");
      }
    } catch { /* cancelled */ }
  };

  const me = useMemo(() => state.players.find((p) => p.id === state.myId), [state.players, state.myId]);
  const amAlive = me?.alive ?? false;
  const votedIds = state.votes.map((v) => v.voterId);
  const myVote = state.votes.find((v) => v.voterId === state.myId)?.targetId ?? null;

  /* ---------------- error / loading states ---------------- */
  if (!code) {
    return (
      <CenterShell>
        <p className="mb-3 text-5xl" aria-hidden>🔑</p>
        <h1 className="font-display text-2xl font-bold">No room code</h1>
        <p className="mt-2 text-white/50">Enter a code to join a room, or create your own!</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/room/join"><Button variant="primary">Join Room</Button></Link>
          <Link href="/room/create"><Button variant="glass">Create Room</Button></Link>
        </div>
      </CenterShell>
    );
  }

  if (state.error === "OFFLINE") {
    return (
      <CenterShell>
        <WifiOff size={40} className="mx-auto mb-4 text-white/30" aria-hidden />
        <h1 className="font-display text-2xl font-bold">Online play not configured</h1>
        <p className="mt-2 text-white/50">
          Add your Supabase keys to <code className="text-gold">.env.local</code> (see README), or try Practice Mode!
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/practice"><Button variant="primary">🤖 Practice vs Bots</Button></Link>
          <Link href="/"><Button variant="glass">Home</Button></Link>
        </div>
      </CenterShell>
    );
  }

  if (state.error) {
    const friendly =
      state.error.includes("ROOM_NOT_FOUND") ? "Room not found — check the code!" :
      state.error.includes("ROOM_FULL") ? "This room is full 😢" :
      state.error.includes("GAME_IN_PROGRESS") ? "Game already started in this room." :
      state.error;
    return (
      <CenterShell>
        <p className="mb-3 text-5xl" aria-hidden>😵</p>
        <h1 className="font-display text-2xl font-bold">Oops!</h1>
        <p className="mt-2 text-white/50">{friendly}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/room/join"><Button variant="primary">Try Again</Button></Link>
          <Link href="/"><Button variant="glass">Home</Button></Link>
        </div>
      </CenterShell>
    );
  }

  if (state.loading) {
    return <RoomSkeleton />;
  }

  /* ---------------- main render ---------------- */
  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-8 pt-6 sm:max-w-2xl">
      <header className="mb-4 flex items-center justify-between">
        <button
          onClick={async () => { await actions.leave(); router.push("/"); }}
          aria-label="Leave room"
          className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/70 hover:text-white focus-ring"
        >
          <ArrowLeft size={15} aria-hidden /> Leave
        </button>
        <button
          onClick={copyCode}
          className="glass flex items-center gap-2 rounded-full px-4 py-2 font-display font-bold tracking-[0.25em] focus-ring"
          aria-label={`Room code ${state.code}. Click to copy`}
        >
          {state.code}
          {copied ? <Check size={14} className="text-mint" aria-hidden /> : <Copy size={14} className="text-white/40" aria-hidden />}
        </button>
      </header>

      {/* LOBBY */}
      {state.phase === "lobby" && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="text-center">
            <h1 className="font-display text-3xl font-extrabold">
              Lobby <span className="text-gradient">{state.players.length}/{state.settings.maxPlayers}</span>
            </h1>
            <p className="mt-1 text-sm text-white/50">
              {state.players.length < 3
                ? `Need ${3 - state.players.length} more to start`
                : "Ready when the host is!"}
            </p>
          </div>

          <GlassCard className="grid grid-cols-3 gap-4 sm:grid-cols-4">
            {state.players.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05, type: "spring" }}
                className="flex flex-col items-center gap-1.5"
              >
                <PlayerAvatar emoji={p.avatar} name={p.name} size="lg"
                  ring={p.isHost ? "host" : p.id === state.myId ? "self" : "none"} />
                <span className="flex max-w-full items-center gap-1 truncate text-xs font-semibold">
                  {p.isHost && <Crown size={11} className="shrink-0 text-gold" aria-label="Host" />}
                  {p.id === state.myId ? "You" : p.name}
                </span>
              </motion.div>
            ))}
            {Array.from({ length: Math.max(0, Math.min(state.settings.maxPlayers, 8) - state.players.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="flex flex-col items-center gap-1.5 opacity-25">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-white/30 text-2xl">?</div>
                <span className="text-xs">Waiting…</span>
              </div>
            ))}
          </GlassCard>

          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <Badge>😈 {state.settings.imposters} imposter{state.settings.imposters > 1 ? "s" : ""}</Badge>
            <Badge>👥 up to {state.settings.maxPlayers}</Badge>
            <Badge>{state.settings.categoryIds.length === 0 ? "🎲 All categories" : `📚 ${state.settings.categoryIds.length} categories`}</Badge>
            {state.settings.hints.enabled && <Badge className="text-gold">💡 Hints on</Badge>}
          </div>

          <Button variant="glass" size="lg" className="w-full" onClick={shareInvite}>
            <Share2 size={17} aria-hidden /> Invite Friends
          </Button>

          {state.isHost ? (
            <Button
              variant="primary" size="xl" className="w-full font-display animate-pulse-glow"
              disabled={state.players.length < 3}
              onClick={() => actions.startGame()}
            >
              🚀 Start Game
            </Button>
          ) : (
            <p className="text-center text-sm text-white/40">⏳ Waiting for the host to start…</p>
          )}
        </motion.div>
      )}

      {/* WORD REVEAL */}
      {state.phase === "word-reveal" && !ready && state.myRole && (
        <WordRevealCard
          role={state.myRole}
          word={state.secretWord}
          categoryName={state.categoryName}
          onDone={() => setReady(true)}
        />
      )}
      {state.phase === "word-reveal" && (ready || !state.myRole) && (
        <div className="py-16 text-center">
          <p className="mb-3 text-5xl animate-float" aria-hidden>🧘</p>
          <p className="text-white/60">Everyone is memorising their secret…</p>
          {state.isHost && (
            <Button variant="primary" size="lg" className="mt-6"
              onClick={() => actions.setDiscussion()}>
              🎙️ Begin Discussion
            </Button>
          )}
        </div>
      )}

      {/* DISCUSSION */}
      {state.phase === "discussion" && (
        <DiscussionPhase
          players={state.players}
          myId={state.myId ?? ""}
          isHost={state.isHost}
          round={state.round}
          categoryName={state.categoryName}
          secretWord={state.secretWord}
          isImposter={state.myRole === "imposter"}
          hints={state.settings.hints}
          wordForHints={state.secretWord}
          discussionSeconds={state.settings.discussionSeconds}
          chat={state.chat}
          onSendChat={(content, kind) => actions.sendChat(content, kind)}
          onStartVoting={() => actions.startVoting()}
        />
      )}

      {/* VOTING */}
      {state.phase === "voting" && (
        <VotingPhase
          players={state.players}
          myId={state.myId ?? ""}
          myVote={myVote}
          amAlive={amAlive}
          votedIds={votedIds}
          onVote={(t) => actions.castVote(t)}
        />
      )}

      {/* VOTE REVEAL */}
      {state.phase === "vote-reveal" && state.lastResult && (
        <VoteRevealPhase
          players={state.players}
          votes={state.votes}
          eliminatedId={state.lastResult.eliminatedId}
          wasImposter={state.lastResult.wasImposter}
          tie={state.lastResult.tie}
          isHost={state.isHost}
          onContinue={() => actions.continueRound()}
        />
      )}

      {/* GAME OVER */}
      {state.phase === "game-over" && (
        <GameOverScreen
          winner={state.winner}
          iWon={(state.winner === "imposter") === (state.myRole === "imposter")}
          players={state.players}
          imposterIds={state.imposterIds}
          word={state.secretWord ?? "Hidden"}
          categoryName={state.categoryName}
          rewards={rewards}
          isHost={state.isHost}
          onPlayAgain={() => {
            setRewards(null);
            if (state.isHost) void actions.restart();
          }}
          onExit={async () => { await actions.leave(); router.push("/"); }}
        />
      )}
    </main>
  );
}

export default function RoomPage() {
  // useSearchParams requires a Suspense boundary for static export
  return (
    <Suspense fallback={<RoomSkeleton />}>
      <RoomInner />
    </Suspense>
  );
}

/* ---------------- helpers ---------------- */

function RoomSkeleton() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pt-6 sm:max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-8 w-40" />
      </div>
      <Skeleton className="mb-4 h-32 rounded-3xl" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-3xl" />)}
      </div>
      <p className="mt-8 flex items-center justify-center gap-2 text-white/40">
        <Loader2 className="animate-spin" size={16} aria-hidden /> Joining room…
      </p>
    </main>
  );
}

function CenterShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col items-center justify-center px-6 text-center">
      <GlassCard className="w-full py-10">{children}</GlassCard>
    </main>
  );
}
