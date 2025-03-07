"use client";

import { images } from "@/assets/images/images";
import { GeneralButton } from "@/components/UI/Button/GeneralButton";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useIsMobile } from "@/hooks/useWindowSize";
import classNames from "classnames";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Outcomes: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const isMobile = useIsMobile();
  const [selectedStep, setSelectedStep] = useState(1);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    setViewportHeight(window.innerHeight);

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const step1Y = useTransform(
    scrollYProgress,
    [0.1, 0.35],
    [viewportHeight * 0.2, -viewportHeight * 0.05],
  );

  const step1Opacity = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);

  const step2Y = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    [viewportHeight * 0.2, -viewportHeight * 0.02],
  );

  const step2Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.45, 0.9],
    [0, 1, 1],
  );

  const smoothScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  const x = useTransform(smoothScrollY, [0, 1], [0, -2600]);

  return (
    <div className="pt-[104px]">
      <div>
        <Text
          variant="t1"
          className="text-center uppercase text-primary-normal md:text-[50px] text-[30px]"
        >
          Outcomes
        </Text>
        <Text
          variant="h4"
          className="text-center pt-12 text-primary-normal max-md:pt-6"
        >
          예상성과
        </Text>
      </div>
      {isMobile ? (
        <div className="pt-2">
          <div className="btn-group flex justify-center bg-transparent">
            <GeneralButton
              className={classNames(
                "bg-transparent relative w-[120px] h-[100px]",
                selectedStep === 1
                  ? "text-primary-normal"
                  : "grayscale opacity-30",
              )}
              onClick={() => setSelectedStep(1)}
            >
              <CustomImage
                src="images/icons/rectangle.svg"
                alt="Step 1"
                className="absolute inset-0"
                fill
              />
              1단계
            </GeneralButton>
            <GeneralButton
              className={classNames(
                "bg-transparent relative w-[120px] h-[100px] -ml-7",
                selectedStep === 2
                  ? "text-primary-normal"
                  : "grayscale opacity-30",
              )}
              onClick={() => setSelectedStep(2)}
            >
              <CustomImage
                src="images/icons/rectangle.svg"
                alt="Step 1"
                className="absolute inset-0"
                fill
              />
              2단계
            </GeneralButton>
          </div>
          <div className="step">
            <div className="">
              {selectedStep === 1 && <Step1 isMobile />}
              {selectedStep === 2 && <Step2 />}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-full relative "
          ref={sectionRef}
          style={{ height: "5000px" }}
        >
          <div
            className="sticky w-100vw h-[994px] mt-[106px] top-[140px] overflow-hidden  z-[20]"
            ref={stickyRef}
            id="real-outcomes"
          >
            <div className="relative h-full">
              <motion.div
                style={{ x }}
                className="absolute bottom-0 w-[4602px]"
              >
                <CustomImage
                  src="images/bg/bg-logo.png"
                  alt="HYPERF 로고"
                  className="opacity-10 h-[994px] aspect-auto"
                />
              </motion.div>

              <motion.div
                style={{
                  y: step1Y,
                  opacity: step1Opacity,
                }}
                className={classNames(
                  "relative flex items-center justify-center !z-[90]",
                )}
              >
                <Step1 />
              </motion.div>

              <motion.div
                style={{ y: step2Y, opacity: step2Opacity }}
                className={classNames(
                  "absolute inset-0 flex items-center justify-center",
                )}
              >
                <Step2 />
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
interface StepProps {
  isMobile?: boolean;
}
const Step1: React.FC<StepProps> = ({ isMobile = false }) => {
  return (
    <>
      <div className="w-full max-md:overflow-hidden flex md:flex-row md:flex-wrap flex-col md:gap-[143px] gap-10 items-center justify-center md:items-start pb-3 px-4">
        <div className="flex flex-col-reverse items-center gap-14">
          <Text
            variant="h4"
            className="text-center text-primary-normal !leading-[33.6px] whitespace-pre-wrap max-md:!text-[20px] max-md:leading-7"
          >
            TVM의 기능적, 성능적 확장을
            <br />
            중심으로 희소 행렬 및 전력 예측을
            <br />
            활용한 최적화 목표
          </Text>
          <div className="relative max-md:hidden">
            <CustomImage src="images/icons/rectangle.svg" alt="Step 1" />
            <div className="absolute inset-0 flex justify-center items-center z-20">
              <Text variant="h4" className="text-primary-normal">
                1단계
              </Text>
            </div>
          </div>
        </div>

        {/* 우측 Text & 박스 */}

        <div className="max-w-[798px] grow shrink relative z-[40]">
          <div className="w-full h-full mb-6">
            <Text
              variant="h4"
              className="max-md:text-[18px] max-md:text-center"
            >
              TVM 컴파일러를
              <br className="max-md:block hidden" /> HPC(고성능 컴퓨팅)를 사용해
              확장
            </Text>
          </div>
          <div className="md:grid md:grid-cols-2 flex max-md:w-screen max-md:-mx-4 max-md:px-[calc(50vw-160px)] overflow-y-auto overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide  max-md:items-end max-md:-mt-[300px] max-md:relative">
            {isMobile ? (
              <div className="flex gap-4 h-[638px] items-end ">
                <div
                  style={{
                    position: "absolute",
                    top: "80px",
                    left: "50px",
                    width: "1443px",
                    height: "311px",
                    backgroundImage: `url(${
                      images[`images/bg/bg-logo.png`].src
                    })`,
                    backgroundSize: "1443px 311px",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionX: "left 33px",
                    opacity: "0.1",
                    zIndex: "-1",
                  }}
                  className="md:hidden"
                />
                <div className="md:contents flex-none w-[320px] snap-center">
                  <StepBox
                    title={`HPC 프론트엔드\n  (OpenMP/MPI C) 개발`}
                    purpose={`반복문 병렬화 및 최적화를 통해\n TVM의 실행 성능 향상`}
                    tasks={[
                      "반복문 분리 및 개별 함수화",
                      "Tensor IR 기반 오토튜닝 및 코드생성",
                      "오브젝트 파일 생성",
                    ]}
                  />
                </div>
                <div className="md:contents flex-none w-[320px] snap-center">
                  <StepBox
                    title="희소 행렬 최적화"
                    purpose={`희소 행렬 포맷을 활용해\n 반복문 최적화 및 성능 개선`}
                    tasks={["희소 행렬 포맷 적용", "Blocked CSR 최적화"]}
                  />
                </div>
                <div className="md:contents flex-none w-[320px] snap-center">
                  <StepBox
                    title="전력 예측 모델"
                    purpose="전력 소비를 고려한 성능 최적화"
                    tasks={[
                      "성능 카운터 기반 전력 모델 개발",
                      "KNL 기반 모델 학습 및 최적화",
                      "TVM 탐색 모델 통합",
                    ]}
                  />
                </div>
                <div className="md:contents flex-none w-[320px] snap-center">
                  <StepBox
                    title={`전력 예측 기반\n 다목적 오토튜닝`}
                    purpose={`성능과 전력 소비의 균형을 맞춘\n 최적화를 달성`}
                    tasks={[
                      "소비 전력 예측 모델 활용",
                      "연산 패턴 기반 전력 예측 기술 적용",
                      "TVM 탐색 모델 통합",
                    ]}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="md:contents flex-none w-[320px] snap-center">
                  <StepBox
                    title={`HPC 프론트엔드\n  (OpenMP/MPI C) 개발`}
                    purpose={`반복문 병렬화 및 최적화를 통해\n TVM의 실행 성능 향상`}
                    tasks={[
                      "반복문 분리 및 개별 함수화",
                      "Tensor IR 기반 오토튜닝 및 코드생성",
                      "오브젝트 파일 생성",
                    ]}
                  />
                </div>
                <div className="md:contents flex-none w-[320px] snap-center">
                  <StepBox
                    title="희소 행렬 최적화"
                    purpose={`희소 행렬 포맷을 활용해\n 반복문 최적화 및 성능 개선`}
                    tasks={["희소 행렬 포맷 적용", "Blocked CSR 최적화"]}
                  />
                </div>
                <div className="md:contents flex-none w-[320px] snap-center">
                  <StepBox
                    title="전력 예측 모델"
                    purpose="전력 소비를 고려한 성능 최적화"
                    tasks={[
                      "성능 카운터 기반 전력 모델 개발",
                      "KNL 기반 모델 학습 및 최적화",
                      "TVM 탐색 모델 통합",
                    ]}
                  />
                </div>
                <div className="md:contents flex-none w-[320px] snap-center">
                  <StepBox
                    title={`전력 예측 기반\n 다목적 오토튜닝`}
                    purpose={`성능과 전력 소비의 균형을 맞춘\n 최적화를 달성`}
                    tasks={[
                      "소비 전력 예측 모델 활용",
                      "연산 패턴 기반 전력 예측 기술 적용",
                      "TVM 탐색 모델 통합",
                    ]}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const StepBox: React.FC<{
  title: string;
  purpose: string;
  tasks: string[];
}> = ({ title, purpose, tasks }) => {
  return (
    <>
      <div className="md:pt-6 md:pb-[29px] md:px-[24px] max-md:pt-[18px] max-md:pb-4 md:min-w-[384px] bg-primary-bg max-md:min-w-[273px] max-md:h-[333px] flex flex-col gap-3 justify-center border-2 border-black max-md:px-4">
        <div className="flex-1 flex flex-col gap-3 justify-center items-center">
          <Text
            variant="h4"
            className="text-white pb-3 whitespace-pre-wrap text-center !font-bold max-md:!text-[18px]"
          >
            {title}
          </Text>
          <Text
            variant="b2"
            className="text-white whitespace-pre-wrap text-center !font-semibold max-md:!text-[14px]"
          >
            {purpose}
          </Text>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={classNames(
                `bg-white w-full flex flex-col justify-center items-center border-2 border-black py-[12px] box-border`,
              )}
            >
              <Text
                variant="h5"
                className="text-black !font-bold !text-[16px] max-md:!text-[14px] w-full text-center"
              >
                {task}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Step2: React.FC = () => {
  return (
    <div className="w-full flex flex-wrap flex-row justify-center md:gap-[143px] gap-10 items-start pb-3 max-md:px-4">
      <div className="flex flex-col-reverse items-center md:gap-14 max-md:gap-10">
        <Text
          variant="h4"
          className="text-center text-primary-normal !leading-[33.6px] flex-wrap max-md:!text-[20px] max-md:!leading-7"
        >
          오토튜닝의 실행 흐름과 피드백을
          <br /> 통합 관리하는 프레임워크로,
          <br /> 구성 요소 간 상호작용을 정교화하여
          <br /> 최적화 프로세스를 자동화.
        </Text>

        <div className="relative w-full h-fit max-md:hidden">
          <div className="relative w-full h-[180px]">
            <CustomImage
              src="images/icons/rectangle.svg"
              alt="Step 1"
              className="absolute w-full inset-0 z-10 overflow-hidden"
            />
            <CustomImage
              src="images/icons/rectangle-black.svg"
              alt="Step 2"
              className="absolute w-full inset-0 -mt-[60px]"
              style={{
                clipPath: "inset(151px 0 0 0)",
              }}
            />
          </div>
          <div className="absolute inset-0 flex justify-center items-center z-20 -mt-[16px]">
            <Text variant="h4" className="text-primary-normal">
              2단계
            </Text>
          </div>
        </div>
      </div>

      <div className="max-w-[728px] shrink grow flex-wrap">
        <Text
          variant="h4"
          className="md:!leading-[33.6px] max-md:text-[18px] max-md:text-center !leading-[22.4px] mb-7"
        >
          오토튜닝 패스 및 구성 요소 간<br className="md:hidden" /> 피드백을
          관리하는 인터페이스 설계
          <br className="" />
          해당 인터렉션은 구성, 실행 순서,
          <br className="md:hidden" /> 오토튜닝 시간 등을 사용자의
          <br className="max-md:hidden" />
          요구 사항을 반영해 전체적으로 관리한다.
        </Text>

        {/* 모바일에서 캐러셀 */}
        <div className="md:block max-md:w-screen max-md:-mx-4 max-md:px-[calc(50vw-160px)] overflow-x-auto snap-x snap-mandatory scrollbar-hide max-md:items-end max-md:-mt-[300px] max-md:relative ">
          <div className="md:block flex items-end max-md:h-[638px]">
            <div
              style={{
                position: "absolute",
                top: "80px",
                left: "40px",
                width: "950px",
                height: "311px",
                backgroundImage: `url(${images[`images/bg/bg-logo.png`].src})`,
                backgroundSize: "1443px 311px",
                backgroundRepeat: "no-repeat",
                opacity: "0.1",
                zIndex: "-1",
              }}
              className="md:hidden"
            />
            {SECOND_STEP_CONTENT.map((box, index) => (
              <div
                key={index}
                className="md:mt-6 flex-none md:w-auto w-[320px] snap-center"
              >
                <div className="px-7 bg-primary-bg pt-6 pb-3 flex flex-col justify-between max-md:justify-center border-2 border-black max-md:px-4 max-md:h-[320px] max-md:gap-5 max-md:mr-4 ">
                  <Text
                    variant="h4"
                    className="text-white pb-3 text-center max-md:text-[16px]"
                  >
                    {box.title}
                  </Text>
                  <div className="flex flex-col gap-3">
                    {box.contents.map((content, idx) => (
                      <div
                        key={idx}
                        className="w-full bg-white flex justify-center items-center border-2 border-black"
                      >
                        <Text
                          variant="h5"
                          className="text-black !font-normal py-[12px] !text-[16px] px-4 text-center max-md:!text-[14px]"
                        >
                          {content}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SECOND_STEP_CONTENT = [
  {
    title: "TVM ↔ Job Scheduler",
    contents: [
      "TVM이 생성한 프로파일링 데이터를 스케줄러에 전달",
      "스케줄러는 자원 할당 및 실행 순서를 결정",
      "최적화 결과를 다시 TVM으로 전달",
    ],
  },
  {
    title: "Job Scheduler ↔ MPI",
    contents: [
      "네트워크 토폴로지에 따라 최적의 통신 알고리즘을 선택",
      "병렬 작업 간 데이터 전송을 최적화",
    ],
  },
  {
    title: "MPI ↔ Parallel File I/O",
    contents: [
      "병렬 작업에 맞는 I/O 설정 최적화",
      "실행 결과를 TVM으로 전달하여 피드백 루프 형성",
    ],
  },
];
