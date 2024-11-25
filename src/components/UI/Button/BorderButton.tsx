import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { GeneralButton } from "./GeneralButton";
import { Divider } from "@nextui-org/react";
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
        "py-5 h-auto w-[400px] pl-12 pr-7 justify-between rounded-none box-border hover:bg-white",
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
