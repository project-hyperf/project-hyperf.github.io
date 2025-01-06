// app/providers/LenisProvider.tsx
"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    lenisLockScroll?: () => void;
    lenisUnlockScroll?: () => void;
  }
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  useEffect(() => {
    const lenisInstance = new Lenis({
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setLenis(lenisInstance);

    // 전역 함수 할당
    window.lenisLockScroll = () => {
      lenisInstance.stop();
      document.body.classList.add("scroll-locked");
    };

    window.lenisUnlockScroll = () => {
      lenisInstance.start();
      document.body.classList.remove("scroll-locked");
    };

    return () => {
      lenisInstance.destroy();
      delete window.lenisLockScroll;
      delete window.lenisUnlockScroll;
    };
  }, []);
  return (
    <>
      {children}
      <style jsx global>{`
        body.scroll-locked {
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}
