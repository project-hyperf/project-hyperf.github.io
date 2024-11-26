"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import { RepresentativeCard } from "./RepresentativeCard";
import { useEffect, useContext } from "react";
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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      autoplay: true,
      autoplaySpeed: 5000,
      axis: "x",
    } as CarouselProps,
    [Autoplay()],
  );

  const handleSelect = () => {
    if (!emblaApi || !teams) return;
    const selectedIndex = emblaApi.selectedScrollSnap();
    setCurrentTeam(teams[selectedIndex]);
  };

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", handleSelect);
    handleSelect();
  }, [emblaApi, teams]);

  return (
    <div className="embla-viewport overflow-hidden" ref={emblaRef}>
      <div
        className="embla__container flex touch-pan-y touch-pinch-zoom"
        style={{
          marginLeft: "calc(1rem * -1)",
        }}
      >
        {teams?.map((team, index) => (
          <div
            key={index}
            className="embla__slide"
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
  );
};
