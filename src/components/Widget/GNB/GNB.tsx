"use client";

import { motion } from "framer-motion";
import { MenuButton } from "./Element/MenuButton";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useMenu } from "@/hooks/useMenu";
import classNames from "classnames";
import React, { createRef, useEffect, useState } from "react";

export const headerRef = createRef<HTMLHeadElement>();

export const GNB: React.FC = () => {
  const { data: menus } = useMenu();
  const [isBlackArea, setIsBlackArea] = useState(false);

  useEffect(() => {
    const target = document.getElementById("about");

    if (!target) return;

    const handleScroll = () => {
      const rect = target.getBoundingClientRect();
      if (rect.top <= 125 && rect.bottom >= 120) {
        setIsBlackArea(true);
      } else {
        setIsBlackArea(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.header
      className={classNames("w-full h-[120px] px-5 py-8")}
      ref={headerRef}
      animate={{
        backgroundColor: isBlackArea ? "#000000" : "#FFFFFF",
        color: isBlackArea ? "#FFFFFF" : "#000000",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
    >
      <div className="flex items-center cursor-pointer max-w-[1300px] mx-auto justify-between">
        <div
          className="shrink-0"
          onClick={() => {
            scrollToTop();
          }}
        >
          {isBlackArea ? (
            <CustomImage src="images/logo/logo-white.svg" alt="로고 이미지" />
          ) : (
            <CustomImage src="images/logo/logo-color.svg" alt="로고 이미지" />
          )}
        </div>
        <div className="flex items-center justify-evenly grow h-full pt-3 max-lg:hidden">
          {menus?.map((menu) => (
            <MenuButton
              key={menu.key}
              title={menu.label}
              menuKey={menu.key}
              isBlackArea={isBlackArea}
            />
          ))}
        </div>
      </div>
    </motion.header>
  );
};
