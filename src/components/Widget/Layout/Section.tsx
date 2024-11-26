"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { useWindow } from "@/hooks/useWindow";

interface SectionProps {
  id: string;
  revealAnimation?: boolean;
}

export const Section: React.FC<PropsWithChildren<SectionProps>> = ({
  id,
  children,
  revealAnimation,
}) => {
  const { rect } = useWindow();
  return (
    <motion.div
      id={id}
      initial={
        revealAnimation
          ? {
              opacity: 0,
              scale: 0.95,
            }
          : undefined
      }
      whileInView={
        revealAnimation
          ? {
              opacity: 1,
              scale: 1,
            }
          : undefined
      }
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
        margin: `-${(rect?.height ?? 400) / 3}px`,
      }}
    >
      {children}
    </motion.div>
  );
};
