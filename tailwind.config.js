/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFF7D6", // Light yellow
          DEFAULT: "#FFD700", // Golden yellow
          dark: "#CCAA00", // Deep yellow
        },
        secondary: {
          light: "#FFFAF0", // Subtle off-white
          DEFAULT: "#FFE4B5", // Light gold
          dark: "#C8B37A", // Muted gold
        },
        neutral: {
          light: "#F5F5F5", // Background neutral
          DEFAULT: "#D9D9D9", // Neutral gray
          dark: "#A6A6A6", // Dark gray
        },
        danger: "#FF4D4F", // Red for alerts or errors
        success: "#52C41A", // Green for success messages
        warning: "#FAAD14", // Orange for warnings
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
        mono: ["Fira Code", "monospace"], // Great for coding contexts
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        full: "9999px",
      },
      boxShadow: {
        yellowGlow:
          "0 4px 6px -1px rgba(255, 215, 0, 0.2), 0 2px 4px -2px rgba(255, 215, 0, 0.1)",
      },

      keyframes: {
        'ping-cube': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.5' },
        },
      },
      animation: {
        'ping-cube': 'ping-cube 0.8s infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".btn": {
          padding: "0.5rem 1rem",
          borderRadius: theme("borderRadius.DEFAULT"),
          fontWeight: "600",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.2s, transform 0.2s",
        },
        ".btn-primary": {
          backgroundColor: theme("colors.primary.DEFAULT"),
          color: "#fff",
          "&:hover": {
            backgroundColor: theme("colors.primary.dark"),
            transform: "scale(1.05)",
          },
        },
        ".btn-secondary": {
          backgroundColor: theme("colors.secondary.DEFAULT"),
          color: "#333",
          "&:hover": {
            backgroundColor: theme("colors.secondary.dark"),
            transform: "scale(1.05)",
          },
        },
      });
    }),
  ],
};
