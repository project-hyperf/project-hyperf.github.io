"use client";
import { images } from "@/assets/images/images";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useIsMobile } from "@/hooks/useWindowSize";
import classNames from "classnames";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export const AboutContent: React.FC = () => {
  const [expandComplete, setExpandComplete] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentStep, setCurrentStep] = useState(1);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) {
      setExpandComplete(true);
    }
  }, [isMobile]);
  useEffect(() => {
    if (expandComplete) {
      setCurrentStep(1);
      setActiveIndex(-1);
      const timer = setTimeout(() => {
        startSequence();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [expandComplete]);
  const startSequence = () => {
    if (cycleIntervalRef.current) {
      clearInterval(cycleIntervalRef.current);
    }

    let sequenceStep = 0;

    cycleIntervalRef.current = setInterval(() => {
      sequenceStep = (sequenceStep + 1) % 4;

      setActiveIndex(sequenceStep === 0 ? -1 : sequenceStep - 1);

      setCurrentStep(sequenceStep + 1);
    }, 4000);
    return () => {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
    };
  };
  return (
    <div className="w-full">
      <AboutContentCategory
        expandComplete={expandComplete}
        setExpandComplete={setExpandComplete}
        activeIndex={activeIndex}
      />
      <AboutContentImage
        expandComplete={expandComplete}
        currentStep={currentStep}
      />
    </div>
  );
};
interface AboutContentCategoryProps {
  expandComplete: boolean;
  setExpandComplete: React.Dispatch<React.SetStateAction<boolean>>;
  activeIndex: number;
}
export const AboutContentCategory: React.FC<AboutContentCategoryProps> = ({
  expandComplete,
  setExpandComplete,
  activeIndex,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.3,
    once: false,
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isInView && !expandComplete) {
      const timer = setTimeout(() => {
        setExpandComplete(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, expandComplete, setExpandComplete]);

  const variants = {
    desktop: {
      container: {},
      item: {
        hidden: { width: "2px", padding: "0px", opacity: 0 },
        visible: { width: "480px", padding: "32px 52px", opacity: 1 },
        active: {
          transition: { duration: 0.3 },
        },
      },
    },
  };

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current && activeIndex !== -1) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);
  if (isMobile) {
    return (
      <div className="px-5">
        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={classNames(
            "swiper-container",
            "[&_.swiper-pagination-bullets]:!-bottom-10 [&_.swiper-pagination-bullets]:!ml-5 text-white text-[10px] font-['Pretendard'] font-normal",
            "[&_.swiper-pagination-current]:text-[#fff]",
            " [&_.swiper-pagination]:bg-gray-8 [&_.swiper-pagination]:w-[36px] [&_.swiper-pagination]:h-[20px] [&_.swiper-pagination]:rounded-full [&_.swiper-pagination]:px-1 [&_.swiper-pagination]:pt-[2px]",
            " [&_.swiper-pagination]:left-[295px]",
          )}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {ABOUT_CONTENT.map((item, index) => (
            <SwiperSlide key={item.key} className="min-w-[304px] max-w-[95%]">
              <div
                className={classNames(
                  "w-full px-4 py-8",
                  "transition-colors duration-300 border-x-1 border-white",
                  activeIndex === index ? "bg-primary-bg" : "bg-transparent",
                )}
              >
                <div className="flex flex-col gap-6 p-6">
                  <div>
                    <Text
                      variant="h2"
                      className="text-white text-[21px] font-thin"
                    >
                      {item.title}
                    </Text>
                    <Text
                      variant="t2"
                      className="text-white text-[31px] font-bold"
                    >
                      {item.key}
                    </Text>
                  </div>
                  <Text className="text-white text-sm whitespace-pre-wrap">
                    {item.content}
                  </Text>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
  return (
    <motion.div
      ref={ref}
      className="flex md:flex-row flex-col w-full max-w-[1440px] max-xl:w-full mx-auto  px-5"
    >
      {ABOUT_CONTENT.map((item, index) => (
        <motion.div
          key={item.key}
          className={classNames(
            "md:h-[320px] h-[204px] max-md:min-w-full border-white",
            "max-md:border-t-1 md:border-l-1 shadow-md flex flex-col",
            "overflow-hidden max-md:!py-[52px]",
            "transition-colors duration-300",
            activeIndex === index ? "bg-primary-bg" : "bg-transparent",
          )}
          variants={variants.desktop.item}
          initial="hidden"
          animate={[
            isInView ? "visible" : "hidden",
            activeIndex >= index ? "active" : "",
          ]}
          transition={{
            duration: 0.8,
            delay: index * 0.4,
            ease: "easeOut",
          }}
        >
          <div className="flex flex-col max-md:gap-[30px] max-md:px-5 flex-1">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{
                delay: index * 0.4 + 0.2,
                duration: 0.8,
              }}
            >
              <Text
                variant="h2"
                className="text-white md:!text-[34px] !text-[21px] font-thin"
              >
                {item.title}
              </Text>
              <Text
                variant="t2"
                className="text-white md:!text-[44px] !text-[31px] font-bold"
              >
                {item.key}
              </Text>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{
                delay: index * 0.4 + 0.4,
                duration: 0.8,
              }}
              className="mt-auto"
            >
              <Text className="text-white md:!text-[24px] text-sm whitespace-pre-wrap">
                {item.content}
              </Text>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
interface AboutContentImageProps {
  expandComplete: boolean;
  currentStep: number;
}
const AboutContentImage: React.FC<AboutContentImageProps> = ({
  expandComplete,
  currentStep,
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="relative pt-[61px] mb-[135px] h-auto min-md:min-h-[645px] max-[1400px]:h-auto">
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
          animate={expandComplete ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div className="min-[1400px]:w-[179px] min-[1400px]:h-[470px] max-md:h-[60px] bg-[#131313] flex flex-col max-[1400px]:w-full max-[1400px]:flex-row max-[1400px]:justify-center items-center pl-6 pr-[35px] md:pt-[71px] md:pb-[65px] py-5 gap-8">
            {imageList.map((image, index) => (
              <CustomImage
                key={index}
                src={`images/about/${image.key}.png`}
                alt={image.key}
                className="w-full h-full max-[1400px]:w-auto max-[1400px]:w-20 max-md:w-12 max-md:h-4 max-[1400px]:h-8"
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
            <div className="w-full md:h-[470px] max-md:min-h-[518px] md:bg-[#131313] flex justify-center items-center text-white gap-4 px-8 max-[1400px]:px-4">
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
          duration: 0.6,
          ease: "easeOut",
          opacity: { duration: 0.5 },
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
    title: "탐색기반",
    key: "search-driven",
    content: "오토튜닝 용 샘플 생성\n하드웨어 프로파일링\n비용 모델 기반 탐색",
  },
];
