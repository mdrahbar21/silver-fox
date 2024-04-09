import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, ChangeEvent } from "react";

interface StateContextType {
  currentColor: string;
  currentMode: string;
  activeMenu: boolean;
  screenSize: number | undefined;
  setScreenSize: Dispatch<SetStateAction<number | undefined>>;
  handleClick: (clicked: keyof typeof initialState) => void;
  isClicked: typeof initialState;
  setIsClicked: Dispatch<SetStateAction<typeof initialState>>;
  setActiveMenu: Dispatch<SetStateAction<boolean>>;
  setCurrentColor: Dispatch<SetStateAction<string>>;
  setCurrentMode: Dispatch<SetStateAction<string>>;
  setMode: (e: ChangeEvent<HTMLInputElement>) => void;
  setColor: (color: string) => void;
  themeSettings: boolean;
  setThemeSettings: Dispatch<SetStateAction<boolean>>;
}

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e: ChangeEvent<HTMLInputElement>) => {
    const mode = e.target.value;
    setCurrentMode(mode);
    localStorage.setItem("themeMode", mode);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked: keyof typeof initialState) => {
    setIsClicked(prev => ({ ...prev, [clicked]: !prev[clicked] }));
  };

  return (
    <StateContext.Provider value={{
      currentColor,
      currentMode,
      activeMenu,
      screenSize,
      setScreenSize,
      handleClick,
      isClicked,
      setIsClicked,
      setActiveMenu,
      setCurrentColor,
      setCurrentMode,
      setMode,
      setColor,
      themeSettings,
      setThemeSettings,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a ContextProvider");
  }
  return context;
};
