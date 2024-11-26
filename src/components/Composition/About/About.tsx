"use client";
import { Icon } from "@/assets/Icon";
import { BorderButton } from "@/components/UI/Button/BorderButton";
import GradientIcon from "@/components/UI/Icon/GradientIcon";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { Divider, useDisclosure } from "@nextui-org/react";
import React from "react";

export const About: React.FC = () => {
  const necessary = useDisclosure();
  const method = useDisclosure();
  const integrated = useDisclosure();
  const DescriptionButtonList = [
    { label: "연구필요성", key: "necessary", onClick: necessary.onOpen },
    { label: "추진방법", key: "method", onClick: method.onOpen },
    { label: "연구 통합 단계", key: "integrated", onClick: integrated.onOpen },
  ];
  return (
    <div className="bg-black  pb-[146px] flex flex-col items-center" id="about">
      <AboutTitle />
      <div className="h-[480px] w-full bg-white max-w-[1140px] mb-[60px]">
        다계층 다목적 관련 내용
      </div>
      <Text
        variant="h0"
        className="!text-[45px] !font-extrabold text-white text-center mb-20"
      >
        다계층(multi-level),다목적(multi-objective) 오토튜닝프레임워크개발
      </Text>
      <div className="flex gap-10 items-center">
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
