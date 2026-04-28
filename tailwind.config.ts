import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        cbf: {
          black: "#0A0A0A",
          anthracite: "#1A1A2E",
          ivory: "#FAF7F0",
          gold: "#B8860B",
          "gold-light": "#D4A537",
          "gold-dark": "#8B6508",
          navy: "#001E8C",
          gray: "#2D2D2D",
          "gray-light": "#6B6B6B",
          "gray-soft": "#E5E5E5",
          white: "#FFFFFF",
          success: "#0F8A4D",
          warning: "#D97706",
          danger: "#B91C1C",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.7s ease-out",
        shimmer: "shimmer 2s infinite linear",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #B8860B 0%, #D4A537 50%, #B8860B 100%)",
        "dark-gradient":
          "linear-gradient(180deg, #0A0A0A 0%, #1A1A2E 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
