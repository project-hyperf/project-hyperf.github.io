import { useEffect, useState } from "react";
import { headerRef } from "@/components/Widget/GNB/GNB";

export const useHeaderMargin = () => {
  const [GNBHeight, setGNBHeight] = useState(0);
  useEffect(() => {
    if (!headerRef.current) return;
    const updateMargin = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        // const headerHeight = headerRef.current.offsetHeight;
        setGNBHeight(rect.height);
      }
    };

    window.addEventListener("resize", updateMargin);
    updateMargin();

    return () => {
      window.removeEventListener("resize", updateMargin);
    };
  }, []);

  return { GNBHeight };
};
