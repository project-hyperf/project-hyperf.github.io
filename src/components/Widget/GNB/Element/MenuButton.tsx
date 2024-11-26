import { Text } from "../../../UI/Text/Text";
import { GeneralButton } from "../../../UI/Button/GeneralButton";

interface MenuButtonProps {
  title: string;
  menuKey: string;
}
export const MenuButton: React.FC<MenuButtonProps> = ({ title, menuKey }) => {
  return (
    <GeneralButton
      className="bg-transparent"
      onClick={() => {
        document
          .getElementById(menuKey)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <Text variant="h4" className="cursor-pointer">
        {title}
      </Text>
    </GeneralButton>
  );
};
