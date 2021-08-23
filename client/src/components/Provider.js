import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeProviderContext = ({ children }) => {
  const [theme, setThemeC] = useState("light");
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setThemeC: () => setThemeC(theme === "dark" ? "light" : "dark"),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProviderContext;
