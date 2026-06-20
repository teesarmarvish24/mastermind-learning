import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1626",
          950: "#040A14",
          900: "#0A1626",
          850: "#0F1F35",
          800: "#16304E",
          700: "#1E3F66",
          600: "#2B5483",
          500: "#3F6FA3",
          400: "#6A93BE",
          300: "#9CBADA",
          200: "#C9DAEC",
          100: "#E4ECF6",
          50: "#F4F8FC",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      keyframes: {
        driftA: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(40px,-30px) scale(1.08)" },
        },
        driftB: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-50px,40px) scale(1.12)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 0 1px rgba(10,22,38,0.08), 0 8px 30px -8px rgba(16,48,78,0.18)" },
          "50%": { boxShadow: "0 0 0 1px rgba(10,22,38,0.1), 0 14px 44px -8px rgba(16,48,78,0.32)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        driftA: "driftA 14s ease-in-out infinite",
        driftB: "driftB 16s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s cubic-bezier(.16,.8,.3,1) both",
        fadeIn: "fadeIn 0.5s ease both",
        glowPulse: "glowPulse 4s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
