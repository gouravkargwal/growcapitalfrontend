"use client";

import { ThemeContext } from "@/Context/ThemeContext";
import { useContext } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-primary-light dark:bg-primary-dark text-white"
    >
      {theme === "light" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
};

export default ThemeToggle;
