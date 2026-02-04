import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useSearch } from "../../../../Features/products/hooks/useSearch";

export interface UseSearchBarLogicProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isLargeScreen: boolean;
}

export const useSearchBarLogic = ({
  isOpen,
  setOpen,
  isLargeScreen,
}: UseSearchBarLogicProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  function handleSelect(slug: string): void {
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
