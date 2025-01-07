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
        flex items-center gap-2 cursor-pointer min-h-[224px]
        transition-all duration-300
        ${selected ? "scale-105" : "scale-100"}
      `}
      onClick={onChange}
    >
      <VisuallyHidden>
        <Checkbox checked={selected} onChange={onChange} />
      </VisuallyHidden>
      <div
        className={`
          bg-[#212121] py-7 px-12 rounded-[20px] cursor-pointer
          transition-all duration-300
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
              className="text-white !text-[30px] !font-semibold"
            >
              {item.title}
            </Text>
            {item.key !== "sw-ecosystem" ? (
              <Text
                variant="t2"
                className="text-primary-strong !text-[28px] !font-normal whitespace-nowrap mb-1"
              >
                {item.key}
              </Text>
            ) : (
              <div className="h-[18px]"></div>
            )}
          </div>
          <Text className="text-white !text-[22px] !font-thin whitespace-pre-wrap !leading-[28.6px]">
            {item.content}
          </Text>
        </div>
      </div>
    </label>
  );
};
