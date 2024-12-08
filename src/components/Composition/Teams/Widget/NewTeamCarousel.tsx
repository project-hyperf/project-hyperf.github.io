"use client";
import React, { useEffect, useRef, useState } from "react";
import { TeamCarouselThumb } from "./TeamCarouselThumb";
import { TeamItem } from "@/hooks/useTeams";
import classNames from "classnames";
import { motion, useInView } from "framer-motion";
import { RepresentativeCard } from "./RepresentativeCard";
import { useDisclosure } from "@nextui-org/react";
import { RepresentativeModal } from "./RepresentativeModal";
import { useIsMobile } from "@/hooks/useWindowSize";

interface TeamCarouselType {
  teams?: TeamItem[];
}
const MOBILELENGTH = 8;
const DESKTOPLENGTH = 9;
export const NewTeamCarousel: React.FC<TeamCarouselType> = ({ teams }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const representative = useDisclosure();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(containerRef, { once: true, amount: "some" });

  useEffect(() => {
    if (!representative.isOpen) {
      setSelectedIndex(-1);
    }
  }, [representative.isOpen]);

  const onThumbClick = (index: number) => {
    if (isMobile) {
      setSelectedIndex(index);
      representative.onOpen();
    } else {
      setSelectedIndex(index);
    }
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
  console.log("teams", teams);
  return (
    <div className="max-w-[1552px] mx-auto flex flex-row-reverse flex-wrap-reverse gap-[96px] justify-center items-stretch">
      {selectedIndex !== -1 && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="flex-1 max-w-[668px] max-md:hidden"
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
          <motion.div className="max-w-[632px] md:aspect-square grid grid-cols-3 grid-rows-3 gap-4 relative max-md:grid-cols-2 max-md:w-full">
            {Array.from({
              length: isMobile ? MOBILELENGTH : DESKTOPLENGTH,
            }).map((_, idx) => {
              const buttonPositions = isMobile
                ? [0, 1, 3, 4, 6, 7]
                : [1, 2, 3, 4, 6, 8];

              const teamIndex = buttonPositions.indexOf(idx);

              const sectionGradient = calculateGradientColors(idx);

              if (teamIndex === -1) {
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-[#F4F4F4] aspect-square max-md:w-[152px]"
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
                      "md:w-[200px] w-[152px] aspect-square",
                    )}
                  >
                    <TeamCarouselThumb
                      key={teams?.[teamIndex]?.university}
                      onClick={() => onThumbClick(teamIndex)}
                      selected={teamIndex === selectedIndex}
                      team={teams[teamIndex]}
                      hoverEffect={sectionGradient}
                    />
                  </div>
                  {/* <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.26] transition-opacity duration-300 pointer-events-none max-md:hidden"
                    style={{
                      background: sectionGradient,
                      // backgroundBlendMode: "overlay",
                    }}
                  /> */}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
      <RepresentativeModal
        representative={teams[selectedIndex]}
        {...representative}
      />
    </div>
  );
};
