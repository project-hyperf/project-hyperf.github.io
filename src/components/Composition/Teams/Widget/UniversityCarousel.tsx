"use client";

import React, { useContext, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CurrentTeamContext } from "../Teams";
import { TeamItem } from "@/hooks/useTeams";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";

interface EmblemCarouselProps {
  teams?: TeamItem[];
}

export const UniversityCarousel: React.FC<EmblemCarouselProps> = ({
  teams,
}) => {
  const currentTeam = useContext(CurrentTeamContext);

  const reorderedTeams = useMemo(() => {
    if (!teams || !currentTeam) return teams;

    const activeIndex = teams.findIndex(
      (team) => team.university === currentTeam.university,
    );
    if (activeIndex === -1) return teams;

    const after = teams.slice(activeIndex);
    const before = teams.slice(0, activeIndex);
    return [...after, ...before];
  }, [teams, currentTeam]);

  return (
    <div className="w-full h-full relative pt-[50px]">
      <AnimatePresence mode="popLayout">
        {reorderedTeams?.map((team, index) => {
          const isActive = team.university === currentTeam?.university;
          const yOffset = index * 150; // 기본 수직 간격

          return (
            <motion.div
              key={team.university}
              initial={{
                y: isActive ? yOffset + 100 : yOffset,
                scale: isActive ? 1.3 : 1,
                opacity: 0.7,
                rotate: isActive ? -10 : 0,
              }}
              animate={{
                y: yOffset,
                scale: isActive ? 1.5 : 1,
                filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
                opacity: isActive ? 1 : 0.7,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  mass: 1,
                },
              }}
              exit={{
                y: yOffset - 100,
                scale: 0.8,
                opacity: 0,
                rotate: 10,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
              style={{
                position: "absolute",
                width: "100%",
                zIndex: reorderedTeams.length - index,
                transformOrigin: "center center",
              }}
              className="flex justify-center items-center"
            >
              <div
                className={`
                  w-[102px] aspect-square
                  transition-all duration-300
                  ${isActive ? "transform-gpu" : ""}
                `}
              >
                <CustomImage
                  src={`images/teams/agency/${team.university}-default.png`}
                  alt={`${team.name} emblem`}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
