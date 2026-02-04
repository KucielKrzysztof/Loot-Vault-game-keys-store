import { Search, X } from "lucide-react";
import SearchDropdown from "./SearchDropdown";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useKeyDown } from "../../../hooks/useKeyDown";
import {
  useSearchBarLogic,
  type UseSearchBarLogicProps,
} from "./hooks/useSearchBarLogic";

function SearchBar({
  isOpen,
  setOpen,
  isLargeScreen,
}: UseSearchBarLogicProps): React.JSX.Element {
  const {
    query,
    setQuery,
    isDropdownOpen,
    searchRef,
    inputRef,
    isPending,
    results,
    error,
    showSearchResults,
    clearQuery,
    focusSearch,
    handleSelect,
  } = useSearchBarLogic({ isOpen, setOpen, isLargeScreen });

  useClickOutside(searchRef, isDropdownOpen ? clearQuery : null);
  useKeyDown("Escape", isOpen || isDropdownOpen ? clearQuery : null);
  useKeyDown("Enter", focusSearch);

  const positionClasses = `${
    isOpen
      ? "fixed inset-x-10 top-1/2 -translate-y-1/2 z-50 animate-in fade-in zoom-in duration-200"
      : "hidden lg:flex lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-100 lg:max-w-xs"
  }`;

  const barClasses = `bg-surface flex w-full items-center gap-1 px-3 py-2 transition-all duration-100    ${
    isDropdownOpen ? "rounded-t-3xl  shadow-none" : "rounded-full shadow-lg "
  }`;

  return (
    <div ref={searchRef} className={`${positionClasses}`}>
      <div className={`${barClasses}`}>
        <Search size={18} className="shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="search"
          data-allow-global-keys="true"
          autoFocus={isOpen}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <button
          className="shrink-0 text-gray-300 transition-colors hover:text-white"
          onClick={clearQuery}
        >
          <X size={18} onClick={clearQuery} />
        </button>
      </div>
      {showSearchResults && (
        <SearchDropdown
          results={results}
          isPending={isPending}
          error={error}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}

export default SearchBar;
