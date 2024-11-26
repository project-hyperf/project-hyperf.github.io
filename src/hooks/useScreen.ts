// import theme from "@/utils/theme";
import { useEffect, useState } from "react";

export const useScreen = () => {
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentScreen = () => {
      const screens = Object.keys(theme.screens);
      const currentWidth = window.innerWidth;
      const currentScreen = screens.find((screen) => {
        const screenValue = theme.screens[screen as keyof typeof theme.screens];
        const screenNumber = parseInt(screenValue);

        return currentWidth <= screenNumber;
      });
      if (!currentScreen) return "full";
      setCurrentScreen(currentScreen);
    };

    getCurrentScreen();
    window.addEventListener("resize", getCurrentScreen);
    return () => window.removeEventListener("resize", getCurrentScreen);
  }, []);

  return { currentScreen };
};
