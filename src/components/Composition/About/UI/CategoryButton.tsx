import { Text } from "@/components/UI/Text/Text";
import { Checkbox, VisuallyHidden } from "@nextui-org/react";
interface CategoryButtonProps {
  selected: boolean;
  onChange: (category: string) => void;
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
    <label className="flex items-center gap-2 cursor-pointer min-h-[224px]">
      <VisuallyHidden>
        <Checkbox
          checked={selected}
          onChange={() => onChange(item.title)}
        ></Checkbox>
      </VisuallyHidden>
      <div className="bg-[#212121] py-7 px-12 rounded-[20px] cursor-pointer">
        <div className="flex flex-col gap-1.5 ">
          <div>
            <Text
              variant="h2"
              className="text-white !text-[30px] font-semibold"
            >
              {item.title}
            </Text>
            {item.key !== "sw-ecosystem" ? (
              <Text
                variant="t2"
                className="text-primary-strong !text-[28px] font-normal whitespace-nowrap mb-1"
              >
                {item.key}
              </Text>
            ) : (
              <div className="h-4"></div>
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
