/* ---------------- XP / Levels / Titles ---------------- */

export const XP_REWARDS = {
  correctVote: 50,
  correctGuess: 100,
  win: 150,
  participation: 25,
  stayedTillEnd: 20,
  dailyBonus: 40,
} as const;

export const COIN_REWARDS = {
  win: 60,
  participation: 10,
  correctVote: 15,
  dailyLogin: 25,
} as const;

/** XP needed to go from level N to N+1. Supports 100+ levels. */
export function xpForLevel(level: number): number {
  return Math.round(100 + level * 55 + Math.pow(level, 1.6) * 8);
}

/** Total XP required to *reach* a level. */
export function totalXpForLevel(level: number): number {
  let sum = 0;
  for (let i = 1; i < level; i++) sum += xpForLevel(i);
  return sum;
}

export function levelFromXp(xp: number): { level: number; current: number; needed: number; progress: number } {
  let level = 1;
  let rem = xp;
  while (level < 150 && rem >= xpForLevel(level)) {
    rem -= xpForLevel(level);
    level++;
  }
  const needed = xpForLevel(level);
  return { level, current: rem, needed, progress: Math.min(1, rem / needed) };
}

export const LEVEL_TITLES: { min: number; title: string; emoji: string }[] = [
  { min: 1, title: "Nayaa Khiladi", emoji: "🌱" },
  { min: 5, title: "Gully Detective", emoji: "🔍" },
  { min: 10, title: "Chai Sleuth", emoji: "☕" },
  { min: 20, title: "Masala Mastermind", emoji: "🌶️" },
  { min: 30, title: "Bazaar Bluffer", emoji: "🎭" },
  { min: 45, title: "Rajdhani Expert", emoji: "🚄" },
  { min: 60, title: "Maharaja of Mystery", emoji: "👑" },
  { min: 80, title: "Desi Legend", emoji: "🔥" },
  { min: 100, title: "The Ustad", emoji: "🏆" },
];

export function titleForLevel(level: number) {
  return [...LEVEL_TITLES].reverse().find((t) => level >= t.min) ?? LEVEL_TITLES[0];
}

/* ---------------- Achievements ---------------- */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  goal: number;
  stat: "wins" | "games" | "correctVotes" | "imposterWins" | "streak" | "level";
  coins: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-win", name: "Pehli Jeet", description: "Win your first game", emoji: "🥳", goal: 1, stat: "wins", coins: 50 },
  { id: "ten-wins", name: "Dus Ka Dum", description: "Win 10 games", emoji: "💪", goal: 10, stat: "wins", coins: 150 },
  { id: "fifty-wins", name: "Half Century", description: "Win 50 games", emoji: "🏏", goal: 50, stat: "wins", coins: 400 },
  { id: "hundred-wins", name: "Century Superstar", description: "Win 100 games", emoji: "💯", goal: 100, stat: "wins", coins: 1000 },
  { id: "detective", name: "Perfect Detective", description: "Vote correctly 25 times", emoji: "🕵️", goal: 25, stat: "correctVotes", coins: 200 },
  { id: "sherlock", name: "Sherlock of Sadar Bazaar", description: "Vote correctly 100 times", emoji: "🧠", goal: 100, stat: "correctVotes", coins: 500 },
  { id: "master-imposter", name: "Master Imposter", description: "Win 10 games as the Imposter", emoji: "😈", goal: 10, stat: "imposterWins", coins: 300 },
  { id: "regular", name: "Adda Regular", description: "Play 25 games", emoji: "🎮", goal: 25, stat: "games", coins: 100 },
  { id: "veteran", name: "Mehfil Veteran", description: "Play 100 games", emoji: "🎪", goal: 100, stat: "games", coins: 350 },
  { id: "streak-3", name: "Hat-trick Hero", description: "Win 3 games in a row", emoji: "🎩", goal: 3, stat: "streak", coins: 120 },
  { id: "streak-5", name: "On Fire", description: "Win 5 games in a row", emoji: "🔥", goal: 5, stat: "streak", coins: 250 },
  { id: "level-10", name: "Rising Star", description: "Reach level 10", emoji: "⭐", goal: 10, stat: "level", coins: 100 },
  { id: "level-25", name: "Local Legend", description: "Reach level 25", emoji: "🌟", goal: 25, stat: "level", coins: 250 },
  { id: "level-50", name: "The Legend", description: "Reach level 50", emoji: "👑", goal: 50, stat: "level", coins: 600 },
];

/* ---------------- Avatars ---------------- */

export interface AvatarDef {
  id: string;
  emoji: string;
  name: string;
  cost: number; // 0 = free
}

export const AVATARS: AvatarDef[] = [
  { id: "tiger", emoji: "🐯", name: "Sher Khan", cost: 0 },
  { id: "peacock", emoji: "🦚", name: "Mor Raja", cost: 0 },
  { id: "elephant", emoji: "🐘", name: "Gaja", cost: 0 },
  { id: "cobra", emoji: "🐍", name: "Naagraj", cost: 0 },
  { id: "monkey", emoji: "🐵", name: "Bandar", cost: 0 },
  { id: "parrot", emoji: "🦜", name: "Mitthu", cost: 0 },
  { id: "cow", emoji: "🐄", name: "Gau Mata", cost: 100 },
  { id: "camel", emoji: "🐪", name: "Registan Rider", cost: 100 },
  { id: "lion", emoji: "🦁", name: "Gir Lion", cost: 200 },
  { id: "eagle", emoji: "🦅", name: "Garud", cost: 200 },
  { id: "fox", emoji: "🦊", name: "Chalak Lomdi", cost: 300 },
  { id: "panda", emoji: "🐼", name: "Chill Panda", cost: 300 },
  { id: "unicorn", emoji: "🦄", name: "Startup Unicorn", cost: 500 },
  { id: "dragon", emoji: "🐉", name: "Mysore Dragon", cost: 800 },
  { id: "alien", emoji: "👽", name: "Jaadu", cost: 1000 },
  { id: "robot", emoji: "🤖", name: "Chitti", cost: 1000 },
];

/* ---------------- Daily Challenges ---------------- */

export interface ChallengeDef {
  id: string;
  name: string;
  description: string;
  emoji: string;
  goal: number;
  xp: number;
  coins: number;
}

export const DAILY_CHALLENGES: ChallengeDef[] = [
  { id: "play-3", name: "Teen Patti", description: "Play 3 games today", emoji: "🎮", goal: 3, xp: 75, coins: 30 },
  { id: "win-2", name: "Double Dhamaka", description: "Win 2 games today", emoji: "🏆", goal: 2, xp: 120, coins: 50 },
  { id: "catch-imposter", name: "Pakdo Usko!", description: "Correctly identify the Imposter", emoji: "🕵️", goal: 1, xp: 60, coins: 25 },
  { id: "play-bollywood", name: "Filmy Friday", description: "Play a Bollywood category game", emoji: "🎬", goal: 1, xp: 50, coins: 20 },
  { id: "play-cricket", name: "Howzat!", description: "Play a Cricket category game", emoji: "🏏", goal: 1, xp: 50, coins: 20 },
  { id: "earn-xp", name: "XP Ki Barsaat", description: "Earn 300 XP today", emoji: "⚡", goal: 300, xp: 100, coins: 40 },
];
