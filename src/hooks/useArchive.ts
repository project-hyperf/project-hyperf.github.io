import { fetchFile } from "@/utils/fetch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const ARCHIVE_QUERY_KEY = "ARCHIVE_QUERY";

type ArchiveItem = {
  name: string;
  link: string;
};

export const useArchive = () => {
  return useQuery({
    queryKey: [ARCHIVE_QUERY_KEY],
    queryFn: async () => {
      const { data } = await fetchFile<ArchiveItem[]>(
        "/data/archive/archive.json",
      );
      // const { data } = await axios.get<MenuItem[]>("/data/menu.json");
      return data;
    },
  });
};
