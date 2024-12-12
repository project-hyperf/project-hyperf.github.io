"use client";
import { AssistiveStyle } from "@/components/UI/Text/AssistiveStyle";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useIsMobile } from "@/hooks/useWindowSize";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
interface MethodModalProps {
  onClose?: () => void;
  isOpen?: boolean;
}
export const MethodModal: React.FC<MethodModalProps> = ({}) => {
  const isMobile = useIsMobile();

  return (
    <>
      <ModalHeader className="pt-10">
        <AssistiveStyle
          variant="h0"
          className="!text-[51px] text-center !font-light !leading-[61.20px] w-full max-md:!text-[36px] max-md:!leading-[43.2px]"
        >
          추진방법
        </AssistiveStyle>
      </ModalHeader>
      <ModalBody className="scrollbar-hide">
        <div className="flex flex-col items-center gap-10 md:px-[70px]">
          <Text
            variant="h4"
            className="font-bold text-center md:leading-[33.6px] max-md:!text-base max-md:tracking-[0]"
          >
            오토튜닝 오버헤드를 줄일 수 있는 탐색 및 비용 모델 학습 방법을
            적용하여 비용을 절감 
          </Text>
          <div className="flex">
            {isMobile ? (
              <CustomImage
                src="images/modal/method/mobile-method-content.png"
                alt="추진 방법 도식화"
              />
            ) : (
              <CustomImage
                src="images/modal/method/method-content.png"
                alt="추진 방법 도식화"
              />
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </>
  );
};
