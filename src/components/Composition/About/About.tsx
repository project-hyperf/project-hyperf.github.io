import { Text } from "@/components/UI/Text/Text";

export const About: React.FC = () => {
  return (
    <div className="bg-black pt-[115px] pb-[146px] flex flex-col items-center">
      <AboutTitle />
      <div className="h-[480px] w-full bg-white max-w-[1140px]">
        다계층 다목적 관련 내용
      </div>
      <Text
        variant="h0"
        className="!text-[45px] !font-extrabold text-white text-center"
      >
        다계층(multi-level),다목적(multi-objective) 오토튜닝프레임워크개발
      </Text>
    </div>
  );
};

const AboutTitle: React.FC = () => {
  return (
    <div>
      <Text
        variant="h0"
        className="!text-[50px] text-white text-center mb-[84px]"
      >
        엑사급 초고성능 컴퓨터의 잠재 성능을 최대한 활용하며
        <br /> 응용별, 하드웨어 별 기반 SW 개발 노력을 최소화 하는
      </Text>
    </div>
  );
};
