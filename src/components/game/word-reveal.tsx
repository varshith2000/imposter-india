"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playSfx } from "@/lib/sound";
import type { Role } from "@/lib/types";

/* 3D flip card that reveals the player's secret word (or imposter role). */
export function WordRevealCard({
  role,
  word,
  categoryName,
  onDone,
}: {
  role: Role;
  word?: string;
  categoryName?: string;
  onDone: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [peeked, setPeeked] = useState(false);

  const flip = () => {
    if (!flipped) {
      playSfx("reveal");
      setFlipped(true);
      setPeeked(true);
    } else {
      setFlipped(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-sm text-white/60"
      >
        Tap the card to reveal your secret. <br />
        <span className="text-white/40">Don&apos;t let anyone peek! 👀</span>
      </motion.p>

      <div className="[perspective:1200px]" style={{ width: "min(320px, 85vw)" }}>
        <motion.button
          onClick={flip}
          aria-label={flipped ? "Hide secret card" : "Reveal secret card"}
          className="relative block h-[420px] w-full focus-ring rounded-4xl tap-highlight-none"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, type: "spring", stiffness: 180, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Back of card (face down) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-4xl bg-royal-gradient p-6 shadow-glow [backface-visibility:hidden]"
          >
            <span className="text-7xl" aria-hidden>🎴</span>
            <p className="font-display text-xl font-bold text-white/90">Secret Card</p>
            <p className="text-sm text-white/50">Tap to flip</p>
            <div className="absolute inset-3 rounded-3xl border-2 border-dashed border-white/20" aria-hidden />
          </div>

          {/* Front (revealed) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-4xl p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
            style={{
              background:
                role === "imposter"
                  ? "linear-gradient(150deg, #3B0A1E 0%, #7F1D3A 60%, #B91C4B 100%)"
                  : "linear-gradient(150deg, #1E1B4B 0%, #4C1D95 60%, #6D28D9 100%)",
            }}
          >
            {role === "imposter" ? (
              <>
                <span className="text-7xl" aria-hidden>😈</span>
                <p className="font-display text-3xl font-extrabold text-rose">You are the IMPOSTER</p>
                <p className="text-center text-sm text-white/70">
                  You don&apos;t know the word. Listen carefully, blend in, and bluff like a boss!
                </p>
                {categoryName && (
                  <p className="rounded-full bg-white/10 px-4 py-1.5 text-sm">
                    Category hint: <b>{categoryName}</b>
                  </p>
                )}
              </>
            ) : (
              <>
                <span className="text-6xl" aria-hidden>🤫</span>
                <p className="text-sm uppercase tracking-widest text-white/50">Your secret word</p>
                <p className="text-center font-display text-3xl font-extrabold text-gradient-gold break-words max-w-full">
                  {word}
                </p>
                {categoryName && (
                  <p className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/70">{categoryName}</p>
                )}
                <p className="text-center text-xs text-white/50">
                  Give clever hints — not too obvious, or the imposter will catch on!
                </p>
              </>
            )}
          </div>
        </motion.button>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={flip}>
          {flipped ? <EyeOff size={16} aria-hidden /> : <Eye size={16} aria-hidden />}
          {flipped ? "Hide" : "Peek"}
        </Button>
        <Button variant="primary" size="lg" disabled={!peeked} onClick={onDone}>
          Got it — I&apos;m ready! ✅
        </Button>
      </div>
    </div>
  );
}
