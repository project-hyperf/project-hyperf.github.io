"use client";
import React, { createContext, useState, PropsWithChildren } from "react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { CloseButton } from "@/components/UI/Button/CloseButton";
import { motion } from "framer-motion";

interface ModalProps {
  Component: React.FC<any>;
}

interface ModalsDispatch {
  open: (Component: React.FC<any>, props?: Record<string, any>) => void;
  close: () => void;
}

export const ModalsStateContext = createContext<ModalProps | null>(null);
export const ModalsDispatchContext = createContext<ModalsDispatch>({
  open: () => {},
  close: () => {},
});

const ModalsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState<ModalProps | null>(null);

  const open = (Component: React.FC<any>, props?: Record<string, any>) => {
    setModal({ Component });
    onOpen();
  };

  const close = () => {
    onClose();
    setModal(null);
  };

  return (
    <ModalsDispatchContext.Provider value={{ open, close }}>
      <ModalsStateContext.Provider value={modal}>
        {children}
        {!!modal && (
          <>
            <ModalWrapper isOpen={isOpen} onClose={onClose}>
              <modal.Component onClose={close} />
            </ModalWrapper>
          </>
        )}
      </ModalsStateContext.Provider>
    </ModalsDispatchContext.Provider>
  );
};

interface ModalWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      className="md:min-w-[800px] md:max-w-[1440px] md:h-[844px] h-[700px] min-w-[340px] max-w-[360px] max-h-[90vh] rounded-none"
      scrollBehavior="inside"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.6,
              ease: "easeOut",
            },
          },
          exit: {
            y: 50,
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: "easeIn",
            },
          },
        },
      }}
      classNames={{
        // wrapper 클래스 수정
        wrapper: "items-center", // sm: 제거하고 항상 center로
        base: "m-auto", // sm: 제거하고 항상 auto margin
        backdrop: "bg-black/50",
        closeButton: "transform scale-[1.75] right-4 top-4",
      }}
    >
      <ModalContent>{(onClose) => <>{children}</>}</ModalContent>
    </Modal>
  );
};
export default ModalsProvider;
