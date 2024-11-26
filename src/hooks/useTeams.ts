import { fetchFile } from "@/utils/fetch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const TEAM_QUERY_KEY = "TEAM_QUERY";

type TeamItem = {
  university: string;
  name: string;
};

export const useTeams = () => {
  return useQuery({
    queryKey: [TEAM_QUERY_KEY],
    queryFn: async () => {
      const { data } = await fetchFile<TeamItem[]>("/data/teams/teams.json");
      // const { data } = await axios.get<MenuItem[]>("/data/menu.json");
      console.log("asd", data);
      return data;
    },
  });
};
