import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(248 45% 5%)",
        surface: "hsl(248 35% 9%)",
        card: "hsl(249 30% 12%)",
        border: "hsl(250 25% 22%)",
        primary: {
          DEFAULT: "hsl(265 90% 62%)",
          foreground: "#fff",
        },
        saffron: {
          DEFAULT: "#FF7A1A",
          soft: "#FFB25C",
        },
        rose: { DEFAULT: "#FF3D81" },
        peacock: { DEFAULT: "#2AB8F6" },
        mint: { DEFAULT: "#2BE4A7" },
        gold: { DEFAULT: "#FFC94A" },
        danger: { DEFAULT: "#FF4D5E" },
        muted: "hsl(250 15% 62%)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        glow: "0 0 40px -8px hsl(265 90% 62% / 0.5)",
        "glow-orange": "0 0 40px -8px rgba(255,122,26,0.5)",
        "glow-pink": "0 0 40px -8px rgba(255,61,129,0.5)",
        glass: "0 8px 32px rgba(0,0,0,0.35)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "india-gradient":
          "linear-gradient(135deg, #FF7A1A 0%, #FF3D81 40%, #8B5CF6 75%, #2AB8F6 100%)",
        "royal-gradient": "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 50%, #4C1D95 100%)",
        "sunset-gradient": "linear-gradient(135deg, #FF7A1A 0%, #FF3D81 100%)",
        "ocean-gradient": "linear-gradient(135deg, #2AB8F6 0%, #8B5CF6 100%)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 24px -6px hsl(265 90% 62% / 0.55)" },
          "50%": { boxShadow: "0 0 48px -6px hsl(265 90% 62% / 0.85)" },
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "gradient-x": "gradientShift 6s ease infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
