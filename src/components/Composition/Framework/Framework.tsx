"use client";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useArchive } from "@/hooks/useArchive";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const containerHeight = useTransform(
    scrollYProgress,
    [0.34, 0.36, 0.368, 0.378],
    ["90px", "142px", "142px", "90px"],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0.34, 0.36, 0.368, 0.378],
    [0, 1, 1, 0],
  );
  return (
    <motion.div
      className="py-7 border-t-1 border-b-1 border-white"
      style={{
        height: containerHeight,
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      onClick={() => window.open(link, "_blank")}
    >
      <motion.div>
        <div className="flex items-center">
          <Text
            variant="t1"
            className="cursor-pointer uppercase text-white text-[44px] mb-[14px]"
          >
            {title}
          </Text>
          <div className="relative w-10 h-[58px] -mt-4">
            <CustomImage
              src="images/icons/right-top-arrow.svg"
              alt="화살표"
              fill
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        style={{
          opacity: textOpacity,
        }}
        transition={{
          delay: 0.2,
          duration: 0.3,
        }}
      >
        <Text variant="h4" className="text-white">
          {link}
        </Text>
      </motion.div>
    </motion.div>
  );
};
