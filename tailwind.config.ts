import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#DF732D",
        accent: "#c25913",
        secondary: "#e17b37",
        tertiary: "#FBF6ED",
        coral: "#FF6B6B",
        neutral: "#F3F4F6",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
      },
      fontSize: {
        "hero-title": ["3.5rem", "1.2"],
        "cta-lg": ["1.5rem", "2rem"],
        "body-lg": ["1.125rem", "1.75rem"],
      },
      spacing: {
        "hero-padding": "6rem",
        "section-gap": "8rem",
      },
      borderRadius: {
        "btn-lg": "1.5rem",
      },
      boxShadow: {
        "btn-shadow": "0 8px 16px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
