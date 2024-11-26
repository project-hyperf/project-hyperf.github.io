"use client";

import { MenuButton } from "./Element/MenuButton";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useMenu } from "@/hooks/useMenu";
import React, { createRef } from "react";

export const headerRef = createRef<HTMLHeadElement>();

export const GNB: React.FC = () => {
  const { data: menus } = useMenu();

  return (
    <header className="bg-white w-full h-[120px] px-5 py-8" ref={headerRef}>
      <div className="flex items-center max-w-[1300px] mx-auto justify-between">
        <div className="shrink-0">
          <CustomImage src="images/logo/logo-color.svg" alt="로고 이미지" />
        </div>
        <div className="flex items-center gap-[100px] h-full pt-3 max-lg:hidden">
          {menus?.map((menu) => (
            <MenuButton key={menu.key} title={menu.label} menuKey={menu.key} />
          ))}
        </div>
      </div>
    </header>
  );
};
