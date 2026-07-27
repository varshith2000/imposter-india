"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";

const STEPS = [
  {
    emoji: "🎴",
    title: "Get your secret word",
    desc: "Everyone receives the same secret Indian word — like 'Vada Pav' or 'MS Dhoni'. Everyone… except the Imposter, who gets nothing!",
    color: "border-primary/40",
  },
  {
    emoji: "🎙️",
    title: "Discuss & drop hints",
    desc: "Take turns describing the word without saying it. Too obvious? The imposter learns the word. Too vague? YOU look suspicious!",
    color: "border-peacock/40",
  },
  {
    emoji: "😈",
    title: "Imposter bluffs",
    desc: "The imposter must pretend they know the word. Fake confidence, vague hints, and pure jugaad are their weapons.",
    color: "border-rose/40",
  },
  {
    emoji: "🗳️",
    title: "Host starts voting",
    desc: "Only the room host decides when discussion is over. When they hit Start Voting, everyone secretly votes for who they think is the imposter.",
    color: "border-saffron/40",
  },
  {
    emoji: "📢",
    title: "Reveal & eliminate",
    desc: "Votes are revealed with full drama. The most-voted player is eliminated. Was it the imposter?",
    color: "border-gold/40",
  },
  {
    emoji: "🏆",
    title: "Win the game",
    desc: "Crew wins by eliminating all imposters. Imposters win by surviving until they equal the crew. Earn XP, coins & achievements!",
    color: "border-mint/40",
  },
];

const TIPS = [
  "🧠 Crew tip: reference the word's vibe, not its features. 'My mom makes this on Sundays' > 'It's fried'.",
  "😈 Imposter tip: echo other players' energy. Agree, laugh, deflect.",
  "🎯 Watch for hints that are suspiciously generic — that's imposter behaviour!",
  "🤝 A tie vote eliminates nobody. Imposters love chaos and split votes.",
];

export default function HowToPlayPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-8 pt-6 sm:max-w-2xl">
      <header className="mb-6 flex items-center gap-3">
        <Link href="/" aria-label="Back to home" className="glass rounded-full p-2.5 text-white/70 hover:text-white focus-ring">
          <ArrowLeft size={17} />
        </Link>
        <h1 className="font-display text-2xl font-extrabold">
          How to <span className="text-gradient">Play</span>
        </h1>
      </header>

      <div className="space-y-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <GlassCard className={`flex gap-4 ${s.color}`}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-2xl" aria-hidden>
                {s.emoji}
              </div>
              <div>
                <p className="font-display font-bold">
                  <span className="mr-1.5 text-white/30">{i + 1}.</span>
                  {s.title}
                </p>
                <p className="mt-1 text-sm text-white/55">{s.desc}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h2 className="mb-2 mt-8 font-display text-sm font-bold uppercase tracking-widest text-white/50">
          Pro Tips
        </h2>
        <GlassCard className="space-y-3">
          {TIPS.map((t) => (
            <p key={t} className="text-sm text-white/65">{t}</p>
          ))}
        </GlassCard>
      </motion.div>

      <Link href="/play" className="mt-6 block">
        <Button variant="primary" size="xl" className="w-full font-display">
          <Play className="fill-current" aria-hidden /> Let&apos;s Play!
        </Button>
      </Link>
    </main>
  );
}
