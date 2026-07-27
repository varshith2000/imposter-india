"use client";

/* ------------------------------------------------------------------ */
/*  Lightweight Web-Audio sound engine. No audio assets needed —       */
/*  every SFX is synthesised (Indian-inspired pentatonic tones).       */
/* ------------------------------------------------------------------ */

type SfxName =
  | "click"
  | "tick"
  | "reveal"
  | "vote"
  | "victory"
  | "defeat"
  | "join"
  | "whoosh"
  | "confetti";

let ctx: AudioContext | null = null;
const MUTE_KEY = "wti-muted";

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function isMuted(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(MUTE_KEY) === "1";
}

export function setMuted(m: boolean) {
  localStorage.setItem(MUTE_KEY, m ? "1" : "0");
  window.dispatchEvent(new CustomEvent("wti-mute-changed"));
}

function tone(
  freq: number,
  opts: { t?: number; dur?: number; type?: OscillatorType; gain?: number; slide?: number } = {},
) {
  const c = getCtx();
  if (!c) return;
  const { t = 0, dur = 0.15, type = "sine", gain = 0.12, slide } = opts;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  const start = c.currentTime + t;
  osc.frequency.setValueAtTime(freq, start);
  if (slide) osc.frequency.exponentialRampToValueAtTime(slide, start + dur);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g).connect(c.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

/* Raga Bhupali-ish pentatonic: Sa Re Ga Pa Dha */
const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

export function playSfx(name: SfxName) {
  if (isMuted()) return;
  switch (name) {
    case "click":
      tone(520, { dur: 0.06, type: "triangle", gain: 0.08 });
      break;
    case "tick":
      tone(880, { dur: 0.05, type: "square", gain: 0.05 });
      break;
    case "join":
      tone(SCALE[0], { dur: 0.12, type: "triangle" });
      tone(SCALE[2], { t: 0.09, dur: 0.14, type: "triangle" });
      break;
    case "whoosh":
      tone(300, { dur: 0.25, type: "sawtooth", gain: 0.05, slide: 900 });
      break;
    case "reveal":
      tone(SCALE[0], { dur: 0.14, type: "sine" });
      tone(SCALE[2], { t: 0.1, dur: 0.14 });
      tone(SCALE[4], { t: 0.2, dur: 0.22 });
      break;
    case "vote":
      tone(420, { dur: 0.1, type: "triangle", gain: 0.1 });
      tone(560, { t: 0.07, dur: 0.12, type: "triangle", gain: 0.1 });
      break;
    case "victory":
      [0, 2, 4, 5, 7].forEach((n, i) => tone(SCALE[n], { t: i * 0.12, dur: 0.28, type: "triangle", gain: 0.14 }));
      tone(SCALE[7] * 2, { t: 0.62, dur: 0.5, type: "sine", gain: 0.1 });
      break;
    case "defeat":
      tone(330, { dur: 0.3, type: "sawtooth", gain: 0.07, slide: 180 });
      tone(220, { t: 0.25, dur: 0.45, type: "sawtooth", gain: 0.07, slide: 110 });
      break;
    case "confetti":
      [4, 5, 7].forEach((n, i) => tone(SCALE[n], { t: i * 0.07, dur: 0.16, type: "triangle", gain: 0.1 }));
      break;
  }
}
