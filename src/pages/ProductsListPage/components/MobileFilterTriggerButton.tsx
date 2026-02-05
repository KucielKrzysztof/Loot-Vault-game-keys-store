import { SlidersHorizontal } from "lucide-react";
import Button from "../../../ui/Button";

interface MobileFilterTriggerButtonProps {
  onClose: () => void;
}

function MobileFilterTriggerButton({
  onClose,
}: MobileFilterTriggerButtonProps): React.JSX.Element {
  return (
    <div className="mt-4 md:hidden">
      <Button
        onClick={onClose}
        className="bg-surface/80 flex w-full items-center justify-center gap-2 rounded-2xl py-4"
      >
        <SlidersHorizontal size={20} /> Show Filters
      </Button>
    </div>
  );
}

export default MobileFilterTriggerButton;
