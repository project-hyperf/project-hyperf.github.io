import { fetchFile } from "@/utils/fetch";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface Post {
  filename: string;
  title: string;
  updatedAt: string;
  date?: string;
  location?: string;
  tags?: string[];
  content: string;
  thumbnail?: string;
  author?: string;
  picture?: {
    src: string;
    alt: string;
  }[];
}

const getFullPath = (path: string) => {
  if (path.startsWith("http")) return path;
  // basePath가 undefined일 때 빈 문자열 사용
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${path}`;
};

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

      const result: Post[] = [];
      for (const filename of slicedPosts) {
        try {
          const { data, headers } = await fetchFile<string>(
            `/data/${postScope}/posts/${category}/${filename}`,
          );

          const titleWithHash = data.match(/(#.*)/)?.[1] ?? "";
          const title = titleWithHash.replace("#", "").trim();
          const updatedAt = headers["last-modified"];

          const dateMatch = data.match(/\*\*날짜\*\*:\s*(.+)/)?.[1];
          const date = dateMatch
            ? dateMatch.trim()
            : dayjs(updatedAt).format("YYYY년 MM월 DD일");

          const tagsMatch = data.match(/\[(#.*)\]/)?.[1];
          const tags = tagsMatch
            ? tagsMatch.split(",").map((tag) => tag.replace("#", "").trim())
            : [];

          const locationMatch = data.match(/\*\*장소\*\*:\s*(.+)/)?.[1];
          const location = locationMatch ? locationMatch.trim() : "";

          const thumbnailRaw = data.match(/!\[.*?\]\((.*?)\)/)?.[1] ?? "";
          const thumbnail = thumbnailRaw.startsWith("http")
            ? thumbnailRaw
            : getFullPath(thumbnailRaw);

          const picture = data.match(/!\[(.*?)\]\((.*?)\)/g)?.map((p) => {
            const match = p.match(/!\[(.*?)\]\((.*?)\)/);
            const alt = match?.[1] ?? "";
            const src = match?.[2] ?? "";

            return {
              alt,
              src: getFullPath(src),
            };
          });

          const author =
            data.match(/<!--\s*author\s?:\s?(.*)\s*-->/)?.[1] ?? "";

          const content = data
            .replace(titleWithHash, "")
            .replace(/\*\*(날짜|장소)\*\*:\s*(.+)/, "")
            .replace(/\*\*장소\*\*:\s*(.+)/, "")
            .replace(/<!--[\s\S]*?-->/g, "")
            .replace(/!\[.*?\]\(.*?\)/g, "")
            .replace(/\[(#.*)\]/g, "")
            .trim();

          result.push({
            filename,
            title,
            updatedAt,
            thumbnail,
            content,
            author,
            date,
            location,
            tags,
            picture,
          });
        } catch (e) {
          if (e instanceof AxiosError) {
            console.warn("파일을 불러오는데 실패했습니다.", e.message);
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
