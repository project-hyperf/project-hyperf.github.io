"use client";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { motion } from "framer-motion";
import { Button, useDisclosure } from "@nextui-org/react";
import { Text } from "@/components/UI/Text/Text";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    useMemo(
      () => ({
        loop: true,
        axis: "x",
        align: "start",
      }),
      [],
    ),
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const eventModal = useDisclosure();

  const scrollPrev = useCallback(() => {
    const container = document.querySelector(".scroll-container");
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }, []);

  const scrollNext = useCallback(() => {
    const container = document.querySelector(".scroll-container");
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

  const openDetailModal = (post: Post) => {
    setSelectedPost(post);
    eventModal.onOpen();
  };

  // 모바일에서 스크롤 위치 감지
  useEffect(() => {
    if (isMobile) {
      const handleScroll = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      };

      const observer = new IntersectionObserver(handleScroll, {
        threshold: 0.5,
        root: null,
      });

      const slides = document.querySelectorAll(".event-slide");
      slides.forEach((slide) => observer.observe(slide));

      return () => {
        slides.forEach((slide) => observer.unobserve(slide));
      };
    }
  }, [isMobile, posts]);

  return (
    <div className="w-[90%] mx-auto relative">
      {isMobile ? (
        <>
          <div className="scroll-container md:block max-md:w-screen max-md:-mx-4 max-md:px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide max-md:items-end relative">
            <div className="md:block flex items-end">
              {posts?.map((post, index) => (
                <div
                  key={index}
                  data-index={index}
                  className="event-slide snap-center flex-shrink-0 h-[500px] w-[90%] min-w-[274px] mr-4 relative cursor-pointer"
                  style={{
                    backgroundImage: `url(${post.thumbnail})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  {activeIndex === index && (
                    <>
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(101, 65, 242, 0.57) 0%, rgba(13, 0, 181, 0.57) 100%)",
                          opacity: 0.8,
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 px-5 z-[80] flex flex-col cursor-pointer pt-[50px] pb-5 text-white"
                        onClick={() => openDetailModal(post)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex-1">
                          <Text variant="h2" className="break-all text-2xl">
                            {post.title}
                          </Text>
                          <Text
                            variant="h4"
                            className="mt-2 font-medium text-lg"
                          >
                            {post.date}
                          </Text>
                        </div>
                        <div className="flex items-center mt-auto gap-2 flex-wrap">
                          {post.tags?.map((tag, idx) => (
                            <Tag key={idx}>{tag}</Tag>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          {posts && posts.length > 1 && (
            <div className="flex justify-center mt-4 gap-4">
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
                    <div className="flex-1 text-white">
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
