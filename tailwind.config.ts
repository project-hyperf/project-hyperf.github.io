import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          normal: "#0D00B5",
          strong: "#C81CCC",
        },
        label: {
          normal: "#000",
          strong: "#fff",
          assistive: "#000",
          neautral: "#000",
          alternative: "#000",
          dissabled: "#000",
        },
      },
      backgroundImage: {
        "primary-assistive": "linear-gradient(90deg, #C81CCC 0%, #0D00B5 100%)",
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
