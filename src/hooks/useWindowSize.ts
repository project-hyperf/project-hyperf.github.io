import { useEffect, useState } from "react";

export const useWindowSize = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

// 자주 사용하는 미디어쿼리를 위한 훅
export const useIsMobile = () => {
  return useWindowSize("(max-width: 768px)");
};
