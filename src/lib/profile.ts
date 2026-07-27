"use client";

import { levelFromXp } from "@/lib/data/progression";

/* ------------------------------------------------------------------ */
/*  Local-first player profile. Persisted in localStorage; mirrored    */
/*  to Supabase `profiles` when the backend is configured.             */
/* ------------------------------------------------------------------ */

export interface PlayerProfile {
  id: string;
  username: string;
  avatar: string;
  xp: number;
  coins: number;
  gamesPlayed: number;
  wins: number;
  imposterWins: number;
  correctVotes: number;
  correctGuesses: number;
  streak: number;
  bestStreak: number;
  unlockedAvatars: string[];
  unlockedAchievements: string[];
  favoriteCategory?: string;
  categoryCounts: Record<string, number>;
  lastLoginBonus?: string; // ISO date
  challengeProgress: Record<string, { date: string; value: number; claimed: boolean }>;
  recentMatches: RecentMatch[];
  createdAt: string;
  isGuest: boolean;
}

export interface RecentMatch {
  id: string;
  won: boolean;
  role: "crew" | "imposter";
  word: string;
  category: string;
  xpEarned: number;
  playedAt: string;
}

const KEY = "wti-profile-v1";

const DESI_NAMES = [
  "MasalaMaverick", "ChaiChamp", "BiryaniBoss", "DesiDetective", "GullyGuru",
  "PakodaPro", "FilmyFox", "CricketKeeda", "JugaadJockey", "BindaasBaazigar",
  "TuktukTitan", "LassiLegend", "SamosaSleuth", "DhamakaDon", "PaneerPanther",
];

function randomName() {
  const base = DESI_NAMES[Math.floor(Math.random() * DESI_NAMES.length)];
  return `${base}${Math.floor(Math.random() * 900) + 100}`;
}

export function createDefaultProfile(): PlayerProfile {
  return {
    id: (typeof crypto !== "undefined" && crypto.randomUUID?.()) || `p-${Date.now()}`,
    username: randomName(),
    avatar: "🐯",
    xp: 0,
    coins: 100,
    gamesPlayed: 0,
    wins: 0,
    imposterWins: 0,
    correctVotes: 0,
    correctGuesses: 0,
    streak: 0,
    bestStreak: 0,
    unlockedAvatars: ["🐯", "🦚", "🐘", "🐍", "🐵", "🦜"],
    unlockedAchievements: [],
    categoryCounts: {},
    challengeProgress: {},
    recentMatches: [],
    createdAt: new Date().toISOString(),
    isGuest: true,
  };
}

export function loadProfile(): PlayerProfile {
  if (typeof window === "undefined") return createDefaultProfile();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...createDefaultProfile(), ...JSON.parse(raw) };
  } catch {
    /* corrupted storage — start fresh */
  }
  const p = createDefaultProfile();
  saveProfile(p);
  return p;
}

export function saveProfile(p: PlayerProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("wti-profile-updated"));
}

export function updateProfile(fn: (p: PlayerProfile) => PlayerProfile): PlayerProfile {
  const next = fn(loadProfile());
  saveProfile(next);
  return next;
}

export function getLevelInfo(p: PlayerProfile) {
  return levelFromXp(p.xp);
}

export function winRate(p: PlayerProfile): number {
  return p.gamesPlayed === 0 ? 0 : Math.round((p.wins / p.gamesPlayed) * 100);
}
