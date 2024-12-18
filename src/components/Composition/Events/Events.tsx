"use client";
import { Text } from "@/components/UI/Text/Text";
import { Post, usePosts } from "@/hooks/usePosts";
import { images } from "@/assets/images/images";
import classNames from "classnames";

import { Pagination } from "./Widget/Pagenation";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { EventModal } from "@/components/Widget/Modal/EventModal/EventModal";

export const Events: React.FC = () => {
  const { posts, isLoading } = usePosts({
    category: "event",
    postScope: "events",
    postsPerPage: -1,
  });
  return (
    <div
      className="w-full pt-[104px] md:mb-[230px] pb-[144px] mb-0"
      style={{
        backgroundImage: `url(${images["images/bg/bg_event.png"].src})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Text
        variant="t1"
        className="uppercase !text-[50px] text-center text-primary-normal mb-[84px] !font-bold max-md:!text-[40px]"
      >
        News
      </Text>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full px-5">
          <EventList posts={posts} />
        </div>
      )}
    </div>
  );
};
interface EventListProps {
  posts: Post[];
}
const ITEMS_PER_PAGE = 5;
const EventList: React.FC<EventListProps> = ({ posts }) => {
  const eventModal = useDisclosure();
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const openModal = (post: Post) => {
    setSelectedPost(post);
    eventModal.onOpen();
  };
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const postsPerPage = [...posts].slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="border-t-2 border-b-2 border-black px-1">
        {postsPerPage.map((event, index) => {
          return (
            <div
              key={index}
              className={classNames(
                "flex md:justify-between gap-2 py-[25px] px-5 items-center cursor-pointer",
                index !== postsPerPage.length - 1
                  ? "border-b-2 border-black"
                  : "",
              )}
              onClick={() => openModal(event)}
            >
              <div className="flex items-center max-md:flex-wrap justify-between gap-2 w-full">
                <div className="font-bold text-sm md:text-base text-black">
                  <div className="flex gap-2 items-center">
                    <span>{event.title}</span>
                  </div>
                </div>
                <div className="font-bold text-sm md:text-base text-[#868686]">
                  <div className="flex gap-2 items-center">
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        totalItems={posts.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
      {selectedPost && (
        <EventModal
          isOpen={eventModal.isOpen}
          onClose={eventModal.onClose}
          post={selectedPost}
        />
      )}
    </div>
  );
};
