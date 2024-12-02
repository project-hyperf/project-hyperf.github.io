// "use client";

// import React, { useContext, useEffect } from "react";
// import { motion } from "framer-motion";
// import { RepresentativeCard } from "./RepresentativeCard";
// import { TeamItem } from "@/hooks/useTeams";
// import { SetCurrentTeamContext } from "../Teams";

// interface TeamCarouselProps {
//   teams?: TeamItem[];
//   scrollProgress: number;
// }

// export const TeamCarousel: React.FC<TeamCarouselProps> = ({
//   teams,
//   scrollProgress,
// }) => {
//   const setCurrentTeam = useContext(SetCurrentTeamContext);

//   // 현재 활성화된 팀 인덱스 찾기
//   const activeIndex = teams?.findIndex((_, index) => {
//     const startProgress = index * 0.1;
//     const endProgress = (index + 1.66) * 0.1;
//     const range = endProgress - startProgress;
//     const progress = (scrollProgress - startProgress) / range;
//     const clampedProgress = Math.max(0, Math.min(1, progress));

//     return clampedProgress > 0.4 && clampedProgress < 0.6;
//   });

//   // 활성화된 팀이 변경될 때 컨텍스트 업데이트
//   useEffect(() => {
//     if (activeIndex !== undefined && activeIndex !== -1 && teams) {
//       setCurrentTeam(teams[activeIndex]);
//     }
//   }, [activeIndex, teams, setCurrentTeam]);

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       {teams?.map((team, index) => {
//         const startProgress = index * 0.1;
//         const endProgress = (index + 1) * 0.1;
//         const range = endProgress - startProgress;
//         const progress = (scrollProgress - startProgress) / range;
//         const clampedProgress = Math.max(0, Math.min(1, progress));

//         // 이동 위치 계산
//         let translateX = "100%";
//         if (clampedProgress <= 0.4) {
//           // 오른쪽에서 중앙으로 이동
//           const stageProgress = clampedProgress / 0.4;
//           translateX = `calc(100% - ${stageProgress * 70}%)`;
//         } else if (clampedProgress <= 0.6) {
//           // 중앙에서 잠시 멈춤
//           translateX = "30%";
//         } else {
//           // 중앙에서 왼쪽으로 이동하며 쌓임
//           const stageProgress = (clampedProgress - 0.6) / 0.4;
//           translateX = `calc(30% - ${stageProgress * 30}% + ${index * 70}px)`;
//         }

//         const isActive = index === activeIndex;
//         const scale = isActive ? 1.1 : 1;

//         return (
//           <motion.div
//             key={index}
//             initial={{ x: "100%" }}
//             animate={{
//               x: translateX,
//               scale,
//             }}
//             transition={{
//               type: "tween",
//               duration: 0.5,
//               ease: "easeOut",
//             }}
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100vw",
//               height: "90%",
//               margin: "50px 0",
//               zIndex: teams.length + index,
//             }}
//           >
//             <RepresentativeCard representative={team} />
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };
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
