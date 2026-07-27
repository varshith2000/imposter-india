"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------------ */
/*  Supabase browser client. The app gracefully degrades to local      */
/*  (practice) mode when the env vars are not configured.              */
/* ------------------------------------------------------------------ */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Supports both the new publishable key and the legacy anon key name.
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createBrowserClient(url!, anonKey!);
  }
  return client;
}

/** Ensure there is an authenticated session (anonymous fallback). */
export async function ensureSession() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  if (data.session) return data.session;
  const { data: anon, error } = await sb.auth.signInAnonymously();
  if (error) throw error;
  return anon.session;
}
