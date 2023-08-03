import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./Context";

type DarkModeProviderProps = {
  children: React.ReactNode;
};

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleIsDarkMode = () => {
    const isDarkModePreffered = localStorage.getItem("THEME") === "DARK";

    if (isDarkModePreffered) {
      setIsDarkMode(false);
      localStorage.setItem("THEME", "LIGHT");
    } else {
      setIsDarkMode(true);
      localStorage.setItem("THEME", "DARK");
    }

    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const isDarkModePreffered = localStorage.getItem("THEME") === "DARK";
    const isDarkModePrefferedInSystem = window.matchMedia(
      "(prefers-colors-scheme: dark)"
    ).matches;
    const isThemeSet = "THEME" in localStorage;

    if (!isThemeSet && !isDarkModePrefferedInSystem) {
      setIsDarkMode(false);
      return;
    }

    if (!isThemeSet && isDarkModePrefferedInSystem) {
      setIsDarkMode(true);
      return;
    }

    if (isThemeSet && !isDarkModePreffered) {
      setIsDarkMode(false);
      return;
    }

    if (isThemeSet && isDarkModePreffered) {
      setIsDarkMode(true);
      return;
    }

    // if (isDarkModePreffered) {
    //   setIsDarkMode(true);
    // }
    // if (!isDarkModePreffered) {
    //   setIsDarkMode(false);
    // }
  }, []);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-colors-scheme: dark)");

    const handlePrefferedColorSchemeChange = (event: MediaQueryListEvent) => {
      const isThemeSet = "THEME" in localStorage;
      if (isThemeSet) return;
      setIsDarkMode(event.matches);
    };

    mediaQueryList.addEventListener("change", handlePrefferedColorSchemeChange);
    return () =>
      mediaQueryList.removeEventListener(
        "change",
        handlePrefferedColorSchemeChange
      );
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => useContext(DarkModeContext);
