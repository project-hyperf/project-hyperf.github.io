"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import classNames from "classnames";
import { useState } from "react";

interface UniversityCarouselProps {
  teams?: any[];
}

interface CarouselProps extends EmblaOptionsType {
  axis?: "x" | "y";
  loop?: boolean;
  autoplay?: boolean;
}

export const UniversityCarousel: React.FC<UniversityCarouselProps> = ({
  teams,
}) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      autoplay: true,
      autoplaySpeed: 5000,
      axis: "y",
    } as CarouselProps,
    [Autoplay()],
  );
  const [isActivated, setIsActivated] = useState(false);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container flex flex-col gap-[50px]">
        {teams?.map((team, index) => (
          <div key={index} className="embla__slide">
            <CustomImage
              src={`images/teams/agency/${team.university}-default.png`}
              alt={team.university}
              className={classNames(
                "w-[102px] aspect-square",
                !isActivated && "fillter grayscale",
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
