"use client";
import { Text } from "../../../UI/Text/Text";
import { GeneralButton } from "../../../UI/Button/GeneralButton";
import classNames from "classnames";
import { useEffect, useState } from "react";

interface MenuButtonProps {
  title: string;
  menuKey: string;
  isBlackArea: boolean;
}
export const MenuButton: React.FC<MenuButtonProps> = ({
  title,
  menuKey,
  isBlackArea,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const target = document.getElementById(menuKey);

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.5,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [menuKey]);
  const handleScroll = () => {
    const target = document.getElementById(menuKey);

    if (!target) return;

    const elementPosition = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - 120,
      behavior: "smooth",
    });
  };
  return (
    <GeneralButton
      className={classNames("bg-transparent group")}
      onClick={handleScroll}
    >
      <Text
        variant="h4"
        className={classNames(
          "cursor-pointer group-hover:bg-primary-assistive group-hover:bg-clip-text group-hover:text-transparent",
          isBlackArea
            ? isActive
              ? "text-primary-strong"
              : "text-white"
            : isActive
            ? "text-primary-normal"
            : "text-black",
        )}
      >
        {title}
      </Text>
    </GeneralButton>
  );
};
