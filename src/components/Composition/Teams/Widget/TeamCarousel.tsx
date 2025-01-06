"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RepresentativeCard } from "./RepresentativeCard";
import { TeamItem } from "@/hooks/useTeams";
import { SetCurrentTeamContext } from "../Teams";

interface TeamCarouselProps {
  teams?: TeamItem[];
  scrollProgress: number;
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  teams,
  scrollProgress,
}) => {
  const setCurrentTeam = useContext(SetCurrentTeamContext);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const calculateActiveIndex = () => {
      const newActiveIndex = Math.floor(scrollProgress / 0.1);
      if (
        newActiveIndex !== activeIndex &&
        newActiveIndex >= 0 &&
        teams &&
        newActiveIndex < teams.length
      ) {
        setActiveIndex(newActiveIndex);
        setCurrentTeam(teams[newActiveIndex]);
        setIsTransitioning(true);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }
    };

    calculateActiveIndex();
  }, [scrollProgress, teams, setCurrentTeam]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {teams?.map((team, index) => {
        const getCardState = () => {
          if (index === activeIndex) {
            return {
              x: "30%",
              scale: 1.1,
              opacity: 1,
            };
          } else if (index < activeIndex) {
            return {
              x: `calc(0% + ${index * 70}px)`,
              scale: 1,
              opacity: 1,
            };
          } else if (index === activeIndex + 1 && isTransitioning) {
            return {
              x: "100%",
              scale: 1,
              opacity: 1,
            };
          } else {
            return {
              x: "100%",
              scale: 1,
              opacity: 0,
            };
          }
        };

        const cardState = getCardState();

        return (
          <motion.div
            key={index}
            initial={{ x: "100%", opacity: 0 }}
            animate={cardState}
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
              height: "90%",
              margin: "50px 0",
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
