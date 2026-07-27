"use client";

import confetti from "canvas-confetti";

const INDIA_COLORS = ["#FF7A1A", "#FFFFFF", "#2BE4A7", "#FF3D81", "#8B5CF6", "#FFC94A"];

export function fireConfetti() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.65 },
    colors: INDIA_COLORS,
    disableForReducedMotion: true,
  });
}

export function fireVictory() {
  const end = Date.now() + 1800;
  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors: INDIA_COLORS,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors: INDIA_COLORS,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export function fireFireworks() {
  const duration = 2400;
  const end = Date.now() + duration;
  const interval = setInterval(() => {
    if (Date.now() > end) return clearInterval(interval);
    confetti({
      particleCount: 60,
      startVelocity: 32,
      spread: 360,
      ticks: 70,
      origin: { x: 0.2 + Math.random() * 0.6, y: 0.2 + Math.random() * 0.3 },
      colors: INDIA_COLORS,
      disableForReducedMotion: true,
    });
  }, 350);
}
