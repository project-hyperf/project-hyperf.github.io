"use client";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { animate, motion } from "framer-motion";
import { Button, useDisclosure } from "@nextui-org/react";
import { Text } from "@/components/UI/Text/Text";
import React, { FC, useCallback, useEffect, useState } from "react";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { EventModal } from "@/components/Widget/Modal/EventModal/EventModal";
import { Post } from "@/hooks/usePosts";
import { title } from "process";
import style from "styled-jsx/style";

interface EventCarouselProps {
  posts?: Post[];
}

interface CarouselProps extends EmblaOptionsType {
  axis?: "x" | "y";
  loop?: boolean;
  autoplay?: boolean;
}

//! 호버 이벤트 에러 있는 것 같음 (해결 필요)
export const EventCarousel: React.FC<EventCarouselProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    axis: "x",
    align: "start",
    slidesToScroll: isMobile ? 1 : undefined,
  } as CarouselProps);
  const eventModal = useDisclosure();
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const openDetailModal = (post: Post) => {
    setSelectedPost(post);
    eventModal.onOpen();
  };
  return (
    <div className="w-[90%] mx-auto relative">
      <motion.div
        className="embla overflow-hidden mx-auto h-[720px] max-lg:h-[500px] w-auto"
        ref={emblaRef}
        animate={{ width: isMobile ? "100%" : isHovered ? "1440px" : "1194px" }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="embla__container flex h-full w-full backface-hidden">
          {posts?.map((post, index) => (
            <motion.div
              key={index}
              className="embla__slide h-full cursor-pointer flex-shrink-0 hover:bg-primary-bg relative mr-4"
              initial={{ width: isMobile ? "100%" : "226px" }}
              whileHover={isMobile ? {} : { width: 470 }}
              style={{
                backgroundImage: `url(${post.thumbnail})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <motion.div
                className="absolute inset-0 px-[37px] max-lg:px-5 cursor-pointer pt-[50px] pb-5"
                style={{
                  background: isMobile
                    ? ""
                    : `linear-gradient(180deg, rgba(101, 65, 242, 0.57) 0%, rgba(13, 0, 181, 0.57) 100%)`,
                  opacity: isMobile ? 1 : 0,
                }}
                whileHover={isMobile ? {} : { opacity: 1 }}
                onClick={() => openDetailModal(post)}
              >
                <Text variant="h2" className="break-all max-lg:text-2xl">
                  {post.title}
                </Text>
                <Text variant="h4" className="mt-2 font-medium max-lg:text-lg">
                  {post.date}
                </Text>
                <div className="flex items-center mt-auto gap-2 flex-wrap">
                  {post.tags?.map((tag, idx) => (
                    <Tag key={idx}>{tag}</Tag>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <Button
        className="embla__prev bg-transparent w-10 h-10 absolute top-1/2 -translate-y-1/2 left-0 max-lg:-left-12 max-md:hidden"
        isIconOnly
        onClick={scrollPrev}
      >
        <CustomImage src="images/icons/left.svg" alt="left" />
      </Button>
      <Button
        className="embla__next bg-transparent w-10 h-10 absolute top-1/2 -translate-y-1/2 right-0 max-lg:-right-12 max-md:hidden"
        isIconOnly
        onClick={scrollNext}
      >
        <CustomImage src="images/icons/right.svg" alt="right" />
      </Button>

      <EventModal
        isOpen={eventModal.isOpen}
        onClose={eventModal.onClose}
        post={selectedPost}
      />
    </div>
  );
};
interface TagProps {
  children: React.ReactNode;
}
const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <div className="bg-tag-primary text-white text-xl max-lg:text-base px-3 py-0.5 rounded-none">
      {children}
    </div>
  );
};
