"use client";
import { GeneralButton } from "@/components/UI/Button/GeneralButton";
import { button } from "@nextui-org/react";
import classNames from "classnames";
import { animate, AnimatePresence, motion } from "framer-motion";
import { exit } from "process";
import { useState } from "react";
import { Swiper as SW } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

interface PictureGridProps {
  picture: { src: string; alt?: string }[];
  setSelectedPictureIndex: (index: number) => void;
  isCurrentPicture: (index: number) => boolean;
}

export const PictureGrid: React.FC<PictureGridProps> = ({
  picture,
  setSelectedPictureIndex,
  isCurrentPicture,
}) => {
  const [swiper, setSwiper] = useState<SW | null>(null);
  const [currentSwiperIndex, setCurrentSwiperIndex] = useState(0);

  const slicedPicture = ((picture) => {
    const sliced = [];
    const sliceCount = Math.max(picture.length / 4);
    for (let i = 0; i < sliceCount; i++) {
      sliced.push(picture.slice(i * 4, (i + 1) * 4));
    }
    return sliced;
  })(picture);

  const next = () => {
    swiper?.slideNext();
  };

  const prev = () => {
    swiper?.slidePrev();
  };

  const isBeginning = currentSwiperIndex === 0;
  const isEnd = currentSwiperIndex === slicedPicture.length - 1;

  return (
    <div className="w-full relative">
      <div
        className={classNames(
          "top-1/2 -translate-y-1/2 absolute left-0 -translate-x-3/4 z-10 max-md:-translate-x-1/2",
          {
            hidden: isBeginning,
          },
        )}
      >
        <button onClick={prev}>
          <LeftIcon />
        </button>
      </div>
      <div
        className={classNames(
          "top-1/2 -translate-y-1/2 absolute right-0 translate-x-3/4 z-10 max-md:translate-x-1/2",
          {
            hidden: isEnd,
          },
        )}
      >
        <button onClick={next}>
          <RightIcon />
        </button>
      </div>
      <Swiper
        spaceBetween={28}
        onSwiper={setSwiper}
        onActiveIndexChange={(swiper) =>
          setCurrentSwiperIndex(swiper.activeIndex)
        }
      >
        {slicedPicture.map((picture, groupIndex) => (
          <SwiperSlide key={groupIndex}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(40%,1fr))] max-md:grid-cols-2 gap-7 max-md:gap-4">
              {picture.map((image, index) => (
                <GeneralButton
                  key={image.src}
                  className="w-auto h-auto rounded-none p-0 aspect-square relative"
                  onClick={() => {
                    setSelectedPictureIndex(index + groupIndex * 4);
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-center object-cover w-full h-full"
                  />
                  <AnimatePresence>
                    {isCurrentPicture(index + groupIndex * 4) && (
                      <motion.div
                        key="overlay"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 0.5 },
                        }}
                        className="absolute inset-0 z-10 bg-gradient-to-b from-[#6541f2] to-[#0d00b5]"
                      />
                    )}
                  </AnimatePresence>
                </GeneralButton>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
const LeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="47"
    height="52"
    viewBox="0 0 47 52"
    fill="none"
  >
    <g filter="url(#filter0_d_244_336)">
      <path d="M27 46L7 26L27 6" stroke="#858788" strokeWidth="3" />
    </g>
    <defs>
      <filter
        id="filter0_d_244_336"
        x="0.878906"
        y="0.939453"
        width="31.1816"
        height="50.1211"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_244_336"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_244_336"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const RightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="47"
    height="52"
    viewBox="0 0 47 52"
    fill="none"
  >
    <g filter="url(#filter0_d_244_333)">
      <path d="M20 42L40 22L20 2" stroke="#858788" strokeWidth="3" />
    </g>
    <defs>
      <filter
        id="filter0_d_244_333"
        x="14.9395"
        y="0.939453"
        width="31.1816"
        height="50.1211"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_244_333"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_244_333"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
