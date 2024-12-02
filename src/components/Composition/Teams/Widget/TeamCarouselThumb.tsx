import { GeneralButton } from "@/components/UI/Button/GeneralButton";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { TeamItem } from "@/hooks/useTeams";
import { Button, Image } from "@nextui-org/react";
import React from "react";

type PropType = {
  selected: boolean;
  team: TeamItem;
  onClick: () => void;
};

export const TeamCarouselThumb: React.FC<PropType> = (props) => {
  const { selected, team, onClick } = props;

  return (
    <div
      className={"embla-thumbs__slide h-[200px] cursor-pointer".concat(
        selected ? " embla-thumbs__slide--selected" : "",
      )}
    >
      <GeneralButton
        onClick={onClick}
        type="button"
        className="w-[200px] h-[200px] px-0 rounded-none cursor-pointer"
      >
        <Image
          src={team.image}
          alt={team.name}
          className="rounded-none cursor-pointer"
        />
      </GeneralButton>
    </div>
  );
};
