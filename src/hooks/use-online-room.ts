"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { getSupabase, ensureSession, isSupabaseConfigured } from "@/lib/supabase/client";
import { loadProfile } from "@/lib/profile";
import type { GamePhase, GamePlayer, RoomSettings, VoteRecord, Winner } from "@/lib/types";
import type { ChatMsg } from "@/components/game/discussion";
import { DEFAULT_SETTINGS } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Realtime online room state, backed by Supabase.                    */
/* ------------------------------------------------------------------ */

export interface OnlineRoomState {
  loading: boolean;
  error: string | null;
  roomId: string | null;
  code: string;
  phase: GamePhase;
  round: number;
  settings: RoomSettings;
  players: GamePlayer[];
  myId: string | null;
  isHost: boolean;
  categoryName?: string;
  myRole?: "crew" | "imposter";
  secretWord?: string;
  hint?: string;
  votes: VoteRecord[];
  lastResult: { eliminatedId: string | null; wasImposter: boolean; tie: boolean } | null;
  winner: Winner;
  chat: ChatMsg[];
  imposterIds: string[]; // populated at game over via reveal query
}

const initial: OnlineRoomState = {
  loading: true,
  error: null,
  roomId: null,
  code: "",
  phase: "lobby",
  round: 0,
  settings: DEFAULT_SETTINGS,
  players: [],
  myId: null,
  isHost: false,
  votes: [],
  lastResult: null,
  winner: null,
  chat: [],
  imposterIds: [],
};

