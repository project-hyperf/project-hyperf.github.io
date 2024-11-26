"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import classNames from "classnames";
import { Image } from "@nextui-org/react";

interface EventCarouselProps {
  posts?: any[];
}

interface CarouselProps extends EmblaOptionsType {
  axis?: "x" | "y";
  loop?: boolean;
  autoplay?: boolean;
}
export const EventCarousel: React.FC<EventCarouselProps> = ({ posts }) => {
  console.log(posts);
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      autoplay: true,
      autoplaySpeed: 5000,
      axis: "x",
    } as CarouselProps,
    [Autoplay()],
  );
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container flex flex-col gap-[50px]">
        {posts?.map((post, index) => (
          <div key={index} className="embla__slide">
            <Image
              src={post.thumbnail}
              alt={post.title}
              className={classNames("w-[102px] aspect-square")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
