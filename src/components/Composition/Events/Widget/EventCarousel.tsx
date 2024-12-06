"use client";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { animate, motion } from "framer-motion";
import { button, Button, useDisclosure } from "@nextui-org/react";
import { Text } from "@/components/UI/Text/Text";
import React, { FC, useCallback, useEffect, useState } from "react";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { EventModal } from "@/components/Widget/Modal/EventModal/EventModal";
import { Post } from "@/hooks/usePosts";

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
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    if (emblaApi && isMobile) {
      emblaApi.on("select", () => {
        setActiveIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi, isMobile]);

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
      {isMobile ? (
        <>
          <motion.div
            className="embla overflow-hidden mx-auto h-[500px] w-full"
            ref={emblaRef}
          >
            <motion.div className="embla__container flex h-full w-full">
              {posts?.map((post, index) => (
                <motion.div
                  key={index}
                  className={`embla__slide h-full cursor-pointer flex-shrink-0 relative w-full ${
                    activeIndex === index ? "active" : ""
                  }`}
                  style={{
                    backgroundImage: `url(${post.thumbnail})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 px-5 flex flex-col cursor-pointer pt-[50px] pb-5 text-white"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(101, 65, 242, 0.57) 0%, rgba(13, 0, 181, 0.57) 100%)",
                      opacity: 0,
                    }}
                    onClick={() => openDetailModal(post)}
                  >
                    <div className="flex-1">
                      <Text variant="h2" className="break-all text-2xl">
                        {post.title}
                      </Text>
                      <Text variant="h4" className="mt-2 font-medium text-lg">
                        {post.date}
                      </Text>
                    </div>
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
          {posts && posts.length > 1 && (
            <div className="flex justify-center mt-4">
              <Button
                className="bg-transparent w-5 h-5"
                isIconOnly
                onClick={scrollPrev}
              >
                <CustomImage src="images/icons/left.svg" alt="left" />
              </Button>
              <Button
                className="bg-transparent w-5 h-5"
                isIconOnly
                onClick={scrollNext}
              >
                <CustomImage src="images/icons/right.svg" alt="right" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          <motion.div
            className="embla overflow-hidden mx-auto h-[720px] w-auto"
            ref={emblaRef}
            whileHover={{ width: "1440px" }}
            transition={{ duration: 0.3 }}
            initial={{ width: "1194px" }}
          >
            <motion.div className="embla__container flex h-full w-full">
              {posts?.map((post, index) => (
                <motion.div
                  key={index}
                  className="embla__slide h-full cursor-pointer flex-shrink-0 hover:bg-primary-bg relative mr-4"
                  initial={{ width: "226px" }}
                  whileHover={{ width: 470 }}
                  style={{
                    backgroundImage: `url(${post.thumbnail})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 px-[37px] flex flex-col cursor-pointer pt-[50px] pb-5 text-white"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(101, 65, 242, 0.57) 0%, rgba(13, 0, 181, 0.57) 100%)",
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 1 }}
                    onClick={() => openDetailModal(post)}
                  >
                    <div className="flex-1">
                      <Text variant="h2" className="break-all">
                        {post.title}
                      </Text>
                      <Text variant="h4" className="mt-2 font-medium">
                        {post.date}
                      </Text>
                    </div>
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
            className="embla__prev bg-transparent w-10 h-10 absolute top-1/2 -translate-y-1/2 left-0 max-lg:-left-12"
            isIconOnly
            onClick={scrollPrev}
          >
            <CustomImage src="images/icons/left.svg" alt="left" />
          </Button>
          <Button
            className="embla__next bg-transparent w-10 h-10 absolute top-1/2 -translate-y-1/2 right-0 max-lg:-right-12"
            isIconOnly
            onClick={scrollNext}
          >
            <CustomImage src="images/icons/right.svg" alt="right" />
          </Button>
        </>
      )}

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
