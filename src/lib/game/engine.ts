import { getCategoryById, CATEGORIES, type Category } from "@/lib/data/categories";
import { XP_REWARDS, COIN_REWARDS } from "@/lib/data/progression";
import { pick, shuffle } from "@/lib/utils";
import type { GamePlayer, RoomSettings, RoundResult, VoteRecord, Winner, XpBreakdown } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Pure game logic shared by practice (local) and online modes.       */
/* ------------------------------------------------------------------ */

export interface RoundSetup {
  category: Category;
  word: string;
  hint: string;
  imposterIds: string[];
}

/** Pick a category + secret word and select imposters. */
export function setupRound(players: GamePlayer[], settings: RoomSettings): RoundSetup {
  const pool =
    settings.categoryIds.length > 0
      ? settings.categoryIds.map(getCategoryById).filter((c): c is Category => !!c)
      : CATEGORIES;
  const eligible =
    settings.difficulty === "mixed" ? pool : pool.filter((c) => c.difficulty === settings.difficulty);
  const category = pick(eligible.length ? eligible : pool);
  const wordWithHint = pick(category.words);
  const word = wordWithHint.word;
  const hint = wordWithHint.hint;
  const imposterCount = Math.min(settings.imposters, Math.floor(players.length / 3) || 1);
  const imposterIds = shuffle(players.map((p) => p.id)).slice(0, imposterCount);
  return { category, word, hint, imposterIds };
}

/** Tally votes. Highest voted player is eliminated; ties eliminate no one. */
export function tallyVotes(votes: VoteRecord[], imposterIds: string[]): RoundResult {
  const counts = new Map<string, number>();
  for (const v of votes) counts.set(v.targetId, (counts.get(v.targetId) ?? 0) + 1);
  let max = 0;
  let top: string[] = [];
  counts.forEach((n, id) => {
    if (n > max) {
      max = n;
      top = [id];
    } else if (n === max) {
      top.push(id);
    }
  });
  const tie = top.length !== 1 || max === 0;
  const eliminatedId = tie ? null : top[0];
  return {
    eliminatedId,
    wasImposter: !!eliminatedId && imposterIds.includes(eliminatedId),
    tie,
    votes,
  };
}

/** Determine winner after an elimination. */
export function checkWinner(players: GamePlayer[], imposterIds: string[]): Winner {
  const alive = players.filter((p) => p.alive);
  const aliveImposters = alive.filter((p) => imposterIds.includes(p.id));
  if (aliveImposters.length === 0) return "crew";
  // Imposters win when they reach parity with crew
  if (aliveImposters.length >= alive.length - aliveImposters.length) return "imposter";
  return null;
}

export interface XpInput {
  won: boolean;
  wasImposter: boolean;
  votedCorrectly: boolean;
  stayedTillEnd: boolean;
  streak: number; // current win streak BEFORE this game
}

export function computeRewards(input: XpInput): XpBreakdown {
  const participation = XP_REWARDS.participation;
  const correctVote = input.votedCorrectly ? XP_REWARDS.correctVote : 0;
  const win = input.won ? XP_REWARDS.win : 0;
  const stayedTillEnd = input.stayedTillEnd ? XP_REWARDS.stayedTillEnd : 0;
  // Combo multiplier: +10% per current streak win (cap 50%)
  const streakMult = input.won ? Math.min(input.streak * 0.1, 0.5) : 0;
  const base = participation + correctVote + win + stayedTillEnd;
  const streakBonus = Math.round(base * streakMult);
  const total = base + streakBonus;
  const coins =
    COIN_REWARDS.participation +
    (input.won ? COIN_REWARDS.win : 0) +
    (input.votedCorrectly ? COIN_REWARDS.correctVote : 0);
  return { participation, correctVote, win, stayedTillEnd, streakBonus, total, coins };
}
