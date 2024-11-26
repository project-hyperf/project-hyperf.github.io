import { GradientBox } from "@/components/UI/Box/GradientBox";
import { AssistiveStyle } from "@/components/UI/Text/AssistiveStyle";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
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
      className="min-w-[800px] max-w-[1440px] h-[1248px] max-h-[800px] min-h-[1248px] bg-white"
    >
      <div>
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Text>Integration Step Modal</Text>
          </ModalBody>
        </ModalContent>
      </div>
    </Modal>
  );
};
