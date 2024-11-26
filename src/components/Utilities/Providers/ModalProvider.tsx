import { useState, PropsWithChildren, createContext, ReactNode } from "react";


interface ModalProps {
  Component: React.FC<any>;
  props?: Record<string, any>;
}


interface ModalsDispatch {
  open: (Component: React.FC<any>, props?: Record<string, any>) => void;
  close: (Component: React.FC<any>) => void;
}


export const ModalsStateContext = createContext<ModalProps[]>([]);
export const ModalsDispatchContext = createContext<ModalsDispatch>({
  open: () => {},
  close: () => {},
});

const ModalsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [openedModals, setOpenedModals] = useState<ModalProps[]>([]);

  const open = (Component: React.FC<any>, props?: Record<string, any>) => {
    setOpenedModals((modals) => [...modals, { Component, props }]);
  };

  const close = (Component: React.FC<any>) => {
    setOpenedModals((modals) =>
      modals.filter((modal) => modal.Component !== Component),
    );
  };

  const dispatch: ModalsDispatch = { open, close };

  return (
    <ModalsDispatchContext.Provider value={dispatch}>
      <ModalsStateContext.Provider value={openedModals}>
        {children}
      </ModalsStateContext.Provider>
    </ModalsDispatchContext.Provider>
  );
};

export default ModalsProvider;
