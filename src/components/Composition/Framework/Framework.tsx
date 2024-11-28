"use client";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useArchive } from "@/hooks/useArchive";
import Link from "next/link";

export const Framework: React.FC = () => {
  const { data: archiveList } = useArchive();
  return (
    <div className="w-full bg-primary-bg pt-[104px] pb-[178px]">
      <Text
        variant="t1"
        className="text-white uppercase text-center text-[50px] mb-[116px]"
      >
        hYPERF
      </Text>
      <div className="flex md:flex-row flex-col items-center justify-center gap-10 ">
        {archiveList?.map((archive) => (
          <ArchiveLink
            key={archive.name}
            title={archive.name}
            link={archive.link}
          />
        ))}
      </div>
    </div>
  );
};
interface ArchiveProps {
  title: string;
  link: string;
}

const ArchiveLink: React.FC<ArchiveProps> = ({ title, link }) => {
  return (
    <Link href={`/${link}`} className="py-7 border-t-1 border-b-1 border-white">
      <div className="flex items-center">
        <Text
          variant="t1"
          className="cursor-pointer uppercase text-white text-[44px] mb-[14px]"
        >
          {title}
        </Text>
        <div className="relative w-10 h-[58px]">
          <CustomImage
            src="images/icons/right-top-arrow.svg"
            alt="화살표"
            fill
          />
        </div>
      </div>
      <Text variant="h4" className="text-white">
        {link}
      </Text>
    </Link>
  );
};
