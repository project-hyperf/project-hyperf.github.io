"use client";
import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

export const RecoilProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
