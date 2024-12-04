import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";

const AGNECY_LIST = [
  { name: "서울대학교", key: "seoul" },
  { name: "포항공과대학교", key: "pohang" },
  { name: "연세대학교", key: "yeonsei" },
  { name: "건국대학교", key: "konkuk" },
  { name: "아주대학교", key: "ajou" },
  { name: "키스트", key: "kisti" },
];

export const Footer: React.FC = () => {
  return (
    <footer className=" py-14 px-5 w-full h-[180px]">
      <div className="max-w-[1440px] mx-auto flex justify-between items-start">
        <div className="flex flex-col gap-4">
          <div className="flex items-center flex-wrap gap-6">
            {AGNECY_LIST.map((agency) => (
              <CustomImage
                src={`images/agency/${agency.key}.svg`}
                alt={agency.name}
                key={agency.key}
              />
            ))}
          </div>
          <Text
            variant="c1"
            className="!font-bold text-primary-assistive text-start"
          >
            Copyright © HYPERF 2024
          </Text>
        </div>
        <div className="relative w-[174px] h-[52px]">
          <CustomImage
            src="images/logo/logo-color.svg"
            alt="로고 이미지"
            fill
          />
        </div>
      </div>
    </footer>
  );
};
