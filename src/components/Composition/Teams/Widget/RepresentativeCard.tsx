"use client";

import { images } from "@/assets/images/images";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { TeamItem } from "@/hooks/useTeams";
import classNames from "classnames";

interface RepresentativeCardProps {
  representative: TeamItem;
  className?: string;
}

export const RepresentativeCard: React.FC<RepresentativeCardProps> = ({
  representative,
  className,
}) => {
  return (
    <div className={classNames("w-full relative h-full", className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${
            images[
              `images/teams/agency/${representative.university}-default.png`
            ].src
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "286px 282px",
          backgroundPosition: "bottom right",
          opacity: 0.2,
          isolation: "isolate",
        }}
      />
      <div className="max-w-[668px] mr-auto pr-[18px] flex flex-col items-start gap-5 ">
        <div className="tags w-full">
          <Tags tags={representative?.tags} />
        </div>
        <div className="person mb-[1px] w-full">
          <div className="flex-1">
            <Text
              variant="h2"
              className="!text-[20px] font-!bold leading-[26px] text-primary-normal mb-2"
            >
              {representative?.role}
            </Text>
            <div className="mb-3">
              <Text variant="h3" className="!text-[28px] !font-medium">
                {representative?.university} {representative?.name}{" "}
                {representative.title}({representative.major})
              </Text>
            </div>
            <div>
              {representative.description?.map(
                (keyword: string, idx: number) => (
                  <RespresentativeKeywords
                    keyword={keyword}
                    key={idx}
                    idx={idx}
                  />
                ),
              )}
            </div>
          </div>
        </div>
        {representative?.withWho && (
          <div>
            <Text
              variant="b3"
              className="!text-sm !font-bold text-primary-normal mb-[11px]"
            >
              참여연구원
            </Text>
            <Text variant="b1" className="!text-[20px] font-medium">
              {representative?.withWho}
            </Text>
          </div>
        )}
        <div className="histroy mb-1">
          <Text
            variant="b3"
            className="!text-sm !font-bold text-primary-normal"
          >
            학력
          </Text>
          <ul className="">
            {representative.education?.map((education: any, idx: number) => (
              <li key={idx} className="text-sm font-['SUIT'] font-medium">
                {education?.duration + " " + education.university}
              </li>
            ))}
          </ul>
        </div>
        <div className="history2">
          <Text
            variant="b3"
            className="!text-sm !font-bold text-primary-normal"
          >
            경력
          </Text>
          <ul>
            {representative.career?.map((career: any, idx: number) => (
              <li key={idx} className="text-sm font-['SUIT'] font-medium">
                {career?.duration + " " + career.university}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <Text
            variant="b3"
            className="!text-sm !font-bold text-primary-normal"
          >
            주요 연구 분야
          </Text>
          <ul className="">
            {representative.researchFields?.map(
              (researchFields: string, idx: number) => (
                <li key={idx} className="text-sm font-['SUIT'] font-medium">
                  {researchFields}
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="flex-1">
          <Text
            variant="b3"
            className="!text-sm !font-bold text-primary-normal"
          >
            {representative.representativeAchievements.label}
          </Text>
          <ul>
            {representative.representativeAchievements.content?.map(
              (content: string, idx: number) => (
                <li
                  key={idx}
                  className="text-sm font-[SUIT] font-medium break-keep"
                >
                  {content}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
interface TagsProps {
  tags: string[];
}
const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="flex gap-5 items-center">
      {tags.map((tag) => (
        <div
          key={tag}
          className={classNames(
            "h-auto min-h-[68px] w-[204px] px-4 py-3 rounded-[20px] flex items-center justify-center",
          )}
          style={{ background: "rgba(13, 0, 181, 0.20)" }}
        >
          <div
            className={classNames(
              "text-base font-bold font-['SUIT'] text-center leading-snug text-primary-normal break-keep",
            )}
          >
            {tag}
          </div>
        </div>
      ))}
    </div>
  );
};
interface RepresentativeKeywordsrops {
  keyword: string;
  idx: number;
}
const RespresentativeKeywords: React.FC<RepresentativeKeywordsrops> = ({
  keyword,
  idx,
}) => {
  return (
    <div
      className={classNames(
        "border-b-1 border-[#949494] bg-[#F0F0F0] p-2 flex justify-between items-center",
        idx === 0 ? "border-t-1" : "",
      )}
    >
      {keyword}
      <CustomImage
        src="images/icons/r-t-arrow-gray.svg"
        alt="화살표"
        className="-mt-1.5"
      />
    </div>
  );
};
