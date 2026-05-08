/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0B0F19",
        "bg-secondary": "#111827",
        "bg-card": "#0F172A",
        gold: {
          DEFAULT: "#F59E0B",
          bright: "#FBBF24",
          dark: "#D97706",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass:
          "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "glass-lg":
          "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
        "gold-glow": "0 0 20px rgba(245, 158, 11, 0.3)",
        "gold-glow-lg": "0 0 40px rgba(245, 158, 11, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
