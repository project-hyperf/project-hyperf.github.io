import classNames from "classnames";
import { ComponentProps, FC, Fragment, ReactNode } from "react";

export type TextProps =
  | ({
      variant?: "t1" | "t2" | "t3";
    } & ComponentProps<"h2" | "h3" | "h4">)
  | ({
      variant?: "b1" | "b2" | "b3";
    } & ComponentProps<"p">)
  | ({
      variant?: "h0" | "h1" | "h2" | "h3" | "h4" | "h5";
    } & ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">)
  | ({
      variant?: "c1" | "c2";
    } & ComponentProps<"small">);

export const TEXT_VARIANTS: Record<string, string> = {
  t1: "text-[40px] font-normal font-['FLYHEAD'] leading-[2.75rem]",
  t2: "text-[36px] font-normal font-['FLYHEAD'] leading-[2.7rem]",
  t3: "text-[30px] font-normal font-['FLYHEAD'] leading-[2.25rem]",
  h0: "text-[40px] font-bold font-['SUIT'] leading-tight",
  h1: "text-[36px] font-bold font-['SUIT'] leading-tight",
  h2: "text-[32px] font-bold font-['SUIT'] leading-tight",
  h3: "text-[28px] font-bold font-['SUIT'] leading-tight",
  h4: "text-[24px] font-semibold font-['SUIT'] leading-tight",
  h5: "text-[20px] font-semibold font-['SUIT'] leading-snug",
  b1: "text-lg font-medium font-['SUIT'] leading-snug",
  b2: "text-base font-normal font-['SUIT'] leading-relaxed",
  b3: "text-sm font-normal font-['SUIT'] leading-relaxed",
  c1: "text-xs font-normal font-['SUIT'] leading-snug",
  c2: "text-[10px] font-normal font-['SUIT'] leading-snug",
};

export const Text: React.FC<TextProps> = ({
  variant = "b2",
  className,
  ...props
}) => {
  const Tag = (
    ["t", "h"].includes(variant[0]) ? `h${Number(variant[1]) + 1}` : "p"
  ) as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={classNames(TEXT_VARIANTS[variant], className, "break-keep")}
      {...(props as any)}
    />
  );
};
