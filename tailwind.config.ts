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
          assistive: "#6E68BA",
          neautral: "#EFEFEF",
        },
        label: {
          normal: "#171719",
          strong: "#000",
          assistive: "#C7C8C9",
          neautral: "#47484C",
          alternative: "#858588",
          dissabled: "#DFDFE0",
        },
        background: {
          normal: "#fff",
          alternative: "#F7F7F8",
        },
        line: {
          nomral: "#DFDFDF",
          neutral: "#F7F7F8",
          alternative: "#F4F4F5",
        },
        inverse: {
          primary: "#0D00B5",
          background: "#6541F2",
          alternative: "#fff",
        },
        "elevation-shadow": {
          primary: "#0D00B5",
          background: "#6541F2",
          alternative: "#fff",
        },
        tag: {
          primary: "#5142F8",
        },
      },
      backgroundImage: {
        "primary-assistive": "linear-gradient(90deg, #C81CCC 0%, #0D00B5 100%)",
        "primary-assistive-vertical":
          "linear-gradient(180deg, #0D00B5 0%, #C81CCC 100%)",
        "primary-bg": "linear-gradient(180deg, #6541F2 0%, #0D00B5 100%)",
      },
      border: {
        primary: "linear-gradient(90deg, #C81CCC 0%, #0D00B5 100%)",
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
