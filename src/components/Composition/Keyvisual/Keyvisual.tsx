import { Text } from "@/components/UI/Text/Text";
import React, { PropsWithChildren } from "react";

export const KeyVisual: React.FC = () => {
  return (
    <section className="w-full pb-[84px] max-w-[1456px] mx-auto min-h-[750px] flex items-end relative overflow-y-hidden overflow-x-visible">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover transform scale-[1.3] -translate-x-[60px]"
      >
        <source src="/images/hyperf_main.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex items-end pb-[100px]">
        <KeyTitle />
      </div>
    </section>
  );
};

const KeyTitle: React.FC = () => {
  return (
    <div className="px-5 tracking-tighter">
      <Text variant="h4">초고성능컴퓨팅 SW 생태계조성사업</Text>
      <Text variant="h0" className="!text-[64px]">
        엑사급 초고성능 컴퓨터를 위한
        <br />
        다계층/다목적 오토튜닝 프레임 워크 개발
      </Text>
      <Text variant="h4" className="uppercase">
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
