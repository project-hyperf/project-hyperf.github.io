import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Tags } from "./RepresentativeCard";
import { Text } from "@/components/UI/Text/Text";
import classNames from "classnames";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";

interface RepresentativeModalProps {
  representative: any;
  isOpen: boolean;
  onClose: () => void;
}
export const RepresentativeModal: React.FC<RepresentativeModalProps> = ({
  representative,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      placement="center"
      className="w-[360px] rounded-none"
    >
      <ModalContent className="px-0">
        {(onClose) => (
          <>
            <ModalHeader className="pt-8" />
            <ModalBody className="px-5 scrollbar-hide">
              <div>
                <div className="tag mb-4 px-0">
                  <Tags tags={representative.tags} />
                </div>

                <div className="person mb-[1px] w-full">
                  <div className="flex-1">
                    <Text
                      variant="h2"
                      className="!text-[20px] max-md:!text-[14px] !font-bold leading-[26px] text-primary-normal mb-2"
                    >
                      {representative?.role}
                    </Text>
                    <div className="mb-3">
                      <Text
                        variant="h3"
                        className="md:!text-[28px] !text-[24px] !font-medium"
                      >
                        {representative?.university} {representative?.name}{" "}
                        {representative.title}
                      </Text>
                      <Text variant="b2" className="!text-base !font-medium">
                        ({representative.major})
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="descriptio mb-[13px]">
                  <div className="flex flex-col gap-1">
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
                {representative?.withWho && (
                  <div className="mb-5">
                    <Text
                      variant="b3"
                      className="!text-sm !font-bold text-primary-normal mb-[11px]"
                    >
                      참여연구원
                    </Text>
                    <Text
                      variant="b1"
                      className="!text-[20px] max-md:!text-sm font-medium"
                    >
                      {representative?.withWho}
                    </Text>
                  </div>
                )}
                <div className="education mb-5">
                  <Text
                    variant="b3"
                    className="!text-sm !font-bold text-primary-normal"
                  >
                    학력
                  </Text>
                  <ul className="py-1">
                    {representative.education?.map(
                      (education: any, idx: number) => (
                        <li
                          key={idx}
                          className="text-sm font-['SUIT'] font-medium flex flex-col gap-0.5"
                        >
                          <span className="text-[#756AF2] ">
                            {education?.duration}
                          </span>
                          <span>{education.university}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="career mb-5">
                  <Text
                    variant="b3"
                    className="!text-sm !font-bold text-primary-normal"
                  >
                    경력
                  </Text>
                  <ul className="py-1">
                    {representative.career?.map((career: any, idx: number) => (
                      <li
                        key={idx}
                        className="text-sm font-['SUIT'] font-medium"
                      >
                        {career?.duration + " " + career.university}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="info mb-5">
                  <div>
                    {" "}
                    <Text
                      variant="b3"
                      className="!text-sm !font-bold text-primary-normal"
                    >
                      주요 연구 분야
                    </Text>
                    <ul className="info2">
                      {representative.researchFields?.map(
                        (researchFields: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-sm font-['SUIT'] font-medium"
                          >
                            {researchFields}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
                <div className="">
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
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
interface RepresentativeKeywordsrops {
  keyword: string;
  idx: number;
}
export const RespresentativeKeywords: React.FC<RepresentativeKeywordsrops> = ({
  keyword,
  idx,
}) => {
  return (
    <div
      className={classNames(
        "bg-[#F0F0F0] p-2 px-14 rounded-[12px] text-center max-md:text-[14px]",
      )}
    >
      {keyword}
    </div>
  );
};
