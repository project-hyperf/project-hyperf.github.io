import Link from "next/link";
import { Text } from "../Text/Text";

interface MenuButtonProps {
  title: string;
  menuKey: string;
}
export const MenuButton: React.FC<MenuButtonProps> = ({ title, menuKey }) => {
  return (
    <Link href={`/#${menuKey}`}>
      <Text variant="h2" className="cursor-pointer">
        {title}
      </Text>
    </Link>
  );
};
