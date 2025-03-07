import { images } from "@/assets/images/images";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import Image from "next/image";

const AGNECY_LIST = [
  { name: "서울대학교", key: "seoul" },
  { name: "포항공과대학교", key: "pohang" },
  { name: "건국대학교", key: "konkuk" },
  { name: "아주대학교", key: "ajou" },
  { name: "연세대학교", key: "yeonsei" },
  { name: "키스트", key: "kisti" },
];

export const Footer: React.FC = () => {
  return (
    <footer className=" md:py-14 py-4 px-5 w-full h-[110px] md:h-[180px]">
      <div className="max-w-[1440px] mx-auto flex justify-between items-start">
        <div className="flex flex-col gap-4">
          <div className="flex items-center flex-wrap md:gap-6 gap-1 max-md:-ml-4">
            {AGNECY_LIST.map((agency) => (
              <div key={agency.key} className="relative w-[60px] h-[20px]">
                <Image
                  src={`${images[`images/agency/${agency.key}.svg`].src}`}
                  alt={agency.name}
                  key={agency.key}
                  className="max-md:trasform max-md:scale-[0.6] shrink md:scale-110"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
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
