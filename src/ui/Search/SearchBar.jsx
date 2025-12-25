import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import SearchDropdown from "../Search/SearchDropdown";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearch } from "../../Features/products/hooks/useSearch";

function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 500);
  const { isPending, results, error } = useSearch(debouncedQuery);

  const showSearchResults = isDropdownOpen && query.length >= 3 && results;

  function clearQuery() {
    setIsDropdownOpen(false);
    setQuery("");
  }

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

  const positionClasses = `${
    isOpen
      ? "fixed inset-x-10 top-1/2 -translate-y-1/2 z-50 animate-in fade-in zoom-in duration-200"
      : "hidden lg:flex lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-100 lg:max-w-xs"
  }`;

  const barClasses = `bg-surface flex w-full items-center gap-1 px-3 py-2 transition-all duration-100    ${
    isDropdownOpen ? "rounded-t-3xl  shadow-none" : "rounded-full shadow-lg "
  }`;

  return (
    <div className={`${positionClasses}`}>
      <div className={`${barClasses}`}>
        <Search size={18} className="shrink-0" />
        <input
          type="text"
          placeholder="search"
          autoFocus={isOpen}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <button
          className="shrink-0 text-gray-300 transition-colors hover:text-white"
          onClick={onClose}
        >
          <X size={18} onClick={() => clearQuery()} />
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
