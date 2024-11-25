"use client";
import { PropsWithChildren } from "react";
import { useHeaderMargin } from "@/hooks/useHeader";
import classNames from "classnames";
interface MainProps {}

export const Main: React.FC<PropsWithChildren<MainProps>> = ({ children }) => {
  const { GNBHeight } = useHeaderMargin();
  console.log(GNBHeight);
  return (
    <main
      className={classNames(`min-h-screen`)}
      style={{ paddingTop: `${GNBHeight}px` }}
    >
      {children}
    </main>
  );
};
