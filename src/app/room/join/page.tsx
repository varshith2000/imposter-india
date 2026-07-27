"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, LogIn, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { playSfx } from "@/lib/sound";

export default function JoinRoomPage() {
  const router = useRouter();
  const [chars, setChars] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const code = chars.join("");

  const setChar = (i: number, v: string) => {
    const c = v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(-1);
    setChars((prev) => {
      const next = [...prev];
      next[i] = c;
      return next;
    });
    if (c && i < 5) inputs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !chars[i] && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "Enter" && code.length === 6) join();
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
    if (text.length >= 2) {
      e.preventDefault();
      setChars(Array.from({ length: 6 }, (_, i) => text[i] ?? ""));
      inputs.current[Math.min(text.length, 5)]?.focus();
    }
  };

  const join = () => {
    if (code.length !== 6) return;
    if (!isSupabaseConfigured) {
      setError("Online play needs Supabase configured — try Practice Mode meanwhile!");
      return;
    }
    setJoining(true);
    playSfx("whoosh");
    router.push(`/room?code=${code}`);
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-8 pt-6">
      <header className="mb-10 flex items-center gap-3">
        <Link href="/play" aria-label="Back" className="glass rounded-full p-2.5 text-white/70 hover:text-white focus-ring">
          <ArrowLeft size={17} />
        </Link>
        <h1 className="font-display text-2xl font-extrabold">
          Join <span className="text-gradient">Room</span>
        </h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col items-center justify-center gap-8"
      >
        <div className="text-center">
          <p className="mb-1 text-5xl" aria-hidden>🎟️</p>
          <p className="text-white/60">Enter the 6-character room code</p>
        </div>

        <div className="flex gap-2" onPaste={onPaste} role="group" aria-label="Room code">
          {chars.map((c, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              value={c}
              onChange={(e) => setChar(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              maxLength={2}
              inputMode="text"
              autoCapitalize="characters"
              autoComplete="off"
              aria-label={`Code character ${i + 1}`}
              className={cn(
                "h-14 w-12 rounded-2xl glass text-center font-display text-2xl font-bold uppercase focus-ring",
                c && "border-primary/60 bg-primary/10",
              )}
            />
          ))}
        </div>

        {error && (
          <GlassCard className="border-danger/40 bg-danger/10 py-3 text-center text-sm">⚠️ {error}</GlassCard>
        )}

        <Button
          variant="primary"
          size="xl"
          className="w-full max-w-sm font-display"
          disabled={code.length !== 6 || joining}
          onClick={join}
        >
          {joining ? <Loader2 className="animate-spin" aria-hidden /> : <LogIn aria-hidden />}
          {joining ? "Joining…" : "Join Room"}
        </Button>

        <p className="text-center text-sm text-white/35">
          No code? <Link href="/room/create" className="text-saffron underline-offset-2 hover:underline">Create your own room</Link>{" "}
          or <Link href="/practice" className="text-mint underline-offset-2 hover:underline">practice vs bots</Link>.
        </p>
      </motion.div>
    </main>
  );
}