export function useOnlineRoom(code: string) {
  const [state, setState] = useState<OnlineRoomState>(initial);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const roomIdRef = useRef<string | null>(null);

  const refresh = useCallback(async () => {
    const sb = getSupabase();
    if (!sb || !roomIdRef.current) return;
    const roomId = roomIdRef.current;
    const [{ data: room }, { data: players }, { data: session }] = await Promise.all([
      sb.from("rooms").select("*").eq("id", roomId).single(),
      sb.from("room_players").select("*").eq("room_id", roomId).order("joined_at"),
      sb.auth.getSession(),
    ]);
    if (!room) return;
    const uid = session.session?.user.id ?? null;

    // my secret for current round
    let myRole: "crew" | "imposter" | undefined;
    let secretWord: string | undefined;
    let hint: string | undefined;
    if (uid && room.round > 0) {
      const { data: secret } = await sb
        .from("player_secrets")
        .select("role, secret_word, hint")
        .eq("room_id", roomId)
        .eq("user_id", uid)
        .eq("round", room.round)
        .maybeSingle();
      if (secret) {
        myRole = secret.role;
        secretWord = secret.secret_word ?? undefined;
        hint = secret.hint ?? undefined;
      }
    }

    // votes + last result (visible per RLS once revealed)
    const { data: votes } = await sb
      .from("votes")
      .select("voter_id, target_id")
      .eq("room_id", roomId)
      .eq("round", room.round);
    const { data: result } = await sb
      .from("round_results")
      .select("*")
      .eq("room_id", roomId)
      .eq("round", room.round)
      .maybeSingle();

    setState((s) => ({
      ...s,
      loading: false,
      roomId,
      code: room.code,
      phase: room.phase as GamePhase,
      round: room.round,
      settings: { ...DEFAULT_SETTINGS, ...(room.settings as Partial<RoomSettings>) },
      categoryName: room.category_name ?? undefined,
      winner: (room.winner as Winner) ?? null,
      myId: uid,
      isHost: uid === room.host_id,
      myRole,
      secretWord,
      hint,
      // instant replay: wipe last game's chat & revealed imposters when a new game starts
      chat: room.phase === "word-reveal" && s.phase !== "word-reveal" ? [] : s.chat,
      imposterIds: room.phase === "game-over" ? s.imposterIds : [],
      players: (players ?? []).map((p) => ({
        id: p.user_id,
        name: p.username,
        avatar: p.avatar,
        isHost: p.is_host,
        alive: p.alive,
        connected: p.connected,
      })),
      votes: (votes ?? []).map((v) => ({ voterId: v.voter_id, targetId: v.target_id })),
      lastResult: result
        ? { eliminatedId: result.eliminated_id, wasImposter: result.was_imposter, tie: result.tie }
        : null,
    }));
  }, []);

  /* join + subscribe */
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setState((s) => ({ ...s, loading: false, error: "OFFLINE" }));
      return;
    }
    let cancelled = false;
    const sb = getSupabase()!;

    (async () => {
      try {
        await ensureSession();
        const p = loadProfile();
        const { data: roomId, error } = await sb.rpc("join_room", {
          p_code: code.toUpperCase(),
          p_username: p.username,
          p_avatar: p.avatar,
        });
        if (error) throw error;
        if (cancelled) return;
        roomIdRef.current = roomId as string;

        const channel = sb
          .channel(`room:${roomId}`)
          .on("postgres_changes", { event: "*", schema: "public", table: "rooms", filter: `id=eq.${roomId}` }, refresh)
          .on("postgres_changes", { event: "*", schema: "public", table: "room_players", filter: `room_id=eq.${roomId}` }, refresh)
          .on("postgres_changes", { event: "*", schema: "public", table: "votes", filter: `room_id=eq.${roomId}` }, refresh)
          .on("postgres_changes", { event: "*", schema: "public", table: "round_results", filter: `room_id=eq.${roomId}` }, refresh)
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "chat_messages", filter: `room_id=eq.${roomId}` },
            (payload) => {
              const m = payload.new as Record<string, unknown>;
              setState((s) => ({
                ...s,
                chat: [
                  ...s.chat,
                  {
                    id: String(m.id),
                    playerId: String(m.user_id),
                    name: String(m.username),
                    avatar: String(m.avatar),
                    kind: m.kind as ChatMsg["kind"],
                    content: String(m.content),
                  },
                ].slice(-100),
              }));
            },
          )
          .subscribe();
        channelRef.current = channel;
        await refresh();
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to join room";
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: msg }));
      }
    })();

    return () => {
      cancelled = true;
      if (channelRef.current) getSupabase()?.removeChannel(channelRef.current);
    };
  }, [code, refresh]);

  /* reveal imposters at game over */
  useEffect(() => {
    if (state.phase !== "game-over" || !state.roomId || state.imposterIds.length) return;
    const sb = getSupabase();
    if (!sb) return;
    let cancelled = false;
    // after game over, host calls award_results; imposters revealed via match_participants.
    // Retry briefly — the match row may not exist yet when we first look.
    (async () => {
      for (let attempt = 0; attempt < 6 && !cancelled; attempt++) {
        // only the latest match for this room (replays create multiple matches)
        const { data: match } = await sb
          .from("matches")
          .select("id")
          .eq("room_id", state.roomId)
          .order("played_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (match) {
          const { data } = await sb
            .from("match_participants")
            .select("user_id")
            .eq("match_id", match.id)
            .eq("role", "imposter");
          if (data?.length && !cancelled) {
            setState((s) => ({ ...s, imposterIds: data.map((d) => d.user_id) }));
            return;
          }
        }
        await new Promise((r) => setTimeout(r, 1200));
      }
    })();
    return () => { cancelled = true; };
  }, [state.phase, state.roomId, state.imposterIds.length]);

  /* ---------------- actions ---------------- */
  const rpc = useCallback(async (fn: string, args: Record<string, unknown> = {}) => {
    const sb = getSupabase();
    if (!sb || !roomIdRef.current) return;
    const { error } = await sb.rpc(fn, { p_room_id: roomIdRef.current, ...args });
    if (error) console.error(fn, error.message);
  }, []);

  const actions = {
    startGame: () => rpc("start_game"),
    setDiscussion: () => rpc("set_phase", { p_phase: "discussion" }),
    startVoting: () => rpc("set_phase", { p_phase: "voting" }),
    castVote: (targetId: string) => rpc("cast_vote", { p_target: targetId }),
    continueRound: () => rpc("continue_round"),
    restart: () => rpc("restart_room"),
    awardResults: () => rpc("award_results"),
    leave: () => rpc("leave_room"),
    sendChat: async (content: string, kind: ChatMsg["kind"] = "chat") => {
      const sb = getSupabase();
      if (!sb || !roomIdRef.current || !state.myId) return;
      const p = loadProfile();
      await sb.from("chat_messages").insert({
        room_id: roomIdRef.current,
        user_id: state.myId,
        username: p.username,
        avatar: p.avatar,
        kind,
        content: content.slice(0, 300),
      });
    },
  };

  return { state, actions };
}
