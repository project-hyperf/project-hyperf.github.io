import { AssistiveStyle } from "@/components/UI/Text/AssistiveStyle";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
interface MethodModalProps {
  onClose?: () => void;
  isOpen?: boolean;
}
export const MethodModal: React.FC<MethodModalProps> = ({}) => {
  return (
    <ModalContent className="flex flex-col items-center pt-[50px]">
      <ModalHeader className="">
        <AssistiveStyle
          variant="h0"
          className="text-[51px] text-center !font-light leading-[61.20px] w-full"
        >
          추진방법
        </AssistiveStyle>
      </ModalHeader>
      <ModalBody className="scrollbar-hide">
        <div className="flex flex-col items-center gap-10 md:px-[70px]">
          <Text variant="h4" className="font-bold text-center leading-[33.6px]">
            오토튜닝 오버헤드를 줄일 수 있는 탐색 및 비용 모델 학습 방법을
            적용하여 비용을 절감 
          </Text>
          <div className="flex">
            <CustomImage
              src="images/modal/method/method-content.png"
              alt="추진 방법 도식화"
            />
            {/* <div className="left">
              <div className="border-1 border-primary-strong flex py-[37px] px-5">
                <div className="basis1/5">프론트엔드</div>
                <div className="basis1/5">
                  <AssistiveStyle>반복문최적화</AssistiveStyle>
                </div>
                <div className="basis1/5">
                  <AssistiveStyle>병렬 프로그래밍 최적화</AssistiveStyle>
                </div>
                <div className="basis1/5">
                  <AssistiveStyle>최소 행렬 포맷 최적화</AssistiveStyle>
                </div>
                <div className="basis1/5">백엔드</div>
              </div>
            </div>
            <div className="center"></div>
            <div className="right">
              <div className="border-1 border-primary-strong flex py-[37px] px-5">
                <div className="basis1/5">프론트엔드</div>
                <div className="basis1/5">
                  <AssistiveStyle>반복문최적화</AssistiveStyle>
                </div>
                <div className="basis1/5">
                  <AssistiveStyle>병렬 프로그래밍 최적화</AssistiveStyle>
                </div>
                <div className="basis1/5">
                  <AssistiveStyle>최소 행렬 포맷 최적화</AssistiveStyle>
                </div>
                <div className="basis1/5">백엔드</div>
              </div>
            </div> */}
          </div>
        </div>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </ModalContent>
  );
};
