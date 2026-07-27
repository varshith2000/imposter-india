"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Ghost, Loader2, Mail, UserRound, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { Input } from "@/components/ui/controls";
import { Logo } from "@/components/brand";
import { updateProfile } from "@/lib/profile";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { playSfx } from "@/lib/sound";

// Base path is inlined at build time ("" locally / on Vercel, "/<repo>" on GitHub Pages).
// Must be included in OAuth/magic-link redirect URLs so the user lands back
// inside the app, not at the GitHub Pages root (which 404s).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Status = "idle" | "loading" | "sent" | "error";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const continueAsGuest = () => {
    playSfx("click");
    router.push("/");
  };

  const signInGoogle = async () => {
    const sb = getSupabase();
    if (!sb) return;
    setStatus("loading");
    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}${BASE_PATH}/auth/callback` },
    });
    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    }
  };

  const signInEmail = async () => {
    const sb = getSupabase();
    if (!sb || !email.includes("@")) return;
    setStatus("loading");
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}${BASE_PATH}/auth/callback` },
    });
    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    } else {
      setStatus("sent");
      playSfx("reveal");
    }
  };

  const signInAnonymous = async () => {
    const sb = getSupabase();
    if (!sb) return;
    setStatus("loading");
    const { error } = await sb.auth.signInAnonymously();
    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    } else {
      updateProfile((p) => ({ ...p, isGuest: false }));
      playSfx("victory");
      router.push("/");
    }
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-8 pt-6">
      <header className="mb-8 flex items-center gap-3">
        <Link href="/" aria-label="Back to home" className="glass rounded-full p-2.5 text-white/70 hover:text-white focus-ring">
          <ArrowLeft size={17} />
        </Link>
        <h1 className="font-display text-2xl font-extrabold">
          Sign <span className="text-gradient">In</span>
        </h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col justify-center"
      >
        <div className="mb-8 text-center">
          <Logo size="lg" className="justify-center" />
          <p className="mt-3 text-sm text-white/50">
            Save your XP, coins & achievements across devices
          </p>
        </div>

        {!isSupabaseConfigured ? (
          <GlassCard className="text-center">
            <WifiOff size={32} className="mx-auto mb-3 text-white/30" aria-hidden />
            <p className="font-display font-bold">Online accounts not configured</p>
            <p className="mt-2 text-sm text-white/50">
              Add Supabase keys to <code className="text-gold">.env.local</code> to enable
              Google, email & anonymous sign-in. Your progress is safely stored on this
              device meanwhile!
            </p>
            <Button variant="primary" size="lg" className="mt-5 w-full" onClick={continueAsGuest}>
              <Ghost size={17} aria-hidden /> Continue as Guest
            </Button>
          </GlassCard>
        ) : status === "sent" ? (
          <GlassCard className="text-center">
            <p className="mb-3 text-5xl" aria-hidden>📬</p>
            <p className="font-display text-lg font-bold">Magic link sent!</p>
            <p className="mt-2 text-sm text-white/50">
              Check <span className="font-semibold text-white">{email}</span> and tap the link to sign in.
            </p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            <Button
              variant="glass"
              size="xl"
              className="w-full"
              onClick={signInGoogle}
              disabled={status === "loading"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path fill="#EA4335" d="M12 5.04c1.62 0 3.06.56 4.2 1.64l3.12-3.12C17.46 1.8 14.96.8 12 .8 7.7.8 3.99 3.27 2.18 6.87l3.66 2.84C6.71 7.06 9.14 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.72 2.89c2.18-2.01 3.7-4.98 3.7-8.71z" />
                <path fill="#FBBC05" d="M5.84 14.29a7.06 7.06 0 0 1 0-4.58L2.18 6.87a11.16 11.16 0 0 0 0 10.26l3.66-2.84z" />
                <path fill="#34A853" d="M12 23.2c3 0 5.53-.99 7.37-2.7l-3.72-2.89c-1.02.69-2.34 1.1-3.65 1.1-2.86 0-5.29-2.02-6.16-4.71l-3.66 2.84C3.99 20.73 7.7 23.2 12 23.2z" />
              </svg>
              Continue with Google
            </Button>

            <div className="flex items-center gap-3 py-1" aria-hidden>
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/35">or email</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="flex gap-2">
              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && signInEmail()}
              />
              <Button
                variant="primary"
                size="lg"
                onClick={signInEmail}
                disabled={status === "loading" || !email.includes("@")}
                aria-label="Send magic link"
              >
                {status === "loading" ? <Loader2 className="animate-spin" size={17} aria-hidden /> : <Mail size={17} aria-hidden />}
              </Button>
            </div>

            <div className="flex items-center gap-3 py-1" aria-hidden>
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/35">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <Button variant="glass" size="lg" className="w-full" onClick={signInAnonymous} disabled={status === "loading"}>
              <UserRound size={17} aria-hidden /> Anonymous Login
            </Button>
            <Button variant="ghost" size="lg" className="w-full" onClick={continueAsGuest}>
              <Ghost size={17} aria-hidden /> Play as Guest
            </Button>

            {status === "error" && (
              <p role="alert" className="rounded-2xl bg-danger/10 p-3 text-center text-sm text-danger">
                {errorMsg || "Something went wrong. Try again!"}
              </p>
            )}
          </div>
        )}

        <p className="mt-8 text-center text-[11px] text-white/30">
          By continuing you agree to play fair & have fun 🎉
        </p>
      </motion.div>
    </main>
  );
}
