import { Text } from "@/components/UI/Text/Text";
import React, { PropsWithChildren } from "react";

export const KeyVisual: React.FC = () => {
  return (
    <section className="w-full md:pb-[104px] md:mb-[80px] max-w-[1456px] mx-auto min-h-[417px] md:min-h-[750px] flex items-end relative overflow-hidden max-md:pt-[40px]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute md:inset-0 max-md:-top-24 max-md:-ml-[250px] max-md:min-w-[700px] max-md:h-[500px] object-cover transform lg:scale-[1.3] md:-translate-x-[60px] max-md:scale-80 flex-1 "
      >
        <source src="/images/hyperf_main.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex items-end md:pb-[30px] pb-[54px] max-md:mx-0">
        <KeyTitle />
      </div>
    </section>
  );
};

const KeyTitle: React.FC = () => {
  return (
    <div className="px-5 tracking-tighter">
      <Text
        variant="h4"
        className="hidden md:block tracking-[0] !font-bold mb-3"
      >
        초고성능컴퓨팅 SW 생태계조성사업
      </Text>
      <Text variant="h0" className="md:!text-[64px] !text-[28px] md:mb-3">
        엑사급
        <br className="md:hidden" /> 초고성능 컴퓨터를 위한
        <br />
        다계층/다목적
        <br className="md:hidden" /> 오토튜닝 프레임 워크 개발
      </Text>
      <Text
        variant="t3"
        className="uppercase hidden md:block !text-[24px] tracking-[0] !font-bold"
      >
        <StrongKeyWord>HY</StrongKeyWord>PERF High-
        <StrongKeyWord>Per</StrongKeyWord>
        formanceEnergy-AwareResourceAutotuning<StrongKeyWord>F</StrongKeyWord>
        ramework
      </Text>
    </div>
  );
};

const StrongKeyWord: React.FC<PropsWithChildren> = ({ children }) => {
  return <span className="text-primary-strong">{children}</span>;
};
