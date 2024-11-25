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
        primary: {
          DEFAULT: "hsl(215, 60%, 45%)", // Set default to primary-500
          50: "hsl(215, 60%, 95%)", // Light Blue
          100: "hsl(215, 60%, 85%)",
          200: "hsl(215, 60%, 75%)",
          300: "hsl(215, 60%, 65%)",
          400: "hsl(215, 60%, 55%)",
          500: "hsl(215, 60%, 45%)", // Base
          600: "hsl(215, 60%, 35%)",
          700: "hsl(215, 60%, 25%)",
          800: "hsl(215, 60%, 15%)",
          900: "hsl(215, 60%, 10%)", // Darkest
        },
        secondary: {
          DEFAULT: "hsl(170, 60%, 45%)",
          50: "hsl(170, 60%, 95%)", // Light Teal
          100: "hsl(170, 60%, 85%)",
          200: "hsl(170, 60%, 75%)",
          300: "hsl(170, 60%, 65%)",
          400: "hsl(170, 60%, 55%)",
          500: "hsl(170, 60%, 45%)", // Base
          600: "hsl(170, 60%, 35%)",
          700: "hsl(170, 60%, 25%)",
          800: "hsl(170, 60%, 15%)",
          900: "hsl(170, 60%, 10%)", // Darkest
        },
        tertiary: {
          DEFAULT: "hsl(345, 75%, 45%)",
          50: "hsl(345, 75%, 95%)", // Light Coral
          100: "hsl(345, 75%, 85%)",
          200: "hsl(345, 75%, 75%)",
          300: "hsl(345, 75%, 65%)",
          400: "hsl(345, 75%, 55%)",
          500: "hsl(345, 75%, 45%)", // Base
          600: "hsl(345, 75%, 35%)",
          700: "hsl(345, 75%, 25%)",
          800: "hsl(345, 75%, 15%)",
          900: "hsl(345, 75%, 10%)", // Darkest
        },
        neutral: {
          DEFAULT: "hsl(0, 0%, 50%)",
          50: "hsl(0, 0%, 98%)", // Light Gray
          100: "hsl(0, 0%, 90%)",
          200: "hsl(0, 0%, 80%)",
          300: "hsl(0, 0%, 70%)",
          400: "hsl(0, 0%, 60%)",
          500: "hsl(0, 0%, 50%)", // Base
          600: "hsl(0, 0%, 40%)",
          700: "hsl(0, 0%, 30%)",
          800: "hsl(0, 0%, 20%)",
          900: "hsl(0, 0%, 10%)", // Darkest
        },
        textPrimary: {
          DEFAULT: "hsl(220, 15%, 50%)",
          50: "hsl(220, 15%, 98%)", // Almost White
          100: "hsl(220, 15%, 90%)",
          200: "hsl(220, 15%, 80%)",
          300: "hsl(220, 15%, 70%)",
          400: "hsl(220, 15%, 60%)",
          500: "hsl(220, 15%, 50%)", // Base
          600: "hsl(220, 15%, 40%)",
          700: "hsl(220, 15%, 30%)",
          800: "hsl(220, 15%, 20%)",
          900: "hsl(220, 15%, 10%)", // Darkest
        },
        textSecondary: {
          DEFAULT: "hsl(210, 10%, 40%)",
          50: "hsl(210, 10%, 96%)", // Off White
          100: "hsl(210, 10%, 88%)",
          200: "hsl(210, 10%, 76%)",
          300: "hsl(210, 10%, 64%)",
          400: "hsl(210, 10%, 52%)",
          500: "hsl(210, 10%, 40%)", // Base
          600: "hsl(210, 10%, 32%)",
          700: "hsl(210, 10%, 24%)",
          800: "hsl(210, 10%, 16%)",
          900: "hsl(210, 10%, 10%)", // Darker
        },
        background: {
          DEFAULT: "hsl(0, 0%, 75%)",
          50: "hsl(0, 0%, 99%)", // Almost White
          100: "hsl(0, 0%, 95%)",
          200: "hsl(0, 0%, 90%)",
          300: "hsl(0, 0%, 85%)",
          400: "hsl(0, 0%, 80%)",
          500: "hsl(0, 0%, 75%)", // Base
          600: "hsl(0, 0%, 65%)",
          700: "hsl(0, 0%, 55%)",
          800: "hsl(0, 0%, 45%)",
          900: "hsl(0, 0%, 35%)", // Darker Background
        },
        coral: {
          DEFAULT: "hsl(5, 75%, 45%)",
          50: "hsl(5, 75%, 95%)", // Light Coral
          100: "hsl(5, 75%, 85%)",
          200: "hsl(5, 75%, 75%)",
          300: "hsl(5, 75%, 65%)",
          400: "hsl(5, 75%, 55%)",
          500: "hsl(5, 75%, 45%)", // Base
          600: "hsl(5, 75%, 35%)",
          700: "hsl(5, 75%, 25%)",
          800: "hsl(5, 75%, 15%)",
          900: "hsl(5, 75%, 10%)", // Darkest Coral
        },
        accent: {
          DEFAULT: "hsl(160, 65%, 45%)",
          50: "hsl(160, 65%, 95%)", // Light Accent
          100: "hsl(160, 65%, 85%)",
          200: "hsl(160, 65%, 75%)",
          300: "hsl(160, 65%, 65%)",
          400: "hsl(160, 65%, 55%)",
          500: "hsl(160, 65%, 45%)", // Base
          600: "hsl(160, 65%, 35%)",
          700: "hsl(160, 65%, 25%)",
          800: "hsl(160, 65%, 15%)",
          900: "hsl(160, 65%, 10%)", // Darkest Accent
        },

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
