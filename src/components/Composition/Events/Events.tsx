"use client";
import { Text } from "@/components/UI/Text/Text";
import { usePosts } from "@/hooks/usePosts";
import { EventCarousel } from "./Widget/EventCarousel";

export const Events: React.FC = () => {
  const { posts, isLoading } = usePosts({
    category: "event",
    postScope: "events",
    postsPerPage: -1,
  });
  return (
    <div className="w-full pt-[104px] mb-[230px] pb-[144px] bg-primary-neautral mb-">
      <Text
        variant="t1"
        className="uppercase text-[50px] text-center text-primary-normal mb-[84px]"
      >
        Events
      </Text>
      <EventCarousel posts={posts} />
    </div>
  );
};
