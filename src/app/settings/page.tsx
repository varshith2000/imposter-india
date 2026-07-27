"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Contrast, LogIn, Trash2, Type, User, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, Badge, Skeleton } from "@/components/ui/card";
import { Switch, Modal } from "@/components/ui/controls";
import { PlayerAvatar } from "@/components/brand";
import { useProfile, useMute } from "@/hooks/use-profile";
import { createDefaultProfile, saveProfile } from "@/lib/profile";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { playSfx } from "@/lib/sound";

/** Boolean preference stored in localStorage that toggles a class on <html>. */
function useHtmlToggle(key: string, className: string): [boolean, (v: boolean) => void] {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const v = localStorage.getItem(key) === "1";
    setOn(v);
    document.documentElement.classList.toggle(className, v);
  }, [key, className]);
  const set = (v: boolean) => {
    setOn(v);
    localStorage.setItem(key, v ? "1" : "0");
    document.documentElement.classList.toggle(className, v);
  };
  return [on, set];
}

export default function SettingsPage() {
  const profile = useProfile();
  const [muted, setMuted] = useMute();
  const [largeText, setLargeText] = useHtmlToggle("wti-large-text", "large-text");
  const [highContrast, setHighContrast] = useHtmlToggle("wti-high-contrast", "high-contrast");
  const [resetOpen, setResetOpen] = useState(false);

  const resetProgress = () => {
    saveProfile(createDefaultProfile());
    playSfx("whoosh");
    setResetOpen(false);
  };

  if (!profile) {
    return (
      <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pt-6 sm:max-w-2xl">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="mb-3 h-20 rounded-3xl" />)}
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-8 pt-6 sm:max-w-2xl">
      <header className="mb-6 flex items-center gap-3">
        <Link href="/" aria-label="Back to home" className="glass rounded-full p-2.5 text-white/70 hover:text-white focus-ring">
          <ArrowLeft size={17} />
        </Link>
        <h1 className="font-display text-2xl font-extrabold">
          Sett<span className="text-gradient">ings</span>
        </h1>
      </header>

      {/* Account */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-widest text-white/50">Account</h2>
        <GlassCard className="space-y-1 p-2">
          <Link href="/profile" className="flex items-center gap-3 rounded-2xl p-3 hover:bg-white/[0.06] focus-ring">
            <PlayerAvatar emoji={profile.avatar} name={profile.username} size="sm" ring="self" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{profile.username}</p>
              <p className="text-[11px] text-white/45">{profile.isGuest ? "Guest account" : "Signed in"}</p>
            </div>
            <ChevronRight size={16} className="text-white/30" aria-hidden />
          </Link>
          {profile.isGuest && (
            <Link href="/login" className="flex items-center gap-3 rounded-2xl p-3 hover:bg-white/[0.06] focus-ring">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <LogIn size={17} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">Sign in to save progress</p>
                <p className="text-[11px] text-white/45">
                  {isSupabaseConfigured ? "Google, email or anonymous" : "Requires Supabase setup"}
                </p>
              </div>
              <ChevronRight size={16} className="text-white/30" aria-hidden />
            </Link>
          )}
        </GlassCard>
      </motion.section>

      {/* Sound */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <h2 className="mb-2 mt-6 font-display text-sm font-bold uppercase tracking-widest text-white/50">Sound</h2>
        <GlassCard className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-saffron/15 text-saffron">
            <Volume2 size={17} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">Sound effects</p>
            <p className="text-[11px] text-white/45">Desi UI clicks, reveals & victory tunes</p>
          </div>
          <Switch checked={!muted} onChange={(v) => { setMuted(!v); if (v) playSfx("click"); }} label="Sound effects" />
        </GlassCard>
      </motion.section>

      {/* Accessibility */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
        <h2 className="mb-2 mt-6 font-display text-sm font-bold uppercase tracking-widest text-white/50">Accessibility</h2>
        <GlassCard className="divide-y divide-white/[0.06] p-2">
          <div className="flex items-center gap-3 p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-peacock/15 text-peacock">
              <Type size={17} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">Large text</p>
              <p className="text-[11px] text-white/45">Bigger fonts across the app</p>
            </div>
            <Switch checked={largeText} onChange={setLargeText} label="Large text" />
          </div>
          <div className="flex items-center gap-3 p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint/15 text-mint">
              <Contrast size={17} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">High contrast</p>
              <p className="text-[11px] text-white/45">Solid backgrounds, brighter text</p>
            </div>
            <Switch checked={highContrast} onChange={setHighContrast} label="High contrast" />
          </div>
        </GlassCard>
        <p className="mt-2 px-1 text-[11px] text-white/35">
          💡 Reduced motion follows your device settings automatically.
        </p>
      </motion.section>

      {/* Danger zone */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
        <h2 className="mb-2 mt-6 font-display text-sm font-bold uppercase tracking-widest text-white/50">Danger Zone</h2>
        <GlassCard className="flex items-center gap-3 border-danger/30">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger/15 text-danger">
            <Trash2 size={17} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">Reset progress</p>
            <p className="text-[11px] text-white/45">Deletes local XP, coins & stats forever</p>
          </div>
          <Button variant="danger" size="sm" onClick={() => setResetOpen(true)}>Reset</Button>
        </GlassCard>
      </motion.section>

      {/* About */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-8 text-center">
        <p className="font-display text-sm font-bold text-white/60">Who&apos;s The Imposter? — India Edition</p>
        <p className="mt-1 text-xs text-white/35">Bluff. Debate. Vote. Win. 🇮🇳</p>
        <div className="mt-2 flex justify-center gap-2">
          <Badge className="text-white/40">v1.0.0</Badge>
          <Badge className="text-white/40">
            <User size={11} aria-hidden /> {isSupabaseConfigured ? "Online ready" : "Offline mode"}
          </Badge>
        </div>
      </motion.section>

      {/* Reset confirmation */}
      <Modal open={resetOpen} onClose={() => setResetOpen(false)} title="Reset all progress?">
        <p className="text-sm text-white/60">
          Your XP, coins, level, achievements and match history will be permanently deleted. This cannot be undone!
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="glass" size="lg" className="flex-1" onClick={() => setResetOpen(false)}>Cancel</Button>
          <Button variant="danger" size="lg" className="flex-1" onClick={resetProgress}>Yes, Reset</Button>
        </div>
      </Modal>
    </main>
  );
}
