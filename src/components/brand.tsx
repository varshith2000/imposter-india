"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Logo({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizes = {
    sm: { icon: "h-9 w-9 text-lg", text: "text-lg" },
    md: { icon: "h-12 w-12 text-2xl", text: "text-2xl" },
    lg: { icon: "h-20 w-20 text-4xl", text: "text-4xl sm:text-5xl" },
  }[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.div
        whileHover={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 0.5 }}
        className={cn(
          "flex items-center justify-center rounded-2xl bg-india-gradient shadow-glow-pink",
          sizes.icon,
        )}
        aria-hidden
      >
        🕵️
      </motion.div>
      <div className="leading-tight">
        <p className={cn("font-display font-extrabold tracking-tight", sizes.text)}>
          Who&apos;s The <span className="text-gradient">Imposter?</span>
        </p>
        {size === "lg" && (
          <p className="mt-1 text-sm font-medium tracking-[0.3em] text-saffron uppercase">
            India Edition
          </p>
        )}
      </div>
    </div>
  );
}

export function PlayerAvatar({
  emoji,
  name,
  size = "md",
  ring,
  dead,
  className,
}: {
  emoji: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  ring?: "host" | "self" | "danger" | "none";
  dead?: boolean;
  className?: string;
}) {
  const s = {
    sm: "h-9 w-9 text-lg",
    md: "h-12 w-12 text-2xl",
    lg: "h-16 w-16 text-3xl",
    xl: "h-24 w-24 text-5xl",
  }[size];
  const rings = {
    host: "ring-2 ring-gold shadow-glow-orange",
    self: "ring-2 ring-peacock",
    danger: "ring-2 ring-danger",
    none: "",
  }[ring ?? "none"];
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full glass-strong",
        s,
        rings,
        dead && "opacity-40 grayscale",
        className,
      )}
      role="img"
      aria-label={name ? `${name}'s avatar` : "avatar"}
    >
      <span aria-hidden>{emoji}</span>
      {dead && (
        <span className="absolute -right-1 -top-1 text-sm" aria-label="eliminated">
          💀
        </span>
      )}
    </div>
  );
}
