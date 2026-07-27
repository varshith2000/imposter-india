"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, LogIn, Bot, Zap, Trophy, Swords, Wrench, Lock } from "lucide-react";
import { GlassCard, Badge } from "@/components/ui/card";
import { isSupabaseConfigured } from "@/lib/supabase/client";

const MODES = [
  {
    href: "/room/create",
    icon: Plus,
    title: "Classic — Create Room",
    desc: "Host a private room, invite friends with a code",
    accent: "text-saffron",
    online: true,
  },
  {
    href: "/room/join",
    icon: LogIn,
    title: "Join Room",
    desc: "Got a room code? Jump right in",
    accent: "text-peacock",
    online: true,
  },
  {
    href: "/practice",
    icon: Bot,
    title: "Practice Mode",
    desc: "Play instantly vs desi bots — earn full XP",
    accent: "text-mint",
    online: false,
  },
  {
    href: "/room/create?mode=quick",
    icon: Zap,
    title: "Quick Match",
    desc: "Fast 5-player rounds, short timers",
    accent: "text-gold",
    online: true,
  },
  {
    href: "#",
    icon: Trophy,
    title: "Ranked Mode",
    desc: "Coming soon — climb the seasonal ladder",
    accent: "text-rose",
    soon: true,
  },
  {
    href: "#",
    icon: Swords,
    title: "Tournament",
    desc: "Coming soon — brackets & big prizes",
    accent: "text-primary",
    soon: true,
  },
  {
    href: "/room/create?mode=custom",
    icon: Wrench,
    title: "Custom Mode",
    desc: "Tune every rule to your liking",
    accent: "text-white",
    online: true,
  },
];

export default function PlayPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-8 pt-6 sm:max-w-2xl">
      <header className="mb-6 flex items-center gap-3">
        <Link href="/" aria-label="Back to home" className="glass rounded-full p-2.5 text-white/70 hover:text-white focus-ring">
          <ArrowLeft size={17} />
        </Link>
        <h1 className="font-display text-2xl font-extrabold">
          Choose your <span className="text-gradient">mode</span>
        </h1>
      </header>

      {!isSupabaseConfigured && (
        <GlassCard className="mb-4 border-gold/30 bg-gold/5 py-3 text-sm text-white/70">
          ⚡ Online multiplayer needs Supabase configured (see <code className="text-gold">README.md</code>).
          Practice Mode works right now!
        </GlassCard>
      )}

      <div className="space-y-3">
        {MODES.map((m, i) => {
          const disabled = m.soon || (m.online && !isSupabaseConfigured);
          const card = (
            <GlassCard
              hover={!disabled}
              className={`flex items-center gap-4 ${disabled ? "opacity-50" : ""}`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06]">
                <m.icon className={m.accent} size={22} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold">{m.title}</p>
                <p className="truncate text-xs text-white/45">{m.desc}</p>
              </div>
              {m.soon && (
                <Badge className="text-white/50">
                  <Lock size={11} aria-hidden /> Soon
                </Badge>
              )}
            </GlassCard>
          );
          return (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              {disabled ? card : (
                <Link href={m.href} className="block rounded-3xl focus-ring">
                  {card}
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
