import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchDropdown from "../Search/SearchDropdown";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearch } from "../../Features/products/hooks/useSearch";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useKeyDown } from "../../hooks/useKeyDown";

function SearchBar({ isOpen, setOpen, isLargeScreen }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const searchRef = useRef();
  const inputRef = useRef();

  const debouncedQuery = useDebounce(query, 500);
  const { isPending, results, error } = useSearch(debouncedQuery);

  const showSearchResults = isDropdownOpen && query.length >= 3 && results;

  const clearQuery = useCallback(() => {
    setIsDropdownOpen(false);
    setQuery("");
    if (isOpen) {
      setOpen(false);
    }
  }, [isOpen, setOpen]);

  const focusSearch = useCallback(() => {
    if (!isLargeScreen && !isOpen) {
      setOpen(true);
    }
    inputRef.current?.focus();
  }, [isOpen, setOpen, isLargeScreen]);

  function handleSelect(slug) {
    navigate(`/product/${slug}`);
    setIsDropdownOpen(false);
    setQuery("");
  }

  useEffect(() => {
    if (query.length >= 3) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [query]);

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
