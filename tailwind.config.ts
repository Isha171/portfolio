import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem",
        md: ".375rem",
        sm: ".1875rem",
      },
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border: "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border: "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border: "var(--destructive-border)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)"
        },
        neon: {
          purple: "#A855F7",
          "purple-dark": "#7E22CE",
          blue: "#3B82F6",
          "blue-dark": "#2563EB",
          cyan: "#06B6D4",
          pink: "#EC4899",
          "pink-dark": "#DB2777",
          green: "#10B981",
          red: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "var(--font-sans)"],
        mono: ["JetBrains Mono", "var(--font-mono)"],
        serif: ["var(--font-serif)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            opacity: "1",
            filter: "drop-shadow(0 0 20px currentColor)"
          },
          "50%": { 
            opacity: "0.8",
            filter: "drop-shadow(0 0 40px currentColor)"
          },
        },
        "neon-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            opacity: "1",
            textShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor"
          },
          "20%, 24%, 55%": {
            opacity: "0.4",
            textShadow: "none"
          },
        },
        "grid-flow": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(50px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-3px, 3px)" },
          "40%": { transform: "translate(-3px, -3px)" },
          "60%": { transform: "translate(3px, 3px)" },
          "80%": { transform: "translate(3px, -3px)" },
          "100%": { transform: "translate(0)" },
        },
        "glitch-skew": {
          "0%": { transform: "skew(0deg)" },
          "20%": { transform: "skew(2deg)" },
          "40%": { transform: "skew(-1deg)" },
          "60%": { transform: "skew(3deg)" },
          "80%": { transform: "skew(-2deg)" },
          "100%": { transform: "skew(0deg)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        "rave-hue": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        "border-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "cursor-trail": {
          "0%": { opacity: "0.6", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.3)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "neon-flicker": "neon-flicker 1.5s infinite",
        "grid-flow": "grid-flow 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "glitch-skew": "glitch-skew 0.5s ease-in-out",
        "scan-line": "scan-line 8s linear infinite",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
        "rave-hue": "rave-hue 3s linear infinite",
        "border-flow": "border-flow 3s ease infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "cursor-trail": "cursor-trail 0.6s ease-out forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "neon-gradient": "linear-gradient(135deg, #A855F7, #3B82F6, #EC4899)",
        "rave-gradient": "linear-gradient(45deg, #7E22CE, #2563EB, #06B6D4, #EC4899)",
      },
      boxShadow: {
        "neon-purple": "0 0 5px #A855F7, 0 0 20px #A855F7, 0 0 40px #7E22CE",
        "neon-blue": "0 0 5px #3B82F6, 0 0 20px #3B82F6, 0 0 40px #2563EB",
        "neon-pink": "0 0 5px #EC4899, 0 0 20px #EC4899, 0 0 40px #DB2777",
        "neon-cyan": "0 0 5px #06B6D4, 0 0 20px #06B6D4, 0 0 40px #0891B2",
        "glow-sm": "0 0 10px currentColor",
        "glow-md": "0 0 20px currentColor",
        "glow-lg": "0 0 40px currentColor",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
