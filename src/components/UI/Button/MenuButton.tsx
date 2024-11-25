import Link from "next/link";
import { Text } from "../Text/Text";
import { GeneralButton } from "./GeneralButton";

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
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
    >
      <Text variant="h4" className="cursor-pointer">
        {title}
      </Text>
    </GeneralButton>
  );
};
