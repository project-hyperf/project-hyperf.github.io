"use client";
import { images } from "@/assets/images/images";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useIsMobile } from "@/hooks/useWindowSize";
import classNames from "classnames";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import { CategoryButton } from "./CategoryButton";

const MemoizedButton = memo(CategoryButton);

export const AboutContent: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const isMobile = useIsMobile();
  const handleCategoryClick = (index: number) => {
    setActiveIndex(index);
    setCurrentStep(index + 1);
  };
  return (
    <div className="w-full">
      {isMobile ? (
        <MobileSlideView
          activeIndex={activeIndex}
          handleCategoryClick={handleCategoryClick}
        />
      ) : (
        <DesktopView
          activeIndex={activeIndex}
          handleCategoryClick={handleCategoryClick}
        />
      )}
      <AboutContentImage currentStep={currentStep} />
    </div>
  );
};

const MobileSlideView = memo(
  ({
    activeIndex,
    handleCategoryClick,
  }: {
    activeIndex: number;
    handleCategoryClick: (index: number) => void;
  }) => (
    <Swiper
      modules={[Mousewheel, Pagination]}
      spaceBetween={16}
      slidesPerView="auto"
      centeredSlides
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      mousewheel
      direction="horizontal"
      onSlideChange={(swiper) => handleCategoryClick(swiper.activeIndex)}
      className={classNames(
        "w-full px-4 h-[240px]",
        "swiper-container",
        "[&_.swiper-pagination]:!z-[999][&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet]:!bg-[#f2f2f2] [&_.swiper-pagination-bullet.swiper-pagination-bullet-active]:!bg-white",
      )}
    >
      {ABOUT_CONTENT.map((item, index) => (
        <SwiperSlide key={item.key} className="min-w-[234px] max-w-[290px]">
          <MemoizedButton
            item={item}
            selected={activeIndex === index}
            onChange={() => handleCategoryClick(index)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ),
);

const DesktopView = memo(
  ({
    activeIndex,
    handleCategoryClick,
  }: {
    activeIndex: number;
    handleCategoryClick: (index: number) => void;
  }) => (
    <div className="min-[1400px]:flex md:grid md:grid-cols-2 md:grid-rows-2 min-[1400px]:gap-10 items-center justify-center md:w-[720px] min-[1400px]:w-full max-[1400px]:mx-auto md:gap-y-5 md:gap-x-4">
      {ABOUT_CONTENT.map((item, index) => (
        <MemoizedButton
          key={item.key}
          item={item}
          selected={activeIndex === index}
          onChange={() => handleCategoryClick(index)}
        />
      ))}
    </div>
  ),
);

interface AboutContentImageProps {
  currentStep: number;
}
const AboutContentImage: React.FC<AboutContentImageProps> = ({
  currentStep,
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="relative pt-[61px] mb-[135px] h-auto min-md:min-h-[645px] max-[1400px]:h-auto max-md:pt-10">
      <div
        style={{
          backgroundImage: `url(${images["images/bg/bg_black_gradient.png"].src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: "101px",
          left: 0,
        }}
      />
      <div
        className={classNames(
          "pt-[21px] mx-auto min-[1400px]:w-[1421px] flex items-center justify-center max-[1400px]:min-w-[720px] max-[1400px]:w-[90%]",
          "relative max-md:min-w-[320px] max-md:w-[90%]",
        )}
      >
        <motion.div
          className="flex items-center w-full max-[1400px]:flex-col max-[1400px]:gap-1 min-[1400px]:gap-8"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div className="min-[1400px]:w-[179px] min-[1400px]:h-[470px] max-md:h-[60px] bg-[#131313] flex flex-col max-[1400px]:w-full max-[1400px]:flex-row max-[1400px]:justify-center items-center pl-6 pr-[35px] min-[1400px]:pt-[71px] min-[1400px]:pb-[65px] py-5 gap-8 max-sm:gap-3">
            {imageList.map((image, index) => (
              <CustomImage
                key={index}
                src={`images/about/${image.key}.png`}
                alt={image.key}
                className="w-full h-full max-[1400px]:w-auto max-md:w-12 max-md:h-5 max-[1400px]:h-8"
              />
            ))}
          </motion.div>

          <motion.div className="max-[1400px]:rotate-90">
            <CustomImage
              src="images/union/Union_right.png"
              alt="arrow"
              className="w-[72px] h-[99px] mr-1.5 max-[1400px]:w-8 max-[1400px]:h-12"
            />
          </motion.div>

          <motion.div className="flex-1 max-[1400px]:w-full">
            <div className="w-full md:h-[470px] max-md:min-h-[329px] md:bg-[#131313] flex justify-center items-center text-white gap-4 px-8 max-[1400px]:px-4">
              <AnimatedSteps currentStep={currentStep} isMobile={isMobile} />
            </div>
          </motion.div>

          <div className="max-[1400px]:rotate-90">
            <CustomImage
              src={`images/union/Union_right.png`}
              alt={"arrow"}
              className="w-[72px] h-[99px] mr-1.5 max-[1400px]:w-8 max-[1400px]:h-12"
            />
          </div>

          <div className="min-[1400px]:w-[179px] min-[1400px]:h-[470px] bg-[#131313] flex flex-col max-[1400px]:w-full max-[1400px]:flex-row justify-center items-center gap-5 p-4">
            {currentStep === 4 && (
              <CustomImage
                src={`images/about/person.png`}
                alt={"Graph"}
                className="w-[102px] h-[78px] max-md:w-[58px] max-md:h-12"
              />
            )}
            <CustomImage
              src={`images/about/sc.png`}
              alt={"Graph"}
              className="w-[102px] h-[78px] max-md:w-[58px] max-md:h-12"
            />
            <CustomImage
              src={`images/about/sc.png`}
              alt={"Graph"}
              className="w-[102px] h-[78px] max-md:w-[58px] max-md:h-12"
            />
            {currentStep === 4 && (
              <CustomImage
                src={`images/about/person.png`}
                alt={"Graph"}
                className="w-[102px] h-[78px] max-md:w-[58px] max-md:h-12 max-[1400px]:block hidden"
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const AnimatedSteps = ({
  currentStep,
  isMobile,
}: {
  currentStep: number;
  isMobile: boolean;
}) => {
  const desktopVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
  };

  const mobileVariants = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={isMobile ? mobileVariants.initial : desktopVariants.initial}
        animate={isMobile ? mobileVariants.animate : desktopVariants.animate}
        exit={isMobile ? mobileVariants.exit : desktopVariants.exit}
        transition={{
          duration: 0.3,
          ease: "easeOut",
          opacity: { duration: 0.2 },
        }}
        className="max-[1400px]:w-full"
      >
        <CustomImage
          src={`images/about/step/${
            isMobile ? "mobile_" : ""
          }step_${currentStep}.png`}
          alt={`step_${currentStep}`}
          className="w-[888px] max-[1400px]:w-full max-[1400px]:max-w-[720px] mx-auto"
        />
      </motion.div>
    </AnimatePresence>
  );
};

const imageList = [
  { key: "HPCG" },
  { key: "linpack" },
  { key: "spec" },
  { key: "NPB" },
  { key: "Graph" },
];
const ABOUT_CONTENT = [
  {
    title: "탐색기반",
    key: "search-driven",
    content: "오토튜닝 용 샘플 생성\n하드웨어 프로파일링\n비용 모델 기반 탐색",
  },
  {
    title: "다계층",
    key: "multi-level",
    content: "고차원/저차원 최적화\n플랫폼 중립 최적화\n최적화 간 피드백 제공",
  },
  {
    title: "다목적",
    key: "multi-objective",
    content: "실행시간과 전력 동시 고려\n다목적 탐색 알고리즘\n전력 모델링",
  },
  {
    title: "SW 생태계 조성",
    key: "sw-ecosystem",
    content:
      "전문인력 양성\n초고성능컴퓨팅 정부책임기관 참여\n프레임워크 활용 워크샵 개최\n및 사용자 지원",
  },
];
