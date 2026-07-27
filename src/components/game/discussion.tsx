"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Vote, Lightbulb, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, Badge } from "@/components/ui/card";
import { PlayerAvatar } from "@/components/brand";
import { Input } from "@/components/ui/controls";
import { useCountdown } from "@/hooks/use-profile";
import { playSfx } from "@/lib/sound";
import { cn } from "@/lib/utils";
import type { GamePlayer, HintSettings } from "@/lib/types";

export interface ChatMsg {
  id: string;
  playerId: string;
  name: string;
  avatar: string;
  kind: "chat" | "emoji" | "system" | "hint";
  content: string;
}

const QUICK_EMOJIS = ["😂", "🤨", "😱", "🔥", "👀", "🙏", "💀", "🎉"];
const QUICK_CHATS = ["Sus! 🤨", "100% imposter!", "I trust them", "Bilkul galat!", "Ekdum sahi hint", "Arre yaar 😅"];

export function DiscussionPhase({
  players,
  myId,
  isHost,
  round,
  categoryName,
  secretWord,
  isImposter,
  hints,
  wordForHints,
  discussionSeconds,
  chat,
  onSendChat,
  onStartVoting,
}: {
  players: GamePlayer[];
  myId: string;
  isHost: boolean;
  round: number;
  categoryName?: string;
  secretWord?: string;
  isImposter: boolean;
  hints: HintSettings;
  wordForHints?: string; // actual secret word (for hint metadata shown to all)
  discussionSeconds: number;
  chat: ChatMsg[];
  onSendChat: (content: string, kind?: ChatMsg["kind"]) => void;
  onStartVoting: () => void;
}) {
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const left = useCountdown(discussionSeconds, true);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [chat.length]);

  useEffect(() => {
    if (left > 0 && left <= 10) playSfx("tick");
  }, [left]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    onSendChat(text);
    setDraft("");
  };

  const alive = players.filter((p) => p.alive);

  return (
    <div className="flex flex-col gap-4">
      {/* Status bar */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Round {round}</Badge>
        {categoryName && hints.enabled && hints.showCategory && (
          <Badge className="text-peacock">📚 {categoryName}</Badge>
        )}
        {hints.enabled && hints.showFirstLetter && wordForHints && (
          <Badge className="text-gold">
            <Lightbulb size={12} aria-hidden /> Starts with “{wordForHints[0].toUpperCase()}”
          </Badge>
        )}
        {hints.enabled && hints.showLength && wordForHints && (
          <Badge className="text-mint">{wordForHints.replace(/\s/g, "").length} letters</Badge>
        )}
        {discussionSeconds > 0 && (
          <Badge className={cn("ml-auto tabular-nums", left <= 10 && "text-danger animate-pulse")}>
            <Timer size={12} aria-hidden /> {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
          </Badge>
        )}
      </div>

      {/* My word ribbon */}
      <GlassCard className={cn("py-3 text-center", isImposter ? "border-rose/40" : "border-primary/40")}>
        {isImposter ? (
          <p className="text-sm">
            😈 <b className="text-rose">You are the Imposter.</b>{" "}
            <span className="text-white/60">Blend in — figure out the word!</span>
          </p>
        ) : (
          <p className="text-sm">
            🤫 Your word: <b className="text-gradient-gold font-display text-base">{secretWord}</b>
          </p>
        )}
      </GlassCard>

      {/* Players strip */}
      <div className="flex gap-3 overflow-x-auto pb-1" role="list" aria-label="Players">
        {players.map((p) => (
          <div key={p.id} role="listitem" className="flex shrink-0 flex-col items-center gap-1">
            <PlayerAvatar
              emoji={p.avatar}
              name={p.name}
              ring={p.id === myId ? "self" : p.isHost ? "host" : "none"}
              dead={!p.alive}
            />
            <span className={cn("max-w-16 truncate text-[11px]", p.alive ? "text-white/70" : "text-white/30 line-through")}>
              {p.id === myId ? "You" : p.name}
            </span>
          </div>
        ))}
      </div>

      {/* Chat */}
      <GlassCard className="flex h-72 flex-col p-3 sm:h-80">
        <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto pr-1" aria-live="polite" aria-label="Discussion chat">
          <AnimatePresence initial={false}>
            {chat.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex items-start gap-2",
                  m.kind === "system" && "justify-center",
                  m.playerId === myId && m.kind !== "system" && "flex-row-reverse",
                )}
              >
                {m.kind === "system" ? (
                  <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/50">{m.content}</span>
                ) : m.kind === "emoji" ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-white/40">{m.playerId === myId ? "You" : m.name}</span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.5, 1] }}
                      className="text-2xl"
                    >
                      {m.content}
                    </motion.span>
                  </div>
                ) : (
                  <>
                    <span className="mt-0.5 text-lg" aria-hidden>{m.avatar}</span>
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-3 py-2 text-sm",
                        m.playerId === myId ? "bg-primary/30 rounded-tr-sm" : "bg-white/[0.07] rounded-tl-sm",
                      )}
                    >
                      <p className="mb-0.5 text-[10px] font-semibold text-white/40">
                        {m.playerId === myId ? "You" : m.name}
                      </p>
                      <p className="break-words">{m.content}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {chat.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center text-white/30">
              <span className="mb-2 text-3xl" aria-hidden>💬</span>
              <p className="text-sm">Discussion time! Drop your hints…</p>
            </div>
          )}
        </div>

        {/* Quick reactions */}
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {QUICK_EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => { onSendChat(e, "emoji"); playSfx("click"); }}
              className="shrink-0 rounded-full bg-white/[0.06] px-2.5 py-1 text-lg transition hover:scale-110 hover:bg-white/[0.12] focus-ring tap-highlight-none"
              aria-label={`React ${e}`}
            >
              {e}
            </button>
          ))}
          {QUICK_CHATS.map((c) => (
            <button
              key={c}
              onClick={() => onSendChat(c)}
              className="shrink-0 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/[0.12] focus-ring"
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-2 flex gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type your hint or accusation…"
            maxLength={200}
            aria-label="Chat message"
            className="h-11"
          />
          <Button variant="royal" size="icon" onClick={send} aria-label="Send message">
            <Send size={17} />
          </Button>
        </div>
      </GlassCard>

      {/* Host-only: Start Voting */}
      {isHost ? (
        <Button variant="sunset" size="xl" className="w-full font-display" onClick={onStartVoting}>
          <Vote aria-hidden /> 🗳️ Start Voting ({alive.length} alive)
        </Button>
      ) : (
        <p className="text-center text-sm text-white/40">
          ⏳ Waiting for the host to start voting…
        </p>
      )}
    </div>
  );
}
