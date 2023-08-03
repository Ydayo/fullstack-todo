import { createContext } from "react";

export type DarkModeContextProps = {
  isDarkMode: boolean;
  toggleIsDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextProps>({
  isDarkMode: false,
  toggleIsDarkMode: () => ({}),
});
