"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import { RepresentativeCard } from "./RepresentativeCard";
import { useEffect, useContext, useRef, useState } from "react";
import { SetCurrentTeamContext } from "../Teams";

interface TeamCarouselProps {
  teams?: any[];
}

interface CarouselProps extends EmblaOptionsType {
  axis?: "x" | "y";
  loop?: boolean;
  autoplay?: boolean;
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({ teams }) => {
  const setCurrentTeam = useContext(SetCurrentTeamContext);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
  } as CarouselProps);
  useEffect(() => {
    const target = document.getElementById("team-carousel-section");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
      },
      {
        threshold: 0.5,
      },
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, []);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isHorizontalScroll, setIsHorizontalScroll] = useState(false);

  return (
    <div
      ref={sectionRef}
      className={`team-carousel-section ${
        isHorizontalScroll ? "no-vertical-scroll" : ""
      }`}
      style={{
        height: "100vh",
        overflow: isHorizontalScroll ? "hidden" : "auto",
      }}
    >
      <div className="overflow-hidden">
        <div
          className="flex touch-pan-y touch-pinch-zoom"
          style={{
            marginLeft: "calc(1rem * -1)",
          }}
        >
          {teams?.map((team, index) => (
            <div
              key={index}
              className=""
              style={{
                transform: "translate3d(0, 0, 0)",
                flex: "0 0 100%",
                minWidth: "0",
                paddingLeft: "1rem",
              }}
            >
              <RepresentativeCard representative={team} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
