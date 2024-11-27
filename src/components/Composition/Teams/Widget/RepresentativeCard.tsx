"use client";

import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import classNames from "classnames";
import Image from "next/image";

interface RepresentativeCardProps {
  representative: any;
  className?: string;
}

export const RepresentativeCard: React.FC<RepresentativeCardProps> = ({
  representative,
  className,
}) => {
  return (
    <div
      className={classNames(
        "max-w-[1240px] w-full h-[780px] bg-[#F1F1F1] border-1 border-black pl-20 pr-[294px] pt-[54px] flex flex-col ml-auto",
        className,
      )}
    >
      <div className="agency ">
        <div className="flex items-end gap-4">
          <Text
            variant="h0"
            className="md:text-[70px] font-thin leading-[84px]"
          >
            {representative.university}
          </Text>
          <Text variant="h5" className="font-bold leading-snug pb-3">
            {representative.agency}
          </Text>
        </div>
      </div>
      <div className="tags  w-full mb-[39px]">
        <Tags tags={representative.tags} />
      </div>
      <div className="person mb-10  flex justify-between items-start gap-11">
        <div className="pt-[7px] flex-1">
          <Text
            variant="h2"
            className="text-[27px] font-normal leading-loose text-primary-normal"
          >
            연구 책임자
          </Text>
          <div className="mb-3">
            <Text variant="h3" className="text-[33px] font-normal">
              {representative.name}
              <span className="text-[29px] font-normal ">
                ({representative.major})
              </span>
            </Text>
          </div>
          <div>
            {representative.description?.map((keyword: string, idx: number) => (
              <RespresentativeKeywords keyword={keyword} key={idx} />
            ))}
          </div>
        </div>
        <div className="w-[166.16px] h-[170px] bg-[#f1f2fd] relative">
          <Image
            src={representative.image || "/data/teams/image/user.png"}
            alt="대표 이미지"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <div className="histroy mb-4">
        <Text className="border-b-1 border-black">학력</Text>
        <ul className="list-inside list-disc pl-1rem">
          {representative.education?.map((education: any, idx: number) => (
            <li key={idx} className="pl-[8px]">
              {education.duration + " " + education.university}
            </li>
          ))}
        </ul>
      </div>
      <div className="history2 mb-4">
        <Text className="border-b-1 border-black">경력</Text>
        <ul className="list-inside list-disc pl-1rem">
          {representative.career?.map((career: any, idx: number) => (
            <li key={idx} className="pl-[8px]">
              {career}
            </li>
          ))}
        </ul>
      </div>
      <div className="field flex items-start gap-[25.5px]">
        <div className="flex-1">
          <Text className="border-b-1 border-black">주요 연구 분야</Text>
          <ul className="list-inside list-disc pl-1rem">
            {representative.researchFields?.map(
              (researchFields: string, idx: number) => (
                <li key={idx} className="">
                  {researchFields}
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="flex-1">
          <Text className="border-b-1 border-black">연구분야</Text>
          <ul className="list-inside list-disc pl-1rem">
            {representative.representativeAchievements?.map(
              (representativeAchievements: string, idx: number) => (
                <li key={idx} className="">
                  {representativeAchievements}
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
    <div className="flex gap-3 items-center">
      {tags.map((tag) => (
        <div
          key={tag}
          className={classNames(
            "h-9 px-3 py-2",
            tag.includes("컨소시엄 총괄") ? "bg-white" : "bg-primary-normal",
          )}
        >
          <div
            className={classNames(
              "text-base font-bold font-['SUIT'] leading-snug",
              tag.includes("컨소시엄 총괄") ? "text-[#020202]" : "text-white",
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
}
const RespresentativeKeywords: React.FC<RepresentativeKeywordsrops> = ({
  keyword,
}) => {
  return (
    <div className="border-t-1 border-[#949494] p-2 flex justify-between items-center">
      {keyword}
      <CustomImage
        src="images/icons/r-t-arrow-gray.svg"
        alt="화살표"
        className="-mt-1.5"
      />
    </div>
  );
};
