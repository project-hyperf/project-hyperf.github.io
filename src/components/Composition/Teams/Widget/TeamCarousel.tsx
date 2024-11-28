"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useRef, useEffect, useState, useContext } from "react";
import { SetCurrentTeamContext } from "../Teams";
import { RepresentativeCard } from "./RepresentativeCard";
import { Sticky } from "@/components/UI/Sticky/Sticky";

interface TeamCarouselProps {
  teams?: any[];
  scrollProgress: number;
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  teams,
  scrollProgress,
}) => {
  const setCurrentTeam = useContext(SetCurrentTeamContext);
  const contentRef = useRef<HTMLDivElement | null>(null);
  // const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const maxTranslateX = content.scrollWidth - window.innerWidth;
    const translateX = -maxTranslateX * scrollProgress;

    content.style.transform = `translateX(${translateX}px)`;
  }, [scrollProgress]);

  return (
    <div
      ref={contentRef}
      className="flex"
      style={{
        height: "1030px",
        width: "100%",
        display: "flex",
        transform: "translateX(0)",
        transition: "transform 0.1s linear",
      }}
    >
      {teams?.map((team, index) => (
        <div
          key={index}
          style={{
            flex: "0 0 100%",
            minWidth: "100vw",
            padding: "1rem",
          }}
        >
          <RepresentativeCard representative={team} />
        </div>
      ))}
    </div>
  );
};
