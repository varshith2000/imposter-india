/* ------------------------------------------------------------------ */
/*  Core shared game types — used by both practice (local) and online */
/* ------------------------------------------------------------------ */

export type GamePhase =
  | "lobby"
  | "word-reveal"
  | "discussion"
  | "voting"
  | "vote-reveal"
  | "round-end"
  | "game-over";

export type Role = "crew" | "imposter";

export type Difficulty = "easy" | "medium" | "hard";

export interface GamePlayer {
  id: string;
  name: string;
  avatar: string; // emoji avatar
  isHost: boolean;
  isBot?: boolean;
  alive: boolean;
  role?: Role; // only known locally for self / at reveal
  connected?: boolean;
}

export interface HintSettings {
  enabled: boolean;
  showCategory: boolean;
  showFirstLetter: boolean;
  showLength: boolean;
}

export interface RoomSettings {
  maxPlayers: number; // 4 - 15
  imposters: number; // 1 - 3
  discussionSeconds: number; // 0 = unlimited (host decides)
  categoryIds: string[];
  difficulty: Difficulty | "mixed";
  hints: HintSettings;
  isPublic: boolean;
  mode: "classic" | "quick" | "ranked" | "custom" | "practice";
}

export interface VoteRecord {
  voterId: string;
  targetId: string;
}

export interface RoundResult {
  eliminatedId: string | null;
  wasImposter: boolean;
  tie: boolean;
  votes: VoteRecord[];
}

export type Winner = "crew" | "imposter" | null;

export interface GameState {
  phase: GamePhase;
  round: number;
  players: GamePlayer[];
  settings: RoomSettings;
  categoryId?: string;
  categoryName?: string;
  secretWord?: string; // only for crew (self)
  myRole?: Role;
  imposterIds: string[]; // revealed at end
  votes: VoteRecord[];
  lastResult?: RoundResult;
  winner: Winner;
}

export interface XpBreakdown {
  participation: number;
  correctVote: number;
  win: number;
  stayedTillEnd: number;
  streakBonus: number;
  total: number;
  coins: number;
}

export const DEFAULT_SETTINGS: RoomSettings = {
  maxPlayers: 8,
  imposters: 1,
  discussionSeconds: 180,
  categoryIds: [],
  difficulty: "mixed",
  hints: {
    enabled: true,
    showCategory: true,
    showFirstLetter: false,
    showLength: false,
  },
  isPublic: false,
  mode: "classic",
};
