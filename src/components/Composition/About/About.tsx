"use client";

import { BorderButton } from "@/components/UI/Button/BorderButton";
import GradientIcon from "@/components/UI/Icon/GradientIcon";
import { Text } from "@/components/UI/Text/Text";
import { Divider, Spacer } from "@nextui-org/react";
import { NecessityModal } from "./NecessityModal";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ModalsDispatchContext } from "@/components/Utilities/Providers/ModalProvider";
import { MethodModal } from "@/components/Widget/Modal/MethodModal";
import {
  useTransform,
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { IntegrationStepModal } from "./IntegrationStepModal";
import classNames from "classnames";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";

export const About: React.FC = () => {
  const { open } = useContext(ModalsDispatchContext);

  const DescriptionButtonList = [
    {
      label: "연구필요성",
      key: "necessary",
      onClick: () => open(NecessityModal),
    },
    { label: "추진방법", key: "method", onClick: () => open(MethodModal) },
    {
      label: "연구 통합 단계",
      key: "integrated",
      onClick: () => open(IntegrationStepModal),
    },
  ];
  return (
    <div
      className="bg-black  pb-[146px] w-full flex flex-col items-center px-5"
      id="about"
    >
      <Text
        variant="t2"
        className="text-white !text-[30px] md:hidden text-center pt-[40px]"
      >
        About
      </Text>
      <AboutTitle />

      <AboutContent />

      <Text
        variant="h0"
        className="!text-[45px] max-md:!text-[30px] !font-extrabold text-white text-center mb-20"
      >
        다계층(multi-level),
        <br className="md:hidden" /> 다목적(multi-objective)
        오토튜닝프레임워크개발
      </Text>
      <div className="flex xl:flex-row flex-col gap-10 items-center md:justify-center w-full">
        {DescriptionButtonList.map((button, idx) => (
          <React.Fragment key={idx}>
            <BorderButton
              onClick={button.onClick}
              className="hover:!bg-white group max-md:w-full"
              endContent={
                <div className="flex w-[60px] justify-between">
                  <Divider
                    orientation="vertical"
                    className="!w-[2px] !h-[45px] bg-white group-hover:bg-primary-assistive"
                  />
                  {/* <div className="relative"> */}
                  <GradientIcon className="my-auto" />
                  {/* </div> */}
                </div>
              }
            >
              <Text
                variant="h3"
                className="text-white group-hover:bg-primary-assistive group-hover:bg-clip-text group-hover:text-transparent leading-[33.60px]"
              >
                {button.label}
              </Text>
            </BorderButton>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const AboutTitle: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScroll = () => {
    setIsExpanded(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      <Text
        variant="h0"
        className="md:!text-[50px] !text-[20px] text-white text-center mb-[84px] pt-5 md:pt-[115px] max-lg:whitespace-nowrap md:!leading-[65px] "
      >
        엑사급 초고성능 컴퓨터의
        <br className="lg:hidden" /> 잠재 성능을{" "}
        <motion.span
          className="px-2 pt-1.5 h-[64px] inline-block"
          initial={false}
          animate={{
            letterSpacing: isExpanded ? "0.1em" : "0em",
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                className="flex bg-primary-assistive bg-clip-text text-transparent"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                최
                <CustomImage
                  src="images/icons/slash.svg"
                  alt="slash"
                  className="md:mx-1 transform max-md:scale-[0.65]"
                />
                대
                <CustomImage
                  src="images/icons/slash.svg"
                  alt="slash"
                  className="md:mx-1 transform max-md:scale-[0.65]"
                />
                한
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                className="bg-primary-normal px-2 pt-1.5"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                최대한
              </motion.div>
            )}
          </AnimatePresence>
        </motion.span>
        활용하며
        <br className="" />
        <Spacer y={5} className="max-lg:block" />
        <Spacer y={20} className="lg:hidden max-md:hidden" /> 응용별, 하드웨어
        별 기반
        <br className="lg:hidden" /> SW 개발 노력을{" "}
        <motion.span
          className="px-2 pt-1.5 h-[64px] inline-block"
          initial={false}
          animate={{
            letterSpacing: isExpanded ? "0.1em" : "0em",
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="expanded"
                className="flex bg-primary-strong px-2 pt-1.5"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                최
                <CustomImage
                  src="images/icons/square-dot.svg"
                  alt="slash"
                  className="mx-1"
                />
                소
                <CustomImage
                  src="images/icons/square-dot.svg"
                  alt="slash"
                  className="mx-1"
                />
                화
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                className="bg-primary-assistive px-2 pt-1.5"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                최소화
              </motion.div>
            )}
          </AnimatePresence>
        </motion.span>
        하는
      </Text>
    </div>
  );
};

// const AboutContent: React.FC = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, {
//     amount: 0.3,
//     once: false,
//   });

//   return (
//     <motion.div
//       ref={ref}
//       className="flex md:flex-row flex-col gap-4 w-full max-w-[1440px] max-xl:w-full mx-auto mb-[61px]"
//     >
//       {ABOUT_CONTENT.map((item, index) => (
//         <motion.div
//           key={item.key}
//           className="h-[480px] border-white max-md:border-t-1 md:border-l-1 shadow-md flex flex-col overflow-hidden"
//           variants={{
//             hidden: { width: "2px", padding: "0px" },
//             visible: { width: "480px", padding: "60px" },
//           }}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           transition={{
//             duration: 0.8,
//             delay: index * 0.4,
//           }}
//         >
//           <div className="flex flex-col flex-1">
//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               transition={{
//                 delay: index * 0.4,
//                 duration: 1,
//               }}
//             >
//               <Text variant="h2" className="text-white text-[34px] font-thin">
//                 {item.title}
//               </Text>
//               <Text variant="t2" className="text-white text-[44px] font-bold">
//                 {item.key}
//               </Text>
//             </motion.div>

//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               transition={{
//                 delay: index * 0.5,
//                 duration: 1.2,
//               }}
//               className="mt-auto"
//             >
//               <Text className="text-white !text-[24px] whitespace-pre-wrap">
//                 {item.content}
//               </Text>
//             </motion.div>
//           </div>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// };
const AboutContent: React.FC = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    amount: 0.3,
    once: false,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const variants = {
    desktop: {
      container: {},
      item: {
        hidden: { width: "2px", padding: "0px", opacity: 0 },
        visible: { width: "480px", padding: "60px", opacity: 1 },
      },
    },
    mobile: {
      container: {},
      item: {
        hidden: { y: 100, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="flex md:flex-row flex-col gap-4 w-full max-w-[1440px] max-xl:w-full mx-auto mb-[61px]"
    >
      {ABOUT_CONTENT.map((item, index) => (
        <motion.div
          key={item.key}
          className={classNames(
            "md:h-[480px] h-[204px] max-md:min-w-full border-white",
            "max-md:border-t-1 md:border-l-1 shadow-md flex flex-col",
            "overflow-hidden max-md:!py-8",
            isMobile ? "w-full" : "",
          )}
          variants={isMobile ? variants.mobile.item : variants.desktop.item}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{
            duration: 0.8,
            delay: index * 0.4,
            ease: "easeOut",
          }}
        >
          <div className="flex flex-col max-md:gap-5 max-md:px-5 flex-1">
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
                className="text-white !md:text-[44px] !text-[31px] font-bold"
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
