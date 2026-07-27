"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Rocket, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, Badge } from "@/components/ui/card";
import { Slider, Switch } from "@/components/ui/controls";
import { getCategoriesByGroup } from "@/lib/data/categories";
import { DEFAULT_SETTINGS, type RoomSettings } from "@/lib/types";
import { getSupabase, ensureSession, isSupabaseConfigured } from "@/lib/supabase/client";
import { loadProfile } from "@/lib/profile";
import { cn } from "@/lib/utils";
import { playSfx } from "@/lib/sound";

function CreateRoomInner() {
  const router = useRouter();
  const params = useSearchParams();
  const quick = params.get("mode") === "quick";

  const [settings, setSettings] = useState<RoomSettings>({
    ...DEFAULT_SETTINGS,
    mode: quick ? "quick" : "classic",
    discussionSeconds: quick ? 90 : 180,
    maxPlayers: quick ? 5 : 8,
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const groups = getCategoriesByGroup();

  const toggleCategory = (id: string) => {
    playSfx("click");
    setSettings((s) => ({
      ...s,
      categoryIds: s.categoryIds.includes(id)
        ? s.categoryIds.filter((c) => c !== id)
        : [...s.categoryIds, id],
    }));
  };

  const create = async () => {
    if (!isSupabaseConfigured) {
      setError("Online play needs Supabase configured — try Practice Mode meanwhile!");
      return;
    }
    setCreating(true);
    setError(null);
    try {
      await ensureSession();
      const sb = getSupabase()!;
      const p = loadProfile();
      const { data, error } = await sb.rpc("create_room", {
        p_settings: settings as unknown as Record<string, unknown>,
        p_username: p.username,
        p_avatar: p.avatar,
      });
      if (error) throw error;
      const row = Array.isArray(data) ? data[0] : data;
      playSfx("whoosh");
      router.push(`/room?code=${row.room_code}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create room");
      setCreating(false);
    }
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-28 pt-6 sm:max-w-2xl">
      <header className="mb-6 flex items-center gap-3">
        <Link href="/play" aria-label="Back" className="glass rounded-full p-2.5 text-white/70 hover:text-white focus-ring">
          <ArrowLeft size={17} />
        </Link>
        <h1 className="font-display text-2xl font-extrabold">
          Create <span className="text-gradient">Room</span>
        </h1>
        {quick && <Badge className="text-gold">⚡ Quick Match</Badge>}
      </header>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Players & imposters */}
        <GlassCard className="space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-semibold">Max players</label>
              <Badge>{settings.maxPlayers}</Badge>
            </div>
            <Slider min={4} max={15} value={settings.maxPlayers}
              onChange={(v) => setSettings((s) => ({ ...s, maxPlayers: v }))} label="Max players" />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-semibold">Imposters</label>
              <Badge className="text-rose">{settings.imposters} 😈</Badge>
            </div>
            <Slider min={1} max={3} value={settings.imposters}
              onChange={(v) => setSettings((s) => ({ ...s, imposters: v }))} label="Number of imposters" />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-semibold">Discussion timer</label>
              <Badge>
                {settings.discussionSeconds === 0 ? "No limit" : `${settings.discussionSeconds / 60} min`}
              </Badge>
            </div>
            <Slider min={0} max={600} step={30} value={settings.discussionSeconds}
              onChange={(v) => setSettings((s) => ({ ...s, discussionSeconds: v }))} label="Discussion seconds" />
            <p className="mt-1 text-xs text-white/40">Voting only starts when YOU press Start Voting — timer is just a guide.</p>
          </div>
        </GlassCard>

        {/* Hints */}
        <GlassCard className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">💡 Hints for everyone</p>
              <p className="text-xs text-white/40">Help newer players out</p>
            </div>
            <Switch checked={settings.hints.enabled} label="Enable hints"
              onChange={(v) => setSettings((s) => ({ ...s, hints: { ...s.hints, enabled: v } }))} />
          </div>
          {settings.hints.enabled && (
            <div className="space-y-3 border-t border-white/[0.08] pt-3">
              {([
                ["showCategory", "Show category"],
                ["showFirstLetter", "Show first letter"],
                ["showLength", "Show word length"],
              ] as const).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-white/70">{label}</span>
                  <Switch checked={settings.hints[key]} label={label}
                    onChange={(v) => setSettings((s) => ({ ...s, hints: { ...s.hints, [key]: v } }))} />
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        {/* Difficulty & privacy */}
        <GlassCard className="space-y-4">
          <div>
            <p className="mb-2 font-semibold">Difficulty</p>
            <div className="flex gap-2">
              {(["mixed", "easy", "medium", "hard"] as const).map((d) => (
                <button key={d} onClick={() => { playSfx("click"); setSettings((s) => ({ ...s, difficulty: d })); }}
                  className={cn(
                    "flex-1 rounded-xl px-2 py-2 text-sm font-semibold capitalize transition focus-ring",
                    settings.difficulty === d ? "bg-rose text-white" : "glass text-white/60",
                  )}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">🌏 Public room</p>
              <p className="text-xs text-white/40">Let strangers discover & join</p>
            </div>
            <Switch checked={settings.isPublic} label="Public room"
              onChange={(v) => setSettings((s) => ({ ...s, isPublic: v }))} />
          </div>
        </GlassCard>

        {/* Categories */}
        <GlassCard>
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold">📚 Categories</p>
            <div className="flex items-center gap-2">
              {settings.categoryIds.length > 0 && (
                <button
                  onClick={() => { playSfx("click"); setSettings((s) => ({ ...s, categoryIds: [] })); }}
                  className="rounded-full px-2.5 py-1 text-xs font-semibold text-white/50 hover:text-white focus-ring"
                >
                  Clear
                </button>
              )}
              <Badge>{settings.categoryIds.length === 0 ? "All (random)" : `${settings.categoryIds.length} picked`}</Badge>
            </div>
          </div>
          <p className="mb-3 text-xs text-white/40">
            Pick exactly one topic for a themed game, or several to mix — leave empty for a random surprise!
          </p>
          <div className="max-h-72 space-y-4 overflow-y-auto pr-1">
            {Object.entries(groups).map(([group, cats]) => (
              <div key={group}>
                <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-white/40">{group}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cats.map((c) => (
                    <button key={c.id} onClick={() => toggleCategory(c.id)}
                      aria-pressed={settings.categoryIds.includes(c.id)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-semibold transition focus-ring tap-highlight-none",
                        settings.categoryIds.includes(c.id)
                          ? "bg-rose text-white"
                          : "glass text-white/60 hover:text-white",
                      )}>
                      {c.emoji} {c.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {error && (
          <GlassCard className="border-danger/40 bg-danger/10 py-3 text-sm text-white/80">⚠️ {error}</GlassCard>
        )}
      </motion.div>

      {/* Sticky create button */}
      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-lg px-4 pb-5 sm:max-w-2xl safe-bottom">
        <Button variant="primary" size="xl" className="w-full font-display" onClick={create} disabled={creating}>
          {creating ? <Loader2 className="animate-spin" aria-hidden /> : <Rocket aria-hidden />}
          {creating ? "Creating…" : "Create Room 🎉"}
        </Button>
      </div>
    </main>
  );
}

export default function CreateRoomPage() {
  return (
    <Suspense>
      <CreateRoomInner />
    </Suspense>
  );
}
