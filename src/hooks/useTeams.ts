import { fetchFile } from "@/utils/fetch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const TEAM_QUERY_KEY = "TEAM_QUERY";

export type TeamItem = {
  university: string;
  agency: string;
  name: string;
  role: string;
  withWho: string;
  title: string;
  tags: string[];
  major: string;
  description: string[];
  image: string;
  education: {
    duration: string;
    university: string;
  }[];
  career: {
    duration: string;
    company: string;
  }[];

  researchFields: string[];
  representativeAchievements: string[];
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
