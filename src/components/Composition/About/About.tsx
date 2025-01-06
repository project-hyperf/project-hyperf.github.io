"use client";

import { BorderButton } from "@/components/UI/Button/BorderButton";
import GradientIcon from "@/components/UI/Icon/GradientIcon";
import { Text } from "@/components/UI/Text/Text";
import { Divider, Spacer } from "@nextui-org/react";
import { NecessityModal } from "./NecessityModal";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ModalsDispatchContext } from "@/components/Utilities/Providers/ModalProvider";
import { MethodModal } from "@/components/Widget/Modal/MethodModal";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { IntegrationStepModal } from "./IntegrationStepModal";

import { CustomImage } from "@/components/Utilities/Asset/CustomImage";

import { AboutArticle } from "./UI/Article";
import { images } from "@/assets/images/images";
import { AboutContent } from "./UI/AboutContent";

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
      className="bg-black md:pt-[168px] pt-[42px] pb-[146px] w-full flex flex-col items-center relative"
      id="about"
    >
      <div
        style={{
          backgroundImage: `url(${images["images/bg/bg_about.png"].src})`,
          backgroundSize: "100% 962px",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      <Text
        variant="t2"
        className="text-white md:!text-[50px] !text-[30px] md:!font-bold text-center mb-[95px]"
      >
        About
      </Text>
      <AboutArticle />
      <AboutTitle />

      <AboutContent />
      <div className="relative">
        <Text
          variant="h0"
          className="!text-[45px] max-md:!text-[20px] !font-extrabold text-white text-center max-md:font-bold mb-20"
        >
          다계층(multi-level),
          <br className="md:hidden" /> 다목적(multi-objective) 오토튜닝
          프레임워크 개발
        </Text>
        <div className="flex xl:flex-row flex-col gap-10 items-center md:justify-center w-full max-md:px-5">
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
                  className="text-white group-hover:bg-primary-assistive group-hover:bg-clip-text group-hover:text-transparent leading-[33.60px] max-md:!text-[20px]"
                >
                  {button.label}
                </Text>
              </BorderButton>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

// const AboutTitle: React.FC = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   const isInView = useInView(ref, {
//     amount: 0.8,
//     once: false,
//     margin: "-150px",
//   });

//   return (
//     <div className="w-full px-5" ref={ref}>
//       <Text
//         variant="h0"
//         className="md:!text-[50px] md:!font-semibold !text-[24px] text-white text-center mb-[84px] pt-5 md:pt-[115px] max-lg:whitespace-nowrap md:!leading-[55px]"
//       >
//         엑사급 초고성능컴퓨터의
//         <br className="lg:hidden" /> 잠재 성능을{" "}
//         <motion.span
//           className="px-2 max-h-[64px] inline-block"
//           animate={{
//             letterSpacing: isInView ? "0.1em" : "0em",
//             transition: { duration: 0.5, ease: "easeInOut" },
//           }}
//         >
//           <AnimatePresence mode="wait">
//             {isInView ? (
//               <motion.div
//                 key="expanded"
//                 className="flex bg-primary-assistive bg-clip-text text-transparent"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 최
//                 <CustomImage
//                   src="images/icons/slash.svg"
//                   alt="slash"
//                   className="md:mx-1 transform max-md:scale-[0.65] max-md:-rotate-12 max-md:w-5"
//                 />
//                 대
//                 <CustomImage
//                   src="images/icons/slash.svg"
//                   alt="slash"
//                   className="md:mx-1 transform max-md:scale-[0.65] max-md:-rotate-12 max-md:w-5"
//                 />
//                 한
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="collapsed"
//                 className="bg-primary-normal px-2 pt-1.5"
//                 initial={{ opacity: 1 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 1 }}
//               >
//                 최대한
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.span>
//         활용하며
//         <br className="" />
//         <Spacer y={5} className="max-lg:block" />
//         <Spacer y={20} className="lg:hidden max-md:hidden" /> 응용별, 하드웨어
//         별 기반
//         <br className="lg:hidden" /> SW 개발 노력을{" "}
//         <motion.span
//           className="px-2 py-1.5 max-h-[64px] inline-block"
//           animate={{
//             letterSpacing: isInView ? "0.1em" : "0em",
//             transition: { duration: 0.5, ease: "easeInOut" },
//           }}
//         >
//           <AnimatePresence mode="wait">
//             {!isInView ? (
//               <motion.div
//                 key="expanded"
//                 className="flex bg-primary-strong px-2"
//                 initial={{ opacity: 1 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 1 }}
//               >
//                 최
//                 <CustomImage
//                   src="images/icons/square-dot.svg"
//                   alt="slash"
//                   className="mx-1 max-md:hidden"
//                 />
//                 <span className="md:hidden">·</span>
//                 소
//                 <CustomImage
//                   src="images/icons/square-dot.svg"
//                   alt="slash"
//                   className="mx-1 max-md:hidden"
//                 />
//                 <span className="md:hidden">·</span>화
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="collapsed"
//                 className="bg-primary-assistive px-2 pt-1.5"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 최소화
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.span>
//         하는
//       </Text>
//     </div>
//   );
// };

const AboutTitle: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: 0.8,
    once: false,
    margin: "-150px",
  });

  const textVariants = {
    initial: { opacity: 1, letterSpacing: "0em" },
    animate: {
      opacity: 1,
      letterSpacing: "0.1em",
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      x: -20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        y: 40,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="w-full px-5" ref={ref}>
      <Text
        variant="h0"
        className="md:!text-[50px] md:!font-semibold !text-[24px] text-white text-center mb-[84px] pt-5 md:pt-[115px] max-lg:whitespace-nowrap md:!leading-[55px]"
      >
        엑사급 초고성능컴퓨터의
        <br className="lg:hidden" /> 잠재 성능을{" "}
        <motion.span
          className="px-2 max-h-[64px] inline-block"
          variants={textVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <AnimatePresence mode="wait">
            {isInView ? (
              <motion.div
                key="expanded"
                className="flex bg-primary-assistive bg-clip-text text-transparent items-center justify-center"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                최
                <motion.div variants={imageVariants} className="transform">
                  <CustomImage
                    src="images/icons/slash.svg"
                    alt="slash"
                    className=" md:mr-1 transform max-md:scale-[0.65] max-md:-rotate-12 max-md:w-5 md:-translate-y-1"
                  />
                </motion.div>
                대
                <motion.div variants={imageVariants} className="transform">
                  <CustomImage
                    src="images/icons/slash.svg"
                    alt="slash"
                    className="md:mr-1 transform max-md:scale-[0.65] max-md:-rotate-12 max-md:w-5 md:-translate-y-1"
                  />
                </motion.div>
                한
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                className="bg-primary-normal px-2 pt-1.5"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
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
          className="px-2 py-1.5 max-h-[64px] inline-block"
          variants={textVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {isInView ? (
              <motion.div
                key="collapsed"
                className="bg-primary-assistive px-2 pt-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2, // 0.2초 딜레이 추가
                }}
              >
                최소화
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                className="flex bg-primary-strong px-2"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
              >
                최
                <CustomImage
                  src="images/icons/square-dot.svg"
                  alt="slash"
                  className="mx-1 max-md:hidden"
                />
                <span className="md:hidden">·</span>
                소
                <CustomImage
                  src="images/icons/square-dot.svg"
                  alt="slash"
                  className="mx-1 max-md:hidden"
                />
                <span className="md:hidden">·</span>화
              </motion.div>
            )}
          </AnimatePresence>
        </motion.span>
        하는
      </Text>
    </div>
  );
};
