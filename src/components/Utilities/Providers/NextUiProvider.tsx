import { PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";

export const NextUiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
