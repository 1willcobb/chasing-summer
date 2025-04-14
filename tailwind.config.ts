import daisyui from "daisyui"
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chicle: ["Chicle", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Chicle", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Poetsen One", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "cupcake", "dark",
    ],
    lightTheme: "cupcake",
    darkTheme: "dark",
  }

} satisfies Config;
