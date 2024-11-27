import { GeneralButton } from "./GeneralButton";
import { X } from "lucide-react";
interface CloseButtonProps {
  onClick: () => void;
}
export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <GeneralButton className="bg-transparent" onClick={onClick} isIconOnly>
      <X width={32} />
    </GeneralButton>
  );
};
