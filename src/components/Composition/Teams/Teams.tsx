"use client";
import { AssistiveStyle } from "@/components/UI/Text/AssistiveStyle";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { RepresentativeCard } from "./Widget/RepresentativeCard";
import { UniversityCarousel } from "./Widget/UniversityCarousel";
import { useTeams } from "@/hooks/useTeams";
import { TeamCarousel } from "./Widget/TeamCarousel";

const AGNECY_LIST = [
  { name: "서울대학교", key: "seoul" },
  { name: "포항공과대학교", key: "pohang" },
  { name: "연세대학교", key: "yeonsei" },
  { name: "건국대학교", key: "konkuk" },
  { name: "아주대학교", key: "ajou" },
  { name: "키스트", key: "kisti" },
];

export const Teams: React.FC = () => {
  const { data: teams } = useTeams();
  return (
    <div className="w-full pt-[93px] pb-[177px]" id="teams">
      <Text
        variant="t1"
        className="uppercase !text-[50px] text-primary-normal text-center mb-11"
      >
        teams
      </Text>

      <AssistiveStyle variant="h5" className="text-center mb-4">
        <span className="text-black">
          원천기술 확보 전문 인력 양성이 가능한
          <br className="md:hidden" />{" "}
        </span>{" "}
        연구 중심의 대학(연세대, 포항공대, 건국대, 아주대)과
        <br /> 초고성능컴퓨팅 정부책임기관(한국과학기술정보연구원){" "}
        <span className="text-black">이 참여하는 컨소시엄</span>
      </AssistiveStyle>
      <div className="flex items-center flex-wrap gap-6 justify-center mb-[71px]">
        {AGNECY_LIST.map((agency) => (
          <CustomImage
            src={`images/agency/${agency.key}.svg`}
            alt={agency.name}
            key={agency.key}
          />
        ))}
      </div>
      <div className="relative">
        <div className="absolute right-0 top-10 z-10">
          <UniversityCarousel teams={teams} />
        </div>
        <TeamCarousel teams={teams} />
      </div>
    </div>
  );
};
