// "use client";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { motion } from "framer-motion";
import { Button, Image } from "@nextui-org/react";
import classNames from "classnames";
import { Text } from "@/components/UI/Text/Text";
import { useCallback } from "react";
import { Icon } from "@/assets/Icon";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";

interface EventCarouselProps {
  posts?: any[];
}

interface CarouselProps extends EmblaOptionsType {
  axis?: "x" | "y";
  loop?: boolean;
  autoplay?: boolean;
}
//TODO: 모달 연결 필요
//! 호버 이벤트 에러 있는 것 같음 (해결 필요)
export const EventCarousel: React.FC<EventCarouselProps> = ({ posts }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    axis: "x",
    align: "start",
  } as CarouselProps);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <div className="w-[90%] mx-auto relative">
      <motion.div
        className="embla overflow-hidden mx-auto h-[720px]"
        ref={emblaRef}
        initial={{ width: 1194 }} // 기본 컨테이너 크기
        whileHover={{ width: 1440 }} // 호버 시 확장
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="embla__container flex h-full w-full "
          initial={{ width: "100%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {posts?.map((post, index) => (
            <motion.div
              key={index}
              className="embla__slide h-full cursor-pointer flex-shrink-0 hover:bg-primary-bg relative mr-4"
              initial={{ width: "226px" }}
              whileHover={{
                width: 470,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                overflow: "hidden",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${post.thumbnail})`,
              }}
            >
              <motion.div
                className="absolute inset-0 px-[37px] pt-[50px] pb-5 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between"
                style={{
                  background: `linear-gradient(180deg, rgba(101, 65, 242, 0.57) 0%, rgba(13, 0, 181, 0.57) 100%)`,
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div>
                  <Text variant="h2" className="break-all">
                    {post.title}
                  </Text>
                  <Text variant="h4" className="mt-2 font-medium">
                    {post.date}
                  </Text>
                </div>
                <div className="flex items-center mt-auto">
                  {post.tags &&
                    post.tags.map((tag: any, index: number) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <Button
        className="embla__prev bg-transparent w-10 h-10 absolute top-1/2 left-0 transform -translate-y-1/2"
        isIconOnly
        onClick={scrollPrev}
      >
        <CustomImage src="images/icons/left.svg" alt="right" />
      </Button>
      <Button
        className="embla__next bg-transparent w-10 h-10 absolute top-1/2 right-0 transform -translate-y-1/2"
        onClick={scrollNext}
        isIconOnly
      >
        <CustomImage src="images/icons/right.svg" alt="right" />
      </Button>
    </div>
  );
};
interface TagProps {
  children: React.ReactNode;
}
const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <div className="bg-tag-primary text-white text-xl px-3 py-0.5 rounded-none">
      {children}
    </div>
  );
};
