import { Text } from "@/components/UI/Text/Text";
import React, { PropsWithChildren } from "react";

export const KeyVisual: React.FC = () => {
  return (
    <section className="w-full pb-[114px] pt-14 max-w-[1300px] mx-auto">
      <div>
        <KeyTitle />
      </div>
    </section>
  );
};

const KeyTitle: React.FC = () => {
  return (
    <div>
      <Text variant="h4">초고성능컴퓨팅 SW 생태계조성사업</Text>
      <Text variant="h0" className="!text-[64px]">
        엑사급 초고성능 컴퓨터를 위한
        <br />
        다계층/다목적 오토튜닝 프레임 워크 개발
      </Text>
      <Text variant="h4" className="uppercase">
        <StrongKeyWord>HY</StrongKeyWord>PERF High-
        <StrongKeyWord>Per</StrongKeyWord>
        formanceEnergy-AwareResourceAutotuningFramework
      </Text>
    </div>
  );
};

const StrongKeyWord: React.FC<PropsWithChildren> = ({ children }) => {
  return <span className="text-primary-strong">{children}</span>;
};
