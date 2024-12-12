"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TeamCarouselThumb } from "./TeamCarouselThumb";
import { TeamItem } from "@/hooks/useTeams";
import classNames from "classnames";
import { motion } from "framer-motion";
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
  const isMobile = useIsMobile();
  // const buttonPositions = isMobile ? [0, 1, 3, 4, 6, 7] : [1, 2, 3, 4, 6, 8];
  const buttonPositions = useMemo(() => {
    if (isMobile) {
      return [0, 1, 3, 4, 6, 7];
    } else {
      return [1, 2, 3, 4, 6, 8];
    }
  }, [isMobile]);
  const [selectedIndex, setSelectedIndex] = useState(buttonPositions[0]);

  const representative = useDisclosure();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!representative.isOpen) {
      setSelectedIndex(buttonPositions[0]);
    }
  }, [representative.isOpen, buttonPositions]);

  const onThumbClick = (index: number) => {
    if (isMobile) {
      setSelectedIndex(buttonPositions[index]);
      representative.onOpen();
    } else {
      setSelectedIndex(buttonPositions[index]);
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
          <RepresentativeCard
            representative={teams[buttonPositions.indexOf(selectedIndex)]}
          />
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
              const teamIndex = buttonPositions.indexOf(idx);

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
                      selected={
                        buttonPositions.indexOf(selectedIndex) === teamIndex
                      }
                      team={teams[teamIndex]}
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
        representative={teams[buttonPositions.indexOf(selectedIndex)]}
        {...representative}
      />
    </div>
  );
};
