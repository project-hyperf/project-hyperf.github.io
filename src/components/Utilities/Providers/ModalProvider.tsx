"use client";
import React, { createContext, useState, PropsWithChildren } from "react";
import { Modal, useDisclosure } from "@nextui-org/react";
import { CloseButton } from "@/components/UI/Button/CloseButton";

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
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="min-w-[800px] max-w-[1440px] h-[844px]"
        scrollBehavior="inside"
        classNames={{
          closeButton: "transform scale-[1.75] right-4 top-4",
        }}
        // classNames={{
        //   base: "relative",
        //   closeButton: "absolute top-4 right-4",
        // }}
        // closeButton={<CloseButton onClick={onClose} />}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalsProvider;
