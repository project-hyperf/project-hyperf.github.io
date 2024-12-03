"use client";
import React, { useEffect, useRef, useState } from "react";
import { TeamCarouselThumb } from "./TeamCarouselThumb";
import { TeamItem } from "@/hooks/useTeams";
import classNames from "classnames";
import { motion, useInView } from "framer-motion";
import { RepresentativeCard } from "./RepresentativeCard";

interface TeamCarouselType {
  teams?: TeamItem[];
}

export const NewTeamCarousel: React.FC<TeamCarouselType> = ({ teams }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: "some" });
  useEffect(() => {
    if (isInView) {
      console.log(isInView);
    }
  }, [isInView]);
  const onThumbClick = (index: number) => {
    setSelectedIndex(index);
  };

  if (!teams) return null;

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
  const calculateGradientColors = (idx: number) => {
    const startColor = { r: 13, g: 0, b: 181 };
    const endColor = { r: 200, g: 28, b: 204 };

    const row = Math.floor(idx / 3);

    const startPosition = row / 4;
    const endPosition = (row + 1) / 2;

    const startR = Math.round(
      startColor.r + (endColor.r - startColor.r) * startPosition,
    );
    const startG = Math.round(
      startColor.g + (endColor.g - startColor.g) * startPosition,
    );
    const startB = Math.round(
      startColor.b + (endColor.b - startColor.b) * startPosition,
    );

    const endR = Math.round(
      startColor.r + (endColor.r - startColor.r) * endPosition,
    );
    const endG = Math.round(
      startColor.g + (endColor.g - startColor.g) * endPosition,
    );
    const endB = Math.round(
      startColor.b + (endColor.b - startColor.b) * endPosition,
    );

    return `linear-gradient(180deg, rgb(${startR}, ${startG}, ${startB}), rgb(${endR}, ${endG}, ${endB}))`;
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
        ref={containerRef}
      >
        <div className="">
          <motion.div className="max-w-[632px] aspect-square grid grid-cols-3 grid-rows-3 gap-4 relative">
            {Array.from({ length: 9 }).map((_, idx) => {
              const buttonPositions = [1, 2, 3, 4, 6, 8];
              const teamIndex = buttonPositions.indexOf(idx);

              const sectionGradient = calculateGradientColors(idx);

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
                  className="relative group"
                >
                  <div
                    className={classNames(
                      "w-[200px] aspect-square",
                      selectedIndex === teamIndex ? "" : "grayscale",
                    )}
                  >
                    <TeamCarouselThumb
                      key={teams?.[teamIndex]?.university}
                      onClick={() => onThumbClick(teamIndex)}
                      selected={teamIndex === selectedIndex}
                      team={teams[teamIndex]}
                    />
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.26] transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: sectionGradient,
                      // backgroundBlendMode: "overlay",
                    }}
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
