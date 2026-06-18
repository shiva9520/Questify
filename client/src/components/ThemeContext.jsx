import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const themes = [
  { id: "forest-light", name: "Forest Light", isDark: false },
  { id: "midnight-slate", name: "Midnight Slate", isDark: true },
  { id: "ocean-breeze", name: "Ocean Breeze", isDark: false },
  { id: "cyber-neon", name: "Cyber Neon", isDark: true }
];

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved && themes.some((t) => t.id === saved)) {
      return saved;
    }
    return "forest-light";
  });

  const setTheme = (newTheme) => {
    if (themes.some((t) => t.id === newTheme)) {
      setThemeState(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Add/remove a dark class on body if needed for some styles
    const themeObj = themes.find((t) => t.id === theme);
    if (themeObj?.isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
