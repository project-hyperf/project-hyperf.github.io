import { fetchFile } from "@/utils/fetch";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface Post {
  filename: string;
  title: string;
  updatedAt: string;
  content: string;
  thumbnail?: string;
  author?: string;
}

export const usePosts = ({
  postScope,
  category = ".",
  postsPerPage,
}: {
  postScope: string;
  category?: string;
  postsPerPage: number;
}) => {
  const { data: index } = useQuery({
    queryKey: ["POSTS_INDEX", postScope, category],
    queryFn: async () => {
      const { data } = await fetchFile<{
        posts: string[];
      }>(`/data/${postScope}/posts/${category}/index.json`);
      return data;
    },
  });

  const {
    data: data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["POSTS", postScope, category, index, postsPerPage],
    queryFn: async ({ pageParam }) => {
      const wholePostLength = index?.posts.length;
      const startIndex = (pageParam - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const slicedPosts =
        postsPerPage > 0
          ? (index?.posts ?? []).slice(startIndex, endIndex)
          : index?.posts ?? [];

      const hasNextPage = (wholePostLength ?? 0) > endIndex;

      console.log(slicedPosts);

      const result: Post[] = [];
      for (const filename of slicedPosts) {
        try {
          const { data, headers } = await fetchFile<string>(
            `/data/${postScope}/posts/${category}/${filename}`,
          );

          const titleWithHash = data.match(/(#.*)/)?.[1] ?? "";
          const title = titleWithHash.replace("#", "").trim();
          const updatedAt = headers["last-modified"];
          const thumbnailRaw = data.match(/!\[.*\]\((.*)\)/)?.[1] ?? "";
          const thumbnail = thumbnailRaw.startsWith("http")
            ? thumbnailRaw
            : window?.["basePath" as any] + thumbnailRaw;
          const author =
            data.match(/<!--\s*author\s?:\s?(.*)\s*-->/)?.[1] ?? "";

          result.push({
            filename,
            title,
            updatedAt,
            thumbnail,
            content: data.replace(titleWithHash, "").trim(),
            author,
          });
        } catch (e) {
          if (e instanceof AxiosError) {
            console.warn("파일을 불러오는데 실패했습니다.", e.message);
            console.log();
          } else {
            console.warn("파일을 불러오는데 실패했습니다.");
          }
        }
      }
      return {
        posts: result,
        page: pageParam,
        hasNextPage,
      };
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.page + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.page === 1) return undefined;
      return firstPage.page - 1;
    },
    initialPageParam: 1,
  });

  const { pages } = data ?? { pages: [] };

  return {
    posts: pages.flatMap((page) => page.posts),
    fetchNextPage,
    hasNextPage,
    isLoading,
  };
};
