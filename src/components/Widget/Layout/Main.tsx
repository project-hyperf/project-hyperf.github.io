"use client";
import { PropsWithChildren } from "react";
import { useHeaderMargin } from "@/hooks/useHeader";
import classNames from "classnames";
interface MainProps {}

export const Main: React.FC<PropsWithChildren<MainProps>> = ({ children }) => {
  const { GNBHeight } = useHeaderMargin();

  return (
    <main className={classNames()}>
      <div style={{ height: `${GNBHeight}px`, width: "100%" }} />
      {children}
    </main>
  );
};
