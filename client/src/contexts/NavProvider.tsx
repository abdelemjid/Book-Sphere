import React, { createContext, useContext, useState } from "react";

interface Props {
  isDisplayed: boolean;
  close: () => void;
  open: () => void;
}

const NavContext = createContext<Props | undefined>(undefined);

export const NavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const close = () => setIsDisplayed(false);
  const open = () => setIsDisplayed(true);

  return <NavContext.Provider value={{ isDisplayed, close, open }}>{children}</NavContext.Provider>;
};

export const useNavContext = (): Props => {
  const context = useContext(NavContext);
  if (!context) throw new Error("useNavContext must used within NavProvider!");

  return context;
};
