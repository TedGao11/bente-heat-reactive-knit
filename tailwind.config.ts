import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "./site.config.ts", "./content/**/*.md"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f6ff", 100: "#e0edff", 200: "#c7ddfe", 300: "#a4c7fc",
          400: "#7aa8f8", 500: "#5a8bf2", 600: "#3f6ce5", 700: "#3356c7",
          800: "#2c47a0", 900: "#293f7f",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans SC", "sans-serif"],
      },
      maxWidth: { content: "1200px" },
    },
  },
  plugins: [],
} satisfies Config;
