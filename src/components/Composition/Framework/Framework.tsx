"use client";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useArchive } from "@/hooks/useArchive";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { useRef } from "react";
export const Framework: React.FC = () => {
  const { data: archiveList } = useArchive();

  return (
    <div className="w-full bg-primary-bg pt-[104px] pb-[178px] max-md:px-5">
      <Text
        variant="t1"
        className="text-white uppercase text-center md:!text-[50px] !text-[30px] mb-[116px]"
      >
        hYPERF
      </Text>
      <div className="flex md:flex-row md:flex-wrap flex-col items-center justify-center gap-10 ">
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
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-100px", // viewport에서 100px 안쪽으로 들어와야 트리거
    amount: 0.5, // 요소의 50%가 보일 때
  });

  return (
    <motion.div
      ref={ref}
      className="py-7 md:max-w-[480px] border-t-1 w-full border-b-1 border-white"
      variants={{
        hidden: { height: "90px", opacity: 0.7 },
        visible: { height: "142px", opacity: 1 },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      onClick={() => window.open(link, "_blank")}
    >
      <div className="flex items-center">
        <Text
          variant="t1"
          className="cursor-pointer uppercase text-white md:!text-[44px] !text-[28px] mb-[14px] flex-1"
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
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{
          duration: 0.4,
          delay: 0.2,
        }}
      >
        <Text variant="h4" className="text-white max-md:!text-[20px]">
          {link}
        </Text>
      </motion.div>
    </motion.div>
  );
};
