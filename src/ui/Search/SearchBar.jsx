import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import SearchDropdown from "../Search/SearchDropdown";
import { useNavigate } from "react-router-dom";

function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  /* cosnt debounced query */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const barClasses = `bg-surface flex w-full items-center gap-1 px-3 py-2 transition-all duration-100 border  border-white/10 hover:border-white/30 focus-within:border-white/30 ${
    isDropdownOpen
      ? "rounded-t-3xl border-b-transparent shadow-none hover:border-b-transparent focus-within:border-b-transparent"
      : "rounded-full shadow-lg"
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
      {isDropdownOpen && <SearchDropdown onSelect={handleSelect} />}
    </div>
  );
}

export default SearchBar;
