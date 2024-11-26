import { GeneralButton } from "./GeneralButton";
import React from "react";
import classNames from "classnames";
interface BorderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  endContent?: React.ReactNode;
}

export const BorderButton: React.FC<BorderButtonProps> = ({
  children,
  onClick,
  className,
  endContent,
}) => {
  return (
    <GeneralButton
      variant="ghost"
      className={classNames(
        "py-5 h-auto w-[400px] pl-12 pr-5 justify-between rounded-none box-border",
        className,
      )}
      data-hover={false}
      endContent={endContent}
      onClick={onClick}
    >
      {children}
    </GeneralButton>
  );
};
