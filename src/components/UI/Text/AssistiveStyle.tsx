import React, { PropsWithChildren } from "react";
import { Text } from "./Text";
import classNames from "classnames";
interface TextProps {
  variant?:
    | "h2"
    | "h3"
    | "h4"
    | "h1"
    | "h5"
    | "t1"
    | "t2"
    | "t3"
    | "b1"
    | "b2"
    | "b3"
    | "h0"
    | "c1"
    | "c2"
    | undefined;
  className?: string;
}
export const AssistiveStyle: React.FC<PropsWithChildren<TextProps>> = ({
  children,
  variant = "b2",
  className,
}) => {
  return (
    <Text
      variant={variant}
      className={classNames(
        "bg-primary-assistive bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </Text>
  );
};
