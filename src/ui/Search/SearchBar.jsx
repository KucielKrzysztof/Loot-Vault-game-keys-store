import { Search, X } from "lucide-react";

function SearchBar({ isOpen, onClose }) {
  const baseClasses = `bg-secondary/40 flex items-center gap-1 rounded-full px-3 py-2 transition-all duration-300`;
  const mobileClasses = `${
    isOpen
      ? "fixed inset-x-10 top-1/2 -translate-y-1/2 z-50 flex animate-in fade-in zoom-in duration-200"
      : "hidden lg:flex lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-100 lg:max-w-xs"
  }`;
  const desktopClasses = `lg:hover:scale-105 lg:focus-within:scale-105`;

  return (
    <div className={`${baseClasses} ${mobileClasses} ${desktopClasses}`}>
      <Search size={18} className="shrink-0" />
      <input
        type="text"
        placeholder="search"
        autoFocus={isOpen}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
      />
      <button
        className="shrink-0 text-gray-300 transition-colors hover:text-white"
        onClick={onClose}
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default SearchBar;
