import React, { createContext, useContext, useState } from "react";

type ThemeType = "dark" | "light";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: {
    gradient: [string, string, string];
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    navBg: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const colors = {
    gradient: theme === "dark" 
      ? (["#3b0a12", "#21060b", "#120305"] as [string, string, string])
      : (["#f9f0f2", "#e8d5db", "#d4b8c2"] as [string, string, string]),
    cardBg: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    textPrimary: theme === "dark" ? "#FFFFFF" : "#1a0509",
    textSecondary: theme === "dark" ? "#D4B2B5" : "#61152B",
    border: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
    navBg: theme === "dark" ? "#1E0307" : "#e0c5cd",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme duhet të përdoret brenda ThemeProvider");
  return context;
}