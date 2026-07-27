"use client";

import { useCallback, useEffect, useState } from "react";
import { loadProfile, type PlayerProfile } from "@/lib/profile";
import { isMuted, setMuted } from "@/lib/sound";

/** Reactive hook over the local profile store. */
export function useProfile() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
    const update = () => setProfile(loadProfile());
    window.addEventListener("wti-profile-updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("wti-profile-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return profile;
}

export function useMute(): [boolean, (m: boolean) => void] {
  const [muted, set] = useState(true);
  useEffect(() => {
    set(isMuted());
    const update = () => set(isMuted());
    window.addEventListener("wti-mute-changed", update);
    return () => window.removeEventListener("wti-mute-changed", update);
  }, []);
  const toggle = useCallback((m: boolean) => setMuted(m), []);
  return [muted, toggle];
}

/** Simple countdown that ticks each second. */
export function useCountdown(seconds: number, active: boolean, onDone?: () => void) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (!active) return;
    setLeft(seconds);
    if (seconds <= 0) return; // unlimited
    const iv = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          clearInterval(iv);
          onDone?.();
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, seconds]);
  return left;
}
