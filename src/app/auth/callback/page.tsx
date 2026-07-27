"use client";

/**
 * OAuth / magic-link landing page.
 *
 * After Google (or email magic-link) auth, Supabase redirects here with
 * `?code=...` in the URL. We exchange that code for a session, then bounce
 * the user to the home page. Because this app is statically exported for
 * GitHub Pages, this must be a client component (no server route).
 */
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase/client";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function AuthCallbackPage() {
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // Strict guard: run the exchange once.
    ran.current = true;

    const sb = getSupabase();
    if (!sb) {
      router.replace(`${BASE_PATH}/`);
      return;
    }

    // exchangeCodeForSession reads the `?code` from the current URL,
    // exchanges it for a session, and stores it in cookies/storage.
    sb.auth
      .exchangeCodeForSession(window.location.href)
      .finally(() => {
        router.replace(`${BASE_PATH}/`);
      });
  }, [router]);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-4 text-center">
      <Loader2 className="animate-spin text-white/60" size={28} aria-hidden />
      <p className="mt-4 text-sm text-white/60">Signing you in…</p>
    </main>
  );
}
