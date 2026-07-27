"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { playSfx } from "@/lib/sound";

const buttonVariants = cva(
  "ripple tap-highlight-none inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-india-gradient bg-[length:200%_200%] animate-gradient-x text-white shadow-glow-pink hover:brightness-110",
        royal: "bg-royal-gradient text-white shadow-glow hover:brightness-110",
        sunset: "bg-sunset-gradient text-white shadow-glow-orange hover:brightness-110",
        glass: "glass text-white hover:bg-white/[0.1] hover:border-white/20",
        ghost: "text-white/80 hover:text-white hover:bg-white/[0.06]",
        outline: "border border-white/20 text-white hover:bg-white/[0.06]",
        danger: "bg-danger/90 text-white hover:bg-danger shadow-[0_0_30px_-8px_rgba(255,77,94,0.5)]",
        gold: "bg-gradient-to-br from-gold to-saffron text-black shadow-glow-orange hover:brightness-110",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-xl",
        md: "h-11 px-6 text-sm rounded-2xl",
        lg: "h-13 px-8 py-3.5 text-base rounded-2xl",
        xl: "h-16 px-10 text-lg rounded-3xl",
        icon: "h-11 w-11 rounded-2xl",
      },
    },
    defaultVariants: { variant: "glass", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  silent?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, silent, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!silent) playSfx("click");
      // ripple ink
      const btn = e.currentTarget;
      const ink = document.createElement("span");
      ink.className = "ripple-ink";
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ink.style.width = ink.style.height = `${size}px`;
      ink.style.left = `${e.clientX - rect.left - size / 2}px`;
      ink.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ink);
      setTimeout(() => ink.remove(), 650);
      onClick?.(e);
    };
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={handleClick}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
