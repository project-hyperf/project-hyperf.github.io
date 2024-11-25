import { MenuButton } from "@/components/UI/Button/MenuButton";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";

const GNB_LIST = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Teams",
    href: "#teams",
  },
  {
    label: "Framework",
    href: "#framework",
  },
  {
    label: "Outcomes",
    href: "#outcomes",
  },
  {
    label: "Events",
    href: "#events",
  },
];

export const GNB: React.FC = () => {
  return (
    <div className="border-1 border-red-600 w-full h-[120px] px-5 py-8">
      <div className="flex items-center max-w-[1300px] mx-auto justify-between">
        <div>
          <CustomImage src="images/logo/logo-color.svg" alt="로고 이미지" />
        </div>
        <div className="flex items-center gap-[100px] h-full pt-3">
          {GNB_LIST.map((item) => (
            <MenuButton
              key={item.label}
              title={item.label}
              menuKey={item.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
