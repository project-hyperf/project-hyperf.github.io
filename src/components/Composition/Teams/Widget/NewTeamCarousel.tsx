"use client";
import React, { useState } from "react";
import { TeamCarouselThumb } from "./TeamCarouselThumb";
import { TeamItem } from "@/hooks/useTeams";
import classNames from "classnames";
import { motion } from "framer-motion";
import { RepresentativeCard } from "./RepresentativeCard";

interface TeamCarouselType {
  teams?: TeamItem[];
}

export const NewTeamCarousel: React.FC<TeamCarouselType> = ({ teams }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const onThumbClick = (index: number) => {
    setSelectedIndex(index);
  };

  if (!teams) return null;

  // 그리드 아이템 애니메이션을 위한 variants
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <div className="max-w-[1552px] mx-auto flex flex-row-reverse gap-[96px] justify-center items-stretch">
      {selectedIndex !== -1 && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="flex-1"
          key={selectedIndex}
        >
          <RepresentativeCard representative={teams[selectedIndex]} />
        </motion.div>
      )}

      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="show"
        className=""
      >
        <div className="">
          <motion.div className="max-w-[632px] aspect-square grid grid-cols-3 grid-rows-3 gap-4">
            {Array.from({ length: 9 }).map((_, idx) => {
              const buttonPositions = [1, 2, 3, 4, 6, 8];
              const teamIndex = buttonPositions.indexOf(idx);

              if (teamIndex === -1) {
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-[#F4F4F4] aspect-square"
                  />
                );
              }
              if (!teams) return null;

              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={classNames(
                    "bg-[#D9D9D9] w-[200px] aspect-square",
                    selectedIndex === teamIndex ? "" : "grayscale",
                  )}
                >
                  <TeamCarouselThumb
                    key={teams?.[teamIndex]?.university}
                    onClick={() => onThumbClick(teamIndex)}
                    selected={teamIndex === selectedIndex}
                    team={teams[teamIndex]}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
