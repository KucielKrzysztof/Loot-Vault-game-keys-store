import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useSearch } from "../../../../Features/products/hooks/useSearch";

export const useSearchBarLogic = ({ isOpen, setOpen, isLargeScreen }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
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
    setIsDropdownOpen(query.length >= 3);
  }, [query]);

  return {
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
  };
};
