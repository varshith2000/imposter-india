"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, Badge } from "@/components/ui/card";
import { Slider } from "@/components/ui/controls";
import { WordRevealCard } from "@/components/game/word-reveal";
import { DiscussionPhase, type ChatMsg } from "@/components/game/discussion";
import { VotingPhase, VoteRevealPhase } from "@/components/game/voting";
import { GameOverScreen } from "@/components/game/game-over";
import { useProfile } from "@/hooks/use-profile";
import { setupRound, tallyVotes, checkWinner } from "@/lib/game/engine";
import { applyMatchResult, type MatchRewardsResult } from "@/lib/game/rewards";
import { getCategoriesByGroup } from "@/lib/data/categories";
import { DEFAULT_SETTINGS, type Difficulty, type GamePhase, type GamePlayer, type VoteRecord, type Winner } from "@/lib/types";
import { cn, pick, shuffle, sleep } from "@/lib/utils";
import { playSfx } from "@/lib/sound";

/* ---------------- Bots ---------------- */

const BOT_POOL = [
  { name: "Pinky Didi", avatar: "🦩" },
  { name: "Raju Bhai", avatar: "🐵" },
  { name: "Sweety Ji", avatar: "🦜" },
  { name: "Golu Bhaiya", avatar: "🐼" },
  { name: "Chintu", avatar: "🐹" },
  { name: "Babli", avatar: "🐨" },
  { name: "Pappu Don", avatar: "🦊" },
  { name: "Munni", avatar: "🐰" },
  { name: "Sharma Ji", avatar: "🦉" },
  { name: "Bunty", avatar: "🐸" },
];

const CREW_HINTS = [
  "Mine is something super famous and everyone knows it",
  "Arre, I've seen this so many times!",
  "It's iconic yaar, total classic 💯",
  "My nani also knows about this one!",
  "This one gives me nostalgia, honestly",
  "Very desi vibes with this one 🇮🇳",
  "I'd bet it's everyone's favourite",
  "Hmm, mine is related to something legendary",
  "It reminds me of my childhood days",
  "You'd see this everywhere in India!",
];

const IMPOSTER_HINTS = [
  "Yeah mine is... quite popular too 😅",
  "Obviously I know it, who doesn't?",
  "Haha classic one, right guys?",
  "Mine is exactly what you all are thinking",
  "Too easy this round honestly",
  "It's... umm... very famous, yes",
  "I agree with whatever they said 👆",
  "Same as everyone, super iconic",
];

interface PracticeState {
  phase: GamePhase;
  round: number;
  players: GamePlayer[];
  word: string;
  categoryId: string;
  categoryName: string;
  imposterIds: string[];
  votes: VoteRecord[];
  lastResult: { eliminatedId: string | null; wasImposter: boolean; tie: boolean; votes: VoteRecord[] } | null;
  winner: Winner;
}

const MY_ID = "me";

