import { AssistiveStyle } from "@/components/UI/Text/AssistiveStyle";
import { Text } from "@/components/UI/Text/Text";
import { ModalBody, ModalHeader } from "@nextui-org/react";
import classNames from "classnames";

import React, { useEffect, useRef, useState } from "react";

interface IntegrationStepModalProps {}

export const IntegrationStepModal: React.FC<IntegrationStepModalProps> = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ModalHeader className="flex justify-center item-center pt-[50px] pb-[48px] max-md:pt-[30px] max-md:pb-[30px]">
        <AssistiveStyle
          variant="h1"
          className="text-[51px] font-light leading-[61.20px] max-md:text-[32px] max-md:leading-[42px]"
        >
          연구 통합 단계
        </AssistiveStyle>
      </ModalHeader>
      <ModalBody className="px-[70px] max-md:px-[20px]">
        <div
          className="w-full h-full overflow-scroll scrollbar-hide wrapper"
          ref={scrollRef}
        >
          {RESEARCH_TIME_LINE.map((item, idx) => (
            <Divider
              key={item.year}
              year={item.year}
              summary={item.summary}
              list={item.list}
              idx={idx}
              scrollRef={scrollRef}
            />
          ))}
        </div>
      </ModalBody>
    </>
  );
};
interface DividerProps {
  year: string;
  summary: string;
  list: { id: string; content: string }[];
  idx: number;
  scrollRef: React.RefObject<HTMLDivElement>;
}
const Divider: React.FC<DividerProps> = ({
  year,
  summary,
  list,
  idx,
  scrollRef,
}) => {
  const stickyTopRef = useRef<HTMLDivElement>(null);
  const [titleHeight, setTitleHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTitleHeight = () => {
      if (stickyTopRef.current) {
        const rect = stickyTopRef.current.getBoundingClientRect();

        setTitleHeight(rect.height);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateTitleHeight();
    });

    if (stickyTopRef.current) {
      resizeObserver.observe(stickyTopRef.current);
    }

    // 초기 업데이트
    updateTitleHeight();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const sticky = stickyTopRef.current;
    const scroll = scrollRef.current;

    if (!sticky || !scroll) return;

    const observer = new IntersectionObserver(([entry]) => {}, {
      root: scroll,
      threshold: 1,
    });
    observer.observe(sticky);
  }, [scrollRef]);

  return (
    // <div key={year}>
    //   <div className="flex flex-col">

    <React.Fragment key={year}>
      <div
        className={classNames(
          "sticky max-md:static bg-white overflow-hidden flex flex-col",
          `max-md:!min-h-${
            idx === 0 ? "[108px]" : idx === 3 ? "[204px]" : "[104px]"
          }`,
        )}
        ref={stickyTopRef}
        style={{
          top: `${
            idx *
            (window.innerWidth >= 768
              ? 106.97
              : idx === 1
              ? 104
              : idx === 3
              ? 30
              : 96)
          }px`,
        }}
      >
        <div className="border-dashed border-1 max-md:border-[0.5px] border-black" />
        <div className="flex flex-1 items-center max-md:flex-col max-md:items-start">
          <Text
            variant="b2"
            className="pl-[18px] !text-[24px] !font-bold mt-3 max-md:!text-[14px] max-md:pl-[10px]"
          >
            {year}
          </Text>
          <Text
            variant="h4"
            className="!text-[38px] !font-light px-[115px] tracking-[0px] mt-3 whitespace-pre-wrap max-md:!text-[15px] max-md:px-[10px] max-md:mt-2"
          >
            {summary}
          </Text>
        </div>
      </div>
      <div
        className={classNames(
          "w-full box-border md:mt-[60px] pl-[211px] pr-[178px] md:mb-[88px] md:min-h-[180px] max-md:pl-[0px] max-md:pr-[0px] max-md:mt-[16px] max-md:mb-[12px] ",
          idx === 3 ? "max-md:min-h-[0px]" : "max-md:h-fit",
        )}
        ref={contentRef}
      >
        {list?.map((item) => renderList(item.id, item.content))}
      </div>
    </React.Fragment>

    //   </div>
    // </div>
  );
};

function renderList(
  id: string,
  content: string,
  highlightColor = "text-primary-normal",
) {
  return (
    <div
      key={id}
      className="w-full h-16 bg-[#f2f2f2] rounded-[50px] mb-[5px] md:mb-[12px] md:!min-h-[50px] box-border flex items-center max-md:h-auto max-md:py-[6px] max-md:rounded-[25px]"
    >
      <Text
        variant="h4"
        className="text-[24px] !font-normal font-[D2Coding] leading-[33.6px] ml-[29px] max-md:!text-[11px] max-md:leading-[24px] max-md:ml-[15px] max-md:pr-[15px] max-md:whitespace-nowrap"
      >
        {id} {`{`}
        <span className={highlightColor}>{content}</span>
        {`}`}
      </Text>
    </div>
  );
}

const SECOND_LIST = [
  {
    id: "01",
    content: "하드웨어 측정 기반 CPU 전력 예측 모델 개발",
  },
  { id: "02", content: "다목적/다계층 오토튜닝 프레임워크 구현" },
  { id: "03", content: "병렬 프로그래밍 모델 및 반복문 오토튜닝 구현" },
  { id: "04", content: "프레임워크 연계 사용자 인터페이스 정의 및 설계" },
];

const THIRD_LIST = [
  {
    id: "01",
    content: "고차원 HPC 연산자를 위한 프론트엔드 개발",
  },
  { id: "02", content: "오토튜닝 설정 인터페이스 구현" },
  { id: "03", content: "데이터 레이아웃 최적화 설계 및 구현" },
];

const FOURTH_LIST = [
  {
    id: "01",
    content: "하이브리드 MPI-X 프로그래밍모델연구",
  },
  { id: "02", content: "강화학습 기반의 적응형 스케줄링 기법 개발" },
  { id: "03", content: "병렬 I/O 설정 오토튜닝 프레임워크 개발" },
  { id: "04", content: "잡 스케줄러 최적화와 인터페이스" },
  { id: "05", content: "병렬 저장장치 시스템 최적화와 인터페이스" },
  { id: "06", content: "구현 선택 최적화 기법 연구 및 개발" },
];

const RESEARCH_TIME_LINE = [
  {
    year: "2차년도",
    summary:
      "반복문 최적화 및 병렬 프로그래밍 모델 최적화와\n오토튜닝 메커니즘 연계, 성능/전력 동시 최적화 비용 모델 개발",
    list: SECOND_LIST,
  },
  {
    year: "3차년도",
    summary: "데이터 레이아웃 최적화와\n오토튜닝 메커니즘 연계",
    list: THIRD_LIST,
  },
  {
    year: "4차년도",
    summary:
      "잡 스케줄링 최적화, 병렬 저장장치 시스템 최적화,\n구현선택 최적화 기법과 오토튜닝 메커니즘 연계",
    list: FOURTH_LIST,
  },
  {
    year: "",
    summary: "",
    list: [],
  },
];
