import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { TeamCarouselThumb } from "./TeamCarouselThumb";
import { TeamItem } from "@/hooks/useTeams";
import { RepresentativeCard } from "./RepresentativeCard";

type PropType = {
  teams?: TeamItem[];
  options?: EmblaOptionsType;
};

export const NewTeamCarousel: React.FC<PropType> = (props) => {
  const { teams, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla max-w-[1552px] mx-auto flex items-center flex-row-reverse gap-[96px]">
      <div
        className="embla__viewport flex-1 overflow-hidden"
        ref={emblaMainRef}
      >
        <div className="embla__container flex">
          {teams?.map((team, index) => (
            <div className="embla__slide" key={index}>
              <RepresentativeCard representative={team} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs flex-1">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container max-w-[632px] aspect-square grid grid-cols-3 grid-rows-3 gap-4">
            {Array.from({ length: 9 }).map((_, idx) => {
              const buttonPositions = [1, 2, 3, 4, 6, 8];
              const teamIndex = buttonPositions.indexOf(idx);

              if (teamIndex === -1) {
                return <div key={idx} className="bg-[#F4F4F4] aspect-square" />;
              }
              if (!teams) return null;

              return (
                <div key={idx} className="bg-[#D9D9D9] w-[200px] aspect-square">
                  <TeamCarouselThumb
                    key={teams?.[teamIndex]?.university}
                    onClick={() => onThumbClick(teamIndex)}
                    selected={teamIndex === selectedIndex}
                    team={teams[teamIndex]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
