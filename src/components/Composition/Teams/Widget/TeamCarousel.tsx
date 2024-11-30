"use client";

import { motion } from "framer-motion";
import { RepresentativeCard } from "./RepresentativeCard";
import { TeamItem } from "@/hooks/useTeams";

interface TeamCarouselProps {
  teams?: TeamItem[];
  scrollProgress: number;
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  teams,
  scrollProgress,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {teams?.map((team, index) => {
        const startProgress = index * 0.1;
        const endProgress = (index + 1) * 0.1;
        const range = endProgress - startProgress;

        const progress = (scrollProgress - startProgress) / range;
        const clampedProgress = Math.max(0, Math.min(1, progress));

        let translateX = "100%";

        if (clampedProgress <= 0.4) {
          const stageProgress = clampedProgress / 0.4;
          translateX = `calc(100% - ${stageProgress * 70}%)`;
        } else if (clampedProgress <= 0.6) {
          translateX = "30%";
        } else {
          const stageProgress = (clampedProgress - 0.6) / 0.4;
          translateX = `calc(30% - ${stageProgress * 30}% + ${index * 70}px)`;
        }

        return (
          <motion.div
            key={index}
            initial={{
              x: "100%",
            }}
            animate={{
              x: translateX,
            }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100%",
              zIndex: teams.length + index,
            }}
          >
            <RepresentativeCard representative={team} />
          </motion.div>
        );
      })}
    </div>
  );
};
