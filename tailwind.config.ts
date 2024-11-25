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
        primary: "#007BFF", // Vibrant Blue (Lively for buttons and links)
        accent: "#38D9A9", // Vibrant Green (For success and positive actions)
        coral: "#FF6B6B", // Vibrant Coral (For call-to-action buttons)
        neutral: "#F3F4F6", // Light gray for backgrounds and content
        textPrimary: "#111827", // Darker text for contrast (improves readability)
        textSecondary: "#6B7280", // Medium gray for secondary text
      },
      fontSize: {
        "hero-title": ["3.5rem", "1.2"], // Bolder, larger font for hero sections
        "cta-lg": ["1.5rem", "2rem"], // Larger call-to-action buttons
        "body-lg": ["1.125rem", "1.75rem"], // Comfortable large body text
      },
      spacing: {
        "hero-padding": "6rem", // Padding for hero section to ensure spacing
        "section-gap": "8rem", // Bigger gap between sections for clarity
      },
      borderRadius: {
        "btn-lg": "1.5rem", // Rounded buttons for a polished, modern look
      },
      boxShadow: {
        "btn-shadow": "0 8px 16px rgba(0, 0, 0, 0.2)", // Stronger shadow for button prominence
      },
    },
  },
  plugins: [],
};

export default config;