"use client";
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({
        width,
        height,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 사이즈 설정

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowSize.width >= 360 && windowSize.width <= 768;
  const isDesktop = windowSize.width >= 769;

  return { ...windowSize, isMobile, isDesktop };
};
