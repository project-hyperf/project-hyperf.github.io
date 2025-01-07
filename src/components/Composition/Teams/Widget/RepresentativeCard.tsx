"use client";

import { images } from "@/assets/images/images";
import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { TeamItem } from "@/hooks/useTeams";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import classNames from "classnames";

interface RepresentativeCardProps {
  representative: TeamItem;
  className?: string;
}

export const RepresentativeCard: React.FC<RepresentativeCardProps> = ({
  representative,
  className,
}) => {
  console.log(representative);
  if (!representative) return null;
  return (
    <div className={classNames("w-full relative h-full", className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${
            images[
              `images/teams/agency/${representative?.university}-default.png`
            ].src
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "286px 282px",
          backgroundPosition: "bottom right",
          opacity: 0.2,
          isolation: "isolate",
        }}
      />
      <div className="max-w-[668px] mr-auto pr-[18px] flex flex-col items-start gap-5 relative z-20">
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
                (keyword: { title: string; content: string }, idx: number) => (
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
            {representative.education?.map(
              (
                education: { duration: string; university: string },
                idx: number,
              ) => (
                <li key={idx} className="text-sm font-['SUIT'] font-medium">
                  {education?.duration + " " + education.university}
                </li>
              ),
            )}
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
            {representative.career?.map(
              (
                career: { duration: string; university: string },
                idx: number,
              ) => (
                <li key={idx} className="text-sm font-['SUIT'] font-medium">
                  {career?.duration + " " + career.university}
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
export const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="flex gap-5 items-center max-md:flex-wrap max-md:gap-1">
      {tags.map((tag) => (
        <div
          key={tag}
          className={classNames(
            "h-auto md:min-h-[68px] min-h-[31px] md:w-[204px] md:px-4 md:pt-[14px] md:pb-[10px] px-2.5 py-1.5 md:rounded-[20px] rounded-[8px] flex items-center justify-center",
          )}
          style={{ background: "rgba(13, 0, 181, 0.20)" }}
        >
          <div
            className={classNames(
              "md:text-base text-[12px] font-bold font-['SUIT'] text-center md:leading-[20.8px] leading-3 text-primary-normal break-keep max-md:whitespace-nowrap tracking-tighter",
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
  keyword: {
    title: string;
    content: string;
  };
  idx: number;
  onClick?: () => void;
}
export const RespresentativeKeywords: React.FC<RepresentativeKeywordsrops> = ({
  keyword,
  idx,
}) => {
  const detailModal = useDisclosure();
  return (
    <>
      <div
        className={classNames(
          "border-b-1 border-[#949494] bg-[#F0F0F0] p-2 flex justify-between items-center cursor-pointer",
          idx === 0 ? "border-t-1" : "",
        )}
        role="button"
        onClick={detailModal.onOpen}
      >
        {keyword.title}
        <CustomImage
          src="images/icons/r-t-arrow-gray.svg"
          alt="화살표"
          className="-mt-1.5"
        />
      </div>
      <DetailModal
        isOpen={detailModal.isOpen}
        onClose={detailModal.onClose}
        keyword={keyword}
      />
    </>
  );
};
interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyword: {
    title: string;
    content: string;
  };
}
const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  keyword,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      className="md:min-w-[500px] min-h-[306px] rounded-none bg-[#F0F0F0] text-black"
    >
      <ModalContent>
        <>
          <ModalHeader className="p-0" />
          <ModalBody className="px-6 pb-8 pt-11 flex flex-col items-center gap-5 md:px-10">
            <div className="text-[18px] font-bold text-center px-4 break-keep">
              {keyword.title}
            </div>
            <div className="text-[14px] font-normal whitespace-pre-wrap">
              {keyword.content}
            </div>
          </ModalBody>
          <ModalFooter className="p-0" />
        </>
      </ModalContent>
    </Modal>
  );
};
