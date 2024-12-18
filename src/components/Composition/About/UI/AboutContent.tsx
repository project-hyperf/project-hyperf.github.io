"use client";
import { images } from "@/assets/images/images";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useIsMobile } from "@/hooks/useWindowSize";
import { button } from "@nextui-org/react";
import classNames from "classnames";
import {
  useInView,
  motion,
  animate,
  AnimatePresence,
  PanInfo,
} from "framer-motion";
import { type } from "os";
import { exit, title } from "process";
import { useEffect, useRef, useState } from "react";

export const AboutContent: React.FC = () => {
  const [expandComplete, setExpandComplete] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentStep, setCurrentStep] = useState(1);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    // 기존 인터벌 제거
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
  const [dragStart, setDragStart] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
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
  const handleDragStart = (event: any, info: PanInfo) => {
    setDragStart(info.point.x);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const diff = dragStart - info.point.x;
    const threshold = 50; // 드래그 임계값

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentSlide < ABOUT_CONTENT.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      } else if (diff < 0 && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    }
  };
  if (isMobile) {
    return (
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex flex-col items-center"
          initial={false}
          ref={ref}
        >
          {/* 캐러셀 컨테이너 */}
          <motion.div className="w-full overflow-hidden" initial={false}>
            <motion.div
              className="flex"
              animate={{ x: -currentSlide * 100 + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {ABOUT_CONTENT.map((item, index) => (
                <motion.div
                  key={item.key}
                  className={classNames(
                    "min-w-full px-4 py-8",
                    "transition-colors duration-300",
                    activeIndex === index ? "bg-primary-bg" : "bg-[#131313]",
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
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 슬라이드 인디케이터 */}
          <div className="flex justify-center gap-2 mt-4">
            {ABOUT_CONTENT.map((_, index) => (
              <button
                key={index}
                className={classNames(
                  "w-2 h-2 rounded-full",
                  currentSlide === index ? "bg-primary-normal" : "bg-gray-400",
                )}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </motion.div>
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
  return (
    <div className="relative pt-[61px] mb-[135px] h-[645px]">
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
      <div className="absolute inset-0 pt-[21px] mx-auto md:w-[1421px] flex  items-center justify-center">
        <motion.div
          className="flex items-center w-full max-[1400px]:flex-col"
          initial={{ y: 100, opacity: 0 }}
          animate={expandComplete ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div className="w-[179px] h-[470px] bg-[#131313] flex flex-col max-[1400px]:flex-row items-center pl-6 pr-[35px] pt-[71px] pb-[65px] gap-8">
            {imageList.map((image, index) => (
              <CustomImage
                key={index}
                src={`images/about/${image.key}.png`}
                alt={image.key}
                className="w-full h-full"
              />
            ))}
          </motion.div>

          <motion.div>
            <CustomImage
              src="images/union/Union_right.png"
              alt="arrow"
              className="w-[72px] h-[99px] mr-1.5"
            />
          </motion.div>

          {/* Center section with steps */}
          <motion.div className="flex-1">
            <div className="w-full h-[470px] bg-[#131313] flex justify-center items-center text-white gap-4 px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    opacity: { duration: 0.5 },
                  }}
                >
                  <CustomImage
                    src={`images/about/step/step_${currentStep}.png`}
                    alt={`step_${currentStep}`}
                    className="w-[888px]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          <div>
            <CustomImage
              src={`images/union/Union_right.png`}
              alt={"arrow"}
              className="w-[72px] h-[99px] mr-1.5"
            />
          </div>
          <div className="w-[179px] h-[470px] bg-[#131313] flex flex-col items-center justify-center gap-5">
            <CustomImage
              src={`images/about/sc.png`}
              alt={"Graph"}
              className="w-[102px] h-[78px]"
            />
            <CustomImage
              src={`images/about/sc.png`}
              alt={"Graph"}
              className="w-[102px] h-[78px]"
            />
          </div>
        </motion.div>
      </div>
    </div>
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
