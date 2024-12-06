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
  description: {
    title: string;
    content: string;
  }[];
  defaultImage: string;
  hoverImage: string;
  activeImage: string;
  education: {
    duration: string;
    university: string;
  }[];
  career: {
    duration: string;
    company: string;
  }[];

  researchFields: string[];
  representativeAchievements: {
    label: string;
    content: string[];
  };
};

export const useTeams = () => {
  return useQuery({
    queryKey: [TEAM_QUERY_KEY],
    queryFn: async () => {
      const { data } = await fetchFile<TeamItem[]>("/data/teams/teams.json");
      // const { data } = await axios.get<MenuItem[]>("/data/menu.json");

      const dataWithImage = data.map((team) => ({
        ...team,
        defaultImage: `/data/teams/image/${team.university}_${team.name}_default.jpg`,
        hoverImage: `/data/teams/image/${team.university}_${team.name}_hover.jpg`,
        activeImage: `/data/teams/image/${team.university}_${team.name}_active.jpg`,
      }));
      return dataWithImage;
    },
  });
};
