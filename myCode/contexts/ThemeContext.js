import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ startingTheme, children }) {
  const [theme, setTheme] = useState(startingTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
