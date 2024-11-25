import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1E3A8A", // Dark Blue
        accent: "#14B8A6", // Teal
        coral: "#F43F5E", // Coral
        neutral: "#F9FAFB", // Soft Neutral Gray
        textPrimary: "#111827", // Dark Text
        textSecondary: "#6B7280", // Gray Text
        background: "#FFFFFF", // White

        // Dark Mode Colors
        darkPrimary: "#1D4ED8", // Lighter Blue for dark mode
        darkAccent: "#22D3EE", // Vibrant Accent in dark mode
        darkCoral: "#FB7185", // Coral for dark mode
        darkNeutral: "#1F2937", // Dark Neutral Gray
        darkTextPrimary: "#F9FAFB", // Light text for dark mode
        darkTextSecondary: "#9CA3AF", // Soft gray text for dark mode
        darkBackground: "#111827", // Dark background
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
