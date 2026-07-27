"use client";

import { useEffect } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { loadProfile, updateProfile } from "@/lib/profile";

/**
 * Bridges the Supabase auth session to the local-first profile.
 *
 * The whole app reads sign-in state from `profile.isGuest` (localStorage), but
 * nothing else wires the auth session to that flag — so after a successful
 * Google/email login the UI still showed "Guest". This component subscribes to
 * auth changes and flips `isGuest` accordingly, dispatching a profile-update so
 * every page (settings, profile, home) re-renders signed-in.
 *
 * Mounted once in the root layout.
 */
export function AuthSync() {
  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;

    const apply = (signedIn: boolean) => {
      const p = loadProfile();
      if (p.isGuest === !signedIn) return; // already correct
      updateProfile((cur) => ({ ...cur, isGuest: !signedIn }));
    };

    // Sync the current session on first load (covers reloads while logged in).
    sb.auth.getSession().then(({ data }) => apply(Boolean(data.session)));

    // React to login / logout thereafter.
    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      apply(Boolean(session));
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return null;
}
