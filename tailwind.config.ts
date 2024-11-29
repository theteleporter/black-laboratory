import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'inter': ['var(--font-inter)'],
        'dela-gothic-one': ['var(--font-dela-gothic-one)'],
        'rubik-glitch': ['var(--font-rubik-glitch)'],
        'pixelify-sans': ['var(--font-pixelify-sans)'],
        'faster-one': ['var(--font-faster-one)'],
        'rubik-maze': ['var(--font-rubik-maze)'],
        'honk': ['var(--font-honk)'],
        'bungee-spice': ['var(--font-bungee-spice)'],
        'lacquer': ['var(--font-lacquer)'],
        'kranky': ['var(--font-kranky)'],
        'major-mono-display': ['var(--font-major-mono-display)'],
      },
    },
  },
  plugins: [],
} satisfies Config;