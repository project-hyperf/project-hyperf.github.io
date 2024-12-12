import { GradientBox } from "@/components/UI/Box/GradientBox";
import { AssistiveStyle } from "@/components/UI/Text/AssistiveStyle";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

interface NecessityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NecessityModal: React.FC<NecessityModalProps> = ({}) => {
  return (
    <>
      <ModalHeader className="justify-center px-4">
        <AssistiveStyle
          variant="t1"
          className="text-center pt-4 !font-light max-md:!text-[36px]"
        >
          연구필요성
        </AssistiveStyle>
      </ModalHeader>
      <ModalBody className="md:px-[110px] px-5 scrollbar-hide">
        <Text
          variant="h4"
          className="text-center font-normal max-md:!text-[16px] max-md:!leading-snug tracking-[0px]"
        >
          고성능 컴퓨팅 영역이 확장됨에 따라, 엑사급FLOPS를 제공하는
          초고성능컴퓨터의 수요가 커지고 있고,
          <br />
          점점 병렬 프로그래밍과 자원 관리,
          <br className="md:hidden" /> 성능 최적화가 필수적으로 요구된다.
        </Text>

        <div className="flex justify-center items-center my-4">
          <CustomImage
            src={`images/union/Union.png`}
            alt={"arrow"}
            className="w-[99px] h-[79px] max-md:w-[60px] max-md:h-[48px]"
          />
        </div>

        <div className="w-full bg-primary-bg">
          <Text
            variant="b3"
            className="text-center text-white pt-[34px] pb-[34px] !text-[26px] max-md:!text-[14px] max-md:py-5 px-4 max-md:px-[13px]"
          >
            반복적인 최적화 개발을 최소화하면서도 확장
            <br className="md:hidden" />과 적응이 용이한 "프레임워크" 형태의
            최적화
            <br className="md:hidden" /> 메커니즘이 요구됨.
          </Text>
        </div>

        <Text
          variant="h4"
          className="text-center text-primary-normal pt-[41px] !text-[26px] max-md:!text-[17px] max-md:pt-4"
        >
          최적화 프레임워크 개발에 필요한 요구사항
        </Text>

        <div className="flex justify-center md:flex-nowrap flex-wrap items-center pt-6 gap-[18px] max-md:gap-3 max-md:pt-3">
          {[
            "기반 SW 통합",
            "다계층 최적화",
            "확장형\n 오토튜닝\n 메커니즘",
            "성능/전력\n 동시 최적화",
            "고차원 표현형",
          ].map((text, index) => (
            <RequirementCard key={index} text={text} />
          ))}
        </div>

        <div className="flex justify-center md:flex-nowrap flex-wrap items-center pt-[53px] gap-[15px] px-[5px] max-md:pt-6">
          {[
            "메커니즘과 여러 계층의\n 최적화를 병렬적으로 개발",
            "오토튜닝사용자\n 인터페이스 개발",
            "확장 용이성을 위한\n 오토튜닝 설정 인터페이스 제공",
          ].map((text, index) => (
            <FeatureCard key={index} text={text} />
          ))}
        </div>

        <div className="flex justify-center items-center pb-[24.4px] max-md:py-6">
          <CustomImage
            src={`images/union/Union.png`}
            alt={"arrow"}
            className="w-[99px] h-[79px] max-md:w-[60px] max-md:h-[48px]"
          />
        </div>

        <div className="w-full bg-primary-assistive mb-[82px] max-md:mb-10">
          <Text
            variant="h5"
            className="!text-[26px] text-center text-white pt-[34px] pb-[34px] max-md:!text-[20px] max-md:py-9 px-4 max-md:px-[15px]"
          >
            엑사급 초고성능컴퓨터의
            <br className="md:hidden" /> 잠재성능을 최대한 활용하면서
            <br className="md:hidden" /> 응용별, 하드웨어별 기반 SW의
            <br className="md:hidden" /> 개발 노력을 최소화
          </Text>
        </div>
      </ModalBody>
    </>
  );
};

const RequirementCard = ({ text }: { text: string }) => (
  <div className="bg-[#f0f0f0] basis-1/5 h-[215px] flex justify-center items-center md:whitespace-pre-line max-md:basis-[45%] max-md:h-[69px]">
    <Text
      variant="h4"
      className="text-inverse-primary p-4 max-md:px-6 text-center !text-[26px] max-md:!text-[14px] max-md:leading-snug"
    >
      {text}
    </Text>
  </div>
);

const FeatureCard = ({ text }: { text: string }) => (
  <div className="basis-1/3 md:h-[113px] flex-1 whitespace-pre-line max-md:basis-full">
    <GradientBox>
      <AssistiveStyle
        variant="h4"
        className="text-center !text-[24px] max-md:!text-[17px] max-md:leading-snug"
      >
        {text}
      </AssistiveStyle>
    </GradientBox>
  </div>
);
