"use client";

import { BorderButton } from "@/components/UI/Button/BorderButton";
import GradientIcon from "@/components/UI/Icon/GradientIcon";
import { Text } from "@/components/UI/Text/Text";
import { Divider } from "@nextui-org/react";
import { NecessityModal } from "./NecessityModal";
import React, { useContext } from "react";
import { ModalsDispatchContext } from "@/components/Utilities/Providers/ModalProvider";
import { MethodModal } from "@/components/Widget/Modal/MethodModal";
import { useTransform, motion, useScroll } from "framer-motion";
import { IntegrationStepModal } from "./IntegrationStepModal";
import classNames from "classnames";

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
    <div className="bg-black  pb-[146px] flex flex-col items-center" id="about">
      <AboutTitle />

      <AboutContent />

      <Text
        variant="h0"
        className="!text-[45px] !font-extrabold text-white text-center mb-20"
      >
        다계층(multi-level),다목적(multi-objective) 오토튜닝프레임워크개발
      </Text>
      <div className="flex md:flex-row flex-col gap-10 items-center">
        {DescriptionButtonList.map((button, idx) => (
          <React.Fragment key={idx}>
            <BorderButton
              onClick={button.onClick}
              className="hover:!bg-white group"
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
  return (
    <div>
      <Text
        variant="h0"
        className="!text-[50px] text-white text-center mb-[84px] pt-[115px]"
      >
        엑사급 초고성능 컴퓨터의 잠재 성능을 최대한 활용하며
        <br /> 응용별, 하드웨어 별 기반 SW 개발 노력을 최소화 하는
      </Text>
    </div>
  );
};

const AboutContent: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const containerWidth = useTransform(
    scrollYProgress,
    [0, 0.07, 0.19, 0.32, 0.41, 0.5],
    ["2px", "2px", "480px", "480px", "2px", "2px"],
  );
  const containerPadding = useTransform(
    scrollYProgress,
    [0, 0.07, 0.19, 0.32, 0.41, 0.5],
    ["0px", "0px", "60px", "60px", "0px", "0px"],
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.15, 0.19, 0.41, 0.5],
    [0, 0, 0, 1, 0, 0],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 0.05, 0.19, 0.23, 0.41, 0.5],
    [20, 20, 15, 0, 15, 20],
  );
  return (
    <motion.div className="flex gap-4 w-[1440px] mx-auto mb-[61px]">
      {ABOUT_CONTENT.map((item, index) => (
        <motion.div
          key={item.key}
          className="h-[480px] border-white border-l-1 shadow-md  flex flex-col  overflow-hidden"
          style={{
            width: containerWidth,
            padding: containerPadding,
            overflow: "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* 컨텐츠 */}

          <>
            <motion.div className={classNames(`mb-4 flex flex-col flex-1 `)}>
              <motion.div
                style={{
                  opacity: textOpacity,
                  y: textY,
                }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.3,
                }}
              >
                <Text variant="h2" className="text-white text-[34px] font-thin">
                  {item.title}
                </Text>
                <Text variant="t2" className="text-white text-[44px] font-bold">
                  {item.key}
                </Text>
              </motion.div>
              <motion.div
                style={{ opacity: textOpacity, y: textY }}
                transition={{
                  delay: index * 0.6,
                  duration: 0.3,
                }}
                className="mt-auto"
              >
                <Text className="text-white text-sm whitespace-pre-wrap">
                  {item.content}
                </Text>
              </motion.div>
            </motion.div>
          </>
        </motion.div>
      ))}
    </motion.div>
  );
};
// const AboutContent: React.FC = () => {
//   const { scrollYProgress } = useScroll();

//   const containerWidth = useTransform(
//     scrollYProgress,
//     [0, 0.2, 0.3, 0.7],
//     ["2px", "480px", "480px", "2px"],
//   );

//   return (
//     <motion.div className="flex gap-4 w-[1440px] mx-auto mb-[61px]">
//       {ABOUT_CONTENT.map((item, index) => (
//         <motion.div
//           key={item.key}
//           className="h-[480px] border-white border-l-1 shadow-md p-[60px] flex flex-col justify-between"
//           style={{
//             width: containerWidth,
//           }}
//           transition={{ duration: 0.3 }}
//         >
//           {/* <div> */}
//           <motion.div
//             className="mb-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               delay: index * 0.2,
//               duration: 0.3,
//             }}
//           >
//             <Text variant="h2" className="text-white text-[34px] font-thin">
//               {item.title}
//             </Text>
//           </motion.div>
//           <motion.div
//             className="mb-2"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               delay: index * 0.4,
//               duration: 0.3,
//             }}
//           >
//             <Text variant="t2" className="text-white text-[44px] font-bold">
//               {item.key}
//             </Text>
//           </motion.div>
//           {/* </div> */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               delay: index * 0.6,
//               duration: 0.3,
//             }}
//           >
//             <Text className="text-white text-sm whitespace-pre-wrap">
//               {item.content}
//             </Text>
//           </motion.div>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// };
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
