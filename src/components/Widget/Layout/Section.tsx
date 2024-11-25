"use client";
import { PropsWithChildren } from "react";
import { useHeaderMargin } from "@/hooks/useHeader";
interface SectionProps {
  id: string;
}

export const Section: React.FC<PropsWithChildren<SectionProps>> = ({
  children,
  id,
}) => {
  return <section id={id}>{children}</section>;
};
