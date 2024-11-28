import { AssistiveStyle } from "@/components/UI/Text/AssistiveStyle";
import { Text } from "@/components/UI/Text/Text";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

interface IntegrationStepModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationStepModal: React.FC<IntegrationStepModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      placement="center"
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: "w-[1440px]",
      }}
      className="min-w-[1440px] max-w-[1440px] h-[180px] max-h-[1600px] min-h-[1600px] bg-white"
    >
      <div>
        <ModalContent>
          <ModalHeader className="flex justify-center item-center  pt-[50px] pb-[48px]">
            <AssistiveStyle
              variant="h1"
              className="text-[51px] font-normal leading-[61.20px]"
            >
              연구 통합 단계
            </AssistiveStyle>
          </ModalHeader>
          <ModalBody className="px-[70px]">
            {RESEARCH_TIME_LINE.map((item) =>
              Divider(item.year, item.summary, item.list)
            )}
            <div className="border-dashed border-1 border-black" />
          </ModalBody>
        </ModalContent>
      </div>
    </Modal>
  );
};

function Divider(
  year: string,
  summary: string,
  list: { id: string; content: string }[]
) {
  return (
    <div key={year}>
      <div className="border-dashed border-1 border-black" />
      <div className="flex flex-col">
        <div className="flex  flex-row">
          <Text variant="b2" className="pl-[18px] !text-[24px] !font-bold mt-3">
            {year}
          </Text>
          <Text
            variant="h4"
            className="text-[38px] !font-light px-[115px] tracking-tight mt-3"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </div>
        <div className="w-full box-border mt-[60px] pl-[211px] pr-[178px] mb-[88px]">
          {list.map((item) => renderList(item.id, item.content))}
        </div>
      </div>
    </div>
  );
}

function renderList(
  id: string,
  content: string,
  highlightColor = "text-primary-normal"
) {
  return (
    <div
      key={id}
      className="w-full h-16 bg-[#f2f2f2] rounded-[50px] mb-[12px] box-border flex items-center"
    >
      <Text
        variant="h4"
        className="text-[24px] !font-normal font-['D2Coding'] leading-[33.6px] ml-[29px]"
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
      "반복문 최적화 및 병렬 프로그래밍 모델 최적화와<br/> 오토튜닝 메커니즘 연계, 성능/전력 동시 최적화 비용 모델 개발",
    list: SECOND_LIST,
  },
  {
    year: "3차년도",
    summary: "데이터 레이아웃 최적화와<br/> 오토튜닝 메커니즘 연계",
    list: THIRD_LIST,
  },
  {
    year: "4차년도",
    summary:
      "잡 스케줄링 최적화, 병렬 저장장치 시스템 최적화,<br/> 구현선택 최적화 기법과 오토튜닝 메커니즘 연계",
    list: FOURTH_LIST,
  },
];
