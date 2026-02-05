import { X } from "lucide-react";
import FilterContent from "./FilterContent";
import type { FilterProps } from "../ProductsListPage";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filterProps: FilterProps;
}

function MobileFilterDrawer({
  isOpen,
  onClose,
  filterProps,
}: MobileFilterDrawerProps): React.JSX.Element {
  return (
    <div
      className={`fixed inset-0 z-100 transition-all duration-300 md:hidden ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`bg-background absolute top-0 left-0 h-full w-[85%] max-w-sm p-6 shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={onClose} className="text-white/50">
            <X size={24} />
          </button>
        </div>
        <div className="h-[calc(100vh-150px)] overflow-y-auto">
          <FilterContent {...filterProps} />
        </div>
      </div>
    </div>
  );
}

export default MobileFilterDrawer;