export default function PracticePage() {
  const router = useRouter();
  const profile = useProfile();
  const [botCount, setBotCount] = useState(4);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty | "mixed">("mixed");
  const [game, setGame] = useState<PracticeState | null>(null);
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [rewards, setRewards] = useState<MatchRewardsResult | null>(null);
  const [myVotedImposter, setMyVotedImposter] = useState(false);
  const msgId = useRef(0);
  const botTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    botTimers.current.forEach(clearTimeout);
    botTimers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const pushChat = useCallback((msg: Omit<ChatMsg, "id">) => {
    setChat((c) => [...c, { ...msg, id: `c${++msgId.current}` }]);
  }, []);

  /* ---------- start a new game ---------- */
  const startGame = useCallback(() => {
    clearTimers();
    const me: GamePlayer = {
      id: MY_ID,
      name: profile?.username ?? "You",
      avatar: profile?.avatar ?? "🐯",
      isHost: true,
      alive: true,
    };
    const bots: GamePlayer[] = shuffle(BOT_POOL)
      .slice(0, botCount)
      .map((b, i) => ({ id: `bot-${i}`, name: b.name, avatar: b.avatar, isHost: false, isBot: true, alive: true }));
    const players = [me, ...bots];
    const setup = setupRound(players, {
      ...DEFAULT_SETTINGS,
      mode: "practice",
      imposters: 1,
      categoryIds,
      difficulty,
    });
    setGame({
      phase: "word-reveal",
      round: 1,
      players,
      word: setup.word,
      categoryId: setup.category.id,
      categoryName: setup.category.name,
      imposterIds: setup.imposterIds,
      votes: [],
      lastResult: null,
      winner: null,
    });
    setChat([]);
    setMyVote(null);
    setVotedIds([]);
    setRewards(null);
    setMyVotedImposter(false);
    playSfx("whoosh");
  }, [botCount, categoryIds, difficulty, profile]);

  /* ---------- discussion: bots drop hints ---------- */
  const beginDiscussion = useCallback(() => {
    setGame((g) => (g ? { ...g, phase: "discussion" } : g));
    setGame((g) => {
      if (!g) return g;
      pushChat({ playerId: "sys", name: "", avatar: "", kind: "system", content: `Round ${g.round} — discussion started! 🎙️` });
      const aliveBots = g.players.filter((p) => p.isBot && p.alive);
      aliveBots.forEach((bot, i) => {
        const t = setTimeout(() => {
          const isImp = g.imposterIds.includes(bot.id);
          pushChat({
            playerId: bot.id,
            name: bot.name,
            avatar: bot.avatar,
            kind: "chat",
            content: pick(isImp ? IMPOSTER_HINTS : CREW_HINTS),
          });
        }, 2500 + i * 3200 + Math.random() * 1800);
        botTimers.current.push(t);
      });
      return g;
    });
  }, [pushChat]);

  /* ---------- host presses Start Voting ---------- */
  const startVoting = useCallback(() => {
    clearTimers();
    setMyVote(null);
    setVotedIds([]);
    setGame((g) => (g ? { ...g, phase: "voting", votes: [] } : g));
    playSfx("whoosh");
    // bots vote gradually
    setGame((g) => {
      if (!g) return g;
      const aliveBots = g.players.filter((p) => p.isBot && p.alive);
      aliveBots.forEach((bot, i) => {
        const t = setTimeout(() => {
          setGame((cur) => {
            if (!cur || cur.phase !== "voting") return cur;
            const alive = cur.players.filter((p) => p.alive && p.id !== bot.id);
            const botIsImp = cur.imposterIds.includes(bot.id);
            let target: GamePlayer;
            if (botIsImp) {
              // imposter bot never votes fellow imposters
              target = pick(alive.filter((p) => !cur.imposterIds.includes(p.id)));
            } else {
              // crew bots have a nose for the imposter ~40% of the time
              const imposters = alive.filter((p) => cur.imposterIds.includes(p.id));
              target =
                imposters.length && Math.random() < 0.4
                  ? pick(imposters)
                  : pick(alive);
            }
            setVotedIds((v) => [...v, bot.id]);
            playSfx("vote");
            return { ...cur, votes: [...cur.votes, { voterId: bot.id, targetId: target.id }] };
          });
        }, 1500 + i * 1400 + Math.random() * 1200);
        botTimers.current.push(t);
      });
      return g;
    });
  }, []);

  /* ---------- my vote ---------- */
  const castMyVote = useCallback(
    (targetId: string) => {
      setMyVote(targetId);
      setVotedIds((v) => [...v, MY_ID]);
      setGame((g) => {
        if (!g) return g;
        if (g.imposterIds.includes(targetId)) setMyVotedImposter(true);
        return { ...g, votes: [...g.votes, { voterId: MY_ID, targetId }] };
      });
    },
    [],
  );

  /* ---------- tally when all alive have voted ---------- */
  useEffect(() => {
    if (!game || game.phase !== "voting") return;
    const aliveCount = game.players.filter((p) => p.alive).length;
    if (game.votes.length < aliveCount) return;

    (async () => {
      await sleep(800);
      const result = tallyVotes(game.votes, game.imposterIds);
      const players = game.players.map((p) =>
        p.id === result.eliminatedId ? { ...p, alive: false } : p,
      );
      const winner = checkWinner(players, game.imposterIds);
      playSfx("reveal");
      setGame((g) =>
        g ? { ...g, phase: "vote-reveal", players, lastResult: result, winner } : g,
      );
    })();
  }, [game]);

  /* ---------- continue after reveal ---------- */
  const continueRound = useCallback(() => {
    setGame((g) => {
      if (!g) return g;
      if (g.winner) {
        return { ...g, phase: "game-over" };
      }
      return { ...g, phase: "discussion", round: g.round + 1, votes: [] };
    });
    setMyVote(null);
    setVotedIds([]);
  }, []);

  // when we enter a new discussion round, schedule bot hints again
  useEffect(() => {
    if (game?.phase === "discussion" && game.round > 1) {
      const g = game;
      pushChat({ playerId: "sys", name: "", avatar: "", kind: "system", content: `Round ${g.round} — keep debating! 🔎` });
      const aliveBots = g.players.filter((p) => p.isBot && p.alive);
      aliveBots.forEach((bot, i) => {
        const t = setTimeout(() => {
          const isImp = g.imposterIds.includes(bot.id);
          pushChat({
            playerId: bot.id,
            name: bot.name,
            avatar: bot.avatar,
            kind: "chat",
            content: pick(isImp ? IMPOSTER_HINTS : CREW_HINTS),
          });
        }, 2000 + i * 3000 + Math.random() * 1500);
        botTimers.current.push(t);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.phase, game?.round]);

  /* ---------- game over: apply rewards once ---------- */
  useEffect(() => {
    if (game?.phase !== "game-over" || rewards) return;
    const amImposter = game.imposterIds.includes(MY_ID);
    const iWon = (game.winner === "imposter") === amImposter;
    const res = applyMatchResult({
      won: iWon,
      wasImposter: amImposter,
      votedCorrectly: !amImposter && myVotedImposter,
      stayedTillEnd: true,
      streak: profile?.streak ?? 0,
      word: game.word,
      categoryId: game.categoryId,
      categoryName: game.categoryName,
    });
    setRewards(res);
  }, [game, rewards, myVotedImposter, profile]);

  const mySecretRole = game?.imposterIds.includes(MY_ID) ? "imposter" : "crew";

  const groups = getCategoriesByGroup();
  const toggleCategory = (id: string) => {
    playSfx("click");
    setCategoryIds((ids) => (ids.includes(id) ? ids.filter((c) => c !== id) : [...ids, id]));
  };

  /* ================= RENDER ================= */

  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-8 pt-6 sm:max-w-2xl">
      <header className="mb-4 flex items-center justify-between">
        <Link href="/" className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/70 hover:text-white focus-ring">
          <ArrowLeft size={15} aria-hidden /> Home
        </Link>
        <Badge className="text-mint">
          <Bot size={13} aria-hidden /> Practice Mode
        </Badge>
      </header>

      {!game && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="text-center">
            <p className="mb-2 text-5xl" aria-hidden>🤖</p>
            <h1 className="font-display text-3xl font-extrabold">Practice vs Bots</h1>
            <p className="mt-2 text-white/50">
              Sharpen your bluffing skills against our desi bots. Full XP rewards, zero pressure!
            </p>
          </div>

          <GlassCard className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="font-semibold" htmlFor="bots">Bot players</label>
                <Badge>{botCount} bots</Badge>
              </div>
              <Slider min={3} max={9} value={botCount} onChange={setBotCount} label="Number of bots" />
              <p className="mt-2 text-xs text-white/40">
                {botCount + 1} total players · 1 imposter ·{" "}
                {categoryIds.length === 0 ? "random Indian category" : `${categoryIds.length} topic${categoryIds.length > 1 ? "s" : ""} picked`}
              </p>
            </div>
            <div>
              <p className="mb-2 font-semibold">Difficulty</p>
              <div className="flex gap-2">
                {(["mixed", "easy", "medium", "hard"] as const).map((d) => (
                  <button key={d} onClick={() => { playSfx("click"); setDifficulty(d); }}
                    className={cn(
                      "flex-1 rounded-xl px-2 py-2 text-sm font-semibold capitalize transition focus-ring",
                      difficulty === d ? "bg-india-gradient text-white shadow-glow-pink" : "glass text-white/60",
                    )}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Topic picker — play with one topic or mix several */}
          <GlassCard>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold">📚 Topics</p>
              <div className="flex items-center gap-2">
                {categoryIds.length > 0 && (
                  <button
                    onClick={() => { playSfx("click"); setCategoryIds([]); }}
                    className="rounded-full px-2.5 py-1 text-xs font-semibold text-white/50 hover:text-white focus-ring"
                  >
                    Clear
                  </button>
                )}
                <Badge>{categoryIds.length === 0 ? "All (random)" : `${categoryIds.length} picked`}</Badge>
              </div>
            </div>
            <div className="max-h-64 space-y-4 overflow-y-auto pr-1">
              {Object.entries(groups).map(([group, cats]) => (
                <div key={group}>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-white/40">{group}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cats.map((c) => (
                      <button key={c.id} onClick={() => toggleCategory(c.id)}
                        aria-pressed={categoryIds.includes(c.id)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-semibold transition focus-ring tap-highlight-none",
                          categoryIds.includes(c.id)
                            ? "bg-india-gradient text-white shadow-glow-pink"
                            : "glass text-white/60 hover:text-white",
                        )}>
                        {c.emoji} {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <Button variant="primary" size="xl" className="w-full font-display" onClick={startGame}>
            🎮 Start Practice Game
          </Button>
        </motion.div>
      )}

      {game?.phase === "word-reveal" && (
        <WordRevealCard
          role={mySecretRole}
          word={game.word}
          categoryName={game.categoryName}
          onDone={beginDiscussion}
        />
      )}

      {game?.phase === "discussion" && (
        <DiscussionPhase
          players={game.players}
          myId={MY_ID}
          isHost
          round={game.round}
          categoryName={game.categoryName}
          secretWord={game.word}
          isImposter={mySecretRole === "imposter"}
          hints={DEFAULT_SETTINGS.hints}
          wordForHints={game.word}
          discussionSeconds={0}
          chat={chat}
          onSendChat={(content, kind = "chat") =>
            pushChat({
              playerId: MY_ID,
              name: profile?.username ?? "You",
              avatar: profile?.avatar ?? "🐯",
              kind,
              content,
            })
          }
          onStartVoting={startVoting}
        />
      )}

      {game?.phase === "voting" && (
        <VotingPhase
          players={game.players}
          myId={MY_ID}
          myVote={myVote}
          amAlive={game.players.find((p) => p.id === MY_ID)?.alive ?? false}
          votedIds={votedIds}
          onVote={castMyVote}
        />
      )}

      {game?.phase === "vote-reveal" && game.lastResult && (
        <VoteRevealPhase
          players={game.players}
          votes={game.lastResult.votes}
          eliminatedId={game.lastResult.eliminatedId}
          wasImposter={game.lastResult.wasImposter}
          tie={game.lastResult.tie}
          isHost
          onContinue={continueRound}
        />
      )}

      {game?.phase === "game-over" && (
        <GameOverScreen
          winner={game.winner}
          iWon={(game.winner === "imposter") === game.imposterIds.includes(MY_ID)}
          players={game.players}
          imposterIds={game.imposterIds}
          word={game.word}
          categoryName={game.categoryName}
          rewards={rewards}
          isHost
          onPlayAgain={startGame}
          onExit={() => router.push("/")}
        />
      )}
    </main>
  );
}
