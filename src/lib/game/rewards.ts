"use client";

import { updateProfile, type PlayerProfile, type RecentMatch } from "@/lib/profile";
import { ACHIEVEMENTS, DAILY_CHALLENGES, levelFromXp } from "@/lib/data/progression";
import { computeRewards, type XpInput } from "@/lib/game/engine";
import type { XpBreakdown } from "@/lib/types";

export interface MatchOutcome extends XpInput {
  word: string;
  categoryId: string;
  categoryName: string;
  guessedWord?: boolean; // imposter guessed the word correctly
}

export interface MatchRewardsResult {
  breakdown: XpBreakdown;
  newAchievements: { id: string; name: string; emoji: string; coins: number }[];
  leveledUpTo: number | null;
}

const today = () => new Date().toISOString().slice(0, 10);

function bumpChallenge(p: PlayerProfile, id: string, amount: number) {
  const cur = p.challengeProgress[id];
  const isToday = cur?.date === today();
  p.challengeProgress[id] = {
    date: today(),
    value: (isToday ? cur.value : 0) + amount,
    claimed: isToday ? cur.claimed : false,
  };
}

/** Apply a finished match to the local profile: XP, coins, stats, achievements, challenges. */
export function applyMatchResult(outcome: MatchOutcome): MatchRewardsResult {
  const breakdown = computeRewards(outcome);
  if (outcome.guessedWord) breakdown.total += 100; // correct word guess bonus

  const newAchievements: MatchRewardsResult["newAchievements"] = [];
  let leveledUpTo: number | null = null;

  updateProfile((p) => {
    const prevLevel = levelFromXp(p.xp).level;

    p.gamesPlayed += 1;
    p.xp += breakdown.total;
    p.coins += breakdown.coins;
    if (outcome.won) {
      p.wins += 1;
      p.streak += 1;
      p.bestStreak = Math.max(p.bestStreak, p.streak);
      if (outcome.wasImposter) p.imposterWins += 1;
    } else {
      p.streak = 0;
    }
    if (outcome.votedCorrectly) p.correctVotes += 1;
    if (outcome.guessedWord) p.correctGuesses += 1;

    p.categoryCounts[outcome.categoryId] = (p.categoryCounts[outcome.categoryId] ?? 0) + 1;
    p.favoriteCategory = Object.entries(p.categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

    const match: RecentMatch = {
      id: `m-${Date.now()}`,
      won: outcome.won,
      role: outcome.wasImposter ? "imposter" : "crew",
      word: outcome.word,
      category: outcome.categoryName,
      xpEarned: breakdown.total,
      playedAt: new Date().toISOString(),
    };
    p.recentMatches = [match, ...p.recentMatches].slice(0, 20);

    // Daily challenges
    bumpChallenge(p, "play-3", 1);
    if (outcome.won) bumpChallenge(p, "win-2", 1);
    if (outcome.votedCorrectly) bumpChallenge(p, "catch-imposter", 1);
    if (outcome.categoryId.startsWith("bollywood")) bumpChallenge(p, "play-bollywood", 1);
    if (["cricket-legends", "ipl", "cricket-moments"].includes(outcome.categoryId)) bumpChallenge(p, "play-cricket", 1);
    bumpChallenge(p, "earn-xp", breakdown.total);

    // Achievements
    const level = levelFromXp(p.xp).level;
    const statValue: Record<string, number> = {
      wins: p.wins,
      games: p.gamesPlayed,
      correctVotes: p.correctVotes,
      imposterWins: p.imposterWins,
      streak: p.bestStreak,
      level,
    };
    for (const a of ACHIEVEMENTS) {
      if (!p.unlockedAchievements.includes(a.id) && statValue[a.stat] >= a.goal) {
        p.unlockedAchievements.push(a.id);
        p.coins += a.coins;
        newAchievements.push({ id: a.id, name: a.name, emoji: a.emoji, coins: a.coins });
      }
    }

    if (level > prevLevel) leveledUpTo = level;
    return p;
  });

  return { breakdown, newAchievements, leveledUpTo };
}

/** Claim a completed daily challenge. Returns false if not claimable. */
export function claimChallenge(id: string): boolean {
  const def = DAILY_CHALLENGES.find((c) => c.id === id);
  if (!def) return false;
  let ok = false;
  updateProfile((p) => {
    const prog = p.challengeProgress[id];
    if (prog && prog.date === today() && prog.value >= def.goal && !prog.claimed) {
      prog.claimed = true;
      p.xp += def.xp;
      p.coins += def.coins;
      ok = true;
    }
    return p;
  });
  return ok;
}

/** Daily login bonus. Returns coins granted (0 if already claimed). */
export function claimDailyLogin(): number {
  let granted = 0;
  updateProfile((p) => {
    if (p.lastLoginBonus !== today()) {
      p.lastLoginBonus = today();
      p.coins += 25;
      p.xp += 40;
      granted = 25;
    }
    return p;
  });
  return granted;
}
