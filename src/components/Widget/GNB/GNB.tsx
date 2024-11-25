"use client";

import { MenuButton } from "@/components/UI/Button/MenuButton";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useMenu } from "@/hooks/useMenu";

export const GNB: React.FC = () => {
  const { data: menus } = useMenu();
  return (
    <div className="border-1 border-red-600 w-full h-[120px] px-5 py-8">
      <div className="flex items-center max-w-[1300px] mx-auto justify-between">
        <div>
          <CustomImage src="images/logo/logo-color.svg" alt="로고 이미지" />
        </div>
        <div className="flex items-center gap-[100px] h-full pt-3">
          {menus?.map((menu) => (
            <MenuButton key={menu.key} title={menu.label} menuKey={menu.key} />
          ))}
        </div>
      </div>
    </div>
  );
};
