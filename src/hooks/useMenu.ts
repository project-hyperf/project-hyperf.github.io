import { fetchFile } from "@/utils/fetch";
import { useQuery } from "@tanstack/react-query";

export const MENU_QUERY_KEY = "MENU_QUERY";

type MenuItem = {
  label: string;
  key: string;
};

export const useMenu = () => {
  return useQuery({
    queryKey: [MENU_QUERY_KEY],
    queryFn: async () => {
      const { data } = await fetchFile<MenuItem[]>("/data/menu.json");

      return data;
    },
  });
};
