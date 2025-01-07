import { Text } from "@/components/UI/Text/Text";
import { Checkbox, VisuallyHidden } from "@nextui-org/react";

interface CategoryButtonProps {
  selected: boolean;
  onChange: () => void;
  item: {
    title: string;
    content: string;
    key?: string;
  };
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  selected,
  item,
  onChange,
}) => {
  return (
    <label
      className={`
        flex min-[1400px]:shrink-0 max-[1400px]:w-[345px] items-center gap-2 cursor-pointer min-[1400px]:min-h-[224px] max-[1400px]:min-h-[212px] max-md:min-w-[234px]
        transition-all duration-300
        ${selected ? "scale-100" : "scale-95"}
      `}
      onClick={onChange}
    >
      <VisuallyHidden>
        <Checkbox checked={selected} onChange={onChange} />
      </VisuallyHidden>
      <div
        className={`
          bg-[#212121] md:py-7 md:px-12 rounded-[20px] cursor-pointer
          transition-all duration-300 w-full h-full max-md:max-w-[290px] max-md:max-h-[212px] max-md:p-6
          ${
            selected
              ? "border-2 border-primary-strong shadow-lg"
              : "border-2 border-transparent"
          }
        `}
      >
        <div className="flex flex-col gap-1.5">
          <div>
            <Text
              variant="h2"
              className="text-white min-[1400px]:!text-[30px] !font-semibold !text-[26px]"
            >
              {item.title}
            </Text>
            {item.key !== "sw-ecosystem" ? (
              <Text
                variant="t2"
                className="text-primary-strong min-[1400px]:!text-[28px] !font-normal whitespace-nowrap mb-1 !text-[24px]"
              >
                {item.key}
              </Text>
            ) : (
              <div className="h-[18px]"></div>
            )}
          </div>
          <Text className="text-white min-[1400px]:!text-[22px] !font-thin whitespace-pre-wrap min-[1400px]:!leading-[28.6px] !text-[17px]">
            {item.content}
          </Text>
        </div>
      </div>
    </label>
  );
};
